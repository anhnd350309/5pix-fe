import type { SVGProps } from 'react'
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 49 49' {...props}>
    <rect width={48} height={48} x={0.5} y={0.66} fill='#EDF4FF' rx={24} />
    <path
      fill='#2563EB'
      d='M14.048 36.66v-17.2L11.5 13.793l2.352-1.133 3.07 6.733h15.156l3.07-6.733 2.352 1.133-2.548 5.667v17.2zm7.839-9.333h5.226q.555 0 .932-.384.375-.384.375-.95a1.3 1.3 0 0 0-.377-.949 1.25 1.25 0 0 0-.93-.384h-5.226q-.555 0-.93.384a1.3 1.3 0 0 0-.377.95q0 .564.377.95t.93.383m-5.226 6.666h15.678V22.06H16.661z'
    />
  </svg>
)
export default SvgCart
