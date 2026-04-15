import { DropZone } from '@puckeditor/core';
import React, { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridZone: React.FC<any> = ({
  id,
  columns = 1,
  rows,
  gap = 0,
  alignItems = 'stretch',
  justifyItems = 'stretch',
  maxWidth,
  padding = 0,
  className = '',
  customCss,
}) => {
  const gridId = useMemo(() => `grid-${id}`, [id]);

  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: rows ? `repeat(${rows}, auto)` : undefined,
  };

  return (
    <>
      <style>
        {`
          .${gridId} {
            gap: ${gap}px;
            align-items: ${alignItems};
            justify-items: ${justifyItems};
            ${maxWidth != null ? `max-width: ${maxWidth}px;` : ''}
            padding: ${padding}px;
            margin: 0 auto;
          }

          ${customCss ? `.${gridId} { ${customCss} }` : ''}
        `}
      </style>

      <div className={`${gridId} ${className}`} style={containerStyle}>
        {Array.from({
          length: columns,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }).map((_: any, index: number) => (
          <DropZone
            key={index}
            zone={`grid-zone-${id}-${index}`}
            style={{
              minHeight: '50px',
            }}
          />
        ))}
      </div>
    </>
  );
};

export default GridZone;
