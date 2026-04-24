// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import HeaderInternal from "@/components/HeaderInternal";
// import FooterInternal from "@/components/FooterInternal";
// import Image from "next/image";

// /** Types */
// type Car = {
//   id: string;
//   name: string;
//   version: string;
//   startingPrice: number;
//   colors: string[];
//   rangeKm?: number;
//   power?: string;
//   image?: string;
//   description?: string;
//   inStock: number;
// };

// type Dealer = {
//   id: string;
//   name: string;
//   address: string;
//   phone: string;
//   city: string;
//   type: string;
//   image?: string;
// };

// /** Sample data */
// const SAMPLE_CARS: Car[] = [
//   {
//     id: "vf-8",
//     name: "VF 8",
//     version: "Eco",
//     startingPrice: 699000000,
//     colors: ["#ffffff", "#000000", "#1e3a8a"],
//     rangeKm: 420,
//     power: "150 kW",
//     image:
//       "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwbee92711/reserves/VF8/vf8-lux.webp",
//     description:
//       "SUV điện đô thị, thiết kế hiện đại, tiện nghi cho gia đình. Pin đạt chuẩn, hệ thống an toàn chủ động.",
//     inStock: 12
//   },
//   {
//     id: "vf-9",
//     name: "VF 9",
//     version: "Premium",
//     startingPrice: 1199000000,
//     colors: ["#C0C0C0", "#7A3B2E", "#2E7D32"],
//     rangeKm: 540,
//     power: "210 kW",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlqEhyWNMtf8JVKXZ25Qhhu7YQT7T4H5-xA&s",
//     description:
//       "SUV full-size, hàng ghế thứ 3 rộng rãi. Thiết kế sang trọng, trang bị công nghệ đỉnh cao.",
//     inStock: 5
//   },
//   {
//     id: "vf-5",
//     name: "VF 3",
//     version: "City",
//     startingPrice: 329000000,
//     colors: ["#ffffff", "#9AD1E5"],
//     power: "1.4L Turbo",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12shxHxn3ZnPki6FWK_3QvIMNY-8Rx38F3w&s",
//     description: "Hatchback nhỏ gọn, tiết kiệm nhiên liệu, phù hợp đô thị.",
//     inStock: 20
//   },
//   {
//     id: "vf-6",
//     name: "VF 8",
//     version: "Plus",
//     startingPrice: 899000000,
//     colors: ["#DC2626", "#1e3a8a", "#ffffff"],
//     rangeKm: 480,
//     power: "180 kW",
//     image:
//       "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwbee92711/reserves/VF8/vf8-lux.webp",
//     description: "Phiên bản nâng cấp với nhiều tính năng cao cấp hơn.",
//     inStock: 8
//   },
//   {
//     id: "vf-7",
//     name: "VF 9",
//     version: "Luxury",
//     startingPrice: 1499000000,
//     colors: ["#1F2937", "#C0C0C0", "#7A3B2E"],
//     rangeKm: 600,
//     power: "250 kW",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlqEhyWNMtf8JVKXZ25Qhhu7YQT7T4H5-xA&s",
//     description: "Phiên bản cao cấp nhất với nội thất siêu sang.",
//     inStock: 3
//   },
//   {
//     id: "vf-10",
//     name: "VF 3",
//     version: "Sport",
//     startingPrice: 399000000,
//     colors: ["#EF4444", "#000000", "#FBBF24"],
//     power: "1.4L Turbo",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS12shxHxn3ZnPki6FWK_3QvIMNY-8Rx38F3w&s",
//     description: "Phiên bản thể thao với thiết kế năng động.",
//     inStock: 15
//   }
// ];

