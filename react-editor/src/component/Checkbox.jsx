import React, { useState } from "react";

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
  const [touched, setTouched] = useState(false);
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div style={{ margin: "8px 0" }}>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <label
        className={`${className} ${uniqueClass}`}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          name={name}
          required={required}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            const isChecked = e.target.checked;
            setChecked(isChecked);

            try {
              const fn = new Function(
                "checked",
                `return (${onChangeCode})(checked)`
              );
              fn(isChecked);
            } catch (err) {
              console.warn("Invalid onChange code", err);
            }
          }}
        />

        <span>{label}</span>
      </label>

      {/* Show error only after touch */}
      {touched && required && !checked && (
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