
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { LogOut, Database, LineChart, User, Shield, Key, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

type AppShellProps = {
  children: ReactNode;
  userType: "admin" | "user";
};

export default function AppShell({ children, userType }: AppShellProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed"; 
  const location = useLocation();
  const currentPath = location.pathname;

  const isAdmin = userType === "admin";

  const adminLinks = [
    { title: "Dashboard", url: "/admin", icon: Shield },
    { title: "Database Connections", url: "/admin/connections", icon: Database },
    { title: "API Keys", url: "/admin/api-keys", icon: Key },
    { title: "Users", url: "/admin/users", icon: User },
  ];

  const userLinks = [
    { title: "Dashboard", url: "/dashboard", icon: LineChart },
    { title: "Schema Explorer", url: "/dashboard/schema", icon: Database },
    { title: "Schema Validation", url: "/dashboard/validation", icon: ShieldCheck },
    { title: "EDA Analysis", url: "/dashboard/eda", icon: LineChart },
    { title: "Relationship Analysis", url: "/dashboard/relationships", icon: LineChart },
    { title: "AskVault", url: "/dashboard/askvault", icon: Database },
  ];

  const links = isAdmin ? adminLinks : userLinks;
  const basePath = isAdmin ? "/admin" : "/dashboard";

  const isActive = (url: string) => currentPath === url;
  const getNavCls = (url: string) =>
    isActive(url)
      ? "nav-link nav-link-active"
      : "nav-link nav-link-inactive";

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen w-full bg-background">
      <Sidebar
        className={`${
          collapsed ? "w-16" : "w-64"
        } flex-shrink-0 border-r transition-all duration-300 ease-in-out`}
        collapsible="icon"
      >
        <div className="flex h-14 items-center border-b px-4">
          {!collapsed && (
            <div className="font-bold text-lg text-primary mr-2">DATA MIGRATOR</div>
          )}
          <SidebarTrigger className="ml-auto" />
        </div>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>

            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link) => (
                  <SidebarMenuItem key={link.url}>
                    <SidebarMenuButton asChild>
                      <Link to={link.url} className={getNavCls(link.url)}>
                        <link.icon className="h-4 w-4" />
                        {!collapsed && <span>{link.title}</span>}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <div className="mt-auto p-4">
            <Button
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Logout</span>}
            </Button>
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-14 border-b flex items-center px-4 bg-card">
          <div className="text-xl font-bold">
            {isAdmin ? "Admin Panel" : "Data Analytics"}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="text-sm font-medium">John Doe</div>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              {isAdmin ? "A" : "U"}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
