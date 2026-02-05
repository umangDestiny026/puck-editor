import React, { useState } from "react";

export default function PuckSearchableDropdown({
  label,
  options = [],
  placeholder,
  required,
  className,
  customCss,
  name,
  errorMessage,
  onChangeCode,
  uniqueClass,
}) {
  const [touched, setTouched] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ margin: "10px 0", position: "relative", width: "260px" }}>
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

      <input
        type="text"
        placeholder={placeholder}
        value={query || selected}
        name={name}
        className={`${className} ${uniqueClass}`}
        style={{
          width: "100%",
          padding: "8px 10px",
          border: "1px solid #ddd",
          borderRadius: "6px",
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTouched(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />

      {open && filteredOptions.length > 0 && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            width: "100%",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            maxHeight: "160px",
            overflowY: "auto",
          }}
        >
          {filteredOptions.map((opt, idx) => (
            <div
              key={idx}
              style={{
                padding: "8px 10px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
              }}
              onMouseDown={() => {
                setSelected(opt.label);
                setQuery("");
                setOpen(false);

                try {
                  const fn = new Function(
                    "value",
                    `return (${onChangeCode})(value)`
                  );
                  fn(opt.value);
                } catch (err) {
                  console.warn("Invalid onChange code", err);
                }
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}

      {touched && required && !selected && (
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