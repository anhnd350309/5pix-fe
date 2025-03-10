interface ToggleSwitchProps {
  onChange?: (value: string) => void
  selected?: string
}

const ToggleSwitch = ({ onChange, selected }: ToggleSwitchProps) => {
  const options = [
    { label: 'Tổng quan album', value: 'overView' },
    { label: 'Cấu hình kinh doanh', value: 'businessConfig' },
  ]

  const handleSelect = (value: string) => {
    // setSelected(value)
    onChange?.(value)
  }

  return (
    <div className='inline-flex p-1 bg-[#F2F4F7] rounded-[100px] w-fit'>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelect(option.value)}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-[100px] transition-all duration-200 min-w-[180px] justify-center ${
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
