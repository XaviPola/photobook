import { useState, useCallback, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import type { DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from '@components/UI/edit/pictures/Grid.tsx';
import SortablePictureCard from '@components/UI/edit/pictures/SortablePictureCard.tsx';
import PictureCard from '@components/UI/edit/pictures/PictureCard.tsx';
import type { Picture } from './Board';


interface AlbumGridEditorProps {
    pictures: Picture[];
    setPictures: React.Dispatch<React.SetStateAction<never[]>>;
}

const AlbumGridEditor: FC<AlbumGridEditorProps> = (props) => {
    const handleAllUpdate = async (pictures: Picture[]) => {
        try {
          const response = await fetch(`http://localhost:1234/myAlbum/pictures`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              // You might need to include an Authorization header if required
            },
            body: JSON.stringify({ pictures }),
          });
          if (!response.ok) {
            throw new Error('Failed to update picture');
          }
          // Handle successful update
          console.log('Album pictures updated successfully');
        } catch (error) {
          console.error('Error updating album picture:', error.message);
        }
      };

    
    const [save, setSave] = useState(false);
    
    useEffect(() => {

        if (save) {
            handleAllUpdate(pictures);
            setSave(false);
        }
    }, [save]);

    const {pictures, setPictures} = props;
    const itemIds = useMemo(() => pictures.map((picture) => picture.id.toString()), [pictures]);

    const [activeId, setActiveId] = useState<string | null>(null);


    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
            distance: 8,
        },
        }), 
        useSensor(TouchSensor, {
            activationConstraint: {
                distance: 8,
            },
        }));
      
    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id.toString());
    }, []);
    
    function getIndexById(pictureId: string): number {
        return pictures.findIndex((picture) => picture.id.toString() === pictureId);
    }
    
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setPictures((pictures) => {
                const oldIndex = getIndexById(active.id.toString());
                const newIndex = getIndexById(over!.id.toString());

                const newPictures = [...pictures];

                newPictures.splice(oldIndex, 1);
                newPictures.splice(newIndex, 0, pictures[oldIndex]);

                newPictures.forEach((picture, index) => {
                    picture.order = index + 1;
                });
                
                return newPictures;
            });
        }

        setActiveId(null);
        setSave(true);
    }, [pictures]);
    
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={itemIds} strategy={rectSortingStrategy}>
                <Grid >
                    {pictures.map((picture, index) => (
                        <SortablePictureCard key={picture.id} id={picture.id.toString()} imgDescription={picture.description} imgTitle={picture.title} imgPath={picture.url} imgNumberInAlbum={(index + 1).toString()}/>
                    ))}
                </Grid>
                <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                    {activeId ? <PictureCard id={activeId} imgPath={`/demo_images/${activeId}.png`} isDragging /> : null}
                </DragOverlay>
            </SortableContext>
            
        </DndContext>
    );
};

export default AlbumGridEditor;
