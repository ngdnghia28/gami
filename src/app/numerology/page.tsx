import { Metadata } from "next";
import NumerologyContent from "./numerology-content";

export const metadata: Metadata = {
  title: "Thần Số Học Online - Tính Toán Số Định Mệnh Miễn Phí",
  description: "Tính toán thần số học online miễn phí theo họ tên và ngày sinh. Khám phá số đường đời, số biểu hiện, tính cách và vận mệnh qua thần số học.",
  keywords: ["thần số học", "số định mệnh", "số đường đời", "numerology", "tính cách theo số", "vận mệnh", "tính toán thần số"],
  openGraph: {
    title: "Thần Số Học Online - Tính Toán Số Định Mệnh",
    description: "Tính toán thần số học online miễn phí theo họ tên và ngày sinh. Khám phá số đường đời, số biểu hiện, tính cách và vận mệnh qua thần số học.",
    url: "https://am-lich-viet-nam.replit.app/numerology",
  },
};

export default function Numerology() {
  return <NumerologyContent />;
}