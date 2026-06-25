import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({ subsets: ["latin", "cyrillic"], weight: ["400", "600", "700"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nazaliv.ru"),
  title: "Яхта Дениса — аренда яхты в Санкт-Петербурге",
  description:
    "Премиальные прогулки на яхте в Санкт-Петербурге для романтики, отдыха и особенных встреч.",
  openGraph: {
    title: "Яхта Дениса — аренда яхты в Санкт-Петербурге",
    description:
      "Премиальные прогулки на яхте в Санкт-Петербурге для романтики, отдыха и особенных встреч.",
    images: [{ url: "/Vesta_yaht_spb_neva_8.jpg" }]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${cormorant.variable}`}>{children}</body>
    </html>
  );
}
