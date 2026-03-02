'use client';

import React, { useId } from "react";

const Image: React.FC<any> = ({
  sourceType = "image",
  image,
  alt = "",
  align = "left",
  className = "",
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
  const uniqueClass = `image-${id.replace(/:/g, "")}`;

  if (sourceType === "gallery") {
    return (
      <div style={{ padding: 16, border: "1px dashed #ccc" }}>
        Gallery integration placeholder
      </div>
    );
  }

  const wrapperStyle: React.CSSProperties = {
    textAlign: align,
    overflow,
  };

  const imgStyle: React.CSSProperties = {
    display: "inline-block",

    width:
      widthValue != null
        ? `${widthValue}${widthUnit}`
        : undefined,

    maxWidth:
      maxWidthValue != null
        ? `${maxWidthValue}${maxWidthUnit}`
        : undefined,

    height:
      heightValue != null
        ? `${heightValue}${heightUnit}`
        : undefined,

    maxHeight:
      maxHeightValue != null
        ? `${maxHeightValue}${maxHeightUnit}`
        : undefined,

    objectFit,
    objectPosition,
    borderRadius,
  };

  return (
    <div style={wrapperStyle} className={`${className} ${uniqueClass}`}>
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}
      {image && (
        <img src={image} alt={alt} style={imgStyle} />
      )}
    </div>
  );
};

export default Image;