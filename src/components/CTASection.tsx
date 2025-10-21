import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Success!", {
        description: "You've been added to our early access list.",
      });
      setEmail("");
    }
  };

  const handleGithub = () => {
    toast.info("Coming Soon!", {
      description: "SecurePilot will be open-sourced after the hackathon.",
    });
  };

  return (
    <section id="cta" className="py-24 bg-gradient-primary text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Secure Your Application?
          </h2>
          <p className="text-xl text-white/90">
            Join the waiting list for early access to SecurePilot and be among the first to implement 
            enterprise-grade security in your applications.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              className="group"
            >
              Get Early Access
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={handleGithub}
            >
              <Github className="mr-2 h-5 w-5" />
              Star on GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => window.location.href = "mailto:hello@securepilot.dev"}
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
