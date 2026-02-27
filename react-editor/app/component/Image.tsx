import React, { useId } from "react";

type ImageBlockProps = {
  sourceType?: "image" | "gallery";
  image?: string;
  alt?: string;
  align?: React.CSSProperties["textAlign"];
  className?: string;
  customCss?: string;

  widthValue?: number;
  widthUnit?: string;
  maxWidthValue?: number;
  maxWidthUnit?: string;

  heightValue?: number;
  heightUnit?: string;
  maxHeightValue?: number;
  maxHeightUnit?: string;

  objectFit?: React.CSSProperties["objectFit"];
  objectPosition?: React.CSSProperties["objectPosition"];
  overflow?: React.CSSProperties["overflow"];
  borderRadius?: string;
};

const Image: React.FC<ImageBlockProps> = ({
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