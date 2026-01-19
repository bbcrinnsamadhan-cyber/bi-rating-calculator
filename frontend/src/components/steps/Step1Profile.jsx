import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema } from "../../validation/step1Schema";
import { useFormStore } from "../../store/useFormStore";

export default function Step1Profile() {
  const { saveData, nextStep, formData } = useFormStore();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step1Schema),
    mode: "onBlur", // ✅ document requirement
    defaultValues: {
      age: formData.age ?? "",
      experience: formData.experience ?? "",
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Applicant Basic Profile
      </h2>

      {/* Age */}
      <div className="mb-4">
        <label className="block mb-1">
          Age of Main Applicant
        </label>

        <input
          type="number"
          min="18"
          max="70"
          step="1"
          placeholder="Enter age in years"
          {...register("age", { valueAsNumber: true })}
          onBlur={() => trigger("age")} // ✅ explicit blur validation
          className="w-full border p-2 rounded"
        />

        <p className="text-xs text-gray-500 mt-1">
          Age of primary loan applicant
        </p>

        {errors.age && (
          <p className="text-red-500 text-sm">
            {errors.age.message}
          </p>
        )}
      </div>

      {/* Experience */}
      <div className="mb-4">
        <label className="block mb-1">
          Experience in Business (Years)
        </label>

        <input
          type="number"
          min="0"
          step="1"
          placeholder="e.g. 8"
          {...register("experience", {
            valueAsNumber: true,
          })}
          onBlur={() => trigger("experience")}
          className="w-full border p-2 rounded"
        />

        <p className="text-xs text-gray-500 mt-1">
          Total years of experience in current or related business
        </p>

        {errors.experience && (
          <p className="text-red-500 text-sm">
            {errors.experience.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Next
      </button>
    </form>
  );
}