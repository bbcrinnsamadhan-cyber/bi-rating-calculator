import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5Schema } from "../../validation/step5Schema";
import { useFormStore } from "../../store/useFormStore";
import RadioGroup from "../common/RadioGroup";

export default function Step5Strength() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step5Schema),
    mode: "onBlur",
    defaultValues: {
      netWorthRatio: formData.netWorthRatio,
      itrFiled: formData.itrFiled,
      collateralAvailable: formData.collateralAvailable,
    },
  });

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Financial Strength & Repayment Capacity
      </h2>

      {/* Field 14 */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          Net Worth to Borrowing Ratio
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 1.25"
          {...register("netWorthRatio", { valueAsNumber: true })}
          className="w-full border p-2 rounded"
        />

        <p className="text-xs text-gray-500 mt-1">
          Ratio of net worth against total borrowings
        </p>

        {errors.netWorthRatio && (
          <p className="text-red-500 text-sm">
            {errors.netWorthRatio.message}
          </p>
        )}
      </div>

      {/* Field 15 */}
      <RadioGroup
        label="ITR Filed Regularly?"
        name="itrFiled"
        control={control}
        error={errors.itrFiled}
      />

      {/* Field 16 */}
      <RadioGroup
        label="Collateral Available"
        name="collateralAvailable"
        control={control}
        error={errors.collateralAvailable}
      />

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
