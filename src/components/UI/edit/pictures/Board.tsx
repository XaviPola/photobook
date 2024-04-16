import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Button from '@components/UI/edit/pictures/Button.tsx';
import AlbumGridEditor from './AlbumGridEditor';
import ImagesUploader from './ImagesUploader.tsx';


export type Picture = {
    id: number;
    path: string;
    title?: string;
    description?: string;
    orderInAlbum?: number;
};

const EditPictureBoard: FC = () => {
    const [pictures, setPictures] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const albumId = '1';
    
    useEffect(() => {
        if (pictures.length === 0 || refresh === true) {
            console.log('fetching pictures');
            fetch(`http://localhost:1234/pictures/${albumId}`)
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    console.log('data:', data);
                    if (data === null) {
                        setPictures([]);
                    } else {
                    const pictures = Object.values(data);
                    const sortedPictures = pictures.sort((a, b) => a.orderInAlbum - b.orderInAlbum);
                    console.log('sortedPictures:', sortedPictures);
                    setPictures(sortedPictures);};
                    setRefresh(false);
                });
        }
    }, [refresh]);

    if (pictures.length > 0) {
        return (
            <AlbumGridEditor albumId={albumId} pictures={pictures} setPictures={setPictures} refresh={refresh} setRefresh={setRefresh} />
        );}
    else {
        return (
            <ImagesUploader albumId={albumId} refresh={refresh} setRefresh={setRefresh} />
        );
    }
}
;

export default EditPictureBoard;