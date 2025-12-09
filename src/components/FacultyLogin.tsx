import * as React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { ArrowLeft, LogIn, User, Lock, GraduationCap } from "lucide-react";
import { toast } from "sonner";

interface FacultyLoginProps {
  onLogin: (success: boolean) => void;
  onBack: () => void;
}

export default function FacultyLogin({ onLogin, onBack }: FacultyLoginProps) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Demo credentials - in real app, this would be validated against backend
      if (credentials.username === "faculty" && credentials.password === "faculty123") {
        toast.success("Faculty login successful!");
        onLogin(true);
      } else {
        toast.error("Invalid credentials. Try username: faculty, password: faculty123");
        onLogin(false);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-semibold text-blue-600">SorSU-Bulan</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Faculty Login
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Access your faculty dashboard
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Faculty ID / Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your faculty ID"
                  value={credentials.username}
                  onChange={(e) => handleInputChange("username", e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
              <p className="text-xs text-blue-700">Username: faculty</p>
              <p className="text-xs text-blue-700">Password: faculty123</p>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Forgot your password? Contact IT Support
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}