"use client";
import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

// ===== Dummy Data =====
const UPCOMING = [
  {
    id: 1,
    title: "Khai trương Showroom VinFast",
    date: "2025-09-25",
    time: "09:00",
    place: "Hà Nội",
    img: "https://nqs.1cdn.vn/2024/08/04/dautu.kinhtechungkhoan.vn-stores-news_dataimages-2024-082024-04-18-_4bc9a6b9-ee3e-4440-8f1d-8eb4e3fde46820240804182709.jpg",
    tag: "Mới"
  },
  {
    id: 2,
    title: "Lễ ra mắt VinFast VF 9 2025",
    date: "2025-10-10",
    time: "10:00",
    place: "TP.HCM",
    img: "https://files01.danhgiaxe.com/KCPau_7xCiuvNH4vrCGoJvBHur4=/fit-in/1200x0/20221117/vf9-142321.jpg",
    tag: "Hot"
  },
  {
    id: 3,
    title: "Triển lãm VinFast Toàn quốc",
    date: "2025-12-15",
    time: "08:30",
    place: "Đà Nẵng",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj5JdW1ZLDXkJq-A4NCscgV6NmSkJBJFh3g&s",
    tag: "Hot"
  }
];

const POPULAR = [
  {
    id: "p1",
    title: "VF 8 City Edition",
    meta: "Mẫu bán chạy · 4.9★",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRghW4nA-htwXLhbQkyTS8ApjXB2tST8RoS8Q&s"
  },
  {
    id: "p2",
    title: "VF 9 Touring",
    meta: "SUV cao cấp · 4.8★",
    img: "https://vinfast-binhduong.vn/wp-content/uploads/2020/06/vinfast-vf9-moi-18.jpg"
  },
  {
    id: "p3",
    title: "Hệ thống trạm sạc VinFast",
    meta: "Phủ sóng toàn quốc · 4.7★",
    img: "https://danang-vinfast.vn/wp-content/uploads/2022/08/Hinh-anh-tram-sac-VinFast.jpg"
  }
];

const BLOGS = [
  {
    id: "b1",
    title: "VinFast mở rộng trạm sạc",
    excerpt:
      "Hơn 150.000 cổng sạc phủ khắp các tỉnh thành, hỗ trợ mọi dòng xe điện VinFast.",
    img: "https://img.cand.com.vn/resize/800x800/NewFiles/Images/2023/09/14/A1-1694665314579.jpg"
  },
  {
    id: "b2",
    title: "Trải nghiệm lái thử VF 8 & VF 9",
    excerpt:
      "Khách hàng được lái thử trực tiếp hai mẫu SUV điện chủ lực của VinFast.",
    img: "https://vfxanh.vn/wp-content/uploads/2024/08/20.1.png"
  },
  {
    id: "b3",
    title: "Ưu đãi thuế & bảo dưỡng VinFast",
    excerpt:
      "Nhiều chính sách hỗ trợ khách hàng khi mua và vận hành xe điện VinFast.",
    img: "https://vinfastvf.com/upload/filemanager/files/tintuc/Gia-xe-VinFast-VF-e34-thang-1-2025-SUV-dien-co-C-tu-710-trieu-dong-23-1737280339-26-width740height493.jpg"
  }
];

