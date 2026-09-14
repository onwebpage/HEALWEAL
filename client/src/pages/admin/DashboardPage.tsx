import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Image, Globe, Settings, Search, Users, Mail, Activity, UserCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

interface Stats {
  totalUsers: number;
  totalContent: number;
  totalMedia: number;
  totalSettings: number;
  totalContacts: number;
  newContacts: number;
}

export const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useQuery<Stats>({
    queryKey: ["/api/admin/stats"],
    queryFn: async () => {
      const response = await fetch("/api/admin/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="heading-dashboard">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your website content, media, and system settings
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-content">
              {isLoading ? "..." : stats?.totalContent || 0}
            </div>
            <p className="text-xs text-muted-foreground">Content sections</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Assets</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-media">
              {isLoading ? "..." : stats?.totalMedia || 0}
            </div>
            <p className="text-xs text-muted-foreground">Images and files</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-users">
              {isLoading ? "..." : stats?.totalUsers || 0}
            </div>
            <p className="text-xs text-muted-foreground">Active accounts</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contact Messages</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-contacts">
              {isLoading ? "..." : stats?.totalContacts || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats?.newContacts ? `${stats.newContacts} new` : "All read"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Manager</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Edit text content across all pages
            </CardDescription>
            <Link href="/admin/content">
              <Button variant="outline" size="sm" data-testid="button-goto-content">
                Manage Content
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Manager</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Upload and manage images and logos
            </CardDescription>
            <Link href="/admin/media">
              <Button variant="outline" size="sm" data-testid="button-goto-media">
                Manage Media
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <UserCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Manage leadership and team on About page
            </CardDescription>
            <Link href="/admin/team">
              <Button variant="outline" size="sm" data-testid="button-goto-team">
                Manage Team
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">SEO Manager</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Optimize meta tags and descriptions
            </CardDescription>
            <Link href="/admin/seo">
              <Button variant="outline" size="sm" data-testid="button-goto-seo">
                Manage SEO
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Settings</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Configure global site settings
            </CardDescription>
            <Link href="/admin/settings">
              <Button variant="outline" size="sm" data-testid="button-goto-settings">
                View Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Management</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              Manage admin users and permissions
            </CardDescription>
            <Link href="/admin/users">
              <Button variant="outline" size="sm" data-testid="button-goto-users">
                Manage Users
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Public Website</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardDescription className="mb-4">
              View the live public website
            </CardDescription>
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-goto-website">
                View Website
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>• Use <strong>Content Manager</strong> to edit text content on all pages</p>
          <p>• Use <strong>Media Manager</strong> to upload and replace images and logos</p>
          <p>• Use <strong>Team Members</strong> to manage leadership and team displayed on the About page</p>
          <p>• Use <strong>SEO Manager</strong> to optimize your pages for search engines</p>
          <p>• Use <strong>Site Settings</strong> to configure contact information and social links</p>
          <p>• Use <strong>User Management</strong> to add or remove admin users</p>
          <p>• Check <strong>Contact Messages</strong> to respond to visitor inquiries</p>
          <p>• View <strong>Activity Log</strong> to track all admin actions</p>
        </CardContent>
      </Card>
    </div>
  );
};
