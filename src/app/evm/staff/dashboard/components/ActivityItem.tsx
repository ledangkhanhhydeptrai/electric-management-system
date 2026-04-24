import { Activity, Award, Package, ShoppingCart } from "lucide-react";

type ActivityType = {
  type: "sale" | "inventory" | "contract" | string;
  dealer: string;
  model: string;
  time: string;
  amount: number;
};

export default function ActivityItem({ activity }: { activity: ActivityType }) {
  const getIcon = () => {
    switch (activity.type) {
      case "sale": return <ShoppingCart className="w-5 h-5" />;
      case "inventory": return <Package className="w-5 h-5" />;
      case "contract": return <Award className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getGradient = () => {
    switch (activity.type) {
      case "sale": return "from-green-500 to-emerald-600";
      case "inventory": return "from-orange-500 to-amber-600";
      case "contract": return "from-purple-500 to-indigo-600";
      default: return "from-blue-500 to-indigo-600";
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 hover:from-blue-50 hover:to-indigo-50/50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group">
      <div className={`p-3 bg-gradient-to-br ${getGradient()} rounded-xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{activity.dealer}</p>
        <p className="text-sm text-gray-600">{activity.model} • {activity.time}</p>
      </div>
      <div className="font-bold text-gray-900 text-lg">
        ${activity.amount.toLocaleString("vi-VN")}
      </div>
    </div>
  );
}