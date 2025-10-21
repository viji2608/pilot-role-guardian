import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              SecurePilot
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("architecture")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Architecture
            </button>
            <button
              onClick={() => scrollToSection("roadmap")}
              className="text-foreground/80 hover:text-foreground transition-colors"
            >
              Roadmap
            </button>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="outline"
              onClick={() => scrollToSection("demo")}
              className="hidden sm:inline-flex"
            >
              View Demo
            </Button>
            <Button onClick={() => scrollToSection("cta")}>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
