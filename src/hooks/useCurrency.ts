import { useCallback, useMemo } from 'react'
export default function useCurrency(currency?: string, locale = 'vn-VI') {
  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        // style: 'digit',
        currency: 'VND',
        // currencyDisplay: 'code',
        // currencySign: 'accounting'
      }),
    [locale],
  )
  const formatter = useCallback(
    (number: number) => {
      const parts = numberFormat.formatToParts(number)
      currency && parts.push({ type: 'currency', value: currency })
      return parts.map((part) => part.value).join('')
      // return numberFormat.format(number);
    },
    [numberFormat, currency],
  )
  return formatter
}
export function formatCurrency(price: number, currency = 'đ') {
  return new Intl.NumberFormat('vn-VI', {
    currency: 'VND',
  })
    .formatToParts(price)
    .concat({ type: 'currency', value: currency })
    .map((part) => part.value)
    .join('')
}
