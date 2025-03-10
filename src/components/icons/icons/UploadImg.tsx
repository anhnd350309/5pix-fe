import type { SVGProps } from 'react'
const SvgUploadImg = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 40 40' {...props}>
    <rect width={39} height={39} x={0.5} y={0.5} stroke='#98A2B3' rx={7.5} />
    <path
      stroke='#344054'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='M30 8H10a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2'
    />
    <path
      stroke='#344054'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={2}
      d='m32 28.333-7.333-6.666-6.667 6-4.667-4-5.333 4m8-8A3.333 3.333 0 1 0 16 13a3.333 3.333 0 0 0 0 6.667'
    />
    <rect width={14} height={14} x={22} y={5} fill='#2563EB' rx={7} />
    <path
      fill='#fff'
      d='M27.925 16h2.146c.295 0 .537-.286.537-.635v-3.177h.853c.478 0 .72-.686.381-1.086L29.38 8.186a.5.5 0 0 0-.174-.138.46.46 0 0 0-.41 0 .5.5 0 0 0-.173.138l-2.463 2.916c-.338.4-.102 1.086.376 1.086h.853v3.177c0 .35.241.635.537.635'
    />
  </svg>
)
export default SvgUploadImg
