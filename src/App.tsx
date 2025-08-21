
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { AuthLayout } from "@/components/AuthLayout";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DatabaseConnections from "./pages/admin/DatabaseConnections";
import ApiKeys from "./pages/admin/ApiKeys";
import Users from "./pages/admin/Users";
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
      <div className="min-h-screen w-full">
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route element={<AuthLayout />}>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/signup" element={<SignupPage />} />
              </Route>

              {/* Protected routes */}
              <Route element={<AuthLayout protected withHeader />}>
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
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
