import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

type GridBlockProps = {
  id: string;

  columns?: number;
  rows?: number;

  gap?: number;
  alignItems?: React.CSSProperties["alignItems"];
  justifyItems?: React.CSSProperties["justifyItems"];

  maxWidth?: number;
  padding?: number;

  className?: string;
  customCss?: string;
};

const GridZone: React.FC<GridBlockProps> = ({
  id,
  columns = 1,
  rows,
  gap = 0,
  alignItems = "stretch",
  justifyItems = "stretch",
  maxWidth,
  padding = 0,
  className = "",
  customCss,
}) => {
  const gridId = useMemo(() => `grid-${id}`, [id]);

  const containerStyle: React.CSSProperties = {
    display: "grid",
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
            ${maxWidth != null ? `max-width: ${maxWidth}px;` : ""}
            padding: ${padding}px;
            margin: 0 auto;
          }

          ${
            customCss
              ? `.${gridId} { ${customCss} }`
              : ""
          }
        `}
      </style>

      <div className={`${gridId} ${className}`} style={containerStyle}>
        {Array.from({ length: columns }).map((_, index) => (
          <DropZone
            key={index}
            zone={`grid-zone-${id}-${index}`}
            style={{ minHeight: "50px" }}
          />
        ))}
      </div>
    </>
  );
};

export default GridZone;