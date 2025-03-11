import type { SVGProps } from 'react'
const SvgCredit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 44 45' {...props}>
    <rect width={44} height={44} y={0.66} fill='#FFF1F3' rx={22} />
    <path
      stroke='#F30C60'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M9 14.86a5.2 5.2 0 0 1 5.2-5.2h15.6a5.2 5.2 0 0 1 5.2 5.2v15.6a5.2 5.2 0 0 1-5.2 5.2H14.2a5.2 5.2 0 0 1-5.2-5.2z'
    />
    <path
      stroke='#F30C60'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M17.45 21.36a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5M25.284 23.468 14.2 35.66h15.773A5.027 5.027 0 0 0 35 30.633v-.173c0-.606-.227-.838-.637-1.287l-5.239-5.713a2.6 2.6 0 0 0-3.84.008'
    />
  </svg>
)
export default SvgCredit
