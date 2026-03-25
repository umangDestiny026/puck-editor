'use client';

import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

const FlexBlock: React.FC<any> = ({
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  items = [],
  wrap = "nowrap",
  className = "",
  customCss,
}) => {
  const uniqueClass = useMemo(
    () => `flexbox-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: `${gap}px`,
    flexWrap: "nowrap", // default: no wrap on desktop
  };

  return (
    <div style={style} className={`${className} ${uniqueClass}`}>
      {/* Wrap only on mobile (< 768px) and tablet (768px - 1024px) */}
      <style>{`
        @media (max-width: 1024px) {
          .${uniqueClass} {
            flex-wrap: ${wrap} !important;
          }
        }
        ${customCss ? `.${uniqueClass} { ${customCss} }` : ""}
      `}</style>

      {items.map((_: any, index: any) => (
        <DropZone key={index} zone={`flex-item-${index}`} />
      ))}
    </div>
  );
};

export default FlexBlock;