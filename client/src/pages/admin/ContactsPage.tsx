import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { ContactSubmission } from "@shared/schema";
import { Mail, Trash2, Check, X, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AdminContactsPage = () => {
  const { toast } = useToast();
  const [selectedContact, setSelectedContact] = useState<ContactSubmission | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | undefined>(undefined);

  const { data: contacts, isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["/api/admin/contacts", statusFilter],
    queryFn: async () => {
      const url = statusFilter
        ? `/api/admin/contacts?status=${statusFilter}`
        : "/api/admin/contacts";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch contacts");
      return response.json();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PUT", `/api/admin/contacts/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({
        title: "Success",
        description: "Contact status updated",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update contact",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/admin/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contacts"] });
      toast({
        title: "Success",
        description: "Contact deleted",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete contact",
        variant: "destructive",
      });
    },
  });

  const handleView = (contact: ContactSubmission) => {
    setSelectedContact(contact);
    setShowDetailDialog(true);
    
    if (contact.status === "new") {
      updateMutation.mutate({ id: contact.id, status: "read" });
    }
  };

  const handleMarkAsResolved = (id: string) => {
    updateMutation.mutate({ id, status: "resolved" });
  };

  const handleMarkAsNew = (id: string) => {
    updateMutation.mutate({ id, status: "new" });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the message from "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="default">New</Badge>;
      case "read":
        return <Badge variant="secondary">Read</Badge>;
      case "resolved":
        return <Badge variant="outline">Resolved</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground" data-testid="heading-contacts">
          Contact Submissions
        </h1>
        <p className="text-muted-foreground mt-2">
          View and manage messages from your contact form
        </p>
      </div>

      <Tabs value={statusFilter || "all"} onValueChange={(v) => setStatusFilter(v === "all" ? undefined : v)}>
        <TabsList>
          <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
          <TabsTrigger value="new" data-testid="tab-new">New</TabsTrigger>
          <TabsTrigger value="read" data-testid="tab-read">Read</TabsTrigger>
          <TabsTrigger value="resolved" data-testid="tab-resolved">Resolved</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter || "all"} className="mt-6">
          {isLoading ? (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">Loading contacts...</div>
              </CardContent>
            </Card>
          ) : contacts && contacts.length > 0 ? (
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <Card
                  key={contact.id}
                  className="hover-elevate cursor-pointer"
                  onClick={() => handleView(contact)}
                  data-testid={`card-contact-${contact.id}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <Mail className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <CardTitle className="text-lg">{contact.name}</CardTitle>
                          {getStatusBadge(contact.status)}
                        </div>
                        <CardDescription className="mt-1">{contact.email}</CardDescription>
                        {contact.subject && (
                          <p className="text-sm font-medium mt-2">{contact.subject}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {contact.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(contact.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleView(contact)}
                        data-testid={`button-view-${contact.id}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      {contact.status !== "resolved" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMarkAsResolved(contact.id)}
                          data-testid={`button-resolve-${contact.id}`}
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                      )}
                      {contact.status === "resolved" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleMarkAsNew(contact.id)}
                          data-testid={`button-unresolve-${contact.id}`}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(contact.id, contact.name)}
                        disabled={deleteMutation.isPending}
                        data-testid={`button-delete-${contact.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-muted-foreground">
                  No contact submissions found
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Message from {selectedContact.name}
                  {getStatusBadge(selectedContact.status)}
                </DialogTitle>
                <DialogDescription>
                  Received on {new Date(selectedContact.createdAt).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm">{selectedContact.email}</p>
                </div>
                {selectedContact.subject && (
                  <div>
                    <Label className="text-sm font-medium">Subject</Label>
                    <p className="text-sm">{selectedContact.subject}</p>
                  </div>
                )}
                <div>
                  <Label className="text-sm font-medium">Message</Label>
                  <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>
              <DialogFooter className="gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDetailDialog(false)}
                  data-testid="button-close-detail"
                >
                  Close
                </Button>
                {selectedContact.status !== "resolved" && (
                  <Button
                    onClick={() => {
                      handleMarkAsResolved(selectedContact.id);
                      setShowDetailDialog(false);
                    }}
                    data-testid="button-resolve-detail"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Mark as Resolved
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`font-semibold ${className || ""}`}>{children}</div>;
}
