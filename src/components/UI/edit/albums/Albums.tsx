import React, { useState, useEffect } from 'react'
import AlbumCard, { type AlbumCardProps } from './Album'
import Grid from '../../Grid'
import NewAlbumCard from './NewAlbum'
import axios from 'axios'

export interface AlbumsProps {
  userId: number
}

const AlbumsGrid: React.FC<AlbumsProps> = ({ userId }) => {
  const [albums, setAlbums] = useState<AlbumCardProps[]>([])
  const [deletedAlbumId, setDeletedAlbumId] = useState<string | null>(null)

  useEffect(() => {
    axios.get(`http://localhost:1234/albums/covers/user/${userId}`).then(
      (response) => {
        const loadedAlbums = response.data
        if (loadedAlbums === null) {
          return
        }
        setAlbums(response.data)
      }
    ).catch((error) => console.error(error))
  }, [userId])

  useEffect(() => {
    if (deletedAlbumId !== null) {
      const filteredAlbums = albums.filter((album) => album.id !== deletedAlbumId)
      setAlbums(filteredAlbums)
      setDeletedAlbumId(null)
    }
  }, [deletedAlbumId])

  useEffect(() => {
    console.log('Albums:', albums)
  }, [albums])

  return (
    <Grid>
      {(albums).map((album) => (
        <AlbumCard
          key={album.id}
          id={album.id}
          imgPath={album.imgPath}
          title={album.title}
          author={album.author}
          backgroundColor={album.backgroundColor}
          fontColor={album.fontColor}
          setDeletedAlbumId={setDeletedAlbumId}
        />
      ))}
      <NewAlbumCard userId={userId} />
    </Grid>
  )
}

export default AlbumsGrid
