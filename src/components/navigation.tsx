"use client";

import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Menu,
  X,
  Home,
  Star,
  Sparkles,
  Calculator,
  Settings,
  BookOpen,
  User,
} from "lucide-react";
import SettingsDrawer from "@/components/settings-drawer";

export default function Navigation() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Desktop navigation - includes all menu items including Blog and Account
  const desktopNavigation = [
    { name: "Blog", href: "/blog", icon: BookOpen, shortName: "Blog" },
    {
      name: "12 Cung Hoàng Đạo",
      href: "/zodiac",
      icon: Sparkles,
      shortName: "12 Cung Hoàng Đạo",
      mobileName: "Cung HD",
    },
    {
      name: "Âm lịch",
      href: "/calendar",
      icon: Calendar,
      shortName: "Âm lịch",
    },
    {
      name: "Thần Số Học",
      href: "/numerology",
      icon: Calculator,
      shortName: "Thần số học",
      mobileName: "Thần SH",
    },
    { name: "Tử Vi", href: "/astrology", icon: Star, shortName: "Tử vi" },
    { name: "Tài khoản", href: "/account", icon: User, shortName: "Tài khoản" },
  ];

  // Mobile navigation - uses Settings drawer instead of individual menu items
  const mobileNavigation = [
    {
      name: "12 Cung Hoàng Đạo",
      href: "/zodiac",
      icon: Sparkles,
      shortName: "Cung HD",
    },
    {
      name: "Thần Số Học",
      href: "/numerology",
      icon: Calculator,
      shortName: "Thần SH",
    },
    {
      name: "Âm lịch",
      href: "/calendar",
      icon: Calendar,
      shortName: "Âm lịch",
    },
    { name: "Tử Vi", href: "/astrology", icon: Star, shortName: "Tử vi" },
    {
      name: "Cài đặt",
      href: "/settings",
      icon: Settings,
      shortName: "Cài đặt",
      isDrawer: true,
    },
  ];

  return (
    <>
      {/* Desktop Navigation - Hidden on mobile */}
      <nav className="hidden md:block bg-card border-b border-border sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="flex items-center space-x-2"
              data-testid="link-home"
            >
              <Calendar className="text-primary text-2xl" />
              <span className="text-xl font-bold text-primary font-serif">
                Âm Lịch Việt
              </span>
            </Link>

            <div className="flex space-x-8">
              {desktopNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link transition-colors ${
                    location === item.href
                      ? "text-primary font-semibold"
                      : "text-foreground hover:text-primary"
                  }`}
                  data-testid={`link-${item.name.toLowerCase().replace(" ", "-")}`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center items-center">
          {mobileNavigation.map((item, index) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            const isCenter = index === 2; // Center item (Âm lịch)
            const isDrawer = item.isDrawer;

            if (isDrawer) {
              return (
                <SettingsDrawer key={item.name}>
                  <div
                    className="flex flex-col items-center justify-center flex-1 py-2 px-1 cursor-pointer"
                    data-testid={`mobile-nav-${item.name.toLowerCase().replace(" ", "-")}`}
                  >
                    <Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                    <span className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                      {item.mobileName || item.shortName}
                    </span>
                  </div>
                </SettingsDrawer>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center transition-all duration-200 ${
                  isCenter
                    ? "w-16 h-16 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white mx-2 -mt-4 shadow-lg"
                    : "flex-1 py-2 px-1"
                }`}
                data-testid={`mobile-nav-${item.name.toLowerCase().replace(" ", "-")}`}
              >
                <Icon
                  className={`${
                    isCenter
                      ? "h-6 w-6"
                      : isActive
                        ? "h-5 w-5 text-emerald-600 dark:text-emerald-400"
                        : "h-5 w-5 text-gray-500 dark:text-gray-400"
                  }`}
                />
                <span
                  className={`text-xs mt-1 ${
                    isCenter
                      ? "text-white font-medium"
                      : isActive
                        ? "text-emerald-600 dark:text-emerald-400 font-medium"
                        : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.mobileName || item.shortName}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
