interface ToggleSwitchProps {
  onChange?: (value: string) => void
  selected?: string
  options?: { label: string; value: string }[]
}

const ToggleSwitch = ({ onChange, selected, options = [] }: ToggleSwitchProps) => {
  const handleSelect = (value: string) => {
    onChange?.(value)
  }

  return (
    <div className='inline-flex bg-[#F2F4F7] rounded-[100px] w-fit border border-gray-400'>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`flex items-center gap-2 px-3 py-2 text-xs md:px-4 md:py-2 md:text-sm font-medium rounded-[100px] transition-all duration-200 min-w-[120px] md:min-w-[180px] justify-center ${
            selected === option.value
              ? 'bg-[#2E90FA] text-white'
              : 'text-[#344054] hover:text-[#2E90FA]'
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              selected === option.value ? 'bg-white' : 'bg-[#D0D5DD]'
            }`}
          />
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default ToggleSwitch
