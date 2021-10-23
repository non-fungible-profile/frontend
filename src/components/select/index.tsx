import ReactSelect from 'react-select'
import { useCallback } from 'react'

interface SelectProps {
  options: { label: string; value: string }[]
  value?: { label: string; value: string } | null
  onChange: (value: any) => void
}

export const Select = ({ options, value, onChange }: SelectProps) => {
  const handleChange = useCallback(
    (value: any) => {
      onChange(value)
    },
    [onChange]
  )

  return (
    <ReactSelect
      styles={{
        container: (provided: any) => ({ ...provided, width: 88 }),
        input: (provided: any) => ({ ...provided, height: 50 }),
        control: (provided: any) => ({ ...provided, paddingLeft: 12, paddingRight: 12, borderRadius: 8 }),
        indicatorSeparator: () => ({ display: 'none' }),
      }}
      options={options}
      value={value}
      onChange={handleChange}
    />
  )
}
