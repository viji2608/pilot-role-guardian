import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Lock, CheckCircle } from "lucide-react";
import { InteractiveDashboard } from "./InteractiveDashboard";
import { useUserRole } from "@/hooks/useUserRole";

type Role = "admin" | "editor" | "viewer";

const roleCards = [
  {
    role: "admin" as Role,
    label: "Admin",
    icon: Lock,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary",
    permissions: ["Full database access", "Manage users", "Delete any record", "Export all data"],
  },
  {
    role: "editor" as Role,
    label: "Editor",
    icon: Edit,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary",
    permissions: ["Create new items", "Edit all records", "View reports", "Export data"],
  },
  {
    role: "viewer" as Role,
    label: "Viewer",
    icon: Eye,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent",
    permissions: ["Read-only access", "View dashboards", "Generate reports", "No modifications"],
  },
];

export const DemoSection = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const { role: userRole, loading } = useUserRole();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    // Smooth scroll to dashboard
    setTimeout(() => {
      document.getElementById("interactive-dashboard")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }, 100);
  };

  const displayRole = selectedRole || (userRole as Role) || null;

  return (
    <section id="demo" className="py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              Interactive Live Demo
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {userRole && !loading ? (
              <>You're signed in as <span className="font-semibold text-primary">{userRole.toUpperCase()}</span> - Try it live below or preview other roles</>
            ) : (
              "Experience real-time role-based access control with live database updates"
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {roleCards.map((item, index) => (
            <Card
              key={index}
              className={`group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur ${selectedRole === item.role
                  ? `border-2 ${item.borderColor} shadow-card-hover`
                  : "border-border/50"
                }`}
            >
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${item.bgColor} ${selectedRole === item.role ? 'ring-2 ring-offset-2 ring-offset-background' : ''} ${item.color}`}>
                    <item.icon className={`h-6 w-6 ${item.color}`} />
                  </div>
                  <Badge
                    variant="outline"
                    className={`${item.color} ${selectedRole === item.role || userRole === item.role ? 'font-bold' : ''}`}
                  >
                    {item.label}
                    {userRole === item.role && !selectedRole && " (Your Role)"}
                  </Badge>
                </div>

                <div className="space-y-3">
                  {item.permissions.map((permission, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${selectedRole === item.role || userRole === item.role ? 'text-green-500' : 'text-green-500/50'
                        }`} />
                      <span className="text-sm text-muted-foreground">{permission}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className="w-full"
                  variant={selectedRole === item.role ? "default" : "outline"}
                  onClick={() => handleRoleSelect(item.role)}
                >
                  {selectedRole === item.role ? "Active Preview" : `Preview as ${item.label}`}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div id="interactive-dashboard">
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardContent className="p-6 md:p-8">
              {displayRole ? (
                <InteractiveDashboard role={displayRole} />
              ) : (
                <div className="aspect-video rounded-lg flex items-center justify-center border border-border bg-gradient-hero">
                  <div className="text-center space-y-4 px-4">
                    <Lock className="h-16 w-16 mx-auto text-muted-foreground/50" />
                    <p className="text-lg font-medium text-foreground">
                      Select a role above to start exploring
                    </p>
                    <p className="text-muted-foreground max-w-md">
                      See how Admin, Editor, and Viewer roles have different permissions with real-time updates
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
