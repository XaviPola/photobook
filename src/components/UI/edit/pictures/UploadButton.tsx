import React from "react";
import type { HTMLAttributes, CSSProperties } from "react";
import BasicButtonComponent from "@components/UI/BasicButton";
import UploadIcon from "@components/UI/icons/UploadFiles";

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    onClick?: () => void;
    extraStyles?: CSSProperties;
};

const UploadButton = ({ onClick, extraStyles }: ButtonProps) => {
    const uploadButtonStyles = {
        position: "fixed",
        display: "flex",
        bottom: "26px",
        right: "26px",
        border: "none",
        borderRadius: "50%",
        width: "70px",
        height: "70px",
        transition: "all 0.3s ease",
        boxShadow: "0 5px 20px rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
    };

    const styles = extraStyles !== undefined ? { ...uploadButtonStyles, ...extraStyles } : uploadButtonStyles;

    return (
        <BasicButtonComponent element={<UploadIcon color="white" />} onClick={onClick} extraStyles={styles} />
    );
};

export default UploadButton;