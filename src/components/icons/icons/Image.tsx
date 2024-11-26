import type { SVGProps } from 'react'

const SvgImage = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16' {...props}>
    <path
      stroke='#667085'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth={1.5}
      d='M13.553 11.771a2.7 2.7 0 0 0 .114-.771V5A2.667 2.667 0 0 0 11 2.333H5A2.667 2.667 0 0 0 2.333 5v6.047A2.667 2.667 0 0 0 5 13.667h6l.078-.002m2.475-1.894-.058-.07-1.644-1.983a1.334 1.334 0 0 0-2.05-.005l-.874 1.044-.142.174m4.768.84a2.67 2.67 0 0 1-2.475 1.894m-2.293-2.734 2.23 2.664.063.07m-2.293-2.734L6.633 8.36a1.333 1.333 0 0 0-2.044 0l-2.137 2.552-.118.134'
    />
    <path fill='#667085' d='M10.06 6.94a1 1 0 1 0 0-2 1 1 0 0 0 0 2' />
  </svg>
)
export default SvgImage
