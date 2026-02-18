"use client";
import React, { useState, useEffect } from "react";
import { Select, SelectTheme, Option } from "./select";

export default function PuckSelect({
  options = [],
  defaultValue,
  theme,
  className,
  customCss,
  placeholder,
  noOptionsMessage,
  fixedPlaceholder,
  onChangeCode,
  uniqueClass,
}) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Apply default value
  useEffect(() => {
    if (defaultValue) {
      const found = options.find((opt) => opt.value === defaultValue);
      if (found) setSelectedOption(found);
    }
  }, [defaultValue, options]);

  const handleSelect = (option: Option | null) => {
    setSelectedOption(option);

    try {
      const fn = new Function(
        "value",
        `return (${onChangeCode})(value)`
      );
      fn(option?.value ?? null);
    } catch (err) {
      console.warn("Invalid onChange code", err);
    }
  };

  return (
    <div style={{ margin: "10px 0" }}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <Select
        theme={theme as SelectTheme}
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        placeholder={placeholder}
        className={`${className} ${uniqueClass}`}
        noOptionsMessage={noOptionsMessage}
        fixedPlaceholder={fixedPlaceholder}
      />
    </div>
  );
}