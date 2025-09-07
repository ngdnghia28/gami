import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { queryClient } from "@/lib/queryClient";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({ 
  subsets: ["latin"], 
  weight: ["300", "400", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Âm Lịch Việt Nam - Khám Phá Truyền Thống Văn Hóa Việt",
    template: "%s | Âm Lịch Việt Nam",
  },
  description: "Khám phá âm lịch Việt Nam với công cụ chuyển đổi lịch dương âm, xem tử vi, thần số học và 12 cung hoàng đạo. Tìm hiểu truyền thống văn hóa và lễ hội Việt Nam.",
  keywords: ["âm lịch", "lịch việt nam", "chuyển đổi lịch", "tử vi", "thần số học", "cung hoàng đạo", "văn hóa việt nam", "lễ hội truyền thống"],
  authors: [{ name: "Âm Lịch Việt Nam" }],
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Âm Lịch Việt Nam - Khám Phá Truyền Thống Văn Hóa Việt",
    description: "Khám phá âm lịch Việt Nam với công cụ chuyển đổi lịch dương âm, xem tử vi, thần số học và 12 cung hoàng đạo. Tìm hiểu truyền thống văn hóa và lễ hội Việt Nam.",
    url: "https://am-lich-viet-nam.replit.app",
    siteName: "Âm Lịch Việt Nam",
    locale: "vi_VN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Âm Lịch Việt Nam - Khám Phá Truyền Thống Văn Hóa Việt",
    description: "Khám phá âm lịch Việt Nam với công cụ chuyển đổi lịch dương âm, xem tử vi, thần số học và 12 cung hoàng đạo.",
  },
  other: {
    "theme-color": "#dc2626",
    "msapplication-TileColor": "#dc2626",
  },
};

// Create a client component for providers
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Âm Lịch Việt Nam",
              description: "Khám phá âm lịch Việt Nam với công cụ chuyển đổi lịch dương âm, xem tử vi, thần số học và 12 cung hoàng đạo",
              url: "https://am-lich-viet-nam.replit.app",
              inLanguage: "vi-VN",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://am-lich-viet-nam.replit.app/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-background">
            <Navigation />
            <div className="pb-20 md:pb-0">
              {children}
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}