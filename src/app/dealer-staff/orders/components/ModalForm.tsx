import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  Search,
  User,
  Building2,
  ShoppingCart
} from "lucide-react";
import { ItemProps, OrderProps } from "@/services/orderService/order";
import { InventoryItem } from "../../inventories/types/types";
import { CustomerVIP } from "@/app/evm/admin/customer/types/customer";

interface OrderModalProps {
  customers: CustomerVIP[];
  isOpen: boolean;
  onClose: () => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  inventories: InventoryItem[];
  customerId: string;
  setCustomerId: (v: string) => void;
  items: ItemProps[];
  setItems: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  mode: "create" | "edit";
  initialData?: OrderProps;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  handleSubmit,
  customerId,
  setCustomerId,
  items,
  setItems,
  inventories,
  mode = "create",
  initialData,
  customers
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerVIP[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerVIP | null>(
    null
  );
  const searchRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (mode === "edit" && initialData) {
      setCustomerId(initialData.customerId);
      setItems(initialData.items || []);

      const customer = customers.find((c) => c.id === initialData.customerId);
      if (customer) {
        setSelectedCustomer(customer);
        setSearchQuery(customer.fullName);
      }
    }
  }, [mode, initialData, setCustomerId, setItems, customers]);

  useEffect(() => {
    if (searchQuery.trim() && !selectedCustomer) {
      const filtered = customers.filter(
        (customer) =>
          customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery)
      );
      setFilteredCustomers(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredCustomers([]);
      setShowDropdown(false);
    }
  }, [searchQuery, customers, selectedCustomer]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCustomer = (customer: CustomerVIP) => {
    setSelectedCustomer(customer);
    setCustomerId(customer.id);
    setSearchQuery(customer.fullName);
    setShowDropdown(false);
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { inventoryId: "", discountAmount: 0, quantity: 1 }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) setItems(items.filter((_, i) => i !== index));
  };

  if (!isOpen) return null;

  const handleLocalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!customerId) {
        alert("Vui lòng chọn khách hàng trước khi tạo đơn hàng!");
        return;
      }
      await handleSubmit(e);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Smooth scroll container */
        .smooth-scroll-container {
          scroll-behavior: smooth;
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(99, 102, 241, 0.3) transparent;
        }

        .smooth-scroll-container::-webkit-scrollbar {
          width: 8px;
        }

        .smooth-scroll-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .smooth-scroll-container::-webkit-scrollbar-thumb {
          background-color: rgba(99, 102, 241, 0.3);
          border-radius: 10px;
          transition: background-color 0.2s;
        }

        .smooth-scroll-container::-webkit-scrollbar-thumb:hover {
          background-color: rgba(99, 102, 241, 0.5);
        }

        .modal-overlay {
          animation: modalFadeIn 0.3s ease-out;
        }
        .modal-content {
          animation: modalSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .dropdown-enter {
          animation: dropdownSlide 0.2s ease-out;
        }
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
          will-change: background-position;
        }
        .float-animation {
          animation: float 3s ease-in-out infinite;
          will-change: transform;
        }
        .search-input-focus {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .search-input-focus:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.2);
        }
        .item-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        .item-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        }

        /* Optimize dropdown scroll */
        .dropdown-scroll {
          overscroll-behavior: contain;
          -webkit-overflow-scrolling: touch;
        }
      `}</style>

      <div className="modal-overlay fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50">
        <div
          className="modal-content bg-white rounded-[2rem] shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - Phóng to và đẹp hơn */}
          <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-10">
            <div className="shimmer-effect absolute inset-0 opacity-20"></div>

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-xl float-animation">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-black tracking-tight">
                    {mode === "edit"
                      ? "Chỉnh sửa đơn hàng"
                      : "Tạo đơn hàng mới"}
                  </h2>
                  <p className="text-indigo-100 text-base font-medium mt-2">
                    {mode === "edit"
                      ? "Cập nhật thông tin đơn hàng của bạn"
                      : "Tạo đơn hàng cho khách hàng"}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-90 backdrop-blur-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form - Phóng to */}
          <form onSubmit={handleLocalSubmit}>
            <div className="space-y-8 overflow-y-auto max-h-[calc(95vh-300px)]">
              {/* Customer Section - Phóng to */}
              <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-blue-100 shadow-lg">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Thông tin khách hàng
                  </h3>
                </div>

                <div className="relative" ref={searchRef}>
                  <label className="block text-base font-bold text-gray-700 mb-3">
                    Chọn khách hàng <span className="text-red-500">*</span>
                  </label>

                  {!selectedCustomer && (
                    <>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => searchQuery && setShowDropdown(true)}
                          placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                          className="search-input-focus w-full px-6 py-4 pl-14 pr-14 border-2 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all bg-white text-gray-800 text-base font-medium hover:border-blue-300 outline-none shadow-sm"
                          required
                        />
                        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => {
                              setSearchQuery("");
                              setShowDropdown(false);
                            }}
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      {showDropdown && filteredCustomers.length > 0 && (
                        <div className="w-full mt-2 bg-white border-2 border-blue-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto">
                          {filteredCustomers.map((customer) => (
                            <button
                              key={customer.id}
                              type="button"
                              onClick={() => handleSelectCustomer(customer)}
                              className="w-full px-5 py-4 text-left hover:bg-blue-50 transition-all duration-200 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                            >
                              <div
                                className={`p-2 rounded-xl flex-shrink-0 shadow-sm ${
                                  customer.customerType === "INDIVIDUAL"
                                    ? "bg-gradient-to-br from-blue-400 to-blue-600"
                                    : "bg-gradient-to-br from-purple-400 to-purple-600"
                                }`}
                              >
                                {customer.customerType === "INDIVIDUAL" ? (
                                  <User className="w-5 h-5 text-white" />
                                ) : (
                                  <Building2 className="w-5 h-5 text-white" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-800 truncate text-base">
                                  {customer.fullName}
                                </p>
                                <p className="text-sm text-gray-500 truncate">
                                  {customer.phone} • {customer.email}
                                </p>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {showDropdown &&
                        searchQuery &&
                        filteredCustomers.length === 0 && (
                          <div className="dropdown-enter absolute z-20 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl p-6 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-base text-gray-700 font-semibold">
                              Không tìm thấy khách hàng
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Thử tìm kiếm với từ khóa khác
                            </p>
                          </div>
                        )}
                    </>
                  )}

                  {selectedCustomer && (
                    <div className="p-6 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-2 border-blue-300 rounded-2xl shadow-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl flex-shrink-0 shadow-lg ${
                              selectedCustomer.customerType === "INDIVIDUAL"
                                ? "bg-gradient-to-br from-blue-500 to-blue-700"
                                : "bg-gradient-to-br from-purple-500 to-purple-700"
                            }`}
                          >
                            {selectedCustomer.customerType === "INDIVIDUAL" ? (
                              <User className="w-7 h-7 text-white" />
                            ) : (
                              <Building2 className="w-7 h-7 text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="text-xl font-black text-gray-900">
                              {selectedCustomer.fullName}
                            </h4>
                            <p className="text-sm text-gray-600 font-medium mt-1">
                              {selectedCustomer.customerType === "INDIVIDUAL"
                                ? "Khách hàng cá nhân"
                                : "Khách hàng doanh nghiệp"}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("");
                            setShowDropdown(false);
                            setSelectedCustomer(null);
                            setCustomerId("");
                          }}
                          className="p-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-white transition-all duration-300 flex-shrink-0 shadow-lg hover:scale-110"
                          title="Chọn khách hàng khác"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Thông tin chi tiết khách hàng */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-800 text-base font-medium">
                        <p>
                          📧 Email:{" "}
                          <span className="font-semibold">
                            {selectedCustomer.email}
                          </span>
                        </p>
                        <p>
                          📱 SĐT:{" "}
                          <span className="font-semibold">
                            {selectedCustomer.phone}
                          </span>
                        </p>

                        {selectedCustomer.address && (
                          <p>
                            📍 Địa chỉ:{" "}
                            <span className="font-semibold">
                              {selectedCustomer.address}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Products Section - Phóng to */}
              <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 rounded-3xl p-8 border-2 border-purple-100 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <ShoppingCart className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      Danh sách sản phẩm
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-6 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 text-base hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    <Plus className="w-5 h-5" /> Thêm sản phẩm
                  </button>
                </div>

                <div className="space-y-5">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="item-card bg-white border-2 border-gray-200 rounded-3xl p-6 shadow-md"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-white font-black text-base shadow-lg">
                            {index + 1}
                          </div>
                          <span className="text-base font-bold text-gray-800">
                            Sản phẩm #{index + 1}
                          </span>
                        </div>
                        {items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(index)}
                            className="w-10 h-10 bg-red-100 hover:bg-red-200 rounded-2xl flex items-center justify-center text-red-600 transition-all duration-300 hover:scale-110 shadow-sm"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div>
                          <label className="block text-base font-bold mb-3 text-gray-700">
                            Sản phẩm <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={item.inventoryId}
                            onChange={(e) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? { ...it, inventoryId: e.target.value }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-4 border-2 rounded-2xl border-gray-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all text-base font-medium shadow-sm"
                            required
                          >
                            <option value="">-- Chọn sản phẩm --</option>
                            {inventories.map((inv) => (
                              <option key={inv.id} value={inv.id}>
                                {inv.vehicleModelName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-base font-bold mb-3 text-gray-700">
                            Số lượng <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? {
                                        ...it,
                                        quantity: Number(e.target.value)
                                      }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-4 border-2 rounded-2xl border-gray-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all text-base font-medium shadow-sm"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-base font-bold mb-3 text-gray-700">
                            Giảm giá (VNĐ)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={item.discountAmount}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setItems((prev) =>
                                prev.map((it, i) =>
                                  i === index
                                    ? {
                                        ...it,
                                        discountAmount: Number(e.target.value)
                                      }
                                    : it
                                )
                              )
                            }
                            className="w-full px-5 py-4 border-2 rounded-2xl border-gray-200 hover:border-purple-300 focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none transition-all text-base font-medium shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer - Phóng to */}
            <div className="border-t-2 border-gray-200 p-8 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:bg-white font-bold transition-all duration-300 hover:scale-105 shadow-md text-base"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white rounded-2xl font-black flex items-center gap-3 hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-xl text-base"
              >
                {mode === "edit" ? (
                  <>
                    <span>💾</span> Cập nhật đơn hàng
                  </>
                ) : (
                  <>
                    <span>✅</span> Tạo đơn hàng
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
