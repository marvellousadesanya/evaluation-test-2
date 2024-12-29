"use client";

import React, { useEffect } from "react";
import Upload from "./Upload";
import Intro from "./Intro";
import { useAppSelector } from "@/store/hooks";
import FormSteps from "./FormSteps";
import AccountDetails from "./AccountDetails";
import Confirmation from "./Confirmation";
import Complete from "./Complete";

export default function Form() {
  const { steps, currentStep, isFormComplete } = useAppSelector(
    (state) => state.form
  );

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Intro />;
      case 2:
        return <AccountDetails />;
      case 3:
        return <Upload />;
      case 4:
        return <Confirmation />;
      case 5:
        return <Complete />;
      default:
        return <Intro />;
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // If form is not completed, show warning
      if (currentStep !== 5) {
        const message =
          "Are you sure you want to leave? Your progress will be saved.";
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [currentStep]);

  return (
    <>
      <div className="bg-white flex justify-center items-center py-24  h-full w-full">
        <div className="w-[692px] overflow-hidden">
          {!isFormComplete && (
            <FormSteps steps={steps} currentStep={currentStep} />
          )}
          {renderStep()}
        </div>
      </div>
    </>
  );
}
