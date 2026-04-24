import React from "react";
import { TrendingUp, Package, BarChart } from "lucide-react";
import { TabId } from "../types";

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  // { id: "dashboard" as TabId, label: "Tổng quan", icon: TrendingUp },
  { id: "inventory" as TabId, label: "Kho xe", icon: Package },
  // { id: "analytics" as TabId, label: "Phân tích", icon: BarChart }
];

export default function Navigation({
  activeTab,
  onTabChange
}: NavigationProps) {
  return (
    <div className="ml-10">
      <div className="">
        <nav className="flex gap-8">
          {tabs.map(tab =>
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-1 py-4 border-b-2 transition-colors ${activeTab ===
              tab.id
                ? "border-blue-600 text-blue-600 font-semibold"
                : "border-transparent text-gray-500 hover:text-gray-700"}`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
