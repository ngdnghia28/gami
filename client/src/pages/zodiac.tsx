import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, Heart, Briefcase } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

interface ZodiacSign {
  name: string;
  vietnameseName: string;
  element: string;
  dates: string;
  symbol: string;
  characteristics: string[];
  personality: string;
  love: string;
  career: string;
  luckyNumbers: number[];
  luckyColors: string[];
}

const zodiacSigns: ZodiacSign[] = [
  {
    name: "Aries",
    vietnameseName: "Bạch Dương",
    element: "Hỏa",
    dates: "21/3 - 19/4",
    symbol: "♈",
    characteristics: ["Năng động", "Quyết đoán", "Dũng cảm", "Tự tin"],
    personality: "Người Bạch Dương luôn tràn đầy năng lượng và không ngại đối mặt với thử thách. Họ có tính cách thẳng thắn, quyết đoán và thích làm lãnh đạo.",
    love: "Trong tình yêu, Bạch Dương rất nhiệt tình và chân thành. Họ thích chinh phục và bảo vệ người mình yêu.",
    career: "Phù hợp với vai trò lãnh đạo, kinh doanh, thể thao, hoặc các công việc đòi hỏi sự quyết đoán.",
    luckyNumbers: [1, 8, 17],
    luckyColors: ["Đỏ", "Cam"]
  },
  {
    name: "Taurus",
    vietnameseName: "Kim Ngưu",
    element: "Thổ",
    dates: "20/4 - 20/5",
    symbol: "♉",
    characteristics: ["Kiên nhẫn", "Thực tế", "Đáng tin cậy", "Bền bỉ"],
    personality: "Kim Ngưu là những người có tính cách ổn định, kiên nhẫn và rất thực tế. Họ yêu thích sự thoải mái và an toàn trong cuộc sống.",
    love: "Trong tình yêu, Kim Ngưu rất chung thủy và tận tâm. Họ thích sự ổn định và lâu dài trong mối quan hệ.",
    career: "Thích hợp với nghề nghiệp ổn định như ngân hàng, bất động sản, nông nghiệp, hoặc nghệ thuật.",
    luckyNumbers: [2, 6, 9],
    luckyColors: ["Xanh lá", "Hồng"]
  },
  {
    name: "Gemini",
    vietnameseName: "Song Tử",
    element: "Khí",
    dates: "21/5 - 20/6",
    symbol: "♊",
    characteristics: ["Thông minh", "Linh hoạt", "Giao tiếp tốt", "Tò mò"],
    personality: "Song Tử có trí tuệ sắc bén và khả năng giao tiếp xuất sắc. Họ thích học hỏi điều mới và có thể thích nghi nhanh với mọi hoàn cảnh.",
    love: "Trong tình yêu, Song Tử cần sự mới mẻ và thú vị. Họ thích những cuộc trò chuyện sâu sắc và người bạn đời thông minh.",
    career: "Phù hợp với ngành truyền thông, giáo dục, bán hàng, viết lách, hoặc các công việc đòi hỏi giao tiếp.",
    luckyNumbers: [5, 7, 14],
    luckyColors: ["Vàng", "Bạc"]
  },
  {
    name: "Cancer",
    vietnameseName: "Cử Giải",
    element: "Thủy",
    dates: "21/6 - 22/7",
    symbol: "♋",
    characteristics: ["Nhạy cảm", "Quan tâm", "Bảo vệ", "Trực giác"],
    personality: "Cự Giải có trái tim nhân hậu và rất quan tâm đến gia đình. Họ có trực giác tốt và khả năng thấu hiểu cảm xúc của người khác.",
    love: "Trong tình yêu, Cự Giải rất tận tâm và muốn chăm sóc người mình yêu. Họ coi trọng gia đình và sự an toàn tình cảm.",
    career: "Thích hợp với nghề y tá, giáo viên, đầu bếp, hoặc các công việc chăm sóc và phục vụ cộng đồng.",
    luckyNumbers: [2, 7, 11],
    luckyColors: ["Bạc", "Xanh dương nhạt"]
  },
  {
    name: "Leo",
    vietnameseName: "Sư Tử",
    element: "Hỏa",
    dates: "23/7 - 22/8",
    symbol: "♌",
    characteristics: ["Tự tin", "Hào phóng", "Sáng tạo", "Lãnh đạo"],
    personality: "Sư Tử có tính cách mạnh mẽ và tự tin. Họ thích được chú ý và có khả năng lãnh đạo tự nhiên. Sư Tử rất hào phóng và trung thành.",
    love: "Trong tình yêu, Sư Tử rất lãng mạn và thích thể hiện tình cảm một cách hoành tráng. Họ cần được yêu thương và tôn trọng.",
    career: "Phù hợp với nghề diễn viên, lãnh đạo, thiết kế, hoặc các công việc sáng tạo và thu hút sự chú ý.",
    luckyNumbers: [1, 3, 10],
    luckyColors: ["Vàng", "Cam"]
  },
  {
    name: "Virgo",
    vietnameseName: "Xử Nữ",
    element: "Thổ",
    dates: "23/8 - 22/9",
    symbol: "♍",
    characteristics: ["Cẩn thận", "Phân tích", "Hoàn hảo", "Thực tế"],
    personality: "Xử Nữ có tính cách cẩn thận và luôn theo đuổi sự hoàn hảo. Họ có khả năng phân tích tốt và rất chú ý đến chi tiết.",
    love: "Trong tình yêu, Xử Nữ tỏ ra khá kín đáo nhưng rất chân thành. Họ thích sự ổn định và tin tưởng lẫn nhau.",
    career: "Thích hợp với nghề kế toán, nghiên cứu, y tế, hoặc các công việc đòi hỏi độ chính xác cao.",
    luckyNumbers: [3, 15, 27],
    luckyColors: ["Xanh lá đậm", "Nâu"]
  },
  {
    name: "Libra",
    vietnameseName: "Thiên Bình",
    element: "Khí",
    dates: "23/9 - 22/10",
    symbol: "♎",
    characteristics: ["Cân bằng", "Hòa hợp", "Công bằng", "Thẩm mỹ"],
    personality: "Thiên Bình luôn tìm kiếm sự cân bằng và hòa hợp trong cuộc sống. Họ có khiếu thẩm mỹ tốt và thích sự công bằng trong mọi việc.",
    love: "Trong tình yêu, Thiên Bình rất lãng mạn và coi trọng sự hòa hợp. Họ thích những mối quan hệ đẹp và cân bằng.",
    career: "Phù hợp với nghề luật sư, thiết kế, nghệ thuật, ngoại giao, hoặc các công việc cần sự cân bằng.",
    luckyNumbers: [6, 15, 24],
    luckyColors: ["Hồng", "Xanh dương nhạt"]
  },
  {
    name: "Scorpio",
    vietnameseName: "Bọ Cạp",
    element: "Thủy",
    dates: "23/10 - 21/11",
    symbol: "♏",
    characteristics: ["Bí ẩn", "Sâu sắc", "Quyết tâm", "Trực giác"],
    personality: "Bọ Cạp có tính cách sâu sắc và bí ẩn. Họ có ý chí mạnh mẽ và khả năng thấu hiểu tâm lý người khác rất tốt.",
    love: "Trong tình yêu, Bọ Cạp rất đam mê và chân thành. Họ cần sự tin tưởng tuyệt đối và không thích sự phản bội.",
    career: "Thích hợp với nghề tâm lý học, nghiên cứu, thám tử, hoặc các công việc đòi hỏi sự sâu sắc.",
    luckyNumbers: [4, 13, 27],
    luckyColors: ["Đỏ đậm", "Đen"]
  },
  {
    name: "Sagittarius",
    vietnameseName: "Nhân Mã",
    element: "Hỏa",
    dates: "22/11 - 21/12",
    symbol: "♐",
    characteristics: ["Tự do", "Phiêu lưu", "Lạc quan", "Triết học"],
    personality: "Nhân Mã yêu tự do và thích khám phá. Họ có tính cách lạc quan và luôn tìm kiếm ý nghĩa sâu sắc trong cuộc sống.",
    love: "Trong tình yêu, Nhân Mã cần không gian tự do và sự phiêu lưu. Họ thích những mối quan hệ cởi mở và thú vị.",
    career: "Phù hợp với nghề giáo viên, du lịch, triết học, thể thao, hoặc các công việc quốc tế.",
    luckyNumbers: [9, 18, 27],
    luckyColors: ["Tím", "Xanh dương"]
  },
  {
    name: "Capricorn",
    vietnameseName: "Ma Kết",
    element: "Thổ",
    dates: "22/12 - 19/1",
    symbol: "♑",
    characteristics: ["Kỷ luật", "Tham vọng", "Trách nhiệm", "Kiên trì"],
    personality: "Ma Kết có tính cách nghiêm túc và đầy tham vọng. Họ rất có kỷ luật và luôn cố gắng đạt được mục tiêu đã đề ra.",
    love: "Trong tình yêu, Ma Kết rất nghiêm túc và chân thành. Họ tìm kiếm một mối quan hệ ổn định và lâu dài.",
    career: "Thích hợp với nghề quản lý, kinh doanh, kỹ thuật, hoặc các vị trí đòi hỏi trách nhiệm cao.",
    luckyNumbers: [8, 10, 26],
    luckyColors: ["Nâu", "Xám"]
  },
  {
    name: "Aquarius",
    vietnameseName: "Bảo Bình",
    element: "Khí",
    dates: "20/1 - 18/2",
    symbol: "♒",
    characteristics: ["Độc lập", "Sáng tạo", "Nhân đạo", "Tiến bộ"],
    personality: "Bảo Bình có tư duy độc lập và tiến bộ. Họ quan tâm đến những vấn đề xã hội và luôn tìm kiếm những ý tưởng mới lạ.",
    love: "Trong tình yêu, Bảo Bình cần sự tự do và hiểu biết. Họ thích những mối quan hệ bình đẳng và cởi mở.",
    career: "Phù hợp với nghề công nghệ, khoa học, nhân đạo, hoặc các công việc sáng tạo và tiến bộ.",
    luckyNumbers: [4, 7, 11],
    luckyColors: ["Xanh dương", "Bạc"]
  },
  {
    name: "Pisces",
    vietnameseName: "Song Ngư",
    element: "Thủy",
    dates: "19/2 - 20/3",
    symbol: "♓",
    characteristics: ["Nhạy cảm", "Trực giác", "Nghệ thuật", "Đồng cảm"],
    personality: "Song Ngư có trái tim nhạy cảm và khả năng đồng cảm tuyệt vời. Họ có trực giác mạnh và thường có khiếu nghệ thuật.",
    love: "Trong tình yêu, Song Ngư rất lãng mạn và tận tụy. Họ cần được hiểu và yêu thương một cách chân thành.",
    career: "Thích hợp với nghề nghệ thuật, tâm lý học, y tế, hoặc các công việc giúp đỡ người khác.",
    luckyNumbers: [7, 12, 29],
    luckyColors: ["Xanh dương nhạt", "Tím nhạt"]
  }
];

