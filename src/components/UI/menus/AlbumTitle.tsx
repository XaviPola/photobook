import React, { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'
import axios from 'axios'

interface AlbumTitleProps {
  albumId: string
  styles?: CSSProperties
}

const AlbumTitle: React.FC<AlbumTitleProps> = ({ albumId, styles }) => {
  const [title, setTitle] = useState<string | undefined>()

  useEffect(() => {
    axios.get(`http://localhost:1234/albums/${albumId}`)
      .then((response) => {
        console.log('response:', response)
        if (response.data === null) {
          console.log('Album not found')
          return
        }
        const { title } = response.data
        console.log('Album found:', title)
        setTitle(title)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <h1 style={styles}>{title}</h1>
  )
}

export default AlbumTitle
