import { useState, useCallback } from 'react';
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
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from '@components/UI/edit/pictures/Grid.tsx';
import SortablePictureCard from '@components/UI/edit/pictures/SortablePictureCard.tsx';
import PictureCard from '@components/UI/edit/pictures/PictureCard.tsx';

const AlbumGridEditor: FC = () => {
    const [items, setItems] = useState(Array.from({ length: 8 }, (_, i) => (i + 1).toString()));
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id.toString());
    }, []);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id.toString());
                const newIndex = items.indexOf(over!.id.toString());

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);
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
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid >
                    {items.map((id, index) => (
                        <SortablePictureCard key={id} id={id} imgPath={`/demo_images/${id}.png`} imgNumberInAlbum={(index + 1).toString()}/>
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <PictureCard id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};

export default AlbumGridEditor;
