import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  XCircle,
  ExternalLink,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDemoItems } from "@/hooks/useDemoItems";
import { useAuth } from "@/hooks/useAuth";

type Role = "admin" | "editor" | "viewer";

interface InteractiveDashboardProps {
  role: Role;
}

export const InteractiveDashboard = ({ role }: InteractiveDashboardProps) => {
  const { user } = useAuth();
  const { items, loading, createItem, updateItem, deleteItem } = useDemoItems();
  const [newItemName, setNewItemName] = useState("");
  const [newItemDesc, setNewItemDesc] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCreate = async () => {
    if (!newItemName.trim()) return;

    try {
      await createItem(newItemName, newItemDesc);
      toast({
        title: "Success",
        description: "Item created successfully - check real-time update!",
      });
      setNewItemName("");
      setNewItemDesc("");
      setIsCreateOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create item",
        variant: "destructive",
      });
    }
  };

  const handleEdit = async () => {
    if (!editingId || !editName.trim()) return;

    try {
      await updateItem(editingId, { name: editName, description: editDesc });
      toast({
        title: "Success",
        description: "Item updated in real-time!",
      });
      setIsEditOpen(false);
      setEditingId(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update item",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (role !== "admin") {
      toast({
        title: "Permission Denied",
        description: "Only administrators can delete items.",
        variant: "destructive",
      });
      return;
    }

    try {
      await deleteItem(id);
      toast({
        title: "Success",
        description: `Deleted ${name} - update synced instantly!`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (item: any) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditDesc(item.description || "");
    setIsEditOpen(true);
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

  if (loading) {
    return (
      <div className="w-full p-6">
        <p className="text-center">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Documentation Link */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold">Learn About RBAC Implementation</p>
                <p className="text-sm text-muted-foreground">Complete tutorials and documentation</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="https://docs.lovable.dev/features/cloud" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Backend Docs <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="https://docs.lovable.dev/features/security" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Security Guide <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-6 bg-gradient-hero rounded-xl border border-border">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3">
            <Database className={`h-6 w-6 ${getRoleColor()}`} />
            Live Dashboard
          </h3>
          <p className="text-muted-foreground mt-1">
            Viewing as {role} {user && <span className="text-green-500">• Authenticated</span>}
          </p>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Real-time count</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{items.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Live updates</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/80 backdrop-blur">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Your Permissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{permissions[role].length}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {role} role</p>
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
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button
              className="gap-2"
              disabled={role === "viewer" || !user}
            >
              <Plus className="h-4 w-4" />
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Item</DialogTitle>
              <DialogDescription>Add a new item to the database - changes sync in real-time!</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Enter item name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {role !== "viewer" && (
          <Button
            variant="outline"
            onClick={() => toast({ title: "Export", description: "Data exported successfully" })}
            className="gap-2"
            disabled={!user}
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        )}
        {role === "admin" && (
          <Button
            variant="outline"
            onClick={() => toast({ title: "Manage Users", description: "Opening user management" })}
            className="gap-2"
            disabled={!user}
          >
            <UsersIcon className="h-4 w-4" />
            Manage Users
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => toast({ title: "View Reports", description: "Loading reports" })}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          View Reports
        </Button>
      </div>

      {/* Data Table */}
      <Card className="border-border/50 bg-card/80 backdrop-blur">
        <CardHeader>
          <CardTitle>Database Items (Real-Time)</CardTitle>
          <CardDescription>Live data - changes appear instantly across all sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-muted-foreground">{item.description || 'No description'}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(item.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toast({ title: "View", description: `Viewing ${item.name}` })}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Dialog
                        open={isEditOpen && editingId === item.id}
                        onOpenChange={(open) => {
                          setIsEditOpen(open);
                          if (!open) setEditingId(null);
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => openEditDialog(item)}
                            disabled={role === "viewer" || !user}
                            className="h-8 w-8 p-0"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Item</DialogTitle>
                            <DialogDescription>Update item - changes sync in real-time!</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Input
                                id="edit-description"
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleEdit}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(item.id, item.name)}
                        disabled={role !== "admin" || !user}
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
      {role !== "admin" && user && (
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

      {!user && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-4 flex items-start gap-3">
            <Lock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-blue-900 dark:text-blue-100">
                Sign In to Test Live Features
              </p>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Sign in with your account to test creating, editing, and deleting with real-time updates across all sessions.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
