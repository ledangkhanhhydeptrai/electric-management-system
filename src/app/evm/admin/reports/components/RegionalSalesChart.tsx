"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface RegionalSalesChartProps {
  data: { region: string; sales: number }[];
}

export default function RegionalSalesChart({ data }: RegionalSalesChartProps) {
  const chartData = {
    labels: data.map((d) => d.region),
    datasets: [
      {
        label: "Sales",
        data: data.map((d) => d.sales),
        backgroundColor: "rgba(59, 130, 246, 0.8)", // xanh dương tươi hơn
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#374151" // text-gray-700
        }
      },
      title: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          color: "#374151"
        },
        grid: {
          color: "#E5E7EB" // grid nhạt
        }
      },
      y: {
        ticks: {
          color: "#374151"
        },
        grid: {
          color: "#E5E7EB"
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
}
