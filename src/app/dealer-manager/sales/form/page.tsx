"use client";

import { FormEvent, useState } from "react";

export default function EnhancedSalesForm() {
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
      const res = await fetch("/api/add-sales", {
        method: "POST",
        body: formData
      });

      if (!res.ok) throw new Error("Đăng ký thất bại");

      const data = await res.json();

      setNotificationMessage(data.message || "Đăng ký thành công!");
      setNotificationSeverity("success");
      setNotificationOpen(true);

      e.currentTarget.reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setNotificationMessage(error.message);
      } else {
        setNotificationMessage("Đăng ký thất bại");
      }
      setNotificationSeverity("error");
      setNotificationOpen(true);
    }
  };

  return (
    <>
      <div className="bg-white rounded-none overflow-auto shadow-lg relative h-screen">
        <div className="mt-5 text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚀 Đăng ký Nhân viên Sales
          </h1>
          <p className="text-gray-600">
            Điền đầy đủ thông tin để hoàn tất đăng ký
          </p>
        </div>

        <div className="space-y-8">
          {/* Thông tin cá nhân */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              👤 Thông tin cá nhân
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Họ và tên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="VD: Nguyễn Văn A"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Giới tính <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn giới tính</option>
                  <option value="male">Nam</option>
                  <option value="female">Nữ</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Số CMND/CCCD <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nationalId"
                  placeholder="VD: 123456789"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="bg-blue-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              📞 Thông tin liên hệ
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@company.com"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="0901234567"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Địa chỉ thường trú <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="VD: 123 Nguyễn Huệ, Quận 1, TP.HCM"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>
            </div>
          </div>

          {/* Thông tin công việc */}
          <div className="bg-green-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              💼 Thông tin công việc
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Mã nhân viên <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="employeeId"
                  placeholder="VD: S001"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Chức vụ <span className="text-red-500">*</span>
                </label>
                <select
                  name="position"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn chức vụ</option>
                  <option value="sales-executive">Sales Executive</option>
                  <option value="senior-sales">Senior Sales</option>
                  <option value="sales-manager">Sales Manager</option>
                  <option value="team-leader">Team Leader</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Khu vực phụ trách <span className="text-red-500">*</span>
                </label>
                <select
                  name="area"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn khu vực</option>
                  <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
                  <option value="ha-noi">Hà Nội</option>
                  <option value="da-nang">Đà Nẵng</option>
                  <option value="can-tho">Cần Thơ</option>
                  <option value="hai-phong">Hải Phòng</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Ngày bắt đầu làm việc <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Mức lương mong muốn (VNĐ)
                </label>
                <input
                  type="number"
                  name="expectedSalary"
                  placeholder="VD: 15000000"
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Loại hợp đồng <span className="text-red-500">*</span>
                </label>
                <select
                  name="contractType"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn loại hợp đồng</option>
                  <option value="full-time">Toàn thời gian</option>
                  <option value="part-time">Bán thời gian</option>
                  <option value="contract">Hợp đồng</option>
                  <option value="internship">Thực tập</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trình độ học vấn & Kinh nghiệm */}
          <div className="bg-purple-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🎓 Trình độ học vấn & Kinh nghiệm
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Trình độ học vấn <span className="text-red-500">*</span>
                </label>
                <select
                  name="education"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn trình độ</option>
                  <option value="high-school">Trung học phổ thông</option>
                  <option value="college">Cao đẳng</option>
                  <option value="university">Đại học</option>
                  <option value="master">Thạc sĩ</option>
                  <option value="phd">Tiến sĩ</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Chuyên ngành
                </label>
                <input
                  type="text"
                  name="major"
                  placeholder="VD: Quản trị kinh doanh"
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Số năm kinh nghiệm <span className="text-red-500">*</span>
                </label>
                <select
                  name="experience"
                  required
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn kinh nghiệm</option>
                  <option value="0">Chưa có kinh nghiệm</option>
                  <option value="1">1 năm</option>
                  <option value="2">2 năm</option>
                  <option value="3-5">3-5 năm</option>
                  <option value="5+">Trên 5 năm</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Trình độ ngoại ngữ
                </label>
                <select
                  name="language"
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">Chọn trình độ</option>
                  <option value="basic">Cơ bản</option>
                  <option value="intermediate">Trung cấp</option>
                  <option value="advanced">Nâng cao</option>
                  <option value="fluent">Thành thạo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Kỹ năng & Chứng chỉ */}
          <div className="bg-yellow-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              🏆 Kỹ năng & Chứng chỉ
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Kỹ năng chuyên môn
                </label>
                <textarea
                  name="skills"
                  rows={3}
                  placeholder="VD: Kỹ năng bán hàng, đàm phán, chăm sóc khách hàng, sử dụng CRM..."
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Chứng chỉ liên quan
                </label>
                <textarea
                  name="certificates"
                  rows={2}
                  placeholder="VD: Chứng chỉ Sales Professional, Digital Marketing..."
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Thông tin bổ sung */}
          <div className="bg-red-50 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              📝 Thông tin bổ sung
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Người liên hệ khẩn cấp
                </label>
                <input
                  type="text"
                  name="emergencyContact"
                  placeholder="VD: Nguyễn Thị B"
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  SĐT người liên hệ khẩn cấp
                </label>
                <input
                  type="tel"
                  name="emergencyPhone"
                  placeholder="0987654321"
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                />
              </div>

              <div className="flex flex-col md:col-span-2">
                <label className="text-sm font-medium text-gray-600 mb-2">
                  Ghi chú / Thông tin thêm
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Nhập thông tin bổ sung, mục tiêu cá nhân, sở thích..."
                  className="p-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Xác nhận */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="agreement"
                required
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="text-sm text-gray-700">
                Tôi xác nhận rằng tất cả thông tin đã cung cấp là chính xác và
                đồng ý với các điều khoản và điều kiện của công ty.{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={(e) => {
                // Convert div to form-like data collection
                const formData = new FormData();
                const container = e.currentTarget.closest(
                  ".space-y-8"
                ) as HTMLElement;
                const inputs = container?.querySelectorAll(
                  "input, select, textarea"
                ) as NodeListOf<HTMLInputElement>;

                inputs.forEach((input) => {
                  if (input.name) {
                    if (input.type === "checkbox") {
                      formData.append(input.name, input.checked.toString());
                    } else {
                      formData.append(input.name, input.value);
                    }
                  }
                });

                // Simulate form submission
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
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200 text-lg"
            >
              🚀 Hoàn tất đăng ký
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notificationOpen && (
        <div className="fixed top-4 right-4 z-50">
          <div
            className={`p-4 rounded-lg shadow-lg ${
              notificationSeverity === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{notificationMessage}</span>
              <button
                onClick={handleClose}
                className="ml-4 text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
