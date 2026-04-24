// "use client";
// import React, { useState } from "react";
// import StatsCards from "./components/StatsCards";
// import { Manufacturer } from "./types/types";
// import FilterBar from "./components/FilterBar";
// import { ManufacturerTable } from "./components/ManufacturerTable";
// import { ManufacturerModal } from "./components/ManufacturerModal";
// import ErrorIcon from "@mui/icons-material/Error";
// import {
//   createManufacturer,
//   updateManufacturerById
// } from "@/services/manufacturerService/manufacturer";
// import { Alert, Slide, SlideProps, Snackbar } from "@mui/material";
// import { CheckCircleIcon } from "lucide-react";
// import { useAuthGuard } from "../../hooks/useAuthGuard";
// interface SlideTransitionProps
//   extends Omit<SlideProps, "direction" | "children"> {
//   children: React.ReactElement;
// }
// function SlideTransition({ children, ...props }: SlideTransitionProps) {
//   return (
//     <Slide {...props} direction="left">
//       {children}
//     </Slide>
//   );
// }

// function Spinner() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
//       <div className="w-14 h-14 border-4 border-t-transparent border-green-500 rounded-full animate-spin" />
//     </div>
//   );
// }

// interface NotificationsProps {
//   open: boolean;
//   message: string;
//   severity: "success" | "error" | "info" | "warning";
// }

// export default function ManufacturerManagement() {
//   const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filterActive, setFilterActive] = useState<boolean | null>(null);
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [code, setCode] = useState("");
//   const [name, setName] = useState("");
//   const [country, setCountry] = useState("");
//   const [errors, setErrors] = useState<Record<string, string>>({});
//   const [notification, setNotification] = React.useState<NotificationsProps>({
//     open: false,
//     message: "",
//     severity: "success"
//   });
//   useAuthGuard(["Dealer Manager"]);
//   React.useEffect(() => {
//     const timer = setTimeout(() => setLoading(false), 1500);
//     return () => clearTimeout(timer);
//   }, []);
//   React.useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await getAllManufacturers();
//         if (Array.isArray(response)) {
//           setManufacturers(response);
//         } else {
//           setManufacturers([]);
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };
//     fetchData();
//   }, []);
//   const validateForm = () => {
//     const newErrors: Record<string, string> = {};

//     if (!code.trim()) {
//       newErrors.code = "Mã hãng xe không được để trống";
//     } else if (code.length < 2) {
//       newErrors.code = "Mã hãng xe phải có ít nhất 2 ký tự";
//     }

//     if (!name.trim()) {
//       newErrors.name = "Tên hãng xe không được để trống";
//     }

//     if (!country.trim()) {
//       newErrors.country = "Quốc gia không được để trống";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
//   const handleClose = () => {
//     setNotification((prev) => ({ ...prev, open: false }));
//   };
//   if (loading) return <Spinner />;
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       if (editingId) {
//         const updatedData = await updateManufacturerById(editingId, {
//           code,
//           name,
//           country
//         });

//         setManufacturers((prev) =>
//           prev.map((m) =>
//             m.id === editingId &&
//             typeof updatedData === "object" &&
//             updatedData !== null
//               ? { ...m, ...(updatedData as object) }
//               : m
//           )
//         );

//         setNotification({
//           open: true,
//           message: "✔️ Cập nhật thành công!",
//           severity: "success"
//         });
//       } else {
//         const response = await createManufacturer({ code, name, country });
//         if (response) {
//           setNotification({
//             open: true,
//             message: "Tạo hãng xe mới thành công",
//             severity: "success"
//           });
//           window.location.reload();
//         } else {
//           setNotification({
//             open: true,
//             message: "Tạo hãng xe mới thất bại",
//             severity: "success"
//           });
//         }
//       }

//       resetForm();
//       setShowModal(false);
//       setEditingId(null);
//     } catch (error) {
//       console.error("Error:", error);
//       setNotification({
//         open: true,
//         message: "❌ Có lỗi xảy ra!",
//         severity: "error"
//       });
//     }
//   };

//   const resetForm = () => {
//     setCode("");
//     setName("");
//     setCountry("");
//   };

//   const handleEdit = async (manufacturer: Manufacturer) => {
//     setCode(manufacturer.code);
//     setName(manufacturer.name);
//     setCountry(manufacturer.country);
//     setEditingId(manufacturer.id!);
//     setShowModal(true);
//   };

//   const handleDelete = (id: number) => {
//     if (confirm("Bạn có chắc chắn muốn xóa hãng xe này?")) {
//       setManufacturers((prev) => prev.filter((m) => m.id !== id));
//     }
//   };

//   const filteredManufacturers = manufacturers.filter((m) => {
//     const matchesSearch =
//       m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       m.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       m.country.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesActive = filterActive === null || m.active === filterActive;
//     return matchesSearch && matchesActive;
//   });

//   return (
//     <div className="">
//       <div className="max-w-7xl mx-auto">
//         {/* Header & Add Button */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
//               🏭 Quản lý Hãng Xe
//             </h1>
//             <p className="text-gray-600 mt-1">
//               Quản lý danh sách các hãng sản xuất ô tô
//             </p>
//           </div>
//           {/* <button
//             onClick={() => {
//               resetForm();
//               setEditingId(null);
//               setErrors({});
//               setShowModal(true);
//             }}
//             className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-emerald-700 hover:scale-105 transform transition flex items-center gap-2"
//           >
//             <span className="text-xl">+</span> Thêm hãng xe
//           </button> */}
//         </div>

//         <StatsCards manufacturers={manufacturers} />
//         <FilterBar
//           searchQuery={searchQuery}
//           setSearchQuery={setSearchQuery}
//           filterActive={filterActive}
//           setFilterActive={setFilterActive}
//         />
//         <ManufacturerTable
//           manufacturers={filteredManufacturers}
//           handleEdit={handleEdit}
//           handleDelete={handleDelete}
//         />

//         {showModal && (
//           <ManufacturerModal
//             code={code}
//             setCode={setCode}
//             name={name}
//             setName={setName}
//             country={country}
//             setCountry={setCountry}
//             errors={errors}
//             handleSubmit={handleSubmit}
//             onClose={() => {
//               setShowModal(false);
//               setEditingId(null);
//               setErrors({});
//             }}
//             editingId={editingId}
//           />
//         )}
//       </div>
//       <Snackbar
//         open={notification.open}
//         onClose={handleClose}
//         TransitionComponent={SlideTransition}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         autoHideDuration={4000}
//       >
//         <Alert
//           onClose={handleClose}
//           severity={notification.severity}
//           variant="filled"
//           iconMapping={{
//             success: <CheckCircleIcon fontSize="small" />,
//             error: <ErrorIcon fontSize="small" />
//           }}
//           sx={{
//             width: "100%",
//             bgcolor:
//               notification.severity === "success" ? "#4caf50" : "#f44336",
//             color: "white",
//             fontWeight: "bold",
//             borderRadius: "12px",
//             boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
//             px: 2,
//             py: 1.5,
//             display: "flex",
//             alignItems: "center",
//             gap: 1
//           }}
//         >
//           {notification.message}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// }
import React from 'react'

export default function page() {
  return (
    <div>
      
    </div>
  )
}

