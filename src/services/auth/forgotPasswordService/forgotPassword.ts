import { fetchBaseResponse } from "@/config/api.config";

export const forgotPassword = async (
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  try {
    const res = await fetchBaseResponse("/accounts/password", {
      method: "PUT",
      data: { oldPassword, newPassword, confirmNewPassword }
    });
    return {
      success: true,
      message: res.message || "Đổi mật khẩu thành công"
    };
  } catch (error: unknown) {
    let errMessage = "Lỗi mạng - không thể đổi mật khẩu";

    type ErrorWithMessage = { message?: string; data?: { message?: string } };

    if (typeof error === "object" && error !== null) {
      const errObj = error as ErrorWithMessage;
      if ("message" in errObj && typeof errObj.message === "string") {
        errMessage = errObj.message;
      } else if (
        "data" in errObj &&
        typeof errObj.data === "object" &&
        errObj.data !== null &&
        "message" in errObj.data
      ) {
        errMessage = errObj.data.message ?? errMessage;
      }
    }
    throw new Error(errMessage);
  }
};
