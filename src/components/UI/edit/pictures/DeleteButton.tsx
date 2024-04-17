import React from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import BasicButtonComponent from '@components/UI/BasicButton';
import DeleteIcon from '@components/UI/icons/Delete';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    extraStyles?: CSSProperties;
    };

const DeleteButton = ({ onClick, extraStyles }: ButtonProps) => {    
    const deleteButtonStyles = {
        display: "flex",
        width: "26px",
        height: "26px",
        border: "none",
        padding: "0",
        margin: "0",
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    };

    const styles = extraStyles !== undefined ? { ...deleteButtonStyles, ...extraStyles } : deleteButtonStyles;
        
    return (
            <BasicButtonComponent element={<DeleteIcon />} onClick={onClick} extraStyles={styles} />
        );
}
export default DeleteButton;
