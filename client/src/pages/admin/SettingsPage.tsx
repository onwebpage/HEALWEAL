import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SiteSetting } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Save } from "lucide-react";
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

const categories = ["general", "contact", "social"];

export const AdminSettingsPage = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSetting, setNewSetting] = useState({ key: "", value: "", category: "general" });

  const { data: settings, isLoading } = useQuery<SiteSetting[]>({
    queryKey: ["/api/settings", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/settings?category=${selectedCategory}`);
      if (!response.ok) throw new Error("Failed to fetch settings");
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      return await apiRequest("PUT", `/api/admin/settings/${id}`, { value });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Setting updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update setting",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { key: string; value: string; category: string }) => {
      return await apiRequest("POST", "/api/admin/settings", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      setShowCreateDialog(false);
      setNewSetting({ key: "", value: "", category: "general" });
      toast({
        title: "Success",
        description: "Setting created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create setting",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/settings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/settings"] });
      toast({
        title: "Success",
        description: "Setting deleted successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete setting",
        variant: "destructive",
      });
    },
  });

  const handleUpdate = (id: string, value: string) => {
    updateMutation.mutate({ id, value });
  };

  const handleCreate = () => {
    if (!newSetting.key || !newSetting.value) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate(newSetting);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this setting?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-settings">
            Site Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage global site settings and configuration
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-setting">
              <Plus className="w-4 h-4 mr-2" />
              Add Setting
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Setting</DialogTitle>
              <DialogDescription>
                Add a new configuration setting to your site
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key">Setting Key</Label>
                <Input
                  id="key"
                  value={newSetting.key}
                  onChange={(e) => setNewSetting({ ...newSetting, key: e.target.value })}
                  placeholder="e.g., site_name"
                  data-testid="input-new-key"
                />
              </div>
              <div>
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  value={newSetting.value}
                  onChange={(e) => setNewSetting({ ...newSetting, value: e.target.value })}
                  placeholder="e.g., My Website"
                  data-testid="input-new-value"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newSetting.category}
                  onValueChange={(value) => setNewSetting({ ...newSetting, category: value })}
                >
                  <SelectTrigger id="category" data-testid="select-new-category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)} data-testid="button-cancel-new">
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={createMutation.isPending} data-testid="button-create-setting">
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} data-testid={`tab-${cat}`}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat} value={cat} className="space-y-4 mt-6">
            {isLoading ? (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">Loading settings...</div>
                </CardContent>
              </Card>
            ) : settings && settings.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {settings.map((setting) => (
                  <SettingCard
                    key={setting.id}
                    setting={setting}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    isUpdating={updateMutation.isPending}
                    isDeleting={deleteMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <div className="text-center text-muted-foreground">
                    No settings found in this category
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

function SettingCard({
  setting,
  onUpdate,
  onDelete,
  isUpdating,
  isDeleting,
}: {
  setting: SiteSetting;
  onUpdate: (id: string, value: string) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}) {
  const [value, setValue] = useState(setting.value);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (value !== setting.value) {
      onUpdate(setting.id, value);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setValue(setting.value);
    setIsEditing(false);
  };

  return (
    <Card data-testid={`card-setting-${setting.key}`}>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{setting.key}</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(setting.id)}
          disabled={isDeleting}
          data-testid={`button-delete-${setting.key}`}
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <Label htmlFor={`value-${setting.id}`}>Value</Label>
          <Input
            id={`value-${setting.id}`}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setIsEditing(true);
            }}
            data-testid={`input-${setting.key}`}
          />
        </div>
        {isEditing && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isUpdating}
              data-testid={`button-save-${setting.key}`}
            >
              <Save className="w-3 h-3 mr-1" />
              {isUpdating ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              data-testid={`button-cancel-${setting.key}`}
            >
              Cancel
            </Button>
          </div>
        )}
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date(setting.updatedAt).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
}
