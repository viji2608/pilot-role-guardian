import { Shield, Lock, Users, Activity, Database, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Lock,
    title: "Multi-Factor Authentication",
    description: "Secure login with OAuth, magic links, and MFA support through Descope integration.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Granular Role Management",
    description: "Define and manage user roles with MariaDB's native privilege system for precise access control.",
    color: "text-secondary",
  },
  {
    icon: Shield,
    title: "Database-Level Security",
    description: "Leverage MariaDB's robust security features with role-based privileges at the database layer.",
    color: "text-accent",
  },
  {
    icon: Activity,
    title: "Audit Trail & Logging",
    description: "Comprehensive activity tracking and access history for compliance and security monitoring.",
    color: "text-primary",
  },
  {
    icon: Database,
    title: "Dynamic Data Access",
    description: "Conditional rendering and data filtering based on authenticated user roles and permissions.",
    color: "text-secondary",
  },
  {
    icon: Zap,
    title: "Enterprise-Ready",
    description: "Scalable architecture designed for enterprise deployment with high availability.",
    color: "text-accent",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Powerful Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build secure, role-based applications with confidence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border-border/50 bg-card/50 backdrop-blur"
            >
              <CardContent className="p-6 space-y-4">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-primary ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
