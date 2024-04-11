import React, { useState, useRef } from 'react';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';
import type { Picture } from './Board';

interface MultipleFileUploaderProps {
  albumId: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
}

const MultipleFileUploader = ({ albumId, setRefresh }: MultipleFileUploaderProps) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [updatedPictures, setUpdatedPictures] = useState([]);

  const hiddenFileInput = useRef(null);
  
  const handleAllUpdate = async (pictures: Picture[]) => {
    try {
      const response = await fetch(`http://localhost:1234/pictures/${albumId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pictures }),
      });
      if (!response.ok) {
        throw new Error('Failed to update picture');
      }

      console.log('Album pictures updated successfully');
    } catch (error) {
      console.error('Error updating album picture:', (error as Error).message);
    }
  };

  const updatePictures = (newPreviewImages: string[]) => {
    console.log(newPreviewImages)
    let pictures = newPreviewImages.map((picture, index) => {
      return {
        id: index,
        url: picture,
        title: '',
        description: '',
        order: 0,
      };
    });
    console.log(pictures)
    handleAllUpdate(pictures);
    setRefresh(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  }

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    const newPreviewImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file)
      newPreviewImages.push(URL.createObjectURL(file));
    }
    setPreviewImages(newPreviewImages);
    updatePictures(newPreviewImages);
  }

  const openFileInput = () => {
    hiddenFileInput.current.click();
  }

  const handleFileSelect = (event) => {
    const files = event.target.files;
    const newPreviewImages = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      console.log(file)
      newPreviewImages.push(URL.createObjectURL(file));
    }
    setPreviewImages(newPreviewImages);
    updatePictures(newPreviewImages);
  }

  const inlineBGStyles: CSSProperties = {

    width: "100%",
    height: "100%",
  };

  return (
    <div style={inlineBGStyles}>
      <div
        style={{ width: "100%", border: '1px dashed #ccc', padding: '20px', marginBottom: '20px' }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={openFileInput}
      >
        Drop files here or click to select
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          multiple
        />
      </div>
      <div>
        {previewImages.map((previewImage, index) => (
          <img
            key={index}
            src={previewImage}
            alt={`Preview ${index + 1}`}
            style={{ width: '100px', height: 'auto', marginRight: '10px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default MultipleFileUploader;
