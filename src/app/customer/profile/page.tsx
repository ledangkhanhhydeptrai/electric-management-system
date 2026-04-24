"use client";
import Image from "next/image";
import React from "react";
import { MdEmail, MdLocationOn, MdCalendarToday } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// ===== User type =====
interface User {
  id: string;
  name: string;
  email: string;
  role: "Customer";
  avatar: string;
  location?: string;
  memberSince?: string;
  orders?: { id: string; car: string; status: "Pending" | "Completed" }[];
  testDrives?: { id: string; car: string; date: string }[];
  wishlist?: string[];
  activity?: string[];
}

// ===== Sample Customer =====
const sampleCustomer: User = {
  id: "u_789",
  name: "Le Thi C",
  email: "lethic@example.com",
  role: "Customer",
  avatar: "https://i.pravatar.cc/150?img=30",
  location: "Ho Chi Minh City",
  memberSince: "2023-01-15",
  orders: [
    { id: "o_001", car: "VinFast VF8", status: "Pending" },
    { id: "o_002", car: "VinFast VF9", status: "Completed" }
  ],
  testDrives: [
    { id: "t_001", car: "VinFast VF8", date: "2025-08-10" },
    { id: "t_002", car: "VinFast VF9", date: "2025-08-12" }
  ],
  wishlist: ["VinFast VF e34", "VinFast VF8"],
  activity: [
    "🛒 Placed an order for VinFast VF8",
    "🚗 Booked a test drive for VF9",
    "💬 Left a review for VF e34"
  ]
};

// ===== Component =====
export default function CustomerProfile() {
  const user = sampleCustomer;

  return (
    <>
      <Header />
      <main className="mt-20 p-4 bg-white text-gray-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200 flex flex-col items-center text-center">
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="w-32 h-32 rounded-full border-4 border-gray-200 shadow-lg object-cover"
              />
              <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <MdEmail /> {user.email}
              </p>
              {user.location && (
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <MdLocationOn /> {user.location}
                </p>
              )}
              {user.memberSince && (
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <MdCalendarToday /> Member since {user.memberSince}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 space-y-4">
              <h2 className="text-lg font-bold mb-2">Summary</h2>
              <div className="flex justify-between text-gray-600">
                <span>Orders</span>
                <span>{user.orders?.length || 0}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Test Drives</span>
                <span>{user.testDrives?.length || 0}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Wishlist</span>
                <span>{user.wishlist?.length || 0}</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Orders */}
            {user.orders && user.orders.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
                <ul className="space-y-2 text-gray-600">
                  {user.orders.map((o) => (
                    <li key={o.id} className="flex justify-between">
                      <span>{o.car}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          o.status === "Completed"
                            ? "bg-green-500 text-white"
                            : "bg-yellow-400 text-gray-900"
                        }`}
                      >
                        {o.status}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Drives */}
            {user.testDrives && user.testDrives.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Test Drives</h2>
                <ul className="space-y-2 text-gray-600">
                  {user.testDrives.map((t) => (
                    <li key={t.id} className="flex justify-between">
                      <span>{t.car}</span>
                      <span>{t.date}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Wishlist */}
            {user.wishlist && user.wishlist.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Wishlist</h2>
                <ul className="flex flex-wrap gap-3 text-gray-700">
                  {user.wishlist.map((w, i) => (
                    <li
                      key={i}
                      className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2"
                    >
                      <FaStar className="text-yellow-500" /> {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Activity */}
            {user.activity && user.activity.length > 0 && (
              <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                <ul className="space-y-2 text-gray-600">
                  {user.activity.map((act, i) => (
                    <li key={i}>{act}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
