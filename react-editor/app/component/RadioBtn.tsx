import React, { useState } from "react";

export default function PuckRadioGroup({
  label,
  options = [],
  defaultValue,
  required,
  className,
  customCss,
  name,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [touched, setTouched] = useState(false);
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div style={{ margin: "12px 0" }}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <div style={{ fontWeight: 500, marginBottom: "6px" }}>{label}</div>

      <div className={`${className} ${uniqueClass}`}>
        {options.map((opt, idx) => (
          <label
            key={idx}
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
              onChange={(e) => {
                const newVal = e.target.value;
                setValue(newVal);

                try {
                  const fn = new Function(
                    "value",
                    `return (${onChangeCode})(value)`
                  );
                  fn(newVal);
                } catch (err) {
                  console.warn("Invalid onChange code", err);
                }
              }}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

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