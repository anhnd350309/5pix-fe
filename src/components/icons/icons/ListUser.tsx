import type { SVGProps } from 'react'
const SvgListUser = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' {...props}>
    <path
      stroke='#344054'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M9.5 14c-5.625 0-7.344 4-7.5 6h15c-.156-2-1.875-6-7.5-6'
    />
    <circle cx={9.5} cy={7.5} r={3.5} stroke='#344054' strokeWidth={1.5} />
    <path
      stroke='#344054'
      strokeLinecap='round'
      strokeWidth={1.5}
      d='M16.853 10.915a2.5 2.5 0 1 0-.194-4.77'
    />
    <path
      stroke='#344054'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M19.912 20H23c-.132-1.745-1.352-4.925-5-6'
    />
  </svg>
)
export default SvgListUser
