import React, { useMemo } from "react";

const fontSizeMap = {
  sm: 14,
  md: 16,
  lg: 22,
  xl: 32,
};

type TextBlockProps = {
  content?: React.ReactNode;
  level?: React.ElementType;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right";

  widthValue?: number;
  widthUnit?: string;
  maxWidthValue?: number;
  maxWidthUnit?: string;
  minWidthValue?: number;
  minWidthUnit?: string;

  textColor?: string;
  backgroundColor?: string;
  className?: string;
  customCss?: string;
};

const Text: React.FC<TextBlockProps> = ({
  content,
  level: Level = "p",
  size = "md",
  align = "left",

  widthValue,
  widthUnit,
  maxWidthValue,
  maxWidthUnit,
  minWidthValue,
  minWidthUnit,

  textColor,
  backgroundColor,
  className = "",
  customCss,
}) => {
  const uniqueClass = useMemo(
    () => `text-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  const style: React.CSSProperties = {
    textAlign: align,
    margin: align === "center" ? "0 auto" : undefined,
    fontSize: Level === "p" ? fontSizeMap[size] : undefined,
    color: textColor,
    backgroundColor,
    width: widthValue != null ? `${widthValue}${widthUnit}` : undefined,
    maxWidth:
      maxWidthValue != null ? `${maxWidthValue}${maxWidthUnit}` : undefined,
    minWidth:
      minWidthValue != null ? `${minWidthValue}${minWidthUnit}` : undefined,
  };

  return (
    <Level style={style} className={`${className} ${uniqueClass}`}>
      {customCss && (
        <style>{`.${uniqueClass} { ${customCss} }`}</style>
      )}
      {content}
    </Level>
  );
};

export default Text;