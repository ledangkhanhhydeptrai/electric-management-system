"use client";
import React, { useState } from "react";
import {
  User,
  Activity,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Download,
  RefreshCw,
  Clock
} from "lucide-react";

interface Log {
  id: string;
  user: string;
  action: string;
  date: string;
  time: string;
  status: "Success" | "Failed";
  details?: string;
}

const sampleLogs: Log[] = [
  {
    id: "1",
    user: "Nguyen Van A",
    action: "Updated car price",
    date: "2025-09-10",
    time: "14:30:25",
    status: "Success",
    details: "Changed VinFast VF8 price from 950M to 920M VND"
  },
  {
    id: "2",
    user: "Tran Thi B",
    action: "Created new order",
    date: "2025-09-09",
    time: "11:15:42",
    status: "Success",
    details: "Order #ORD-2024-0892 - Tesla Model 3"
  },
  {
    id: "3",
    user: "Le Van C",
    action: "Deleted dealer account",
    date: "2025-09-08",
    time: "09:45:18",
    status: "Failed",
    details: "Insufficient permissions"
  },
  {
    id: "4",
    user: "Pham Thi D",
    action: "Added inventory stock",
    date: "2025-09-08",
    time: "16:20:05",
    status: "Success",
    details: "Added 25 units of BYD Atto 3"
  },
  {
    id: "5",
    user: "Hoang Van E",
    action: "Modified discount policy",
    date: "2025-09-07",
    time: "13:55:30",
    status: "Success",
    details: "Updated bulk discount from 5% to 7%"
  },
  {
    id: "6",
    user: "Nguyen Thi F",
    action: "Export sales report",
    date: "2025-09-07",
    time: "10:30:12",
    status: "Failed",
    details: "Report generation timeout"
  }
];

export default function LogTable() {
  const [logs] = useState<Log[]>(sampleLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "All" | "Success" | "Failed"
  >("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "All" || log.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const toggleRow = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <div>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-emerald-800">
              Activity Logs
            </h1>
            <p className="text-emerald-600 mt-1">
              Monitor system activities and user actions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">Total Logs</p>
                <p className="text-2xl font-bold text-emerald-800">
                  {logs.length}
                </p>
              </div>
              <Activity className="w-8 h-8 text-emerald-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Successful</p>
                <p className="text-2xl font-bold text-green-800">
                  {logs.filter((l) => l.status === "Success").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Failed</p>
                <p className="text-2xl font-bold text-red-800">
                  {logs.filter((l) => l.status === "Failed").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-4 border-l-4 border-teal-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-600">Success Rate</p>
                <p className="text-2xl font-bold text-teal-800">
                  {Math.round(
                    (logs.filter((l) => l.status === "Success").length /
                      logs.length) *
                      100
                  )}
                  %
                </p>
              </div>
              <Activity className="w-8 h-8 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by user or action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors"
              />
            </div>

            <div className="flex gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                <select
                  value={filterStatus}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as "All" | "Success" | "Failed"
                    )
                  }
                  className="px-4 py-2.5 border-2 border-emerald-200 rounded-lg focus:border-emerald-500 focus:outline-none transition-colors font-medium cursor-pointer"
                >
                  <option value="All">All Status</option>
                  <option value="Success">Success Only</option>
                  <option value="Failed">Failed Only</option>
                </select>
              </div>

              <button className="px-4 py-2.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors flex items-center gap-2 font-medium">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>

              <button className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-2 font-medium shadow-md">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-emerald-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> User
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4" /> Action
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date & Time
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-100">
                {filteredLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr
                      className="hover:bg-emerald-50 transition-colors cursor-pointer"
                      onClick={() => toggleRow(log.id)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold">
                            {log.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </div>
                          <span className="font-medium text-emerald-800">
                            {log.user}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-emerald-700">
                        {log.action}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-emerald-800 font-medium">
                            {log.date}
                          </span>
                          <span className="text-xs text-emerald-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {log.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {log.status === "Success" ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Success
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            <XCircle className="w-4 h-4" />
                            Failed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button className="text-emerald-600 hover:text-emerald-800 font-medium text-sm">
                          {expandedRow === log.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === log.id && (
                      <tr className="bg-emerald-50">
                        <td colSpan={5} className="px-6 py-4">
                          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border-2 border-emerald-200">
                            <div className="bg-emerald-100 p-2 rounded-lg">
                              <Activity className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-emerald-800 mb-1">
                                Action Details
                              </p>
                              <p className="text-emerald-600 text-sm">
                                {log.details}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <Activity className="w-16 h-16 text-emerald-300 mx-auto mb-4" />
              <p className="text-emerald-500 text-lg font-medium">
                No logs found
              </p>
              <p className="text-emerald-400 text-sm">
                Try adjusting your search or filter
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {filteredLogs.length > 0 && (
          <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-emerald-600">
              Showing{" "}
              <span className="font-semibold">{filteredLogs.length}</span> of{" "}
              <span className="font-semibold">{logs.length}</span> logs
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 border-2 border-emerald-300 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors font-medium">
                Previous
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
