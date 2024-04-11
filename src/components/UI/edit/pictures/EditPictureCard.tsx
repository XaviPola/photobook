import React, { useState, forwardRef } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import Button from '@components/UI/edit/pictures/Button.tsx';
import type { Picture } from './Board';

export type EditPictureCardProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    albumId: string;
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    onclose: () => void;
    imgPath: string;
    imgTitle?: string;
    imgDescription?: string;
};

const EditPictureCard =  forwardRef<HTMLDivElement, EditPictureCardProps> (
    (
        {id, imgTitle, albumId, imgDescription, imgPath, onclose, setTitle, setDescription}, ref
        ) => {

    const inlineContainerStyles: CSSProperties = {
        maxWidth: "75vh",
        height: "auto",
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
    };
    
    const inlineImgStyles: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: "8px",
        position: "relative",
        margin: "0 auto",
        top: "25%",
    };

    const contextStyles: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "10px",
        width: "100%",
        height: "auto",
    };

    const contextTextStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        height: "100%",
    };
    
    const inlineInputStyles: CSSProperties = {
        width: "85%",
        height: "80%",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.2)",
        padding: "10px 8px",
        margin: "10px",
    };

    const inlineBGStyles: CSSProperties = {
        top: "0", 
        left: "0",
        width: "100%",
        height: "100%",
        position: "fixed",
        background: "rgba(50,50,50,0.9)"
    };

    const handleUpdate = async (newTitle: string, newDescription: string) => {
        const title = newTitle;
        const description = newDescription;
        try {
          const response = await fetch(`http://localhost:1234/${albumId}/pictures/${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, description }),
          });
          if (!response.ok) {
            throw new Error('Failed to update picture');
          }
          console.log('Picture updated successfully');
        } catch (error) {
          console.error('Error updating picture:', error.message);
        }
      };

    const onSave = () => {
        let titleInput = document.getElementsByClassName("titleInput")[0] as HTMLInputElement;
        let title = titleInput.value;
        let descriptionInput = document.getElementsByClassName("descriptionInput")[0] as HTMLInputElement;
        let description = descriptionInput.value;

        setTitle(title);
        setDescription(description);
        handleUpdate(title, description);
        onclose();
    }

    const onDisplayTitle = imgTitle ? imgTitle : "";
    const onDisplayDescription = imgDescription ? imgDescription : "";

    return (
        <div style={inlineBGStyles}>
            <div style={inlineContainerStyles}>
            <img src={imgPath} style={inlineImgStyles}/>
            <div style={contextStyles}>
                <div style={contextTextStyles}>
                    <input 
                        className="titleInput" 
                        style={inlineInputStyles} 
                        placeholder='[Optional] Title to display' 
                        defaultValue={onDisplayTitle}
                    />

                    <input 
                        className="descriptionInput" 
                        style={inlineInputStyles} 
                        placeholder='[Optional] Description to display'
                        defaultValue={onDisplayDescription}
                    />
                </div>
                <Button copy="Save" onClick={onSave}/>
                <Button copy="Close" onClick={onclose}/>
            </div>
        </div>
    </div>
    );
});

export default EditPictureCard;
