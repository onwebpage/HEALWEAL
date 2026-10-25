import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { TeamMember } from "@shared/schema";
import { Plus, Trash2, Edit, Users, User, Upload } from "lucide-react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const TEAM_CATEGORIES = [
  { value: "leadership", label: "Leadership Team" },
  { value: "management", label: "Management Team" },
  { value: "advisory", label: "Advisory Board" },
];

interface TeamMemberForm {
  name: string;
  role: string;
  imageUrl: string;
  category: string;
  displayOrder: number;
}

const emptyForm: TeamMemberForm = {
  name: "",
  role: "",
  imageUrl: "",
  category: "leadership",
  displayOrder: 0,
};

export const AdminTeamManagementPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("leadership");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<TeamMemberForm>(emptyForm);
  const [editMember, setEditMember] = useState<TeamMemberForm>(emptyForm);
  const [isUploading, setIsUploading] = useState(false);

  const { data: members, isLoading } = useQuery<TeamMember[]>({
    queryKey: ["/api/admin/team"],
    queryFn: async () => {
      const response = await fetch("/api/admin/team");
      if (!response.ok) throw new Error("Failed to fetch team members");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: TeamMemberForm) => {
      return await apiRequest("POST", "/api/admin/team", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      setShowCreateDialog(false);
      setNewMember({ ...emptyForm, category: activeTab });
      toast({
        title: "Success",
        description: "Team member added successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add team member",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<TeamMemberForm> }) => {
      return await apiRequest("PUT", `/api/admin/team/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      setShowEditDialog(false);
      setSelectedMember(null);
      toast({
        title: "Success",
        description: "Team member updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update team member",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/team"] });
      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete team member",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageUrl: (url: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const result = await response.json();
      setImageUrl(result.url);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreate = () => {
    if (!newMember.name || !newMember.role) {
      toast({
        title: "Error",
        description: "Please fill in name and role",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(newMember);
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setEditMember({
      name: member.name,
      role: member.role,
      imageUrl: member.imageUrl || "",
      category: member.category,
      displayOrder: member.displayOrder,
    });
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    if (!selectedMember) return;
    updateMutation.mutate({ id: selectedMember.id, data: editMember });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const openCreateDialog = () => {
    setNewMember({ ...emptyForm, category: activeTab });
    setShowCreateDialog(true);
  };

  const filteredMembers = members?.filter((m) => m.category === activeTab) || [];

  const getCategoryLabel = (category: string) => {
    return TEAM_CATEGORIES.find((c) => c.value === category)?.label || category;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-team">
            Team Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage leadership, management, and other team members displayed on the About page
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} data-testid="button-add-member">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Team Member</DialogTitle>
              <DialogDescription>
                Add a new member to the team displayed on the About page
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newMember.name}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                  placeholder="Enter name"
                  data-testid="input-new-name"
                />
              </div>
              <div>
                <Label htmlFor="role">Role / Title</Label>
                <Input
                  id="role"
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                  placeholder="e.g., Chief Executive Officer (CEO)"
                  data-testid="input-new-role"
                />
              </div>
              <div>
                <Label htmlFor="category">Team Category</Label>
                <Select
                  value={newMember.category}
                  onValueChange={(value) => setNewMember({ ...newMember, category: value })}
                >
                  <SelectTrigger id="category" data-testid="select-new-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TEAM_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  value={newMember.displayOrder}
                  onChange={(e) => setNewMember({ ...newMember, displayOrder: parseInt(e.target.value) || 0 })}
                  placeholder="1"
                  data-testid="input-new-order"
                />
                <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first</p>
              </div>
              <div>
                <Label htmlFor="imageUrl">Profile Image</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="imageUrl"
                      value={newMember.imageUrl}
                      onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
                      placeholder="Enter image URL or upload"
                      className="flex-1"
                      data-testid="input-new-image"
                    />
                    <Label htmlFor="upload-new" className="cursor-pointer">
                      <Button type="button" variant="outline" size="icon" disabled={isUploading} asChild>
                        <span>
                          <Upload className="w-4 h-4" />
                        </span>
                      </Button>
                    </Label>
                    <input
                      id="upload-new"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => setNewMember({ ...newMember, imageUrl: url }))
                      }
                    />
                  </div>
                  {newMember.imageUrl && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={newMember.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)} data-testid="button-cancel-new">
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={createMutation.isPending} data-testid="button-create-member">
                {createMutation.isPending ? "Adding..." : "Add Member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex-wrap">
          {TEAM_CATEGORIES.map((cat) => (
            <TabsTrigger key={cat.value} value={cat.value} data-testid={`tab-${cat.value}`}>
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TEAM_CATEGORIES.map((cat) => (
          <TabsContent key={cat.value} value={cat.value} className="mt-6">
            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">Loading team members...</div>
                </CardContent>
              </Card>
            ) : filteredMembers.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredMembers.map((member) => (
                  <Card key={member.id} data-testid={`card-member-${member.id}`}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <User className="w-8 h-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold truncate" data-testid={`text-member-name-${member.id}`}>
                            {member.name}
                          </h3>
                          <p className="text-sm text-muted-foreground truncate">{member.role}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              Order: {member.displayOrder}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(member)}
                            data-testid={`button-edit-${member.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(member.id, member.name)}
                            disabled={deleteMutation.isPending}
                            data-testid={`button-delete-${member.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No team members in this category</p>
                    <Button variant="link" onClick={openCreateDialog} className="mt-2">
                      Add a team member
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
            <DialogDescription>
              Update team member information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editMember.name}
                onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                placeholder="Enter name"
                data-testid="input-edit-name"
              />
            </div>
            <div>
              <Label htmlFor="edit-role">Role / Title</Label>
              <Input
                id="edit-role"
                value={editMember.role}
                onChange={(e) => setEditMember({ ...editMember, role: e.target.value })}
                placeholder="e.g., Chief Executive Officer (CEO)"
                data-testid="input-edit-role"
              />
            </div>
            <div>
              <Label htmlFor="edit-category">Team Category</Label>
              <Select
                value={editMember.category}
                onValueChange={(value) => setEditMember({ ...editMember, category: value })}
              >
                <SelectTrigger id="edit-category" data-testid="select-edit-category">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TEAM_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-displayOrder">Display Order</Label>
              <Input
                id="edit-displayOrder"
                type="number"
                value={editMember.displayOrder}
                onChange={(e) => setEditMember({ ...editMember, displayOrder: parseInt(e.target.value) || 0 })}
                placeholder="1"
                data-testid="input-edit-order"
              />
              <p className="text-xs text-muted-foreground mt-1">Lower numbers appear first</p>
            </div>
            <div>
              <Label htmlFor="edit-imageUrl">Profile Image</Label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <Input
                    id="edit-imageUrl"
                    value={editMember.imageUrl}
                    onChange={(e) => setEditMember({ ...editMember, imageUrl: e.target.value })}
                    placeholder="Enter image URL or upload"
                    className="flex-1"
                    data-testid="input-edit-image"
                  />
                  <Label htmlFor="upload-edit" className="cursor-pointer">
                    <Button type="button" variant="outline" size="icon" disabled={isUploading} asChild>
                      <span>
                        <Upload className="w-4 h-4" />
                      </span>
                    </Button>
                  </Label>
                  <input
                    id="upload-edit"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(e, (url) => setEditMember({ ...editMember, imageUrl: url }))
                    }
                  />
                </div>
                {editMember.imageUrl && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={editMember.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)} data-testid="button-cancel-edit">
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={updateMutation.isPending} data-testid="button-update-member">
              {updateMutation.isPending ? "Updating..." : "Update Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
