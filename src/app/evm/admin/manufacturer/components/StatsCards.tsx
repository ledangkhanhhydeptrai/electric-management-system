import { Manufacturer } from "../types/types";

interface StatsCardsProps {
  manufacturers: Manufacturer[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ manufacturers }) => {
  const totalCount = manufacturers.length;
  const activeCount = manufacturers.filter((m) => m.active).length;
  const totalDealers = manufacturers.reduce((sum, m) => sum + m.dealerCount, 0);

  const stats = [
    {
      label: "Tổng số hãng",
      value: totalCount,
      icon: "🏭",
      color: "from-blue-500 to-blue-600"
    },
    {
      label: "Đang hoạt động",
      value: activeCount,
      icon: "✅",
      color: "from-green-500 to-emerald-600"
    },
    {
      label: "Tổng đại lý",
      value: totalDealers,
      icon: "🏪",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div
              className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;