import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { DemoSection } from "@/components/DemoSection";
import { Roadmap } from "@/components/Roadmap";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Features />
      <Architecture />
      <DemoSection />
      <Roadmap />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
