import React, { useState } from 'react';

const ExpandableText = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`text-white text-xs transition-all duration-300 ${
          isExpanded ? 'overflow-visible' : 'overflow-hidden text-ellipsis whitespace-nowrap'
        }`}
        style={{ maxHeight: isExpanded ? 'none' : '1.5rem' }}
      >
        {text}
      </div>
      <button
        className="text-white mt-1 w-full text-xs underline"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Giảm đi' : 'Xem đầy đủ'}
      </button>
    </div>
  );
};

export default ExpandableText;
