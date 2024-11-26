import type { SVGProps } from 'react'

const SvgDate = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' {...props}>
    <path
      stroke='#667085'
      strokeLinecap='square'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M13 7H3'
    />
    <path
      stroke='#667085'
      strokeLinecap='square'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M11 4h2v9H3V4h2'
    />
    <path
      stroke='#667085'
      strokeLinecap='square'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M6.214 4h3.572'
    />
    <path
      stroke='#667085'
      strokeLinecap='square'
      strokeLinejoin='round'
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d='M10.5 3v2zM5.5 3v2z'
    />
  </svg>
)
export default SvgDate
