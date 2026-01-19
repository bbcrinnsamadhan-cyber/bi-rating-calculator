import { CheckCircle } from "lucide-react";
import { useFormStore } from "../../store/useFormStore";

export default function Result() {
  const { resetForm } = useFormStore();

  // future backend ke baad use hoga
  // abhi sirf UI confirmation ke liye
  const handleDone = () => {
    resetForm();
  };

  return (
    <div className="flex flex-col items-center justify-center text-center h-full">
      <div className="bg-green-100 p-4 rounded-full mb-4">
        <CheckCircle className="text-green-600 w-10 h-10" />
      </div>

      <h2 className="text-2xl font-semibold mb-2">
        Submission Successful
      </h2>

      <p className="text-gray-600 max-w-md">
        Your BI Rating report shall be shared on mail very soon.
      </p>

      
      <button
        onClick={handleDone}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Done
      </button>
    </div>
  );
}
