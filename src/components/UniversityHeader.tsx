import React from "react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { GraduationCap, MapPin, Users, Award, Settings, LogIn, LogOut, Shield, Menu } from "lucide-react";
import Logo from "../assets/sorsulogo.png"; // Add this import


interface UniversityHeaderProps {
  onLoginToggle: () => void;
  isLoggedIn: boolean;
  userType?: 'admin' | 'faculty';
  userName?: string;
}

export default function UniversityHeader({ 
  onLoginToggle, 
  isLoggedIn,
  userType,
  userName
}: UniversityHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false); // 👈 Step 1

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full">
               <img src={Logo} alt="SorSU Logo" className="w-10 h-10 object-contain" />
             </div>
             <div>
              <h1 className="text-xl font-bold">SorSU-Bulan</h1>
              <p className="text-sm text-muted-foreground">Sorsogon State University - Bulan Campus</p>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4">
            {!isLoggedIn && (
              <>
                <a href="#programs" className="hover:text-primary transition-colors text-sm">Programs</a>
                <a href="#campus" className="hover:text-primary transition-colors text-sm">Campus</a>
                <a href="#departments" className="hover:text-primary transition-colors text-sm">Departments</a>
                <a href="#faculty" className="hover:text-primary transition-colors text-sm">Faculty</a>
                <a href="#announcements" className="hover:text-primary transition-colors text-sm">Announcements</a>
                <a href="#events" className="hover:text-primary transition-colors text-sm">Events</a>
              </>
            )}
            <div className="flex items-center gap-3">
              {isLoggedIn && userName && (
                <div className="flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                  {userType === 'admin' ? (
                    <Shield className="w-4 h-4 text-blue-600" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                  )}
                  <span className="text-sm font-medium">{userName}</span>
                  <Badge variant="secondary" className="text-xs">
                    {userType === 'admin' ? 'Admin' : 'Faculty'}
                  </Badge>
                </div>
              )}
              <Button 
                variant={isLoggedIn ? "default" : "outline"} 
                size="sm"
                onClick={onLoginToggle}
                className="flex items-center gap-2"
              >
                {isLoggedIn ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login
                  </>
                )}
              </Button>
            </div>
          </nav>


          {/* Mobile Nav */}
          {menuOpen && (
          <div className="md:hidden mt-3 flex flex-col gap-2 text-sm">
            {!isLoggedIn && (
              <>
                <a href="#programs" className="hover:text-primary">Programs</a>
                <a href="#campus" className="hover:text-primary">Campus</a>
                <a href="#departments" className="hover:text-primary">Departments</a>
                <a href="#faculty" className="hover:text-primary">Faculty</a>
                <a href="#announcements" className="hover:text-primary">Announcements</a>
                <a href="#events" className="hover:text-primary">Events</a>
              </>
            )}
            <Button
              variant={isLoggedIn ? "default" : "outline"}
              size="sm"
              onClick={onLoginToggle}
              className="flex items-center gap-2 mt-2"
            >
              {isLoggedIn ? (
                <>
                  <LogOut className="w-4 h-4" />
                  Logout
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Login
                </>
              )}
            </Button>
          </div>
        )}
          
        </div>
        
        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Bulan, Sorsogon, Philippines</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>3,500+ Students</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>AACCUP Level II Accredited</span>
          </div>
        </div>
      </div>
    </header>
  );
}