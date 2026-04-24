export interface CustomerVIP {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string;
  customerType: "INDIVIDUAL" | "COMPANY";
  createdAt: string;
  lastModifiedAt: string;
}
export type EnumCustomer = "INDIVIDUAL" | "COMPANY";
export interface CustomerCreate {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string | null;
  customerType: EnumCustomer;
}
export interface CustomerUpdate {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  dob: string | null;
  customerType: EnumCustomer;
}
