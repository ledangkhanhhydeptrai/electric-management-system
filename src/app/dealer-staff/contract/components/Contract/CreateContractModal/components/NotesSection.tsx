// components/Contract/ContractModal/NotesSection.tsx
import React from "react";

interface NotesSectionProps {
  notes: string;
  setNotes: (val: string) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ notes, setNotes }) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl p-5 border-2 border-gray-200">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center text-white font-bold">
          6
        </div>
        <h3 className="text-lg font-bold text-gray-900">Ghi chú</h3>
      </div>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={3}
        className="w-full px-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-gray-100 focus:border-gray-500 transition-all duration-200 outline-none bg-white border-gray-200 hover:border-gray-300 resize-none"
        placeholder="Nhập ghi chú cho hợp đồng (tùy chọn)..."
      />
    </div>
  );
};

export default NotesSection;
