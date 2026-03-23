"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react"; // 추가

export default function Navbar() {
  const { data: session, status } = useSession(); // 세션 정보 가져오기
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const colors = {
    primary: "#2C2825",    // Soft Espresso
    secondary: "#A89F94",  // Muted Stone
    background: "#F9F8F6", // Warm Off-White
    border: "#EAE7E2"      // Subtle definition
  };

  const isHomePage = pathname === "/";
  const isShopPage = pathname?.startsWith("/shop");
  const isDarkText = !isHomePage || isScrolled || isShopPage;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] px-6 md:px-12 h-24 flex items-center transition-all duration-700 ${
        !isDarkText 
          ? "bg-transparent text-white" 
          : "backdrop-blur-md border-b"
      }`}
      style={{ 
        backgroundColor: isDarkText ? `${colors.background}f2` : "transparent",
        borderColor: isDarkText ? colors.border : "transparent",
        color: isDarkText ? colors.primary : "white"
      }}
    >
      <div className="max-w-[1700px] mx-auto w-full flex items-center justify-between">
        
        {/* Left Side: Logo & Main Nav */}
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-8">
            <Link href="/" className="transition-opacity hover:opacity-70">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className={`h-7 md:h-8 w-auto object-contain transition-all duration-500 ${
                  !isDarkText ? "brightness-0 invert" : "" 
                }`} 
              />
            </Link>
            <div className="h-5 w-[1px]" style={{ backgroundColor: isDarkText ? colors.border : "rgba(255,255,255,0.2)" }}></div>
          </div>
          
          <div className="hidden lg:flex gap-10 text-[10px] font-light tracking-[0.4em] uppercase items-center">
            <Link href="/about" className="hover:opacity-50 transition-opacity">About Us</Link>
            <Link href="/research/health-concept" className="hover:opacity-50 transition-opacity">Research</Link>
            <Link href="/farm/history" className="hover:opacity-50 transition-opacity">Farm</Link>
            <Link href="/shop" className="hover:opacity-50 transition-opacity">Shop</Link>
            <Link href="/events" className="hover:opacity-50 transition-opacity">Events</Link>
            <Link href="/donate" className="hover:opacity-50 transition-opacity">Donate</Link>
            {/* Membership 페이지 링크 추가 */}
            <Link href="/membership" className="hover:opacity-50 transition-opacity font-medium">Membership</Link>
          </div>
        </div>

        {/* Right Side: Account, Cart, and Auth */}
        <div className="flex items-center gap-6 md:gap-8">
          <div className="hidden md:flex items-center gap-6 mr-2">
            <Link href="/account" className="hover:opacity-40 transition-opacity">
              <User className="w-4 h-4 stroke-[1.2px]" />
            </Link>
            <Link href="/cart" className="hover:opacity-40 transition-opacity relative">
              <ShoppingBag className="w-4 h-4 stroke-[1.2px]" />
              <span className="absolute -top-1.5 -right-1.5 text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-light" style={{ backgroundColor: isDarkText ? colors.primary : "white", color: isDarkText ? "white" : "black" }}>
                0
              </span>
            </Link>
          </div>
          
          {/* 로그인 상태에 따른 버튼 변화 */}
          {status === "loading" ? (
            <div className="w-24 h-8 animate-pulse bg-current opacity-10"></div>
          ) : session ? (
            <div className="flex items-center gap-5">
              <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-70">
                {session.user?.name}
              </span>
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="text-[9px] font-light uppercase tracking-[0.2em] border-b border-current pb-0.5 hover:opacity-50 transition-opacity"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
               <Link href="/login" className="text-[9px] font-light uppercase tracking-[0.4em] hover:opacity-50">
                Login
              </Link>
              <Link href="/membership" 
                className={`px-8 py-3 border text-[9px] font-light transition-all duration-500 uppercase tracking-[0.4em] ${
                  !isDarkText 
                    ? "border-white/30 text-white hover:bg-white hover:text-black" 
                    : "hover:opacity-60"
                }`}
                style={{ 
                  borderColor: isDarkText ? colors.primary : "",
                  backgroundColor: isDarkText ? colors.primary : "",
                  color: isDarkText ? "white" : ""
                }}
              >
                Join Membership
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}