import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { MediaAsset } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X } from "lucide-react";

const categories = ["logo", "image", "icon"];

export const AdminMediaManagerPage = () => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("logo");

  const { data: media, isLoading } = useQuery<MediaAsset[]>({
    queryKey: ["/api/media", selectedCategory],
    queryFn: async () => {
      const response = await fetch(`/api/media?category=${selectedCategory}`);
      if (!response.ok) throw new Error("Failed to fetch media");
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, url, altText }: { id: string; url: string; altText?: string }) => {
      return await apiRequest("PUT", `/api/admin/media/${id}`, { url, altText });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({
        title: "Success",
        description: "Media updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update media",
        variant: "destructive",
      });
    },
  });

  const handleUpdate = (id: string, url: string, altText?: string) => {
    updateMutation.mutate({ id, url, altText });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="heading-media-manager">
          Media Manager
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage images and logos across your website
        </p>
      </div>

      <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg">How to Update Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>1. Drag and drop your new image onto the upload area or click to browse</p>
          <p>2. The image will be automatically uploaded to the server</p>
          <p>3. Update the alt text for accessibility</p>
          <p>4. Click Save Changes to update the website</p>
        </CardContent>
      </Card>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="capitalize"
              data-testid={`tab-${category}`}
            >
              {category}s
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading media...
              </div>
            ) : media && media.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {media.map((item) => (
                  <MediaEditor
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdate}
                    isUpdating={updateMutation.isPending}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No media found in this category
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

interface MediaEditorProps {
  item: MediaAsset;
  onUpdate: (id: string, url: string, altText?: string) => void;
  isUpdating: boolean;
}

function MediaEditor({ item, onUpdate, isUpdating }: MediaEditorProps) {
  const { toast } = useToast();
  const [url, setUrl] = useState(item.url);
  const [altText, setAltText] = useState(item.altText || "");
  const [hasChanges, setHasChanges] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (newUrl: string, newAltText: string) => {
    setUrl(newUrl);
    setAltText(newAltText);
    setHasChanges(newUrl !== item.url || newAltText !== (item.altText || ""));
  };

  const handleSave = () => {
    onUpdate(item.id, url, altText);
    setHasChanges(false);
  };

  const handleReset = () => {
    setUrl(item.url);
    setAltText(item.altText || "");
    setHasChanges(false);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      let errorMessage = 'Upload failed';
      
      if (!response.ok) {
        try {
          const error = await response.json();
          errorMessage = error.error || errorMessage;
        } catch {
          errorMessage = `Upload failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      handleChange(data.url, altText);
      
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg capitalize">
          {item.key.replace(/_/g, " ")}
        </CardTitle>
        <CardDescription>Category: {item.category}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="aspect-video bg-muted rounded-md flex items-center justify-center overflow-hidden">
          <img
            src={url}
            alt={altText || item.key}
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
        </div>

        <div
          className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
            isDragging
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <input
            type="file"
            id={`file-${item.id}`}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={isUploading}
          />
          <label
            htmlFor={`file-${item.id}`}
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div className="text-sm">
              <span className="font-medium text-primary">Click to upload</span>
              {' '}or drag and drop
            </div>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF, WebP or SVG (max. 5MB)
            </p>
          </label>
          {isUploading && (
            <p className="text-sm text-muted-foreground mt-2">Uploading...</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`alt-${item.id}`}>Alt Text</Label>
          <Input
            id={`alt-${item.id}`}
            value={altText}
            onChange={(e) => handleChange(url, e.target.value)}
            placeholder="Descriptive text for accessibility"
            data-testid={`input-alt-${item.key}`}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleSave}
            disabled={!hasChanges || isUpdating || isUploading}
            data-testid={`button-save-${item.key}`}
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </Button>
          {hasChanges && (
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={isUpdating || isUploading}
              data-testid={`button-reset-${item.key}`}
            >
              Reset
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
