import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step2Schema } from "../../validation/step2Schema";
import { useFormStore } from "../../store/useFormStore";
import RadioGroup from "../common/RadioGroup";

export default function Step2Business() {
  const { saveData, nextStep, prevStep, formData } = useFormStore();

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      gstRegistered: formData.gstRegistered,
      gstVintage: formData.gstVintage,
      turnoverTrend: formData.turnoverTrend,
      profitTrend: formData.profitTrend,
      capitalTrend: formData.capitalTrend,
    },
  });

  const gstRegistered = watch("gstRegistered");

  //  Document rule:
  // If GST toggled from Yes → No, clear GST Vintage
  useEffect(() => {
    if (gstRegistered === false) {
      setValue("gstVintage", undefined);
    }
  }, [gstRegistered, setValue]);

  const onSubmit = (data) => {
    saveData(data);
    nextStep();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-xl font-semibold mb-4">
        Business Compliance & Growth
      </h2>

      {/* Field 3: GST Registration */}
      <RadioGroup
        label="GST Registration Status"
        name="gstRegistered"
        control={control}
        error={errors.gstRegistered}
      />

      {/* Field 4: GST Vintage */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">
          GST Vintage (Years)
        </label>

        <input
          type="number"
          min="0"
          step="1"
          placeholder="e.g. 4"
          disabled={gstRegistered !== true}
          {...register("gstVintage", { valueAsNumber: true })}
          className="w-full border p-2 rounded disabled:bg-gray-100"
        />

        <p className="text-xs text-gray-500 mt-1">
          Years since GST registration date
        </p>

        {errors.gstVintage && (
          <p className="text-red-500 text-sm">
            {errors.gstVintage.message}
          </p>
        )}
      </div>

      {/* Field 5 */}
      <RadioGroup
        label="Turnover Trend"
        name="turnoverTrend"
        control={control}
        error={errors.turnoverTrend}
      />

      {/* Field 6 */}
      <RadioGroup
        label="Profit Trend"
        name="profitTrend"
        control={control}
        error={errors.profitTrend}
      />

      {/* Field 7 */}
      <RadioGroup
        label="Capital Trend"
        name="capitalTrend"
        control={control}
        error={errors.capitalTrend}
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
