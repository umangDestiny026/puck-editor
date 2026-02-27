import { DropZone } from "@puckeditor/core";
import React, { useId } from "react";

type FlexProps = {
  direction?: React.CSSProperties["flexDirection"];
  wrap?: React.CSSProperties["flexWrap"];
  justifyContent?: React.CSSProperties["justifyContent"];
  alignItems?: React.CSSProperties["alignItems"];
  gap?: number;
  flex?: string;

  className?: string;
  customCss?: string;
};

const Flexs: React.FC<FlexProps> = ({
  direction = "row",
  wrap = "nowrap",
  justifyContent = "flex-start",
  alignItems = "stretch",
  gap = 0,
  flex,
  className = "",
  customCss,
}) => {
  const id = useId();
  const flexId = `flex-${id.replace(/:/g, "")}`;

  return (
    <>
      <style>
        {`
          .${flexId} {
            ${flex ? `flex: ${flex};` : ""}
          }

          ${
            customCss
              ? `.${flexId} { ${customCss} }`
              : ""
          }
        `}
      </style>

      <DropZone
        zone="flex-zone"
        className={`${flexId} ${className}`}
        style={{
          display: "flex",
          gap: `${gap}px`,
          flexDirection: direction,
          flexWrap: wrap,
          alignItems: alignItems,
          justifyContent: justifyContent,
        }}
      />
    </>
  );
};

export default Flexs;