import { useEffect, useState } from "react";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Result() {
  const { formData, resetForm } = useFormStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const submit = async () => {
      try {
        // Data backend pe bhej rahe hain
        await submitLead(formData);
      } catch (err) {
        setError("Something went wrong while submitting your details.");
      } finally {
        setLoading(false);
      }
    };

    submit();
  }, [formData]);

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-blue-600 animate-pulse">
          Submitting your details…
        </h2>
        <p className="text-gray-600 mt-2">Please wait a moment.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-600">Submission Failed</h2>
        <p className="text-gray-600 mt-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-blue-500 underline"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center py-10 px-4">
      {/* Success Icon (Optional) */}
      <div className="mb-6 flex justify-center">
        <div className="bg-green-100 p-4 rounded-full">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-800">
        Thank You for Submitting!
      </h2>
      
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        Your information has been received successfully. Our team will review 
        your details and get back to you soon.
      </p>

      <div className="mt-8">
        <button
          onClick={resetForm}
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Submit Another Response
        </button>
      </div>

      <p className="mt-6 text-xs text-gray-400">
        Reference ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
      </p>
    </div>
  );
}
