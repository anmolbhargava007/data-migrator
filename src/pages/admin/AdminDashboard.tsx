
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, PieChart, BarChart } from "recharts";
import AppShell from "@/components/layout/AppShell";

// Mock data for charts
const connectionData = [
  { name: "Jan", count: 4 },
  { name: "Feb", count: 7 },
  { name: "Mar", count: 5 },
  { name: "Apr", count: 10 },
  { name: "May", count: 12 },
  { name: "Jun", count: 18 },
];

const databaseTypeData = [
  { name: "PostgreSQL", value: 8 },
  { name: "MySQL", value: 5 },
  { name: "MongoDB", value: 4 },
  { name: "SQL Server", value: 3 },
];

const AdminDashboard = () => {
  return (
    <AppShell userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="text-sm text-muted-foreground">Last updated: May 13, 2025</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">20</CardTitle>
              <CardDescription>Total Connections</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">+5</span> from last month
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">4</CardTitle>
              <CardDescription>Database Types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <span className="database-badge database-badge-postgres">PostgreSQL</span>
                <span className="database-badge database-badge-mysql">MySQL</span>
                <span className="database-badge database-badge-mongodb">MongoDB</span>
                <span className="database-badge database-badge-sqlserver">SQL Server</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">12</CardTitle>
              <CardDescription>Active Users</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">+2</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="databases">Databases</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Connection Growth</CardTitle>
                  <CardDescription>Monthly connection additions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <LineChart
                      width={500}
                      height={300}
                      data={connectionData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      {/* LineChart implementation would go here */}
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        Connection growth chart visualization
                      </div>
                    </LineChart>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Database Types</CardTitle>
                  <CardDescription>Distribution by database type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PieChart width={500} height={300}>
                      {/* PieChart implementation would go here */}
                      <div className="flex h-full items-center justify-center text-muted-foreground">
                        Database distribution pie chart visualization
                      </div>
                    </PieChart>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">New Connection Added</p>
                      <p className="text-sm text-muted-foreground">PostgreSQL connection by Admin</p>
                    </div>
                    <div className="text-sm text-muted-foreground">10 mins ago</div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">User Login</p>
                      <p className="text-sm text-muted-foreground">john@example.com logged in</p>
                    </div>
                    <div className="text-sm text-muted-foreground">25 mins ago</div>
                  </div>
                  
                  <div className="flex justify-between items-center border-b pb-2">
                    <div>
                      <p className="font-medium">Schema Validation</p>
                      <p className="text-sm text-muted-foreground">Schema validated for CustomerDB</p>
                    </div>
                    <div className="text-sm text-muted-foreground">2 hours ago</div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">API Key Generated</p>
                      <p className="text-sm text-muted-foreground">New API key for Analytics service</p>
                    </div>
                    <div className="text-sm text-muted-foreground">5 hours ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage user access and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center text-muted-foreground">
                  User management table would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="databases" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Database Connections</CardTitle>
                <CardDescription>Overview of all connected databases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex h-40 items-center justify-center text-muted-foreground">
                  Database connections table would be displayed here
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
};

export default AdminDashboard;
