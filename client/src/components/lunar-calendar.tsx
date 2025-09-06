import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CalendarCheck, Star } from "lucide-react";
import { generateCalendarDays, getCurrentLunarInfo } from "@/lib/lunar-utils";

export default function LunarCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarDays = generateCalendarDays(currentDate);
  const todayInfo = getCurrentLunarInfo();

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const dayHeaders = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <section className="min-h-screen py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-4">
            Lịch Âm Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}
          </h2>
          <p className="text-muted-foreground">Tháng {currentDate.getMonth() + 1} âm lịch - Năm Giáp Thìn</p>
        </div>

        {/* Calendar Header */}
        <Card className="p-2 sm:p-4 md:p-6 mb-8">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                data-testid="button-prev-month"
              >
                <ChevronLeft className="h-4 w-4 text-primary" />
              </Button>
              
              <div className="text-center">
                <h3 className="text-2xl font-semibold font-serif">
                  Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                data-testid="button-next-month"
              >
                <ChevronRight className="h-4 w-4 text-primary" />
              </Button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Day Headers */}
              {dayHeaders.map((day) => (
                <div
                  key={day}
                  className={`text-center p-2 sm:p-3 font-semibold ${
                    day === 'CN' || day === 'T7' ? 'text-primary' : ''
                  }`}
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={`lunar-day border border-border rounded-lg p-1 sm:p-2 md:p-3 text-center cursor-pointer hover:bg-accent/10 min-h-[80px] sm:min-h-[90px] md:min-h-[100px] ${
                    day.isToday ? 'bg-primary text-primary-foreground border-primary' : 'bg-background'
                  } ${day.isCurrentMonth ? '' : 'opacity-50'}`}
                  data-testid={`calendar-day-${day.date}`}
                >
                  <div className="text-base sm:text-lg font-semibold mb-1">{day.date}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight mb-1">{day.lunarDay}</div>
                  <div className="text-[10px] sm:text-xs text-secondary leading-tight">{day.zodiacAnimal}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-3 md:p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 font-serif">Thông Tin Hôm Nay</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dương lịch:</span>
                  <span className="font-semibold" data-testid="text-solar-date">
                    {todayInfo.solarDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Âm lịch:</span>
                  <span className="font-semibold" data-testid="text-lunar-date">
                    {todayInfo.lunarDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Chi:</span>
                  <span className="font-semibold text-secondary" data-testid="text-can-chi">
                    {todayInfo.canChi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cung hoàng đạo:</span>
                  <span className="font-semibold" data-testid="text-zodiac">
                    {todayInfo.zodiacSign}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Giờ hoàng đạo:</span>
                  <span className="font-semibold text-primary" data-testid="text-lucky-hours">
                    {todayInfo.luckyHours}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-3 md:p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 font-serif">Lễ Hội Sắp Tới</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="text-primary text-xl">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Đông Chí</div>
                    <div className="text-sm text-muted-foreground">22/12/2024 (11/11 âm lịch)</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                  <div className="text-secondary text-xl">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">Tết Nguyên Đán</div>
                    <div className="text-sm text-muted-foreground">29/01/2025 (Mùng 1/1 âm lịch)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
