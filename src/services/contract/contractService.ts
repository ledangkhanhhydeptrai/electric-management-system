import { fetchBaseResponse } from "@/config/api.config";

export const getAllContract = async () => {
  try {
    const response = await fetchBaseResponse(`/contracts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "All contracts retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const getContractById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/contracts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Contract retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export interface ItemExtra {
  itemName: string;
  qty: number;
  unitPrice: number;
}
export type PaymentMethod = "CASH" | "TRANSFER" | "CARD" | "FINANCING";

export interface ItemProps {
  orderId: string;
  buyerId: string;
  vehicleId: string;
  paymentMethod: PaymentMethod;
  deposit: number;
  discount: number;
  vat: number;
  extraItems: ItemExtra[];
  notes: string;
}
export const createContractModal = async ({
  orderId,
  buyerId,
  vehicleId,
  paymentMethod,
  deposit,
  discount,
  vat,
  extraItems,
  notes
}: ItemProps) => {
  try {
    const response = await fetchBaseResponse(`/contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        orderId,
        buyerId,
        vehicleId,
        paymentMethod,
        deposit,
        discount,
        vat,
        extraItems,
        notes
      }
    });
    if (response.message === "Contract created successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export type SignaturePayload = {
  type: string;
  value: string;
};
export interface SignContract {
  contractId?: string;
  signerRole: string;
  signerName: string;
  signerIdNo: string;
  signaturePayload: SignaturePayload;
}
export const SignatureContract = async (
  id: string,
  { signerRole, signerName, signerIdNo, signaturePayload }: SignContract
) => {
  try {
    const response = await fetchBaseResponse(`/contracts/${id}/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: {
        signerRole,
        signerName,
        signerIdNo,
        signaturePayload
      }
    });
    if (response.message === "Contract signed successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const handleDownloadFile = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/contracts/${id}/pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "PDF generated successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const handleCancelContract = async (id: string, reason: string) => {
  try {
    const response = await fetchBaseResponse(
      `/contracts/${id}/cancel?reason=${encodeURIComponent(reason)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        data: { reason }
      }
    );
    if (response.message === "Contract cancelled successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
