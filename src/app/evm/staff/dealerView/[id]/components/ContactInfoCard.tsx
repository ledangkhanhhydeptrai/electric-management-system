import React from "react";
import {
  Phone,
  PhoneCall,
  Mail,
  MailIcon,
  MapPin,
  MapPinned,
  Copy,
  Check
} from "lucide-react";
import { Dealer } from "../../types/types";

interface ContactInfoCardProps {
  dealer: Dealer;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

export const ContactInfoCard: React.FC<ContactInfoCardProps> = ({
  dealer,
  copiedField,
  onCopy
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-6 items-center gap-2">
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-2 rounded-lg">
          <Phone className="w-5 h-5 text-white" />
        </div>
        Thông tin liên hệ
      </h2>

      <div className="space-y-4">
        {/* Phone */}
        <div className="group">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 items-center gap-2">
            <PhoneCall className="w-3.5 h-3.5" />
            Số điện thoại
          </label>
          <div className="items-center justify-between bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100 group-hover:border-green-200 transition-colors">
            <a
              href={`tel:${dealer.phone}`}
              className="text-green-700 hover:text-green-800 font-bold text-lg items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              {dealer.phone}
            </a>
            <button
              onClick={() => onCopy(dealer.phone, "Đã sao chép số điện thoại")}
              className="p-2 hover:bg-white rounded-lg transition-all"
              title="Sao chép"
            >
              {copiedField === "Đã sao chép số điện thoại" ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <Copy className="w-5 h-5 text-green-600/60" />
              )}
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="group">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 items-center gap-2">
            <MailIcon className="w-3.5 h-3.5" />
            Email
          </label>
          <div className="items-center justify-between bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100 group-hover:border-purple-200 transition-colors">
            <a
              href={`mailto:${dealer.email}`}
              className="text-purple-700 hover:text-purple-800 font-semibold items-center gap-2 break-all"
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              {dealer.email}
            </a>
            <button
              onClick={() => onCopy(dealer.email, "Đã sao chép email")}
              className="p-2 hover:bg-white rounded-lg transition-all flex-shrink-0 ml-2"
              title="Sao chép"
            >
              {copiedField === "Đã sao chép email" ? (
                <Check className="w-5 h-5 text-purple-600" />
              ) : (
                <Copy className="w-5 h-5 text-purple-600/60" />
              )}
            </button>
          </div>
        </div>

        {/* Address */}
        <div className="group">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2 items-center gap-2">
            <MapPinned className="w-3.5 h-3.5" />
            Địa chỉ
          </label>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100 group-hover:border-blue-200 transition-colors">
            <div className="items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-gray-900 leading-relaxed">{dealer.address}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
