"use client";

import { Facebook, Phone, Mail } from "lucide-react";

export default function FooterDealers() {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">
        {/* Info */}
        <div>
          <h3 className="text-lg font-bold mb-3">VinFast Dealers</h3>
          <p className="text-sm text-gray-300">
            Hệ thống đại lý chính thức của VinFast trên toàn quốc, sẵn sàng phục
            vụ khách hàng với chất lượng tốt nhất.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-bold mb-3">Liên hệ</h3>
          <p className="flex items-center gap-2 text-gray-300">
            <Phone size={16} /> 1900 232389
          </p>
          <p className="flex items-center gap-2 text-gray-300 mt-2">
            <Mail size={16} /> support@vinfastauto.com
          </p>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-bold mb-3">Kết nối</h3>
          <div className="flex gap-4">
            <a
              href="https://facebook.com/vinfast"
              target="_blank"
              className="hover:text-blue-400"
            >
              <Facebook size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t border-blue-800 text-gray-400 text-sm">
        © {new Date().getFullYear()} VinFast Dealers. All rights reserved.
      </div>
    </footer>
  );
}
