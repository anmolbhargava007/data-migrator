
import AppShell from "@/components/layout/AppShell";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

// Sample data structure for financial trading schema
const sampleTables = [
  {
    name: "source_system_positions",
    description: "Source system trading positions",
    columns: [
      { name: "id", type: "integer", nullable: false, isPrimary: true },
      { name: "client_id", type: "varchar", nullable: false, isPrimary: false },
      { name: "client_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "instrument_id", type: "varchar", nullable: false, isPrimary: false, foreignKey: "instruments.instrument_id" },
      { name: "instrument_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "buy_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "sell_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "status", type: "varchar", nullable: false, isPrimary: false },
      { name: "created_at", type: "timestamp", nullable: false, isPrimary: false },
    ],
  },
  {
    name: "destination_system_positions",
    description: "Destination system consolidated positions",
    columns: [
      { name: "id", type: "integer", nullable: false, isPrimary: true },
      { name: "client_id", type: "varchar", nullable: false, isPrimary: false },
      { name: "client_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "instrument_id", type: "varchar", nullable: false, isPrimary: false, foreignKey: "instruments.instrument_id" },
      { name: "instrument_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "buy_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "sell_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "buy_market_value", type: "decimal", nullable: false, isPrimary: false },
      { name: "sell_market_value", type: "decimal", nullable: false, isPrimary: false },
      { name: "status", type: "varchar", nullable: false, isPrimary: false },
      { name: "updated_at", type: "timestamp", nullable: false, isPrimary: false },
    ],
  },
  {
    name: "instruments",
    description: "Trading instruments master data",
    columns: [
      { name: "instrument_id", type: "varchar", nullable: false, isPrimary: true },
      { name: "instrument_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "instrument_type", type: "varchar", nullable: false, isPrimary: false },
      { name: "underlying", type: "varchar", nullable: false, isPrimary: false },
      { name: "contract_size", type: "decimal", nullable: false, isPrimary: false },
      { name: "unit", type: "varchar", nullable: false, isPrimary: false },
      { name: "expiry_date", type: "date", nullable: false, isPrimary: false },
      { name: "active_date", type: "date", nullable: false, isPrimary: false },
      { name: "inactive_date", type: "date", nullable: true, isPrimary: false },
    ],
  },
  {
    name: "prices",
    description: "Daily settlement prices",
    columns: [
      { name: "id", type: "integer", nullable: false, isPrimary: true },
      { name: "instrument_id", type: "varchar", nullable: false, isPrimary: false, foreignKey: "instruments.instrument_id" },
      { name: "settlement_price", type: "decimal", nullable: false, isPrimary: false },
      { name: "run_date", type: "date", nullable: false, isPrimary: false },
      { name: "created_at", type: "timestamp", nullable: false, isPrimary: false },
    ],
  },
  {
    name: "clients",
    description: "Client master information",
    columns: [
      { name: "client_id", type: "varchar", nullable: false, isPrimary: true },
      { name: "client_name", type: "varchar", nullable: false, isPrimary: false },
      { name: "client_type", type: "varchar", nullable: false, isPrimary: false },
      { name: "region", type: "varchar", nullable: false, isPrimary: false },
      { name: "country", type: "varchar", nullable: false, isPrimary: false },
      { name: "status", type: "varchar", nullable: false, isPrimary: false },
      { name: "onboard_date", type: "date", nullable: false, isPrimary: false },
    ],
  },
  {
    name: "trade_reconciliation",
    description: "Trade reconciliation results",
    columns: [
      { name: "id", type: "integer", nullable: false, isPrimary: true },
      { name: "client_id", type: "varchar", nullable: false, isPrimary: false, foreignKey: "clients.client_id" },
      { name: "instrument_id", type: "varchar", nullable: false, isPrimary: false, foreignKey: "instruments.instrument_id" },
      { name: "source_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "destination_qty", type: "decimal", nullable: false, isPrimary: false },
      { name: "variance", type: "decimal", nullable: false, isPrimary: false },
      { name: "variance_percentage", type: "decimal", nullable: false, isPrimary: false },
      { name: "reconciliation_status", type: "varchar", nullable: false, isPrimary: false },
      { name: "run_date", type: "date", nullable: false, isPrimary: false },
    ],
  },
];

// Sample relationships between tables
const sampleRelationships = [
  { source: "instruments", target: "source_system_positions", sourceField: "instrument_id", targetField: "instrument_id", type: "one-to-many" },
  { source: "instruments", target: "destination_system_positions", sourceField: "instrument_id", targetField: "instrument_id", type: "one-to-many" },
  { source: "instruments", target: "prices", sourceField: "instrument_id", targetField: "instrument_id", type: "one-to-many" },
  { source: "instruments", target: "trade_reconciliation", sourceField: "instrument_id", targetField: "instrument_id", type: "one-to-many" },
  { source: "clients", target: "trade_reconciliation", sourceField: "client_id", targetField: "client_id", type: "one-to-many" },
];

const SchemaExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDatabase, setSelectedDatabase] = useState("trading_system");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);

  // Get the details of the selected table
  const tableDetails = sampleTables.find((table) => table.name === selectedTable);

  // Filter tables based on search term
  const filteredTables = sampleTables.filter((table) =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppShell userType="user">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">Schema Explorer</h1>
            <p className="text-muted-foreground">
              Explore and understand your trading system database structure
            </p>
          </div>
          <div className="flex gap-2">
            <Select
              value={selectedDatabase}
              onValueChange={setSelectedDatabase}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select database" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trading_system">Trading System DB</SelectItem>
                <SelectItem value="risk_management">Risk Management DB</SelectItem>
                <SelectItem value="compliance">Compliance DB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-6 h-[calc(100vh-15rem)]">
          <div className="w-64 flex flex-col">
            <div className="mb-4">
              <Input
                placeholder="Search tables..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 overflow-y-auto border rounded-md">
              <div className="p-2 font-medium bg-muted border-b">Tables</div>
              <div className="divide-y">
                {filteredTables.map((table) => (
                  <div
                    key={table.name}
                    className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedTable === table.name ? "bg-muted" : ""
                    }`}
                    onClick={() => setSelectedTable(table.name)}
                  >
                    <div className="font-medium">{table.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {table.columns.length} columns
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            {selectedTable ? (
              <Tabs defaultValue="structure">
                <TabsList>
                  <TabsTrigger value="structure">Structure</TabsTrigger>
                  <TabsTrigger value="relationships">Relationships</TabsTrigger>
                  <TabsTrigger value="preview">Data Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="structure" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">{tableDetails?.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {tableDetails?.description}
                        </p>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-muted">
                              <th className="px-4 py-2 text-left font-medium">Column</th>
                              <th className="px-4 py-2 text-left font-medium">Type</th>
                              <th className="px-4 py-2 text-left font-medium">Attributes</th>
                              <th className="px-4 py-2 text-left font-medium">References</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableDetails?.columns.map((column) => (
                              <tr key={column.name} className="border-t">
                                <td className="px-4 py-2">
                                  {column.name}
                                  {column.isPrimary && (
                                    <Badge variant="outline" className="ml-2">
                                      PK
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-4 py-2">
                                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                                    {column.type}
                                  </code>
                                </td>
                                <td className="px-4 py-2">
                                  {column.nullable ? "" : "NOT NULL"}
                                </td>
                                <td className="px-4 py-2">
                                  {column.foreignKey && (
                                    <Badge variant="outline">
                                      {column.foreignKey}
                                    </Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="relationships" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">
                          Table Relationships
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Connections with other tables
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">Incoming References</h4>
                        <div className="space-y-2 mb-6">
                          {sampleRelationships
                            .filter((rel) => rel.target === selectedTable)
                            .map((rel, idx) => (
                              <div
                                key={idx}
                                className="p-3 border rounded-md flex justify-between items-center"
                              >
                                <div>
                                  <span className="font-medium">{rel.source}</span>
                                  <span className="text-muted-foreground">
                                    .{rel.sourceField}
                                  </span>{" "}
                                  →{" "}
                                  <span className="font-medium">{rel.target}</span>
                                  <span className="text-muted-foreground">
                                    .{rel.targetField}
                                  </span>
                                </div>
                                <Badge>{rel.type}</Badge>
                              </div>
                            ))}
                          {sampleRelationships.filter(
                            (rel) => rel.target === selectedTable
                          ).length === 0 && (
                            <div className="text-muted-foreground text-sm">
                              No incoming references
                            </div>
                          )}
                        </div>

                        <h4 className="font-medium mb-2">Outgoing References</h4>
                        <div className="space-y-2">
                          {sampleRelationships
                            .filter((rel) => rel.source === selectedTable)
                            .map((rel, idx) => (
                              <div
                                key={idx}
                                className="p-3 border rounded-md flex justify-between items-center"
                              >
                                <div>
                                  <span className="font-medium">{rel.source}</span>
                                  <span className="text-muted-foreground">
                                    .{rel.sourceField}
                                  </span>{" "}
                                  →{" "}
                                  <span className="font-medium">{rel.target}</span>
                                  <span className="text-muted-foreground">
                                    .{rel.targetField}
                                  </span>
                                </div>
                                <Badge>{rel.type}</Badge>
                              </div>
                            ))}
                          {sampleRelationships.filter(
                            (rel) => rel.source === selectedTable
                          ).length === 0 && (
                            <div className="text-muted-foreground text-sm">
                              No outgoing references
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="mt-6 p-4 border rounded-md bg-muted/30">
                        <div className="flex flex-col items-center justify-center h-60 text-muted-foreground">
                          <div className="text-center mb-4">
                            <h4 className="font-medium mb-2">Trading System ER Diagram</h4>
                            <div className="grid grid-cols-3 gap-4 text-xs">
                              <div className="border rounded p-2 bg-blue-50">
                                <div className="font-bold">instruments</div>
                                <div>instrument_id (PK)</div>
                                <div>instrument_name</div>
                                <div>instrument_type</div>
                              </div>
                              <div className="border rounded p-2 bg-green-50">
                                <div className="font-bold">source_positions</div>
                                <div>id (PK)</div>
                                <div>client_id</div>
                                <div>instrument_id (FK)</div>
                              </div>
                              <div className="border rounded p-2 bg-yellow-50">
                                <div className="font-bold">prices</div>
                                <div>id (PK)</div>
                                <div>instrument_id (FK)</div>
                                <div>settlement_price</div>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm">Interactive relationship diagram visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview" className="mt-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">Data Preview</h3>
                        <p className="text-sm text-muted-foreground">
                          Sample data from {selectedTable}
                        </p>
                      </div>

                      <div className="overflow-x-auto border rounded-md">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              {selectedTable === "instruments" && (
                                <>
                                  <th className="px-3 py-2 text-left">Instrument ID</th>
                                  <th className="px-3 py-2 text-left">Name</th>
                                  <th className="px-3 py-2 text-left">Type</th>
                                  <th className="px-3 py-2 text-left">Underlying</th>
                                  <th className="px-3 py-2 text-left">Expiry Date</th>
                                </>
                              )}
                              {selectedTable === "source_system_positions" && (
                                <>
                                  <th className="px-3 py-2 text-left">Client ID</th>
                                  <th className="px-3 py-2 text-left">Client Name</th>
                                  <th className="px-3 py-2 text-left">Instrument</th>
                                  <th className="px-3 py-2 text-left">Buy Qty</th>
                                  <th className="px-3 py-2 text-left">Sell Qty</th>
                                </>
                              )}
                              {!["instruments", "source_system_positions"].includes(selectedTable || "") && (
                                <th className="px-3 py-2 text-left">Sample Data</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {selectedTable === "instruments" && (
                              <>
                                <tr className="border-t">
                                  <td className="px-3 py-2">FUT_W_D26</td>
                                  <td className="px-3 py-2">Wheat December 2026</td>
                                  <td className="px-3 py-2">Future</td>
                                  <td className="px-3 py-2">Wheat</td>
                                  <td className="px-3 py-2">12/31/2026</td>
                                </tr>
                                <tr className="border-t">
                                  <td className="px-3 py-2">FUT_C_M26</td>
                                  <td className="px-3 py-2">Corn March 2026</td>
                                  <td className="px-3 py-2">Future</td>
                                  <td className="px-3 py-2">Corn</td>
                                  <td className="px-3 py-2">03/31/2026</td>
                                </tr>
                              </>
                            )}
                            {selectedTable === "source_system_positions" && (
                              <>
                                <tr className="border-t">
                                  <td className="px-3 py-2">IND_CM_ABC_1</td>
                                  <td className="px-3 py-2">SAM</td>
                                  <td className="px-3 py-2">FUT_W_D26</td>
                                  <td className="px-3 py-2">10</td>
                                  <td className="px-3 py-2">2</td>
                                </tr>
                                <tr className="border-t">
                                  <td className="px-3 py-2">USA_CM_ABC_1</td>
                                  <td className="px-3 py-2">SAM</td>
                                  <td className="px-3 py-2">FUT_W_D26</td>
                                  <td className="px-3 py-2">2</td>
                                  <td className="px-3 py-2">6</td>
                                </tr>
                              </>
                            )}
                            {!["instruments", "source_system_positions"].includes(selectedTable || "") && (
                              <tr className="border-t">
                                <td className="px-3 py-2 text-center text-muted-foreground">
                                  Sample trading data for {selectedTable}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Select a table to view its details
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
};

export default SchemaExplorer;
