"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

// Spinner loading
function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default function About() {
  const [loading, setLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <Header />
      <main className="-mt-20 w-full py-16 relative bg-gray-50 text-gray-900">
        <section className="relative py-32 px-4 overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-10 z-10">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-4xl font-bold text-indigo-500 mb-6">
                Khám phá Vũ trụ Xe Điện
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-700">
                Trải nghiệm hệ sinh thái EV hiện đại, từ xe điện, sự kiện, đến
                cộng đồng năng động.
              </p>
              <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                <a
                  href="#features"
                  className="bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold shadow hover:bg-indigo-700 transition"
                >
                  Tìm hiểu ngay
                </a>
                <a
                  onClick={() => router.push("/customer/contact")}
                  className="bg-gradient-to-r from-yellow-400 to-pink-400 text-gray-900 px-8 py-3 rounded-full font-semibold shadow hover:from-yellow-300 hover:to-pink-300 transition cursor-pointer"
                >
                  Liên hệ
                </a>
              </div>
            </div>
            <div className="relative w-full md:w-1/2">
              <Image
                src="https://images.unsplash.com/photo-1606813900154-1b22603b7e6a?fit=crop&w=600&q=80"
                alt="Electric Vehicle"
                width={500}
                height={400}
                className="rounded-3xl shadow-lg border-4 border-gray-200 animate-float object-cover w-full"
              />
            </div>
          </div>
        </section>
        <section id="features" className="-mt-40 py-24 px-4">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Điểm nổi bật
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Đa dạng mẫu xe",
                desc: "Các dòng EV hiện đại, đầy đủ tính năng.",
                icon: "🚗"
              },
              {
                title: "Trải nghiệm showroom",
                desc: "Xem và lái thử trực tiếp tại cửa hàng.",
                icon: "🏬"
              },
              {
                title: "Chính sách ưu đãi",
                desc: "Giảm giá, quà tặng hấp dẫn cho khách hàng mới.",
                icon: "🎁"
              },
              {
                title: "Cộng đồng EV",
                desc: "Kết nối người yêu xe điện & sự kiện hấp dẫn.",
                icon: "🤝"
              }
            ].map(({ title, desc, icon }, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl flex flex-col items-center shadow-md hover:shadow-lg hover:scale-105 transition-all text-center"
              >
                <div className="text-5xl mb-4 animate-bounce">{icon}</div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="py-24 bg-gray-100">
          <div className="px-4 text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Hành trình phát triển
            </h2>
            <div className="relative flex flex-col md:flex-row gap-8 items-center">
              {[
                {
                  year: "2020",
                  title: "Khởi đầu",
                  desc: "Bắt đầu với đam mê EV."
                },
                {
                  year: "2022",
                  title: "Phát triển",
                  desc: "Ra mắt showroom đầu tiên."
                },
                {
                  year: "2023",
                  title: "Thành công",
                  desc: "Hợp tác với thương hiệu lớn."
                },
                {
                  year: "2025",
                  title: "Tương lai",
                  desc: "Mở rộng thị trường quốc tế."
                }
              ].map((item, idx) => (
                <MilestoneCard key={idx} {...item} />
              ))}
            </div>
          </div>
        </section>
        <section className="py-24 px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Đội ngũ của chúng tôi
          </h2>
          <p className="text-gray-600 mb-12">
            Những con người tạo nên sự khác biệt
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                title: "CEO & Founder",
                image:
                  "https://images.unsplash.com/photo-1573496359142-b8d87734b4a2?fit=crop&w=300&h=300&q=80"
              },
              {
                name: "Trần Thị B",
                title: "Trưởng phòng Sản phẩm",
                image:
                  "https://images.unsplash.com/photo-1580489944761-15a19d654956?fit=crop&w=300&h=300&q=80"
              },
              {
                name: "Lê Văn C",
                title: "Giám đốc Kỹ thuật",
                image:
                  "https://images.unsplash.com/photo-1544723795-3fb6469e377f?fit=crop&w=300&h=300&q=80"
              },
              {
                name: "Phạm Thị D",
                title: "Trưởng phòng Marketing",
                image:
                  "https://images.unsplash.com/photo-1628157508006-2580769b8214?fit=crop&w=300&h=300&q=80"
              }
            ].map((member, idx) => (
              <TeamMemberCard key={idx} {...member} />
            ))}
          </div>
        </section>
        <section className="bg-white text-gray-900 py-24 px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">
            Bạn muốn trở thành một phần của chúng tôi?
          </h3>
          <p className="text-lg mb-8 text-gray-700">
            Chúng tôi luôn tìm kiếm những tài năng đam mê và nhiệt huyết.
          </p>
          <a
            onClick={() => router.push("/contact")}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold shadow hover:bg-indigo-700 transition cursor-pointer"
          >
            Liên hệ ngay
          </a>
        </section>
        <style jsx>{`
          .animate-float {
            animation: floatMove 4s ease-in-out infinite alternate;
          }
          @keyframes floatMove {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-15px);
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}

// Milestone component
function MilestoneCard({
  year,
  title,
  desc
}: {
  year: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex-1 bg-white p-6 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-2 transition text-center">
      <div className="text-indigo-500 font-bold text-xl mb-2">{year}</div>
      <h4 className="font-semibold text-gray-900 text-2xl mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  );
}

// Team Member component
function TeamMemberCard({
  name,
  title,
  image
}: {
  name: string;
  title: string;
  image: string;
}) {
  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-3xl shadow-md hover:shadow-lg hover:-translate-y-1 transition">
      <Image
        src={image}
        alt={name}
        width={128}
        height={128}
        className="rounded-full mb-4 object-cover border-4 border-gray-200"
      />
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-indigo-500 text-sm mb-3">{title}</p>
      <div className="flex gap-3">
        <a
          href="#"
          className="text-indigo-500 hover:text-indigo-600 transition"
        >
          LinkedIn
        </a>
        <a
          href="#"
          className="text-indigo-400 hover:text-indigo-500 transition"
        >
          Twitter
        </a>
      </div>
    </div>
  );
}
