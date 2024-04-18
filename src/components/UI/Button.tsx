import React from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';
import BasicButtonComponent from './BasicButton';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    copy: string;
    href?: string;
    onClick?: () => void;
    extraStyles?: CSSProperties;
    };



const ButtonComponent = ({ copy, href, onClick, extraStyles }: ButtonProps) => {
    const buttonStyles = {
        backgroundColor: 'black',
        opacity: 0.4,
        color: 'white',
        fontSize: '12px',
        fontFamily: '"Roboto", sans-serif',
        fontWeight: 300,
    };
    
    const styles = extraStyles !== undefined ? { ...buttonStyles, ...extraStyles } : buttonStyles;
    const Anchor = <a href={href}>{copy}</a>;
    
    return (
            <BasicButtonComponent element={Anchor} onClick={onClick} extraStyles={styles} />
        );
}
export default ButtonComponent;
