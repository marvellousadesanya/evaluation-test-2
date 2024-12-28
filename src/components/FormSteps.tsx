// components/FormSteps.tsx
import React from "react";
import Image from "next/image";

interface Step {
  number: number;
  label: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface FormStepsProps {
  steps: Step[];
  currentStep: number;
}

export default function FormSteps({ steps, currentStep }: FormStepsProps) {
  return (
    <div className="relative w-full">
      {/* Progress Lines */}
      <div className="absolute top-[14px] left-0 w-full">
        <div className="relative h-[1px] bg-[#E5E7EB] mx-12">
          {/* Active line overlay */}
          <div
            className="absolute top-0 left-0 h-full bg-[#fea37b] transition-all duration-300"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex justify-between relative">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center">
            {/* Circle with number or check */}
            <div
              className={`
                w-7 h-7  flex items-center justify-center
                 relative z-10 bg-white
                ${step.isCompleted || step.isActive ? "" : ""}
                ${step.isActive ? "text-[#fea37b]" : "text-[#6B7280]"}
              `}>
              {step.isCompleted ? (
                <Image
                  src="/complete.png"
                  alt="complete"
                  width={12}
                  height={12}
                  className="w-3 h-3"
                />
              ) : (
                <span className="text-xs font-medium">{step.number}</span>
              )}
            </div>

            {/* Step Label */}
            <p
              className={`
              mt-2 text-xs
              ${
                step.isActive
                  ? "text-[#fea37b] font-semibold"
                  : "text-[#6B7280]"
              }
            `}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