// const SAMPLE_DEALERS: Dealer[] = [
//   {
//     id: "d-001",
//     name: "VinFast Hà Nội Premium",
//     address: "Số 1 Tràng Thi, Hoàn Kiếm, Hà Nội",
//     phone: "024-1234-5678",
//     city: "Hà Nội",
//     type: "3S",
//     image:
//       "https://vinfast-vn.vn/wp-content/uploads/2023/10/vinfast-vf8-1-1.png"
//   },
//   {
//     id: "d-002",
//     name: "VinFast TP.HCM Central",
//     address: "123 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM",
//     phone: "028-9876-5432",
//     city: "TP.HCM",
//     type: "Showroom",
//     image:
//       "https://vinfastnewway.com.vn/wp-content/uploads/2022/08/vinfast-vf-8-mau-xanh-duong.jpg"
//   },
//   {
//     id: "d-003",
//     name: "VinFast Đà Nẵng",
//     address: "456 Lê Duẩn, Hải Châu, Đà Nẵng",
//     phone: "0236-123-4567",
//     city: "Đà Nẵng",
//     type: "3S",
//     image:
//       "https://vinfast-vn.vn/wp-content/uploads/2023/10/vinfast-vf8-1-1.png"
//   },
//   {
//     id: "d-004",
//     name: "VinFast Cần Thơ",
//     address: "789 Trần Hưng Đạo, Ninh Kiều, Cần Thơ",
//     phone: "0292-123-4567",
//     city: "Cần Thơ",
//     type: "Showroom",
//     image:
//       "https://vinfastnewway.com.vn/wp-content/uploads/2022/08/vinfast-vf-8-mau-xanh-duong.jpg"
//   }
// ];

// const HERO_IMAGES = [
//   {
//     id: 1,
//     image:
//       "https://vinfast-tiengiang.vn/wp-content/uploads/2025/03/vinfast-vf3-240510-c9.jpg",
//     title: "VinFast VF3",
//     subtitle: "Xe đô thị thông minh",
//     place: "Tiên Giang"
//   },
//   {
//     id: 2,
//     image:
//       "https://shop.vinfastauto.com/on/demandware.static/-/Sites-app_vinfast_vn-Library/default/dwbee92711/reserves/VF8/vf8-lux.webp",
//     title: "VinFast VF8",
//     subtitle: "SUV điện hiện đại",
//     place: "Hà Nội"
//   },
//   {
//     id: 3,
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTlqEhyWNMtf8JVKXZ25Qhhu7YQT7T4H5-xA&s",
//     title: "VinFast VF9",
//     subtitle: "Sang trọng đẳng cấp",
//     place: "Hồ Chí Minh"
//   }
// ];

// export default function VinfastShowcasePage() {
//   const [query, setQuery] = useState("");
//   const [filterInStockOnly, setFilterInStockOnly] = useState(false);
//   const [minPrice, setMinPrice] = useState<number | undefined>(undefined);
//   const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
//   const [selectedCar, setSelectedCar] = useState<Car | null>(null);
//   const [dealerFilter, setDealerFilter] = useState("");
//   const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const filteredCars = SAMPLE_CARS.filter((c) => {
//     if (filterInStockOnly && c.inStock <= 0) return false;
//     if (
//       query &&
//       !`${c.name} ${c.version}`.toLowerCase().includes(query.toLowerCase())
//     )
//       return false;
//     if (minPrice !== undefined && c.startingPrice < minPrice) return false;
//     if (maxPrice !== undefined && c.startingPrice > maxPrice) return false;
//     return true;
//   });

//   const filteredDealers = SAMPLE_DEALERS.filter((d) =>
//     d.city.toLowerCase().includes(dealerFilter.toLowerCase())
//   );

//   const formatVnd = (n: number) =>
//     n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <div className="bg-gradient-to-br from-slate-50 via-white to-emerald-50">
//       {/* HEADER */}
//       <HeaderInternal />

//       <main className="">
//         {/* HERO SECTION */}
//         <section className="relative h-[650px] overflow-hidden shadow-2xl mb-20 ring-1 ring-black/5">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentSlide}
//               initial={{ opacity: 0, scale: 1.1 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.7 }}
//               className="absolute inset-0"
//             >
//               <Image
//                 src={HERO_IMAGES[currentSlide].image}
//                 alt={HERO_IMAGES[currentSlide].title}
//                 className="w-full h-full object-cover"
//                 fill
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
//               <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-emerald-600/20" />

//               <motion.div
//                 className="absolute bottom-0 left-0 right-0 p-12"
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3, duration: 0.6 }}
//               >
//                 <div className="max-w-2xl">
//                   <motion.div
//                     className="inline-block px-4 py-2 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full text-green-300 text-sm font-medium mb-4"
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: 0.4 }}
//                   >
//                     🌿 Xe điện thông minh
//                   </motion.div>

//                   <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
//                     {HERO_IMAGES[currentSlide].title}
//                   </h2>
//                   <p className="text-xl text-gray-200 mb-2">
//                     {HERO_IMAGES[currentSlide].subtitle}
//                   </p>
//                   <p className="text-green-400 font-medium mb-8">
//                     📍 {HERO_IMAGES[currentSlide].place}
//                   </p>

