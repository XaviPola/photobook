import React, { useState, useEffect } from 'react'
import ColorSelector from './ColorSelector'
import CoverPreview from './CoverPreview'

interface CoverEditorProps {
  albumId: string
  title?: string
  author?: string
  fontColor?: string
  backgroundColor?: string
}

const CoverEditor: React.FC<CoverEditorProps> = ({ albumId, title: initialTitle = 'A Title', author: initialAuthor = 'Xavi F Pola', fontColor: initialFontColor = '#000000', backgroundColor: initialBackgroundColor = '#e12356' }) => {
  const [title, setTitle] = useState(initialTitle)
  const [author, setAuthor] = useState(initialAuthor)
  const [fontColor, setFontColor] = useState(initialFontColor)
  const [backgroundColor, setBackgroundColor] = useState(initialBackgroundColor)
  const [coverPicture, setCoverPicture] = useState<File | null>(null)

  useEffect(() => {
    console.log('CoverEditor mounted')
  }, [title, author, fontColor, backgroundColor, coverPicture])

  const handleBackgroundColorChange = (color: string): void => {
    console.log('backgroundColor:', color)
    setBackgroundColor(color)
  }

  const handleFontColorChange = (color: string): void => {
    console.log('fontColor:', color)
    setFontColor(color)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    // Your logic to handle dropping the cover picture
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    // Your logic to handle drag over
  }

  const handleDragLeave = (): void => {
    // Your logic to handle drag leave
  }

  return (
    <>
      <CoverPreview
        title={title}
        author={author}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        imgPath={coverPicture != null ? URL.createObjectURL(coverPicture) : undefined}
        setTitle={setTitle}
        setAuthor={setAuthor}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      />
      <ColorSelector
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        setBackgroundColor={setBackgroundColor}
        setFontColor={setFontColor}
        onBackgroundColorChange={handleBackgroundColorChange}
        onFontColorChange={handleFontColorChange}
      />

    </>
  )
}

export default CoverEditor
