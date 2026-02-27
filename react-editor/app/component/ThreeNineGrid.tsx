import { DropZone } from "@puckeditor/core";
import React, { useMemo } from "react";

type ThreeNineGridBlockProps = {
  id: string;
  gap?: number;
  stackOnMobile?: "stack" | "no-stack";
  padding?: number;
  className?: string;
  customCss?: string;
};

const ThreeNineGrid: React.FC<ThreeNineGridBlockProps> = ({
  id,
  gap = 20,
  stackOnMobile = "stack",
  padding = 0,
  className = "",
  customCss,
}) => {
  const gridId = useMemo(() => `three-nine-${id}`, [id]);

  return (
    <>
      <style>
        {`
          .${gridId} {
            display: grid;
            grid-template-columns: 3fr 9fr;
            gap: ${gap}px;
            padding: ${padding}px;
            margin: 0 auto;
          }

          /* Tablet */
          @media (max-width: 1024px) {
            .${gridId} {
              grid-template-columns: 1fr;
            }
          }

          /* Mobile */
          @media (max-width: 768px) {
            .${gridId} {
              ${
                stackOnMobile === "stack"
                  ? "grid-template-columns: 1fr;"
                  : "grid-template-columns: 3fr 9fr;"
              }
            }
          }

          ${
            customCss
              ? `.${gridId} { ${customCss} }`
              : ""
          }
        `}
      </style>

      <div className={`${gridId} ${className}`}>
        {/* Left (3fr) */}
        <DropZone
          zone={`three-nine-left-${id}`}
          style={{ minHeight: "80px" }}
        />

        {/* Right (9fr) */}
        <DropZone
          zone={`three-nine-right-${id}`}
          style={{ minHeight: "80px" }}
        />
      </div>
    </>
  );
};

export default ThreeNineGrid;