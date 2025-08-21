import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertCircle, AlertTriangle, Database, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockValidationResults = {
  overallScore: 78,
  tables: [
    {
      name: "source_system_positions",
      status: "warning",
      issues: [
        {
          type: "warning",
          message: "Column 'status' allows NULL values",
          recommendation: "Consider adding NOT NULL constraint to ensure all positions have a status",
        },
        {
          type: "warning",
          message: "Missing index on client_id for performance",
          recommendation: "Add index on client_id for faster client position lookups",
        },
      ],
    },
    {
      name: "destination_system_positions",
      status: "error",
      issues: [
        {
          type: "error",
          message: "Buy_market_value and sell_market_value precision mismatch",
          recommendation: "Standardize decimal precision to DECIMAL(15,2) for financial calculations",
        },
        {
          type: "warning",
          message: "No CHECK constraint for market value validation",
          recommendation: "Add CHECK constraint to ensure market values are non-negative",
        },
      ],
    },
    {
      name: "instruments",
      status: "passed",
      issues: [],
    },
    {
      name: "prices",
      status: "warning",
      issues: [
        {
          type: "warning",
          message: "Settlement_price allows negative values",
          recommendation: "Add CHECK constraint to ensure settlement prices are positive",
        },
      ],
    },
    {
      name: "trade_reconciliation",
      status: "error",
      issues: [
        {
          type: "error",
          message: "Missing foreign key constraint to instruments table",
          recommendation: "Add foreign key constraint on instrument_id to maintain referential integrity",
        },
        {
          type: "error",
          message: "No primary key defined",
          recommendation: "Add composite primary key on (trade_id, reconciliation_date)",
        },
      ],
    },
    {
      name: "client_master",
      status: "passed",
      issues: [],
    },
    {
      name: "market_data_feeds",
      status: "warning",
      issues: [
        {
          type: "warning",
          message: "Feed_timestamp column lacks timezone information",
          recommendation: "Use TIMESTAMP WITH TIME ZONE for accurate market data timing",
        },
      ],
    },
    {
      name: "risk_limits",
      status: "error",
      issues: [
        {
          type: "error",
          message: "Exposure_limit column allows NULL values",
          recommendation: "Set NOT NULL constraint on exposure_limit as it's critical for risk management",
        },
        {
          type: "warning",
          message: "No audit trail for limit changes",
          recommendation: "Consider adding created_date and modified_date columns for compliance",
        },
      ],
    },
    {
      name: "settlement_instructions",
      status: "warning",
      issues: [
        {
          type: "warning",
          message: "Bank account numbers stored as VARCHAR without validation",
          recommendation: "Add CHECK constraint to validate bank account number format",
        },
      ],
    },
    {
      name: "portfolio_valuations",
      status: "passed",
      issues: [],
    },
    {
      name: "margin_requirements",
      status: "error",
      issues: [
        {
          type: "error",
          message: "Initial_margin and variation_margin precision inconsistency",
          recommendation: "Standardize both columns to DECIMAL(15,2) for margin calculations",
        },
      ],
    },
    {
      name: "corporate_actions",
      status: "warning",
      issues: [
        {
          type: "warning",
          message: "Ex_date column allows future dates beyond instrument expiry",
          recommendation: "Add CHECK constraint to ensure ex_date is before instrument expiry",
        },
      ],
    },
  ],
};

