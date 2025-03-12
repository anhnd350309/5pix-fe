export enum PaymentMethod {
  VNPay = 'vnpay',
  VNPAY_QR = 'VNPAYQR',
  OnePay = 'onepay',
  Momo = 'momo',
  Zalo = 'zalo',
  Bank = 'bank',
  VN_BANK = 'VNBANK',
  INT_CARD = 'INTCARD',
  QR_CODE = 'QR_CODE',

  PAYX_DOMESTIC_CARD = 'domestic_card',
  PAYX_QR = 'payx_qr',
  Unknown = 'unknown',
}

export const paymentOptions = [
  {
    id: PaymentMethod.VNPAY_QR,
    name: 'Quét QR chuyển khoản ngân hàng',
    sub_label: 'Scan the QR code from your bank or e-wallet',
    salePrice: 200000,
    logoPath: '/assets/images/vnpay.png',
    disabled: false,
    key: 'VNPAY_QR',
  },
  {
    id: PaymentMethod.VN_BANK,
    name: 'Thẻ ATM nội địa',
    sub_label: 'Vietnamese domestic payment card (NAPAS)',
    salePrice: 200000,
    logoPath: '/assets/images/napas.png',
    disabled: false,
    key: 'VNPAY_DOMESTIC_CARD',
  },
  {
    id: PaymentMethod.INT_CARD,
    name: 'Thẻ tín dụng/Thẻ ghi nợ',
    sub_label: 'Vietnamese International payment card',
    salePrice: 200000,
    logoPath: '/assets/images/visa.png',
    disabled: false,
    // sub_icon: '/icons/payment/multiple_payment_method.svg',
    key: 'VNPAY_INTERNATIONAL_CARD',
  },

  {
    id: PaymentMethod.OnePay,
    name: 'Thẻ tín dụng/ghi nợ phát hành ngoài lãnh thổ Việt Nam',
    sub_label: 'All Region International payment card',
    salePrice: 200000,
    logoPath: '/assets/images/onepay.png',
    disabled: false,
    // sub_icon: '/icons/payment/multiple_payment_method.svg',
    key: 'ONEPAY_INTERNATIONAL_CARD',
  },
  {
    id: PaymentMethod.PAYX_QR,
    name: 'Quét QR chuyển khoản ngân hàng - PayX QR',
    sub_label: 'Scan the QR code from your bank or e-wallet',
    salePrice: 200000,
    logoPath: '/assets/images/payx.png',
    disabled: false,
    key: 'PAYX_QR',
  },
  {
    id: PaymentMethod.PAYX_DOMESTIC_CARD,
    name: 'PayX thẻ ATM nội địa',
    sub_label: 'Vietnamese domestic payment card',
    salePrice: 200000,
    logoPath: '/assets/images/payx.png',
    disabled: false,
    key: 'PAYX_DOMESTIC_CARD',
  },
]

export const devPaymentOptions = [
  {
    id: PaymentMethod.VNPAY_QR,
    name: 'Quét QR chuyển khoản ngân hàng',
    sub_label: 'Scan the QR code from your bank or e-wallet',
    salePrice: 200000,
    logoPath: '/assets/images/payx.png',
    disabled: false,
    key: 'VNPAY_QR',
  },
  {
    id: PaymentMethod.VN_BANK,
    name: 'Thẻ ATM nội địa',
    sub_label: 'Vietnamese domestic payment card (NAPAS)',
    salePrice: 200000,
    logoPath: '/assets/images/payx.png',
    disabled: false,
    key: 'VNPAY_DOMESTIC_CARD',
  },
  {
    id: PaymentMethod.INT_CARD,
    name: 'Thẻ tín dụng/Thẻ ghi nợ',
    sub_label: 'Vietnamese International payment card',
    salePrice: 200000,
    logoPath: '/icons/payment/visa.svg',
    disabled: false,
    sub_icon: '/icons/payment/multiple_payment_method.svg',
    key: 'VNPAY_INTERNATIONAL_CARD',
  },

  {
    id: PaymentMethod.OnePay,
    name: 'Thẻ tín dụng/ghi nợ phát hành ngoài lãnh thổ Việt Nam',
    sub_label: 'All Region International payment card',
    salePrice: 200000,
    logoPath: '/icons/payment/onepay.svg',
    disabled: false,
    sub_icon: '/icons/payment/multiple_payment_method.svg',
    key: 'ONEPAY_INTERNATIONAL_CARD',
  },
]
export const qrOptions = [
  {
    id: PaymentMethod.QR_CODE,
    name: 'Quét QR chuyển khoản cho ban tổ chức',
    sub_label: 'Scan the QR code from your bank or e-wallet',
    salePrice: 200000,
    // logoPath: '/icons/payment/vnpay_qr.svg',
    disabled: false,
  },
] as typeof paymentOptions

export enum CheckoutType {
  DEFAULT = 'DEFAULT',
  ENTERPRISE_GROUP_BUY = 'ENTERPRISE_GROUP_BUY', // mua nhóm doanh nghiệp
}
