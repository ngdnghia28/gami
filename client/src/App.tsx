import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Calendar from "@/pages/calendar";
import Astrology from "@/pages/astrology";
import Zodiac from "@/pages/zodiac";
import Numerology from "@/pages/numerology";
import Blog from "@/pages/blog";
import BlogPost from "@/pages/blog-post";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pb-20 md:pb-0">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/astrology" component={Astrology} />
          <Route path="/zodiac" component={Zodiac} />
          <Route path="/numerology" component={Numerology} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={BlogPost} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
