import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Image from "next/image";

const Form: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen overflow-x-hidden bg-gray-100 flex items-center justify-center px-4 py-16 relative mt-10">
        {/* Decorative Blobs */}
        <div className="absolute -top-32 -left-32 w-80 h-80 bg-pink-300 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 opacity-20 blur-3xl animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-indigo-300 opacity-20 blur-3xl animate-pulse"></div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative flex justify-center items-center">
            <Image
              src="https://images.unsplash.com/photo-1629913089438-3b59787edb2d?auto=format&fit=crop&w=800&q=80"
              alt="Electric Car"
              width={500}
              height={400}
              className="rounded-3xl shadow-2xl object-cover border border-gray-300"
            />
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-yellow-300 rounded-full opacity-60 blur-xl animate-pulse"></div>
            <div className="absolute bottom-5 right-5 w-8 h-8 bg-pink-300 rounded-full opacity-50 blur-xl animate-pulse"></div>
          </div>

          {/* Form */}
          <div className="relative w-full">
            <div className="min-h-[500px] w-full relative bg-white rounded-3xl shadow-2xl border border-gray-200 px-8 py-10 flex flex-col items-center z-10">
              <div className="absolute -top-10 right-5 w-24 h-24 bg-pink-200 opacity-30 blur-3xl animate-pulse rotate-6 z-0"></div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">
                Đăng ký / Nhận Ưu Đãi
              </h2>

              <form className="flex flex-col gap-6 w-full z-10">
                {/* Name */}
                <div className="relative group">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="name"
                  >
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm group-hover:shadow-md font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="relative group">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm group-hover:shadow-md font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Phone */}
                <div className="relative group">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="phone"
                  >
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="09xxxxxxxx"
                    className="w-full px-4 py-3 rounded-2xl bg-gray-100 border border-gray-300 focus:border-pink-400 focus:ring-2 focus:ring-pink-400 outline-none transition-all shadow-sm group-hover:shadow-md font-medium text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="mt-6 w-full bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white font-bold py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform text-lg"
                >
                  Gửi đăng ký
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Form;
