import React from "react";
import { useAppDispatch } from "@/store/hooks";
import { resetForm } from "@/store/slices/formSlice";

export default function Complete() {
  const dispatch = useAppDispatch();

  const handleResetForm = async () => {
    await dispatch(resetForm());

    if (typeof window !== "undefined") {
      window.location.replace(window.location.pathname);
    }
  };

  return (
    <div className="py-5">
      <p className="text-lg font-semibold text-[#111928] md:text-2xl">
        Verified
      </p>
      <p className="text-[#6B7280]">
        You have successfully registered your account.
      </p>

      <div className="py-5">
        <button
          onClick={handleResetForm}
          className="bg-[#D13F00] w-full text-white py-2 px-4 rounded">
          Login to your account
        </button>
      </div>
    </div>
  );
}
