import { Link } from "react-router-dom";
import { ArrowRight, Shield, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroBg from "@/assets/hero-bg.jpg";
import heroIllustration from "@/assets/hero-illustration.png";

const Index = () => {
  const features = [
    {
      icon: Shield,
      title: "AI-Powered Detection",
      description: "Advanced algorithms analyze images for signs of manipulation and AI generation",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get accurate authenticity reports in seconds, not hours",
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Your images are processed securely and never stored on our servers",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        
        <div className="gradient-hero relative z-10">
          <div className="container mx-auto px-4 py-24 md:py-32">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="animate-fade-in">
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
                    Unmask the Truth
                    <span className="block text-primary">with AI</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                    Detect AI-generated and manipulated images instantly with cutting-edge technology.
                    Protect yourself from deepfakes and misinformation.
                  </p>
                  <Link to="/detection">
                    <Button className="h-14 px-8 text-lg font-medium bg-primary hover:bg-primary/90 group">
                      Check Image Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
                
                <div className="animate-fade-in hidden md:block">
                  <img 
                    src={heroIllustration} 
                    alt="AI Deepfake Detection Illustration" 
                    className="w-full h-auto animate-float drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 gradient-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground animate-fade-in">
              Why Choose TrueSight?
            </h2>
            <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto animate-fade-in">
              Our platform combines state-of-the-art AI with user-friendly design to give you
              confidence in the visual content you encounter.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-8 text-center hover:scale-105 transition-transform animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto glass-card rounded-2xl p-12 text-center bg-primary/5 border-primary/20 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Ready to Verify?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust TrueSight to keep them safe from misinformation
            </p>
            <Link to="/detection">
              <Button className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90">
                Start Detection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
