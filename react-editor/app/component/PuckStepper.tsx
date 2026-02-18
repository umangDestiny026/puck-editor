"use client";

import React, { useState } from "react";
import { DropZone } from "@puckeditor/core";
import styles from "./stepper.module.css";

export default function PuckStepper({
  steps = [],
  showStepNumbers,
  nextLabel,
  backLabel,
  finishLabel,
  activeColor,
  completedColor,
  buttonColor,
  onStepChange,
  onStepSendData,
  isStepValid = [],
  className,
  maxWidth,
  customCss,
  uniqueClass,
}) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    const isLast = currentStep === steps.length - 1;

    if (isLast) {
      onStepSendData?.();
      return;
    }

    if (isStepValid[currentStep]) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  return (
    <div
      className={`${styles.stepperContainer} ${className} ${uniqueClass}`}
      style={{
        ["--active-color" as any]: activeColor,
        ["--completed-color" as any]: completedColor,
        ["--button-color" as any]: buttonColor,
        maxWidth:maxWidth,
      }}
    >
      {customCss && (
        <style>{`
          .${uniqueClass} {
            ${customCss}
          }
        `}</style>
      )}

      {/* Step Indicators */}
      <div className={styles.stepIndicators}>
        {steps.map((step, index) => (
          <div
            key={index}
            className={`${styles.stepIndicator} ${
              index === currentStep ? styles.active : ""
            } ${index < currentStep ? styles.completed : ""}`}
          >
            {showStepNumbers && (
              <div className={styles.stepNumber}>{index + 1}</div>
            )}
            <div className={styles.stepTitle}>{step.title}</div>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className={styles.stepContent}>
        <DropZone zone={`step-${currentStep}`} />
      </div>

      {/* Actions */}
      <div className={styles.stepperActions}>
        {currentStep > 0 && (
          <button
            className={styles.backButton}
            onClick={handleBack}
            style={{ backgroundColor: buttonColor }}
          >
            {backLabel}
          </button>
        )}

        <button
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!isStepValid[currentStep]}
          style={{ backgroundColor: buttonColor }}
        >
          {currentStep === steps.length - 1
            ? finishLabel
            : nextLabel}
        </button>
      </div>
    </div>
  );
}