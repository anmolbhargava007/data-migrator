
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, ZoomIn, ZoomOut, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Mock data for trading system relationship diagram
const mockRelationships = {
  nodes: [
    { id: 1, label: "instruments", type: "table" },
    { id: 2, label: "source_system_positions", type: "table" },
    { id: 3, label: "destination_system_positions", type: "table" },
    { id: 4, label: "prices", type: "table" },
    { id: 5, label: "clients", type: "table" },
    { id: 6, label: "trade_reconciliation", type: "table" },
  ],
  edges: [
    { from: 1, to: 2, label: "1:N", description: "instrument_id" },
    { from: 1, to: 3, label: "1:N", description: "instrument_id" },
    { from: 1, to: 4, label: "1:N", description: "instrument_id" },
    { from: 1, to: 6, label: "1:N", description: "instrument_id" },
    { from: 5, to: 6, label: "1:N", description: "client_id" },
  ],
};

const mockCorrelations = [
  { source: "instruments.expiry_date", target: "prices.settlement_price", score: 0.78, significance: "high" },
  { source: "source_system_positions.buy_qty", target: "destination_system_positions.buy_qty", score: 0.92, significance: "high" },
  { source: "instruments.contract_size", target: "destination_system_positions.buy_market_value", score: 0.65, significance: "medium" },
  { source: "prices.settlement_price", target: "destination_system_positions.buy_market_value", score: 0.89, significance: "high" },
  { source: "clients.region", target: "source_system_positions.buy_qty", score: 0.34, significance: "low" },
  { source: "instruments.instrument_type", target: "trade_reconciliation.variance_percentage", score: -0.42, significance: "medium" },
];

