import React from 'react';
import type { HTMLAttributes, CSSProperties, ReactNode } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    element: ReactNode;
    onClick?: () => void;
    extraStyles?: CSSProperties;
    };

const BasicButtonComponent = ({ element, onClick, extraStyles }: ButtonProps) => {
    const [hover, setHover] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);
    
    const onClickHandler = () => {
        setClicked(false);
        if (onClick) {
            onClick();
        }
    } 
    
    return (
        <button 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onMouseDown={() => setClicked(true)}
            onClick={onClickHandler}
            style={
                {
                ...styles.button,
                ...(hover ? styles.button.hover : null),
                ...(clicked ? styles.button.clicked : null),
                ...extraStyles ? extraStyles : null
                }}
        >        
            {element}
        </button>
  );
}

const styles = {
  button: {
    width: 'fit-content',
    height: 'fit-content',
    backgroundColor: 'black',
    opacity: 0.7,
    color: 'white',
    gap: '8px',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 300,
    cursor: 'pointer',

    hover: {
        opacity: 1,
        },

    clicked: {
        backgroundColor: 'white',
        color: 'black',
        },
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },

};

export default BasicButtonComponent;
