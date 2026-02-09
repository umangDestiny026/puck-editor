import React, { useState } from "react";

export default function PuckDatePicker({
  label,
  defaultValue,
  minDate,
  maxDate,
  required,
  name,
  className,
  customCss,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  const inputStyle = {
    padding: "8px 10px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "14px",
    display: "block",
    width: "220px",
    marginTop: "6px",
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

      <label style={{ fontWeight: 500 }}>
        {label}
      </label>

      <input
        type="date"
        value={value}
        name={name}
        min={minDate || undefined}
        max={maxDate || undefined}
        required={required}
        className={`${className} ${uniqueClass}`}
        style={inputStyle}
        onBlur={() => setTouched(true)}
        onChange={(e) => {
          const newDate = e.target.value;
          setValue(newDate);

          try {
            const fn = new Function(
              "date",
              `return (${onChangeCode})(date)`
            );
            fn(newDate);
          } catch (err) {
            console.warn("Invalid onChange code", err);
          }
        }}
      />

      {touched && required && !value && (
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