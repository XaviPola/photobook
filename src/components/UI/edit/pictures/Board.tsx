import type { FC } from 'react'
import { useState, useEffect } from 'react'
import AlbumGridEditor from './AlbumGridEditor'
import ImagesUploader from './ImagesUploader.tsx'
import UploadButton from './UploadButton'

export interface Picture {
  id: number
  path: string
  title?: string
  description?: string
  orderInAlbum: number
}

interface EditPictureProps {
  albumId: string
}

const EditPictureBoard: FC<EditPictureProps> = ({ albumId }) => {
  const [pictures, setPictures] = useState<Picture[]>([])
  const [refresh, setRefresh] = useState(true)
  const [uploader, setUploader] = useState(false)

  useEffect(() => {
    if (pictures.length === 0 || refresh) {
      console.log('fetching pictures')
      fetch(`http://localhost:1234/pictures/${albumId}`)
        .then(async (res) => {
          if (!res.ok) {
            throw new Error('Network response was not ok')
          }
          return await res.json()
        })
        .then((data) => {
          console.log('data:', data)
          if (data === null) {
            setPictures([])
          } else {
            const pictures: Picture[] = Object.values(data)
            const sortedPictures: Picture[] = pictures.sort((a: Picture, b: Picture) => a.orderInAlbum - b.orderInAlbum)
            console.log('sortedPictures:', sortedPictures)
            setPictures(sortedPictures)
          }
          setRefresh(false)
          setUploader(false)
        })
        .catch((error) => {
          console.error('Error fetching pictures:', error)
        })
    }
  }, [refresh])

  const handleUpload = (): void => {
    console.log('uploading')
    console.log('uploader:', uploader)
    setUploader(true)
    console.log('uploader:', uploader)
  }

  if (pictures.length === 0 || uploader) {
    return (
      <ImagesUploader albumId={albumId} refresh={refresh} setRefresh={setRefresh} />
    )
  } else {
    return (
      <>
        <AlbumGridEditor albumId={albumId} pictures={pictures} setPictures={setPictures} refresh={refresh} setRefresh={setRefresh} />
        <UploadButton onClick={handleUpload} />
      </>
    )
  }
}

export default EditPictureBoard
