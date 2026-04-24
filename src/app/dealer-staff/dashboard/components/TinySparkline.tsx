import React from "react";
import { Line } from "@ant-design/charts";
interface TinySparklineProps {
  data: { month: string; value: number }[];
  color?: string;
}
export default function TinySparkline({ data, color }: TinySparklineProps) {
  const config = {
    data,
    xField: "month",
    yField: "value",
    smooth: true,
    height: 50,
    autoFit: true,
    lineStyle: { stroke: color || "#1890ff", lineWidth: 2 },
    point: { size: 2, shape: "circle" }
  };
  return <Line {...config} />;
}
