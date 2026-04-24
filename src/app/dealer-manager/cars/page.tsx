"use client";
import React, { useState } from "react";
import { Row, Col } from "antd";
import {
  Search,
  GitCompare,
  CarIcon,
  Zap,
  Package,
  Leaf,
  X
} from "lucide-react";
import CarCard from "./components/CarCard";
import CarComparePage from "./CarComparePage";
import { searchFilter } from "@/services/vehicle/vehicle";
import { Car } from "@/app/evm/admin/cars/types";
import { useAuthGuard } from "../../hooks/useAuthGuard";
import { Pagination } from "antd";

const CarListAndComparePage = () => {
  const [data, setData] = React.useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("list");
  const selectedCars = data.slice(0, 6);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số xe hiển thị mỗi trang

  // Lọc theo trang hiện tại

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await searchFilter({});
      if (Array.isArray(response)) {
        setData(response);
      } else {
        setData([]);
      }
    };
    fetchData();
  }, []);

  const filteredCars = data.filter((car) => {
    const matchesSearch = car.vin
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  const paginatedCars = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  useAuthGuard(["Dealer Manager"]);

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-x-hidden">
      {" "}
      {/* Added overflow-x-hidden */}
      <div className="w-full">
        {" "}
        {/* Changed from empty to w-full */}
        {/* Premium Header Section - ECO THEME */}
        <div className="relative mb-8 overflow-hidden bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 shadow-2xl">
          {" "}
          {/* Removed p-8 md:p-10, will add inside */}
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-10">
            {" "}
            {/* Added container with max-width */}
            {/* Decorative Elements - Contained */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50"></div>{" "}
            {/* Reduced size, removed negative margins */}
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5">
              <Leaf className="w-64 h-64" /> {/* Reduced from w-96 h-96 */}
            </div>
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex-1">
                  {" "}
                  {/* Added flex-1 */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-xl border border-white/30">
                      <CarIcon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {" "}
                      {/* Added min-w-0 to prevent overflow */}
                      <h1 className="text-2xl md:text-4xl font-black text-white flex items-center gap-3 flex-wrap">
                        {" "}
                        {/* Added flex-wrap, reduced base size */}
                        <span>Danh Mục Xe VinFast</span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold border border-white/30 whitespace-nowrap">
                          🌿 ECO
                        </span>
                      </h1>
                      <p className="text-emerald-100 text-sm md:text-lg font-medium mt-1">
                        {" "}
                        {/* Reduced base size */}
                        Khám phá và so sánh các dòng xe điện thân thiện môi
                        trường
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 backdrop-blur-xl rounded-2xl px-6 py-4 border border-white/30 shadow-2xl flex-shrink-0">
                  {" "}
                  {/* Added flex-shrink-0 */}
                  <p className="text-emerald-100 text-xs font-semibold mb-1 uppercase tracking-wider">
                    Tổng số xe
                  </p>
                  <p className="text-4xl font-black text-white">
                    {data.length}
                  </p>
                </div>
              </div>

              {/* Search Bar - Premium Style 4 */}
              <div className="relative group">
                {/* Animated gradient border */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-all duration-500 blur-sm"></div>

                <div className="relative flex items-center bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-white/80 overflow-hidden group-hover:shadow-emerald-500/20 transition-all duration-300">
                  {/* Left Icon Section */}
                  <div className="flex items-center pl-4 flex-shrink-0">
                    {" "}
                    {/* Added flex-shrink-0 */}
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg group-focus-within:scale-110 group-focus-within:shadow-xl transition-all duration-300">
                      <Search className="text-white" size={20} />
                    </div>
                    <div className="ml-3 h-8 w-px bg-gray-200"></div>
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Tìm kiếm xe điện: VIN, Model, Màu sắc..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-4 border-0 bg-transparent text-base font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none min-w-0"
                    style={{ height: "64px" }}
                  />

                  {/* Right Action Section */}
                  <div className="flex items-center pr-4 gap-2 flex-shrink-0">
                    {" "}
                    {/* Added flex-shrink-0 */}
                    {searchTerm && (
                      <>
                        <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold whitespace-nowrap">
                          {filteredCars.length} kết quả
                        </div>
                        <button
                          onClick={() => setSearchTerm("")}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group/clear"
                        >
                          <X className="w-4 h-4 text-gray-400 group-hover/clear:text-gray-600 group-hover/clear:rotate-90 transition-all duration-300" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {" "}
          {/* Added container */}
          {/* Tabs Section - ECO THEME */}
          <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden border border-gray-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab("list")}
                className={`flex-1 px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "list"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-emerald-50"
                }`}
              >
                <Package size={20} className="flex-shrink-0" />
                <span className="hidden sm:inline">Danh sách xe</span>
                <span className="sm:hidden">DS xe</span>
                <span
                  className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === "list"
                      ? "bg-white/20"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {filteredCars.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab("compare")}
                className={`flex-1 px-4 md:px-6 py-4 font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                  activeTab === "compare"
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-emerald-50"
                }`}
              >
                <GitCompare size={20} className="flex-shrink-0" />
                <span className="hidden sm:inline">So sánh xe</span>
                <span className="sm:hidden">So sánh</span>
                <span
                  className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                    activeTab === "compare"
                      ? "bg-white/20"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {selectedCars.length}
                </span>
              </button>
            </div>
          </div>
          {/* Content Section */}
          {activeTab === "list" ? (
            <div>
              {/* Quick Stats - Featured Cars - ECO THEME */}
              {data.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {data.slice(0, 3).map((car, index) => {
                    const colors = [
                      {
                        from: "from-emerald-500",
                        to: "to-green-500",
                        bg: "bg-emerald-50",
                        border: "border-emerald-200",
                        icon: "bg-emerald-500"
                      },
                      {
                        from: "from-green-500",
                        to: "to-teal-500",
                        bg: "bg-green-50",
                        border: "border-green-200",
                        icon: "bg-green-500"
                      },
                      {
                        from: "from-teal-500",
                        to: "to-cyan-500",
                        bg: "bg-teal-50",
                        border: "border-teal-200",
                        icon: "bg-teal-500"
                      }
                    ];
                    const color = colors[index];

                    return (
                      <div
                        key={car.id}
                        className={`group relative overflow-hidden ${color.bg} ${color.border} border-2 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
                      >
                        {/* Subtle gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`${color.icon} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                              <CarIcon className="text-white" size={24} />
                            </div>
                            <div
                              className={`bg-gradient-to-r ${color.from} ${color.to} px-3 py-1.5 rounded-full shadow-md`}
                            >
                              <Zap className="text-white" size={16} />
                            </div>
                          </div>
                          <p className="font-black text-gray-900 text-lg mb-1 truncate">
                            {car.vin}
                          </p>
                          <p className="text-gray-600 font-semibold text-sm truncate">
                            {car.modelName}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Car Grid */}
              {filteredCars.length > 0 ? (
                <div className="overflow-y-hidden overflow-x-hidden">
                  <Row gutter={[24, 24]}>
                    {paginatedCars.map((car, index) => (
                      <Col key={car.id} xs={24} sm={24} md={12} lg={12} xl={8}>
                        <div
                          style={{
                            animation: `fadeInUp 0.6s ease-out ${
                              index * 0.08
                            }s both`
                          }}
                        >
                          <CarCard car={car} />
                        </div>
                      </Col>
                    ))}
                  </Row>
                  {/* Pagination */}
                  <div className="flex justify-center mt-8">
                    <Pagination
                      current={currentPage}
                      pageSize={pageSize}
                      total={filteredCars.length}
                      onChange={(page) => setCurrentPage(page)}
                      showSizeChanger={false} // Ẩn lựa chọn pageSize
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 md:p-16 text-center shadow-xl border-2 border-emerald-100">
                  {" "}
                  {/* Reduced base padding */}
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full flex items-center justify-center shadow-lg">
                        <Search className="text-emerald-500" size={56} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl">
                        <CarIcon className="text-white" size={24} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Không tìm thấy xe
                      </h3>
                      <p className="text-gray-600">
                        Thử điều chỉnh từ khóa tìm kiếm của bạn
                      </p>
                    </div>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-emerald-500/50"
                    >
                      Xóa bộ lọc
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <CarComparePage cars={selectedCars} />
          )}
        </div>
      </div>
      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CarListAndComparePage;
