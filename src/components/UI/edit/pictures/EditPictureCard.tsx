import React, { useState, forwardRef } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import Button from '@components/UI/edit/pictures/Button.tsx';

export type EditPictureCardProps = HTMLAttributes<HTMLDivElement> & {
    setTitle: (title: string) => void;
    setDescription: (description: string) => void;
    onclose: () => void;
    imgPath: string;
    imgTitle?: string;
    imgDescription?: string;
};

const EditPictureCard =  forwardRef<HTMLDivElement, EditPictureCardProps> (
    (
        {imgTitle, imgDescription, imgPath, onclose, setTitle, setDescription}, ref
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

    const onSave = () => {
        let title = document.getElementsByClassName("titleInput")[0].value;
        let description = document.getElementsByClassName("descriptionInput")[0].value;
        setTitle(title);
        setDescription(description)
        onclose();
    }

    const defaultTitle = "Title";
    const onDisplayTitle = imgTitle ? imgTitle : defaultTitle;
    const defaultDescription = "Description";
    const onDisplayDescription = imgDescription ? imgDescription : defaultDescription;

    return (
        <div style={inlineBGStyles}>
            <div style={inlineContainerStyles}>
            <img src={imgPath} style={inlineImgStyles}/>
            <div style={contextStyles}>
                <div style={contextTextStyles}>
                    <input className="titleInput" style={inlineInputStyles} defaultValue={onDisplayTitle}/>

                    <input className="descriptionInput" style={inlineInputStyles} defaultValue={onDisplayDescription}/>
                </div>
                <Button copy="Save" onClick={onSave}/>
                <Button copy="Close" onClick={onclose}/>
            </div>
        </div>
    </div>
    );
});

export default EditPictureCard;
