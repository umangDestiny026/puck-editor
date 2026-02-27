import { DropZone } from "@puckeditor/core";
import React from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    View,
} from "@aws-amplify/ui-react";

const TableBlock = ({
    rows = 3,
    columns = 3,
    hasHeader = true,
    bordered,
    highlightOnHover = false,
    className = "",
    uniqueClass = "",
    customCss = "",
    margin,
}) => {
    const tableClass = `${className || ""} ${uniqueClass || ""}`.trim();

    const renderHeader = () => {
        if (!hasHeader) return null;

        return (
            <TableHead>
                <TableRow>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableCell as="th" key={`header-${colIndex}`}>
                            <DropZone zone={`header-${colIndex}`} />
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    };

    const renderBody = () => (
        <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow
                    key={`row-${rowIndex}`}
                    backgroundColor={rowIndex % 2 === 0 ? "#F7F7F7" : "transparent"}
                >
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableCell key={`cell-${rowIndex}-${colIndex}`}>
                            <DropZone zone={`cell-${rowIndex}-${colIndex}`} />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    return (
        <>
            <View
                as="section"
                margin={margin}
                overflow="auto"
                width="100%"
                maxWidth="1105px"
                padding="1rem 0"
            >
                <Table
                    className={tableClass}
                    highlightOnHover={highlightOnHover}
                    variation={bordered}
                    width="100%"
                >
                    {renderHeader()}
                    {renderBody()}
                </Table>
            </View>

            {customCss && (
                <style>
                    {`
            ${uniqueClass ? `.${uniqueClass}` : ""}
            {
              ${customCss}
            }
          `}
                </style>
            )}
        </>
    );
};

export default TableBlock;