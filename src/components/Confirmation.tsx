import Image from "next/image";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  completeStep,
  setActiveStep,
  setFormComplete,
} from "@/store/slices/formSlice";

export default function Confirmation() {
  const {
    accountDetails,
    selectedProfession,
    selectedSpecialization,
    uploadedImage,
  } = useAppSelector((state) => state.form);
  const dispatch = useAppDispatch();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(completeStep(3));
    dispatch(setActiveStep(5));
    dispatch(setFormComplete());
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(completeStep(3));
    dispatch(setActiveStep(2));
  };

  return (
    <div>
      <div className="mt-10 border-b border-[#E5E7EB]  p-5 ">
        <p className="text-lg font-semibold text-[#111928]">
          Personal information
        </p>

        <div className="space-y-7">
          <div className="relative rounded-full overflow-hidden h-12 w-12">
            <Image
              src={uploadedImage.previewUrl || "/Avatar.png"}
              alt="Avatar"
              fill
              className="object-cover"
              sizes="(max-width: 48px) 100vw"
              priority
            />
          </div>

          <div className="grid grid-cols-2 gap-5 w-full">
            <div className="">
              <p className="font-semibold text-[#111928]">Full name</p>
              <p className="text-[#6B7280]">{accountDetails.fullName}</p>
            </div>

            <div>
              <p className="font-semibold ">Email Address</p>
              <p className="text-[#6B7280]">{accountDetails.email}</p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Biography</p>
              <p className="text-[#6B7280]">{accountDetails.bio}</p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Home Address</p>
              <p className="text-[#6B7280]">{accountDetails.address}</p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Country</p>
              <p className="text-[#6B7280]">{accountDetails.country}</p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Phone Number</p>
              <p className="text-[#6B7280]">{accountDetails.phone}</p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Profession</p>
              <p className="text-[#6B7280]">
                {selectedProfession}/{selectedSpecialization}
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#111928]">Languages</p>
              <p className="text-[#6B7280]">{accountDetails.languages} </p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-3">
        <button
          onClick={handleEdit}
          className="text-white text-sm bg-[#D13F00] rounded-lg px-5 py-2">
          Edit
        </button>
      </div>

      <div className="flex justify-center py-5">
        <button
          onClick={handleNext}
          className=" bg-[#D13F00] w-3/4 text-white py-2 rounded-lg">
          Finish
        </button>
      </div>
    </div>
  );
}