//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => {
//                         const el = document.querySelector(
//                           "[data-models-section]"
//                         );
//                         el?.scrollIntoView({ behavior: "smooth" });
//                       }}
//                       className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
//                     >
//                       Khám phá ngay
//                     </button>
//                     <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300">
//                       Tư vấn miễn phí
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Slide indicators */}
//           <div className="absolute bottom-8 right-8 flex gap-2.5 bg-black/30 backdrop-blur-md px-4 py-3 rounded-full">
//             {HERO_IMAGES.map((_, idx) => (
//               <button
//                 key={idx}
//                 onClick={() => setCurrentSlide(idx)}
//                 className={`h-2 rounded-full transition-all duration-300 ${
//                   idx === currentSlide
//                     ? "w-10 bg-white shadow-lg shadow-white/50"
//                     : "w-2 bg-white/40 hover:bg-white/70 hover:w-4"
//                 }`}
//               />
//             ))}
//           </div>
//         </section>

//         {/* FILTERS */}
//         <section data-models-section className="mb-8">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-800">
//                 Dòng xe điện
//               </h2>
//               <p className="text-slate-500 mt-1">
//                 Khám phá {filteredCars.length} mẫu xe phù hợp
//               </p>
//             </div>
//           </div>

//           <motion.div
//             className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//           >
//             <div className="flex flex-col lg:flex-row gap-4">
//               {/* Search */}
//               <div className="flex-1 relative group">
//                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-green-500 transition-colors">
//                   🔍
//                 </div>
//                 <input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Tìm kiếm xe của bạn..."
//                   className="w-full pl-14 pr-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-500/20 focus:border-green-500 focus:bg-white outline-none transition-all text-slate-700 placeholder:text-slate-400 font-medium shadow-sm"
//                 />
//               </div>

//               {/* Price filters */}
//               <div className="flex gap-3">
//                 <input
//                   type="number"
//                   placeholder="Giá tối thiểu"
//                   className="w-40 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
//                   onChange={(e) =>
//                     setMinPrice(
//                       e.target.value ? Number(e.target.value) : undefined
//                     )
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Giá tối đa"
//                   className="w-40 px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
//                   onChange={(e) =>
//                     setMaxPrice(
//                       e.target.value ? Number(e.target.value) : undefined
//                     )
//                   }
//                 />
//               </div>

//               {/* Stock filter */}
//               <label className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
//                 <input
//                   type="checkbox"
//                   checked={filterInStockOnly}
//                   onChange={(e) => setFilterInStockOnly(e.target.checked)}
//                   className="w-5 h-5 rounded accent-green-600"
//                 />
//                 <span className="text-sm font-medium text-slate-700 whitespace-nowrap">
//                   Còn hàng
//                 </span>
//               </label>

//               {/* Reset */}
//               <button
//                 onClick={() => {
//                   setQuery("");
//                   setFilterInStockOnly(false);
//                   setMinPrice(undefined);
//                   setMaxPrice(undefined);
//                 }}
//                 className="px-6 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors font-medium"
//               >
//                 Đặt lại
//               </button>
//             </div>
//           </motion.div>
//         </section>

//         {/* CAR GRID */}
//         <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//           <AnimatePresence mode="popLayout">
//             {filteredCars.map((car, idx) => (
//               <motion.article
//                 key={car.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ delay: idx * 0.1 }}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
//               >
//                 <div className="relative h-56 overflow-hidden">
//                   <Image
//                     src={car.image || "/placeholder-car.png"}
//                     alt={car.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     fill
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

//                   {/* Badges */}
//                   <div className="absolute top-4 left-4">
//                     <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-800">
//                       {car.version}
//                     </span>
//                   </div>

//                   {car.inStock > 0 && (
//                     <div className="absolute top-4 right-4">
//                       <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white flex items-center gap-1">
//                         ✓ Còn {car.inStock} xe
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 <div className="p-6">
//                   <h3 className="text-2xl font-bold text-slate-800 mb-2">
//                     {car.name}
//                   </h3>
//                   <p className="text-sm text-slate-500 mb-4 line-clamp-2 min-h-[40px]">
//                     {car.description}
//                   </p>

