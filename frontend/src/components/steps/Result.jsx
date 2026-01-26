import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Result() {
  const { formData, resetForm } = useFormStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const submitData = async () => {
      try {
        setLoading(true);
        setError("");

        // 🔹 Backend API call
        await submitLead(formData);

        setSuccess(true);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            "Something went wrong while submitting the form."
        );
      } finally {
        setLoading(false);
      }
    };

    submitData();
  }, [formData]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">
          Submitting your details…
        </h2>
        <p className="text-gray-600 mt-2">
          Please wait while we generate your BI Rating.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-600">
          Submission Failed
        </h2>
        <p className="text-gray-600 mt-2">
          {error}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-green-700">
          Thank You for Submitting Your Details
        </h2>

        <p className="text-gray-700 mt-4">
          Based on the information provided, your{" "}
          <strong>BI (Borrower Intelligence) Rating</strong>{" "}
          is being generated.
        </p>

        <p className="text-gray-700 mt-2">
          The detailed BI Rating along with observations and
          eligibility insights will be shared on your registered
          email ID shortly.
        </p>

        <p className="text-sm text-gray-500 mt-4">
          This assessment is indicative in nature and helps in
          understanding bank-level credit readiness.
        </p>

        <button
          onClick={resetForm}
          className="mt-6 px-4 py-2 bg-gray-200 rounded"
        >
          Start New Assessment
        </button>
      </div>
    );
  }

  return null;
}
