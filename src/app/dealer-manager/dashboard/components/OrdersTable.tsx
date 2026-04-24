import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export type Order = {
  id: string | number;
  customer: string;
  carModel: string;
  price: number;
  status: "Pending" | "Completed" | "Cancelled";
  orderDate: string;
};

type OrdersTableProps = {
  orders: Order[];
};

export const OrdersTable = ({ orders }: OrdersTableProps) => {
  const getStatusBadge = (status: Order["status"]): React.ReactNode => {
    const styles: Record<Order["status"], string> = {
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Completed: "bg-green-100 text-green-800 border border-green-200",
      Cancelled: "bg-red-100 text-red-800 border border-red-200"
    };

    const icons: Record<Order["status"], React.ReactNode> = {
      Pending: <FaClock className="inline mr-1" />,
      Completed: <FaCheckCircle className="inline mr-1" />,
      Cancelled: <FaTimesCircle className="inline mr-1" />
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Mã ĐH
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Khách hàng
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Xe
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Giá
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Ngày
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
                  {order.carModel}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                  {order.price.toLocaleString("vi-VN")} VNĐ
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
