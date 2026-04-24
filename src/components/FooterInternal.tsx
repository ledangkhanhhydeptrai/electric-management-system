"use client";

import { Mail, Phone, MapPin, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FooterInternal() {
  const menuItems = [
    { href: "/internal/orders", label: "Đơn hàng" },
    { href: "/internal/cars", label: "Danh mục xe" },
    { href: "/internal/promotions", label: "Khuyến mãi" }
  ];

  const contactInfo = [
    {
      icon: <Mail size={16} />,
      text: "support@vinfast.com",
      href: "mailto:support@vinfast.com"
    },
    { icon: <Phone size={16} />, text: "1900 232389", href: "tel:1900232389" },
    {
      icon: <MapPin size={16} />,
      text: "87A Cách Mạng Tháng 8, Quận 1, TP.HCM",
      href: "#"
    }
  ];

  // const socialLinks = [
  //   { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
  //   { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
  //   { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
  //   { icon: <Youtube size={18} />, href: "#", label: "Youtube" }
  // ];

  return (
    <footer className="relative bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 mt-12 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
      <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo + Intro */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-4">
              <div className="relative p-3 bg-white/20 backdrop-blur-sm rounded-xl group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Zap size={28} className="text-white" />
                <div className="absolute inset-0 bg-white/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Electric Vehicle
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
                  <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></div>
                  Dealer Portal
                </div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-emerald-50/90">
              Nền tảng hỗ trợ đại lý quản lý đơn hàng, khách hàng và chương
              trình khuyến mãi nhanh chóng, hiệu quả.
            </p>

            {/* Social Links */}
            {/* <div className="flex gap-3 mt-6">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="flex items-center justify-center w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white hover:text-green-600 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div> */}
          </div>

          {/* Menu */}
          <div className="md:col-span-1">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-300 rounded-full"></div>
              Danh mục
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-2 text-emerald-50/90 hover:text-white transition-all duration-300 text-sm"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300"
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-emerald-300 rounded-full"></div>
              Liên hệ
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((contact, index) => (
                <li key={index}>
                  <Link
                    href={contact.href}
                    className="group flex items-start gap-3 text-emerald-50/90 hover:text-white transition-all duration-300"
                  >
                    <div className="flex items-center justify-center w-9 h-9 bg-white/20 backdrop-blur-sm rounded-lg text-emerald-200 group-hover:bg-white group-hover:text-green-600 transition-all duration-300 flex-shrink-0 group-hover:scale-110">
                      {contact.icon}
                    </div>
                    <span className="text-sm pt-1.5 group-hover:translate-x-1 transition-transform duration-300">
                      {contact.text}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            {/* <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <h4 className="text-sm font-semibold text-white mb-2">
                Nhận thông tin mới nhất
              </h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="flex-1 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-emerald-200 text-sm focus:outline-none focus:border-white/50 focus:bg-white/30 transition-all"
                />
                <button className="px-4 py-2 bg-white text-green-700 rounded-lg font-semibold text-sm hover:bg-emerald-50 transition-all duration-300 hover:scale-105 active:scale-100 whitespace-nowrap">
                  Đăng ký
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/20 backdrop-blur-sm bg-black/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-emerald-100">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="font-semibold text-white">
                VinFast Dealer Portal
              </span>
              . All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Điều khoản sử dụng
              </Link>
              <Link
                href="#"
                className="hover:text-white transition-colors duration-300"
              >
                Hỗ trợ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
