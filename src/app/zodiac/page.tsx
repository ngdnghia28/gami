import ZodiacContent from "./zodiac-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "12 Cung Hoàng Đạo - Tính Cách Và Vận Mệnh Theo Ngày Sinh",
  description: "Khám phá 12 cung hoàng đạo và tính cách của bạn. Xem đặc điểm tính cách, tình yêu, sự nghiệp, số may mắn và màu sắc theo cung hoàng đạo.",
  keywords: ["12 cung hoàng đạo", "zodiac", "cung hoàng đạo", "tính cách theo cung", "vận mệnh", "bạch dương", "kim ngưu", "song tử", "cự giải", "sư tử", "xử nữ"],
  openGraph: {
    title: "12 Cung Hoàng Đạo - Tính Cách Và Vận Mệnh",
    description: "Khám phá 12 cung hoàng đạo và tính cách của bạn. Xem đặc điểm tính cách, tình yêu, sự nghiệp, số may mắn và màu sắc theo cung hoàng đạo.",
    url: "https://am-lich-viet-nam.replit.app/zodiac",
  },
};

export default function Zodiac() {
  return <ZodiacContent />;
}