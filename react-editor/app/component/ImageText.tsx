'use client';

import React, { useId } from "react";

const ImageText: React.FC<any> = ({
    imagePosition = "left",
    gap = 40,
    paddingY = 60,

    image,
    imageWidth,
    imageHeight,
    imageMaxWidth,
    imageMaxHeight,
    imageBorderRadius = 0,
    imageObjectFit = "cover",

    title,
    subtitle,
    titleColor,
    subtitleColor,
    textAlign = "left",
    textMaxWidth,

    className = "",
    customCss,
}) => {
    const id = useId();
    const uniqueClass = `section-${id.replace(/:/g, "")}`;
    const isLeft = imagePosition === "left";

    const containerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: `${gap}px`,
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`,
        flexWrap: "wrap",
    };

    const imgStyle: React.CSSProperties = {
        width: imageWidth || "auto",
        height: imageHeight != null ? `${imageHeight}px` : "auto",
        maxWidth:
            imageMaxWidth != null ? `${imageMaxWidth}px` : "100%",
        maxHeight:
            imageMaxHeight != null ? `${imageMaxHeight}px` : undefined,
        borderRadius: `${imageBorderRadius}px`,
        objectFit: imageObjectFit,
        flexShrink: 0,
    };

    const textStyle: React.CSSProperties = {
        maxWidth:
            textMaxWidth != null ? `${textMaxWidth}px` : "100%",
        textAlign,
    };

    return (
        <div className={`${uniqueClass} ${className}`} style={containerStyle}>
            {customCss && (
                <style>{`.${uniqueClass} { ${customCss} }`}</style>
            )}

            {image && (
                <img src={image} alt={title || "Image"} style={imgStyle} />
            )}

            <div style={textStyle}>
                {title && (
                    <h2 style={{ color: titleColor, margin: 0 }}>
                        {title}
                    </h2>
                )}

                {subtitle && (
                    <p
                        style={{
                            color: subtitleColor,
                            marginTop: 8,
                        }}
                    >
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageText;