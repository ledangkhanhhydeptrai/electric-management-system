import {
  CustomerCreate,
  CustomerUpdate
} from "@/app/evm/admin/customer/types/customer";
import { fetchBaseResponse } from "@/config/api.config";

export const createCustomer = async ({
  fullName,
  email,
  phone,
  address,
  dob,
  customerType
}: CustomerCreate) => {
  try {
    const response = await fetchBaseResponse(`/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      data: { fullName, email, phone, address, dob, customerType }
    });
    if (response.message === "Customer created successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
export const getCustomerById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/customers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Customer retrieved successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const updateCustomerById = async (id: string, data: CustomerUpdate) => {
  try {
    const response = await fetchBaseResponse(`/customers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    });
    if (response.message === "Customer updated successfully") {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const DeleteCustomerById = async (id: string) => {
  try {
    const response = await fetchBaseResponse(`/customers/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (response.message === "Customer deleted successfully") {
      return true;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const searchFilterCustomer = async ({
  type,
  fullName,
  email,
  phone
}: {
  type?: string;
  fullName?: string;
  email?: string;
  phone?: string;
}) => {
  try {
    const response = await fetchBaseResponse(`/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
      params: {
        type,
        fullName,
        email,
        phone
      }
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
