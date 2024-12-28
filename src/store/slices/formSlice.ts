import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const FORM_STORAGE_KEY = "form_state";
const FINAL_STEP = 5;

// Helper functions for localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem(FORM_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
};

const saveState = (state: FormState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(FORM_STORAGE_KEY, serializedState);
  } catch (err) {
    // Handle potential errors
    console.error("Failed to save state to localStorage:", err);
  }
};

const clearState = () => {
  try {
    localStorage.removeItem(FORM_STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear state from localStorage:", err);
  }
};

interface AccountDetails {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  languages: string[];
  phone: string;
  country: string;
  address: string;
  bio: string;
  terms: boolean;
  marketing: boolean;
}

interface UploadedImage {
  name: string;
  size: number;
  type: string;
  file: string | null | ArrayBuffer | File;
  previewUrl: string | null;
  uploadProgress: number;
  isUploading: boolean;
}

interface FormState {
  currentStep: number;
  completedSteps: number[];
  selectedProfession: "designer" | "developer" | null;
  selectedSpecialization: string | null;
  isDesignerExpanded: boolean;
  isDeveloperExpanded: boolean;
  accountDetails: AccountDetails;
  formErrors: Record<string, string>;
  uploadedImage: UploadedImage;
  steps: {
    number: number;
    label: string;
    isCompleted: boolean;
    isActive: boolean;
  }[];
}

const initialState: FormState = loadState() || {
  currentStep: 1,
  completedSteps: [],
  selectedProfession: null,
  selectedSpecialization: null,
  isDesignerExpanded: false,
  isDeveloperExpanded: false,
  accountDetails: {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    languages: [],
    phone: "",
    country: "",
    address: "",
    bio: "",
    terms: false,
    marketing: false,
  },
  formErrors: {},
  uploadedImage: {
    name: "",
    size: 0,
    type: "",
    file: null,
    previewUrl: null,
    uploadProgress: 0,
    isUploading: false,
  },
  steps: [
    { number: 1, label: "Personal info", isCompleted: false, isActive: true },
    { number: 2, label: "Account info", isCompleted: false, isActive: false },
    { number: 3, label: "File upload", isCompleted: false, isActive: false },
    { number: 4, label: "Confirmation", isCompleted: false, isActive: false },
    // { number: 5, label: "Verified", isCompleted: false, isActive: false },
  ],
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    toggleProfessionExpand: (
      state,
      action: PayloadAction<"designer" | "developer">
    ) => {
      if (action.payload === "designer") {
        state.isDesignerExpanded = !state.isDesignerExpanded;
        state.isDeveloperExpanded = false;
      } else {
        state.isDeveloperExpanded = !state.isDeveloperExpanded;
        state.isDesignerExpanded = false;
      }
      state.selectedProfession = action.payload;
      saveState(state);
    },

    setSpecialization: (state, action: PayloadAction<string>) => {
      state.selectedSpecialization = action.payload;
      saveState(state);
    },

    completeStep: (state, action: PayloadAction<number>) => {
      const stepIndex = state.steps.findIndex(
        (step) => step.number === action.payload
      );
      if (stepIndex !== -1) {
        state.steps[stepIndex].isCompleted = true;
        state.completedSteps.push(action.payload);

        // If this is the final step, clear localStorage
        if (action.payload === FINAL_STEP) {
          clearState();
        } else {
          saveState(state);
        }
      }
    },

    setActiveStep: (state, action: PayloadAction<number>) => {
      state.steps.forEach((step) => {
        step.isActive = step.number === action.payload;
      });
      state.currentStep = action.payload;
      saveState(state);
    },

    updateAccountField: (
      state,
      action: PayloadAction<{
        field: keyof Omit<AccountDetails, "terms" | "marketing">;
        value: string | string[];
      }>
    ) => {
      const { field, value } = action.payload;
      (state.accountDetails[field] as typeof value) = value;
      delete state.formErrors[field];
      saveState(state);
    },

    updateAccountCheckbox: (
      state,
      action: PayloadAction<{
        field: "terms" | "marketing";
        value: boolean;
      }>
    ) => {
      const { field, value } = action.payload;
      state.accountDetails[field] = value;
      delete state.formErrors[field];
      saveState(state);
    },

    setFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.formErrors = action.payload;
      saveState(state);
    },

    clearFormErrors: (state) => {
      state.formErrors = {};
      saveState(state);
    },

    setUploadedImageData: (
      state,
      action: PayloadAction<{
        name: string;
        size: number;
        type: string;
        file: string | null | ArrayBuffer | File;
        previewUrl: string | null;
      }>
    ) => {
      const { name, size, type, file, previewUrl } = action.payload;
      state.uploadedImage = {
        ...state.uploadedImage,
        name,
        size,
        type,
        file,
        previewUrl,
        isUploading: true,
      };
      saveState(state);
    },
    setUploadStatus: (
      state,
      action: PayloadAction<{ isUploading: boolean }>
    ) => {
      state.uploadedImage.isUploading = action.payload.isUploading;
      saveState(state);
    },

    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadedImage.uploadProgress = action.payload;
      saveState(state);
    },
    resetForm: () => {
      clearState();
      return initialState;
    },
  },
});

export const {
  toggleProfessionExpand,
  setSpecialization,
  completeStep,
  setActiveStep,
  updateAccountField,
  updateAccountCheckbox,
  setFormErrors,
  clearFormErrors,
  setUploadProgress,
  setUploadedImageData,
  setUploadStatus,
  resetForm,
} = formSlice.actions;

export default formSlice.reducer;
