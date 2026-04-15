import React, { useId, useState, useEffect } from 'react';

interface ImageProps {
  image?: string | { url: string; sourceMode?: string; _previewUrl?: string };
  alt?: string;
  align?: React.CSSProperties['textAlign'];
  className?: string;
  customCss?: string;
  widthValue?: string | number;
  widthUnit?: string;
  maxWidthValue?: string | number;
  maxWidthUnit?: string;
  heightValue?: string | number;
  heightUnit?: string;
  maxHeightValue?: string | number;
  maxHeightUnit?: string;
  objectFit?: React.CSSProperties['objectFit'];
  objectPosition?: React.CSSProperties['objectPosition'];
  overflow?: React.CSSProperties['overflow'];
  borderRadius?: React.CSSProperties['borderRadius'];
}

const placeholderStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 8,
  width: '100%',
  minHeight: 120,
  padding: 24,
  border: '2px dashed #d0d0d0',
  borderRadius: 8,
  background: '#f8f9fa',
  color: '#888',
  fontSize: 13,
  boxSizing: 'border-box',
};

const Image: React.FC<ImageProps> = ({
  image,
  alt = '',
  align = 'left',
  className = '',
  customCss,

  widthValue,
  widthUnit,
  maxWidthValue,
  maxWidthUnit,

  heightValue,
  heightUnit,
  maxHeightValue,
  maxHeightUnit,

  objectFit,
  objectPosition,
  overflow,
  borderRadius,
}) => {
  const id = useId();
  const uniqueClass = `image-${id.replace(/:/g, '')}`;
  const [imgError, setImgError] = useState(false);

  // Support both legacy string and new object format
  // Prefer _previewUrl (base64 data URL) for editor preview, fall back to stored URL
  const imageUrl =
    typeof image === 'string' ? image : image?._previewUrl || image?.url;

  // Reset error state when image URL changes (e.g. after upload provides _previewUrl)
  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const hasImage = imageUrl && imageUrl.length > 0;

  const wrapperStyle: React.CSSProperties = {
    textAlign: align,
    overflow,
  };

  const imgStyle: React.CSSProperties = {
    display: 'inline-block',

    width: widthValue != null ? `${widthValue}${widthUnit}` : undefined,

    maxWidth:
      maxWidthValue != null ? `${maxWidthValue}${maxWidthUnit}` : undefined,

    height: heightValue != null ? `${heightValue}${heightUnit}` : undefined,

    maxHeight:
      maxHeightValue != null ? `${maxHeightValue}${maxHeightUnit}` : undefined,

    objectFit,
    objectPosition,
    borderRadius,
  };

  return (
    <div style={wrapperStyle} className={`${className} ${uniqueClass}`}>
      {customCss && <style>{`.${uniqueClass} { ${customCss} }`}</style>}

      {/* Show image if available and not broken */}
      {hasImage && !imgError && (
        <img
          src={imageUrl}
          alt={alt}
          style={imgStyle}
          onError={() => setImgError(true)}
        />
      )}

      {/* Placeholder when no image or image failed to load */}
      {(!hasImage || imgError) && (
        <div style={placeholderStyle}>
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#bbb"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <span>
            {imgError
              ? 'Image could not be loaded'
              : 'Use the props panel to add an image'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Image;
