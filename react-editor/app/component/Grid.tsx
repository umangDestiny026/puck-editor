'use client';

import { DropZone } from "@puckeditor/core";
import React, { useId } from "react";

const Grid: React.FC<any> = ({
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

    // Cap responsive columns: tablet max 2, mobile always 1
    const tabletColumns = Math.min(columns, 2);
    const mobileColumns = 1;

    return (
        <>
            <style>
                {`
                    /* Desktop (> 1024px) — use full columns from props */
                    .${gridId} {
                        display: grid;
                        grid-template-columns: repeat(${columns}, 1fr);
                        grid-template-rows: repeat(${rows}, auto);
                        gap: ${gap}px;
                        align-items: ${alignItems};
                        justify-items: ${justifyItems};
                        ${maxWidth ? `max-width: ${maxWidth}px;` : ""}
                        padding: ${padding}px;
                        margin: 0 auto;
                    }

                    /* Tablet (768px - 1024px) — max 2 columns */
                    @media (max-width: 1024px) and (min-width: 768px) {
                        .${gridId} {
                            grid-template-columns: repeat(${tabletColumns}, 1fr);
                        }
                    }

                    /* Mobile (< 768px) — always 1 column */
                    @media (max-width: 767px) {
                        .${gridId} {
                            grid-template-columns: repeat(${mobileColumns}, 1fr);
                        }
                    }

                    ${customCss ? `.${gridId} { ${customCss} }` : ""}
                `}
            </style>

            <DropZone
                zone="grid-zone"
                className={`${gridId} ${className}`}
            />
        </>
    );
};

export default Grid;