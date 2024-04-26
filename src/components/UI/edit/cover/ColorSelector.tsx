import React from 'react'
import type { CSSProperties } from 'react'

interface ColorSelectorProps {
  colorCopy: string
  colorInitialValue: string
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colorCopy, colorInitialValue, onColorChange }) => {
  const labelStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    textTransform: 'capitalize',
    fontFamily: '"Roboto", sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '14px'
  }

  const inputStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'space-between',
    borderRadius: '8px',
    border: '1px solid #ccc',
    padding: '10px'
  }

  return (
    <div style={inputStyles}>
      <label style={labelStyles}>{colorCopy}</label>
      <input type='color' value={colorInitialValue} onChange={onColorChange} />
    </div>
  )
}

export default ColorSelector
