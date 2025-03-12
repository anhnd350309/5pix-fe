import { FC } from 'react'
type TitleProps = {
  title?: string
  icon?: JSX.Element
  containerClassName?: string
  titleClassName?: string
}
export const Title: FC<TitleProps> = ({ title, icon, containerClassName, titleClassName }) => {
  return (
    <div
      className={`space-x-2 flex flex-row items-center py-2 border-b border-b-[#D0D5DD] ${containerClassName}`}
    >
      {icon}
      <div className={`text-base font-bold text-['#1D2939'] ${titleClassName}`}>{title}</div>
    </div>
  )
}
