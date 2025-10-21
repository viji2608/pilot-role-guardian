import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import architectureDiagram from "@/assets/architecture-diagram.jpg";

const flowSteps = [
  {
    step: "1",
    title: "Authentication",
    description: "User logs in via Descope with OAuth, magic links, or MFA",
  },
  {
    step: "2",
    title: "Session Creation",
    description: "Descope validates credentials and creates secure session",
  },
  {
    step: "3",
    title: "Role Assignment",
    description: "Backend assigns MariaDB role based on user permissions",
  },
  {
    step: "4",
    title: "Access Control",
    description: "Database enforces privileges at query level automatically",
  },
];

export const Architecture = () => {
  return (
    <section id="architecture" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">How It </span>
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Seamless integration between authentication and database-level security
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src={architectureDiagram}
              alt="SecurePilot Architecture"
              className="rounded-xl shadow-2xl border border-border"
            />
          </div>

          <div className="space-y-6">
            {flowSteps.map((item, index) => (
              <div key={index} className="flex gap-4 group">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-bold text-lg shadow-glow">
                    {item.step}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="flex-shrink-0 text-muted-foreground/50 mt-3" />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-gradient-primary text-white border-0 shadow-glow">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">3</div>
                <div className="text-white/90">User Role Types</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100%</div>
                <div className="text-white/90">Database Security</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">∞</div>
                <div className="text-white/90">Scalability</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
