import React, { useState, useEffect } from 'react'
import AboutPreview from './AboutPreview'
import axios from 'axios'

interface AboutEditorProps {
  albumId: string
}

const AboutEditor: React.FC<AboutEditorProps> = ({ albumId }) => {
  const [description, setDescription] = useState<string | undefined>()
  const [aboutAuthor, setAboutAuthor] = useState<string | undefined>()
  const [authorImage, setAuthorImage] = useState<File | null>(null)
  const [imgPath, setImgPath] = useState<string | undefined>()

  useEffect(() => {
    const getAbout = async (albumId: string): Promise<void> => {
      await axios.get(`http://localhost:1234/albums/about/${albumId}`)
        .then((response) => {
          console.log('response:', response)
          if (response.data === null) {
            console.log('About not found')
            return
          }
          const { description, imgPath, aboutAuthor } = response.data
          console.log('About loaded')
          setImgPath(imgPath)
          setDescription(description)
          setAboutAuthor(aboutAuthor)
        })
        .catch((error) => {
          console.error(error)
          if (error.response.status === 404 || error.response.status === 500) {
            console.log('Cover not found, creating default cover')
          }
        })
    }
    void getAbout(albumId)
  }, [])

  const updateDescription = (description: string): void => {
    axios.put(`http://localhost:1234/albums/${albumId}`, { description })
      .then((response) => {
        console.log('Description updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateAboutAuthor = (aboutAuthor: string): void => {
    axios.put(`http://localhost:1234/albums/about/${albumId}`, { aboutAuthor })
      .then((response) => {
        console.log('About author updated successfully')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    if (description !== undefined) {
      updateDescription(description)
    }
    if (aboutAuthor !== undefined) {
      updateAboutAuthor(aboutAuthor)
    }
  }, [description, aboutAuthor])

  const updateAuthorImage = (): void => {
    console.log('uploading author image:', authorImage)
    const formData = new FormData()
    formData.append('image', authorImage as Blob)
    axios.patch(`http://localhost:1234/albums/${albumId}/author/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        console.log('Author image updated successfully')
        loadImgPath()
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const loadImgPath = (): void => {
    axios.get(`http://localhost:1234/albums/about/${albumId}`)
      .then((response) => {
        const { imgPath } = response.data
        console.log('imgPath:', imgPath)
        setImgPath(imgPath)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const updateAbout: () => Promise<void> = async () => {
    if (authorImage !== null) {
      updateAuthorImage()
    }
  }

  useEffect(() => {
    void updateAbout()
  }, [authorImage])

  useEffect(() => {
    console.log('refreshing imgPath')
  }, [imgPath])

  const displayStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'top',
    gap: '1rem',
    marginTop: '0'
  }

  return (
    <div style={displayStyles}>
      <AboutPreview
        description={description}
        aboutAuthor={aboutAuthor}
        imgPath={(imgPath !== null) ? imgPath : undefined}
        setAuthorImage={setAuthorImage}
        setDescription={setDescription}
        setAboutAuthor={setAboutAuthor}
      />

    </div>
  )
}

export default AboutEditor
