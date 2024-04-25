import React, { useState, useEffect } from 'react'
import AlbumCard, { type AlbumCardProps } from './Album'
import Grid from '../../Grid'
import axios from 'axios'
import NewAlbumCard from './NewAlbum'

export interface AlbumsProps {
  userId: number
}

const AlbumsGrid: React.FC<AlbumsProps> = ({ userId }) => {
  const [albums, setAlbums] = useState<AlbumCardProps[]>([])
  useEffect(() => {
    axios.get(`http://localhost:1234/albums/covers/user/${userId}`).then(
      (response) => setAlbums(response.data)
    ).catch((error) => console.error(error))
  }, [userId])

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
        />
      ))}
      <NewAlbumCard userId={userId} />
    </Grid>
  )
}

export default AlbumsGrid
