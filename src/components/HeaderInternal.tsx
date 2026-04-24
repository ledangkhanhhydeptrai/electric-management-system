"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { LogIn, Car, Gift, Menu, X, Zap } from "lucide-react";

export default function HeaderInternal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    // {
    //   href: "/internal/orders",
    //   icon: <FileText size={18} />,
    //   label: "Đơn hàng",
    //   badge: "12"
    // },
    {
      href: "/internal/cars",
      icon: <Car size={18} />,
      label: "Danh mục xe",
      badge: null
    },
    {
      href: "/internal/promotions",
      icon: <Gift size={18} />,
      label: "Khuyến mãi",
      badge: "3"
    }
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl shadow-green-500/10"
          : "bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 shadow-lg"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-teal-400/20 pointer-events-none"></div>

      <div className="container mx-auto flex items-center justify-between px-6 py-4 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group cursor-pointer">
          <div
            className={`relative p-2.5 rounded-xl transition-all duration-500 ${
              scrolled
                ? "bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/50"
                : "bg-white/20"
            } group-hover:scale-110 group-hover:rotate-12`}
          >
            <Zap
              size={24}
              className={`${
                scrolled ? "text-white" : "text-white"
              } transition-all`}
            />
            <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <div>
            <div
              className={`text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-gray-900" : "text-white"
              }`}
            >
              Electric Vehicle
            </div>
            <div
              className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                scrolled ? "text-emerald-600" : "text-emerald-100"
              }`}
            >
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              Hệ thống quản lý
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-1 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 font-medium rounded-xl transition-all duration-300 group ${
                scrolled
                  ? "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                  : "text-white/90 hover:bg-white/20 hover:text-white"
              }`}
            >
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                {item.icon}
              </span>
              <span className="relative">
                {item.label}
                {/* {item.badge && (
                  <span
                    className={`absolute -top-2 -right-6 px-1.5 py-0.5 text-xs font-bold rounded-full transition-all ${
                      scrolled
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-emerald-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )} */}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>
          ))}
        </nav>

        {/* Login Button */}
        <div className="hidden md:flex">
          <Link
            href="/auth/login"
            className={`relative flex items-center gap-2.5 px-6 py-3 font-semibold rounded-xl transition-all duration-300 overflow-hidden group ${
              scrolled
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40"
                : "bg-white text-green-700 shadow-lg hover:shadow-xl"
            } hover:scale-105 active:scale-100`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            <LogIn size={18} className="relative z-10" />
            <span className="relative z-10">Đăng nhập</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className={`md:hidden flex items-center p-2.5 rounded-xl transition-all duration-300 ${
            scrolled
              ? "text-gray-700 bg-emerald-50 hover:bg-emerald-100"
              : "text-white bg-white/20 hover:bg-white/30"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`backdrop-blur-xl border-t ${
            scrolled
              ? "bg-white/95 border-gray-200"
              : "bg-gradient-to-b from-green-700 to-emerald-800 border-white/10"
          }`}
        >
          <nav className="flex flex-col gap-2 p-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                  scrolled
                    ? "text-gray-700 hover:bg-emerald-50 active:bg-emerald-100"
                    : "text-white hover:bg-white/20 active:bg-white/30"
                } active:scale-95`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                      scrolled
                        ? "bg-emerald-500 text-white"
                        : "bg-white text-emerald-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className={`flex items-center justify-center gap-2.5 px-5 py-3.5 mt-2 rounded-xl font-semibold transition-all duration-300 shadow-md active:scale-95 ${
                scrolled
                  ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                  : "bg-white text-green-700 hover:bg-emerald-50"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={18} />
              <span>Đăng nhập</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
