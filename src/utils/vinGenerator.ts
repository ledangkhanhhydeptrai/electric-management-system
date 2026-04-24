import { Models } from "@/services/vehicleModel/vehicle";

/**
 * Sinh VIN cho một modelId dựa trên dữ liệu model từ backend.
 * Nếu modelId không tồn tại, fallback dùng prefix "VF0".
 * 
 * @param modelId ID của model cần sinh VIN
 * @param models Danh sách model từ backend
 * @returns VIN đầy đủ 17 ký tự
 */
export function generateVinForModel(modelId: string, models: Models[]) {
  // Ký tự hợp lệ cho phần random của VIN
  const chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

  // Tìm model theo ID
  const model = models.find(m => m.id === modelId);

  // Nếu model không tồn tại, fallback prefix "VF0"
  let prefix: string;
  if (model) {
    prefix = model.name.toUpperCase(); // chắc chắn model tồn tại
  } else {
    console.warn(`ModelId ${modelId} không tìm thấy, dùng VF0 làm prefix`);
    prefix = "VF0";
  }

  // Phần còn lại để đủ 17 ký tự
  const remaining = 17 - prefix.length;

  let randomPart = "";
  for (let i = 0; i < remaining; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  return (prefix + randomPart).toUpperCase();
}
