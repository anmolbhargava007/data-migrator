
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// Auth pages
import Login from "./pages/Login";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DatabaseConnections from "./pages/admin/DatabaseConnections";
import ApiKeys from "./pages/admin/ApiKeys";
import Users from "./pages/admin/Users";

// User pages
import Dashboard from "./pages/user/Dashboard";
import SchemaExplorer from "./pages/user/SchemaExplorer";
import SchemaValidation from "./pages/user/SchemaValidation";
import EdaAnalysis from "./pages/user/EdaAnalysis";
import RelationshipAnalysis from "./pages/user/RelationshipAnalysis";
import AskVault from "./pages/user/AskVault";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/connections" element={<DatabaseConnections />} />
            <Route path="/admin/api-keys" element={<ApiKeys />} />
            <Route path="/admin/users" element={<Users />} />

            {/* User Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/schema" element={<SchemaExplorer />} />
            <Route path="/dashboard/validation" element={<SchemaValidation />} />
            <Route path="/dashboard/eda" element={<EdaAnalysis />} />
            <Route path="/dashboard/relationships" element={<RelationshipAnalysis />} />
            <Route path="/dashboard/askvault" element={<AskVault />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
