"use client";

import { useState, useEffect } from "react";
import { User, Settings, Heart, BookOpen, Calendar, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/auth/login-form";
import RegisterForm from "@/components/auth/register-form";
import ProfileSection from "@/components/auth/profile-section";

// Types
interface UserData {
  id: number;
  email: string;
  name: string;
  birthDate?: string | null;
  birthTime?: string | null;
  bio?: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AccountPage() {
  const [authMode, setAuthMode] = useState<"login" | "register" | "profile">("login");
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication on page load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Đang kiểm tra đăng nhập...</p>
        </div>
      </div>
    );
  }

  // Show profile if authenticated
  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Tài khoản của tôi</h1>
            <p className="text-muted-foreground">Quản lý thông tin cá nhân và cài đặt tài khoản</p>
          </div>
          
          <ProfileSection 
            user={user} 
            onLogout={() => {
              setUser(null);
              setIsAuthenticated(false);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {authMode === "login" ? "Đăng nhập" : "Đăng ký tài khoản"}
          </h1>
          <p className="text-muted-foreground">
            {authMode === "login" 
              ? "Đăng nhập để truy cập các tính năng cá nhân hoá" 
              : "Tạo tài khoản để lưu trữ thông tin cá nhân"}
          </p>
        </div>

        <Card className="mx-auto">
          <CardHeader className="space-y-1">
            <div className="flex justify-center space-x-2">
              <Button
                variant={authMode === "login" ? "default" : "outline"}
                onClick={() => setAuthMode("login")}
                className="flex-1"
              >
                Đăng nhập
              </Button>
              <Button
                variant={authMode === "register" ? "default" : "outline"}
                onClick={() => setAuthMode("register")}
                className="flex-1"
              >
                Đăng ký
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {authMode === "login" ? (
              <LoginForm onSuccess={(userData: UserData) => {
                console.log('AccountPage: onSuccess called with:', userData);
                setUser(userData);
                setIsAuthenticated(true);
                console.log('AccountPage: State updated - user set, isAuthenticated = true');
              }} />
            ) : (
              <RegisterForm onSuccess={(userData: UserData) => {
                setUser(userData);
                setIsAuthenticated(true);
              }} />
            )}
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold text-center mb-6">Tính năng dành cho thành viên</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Lưu yêu thích</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lưu các bài viết, ngày tốt xấu và thông tin tử vi yêu thích
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  <span>Lịch cá nhân</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tạo lịch cá nhân với các sự kiện và ngày đặc biệt riêng
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span>Cài đặt cá nhân</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tùy chỉnh giao diện và thông báo theo sở thích cá nhân
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  <span>Nội dung độc quyền</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Truy cập các bài viết và thông tin tử vi dành riêng cho thành viên
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}