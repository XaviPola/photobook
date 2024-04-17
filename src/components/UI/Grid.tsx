import React from 'react';
import type { FC } from 'react';
type GridProps = {
    children: React.ReactNode;
};

const Grid: FC<GridProps> = ({ children }) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fill, minmax(10rem, 1fr))`,
                gridTemplateRows: 'auto',
                gridGap: 10,
                width: '100%',
                margin: '0 auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {children}
        </div>
    );
};

export default Grid;
