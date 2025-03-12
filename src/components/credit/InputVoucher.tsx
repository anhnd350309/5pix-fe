'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

const InputVoucher = (props: {
  onSubmit(voucher: string): Promise<{
    isValid: boolean
    message?: string | null
  }>
  setPriceRule: any
  setDiscount: any
}) => {
  const [text, setText] = useState('')
  const [err, setErr] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const onSubmit = async () => {
    const res = await props.onSubmit(text)
    if (res.isValid === true) {
      // setText('');
      setErr('')
      setIsSuccess(true)
    } else {
      setErr(res.message || 'Voucher không hợp lệ')
      setIsSuccess(false)
    }
  }
  return (
    <div>
      <div className='flex focus-within:outline outline-primary-300 rounded-md overflow-hidden'>
        <div className='flex-1 relative'>
          <input
            type='text'
            className='w-full h-full bg-transparent  px-3 outline-none border border-r-none rounded-l-md'
            placeholder={'Nhập mã khuyến mại'}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {text && (
            <div className='absolute right-0 top-0 bottom-0 flex justify-center items-center'>
              <button
                className='btn-sm'
                type='button'
                onClick={(e) => {
                  e.preventDefault()
                  setText('')
                  setErr('')
                  props.setPriceRule(null)
                  props.setDiscount(0)
                  setIsSuccess(false)
                }}
              ></button>
            </div>
          )}
        </div>

        <Button
          className='rounded-none btn-xs whitespace-nowrap'
          disabled={!text}
          onClick={onSubmit}
        >
          {'Áp dụng'}
        </Button>
      </div>
      {err && <p className='text-xs italic text-red-500 mt-2'>{err}</p>}
      {isSuccess && <p className='text-xs italic text-green-500'>{'Áp dụng voucher thành công'}</p>}
    </div>
  )
}

export default InputVoucher
