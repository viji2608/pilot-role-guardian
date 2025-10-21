import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Eye, 
  Edit, 
  Lock, 
  Trash2, 
  Download, 
  Plus, 
  Settings,
  Database,
  Users as UsersIcon,
  FileText,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

type Role = "admin" | "editor" | "viewer";

interface InteractiveDashboardProps {
  role: Role;
}

const mockData = [
  { id: 1, name: "User Database", records: 1234, status: "active", lastModified: "2 hours ago" },
  { id: 2, name: "Product Catalog", records: 567, status: "active", lastModified: "1 day ago" },
  { id: 3, name: "Order History", records: 8901, status: "active", lastModified: "3 hours ago" },
  { id: 4, name: "Analytics Data", records: 456, status: "syncing", lastModified: "5 mins ago" },
];

export const InteractiveDashboard = ({ role }: InteractiveDashboardProps) => {
  const [data, setData] = useState(mockData);

  const handleAction = (action: string, itemName: string) => {
    const canPerform = 
      (action === "view") || 
      (action === "edit" && (role === "admin" || role === "editor")) ||
      (action === "delete" && role === "admin") ||
      (action === "export" && role !== "viewer") ||
      (action === "create" && (role === "admin" || role === "editor"));

    if (canPerform) {
      toast({
        title: `${action.charAt(0).toUpperCase() + action.slice(1)} Action`,
        description: `Successfully ${action}ed ${itemName}`,
      });
      
      if (action === "delete" && role === "admin") {
        setData(data.filter(item => item.name !== itemName));
      }
    } else {
      toast({
        variant: "destructive",
        title: "Permission Denied",
        description: `Your ${role} role cannot perform ${action} operations`,
      });
    }
  };

  const getRoleColor = () => {
    switch (role) {
      case "admin": return "text-primary";
      case "editor": return "text-secondary";
      case "viewer": return "text-accent";
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case "admin": return "bg-primary/10 text-primary border-primary/20";
      case "editor": return "bg-secondary/10 text-secondary border-secondary/20";
      case "viewer": return "bg-accent/10 text-accent border-accent/20";
    }
  };

  const permissions = {
    admin: ["Read", "Write", "Delete", "Export", "Manage Users", "View Logs"],
    editor: ["Read", "Write", "Export", "View Reports"],
    viewer: ["Read", "View Reports"],
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gradient-hero rounded-xl border border-border">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Database className={`h-6 w-6 ${getRoleColor()}`} />
            Dashboard Overview
          </h3>
          <p className="text-muted-foreground mt-1">Viewing as {role} role</p>
        </div>
        <Badge className={getRoleBadgeColor()}>
          {role === "admin" && <Lock className="h-3 w-3 mr-1" />}
          {role === "editor" && <Edit className="h-3 w-3 mr-1" />}
          {role === "viewer" && <Eye className="h-3 w-3 mr-1" />}
          {role.toUpperCase()}
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.reduce((acc, item) => acc + item.records, 0).toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Tables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.filter(d => d.status === "active").length}</div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{permissions[role].length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Permissions Panel */}
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Active Permissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {permissions[role].map((permission, index) => (
              <Badge key={index} variant="outline" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {permission}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        {(role === "admin" || role === "editor") && (
          <Button 
            onClick={() => handleAction("create", "New Table")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Create New
          </Button>
        )}
        {role !== "viewer" && (
          <Button 
            variant="outline"
            onClick={() => handleAction("export", "All Data")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        )}
        {role === "admin" && (
          <Button 
            variant="outline"
            onClick={() => handleAction("manage", "Users")}
            className="gap-2"
          >
            <UsersIcon className="h-4 w-4" />
            Manage Users
          </Button>
        )}
        <Button 
          variant="outline"
          onClick={() => handleAction("view", "Reports")}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          View Reports
        </Button>
      </div>

      {/* Data Table */}
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Database Tables</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Table Name</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.records.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === "active" ? "default" : "secondary"}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{item.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("view", item.name)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("edit", item.name)}
                        disabled={role === "viewer"}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("delete", item.name)}
                        disabled={role !== "admin"}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permission Restrictions Notice */}
      {role !== "admin" && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardContent className="p-4 flex items-start gap-3">
            <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-sm">Limited Access</p>
              <p className="text-sm text-muted-foreground">
                {role === "editor" 
                  ? "You cannot delete records or manage users. Contact an admin for elevated permissions."
                  : "You have read-only access. Contact an admin or editor to make changes."}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
