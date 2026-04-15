import React, { useId } from 'react';

export type ButtonType =
  | 'default'
  | 'primary'
  | 'basic'
  | 'success'
  | 'info'
  | 'danger'
  | 'link';

export interface CardBlockProps {
  image?: string | { url: string; sourceMode?: string; _previewUrl?: string };
  imageWidth?: number;
  imageHeight?: number;
  imageMaxWidth?: number;
  imageMaxHeight?: number;
  imageBorderRadius?: number;
  imageObjectFit?: React.CSSProperties['objectFit'];
  imageAlign?: 'top' | 'left' | 'right';

  title?: string;
  titleColor?: string;
  description?: string;
  descriptionColor?: string;
  textAlign?: React.CSSProperties['textAlign'];

  buttonText?: string;
  buttonType?: ButtonType;
  buttonHref?: string;
  buttonExternal?: boolean;

  className?: string;
  customCss?: string;

  cardWidth?: number;
  cardMaxWidth?: number;
  cardPadding?: number;
  cardBorderRadius?: number;
  cardShadow?: string;
}

const buttonTypes: Record<ButtonType, React.CSSProperties> = {
  default: {
    background: '#e5e7eb',
    color: '#111827',
  },
  primary: {
    background: '#2563eb',
    color: '#fff',
  },
  basic: {
    background: 'transparent',
    color: '#111827',
    border: '1px solid #d1d5db',
  },
  success: {
    background: '#16a34a',
    color: '#fff',
  },
  info: {
    background: '#0284c7',
    color: '#fff',
  },
  danger: {
    background: '#dc2626',
    color: '#fff',
  },
  link: {
    background: 'transparent',
    color: '#2563eb',
    padding: 0,
  },
};

const Card = ({
  image,
  imageWidth,
  imageHeight,
  imageMaxWidth,
  imageMaxHeight,
  imageBorderRadius = 0,
  imageObjectFit = 'cover',
  imageAlign = 'top',

  title,
  titleColor,
  description,
  descriptionColor,
  textAlign = 'left',

  buttonText,
  buttonType = 'default',
  buttonHref = '#',
  buttonExternal = false,

  className = '',
  customCss,

  cardWidth,
  cardMaxWidth,
  cardPadding = 16,
  cardBorderRadius = 8,
  cardShadow,
}: CardBlockProps) => {
  const id = useId();
  const uniqueClass = `card-${id.replace(/:/g, '')}`;

  const isHorizontal = imageAlign === 'left' || imageAlign === 'right';

  const containerStyle: React.CSSProperties = {
    display: isHorizontal ? 'flex' : 'block',
    flexDirection: imageAlign === 'right' ? 'row-reverse' : 'row',
    width: cardWidth ? `${cardWidth}px` : '100%',
    maxWidth: cardMaxWidth ? `${cardMaxWidth}px` : '100%',
    padding: `${cardPadding}px`,
    borderRadius: `${cardBorderRadius}px`,
    boxShadow: cardShadow,
    alignItems: 'flex-start',
    gap: isHorizontal ? '12px' : undefined,
  };

  const imgStyle: React.CSSProperties = {
    width: imageWidth ? `${imageWidth}px` : '100%',
    height: imageHeight ? `${imageHeight}px` : 'auto',
    maxWidth: imageMaxWidth ? `${imageMaxWidth}px` : '100%',
    maxHeight: imageMaxHeight ? `${imageMaxHeight}px` : undefined,
    borderRadius: `${imageBorderRadius}px`,
    objectFit: imageObjectFit,
    display: 'block',
  };

  const textStyle: React.CSSProperties = {
    textAlign,
    flex: isHorizontal ? 1 : undefined,
  };

  const buttonStyle: React.CSSProperties = {
    display: buttonText ? 'inline-block' : 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    padding: buttonType === 'link' ? undefined : '8px 16px',
    borderRadius: '6px',
    marginTop: '12px',
    ...buttonTypes[buttonType],
  };

  const imageUrl =
    typeof image === 'string' ? image : image?._previewUrl || image?.url;

  return (
    <div className={`${uniqueClass} ${className}`} style={containerStyle}>
      {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

      {imageUrl && (
        <img src={imageUrl} alt={title ?? 'Card image'} style={imgStyle} />
      )}

      <div style={textStyle}>
        {title && (
          <h3
            style={{
              color: titleColor,
              margin: 0,
            }}
          >
            {title}
          </h3>
        )}

        {description && (
          <p
            style={{
              color: descriptionColor,
              marginTop: 6,
            }}
          >
            {description}
          </p>
        )}

        {buttonText && (
          <a
            href={buttonHref}
            target={buttonExternal ? '_blank' : undefined}
            rel={buttonExternal ? 'noopener noreferrer' : undefined}
            style={buttonStyle}
          >
            {buttonText}
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
