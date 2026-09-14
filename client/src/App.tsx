import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import NotFound from "@/pages/not-found";

import { HomePage } from "@/pages/HomePage";
import { AboutPage } from "@/pages/AboutPage";
import { CompaniesPage } from "@/pages/CompaniesPage";
import { BrandsPage } from "@/pages/BrandsPage";
import { WhatWeDoPage } from "@/pages/WhatWeDoPage";
import { InnovationPage } from "@/pages/InnovationPage";
import { CareersPage } from "@/pages/CareersPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { MediaPage } from "@/pages/MediaPage";
import { BlogDetailPage } from "@/pages/BlogDetailPage";
import { ContactPage } from "@/pages/ContactPage";
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage";
import { TermsPage } from "@/pages/TermsPage";
import { DisclaimerPage } from "@/pages/DisclaimerPage";
import { CookieConsent } from "@/components/CookieConsent";

import { AdminLoginPage } from "@/pages/admin/LoginPage";
import { AdminDashboardPage } from "@/pages/admin/DashboardPage";
import { AdminContentManagerPage } from "@/pages/admin/ContentManagerPage";
import { AdminMediaManagerPage } from "@/pages/admin/MediaManagerPage";
import { AdminSettingsPage } from "@/pages/admin/SettingsPage";
import { AdminSeoManagerPage } from "@/pages/admin/SeoManagerPage";
import { AdminUserManagementPage } from "@/pages/admin/UserManagementPage";
import { AdminContactsPage } from "@/pages/admin/ContactsPage";
import { AdminActivityLogPage } from "@/pages/admin/ActivityLogPage";
import { AdminTeamManagementPage } from "@/pages/admin/TeamManagementPage";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useEffect } from "react";

function ProtectedAdminRoute({ component: Component }: { component: () => JSX.Element }) {
  const [, setLocation] = useLocation();
  
  const { data: session, isLoading } = useQuery({
    queryKey: ["/api/auth/session"],
    queryFn: async () => {
      const response = await fetch("/api/auth/session");
      if (!response.ok) throw new Error("Failed to check session");
      return response.json();
    },
  });

  useEffect(() => {
    if (!isLoading && (!session || !session.authenticated)) {
      setLocation("/admin/login");
    }
  }, [session, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session || !session.authenticated) {
    return null;
  }

  return <Component />;
}

function AdminLayout({ children }: { children: React.ReactNode }) {
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AdminSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center gap-2 p-4 border-b bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </header>
          <main className="flex-1 overflow-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function RouteHandler() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);

    // Dynamic Apple-level SEO Page Titles & Meta Descriptions
    let title = "Healweal | Building Businesses for a Better Future";
    let description = "Healweal is a multi-sector venture group building and scaling high-impact platforms in healthcare, fintech, digital intelligence, and commerce.";

    if (location === "/") {
      title = "Healweal | Building Businesses for a Better Future";
      description = "Healweal builds, operates and scales enduring businesses at the intersection of technology, entrepreneurship, and human needs.";
    } else if (location === "/about") {
      title = "About Healweal | Building Businesses That Matter";
      description = "Discover the story, core values, leadership, and institutional vision driving Healweal Corp.";
    } else if (location === "/companies" || location === "/brands") {
      title = "Our Companies | Healweal Portfolio";
      description = "Explore Healweal's operating companies across health, financial technology, consumer brands, and artificial intelligence.";
    } else if (location === "/what-we-do") {
      title = "What We Do | Healweal Operating Model";
      description = "From venture building and product engineering to corporate governance and capital scaling.";
    } else if (location === "/innovation") {
      title = "Healweal Innovation | Technology, AI & Business Building";
      description = "Building next-generation platforms powered by deep technology, modern distributed architecture, and human-first AI.";
    } else if (location === "/careers") {
      title = "Careers at Healweal | Build the Future With Us";
      description = "Join our mission-driven teams across software engineering, corporate strategy, clinical innovation, and design.";
    } else if (location === "/insights" || location === "/media") {
      title = "Insights & Perspectives | Healweal Group";
      description = "Strategic perspectives, technology reports, and executive commentary from Healweal leadership.";
    } else if (location.startsWith("/insights/") || location.startsWith("/media/blog/")) {
      title = "Publication | Healweal Insights";
    } else if (location === "/contact") {
      title = "Contact Us | Healweal Group";
      description = "Connect with Healweal leadership for institutional partnerships, venture opportunities, or media inquiries.";
    } else if (location === "/privacy-policy" || location === "/privacy") {
      title = "Privacy Policy | Healweal Corp";
      description = "Official Website Privacy Policy and Data Governance standards for Healweal Corp in compliance with the DPDP Act.";
    } else if (location === "/terms-of-use" || location === "/terms") {
      title = "Terms of Use | Healweal Corp";
      description = "Terms of Use governing access to the Healweal Corp corporate portal and digital assets.";
    } else if (location === "/disclaimer") {
      title = "Website Disclaimer | Healweal Corp";
      description = "Important legal disclaimers, healthcare & investment disclosures, and corporate notices for Healweal Corp.";
    } else if (location === "/cookie-policy") {
      title = "Cookie Policy & Transparency | Healweal Corp";
      description = "Transparency statement and cookie preferences governing Healweal digital properties.";
    }

    document.title = title;

    // Manage meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Manage canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://healwealcorp.in${location === "/" ? "" : location}`);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <RouteHandler />
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/companies" component={CompaniesPage} />
        <Route path="/brands" component={BrandsPage} />
        <Route path="/what-we-do" component={WhatWeDoPage} />
        <Route path="/innovation" component={InnovationPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/insights" component={InsightsPage} />
        <Route path="/insights/:id" component={BlogDetailPage} />
        <Route path="/media" component={MediaPage} />
        <Route path="/media/blog/:id" component={BlogDetailPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/privacy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-use" component={TermsPage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/disclaimer" component={DisclaimerPage} />
        <Route path="/cookie-policy" component={PrivacyPolicyPage} />
      
        <Route path="/admin">
          {() => {
            window.location.href = "/admin/login";
            return null;
          }}
        </Route>
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/dashboard">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminDashboardPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/content">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminContentManagerPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/media">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminMediaManagerPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/seo">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminSeoManagerPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/settings">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminSettingsPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/users">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminUserManagementPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/contacts">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminContactsPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/activity">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminActivityLogPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        <Route path="/admin/team">
          {() => (
            <ProtectedAdminRoute
              component={() => (
                <AdminLayout>
                  <AdminTeamManagementPage />
                </AdminLayout>
              )}
            />
          )}
        </Route>
        
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
