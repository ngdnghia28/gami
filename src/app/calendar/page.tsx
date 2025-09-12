import LunarCalendar from "@/components/lunar-calendar";
import DateConverter from "@/components/date-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lịch Âm Việt Nam 2024 - Chuyển Đổi Lịch Dương Âm Chính Xác",
  description: "Xem lịch âm Việt Nam 2024 đầy đủ với thông tin Can Chi, con giáp, tiết khí. Công cụ chuyển đổi lịch dương âm chính xác theo truyền thống Việt Nam.",
  keywords: ["lịch âm việt nam 2024", "chuyển đổi lịch dương âm", "can chi", "con giáp", "tiết khí", "lịch việt nam", "âm lịch"],
  openGraph: {
    title: "Lịch Âm Việt Nam 2024 - Chuyển Đổi Lịch Dương Âm",
    description: "Xem lịch âm Việt Nam 2024 đầy đủ với thông tin Can Chi, con giáp, tiết khí. Công cụ chuyển đổi lịch dương âm chính xác theo truyền thống Việt Nam.",
    url: "https://am-lich-viet-nam.replit.app/calendar",
  },
};

export default function Calendar() {
  return (
    <main className="min-h-screen">
      <LunarCalendar />
      <DateConverter />
    </main>
  );
}