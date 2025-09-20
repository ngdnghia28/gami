"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, CalendarCheck, Star } from "lucide-react";
import { apiClient, type LunarDate } from "@/lib/api-client";

// Helper function to get short lunar day for mobile
const getShortLunarDay = (lunarDay: string): string => {
  return lunarDay.replace('Mùng ', '');
};

// Helper functions to format API response data
const formatLunarDay = (day: number): string => {
  return day <= 15 ? `Mùng ${day}` : `${day}`;
};

const formatLunarDate = (lunarData: LunarDate): string => {
  const formattedDay = formatLunarDay(lunarData.day);
  const leapText = lunarData.isLeap ? ' nhuận' : '';
  return `${formattedDay} tháng ${lunarData.month}${leapText} năm ${lunarData.year}`;
};

const getZodiacAnimal = (dayName: string): string => {
  // Extract the animal from the Can Chi day name
  const chiPart = dayName.split(' ')[1] || dayName;
  const animals: { [key: string]: string } = {
    'Tý': 'Chuột', 'Sửu': 'Trâu', 'Dần': 'Hổ', 'Mão': 'Mèo',
    'Thìn': 'Rồng', 'Tỵ': 'Rắn', 'Ngọ': 'Ngựa', 'Mùi': 'Dê',
    'Thân': 'Khỉ', 'Dậu': 'Gà', 'Tuất': 'Chó', 'Hợi': 'Heo'
  };
  return animals[chiPart] || chiPart;
};

// Updated interface to work with API
export interface CalendarDay {
  date: number;
  lunarDay: string;
  zodiacAnimal: string;
  isToday: boolean;
  isCurrentMonth: boolean;
  canChi?: string;
}

