import type { SVGProps } from 'react'
const SvgStar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 48 48' {...props}>
    <path
      fill='url(#star_svg__a)'
      d='M48 33.567a4 4 0 0 1-2.16 3.552l-19.216 9.96a4 4 0 0 1-3.58.05L2.26 37.092A4 4 0 0 1 0 33.49V0h48z'
    />
    <path
      fill='#fff'
      d='M23.099 9.876a1 1 0 0 1 1.802 0l2.914 6.065a1 1 0 0 0 .768.558l6.669.897a1 1 0 0 1 .557 1.715l-4.868 4.645a1 1 0 0 0-.293.903l1.207 6.62a1 1 0 0 1-1.458 1.06l-5.922-3.195a1 1 0 0 0-.95 0l-5.922 3.194a1 1 0 0 1-1.458-1.06l1.207-6.619a1 1 0 0 0-.293-.903l-4.868-4.645a1 1 0 0 1 .557-1.715l6.669-.897a1 1 0 0 0 .768-.558z'
    />
    <defs>
      <linearGradient
        id='star_svg__a'
        x1={0}
        x2={48}
        y1={29.705}
        y2={29.705}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#FF005C' />
        <stop offset={1} stopColor='#FB5299' />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgStar
