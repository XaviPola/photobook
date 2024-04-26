import React from 'react'
import type { CSSProperties } from 'react'

export interface BackCoverProps {
  imgPath: string
  title: string
  description: string
  author: string
  aboutAuthor: string
  backgroundColor: string
  fontColor: string
}

const BackCover: React.FC<BackCoverProps> = ({ imgPath, title, description, author, aboutAuthor, backgroundColor, fontColor }) => {
  const coverTextStyles: CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    fontWeight: 300,
    lineHeight: '1.5',
    color: 'black',
    backgroundColor: 'transparent',
    width: '100%',
    textAlign: 'left'
  }

  const authorStyles: CSSProperties = {
    ...coverTextStyles,
    fontSize: '115%'
  }

  const titleStyles: CSSProperties = {
    ...coverTextStyles,
    fontSize: '135%',
    gridColumn: '1 / span 2',
    borderBottom: '1px solid #E5E5E5'
  }

  const headerStyles: CSSProperties = {
    fontStyle: 'stroke',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 300
  }

  const coverStyles: CSSProperties = {
    fontSize: '1vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    minWidth: '578px',
    boxSizing: 'border-box',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '6% 3%',
    backgroundColor
  }

  const whiteBoxStyles: CSSProperties = {
    display: 'grid',
    gap: '4%',
    gridTemplateColumns: '1fr 1.5fr',
    gridTemplateRows: '2fr 1fr',
    backgroundColor: 'white',
    width: '80%',
    height: '80%',
    padding: '0 5%',
    boxSizing: 'border-box'
  }

  const imgStyles: CSSProperties = {
    width: '100%',
    aspectRatio: '1'

  }

  return (
    <div style={coverStyles}>
      <div style={whiteBoxStyles}>
        <section style={titleStyles}>
          <h1 style={headerStyles}>{title}</h1>
          <p>{description}</p>
        </section>
        <img src={`../${imgPath}`} style={imgStyles} />
        <section style={authorStyles}>
          <h1 style={{ ...headerStyles, margin: 0 }}>{author}</h1>
          <p>{aboutAuthor}</p>
        </section>
      </div>
    </div>
  )
}

export default BackCover
