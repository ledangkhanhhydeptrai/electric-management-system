// // "use client";
// // import React from "react";
// // import DashboardPage from "./dashboard/page";

// // export default function DashboardPage1() {
// //   return (
// //     <div>
// //       <DashboardPage />
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState } from "react";
// import { Car, AlertCircle, XCircle } from "lucide-react";

// import DashboardView from "./dashboard/page";
// import ProductsView from "./productView/page";
// import DealersView, { Dealer } from "./dealerView/page";
// import PricingView from "./pricingView/page";
// import ReportsView from "./reportView/page";

// import { dealers } from "@/app/types/dealers/dealers";
// import { ProductItem } from "@/app/types/product/product";

// type ModalType =
//   | "addProduct"
//   | "allocate"
//   | "addDealer"
//   | "viewDealer"
//   | "editDealer"
//   | "addPolicy"
//   | null;

// const EVMAdminDashboard: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>("dashboard");
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [modalType, setModalType] = useState<ModalType>(null);
//   const [selectedItem, setSelectedItem] = useState<ProductItem | Dealer | null>(
//     null
//   );

//   // ✅ Modal Component
//   const Modal: React.FC = () => {
//     if (!showModal) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//         <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//           {/* Header */}
//           <div className="p-6 border-b border-gray-200">
//             <div className="flex justify-between items-center">
//               <h3 className="text-xl font-bold text-gray-900">
//                 {modalType === "addProduct" && "Thêm sản phẩm mới"}
//                 {modalType === "allocate" && "Phân phối xe cho đại lý"}
//                 {modalType === "addDealer" && "Thêm đại lý mới"}
//                 {modalType === "viewDealer" && "Thông tin đại lý"}
//                 {modalType === "editDealer" && "Chỉnh sửa thông tin đại lý"}
//                 {modalType === "addPolicy" && "Tạo chính sách mới"}
//               </h3>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 <XCircle className="w-6 h-6" />
//               </button>
//             </div>
//           </div>

//           {/* Body */}
//           <div className="p-6">
//             {/* 📦 Modal phân phối */}
//             {modalType === "allocate" &&
//               selectedItem &&
//               "model" in selectedItem && (
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Sản phẩm
//                     </label>
//                     <div className="p-3 bg-gray-50 rounded-lg">
//                       <p className="font-medium">
//                         {selectedItem.model} {selectedItem.version} -{" "}
//                         {selectedItem.color}
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         Còn lại: {selectedItem.available} xe
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Chọn đại lý
//                     </label>
//                     <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
//                       <option>-- Chọn đại lý --</option>
//                       {dealers.map((d: Dealer) => (
//                         <option key={d.id} value={d.id}>
//                           {d.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Số lượng
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Nhập số lượng xe"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Ngày giao dự kiến
//                     </label>
//                     <input
//                       type="date"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Ghi chú
//                     </label>
//                     <textarea
//                       rows={3}
//                       placeholder="Ghi chú thêm..."
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>

//                   <div className="flex gap-3 pt-4">
//                     <button
//                       onClick={() => setShowModal(false)}
//                       className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                     >
//                       Hủy
//                     </button>
//                     <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                       Xác nhận phân phối
//                     </button>
//                   </div>
//                 </div>
//               )}

//             {/* 🏢 Modal thêm đại lý */}
//             {modalType === "addDealer" && (
//               <div className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Tên đại lý
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Mã đại lý
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Khu vực
//                   </label>
//                   <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
//                     <option>Miền Bắc</option>
//                     <option>Miền Trung</option>
//                     <option>Miền Nam</option>
//                   </select>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Số điện thoại
//                     </label>
//                     <input
//                       type="tel"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Địa chỉ
//                   </label>
//                   <textarea
//                     rows={2}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Chỉ tiêu tháng
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="Số xe"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Chiết khấu (%)
//                     </label>
//                     <input
//                       type="number"
//                       placeholder="%"
//                       className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
//                   >
//                     Hủy
//                   </button>
//                   <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     Thêm đại lý
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="bg-gray-50">
//       <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-lg">
//               <Car className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">
//                 EVM Admin Dashboard
//               </h1>
//               <p className="text-sm text-gray-500">
//                 Hệ thống quản lý hãng xe điện
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <button className="relative p-2 hover:bg-gray-100 rounded-lg">
//               <AlertCircle className="w-5 h-5 text-gray-600" />
//               <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
//                 3
//               </span>
//             </button>
//             <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
//               <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
//                 A
//               </div>
//               <div>
//                 <p className="text-sm font-medium text-gray-900">Admin</p>
//                 <p className="text-xs text-gray-500">EVM Staff</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Navigation */}
//       <nav className="bg-white border-b border-gray-200 sticky top-16 z-30">
//         <div className="max-w-7xl mx-auto px-6 flex gap-8">
//           {[
//             { key: "dashboard", label: "Tổng quan" },
//             { key: "products", label: "Sản phẩm & Phân phối" },
//             { key: "dealers", label: "Quản lý đại lý" },
//             { key: "pricing", label: "Giá & Khuyến mãi" },
//             { key: "reports", label: "Báo cáo & AI" }
//           ].map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
//                 activeTab === tab.key
//                   ? "border-blue-600 text-blue-600"
//                   : "border-transparent text-gray-600 hover:text-gray-900"
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>
//       </nav>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-6 py-8">
//         {activeTab === "dashboard" && <DashboardView />}
//         {activeTab === "products" && <ProductsView />}
//         {activeTab === "dealers" && <DealersView />}
//         {activeTab === "pricing" && <PricingView />}
//         {activeTab === "reports" && <ReportsView />}
//       </main>

//       {/* Modal */}
//       <Modal />
//     </div>
//   );
// };

// export default EVMAdminDashboard;
"use client";
import React from "react";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import UserListPage from "./users/page";

const AdminPage: React.FC = () => {
  useAuthGuard(["Administrator"]); // chỉ Admin mới vào được
  return <UserListPage />;
};

export default AdminPage;
