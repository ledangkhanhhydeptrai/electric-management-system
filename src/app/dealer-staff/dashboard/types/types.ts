export interface Order {
  id: string;
  name: string;
  car: string;
  price: string;
  status: string;
  color: string;
  icon: React.ReactNode;
}
export interface StatsData {
  title: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  gradient: string;
  trend: string;
}
