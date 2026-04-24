"use client";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn
} from "react-icons/fa";

export default function Footer() {
  const router = useRouter();
  const menuItems = [
    { name: "Trang chủ", path: "/customer/user" },
    { name: "Về chúng tôi", path: "/customer/about" },
    { name: "Dịch vụ", path: "/customer/services" },
    { name: "Bài viết", path: "/customer/blog" },
    { name: "Liên hệ", path: "/customer/contact" }
  ];
  return (
    <footer className="relative bg-gray-900 text-white pt-16 pb-10 overflow-hidden">
      {/* Background gradient nhẹ */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-indigo-800 to-purple-900 animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Cột 1: Logo & mô tả */}
        <div>
          <h3 className="text-3xl font-bold mb-4 text-indigo-400">Electric Vehicle Dealer</h3>
          <p className="text-gray-400 leading-relaxed max-w-xs">
            Nền tảng của bạn cho sự sáng tạo và đổi mới. Kết nối, học hỏi và
            phát triển cùng chúng tôi.
          </p>
        </div>

        {/* Cột 2: Liên kết nhanh */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">
            Liên kết nhanh
          </h4>
          <ul className="space-y-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.path)}
                  className="hover:text-indigo-400 transition-colors text-left w-full"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 3: Hỗ trợ */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">Hỗ trợ</h4>
          <ul className="space-y-3">
            {[
              "Câu hỏi thường gặp",
              "Chính sách bảo mật",
              "Điều khoản dịch vụ",
              "Sơ đồ trang"
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-indigo-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Cột 4: Liên hệ & Mạng xã hội */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">Liên hệ</h4>
          <p className="text-gray-400 mb-2">Email: info@yourdomain.com</p>
          <p className="text-gray-400 mb-4">Điện thoại: +84 123 456 789</p>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <FaInstagram size={24} />
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Đường kẻ phân cách */}
      <div className="border-t border-gray-700 mt-12 pt-8 text-center">
        <p className="text-gray-500 text-sm">
          &copy; 2025 Electric Vehicle Dealer. All rights reserved. | Developed by Team 8
        </p>
      </div>
    </footer>
  );
}
