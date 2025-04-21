export const merchantTypeMapping: { [key: string]: string } = {
  business: 'Doanh nghiệp',
  individual: 'Cá nhân',
}

export const statusMapping: { [key: string]: { text: string; color: string } } = {
  approved: { text: 'Đang hoạt động', color: 'green' },
  waiting_for_approve: { text: 'Chờ duyệt', color: 'yellow' },
  rejected: { text: 'Vô hiệu', color: 'red' },
}
