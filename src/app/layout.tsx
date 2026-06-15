import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
});

export const metadata: Metadata = {
  title: "الحل الذكي لتعليق الستائر بدون حفر | بار تلسكوبي",
  description: "بار تلسكوبي قابل للتعديل يوفر لك حلاً عملياً وأنيقاً لتعليق الستائر وتنظيم المساحات بدون أدوات وبدون إتلاف الجدران.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
