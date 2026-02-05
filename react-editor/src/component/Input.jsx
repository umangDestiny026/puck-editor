import React, { useState } from "react";

export default function PuckInput({
  type,
  placeholder,
  width,
  height,
  padding,
  margin,
  name,
  className,
  customCss,
  required,
  minLength,
  maxLength,
  pattern,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [touched, setTouched] = useState(false);

  const style = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    padding: padding || undefined,
    margin: margin || undefined,
    border: "1px solid #ddd",
    borderRadius: "6px",
    outline: "none",
    fontSize: "14px",
    display: "block",
  };

  return (
    <div>
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        minLength={minLength}
        name={name}
        maxLength={maxLength}
        pattern={pattern || undefined}
        style={style}
        className={`${className} ${uniqueClass}`}

        onBlur={(e) => {
          setTouched(true);

          if (!e.target.checkValidity()) {
            e.target.style.borderColor = "red";
          } else {
            e.target.style.borderColor = "#16a34a";
          }
        }}

        onChange={(e) => {
          const value = e.target.value;

          try {
            const fn = new Function(
              "value",
              `return (${onChangeCode})(value)`
            );
            fn(value);
          } catch (err) {
            console.warn("Invalid onChange code", err);
          }
        }}
      />

      {touched && (
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