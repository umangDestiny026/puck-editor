import { DropZone } from "@puckeditor/core";
import React, { useId } from "react";

type GridProps = {
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

const Grid: React.FC<GridProps> = ({
    columns = 1,
    rows = 1,
    gap = 0,
    alignItems = "stretch",
    justifyItems = "stretch",
    maxWidth,
    padding = 0,
    className = "",
    customCss,
}) => {
    const id = useId();
    const gridId = `grid-${id.replace(/:/g, "")}`;

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

          ${customCss
                        ? `.${gridId} { ${customCss} }`
                        : ""
                    }
        `}
            </style>

            <DropZone
                zone="grid-zone"
                className={`${gridId} ${className}`}
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${columns}, 1fr)`,
                    gridTemplateRows: `repeat(${rows}, auto)`,
                }}
            />
        </>
    );
};

export default Grid;