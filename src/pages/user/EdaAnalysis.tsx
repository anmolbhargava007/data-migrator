
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const mockTableData = [
  { name: "source_system_positions", rowCount: 15432, avgRowSize: "2.8 KB", growthRate: "+3.2%" },
  { name: "destination_system_positions", rowCount: 8765, avgRowSize: "3.1 KB", growthRate: "+2.8%" },
  { name: "instruments", rowCount: 1245, avgRowSize: "1.9 KB", growthRate: "+1.2%" },
  { name: "prices", rowCount: 45721, avgRowSize: "1.1 KB", growthRate: "+12.5%" },
  { name: "trade_reconciliation", rowCount: 12890, avgRowSize: "2.2 KB", growthRate: "+5.4%" },
];

const mockTimeDistribution = [
  { name: "00:00-03:00", value: 453 },
  { name: "03:00-06:00", value: 287 },
  { name: "06:00-09:00", value: 1542 },
  { name: "09:00-12:00", value: 3258 },
  { name: "12:00-15:00", value: 2835 },
  { name: "15:00-18:00", value: 2175 },
  { name: "18:00-21:00", value: 1079 },
  { name: "21:00-00:00", value: 567 },
];

const mockGrowthData = [
  { name: "Jan", positions: 12230, trades: 8500 },
  { name: "Feb", positions: 12598, trades: 8890 },
  { name: "Mar", positions: 13150, trades: 9200 },
  { name: "Apr", positions: 13423, trades: 9750 },
  { name: "May", positions: 13812, trades: 10300 },
  { name: "Jun", positions: 14287, trades: 10680 },
  { name: "Jul", positions: 14578, trades: 11100 },
  { name: "Aug", positions: 14850, trades: 11400 },
  { name: "Sep", positions: 15045, trades: 11750 },
  { name: "Oct", positions: 15250, trades: 12100 },
  { name: "Nov", positions: 15600, trades: 12500 },
  { name: "Dec", positions: 15432, trades: 12200 },
];

const mockInstrumentTypeData = [
  { name: "Futures", value: 4850 },
  { name: "Options", value: 2130 },
  { name: "Swaps", value: 1650 },
  { name: "Forwards", value: 870 },
  { name: "Bonds", value: 580 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function EdaAnalysis() {
  const [selectedTable, setSelectedTable] = useState("source_system_positions");
  
  return (
    <AppShell userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">EDA Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Exploratory data analysis of your trading system tables and positions.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="table-select" className="text-sm font-medium">
              Select Table:
            </label>
            <Select
              value={selectedTable}
              onValueChange={setSelectedTable}
            >
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Select a table" />
              </SelectTrigger>
              <SelectContent>
                {mockTableData.map((table) => (
                  <SelectItem key={table.name} value={table.name}>
                    {table.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="time-series">Time Series</TabsTrigger>
            <TabsTrigger value="distribution">Distribution</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {mockTableData.map((table) => (
                <Card key={table.name} className={selectedTable === table.name ? "border-primary" : ""}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{table.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{table.rowCount.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total Records</p>
                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <div className="font-medium">{table.avgRowSize}</div>
                        <p className="text-xs text-muted-foreground">Avg Size</p>
                      </div>
                      <div>
                        <div className={`font-medium ${table.growthRate.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {table.growthRate}
                        </div>
                        <p className="text-xs text-muted-foreground">Monthly</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Trading Volume Trends</CardTitle>
                  <CardDescription>Monthly growth of positions and trades</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockGrowthData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="positions" stroke="#8884d8" name="Positions" />
                        <Line type="monotone" dataKey="trades" stroke="#82ca9d" name="Trades" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Instrument Type Distribution</CardTitle>
                  <CardDescription>Breakdown of instruments by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockInstrumentTypeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {mockInstrumentTypeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="time-series" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hourly Distribution of Trading Activity</CardTitle>
                <CardDescription>Number of trades executed during each time period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockTimeDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Trading Activity" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="distribution" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Position Size Distribution</CardTitle>
                <CardDescription>Visual representation of position size distributions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockInstrumentTypeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Position Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
