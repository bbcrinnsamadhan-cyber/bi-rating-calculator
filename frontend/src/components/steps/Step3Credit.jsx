import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema } from "../../validation/step3Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step3Credit() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step3Schema),
    mode: "onBlur",
    defaultValues: {
      cibilScore: formData.cibilScore ?? "",
      familyOwnedProperties: formData.familyOwnedProperties ?? "",
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Credit & Bureau Profile
      </h2>

      {/* Field 8: CIBIL Score */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          CIBIL Score
        </label>

        <input
          type="number"
          min="300"
          max="900"
          step="1"
          placeholder="300 - 900"
          {...register("cibilScore", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />

        <p className="text-xs text-gray-500 mt-1">
          Enter a score between 300 and 900
        </p>

        {errors.cibilScore && (
          <p className="text-red-500 text-sm">
            {errors.cibilScore.message}
          </p>
        )}
      </div>

      {/* Field 9: Family-Owned Properties */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Family-Owned Properties
        </label>

        <input
          type="number"
          min="0"
          step="1"
          placeholder="e.g. 2"
          {...register("familyOwnedProperties", {
            valueAsNumber: true,
          })}
          className="w-full border p-2 rounded"
        />

        {errors.familyOwnedProperties && (
          <p className="text-red-500 text-sm">
            {errors.familyOwnedProperties.message}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Back
        </button>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}