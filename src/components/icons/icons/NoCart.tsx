import type { SVGProps } from 'react'
const SvgNoCart = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 128 128' {...props}>
    <g fill='#98A2B3' clipPath='url(#no_cart_svg__a)'>
      <path d='M58.832 45.168a4.006 4.006 0 0 0-5.664 5.664L62.344 60l-9.176 9.168a4.005 4.005 0 0 0 5.664 5.664L68 65.656l9.168 9.176a4.005 4.005 0 1 0 5.664-5.664L73.656 60l9.176-9.168a4.005 4.005 0 1 0-5.664-5.664L68 54.344z' />
      <path d='M4 8a4 4 0 0 0 0 8h8.88l3.208 12.856 11.984 63.88A4 4 0 0 0 32 96h8a16 16 0 1 0 0 32.002A16 16 0 0 0 40 96h56a16 16 0 1 0 0 32.002A16 16 0 0 0 96 96h8a4 4 0 0 0 3.928-3.264l12-64a4 4 0 0 0-.853-3.29A4 4 0 0 0 116 24H23.12l-3.24-12.968A4 4 0 0 0 16 8zm31.32 80L24.816 32h86.368L100.68 88zM48 112a8 8 0 1 1-16 0 8 8 0 0 1 16 0m56 0a8 8 0 1 1-16 0 8 8 0 0 1 16 0' />
    </g>
    <defs>
      <clipPath id='no_cart_svg__a'>
        <path fill='#fff' d='M0 0h128v128H0z' />
      </clipPath>
    </defs>
  </svg>
)
export default SvgNoCart
