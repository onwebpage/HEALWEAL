import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { SeoMetadata } from "@shared/schema";
import { Save, Search } from "lucide-react";

const pages = ["home", "about", "brands", "careers", "media", "contact", "privacy", "terms", "disclaimer"];

export const AdminSeoManagerPage = () => {
  const { toast } = useToast();

  const { data: allSeo, isLoading } = useQuery<SeoMetadata[]>({
    queryKey: ["/api/seo"],
    queryFn: async () => {
      const response = await fetch("/api/seo");
      if (!response.ok) throw new Error("Failed to fetch SEO metadata");
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<SeoMetadata> }) => {
      return await apiRequest("PUT", `/api/admin/seo/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      toast({
        title: "Success",
        description: "SEO metadata updated successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update SEO metadata",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<SeoMetadata, "id" | "updatedAt">) => {
      return await apiRequest("POST", "/api/admin/seo", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/seo"] });
      toast({
        title: "Success",
        description: "SEO metadata created successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create SEO metadata",
        variant: "destructive",
      });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="heading-seo-manager">
          SEO Manager
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage meta tags, titles, and descriptions for better search engine optimization
        </p>
      </div>

      <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="w-5 h-5" />
            SEO Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p><strong>Title:</strong> 50-60 characters, include primary keyword</p>
          <p><strong>Description:</strong> 150-160 characters, compelling summary with keywords</p>
          <p><strong>Keywords:</strong> 5-10 relevant keywords separated by commas</p>
          <p><strong>OG Image:</strong> 1200x630px for best social media sharing</p>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Loading SEO data...</div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {pages.map((page) => {
            const seoData = allSeo?.find((s) => s.page === page);
            return (
              <SeoCard
                key={page}
                page={page}
                seo={seoData}
                onCreate={createMutation.mutate}
                onUpdate={updateMutation.mutate}
                isProcessing={updateMutation.isPending || createMutation.isPending}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

function SeoCard({
  page,
  seo,
  onCreate,
  onUpdate,
  isProcessing,
}: {
  page: string;
  seo?: SeoMetadata;
  onCreate: (data: any) => void;
  onUpdate: (data: { id: string; data: Partial<SeoMetadata> }) => void;
  isProcessing: boolean;
}) {
  const [formData, setFormData] = useState({
    title: seo?.title || "",
    description: seo?.description || "",
    keywords: seo?.keywords || "",
    ogImage: seo?.ogImage || "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    if (seo) {
      onUpdate({ id: seo.id, data: formData });
    } else {
      onCreate({ page, ...formData });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (seo) {
      setFormData({
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords || "",
        ogImage: seo.ogImage || "",
      });
    }
    setIsEditing(false);
  };

  const hasChanges =
    formData.title !== (seo?.title || "") ||
    formData.description !== (seo?.description || "") ||
    formData.keywords !== (seo?.keywords || "") ||
    formData.ogImage !== (seo?.ogImage || "");

  return (
    <Card data-testid={`card-seo-${page}`}>
      <CardHeader>
        <CardTitle className="capitalize">{page} Page</CardTitle>
        <CardDescription>
          SEO metadata for the {page} page
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`title-${page}`}>Page Title</Label>
          <Input
            id={`title-${page}`}
            value={formData.title}
            onChange={(e) => {
              setFormData({ ...formData, title: e.target.value });
              setIsEditing(true);
            }}
            placeholder="Enter page title (50-60 characters)"
            maxLength={60}
            data-testid={`input-title-${page}`}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {formData.title.length}/60 characters
          </div>
        </div>

        <div>
          <Label htmlFor={`description-${page}`}>Meta Description</Label>
          <Textarea
            id={`description-${page}`}
            value={formData.description}
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
              setIsEditing(true);
            }}
            placeholder="Enter meta description (150-160 characters)"
            maxLength={160}
            rows={3}
            data-testid={`input-description-${page}`}
          />
          <div className="text-xs text-muted-foreground mt-1">
            {formData.description.length}/160 characters
          </div>
        </div>

        <div>
          <Label htmlFor={`keywords-${page}`}>Keywords (comma-separated)</Label>
          <Input
            id={`keywords-${page}`}
            value={formData.keywords}
            onChange={(e) => {
              setFormData({ ...formData, keywords: e.target.value });
              setIsEditing(true);
            }}
            placeholder="keyword1, keyword2, keyword3"
            data-testid={`input-keywords-${page}`}
          />
        </div>

        <div>
          <Label htmlFor={`ogImage-${page}`}>Open Graph Image URL</Label>
          <Input
            id={`ogImage-${page}`}
            value={formData.ogImage}
            onChange={(e) => {
              setFormData({ ...formData, ogImage: e.target.value });
              setIsEditing(true);
            }}
            placeholder="/images/og-image.jpg"
            data-testid={`input-ogimage-${page}`}
          />
        </div>

        {(isEditing || !seo) && hasChanges && (
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isProcessing}
              data-testid={`button-save-${page}`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isProcessing ? "Saving..." : seo ? "Update" : "Create"}
            </Button>
            {seo && (
              <Button
                variant="outline"
                onClick={handleCancel}
                data-testid={`button-cancel-${page}`}
              >
                Cancel
              </Button>
            )}
          </div>
        )}

        {seo && (
          <div className="text-xs text-muted-foreground border-t pt-3">
            Last updated: {new Date(seo.updatedAt).toLocaleString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
