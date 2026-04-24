// src/pages/CheckoutPage.tsx
"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import React, { useState } from "react";

interface CarDetails {
  name: string;
  model: string;
  price: number;
  imageUrl: string;
  color: string;
  engine: string;
  transmission: string;
  features: string[];
}

interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
}

const currencyVN = (v: number) =>
  v.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const CheckoutPage: React.FC = () => {
  const [car] = useState<CarDetails>({
    name: "Mercedes-Benz S-Class",
    model: "S 450 L Luxury",
    price: 5_200_000_000,
    imageUrl:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=1920&auto=format&fit=crop",
    color: "Obsidian Black",
    engine: "3.0L V6 Turbo",
    transmission: "9G-TRONIC",
    features: [
      "Burmester 3D Surround",
      "AIRMATIC Suspension",
      "Panoramic Sunroof"
    ]
  });

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const calculateTotal = () => currencyVN(car.price);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setPaymentSuccess(null);

    try {
      await new Promise((r) => setTimeout(r, 2000));
      const success = Math.random() > 0.1;
      setPaymentSuccess(success);
    } catch {
      setPaymentSuccess(false);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <div className="relative min-h-screen w-full bg-white text-gray-900 flex flex-col overflow-hidden mt-20">
        {/* Hero background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        </div>

        {/* Header */}
        <header className="px-6 pt-10 pb-6 text-center">
          <h1 className="text-3xl font-bold">Thanh toán xe tại showroom</h1>
          <p className="mt-2 text-gray-600">
            Hoàn tất đơn hàng của bạn với trải nghiệm sang trọng, tinh tế và an
            toàn.
          </p>
        </header>

        {/* Status banner */}
        <div className="px-6 my-4">
          {paymentSuccess === true && (
            <div className="rounded-lg bg-emerald-100 p-3 text-emerald-700 font-semibold">
              ✅ Thanh toán thành công! Cảm ơn bạn đã tin tưởng chúng tôi.
            </div>
          )}
          {paymentSuccess === false && (
            <div className="rounded-lg bg-red-100 p-3 text-red-700 font-semibold">
              ❌ Thanh toán thất bại. Vui lòng kiểm tra lại thông tin hoặc thử
              lại.
            </div>
          )}
        </div>

        {/* Main content */}
        <main className="flex flex-1 gap-6 md:gap-10 px-6">
          {/* Left: Car image & details */}
          <section className="flex-1 rounded-xl bg-gray-50 p-6 flex flex-col justify-between shadow">
            <div>
              <div className="overflow-hidden rounded-xl mb-4">
                <Image
                  src={car.imageUrl}
                  alt={`${car.name} ${car.model}`}
                  width={500}
                  height={300}
                  className="w-full h-[300px] object-cover rounded-xl"
                />
              </div>
              <h2 className="text-2xl font-bold mb-2">
                {car.name} - {car.model}
              </h2>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3 text-gray-700">
                <p>
                  <span className="font-semibold">Màu sắc:</span> {car.color}
                </p>
                <p>
                  <span className="font-semibold">Động cơ:</span> {car.engine}
                </p>
                <p>
                  <span className="font-semibold">Hộp số:</span>{" "}
                  {car.transmission}
                </p>
                <p>
                  <span className="font-semibold">Giá:</span>{" "}
                  {currencyVN(car.price)}
                </p>
              </div>
              <div>
                <span className="font-semibold">Tính năng:</span>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {car.features.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-blue-300 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-lg font-bold">
              <span>Tổng cộng</span>
              <span>{calculateTotal()}</span>
            </div>
          </section>

          {/* Right: Checkout form */}
          <section className="flex-1 rounded-xl bg-gray-50 p-6 flex flex-col justify-between shadow">
            <div>
              <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm">Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={customerInfo.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Nguyễn Văn A"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                    placeholder="ban@example.com"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="09xx xxx xxx"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Địa chỉ giao xe</label>
                  <input
                    type="text"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Số nhà, đường, phường/xã"
                    className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm">Thành phố</label>
                    <input
                      type="text"
                      name="city"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                      placeholder="TP. Hồ Chí Minh"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Mã bưu chính</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      placeholder="700000"
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="font-bold mb-2">Phương thức thanh toán</h3>
                  {[
                    { key: "creditCard", label: "Thẻ tín dụng/ghi nợ" },
                    { key: "bankTransfer", label: "Chuyển khoản ngân hàng" },
                    { key: "eWallet", label: "Ví điện tử (MoMo, ZaloPay...)" },
                    { key: "showroom", label: "Thanh toán tại showroom" }
                  ].map((opt) => (
                    <label
                      key={opt.key}
                      className="flex items-center justify-between cursor-pointer rounded-lg border border-gray-300 p-3 mb-2 hover:border-emerald-500"
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={opt.key}
                          checked={paymentMethod === opt.key}
                          onChange={handlePaymentMethodChange}
                          required
                          className="h-4 w-4 accent-emerald-500"
                        />
                        {opt.label}
                      </span>
                      {paymentMethod === opt.key && (
                        <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                          Chọn
                        </span>
                      )}
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-6 w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 text-white font-semibold shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isProcessing ? "Đang xử lý..." : "Xác nhận thanh toán"}
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
