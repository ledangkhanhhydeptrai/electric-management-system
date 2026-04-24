// app/actions/dealerActions.ts
"use server";

import { revalidatePath } from 'next/cache';

export async function addDealer(formData: FormData) {
  const dealerName = formData.get("dealerName") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;

  // Giả lập lưu dữ liệu vào cơ sở dữ liệu
  console.log("Thông tin đại lý mới:", { dealerName, email, phone, address });

  // Trong ứng dụng thực tế, bạn sẽ tương tác với cơ sở dữ liệu tại đây.
  // Ví dụ: await db.dealer.create({ data: { dealerName, email, phone, address } });

  // Cập nhật lại cache nếu cần (ví dụ: để hiển thị danh sách đại lý mới)
  revalidatePath('/dealers'); // Giả sử có trang hiển thị danh sách đại lý

  return { success: true, message: "Đăng ký đại lý thành công!" };
}