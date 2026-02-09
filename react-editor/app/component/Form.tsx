import { DropZone } from "@puckeditor/core";
import React from "react";

export default function PuckForm({
  submitLabel,
  className,
  customCss,
  onSubmitCode,
  formLabel,
  uniqueClass,
  puck, // IMPORTANT: Puck injects this automatically
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = {};
    
    formData.forEach((value, key) => {
      values[key] = value;
    });

    try {
      const fn = new Function(
        "values",
        `return (${onSubmitCode})(values)`
      );
      fn(values);
    console.log("Umang onSubmitCode => ", onSubmitCode);

    } catch (err) {
      console.warn("Invalid onSubmit code", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} ${uniqueClass}`}
      style={{
        padding: "20px",
        borderRadius: "10px",
        margin: "16px auto",
      }}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <h3 style={{ marginBottom: "12px" }}>{formLabel || "Form"}</h3>

      {/* THIS IS YOUR DROPZONE INSIDE FORM */}
      <DropZone zone="form-content" />

      <button
        type="submit"
        style={{
          marginTop: "16px",
          padding: "10px 14px",
          borderRadius: "8px",
          border: "none",
          background: "#2563eb",
          color: "white",
          cursor: "pointer",
        }}
      >
        {submitLabel}
      </button>
    </form>
  );
}