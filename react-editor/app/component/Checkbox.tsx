"use client";

import React, { useState } from "react";
import { CheckboxField, Flex, Text } from "@aws-amplify/ui-react";

export default function PuckCheckbox({
  label,
  defaultChecked,
  required,
  className,
  customCss,
  name,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [checked, setChecked] = useState(defaultChecked ?? false);
  const [touched, setTouched] = useState(false);

  const handleChange = (value: boolean) => {
    setChecked(value);

    try {
      const fn = new Function(
        "checked",
        `return (${onChangeCode})(checked)`
      );
      fn(value);
    } catch (err) {
      console.warn("Invalid onChange code", err);
    }
  };

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
        className={`${className} ${uniqueClass}`}
      />

      {showError && (
        <Text
          color="red"
          fontSize="12px"
          marginTop="4px"
        >
          {errorMessage}
        </Text>
      )}
    </Flex>
  );
}