export default function RelationshipAnalysis() {
  const [selectedTable, setSelectedTable] = useState("instruments");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchFilter, setSearchFilter] = useState("");
  
  const filteredCorrelations = mockCorrelations.filter(
    correlation => 
      correlation.source.toLowerCase().includes(searchFilter.toLowerCase()) || 
      correlation.target.toLowerCase().includes(searchFilter.toLowerCase())
  );
  
  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 20, 40));

  const getSignificanceBadge = (significance: string) => {
    switch (significance) {
      case "high":
        return <Badge className="bg-green-100 text-green-800 border-green-300">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300">Medium</Badge>;
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppShell userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Relationship Analysis</h1>
          <p className="text-sm text-muted-foreground">
            Analyze relationships and correlations between trading system tables and fields.
          </p>
        </div>
        
        <Tabs defaultValue="diagram">
          <TabsList>
            <TabsTrigger value="diagram">Schema Diagram</TabsTrigger>
            <TabsTrigger value="correlations">Data Correlations</TabsTrigger>
            <TabsTrigger value="anomalies">Trade Reconciliation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagram" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <Select
                value={selectedTable}
                onValueChange={setSelectedTable}
              >
                <SelectTrigger className="w-[220px]">
                  <SelectValue placeholder="Select a table" />
                </SelectTrigger>
                <SelectContent>
                  {mockRelationships.nodes.map((node) => (
                    <SelectItem key={node.id} value={node.label}>
                      {node.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium">{zoomLevel}%</span>
                <Button variant="outline" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" /> Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Trading System ER Diagram</CardTitle>
                <CardDescription>
                  Visual representation of relationships between trading system tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="min-h-[500px] border rounded-md bg-white p-4 flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: "center center" }}
                >
                  <div className="grid grid-cols-3 gap-8 text-center">
                    <div className="space-y-4">
                      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                        <div className="font-bold text-blue-800">instruments</div>
                        <div className="text-xs mt-2">
                          <div>instrument_id (PK)</div>
                          <div>instrument_name</div>
                          <div>instrument_type</div>
                          <div>underlying</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
                        <div className="font-bold text-green-800">source_positions</div>
                        <div className="text-xs mt-2">
                          <div>id (PK)</div>
                          <div>client_id</div>
                          <div>instrument_id (FK)</div>
                          <div>buy_qty, sell_qty</div>
                        </div>
                      </div>
                      
                      <div className="border-2 border-purple-300 rounded-lg p-4 bg-purple-50">
                        <div className="font-bold text-purple-800">destination_positions</div>
                        <div className="text-xs mt-2">
                          <div>id (PK)</div>
                          <div>client_id</div>
                          <div>instrument_id (FK)</div>
                          <div>market_value</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-2 border-yellow-300 rounded-lg p-4 bg-yellow-50">
                        <div className="font-bold text-yellow-800">prices</div>
                        <div className="text-xs mt-2">
                          <div>id (PK)</div>
                          <div>instrument_id (FK)</div>
                          <div>settlement_price</div>
                          <div>run_date</div>
                        </div>
                      </div>
                      
                      <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
                        <div className="font-bold text-red-800">trade_reconciliation</div>
                        <div className="text-xs mt-2">
                          <div>id (PK)</div>
                          <div>client_id (FK)</div>
                          <div>instrument_id (FK)</div>
                          <div>variance</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Table Relationships</CardTitle>
                <CardDescription>
                  Detailed information about relationships for {selectedTable}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md border">
                    <div className="bg-muted px-4 py-2 rounded-t-md">
                      <h3 className="text-sm font-medium">References (Foreign Keys)</h3>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {mockRelationships.edges
                          .filter(edge => {
                            const sourceNode = mockRelationships.nodes.find(n => n.id === edge.from);
                            return sourceNode?.label === selectedTable;
                          })
                          .map((edge, idx) => {
                            const targetNode = mockRelationships.nodes.find(n => n.id === edge.to);
                            return (
                              <li key={idx} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                <div>
                                  <span className="font-medium">{selectedTable}</span>
                                  <span className="mx-2">→</span>
                                  <span>{targetNode?.label}</span>
                                </div>
                                <div>
                                  <Badge variant="outline">{edge.label}</Badge>
                                  <span className="ml-2 text-sm text-muted-foreground">{edge.description}</span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <div className="bg-muted px-4 py-2 rounded-t-md">
                      <h3 className="text-sm font-medium">Referenced By</h3>
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {mockRelationships.edges
                          .filter(edge => {
                            const targetNode = mockRelationships.nodes.find(n => n.id === edge.to);
                            return targetNode?.label === selectedTable;
                          })
                          .map((edge, idx) => {
                            const sourceNode = mockRelationships.nodes.find(n => n.id === edge.from);
                            return (
                              <li key={idx} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                <div>
                                  <span>{sourceNode?.label}</span>
                                  <span className="mx-2">→</span>
                                  <span className="font-medium">{selectedTable}</span>
                                </div>
                                <div>
                                  <Badge variant="outline">{edge.label}</Badge>
                                  <span className="ml-2 text-sm text-muted-foreground">{edge.description}</span>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="correlations" className="space-y-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search correlations..."
                  className="pl-8"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Trading Data Correlations</CardTitle>
                <CardDescription>
                  Detected correlations between different fields across trading tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted">
                        <th className="px-4 py-2 text-left font-medium">Source Field</th>
                        <th className="px-4 py-2 text-left font-medium">Target Field</th>
                        <th className="px-4 py-2 text-center font-medium">Correlation</th>
                        <th className="px-4 py-2 text-center font-medium">Significance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCorrelations.map((correlation, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                          <td className="px-4 py-3 font-medium">{correlation.source}</td>
                          <td className="px-4 py-3">{correlation.target}</td>
                          <td className="px-4 py-3 text-center">
                            <span
                              className={`font-mono ${
                                correlation.score > 0.7
                                  ? "text-green-600"
                                  : correlation.score < 0
                                  ? "text-red-600"
                                  : "text-amber-600"
                              }`}
                            >
                              {correlation.score.toFixed(2)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            {getSignificanceBadge(correlation.significance)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="anomalies" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Trade Reconciliation Analysis</CardTitle>
                <CardDescription>
                  Automated detection of variances between source and destination systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-700">98.5%</div>
                      <div className="text-sm text-green-600">Reconciliation Rate</div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                      <div className="text-2xl font-bold text-amber-700">187</div>
                      <div className="text-sm text-amber-600">Variance Cases</div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-2xl font-bold text-red-700">12</div>
                      <div className="text-sm text-red-600">Critical Breaks</div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted">
                          <th className="px-4 py-2 text-left font-medium">Client ID</th>
                          <th className="px-4 py-2 text-left font-medium">Instrument</th>
                          <th className="px-4 py-2 text-center font-medium">Source Qty</th>
                          <th className="px-4 py-2 text-center font-medium">Dest Qty</th>
                          <th className="px-4 py-2 text-center font-medium">Variance</th>
                          <th className="px-4 py-2 text-center font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="px-4 py-3">CM_ABC</td>
                          <td className="px-4 py-3">FUT_W_D26</td>
                          <td className="px-4 py-3 text-center">12</td>
                          <td className="px-4 py-3 text-center">12</td>
                          <td className="px-4 py-3 text-center text-green-600">0.0%</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-green-100 text-green-800">Matched</Badge>
                          </td>
                        </tr>
                        <tr className="border-t bg-muted/20">
                          <td className="px-4 py-3">CM_XYZ</td>
                          <td className="px-4 py-3">FUT_C_M26</td>
                          <td className="px-4 py-3 text-center">25</td>
                          <td className="px-4 py-3 text-center">23</td>
                          <td className="px-4 py-3 text-center text-amber-600">-8.0%</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-amber-100 text-amber-800">Minor Variance</Badge>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="px-4 py-3">CM_DEF</td>
                          <td className="px-4 py-3">FUT_S_J26</td>
                          <td className="px-4 py-3 text-center">50</td>
                          <td className="px-4 py-3 text-center">35</td>
                          <td className="px-4 py-3 text-center text-red-600">-30.0%</td>
                          <td className="px-4 py-3 text-center">
                            <Badge className="bg-red-100 text-red-800">Critical Break</Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
