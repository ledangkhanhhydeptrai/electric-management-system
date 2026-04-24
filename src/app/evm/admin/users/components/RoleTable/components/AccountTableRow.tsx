"use client";
import { Account } from "@/app/types/Account/Account";
import { Edit3, Trash2, Phone, Mail, User, Calendar, Key } from "lucide-react";
import React from "react";

interface AccountTableRowProps {
  account: Account;
  index: number;
  onEdit: (account: Account) => void;
  onDelete: (accountId: string) => void;
  onNavigate: () => void;
  onPasswordUpdate: (account: Account) => void;
}

export default function AccountTableRow({
  account,
  index,
  onEdit,
  onDelete,
  onNavigate,
  onPasswordUpdate
}: AccountTableRowProps) {
  const getAvatarColor = (email: string) => {
    const colors = [
      { bg: "bg-blue-500", light: "bg-blue-50", text: "text-blue-600" },
      { bg: "bg-purple-500", light: "bg-purple-50", text: "text-purple-600" },
      { bg: "bg-pink-500", light: "bg-pink-50", text: "text-pink-600" },
      { bg: "bg-emerald-500", light: "bg-emerald-50", text: "text-emerald-600" },
      { bg: "bg-orange-500", light: "bg-orange-50", text: "text-orange-600" },
      { bg: "bg-cyan-500", light: "bg-cyan-50", text: "text-cyan-600" },
      { bg: "bg-violet-500", light: "bg-violet-50", text: "text-violet-600" },
      { bg: "bg-teal-500", light: "bg-teal-50", text: "text-teal-600" }
    ];
    const idx = email.charCodeAt(0) % colors.length;
    return colors[idx];
  };

  const avatarColor = getAvatarColor(account.email);

  return (
    <tr
      className="group hover:bg-slate-50/80 transition-all duration-200 cursor-pointer border-b border-slate-200/60 hover:border-slate-300"
      onClick={onNavigate}
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`
      }}
    >
      {/* Email Column with Avatar */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className={`w-11 h-11 rounded-xl ${avatarColor.bg} flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all duration-200`}
            >
              <span className="text-base">
                {account.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${avatarColor.bg} rounded-full border-2 border-white flex items-center justify-center`}>
              <Mail className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors truncate">
              {account.email}
            </div>
          </div>
        </div>
      </td>

      {/* Username Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <span className="text-sm font-semibold text-slate-900">
            {account.username}
          </span>
        </div>
      </td>

      {/* Phone Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center transition-colors">
            <Phone className="w-4 h-4 text-slate-600 group-hover:text-emerald-600 transition-colors" />
          </div>
          <span className="text-sm text-slate-700 font-medium">
            {account.phoneNumber}
          </span>
        </div>
      </td>

      {/* Created Date Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 text-slate-600">
          <Calendar className="w-4 h-4 text-slate-400" />
          <div className="text-sm">
            <div className="font-medium text-slate-900">
              {new Date(account.createdAt).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "short",
                day: "numeric"
              })}
            </div>
            <div className="text-xs text-slate-500">
              {new Date(account.createdAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false
              })}
            </div>
          </div>
        </div>
      </td>

      {/* Status Column */}
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            account.isActive
              ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20"
              : "bg-slate-100 text-slate-600 ring-1 ring-slate-600/20"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              account.isActive ? "bg-emerald-500 animate-pulse shadow-sm shadow-emerald-500/50" : "bg-slate-400"
            }`}
          />
          {account.isActive ? "Hoạt động" : "Tạm dừng"}
        </span>
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          {/* Edit Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account);
            }}
            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-200 active:scale-95"
            title="Chỉnh sửa"
          >
            <Edit3 size={18} />
          </button>

          {/* Password Update Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPasswordUpdate(account);
            }}
            className="p-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-all duration-200 active:scale-95"
            title="Cập nhật mật khẩu"
          >
            <Key size={18} />
          </button>

          {/* Delete Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(account.id);
            }}
            className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 active:scale-95"
            title="Xóa"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}