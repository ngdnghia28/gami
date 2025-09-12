import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowUpDown, Star } from "lucide-react";
import Link from "next/link";
import { festivals } from "@/data/festivals";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden vietnamese-pattern">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6">
              <span className="text-primary">Âm Lịch</span>{" "}
              <span className="text-secondary">Việt Nam</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Khám phá truyền thống văn hóa Việt Nam qua hệ thống lịch âm lịch phong phú và ý nghĩa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/calendar">
                <Button 
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-all"
                  data-testid="button-view-calendar"
                >
                  Xem Lịch Âm
                </Button>
              </Link>
              <Link href="/calendar">
                <Button 
                  variant="outline"
                  className="border border-border px-8 py-3 rounded-lg font-semibold hover:bg-muted transition-all"
                  data-testid="button-convert-date"
                >
                  Chuyển Đổi Ngày
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif">Tính Năng Chính</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-3 md:p-6 hover:shadow-lg transition-all" data-testid="card-lunar-calendar">
              <CardContent className="pt-6">
                <div className="text-primary text-3xl mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lịch Âm Hoàn Chỉnh</h3>
                <p className="text-muted-foreground">
                  Hiển thị đầy đủ thông tin lịch âm theo truyền thống Việt Nam với các ngày lễ quan trọng
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-3 md:p-6 hover:shadow-lg transition-all" data-testid="card-date-converter">
              <CardContent className="pt-6">
                <div className="text-secondary text-3xl mb-4">
                  <ArrowUpDown className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Chuyển Đổi Dương - Âm</h3>
                <p className="text-muted-foreground">
                  Công cụ chuyển đổi chính xác giữa lịch dương và lịch âm một cách dễ dàng
                </p>
              </CardContent>
            </Card>
            
            <Card className="p-3 md:p-6 hover:shadow-lg transition-all" data-testid="card-astrology">
              <CardContent className="pt-6">
                <div className="text-primary text-3xl mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Lá Số Tử Vi</h3>
                <p className="text-muted-foreground">
                  Xem lá số tử vi cơ bản dựa trên ngày sinh theo truyền thống phong thủy Việt Nam
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Traditional Festivals Preview */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-serif">Lễ Hội Truyền Thống</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {festivals.slice(0, 4).map((festival, index) => (
              <Card 
                key={index} 
                className="festival-card p-3 md:p-6 text-center border border-border"
                data-testid={`card-festival-${index}`}
              >
                <CardContent className="pt-6">
                  <img 
                    src={festival.image} 
                    alt={festival.name} 
                    className="w-full h-32 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-semibold text-lg mb-2">{festival.name}</h3>
                  <p className="text-sm text-muted-foreground">{festival.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}