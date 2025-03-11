import type { SVGProps } from 'react'
const SvgSearch = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 16' {...props}>
    <path
      stroke='#fff'
      strokeLinecap='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='m14.5 14-2.666-2.667'
    />
    <path
      stroke='#fff'
      strokeLinecap='square'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M7.833 12.667A5.333 5.333 0 1 0 7.833 2a5.333 5.333 0 0 0 0 10.667Z'
    />
  </svg>
)
export default SvgSearch
