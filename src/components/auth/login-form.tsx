"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, Lock, CheckCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";

interface LoginFormProps {
  onSuccess: (userData: any) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensure cookies are included
          body: JSON.stringify(formData),
        });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đăng nhập thất bại');
      }

      // Success - show success toast and call onSuccess with user data
      console.log('Login successful, user data:', data.user);
      
      toast({
        title: "Đăng nhập thành công! 🎉",
        description: `Chào mừng bạn trở lại, ${data.user?.name || 'người dùng'}!`,
        variant: "default"
      });
      
      // Small delay to show the toast before transitioning
      setTimeout(() => {
        console.log('Calling onSuccess with user:', data.user);
        onSuccess(data.user);
        setIsLoading(false);
      }, 500);
    } catch (err: any) {
      const errorMessage = err.message || "Đã có lỗi xảy ra khi đăng nhập";
      setError(errorMessage);
      
      // Show error toast as well
      toast({
        title: "Đăng nhập thất bại",
        description: errorMessage,
        variant: "destructive"
      });
      
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Mật khẩu</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={handleInputChange}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      <div className="text-center">
        <button
          type="button"
          className="text-sm text-muted-foreground hover:text-foreground hover:underline"
          onClick={() => {
            // TODO: Implement forgot password
            alert("Tính năng quên mật khẩu sẽ được cập nhật sớm!");
          }}
        >
          Quên mật khẩu?
        </button>
      </div>
    </form>
  );
}