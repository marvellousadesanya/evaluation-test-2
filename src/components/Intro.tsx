"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleProfessionExpand,
  setSpecialization,
  completeStep,
  setActiveStep,
} from "../store/slices/formSlice";
import { DesignerIcon } from "@/customIcons/DesignerIcon";
import DeveloperIcon from "@/customIcons/DeveloperIcon";
import ArrowIcon from "@/customIcons/ArrowIcon";

export default function Intro() {
  const dispatch = useAppDispatch();
  const { isDesignerExpanded, isDeveloperExpanded, selectedSpecialization } =
    useAppSelector((state) => state.form);

  const handleProfessionClick = (profession: "designer" | "developer") => {
    dispatch(toggleProfessionExpand(profession));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate that a specialization is selected
    if (!selectedSpecialization) {
      alert("Please select a specialization before proceeding");
      return;
    }

    // Mark current step as complete and move to next step
    dispatch(completeStep(1));
    dispatch(setActiveStep(2));
  };

  return (
    <div className="px-2 w-[692px]">
      {/* <div className="flex justify-between  w-full">
        <div className="text-sm font-semibold text-[#fea37b] flex flex-col justify-center items-center">
          <p className="">1</p>
          <p className="">Personal info</p>
        </div>
        <div className="text-sm flex flex-col justify-center items-center">
          <p>2</p>
          <Image
            src="/complete.png"
            alt="complete"
            width={2}
            height={2}
            className="w-full h-full object-contain"
          />
          <p>Account info</p>
        </div>
        <div className="text-sm flex flex-col justify-center items-center">
          <p>3</p>
          <p>File upload</p>
        </div>
        <div className="text-sm flex flex-col justify-center items-center">
          <p>4</p>
          <p>Confirmation</p>
        </div>
      </div> */}

      <div className="pt-12 pb-5">
        <p className="font-bold text-2xl text-[#111928]">
          Tell us about yourself
        </p>
      </div>
      <form>
        <p className="text-[#6B7280]">What is your profession?</p>
        <div className="space-y-3 pt-3">
          <div
            onClick={() => handleProfessionClick("designer")}
            className={`bg-gray-50 p-2 flex items-center gap-3 rounded-md cursor-pointer ${
              isDesignerExpanded ? "border-2 border-[#D13F00]" : ""
            }`}>
            <div className="w-5 h-5 flex-shrink-0">
              <DesignerIcon
                color={isDesignerExpanded ? "#D13F00" : "#6B7280"}
              />
            </div>
            <p
              className={`flex-grow text-[#6B7280] ${
                isDesignerExpanded ? "text-[#D13F00]" : ""
              } text-sm`}>
              I am a Designer
            </p>
            <div
              className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${
                isDesignerExpanded ? "rotate-90" : ""
              }`}>
              <ArrowIcon color={isDesignerExpanded ? "#D13F00" : "#6B7280"} />
            </div>
          </div>

          {isDesignerExpanded && (
            <div className="text-sm">
              <p className="text-[#111928] text-sm font-medium">
                Select Specialization
              </p>
              <div className="flex justify-between px-5 py-2">
                <div>
                  <input
                    type="radio"
                    id="ui"
                    name="ui"
                    value="ui"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  UI & UX designer
                </div>

                <div>
                  <input
                    type="radio"
                    id="brand"
                    name="brand"
                    value="brand"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  Brand designer
                </div>

                <div>
                  <input
                    type="radio"
                    id="3d"
                    name="3d"
                    value="3d"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  3D designer
                </div>
              </div>
            </div>
          )}

          <div
            onClick={() => handleProfessionClick("developer")}
            className={`bg-gray-50 p-2 flex items-center gap-3 rounded-md cursor-pointer ${
              isDeveloperExpanded ? "border-2 border-[#D13F00]" : ""
            }`}>
            <div className="w-5 h-5 flex-shrink-0">
              {/* <Image
                src="/palette.png"
                alt="palette"
                width={10}
                height={10}
                className="w-full h-full object-contain"
              /> */}
              <DeveloperIcon
                color={isDeveloperExpanded ? "#D13F00" : "#6B7280"}
              />
            </div>
            <p
              className={`flex-grow text-[#6B7280] ${
                isDeveloperExpanded ? "text-[#D13F00]" : ""
              } text-sm`}>
              I am a Developer
            </p>
            <div
              className={`w-5 h-5 flex-shrink-0 transform transition-transform duration-300 ${
                isDeveloperExpanded ? "rotate-90" : ""
              }`}>
              <ArrowIcon color={isDeveloperExpanded ? "#D13F00" : "#6B7280"} />
            </div>
          </div>

          {isDeveloperExpanded && (
            <div className="text-sm">
              <p className="text-[#111928] text-sm font-medium">
                Select Specialization
              </p>
              <div className="flex justify-between  px-5 py-2">
                <div>
                  <input
                    type="radio"
                    id="frontend"
                    name="frontend"
                    value="frontend"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  Front-end developer
                </div>

                <div>
                  <input
                    type="radio"
                    id="backend"
                    name="backend"
                    value="backend"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  Back-end developer
                </div>

                <div>
                  <input
                    type="radio"
                    id="fullstack"
                    name="fullstack"
                    value="fullstack"
                    onChange={(e) =>
                      dispatch(setSpecialization(e.target.value))
                    }
                  />{" "}
                  Full Stack developer
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleNext}
            className="bg-[#D13F00] p-2 flex justify-center w-full text-sm rounded-md text-white">
            Next: Account Info
          </button>
        </div>
      </form>
    </div>
  );
}
