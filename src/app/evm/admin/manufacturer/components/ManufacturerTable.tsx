import { useRouter } from "next/navigation";
import { Manufacturer } from "../types/types";

interface ManufacturerTableProps {
  manufacturers: Manufacturer[];
  handleEdit: (m: Manufacturer) => void;
  handleDelete: (id: number) => void;
}

export const ManufacturerTable: React.FC<ManufacturerTableProps> = ({
  manufacturers,
  handleEdit,
  handleDelete
}) => {
  const router = useRouter();
  if (manufacturers.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
        <div className="text-6xl mb-4">📭</div>
        <p className="text-gray-500 text-lg">Không tìm thấy hãng xe nào</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Mã</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Tên hãng xe
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold">
                Quốc gia
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Số đại lý
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {manufacturers.map(manufacturer =>
              <tr
                key={manufacturer.id}
                className="hover:bg-green-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <span className="font-mono text-sm font-semibold text-gray-800">
                    {manufacturer.code}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-800">
                    {manufacturer.name}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">
                    {manufacturer.country}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center justify-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                    {manufacturer.dealerCount}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {manufacturer.active
                    ? <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-green-500 rounded-full" />
                        Hoạt động
                      </span>
                    : <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        <span className="w-2 h-2 bg-red-500 rounded-full" />
                        Ngừng
                      </span>}
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleEdit(manufacturer)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm font-medium"
                    >
                      ✏️ Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(manufacturer.id!)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-medium"
                    >
                      🗑️ Xóa
                    </button>
                    <button
                      onClick={() =>
                        router.push(
                          `/evm/admin/manufacturer/${manufacturer.id}`
                        )}
                      className="px-3 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-all shadow-sm"
                    >
                      Chi tiết
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
