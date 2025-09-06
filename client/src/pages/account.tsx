import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, Settings, Star, BookOpen } from "lucide-react";

export default function Account() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-serif text-primary mb-2">
            Tài khoản của bạn
          </h1>
          <p className="text-muted-foreground">
            Quản lý thông tin cá nhân và cài đặt ứng dụng
          </p>
        </div>

        {/* Profile Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Thông tin cá nhân
            </CardTitle>
            <CardDescription>
              Quản lý thông tin tài khoản và hồ sơ của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Người dùng khách</p>
                  <p className="text-sm text-muted-foreground">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Chưa có email
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" data-testid="button-edit-profile">
                Chỉnh sửa
              </Button>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Ngày tham gia</span>
                <p className="font-medium">Hôm nay</p>
              </div>
              <div>
                <span className="text-muted-foreground">Trạng thái</span>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary">Khách</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Hoạt động gần đây
            </CardTitle>
            <CardDescription>
              Lịch sử sử dụng ứng dụng của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Calendar className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Xem lịch âm</p>
                  <p className="text-xs text-muted-foreground">Vài phút trước</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Đọc blog về Tết Nguyên Đán</p>
                  <p className="text-xs text-muted-foreground">10 phút trước</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Star className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Xem 12 cung hoàng đạo</p>
                  <p className="text-xs text-muted-foreground">15 phút trước</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Cài đặt ứng dụng
            </CardTitle>
            <CardDescription>
              Tùy chỉnh trải nghiệm sử dụng ứng dụng
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Thông báo</p>
                <p className="text-sm text-muted-foreground">
                  Nhận thông báo về lễ hội và ngày tốt
                </p>
              </div>
              <Button variant="outline" size="sm">
                Cài đặt
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Giao diện tối</p>
                <p className="text-sm text-muted-foreground">
                  Chuyển đổi giữa giao diện sáng và tối
                </p>
              </div>
              <Button variant="outline" size="sm">
                Auto
              </Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ngôn ngữ</p>
                <p className="text-sm text-muted-foreground">
                  Chọn ngôn ngữ hiển thị
                </p>
              </div>
              <Button variant="outline" size="sm">
                Tiếng Việt
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Version Info */}
        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Âm Lịch Việt phiên bản 1.0</p>
          <p className="mt-1">Phát triển với ❤️ cho cộng đồng Việt Nam</p>
        </div>
      </div>
    </div>
  );
}