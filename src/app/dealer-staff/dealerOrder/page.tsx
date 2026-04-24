"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  addDealerOrderForm,
  DealerOrderData,
  getAllDealerOrder,
  ItemPropsDealerForm
} from "@/services/dealerOrderService/dealerOrder";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import AddFormDealerOrderModal, { OrderFormData } from "./components/AddFormDealerOrder";
import { AxiosError } from "axios";
import { getAllModel, Models } from "@/services/vehicleModel/vehicle";

// Import các components đã tách
import OrderHeader from "./components/OrderHeader";
import OrderFilters from "./components/OrderFilters";
import OrderCard from "./components/OrderCard";
import EmptyState from "./components/EmptyState";
import Notification from "./components/Notification";
import { filterOrders } from "./components/Utils";

// Import types và utils

type NotificationProps = {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

const DealerOrder: React.FC = () => {
  useAuthGuard(["Staff"]);
  const router = useRouter();

  // State
  const [data, setData] = useState<DealerOrderData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [models, setModels] = React.useState<Models[]>([]);
  const [formData, setFormData] = useState<OrderFormData>({
    note: "",
    items: [{ modelId: "", color: "", quantity: 1 }]
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [notification, setNotification] = useState<NotificationProps>({
    open: false,
    message: "",
    severity: "success"
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const orders = await getAllDealerOrder();
        setData(Array.isArray(orders) ? orders : []);

        const modelsData = await getAllModel();
        setModels(Array.isArray(modelsData) ? modelsData : []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // Form handlers
  const handleFormChange = (newData: Partial<OrderFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleItemChange = <K extends keyof ItemPropsDealerForm>(
    index: number,
    field: K,
    value: ItemPropsDealerForm[K]
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { modelId: "", color: "", quantity: 1 }]
    }));
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrors({});
      await addDealerOrderForm(formData);

      setNotification({
        open: true,
        message: "Tạo đơn hàng đại lý thành công",
        severity: "success"
      });
      setIsModalOpen(false);

      // Reload orders
      const updatedOrders = await getAllDealerOrder();
      setData(Array.isArray(updatedOrders) ? updatedOrders : []);

      // Reset form
      setFormData({

        note: "",
        items: [{ modelId: "", color: "", quantity: 1 }]
      });
    } catch (err) {
      const errors = err as AxiosError;
      setErrors({ submit: errors.message || "Đã xảy ra lỗi khi tạo đơn hàng" });
      setNotification({
        open: true,
        message: errors.message || "Có lỗi xảy ra",
        severity: "error"
      });
    }
  };

  // Helper functions
  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const viewOrderDetail = (orderId: string) => {
    router.push(`/dealer-staff/dealerOrder/${orderId}`);
  };

  // Filter orders
  const filteredOrders = filterOrders(data, searchTerm, filterStatus);

  return (
    <div className="mt-22 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="">
        {/* Header */}
        <OrderHeader onCreateOrder={() => setIsModalOpen(true)} />

        {/* Filters */}
        <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onStatusChange={setFilterStatus}
        />

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <EmptyState />
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                isExpanded={expandedOrderId === order.id}
                onToggleExpand={() => toggleExpand(order.id)}
                onViewDetail={() => viewOrderDetail(order.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      <AddFormDealerOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        errors={errors}
        onChange={handleFormChange}
        onItemChange={handleItemChange}
        onAddItem={handleAddItem}
        onRemoveItem={handleRemoveItem}
        onSubmit={handleSubmit}
        models={models}
      />

      {/* Notification */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />

      {/* Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
        
        @keyframes slide-in-right {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right { animation: slide-in-right 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default DealerOrder;