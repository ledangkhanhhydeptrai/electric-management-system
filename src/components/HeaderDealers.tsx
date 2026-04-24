"use client";

import { Car, MapPin } from "lucide-react";
import Link from "next/link";

export default function HeaderDealers() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link href="/dealers" className="flex items-center gap-2">
          <Car className="text-blue-600" size={28} />
          <span className="text-xl font-bold text-blue-700">
            VinFast Dealers
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/dealers" className="hover:text-blue-600 transition">
            Hệ thống đại lý
          </Link>
          <Link
            href="/dealers/map"
            className="hover:text-blue-600 transition flex items-center gap-1"
          >
            <MapPin size={16} /> Bản đồ
          </Link>
          <Link href="/" className="hover:text-blue-600 transition">
            Trang chủ
          </Link>
        </nav>
      </div>
    </header>
  );
}
