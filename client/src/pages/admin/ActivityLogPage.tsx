import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ActivityLog } from "@shared/schema";
import { Activity, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { queryClient } from "@/lib/queryClient";

export const AdminActivityLogPage = () => {
  const [limit, setLimit] = useState(50);

  const { data: logs, isLoading, refetch } = useQuery<ActivityLog[]>({
    queryKey: ["/api/admin/activity", limit],
    queryFn: async () => {
      const response = await fetch(`/api/admin/activity?limit=${limit}`);
      if (!response.ok) throw new Error("Failed to fetch activity logs");
      return response.json();
    },
  });

  const getActionBadge = (action: string) => {
    switch (action.toLowerCase()) {
      case "create":
        return <Badge variant="default" className="bg-green-500">Create</Badge>;
      case "update":
        return <Badge variant="default" className="bg-blue-500">Update</Badge>;
      case "delete":
        return <Badge variant="default" className="bg-red-500">Delete</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const getResourceIcon = (resource: string) => {
    return <Activity className="w-4 h-4 text-muted-foreground" />;
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["/api/admin/activity"] });
    refetch();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground" data-testid="heading-activity">
            Activity Log
          </h1>
          <p className="text-muted-foreground mt-2">
            Track all admin actions and system changes
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} data-testid="button-refresh">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {limit < 200 && (
            <Button variant="outline" onClick={() => setLimit(limit + 50)} data-testid="button-load-more">
              Load More
            </Button>
          )}
        </div>
      </div>

      <Card className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Activity Tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>This log tracks all administrative actions performed in the system.</p>
          <p className="text-muted-foreground">
            Showing the most recent {limit} activities. Actions are logged automatically.
          </p>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">Loading activity logs...</div>
          </CardContent>
        </Card>
      ) : logs && logs.length > 0 ? (
        <div className="space-y-3">
          {logs.map((log) => (
            <Card
              key={log.id}
              className="hover-elevate"
              data-testid={`card-activity-${log.id}`}
            >
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
                <div className="flex-shrink-0 mt-1">
                  {getResourceIcon(log.resource)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    {getActionBadge(log.action)}
                    <Badge variant="outline">{log.resource}</Badge>
                    <span className="text-sm font-medium text-foreground">
                      by {log.username}
                    </span>
                  </div>
                  {log.details && (
                    <p className="text-sm text-muted-foreground mt-1">{log.details}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-muted-foreground">No activity logs found</div>
          </CardContent>
        </Card>
      )}

      {logs && logs.length >= limit && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setLimit(limit + 50)} data-testid="button-load-more-bottom">
            Load More Activities
          </Button>
        </div>
      )}
    </div>
  );
};
