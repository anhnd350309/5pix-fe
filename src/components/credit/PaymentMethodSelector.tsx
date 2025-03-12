// constance
import { PaymentMethod, paymentOptions, qrOptions } from '@/constants/payment'
import { useFormContext } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import { Title } from '../common/Title'
import SvgCheckOut from '../icons/icons/CheckOut'

const targetPaymentOptions = paymentOptions
export const PaymentMethodSelector = ({
  acqInfo,
  validMethods,
  containerClass = '',
}: {
  acqInfo?: string | null
  validMethods?: string | null
  containerClass?: string
}) => {
  const methods = useFormContext()
  // const t = useTranslations('GroupCheckoutPage')
  const [finalPaymentOptions, setFinalPaymentOptions] = useState(targetPaymentOptions)

  useEffect(() => {
    if (acqInfo) {
      setFinalPaymentOptions(qrOptions)
    } else if (validMethods) {
      const _validMethods = JSON.parse(validMethods)
      const filteredPaymentOptions = targetPaymentOptions.filter((option) =>
        _validMethods.includes(option.key),
      )
      setFinalPaymentOptions(filteredPaymentOptions)
    }
  }, [acqInfo, validMethods])

  return (
    <div className={`rounded-md px-6 shadow-md bg-white ${containerClass}`}>
      <Title icon={<SvgCheckOut width={28} />} title={'Chọn phương thức thanh toán'} />
      <div className='divide-y divide-neutral-200 mt-3 flex flex-col item-center justify-center pb-3'>
        {finalPaymentOptions.map((option) => {
          return (
            <div key={option.name}>
              <div className='' key={option.name}>
                <label className='flex items-center relative py-3 hover:cursor-pointer'>
                  <input
                    type='radio'
                    className='peer mr-4 disabled:opacity-100'
                    value={option.id}
                    // {...methods.register('method')}
                  />
                  <div className='flex-1 mr-3 flex flex-col'>
                    <p className='text-base font-medium'>{option.name}</p>
                    {option?.sub_label && (
                      <p className='font-inter text-xs text-[#475467]'>{option?.sub_label}</p>
                    )}
                    {/* {option?.sub_icon && (
                      <img src={option?.sub_icon} alt='sub_payment' className='w-20 h-5' />
                    )} */}
                  </div>
                  <div>
                    {option?.logoPath && (
                      <img
                        src={option.logoPath}
                        className={`${
                          option.id === PaymentMethod.OnePay
                            ? 'w-[48px] h-[22px]'
                            : option.id === PaymentMethod.VNPAY_QR
                              ? 'w-20 h-14'
                              : option.id === PaymentMethod.PAYX_DOMESTIC_CARD ||
                                  option.id === PaymentMethod.PAYX_QR
                                ? 'w-[48px] h-[38px]'
                                : 'w-12 h-12'
                        }`}
                        alt={option.name}
                      />
                    )}
                  </div>
                </label>
              </div>
            </div>
          )
        })}
        {/* <ErrorMessage
          errors={methods.formState.errors}
          name={'method'}
          render={({ message }) => (
            <p className='text-xs text-red-500 italic pt-4'>Vui lòng chọn phương thức thanh toán</p>
          )}
        /> */}
      </div>
    </div>
  )
}
