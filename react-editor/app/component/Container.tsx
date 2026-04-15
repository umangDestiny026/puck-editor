import { DropZone } from '@puckeditor/core';
import React, { useId } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container: React.FC<any> = ({
  className = '',
  customCss,
  marginValue,
  paddingValue,
  backgroundColor,
}) => {
  const id = useId();
  const uniqueClass = `container-${id.replace(/:/g, '')}`;

  const style: React.CSSProperties = {
    margin: marginValue != null ? `0 ${marginValue}px` : '0 auto',
    padding: paddingValue != null ? `${paddingValue}px` : undefined,
    backgroundColor: backgroundColor || undefined,
    minHeight: '120px',
  };

  return (
    <div className={`${uniqueClass} ${className}`} style={style}>
      {customCss && (
        <style>
          {`
            .${uniqueClass} {
              ${customCss}
            }
          `}
        </style>
      )}

      <DropZone zone="content" />
    </div>
  );
};

export default Container;
