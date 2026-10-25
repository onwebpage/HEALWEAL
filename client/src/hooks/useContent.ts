import { useQuery } from "@tanstack/react-query";
import type { ContentSection } from "@shared/schema";

export function useContent(page: string, section?: string) {
  return useQuery<ContentSection[]>({
    queryKey: section ? ["/api/content", page, section] : ["/api/content", page],
    queryFn: async () => {
      const params = new URLSearchParams({ page });
      if (section) params.append("section", section);
      
      const response = await fetch(`/api/content?${params}`);
      if (!response.ok) throw new Error("Failed to fetch content");
      return response.json();
    },
  });
}

export function useContentSection(page: string, section: string) {
  return useQuery<ContentSection>({
    queryKey: ["/api/content", page, section],
    queryFn: async () => {
      const response = await fetch(`/api/content/${page}/${section}`);
      if (!response.ok) throw new Error("Failed to fetch content");
      return response.json();
    },
  });
}
