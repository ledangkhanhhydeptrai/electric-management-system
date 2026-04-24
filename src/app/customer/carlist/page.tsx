"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Vehicle = {
  id: string;
  name: string;
  type: string;
  imageUrl: string;
  description: string;
  status: "Available Now" | "Coming Soon" | "New";
};

const vehicles: Vehicle[] = [
  {
    id: "vf3",
    name: "VinFast VF 3",
    type: "Mini Car",
    imageUrl:
      "data:image/jpeg;base64,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",
    description:
      "VinFast VF 3 là mẫu mini SUV điện cỡ nhỏ, thiết kế hiện đại, phù hợp cho đô thị với khả năng di chuyển linh hoạt.",
    status: "New"
  },
  {
    id: "vf5",
    name: "VinFast VF 5 Plus",
    type: "Compact SUV",
    imageUrl:
      "data:image/jpeg;base64,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", // hiện chưa có VF5 từ Commons
    description:
      "VinFast VF 5 Plus là SUV điện phân khúc B, thiết kế trẻ trung, công nghệ thông minh và phạm vi di chuyển tối ưu.",
    status: "Available Now"
  },
  {
    id: "vf8",
    name: "VinFast VF 8",
    type: "Mid-size SUV",
    imageUrl:
      "https://www.vinfastviettri.com.vn/images/products/lar2023224144214.png", // dùng ảnh VF6 thay tạm
    description:
      "VinFast VF 8 là SUV điện tầm trung, không gian rộng rãi, hiệu năng mạnh mẽ và nhiều tính năng hỗ trợ lái.",
    status: "Available Now"
  },
  {
    id: "vf9",
    name: "VinFast VF 9",
    type: "Full-size SUV",
    imageUrl:
      "https://vinfastvungtau.com.vn/hoanghung/UploadFile/images/vf/vinfast-vf9-3479-318.jpg", // fallback
    description:
      "VinFast VF 9 là SUV điện cỡ lớn, 7 chỗ ngồi, thiết kế sang trọng, pin dung lượng lớn và khả năng đi xa vượt trội.",
    status: "Coming Soon"
  }
];

const statusStyle = {
  "Available Now": "bg-green-100 text-green-700",
  "Coming Soon": "bg-yellow-100 text-yellow-700",
  New: "bg-blue-100 text-blue-700"
};

const statusIcon = {
  "Available Now": "✅",
  "Coming Soon": "⏳",
  New: "🆕"
};

const VinFastGrid: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = React.useState<"All" | Vehicle["status"]>("All");
  const [search, setSearch] = React.useState("");

  const filteredVehicles = vehicles
    .filter((v) => filter === "All" || v.status === filter)
    .filter((v) => v.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <>
      <Header />
      <div className="w-full bg-gray-100 py-12 px-4 mt-5">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="p-8 mb-10 text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Danh sách xe VinFast
            </h1>
            <p className="mt-2 text-gray-700">
              Khám phá các dòng xe nổi bật cùng công nghệ tiên phong của VinFast
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6 items-center -mt-10">
            {/* Select */}
            <div className="relative w-48">
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "All" | Vehicle["status"])
                }
                className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-semibold appearance-none shadow-lg hover:from-orange-500 hover:to-yellow-500 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all"
              >
                <option className="text-black" value="All">
                  All
                </option>
                <option className="text-black" value="New">
                  New
                </option>
                <option className="text-black" value="Available Now">
                  Available Now
                </option>
                <option className="text-black" value="Coming Soon">
                  Coming Soon
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                <svg
                  className="w-5 h-5 text-white"
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

            {/* Search input */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Tìm theo tên xe..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl bg-white text-gray-900 font-medium shadow-md placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all"
              />
            </div>
          </div>

          {/* Grid danh sách xe */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredVehicles.map((v, idx) => (
              <div
                key={v.id}
                className="relative group bg-white rounded-xl shadow-xl overflow-hidden flex flex-col transition border border-blue-50 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2 duration-300 animate-fadeInUp"
                style={{ animationDelay: `${idx * 80}ms` }}
              >
                {/* Ribbon trạng thái */}
                {v.status === "New" && (
                  <div className="absolute left-0 top-0 z-10 px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-br-xl shadow ribbon">
                    🆕 NEW
                  </div>
                )}
                {v.status === "Coming Soon" && (
                  <div className="absolute right-0 top-0 z-10 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-bl-xl shadow ribbon">
                    ⏳ Coming Soon
                  </div>
                )}

                {/* Ảnh xe */}
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={v.imageUrl}
                    alt={v.name}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 group-hover:brightness-95"
                    loading="lazy"
                  />
                </div>

                {/* Dải màu dưới tên xe */}
                <div className="h-1 bg-gradient-to-r from-blue-400 via-green-400 to-emerald-400 mb-2"></div>

                {/* Thông tin xe */}
                <div className="flex-1 flex flex-col p-5">
                  <h2 className="text-lg font-semibold mb-1 text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">{statusIcon[v.status]}</span>
                    {v.name}
                  </h2>
                  <span
                    className={`inline-block text-xs px-2 py-0.5 rounded mb-2 font-medium transition-all ${
                      statusStyle[v.status]
                    }`}
                  >
                    {v.status}
                  </span>
                  <span className="text-sm text-gray-500 mb-2">{v.type}</span>
                  <p className="text-gray-700 text-sm line-clamp-4 flex-1">
                    {v.description}
                  </p>

                  <button
                    onClick={() => router.push("/customer/carlist/id")}
                    className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 via-sky-500 to-emerald-500 text-white text-sm rounded-lg shadow-md hover:shadow-xl hover:from-blue-600 hover:to-emerald-600 transition font-semibold tracking-wide"
                  >
                    🚗 Tìm hiểu thêm
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VinFastGrid;
