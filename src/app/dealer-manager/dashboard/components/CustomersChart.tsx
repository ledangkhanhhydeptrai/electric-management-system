// CustomersChart.tsx
"use client";
import dynamic from "next/dynamic";
import React from "react";

const CustomersChartInner = dynamic(() => import("./CustomersChartInner"), {
  ssr: false
});

interface Props {
  data: { label: string; value: number }[];
}

const CustomersChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="rounded-2xl shadow-lg">
      <CustomersChartInner data={data} />
    </div>
  );
};

export default CustomersChart;
