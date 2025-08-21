
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"admin" | "user">("user");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate authentication delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simplified auth logic for demo purposes
      if (email && password) {
        const redirectPath = userType === "admin" ? "/admin" : "/dashboard";
        navigate(redirectPath);
        toast({
          title: "Login successful",
          description: `Welcome back to Data Migrator ${userType === "admin" ? "admin" : ""}!`,
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">DATA MIGRATOR</h1>
          <p className="text-muted-foreground mt-2">Database analytics made easy</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access the platform
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={userType === "user" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("user")}
                  className="flex-1"
                >
                  User
                </Button>
                <Button
                  type="button"
                  variant={userType === "admin" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserType("admin")}
                  className="flex-1"
                >
                  Admin
                </Button>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <div className="mt-4 text-center text-sm text-muted-foreground">
          <p>Demo credentials:</p>
          <p>Admin: admin@example.com / password</p>
          <p>User: user@example.com / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
