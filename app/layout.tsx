import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SupportFooter from "@/components/SupportFooter";
import AuthProvider from "@/components/AuthProvider"; // 아래에서 만들 파일입니다.

export const metadata: Metadata = {
  title: "Hemato Institute",
  description: "Research and Education for a Healthier Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Adobe Fonts Connection */}
        <link rel="stylesheet" href="https://use.typekit.net/zls4fyd.css" />
      </head>
      <body className="antialiased bg-white selection:bg-zinc-100">
        {/* AuthProvider로 감싸서 모든 페이지에서 로그인 정보를 알 수 있게 합니다 */}
        <AuthProvider>
          {/* GLOBAL NAVIGATION */}
          <Navbar />

          {/* PAGE CONTENT */}
          <main className="min-h-screen">
            {children}
          </main>

          <SupportFooter />
        </AuthProvider>
      </body>
    </html>
  );
}