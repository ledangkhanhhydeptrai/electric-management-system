"use client";

import { FormEvent, useState } from "react";
import SimpleForm from "./components/SimpleForm";
import FormValue from "./components/FormValue";
import FormTime from "./components/FormTime";
import FormApply from "./components/FormApply";
import CustomerCondition from "./components/CustomerCondition";
import FormMarketing from "./components/FormMarketing";
import FormComplicated from "./components/FormComplicated";
import DetailDescription from "./components/DetailDescription";
import Report from "./components/Report";
import System from "./components/System";
import ApproveForm from "./components/ApproveForm";
import {
  Gift,
  Save,
  Send,
  Eye,
  CheckCircle2,
  X,
  AlertCircle
} from "lucide-react";

export default function EnhancedPromoForm() {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationSeverity, setNotificationSeverity] = useState<
    "success" | "error"
  >("success");

  const handleClose = () => {
    setNotificationOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/add-promo", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Thêm khuyến mãi thất bại");

      const data = await res.json();
      setNotificationMessage(data.message || "Thêm khuyến mãi thành công!");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      e.currentTarget.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotificationMessage(error.message);
      } else {
        setNotificationMessage("Thêm khuyến mãi thất bại");
      }
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  const handleFormSubmit = () => {
    const container = document.querySelector(".form-container") as HTMLElement;
    const inputs = container?.querySelectorAll(
      "input, select, textarea"
    ) as NodeListOf<HTMLInputElement>;

    // Basic validation
    const requiredFields = container?.querySelectorAll(
      "[required]"
    ) as NodeListOf<HTMLInputElement>;
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "red";
        isValid = false;
      } else {
        field.style.borderColor = "";
      }
    });

    if (!isValid) {
      setNotificationMessage("Vui lòng điền đầy đủ các trường bắt buộc");
      setNotificationSeverity("error");
      setNotificationOpen(true);
      return;
    }

    // Simulate form submission
    const formData = new FormData();
    inputs.forEach((input) => {
      if (input.name) {
        if (input.type === "checkbox") {
          if (input.checked) {
            formData.append(input.name, input.value || "true");
          }
        } else {
          formData.append(input.name, input.value);
        }
      }
    });

    handleSubmit({
      preventDefault: () => {},
      currentTarget: {
        reset: () => {
          inputs.forEach((input) => {
            if (input.type === "checkbox") {
              (input as HTMLInputElement).checked = false;
            } else {
              input.value = "";
            }
          });
        }
      }
    } as React.FormEvent<HTMLFormElement>);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-lg">
                <Gift size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Tạo Chương Trình Khuyến Mãi
                </h1>
                <p className="text-purple-100 text-sm md:text-base">
                  Thiết lập chương trình khuyến mãi chi tiết và toàn diện
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="max-w-7xl mx-auto px-4 py-8 pb-32 form-container">
          <div className="space-y-6">
            {/* Thông tin cơ bản */}
            <SimpleForm />

            {/* Loại khuyến mãi & Giá trị */}
            <FormValue />

            {/* Thời gian áp dụng */}
            <FormTime />

            {/* Sản phẩm áp dụng */}
            <FormApply />

            {/* Điều kiện khách hàng */}
            <CustomerCondition />

            {/* Marketing & Truyền thông */}
            <FormMarketing />

            {/* Cài đặt nâng cao */}
            <FormComplicated />

            {/* Mô tả chi tiết */}
            <DetailDescription />

            {/* Báo cáo & Phân tích */}
            <Report />

            {/* Tích hợp hệ thống */}
            <System />

            {/* Xác nhận và phê duyệt */}
            <ApproveForm />
          </div>
        </div>

        {/* Sticky Footer with Buttons */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t-2 border-gray-200 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-5">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                type="button"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Save
                  size={20}
                  className="group-hover:rotate-12 transition-transform"
                />
                <span>Lưu bản nháp</span>
              </button>

              <button
                type="button"
                onClick={handleFormSubmit}
                className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-700 hover:via-pink-700 hover:to-red-700 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Send
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
                <span>Tạo chương trình</span>
              </button>

              <button
                type="button"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Eye
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Xem trước</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Notification */}
      {notificationOpen && (
        <div className="fixed top-6 right-6 z-[60] animate-in slide-in-from-right duration-300">
          <div
            className={`min-w-[360px] rounded-2xl shadow-2xl border-2 p-6 ${
              notificationSeverity === "success"
                ? "bg-gradient-to-r from-green-500 to-emerald-500 border-green-600"
                : "bg-gradient-to-r from-red-500 to-pink-500 border-red-600"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {notificationSeverity === "success" ? (
                  <div className="bg-white/20 p-2 rounded-lg">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                ) : (
                  <div className="bg-white/20 p-2 rounded-lg">
                    <AlertCircle size={24} className="text-white" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-white/90 font-medium mb-1">
                    {notificationSeverity === "success"
                      ? "Thành công"
                      : "Có lỗi xảy ra"}
                  </p>
                  <p className="text-white font-bold">{notificationMessage}</p>
                </div>
              </div>
              <button
                onClick={handleClose}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors flex-shrink-0"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
