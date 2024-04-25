import React, { forwardRef } from 'react'
import type { HTMLAttributes, CSSProperties } from 'react'
import DeleteButton from '@components/UI/DeleteButton'
import axios from 'axios'

export type AlbumCardProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  imgPath?: string
  title: string
  author: string
  backgroundColor?: string
  fontColor?: string
  setDeletedAlbumId: React.Dispatch<React.SetStateAction<string | null>>
}

const AlbumCard = forwardRef<HTMLDivElement, AlbumCardProps>(
  ({ id, imgPath, title, author, backgroundColor, fontColor, setDeletedAlbumId }, ref) => {
    const albumContainerStyles: CSSProperties = {
      width: '100%',
      aspectRatio: '1 / 1.5',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12px',
      overflow: 'hidden',
      padding: '12px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      backgroundColor: backgroundColor ?? 'black',
      opacity: (backgroundColor === null) ? 0.3 : 1,
      boxShadow: 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      boxSizing: 'border-box'
    }

    const inlineImgStyles: CSSProperties = {
      width: '90%',
      aspectRatio: '1'
    }

    const titleStyles: CSSProperties = {
      width: '100%',
      margin: 0,
      fontFamily: '"Averia Serif Libre", serif',
      fontWeight: 300,
      color: fontColor ?? 'white',
      backgroundColor: 'transparent',
      textAlign: 'center',
      fontSize: '150%',
      top: '10%',
      textShadow: '0 0 1px rgba(0, 0, 0, 0.5)'
    }

    const authorStyles: CSSProperties = {
      ...titleStyles,
      fontSize: '100%',
      top: '70%',
      left: '0'
    }

    const deleteExtraStyles: CSSProperties = {
      position: 'absolute',
      top: '6.5%',
      right: '15%',
      zIndex: 1
    }

    const textContainerStyles: CSSProperties = {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between'
    }

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>): void => {
      console.log('delete')
      axios.delete(`http://localhost:1234/albums/${id}`)
        .then((response) => {
          console.log(response)
          setDeletedAlbumId(id)
        })
        .catch((error) => {
          console.error(error)
        })
    }

    return (
      <div style={albumContainerStyles}>
        <DeleteButton id={id} onClick={handleDelete} extraStyles={deleteExtraStyles} />
        <img src={(imgPath === null ? imgPath : `../${imgPath}`)} style={inlineImgStyles} />
        <a style={textContainerStyles} href={`/cover/${id}`}>
          <h1 style={titleStyles}>{title}</h1>
          <h2 style={authorStyles}>{author}</h2>
        </a>
      </div>
    )
  }
)

export default AlbumCard
