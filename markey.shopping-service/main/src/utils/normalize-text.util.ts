import removeAccents from 'remove-accents';

export function normalizeTextUtil(text: string): string {
  // Loại bỏ dấu, chuyển thành chữ thường và loại bỏ khoảng trắng thừa, dấu câu
  return removeAccents(text)
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, '') // Xóa tất cả các ký tự không phải chữ cái và số
    .trim();
}
