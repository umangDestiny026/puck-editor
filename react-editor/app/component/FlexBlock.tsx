import { DropZone } from '@puckeditor/core';
import React, { useMemo } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FlexBlock: React.FC<any> = ({
  direction = 'row',
  justify = 'flex-start',
  align = 'stretch',
  gap = 0,
  items = [],
  className = '',
  customCss,
}) => {
  const uniqueClass = useMemo(
    () => `flexbox-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: `${gap}px`,
  };

  return (
    <div style={style} className={`${className} ${uniqueClass}`}>
      {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items.map((_: any, index: any) => (
          <DropZone key={index} zone={`flex-item-${index}`} />
        ))
      }
    </div>
  );
};

export default FlexBlock;
