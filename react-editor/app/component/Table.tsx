"use client";

import React, { useId } from "react";
import { DropZone } from "@puckeditor/core";
import {
  Table as AmplifyTable,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  View,
} from "@aws-amplify/ui-react";

interface TableProps {
  rows?: number;
  columns?: number;
  hasHeader?: boolean;
  bordered?: boolean;
  highlightOnHover?: boolean;
  className?: string;
  customCss?: string;
  margin?: React.CSSProperties["margin"];
}

export default function Table({
  rows = 3,
  columns = 3,
  hasHeader = true,
  bordered = false,
  highlightOnHover = false,
  className = "",
  customCss,
  margin,
}: TableProps) {
  const uniqueId = useId();
  const uniqueClass = `table-${uniqueId.replace(/:/g, "")}`;

  const tableClass = `${className} ${uniqueClass}`.trim();

  const renderHeader = () => {
    if (!hasHeader) return null;

    return (
      <TableHead>
        <TableRow>
          {Array.from({ length: columns }, (_, colIndex) => (
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
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow
          key={`row-${rowIndex}`}
          backgroundColor={rowIndex % 2 === 0 ? "#F7F7F7" : "transparent"}
        >
          {Array.from({ length: columns }, (_, colIndex) => (
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
        <AmplifyTable
          className={tableClass}
          highlightOnHover={highlightOnHover}
          variation={bordered ? "bordered" : undefined}
          width="100%"
        >
          {renderHeader()}
          {renderBody()}
        </AmplifyTable>
      </View>

      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}
    </>
  );
}
