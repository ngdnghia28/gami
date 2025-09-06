import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { useSEO } from "@/hooks/use-seo";

export default function NotFound() {
  useSEO({
    title: "Trang Không Tồn Tại - 404 - Âm Lịch Việt Nam",
    description: "Trang bạn đang tìm kiếm không tồn tại. Quay về trang chủ để khám phá âm lịch Việt Nam và các tính năng hữu ích.",
    canonical: "https://am-lich-viet-nam.replit.app/404",
    ogTitle: "Trang Không Tồn Tại - 404",
    ogDescription: "Trang bạn đang tìm kiếm không tồn tại. Quay về trang chủ để khám phá âm lịch Việt Nam."
  });

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            Did you forget to add the page to the router?
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
