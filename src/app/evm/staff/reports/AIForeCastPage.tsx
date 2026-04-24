import { Brain, TrendingDown, TrendingUp } from "lucide-react";

export const AIForecastPage = () => {
  const forecasts = [
    { month: "Tháng 11", prediction: 530, confidence: 92, trend: "up" },
    { month: "Tháng 12", prediction: 580, confidence: 88, trend: "up" },
    { month: "Tháng 1/2025", prediction: 610, confidence: 85, trend: "up" }
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl shadow-lg">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Dự báo AI</h2>
          <p className="text-slate-600 mt-1">
            Dự đoán doanh số bằng trí tuệ nhân tạo
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {forecasts.map((forecast, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">
                {forecast.month}
              </h3>
              <div
                className={`p-2 rounded-lg ${
                  forecast.trend === "up" ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {forecast.trend === "up" ? (
                  <TrendingUp className="w-5 h-5 text-green-600" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-red-600" />
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-slate-600 mb-1">Dự báo doanh số</p>
              <p className="text-3xl font-bold text-purple-600">
                {forecast.prediction}
              </p>
              <p className="text-xs text-slate-500 mt-1">xe</p>
            </div>

            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-600">Độ tin cậy</span>
                <span className="font-bold text-purple-600">
                  {forecast.confidence}%
                </span>
              </div>
              <div className="bg-slate-200 rounded-full h-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-600 rounded-full"
                  style={{ width: `${forecast.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};