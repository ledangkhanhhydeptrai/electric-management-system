"use client";
import React from "react";
import DashboardPage from "./dashboard/page";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import EVManagementSystem from "./cars/page";


export default function Staff() {
  useAuthGuard(["EVM Staff"]);
  // return <DashboardPage />;
  return <EVManagementSystem/>
}
