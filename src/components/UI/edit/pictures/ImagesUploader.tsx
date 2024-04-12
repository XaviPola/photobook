import React, { useState } from 'react';
import type { ChangeEvent, DragEvent, Dispatch, SetStateAction, CSSProperties } from 'react';
import axios from 'axios';
import Button from '@components/UI/edit/pictures/Button.tsx';

interface ImagesUploaderProps {
    albumId: string;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
}

function ImagesUploader({ albumId, refresh, setRefresh }: ImagesUploaderProps) {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

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

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const inlineStyles: CSSProperties = {
        width: '100%',
        minHeight: '100vh',
        height: 'auto',
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        padding: "20px"
    };

    const inlineContainerStyles: CSSProperties = {
        width: '100%',
        minHeight: '100vh',
        height: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: isDragging ? "1px dashed rgba(0, 0, 0, 0.05)" : undefined,
        borderRadius: "8px",
        gap: "10px",
        backgroundColor: isDragging ? '#f9f9f9' : '#ffffff',
    };


    const inlineGridImageStyle: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(10rem, 1fr))`,
        gridTemplateRows: 'auto',
        gridGap: 10,
        width: '100%',
        margin: '0 auto',
        marginTop: '15px',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const imgInlineStyles: CSSProperties = {
        width: '100%',
        aspectRatio: '1',
        display: 'flex',
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        objectFit: 'cover',
        justifyContent: 'center',};

    return (
        <div
            style={inlineStyles}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div style={inlineContainerStyles}>
                <div style={{ textAlign: 'center', width: "100%" }}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        multiple
                    />
                    <p>Drag & Drop images here</p>

                
                    {previews.length > 0 && (
                        <div style={{width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                            <Button copy="Upload All" onClick={handleUpload}/>
                            <div style={inlineGridImageStyle}>
                            {previews.map((preview, index) => (
                                <img style={imgInlineStyles} key={index} src={preview} alt={`Preview ${index}`} />
                            ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ImagesUploader;
