import React, { useState } from 'react';
import type { ChangeEvent, DragEvent, Dispatch, SetStateAction } from 'react';
import axios from 'axios';

interface ImagesUploaderProps {
    albumId: string;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

function ImagesUploader({ albumId, refresh, setRefresh }: ImagesUploaderProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const filesArray = Array.from(event.target.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);

            const newPreviews = Array.from(event.target.files).map(file => URL.createObjectURL(file));
            setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            const filesArray = Array.from(event.dataTransfer.files);
            setSelectedFiles(prevFiles => [...prevFiles, ...filesArray]);

            const newPreviews = Array.from(event.dataTransfer.files).map(file => URL.createObjectURL(file));
            setPreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
        }
    };

    const handleUpload = async () => {
        const uploadPromises = selectedFiles.map(async (file) => {
            const formData = new FormData();
            formData.append('image', file);

            try {
                const response = await axios.post(`http://localhost:1234/pictures/upload/${albumId}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Upload successful:', response.data);
            } catch (error) {
                console.error('Upload failed:', error);
            }
        });

        try {
            await Promise.all(uploadPromises);
            const a = setRefresh(!refresh);
            console.log("refresh happened", a)
            alert('All images uploaded successfully!');
        } catch (error) {
            console.error('Error uploading images:', error);
            alert('Some images failed to upload. Please try again.');
        }
    };

    return (
        <div
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px dashed #aaa'
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
        >
            <div style={{ textAlign: 'center' }}>
                <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    multiple
                />
                <p>Drag & Drop images here</p>

                <button onClick={handleUpload}>Upload All</button>
                {previews.length > 0 && (
                    <div>
                        <h3>Selected Images:</h3>
                        {previews.map((preview, index) => (
                            <img key={index} src={preview} alt={`Preview ${index}`} style={{ width: '100px', height: 'auto', margin: '5px' }} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ImagesUploader;
