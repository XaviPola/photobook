import React, { forwardRef, useState } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import EditPictureCard from './EditPictureCard';
import ReactDOM from 'react-dom';
import Button from '@components/UI/edit/pictures/Button';

export type PictureCardProps = HTMLAttributes<HTMLDivElement> & {
    id: string;
    imgPath: string;
    imgNumberInAlbum?: string;
    imgTitle?: string;
    imgDescription?: string;
    withOpacity?: boolean;
    isDragging?: boolean;
};

const PictureCard = forwardRef<HTMLDivElement, PictureCardProps>(({ id, imgPath, imgTitle, imgNumberInAlbum, imgDescription, withOpacity, isDragging, style, ...props }, ref) => {

    const [title, setTitle] = useState<string | undefined >(imgTitle ?? undefined);
    const [description, setDescription] = useState<string | undefined >(imgDescription ?? undefined );

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        setIsPopupOpen(true);
      };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    
    const inlineStyles: CSSProperties = {
        width: "auto",
        aspectRatio: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6px",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        cursor: isDragging ? 'grabbing' : 'grab',
        opacity: withOpacity ? '0.5' : '1',
        transformOrigin: '50% 50%',
        backgroundColor: '#ffffff',
        boxShadow: isDragging  ? 'rgb(63 63 68 / 5%) 0px 2px 0px 2px, rgb(34 33 81 / 15%) 0px 2px 3px 2px' : 'rgb(63 63 68 / 5%) 0px 0px 0px 1px, rgb(34 33 81 / 15%) 0px 1px 3px 0px',
        transform: isDragging ? 'scale(1.05)' : 'scale(1)',
        ...style,
    };

    const inlineImgStyles: CSSProperties = {
        width: "100%",
        height: "100%",
        borderRadius: "8px",
    };

    const contextStyles: CSSProperties = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "10px",
        width: "100%",
        height: "auto",
        gap: "6px",
    };

    const contextTextStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        height: "100%",
        gap: "10px",
    };

    const inlineTextStyles: CSSProperties = {
        margin: "0",
        minHeight: "21px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden",
    };

    return <div ref={ref} style={inlineStyles} {...props}>
        <img src={imgPath} style={inlineImgStyles}/>
        <h2 style={inlineTextStyles}>{ imgNumberInAlbum }</h2>
        <div style={contextStyles}>
        <div style={contextTextStyles}>
            <h3 style={inlineTextStyles}>{ title ? `${title}` : "" }</h3>
            <p style={inlineTextStyles}>{ description ? `${description}` : "" }</p>
        </div>
        <Button copy="Edit" onClick={openPopup}/>
        </div>
        {isPopupOpen && (
            ReactDOM.createPortal(
                <EditPictureCard 
                    onclose={closePopup} 
                    setTitle={setTitle} 
                    setDescription={setDescription} 
                    imgPath={imgPath} 
                    imgDescription={description} 
                    imgTitle={title}
                />, 
                document.body
            )
            )
        }
    </div>
    ;
});

export default PictureCard;
