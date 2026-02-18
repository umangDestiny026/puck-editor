"use client";

import React from "react";
import { Button as AmplifyButton } from "@aws-amplify/ui-react";

export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    color?:
    | "red"
    | "deepred"
    | "white"
    | "transparent"
    | "black"
    | "underlined"
    | "transparentBlack";
    size?: "small" | "large";
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    isFullWidth?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    textColor?: "white" | "black";
    padding?: string | object;
    margin?: string | object;
    display?: string | object;
    minWidth?: string | object;
    maxHeight?: string | object;
    fontSize?: string | object;
    fontFamily?: string | object;
    fontWeight?: string | object;
    lineHeight?: string | object;
    maxWidth?: string | object;
    minHeight?: string | object;
    letterSpacing?: string | object;
    backgroundColor?: string | object;
    border?: string | object;
}

export default function PuckAmplifyButton({
    text,
    type,
    color,
    size,
    align,
    isFullWidth,
    disabled,
    isLoading,
    loadingText,
    onClickCode,
    className,
    customCss,
    uniqueClass,
}) {
    const handleClick = () => {
        try {
            const fn = new Function(`return (${onClickCode})`)();
            if (typeof fn === "function") fn();
        } catch (err) {
            console.warn("Invalid onClick code", err);
        }
    };

    return (
        <div style={{ textAlign: align }}>
            {customCss && (
                <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
            )}

            <AmpButton
                type={type}
                color={color}
                size={size}
                onClick={handleClick}
                disabled={disabled}
                isFullWidth={isFullWidth}
                isLoading={isLoading}
                loadingText={loadingText}
                className={`${className} ${uniqueClass}`}
            >
                {text}
            </AmpButton>
        </div>
    );
}

function AmpButton({
    type,
    color,
    size,
    children,
    onClick,
    disabled,
    className,
    style,
    isFullWidth,
    isLoading,
    loadingText,
    textColor,
    padding,
    margin,
    display,
    minWidth,
    maxHeight,
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    maxWidth,
    minHeight,
    letterSpacing,
    backgroundColor,
    border,
}: ButtonProps) {
    const getVariation = () => {
        if (color === "underlined") return "link";
        if (color === "red" || color === "white" || color === "black")
            return "primary";
        return undefined;
    };

    const getColorTheme = () => {
        if (color === "red") return "red";
        if (color === "deepred") return "#D42224"; // Updated specific red hex
        if (color === "white") return "white";
        if (color === "black") return "black";
        if (color === "underlined") return "transparent";
        if (color === "transparent" || "transparentBlack") return "transparent";
        return "white";
    };

    const getBorderColor = () => {
        if (color === "transparent") return "white";
        if (color === "transparentBlack") return "black";
        return "transparent";
    };

    const getTextColor = () => {
        if (textColor) return textColor;
        if (color === "red") return "white";
        if (color === "white") return "black";
        if (color === "black") return "white";
        if (color === "underlined") return "black";
        if (color === "transparent") return "black";
        return "white";
    };

    return (
        <AmplifyButton
            variation={getVariation()}
            size={size}
            isDisabled={disabled}
            onClick={onClick}
            backgroundColor={backgroundColor || getColorTheme()}
            borderColor={textColor || getBorderColor()}
            color={getTextColor()}
            isFullWidth={isFullWidth}
            isLoading={isLoading}
            loadingText={loadingText}
            type={type}
            fontWeight={fontWeight ? fontWeight : 500}
            padding={padding ?? (size == "small" ? "15px 20px" : padding)}
            margin={margin}
            display={display}
            lineHeight={lineHeight ? lineHeight : "1.25rem"}
            fontSize={fontSize ? fontSize : "14px"}
            className={className}
            style={style}
            maxHeight={maxHeight}
            minWidth={minWidth}
            fontFamily={fontFamily}
            maxWidth={maxWidth}
            minHeight={minHeight}
            letterSpacing={letterSpacing}
            border={border}
        >
            {children}
        </AmplifyButton>
    );
}
