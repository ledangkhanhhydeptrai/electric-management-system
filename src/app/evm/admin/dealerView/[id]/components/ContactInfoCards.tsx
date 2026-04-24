// components/dealer-detail/ContactInfoCards.tsx
import React from "react";
import { MapPin, Phone, Mail, Calendar, Copy, Check, Clock } from "lucide-react";

interface ContactInfoCardsProps {
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  formatDateTime: (dateStr: string) => string;
  getRelativeTime: (dateStr: string) => string;
}

export const ContactInfoCards: React.FC<ContactInfoCardsProps> = ({
  address,
  phone,
  email,
  createdAt,
  copiedField,
  onCopy,
  formatDateTime,
  getRelativeTime
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 🏠 Address */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-xl">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Địa chỉ
            </label>
            <p className="text-gray-900 font-medium">{address}</p>
          </div>
        </div>
      </div>

      {/* 📞 Phone */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-xl">
            <Phone className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Số điện thoại
            </label>
            <div className="flex items-center justify-between">
              <a
                href={`tel:${phone}`}
                className="text-blue-600 hover:text-blue-700 font-bold text-lg"
              >
                {phone}
              </a>
              <button
                onClick={() => onCopy(phone, "phone")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {copiedField === "phone" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📧 Email */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Email
            </label>
            <div className="flex items-center justify-between gap-2">
              <a
                href={`mailto:${email}`}
                className="text-blue-600 hover:text-blue-700 font-semibold break-all"
              >
                {email}
              </a>
              <button
                onClick={() => onCopy(email, "email")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              >
                {copiedField === "email" ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 🗓️ Created Date */}
      <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Ngày tạo
            </label>
            <p className="text-gray-900 font-semibold text-lg">
              {formatDateTime(createdAt)}
            </p>
            <div className="mt-2 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
              <Clock className="w-3 h-3" />
              {getRelativeTime(createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
