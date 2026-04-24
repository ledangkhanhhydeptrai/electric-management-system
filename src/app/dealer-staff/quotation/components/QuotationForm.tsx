import React from "react";
import {
  User,
  Mail,
  Phone,
  Plus,
  Trash2,
  Save,
  X,
  Package,
  DollarSign,
  Hash,
  Palette,
  ShoppingCart,
  Sparkles,
  Car,
  CheckCircle2,
  ChevronDown,
  Receipt
} from "lucide-react";
import { ItemsPropsQuotation } from "@/services/quotationService/quotation";
import { Models } from "@/services/vehicleModel/vehicle";
import { ColorEnum } from "@/services/vehicle/vehicle";

interface QuotationFormProps {
  models: Models[];
  customerName: string;
  setCustomerName: (value: string) => void;
  customerEmail: string;
  setCustomerEmail: (value: string) => void;
  customerPhone: string;
  setCustomerPhone: (value: string) => void;
  items: ItemsPropsQuotation[];
  setItems: (value: ItemsPropsQuotation[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

const QuotationForm: React.FC<QuotationFormProps> = ({
  models,
  customerName,
  setCustomerName,
  customerEmail,
  setCustomerEmail,
  customerPhone,
  setCustomerPhone,
  items,
  setItems,
  onSubmit,
  onCancel
}) => {
  const handleAddItem = () => {
    setItems([
      ...items,
      {
        modelId: "",
        color: "",
        quantity: 1,
        price: 0
      }
    ]);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleItemChange = (
    index: number,
    field: keyof ItemsPropsQuotation,
    value: string | number
  ) => {
    const newItems = [...items];

    // Auto-fill price when model is selected
    if (field === "modelId") {
      const selectedModel = models.find((m) => m.id === value);
      if (selectedModel) {
        newItems[index] = {
          ...newItems[index],
          modelId: value as string,
          price: selectedModel.basePrice
        };
        setItems(newItems);
        return;
      }
    }

    newItems[index] = {
      ...newItems[index],
      [field]: value
    };
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const colors: ColorEnum[] = [
    "WHITE",
    "BLACK",
    "BLUE",
    "RED",
    "SILVER",
    "GREY",
    "GREEN",
    "GOLDEN"
  ];

  const getColorDisplay = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string; name: string }> =
      {
        WHITE: { bg: "bg-white", text: "text-gray-700", name: "Trắng" },
        BLACK: { bg: "bg-gray-900", text: "text-white", name: "Đen" },
        BLUE: { bg: "bg-blue-500", text: "text-white", name: "Xanh Dương" },
        RED: { bg: "bg-red-500", text: "text-white", name: "Đỏ" },
        SILVER: { bg: "bg-gray-400", text: "text-white", name: "Bạc" },
        GREY: { bg: "bg-gray-600", text: "text-white", name: "Xám" },
        GREEN: { bg: "bg-green-500", text: "text-white", name: "Xanh Lá" },
        GOLDEN: { bg: "bg-yellow-500", text: "text-gray-900", name: "Vàng" }
      };
    return colorMap[color] || { bg: "", text: "", name: color };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-3 md:p-6">
      <div className="max-w-5xl mx-auto">
        {/* Compact Modern Header */}
        <div className="mb-6 relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-4 -right-4 w-28 h-28 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-700" />

          <div className="relative backdrop-blur-xl bg-white/70 rounded-2xl p-5 border border-white/80 shadow-xl hover:shadow-2xl transition-all duration-500">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-xl shadow-lg relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Receipt className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                    Tạo Báo Giá Mới
                  </h1>
                  <p className="text-gray-600 text-sm flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Tạo báo giá chuyên nghiệp
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <div className="px-3 py-1.5 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg border border-emerald-200">
                  <p className="text-xs text-emerald-600 font-semibold">
                    Sản phẩm
                  </p>
                  <p className="text-xl font-bold text-emerald-700">
                    {items.length}
                  </p>
                </div>
                <div className="px-3 py-1.5 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-lg border border-cyan-200">
                  <p className="text-xs text-cyan-600 font-semibold">Models</p>
                  <p className="text-xl font-bold text-cyan-700">
                    {models.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer Information Card */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500" />
            <div className="relative backdrop-blur-xl bg-white/85 rounded-2xl p-5 border border-white/70 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg shadow">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Thông tin khách hàng
                  </h2>
                  <p className="text-xs text-gray-500">Điền đầy đủ thông tin</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Name */}
                <div className="md:col-span-2 group/input">
                  <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    Họ và tên khách hàng
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover/input:text-emerald-500 transition-colors" />
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      required
                      className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 outline-none hover:border-emerald-300 shadow-sm hover:shadow-md text-sm"
                    />
                  </div>
                </div>

                {/* Customer Email */}
                <div className="group/input">
                  <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                    Địa chỉ Email
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover/input:text-teal-500 transition-colors" />
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="example@email.com"
                      required
                      className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 outline-none hover:border-teal-300 shadow-sm hover:shadow-md text-sm"
                    />
                  </div>
                </div>

                {/* Customer Phone */}
                <div className="group/input">
                  <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                    Số điện thoại
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover/input:text-cyan-500 transition-colors" />
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="0901234567"
                      required
                      pattern="[0-9]{10}"
                      className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-300 outline-none hover:border-cyan-300 shadow-sm hover:shadow-md text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500" />
            <div className="relative backdrop-blur-xl bg-white/85 rounded-2xl p-5 border border-white/70 shadow-lg hover:shadow-xl transition-all duration-500">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-lg shadow">
                    <ShoppingCart className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">
                      Danh sách sản phẩm
                    </h2>
                    <p className="text-xs text-gray-500">
                      Thêm sản phẩm vào báo giá
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="group/btn px-4 py-2 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 relative overflow-hidden text-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  <Plus className="w-4 h-4 relative z-10 group-hover/btn:rotate-90 transition-transform duration-300" />
                  <span className="relative z-10 hidden sm:inline">Thêm</span>
                </button>
              </div>

              {items.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 rounded-2xl border-2 border-dashed border-gray-300 relative overflow-hidden group/empty">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 opacity-0 group-hover/empty:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="inline-block p-5 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full mb-4">
                      <Package className="w-14 h-14 text-gray-400" />
                    </div>
                    <p className="text-gray-600 text-lg font-bold mb-1">
                      Chưa có sản phẩm
                    </p>
                    <p className="text-gray-400 mb-6 text-sm">
                      Bắt đầu thêm sản phẩm
                    </p>
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Thêm sản phẩm đầu tiên
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="group/item relative bg-gradient-to-br from-white to-emerald-50/30 rounded-2xl p-4 border-2 border-gray-200 hover:border-teal-400 hover:shadow-lg transition-all duration-300"
                      style={{
                        animation: `slideInUp 0.4s ease-out ${
                          index * 0.08
                        }s both`
                      }}
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-lg shadow text-white font-black text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-gray-800 flex items-center gap-1.5">
                              <Car className="w-4 h-4 text-teal-600" />
                              Sản phẩm #{index + 1}
                            </h3>
                            <p className="text-xs text-gray-500">
                              Chọn model và màu
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:scale-110 active:scale-95 transition-all duration-300 group/delete border border-red-200"
                        >
                          <Trash2 className="w-4 h-4 group-hover/delete:rotate-12 transition-transform" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Model Dropdown */}
                        <div className="md:col-span-2 group/input">
                          <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Car className="w-3.5 h-3.5 text-emerald-600" />
                            Model Xe
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 group-hover/input:text-emerald-500 transition-colors" />
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                            <select
                              value={item.modelId}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "modelId",
                                  e.target.value
                                )
                              }
                              required
                              className="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-300 outline-none hover:border-emerald-300 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm"
                            >
                              <option value="" disabled>
                                Chọn model xe
                              </option>
                              {models.map((model) => (
                                <option key={model.id} value={model.id}>
                                  {model.name} -{" "}
                                  {formatCurrency(model.basePrice)}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Color Dropdown */}
                        <div className="group/input">
                          <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Palette className="w-3.5 h-3.5 text-teal-600" />
                            Màu sắc
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                              {item.color && (
                                <div
                                  className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                                    getColorDisplay(item.color).bg
                                  }`}
                                />
                              )}
                              {!item.color && (
                                <Palette className="w-4 h-4 text-gray-400 group-hover/input:text-teal-500 transition-colors" />
                              )}
                            </div>
                            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none" />
                            <select
                              value={item.color}
                              onChange={(e) =>
                                handleItemChange(index, "color", e.target.value)
                              }
                              required
                              className="w-full pl-10 pr-10 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-teal-500/20 focus:border-teal-500 transition-all duration-300 outline-none hover:border-teal-300 shadow-sm hover:shadow-md appearance-none cursor-pointer text-sm"
                            >
                              <option value="" disabled>
                                Chọn màu
                              </option>
                              {colors.map((color) => (
                                <option key={color} value={color}>
                                  {getColorDisplay(color).name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="group/input">
                          <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-cyan-600" />
                            Số lượng
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-hover/input:text-cyan-500 transition-colors" />
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleItemChange(
                                  index,
                                  "quantity",
                                  parseInt(e.target.value) || 1
                                )
                              }
                              placeholder="1"
                              required
                              className="w-full pl-10 pr-3 py-3 bg-white border-2 border-gray-200 rounded-xl focus:ring-3 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all duration-300 outline-none hover:border-cyan-300 shadow-sm hover:shadow-md text-sm"
                            />
                          </div>
                        </div>

                        {/* Price */}
                        <div className="md:col-span-2 group/input">
                          {/* Subtotal */}
                          <div className="mt-3 p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 rounded-xl border border-emerald-200">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 font-bold flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4 text-emerald-600" />
                                Thành tiền:
                              </span>
                              <span className="text-xl font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                                {formatCurrency(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Total Summary */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
            <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-5 shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                  <h3 className="text-base font-black text-white">
                    TỔNG GIÁ TRỊ BÁO GIÁ
                  </h3>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                  <div className="text-white">
                    <p className="text-sm font-bold opacity-90">
                      {items.length} sản phẩm được chọn
                    </p>
                    <p className="text-xs opacity-75 mt-0.5">
                      Đã bao gồm thuế VAT
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-3xl md:text-4xl font-black text-white drop-shadow-lg">
                      {formatCurrency(calculateTotal())}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:flex-1 px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 hover:border-gray-400 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow hover:shadow-lg group/cancel"
            >
              <X className="w-5 h-5 group-hover/cancel:rotate-90 transition-transform duration-300" />
              <span>Hủy bỏ</span>
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 px-6 py-3 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl font-black hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group/submit"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 opacity-0 group-hover/submit:opacity-100 transition-opacity duration-500" />
              <Save className="w-5 h-5 relative z-10 group-hover/submit:scale-110 transition-transform" />
              <span className="relative z-10">Lưu báo giá</span>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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

export default QuotationForm;
