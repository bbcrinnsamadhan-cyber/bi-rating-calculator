import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Result() {
  const { formData, resetForm } = useFormStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const submit = async () => {
      try {
        const res = await submitLead(formData);
        setResult(res.data);
      } catch (err) {
        setError("Something went wrong while generating BI Rating.");
      } finally {
        setLoading(false);
      }
    };

    submit();
  }, [formData]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">
          Generating your BI Rating…
        </h2>
        <p className="text-gray-600 mt-2">
          Please wait a moment.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-600">
          Unable to Generate BI Rating
        </h2>
        <p className="text-gray-600 mt-2">{error}</p>
      </div>
    );
  }

  const { biScore, riskBand } = result;

  const riskColor =
    riskBand === "Low Risk"
      ? "text-green-600"
      : riskBand === "Moderate Risk"
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-semibold text-blue-700">
        Your BI Rating Result
      </h2>

      <p className="mt-4 text-lg">
        <strong>BI Score:</strong>{" "}
        <span className="text-2xl font-bold">
          {biScore} / 100
        </span>
      </p>

      <p className={`mt-2 text-lg font-semibold ${riskColor}`}>
        Risk Category: {riskBand}
      </p>

      <div className="mt-6 text-sm text-gray-600 max-w-md mx-auto">
        <p>
          This BI Rating is generated based on your credit,
          banking behaviour, employment/business stability,
          and financial strength.
        </p>
        <p className="mt-2">
          Final loan eligibility depends on lender policies
          and verification.
        </p>
      </div>

      <button
        onClick={resetForm}
        className="mt-8 px-5 py-2 bg-gray-200 rounded"
      >
        Start New Assessment
      </button>
    </div>
  );
}
