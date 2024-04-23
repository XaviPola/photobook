import React from 'react'
import type { CSSProperties } from 'react'

export interface CoverProps {
  imgPath: string
  title: string
  author: string
  backgroundColor: string
  fontColor: string
}

const Cover: React.FC<CoverProps> = ({ imgPath, title, author, backgroundColor, fontColor }) => {
  const coverTextStyles: CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 700,
    color: fontColor,
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'center'
  }

  const authorStyles: CSSProperties = {
    ...coverTextStyles,
    fontSize: '200%'
  }

  const titleStyles: CSSProperties = {
    ...coverTextStyles,
    fontSize: '350%'
  }

  const coverStyles: CSSProperties = {
    fontSize: '1vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    padding: '6% 3%',
    backgroundColor
  }

  const imgStyles: CSSProperties = {
    width: '80%',
    height: 'auto',
    minWidth: '30vh'
  }

  return (
    <div style={coverStyles}>
      <img src={imgPath} style={imgStyles} />
      <h1 style={titleStyles}>{title}</h1>
      <p style={authorStyles}>{author}</p>
    </div>
  )
}

export default Cover
