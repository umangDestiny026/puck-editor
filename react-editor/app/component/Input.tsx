"use client";

import { Flex, Input, Label } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import React, { useState, useMemo } from "react";

type TestDriveInputProps = {
  label: string;
  labelColor?: string;
  inputBackground?: string;
  inputBorder?: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
  validatePattern?: RegExp;
};


export default function PuckInput({
  label,
  placeholder,
  name,
  labelColor,
  inputBackground,
  inputBorder,
  variant,
  pattern,
  errorMessage,
  className,
  customCss,
  onChangeCode,
  uniqueClass,
}) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  // Convert string pattern to RegExp safely
  const validatePattern = useMemo(() => {
    if (!pattern) return undefined;
    try {
      return new RegExp(pattern);
    } catch {
      console.warn("Invalid regex pattern");
      return undefined;
    }
  }, [pattern]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);

    if (validatePattern && !validatePattern.test(newValue) && newValue !== "") {
      setHasError(true);
    } else {
      setHasError(false);
    }

    try {
      const fn = new Function(
        "value",
        `return (${onChangeCode})(value)`
      );
      fn(newValue);
    } catch (err) {
      console.warn("Invalid onChange code", err);
    }
  };

  const InputComponent =
    variant === "mobile"
      ? AmplifyMobileInput
      : AmplifyInput;

  return (
    <div className={`${className} ${uniqueClass}`}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <InputComponent
        label={label}
        placeholder={placeholder}
        id={name}
        value={value}
        onChange={handleChange}
        labelColor={labelColor}
        inputBackground={inputBackground}
        inputBorder={inputBorder}
        validatePattern={validatePattern}
        errorMessage={hasError ? errorMessage : ""}
      />
    </div>
  );
}

// ==================
const AmplifyInput = ({
  label,
  labelColor,
  inputBackground,
  inputBorder,
  placeholder,
  id,
  value,
  onChange,
  errorMessage,
  validatePattern,
}: TestDriveInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (validatePattern && !validatePattern.test(newValue) && newValue !== "") {
      return;
    }

    setInputValue(event.target.value);
    onChange(event);
  };

  return (
    <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
      <Label
        htmlFor={id}
        color={labelColor ?? "#ffffff"}
        fontSize={{ base: "14px", xl: "18px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        {label}
      </Label>
      <Input
        backgroundColor={inputBackground ?? "#fff"}
        borderRadius={"80px"}
        border={inputBorder ?? "none"}
        id={id}
        name={id}
        placeholder={placeholder}
        color="#58595B"
        fontSize={{ base: "12px", xl: "14px" }}
        fontFamily="var(--font-ToyotaDisplay)"
        padding={{ base: "12px 23px", xl: "10px 23px" }}
        value={inputValue}
        onChange={handleChange}
      />
      {errorMessage && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            fontFamily: "var(--font-ToyotaDisplay)",
            marginTop: "4px",
          }}
        >
          {errorMessage}
        </span>
      )}
    </Flex>
  );
};

const AmplifyMobileInput = ({
  label,
  labelColor,
  inputBackground,
  inputBorder,
  placeholder,
  id,
  value,
  onChange,
  errorMessage,
  validatePattern,
}: TestDriveInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;

    // Prevent input if it doesn't match the numeric pattern
    if (validatePattern && !validatePattern.test(newValue) && newValue !== "") {
      return;
    }
    setInputValue(event.target.value);
    onChange(event);
  };

  return (
    <Flex direction="column" gap={{ base: "8px", xl: "8px" }}>
      <Label
        htmlFor={id}
        color={labelColor ?? "#ffffff"}
        fontSize={{ base: "14px", xl: "18px" }}
        fontFamily="var(--font-ToyotaType-Regular)"
      >
        {label}
      </Label>
      <Flex alignItems="center" gap="0">
        <Input
          type="tel"
          backgroundColor={"#fff"}
          borderRadius={"80px"}
          border={inputBorder ?? "none"}
          id={id}
          name={id}
          placeholder={placeholder}
          color="#58595B"
          fontSize={{ base: "12px", xl: "14px" }}
          fontFamily="var(--font-ToyotaDisplay)"
          padding={{ base: "12px 23px", xl: "10px 23px" }}
          value={inputValue}
          onChange={handleChange}
          maxLength={10}
        />
      </Flex>
      {errorMessage && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            fontFamily: "var(--font-ToyotaDisplay)",
            marginTop: "4px",
          }}
        >
          {errorMessage}
        </span>
      )}
    </Flex>
  );
};
