import React, { useState } from 'react'
import type { DragEvent, Dispatch, SetStateAction, CSSProperties, ReactElement } from 'react'
import axios from 'axios'
import Button from '@components/UI/Button'
import CustomAlert from '@components/UI/CustomAlert'
import UploadIcon from '@components/UI/icons/UploadFiles'

interface ImagesUploaderProps {
  albumId: string
  refresh: boolean
  setRefresh: Dispatch<SetStateAction<boolean>>
}

function ImagesUploader ({ albumId, refresh, setRefresh }: ImagesUploaderProps): ReactElement {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  const timeout = 1200
  const mainId = 'images-uploader'

  const handleAlertClose = (): void => {
    setAlertOpen(false)
  }

  const handleShowAlert = (): void => {
    setAlertOpen(true)
  }

  const handleSuccessShowAlert = (): void => {
    setAlertTitle('📸 Smile!')
    setAlertMessage('All images uploaded successfully!')
    handleShowAlert()
  }

  const handleFailureShowAlert = (): void => {
    setAlertTitle('Oops!')
    setAlertMessage('Some images failed to upload. Please try again.')
    handleShowAlert()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    if (event.dataTransfer.files.length > 0) {
      console.log('files:', event.dataTransfer.files)
      console.log('uploading')
      const filesArray = Array.from(event.dataTransfer.files)
      setSelectedFiles(prevFiles => [...prevFiles, ...filesArray])

      const newPreviews = Array.from(event.dataTransfer.files).map(file => URL.createObjectURL(file))
      setPreviews(prevPreviews => [...prevPreviews, ...newPreviews])

      console.log('selectedFiles after handleDrop:', selectedFiles)
      console.log('previews after handleDrop:', previews)
    }
  }

  const handleUpload = async (): Promise<void> => {
    console.log('uploading images:', selectedFiles)
    const uploadPromises = selectedFiles.map(async (file) => {
      const formData = new FormData()
      formData.append('image', file)
      console.log('uploading image:', file)
      try {
        const response = await axios.post(`http://localhost:1234/pictures/upload/${albumId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        console.log('Upload successful:', response.data)
      } catch (error) {
        console.error('Upload failed:', error)
      }
    })

    try {
      await Promise.all(uploadPromises)
      handleSuccessShowAlert()

      function revertRefresh (): void {
        setRefresh(!refresh)
      }

      setTimeout(revertRefresh, timeout)
    } catch (error) {
      handleFailureShowAlert()
      console.error('Error uploading images:', error)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (): void => {
    setIsDragging(false)
  }

  const inlineStyles: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    padding: '20px'
  }

  const inlineContainerStyles: CSSProperties = {
    width: '100%',
    minHeight: '100vh',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: isDragging ? '1px dashed rgba(0, 0, 0, 0.05)' : undefined,
    borderRadius: '8px',
    gap: '10px',
    backgroundColor: isDragging ? '#f9f9f9' : '#ffffff'
  }

  const inlineGridImageStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(10rem, 1fr))',
    gridTemplateRows: 'auto',
    gridGap: 10,
    width: '100%',
    margin: '0 auto',
    marginTop: '15px',
    placeItems: 'center'
  }

  const imgInlineStyles: CSSProperties = {
    width: '100%',
    aspectRatio: '1',
    display: 'flex',
    borderRadius: '8px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    objectFit: 'cover',
    justifyContent: 'center'
  }

  return (
    <div
      id={mainId}
      style={inlineStyles}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <CustomAlert
        open={alertOpen}
        title={alertTitle}
        message={alertMessage}
        onClose={handleAlertClose}
        timeout={timeout}
        parentId={mainId}
      />
      <div style={inlineContainerStyles}>
        <div style={{ textAlign: 'center', width: '100%' }}>

          <UploadIcon color='black' width='100px' />
          <p>Drag & Drop images here</p>

          {previews.length > 0 && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Button copy='Upload All' onClick={handleUpload} />
              <div style={inlineGridImageStyle}>
                {previews.map((preview, index) => (
                  <img style={imgInlineStyles} key={index} src={preview} alt={`Preview ${index}`} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImagesUploader
