"use client";
import React from "react";
import { useAuthGuard } from "../hooks/useAuthGuard";
import CarListAndComparePage from "./cars/page";
export default function DealerManagerDashboard() {
  useAuthGuard(["Dealer Manager"]);
  // return <DashboardPage />;
  return <CarListAndComparePage/>
}
