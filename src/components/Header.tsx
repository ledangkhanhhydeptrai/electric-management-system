"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Trang chủ", path: "/customer/user" },
    { label: "Giới thiệu", path: "/customer/about" },
    { label: "Liên hệ", path: "/customer/contact" },
    { label: "Bài viết", path: "/customer/blog" }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-cyan-500 to-blue-500 py-5">
      <nav className="relative container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <a
          className="text-2xl font-bold text-white z-20 cursor-pointer"
          onClick={() => router.push("/user")}
        >
          Electric Vehicle Dealer
        </a>

        {/* Centered Menu (Desktop) */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8">
          {menuItems.map((item) => (
            <span
              key={item.label}
              className="text-lg font-medium text-white hover:text-gray-200 transition-colors cursor-pointer"
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </span>
          ))}
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <button
            className="px-5 py-2 rounded-full border border-white text-white hover:bg-white hover:text-indigo-600 transition-all"
            onClick={() => router.push("/auth/login")}
          >
            Đăng nhập
          </button>
          <button
            className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition-colors"
            onClick={() => router.push("/auth/register")}
          >
            Đăng ký
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-3xl text-white"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-md z-10 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {menuItems.map((item) => (
            <span
              key={item.label}
              className="text-3xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => {
                router.push(item.path);
                setIsMenuOpen(false);
              }}
            >
              {item.label}
            </span>
          ))}

          <div className="mt-10 space-y-4 w-full px-8">
            <button
              className="w-full px-6 py-3 rounded-full border border-indigo-600 text-indigo-600 text-xl font-medium hover:bg-indigo-50 transition-colors"
              onClick={() => {
                router.push("/login");
                setIsMenuOpen(false);
              }}
            >
              Đăng nhập
            </button>
            <button
              className="w-full px-6 py-3 rounded-full bg-indigo-600 text-white text-xl font-semibold shadow-md hover:bg-indigo-700 transition-colors"
              onClick={() => {
                router.push("/register");
                setIsMenuOpen(false);
              }}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
