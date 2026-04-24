"use client";
import React from "react";
import { useAuthGuard } from "../hooks/useAuthGuard";
import CarListPage from "./cars/page";
export default function DealerstaffDashboard() {
  useAuthGuard(["Staff"]);
  return <CarListPage />;
}
