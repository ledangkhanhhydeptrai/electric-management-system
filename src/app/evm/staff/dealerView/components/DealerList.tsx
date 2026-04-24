// /components/dealers/components/DealerList.tsx
"use client";
import React from "react";
import { Dealer } from "../types/types";
import DealerCard from "./DealerCard";
import DealerEmptyState from "./DealerEmptyState";

export default function DealerList({
  dealers,
  // onEdit,
  // onDelete,
  searchQuery,
  onClearSearch,
  // onDispatch, // thêm đây
  // onAdd
}: {
  dealers: Dealer[];
  // onEdit: (d: UpdateDealer) => void;
  // onDelete: (id: string, name: string) => void;
  searchQuery?: string;
  onClearSearch?: () => void;
  // onDispatch: (dealer: Dealer) => void; // thêm kiểu:
  // onAdd?: () => void;
}) {
  if (dealers.length === 0) {
    return (
      <DealerEmptyState
        searchQuery={searchQuery}
        onClear={onClearSearch}
        // onAdd={onAdd}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {dealers.map((d, i) => (
        <DealerCard
          key={d.id}
          dealer={d}
          index={i}
          // onEdit={onEdit}
          // onDelete={onDelete}
          // onDispatch={onDispatch} // truyền xuống DealerCard
        />
      ))}
    </div>
  );
}
