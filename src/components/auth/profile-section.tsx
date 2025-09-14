"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Settings,
  Heart,
  BookOpen,
  Calendar,
  Edit,
  Save,
  X,
  Mail,
  Clock,
  Shield,
  LogOut
} from "lucide-react";

interface ProfileSectionProps {
  user: any; // Replace with proper user type
  onLogout?: () => void; // Callback when user logs out
}

export default function ProfileSection({ user, onLogout }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || ""
  });

  const handleSave = () => {
    // TODO: API call to save profile data
    console.log("Saving profile:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      bio: user?.bio || ""
    });
    setIsEditing(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast({
          title: "Đăng xuất thành công",
          description: "Bạn đã được đăng xuất khỏi hệ thống.",
          variant: "default"
        });
        
        // Call the onLogout callback to update parent state
        if (onLogout) {
          onLogout();
        }
      } else {
        throw new Error("Đăng xuất thất bại");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Lỗi đăng xuất",
        description: "Không thể đăng xuất. Vui lòng thử lại.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Profile Overview */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-10 w-10 text-primary" />
              </div>
            </div>
            <CardTitle className="text-xl">{user?.name || "Người dùng"}</CardTitle>
            <p className="text-muted-foreground">{user?.email}</p>
            <div className="flex justify-center mt-2">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Tham gia từ {new Date(user?.joinDate || Date.now()).toLocaleDateString('vi-VN')}</span>
              </Badge>
            </div>
          </CardHeader>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-lg">Thống kê</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bài viết yêu thích:</span>
              <span className="font-medium">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lần đăng nhập:</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tử vi đã xem:</span>
              <span className="font-medium">23</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-2">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Thông tin</TabsTrigger>
            <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
            <TabsTrigger value="calendar">Lịch</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Thông tin cá nhân</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Tên hiển thị</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Giới thiệu</Label>
                      <Input
                        id="bio"
                        placeholder="Viết vài dòng về bản thân..."
                        value={profileData.bio}
                        onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={handleSave} className="flex items-center space-x-1">
                        <Save className="h-4 w-4" />
                        <span>Lưu thay đổi</span>
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Hủy
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label>Tên hiển thị</Label>
                      <p className="text-sm text-muted-foreground mt-1">{profileData.name || "Chưa cập nhật"}</p>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center space-x-1">
                        <Mail className="h-3 w-3" />
                        <span>{profileData.email}</span>
                      </p>
                    </div>
                    <div>
                      <Label>Giới thiệu</Label>
                      <p className="text-sm text-muted-foreground mt-1">{profileData.bio || "Chưa có giới thiệu"}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span>Bài viết yêu thích</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Chưa có bài viết yêu thích nào</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bấm vào biểu tượng trái tim để lưu các bài viết bạn thích
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-emerald-500" />
                  <span>Lịch cá nhân</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Lịch cá nhân đang được phát triển</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tính năng này sẽ cho phép bạn tạo lịch riêng với các sự kiện đặc biệt
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-blue-500" />
                  <span>Cài đặt tài khoản</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Thông báo email</h4>
                    <p className="text-sm text-muted-foreground">Nhận email về bài viết mới và cập nhật</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Bật
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Chế độ tối</h4>
                    <p className="text-sm text-muted-foreground">Tự động chuyển theo hệ thống</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Auto
                  </Button>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600">Đổi mật khẩu</h4>
                      <p className="text-sm text-muted-foreground">Cập nhật mật khẩu tài khoản</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Shield className="h-4 w-4 mr-1" />
                      Đổi mật khẩu
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-red-600">Đăng xuất</h4>
                      <p className="text-sm text-muted-foreground">Đăng xuất khỏi tất cả thiết bị</p>
                    </div>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}