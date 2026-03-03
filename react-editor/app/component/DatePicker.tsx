"use client";

import React, { useId, useState, useEffect, CSSProperties } from "react";

interface DatePickerProps {
  label?: string;
  defaultValue?: string;
  minDate?: string;
  maxDate?: string;
  required?: boolean;
  name?: string;
  className?: string;
  customCss?: string;
  errorMessage?: string;
  onChange?: (date: string) => void;
}

export default function DatePicker({
  label,
  defaultValue = "",
  minDate,
  maxDate,
  required = false,
  name,
  className = "",
  customCss,
  errorMessage = "This field is required",
  onChange,
}: DatePickerProps) {
  const uniqueId = useId();
  const uniqueClass = `datepicker-${uniqueId.replace(/:/g, "")}`;

  const [touched, setTouched] = useState<boolean>(false);
  const [value, setValue] = useState<string>(defaultValue);

  // Sync if defaultValue changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const inputStyle: CSSProperties = {
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    display: "block",
    width: "220px",
    marginTop: "6px",
  };

  const showError = touched && required && !value;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setValue(newDate);
    onChange?.(newDate);
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

      {label && (
        <label htmlFor={uniqueId} style={{ fontWeight: 500 }}>
          {label}
        </label>
      )}

      <input
        id={uniqueId}
        type="date"
        value={value}
        name={name}
        min={minDate}
        max={maxDate}
        required={required}
        className={`${className} ${uniqueClass}`.trim()}
        style={inputStyle}
        onBlur={() => setTouched(true)}
        onChange={handleChange}
      />

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
