import { EVModel } from "@/app/types/EV/EVModel";
import { Car, Package, Sparkles } from "lucide-react";
import ModelRow from "./ModelRow";
import { useRouter } from "next/navigation";
import React from "react";

interface ModelsTableProps {
  models: EVModel[];
  onEditModel: (model: EVModel) => void;
  onDeleteModel: (id: string) => void;
}

export default function ModelsTable({
  models,
  onEditModel,
  onDeleteModel
}: ModelsTableProps) {
  const router = useRouter();

  // ---------------- Pagination ----------------
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(models.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentModels = models.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ---------------- No Data ----------------
  if (models.length === 0) {
    return (
      <div className="relative bg-gradient-to-br from-white via-gray-50/30 to-blue-50/20 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-100/40 to-indigo-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-100/30 to-pink-100/30 rounded-full blur-2xl"></div>

        <div className="relative text-center py-20 px-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl mb-6 shadow-lg">
            <Car className="w-12 h-12 text-blue-500 animate-pulse" />
          </div>

          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Chưa có dữ liệu
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Không tìm thấy model nào phù hợp. Thử điều chỉnh bộ lọc hoặc thêm
            model mới.
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Sparkles className="w-4 h-4" />
            <span>Bắt đầu bằng cách tạo model đầu tiên</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 relative bg-gradient-to-br from-white via-white to-gray-50/30 rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-100">
      {/* Header badge */}
      <div className="relative px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50/30 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
            <Package className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-700">
              Danh sách Models
            </h3>
            <p className="text-xs text-gray-500">
              Tổng số:{" "}
              <span className="font-semibold text-blue-600">
                {models.length}
              </span>{" "}
              model
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg">
            <tr>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-white/60 rounded-full"></div>
                  Model
                </div>
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Năm
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Mã lực
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Giá tiền
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Quãng đường
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Pin
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Miêu tả
              </th>
              <th className="px-4 py-4 text-left text-xs font-bold text-white uppercase tracking-wider">
                Nhà SX
              </th>
              <th className="px-4 py-4 text-right text-xs font-bold text-white uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {currentModels.map((model) => (
              <ModelRow
                key={model.id}
                model={model}
                onEditModel={() => onEditModel(model)}
                onDelete={onDeleteModel}
                onClick={() => router.push(`/evm/staff/model/${model.id}`)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-2 mt-4 px-6">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Footer summary */}
      <div className="px-6 py-3 bg-gradient-to-r from-gray-50 to-blue-50/20 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>
            Hiển thị {currentModels.length} trên tổng {models.length} model
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Dữ liệu đã được cập nhật</span>
          </div>
        </div>
      </div>
    </div>
  );
}
