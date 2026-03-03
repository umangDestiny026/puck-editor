"use client";

import React, { useEffect, useId, useState } from "react";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label?: string;
  options: RadioOption[];
  defaultValue?: string;
  required?: boolean;
  className?: string;
  customCss?: string;
  name: string;
  errorMessage?: string;
  onChange?: (value: string) => void;
}

export default function RadioGroup({
  label,
  options,
  defaultValue = "",
  required = false,
  className = "",
  customCss,
  name,
  errorMessage = "This field is required",
  onChange,
}: RadioGroupProps) {
  const uniqueId = useId();
  const uniqueClass = `radiogroup-${uniqueId.replace(/:/g, "")}`;

  const [value, setValue] = useState<string>(defaultValue);
  const [touched, setTouched] = useState<boolean>(false);

  // Sync if defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const showError = touched && required && !value;

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div style={{ margin: "12px 0" }}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      {label && (
        <div
          style={{ fontWeight: 500, marginBottom: "6px" }}
          id={`${uniqueId}-label`}
        >
          {label}
        </div>
      )}

      <div
        role="radiogroup"
        aria-labelledby={label ? `${uniqueId}-label` : undefined}
        className={`${className} ${uniqueClass}`.trim()}
      >
        {options.map((opt) => (
          <label
            key={opt.value}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "6px",
              cursor: "pointer",
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              required={required}
              onBlur={() => setTouched(true)}
              onChange={() => handleChange(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {showError && (
        <span
          style={{
            color: "red",
            fontSize: "12px",
            marginTop: "4px",
            display: "block",
          }}
        >
          {errorMessage}
        </span>
      )}
    </div>
  );
}
