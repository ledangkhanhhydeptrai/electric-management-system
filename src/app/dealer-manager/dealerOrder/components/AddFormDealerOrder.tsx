"use client";
import React from "react";
import {
  Trash2,
  X,
  AlertCircle,
  Package,
  FileText,
  Plus,
  Sparkles,
  ShoppingCart
} from "lucide-react";
import { ColorEnum } from "@/services/vehicle/vehicle";
import { Models } from "@/services/vehicleModel/vehicle";

interface OrderItem {
  modelId: string;
  color: ColorEnum;
  quantity: number;
}

export interface OrderFormData {
  items: OrderItem[];
  note: string;
}

interface AddFormDealerOrderModalProps {
  models: Models[];
  isOpen: boolean;
  onClose: () => void;
  formData: OrderFormData;
  errors: { [key: string]: string };
  onChange: (newData: Partial<OrderFormData>) => void;
  onItemChange: (
    index: number,
    field: keyof OrderItem,
    value: string | number
  ) => void;
  onAddItem: () => void;
  onRemoveItem: (index: number) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const AddFormDealerOrderModal: React.FC<AddFormDealerOrderModalProps> = ({
  isOpen,
  onClose,
  formData,
  errors,
  onChange,
  onItemChange,
  onAddItem,
  onRemoveItem,
  onSubmit,
  models
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative bg-gradient-to-br from-emerald-900 via-teal-950 to-cyan-950 p-1 rounded-3xl w-full max-w-3xl shadow-2xl shadow-emerald-500/20 animate-scale-in">
        {/* Glass container */}
        <div className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 rounded-3xl p-8 backdrop-blur-xl border border-emerald-500/10">
          {/* Header with decoration */}
          <div className="relative mb-8">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent rounded-full" />

            <button
              onClick={onClose}
              className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-red-500/20 to-red-600/20 hover:from-red-500/30 hover:to-red-600/30 border border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300 flex items-center justify-center group"
            >
              <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <ShoppingCart className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent text-center mb-2">
              Tạo đơn hàng đại lý
            </h2>
            <p className="text-gray-400 text-center text-sm">
              Điền thông tin để tạo đơn hàng mới
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar"
          >
            {/* Dealer & Staff Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-gray-300">
                  Thông tin cơ bản
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dealer Select */}
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-teal-400" />
                  <h3 className="text-sm font-semibold text-gray-300">
                    Sản phẩm đặt hàng
                  </h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-teal-500/50 to-transparent ml-2" />
                </div>
                <button
                  type="button"
                  onClick={onAddItem}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-600/20 hover:from-emerald-500/30 hover:to-teal-600/30 border border-emerald-500/30 hover:border-emerald-400/50 text-emerald-400 hover:text-emerald-300 transition-all duration-300 text-sm font-medium group shadow-lg shadow-emerald-500/10"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                  Thêm sản phẩm
                </button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, i) => (
                  <div
                    key={i}
                    className="relative group bg-gradient-to-br from-emerald-500/5 to-teal-500/5 hover:from-emerald-500/10 hover:to-teal-500/10 p-5 rounded-2xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 shadow-lg shadow-emerald-500/5"
                  >
                    {/* Item number badge */}
                    <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-slate-900 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-500/30">
                      {i + 1}
                    </div>

                    {formData.items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onRemoveItem(i)}
                        className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 border-2 border-slate-900 text-white transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                      {/* Model Select */}
                      <div className="md:col-span-1">
                        <label className="text-xs text-gray-400 mb-1.5 block">
                          Model xe
                        </label>
                        <div className="relative">
                          <select
                            value={item.modelId}
                            onChange={(e) =>
                              onItemChange(i, "modelId", e.target.value)
                            }
                            className="w-full bg-emerald-500/5 hover:bg-emerald-500/10 text-white px-3 py-2.5 rounded-lg border border-emerald-500/20 hover:border-emerald-500/40 focus:border-emerald-500 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-slate-800">
                              -- Chọn model --
                            </option>
                            {models.map((model) => (
                              <option
                                key={model.id}
                                value={model.id}
                                className="bg-slate-800"
                              >
                                {model.name} — {model.manufacturerName} (
                                {model.year})
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-3 h-3 text-emerald-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Color Input */}
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">
                          Màu sắc
                        </label>
                        <div className="relative">
                          <select
                            value={item.color}
                            onChange={(e) =>
                              onItemChange(i, "color", e.target.value)
                            }
                            className="w-full bg-teal-500/5 hover:bg-teal-500/10 text-white px-3 py-2.5 rounded-lg border border-teal-500/20 hover:border-teal-500/40 focus:border-teal-500 outline-none transition-all duration-300 text-sm appearance-none cursor-pointer"
                          >
                            <option value="" className="bg-slate-800">
                              Chọn màu...
                            </option>
                            <option value="WHITE" className="bg-slate-800">
                              Trắng
                            </option>
                            <option value="BLACK" className="bg-slate-800">
                              Đen
                            </option>
                            <option value="BLUE" className="bg-slate-800">
                              Xanh dương
                            </option>
                            <option value="RED" className="bg-slate-800">
                              Đỏ
                            </option>
                            <option value="SILVER" className="bg-slate-800">
                              Bạc
                            </option>
                            <option value="GREY" className="bg-slate-800">
                              Xám
                            </option>
                            <option value="GREEN" className="bg-slate-800">
                              Xanh lá
                            </option>
                            <option value="GOLDEN" className="bg-slate-800">
                              Vàng đồng
                            </option>
                          </select>
                          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                            <svg
                              className="w-3 h-3 text-teal-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Quantity Input */}
                      <div>
                        <label className="text-xs text-gray-400 mb-1.5 block">
                          Số lượng
                        </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            onItemChange(
                              i,
                              "quantity",
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-full bg-cyan-500/5 hover:bg-cyan-500/10 text-white px-3 py-2.5 rounded-lg border border-cyan-500/20 hover:border-cyan-500/40 focus:border-cyan-500 outline-none transition-all duration-300 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Note Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-gray-300">Ghi chú</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent" />
              </div>
              <div className="relative">
                <textarea
                  value={formData.note}
                  onChange={(e) => onChange({ note: e.target.value })}
                  placeholder="Nhập ghi chú cho đơn hàng..."
                  className="w-full bg-emerald-500/5 hover:bg-emerald-500/10 text-white px-4 py-3 rounded-xl border border-emerald-500/20 hover:border-cyan-500/40 focus:border-cyan-500 focus:bg-emerald-500/10 outline-none resize-none transition-all duration-300 placeholder:text-gray-500"
                  rows={3}
                />
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 animate-shake">
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-medium transition-all duration-300"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:via-teal-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Tạo đơn hàng
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(16, 185, 129, 0.05);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(
            to bottom,
            rgba(16, 185, 129, 0.5),
            rgba(20, 184, 166, 0.5)
          );
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            to bottom,
            rgba(16, 185, 129, 0.7),
            rgba(20, 184, 166, 0.7)
          );
        }
      `}</style>
    </div>
  );
};

export default AddFormDealerOrderModal;