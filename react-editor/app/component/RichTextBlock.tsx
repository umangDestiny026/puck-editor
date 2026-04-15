import React, { useId } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RichTextBlock: React.FC<any> = ({
  content,
  className = '',
  customCss,
}) => {
  const id = useId();
  const uniqueClass = `text-${id.replace(/:/g, '')}`;

  return (
    <div className={`${uniqueClass} ${className}`}>
      {customCss && (
        <style>
          {`
            .${uniqueClass} {
              ${customCss}
            }
          `}
        </style>
      )}

      {content}
    </div>
  );
};

export default RichTextBlock;