// ===== Utility =====
function formatDate(date: string) {
  const d = new Date(date);
  return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${d.getFullYear()}`;
}

// ===== Components =====
function UpcomingCard({ e }: { e: (typeof UPCOMING)[0] }) {
  const router = useRouter();
  return (
    <motion.div
      className="relative flex flex-col rounded-3xl overflow-hidden
                 bg-gradient-to-br from-white via-gray-100 to-gray-50
                 shadow-lg transition-transform duration-300 hover:-translate-y-2"
      whileHover={{ scale: 1.03 }}
    >
      {e.tag && (
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-200 to-cyan-200 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold shadow animate-pulse z-10">
          {e.tag}
        </div>
      )}
      <div className="relative h-44 w-full">
        <Image
          src={e.img}
          alt={e.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-5">
        <div className="text-sm text-cyan-600 font-semibold">
          {formatDate(e.date)}
        </div>
        <h3 className="font-bold text-lg mt-1 mb-2 text-gray-900">{e.title}</h3>
        <div className="text-gray-700 text-sm mb-4">
          {e.place} • {e.time}
        </div>
        <button
          type="button"
          onClick={() => router.push("/customer/form")}
          className="w-full md:w-auto bg-gradient-to-r from-cyan-400 via-emerald-400 to-green-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition"
        >
          Đặt lịch lái thử
        </button>
      </div>
    </motion.div>
  );
}

function PopularCard({ p }: { p: (typeof POPULAR)[0] }) {
  const router = useRouter();
  return (
    <motion.div className="relative flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-50 shadow-lg hover:-translate-y-2 transition">
      <div className="relative h-40 w-full">
        <Image src={p.img} alt={p.title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <div className="text-sm text-green-600 font-semibold mb-1">
          🌿 {p.meta}
        </div>
        <h4 className="font-semibold text-lg text-gray-900">{p.title}</h4>
        <div className="mt-3">
          <button
            onClick={() => router.push(`/`)}
            className="mt-3 px-4 py-2 bg-cyan-100 text-gray-900 font-semibold rounded-lg shadow hover:bg-cyan-200 transition"
          >
            Xem chi tiết
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function BlogCard({ b }: { b: (typeof BLOGS)[0] }) {
  return (
    <motion.div className="flex flex-col rounded-3xl overflow-hidden bg-gradient-to-br from-white via-gray-100 to-gray-50 shadow-lg hover:-translate-y-2 transition">
      <div className="relative h-40 w-full overflow-hidden rounded-t-3xl">
        <Image src={b.img} alt={b.title} fill className="object-cover" />
      </div>
      <div className="p-5">
        <h4 className="font-semibold text-lg mb-2 text-gray-900">{b.title}</h4>
        <p className="text-gray-700 text-sm">{b.excerpt}</p>
        <div className="mt-4">
          <a className="text-cyan-600 font-semibold hover:underline cursor-pointer">
            Đọc tiếp →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCard({
  icon,
  title,
  desc
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <motion.div className="flex flex-col items-center rounded-3xl p-8 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:-translate-y-2 transition">
      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-green-400 text-white text-3xl rounded-full shadow-md mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-center text-gray-900">
        {title}
      </h3>
      <p className="text-center text-gray-700">{desc}</p>
    </motion.div>
  );
}

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ===== Main Home =====
export default function Home() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);
  const router = useRouter();
  if (loading) return <Spinner />;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      {/* HERO */}
      <section className="relative h-[520px] w-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4500 }}
          loop
          className="h-full"
        >
          {UPCOMING.map((s) => (
            <SwiperSlide key={s.id}>
              <div className="relative h-full w-full">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-white/40" />
                <motion.div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
                  <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-cyan-800">
                    {s.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 text-green-700">
                    {s.place}
                  </p>
                  <button
                    className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 px-6 py-3 rounded-full font-semibold shadow-lg text-white hover:brightness-110"
                    onClick={() => router.push("/customer/carlist")}
                  >
                    Khám phá VinFast
                  </button>
                </motion.div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Upcoming */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8">
            Sự kiện VinFast sắp diễn ra
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {UPCOMING.map((e) => (
              <UpcomingCard key={e.id} e={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8">
            Sản phẩm & dịch vụ nổi bật
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {POPULAR.map((p) => (
              <PopularCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-8">Tin tức & blog</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {BLOGS.map((b) => (
              <BlogCard key={b.id} b={b} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold mb-12 text-center">
            Tại sao chọn VinFast
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Sạc nhanh"
              desc="Hệ thống trạm sạc phủ toàn quốc"
            />
            <FeatureCard
              icon="🛡️"
              title="An toàn tuyệt đối"
              desc="Đạt chuẩn an toàn cao nhất"
            />
            <FeatureCard
              icon="🌱"
              title="Thân thiện môi trường"
              desc="Không khí trong lành, ít carbon"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