export default function Zodiac() {
  useSEO({
    title: "12 Cung Hoàng Đạo - Tính Cách Và Vận Mệnh Theo Ngày Sinh",
    description: "Khám phá 12 cung hoàng đạo và tính cách của bạn. Xem đặc điểm tính cách, tình yêu, sự nghiệp, số may mắn và màu sắc theo cung hoàng đạo.",
    keywords: "12 cung hoàng đạo, zodiac, cung hoàng đạo, tính cách theo cung, vận mệnh, bạch dương, kim ngưu, song tử, cự giải, sư tử, xử nữ",
    canonical: "https://am-lich-viet-nam.replit.app/zodiac",
    ogTitle: "12 Cung Hoàng Đạo - Tính Cách Và Vận Mệnh",
    ogDescription: "Khám phá 12 cung hoàng đạo và tính cách của bạn. Xem đặc điểm tính cách, tình yêu, sự nghiệp, số may mắn và màu sắc theo cung hoàng đạo.",
    ogUrl: "https://am-lich-viet-nam.replit.app/zodiac",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "12 Cung Hoàng Đạo",
      "description": "Thông tin chi tiết về 12 cung hoàng đạo và tính cách theo ngày sinh",
      "url": "https://am-lich-viet-nam.replit.app/zodiac"
    }
  });

  return (
    <main className="min-h-screen py-8 md:py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold font-serif mb-4">12 Cung Hoàng Đạo</h1>
          <p className="text-muted-foreground">
            Khám phá tính cách và vận mệnh của bạn qua 12 cung hoàng đạo phương Tây
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {zodiacSigns.map((sign, index) => (
            <Card 
              key={sign.name} 
              className="p-3 md:p-6 hover:shadow-lg transition-all border border-border"
              data-testid={`card-zodiac-${sign.name.toLowerCase()}`}
            >
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2" data-testid={`symbol-${sign.name.toLowerCase()}`}>
                    {sign.symbol}
                  </div>
                  <h3 className="text-xl font-bold text-primary font-serif mb-1">
                    {sign.vietnameseName}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium">
                    {sign.name} • {sign.dates}
                  </p>
                  <Badge 
                    variant="secondary" 
                    className="mt-2"
                    data-testid={`element-${sign.name.toLowerCase()}`}
                  >
                    Ngũ hành: {sign.element}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-sm">Đặc điểm</h4>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sign.characteristics.map((trait, i) => (
                        <Badge 
                          key={i} 
                          variant="outline" 
                          className="text-xs"
                          data-testid={`trait-${sign.name.toLowerCase()}-${i}`}
                        >
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-secondary" />
                      <h4 className="font-semibold text-sm">Tính cách</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sign.personality}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-red-500" />
                      <h4 className="font-semibold text-sm">Tình yêu</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sign.love}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="h-4 w-4 text-blue-500" />
                      <h4 className="font-semibold text-sm">Sự nghiệp</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {sign.career}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                    <div>
                      <h5 className="font-semibold text-xs mb-1">Số may mắn</h5>
                      <div className="flex gap-1">
                        {sign.luckyNumbers.map((num, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            data-testid={`lucky-number-${sign.name.toLowerCase()}-${i}`}
                          >
                            {num}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-xs mb-1">Màu may mắn</h5>
                      <div className="flex flex-col gap-1">
                        {sign.luckyColors.map((color, i) => (
                          <span 
                            key={i} 
                            className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded"
                            data-testid={`lucky-color-${sign.name.toLowerCase()}-${i}`}
                          >
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}