import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { calculateAstrology } from "@/lib/astrology-utils";

export default function AstrologyForm() {
  const [birthInfo, setBirthInfo] = useState({
    day: '',
    month: '',
    year: '',
    hour: '',
    minute: '',
    gender: '',
    birthPlace: ''
  });
  const [astrologyResult, setAstrologyResult] = useState<any>(null);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Tháng ${i + 1}`
  }));

  const handleCalculate = () => {
    if (birthInfo.day && birthInfo.month && birthInfo.year && birthInfo.gender) {
      const result = calculateAstrology({
        day: parseInt(birthInfo.day),
        month: parseInt(birthInfo.month),
        year: parseInt(birthInfo.year),
        hour: parseInt(birthInfo.hour) || 12,
        minute: parseInt(birthInfo.minute) || 0,
        gender: birthInfo.gender,
        birthPlace: birthInfo.birthPlace
      });
      setAstrologyResult(result);
    }
  };

  return (
    <Card className="p-8">
      <CardContent className="pt-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-6 font-serif">Thông Tin Sinh</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <Label htmlFor="birth-day">Ngày</Label>
                  <Input
                    id="birth-day"
                    type="number"
                    placeholder="15"
                    min="1"
                    max="31"
                    value={birthInfo.day}
                    onChange={(e) => setBirthInfo(prev => ({ ...prev, day: e.target.value }))}
                    data-testid="input-birth-day"
                  />
                </div>
                <div>
                  <Label htmlFor="birth-month">Tháng</Label>
                  <Select
                    value={birthInfo.month}
                    onValueChange={(value) => setBirthInfo(prev => ({ ...prev, month: value }))}
                  >
                    <SelectTrigger data-testid="select-birth-month">
                      <SelectValue placeholder="Tháng" />
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
                  <Label htmlFor="birth-year">Năm</Label>
                  <Input
                    id="birth-year"
                    type="number"
                    placeholder="1990"
                    min="1900"
                    max="2024"
                    value={birthInfo.year}
                    onChange={(e) => setBirthInfo(prev => ({ ...prev, year: e.target.value }))}
                    data-testid="input-birth-year"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="birth-hour">Giờ</Label>
                  <Input
                    id="birth-hour"
                    type="number"
                    placeholder="14"
                    min="0"
                    max="23"
                    value={birthInfo.hour}
                    onChange={(e) => setBirthInfo(prev => ({ ...prev, hour: e.target.value }))}
                    data-testid="input-birth-hour"
                  />
                </div>
                <div>
                  <Label htmlFor="birth-minute">Phút</Label>
                  <Input
                    id="birth-minute"
                    type="number"
                    placeholder="30"
                    min="0"
                    max="59"
                    value={birthInfo.minute}
                    onChange={(e) => setBirthInfo(prev => ({ ...prev, minute: e.target.value }))}
                    data-testid="input-birth-minute"
                  />
                </div>
              </div>

              <div>
                <Label>Giới Tính</Label>
                <RadioGroup
                  value={birthInfo.gender}
                  onValueChange={(value) => setBirthInfo(prev => ({ ...prev, gender: value }))}
                  className="flex gap-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" data-testid="radio-male" />
                    <Label htmlFor="male">Nam</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" data-testid="radio-female" />
                    <Label htmlFor="female">Nữ</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="birth-place">Nơi Sinh (Tùy chọn)</Label>
                <Input
                  id="birth-place"
                  type="text"
                  placeholder="Hà Nội"
                  value={birthInfo.birthPlace}
                  onChange={(e) => setBirthInfo(prev => ({ ...prev, birthPlace: e.target.value }))}
                  data-testid="input-birth-place"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="w-full bg-primary text-primary-foreground"
                data-testid="button-calculate-astrology"
              >
                Xem Lá Số Tử Vi
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6 font-serif">Kết Quả Tử Vi</h3>
            {astrologyResult ? (
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Thông Tin Cơ Bản</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Năm sinh:</span>
                      <span className="font-semibold text-secondary" data-testid="text-birth-year-pillar">
                        {astrologyResult.yearPillar}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tuổi:</span>
                      <span className="font-semibold" data-testid="text-age">
                        {astrologyResult.age} tuổi
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Con giáp:</span>
                      <span className="font-semibold text-primary" data-testid="text-zodiac-animal">
                        {astrologyResult.zodiacAnimal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mệnh:</span>
                      <span className="font-semibold" data-testid="text-destiny">
                        {astrologyResult.destiny}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Four Pillars */}
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Tứ Trụ</h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div>
                      <div className="text-xs text-muted-foreground">Năm</div>
                      <div className="font-semibold text-primary" data-testid="text-year-can">
                        {astrologyResult.yearPillar.split(' ')[0]}
                      </div>
                      <div className="font-semibold text-secondary" data-testid="text-year-chi">
                        {astrologyResult.yearPillar.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Tháng</div>
                      <div className="font-semibold text-primary" data-testid="text-month-can">
                        {astrologyResult.monthPillar.split(' ')[0]}
                      </div>
                      <div className="font-semibold text-secondary" data-testid="text-month-chi">
                        {astrologyResult.monthPillar.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Ngày</div>
                      <div className="font-semibold text-primary" data-testid="text-day-can">
                        {astrologyResult.dayPillar.split(' ')[0]}
                      </div>
                      <div className="font-semibold text-secondary" data-testid="text-day-chi">
                        {astrologyResult.dayPillar.split(' ')[1]}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Giờ</div>
                      <div className="font-semibold text-primary" data-testid="text-hour-can">
                        {astrologyResult.hourPillar.split(' ')[0]}
                      </div>
                      <div className="font-semibold text-secondary" data-testid="text-hour-chi">
                        {astrologyResult.hourPillar.split(' ')[1]}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Personality Traits */}
                <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                  <h4 className="font-semibold mb-3 text-accent">Đặc Điểm Tính Cách</h4>
                  <div className="text-sm space-y-1 text-muted-foreground" data-testid="text-personality">
                    <p>{astrologyResult.personality}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-muted rounded-lg p-6 text-center text-muted-foreground">
                Nhập thông tin sinh để xem lá số tử vi
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
