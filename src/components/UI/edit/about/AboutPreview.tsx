import React from 'react'
import type { CSSProperties } from 'react'
import PictureIcon from '@components/UI/icons/Picture'

interface AboutPreviewProps {
  description?: string
  aboutAuthor?: string
  imgPath?: string
  setAuthorImage: React.Dispatch<React.SetStateAction<File | null>>
  setDescription: React.Dispatch<React.SetStateAction<string | undefined>>
  setAboutAuthor: React.Dispatch<React.SetStateAction<string | undefined>>
}

const AboutPreview: React.FC<AboutPreviewProps> = ({ description, aboutAuthor, imgPath, setAuthorImage, setDescription, setAboutAuthor }) => {
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
      setAuthorImage(filesArray[0])
    }
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newDescription = event.target.value
    console.log('Description:', newDescription)
    setDescription(newDescription)
  }

  const handleAboutAuthorChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newAboutAuthor = event.target.value
    console.log('About author:', newAboutAuthor)
    setAboutAuthor(newAboutAuthor)
  }

  const imgBoxStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0,  0.1)',
    boxSizing: 'border-box',
    aspectRatio: '1',
    width: '100%',
    height: '100%'
  }

  const aboutTextStyles: CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 300
  }

  const inputStyles: CSSProperties = {
    ...aboutTextStyles,
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    border: '2px solid transparent',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    cursor: 'text',
    fontSize: '150%'
  }

  const descriptionBoxStyles: CSSProperties = {
    display: 'flex',
    gridColumn: '1 / span 2',
    width: '100%',
    height: '100%'
  }

  const aboutStyles: CSSProperties = {
    fontSize: '1vw',
    display: 'grid',
    gridTemplateColumns: '1fr 3fr',
    gridTemplateRows: '1fr 4fr',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '30px',
    maxHeight: '75vh',
    minHeight: '400px',
    aspectRatio: '1',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    padding: '6% 3%'
  }

  const labelStyles: CSSProperties = {
    textTransform: 'capitalize',
    fontFamily: '"Roboto", sans-serif',
    fontStyle: 'normal',
    fontWeight: 300,
    fontSize: '12px'
  }

  const imgStyles: CSSProperties = {
    height: '100%',
    width: '100%',
    cursor: 'grab',
    borderRadius: '8px'

  }

  return (
    <div
      style={aboutStyles}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div style={{ width: '100%', height: '100%' }}>
        {imgPath == null
          ? (
            <div style={imgBoxStyles}>
              <p style={labelStyles}>Profile picture</p>
              <div style={{ width: '30%', height: '30%' }}>
                <PictureIcon width='20px' height='20px' />
              </div>
              <p style={labelStyles}>DragNdrop</p>
            </div>
            )
          : (
            <img
              src={`../${imgPath}`} style={imgStyles}
            />
            )}
      </div>
      <textarea style={inputStyles} value={aboutAuthor} onChange={handleAboutAuthorChange} placeholder='About the Author' />
      <div style={descriptionBoxStyles}>
        <textarea style={inputStyles} value={description} onChange={handleDescriptionChange} placeholder='Book Description' />
      </div>
    </div>
  )
}

export default AboutPreview
