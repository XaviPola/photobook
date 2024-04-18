import { useState, useCallback, useEffect, useMemo, type ReactElement } from 'react'
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable'
import Grid from '@components/UI/Grid'
import SortablePictureCard from '@components/UI/edit/pictures/SortablePictureCard.tsx'
import PictureCard from '@components/UI/edit/pictures/PictureCard.tsx'
import type { Picture } from '@components/UI/edit/pictures/Board'
import axios from 'axios'

interface AlbumGridEditorProps {
  albumId: string
  pictures: Picture[]
  setPictures: React.Dispatch<React.SetStateAction<Picture[]>>
  refresh: boolean
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

function AlbumGridEditor ({ albumId, pictures, setPictures, refresh, setRefresh }: AlbumGridEditorProps): ReactElement {
  const handleAllUpdate = async (): Promise<void> => {
    const uploadPromises = pictures.map(async (picture) => {
      console.log('updating picture', picture)
      try {
        const response = await axios.patch(`http://localhost:1234/albums/${albumId}`, picture, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log('Album picture updated successfully', response.data)
      } catch (error) {
        console.error('Error updating album picture:', error)
      }
    })
    try {
      await Promise.all(uploadPromises)
    } catch (error) {
      console.error('Error updating images:', error)
      alert('Some images failed to update. Please try again.')
    }
  }

  const [save, setSave] = useState(false)

  useEffect(() => {
    if (save) {
      void handleAllUpdate()
      setSave(false)
    }
  }, [save])

  const itemIds = useMemo(() => pictures.map((picture) => picture.id.toString()), [pictures])

  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8
      }
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 8
      }
    }))

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString())
  }, [])

  function getIndexById (pictureId: string): number {
    return pictures.findIndex((picture) => picture.id.toString() === pictureId)
  }

  function getImgPathById (pictureId: string): string {
    return pictures[getIndexById(pictureId)].path
  }

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id && over != null) {
      setPictures((pictures) => {
        const oldIndex = getIndexById(active.id.toString())
        const newIndex = getIndexById(over?.id.toString())

        const newPictures = [...pictures]

        newPictures.splice(oldIndex, 1)
        newPictures.splice(newIndex, 0, pictures[oldIndex])

        newPictures.forEach((picture, index) => {
          picture.orderInAlbum = index + 1
        })

        return newPictures
      })
    }

    setActiveId(null)
    setSave(true)
  }, [pictures])

  const handleDragCancel = useCallback(() => {
    setActiveId(null)
  }, [])

  const deletePictureCard = async (albumId: string, pictureId: string): Promise<void> => {
    const deleteCall = async (): Promise<void> => {
      console.log('Deleting picture', pictureId)
      try {
        const response = await axios.delete(`http://localhost:1234/albums/${albumId}/picture/${pictureId}`)
        console.log('Picture deleted successfully', response)
      } catch (error) {
        console.error('Error deleting picture:', error)
      }
    }

    try {
      await deleteCall()
      setRefresh(!refresh)
      console.log('refresh happened')
    } catch (error) {
      console.error('Error refreshing:', error)
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext items={itemIds} strategy={rectSortingStrategy}>
        <Grid>
          {pictures.map((picture, index) => (
            <SortablePictureCard
              albumId={albumId}
              key={picture.id}
              id={picture.id.toString()}
              imgDescription={picture.description}
              imgTitle={picture.title}
              imgPath={picture.path}
              imgNumberInAlbum={(index + 1).toString()}
              onDeleteCard={deletePictureCard}
            />
          ))}
        </Grid>
        <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
          {(activeId != null) ? <PictureCard id={activeId} imgPath={getImgPathById(activeId)} albumId={albumId} onDeleteCard={deletePictureCard} isDragging /> : null}
        </DragOverlay>
      </SortableContext>

    </DndContext>
  )
};

export default AlbumGridEditor
