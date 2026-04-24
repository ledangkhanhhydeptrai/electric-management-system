import { fetchBaseResponse } from "@/config/api.config";
import { ColorEnum } from "../vehicle/vehicle";
export type EnumQuotation =
  | "All"
  | "DRAFT"
  | "SENT"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCEL";
export interface ItemsPropsQuotation {
  modelId: string;
  color: string;
  quantity: number;
  price: number;
}
export interface ItemsQuotation {
  modelId: string;
  modelName: string;
  color: ColorEnum;
  quantity: number;
  price: number;
}
export interface QuotationForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: ItemsPropsQuotation[];
}
export interface Quotation {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  status: EnumQuotation;
  totalAmount: number;
  createdAt: number[];
  items: ItemsQuotation[];
}
export const createQuotation = async ({
  customerName,
  customerPhone,
  customerEmail,
  items
}: QuotationForm) => {
  try {
    const response = await fetchBaseResponse(`/quotation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { customerName, customerPhone, customerEmail, items }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getAllQuotation = async () => {
  try {
    const response = await fetchBaseResponse(`/quotation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getQuotationById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/quotation/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const sendQuotationToCustomer = async (id: string, email: string) => {
  try {
    console.log("➡ Sending quotation", { id, email }); // log input

    const response = await fetchBaseResponse(`/quotation/${id}/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { email }
    });

    console.log("✅ Response received:", response); // log response toàn bộ

    if (response.status === 200) {
      console.log("✔ Quotation sent successfully");
      return response;
    } else {
      console.warn("⚠ Quotation not sent, status:", response.status);
    }
  } catch (error) {
    console.error("❌ Error sending quotation:", error);
    throw error;
  }
};

