import { Link } from "wouter";
import { Calendar } from "lucide-react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Calendar className="text-primary text-xl" />
              <span className="text-lg font-bold font-serif">Âm Lịch Việt</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Khám phá và bảo tồn truyền thống văn hóa Việt Nam qua hệ thống lịch âm lịch
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tính Năng</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/calendar" className="hover:text-primary transition-colors">
                  Lịch Âm
                </Link>
              </li>
              <li>
                <Link href="/calendar" className="hover:text-primary transition-colors">
                  Chuyển Đổi Ngày
                </Link>
              </li>
              <li>
                <Link href="/astrology" className="hover:text-primary transition-colors">
                  Tử Vi
                </Link>
              </li>
              <li>
                <Link href="/zodiac" className="hover:text-primary transition-colors">
                  Cung Hoàng Đạo
                </Link>
              </li>
              <li>
                <Link href="/numerology" className="hover:text-primary transition-colors">
                  Thần Số Học
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Lễ Hội
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Thông Tin</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Về Chúng Tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Liên Hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Điều Khoản
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Bảo Mật
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kết Nối</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; 2024 Âm Lịch Việt Nam. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
