"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { apiClient, type LunarDate } from "@/lib/api-client";

export default function DateConverter() {
  const [activeTab, setActiveTab] = useState<'solar-to-lunar' | 'lunar-to-solar'>('solar-to-lunar');
  const [solarDate, setSolarDate] = useState(() => {
    const today = new Date();
    return {
      day: today.getDate().toString(),
      month: (today.getMonth() + 1).toString(),
      year: today.getFullYear().toString()
    };
  });
  const [lunarDate, setLunarDate] = useState(() => {
    const today = new Date();
    
    return {
      day: today.getDate().toString(),
      month: (today.getMonth() + 1).toString(),
      year: today.getFullYear().toString(),
      isLeapMonth: false
    };
  });
  const [convertedResult, setConvertedResult] = useState<any>(null);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Tháng ${i + 1}`
  }));

  const days = Array.from({ length: 31 }, (_, i) => ({
    value: (i + 1).toString(),
    label: (i + 1).toString()
  }));

  const years = Array.from({ length: 201 }, (_, i) => ({
    value: (1900 + i).toString(),
    label: (1900 + i).toString()
  }));

  // Function to validate and adjust date
  const validateAndAdjustDate = (day: number, month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
      return { day: 1, month, year };
    }
    return { day, month, year };
  };

  const handleConvert = async () => {
    if (activeTab === 'solar-to-lunar') {
      if (solarDate.day && solarDate.month && solarDate.year) {
        try {
          const validatedDate = validateAndAdjustDate(
            parseInt(solarDate.day),
            parseInt(solarDate.month),
            parseInt(solarDate.year)
          );
          
          // Update state if date was adjusted
          if (validatedDate.day !== parseInt(solarDate.day)) {
            setSolarDate(prev => ({ ...prev, day: validatedDate.day.toString() }));
          }
          
          // Create date string for API call
          const dateObj = new Date(validatedDate.year, validatedDate.month - 1, validatedDate.day);
          const dateStr = dateObj.toISOString().split('T')[0];
          
          // Call API to get lunar date
          const lunarData = await apiClient.getLunarDateBySolar(dateStr);
          
          const result = {
            lunarDay: `${lunarData.lunarDay}`,
            lunarMonth: `Tháng ${lunarData.lunarMonth}`,
            lunarYear: lunarData.lunarYear,
            canChi: lunarData.canChi,
            zodiacSign: lunarData.zodiac,
            zodiacAnimal: lunarData.canChi,
            season: getSeason(validatedDate.month),
            description: `Ngày ${validatedDate.day}/${validatedDate.month}/${validatedDate.year} dương lịch tương ứng với ngày ${lunarData.lunarDay} tháng ${lunarData.lunarMonth} năm ${lunarData.lunarYear} âm lịch.`
          };
          setConvertedResult(result);
        } catch (error) {
          console.error('Error converting solar to lunar:', error);
          setConvertedResult({
            lunarDay: 'Lỗi',
            lunarMonth: 'Không thể chuyển đổi',
            canChi: 'Lỗi',
            zodiacSign: 'Lỗi',
            zodiacAnimal: 'Lỗi',
            season: 'Lỗi',
            description: 'Không thể chuyển đổi ngày này. Vui lòng thử lại.'
          });
        }
      }
    } else {
      if (lunarDate.day && lunarDate.month && lunarDate.year) {
        const validatedDate = validateAndAdjustDate(
          parseInt(lunarDate.day),
          parseInt(lunarDate.month),
          parseInt(lunarDate.year)
        );
        
        // Update state if date was adjusted
        if (validatedDate.day !== parseInt(lunarDate.day)) {
          setLunarDate(prev => ({ ...prev, day: validatedDate.day.toString() }));
        }
        
        // Note: For lunar to solar conversion, we would need a different API endpoint
        // For now, keeping the approximate calculation as a fallback
        const monthOffset = lunarDate.isLeapMonth ? 15 : 0;
        const approximateSolarDate = new Date(
          validatedDate.year,
          validatedDate.month - 1,
          validatedDate.day + monthOffset
        );
        
        const leapText = lunarDate.isLeapMonth ? ' nhuận' : '';
        const result = {
          solarDay: approximateSolarDate.getDate().toString(),
          solarMonth: `Tháng ${approximateSolarDate.getMonth() + 1}`,
          solarYear: approximateSolarDate.getFullYear().toString(),
          weekDay: approximateSolarDate.toLocaleDateString('vi-VN', { weekday: 'long' }),
          season: getSeason(approximateSolarDate.getMonth() + 1),
          description: `Ngày ${validatedDate.day} tháng ${validatedDate.month}${leapText} âm lịch năm ${validatedDate.year} tương ứng với ngày ${approximateSolarDate.getDate()}/${approximateSolarDate.getMonth() + 1}/${approximateSolarDate.getFullYear()} dương lịch.`
        };
        setConvertedResult(result);
      }
    }
  };

  const getSeason = (month: number): string => {
    if (month >= 12 || month <= 2) return 'Đông Chí';
    if (month >= 3 && month <= 5) return 'Xuân Phân';
    if (month >= 6 && month <= 8) return 'Hạ Chí';
    return 'Thu Phân';
  };

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-serif mb-4">Chuyển Đổi Lịch</h2>
          <p className="text-muted-foreground">Chuyển đổi giữa dương lịch và âm lịch một cách chính xác</p>
        </div>

        <Card className="p-4 md:p-8">
          <CardContent className="pt-6">
            {/* Converter Tabs */}
            <div className="flex mb-8 bg-muted rounded-lg p-1">
              <Button
                variant={activeTab === 'solar-to-lunar' ? 'default' : 'ghost'}
                className={`flex-1 ${
                  activeTab === 'solar-to-lunar' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('solar-to-lunar')}
                data-testid="button-solar-to-lunar"
              >
                Dương → Âm
              </Button>
              <Button
                variant={activeTab === 'lunar-to-solar' ? 'default' : 'ghost'}
                className={`flex-1 ${
                  activeTab === 'lunar-to-solar' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                onClick={() => setActiveTab('lunar-to-solar')}
                data-testid="button-lunar-to-solar"
              >
                Âm → Dương
              </Button>
            </div>

            {/* Solar to Lunar Converter */}
            {activeTab === 'solar-to-lunar' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Nhập Ngày Dương Lịch</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="day">Ngày</Label>
                      <Select
                        value={solarDate.day}
                        onValueChange={(value) => setSolarDate(prev => ({ ...prev, day: value }))}
                      >
                        <SelectTrigger data-testid="select-day">
                          <SelectValue placeholder="Chọn ngày" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day.value} value={day.value}>
                              {day.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="month">Tháng</Label>
                      <Select
                        value={solarDate.month}
                        onValueChange={(value) => setSolarDate(prev => ({ ...prev, month: value }))}
                      >
                        <SelectTrigger data-testid="select-month">
                          <SelectValue placeholder="Chọn tháng" />
                        </SelectTrigger>
                        <SelectContent>
                          {months.map((month) => (
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year">Năm</Label>
                      <Select
                        value={solarDate.year}
                        onValueChange={(value) => setSolarDate(prev => ({ ...prev, year: value }))}
                      >
                        <SelectTrigger data-testid="select-year">
                          <SelectValue placeholder="Chọn năm" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleConvert}
                      className="w-full bg-primary text-primary-foreground"
                      data-testid="button-convert"
                    >
                      Chuyển Đổi
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Kết Quả Âm Lịch</h3>
                  {convertedResult ? (
                    <div className="bg-muted rounded-lg p-3 md:p-6 space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2" data-testid="text-lunar-day">
                          {convertedResult.lunarDay}
                        </div>
                        <div className="text-xl font-semibold" data-testid="text-lunar-month-year">
                          {convertedResult.lunarMonth} {convertedResult.lunarYear}
                        </div>
                      </div>
                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Can Chi:</span>
                          <span className="font-semibold text-secondary" data-testid="text-result-can-chi">
                            {convertedResult.canChi}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cung hoàng đạo:</span>
                          <span className="font-semibold" data-testid="text-result-zodiac">
                            {convertedResult.zodiacSign}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Con giáp:</span>
                          <span className="font-semibold" data-testid="text-result-animal">
                            {convertedResult.zodiacAnimal}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tiết khí:</span>
                          <span className="font-semibold" data-testid="text-result-season">
                            {convertedResult.season}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg p-3 md:p-6 text-center text-muted-foreground">
                      Nhập thông tin ngày tháng để xem kết quả chuyển đổi
                    </div>
                  )}

                  {convertedResult && (
                    <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Thông Tin Thêm</h4>
                      <p className="text-sm text-muted-foreground">
                        {convertedResult.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Lunar to Solar Converter */}
            {activeTab === 'lunar-to-solar' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Nhập Ngày Âm Lịch</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="lunar-day">Ngày</Label>
                      <Select
                        value={lunarDate.day}
                        onValueChange={(value) => setLunarDate(prev => ({ ...prev, day: value }))}
                      >
                        <SelectTrigger data-testid="select-lunar-day">
                          <SelectValue placeholder="Chọn ngày âm" />
                        </SelectTrigger>
                        <SelectContent>
                          {days.map((day) => (
                            <SelectItem key={day.value} value={day.value}>
                              {day.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="lunar-month">Tháng</Label>
                      <div className="flex items-center space-x-3">
                        <Select
                          value={lunarDate.month}
                          onValueChange={(value) => setLunarDate(prev => ({ ...prev, month: value }))}
                        >
                          <SelectTrigger data-testid="select-lunar-month" className="flex-1">
                            <SelectValue placeholder="Chọn tháng âm" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((month) => (
                              <SelectItem key={month.value} value={month.value}>
                                {month.label} âm
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <div className="flex items-center space-x-2 whitespace-nowrap">
                          <Checkbox
                            id="lunar-leap-month"
                            checked={lunarDate.isLeapMonth}
                            onCheckedChange={(checked) => 
                              setLunarDate(prev => ({ ...prev, isLeapMonth: !!checked }))
                            }
                            data-testid="checkbox-leap-month"
                          />
                          <Label 
                            htmlFor="lunar-leap-month" 
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Tháng nhuận
                          </Label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lunar-year">Năm</Label>
                      <Select
                        value={lunarDate.year}
                        onValueChange={(value) => setLunarDate(prev => ({ ...prev, year: value }))}
                      >
                        <SelectTrigger data-testid="select-lunar-year">
                          <SelectValue placeholder="Chọn năm âm" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleConvert}
                      className="w-full bg-primary text-primary-foreground"
                      data-testid="button-convert-lunar"
                    >
                      Chuyển Đổi
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Kết Quả Dương Lịch</h3>
                  {convertedResult ? (
                    <div className="bg-muted rounded-lg p-3 md:p-6 space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2" data-testid="text-solar-day">
                          {convertedResult.solarDay}
                        </div>
                        <div className="text-xl font-semibold" data-testid="text-solar-month-year">
                          {convertedResult.solarMonth} {convertedResult.solarYear}
                        </div>
                      </div>
                      <div className="border-t border-border pt-4 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Thứ:</span>
                          <span className="font-semibold text-secondary" data-testid="text-result-weekday">
                            {convertedResult.weekDay}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tiết khí:</span>
                          <span className="font-semibold" data-testid="text-result-solar-season">
                            {convertedResult.season}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-muted rounded-lg p-3 md:p-6 text-center text-muted-foreground">
                      Nhập thông tin ngày tháng âm lịch để xem kết quả chuyển đổi
                    </div>
                  )}

                  {convertedResult && (
                    <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Thông Tin Chuyển Đổi</h4>
                      <p className="text-sm text-muted-foreground">
                        {convertedResult.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
