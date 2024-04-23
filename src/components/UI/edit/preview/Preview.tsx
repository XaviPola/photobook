import React, { useEffect, useState } from 'react'
import Book from './Book'
import Background from './Background'
import axios from 'axios'
import type { CoverProps } from './Cover'
import type { PageProps } from './BookPage'
import DeleteButton from '@components/UI/DeleteButton'
import CloseIcon from '@components/UI/icons/Close'

interface BookPreviewProps {
  albumId: number
}

const BookPreview: React.FC<BookPreviewProps> = ({ albumId }) => {
  const getBookCover = async (albumId: number): Promise<CoverProps> => {
    const response = await axios.get(`http://localhost:1234/covers/${albumId}`)
    return response.data
  }

  const getAllPictures = async (albumId: number): Promise<PageProps[]> => {
    const response = await axios.get(`http://localhost:1234/pictures/${albumId}`)
    return response.data
  }

  const [bookCover, setBookCover] = useState<CoverProps>()
  const [bookPages, setBookPages] = useState<PageProps[]>([])

  useEffect(() => {
    getBookCover(albumId).then((cover) => setBookCover(cover)).catch((error) => console.error(error))
    getAllPictures(albumId).then((pages) => setBookPages(pages)).catch((error) => console.error(error))
  }, [albumId])

  const containerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0
  }

  const closePreviewStyles: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    top: '24px',
    right: '24px',
    cursor: 'pointer',
    borderRadius: '8px'
  }

  const buttonStyles: React.CSSProperties = {
    borderRadius: '8px',
    border: 'none',
    width: '48px',
    height: '48px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
  }

  return (
    <div style={containerStyles}>
      <div style={closePreviewStyles}>
        <button style={buttonStyles}><CloseIcon /></button>
      </div>
      <Background color={bookCover?.fontColor} />
      <Book bookCover={bookCover} bookPages={bookPages} />
    </div>
  )
}

export default BookPreview
