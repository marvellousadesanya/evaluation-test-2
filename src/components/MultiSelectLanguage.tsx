// Replace the language select field with this component
import React, { useState, useRef, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateAccountField } from "@/store/slices/formSlice";

interface Language {
  value: string;
  label: string;
}

interface MultiSelectProps {
  languages: Language[];
  selectedLanguages: string[];
  error?: string;
}

const MultiSelectLanguage: React.FC<MultiSelectProps> = ({
  languages,
  selectedLanguages,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleLanguage = (value: string) => {
    const updatedLanguages = selectedLanguages.includes(value)
      ? selectedLanguages.filter((lang) => lang !== value)
      : [...selectedLanguages, value];

    dispatch(
      updateAccountField({
        field: "languages",
        value: updatedLanguages,
      })
    );
  };

  return (
    <div className="flex flex-col gap-2" ref={dropdownRef}>
      <label htmlFor="languages" className="text-[#111928] text-sm">
        Select languages
      </label>
      <div className="relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-[#F9FAFB] border ${
            error ? "border-red-500" : "border-[#D1D5DB]"
          } rounded-lg p-2 min-h-[40px] cursor-pointer flex flex-wrap gap-1`}>
          {selectedLanguages.length > 0 ? (
            selectedLanguages.map((lang) => {
              const language = languages.find((l) => l.value === lang);
              return (
                <span
                  key={lang}
                  className="bg-[#D13F00] text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                  {language?.label}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLanguage(lang);
                    }}
                    className="hover:text-gray-200">
                    ×
                  </button>
                </span>
              );
            })
          ) : (
            <span className="text-[#6B7280] text-sm">Select languages</span>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-[#D1D5DB] rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {languages.map((language) => (
              <div
                key={language.value}
                onClick={() => toggleLanguage(language.value)}
                className={`p-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 ${
                  selectedLanguages.includes(language.value) ? "bg-gray-50" : ""
                }`}>
                <input
                  type="checkbox"
                  checked={selectedLanguages.includes(language.value)}
                  onChange={() => {}}
                  className="rounded border-[#D1D5DB]"
                />
                <span className="text-sm">{language.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default MultiSelectLanguage;
