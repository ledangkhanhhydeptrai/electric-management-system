// /components/dealers/components/DealerCard.tsx
"use client";
import React from "react";
import { MapPin, Phone, Mail, Eye } from "lucide-react";
import { Dealer } from "../types/types";
import { useRouter } from "next/navigation";

// function formatDate(dateArray: number[]) {
//   if (!dateArray || dateArray.length < 3) return "N/A";
//   const [year, month, day] = dateArray;
//   return `${day.toString().padStart(2, "0")}/${month
//     .toString()
//     .padStart(2, "0")}/${year}`;
// }

// function getRelativeTime(dateArray: number[]) {
//   if (!dateArray || dateArray.length < 3) return "N/A";
//   const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
//   const now = new Date();
//   const diffTime = Math.abs(now.getTime() - date.getTime());
//   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//   if (diffDays === 0) return "Hôm nay";
//   if (diffDays === 1) return "Hôm qua";
//   if (diffDays < 7) return `${diffDays} ngày trước`;
//   if (diffDays < 30) return `${Math.floor(diffDays / 7)} tuần trước`;
//   return `${Math.floor(diffDays / 30)} tháng trước`;
// }

export default function DealerCard({
  dealer,
  index
}: // onEdit,
// onDelete,
// onDispatch
{
  dealer: Dealer;
  index: number;
  // onEdit: (d: Dealer) => void;
  // onDelete: (id: string, name: string) => void;
  // onDispatch: (d: Dealer) => void; // thêm khai báo kiểu prop
}) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white truncate mb-1">
              {dealer.name}
            </h3>
            {/* <div className="flex items-center gap-2 text-blue-100 text-sm">
              <Clock className="w-4 h-4" />
              {getRelativeTime(dealer.createdAt)}
            </div> */}
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-white">
              #{(index + 1).toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
            <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1 font-medium">Địa chỉ</p>
              <p className="text-sm text-gray-900 leading-relaxed">
                {dealer.address}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
            <Phone className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1 font-medium">
                Điện thoại
              </p>
              <a
                href={`tel:${dealer.phone}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              >
                {dealer.phone}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors group">
            <Mail className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1 font-medium">Email</p>
              <a
                href={`mailto:${dealer.email}`}
                className="text-sm text-blue-600 hover:text-blue-700 break-all hover:underline"
              >
                {dealer.email}
              </a>
            </div>
          </div>
          {/* 
          <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500 mb-1 font-medium">Ngày tạo</p>
              <p className="text-sm text-gray-900 font-bold">
                {formatDate(dealer.createdAt)}
              </p>
            </div>
          </div> */}
        </div>
      </div>

      <div className="px-6 pb-6 flex gap-2 flex-wrap">
        <button
          onClick={() => router.push(`/dealer-manager/dealerView/${dealer.id}`)}
          className="flex-1 px-4 py-3 border-2 border-blue-200 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2"
        >
          <Eye className="w-4 h-4" /> Chi tiết
        </button>

        {/* <button
          onClick={() => onEdit(dealer)}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm font-bold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Edit className="w-4 h-4" /> Chỉnh sửa
        </button>

        <button
          onClick={() => onDelete(dealer.id, dealer.name)}
          className="px-4 py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-700 transition-all flex items-center justify-center shadow-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button> */}

        {/* Nút điều phối */}
        {/* <button
          onClick={() => onDispatch(dealer)}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl text-sm font-bold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          <Package className="w-4 h-4" /> Điều phối
        </button> */}
      </div>
    </div>
  );
}
