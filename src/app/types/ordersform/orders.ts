export const orders = [
  {
    id: "DH001",
    dealerName: "Showroom Quận 1",
    vehicles: [
      {
        model: "Tesla Model 3 Standard Range",
        quantity: 5,
        unitPrice: "850,000,000",
        color: "Trắng Pearl"
      },
      {
        model: "Tesla Model Y Long Range",
        quantity: 2,
        unitPrice: "1,450,000,000",
        color: "Đỏ Cherry"
      }
    ],
    totalAmount: "7,150,000,000",
    orderDate: "2024-09-20",
    expectedDelivery: "2024-11-15",
    status: "Đã duyệt",
    priority: "Cao",
    notes: "Cần giao trước ngày khai trương showroom mới",
    customerDemand: "Khách hàng đặt trước 3 xe Model 3"
  },
  {
    id: "DH002",
    dealerName: "Showroom Bình Thạnh",
    vehicles: [
      {
        model: "VinFast VF8 Plus",
        quantity: 8,
        unitPrice: "1,200,000,000",
        color: "Xanh đại dương"
      },
      {
        model: "VinFast VF9 Premium",
        quantity: 3,
        unitPrice: "1,550,000,000",
        color: "Đen metallic"
      }
    ],
    totalAmount: "14,250,000,000",
    orderDate: "2024-09-24",
    expectedDelivery: "2024-12-10",
    status: "Chờ duyệt",
    priority: "Trung bình",
    notes: "Đơn hàng theo kế hoạch quý 4",
    customerDemand: "Nhu cầu tăng cao cho VF8 trong khu vực"
  },
  {
    id: "DH003",
    dealerName: "Showroom Thủ Đức",
    vehicles: [
      {
        model: "BYD Tang 7 chỗ",
        quantity: 6,
        unitPrice: "950,000,000",
        color: "Xám titanium"
      }
    ],
    totalAmount: "5,700,000,000",
    orderDate: "2024-09-18",
    expectedDelivery: "2024-10-30",
    status: "Đang giao",
    priority: "Cao",
    notes: "Giao một phần: 3 xe đã giao, còn lại 3 xe",
    customerDemand: "Gia đình có con nhỏ ưa chuộng xe 7 chỗ"
  },
  {
    id: "DH004",
    dealerName: "Showroom Quận 7",
    vehicles: [
      {
        model: "Tesla Model 3 Long Range",
        quantity: 4,
        unitPrice: "950,000,000",
        color: "Xanh midnight"
      },
      {
        model: "BYD Tang 7 chỗ",
        quantity: 2,
        unitPrice: "950,000,000",
        color: "Trắng Pearl"
      }
    ],
    totalAmount: "5,700,000,000",
    orderDate: "2024-09-25",
    expectedDelivery: "2024-11-20",
    status: "Nháp",
    priority: "Thấp",
    notes: "Đang xem xét nhu cầu thị trường",
    customerDemand: "Khách hàng trẻ quan tâm xe thể thao"
  }
];
