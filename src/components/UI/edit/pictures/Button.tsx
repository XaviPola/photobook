import React from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    copy: string;
    href?: string;
    onClick?: () => void;
    };

const ButtonComponent = ({ copy, href, onClick }: ButtonProps) => {
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
                {...styles.button,
                ...(hover ? styles.button.hover : null),
                ...(clicked ? styles.button.clicked : null)
                }}
        >        
            <a onClick={onClick} href={href} style={styles.link}>{copy}</a>
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
    textDecoration: 'none', // Ensuring link text has no underline
    color: 'inherit', // Inherit color from parent button
  },

};

export default ButtonComponent;
