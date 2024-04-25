import React, { forwardRef, useState } from 'react'
import type { HTMLAttributes, CSSProperties } from 'react'
import EditPictureCard from './EditPictureCard'
import ReactDOM from 'react-dom'
import Button from '@components/UI/Button'
import DeleteButton from '../../DeleteButton'

export type PictureCardProps = HTMLAttributes<HTMLDivElement> & {
  id: string
  imgPath: string
  albumId: string
  onDeleteCard: (albumId: string, pictureId: string) => Promise<void>
  imgNumberInAlbum?: string
  imgTitle?: string
  imgDescription?: string
  withOpacity?: boolean
  isDragging?: boolean
}

const PictureCard = forwardRef<HTMLDivElement, PictureCardProps>(
  ({ id, imgPath, albumId, imgTitle, imgNumberInAlbum, imgDescription, withOpacity, isDragging, onDeleteCard, style, ...props }, ref) => {
    isDragging = isDragging ?? false
    withOpacity = withOpacity ?? false
    const [title, setTitle] = useState<string | undefined >(imgTitle ?? undefined)
    const [description, setDescription] = useState<string | undefined >(imgDescription ?? undefined)

    const [isPopupOpen, setIsPopupOpen] = useState(false)

    const openPopup = (): void => {
      setIsPopupOpen(true)
    }

    const closePopup = (): void => {
      setIsPopupOpen(false)
    }

    const inlineStyles: CSSProperties = {
      position: 'relative',
      width: 'auto',
      aspectRatio: '1',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '6px',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      cursor: isDragging ? 'grabbing' : 'grab',
      opacity: withOpacity ? '0.5' : '1',
      transformOrigin: '50% 50%',
      backgroundColor: '#ffffff',
      boxShadow: isDragging ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
      transform: isDragging ? 'scale(1.05)' : 'scale(1)',
      ...style
    }

    const inlineImgStyles: CSSProperties = {
      width: '100%',
      height: '100%',
      borderRadius: '8px'
    }

    const contextStyles: CSSProperties = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: '10px',
      width: '100%',
      height: 'auto',
      gap: '6px'
    }

    const contextTextStyles: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '80%',
      height: '100%',
      gap: '10px'
    }

    const imgOrderStyles: CSSProperties = {
      color: 'white',
      margin: '0',
      fontSize: '2.25rem',
      textShadow: '0 0 10px rgba(0, 0, 0, 0.7)'
    }

    const inlineTextStyles: CSSProperties = {
      margin: '0',
      minHeight: '21px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden'
    }

    const deleteButtonStyles: CSSProperties = {
      width: '20px',
      height: '20px'
    }

    const imgContainerStyles: CSSProperties = {
      position: 'relative'
    }

    const imgContextStyles: CSSProperties = {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      height: '30%',
      boxSizing: 'border-box',
      padding: '10px'
    }

    const handleDeletePicture = async (): Promise<void> => {
      await onDeleteCard(albumId, id)
    }

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        <div style={imgContainerStyles}>
          <div style={imgContextStyles}>
            <h2 style={imgOrderStyles}>{imgNumberInAlbum}</h2>
            <DeleteButton onClick={handleDeletePicture} extraStyles={deleteButtonStyles} />
          </div>
          <img src={`../${imgPath}`} style={inlineImgStyles} />
        </div>
        <div style={contextStyles}>
          <div style={contextTextStyles}>
            <h3 style={inlineTextStyles}>{title != null ? `${title}` : ''}</h3>
            <p style={inlineTextStyles}>{description != null ? `${description}` : ''}</p>
          </div>
          <Button copy='Edit' onClick={openPopup} />
        </div>
        {isPopupOpen && (
          ReactDOM.createPortal(
            <EditPictureCard
              albumId={albumId}
              onclose={closePopup}
              setTitle={setTitle}
              setDescription={setDescription}
              id={id}
              imgPath={`../${imgPath}`}
              imgDescription={description}
              imgTitle={title}
            />,
            document.body
          )
        )}
      </div>
    )
  }
)

export default PictureCard
