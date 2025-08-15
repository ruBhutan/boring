import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { Eye, EyeOff, LogIn, UserPlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "tourist",
  });
  const { toast } = useToast();
  const { user, login } = useAuth();

  useEffect(() => {
    if (user) {
      // Always redirect to dashboard after login
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        // Try backend API first, then fallback to AuthContext
        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              password: formData.password,
            }),
          });

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            
            toast({
              title: "Login Successful!",
              description: `Welcome back, ${data.user.firstName}!`,
            });
            
            // Redirect to dashboard
            navigate('/dashboard');
            return;
          }
        } catch (apiError) {
          console.log('API login failed, trying AuthContext...');
        }
        
        // Fallback to AuthContext login
        const success = await login(formData.email, formData.password);
        
        if (success) {
          toast({
            title: "Login Successful!",
            description: "Welcome back!",
          });
          // Redirect will be handled by useEffect when user state changes
        } else {
          throw new Error("Invalid credentials");
        }
      } else {
        // Registration logic
        const response = await fetch("/api/user-accounts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast({
            title: "Registration Successful!",
            description: "Your account has been created. Please login.",
          });
          setIsLogin(true);
          setFormData({
            email: formData.email,
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
            role: "tourist",
          });
        } else {
          throw new Error("Registration failed");
        }
      }
    } catch (error) {
      toast({
        title: isLogin ? "Login Failed" : "Registration Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md brand-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-brand-primary">
            {isLogin ? "Welcome Back" : "Create Account"}
          </CardTitle>
          <CardDescription className="text-brand-text/70">
            {isLogin 
              ? "Sign in to access your dashboard and manage your account"
              : "Join our community of travelers and guides"
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required={!isLogin}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Account Type</Label>
                  <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tourist">Tourist</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="driver">Driver</SelectItem>
                      <SelectItem value="tour_manager">Tour Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            
            <Button type="submit" className="w-full btn-brand-primary">
              {isLogin ? (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <Button
              variant="link"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  email: "",
                  password: "",
                  firstName: "",
                  lastName: "",
                  phone: "",
                  role: "tourist",
                });
              }}
              className="text-brand-primary hover:text-brand-dark"
            >
              {isLogin 
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"
              }
            </Button>
          </div>
          
          {isLogin && (
            <div className="mt-4 p-3 brand-card-purple rounded-lg text-sm">
              <p className="font-semibold mb-2 text-brand-primary">Demo Accounts:</p>
              <div className="space-y-1 text-xs text-brand-text/80">
                <p><strong>Tour Manager:</strong> manager@bhutan.com / manager123</p>
                <p><strong>Guide:</strong> guide@bhutan.com / guide123</p>
                <p><strong>Driver:</strong> driver@bhutan.com / driver123</p>
                <p><strong>Tourist:</strong> tourist@bhutan.com / tourist123</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}