export default function SchemaValidation() {
  const [activeTab, setActiveTab] = useState("overview");
  
  const issueCount = mockValidationResults.tables.reduce(
    (count, table) => count + table.issues.length,
    0
  );
  
  const errorCount = mockValidationResults.tables.reduce(
    (count, table) => count + table.issues.filter(issue => issue.type === "error").length,
    0
  );
  
  const warningCount = mockValidationResults.tables.reduce(
    (count, table) => count + table.issues.filter(issue => issue.type === "warning").length,
    0
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <AppShell userType="user">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Schema Validation</h1>
          <p className="text-sm text-muted-foreground">
            Validate your trading system database schema for best practices and regulatory compliance.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issues">Issues ({issueCount})</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Overall Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-4xl font-bold">{mockValidationResults.overallScore}%</div>
                    <Progress value={mockValidationResults.overallScore} className="mt-2 w-full" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Critical Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                    <div className="text-4xl font-bold">{errorCount}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Issues requiring immediate attention
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Warnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <AlertTriangle className="h-8 w-8 text-amber-500 mr-2" />
                    <div className="text-4xl font-bold">{warningCount}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Best practice improvements
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Tables Validated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Database className="h-8 w-8 text-blue-500 mr-2" />
                    <div className="text-4xl font-bold">{mockValidationResults.tables.length}</div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Trading system tables
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Trading System Table Status</CardTitle>
                <CardDescription>Validation status of each table in your financial database</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {mockValidationResults.tables.map((table) => (
                    <div 
                      key={table.name} 
                      className="flex items-center justify-between p-3 bg-card border rounded-md"
                    >
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                        <div>
                          <span className="font-medium text-sm">{table.name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                          {table.issues.length > 0 && (
                            <p className="text-xs text-muted-foreground">
                              {table.issues.length} issue{table.issues.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(table.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Critical Areas</CardTitle>
                  <CardDescription>Areas requiring immediate attention for trading operations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded">
                      <span className="text-sm font-medium">Risk Management</span>
                      <span className="text-red-600 font-bold">2 errors</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-50 border border-red-200 rounded">
                      <span className="text-sm font-medium">Trade Reconciliation</span>
                      <span className="text-red-600 font-bold">2 errors</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-amber-50 border border-amber-200 rounded">
                      <span className="text-sm font-medium">Position Management</span>
                      <span className="text-amber-600 font-bold">3 warnings</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Compliance Status</CardTitle>
                  <CardDescription>Regulatory compliance assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Data Precision Standards</span>
                      <span className="text-amber-600">⚠️ Needs Review</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Referential Integrity</span>
                      <span className="text-red-600">❌ Non-Compliant</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audit Trail Requirements</span>
                      <span className="text-green-600">✅ Compliant</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Risk Limit Controls</span>
                      <span className="text-red-600">❌ Non-Compliant</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="issues" className="space-y-4 mt-4">
            {mockValidationResults.tables
              .filter(table => table.issues.length > 0)
              .map((table) => (
                <Card key={table.name}>
                  <CardHeader>
                    <div className="flex items-center">
                      <Database className="h-4 w-4 mr-2" />
                      <CardTitle className="text-lg">{table.name}</CardTitle>
                      {getStatusIcon(table.status)}
                    </div>
                    <CardDescription>
                      {table.issues.length} issue{table.issues.length !== 1 ? "s" : ""} detected
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {table.issues.map((issue, idx) => (
                      <Alert key={idx} variant={issue.type === "error" ? "destructive" : "default"}>
                        {issue.type === "error" ? 
                          <AlertCircle className="h-4 w-4" /> : 
                          <AlertTriangle className="h-4 w-4" />
                        }
                        <AlertTitle>{issue.message}</AlertTitle>
                        <AlertDescription>{issue.recommendation}</AlertDescription>
                      </Alert>
                    ))}
                  </CardContent>
                </Card>
              ))}
              
            {mockValidationResults.tables.every(table => table.issues.length === 0) && (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold">No issues found!</h3>
                <p className="text-center text-muted-foreground mt-2 max-w-md">
                  Your database schema looks great! No issues have been detected during validation.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  <CardTitle>Best Practices Recommendations</CardTitle>
                </div>
                <CardDescription>
                  Suggestions to improve your database schema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {mockValidationResults.tables
                    .flatMap(table => 
                      table.issues.map((issue, idx) => ({
                        table: table.name,
                        issue,
                        id: `${table.name}-${idx}`
                      }))
                    )
                    .map(({ table, issue, id }) => (
                      <div key={id} className="p-4 border rounded-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <Database className="h-4 w-4 mr-2" />
                            <span className="font-medium">{table}</span>
                          </div>
                          {issue.type === "error" ? 
                            <AlertCircle className="h-4 w-4 text-red-500" /> : 
                            <AlertTriangle className="h-4 w-4 text-amber-500" />
                          }
                        </div>
                        <p className="text-sm mb-1 font-medium">{issue.message}</p>
                        <p className="text-sm text-muted-foreground">{issue.recommendation}</p>
                      </div>
                    ))}
                </div>
                
                <Button variant="outline" className="w-full">
                  Generate SQL Fix Scripts
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
