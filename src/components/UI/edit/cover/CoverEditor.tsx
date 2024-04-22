import React, { useState, useEffect } from 'react'
import ColorSelector from './ColorSelector'
import CoverPreview from './CoverPreview'
import axios from 'axios'

interface CoverEditorProps {
  albumId: string
}

const CoverEditor: React.FC<CoverEditorProps> = ({ albumId }) => {
  const defaultbackgroundColor = '#000000'
  const defaultFontColor = '#ffffff'

  const [title, setTitle] = useState<string | undefined>()
  const [author, setAuthor] = useState<string | undefined>()
  const [fontColor, setFontColor] = useState<string>(defaultFontColor)
  const [backgroundColor, setBackgroundColor] = useState<string>(defaultbackgroundColor)
  const [coverPicture, setCoverPicture] = useState<File | null>(null)
  const [imgPath, setImgPath] = useState<string | undefined>()

  const createDefaultCover = async (albumId: string): Promise<void> => {
    axios.post(`http://localhost:1234/covers/${albumId}`, {
      backgroundColor: defaultbackgroundColor,
      fontColor: defaultFontColor
    })
      .then((response) => {
        console.log('Cover created successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const getSetupCover = async (albumId: string): Promise<void> => {
      await axios.get(`http://localhost:1234/covers/${albumId}`)
        .then((response) => {
          const { imgPath, title, author, backgroundColor, fontColor } = response.data
          setImgPath(imgPath)
          setBackgroundColor(backgroundColor)
          setFontColor(fontColor)
          setTitle(title)
          setAuthor(author)
        })
        .catch(async (error) => {
          if (error.response.status === 404) {
            console.log('Cover not found, creating default cover')
            await createDefaultCover(albumId)
            setBackgroundColor(defaultbackgroundColor)
            setFontColor(defaultFontColor)
          }
        })
    }
    void getSetupCover(albumId)
  }, [])

  const updateCoverColors = (backgroundColor: string, fontColor: string): void => {
    axios.put(`http://localhost:1234/covers/${albumId}`, { backgroundColor, fontColor })
      .then((response) => {
        console.log('Colors updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    updateCoverColors(backgroundColor, fontColor)
  }, [backgroundColor, fontColor])

  const updateTitle = (title: string): void => {
    axios.put(`http://localhost:1234/albums/${albumId}`, { title })
      .then((response) => {
        console.log('Title updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateAuthor = (author: string): void => {
    axios.put(`http://localhost:1234/albums/${albumId}`, { author })
      .then((response) => {
        console.log('Author updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (title !== undefined) {
      updateTitle(title)
    }
    if (author !== undefined) {
      updateAuthor(author)
    }
  }, [title, author])

  const updateCoverPicture = (): void => {
    console.log('uploading cover image:', coverPicture)
    const formData = new FormData()
    formData.append('image', coverPicture as Blob)
    axios.patch(`http://localhost:1234/covers/${albumId}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Cover image updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (coverPicture !== null) {
      updateCoverPicture()
    }
  }, [coverPicture])

  return (
    <>
      <CoverPreview
        title={title}
        author={author}
        fontColor={fontColor}
        backgroundColor={backgroundColor}
        imgPath={(imgPath !== null) ? imgPath : undefined}
        setCoverPicture={setCoverPicture}
        setTitle={setTitle}
        setAuthor={setAuthor}
      />
      <ColorSelector
        backgroundColor={backgroundColor}
        fontColor={fontColor}
        setBackgroundColor={setBackgroundColor}
        setFontColor={setFontColor}
      />

    </>
  )
}

export default CoverEditor
