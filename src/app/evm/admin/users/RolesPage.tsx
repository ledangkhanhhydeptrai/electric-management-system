"use client";
import React from "react";
import RoleTable from "./components/RoleTable/RoleTable";
import { accountService } from "@/services/accountService/account";
import { Account } from "@/app/types/Account/Account";
export default function RolesPage() {
  const [data, setData] = React.useState<Account[]>([]);
  const fetchData = async () => {
    const res = await accountService();
    setData(res);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="-mt-1 p-1 text-[#1f2540]">
      <RoleTable accounts={data} />
    </main>
  );
}
