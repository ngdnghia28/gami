import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, Star, Heart, Target, Users, AlertTriangle, Trophy } from "lucide-react";
import { calculateNumerology, type BirthInfo, type NumerologyResult } from "@/lib/numerology-utils";
import { useSEO } from "@/hooks/use-seo";

export default function Numerology() {
  useSEO({
    title: "Thần Số Học Online - Tính Toán Số Định Mệnh Miễn Phí",
    description: "Tính toán thần số học online miễn phí theo họ tên và ngày sinh. Khám phá số đường đời, số biểu hiện, tính cách và vận mệnh qua thần số học.",
    keywords: "thần số học, số định mệnh, số đường đời, numerology, tính cách theo số, vận mệnh, tính toán thần số",
    canonical: "https://am-lich-viet-nam.replit.app/numerology",
    ogTitle: "Thần Số Học Online - Tính Toán Số Định Mệnh",
    ogDescription: "Tính toán thần số học online miễn phí theo họ tên và ngày sinh. Khám phá số đường đời, số biểu hiện, tính cách và vận mệnh qua thần số học.",
    ogUrl: "https://am-lich-viet-nam.replit.app/numerology",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Thần Số Học Online",
      "description": "Tính toán thần số học và số định mệnh theo họ tên và ngày sinh",
      "url": "https://am-lich-viet-nam.replit.app/numerology"
    }
  });

  const [birthInfo, setBirthInfo] = useState({
    day: '',
    month: '',
    year: '',
    fullName: ''
  });
  const [numerologyResult, setNumerologyResult] = useState<NumerologyResult | null>(null);

  const months = Array.from({ length: 12 }, (_, i) => ({
    value: (i + 1).toString(),
    label: `Tháng ${i + 1}`
  }));

  const handleCalculate = () => {
    if (birthInfo.day && birthInfo.month && birthInfo.year && birthInfo.fullName.trim()) {
      const result = calculateNumerology({
        day: parseInt(birthInfo.day),
        month: parseInt(birthInfo.month),
        year: parseInt(birthInfo.year),
        fullName: birthInfo.fullName.trim()
      });
      setNumerologyResult(result);
    }
  };

  const isFormValid = birthInfo.day && birthInfo.month && birthInfo.year && birthInfo.fullName.trim();

  return (
    <main className="min-h-screen py-8 md:py-20 bg-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-xl md:text-3xl font-bold font-serif mb-2 md:mb-4">Thần Số Học Online</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Tính số định mệnh theo họ tên - Khám phá tính cách qua con số
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="p-4 md:p-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <Calculator className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold font-serif">Thông Tin Tính Toán</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="fullName" className="text-base font-medium">Họ và tên đầy đủ</Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nguyễn Văn An"
                    value={birthInfo.fullName}
                    onChange={(e) => setBirthInfo(prev => ({ ...prev, fullName: e.target.value }))}
                    className="mt-2"
                    data-testid="input-full-name"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Nhập họ tên đầy đủ để tính toán chính xác nhất
                  </p>
                </div>

                <div>
                  <Label className="text-base font-medium mb-3 block">Ngày tháng năm sinh</Label>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="birth-day" className="text-sm">Ngày</Label>
                      <Input
                        id="birth-day"
                        type="number"
                        placeholder="15"
                        min="1"
                        max="31"
                        value={birthInfo.day}
                        onChange={(e) => setBirthInfo(prev => ({ ...prev, day: e.target.value }))}
                        className="mt-1"
                        data-testid="input-birth-day"
                      />
                    </div>
                    <div>
                      <Label htmlFor="birth-month" className="text-sm">Tháng</Label>
                      <Select
                        value={birthInfo.month}
                        onValueChange={(value) => setBirthInfo(prev => ({ ...prev, month: value }))}
                      >
                        <SelectTrigger className="mt-1" data-testid="select-birth-month">
                          <SelectValue placeholder="Chọn" />
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
                      <Label htmlFor="birth-year" className="text-sm">Năm</Label>
                      <Input
                        id="birth-year"
                        type="number"
                        placeholder="1990"
                        min="1900"
                        max="2024"
                        value={birthInfo.year}
                        onChange={(e) => setBirthInfo(prev => ({ ...prev, year: e.target.value }))}
                        className="mt-1"
                        data-testid="input-birth-year"
                      />
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!isFormValid}
                  className="w-full bg-primary text-primary-foreground py-3"
                  data-testid="button-calculate-numerology"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  Tính Thần Số Học
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="p-4 md:p-8">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold font-serif">Kết Quả Thần Số</h3>
              </div>

              {numerologyResult ? (
                <div className="space-y-6">
                  {/* Main Numbers */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <div className="text-2xl font-bold text-primary mb-1" data-testid="text-life-path-number">
                        {numerologyResult.lifePathNumber}
                      </div>
                      <div className="text-sm font-medium">Số Đường Đời</div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                      <div className="text-2xl font-bold text-secondary mb-1" data-testid="text-expression-number">
                        {numerologyResult.expressionNumber}
                      </div>
                      <div className="text-sm font-medium">Số Biểu Hiện</div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="text-2xl font-bold text-accent mb-1" data-testid="text-personality-number">
                        {numerologyResult.personalityNumber}
                      </div>
                      <div className="text-sm font-medium">Số Tính Cách</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg border">
                      <div className="text-2xl font-bold mb-1" data-testid="text-birthday-number">
                        {numerologyResult.birthdayNumber}
                      </div>
                      <div className="text-sm font-medium">Số Sinh Nhật</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Lucky Numbers */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="h-4 w-4 text-secondary" />
                      <h4 className="font-semibold">Số May Mắn</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {numerologyResult.luckyNumbers.map((num, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className="px-3 py-1"
                          data-testid={`lucky-number-${index}`}
                        >
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Compatible Numbers */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Users className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">Số Tương Hợp</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {numerologyResult.compatibleNumbers.map((num, index) => (
                        <Badge 
                          key={index} 
                          variant="outline"
                          className="border-primary text-primary px-3 py-1"
                          data-testid={`compatible-number-${index}`}
                        >
                          {num}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground py-12">
                  <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nhập đầy đủ thông tin để xem kết quả thần số học</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        {numerologyResult && (
          <div className="mt-8 space-y-6">
            {/* Life Path Meaning */}
            <Card className="p-3 md:p-6">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold font-serif">Ý Nghĩa Số Đường Đời ({numerologyResult.lifePathNumber})</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-life-path-meaning">
                  {numerologyResult.lifePathMeaning}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Expression Meaning */}
              <Card className="p-3 md:p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="h-5 w-5 text-secondary" />
                    <h3 className="text-lg font-semibold font-serif">Số Biểu Hiện ({numerologyResult.expressionNumber})</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-expression-meaning">
                    {numerologyResult.expressionMeaning}
                  </p>
                </CardContent>
              </Card>

              {/* Personality Meaning */}
              <Card className="p-3 md:p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Heart className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold font-serif">Số Tính Cách ({numerologyResult.personalityNumber})</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm" data-testid="text-personality-meaning">
                    {numerologyResult.personalityMeaning}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Opportunities */}
              <Card className="p-3 md:p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Trophy className="h-5 w-5 text-green-500" />
                    <h3 className="text-lg font-semibold font-serif">Cơ Hội</h3>
                  </div>
                  <ul className="space-y-2">
                    {numerologyResult.opportunities.map((opportunity, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        data-testid={`opportunity-${index}`}
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        {opportunity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Challenges */}
              <Card className="p-3 md:p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                    <h3 className="text-lg font-semibold font-serif">Thách Thức</h3>
                  </div>
                  <ul className="space-y-2">
                    {numerologyResult.challenges.map((challenge, index) => (
                      <li 
                        key={index} 
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                        data-testid={`challenge-${index}`}
                      >
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        {challenge}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}