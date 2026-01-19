import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { step6Schema } from "../../validation/step6Schema";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Step6Lead() {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step6Schema),
    mode: "onBlur",
    defaultValues: {
      fullName: formData.fullName || "",
      mobile: formData.mobile || "",
      email: formData.email || "",
      loanRequirement: formData.loanRequirement || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    // Merge all step data
    const finalData = {
      ...formData,
      ...data,
    };

    try {
      // API call to backend
      await submitLead(finalData);

      // Save final data in store (optional but clean)
      saveData(finalData);

      // Move to Result screen
      nextStep();
    } catch (error) {
      setApiError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Lead Capture
      </h2>

      {/* Full Name */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Full Name
        </label>
        <input
          type="text"
          {...register("fullName")}
          className="w-full border p-2 rounded"
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm">
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Mobile Number */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Mobile Number
        </label>
        <input
          type="text"
          inputMode="numeric"
          maxLength={10}
          {...register("mobile")}
          className="w-full border p-2 rounded"
        />
        {errors.mobile && (
          <p className="text-red-500 text-sm">
            {errors.mobile.message}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Email ID
        </label>
        <input
          type="email"
          {...register("email")}
          className="w-full border p-2 rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Loan Requirement */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">
          Loan Requirement
        </label>
        <select
          {...register("loanRequirement")}
          className="w-full border p-2 rounded"
        >
          <option value="">Select</option>
          <option value="Business Loan">Business Loan</option>
          <option value="LAP">LAP</option>
          <option value="Home Loan">Home Loan</option>
          <option value="BT / Top-Up">BT / Top-Up</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400" : "bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>

      {/* API Error */}
      {apiError && (
        <p className="text-red-600 text-sm mt-3">
          {apiError}
        </p>
      )}
    </form>
  );
}
