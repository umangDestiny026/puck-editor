'use client';

import { Text, View } from "@aws-amplify/ui-react";
import { DropZone } from "@puckeditor/core";
import React, { useEffect, useId, useState } from "react";

const Accordion: React.FC<any> = ({
  items = [],
  className = "",
  customCss,
  itemSpacing = 16,
  title,
  backgroundColor,
  activeItemIndex = 0,
}) => {
  const id = useId();
  const uniqueClass = `accordion-${id.replace(/:/g, "")}`;

  const [openIndex, setOpenIndex] = useState<number | null>(
    activeItemIndex ?? 0
  );

  // Sync external control
  useEffect(() => {
    setOpenIndex(activeItemIndex ?? 0);
  }, [activeItemIndex]);

  return (
    <div className={`${uniqueClass} ${className}`}>
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}

      <View
        as="section"
        backgroundColor={backgroundColor}
        padding={{ base: "40px 20px", xl: "80px 40px" }}
      >
        {title && (
          <Text
            margin={{ base: "0 0 30px", xl: "0 0 40px" }}
            fontSize={{ base: "24px", xl: "36px" }}
          >
            {title}
          </Text>
        )}

        {items.map((item: any, index: number) => {
          const isOpen = openIndex === index;

          return (
            <View
              key={index}
              style={{
                borderBottom: "1px solid #D9D9D9",
              }}
              marginBottom={`${itemSpacing}px`}
            >
              {/* Header */}
              <View
                padding="1rem 0"
                display="flex"
                style={{
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onClick={() =>
                  setOpenIndex(isOpen ? null : index)
                }
              >
                <Text fontWeight="600">
                  {item.title}
                </Text>
                <Text fontSize="20px">
                  {isOpen ? "−" : "+"}
                </Text>
              </View>

              {/* Content */}
              {isOpen && (
                <View padding="1rem 0">
                  {item.description && (
                    <div
                      style={{ marginBottom: "10px" }}
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                  )}

                  <DropZone zone={`accordion-${index}`} />
                </View>
              )}
            </View>
          );
        })}
      </View>
    </div>
  );
};

export default Accordion;