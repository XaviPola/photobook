import React from 'react'
import type { CSSProperties } from 'react'

interface ColorSelectorProps {
  backgroundColor: string
  fontColor: string
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
  setFontColor: React.Dispatch<React.SetStateAction<string>>
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ backgroundColor, fontColor, setBackgroundColor, setFontColor }) => {
  const onBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const color = event.target.value
    console.log('backgroundColor:', color)
    setBackgroundColor(color)
  }

  const onFontColorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const color = event.target.value
    console.log('fontColor:', color)
    setFontColor(color)
  }

  const boxStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '20px'
  }

  return (
    <div style={boxStyles}>
      <div>
        <label>Background</label>
        <input type='color' value={backgroundColor} onChange={onBackgroundColorChange} />
      </div>
      <div>
        <label>Font</label>
        <input type='color' value={fontColor} onChange={onFontColorChange} />
      </div>
    </div>
  )
}

export default ColorSelector
