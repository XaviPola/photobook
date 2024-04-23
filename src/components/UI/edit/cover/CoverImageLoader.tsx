import React, { type ReactElement, type CSSProperties } from 'react'
import PictureIcon from '@components/UI/icons/Picture'

interface ImageLoaderProps {
  setCoverPicture: React.Dispatch<React.SetStateAction<File | null>>
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ setCoverPicture }): ReactElement => {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file != null) { setCoverPicture(file) }
  }

  const handleButtonClick = (): void => {
    fileInputRef.current?.click()
  }

  const labelStyles: CSSProperties = {
    textTransform: 'capitalize',
    fontFamily: '"Roboto", sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '20px',
    margin: 0
  }

  const inputStyles: CSSProperties = {
    width: 'fit-content',
    height: 'fit-content',
    display: 'inline-flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    padding: '10px',
    backgroundColor: 'transparent',
    cursor: 'pointer'

  }

  return (
    <button onClick={handleButtonClick} style={inputStyles}>
      <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <p style={labelStyles}> Upload Cover</p>
      <div style={{ width: '40px', height: '27px' }}><PictureIcon /></div>
    </button>
  )
}

export default ImageLoader
