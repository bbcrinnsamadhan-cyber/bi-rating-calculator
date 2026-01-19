import { useFormStore } from "./store/useFormStore";
import Step1Profile from "./components/steps/Step1Profile";
import Step2Business from "./components/steps/Step2Business";
import Step3Credit from "./components/steps/Step3Credit";
import Step4Loan from "./components/steps/Step4Loan";
import Step5Strength from "./components/steps/Step5Strength";
import Step6Lead from "./components/steps/Step6Lead";
import Result from "./components/steps/Result";
import ProgressBar from "./components/ProgressBar";
import FormHeader from "./components/common/FormHeader";

function App() {
  const { step } = useFormStore();

  const renderStep = () => {
    switch (step) {
      case 1: return <Step1Profile />;
      case 2: return <Step2Business />;
      case 3: return <Step3Credit />;
      case 4: return <Step4Loan />;
      case 5: return <Step5Strength />;
      case 6: return <Step6Lead />;
      case 7: return <Result />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      <div
  className="
    bg-white shadow-lg rounded-2xl
    w-full
    max-w-full lg:max-w-[70%]

    /* padding */
    px-4 py-6
    sm:px-6 sm:py-8
    lg:px-10 lg:py-10

    /* spacing from screen */
    mx-3 sm:mx-6 lg:mx-auto

    /* height control */
    min-h-auto lg:min-h-[75vh]

    flex flex-col
  "
>

        <FormHeader />
        <ProgressBar />
  
        <div >
          {renderStep()}
        </div>
      </div>
    </div>
  );
  
}

export default App;
