import type { SVGProps } from 'react'

const SvgUser = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='user_svg__icon user_svg__flat-color'
    data-name='Flat Color'
    viewBox='0 0 24 24'
    {...props}
  >
    <path
      d='M21 20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2 6 6 0 0 1 6-6h6a6 6 0 0 1 6 6m-9-8a5 5 0 1 0-5-5 5 5 0 0 0 5 5'
      style={{
        fill: '#000',
      }}
    />
  </svg>
)
export default SvgUser
