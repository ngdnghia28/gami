import LunarCalendar from "@/components/lunar-calendar";
import DateConverter from "@/components/date-converter";
import { useSEO } from "@/hooks/use-seo";

export default function Calendar() {
  useSEO({
    title: "Lịch Âm Việt Nam 2024 - Chuyển Đổi Lịch Dương Âm Chính Xác",
    description: "Xem lịch âm Việt Nam 2024 đầy đủ với thông tin Can Chi, con giáp, tiết khí. Công cụ chuyển đổi lịch dương âm chính xác theo truyền thống Việt Nam.",
    keywords: "lịch âm việt nam 2024, chuyển đổi lịch dương âm, can chi, con giáp, tiết khí, lịch việt nam, âm lịch",
    canonical: "https://am-lich-viet-nam.replit.app/calendar",
    ogTitle: "Lịch Âm Việt Nam 2024 - Chuyển Đổi Lịch Dương Âm",
    ogDescription: "Xem lịch âm Việt Nam 2024 đầy đủ với thông tin Can Chi, con giáp, tiết khí. Công cụ chuyển đổi lịch dương âm chính xác theo truyền thống Việt Nam.",
    ogUrl: "https://am-lich-viet-nam.replit.app/calendar",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Lịch Âm Việt Nam 2024",
      "description": "Lịch âm Việt Nam với công cụ chuyển đổi lịch dương âm chính xác",
      "url": "https://am-lich-viet-nam.replit.app/calendar"
    }
  });

  return (
    <main className="min-h-screen">
      <LunarCalendar />
      <DateConverter />
    </main>
  );
}
