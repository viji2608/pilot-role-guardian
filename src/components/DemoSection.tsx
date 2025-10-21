import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Lock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const roleCards = [
  {
    role: "Admin",
    icon: Lock,
    color: "text-primary",
    bgColor: "bg-primary/10",
    permissions: ["Full database access", "Manage users", "View audit logs", "Export data"],
  },
  {
    role: "Editor",
    icon: Edit,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    permissions: ["Read/Write access", "Edit records", "View reports", "Limited exports"],
  },
  {
    role: "Viewer",
    icon: Eye,
    color: "text-accent",
    bgColor: "bg-accent/10",
    permissions: ["Read-only access", "View dashboards", "Generate reports", "No exports"],
  },
];

export const DemoSection = () => {
  const handleRoleDemo = (role: string) => {
    toast.success(`Demo: ${role} role activated`, {
      description: `Viewing dashboard with ${role.toLowerCase()} permissions`,
    });
  };

  return (
    <section id="demo" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience how different roles interact with the dashboard
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roleCards.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-border/50 bg-card/80 backdrop-blur"
            >
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${item.bgColor}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <Badge variant="outline" className={item.color}>
                    {item.role}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {item.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{permission}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={index === 0 ? "default" : "outline"}
                  onClick={() => handleRoleDemo(item.role)}
                >
                  View as {item.role}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card/80 backdrop-blur border-border/50">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Dashboard Preview</h3>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border border-border">
              <div className="text-center space-y-4">
                <Lock className="h-16 w-16 mx-auto text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Select a role above to view the dashboard with specific permissions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
