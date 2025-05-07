import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import AppFrame from "@/components/layout/AppFrame";
import Dashboard from "@/pages/dashboard";
import Emails from "@/pages/emails";
import SMS from "@/pages/sms";
import Social from "@/pages/social";
import Popups from "@/pages/popups";
import Settings from "@/pages/settings";
import SettingsUsers from "@/pages/settings/users";
import SettingsSubscription from "@/pages/settings/subscription";
import Analytics from "@/pages/analytics";
import SEO from "@/pages/seo";
import AI from "@/pages/ai";
import Campaigns from "@/pages/campaigns";
import Home from "@/pages/home";
import { Suspense } from "react";

// Loading component with gradient
const PageLoader = () => (
  <div className="flex items-center justify-center h-screen bg-gray-50">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>
);

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app/emails" component={Emails} />
        <Route path="/app/social" component={Social} />
        <Route path="/app/popups" component={Popups} />
        <Route path="/app/settings" component={Settings} />
        <Route path="/app/settings/users" component={SettingsUsers} />
        <Route path="/app/settings/subscription" component={SettingsSubscription} />
        <Route path="/app/analytics" component={Analytics} />
        <Route path="/app/seo" component={SEO} />
        <Route path="/app/ai" component={AI} />
        <Route path="/app/campaigns" component={Campaigns} />
        
        {/* Fallback to 404 for app routes */}
        <Route path="/app/:rest*">
          {() => <NotFound />}
        </Route>
      </Switch>
    </Suspense>
  );
}

function Router() {
  const [location] = useLocation();
  
  // If the path starts with /app, use the AppFrame layout
  const isAppRoute = location.startsWith('/app');
  const isCallback = location.startsWith('/callback');
  
  if (isAppRoute) {
    return (
      <AppFrame>
        <AppRoutes />
      </AppFrame>
    );
  }
  
  // Non-app routes (public pages)
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/callback" component={Home} />
        
        {/* Redirect to home for any unknown public route */}
        <Route path="/:rest*">
          {() => {
            window.location.href = "/";
            return <PageLoader />;
          }}
        </Route>
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
