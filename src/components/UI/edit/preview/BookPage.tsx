import React from 'react'
import type { CSSProperties } from 'react'

export interface PageProps {
  path: string
  title: string
  description: string
}

const Page: React.FC<PageProps> = ({ path, title, description }) => {
  const pageTextStyles: CSSProperties = {
    fontFamily: '"Averia Serif Libre", serif',
    color: 'black',
    backgroundColor: 'transparent',
    width: '80%',
    textAlign: 'right',
    margin: 0
  }

  const descriptionStyles: CSSProperties = {
    ...pageTextStyles,
    fontWeight: 300,
    fontSize: '150%',
    fontStyle: 'italic',
    opacity: 0.8

  }

  const titleStyles: CSSProperties = {
    ...pageTextStyles,
    fontWeight: 500,
    fontSize: '240%',
    fontStyle: 'italic',
    opacity: 1
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
    backgroundColor: 'white'
  }

  const imgStyles: CSSProperties = {
    width: '80%',
    height: 'auto',
    minWidth: '30vh'
  }

  const contextStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '15px',
    width: '100%',
    height: '100%'
  }

  return (
    <div style={coverStyles}>
      <img src={path} style={imgStyles} />
      <div style={contextStyles}>
        <h1 style={titleStyles}>{title}</h1>
        <p style={descriptionStyles}>{description}</p>
      </div>
    </div>
  )
}

export default Page
