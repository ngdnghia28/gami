"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertSolarToLunar } from "@/lib/lunar-utils";

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
  const [convertedResult, setConvertedResult] = useState<any>(null);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Tháng ${i + 1}`
  }));

  const handleConvert = () => {
    if (solarDate.day && solarDate.month && solarDate.year) {
      const result = convertSolarToLunar(
        parseInt(solarDate.year),
        parseInt(solarDate.month),
        parseInt(solarDate.day)
      );
      setConvertedResult(result);
    }
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
                      <Input
                        id="day"
                        type="number"
                        placeholder="07"
                        min="1"
                        max="31"
                        value={solarDate.day}
                        onChange={(e) => setSolarDate(prev => ({ ...prev, day: e.target.value }))}
                        data-testid="input-day"
                      />
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
                      <Input
                        id="year"
                        type="number"
                        placeholder="2024"
                        min="1900"
                        max="2100"
                        value={solarDate.year}
                        onChange={(e) => setSolarDate(prev => ({ ...prev, year: e.target.value }))}
                        data-testid="input-year"
                      />
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
