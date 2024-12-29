import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateAccountField,
  updateAccountCheckbox,
  setFormErrors,
  completeStep,
  setActiveStep,
} from "@/store/slices/formSlice";
import MultiSelectLanguage from "./MultiSelectLanguage";

const countryOptions = [
  { value: "NG", label: "Nigeria" },
  { value: "US", label: "United States" },
  { value: "UK", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "GH", label: "Ghana" },
  { value: "KE", label: "Kenya" },
  { value: "ZA", label: "South Africa" },
];

const languageOptions = [
  { value: "English", label: "English" },
  { value: "French", label: "French" },
  { value: "Spanish", label: "Spanish" },
  { value: "German", label: "German" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Arabic", label: "Arabic" },
];

export default function AccountDetails() {
  const dispatch = useAppDispatch();
  const { accountDetails, formErrors } = useAppSelector((state) => state.form);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;

    // Required field validation
    if (!accountDetails.fullName) errors.fullName = "Full name is required";
    if (!accountDetails.email) errors.email = "Email is required";
    if (!accountDetails.password) errors.password = "Password is required";
    if (!accountDetails.confirmPassword)
      errors.confirmPassword = "Please confirm your password";
    if (!accountDetails.languages) errors.language = "Please select a language";
    if (!accountDetails.phone) errors.phone = "Phone number is required";
    if (!accountDetails.country) errors.country = "Please select a country";
    if (!accountDetails.address) errors.address = "Address is required";
    if (!accountDetails.bio) errors.bio = "Bio is required";
    if (!accountDetails.terms) errors.terms = "You must accept the terms";

    // Email validation
    if (accountDetails.email && !emailRegex.test(accountDetails.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (
      accountDetails.phone &&
      !phoneRegex.test(accountDetails.phone.replace(/\s+/g, ""))
    ) {
      errors.phone = "Please enter a valid phone number";
    }

    // Password validation
    if (accountDetails.password && accountDetails.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }

    if (accountDetails.password !== accountDetails.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      dispatch(
        updateAccountCheckbox({
          field: name as "terms" | "marketing",
          value: (e.target as HTMLInputElement).checked,
        })
      );
    } else {
      dispatch(
        updateAccountField({
          field: name as keyof Omit<
            typeof AccountDetails,
            "terms" | "marketing"
          >,
          value: value,
        })
      );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      dispatch(setFormErrors(errors));
      return;
    }

    dispatch(completeStep(2));
    dispatch(setActiveStep(3));
  };

  const getInputClassName = (fieldName: string) => {
    return `bg-[#F9FAFB] border transition-colors
      ${
        formErrors[fieldName]
          ? "border-[#F05252] bg-red-[#FDF2F2] text-[#F05252] focus:border-red-500 focus:ring-red-500"
          : ""
      } 
      placeholder:text-gray-500 placeholder:text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-opacity-50`;
  };

  return (
    <div className="p-6">
      <h2 className="font-semibold text-2xl text-[#111928] mb-6">
        Account Details
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-[#111928] text-sm">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={accountDetails.fullName}
              onChange={handleChange}
              className={getInputClassName("fullName")}
              placeholder="e.g. Bonnie Green"
            />
            {formErrors.fullName && (
              <span className="text-red-500 text-xs">
                {formErrors.fullName}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[#111928] text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={accountDetails.email}
              onChange={handleChange}
              className={getInputClassName("email")}
              placeholder="name@meta4.com"
            />
            {formErrors.email && (
              <span className="text-red-500 text-xs">{formErrors.email}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-[#111928] text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={accountDetails.password}
              onChange={handleChange}
              className={getInputClassName("password")}
              placeholder="*********"
            />
            {formErrors.password && (
              <span className="text-red-500 text-xs">
                {formErrors.password}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-[#111928] text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={accountDetails.confirmPassword}
              onChange={handleChange}
              className={getInputClassName("confirmPassword")}
              placeholder="*********"
            />
            {formErrors.confirmPassword && (
              <span className="text-red-500 text-xs">
                {formErrors.confirmPassword}
              </span>
            )}
          </div>

          {/* // This is for the multipple select */}
          <MultiSelectLanguage
            languages={languageOptions}
            selectedLanguages={accountDetails.languages}
            error={formErrors.languages}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-[#111928] text-sm">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={accountDetails.phone}
              onChange={handleChange}
              className={getInputClassName("phone")}
              placeholder="+1 123 456 7890"
            />
            {formErrors.phone && (
              <span className="text-red-500 text-xs">{formErrors.phone}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="country" className="text-[#111928] text-sm">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={accountDetails.country}
              onChange={handleChange}
              className={getInputClassName("country")}>
              <option value="" disabled>
                Select a country
              </option>
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {formErrors.country && (
              <span className="text-red-500 text-xs">{formErrors.country}</span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="text-[#111928] text-sm">
              Home Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={accountDetails.address}
              onChange={handleChange}
              className={getInputClassName("address")}
              placeholder="e.g. 1234 Main St"
            />
            {formErrors.address && (
              <span className="text-red-500 text-xs">{formErrors.address}</span>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="bio" className="text-[#111928] text-sm block mb-2">
            Tell us something about you
          </label>
          <textarea
            name="bio"
            id="bio"
            rows={5}
            value={accountDetails.bio}
            onChange={handleChange}
            className={`w-full ${getInputClassName("bio")}`}
          />
          {formErrors.bio && (
            <span className="text-red-500 text-xs">{formErrors.bio}</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-6 text-sm text-[#6B7280]">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={accountDetails.terms}
              onChange={handleChange}
              className={`rounded ${
                formErrors.terms ? "border-[#F05252]" : "border-[#D1D5DB]"
              }`}
            />
            <label htmlFor="terms">
              By signing up, you are creating a Meta4 account, and you agree to
              Meta4 <span className="text-[#D13F00]">Terms of Use</span> and{" "}
              <span className="text-[#D13F00]">Privacy Policy.</span>
            </label>
          </div>
          {formErrors.terms && (
            <span className="text-red-500 text-xs">{formErrors.terms}</span>
          )}

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="marketing"
              name="marketing"
              checked={accountDetails.marketing}
              onChange={handleChange}
              className="rounded border-[#D1D5DB]"
            />
            <label htmlFor="marketing">
              Please don{"'"}t send me any marketing communications.
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-[#D13F00] text-white px-6 text-sm py-2 rounded-lg hover:bg-[#B83700] transition-colors">
          Next: File upload
        </button>
      </form>
    </div>
  );
}
