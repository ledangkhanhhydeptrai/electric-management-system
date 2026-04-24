export const SalesChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800">Biểu đồ doanh số</h3>
          <p className="text-sm text-slate-600 mt-1">
            Theo tháng trong năm 2024
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 border-2 border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
            Tháng
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            Năm
          </button>
        </div>
      </div>

      {/* Simple Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-64">
        {[320, 280, 350, 300, 380, 420, 450, 410, 480, 460, 500, 520].map(
          (value, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg hover:from-blue-600 hover:to-indigo-700 transition-all cursor-pointer relative group"
                style={{ height: `${(value / 600) * 100}%` }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                  {value} xe
                </div>
              </div>
              <span className="text-xs text-slate-600 font-medium">
                T{idx + 1}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};