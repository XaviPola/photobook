import React from 'react';
import type { HTMLAttributes, CSSProperties } from 'react';

export type ButtonProps = HTMLAttributes<HTMLButtonElement> & {
    copy: string;
    href?: string;
    onClick?: () => void;
    };

const ButtonComponent = ({ copy, href, onClick }: ButtonProps) => {
  return (
    <button style={styles.button}>
      <a onClick={onClick} href={href} style={styles.link}>{copy}</a>
    </button>
  );
}

const styles = {
  button: {
    backgroundColor: 'black',
    opacity: 0.3,
    color: 'white',
    gap: '8px',
    padding: '8px',
    borderRadius: '8px',
    fontSize: '12px',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 300,
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none', // Ensuring link text has no underline
    color: 'inherit', // Inherit color from parent button
  },

};

export default ButtonComponent;
