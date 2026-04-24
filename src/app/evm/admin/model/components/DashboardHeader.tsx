import React from "react";
import { Plus, Upload, Download, Zap, Sparkles } from "lucide-react";

interface DashboardHeaderProps {
  onAddModel: () => void;
}

export default function DashboardHeader({ onAddModel }: DashboardHeaderProps) {
  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/40 rounded-3xl shadow-2xl shadow-blue-500/10 p-8 overflow-hidden border border-white/60">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-3">
            {/* Icon with animation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"/>
              <div className="relative p-4 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all group-hover:scale-110 duration-300">
                <Zap className="w-7 h-7 text-white animate-pulse" />
                <Sparkles className="w-3 h-3 text-yellow-300 absolute -top-1 -right-1 animate-ping" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-1 tracking-tight">
                EV Management
              </h1>
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                <p className="text-gray-600 font-medium">Quản lý mẫu xe điện</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button className="group relative flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Upload className="w-4 h-4 relative z-10 text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="hidden md:inline relative z-10 font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
              Import
            </span>
          </button>

          <button className="group relative flex items-center gap-2 px-5 py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Download className="w-4 h-4 relative z-10 text-gray-600 group-hover:text-indigo-600 transition-colors" />
            <span className="hidden md:inline relative z-10 font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
              Export
            </span>
          </button>

          <button
            onClick={onAddModel}
            className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300 shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
            <Plus className="w-5 h-5 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
            <span className="relative z-10">Tạo Model</span>
          </button>
        </div>
      </div>
    </div>
  );
}
