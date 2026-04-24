"use client";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { pricingPolicies } from "@/app/types/pricingPolicies/pricing";
import { products } from "@/app/types/product/product";
import { DollarSign, Edit, Gift, Percent, Plus, Trash2 } from "lucide-react";
import React from "react";

const PricingView = () => {
  useAuthGuard(["Administrator"]);
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState(null);

  const openModal = (type: string, item = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Quản lý giá & khuyến mãi
          </h2>
          <p className="text-gray-600 mt-1">
            Chính sách giá sỉ, chiết khấu & khuyến mãi
          </p>
        </div>
        <button
          onClick={() => openModal("addPolicy")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Tạo chính sách mới
        </button>
      </div>

      {/* Wholesale Prices */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Bảng giá sỉ hiện hành
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product =>
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">
                  {product.image}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {product.model}
                  </div>
                  <div className="text-sm text-gray-600">
                    {product.version}
                  </div>
                </div>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-2">
                {(product.wholesalePrice / 1000000).toFixed(0)}tr
              </div>
              <button className="w-full px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
                Điều chỉnh giá
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Policies Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Percent className="w-5 h-5 text-green-600" />
            Chính sách chiết khấu & khuyến mãi
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tên chính sách
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Loại
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Điều kiện
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Giá trị
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Trạng thái
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {pricingPolicies.map(policy =>
                <tr
                  key={policy.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900">
                    {policy.name}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${policy.type ===
                      "Chiết khấu"
                        ? "bg-blue-100 text-blue-700"
                        : policy.type === "Khuyến mãi"
                          ? "bg-green-100 text-green-700"
                          : "bg-purple-100 text-purple-700"}`}
                    >
                      {policy.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {policy.condition}
                  </td>
                  <td className="py-3 px-4 font-semibold text-blue-600">
                    {policy.value}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${policy.status ===
                      "Đang áp dụng"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"}`}
                    >
                      {policy.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Policy Form */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-green-600" />
          Tạo chương trình khuyến mãi nhanh
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Tên chương trình"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Chọn loại</option>
            <option>Chiết khấu %</option>
            <option>Giảm giá cố định</option>
            <option>Quà tặng</option>
          </select>
          <input
            type="text"
            placeholder="Giá trị (%, VNĐ)"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Tạo ngay
          </button>
        </div>
      </div>
    </div>
  );
};
export default PricingView;
