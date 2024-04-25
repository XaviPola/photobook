import React, { forwardRef } from 'react'
import type { HTMLAttributes, CSSProperties } from 'react'

export type AlbumCardProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  imgPath?: string
  title: string
  author: string
  backgroundColor?: string
  fontColor?: string
}

const AlbumCard = forwardRef<HTMLDivElement, AlbumCardProps>(
  ({ id, imgPath, title, author, backgroundColor, fontColor }, ref) => {
    const albumContainerStyles: CSSProperties = {
      width: '100%',
      aspectRatio: '1 / 1.5',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
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
      fontWeight: 700,
      color: fontColor ?? 'white',
      backgroundColor: 'transparent',
      textAlign: 'center',
      fontSize: '150%',
      top: '10%',
      textShadow: '0 0 5px rgba(0, 0, 0, 0.5)'
    }

    const authorStyles: CSSProperties = {
      ...titleStyles,
      fontSize: '100%',
      top: '70%',
      left: '0'
    }

    return (
      <a style={albumContainerStyles} href={`/cover/${id}`}>
        <img src={(imgPath === null ? imgPath : `../${imgPath}`)} style={inlineImgStyles} />
        <h1 style={titleStyles}>{title}</h1>
        <h2 style={authorStyles}>{author}</h2>
      </a>
    )
  }
)

export default AlbumCard
