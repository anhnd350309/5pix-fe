import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

export function normalizeString(str: string): string {
  return str
    .normalize('NFD') // Tách ký tự có dấu
    .replace(/[\u0300-\u036f]/g, '') // Xóa các dấu sau khi tách
    .replace(/đ/g, 'd') // Xử lý riêng ký tự "đ"
    .replace(/Đ/g, 'D')
    .toLowerCase() // Chuyển thành chữ thường
    .replace(/[^a-z0-9-]/g, '-') // Thay các ký tự không hợp lệ thành "-"
    .replace(/-+/g, '-') // Gộp nhiều dấu "-" liên tiếp thành 1
    .replace(/^-|-$/g, '') // Xóa dấu "-" ở đầu/cuối nếu có
}
