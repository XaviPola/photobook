import { useState, useCallback, useEffect } from 'react';
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

const AlbumGridEditor: FC = () => {
    const [pictures, setPictures] = useState([]);

    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        if (refresh) {
            console.log('fetching pictures');
            fetch('http://localhost:1234/myAlbum/pictures')
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    setPictures(data.pictures);
                    setRefresh(false);
                });
        }
    }, [refresh]);

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

                return newPictures;
            });
        }

        setActiveId(null);
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
            <SortableContext items={pictures} strategy={rectSortingStrategy}>
                <Grid >
                    {pictures.map((picture, index) => (
                        <SortablePictureCard key={picture.id} id={picture.id} imgDescription={picture.description} imgTitle={picture.title} imgPath={picture.url} imgNumberInAlbum={(index + 1).toString()}/>
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