//                   {/* Specs */}
//                   <div className="flex gap-4 mb-4 text-xs">
//                     {car.rangeKm && (
//                       <div className="flex items-center gap-1 text-slate-600">
//                         <span className="text-green-600">⚡</span>
//                         <span>{car.rangeKm} km</span>
//                       </div>
//                     )}
//                     {car.power && (
//                       <div className="flex items-center gap-1 text-slate-600">
//                         <span className="text-orange-600">🔋</span>
//                         <span>{car.power}</span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Colors */}
//                   <div className="flex gap-2 mb-4">
//                     {car.colors.map((color, idx) => (
//                       <div
//                         key={idx}
//                         className="w-6 h-6 rounded-full border-2 border-slate-200 shadow-sm hover:scale-110 transition-transform cursor-pointer"
//                         style={{ backgroundColor: color }}
//                         title={color}
//                       />
//                     ))}
//                   </div>

//                   {/* Price & CTA */}
//                   <div className="flex items-end justify-between pt-4 border-t border-slate-100">
//                     <div>
//                       <p className="text-xs text-slate-500">Giá từ</p>
//                       <p className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                         {formatVnd(car.startingPrice)}
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => setSelectedCar(car)}
//                       className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
//                     >
//                       Chi tiết
//                     </button>
//                   </div>
//                 </div>
//               </motion.article>
//             ))}
//           </AnimatePresence>

//           {filteredCars.length === 0 && (
//             <div className="col-span-full flex flex-col items-center justify-center py-20">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="text-xl font-bold text-slate-700 mb-2">
//                 Không tìm thấy xe phù hợp
//               </h3>
//               <p className="text-slate-500">Thử điều chỉnh bộ lọc của bạn</p>
//             </div>
//           )}
//         </section>

//         {/* DEALERS SECTION */}
//         <section className="mb-16">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-3xl font-bold text-slate-800">
//                 Hệ thống đại lý
//               </h2>
//               <p className="text-slate-500 mt-1">Tìm showroom gần bạn nhất</p>
//             </div>
//           </div>

//           <div className="mb-6">
//             <input
//               type="text"
//               value={dealerFilter}
//               onChange={(e) => setDealerFilter(e.target.value)}
//               placeholder="🔍 Tìm theo thành phố..."
//               className="w-full md:w-96 px-6 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none shadow-sm"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {filteredDealers.map((dealer, idx) => (
//               <motion.div
//                 key={dealer.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: idx * 0.1 }}
//                 onClick={() => setSelectedDealer(dealer)}
//                 className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
//               >
//                 <div className="relative h-40 overflow-hidden">
//                   <Image
//                     src={dealer.image || ""}
//                     alt={dealer.name}
//                     className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                     fill
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
//                   <div className="absolute bottom-3 left-3">
//                     <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold">
//                       {dealer.type}
//                     </span>
//                   </div>
//                 </div>

//                 <div className="p-5">
//                   <h3 className="font-bold text-lg text-slate-800 mb-2">
//                     {dealer.name}
//                   </h3>
//                   <p className="text-sm text-slate-500 mb-3 line-clamp-2">
//                     {dealer.address}
//                   </p>
//                   <div className="flex items-center justify-between text-sm">
//                     <span className="text-green-600 font-medium">
//                       📍 {dealer.city}
//                     </span>
//                     <span className="text-slate-400">→</span>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </section>
//       </main>

//       {/* FOOTER */}
//       <FooterInternal />

//       {/* CAR DETAIL MODAL */}
//       <AnimatePresence>
//         {selectedCar && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onClick={() => setSelectedCar(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
//             >
//               {/* Image header */}
//               <div className="relative h-80">
//                 <Image
//                   src={selectedCar.image || ""}
//                   alt={selectedCar.name}
//                   className="w-full h-full object-cover"
//                   fill
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

//                 <button
//                   onClick={() => setSelectedCar(null)}
//                   className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-lg"
//                 >
//                   ✕
//                 </button>

//                 <div className="absolute bottom-6 left-6 right-6">
//                   <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold mb-3">
//                     {selectedCar.version}
//                   </span>
//                   <h2 className="text-4xl font-black text-white">
//                     {selectedCar.name}
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-8">
//                 {/* Price */}
//                 <div className="flex items-end justify-between mb-8 pb-6 border-b border-slate-200">
//                   <div>
//                     <p className="text-sm text-slate-500 mb-1">
//                       Giá bán khởi điểm
//                     </p>
//                     <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
//                       {formatVnd(selectedCar.startingPrice)}
//                     </p>
//                   </div>

//                   {selectedCar.inStock > 0 && (
//                     <div className="px-4 py-2 bg-green-50 text-green-700 rounded-xl font-medium">
//                       ✓ Còn {selectedCar.inStock} xe
//                     </div>
//                   )}
//                 </div>

