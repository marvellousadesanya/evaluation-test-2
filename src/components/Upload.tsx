import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  completeStep,
  setActiveStep,
  setUploadedImageData,
  setUploadProgress,
  setUploadStatus,
} from "@/store/slices/formSlice";

export default function FileUpload() {
  const dispatch = useAppDispatch();
  const uploadedImage = useAppSelector((state) => state.form.uploadedImage);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileSelect = async (selectedFile: File) => {
    // Convert file to base64 for storage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      // Create object URL for preview
      const previewUrl = URL.createObjectURL(selectedFile);

      dispatch(
        setUploadedImageData({
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type,
          file: base64String,
          previewUrl: previewUrl,
        })
      );

      simulateUpload();
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file && file.type.startsWith("image/")) {
        handleFileSelect(file);
      }
    }
    // const selectedFile = e.target.files[0];
    // if (selectedFile) {
    //   handleFileSelect(selectedFile);
    // }
  };

  const simulateUpload = () => {
    dispatch(setUploadStatus({ isUploading: true }));
    dispatch(setUploadProgress(0));

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;

      if (progress >= 100) {
        clearInterval(interval);
        dispatch(setUploadStatus({ isUploading: false }));
        dispatch(setUploadProgress(100));
      } else {
        dispatch(setUploadProgress(progress));
      }
    }, 100);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedImage.file && uploadedImage.uploadProgress === 100) {
      dispatch(completeStep(3));
      dispatch(setActiveStep(4));
    }
  };

  return (
    <div className="p-6">
      <div className="shadow-sm rounded-lg border border-gray-200 p-4 my-5">
        <p className="font-semibold text-2xl text-gray-900 py-2">
          Upload a profile photo
        </p>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            bg-gray-50 border-2 border-dashed rounded-lg p-6
            flex flex-col items-center justify-center gap-2 cursor-pointer
            transition-colors duration-200 min-h-[12rem]
            ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"}
            ${
              uploadedImage.isUploading
                ? "pointer-events-none"
                : "hover:bg-gray-100"
            }
          `}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInput}
            accept="image/*"
            className="hidden"
          />

          <p className="text-gray-500 text-sm text-center">
            {uploadedImage.isUploading ? (
              "Uploading..."
            ) : (
              <>
                Drag and drop or{" "}
                <span className="text-orange-600 underline">browse</span> for
                files
              </>
            )}
          </p>
        </div>

        {uploadedImage.file && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-900 font-medium">
                  {uploadedImage.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(uploadedImage.size)}
                </p>
              </div>
              {uploadedImage.uploadProgress === 100 && (
                <span className="text-green-600 text-sm">✓ Complete</span>
              )}
            </div>

            {uploadedImage.isUploading || uploadedImage.uploadProgress > 0 ? (
              <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-600 transition-all duration-200"
                  style={{ width: `${uploadedImage.uploadProgress}%` }}
                />
              </div>
            ) : null}
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={!uploadedImage.file || uploadedImage.uploadProgress < 100}
        className={`w-full rounded-lg text-sm py-2.5 font-medium
          ${
            uploadedImage.file && uploadedImage.uploadProgress === 100
              ? "bg-orange-600 hover:bg-orange-700 text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }
          transition-colors duration-200`}>
        Next: Confirmation
      </button>
    </div>
  );
}
