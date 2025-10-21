import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Rocket } from "lucide-react";

const roadmapItems = [
  {
    phase: "Phase 1",
    status: "completed",
    icon: CheckCircle,
    items: [
      "FastAPI backend with Descope integration",
      "MariaDB role and privilege setup",
      "React dashboard with role-based rendering",
      "Basic audit logging",
    ],
  },
  {
    phase: "Phase 2",
    status: "in-progress",
    icon: Clock,
    items: [
      "Enhanced admin panel",
      "Advanced activity monitoring",
      "Real-time privilege enforcement",
      "Comprehensive documentation",
    ],
  },
  {
    phase: "Phase 3",
    status: "planned",
    icon: Rocket,
    items: [
      "LDAP and enterprise SSO support",
      "Plugin system for CMSs",
      "Analytics platform integration",
      "Open-source community release",
    ],
  },
];

export const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-foreground">Development </span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Roadmap
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our journey from hackathon prototype to enterprise solution
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roadmapItems.map((phase, index) => (
            <Card
              key={index}
              className={`border-2 transition-all duration-300 hover:-translate-y-1 ${
                phase.status === "completed"
                  ? "border-green-500/50 bg-green-500/5"
                  : phase.status === "in-progress"
                  ? "border-primary/50 bg-primary/5"
                  : "border-border/50 bg-card/50"
              }`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{phase.phase}</h3>
                  <Badge
                    variant={phase.status === "completed" ? "default" : "outline"}
                    className={
                      phase.status === "completed"
                        ? "bg-green-500 text-white"
                        : phase.status === "in-progress"
                        ? "border-primary text-primary"
                        : ""
                    }
                  >
                    <phase.icon className="h-3 w-3 mr-1" />
                    {phase.status.replace("-", " ")}
                  </Badge>
                </div>

                <ul className="space-y-3">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div
                        className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${
                          phase.status === "completed"
                            ? "bg-green-500"
                            : phase.status === "in-progress"
                            ? "bg-primary"
                            : "bg-muted-foreground/50"
                        }`}
                      />
                      <span className="text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
