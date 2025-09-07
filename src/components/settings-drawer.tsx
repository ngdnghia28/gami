"use client";

import { useState } from "react";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, BookOpen, User, ChevronRight } from "lucide-react";

interface SettingsDrawerProps {
  children: React.ReactNode;
}

export default function SettingsDrawer({ children }: SettingsDrawerProps) {
  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      title: "Blog",
      description: "Quản lý bài viết và nội dung",
      href: "/blog",
      icon: BookOpen,
    },
    {
      title: "Tài khoản",
      description: "Thông tin cá nhân và cài đặt",
      href: "/account",
      icon: User,
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Cài đặt
          </SheetTitle>
        </SheetHeader>
        
        <Separator className="my-6" />
        
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-4 text-left"
                  data-testid={`settings-menu-${item.title.toLowerCase()}`}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </Link>
            );
          })}
        </div>
        
        <Separator className="my-6" />
        
        <div className="text-center text-sm text-muted-foreground">
          <p>Âm Lịch Việt v1.0</p>
          <p className="mt-1">Phiên bản di động</p>
        </div>
      </SheetContent>
    </Sheet>
  );
}