//                 {/* Specs grid */}
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
//                   {[
//                     {
//                       label: "Quãng đường",
//                       value: selectedCar.rangeKm
//                         ? `${selectedCar.rangeKm} km`
//                         : "—",
//                       icon: "⚡"
//                     },
//                     {
//                       label: "Công suất",
//                       value: selectedCar.power ?? "—",
//                       icon: "🔋"
//                     },
//                     {
//                       label: "Màu sắc",
//                       value: `${selectedCar.colors.length} màu`,
//                       icon: "🎨"
//                     },
//                     {
//                       label: "Tình trạng",
//                       value: selectedCar.inStock > 0 ? "Còn hàng" : "Hết hàng",
//                       icon: "📦"
//                     }
//                   ].map((spec) => (
//                     <div
//                       key={spec.label}
//                       className="bg-slate-50 rounded-xl p-4"
//                     >
//                       <div className="text-2xl mb-2">{spec.icon}</div>
//                       <p className="text-xs text-slate-500 mb-1">
//                         {spec.label}
//                       </p>
//                       <p className="font-bold text-slate-800">{spec.value}</p>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Colors */}
//                 <div className="mb-8">
//                   <h3 className="font-bold text-lg mb-3">Màu sắc có sẵn</h3>
//                   <div className="flex gap-3">
//                     {selectedCar.colors.map((color, idx) => (
//                       <div
//                         key={idx}
//                         className="w-14 h-14 rounded-2xl border-2 border-slate-200 shadow-md hover:scale-110 transition-transform cursor-pointer"
//                         style={{ backgroundColor: color }}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 {/* Description */}
//                 {selectedCar.description && (
//                   <div className="mb-8">
//                     <h3 className="font-bold text-lg mb-3">Mô tả</h3>
//                     <p className="text-slate-600 leading-relaxed">
//                       {selectedCar.description}
//                     </p>
//                   </div>
//                 )}

//                 {/* CTA buttons */}
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => alert(`Tạo báo giá cho ${selectedCar.name}`)}
//                     className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
//                   >
//                     🎯 Nhận báo giá
//                   </button>
//                   <button
//                     onClick={() => alert("Đặt lịch lái thử")}
//                     className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
//                   >
//                     🚗 Đặt lịch lái thử
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* DEALER DETAIL MODAL */}
//       <AnimatePresence>
//         {selectedDealer && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//             onClick={() => setSelectedDealer(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25 }}
//               onClick={(e) => e.stopPropagation()}
//               className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full"
//             >
//               <div className="relative h-64">
//                 <Image
//                   src={selectedDealer.image || ""}
//                   alt={selectedDealer.name}
//                   className="w-full h-full object-cover rounded-t-3xl"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl" />

//                 <button
//                   onClick={() => setSelectedDealer(null)}
//                   className="absolute top-6 right-6 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-700 hover:bg-white transition-all shadow-lg"
//                 >
//                   ✕
//                 </button>

//                 <div className="absolute bottom-6 left-6">
//                   <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold mb-2">
//                     {selectedDealer.type}
//                   </span>
//                   <h2 className="text-3xl font-black text-white">
//                     {selectedDealer.name}
//                   </h2>
//                 </div>
//               </div>

//               <div className="p-8">
//                 <div className="space-y-4 mb-8">
//                   <div className="flex items-start gap-3">
//                     <span className="text-2xl">📍</span>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Địa chỉ</p>
//                       <p className="text-slate-700 font-medium">
//                         {selectedDealer.address}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <span className="text-2xl">📞</span>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">
//                         Số điện thoại
//                       </p>
//                       <p className="text-slate-700 font-medium">
//                         {selectedDealer.phone}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="flex items-start gap-3">
//                     <span className="text-2xl">🏙️</span>
//                     <div>
//                       <p className="text-sm text-slate-500 mb-1">Thành phố</p>
//                       <p className="text-slate-700 font-medium">
//                         {selectedDealer.city}
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() =>
//                       (window.location.href = `tel:${selectedDealer.phone}`)
//                     }
//                     className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
//                   >
//                     📞 Gọi ngay
//                   </button>
//                   <button
//                     onClick={() => alert("Mở bản đồ")}
//                     className="flex-1 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all"
//                   >
//                     🗺️ Chỉ đường
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
"use client";
import Login from "./auth/login/page";

export default function Page() {
  return <Login />;
}
