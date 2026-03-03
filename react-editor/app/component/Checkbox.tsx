"use client";

import React, { useId, useState, useCallback } from "react";
import { CheckboxField, Flex, Text } from "@aws-amplify/ui-react";

export interface CheckboxProps {
  label?: string;
  defaultChecked?: boolean;
  required?: boolean;
  className?: string;
  customCss?: string;
  name?: string;
  errorMessage?: string;
  onChange?: (checked: boolean) => void;

  /**
   * Optional legacy dynamic JS execution (not recommended)
   */
  onChangeCode?: string;
}

export default function Checkbox({
  label = "", // ✅ default fixes Amplify type issue
  defaultChecked = false,
  required = false,
  className = "",
  customCss,
  name = "", // ✅ default fixes Amplify type issue
  errorMessage = "This field is required",
  onChange,
  onChangeCode,
}: CheckboxProps) {
  const id = useId();
  const uniqueClass = `checkbox-${id.replace(/:/g, "")}`;

  const [checked, setChecked] = useState<boolean>(defaultChecked);
  const [touched, setTouched] = useState<boolean>(false);

  const handleChange = useCallback(
    (value: boolean) => {
      setChecked(value);

      // Preferred typed callback
      if (onChange) {
        onChange(value);
      }

      // Legacy support (avoid in production if possible)
      if (onChangeCode) {
        try {
          const fn = new Function(
            "checked",
            `return (${onChangeCode})(checked)`
          );
          fn(value);
        } catch (err) {
          console.warn("Invalid onChangeCode", err);
        }
      }
    },
    [onChange, onChangeCode]
  );

  const showError = touched && required && !checked;

  return (
    <Flex direction="column" margin="8px 0">
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <CheckboxField
        label={label}
        name={name}
        checked={checked}
        isRequired={required}
        onChange={(e) => handleChange(e.target.checked)}
        onBlur={() => setTouched(true)}
        className={`${className} ${uniqueClass}`.trim()}
      />

      {showError && (
        <Text color="red" fontSize="12px" marginTop="4px">
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}
