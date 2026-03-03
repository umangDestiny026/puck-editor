"use client";

import React, { useEffect, useId, useState } from "react";
import { Select, SelectTheme, Option } from "./select";

interface DropdownProps {
  options: Option[];
  defaultValue?: Option["value"];
  theme?: SelectTheme;
  className?: string;
  customCss?: string;
  placeholder?: string;
  noOptionsMessage?: string;
  fixedPlaceholder?: boolean;
  onChange?: (value: Option["value"] | null) => void;
}

export default function Dropdown({
  options,
  defaultValue,
  theme,
  className = "",
  customCss,
  placeholder = "Select an option",
  noOptionsMessage = "No options available",
  fixedPlaceholder = false,
  onChange,
}: DropdownProps) {
  const uniqueId = useId();
  const uniqueClass = `select-${uniqueId.replace(/:/g, "")}`;

  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  // Sync default value when options/defaultValue change
  useEffect(() => {
    if (!defaultValue) {
      setSelectedOption(null);
      return;
    }

    const found = options.find((opt) => opt.value === defaultValue) ?? null;
    setSelectedOption(found);
  }, [defaultValue, options]);

  const handleSelect = (option: Option | null) => {
    setSelectedOption(option);
    onChange?.(option?.value ?? null);
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
        theme={theme}
        options={options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        placeholder={placeholder}
        className={`${className} ${uniqueClass}`.trim()}
        noOptionsMessage={noOptionsMessage}
        fixedPlaceholder={fixedPlaceholder}
      />
    </div>
  );
}
