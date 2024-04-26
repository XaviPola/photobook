import React from 'react'
import type { CSSProperties } from 'react'
import ColorSelector from './ColorSelector'
import CoverImageLoader from './CoverImageLoader'

interface ToolBarProps {
  backgroundColor: string
  fontColor: string
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>
  setFontColor: React.Dispatch<React.SetStateAction<string>>
  setCoverPicture: React.Dispatch<React.SetStateAction<File | null>>
}

const ToolBar: React.FC<ToolBarProps> = ({ backgroundColor, fontColor, setBackgroundColor, setFontColor, setCoverPicture }) => {
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
    height: 'auto',
    maxWidth: '65vh',
    flexDirection: 'row',
    gap: '40px',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
    justifyContent: 'center'
  }

  return (
    <div style={boxStyles}>
      <ColorSelector
        colorCopy='Background'
        colorInitialValue={backgroundColor}
        onColorChange={onBackgroundColorChange}
      />
      <ColorSelector
        colorCopy='Font'
        colorInitialValue={fontColor}
        onColorChange={onFontColorChange}
      />
      <CoverImageLoader setCoverPicture={setCoverPicture} />
    </div>
  )
}

export default ToolBar
