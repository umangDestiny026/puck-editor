"use client";

import React, { useId, useMemo, useState, ChangeEvent } from "react";
import { Flex, Input as AmplifyInputField, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

type Variant = "default" | "mobile";

interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  labelColor?: string;
  inputBackground?: string;
  inputBorder?: string;
  variant?: Variant;
  pattern?: string;
  errorMessage?: string;
  className?: string;
  customCss?: string;
  onChange?: (value: string) => void;
}

export default function Input({
  label,
  placeholder,
  name,
  labelColor = "#ffffff",
  inputBackground = "#fff",
  inputBorder = "none",
  variant = "default",
  pattern,
  errorMessage = "Invalid value",
  className = "",
  customCss,
  onChange,
}: InputProps) {
  const uniqueId = useId();
  const uniqueClass = `amplify-input-${uniqueId.replace(/:/g, "")}`;

  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  // Safe pattern parsing
  const regex = useMemo(() => {
    if (!pattern) return undefined;
    try {
      return new RegExp(pattern);
    } catch {
      console.warn("Invalid regex pattern");
      return undefined;
    }
  }, [pattern]);

  const isInvalid = touched && !!regex && value !== "" && !regex.test(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    // For mobile variant, prevent invalid characters
    if (
      variant === "mobile" &&
      regex &&
      !regex.test(newValue) &&
      newValue !== ""
    ) {
      return;
    }

    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className={`${className} ${uniqueClass}`.trim()}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <Flex direction="column" gap="8px">
        {label && (
          <Label
            htmlFor={uniqueId}
            color={labelColor}
            fontSize={{ base: "14px", xl: "18px" }}
          >
            {label}
          </Label>
        )}

        <AmplifyInputField
          id={uniqueId}
          name={name}
          type={variant === "mobile" ? "tel" : "text"}
          backgroundColor={inputBackground}
          border={inputBorder}
          borderRadius="80px"
          placeholder={placeholder}
          value={value}
          maxLength={variant === "mobile" ? 10 : undefined}
          fontSize={{ base: "12px", xl: "14px" }}
          padding={{ base: "12px 23px", xl: "10px 23px" }}
          onBlur={() => setTouched(true)}
          onChange={handleChange}
        />

        {isInvalid && (
          <span
            style={{
              color: "red",
              fontSize: "12px",
              marginTop: "4px",
            }}
          >
            {errorMessage}
          </span>
        )}
      </Flex>
    </div>
  );
}
