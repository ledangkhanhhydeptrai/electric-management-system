const CustomersChartInner = ({ data }: { data: { label: string; value: number }[] }) => {
  const colors = ['#3B82F6', '#10B981', '#F59E0B'];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="space-y-4">
        {data.map((item, idx) => {
          const percentage = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={idx}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700">{item.label}</span>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
              <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${percentage}%`,
                    background: `linear-gradient(90deg, ${colors[idx]}, ${colors[idx]}dd)`
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">{percentage}% của tổng số</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default CustomersChartInner