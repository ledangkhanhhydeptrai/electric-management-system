import { Account, UpdateAccountDTO } from "@/app/types/Account/Account";
import { fetchBaseResponse } from "@/config/api.config";

export async function accountService(): Promise<Account[]> {
  try {
    const response = await fetchBaseResponse(`/accounts`, {
      method: "GET"
    });
    return response.success === true ? (response.data as Account[]) : [];
  } catch (error) {
    console.error("Fetch account failed:", error);
    return [];
  }
}

export async function AccountServiceDetail(
  id: string
): Promise<Account | null> {
  try {
    const response = await fetchBaseResponse(`/accounts/${id}`, {
      method: "GET"
    });
    return response.success === true ? (response.data as Account) : null;
  } catch (error) {
    console.error("Fetch account failed:", error);
    return null;
  }
}

export async function UpdateService(id: string, payload: UpdateAccountDTO) {
  try {
    const response = await fetchBaseResponse(`/accounts/${id}`, {
      method: "PUT",
      data: payload // ❌ Không cần JSON.stringify nữa — Axios tự stringify khi Content-Type là JSON
    });
    if (response.message === "Account updated successfully") {
      return {
        success: true,
        data: response.data
      };
    }
  } catch (error) {
    console.error("❌ UpdateService Error:", error);
    return null;
  }
}
