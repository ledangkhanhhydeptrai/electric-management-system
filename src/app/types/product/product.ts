export const products = [
  {
    id: 1,
    model: "EVM-X1",
    version: "Standard",
    color: "Trắng",
    stock: 150,
    allocated: 120,
    available: 30,
    wholesalePrice: 450000000,
    status: "Còn hàng",
    image: "🚗"
  },
  {
    id: 2,
    model: "EVM-X1",
    version: "Premium",
    color: "Đen",
    stock: 85,
    allocated: 65,
    available: 20,
    wholesalePrice: 520000000,
    status: "Còn hàng",
    image: "🚙"
  },
  {
    id: 3,
    model: "EVM-S2",
    version: "Standard",
    color: "Xanh",
    stock: 45,
    allocated: 40,
    available: 5,
    wholesalePrice: 380000000,
    status: "Sắp hết",
    image: "🚗"
  },
  {
    id: 4,
    model: "EVM-S2",
    version: "Deluxe",
    color: "Đỏ",
    stock: 120,
    allocated: 90,
    available: 30,
    wholesalePrice: 430000000,
    status: "Còn hàng",
    image: "🚙"
  },
  {
    id: 5,
    model: "EVM-Pro",
    version: "Luxury",
    color: "Bạc",
    stock: 60,
    allocated: 55,
    available: 5,
    wholesalePrice: 680000000,
    status: "Sắp hết",
    image: "🏎️"
  }
];
export interface ProductItem {
  id: number;
  model: string;
  version: string;
  color: string;
  available: number;
}
