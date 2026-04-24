"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import React from "react";

type Service = {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
};

const services: Service[] = [
  {
    id: 1,
    title: "Công nghệ Pin & Sạc",
    description:
      "Pin LFP bền bỉ, an toàn; mạng lưới trạm sạc phủ khắp cả nước.",
    icon: (
      <span className="size-12 grid place-content-center rounded-xl bg-blue-100 text-blue-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      </span>
    ),
    features: ["Pin LFP", "Sạc nhanh 18 phút", "Trạm sạc toàn quốc"]
  },
  {
    id: 2,
    title: "An toàn vượt trội",
    description:
      "Trang bị hệ thống ADAS, 6 túi khí, đạt chuẩn an toàn ASEAN NCAP.",
    icon: (
      <span className="size-12 grid place-content-center rounded-xl bg-emerald-100 text-emerald-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </span>
    ),
    features: ["ADAS", "6 túi khí", "Chuẩn ASEAN NCAP 5 sao"]
  },
  {
    id: 3,
    title: "Trải nghiệm thông minh",
    description: "Màn hình lớn, trợ lý ảo tiếng Việt, cập nhật OTA tiện lợi.",
    icon: (
      <span className="size-12 grid place-content-center rounded-xl bg-violet-100 text-violet-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h6v6H9z" />
        </svg>
      </span>
    ),
    features: ["Màn hình 15.6”", "Trợ lý ảo tiếng Việt", "OTA"]
  },
  {
    id: 4,
    title: "Dịch vụ hậu mãi",
    description: "Bảo hành 10 năm, cứu hộ 24/7, dịch vụ tận nhà tiện lợi.",
    icon: (
      <span className="size-12 grid place-content-center rounded-xl bg-pink-100 text-pink-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v8m-4-4h8"
          />
        </svg>
      </span>
    ),
    features: ["Bảo hành 10 năm", "Cứu hộ 24/7", "Dịch vụ tận nhà"]
  }
];

export default function Service() {
  const router = useRouter();
  return (
    <>
      <Header />
      <div className="mt-10 bg-white text-gray-800">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-50 to-white" />
          <div className="mx-auto max-w-7xl px-4 py-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Trải nghiệm Xe điện VinFast
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Đăng ký lái thử, nhận báo giá và khám phá ưu đãi mua xe điện
              VinFast nhanh chóng, tiện lợi.
            </p>
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() => router.push("/customer/form")}
                type="button"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:brightness-110 transition"
              >
                Đăng ký lái thử
              </button>
              <button
                onClick={() => router.push("/customer/carlist")}
                type="button"
                className="rounded-full border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 shadow hover:bg-indigo-50 transition"
              >
                Xem danh mục xe
              </button>
            </div>
          </div>
        </section>

        {/* Ưu điểm VinFast */}
        <section className="px-4 py-16">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Ưu điểm nổi bật
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Những công nghệ và dịch vụ giúp VinFast trở thành lựa chọn hàng đầu.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                {service.icon}
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {service.description}
                </p>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600 space-y-1">
                  {service.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Form báo giá */}
        <section className="px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Nhận báo giá & tư vấn mua xe
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Điền thông tin, chuyên viên VinFast sẽ liên hệ với bạn trong 24h.
          </p>
          <form className="mt-8 grid gap-4 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Họ và tên"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
            <input
              type="tel"
              placeholder="Số điện thoại"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:col-span-2"
            />
            <select
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:col-span-2"
            >
              <option value="">Chọn mẫu xe VinFast</option>
              <option value="VF3">VF 3</option>
              <option value="VF5">VF 5</option>
              <option value="VF6">VF 6</option>
              <option value="VF7">VF 7</option>
              <option value="VF8">VF 8</option>
              <option value="VF9">VF 9</option>
            </select>
            <textarea
              rows={4}
              placeholder="Nhu cầu của bạn (mua xe, trả góp, lái thử...)"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:col-span-2"
            />
            <button
              type="submit"
              className="col-span-2 rounded-lg bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3 font-semibold text-white shadow-lg hover:brightness-110 transition"
            >
              Gửi yêu cầu báo giá
            </button>
          </form>
        </section>

        {/* FAQ */}
        <section className="px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Câu hỏi thường gặp
          </h2>
          <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white">
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Thời gian giao xe VinFast là bao lâu?
                </h3>
                <span className="text-gray-500" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">
                Trung bình 2–6 tuần tùy mẫu xe và phiên bản.
              </p>
            </details>
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Có hỗ trợ trả góp không?
                </h3>
                <span className="text-gray-500" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">
                Có, VinFast liên kết với nhiều ngân hàng để hỗ trợ vay mua xe
                trả góp.
              </p>
            </details>
            <details className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">
                  Chính sách bảo hành xe điện như thế nào?
                </h3>
                <span className="text-gray-500" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm text-gray-600">
                Xe VinFast được bảo hành 10 năm hoặc 200.000 km tùy điều kiện
                nào đến trước.
              </p>
            </details>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
