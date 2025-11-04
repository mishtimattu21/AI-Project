import { Shield, Eye, AlertTriangle, Lightbulb } from "lucide-react";
import Layout from "@/components/Layout";

const Awareness = () => {
  const tips = [
    {
      icon: Eye,
      title: "Check the Details",
      description: "Look for inconsistencies in lighting, shadows, and reflections that may indicate manipulation.",
    },
    {
      icon: AlertTriangle,
      title: "Trust Your Instincts",
      description: "If something seems too perfect or unusual, it might be AI-generated. Question what you see.",
    },
    {
      icon: Shield,
      title: "Verify the Source",
      description: "Always check if the image comes from a credible, verified source before sharing or believing it.",
    },
    {
      icon: Lightbulb,
      title: "Use Detection Tools",
      description: "Leverage AI-powered tools like TrueSight to verify authenticity before spreading content.",
    },
  ];

  return (
    <Layout>
      <div className="gradient-bg min-h-[calc(100vh-140px)] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Understanding Deepfakes
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Learn how to identify AI-generated content and protect yourself from misinformation
              </p>
            </div>

            <div className="space-y-12">
              {/* What are Deepfakes */}
              <div className="glass-card rounded-2xl p-8 md:p-10 animate-fade-in">
                <h2 className="text-3xl font-semibold mb-4 text-foreground">
                  What are Deepfakes?
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Deepfakes are synthetic media created using artificial intelligence and deep learning
                  techniques. These AI-powered tools can generate highly realistic images, videos, and audio
                  that appear authentic but are actually fabricated. While the technology has legitimate uses
                  in entertainment and education, it also poses significant risks for spreading misinformation
                  and creating fraudulent content.
                </p>
              </div>

              {/* Why Detection Matters */}
              <div className="glass-card rounded-2xl p-8 md:p-10 animate-fade-in">
                <h2 className="text-3xl font-semibold mb-4 text-foreground">
                  Why Detection Matters
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    As AI technology becomes more accessible, the creation and spread of deepfakes have become
                    increasingly prevalent. This creates serious challenges:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Spreading false information and propaganda</li>
                    <li>Damaging reputations through fabricated content</li>
                    <li>Financial fraud and identity theft</li>
                    <li>Undermining trust in authentic media</li>
                    <li>Political manipulation and election interference</li>
                  </ul>
                  <p>
                    Detection tools like TrueSight help combat these threats by empowering individuals to
                    verify the authenticity of visual content before sharing or acting upon it.
                  </p>
                </div>
              </div>

              {/* Tips to Stay Safe */}
              <div className="animate-fade-in">
                <h2 className="text-3xl font-semibold mb-8 text-center text-foreground">
                  Tips to Stay Safe
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {tips.map((tip, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-xl p-6 hover:scale-105 transition-transform"
                    >
                      <tip.icon className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-semibold mb-2 text-foreground">{tip.title}</h3>
                      <p className="text-muted-foreground">{tip.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className="glass-card rounded-2xl p-8 md:p-10 text-center bg-primary/5 border-primary/20 animate-fade-in">
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  Stay Vigilant, Stay Informed
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  The fight against misinformation starts with awareness. Use TrueSight to verify images
                  and help create a more trustworthy digital world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Awareness;
