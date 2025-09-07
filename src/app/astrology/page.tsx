import AstrologyForm from "@/components/astrology-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lá Số Tử Vi Online - Xem Tử Vi Theo Ngày Sinh Miễn Phí",
  description: "Xem lá số tử vi online miễn phí theo ngày giờ sinh. Tính toán tứ trụ Can Chi, mệnh, tính cách theo phong thủy truyền thống Việt Nam.",
  keywords: ["lá số tử vi", "tử vi online", "xem tử vi", "phong thủy", "can chi", "tứ trụ", "mệnh", "tính cách", "vận mệnh", "ngày sinh"],
  openGraph: {
    title: "Lá Số Tử Vi Online - Xem Tử Vi Theo Ngày Sinh",
    description: "Xem lá số tử vi online miễn phí theo ngày giờ sinh. Tính toán tứ trụ Can Chi, mệnh, tính cách theo phong thủy truyền thống Việt Nam.",
    url: "https://am-lich-viet-nam.replit.app/astrology",
  },
};

export default function Astrology() {
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