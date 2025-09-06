import AstrologyForm from "@/components/astrology-form";
import { useSEO } from "@/hooks/use-seo";

export default function Astrology() {
  useSEO({
    title: "Lá Số Tử Vi Online - Xem Tử Vi Theo Ngày Sinh Miễn Phí",
    description: "Xem lá số tử vi online miễn phí theo ngày giờ sinh. Tính toán tứ trụ Can Chi, mệnh, tính cách theo phong thủy truyền thống Việt Nam.",
    keywords: "lá số tử vi, tử vi online, xem tử vi, phong thủy, can chi, tứ trụ, mệnh, tính cách, vận mệnh, ngày sinh",
    canonical: "https://am-lich-viet-nam.replit.app/astrology",
    ogTitle: "Lá Số Tử Vi Online - Xem Tử Vi Theo Ngày Sinh",
    ogDescription: "Xem lá số tử vi online miễn phí theo ngày giờ sinh. Tính toán tứ trụ Can Chi, mệnh, tính cách theo phong thủy truyền thống Việt Nam.",
    ogUrl: "https://am-lich-viet-nam.replit.app/astrology",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Lá Số Tử Vi Online",
      "description": "Xem lá số tử vi theo ngày giờ sinh với tính toán tứ trụ Can Chi chính xác",
      "url": "https://am-lich-viet-nam.replit.app/astrology"
    }
  });

  return (
    <main className="min-h-screen py-8 md:py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-xl md:text-3xl font-bold font-serif mb-2 md:mb-4">Lá Số Tử Vi Online</h1>
          <p className="text-sm md:text-base text-muted-foreground">Xem tử vi theo ngày sinh - Phong thủy truyền thống Việt Nam</p>
        </div>
        <AstrologyForm />
      </div>
    </main>
  );
}
