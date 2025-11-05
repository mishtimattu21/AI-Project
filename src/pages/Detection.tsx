import { useState } from "react";
import { Upload, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<"real" | "fake" | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);

    const API_URL = (import.meta as any).env?.VITE_API_URL || "http://localhost:8000";
    const endpoint = `${API_URL.replace(/\/$/, "")}/predict`;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const msg = await response.text();
        throw new Error(msg || `Server error (${response.status})`);
      }

      const data: { label?: "real" | "fake"; score?: number } = await response.json();
      if (!data || !data.label) {
        throw new Error("Invalid response from server");
      }

      setResult(data.label);
      setScore(typeof data.score === "number" ? data.score : null);

      toast({
        title: data.label === "real" ? "Analysis Complete" : "Deepfake Detected",
        description:
          data.label === "real"
            ? `This image appears to be authentic${data.score != null ? ` (confidence ${Math.round((data.score || 0) * 100)}%)` : ""}`
            : `This image may be AI-generated${data.score != null ? ` (confidence ${Math.round((data.score || 0) * 100)}%)` : ""}`,
      });
    } catch (err: any) {
      console.error("Detection error:", err);
      setResult(null);
      setScore(null);
      toast({
        title: "Detection failed",
        description: err?.message || "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="gradient-bg min-h-[calc(100vh-140px)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Image Detection
              </h1>
              <p className="text-lg text-muted-foreground">
                Upload an image to verify its authenticity
              </p>
            </div>

            <div className="glass-card rounded-2xl p-8 md:p-12 animate-fade-in">
              {!previewUrl ? (
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer transition-all hover:border-primary hover:bg-secondary/50"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    Drop your image here
                  </h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative rounded-xl overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-auto max-h-96 object-contain bg-secondary"
                    />
                  </div>

                  {result && (
                    <div
                      className={`p-6 rounded-xl flex items-center gap-4 animate-fade-in ${
                        result === "real"
                          ? "bg-success/10 border border-success/20"
                          : "bg-destructive/10 border border-destructive/20"
                      }`}
                    >
                      {result === "real" ? (
                        <CheckCircle className="w-8 h-8 text-success flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">
                          {result === "real"
                            ? "✅ This image appears authentic"
                            : "⚠️ This image may be AI-generated"}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {result === "real"
                            ? `Our AI analysis suggests this image is likely genuine.${
                                score != null ? ` Confidence: ${Math.round(score * 100)}%` : ""
                              }`
                            : `Our AI analysis detected potential signs of manipulation.${
                                score != null ? ` Confidence: ${Math.round(score * 100)}%` : ""
                              }`}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      onClick={handleDetect}
                      disabled={isAnalyzing}
                      className="flex-1 h-12 text-base font-medium bg-primary hover:bg-primary/90"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        "Detect"
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setSelectedFile(null);
                        setPreviewUrl(null);
                        setResult(null);
                        setScore(null);
                      }}
                      variant="outline"
                      className="h-12 px-8"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Detection;
