import React from "react";

export const FooterSection: React.FC = () => {
  return (
    <div className="mt-10 bg-black bg-opacity-5 backdrop-blur-md rounded-2xl p-6 border border-white border-opacity-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
            <span className="text-2xl">ℹ️</span>
          </div>
          <div>
            <p className="text-white font-semibold">Cần hỗ trợ?</p>
            <p className="text-gray-400 text-sm">
              Liên hệ bộ phận tư vấn để biết thêm chi tiết
            </p>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm font-medium">
            © 2025 EV Management System
          </p>
          <p className="text-gray-500 text-xs">Premium Electric Vehicles</p>
        </div>
      </div>
    </div>
  );
};
