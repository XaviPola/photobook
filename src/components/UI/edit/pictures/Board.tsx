import type { FC } from 'react';
import { useState, useCallback, useEffect } from 'react';
import Button from '@components/UI/edit/pictures/Button.tsx';
import AlbumGridEditor from './AlbumGridEditor';


export type Picture = {
    id: number;
    url: string;
    title: string;
    description: string;
    order: number;
};

const EditPictureBoard: FC = () => {
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
                    console.log('data:', data);
                    setPictures(data.pictures);
                    setRefresh(false);
                });
        }
    }, [refresh]);

    return (
        <div>
            <AlbumGridEditor pictures={pictures} setPictures={setPictures}/>
        </div>
    );
};

export default EditPictureBoard;