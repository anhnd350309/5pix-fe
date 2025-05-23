import type { SVGProps } from 'react'
const SvgRevenue = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 48 49' {...props}>
    <rect width={48} height={48} y={0.66} fill='#ECFDF3' rx={24} />
    <path
      fill='url(#revenue_svg__a)'
      d='M24.005 28h.07c1.5.04 2.7 1.26 2.7 2.76 0 1.28-.87 2.35-2.05 2.67v1.12c0 .4-.32.72-.72.72s-.72-.32-.72-.72v-1.12a2.77 2.77 0 0 1-2.05-2.67c0-.4.32-.72.72-.72s.72.32.72.72c0 .74.59 1.33 1.32 1.33s1.33-.6 1.33-1.33-.6-1.33-1.33-1.33h-.07a2.766 2.766 0 0 1-2.69-2.76c0-1.28.87-2.35 2.05-2.67v-1.12c0-.4.32-.72.72-.72s.72.32.72.72V24c1.18.32 2.05 1.39 2.05 2.67 0 .4-.32.72-.72.72s-.72-.32-.72-.72c0-.73-.6-1.33-1.33-1.33s-1.33.6-1.33 1.33.6 1.33 1.33 1.33'
    />
    <path
      fill='url(#revenue_svg__b)'
      d='m18.697 13.755 2.786 3.26-.301.336c-5.734 1.286-10.017 6.407-10.017 12.529 0 5.382 4.368 9.75 9.75 9.75h6.17c5.382 0 9.75-4.367 9.75-9.749.01-6.123-4.273-11.244-10.007-12.53a1.1 1.1 0 0 0-.11-.615l2.37-2.713.153-.236a1.956 1.956 0 0 0-2.892-2.423l-.843-1a2.02 2.02 0 0 0-3.008-.005l-.883.986a1.96 1.96 0 0 0-2.918 2.41m3.799 1.385L20.8 13.18a1.98 1.98 0 0 0 2.365-.5l.8-1.038.888 1.052a1.97 1.97 0 0 0 2.3.513l-1.688 1.933zm-9.331 14.74c0-5.988 4.852-10.84 10.84-10.84s10.84 4.852 10.83 10.838v.002a7.753 7.753 0 0 1-7.75 7.75h-6.17a7.753 7.753 0 0 1-7.75-7.75'
    />
    <defs>
      <linearGradient
        id='revenue_svg__a'
        x1={24.005}
        x2={24.005}
        y1={22.16}
        y2={35.27}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#039855' />
        <stop offset={1} stopColor='#12B76A' />
      </linearGradient>
      <linearGradient
        id='revenue_svg__b'
        x1={24}
        x2={24}
        y1={9.69}
        y2={39.63}
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#039855' />
        <stop offset={1} stopColor='#12B76A' />
      </linearGradient>
    </defs>
  </svg>
)
export default SvgRevenue