export default function LunarCalendar() {
  const [currentDate, setCurrentDate] = useState(() => {
    // Use a fixed date to avoid hydration mismatch
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [todayInfo, setTodayInfo] = useState({
    solarDate: '',
    lunarDate: '',
    canChi: '',
    zodiacSign: '',
    luckyHours: ''
  });
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedDateInfo, setSelectedDateInfo] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API-based function to get current lunar info
  const getCurrentLunarInfo = async () => {
    try {
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0]; // YYYY-MM-DD format
      const lunarData = await apiClient.getLunarDateBySolar(dateStr);
      
      return {
        solarDate: today.toLocaleDateString('vi-VN'),
        lunarDate: formatLunarDate(lunarData),
        canChi: lunarData.dayName,
        zodiacSign: getZodiacAnimal(lunarData.dayName),
        luckyHours: 'Tý, Dần, Mão' // This could be enhanced with API data
      };
    } catch (error) {
      console.error('Error fetching current lunar info:', error);
      return {
        solarDate: new Date().toLocaleDateString('vi-VN'),
        lunarDate: 'Đang tải...',
        canChi: 'Đang tải...',
        zodiacSign: 'Đang tải...',
        luckyHours: 'Tý, Dần, Mão'
      };
    }
  };

  // API-based function to generate calendar days
  const generateCalendarDays = async (currentDate: Date) => {
    try {
      setLoading(true);
      setError(null);
      
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const today = new Date();
      
      // Get first day of month and number of days
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDayOfWeek = firstDay.getDay();
      
      // Get previous month's last days
      const prevMonth = new Date(year, month - 1, 0);
      const daysInPrevMonth = prevMonth.getDate();
      
      // Create date range for API call
      const startDate = new Date(year, month - 1, daysInPrevMonth - startingDayOfWeek + 1);
      const endDate = new Date(year, month + 1, 42 - daysInMonth - startingDayOfWeek); // Full 6 weeks
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];
      
      // Fetch lunar dates from API
      const lunarDates = await apiClient.getLunarDates(startDateStr, endDateStr);
      
      // Create a map of solar dates to lunar data for faster lookup
      const lunarDateMap = new Map<string, LunarDate>();
      lunarDates.forEach(ld => {
        // Since the API doesn't return solarDate, we need to calculate it based on the range
        // For now, we'll handle individual date lookups in the fallback
        const key = `${ld.year}-${ld.month}-${ld.day}`;
        lunarDateMap.set(key, ld);
      });
      
      const days: CalendarDay[] = [];
      
      // Previous month days
      for (let i = startingDayOfWeek - 1; i >= 0; i--) {
        const date = daysInPrevMonth - i;
        const dateObj = new Date(year, month - 1, date);
        
        // Try to get individual lunar date if range API doesn't work
        let lunarInfo: LunarDate | null = null;
        try {
          const dateStr = dateObj.toISOString().split('T')[0];
          lunarInfo = await apiClient.getLunarDateBySolar(dateStr);
        } catch (error) {
          console.warn('Could not fetch lunar date for', dateObj);
        }
        
        days.push({
          date,
          lunarDay: lunarInfo ? formatLunarDay(lunarInfo.day) : 'N/A',
          zodiacAnimal: lunarInfo ? lunarInfo.dayName : 'N/A',
          canChi: lunarInfo?.dayName,
          isToday: false,
          isCurrentMonth: false
        });
      }
      
      // Current month days
      for (let date = 1; date <= daysInMonth; date++) {
        const dateObj = new Date(year, month, date);
        const isToday = today.getFullYear() === year && 
                       today.getMonth() === month && 
                       today.getDate() === date;
        
        // Try to get individual lunar date if range API doesn't work
        let lunarInfo: LunarDate | null = null;
        try {
          const dateStr = dateObj.toISOString().split('T')[0];
          lunarInfo = await apiClient.getLunarDateBySolar(dateStr);
        } catch (error) {
          console.warn('Could not fetch lunar date for', dateObj);
        }
        
        days.push({
          date,
          lunarDay: lunarInfo ? formatLunarDay(lunarInfo.day) : 'N/A',
          zodiacAnimal: lunarInfo ? lunarInfo.dayName : 'N/A',
          canChi: lunarInfo?.dayName,
          isToday,
          isCurrentMonth: true
        });
      }
      
      // Next month days to fill grid
      const remainingDays = 42 - days.length; // 6 weeks * 7 days
      for (let date = 1; date <= remainingDays; date++) {
        const dateObj = new Date(year, month + 1, date);
        
        // Try to get individual lunar date if range API doesn't work
        let lunarInfo: LunarDate | null = null;
        try {
          const dateStr = dateObj.toISOString().split('T')[0];
          lunarInfo = await apiClient.getLunarDateBySolar(dateStr);
        } catch (error) {
          console.warn('Could not fetch lunar date for', dateObj);
        }
        
        days.push({
          date,
          lunarDay: lunarInfo ? formatLunarDay(lunarInfo.day) : 'N/A',
          zodiacAnimal: lunarInfo ? lunarInfo.dayName : 'N/A',
          canChi: lunarInfo?.dayName,
          isToday: false,
          isCurrentMonth: false
        });
      }
      
      setCalendarDays(days);
    } catch (error) {
      console.error('Error generating calendar days:', error);
      setError('Không thể tải dữ liệu lịch');
      setCalendarDays([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only run on client-side to avoid hydration mismatch
    const now = new Date();
    setCurrentDate(now);
    setMounted(true);
    
    // Load initial data
    getCurrentLunarInfo().then(setTodayInfo);
    generateCalendarDays(now);
  }, []);

  // Update calendar when current date changes
  useEffect(() => {
    if (mounted) {
      generateCalendarDays(currentDate);
    }
  }, [currentDate, mounted]);

  const getSelectedDateInfo = async (year: number, month: number, day: number) => {
    try {
      const selectedDate = new Date(year, month - 1, day);
      const dateStr = selectedDate.toISOString().split('T')[0];
      const lunarData = await apiClient.getLunarDateBySolar(dateStr);
      
      return {
        solarDate: selectedDate.toLocaleDateString('vi-VN'),
        lunarDate: formatLunarDate(lunarData),
        canChi: lunarData.dayName,
        zodiacSign: getZodiacAnimal(lunarData.dayName),
        luckyHours: 'Tý, Dần, Mão'
      };
    } catch (error) {
      console.error('Error fetching selected date info:', error);
      const selectedDate = new Date(year, month - 1, day);
      return {
        solarDate: selectedDate.toLocaleDateString('vi-VN'),
        lunarDate: 'Đang tải...',
        canChi: 'Đang tải...',
        zodiacSign: 'Đang tải...',
        luckyHours: 'Tý, Dần, Mão'
      };
    }
  };

  const handleDayClick = async (dayDate: number, isCurrentMonth: boolean) => {
    if (isCurrentMonth) {
      setSelectedDay(dayDate);
      const selectedInfo = await getSelectedDateInfo(
        currentDate.getFullYear(), 
        currentDate.getMonth() + 1, 
        dayDate
      );
      setSelectedDateInfo(selectedInfo);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
    // Reset selected day when changing month
    setSelectedDay(null);
    setSelectedDateInfo(null);
  };

  // Determine which info to display
  const displayInfo = selectedDateInfo || todayInfo;
  const displayTitle = selectedDateInfo ? "Thông Tin Ngày Được Chọn" : "Thông Tin Hôm Nay";

  const dayHeaders = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  return (
    <section className="min-h-screen py-8 md:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold font-serif mb-2 md:mb-4">
            Lịch Âm Tháng {currentDate.getMonth() + 1} Năm {currentDate.getFullYear()}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground">Tháng {currentDate.getMonth() + 1} âm lịch - Năm Giáp Thìn</p>
        </div>

        {/* Today's Information - Mobile: Before calendar, Desktop: Before calendar */}
        <div className="block md:hidden mb-4">
          <Card className="p-4">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 font-serif">{displayTitle}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dương lịch:</span>
                  <span className="font-semibold" data-testid="text-solar-date">
                    {mounted ? displayInfo.solarDate : 'Đang tải...'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Âm lịch:</span>
                  <span className="font-semibold" data-testid="text-lunar-date">
                    {displayInfo.lunarDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Chi:</span>
                  <span className="font-semibold text-secondary" data-testid="text-can-chi">
                    {displayInfo.canChi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cung hoàng đạo:</span>
                  <span className="font-semibold" data-testid="text-zodiac">
                    {displayInfo.zodiacSign}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Giờ hoàng đạo:</span>
                  <span className="font-semibold text-primary" data-testid="text-lucky-hours">
                    {displayInfo.luckyHours}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Desktop: Both sections before calendar */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 mb-6">
          <Card className="p-6">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 font-serif">{displayTitle}</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dương lịch:</span>
                  <span className="font-semibold" data-testid="text-solar-date">
                    {mounted ? displayInfo.solarDate : 'Đang tải...'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Âm lịch:</span>
                  <span className="font-semibold" data-testid="text-lunar-date">
                    {displayInfo.lunarDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Can Chi:</span>
                  <span className="font-semibold text-secondary" data-testid="text-can-chi">
                    {displayInfo.canChi}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Cung hoàng đạo:</span>
                  <span className="font-semibold" data-testid="text-zodiac">
                    {displayInfo.zodiacSign}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Giờ hoàng đạo:</span>
                  <span className="font-semibold text-primary" data-testid="text-lucky-hours">
                    {displayInfo.luckyHours}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6">
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

        {/* Calendar Header */}
        <Card className="p-2 md:p-6 mb-4 md:mb-6">
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
            <div className="grid grid-cols-7 gap-1 md:gap-2">
              {/* Day Headers */}
              {dayHeaders.map((day) => (
                <div
                  key={day}
                  className={`text-center p-1 md:p-3 font-semibold text-sm md:text-base ${
                    day === 'CN' || day === 'T7' ? 'text-primary' : ''
                  }`}
                >
                  {day}
                </div>
              ))}

              {/* Calendar Days */}
              {calendarDays.map((day, index) => {
                const isSelected = selectedDay === day.date && day.isCurrentMonth;
                return (
                  <div
                    key={index}
                    onClick={() => handleDayClick(day.date, day.isCurrentMonth)}
                    className={`lunar-day border border-border rounded-md md:rounded-lg p-1 md:p-4 text-center cursor-pointer hover:bg-accent/10 aspect-square md:min-h-[120px] flex flex-col justify-center transition-all duration-200 ${
                      day.isToday ? 'bg-primary text-primary-foreground border-primary' : 
                      isSelected ? 'bg-green-100 dark:bg-green-800/40' : 'bg-background'
                    } ${
                      day.isCurrentMonth ? '' : 'opacity-50'
                    }`}
                    data-testid={`calendar-day-${day.date}`}
                  >
                    <div className="text-base md:text-xl font-semibold mb-0 md:mb-2">{day.date}</div>
                    {/* Mobile: Short lunar day only */}
                    <div className={`block md:hidden text-[10px] leading-tight ${
                      day.isToday ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>{getShortLunarDay(day.lunarDay)}</div>
                    {/* Desktop: Full lunar day */}
                    <div className={`hidden md:block text-sm leading-tight mb-1 font-medium ${
                      day.isToday ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>{day.lunarDay}</div>
                    <div className={`hidden md:block text-sm leading-tight font-medium ${
                      day.isToday ? 'text-primary-foreground' : 'text-secondary'
                    }`}>{day.zodiacAnimal}</div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Festivals Section - Mobile only: After calendar */}
        <div className="block md:hidden mt-8">
          <Card className="p-4">
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
