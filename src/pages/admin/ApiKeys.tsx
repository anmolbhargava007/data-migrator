
import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Key, Copy, Trash } from "lucide-react";

const mockApiKeys = [
  {
    id: "1",
    name: "Production API Key",
    key: "dm_prod_a1b2c3d4e5f6g7h8i9j0",
    created: "2025-04-15",
    lastUsed: "2025-05-12",
  },
  {
    id: "2",
    name: "Development API Key",
    key: "dm_dev_z9y8x7w6v5u4t3s2r1q0",
    created: "2025-04-20",
    lastUsed: "2025-05-13",
  },
  {
    id: "3",
    name: "Test Environment",
    key: "dm_test_o1p2q3r4s5t6u7v8w9x0",
    created: "2025-05-01",
    lastUsed: "2025-05-10",
  },
];

export default function ApiKeys() {
  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    // In a real app, you would show a toast notification
  };

  return (
    <AppShell userType="admin">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-sm text-muted-foreground">
              Manage API keys for accessing your database analytics platform.
            </p>
          </div>
          <Button>
            <Key className="mr-2 h-4 w-4" /> Generate New API Key
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>
              Your API keys grant access to your analytics data. Keep them secure.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Input placeholder="Search API keys..." className="max-w-sm" />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>API Key</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockApiKeys.map((apiKey) => (
                    <TableRow key={apiKey.id}>
                      <TableCell className="font-medium">{apiKey.name}</TableCell>
                      <TableCell>
                        <div className="font-mono text-sm">
                          {apiKey.key.slice(0, 8)}...{apiKey.key.slice(-4)}
                        </div>
                      </TableCell>
                      <TableCell>{apiKey.created}</TableCell>
                      <TableCell>{apiKey.lastUsed}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
