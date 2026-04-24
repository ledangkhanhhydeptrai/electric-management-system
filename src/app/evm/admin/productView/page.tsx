"use client";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import { allocations } from "@/app/types/allocations/allocations";
import { products } from "@/app/types/product/product";
import { Download, Edit, Plus, Search } from "lucide-react";
import React from "react";
type Product = {
  id: number;
  model: string;
  version: string;
  color: string;
  stock: number;
  allocated: number;
  available: number;
  wholesalePrice: number;
  status: string;
  image: string;
};

const ProductsView = () => {
  useAuthGuard(["Administrator"]);
  const [showModal, setShowModal] = React.useState(false);
  const [modalType, setModalType] = React.useState("");
  const [selectedItem, setSelectedItem] = React.useState<Product | null>(null);
  const openModal = (type: string, item: Product | null = null) => {
    setModalType(type);
    setSelectedItem(item);
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Quản lý sản phẩm & phân phối
          </h2>
          <p className="text-gray-600 mt-1">
            Danh mục xe điện, tồn kho & điều phối
          </p>
        </div>
        <button
          onClick={() => openModal("addProduct")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Tất cả mẫu xe</option>
            <option>EVM-X1</option>
            <option>EVM-S2</option>
            <option>EVM-Pro</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>Tất cả trạng thái</option>
            <option>Còn hàng</option>
            <option>Sắp hết</option>
            <option>Hết hàng</option>
          </select>
          <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Xuất Excel
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Sản phẩm
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Tồn kho tổng
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Đã phân phối
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Còn lại
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
                  Giá sỉ
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
              {products.map(product =>
                <tr
                  key={product.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">
                        {product.image}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {product.model}
                        </div>
                        <div className="text-sm text-gray-600">
                          {product.version} • {product.color}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">
                    {product.stock}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {product.allocated}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`font-medium ${product.available < 10
                        ? "text-red-600"
                        : "text-green-600"}`}
                    >
                      {product.available}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-900">
                    {(product.wholesalePrice / 1000000).toFixed(0)}tr
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${product.status ===
                      "Còn hàng"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal("allocate", product)}
                        className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                      >
                        Phân phối
                      </button>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Allocations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">
          Lịch sử phân phối gần đây
        </h3>
        <div className="space-y-3">
          {allocations.map(allocation =>
            <div
              key={allocation.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-2 h-2 rounded-full ${allocation.status ===
                  "Đã giao"
                    ? "bg-green-500"
                    : allocation.status === "Đang vận chuyển"
                      ? "bg-blue-500"
                      : "bg-amber-500"}`}
                />
                <div>
                  <div className="font-medium text-gray-900">
                    {allocation.dealerName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {allocation.model} • {allocation.quantity} xe
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">
                  {allocation.date}
                </div>
                <div
                  className={`text-xs font-medium ${allocation.status ===
                  "Đã giao"
                    ? "text-green-600"
                    : allocation.status === "Đang vận chuyển"
                      ? "text-blue-600"
                      : "text-amber-600"}`}
                >
                  {allocation.status}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ProductsView;
