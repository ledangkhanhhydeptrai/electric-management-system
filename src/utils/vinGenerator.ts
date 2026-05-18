import { Models } from "@/services/vehicleModel/vehicle";

/**
 * VIN:
 * - đúng 17 ký tự
 * - chỉ chứa A-Z và 0-9
 * - không chứa I, O, Q
 */
export function generateVinForModel(
  modelId: string,
  models: Models[]
) {
  // Bộ ký tự VIN hợp lệ
  const chars = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789";

  // Tìm model
  const model = models.find((m) => m.id === modelId);

  // Lấy tên model hoặc fallback
  const rawPrefix = model?.name || "VF0";

  /**
   * Chuẩn hóa:
   * - uppercase
   * - bỏ ký tự đặc biệt
   * - bỏ khoảng trắng
   * - bỏ I O Q
   */
  let prefix = rawPrefix
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .replace(/[IOQ]/g, "");

  // Không cho prefix vượt quá 10 ký tự
  prefix = prefix.slice(0, 10);

  // Tính phần random còn lại
  const remaining = 17 - prefix.length;

  let randomPart = "";

  for (let i = 0; i < remaining; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  // VIN cuối cùng
  return (prefix + randomPart).slice(0, 17);
}