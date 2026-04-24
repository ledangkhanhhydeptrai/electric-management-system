export const payments = [
  {
    id: 1,
    orderId: "DH-001",
    customer: "Nguyễn Văn A",
    amount: "1,200,000,000",
    method: "Trả thẳng",
    status: "Hoàn thành",
    installments: null
  },
  {
    id: 2,
    orderId: "DH-002",
    customer: "Trần Thị B",
    amount: "1,080,000,000",
    method: "Trả góp 24 tháng",
    status: "Đang trả góp",
    installments: { paid: 8, total: 24 }
  },
  {
    id: 3,
    orderId: "DH-003",
    customer: "Lê Văn C",
    amount: "2,199,000,000",
    method: "Trả góp 36 tháng",
    status: "Chờ duyệt",
    installments: { paid: 0, total: 36 }
  }
];
