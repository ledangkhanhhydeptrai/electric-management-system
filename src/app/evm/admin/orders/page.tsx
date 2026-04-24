"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle, X } from "lucide-react";
import OrderFilters from "./components/OrderFilters";
import OrderStats from "./components/OrderStats";
import OrderTable from "./components/OrderTable";
import OrderModal from "./components/ModalForm";
import { useAuthGuard } from "@/app/hooks/useAuthGuard";
import {
  createOrder,
  getAllOrder,
  handleUpdateOrder,
  updateItem,
  ItemProps,
  OrderProps,
  OrderData,
  deleteOrderById,
  deleteOrderIdItemId
} from "@/services/orderService/order";
import { getAllInventories } from "@/services/inventoriesService/inventories";
import { OrderStats as OrderStatsType } from "./types/types";
import { InventoryItem } from "../inventories/types/types";
import StatusPopupDiscountAmount from "./components/StatusPopupDiscountAmount";
import { CustomerVIP } from "../customer/types/customer";
import { searchFilterCustomer } from "@/services/customerService/customer";
interface NotificationsProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
}

const OrderPage: React.FC = () => {
  useAuthGuard(["Administrator"]);
  const router = useRouter();

  // ======= State =======
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingOrder, setEditingOrder] = useState<OrderProps | undefined>();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [inventories, setInventories] = useState<InventoryItem[]>([]);
  const [items, setItems] = useState<ItemProps[]>([]);
  const [customerId, setCustomerId] = React.useState<string>("");
  const [customer, setCustomer] = React.useState<CustomerVIP[]>([]);
  const [isDiscountPopupOpen, setIsDiscountPopupOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState(0);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [notification, setNotification] = useState<NotificationsProps>({
    open: false,
    message: "",
    severity: "success"
  });

  const itemsPerPage = 3;

  // ======= Fetch Data =======
  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        const [orderRes, invRes, cusRes] = await Promise.all([
          getAllOrder(),
          getAllInventories(),
          searchFilterCustomer({})
        ]);

        if (Array.isArray(orderRes)) setOrders(orderRes);
        if (Array.isArray(invRes)) setInventories(invRes);
        if (Array.isArray(cusRes)) setCustomer(cusRes);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchAll();

    if (notification.open) {
      const timer = setTimeout(
        () => setNotification((prev) => ({ ...prev, open: false })),
        4000
      );
      return () => clearTimeout(timer);
    }
  }, [notification.open]);

  // ======= Stats =======
  const stats: OrderStatsType = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "PENDING").length,
      delivered: orders.filter((o) => o.status === "DELIVERED").length,
      totalRevenue: orders
        .filter((o) => o.status !== "CANCELLED")
        .reduce((sum, order) => sum + order.totalPrice, 0)
    }),
    [orders]
  );

  // ======= Filter + Pagination =======
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchSearch =
        order.orderNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.dealerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus =
        statusFilter === "ALL" || order.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  const { paginatedOrders, totalPages } = useMemo(() => {
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    return {
      paginatedOrders: filteredOrders.slice(start, start + itemsPerPage),
      totalPages
    };
  }, [filteredOrders, currentPage]);

  // ======= Handlers =======
  const handleView = (id: string) => router.push(`/evm/admin/orders/${id}`);

  const handleEdit = async (id: string, newStatus: string) => {
    try {
      const response = await handleUpdateOrder(id, { status: newStatus });
      if (response) {
        setNotification({
          open: true,
          message: "Bạn đã cập nhật trạng thái thành công",
          severity: "success"
        });
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Cập nhật thất bại",
        severity: "error"
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await deleteOrderById(id);
      if (response) {
        setNotification({
          open: true,
          message: "Xóa đơn hàng thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Xóa đơn hàng thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra!",
        severity: "error"
      });
    }
  };
  const handleDeleteByItem = async (itemId: string, orderId: string) => {
    try {
      const response = await deleteOrderIdItemId(itemId, orderId);
      if (response) {
        setNotification({
          open: true,
          message: "Xóa đơn hàng và sản phẩm thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Xóa đơn hàng và sản phẩm thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra!",
        severity: "error"
      });
    }
  };
  const handleCreateOrder = () => {
    setModalMode("create");
    setEditingOrder(undefined);
    setIsModalOpen(true);
  };

  const handleSubmitOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createOrder({
        customerId,
        items
      });
      if (response) {
        setNotification({
          open: true,
          message: "Tạo đơn hàng thành công",
          severity: "success"
        });
        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Tạo đơn hàng thất bại",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra khi tạo đơn hàng",
        severity: "error"
      });
    }
  };

  const handleShowDiscountPopup = (
    orderId: string,
    itemId: string,
    quantity: number,
    discountAmount: number
  ) => {
    setSelectedQuantity(quantity);
    setSelectedDiscount(discountAmount);
    setSelectedOrderId(orderId);
    setSelectedItemId(itemId);
    setIsDiscountPopupOpen(true);
  };

  const handleUpdateItem = async () => {
    // Kiểm tra ID đầy đủ trước khi gọi API
    if (!selectedOrderId || !selectedItemId) {
      setNotification({
        open: true,
        message: "Thiếu thông tin đơn hàng hoặc sản phẩm.",
        severity: "warning"
      });
      return;
    }

    try {
      const response = await updateItem(selectedOrderId, {
        itemId: selectedItemId,
        quantity: selectedQuantity,
        discountAmount: selectedDiscount
      });

      if (response) {
        setNotification({
          open: true,
          message: "Cập nhật thành công 🎉",
          severity: "success"
        });

        window.location.reload();
      } else {
        setNotification({
          open: true,
          message: "Cập nhật thất bại 😢",
          severity: "error"
        });
      }
    } catch (error) {
      console.error("Error updating order item:", error);
      setNotification({
        open: true,
        message: "Có lỗi xảy ra khi cập nhật ⚠️",
        severity: "error"
      });
    } finally {
      setIsDiscountPopupOpen(false); // Đảm bảo popup luôn đóng dù có lỗi hay không
    }
  };

  // ======= Render =======
  return (
    <div className="-ml-8 -mr-0 mt-20 bg-gray-50">
      <div>
        <div className="mb-4 ml-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý đơn hàng
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý tất cả đơn hàng của bạn
          </p>
        </div>

        <OrderStats stats={stats} />
        <OrderFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onCreateOrder={handleCreateOrder}
        />

        <OrderTable
          orders={paginatedOrders}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShowDiscount={handleShowDiscountPopup} // ✅ giờ khớp rồi
          onDeleteItem={handleDeleteByItem}
        />

        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          handleSubmit={handleSubmitOrder}
          items={items}
          inventories={inventories}
          initialData={editingOrder}
          setItems={setItems}
          mode={modalMode}
          customers={customer}
          customerId={customerId}
          setCustomerId={setCustomerId}
        />
      </div>

      {/* Popup cập nhật giảm giá */}
      {isDiscountPopupOpen && (
        <StatusPopupDiscountAmount
          onUpdate={handleUpdateItem}
          quantity={selectedQuantity}
          setQuantity={setSelectedQuantity}
          discountAmount={selectedDiscount}
          setDiscountAmount={setSelectedDiscount}
          isOpen={isDiscountPopupOpen}
          onClose={() => setIsDiscountPopupOpen(false)}
        />
      )}

      {/* Notification */}
      {notification.open && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div
            className={`bg-white rounded-xl shadow-2xl border-2 p-4 min-w-80 max-w-md ${
              notification.severity === "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                  notification.severity === "success"
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                    : "bg-gradient-to-br from-red-500 to-rose-500"
                }`}
              >
                {notification.severity === "success" ? (
                  <CheckCircle size={20} className="text-white" />
                ) : (
                  <AlertCircle size={20} className="text-white" />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`font-bold mb-1 ${
                    notification.severity === "success"
                      ? "text-emerald-900"
                      : "text-red-900"
                  }`}
                >
                  {notification.severity === "success" ? "Thành công!" : "Lỗi!"}
                </div>
                <div className="text-sm text-gray-600">
                  {notification.message}
                </div>
              </div>
              <button
                onClick={() =>
                  setNotification((prev) => ({ ...prev, open: false }))
                }
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
