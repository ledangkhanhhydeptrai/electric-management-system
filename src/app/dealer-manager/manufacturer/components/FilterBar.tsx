type Props = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  filterActive: boolean | null;
  setFilterActive: (val: boolean | null) => void;
};

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  filterActive,
  setFilterActive
}: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="🔍 Tìm kiếm theo tên, mã hoặc quốc gia..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterActive(null)}
            className={`px-4 py-2 rounded-lg font-medium transition ${filterActive ===
            null
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilterActive(true)}
            className={`px-4 py-2 rounded-lg font-medium transition ${filterActive ===
            true
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Hoạt động
          </button>
          <button
            onClick={() => setFilterActive(false)}
            className={`px-4 py-2 rounded-lg font-medium transition ${filterActive ===
            false
              ? "bg-green-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
          >
            Ngừng
          </button>
        </div>
      </div>
    </div>
  );
}
