"use client";
import React, { useState, useEffect } from "react";
import { 
  User, Mail, Phone, Calendar, CheckCircle, Sparkles,
  Shield, Award, Clock, Hash, Loader2, UserCircle2
} from "lucide-react";
import { getAllDealerAccount } from "@/services/accountDealerService/accountDealer";

interface StaffDealerData {
  id: string;
  email: string;
  username: string;
  phoneNumber: string;
  createdAt: string;
  lastModifiedAt: string;
  isActive: boolean;
}

const AccountDealer: React.FC = () => {
  const [staffData, setStaffData] = useState<StaffDealerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getAllDealerAccount();
        if (Array.isArray(response)) {
          setStaffData(response);
        } else {
          setStaffData([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setStaffData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mt-20 bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 ">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-xl px-6 py-3 rounded-full border border-emerald-500/30 mb-6">
            <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-medium">Dealer Management System</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Danh Sách Tài Khoản
            </span>
          </h1>
          <p className="text-emerald-200/60 text-lg">Quản lý thông tin nhân viên dealer</p>
          
          {/* Stats Badge */}
          {!loading && (
            <div className="mt-6 inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold">{staffData.length}</span>
                <span className="text-white/60">Tài khoản</span>
              </div>
              <div className="w-px h-4 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-white/60">
                  {staffData.filter(s => s.isActive).length} Active
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-emerald-500/30 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
            </div>
            <p className="text-emerald-300 mt-6 font-semibold text-lg">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && staffData.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <UserCircle2 className="w-12 h-12 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Chưa có tài khoản nào</h3>
            <p className="text-emerald-200/60">Danh sách tài khoản dealer đang trống</p>
          </div>
        )}

        {/* Cards Grid */}
        {!loading && staffData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {staffData.map((staff, index) => (
              <div
                key={staff.id}
                className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/20 hover:border-emerald-400/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Card Header */}
                <div className="relative bg-gradient-to-r from-emerald-600/80 to-teal-600/80 p-6 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                      backgroundSize: '30px 30px'
                    }}></div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                  
                  <div className="relative flex items-center gap-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center border-2 border-white/30 shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <User className="w-8 h-8 text-white" />
                        {staff.isActive && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-black text-white mb-1 line-clamp-1">
                        {staff.username}
                      </h3>
                      <div className="flex items-center gap-2">
                        {staff.isActive ? (
                          <div className="flex items-center gap-1.5 bg-green-400/20 backdrop-blur-lg px-3 py-1 rounded-full border border-green-400/30">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-xs text-green-100 font-semibold">Active</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 bg-red-400/20 backdrop-blur-lg px-3 py-1 rounded-full border border-red-400/30">
                            <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                            <span className="text-xs text-red-100 font-semibold">Inactive</span>
                          </div>
                        )}
                        <Shield className="w-4 h-4 text-yellow-300" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  {/* Email */}
                  <div className="group/item">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl p-4 rounded-xl border border-emerald-500/20 group-hover/item:border-emerald-400/40 transition-all duration-300">
                      <div className="w-9 h-9 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-emerald-300 font-semibold uppercase tracking-wide mb-1">Email</p>
                        <p className="text-white text-sm font-medium truncate">{staff.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="group/item">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-xl p-4 rounded-xl border border-blue-500/20 group-hover/item:border-blue-400/40 transition-all duration-300">
                      <div className="w-9 h-9 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-blue-300 font-semibold uppercase tracking-wide mb-1">Số điện thoại</p>
                        <p className="text-white text-sm font-medium">{staff.phoneNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="group/item">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl p-4 rounded-xl border border-purple-500/20 group-hover/item:border-purple-400/40 transition-all duration-300">
                      <div className="w-9 h-9 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 text-purple-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-purple-300 font-semibold uppercase tracking-wide mb-1">Ngày tạo</p>
                        <p className="text-white text-sm font-medium">
                          {new Date(staff.createdAt).toLocaleDateString("vi-VN", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Last Modified */}
                  <div className="group/item">
                    <div className="flex items-start gap-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-xl p-4 rounded-xl border border-orange-500/20 group-hover/item:border-orange-400/40 transition-all duration-300">
                      <div className="w-9 h-9 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="w-4 h-4 text-orange-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-orange-300 font-semibold uppercase tracking-wide mb-1">Cập nhật lần cuối</p>
                        <p className="text-white text-sm font-medium">
                          {new Date(staff.lastModifiedAt).toLocaleDateString("vi-VN", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ID Footer */}
                  <div className="pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 justify-center">
                      <Hash className="w-3 h-3 text-emerald-400" />
                      <p className="text-xs text-white/60 font-mono">{staff.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(-10px) translateX(-10px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AccountDealer;