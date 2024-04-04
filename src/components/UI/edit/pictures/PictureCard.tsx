import React, { forwardRef, useState } from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import EditPictureCard from './EditPictureCard';
import ReactDOM from 'react-dom';

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
    // const [editing, setEditing] = React.useState(false);

    // const handleEdit = () => {
    //     setEditing(!editing);
    // }

    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => {
        console.log("openPopup");
        setIsPopupOpen(true);
      };

    const closePopup = () => {
        setIsPopupOpen(false);
    };
    
    const inlineStyles: CSSProperties = {
        width: "auto",
        height: "auto",
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
    };

    const contextTextStyles: CSSProperties = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "80%",
        height: "100%",
    };

    const buttonStyles: CSSProperties = {
        width: "30px",
        height: "30px",
        resize: "both",
        cursor: "pointer",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "6px",
        margin: "0",
        padding: "0",
        alignSelf: "bottom",
        alignContent: "bottom"
    };

    return <div ref={ref} style={inlineStyles} {...props}>
        <img src={imgPath} style={inlineImgStyles}/>
        <h2>{ imgNumberInAlbum }</h2>
        <div style={contextStyles}>
        <div style={contextTextStyles}>
            <h3>{ imgTitle }</h3>
            <p>{imgDescription}</p>
        </div>
        <button onClick={openPopup} style={buttonStyles}>
            
            {/* <Edit/> */}
            Edit
        </button>
        </div>
        {isPopupOpen && (
            ReactDOM.createPortal(
                <EditPictureCard onclose={closePopup} imgPath={imgPath} imgDescription={imgDescription} imgTitle={imgTitle}/>, document.body))
        }
    </div>
    ;
});

export default PictureCard;
