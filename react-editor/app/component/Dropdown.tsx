import React, { useState } from "react";

export default function PuckDropdown({
  label,
  options = [],
  defaultValue,
  required,
  className,
  name,
  customCss,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div style={{ margin: "10px 0" }}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <label style={{ fontWeight: 500, display: "block", marginBottom: "6px" }}>
        {label}
      </label>

      <select
        value={value}
        required={required}
        name={name}
        className={`${className} ${uniqueClass}`}
        style={{
          padding: "8px 10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
          fontSize: "14px",
          width: "240px",
          background: "white",
        }}
        onBlur={() => setTouched(true)}
        onChange={(e) => {
          const newValue = e.target.value;
          setValue(newValue);

          try {
            const fn = new Function(
              "value",
              `return (${onChangeCode})(value)`
            );
            fn(newValue);
          } catch (err) {
            console.warn("Invalid onChange code", err);
          }
        }}
      >
        <option value="">Select...</option>

        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

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