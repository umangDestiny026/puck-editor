import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

type FlexBlockProps = {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  gap?: number;
  items?: any[];
  className?: string;
  customCss?: string;
};

const FlexBlock: React.FC<FlexBlockProps> = ({
  direction = "row",
  justify = "flex-start",
  align = "stretch",
  gap = 0,
  items = [],
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
  };

  return (
    <div style={style} className={`${className} ${uniqueClass}`}>
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}

      {items.map((_, index) => (
        <DropZone key={index} zone={`flex-item-${index}`} />
      ))}
    </div>
  );
};

export default FlexBlock;