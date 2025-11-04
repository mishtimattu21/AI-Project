import { Link, useLocation } from "react-router-dom";
import { Shield, Mail, Twitter, Github, Linkedin } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/detection", label: "Detection" },
    { to: "/awareness", label: "Awareness" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <Shield className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-2xl font-semibold text-foreground">TrueSight</span>
            </Link>
            
            <div className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-medium transition-colors relative ${
                    isActive(link.to)
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t mt-auto">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <Shield className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                <span className="text-2xl font-semibold text-foreground">TrueSight</span>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">
                AI-powered deepfake detection to protect you from misinformation and keep the digital world trustworthy.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-foreground" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-secondary hover:bg-primary/20 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-foreground" />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/detection" className="text-muted-foreground hover:text-primary transition-colors">
                    Detection Tool
                  </Link>
                </li>
                <li>
                  <Link to="/awareness" className="text-muted-foreground hover:text-primary transition-colors">
                    Awareness
                  </Link>
                </li>
                <li>
                  <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#cookies" className="text-muted-foreground hover:text-primary transition-colors">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@truesight.ai"
                    className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} TrueSight. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Made with care to combat misinformation
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
