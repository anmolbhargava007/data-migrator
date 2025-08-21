
import { useState } from "react";
import AppShell from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// Mock data for database connections
const initialConnections = [
  {
    id: "1",
    name: "Production DB",
    type: "PostgreSQL",
    host: "prod-db.example.com",
    port: "5432",
    database: "customers",
    status: "Connected",
  },
  {
    id: "2",
    name: "Analytics DB",
    type: "MySQL",
    host: "analytics.example.com",
    port: "3306",
    database: "analytics",
    status: "Connected",
  },
  {
    id: "3",
    name: "Document Store",
    type: "MongoDB",
    host: "docs.example.com",
    port: "27017",
    database: "documents",
    status: "Disconnected",
  },
  {
    id: "4",
    name: "Legacy System",
    type: "SQL Server",
    host: "legacy.internal",
    port: "1433",
    database: "legacy_app",
    status: "Connected",
  },
];

const DatabaseConnections = () => {
  const [connections, setConnections] = useState(initialConnections);
  const [newConnection, setNewConnection] = useState({
    name: "",
    type: "",
    host: "",
    port: "",
    database: "",
    username: "",
    password: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewConnection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewConnection((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Validate form
    if (!newConnection.name || !newConnection.type || !newConnection.host) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Add new connection
    const id = (connections.length + 1).toString();
    setConnections([
      ...connections,
      {
        id,
        name: newConnection.name,
        type: newConnection.type,
        host: newConnection.host,
        port: newConnection.port,
        database: newConnection.database,
        status: "Connected",
      },
    ]);

    // Reset form and close dialog
    setNewConnection({
      name: "",
      type: "",
      host: "",
      port: "",
      database: "",
      username: "",
      password: "",
    });
    setIsDialogOpen(false);

    toast({
      title: "Connection added",
      description: `${newConnection.name} has been added successfully.`,
    });
  };

  const getTypeClass = (type: string) => {
    switch (type) {
      case "PostgreSQL":
        return "database-badge database-badge-postgres";
      case "MySQL":
        return "database-badge database-badge-mysql";
      case "MongoDB":
        return "database-badge database-badge-mongodb";
      case "SQL Server":
        return "database-badge database-badge-sqlserver";
      default:
        return "database-badge";
    }
  };

  const handleTestConnection = (id: string) => {
    toast({
      title: "Testing connection...",
      description: "Attempting to connect to the database.",
    });

    // Simulate connection test
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: "Successfully connected to the database.",
      });

      setConnections(
        connections.map((conn) =>
          conn.id === id ? { ...conn, status: "Connected" } : conn
        )
      );
    }, 1500);
  };

  return (
    <AppShell userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Database Connections</h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>Add New Connection</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Database Connection</DialogTitle>
                <DialogDescription>
                  Enter the details for your new database connection.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={newConnection.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select
                    onValueChange={(value) => handleSelectChange("type", value)}
                    value={newConnection.type}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select database type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PostgreSQL">PostgreSQL</SelectItem>
                      <SelectItem value="MySQL">MySQL</SelectItem>
                      <SelectItem value="MongoDB">MongoDB</SelectItem>
                      <SelectItem value="SQL Server">SQL Server</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="host" className="text-right">
                    Host
                  </Label>
                  <Input
                    id="host"
                    name="host"
                    value={newConnection.host}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="port" className="text-right">
                    Port
                  </Label>
                  <Input
                    id="port"
                    name="port"
                    value={newConnection.port}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="database" className="text-right">
                    Database
                  </Label>
                  <Input
                    id="database"
                    name="database"
                    value={newConnection.database}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    value={newConnection.username}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right">
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={newConnection.password}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmit}>Save Connection</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Database Connections</CardTitle>
            <CardDescription>
              View and manage all your database connections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Host</TableHead>
                  <TableHead>Port</TableHead>
                  <TableHead>Database</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connections.map((connection) => (
                  <TableRow key={connection.id}>
                    <TableCell className="font-medium">{connection.name}</TableCell>
                    <TableCell>
                      <span className={getTypeClass(connection.type)}>
                        {connection.type}
                      </span>
                    </TableCell>
                    <TableCell>{connection.host}</TableCell>
                    <TableCell>{connection.port}</TableCell>
                    <TableCell>{connection.database}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          connection.status === "Connected"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {connection.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTestConnection(connection.id)}
                        >
                          Test
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
};

export default DatabaseConnections;
