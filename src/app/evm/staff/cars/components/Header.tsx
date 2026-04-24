import React from "react";
import { Car, Plus } from "lucide-react";

interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="ml-10 flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Car className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                VinFast EV Manager
              </h1>
              <p className="text-sm text-gray-500">Hệ thống quản lý xe điện</p>
            </div>
          </div>
          <button
            onClick={onAddClick}
            className="mr-10 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm xe mới
          </button>
        </div>
      </div>
    </header>
  );
}
