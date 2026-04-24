// src/app/cart/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trash2, ShoppingCart } from "lucide-react";
import Image from "next/image";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
};

const formatCurrency = (num: number) =>
  num.toLocaleString("vi-VN", { minimumFractionDigits: 0 }) + "₫";

// Fake data
const fakeCart: CartItem[] = [
  {
    id: "1",
    name: "Tai nghe Bluetooth",
    image: "https://placehold.co/90x90?text=Tai+nghe",
    price: 500000,
    salePrice: 350000,
    quantity: 1
  },
  {
    id: "2",
    name: "Áo Polo nam",
    image: "https://placehold.co/90x90?text=Polo",
    price: 250000,
    quantity: 1
  },
  {
    id: "3",
    name: "Bàn phím cơ",
    image: "https://placehold.co/90x90?text=Keyboard",
    price: 1200000,
    salePrice: 1000000,
    quantity: 1
  }
];

const CartPage: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    setItems(fakeCart);
  }, []);

  const onChangeQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const onRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calcLineTotal = (item: CartItem) => {
    if (item.salePrice !== null && item.salePrice !== undefined) {
      return item.salePrice * item.quantity;
    }
    return item.price * item.quantity;
  };

  const total = items.reduce((sum, item) => sum + calcLineTotal(item), 0);
  const saleTotal = items.reduce((sum, item) => {
    const discountPerItem = item.salePrice ? item.price - item.salePrice : 0;
    return sum + discountPerItem * item.quantity;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 mt-20">
      <Header />

      <main className="flex-1 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-blue-600 mb-6">
            <ShoppingCart className="w-6 h-6" /> Giỏ hàng của bạn
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-600">
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Cột trái: danh sách sản phẩm */}
              <div className="md:col-span-2 space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover border"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      {item.salePrice ? (
                        <div className="text-sm">
                          <span className="line-through text-gray-400">
                            {formatCurrency(item.price)}
                          </span>
                          <span className="ml-2 text-red-500 font-bold">
                            {formatCurrency(item.salePrice)}
                          </span>
                        </div>
                      ) : (
                        <p className="font-bold">
                          {formatCurrency(item.price)}
                        </p>
                      )}
                      <div className="flex items-center mt-2 gap-2">
                        <label>Số lượng:</label>
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            onChangeQuantity(
                              item.id,
                              parseInt(e.target.value) || 1
                            )
                          }
                          className="w-16 border rounded-lg p-1 text-center"
                        />
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="ml-3 flex items-center gap-1 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" /> Xóa
                        </button>
                      </div>
                    </div>
                    <p className="text-blue-600 font-bold">
                      {formatCurrency(calcLineTotal(item))}
                    </p>
                  </div>
                ))}
              </div>

              {/* Cột phải: tóm tắt đơn hàng */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm">
                <p className="font-semibold">Tạm tính:</p>
                <p className="text-xl font-bold text-blue-600 mt-1">
                  {formatCurrency(total)}
                </p>
                {saleTotal > 0 && (
                  <p className="text-green-600 mt-2">
                    🎉 Bạn đã tiết kiệm {formatCurrency(saleTotal)}
                  </p>
                )}
                <button
                  onClick={() => router.push("/payment")}
                  className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold hover:scale-105 transition"
                >
                  Đi đến thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
