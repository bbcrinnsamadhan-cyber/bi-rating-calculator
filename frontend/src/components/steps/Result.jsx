import { useState } from "react";
import { useFormStore } from "../../store/useFormStore";
import { submitLead } from "../../services/api";

export default function Result() {
  const { formData, resetForm } = useFormStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async () => {
    if (!accepted) return;
    
    setLoading(true);
    try {
      const res = await submitLead(formData);
      setResult(res.data);
      setIsSubmitted(true);
    } catch (err) {
      setError("Something went wrong while generating BI Rating.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <h2 className="text-xl font-semibold mt-4 text-gray-800">
          Generating your BI Rating…
        </h2>
        <p className="text-gray-600 mt-2">
          Please wait a moment while we analyze your data.
        </p>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-20 fade-in">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
            <span className="text-4xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank you for submitting!
        </h2>
        
        <p className="text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
          A representative from <strong>ऋण Samadhan</strong> may contact you shortly to discuss your eligibility.
        </p>

        <button
          onClick={resetForm}
          className="mt-12 px-8 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
        >
          Start New Assessment
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 fade-in">
      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Final Submission</h2>
        
        {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
                {error}
            </div>
        )}

        {/* Declaration Section */}
        <div className="space-y-6">
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h3 className="flex items-center text-sm font-bold text-blue-900 mb-3">
                    <span className="mr-2">✅</span> Declaration
                </h3>
                <div className="flex items-start cursor-pointer group" onClick={() => setAccepted(!accepted)}>
                    <div className="flex items-center h-5">
                        <input
                            id="declaration"
                            type="checkbox"
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            required
                        />
                    </div>
                    <label htmlFor="declaration" className="ml-3 text-sm font-medium text-gray-700 leading-snug cursor-pointer group-hover:text-gray-900 transition-colors">
                        I hereby confirm that all the information provided by me is true, correct, and complete to the best of my knowledge. I have not withheld any material information.
                    </label>
                </div>
            </div>

            {/* Disclaimer Section */}
            <div className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100">
                <h3 className="flex items-center text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    <span className="mr-2">⚠️</span> Disclaimer & Consent
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                    By submitting this form, I authorize <strong>ऋण Samadhan</strong> to collect, verify, and analyze my information for the purpose of generating my BI Rating and assessing my loan eligibility. I understand that this assessment is indicative in nature and does not constitute a loan approval or guarantee of funding from any bank or NBFC.
                </p>
            </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!accepted || loading}
          className={`w-full mt-10 py-4 px-6 rounded-2xl font-bold text-lg transition-all shadow-lg ${
            accepted && !loading
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:shadow-xl active:scale-[0.98]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Submit & Generate Rating"}
        </button>
      </div>
    </div>
  );
}
