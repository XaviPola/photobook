import React, { useEffect, useState } from 'react'
import Cover from './Cover'
import type CoverProps from './Cover'
import Page from './BookPage'
import type PageProps from './BookPage'
import NextIcon from '@components/UI/icons/Next'
import BeforeIcon from '@components/UI/icons/Before'

interface BookProps {
  bookCover: typeof CoverProps
  bookPages: Array<typeof PageProps>
}

const Book: React.FC<BookProps> = ({ bookCover, bookPages }) => {
  const [currentPage, setCurrentPage] = useState(-1)

  const handleNextPage = (): void => {
    if (currentPage < bookPages.length - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = (): void => {
    if (currentPage > -1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleKeyPress = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowLeft') {
      handlePrevPage()
    } else if (event.key === 'ArrowRight') {
      handleNextPage()
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [currentPage])

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    maxWidth: '90%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '30px',
    height: '95vh',
    aspectRatio: '1 / 1'
  }

  const buttonContainerStyles: React.CSSProperties = {
    width: '10%',
    height: '20%',
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
    borderRadius: '8px'
  }

  const buttonStyles: React.CSSProperties = {
    borderRadius: '8px',
    border: 'none',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
  }

  return (
    <div style={containerStyles}>
      <div style={buttonContainerStyles}>
        {(currentPage !== -1) ? <button style={buttonStyles} onClick={handlePrevPage}><BeforeIcon /></button> : <></>}
      </div>
      {(currentPage === -1)
        ? <Cover {...bookCover} />
        : <Page {...bookPages[currentPage]} />}
      <div style={buttonContainerStyles}>
        {(currentPage < bookPages.length - 1) ? <button style={buttonStyles} onClick={handleNextPage}><NextIcon /></button> : <></>}
      </div>
    </div>
  )
}

export default Book
