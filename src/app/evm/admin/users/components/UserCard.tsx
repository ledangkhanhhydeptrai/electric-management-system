"use client";
import React from "react";
import Image from "next/image";
import { Account } from "@/app/types/Account/Account";

interface UserCardProps {
  account: Account;
}

export default function UserCard({ account }: UserCardProps) {
  const { id, email, username, phoneNumber, isActive, createdAt } = account;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Main Card */}
      <div
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100/50 overflow-hidden backdrop-blur-xl"
        onClick={() => setOpen(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              {isActive && (
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-500" />
              )}
              <div className="relative">
                <Image
                  src={`https://i.pravatar.cc/150?u=${id}`}
                  alt={username}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-md group-hover:scale-105 transition-transform duration-500"
                />
                <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white shadow-sm ${isActive ? "bg-emerald-500" : "bg-gray-400"}`}>
                  {isActive && <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />}
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-base font-semibold text-gray-900 truncate mb-0.5 group-hover:text-emerald-600 transition-colors">
                {username}
              </h3>
              <p className="text-sm text-gray-500 truncate mb-1.5">{email}</p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="font-medium">{phoneNumber}</span>
              </div>
            </div>

            <svg className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* ✅ ONLY ONE MODAL (Telegram Style) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center animate-in fade-in duration-200"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white w-full sm:max-w-md sm:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "85vh" }}
          >
            {/* Modal Header */}
            <div className="relative px-6 pt-6 pb-4 border-b border-gray-100">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image src={`https://i.pravatar.cc/150?u=${id}`} alt={username} width={64} height={64} className="w-16 h-16 rounded-full object-cover" />
                  <div className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-3 border-white ${isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
                </div>

                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">{username}</h2>
                  <p className="text-sm text-gray-500 mt-0.5">{isActive ? "Đang hoạt động" : "Không hoạt động"}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="overflow-y-auto px-6 py-5 space-y-1" style={{ maxHeight: "calc(85vh - 140px)" }}>
              <InfoRow label="Email" value={email} iconColor="bg-blue-500" />
              <InfoRow label="Số điện thoại" value={phoneNumber || "Chưa cập nhật"} iconColor="bg-green-500" />
              <InfoRow label="ID" value={id} iconColor="bg-purple-500" mono />
              <InfoRow
                label="Ngày tạo"
                value={new Date(createdAt).toLocaleString("vi-VN")}
                iconColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function InfoRow({ label, value, iconColor, mono = false }: { label: string; value: string; iconColor: string; mono?: boolean }) {
  return (
    <div className="py-3 flex items-center gap-4 border-b border-gray-100">
      <div className={`w-9 h-9 rounded-full ${iconColor} flex items-center justify-center flex-shrink-0`} />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className={`text-sm text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</p>
      </div>
    </div>
  );
}
