import { MapPin, Package } from "lucide-react";

export const InventoryReportPage = () => {
  const inventory = [
    {
      region: "Miền Bắc",
      total: 450,
      available: 320,
      reserved: 80,
      maintenance: 50
    },
    {
      region: "Miền Trung",
      total: 280,
      available: 190,
      reserved: 60,
      maintenance: 30
    },
    {
      region: "Miền Nam",
      total: 620,
      available: 440,
      reserved: 120,
      maintenance: 60
    }
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-2xl shadow-lg">
          <Package className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Báo cáo tồn kho</h2>
          <p className="text-slate-600 mt-1">Trạng thái tồn kho theo khu vực</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-red-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Khu vực
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Tổng tồn kho
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Sẵn sàng
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Đã đặt trước
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Bảo dưỡng
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {inventory.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="font-semibold text-slate-800">
                        {item.region}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-bold text-slate-800">
                      {item.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      {item.available}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {item.reserved}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      {item.maintenance}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                      Chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
