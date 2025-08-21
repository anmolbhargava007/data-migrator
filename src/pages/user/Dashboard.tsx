
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend, 
  ChartLegendContent 
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer 
} from "recharts";
import { Link } from "react-router-dom";

const tableSizeData = [
  { name: "Source System Positions", records: 15432, size: "43.2 MB" },
  { name: "Destination System Positions", records: 8765, size: "27.1 MB" },
  { name: "Instruments", records: 1245, size: "2.4 MB" },
  { name: "Prices", records: 45721, size: "50.8 MB" },
  { name: "Trade Reconciliation", records: 12890, size: "28.5 MB" },
  { name: "Risk Limits", records: 892, size: "1.8 MB" },
  { name: "Margin Requirements", records: 2156, size: "4.3 MB" },
];

const dataTypeDistribution = [
  { name: "Numeric", value: 45, color: "#0088FE" },
  { name: "Text", value: 25, color: "#00C49F" },
  { name: "Date/Time", value: 15, color: "#FFBB28" },
  { name: "Boolean", value: 10, color: "#FF8042" },
  { name: "Decimal", value: 5, color: "#8884d8" },
];

const reconciliationTrends = [
  { month: "Jan", matched: 89, unmatched: 11, breaks: 5 },
  { month: "Feb", matched: 92, unmatched: 8, breaks: 3 },
  { month: "Mar", matched: 88, unmatched: 12, breaks: 7 },
  { month: "Apr", matched: 94, unmatched: 6, breaks: 2 },
  { month: "May", matched: 91, unmatched: 9, breaks: 4 },
  { month: "Jun", matched: 96, unmatched: 4, breaks: 1 },
];

const positionsByInstrument = [
  { instrument: "Wheat Futures", positions: 2840, value: 28400000 },
  { instrument: "Corn Futures", positions: 1950, value: 19500000 },
  { instrument: "Soybean Futures", positions: 1620, value: 16200000 },
  { instrument: "Oil Futures", positions: 1430, value: 14300000 },
  { instrument: "Gold Futures", positions: 890, value: 8900000 },
];

const chartConfig = {
  records: {
    label: "Records",
    color: "#2563eb",
  },
  matched: {
    label: "Matched",
    color: "#10b981",
  },
  unmatched: {
    label: "Unmatched", 
    color: "#f59e0b",
  },
  breaks: {
    label: "Breaks",
    color: "#ef4444",
  },
  positions: {
    label: "Positions",
    color: "#8b5cf6",
  },
};

const Dashboard = () => {
  return (
    <AppShell userType="user">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Trading Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your trading system reconciliation insights
            </p>
          </div>
          <Button asChild>
            <Link to="/dashboard/askvault">Ask Vault AI</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">7</CardTitle>
              <CardDescription>Active Tables</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Across trading and reconciliation systems
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">86,289</CardTitle>
              <CardDescription>Total Positions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">96%</span> reconciliation rate
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">1,245</CardTitle>
              <CardDescription>Active Instruments</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="text-amber-600">15</span> expiring this month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">96%</CardTitle>
              <CardDescription>Data Quality Score</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                <span className="text-green-600">+4%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reconciliation">Reconciliation</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Table Size Distribution</CardTitle>
                  <CardDescription>Records per table in the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <BarChart data={tableSizeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 12 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="records" fill="var(--color-records)" />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data Types Distribution</CardTitle>
                  <CardDescription>Field type breakdown across tables</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-80">
                    <PieChart>
                      <Pie
                        data={dataTypeDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {dataTypeDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Trading Activity</CardTitle>
                  <CardDescription>Latest reconciliation and trading operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Position Reconciliation</p>
                        <p className="text-sm text-muted-foreground">
                          Completed for Wheat futures - 2,840 positions matched
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">15 mins ago</div>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Price Update</p>
                        <p className="text-sm text-muted-foreground">
                          Settlement prices updated for 1,245 instruments
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">1 hour ago</div>
                    </div>

                    <div className="flex justify-between items-center border-b pb-2">
                      <div>
                        <p className="font-medium">Risk Limit Check</p>
                        <p className="text-sm text-muted-foreground">
                          All positions within risk limits - no breaches detected
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">2 hours ago</div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">AskVault Query</p>
                        <p className="text-sm text-muted-foreground">
                          "Show me unmatched positions by instrument type"
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">3 hours ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reconciliation" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Reconciliation Trends</CardTitle>
                <CardDescription>Monthly reconciliation performance and break analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={reconciliationTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line type="monotone" dataKey="matched" stroke="var(--color-matched)" name="Matched %" />
                    <Line type="monotone" dataKey="unmatched" stroke="var(--color-unmatched)" name="Unmatched %" />
                    <Line type="monotone" dataKey="breaks" stroke="var(--color-breaks)" name="Breaks %" />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="positions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Positions by Instrument Type</CardTitle>
                <CardDescription>Position count and market value breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <BarChart data={positionsByInstrument}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="instrument" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="positions" fill="var(--color-positions)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="col-span-1 md:col-span-2 lg:col-span-2 data-card hover:scale-[1.01] transition-all">
            <Link to="/dashboard/schema">
              <CardHeader>
                <CardTitle>Schema Explorer</CardTitle>
                <CardDescription>Visualize and navigate your database structure</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Explore tables, columns, and their relationships in an
                  interactive interface.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="data-card hover:scale-[1.01] transition-all">
            <Link to="/dashboard/validation">
              <CardHeader>
                <CardTitle>Schema Validation</CardTitle>
                <CardDescription>Ensure data integrity</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Validate your schema against best practices and custom rules.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="data-card hover:scale-[1.01] transition-all">
            <Link to="/dashboard/eda">
              <CardHeader>
                <CardTitle>EDA Analysis</CardTitle>
                <CardDescription>Discover data insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Perform exploratory data analysis to uncover patterns.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="data-card hover:scale-[1.01] transition-all">
            <Link to="/dashboard/relationships">
              <CardHeader>
                <CardTitle>Relationship Analysis</CardTitle>
                <CardDescription>Discover connections</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Identify and visualize relationships between data entities.
                </p>
              </CardContent>
            </Link>
          </Card>

          <Card className="col-span-1 md:col-span-2 lg:col-span-2 data-card hover:scale-[1.01] transition-all">
            <Link to="/dashboard/askvault">
              <CardHeader>
                <CardTitle>AskVault</CardTitle>
                <CardDescription>AI-powered database assistant</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <p className="text-muted-foreground">
                  Ask natural language questions about your data and get instant answers.
                </p>
                <div className="text-primary text-3xl font-bold">AI</div>
              </CardContent>
            </Link>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default Dashboard;
