import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContentSection } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const pages = ["home", "about", "brands", "careers", "media", "contact"];

export const AdminContentManagerPage = () => {
  const { toast } = useToast();
  const [selectedPage, setSelectedPage] = useState("home");
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newSection, setNewSection] = useState({ section: "", content: "" });

  const { data: content, isLoading } = useQuery<ContentSection[]>({
    queryKey: ["/api/content", selectedPage],
    queryFn: async () => {
      const response = await fetch(`/api/content?page=${selectedPage}`);
      if (!response.ok) throw new Error("Failed to fetch content");
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string; content: string }) => {
      return await apiRequest("PUT", `/api/admin/content/${id}`, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: { page: string; section: string; content: string }) => {
      return await apiRequest("POST", "/api/admin/content", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setShowCreateDialog(false);
      setNewSection({ section: "", content: "" });
      toast({
        title: "Success",
        description: "Content section created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create content section",
        variant: "destructive",
      });
    },
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      setDeletingId(id);
      return await apiRequest("DELETE", `/api/admin/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      setDeletingId(null);
      toast({
        title: "Success",
        description: "Content section deleted successfully",
      });
    },
    onError: (error: any) => {
      setDeletingId(null);
      toast({
        title: "Error",
        description: error.message || "Failed to delete content section",
        variant: "destructive",
      });
    },
  });

  const handleUpdate = (id: string, content: string) => {
    updateMutation.mutate({ id, content });
  };

  const handleCreate = () => {
    if (!newSection.section || !newSection.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    createMutation.mutate({
      page: selectedPage,
      section: newSection.section,
      content: newSection.content,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this content section?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-content-manager">
            Content Manager
          </h1>
          <p className="text-muted-foreground mt-2">
            Edit text content across all pages of your website
          </p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-content">
              <Plus className="w-4 h-4 mr-2" />
              Add Content Section
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Content Section</DialogTitle>
              <DialogDescription>
                Add a new content section to the {selectedPage} page
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="section-name">Section Name</Label>
                <Input
                  id="section-name"
                  placeholder="e.g., hero_title, about_description"
                  value={newSection.section}
                  onChange={(e) => setNewSection({ ...newSection, section: e.target.value })}
                  data-testid="input-section-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section-content">Content</Label>
                <Textarea
                  id="section-content"
                  placeholder="Enter content text"
                  value={newSection.content}
                  onChange={(e) => setNewSection({ ...newSection, content: e.target.value })}
                  rows={4}
                  data-testid="textarea-section-content"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowCreateDialog(false)}
                data-testid="button-cancel-create"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={createMutation.isPending}
                data-testid="button-confirm-create"
              >
                {createMutation.isPending ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs value={selectedPage} onValueChange={setSelectedPage}>
        <TabsList className="grid grid-cols-6 w-full">
          {pages.map((page) => (
            <TabsTrigger
              key={page}
              value={page}
              className="capitalize"
              data-testid={`tab-${page}`}
            >
              {page}
            </TabsTrigger>
          ))}
        </TabsList>

        {pages.map((page) => (
          <TabsContent key={page} value={page} className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading content...
              </div>
            ) : content && content.length > 0 ? (
              <div className="grid gap-4">
                {content.map((item) => (
                  <ContentEditor
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                    isUpdating={updateMutation.isPending}
                    isDeleting={deletingId === item.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No content found for this page
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface ContentEditorProps {
  item: ContentSection;
  onUpdate: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

function ContentEditor({ item, onUpdate, onDelete, isUpdating, isDeleting }: ContentEditorProps) {
  const [value, setValue] = useState(item.content);
  const [hasChanges, setHasChanges] = useState(false);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    setHasChanges(newValue !== item.content);
  };

  const handleSave = () => {
    onUpdate(item.id, value);
    setHasChanges(false);
  };

  const handleReset = () => {
    setValue(item.content);
    setHasChanges(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
        <div>
          <CardTitle className="text-lg capitalize">
            {item.section.replace(/_/g, " ")}
          </CardTitle>
          <CardDescription>
            Page: {item.page} • Section: {item.section}
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          disabled={isDeleting}
          data-testid={`button-delete-${item.section}`}
          className="shrink-0"
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`content-${item.id}`}>Content</Label>
          <Textarea
            id={`content-${item.id}`}
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            rows={4}
            className="font-mono text-sm"
            data-testid={`textarea-${item.section}`}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUpdating}
            data-testid={`button-save-${item.section}`}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
          {hasChanges && (
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isUpdating}
              data-testid={`button-reset-${item.section}`}
            >
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
