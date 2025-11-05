import io
import os
from typing import Tuple

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import torch
import torchvision.transforms as T
from torchvision import models
import logging


MODEL_PATH = os.getenv("MODEL_PATH", os.path.join(os.path.dirname(__file__), "efficientnet_b0_deepfake.pth"))
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")


def build_model(num_classes: int = 2) -> torch.nn.Module:
    # Recreate EfficientNet-B0 for binary classification
    model = models.efficientnet_b0(weights=None)
    in_features = model.classifier[1].in_features
    model.classifier[1] = torch.nn.Linear(in_features, num_classes)
    return model


def load_model() -> torch.nn.Module:
    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

    # Try safe loading on CPU, then move to device
    state = torch.load(MODEL_PATH, map_location="cpu")

    # Case 1: checkpoint is a full nn.Module
    if isinstance(state, torch.nn.Module):
        model = state
        model.to(DEVICE)
        model.eval()
        return model

    # Case 2: checkpoint dict contains a full nn.Module
    if isinstance(state, dict) and "model" in state and isinstance(state["model"], torch.nn.Module):
        model = state["model"]
        model.to(DEVICE)
        model.eval()
        return model

    # Case 3: checkpoint contains a state_dict (possibly nested)
    if isinstance(state, dict) and "state_dict" in state and isinstance(state["state_dict"], dict):
        state = state["state_dict"]

    # Case 3b: many training scripts save under 'model_state_dict'
    if isinstance(state, dict) and "model_state_dict" in state and isinstance(state["model_state_dict"], dict):
        state = state["model_state_dict"]

    if isinstance(state, dict):
        # Try to infer classifier output size from checkpoint
        num_outputs = 2
        head_weight = state.get("classifier.1.weight")
        if isinstance(head_weight, torch.Tensor):
            num_outputs = head_weight.shape[0]

        model = build_model(num_classes=num_outputs)

        # Remove possible prefixes like 'module.' if saved with DataParallel
        cleaned_state = {}
        for k, v in state.items():
            new_key = k
            if isinstance(k, str) and k.startswith("module."):
                new_key = k[len("module."):]
            cleaned_state[new_key] = v

        # Load non-strict to tolerate classifier head shape differences (1-logit vs 2-logit)
        model.load_state_dict(cleaned_state, strict=False)
        model.to(DEVICE)
        model.eval()
        return model

    # Fallback: unsupported format
    raise RuntimeError("Unsupported checkpoint format: expected nn.Module or dict/state_dict")


app = FastAPI(title="Deepfake Detection API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


_MODEL = None


@app.on_event("startup")
def _startup():
    global _MODEL
    logging.basicConfig(level=logging.INFO)
    logging.info(f"Loading model from: {MODEL_PATH}")
    _MODEL = load_model()
    logging.info(f"Model loaded on device: {DEVICE}")


_TRANSFORM = T.Compose(
    [
        T.Resize((224, 224)),
        T.ToTensor(),
        T.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


def infer_image_bytes(image_bytes: bytes) -> Tuple[str, float]:
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = _TRANSFORM(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        logits = _MODEL(tensor)
        # Handle models that output a single logit (binary sigmoid, label 1 = real) or multi-logit softmax
        if getattr(logits, "shape", None) is not None and logits.shape[-1] == 1:
            prob_real = torch.sigmoid(logits).item()
            label = "real" if prob_real >= 0.5 else "fake"
            score = prob_real if label == "real" else 1.0 - prob_real
            return label, float(score)
        else:
            # Softmax two-class: assume index 1 = fake
            probs = torch.softmax(logits, dim=-1).squeeze(0)
            score_fake = float(probs[1].item()) if probs.numel() >= 2 else float(probs.max().item())
            label = "fake" if score_fake >= 0.5 else "real"
            score = score_fake if label == "fake" else 1.0 - score_fake
            return label, float(score)


@app.get("/health")
def health():
    return {"status": "ok", "device": str(DEVICE)}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Unsupported file type. Please upload an image.")

    try:
        data = await file.read()
        label, score = infer_image_bytes(data)
        logging.info(f"Predicted label={label}, score={score:.4f}, file={file.filename}")
        return {
            "label": label,  # "real" | "fake"
            "score": round(score, 4),  # confidence for predicted label
        }
    except Exception as e:
        logging.exception("Inference error")
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")


