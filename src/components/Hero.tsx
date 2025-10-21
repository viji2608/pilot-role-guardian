import { ArrowRight, Lock, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Innovation in Security</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Role-Based Access
            </span>
            <br />
            <span className="text-foreground">Control Made Simple</span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            SecurePilot integrates MariaDB's native privilege system with Descope's authentication platform, 
            enabling fine-grained access control for multi-user applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              className="group text-lg px-8 py-6"
              onClick={() => scrollToSection("demo")}
            >
              View Live Demo
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => scrollToSection("features")}
            >
              Explore Features
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="font-semibold text-lg">Secure Authentication</h3>
              <p className="text-sm text-muted-foreground">OAuth, Magic Links, MFA</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-secondary/50 transition-all duration-300 hover:shadow-glow">
              <Users className="h-8 w-8 text-secondary" />
              <h3 className="font-semibold text-lg">Role Management</h3>
              <p className="text-sm text-muted-foreground">Admin, Editor, Viewer roles</p>
            </div>
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card/50 backdrop-blur border border-border hover:border-accent/50 transition-all duration-300 hover:shadow-glow">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-semibold text-lg">Audit Logging</h3>
              <p className="text-sm text-muted-foreground">Complete activity tracking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
