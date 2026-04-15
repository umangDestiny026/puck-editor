import React, { useEffect, useId, useState } from 'react';
import { DropZone } from '@puckeditor/core';
import styles from './stepper.module.css';

interface StepItem {
  id: string;
  title: string;
}

interface StepperProps {
  steps: StepItem[];
  showStepNumbers?: boolean;
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
  activeColor?: string;
  completedColor?: string;
  buttonColor?: string;
  onStepChange?: (stepIndex: number) => void;
  onStepSendData?: () => void;
  isStepValid?: boolean[];
  className?: string;
  maxWidth?: string | number;
  customCss?: string;
  defaultStep?: number;
}

/**
 *
 * @param root0
 * @param root0.steps
 * @param root0.showStepNumbers
 * @param root0.nextLabel
 * @param root0.backLabel
 * @param root0.finishLabel
 * @param root0.activeColor
 * @param root0.completedColor
 * @param root0.buttonColor
 * @param root0.onStepChange
 * @param root0.onStepSendData
 * @param root0.isStepValid
 * @param root0.className
 * @param root0.maxWidth
 * @param root0.customCss
 * @param root0.defaultStep
 */
export default function Stepper({
  steps,
  showStepNumbers = true,
  nextLabel = 'Next',
  backLabel = 'Back',
  finishLabel = 'Finish',
  activeColor = '#007bff',
  completedColor = '#28a745',
  buttonColor = '#007bff',
  onStepChange,
  onStepSendData,
  isStepValid = [],
  className = '',
  maxWidth = '100%',
  customCss,
  defaultStep = 0,
}: StepperProps) {
  const uniqueId = useId();
  const uniqueClass = `stepper-${uniqueId.replace(/:/g, '')}`;

  const [currentStep, setCurrentStep] = useState<number>(defaultStep);

  // Keep currentStep safe if steps change
  useEffect(() => {
    if (currentStep >= steps.length) {
      setCurrentStep(steps.length - 1);
    }
  }, [steps.length, currentStep]);

  const isCurrentStepValid = isStepValid[currentStep] ?? true; // fallback true if not provided

  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (!isCurrentStepValid) return;

    if (isLastStep) {
      onStepSendData?.();
      return;
    }

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    onStepChange?.(nextStep);
  };

  const handleBack = () => {
    if (currentStep === 0) return;

    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    onStepChange?.(prevStep);
  };

  return (
    <div
      className={`${styles.stepperContainer} ${className} ${uniqueClass}`.trim()}
      style={
        {
          '--active-color': activeColor,
          '--completed-color': completedColor,
          '--button-color': buttonColor,
          maxWidth,
        } as React.CSSProperties
      }
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
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div
              key={step.id}
              className={`${styles.stepIndicator}
                ${isActive ? styles.active : ''}
                ${isCompleted ? styles.completed : ''}`}
            >
              {showStepNumbers && (
                <div className={styles.stepNumber}>{index + 1}</div>
              )}
              <div className={styles.stepTitle}>{step.title}</div>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className={styles.stepContent}>
        {steps.length > 0 && (
          <DropZone zone={`step-${steps[currentStep].id}`} />
        )}
      </div>

      {/* Actions */}
      <div className={styles.stepperActions}>
        {currentStep > 0 && (
          <button
            type="button"
            className={styles.backButton}
            onClick={handleBack}
            style={{
              backgroundColor: buttonColor,
            }}
          >
            {backLabel}
          </button>
        )}

        <button
          type="button"
          className={styles.nextButton}
          onClick={handleNext}
          disabled={!isCurrentStepValid}
          style={{
            backgroundColor: buttonColor,
          }}
        >
          {isLastStep ? finishLabel : nextLabel}
        </button>
      </div>
    </div>
  );
}
