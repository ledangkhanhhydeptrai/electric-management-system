import React from "react";
import { DollarSign, TrendingUp, Shield } from "lucide-react";

export const PriceCard: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-transform">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white border-opacity-30">
            <DollarSign className="w-12 h-12 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-200" />
              <span className="text-green-100 text-sm font-bold uppercase tracking-wider">
                Giá bán
              </span>
            </div>
            <p className="text-green-100 text-sm font-medium">
              Đã bao gồm VAT & Phí trước bạ
            </p>
          </div>
        </div>
        <div className="bg-black bg-opacity-20 backdrop-blur-md px-6 py-3 rounded-2xl border border-white border-opacity-30">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              Bảo hành chính hãng
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};