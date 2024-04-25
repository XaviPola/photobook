import React, { useState } from 'react'
import type { CSSProperties } from 'react'
import axios from 'axios'

interface NewAlbumCardProps {
  userId: number
}

const NewAlbumCard = ({ userId }: NewAlbumCardProps): React.AnchorHTMLAttributes<HTMLAnchorElement> => {
  const [id, setId] = useState<number>(0)
  const onClickHandler = (): void => {
    axios.post('http://localhost:1234/albums/', {
      userId,
      title: 'New Album',
      author: 'New Author',
      description: 'New Description'
    }).then((response) => {
      console.log(response.data)
      const albumId = response.data.albumId
      setId(albumId)
    }).catch((error) => {
      console.error(error)
    }
    )
  }

  const albumContainerStyles: CSSProperties = {
    width: '100%',
    height: '100%',
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    border: '1px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
    boxShadow: 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
    gap: '10px',
    boxSizing: 'border-box',
    cursor: 'pointer'

  }

  const titleStyles: CSSProperties = {
    margin: 0,
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 700,
    color: 'black',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'center',
    fontSize: '150%'
  }

  return (
    <a href={`/cover/${id}`} onClick={onClickHandler} style={albumContainerStyles}>
      <h1 style={titleStyles}>Click here to add a New Album</h1>
    </a>
  )
}

export default NewAlbumCard
