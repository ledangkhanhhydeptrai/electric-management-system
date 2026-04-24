"use client";
import FooterInternal from "@/components/FooterInternal";
import HeaderInternal from "@/components/HeaderInternal";
import { Modal } from "antd";
import {
  CalendarDays,
  Gift,
  Percent,
  Clock,
  Tag,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle,
  X
} from "lucide-react";
import Image from "next/image";
import React from "react";

interface Promotion {
  id: string;
  name: string;
  start: string;
  end: string;
  image: string;
  description: string;
  discount?: string;
  type: "discount" | "gift" | "finance";
  badge?: string;
  terms?: string[];
}

export default function PromotionsPage() {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [selectedPromotion, setSelectedPromotion] =
    React.useState<Promotion | null>(null);
  const [notificationOpen, setNotificationOpen] = React.useState(false);
  const [notificationMessage, setNotificationMessage] = React.useState("");

  const promotions: Promotion[] = [
    {
      id: "KM001",
      name: "Giảm ngay 5% khi mua VinFast VF 3",
      start: "01/09/2025",
      end: "30/09/2025",
      image:
        "https://vinfastvietnam.com.vn/wp-content/uploads/2023/09/Xam-min.png",
      description:
        "Áp dụng cho tất cả khách hàng mua VinFast VF 3 trong tháng 9. Ưu đãi đặc biệt dành cho người mua xe lần đầu.",
      discount: "5%",
      type: "discount",
      badge: "Hot",
      terms: [
        "Áp dụng cho tất cả phiên bản VF 3",
        "Không áp dụng đồng thời với chương trình khác",
        "Liên hệ showroom để biết thêm chi tiết"
      ]
    },
    {
      id: "KM002",
      name: "Tặng gói bảo hiểm 1 năm cho VinFast VF 6",
      start: "15/09/2025",
      end: "15/10/2025",
      image:
        "https://vinfast-vn.vn/wp-content/uploads/2023/10/vinfast-vf6-red.png",
      description:
        "Khách hàng mua VinFast VF 6 sẽ nhận gói bảo hiểm 1 năm miễn phí trị giá lên đến 15 triệu đồng.",
      discount: "15tr",
      type: "gift",
      badge: "Mới",
      terms: [
        "Bảo hiểm vật chất xe + Bảo hiểm trách nhiệm dân sự",
        "Áp dụng cho VF 6 Plus",
        "Bảo hiểm do đối tác uy tín cung cấp"
      ]
    },
    {
      id: "KM003",
      name: "Ưu đãi lãi suất vay mua VinFast VF 8",
      start: "20/09/2025",
      end: "20/10/2025",
      image:
        "https://i1-vnexpress.vnecdn.net/2024/07/15/VF-8-Lux-1.jpg?w=2400&h=0&q=100&dpr=1&fit=crop&s=o9FTtusEg0wMW8eR4uUxkg&t=image",
      description:
        "Ưu đãi lãi suất 0% khi vay mua VinFast VF 8 trong thời gian khuyến mãi. Trả góp lên đến 80% giá trị xe.",
      discount: "0%",
      type: "finance",
      badge: "Bán chạy",
      terms: [
        "Lãi suất 0% cho 12 tháng đầu",
        "Vay tối đa 80% giá trị xe",
        "Không phí trả nợ trước hạn"
      ]
    }
  ];

  React.useEffect(() => {
    if (notificationOpen) {
      const timer = setTimeout(() => {
        setNotificationOpen(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notificationOpen]);

  const getPromotionIcon = (type: string) => {
    switch (type) {
      case "discount":
        return <Percent size={20} />;
      case "gift":
        return <Gift size={20} />;
      case "finance":
        return <TrendingUp size={20} />;
      default:
        return <Tag size={20} />;
    }
  };

  const getPromotionColor = (type: string) => {
    switch (type) {
      case "discount":
        return "from-rose-500 to-pink-500";
      case "gift":
        return "from-emerald-500 to-teal-500";
      case "finance":
        return "from-blue-500 to-cyan-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getDaysLeft = (endDate: string) => {
    const [day, month, year] = endDate.split("/");
    const end = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const openModal = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPromotion(null);
  };

  const handleGetOffer = () => {
    setNotificationMessage(`Bạn đã nhận ưu đãi: ${selectedPromotion?.name}`);
    setNotificationOpen(true);
    closeModal();
  };

  return (
    <>
      <HeaderInternal />

      <main className="">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-10" />

        {/* Hero Section */}
        <section className="">
          <div className="">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 rounded-full text-sm font-semibold mb-6 shadow-sm">
                <Gift size={16} />
                <span>Ưu đãi đặc biệt tháng 10</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                  Khuyến mãi VinFast
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ưu đãi hấp dẫn khi mua xe điện VinFast – Nhận ngay quà tặng giá
                trị.
                <span className="font-semibold text-rose-600">
                  {" "}
                  Số lượng có hạn!
                </span>
              </p>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl text-white mb-3 mx-auto">
                    <Gift size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    {promotions.length}
                  </div>
                  <div className="text-sm text-gray-600">
                    Chương trình đang diễn ra
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white mb-3 mx-auto">
                    <Percent size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    Lên đến 15tr
                  </div>
                  <div className="text-sm text-gray-600">Giá trị ưu đãi</div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white mb-3 mx-auto">
                    <Clock size={24} />
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">
                    30 ngày
                  </div>
                  <div className="text-sm text-gray-600">Thời gian áp dụng</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promotions Grid */}
        <section className="pb-16 px-6">
          <div className="">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {promotions.map((promo, idx) => {
                const daysLeft = getDaysLeft(promo.end);
                return (
                  <div
                    key={promo.id}
                    className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-2"
                    onClick={() => openModal(promo)}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {promo.badge && (
                        <div className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                          <Sparkles size={12} />
                          {promo.badge}
                        </div>
                      )}
                    </div>

                    {/* Discount Badge */}
                    {promo.discount && (
                      <div className="absolute top-4 right-4 z-10">
                        <div
                          className={`flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br ${getPromotionColor(
                            promo.type
                          )} rounded-full text-white shadow-xl`}
                        >
                          <div className="text-lg font-bold leading-none">
                            {promo.discount}
                          </div>
                          <div className="text-xs">OFF</div>
                        </div>
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative h-56 w-full bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
                      <Image
                        src={promo.image}
                        alt={promo.name}
                        fill
                        className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Promotion Type */}
                      <div className="flex items-center gap-2 mb-3">
                        <div
                          className={`flex items-center justify-center w-8 h-8 bg-gradient-to-br ${getPromotionColor(
                            promo.type
                          )} rounded-lg text-white`}
                        >
                          {getPromotionIcon(promo.type)}
                        </div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          {promo.type === "discount"
                            ? "Giảm giá"
                            : promo.type === "gift"
                            ? "Quà tặng"
                            : "Tài chính"}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-rose-600 transition-colors line-clamp-2">
                        {promo.name}
                      </h2>

                      {/* Date Range */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays
                            size={16}
                            className="text-emerald-500"
                          />
                          <span>
                            Từ{" "}
                            <span className="font-semibold">{promo.start}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CalendarDays size={16} className="text-rose-500" />
                          <span>
                            Đến{" "}
                            <span className="font-semibold">{promo.end}</span>
                          </span>
                        </div>
                      </div>

                      {/* Days Left */}
                      {daysLeft > 0 && (
                        <div className="mb-4 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock size={16} className="text-rose-600" />
                              <span className="text-sm font-semibold text-rose-700">
                                Còn {daysLeft} ngày
                              </span>
                            </div>
                            <div className="text-xs text-rose-600">⏰</div>
                          </div>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button
                        className="group/btn w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(promo);
                        }}
                      >
                        <span>Chi tiết ưu đãi</span>
                        <ArrowRight
                          size={18}
                          className="group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-200 rounded-3xl transition-colors duration-300"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl mb-6 shadow-xl">
              <Sparkles size={32} className="text-white" />
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Không tìm thấy ưu đãi phù hợp?
            </h2>

            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Liên hệ với chúng tôi để nhận tư vấn về các chương trình ưu đãi
              đặc biệt dành riêng cho bạn
            </p>

            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-100">
              <span>Tư vấn miễn phí</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </section>
      </main>

      {/* Enhanced Modal */}
      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        centered
        width={800}
        styles={{
          body: { padding: 0 },
          content: { borderRadius: "24px", overflow: "hidden" }
        }}
      >
        {selectedPromotion && (
          <div className="overflow-hidden">
            {/* Modal Header Image */}
            <div className="relative h-80 w-full bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src={selectedPromotion.image}
                alt={selectedPromotion.name}
                fill
                className="object-contain p-8"
              />

              {/* Badges */}
              <div className="absolute top-6 left-6 flex gap-2">
                {selectedPromotion.badge && (
                  <div className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full text-sm font-bold shadow-xl flex items-center gap-2">
                    <Sparkles size={16} />
                    {selectedPromotion.badge}
                  </div>
                )}
              </div>

              {selectedPromotion.discount && (
                <div className="absolute top-6 right-6">
                  <div
                    className={`flex flex-col items-center justify-center w-20 h-20 bg-gradient-to-br ${getPromotionColor(
                      selectedPromotion.type
                    )} rounded-2xl text-white shadow-2xl`}
                  >
                    <div className="text-2xl font-bold leading-none">
                      {selectedPromotion.discount}
                    </div>
                    <div className="text-xs mt-1">OFF</div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Content */}
            <div className="p-8 bg-white">
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className={`flex items-center justify-center w-14 h-14 bg-gradient-to-br ${getPromotionColor(
                    selectedPromotion.type
                  )} rounded-2xl text-white flex-shrink-0`}
                >
                  {getPromotionIcon(selectedPromotion.type)}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    {selectedPromotion.type === "discount"
                      ? "Chương trình giảm giá"
                      : selectedPromotion.type === "gift"
                      ? "Chương trình quà tặng"
                      : "Hỗ trợ tài chính"}
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {selectedPromotion.name}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="p-4 bg-gray-50 rounded-xl mb-6">
                <p className="text-gray-700 leading-relaxed">
                  {selectedPromotion.description}
                </p>
              </div>

              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-700 mb-1">
                    <CalendarDays size={16} />
                    <span className="text-xs font-semibold uppercase">
                      Bắt đầu
                    </span>
                  </div>
                  <div className="text-lg font-bold text-emerald-800">
                    {selectedPromotion.start}
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-700 mb-1">
                    <CalendarDays size={16} />
                    <span className="text-xs font-semibold uppercase">
                      Kết thúc
                    </span>
                  </div>
                  <div className="text-lg font-bold text-rose-800">
                    {selectedPromotion.end}
                  </div>
                </div>
              </div>

              {/* Days Left Alert */}
              {getDaysLeft(selectedPromotion.end) > 0 && (
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg text-white">
                      <Clock size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-amber-900">
                        Chương trình sắp kết thúc!
                      </div>
                      <div className="text-xs text-amber-700">
                        Còn {getDaysLeft(selectedPromotion.end)} ngày để nhận ưu
                        đãi
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms */}
              {selectedPromotion.terms && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <CheckCircle size={20} className="text-emerald-600" />
                    Điều kiện áp dụng
                  </h3>
                  <div className="space-y-2">
                    {selectedPromotion.terms.map((term, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-gray-700 text-sm"
                      >
                        <CheckCircle
                          size={16}
                          className="text-emerald-500 flex-shrink-0 mt-0.5"
                        />
                        <span>{term}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all duration-300"
                >
                  Đóng
                </button>
                <button
                  onClick={handleGetOffer}
                  className="flex-2 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-100"
                >
                  <Gift size={18} />
                  <span>Nhận ưu đãi ngay</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Custom Notification */}
      {notificationOpen && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-white rounded-xl shadow-2xl border border-emerald-200 p-4 min-w-80 max-w-md">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex-shrink-0">
                <CheckCircle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 mb-1">Thành công!</div>
                <div className="text-sm text-gray-600">
                  {notificationMessage}
                </div>
              </div>
              <button
                onClick={() => setNotificationOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>

      <FooterInternal />
    </>
  );
}
