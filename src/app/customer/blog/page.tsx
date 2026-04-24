"use client";
import React from "react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const blogPosts = [
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  },
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  },
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  },
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  },
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  },
  {
    title: "Hệ thống quản lý đại lý xe điện VinFast",
    excerpt:
      "Khám phá cách VinFast áp dụng hệ thống quản lý đại lý giúp tối ưu bán hàng, quản lý khách hàng và dịch vụ hậu mãi.",
    image:
      "https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80",
    author: "Đội ngũ VinFast Tech",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "08/09/2025",
    link: "#"
  }
  // ...các post khác giữ nguyên
];

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Blog() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Spinner />;

  return (
    <>
      <main className="min-h-screen bg-gray-50 px-4 py-12 font-sans text-gray-900">
        <Header />

        {/* Hero Section */}
        <section className="mt-10 relative w-full overflow-hidden shadow-2xl mb-16 rounded-3xl">
          <div className="relative w-full h-72 md:h-80 lg:h-96">
            <Image
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWidrF1RYzs0yNkY5Gd43YfNtkRXMvAzBgPw&s"
              alt="VinFast EV Dealer"
              fill
              className="object-cover brightness-90 rounded-3xl"
              priority
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 bg-white/70 rounded-3xl">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 drop-shadow-lg max-w-4xl">
                VinFast Electric Vehicle Dealer Management System
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mt-4 max-w-3xl drop-shadow">
                Nâng cao hiệu quả bán hàng và trải nghiệm khách hàng thông qua
                hệ thống quản lý đại lý thông minh.
              </p>
            </div>
          </div>
        </section>

        {/* Grid Post */}
        <section className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition transform overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={400}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold py-1 px-4 rounded-full shadow">
                    VinFast
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-900 leading-tight line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Image
                      src={post.authorAvatar}
                      alt={post.author}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        {post.author}
                      </span>
                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>

                  {/* Button */}
                  <a
                    href={post.link}
                    className="mt-6 inline-block bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-full font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-center"
                  >
                    Đọc tiếp →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
