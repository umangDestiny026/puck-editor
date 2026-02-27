import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

type CardBlockProps = {
  id: string;

  borderRadius?: number;
  boxShadow?: string;

  width?: string;          // allow "100%" or "300px"
  maxWidth?: number;

  height?: string;

  padding?: number;
  backgroundColor?: string;
  border?: string;

  className?: string;
  customCss?: string;
};

const CardBlock: React.FC<CardBlockProps> = ({
  id,
  borderRadius = 8,
  boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
  width = "100%",
  maxWidth,
  height,
  padding = 16,
  backgroundColor = "#ffffff",
  border = "none",
  className = "",
  customCss,
}) => {
  const cardId = useMemo(() => `card-${id}`, [id]);

  return (
    <>
      <style>
        {`
          .${cardId} {
            border-radius: ${borderRadius}px;
            box-shadow: ${boxShadow};
            width: ${width};
            ${maxWidth != null ? `max-width: ${maxWidth}px;` : ""}
            ${height ? `height: ${height};` : ""}
            padding: ${padding}px;
            background-color: ${backgroundColor};
            border: ${border};
            box-sizing: border-box;
            margin: 0 auto;
            transition: all 0.3s ease;
          }

          ${
            customCss
              ? `.${cardId} { ${customCss} }`
              : ""
          }
        `}
      </style>

      <div className={`${cardId} ${className}`}>
        <DropZone zone={"card-content"} />
      </div>
    </>
  );
};

export default CardBlock;