import React from 'react'
import PictureIcon from '@components/UI/icons/Picture'

interface CoverPreviewProps {
  title: string
  author: string
  fontColor: string
  backgroundColor: string
  imgPath?: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setAuthor: React.Dispatch<React.SetStateAction<string>>
}

const CoverPreview: React.FC<CoverPreviewProps> = ({ title, author, fontColor, backgroundColor, imgPath, setTitle, setAuthor }) => {
  const [img, setImg] = React.useState<string | null>(imgPath !== undefined ? imgPath : null)

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
      setImg(URL.createObjectURL(filesArray[0]))
      console.log('Cover Image:', img)
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

  const imgBoxStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    minWidth: '60vh',
    aspectRatio: '1'
  }

  const coverTextStyles: React.CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 700,
    color: fontColor
  }

  const inputStyles: React.CSSProperties = {
    ...coverTextStyles,
    backgroundColor: 'transparent',
    border: 'none',
    width: '100%',
    textAlign: 'center'
  }

  const authorStyles: React.CSSProperties = {
    ...inputStyles,
    fontSize: '45px'
  }

  const titleStyles: React.CSSProperties = {
    ...inputStyles,
    fontSize: '100px'
  }

  return (
    <div
      style={{
        width: 'auto',
        minWidth: '75vh',
        minHeight: '100vh',
        height: '100%',
        aspectRatio: '1.4:1',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        backgroundColor,
        gap: '40px'
      }}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          border: '1px dashed rgba(0, 0, 0, 0.05)'
        }}
      >
        {img == null
          ? (

            <div style={{ ...imgBoxStyles, backgroundColor: 'white' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '8px' }}>
                <PictureIcon width='30px' height='30px' />
              </div>
              <p>Drag and drop your cover here</p>
            </div>
            )
          : (
            <img
              src={img} style={{ width: '100%', height: '100%' }}
            />
            )}
      </div>

      <input type='text' style={titleStyles} id='titleInput' value={title} onChange={handleTitleChange} />
      <input type='text' style={authorStyles} id='authorInput' value={author} onChange={handleAuthorChange} />
    </div>
  )
}

export default CoverPreview
