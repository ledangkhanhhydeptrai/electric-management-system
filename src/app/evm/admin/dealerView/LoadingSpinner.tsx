"use client";
import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
      <div className="w-14 h-14 border-4 border-t-transparent border-green-500 rounded-full animate-spin" />
    </div>
  );
}
