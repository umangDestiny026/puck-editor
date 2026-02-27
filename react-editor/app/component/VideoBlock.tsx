import React, { useId } from "react";

type VideoBlockProps = {
  url?: string;

  width?: number;
  widthUnit?: string;

  maxWidth?: number;

  height?: number;
  maxHeight?: number;

  className?: string;
  customCss?: string;
};

const VideoBlock: React.FC<VideoBlockProps> = ({
  url,
  width,
  widthUnit = "%",
  maxWidth,
  height = 400,
  maxHeight,
  className = "",
  customCss,
}) => {
  const id = useId();
  const uniqueClass = `video-${id.replace(/:/g, "")}`;

  const wrapperStyle: React.CSSProperties = {
    width:
      width != null ? `${width}${widthUnit}` : undefined,
    maxWidth:
      maxWidth != null ? `${maxWidth}px` : undefined,
    margin: "0 auto",
  };

  const iframeStyle: React.CSSProperties = {
    width: "100%",
    height:
      height != null ? `${height}px` : undefined,
    maxHeight:
      maxHeight != null ? `${maxHeight}px` : undefined,
    maxWidth:
      maxWidth != null ? `${maxWidth}px` : undefined,
    borderRadius: 8,
    display: "block",
  };

  if (!url) return null;

  return (
    <div
      className={`video-wrapper ${className} ${uniqueClass}`}
      style={wrapperStyle}
    >
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}

      <iframe
        src={url}
        title="Video"
        allowFullScreen
        style={iframeStyle}
      />
    </div>
  );
};

export default VideoBlock;