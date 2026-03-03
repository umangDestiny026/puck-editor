"use client";

import React, { FormEvent, useId, CSSProperties } from "react";
import { DropZone } from "@puckeditor/core";

interface FormProps {
  submitLabel?: string;
  className?: string;
  customCss?: string;
  formLabel?: string;
  onSubmit?: (values: Record<string, FormDataEntryValue>) => void;
}

export default function Form({
  submitLabel = "Submit",
  className = "",
  customCss,
  formLabel = "Form",
  onSubmit,
}: FormProps) {
  const uniqueId = useId();
  const uniqueClass = `form-${uniqueId.replace(/:/g, "")}`;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values: Record<string, FormDataEntryValue> = {};

    formData.forEach((value, key) => {
      values[key] = value;
    });

    onSubmit?.(values);
  };

  const formStyle: CSSProperties = {
    padding: "20px",
    borderRadius: "10px",
    margin: "16px auto",
  };

  const buttonStyle: CSSProperties = {
    marginTop: "16px",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${className} ${uniqueClass}`.trim()}
      style={formStyle}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      <h3 style={{ marginBottom: "12px" }}>{formLabel}</h3>

      {/* DropZone inside form */}
      <DropZone zone="form-content" />

      <button type="submit" style={buttonStyle}>
        {submitLabel}
      </button>
    </form>
  );
}
