export const merchantTypeMapping: { [key: string]: string } = {
  business: 'Doanh nghiệp',
  individual: 'Cá nhân',
}

export const statusMapping: { [key: string]: { text: string; color: string } } = {
  approved: { text: 'Đang hoạt động', color: 'green' },
  waiting_for_approve: { text: 'Chờ duyệt', color: 'yellow' },
  rejected: { text: 'Vô hiệu', color: 'red' },
}
export const albumMapping: { [key: string]: { text: string; color: string } } = {
  approved: { text: 'Đã duyệt', color: '#32D583' },
  waiting_for_approve: { text: 'Chờ duyệt', color: '#FEC84B' },
  draft: { text: 'Bản nháp', color: 'red' },
}

export const statusOrderMapping: { [key: string]: { text: string; color: string } } = {
  NEW: { text: 'Mới', color: 'blue' },
  WAIT_FOR_PAYMENT: { text: 'Chờ thanh toán', color: 'yellow' },
  PROCESSING: { text: 'Đang xử lý', color: 'orange' },
  PAY_GATE_FAIL: { text: 'Thanh toán lỗi', color: 'red' },
  COMPLETE: { text: 'Hoàn thành', color: 'green' },
  CANCELLED: { text: 'Đã hủy', color: 'red' },
}
