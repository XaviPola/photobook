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
    height: '100%',
    flexDirection: 'row',
    gap: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    justifyContent: 'center'
  }

  const labelStyles: CSSProperties = {
    textTransform: 'capitalize',
    fontFamily: '"Roboto", sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '20px'
  }

  const inputStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    justifyContent: 'space-between'
  }

  return (
    <div style={boxStyles}>
      <div style={inputStyles}>
        <label style={labelStyles}>Background</label>
        <input type='color' value={backgroundColor} onChange={onBackgroundColorChange} />
      </div>
      <div style={inputStyles}>
        <label style={labelStyles}>Font</label>
        <input type='color' value={fontColor} onChange={onFontColorChange} />
      </div>
    </div>
  )
}

export default ColorSelector
