import React from 'react'
import type { CSSProperties } from 'react'
import PictureIcon from '@components/UI/icons/Picture'

interface CoverPreviewProps {
  title?: string
  author?: string
  fontColor: string
  backgroundColor: string
  imgPath?: string
  setCoverPicture: React.Dispatch<React.SetStateAction<File | null>>
  setTitle: React.Dispatch<React.SetStateAction<string | undefined>>
  setAuthor: React.Dispatch<React.SetStateAction<string | undefined>>
}

const CoverPreview: React.FC<CoverPreviewProps> = ({ title, author, fontColor, backgroundColor, imgPath, setCoverPicture, setTitle, setAuthor }) => {
  const onDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (event.dataTransfer.files.length > 1) {
      console.error('Only one file is allowed')
      return
    }
    if (event.dataTransfer.files.length > 0) {
      console.log('files:', event.dataTransfer.files)
      console.log('uploading')
      const filesArray = Array.from(event.dataTransfer.files)
      setCoverPicture(filesArray[0])
    }
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = event.target.value
    console.log('title:', newTitle)
    setTitle(newTitle)
  }

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newAuthor = event.target.value
    console.log('author:', newAuthor)
    setAuthor(newAuthor)
  }

  const imgBoxStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    minWidth: '30vh',
    aspectRatio: '1'
  }

  const coverTextStyles: CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 700,
    color: fontColor
  }

  const inputStyles: CSSProperties = {
    ...coverTextStyles,
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'center',
    cursor: 'text'
  }

  const authorStyles: CSSProperties = {
    ...inputStyles,
    fontSize: '250%'
  }

  const titleStyles: CSSProperties = {
    ...inputStyles,
    fontSize: '500%'
  }

  const coverStyles: CSSProperties = {
    fontSize: '1vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '30px',
    maxWidth: '85vh',
    aspectRatio: '1 / 1.2',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    padding: '6% 3%',
    backgroundColor
  }

  const labelStyles: CSSProperties = {
    textTransform: 'capitalize',
    fontFamily: '"Roboto", sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '20px'
  }

  const imgStyles: CSSProperties = {
    width: '80%',
    aspectRatio: '1',
    minWidth: '30vh',
    cursor: 'grab'
  }

  return (
    <div
      style={coverStyles}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      {imgPath == null
        ? (
          <div style={{ ...imgBoxStyles, backgroundColor: 'white' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '8px' }}>
              <PictureIcon width='30px' height='30px' />
            </div>
            <p style={labelStyles}>Drag and drop your cover here</p>
          </div>
          )
        : (
          <img
            src={`../${imgPath}`} style={imgStyles}
          />
          )}

      <input type='text' style={titleStyles} placeholder='title' value={title} onChange={handleTitleChange} />
      <input type='text' style={authorStyles} placeholder='author' value={author} onChange={handleAuthorChange} />
    </div>
  )
}

export default CoverPreview
