import React, { useState } from 'react'

interface ViewMoreTextProps {
  text: string
}

const ViewMoreText: React.FC<ViewMoreTextProps> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleView = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-end transition-all duration-300 p-4 ${
        isExpanded ? 'h-full' : 'h-1/2'
      }`}
    >
      <p
        className={`text-white text-sm overflow-hidden transition-all ${
          isExpanded ? 'line-clamp-none' : 'line-clamp-3'
        }`}
      >
        {text}
      </p>
      <button onClick={toggleView} className='mt-2 text-white font-semibold underline self-start'>
        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
      </button>
    </div>
  )
}

export default ViewMoreText
