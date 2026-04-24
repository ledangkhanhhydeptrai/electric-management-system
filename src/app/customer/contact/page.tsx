"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function Contact() {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="bg-gray-50 font-sans text-gray-900">
      <Header />

      {/* Hero Section */}
      <section className="relative py-24 px-4 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1510915228340-a3594cd2f254?fit=crop&w=1200&q=80')"
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-80"></div>
        <div className="mt-10 max-w-3xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-blue-700 drop-shadow-lg">
            Hãy kết nối với chúng tôi!
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed drop-shadow-sm">
            Chúng tôi rất mong nhận được phản hồi, câu hỏi hoặc yêu cầu hợp tác
            từ bạn. Đội ngũ của chúng tôi luôn sẵn lòng hỗ trợ!
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="-mt-30 max-w-4xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-10 text-center">
          Gửi tin nhắn cho chúng tôi
        </h2>
        <form className="space-y-6 bg-white p-8 rounded-3xl shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Chủ đề
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Yêu cầu hỗ trợ / Hợp tác"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none text-gray-900 placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-800 mb-2"
            >
              Nội dung tin nhắn
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Nội dung chi tiết..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 outline-none resize-y text-gray-900 placeholder-gray-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold shadow-xl hover:scale-105 transform transition-all"
          >
            Gửi tin nhắn
          </button>
        </form>
      </section>

      {/* Contact Info & Map */}
      <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Thông tin liên hệ */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              Thông tin liên hệ
            </h2>
            <div className="space-y-4">
              <ContactInfoItem
                icon="📍"
                label="Địa chỉ"
                value="Số 123, Đường ABC, Phường XYZ, Quận 1, TP. Hồ Chí Minh"
                link="https://maps.app.goo.gl/YourGoogleMapsLink"
              />
              <ContactInfoItem
                icon="📞"
                label="Điện thoại"
                value="+84 987 654 321"
                link="tel:+84987654321"
              />
              <ContactInfoItem
                icon="📧"
                label="Email"
                value="contact@yourcompany.com"
                link="mailto:contact@yourcompany.com"
              />
              <ContactInfoItem
                icon="🌐"
                label="Website"
                value="www.yourcompany.com"
                link="https://www.yourcompany.com"
              />
            </div>
          </div>

          {/* Bản đồ */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
              Tìm chúng tôi trên bản đồ
            </h2>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.499645903932!2d106.66699317502766!3d10.773822189354024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f20d8641151%3A0x6b772097968532f!2sRever%20Office!5e0!3m2!1sen!2s!4v1687595301824!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Component cho từng mục thông tin liên hệ
function ContactInfoItem({
  icon,
  label,
  value,
  link
}: {
  icon: string;
  label: string;
  value: string;
  link?: string;
}) {
  return (
    <a
      href={link || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 p-4 rounded-2xl shadow-md hover:shadow-xl transition-shadow hover:bg-gray-100 group"
    >
      <div className="text-4xl flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-500 transition-colors">
          {label}
        </p>
        <p className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
          {value}
        </p>
      </div>
    </a>
  );
}
