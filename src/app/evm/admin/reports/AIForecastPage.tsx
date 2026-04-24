"use client";
import React from "react";
import ForecastChart from "./components/ForecastChart";

const forecastData = [
  { month: "Jan", forecast: 10000 },
  { month: "Feb", forecast: 12000 },
  { month: "Mar", forecast: 15000 },
  { month: "Apr", forecast: 13000 },
  { month: "May", forecast: 14000 },
  { month: "Jun", forecast: 16000 },
  { month: "Jul", forecast: 17000 },
  { month: "Aug", forecast: 18000 }
];

export default function AIForecastPage() {
  return (
    <main className="p-1 bg-white text-gray-900">
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md">
        <ForecastChart data={forecastData} />
      </div>
    </main>
  );
}
