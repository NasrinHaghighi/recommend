import { LaptopFormData } from "@/utiles/types";
import { useState } from "react";
import { Range } from "react-range";

interface StepBudgetProps {
  nextStep: (data: { budget: [number, number] }) => void;
  prevStep: () => void;
  defaultData?: Partial<LaptopFormData>;
}

const MIN = 300;
const MAX = 5000;
const STEP = 50;

const StepBudget: React.FC<StepBudgetProps> = ({
  nextStep,
  prevStep,
  defaultData,
}) => {
  const [values, setValues] = useState<[number, number]>(
    defaultData?.budget ?? [1000, 3000]
  );

  const handleNext = () => {
    if (values[0] < values[1]) {
      nextStep({ budget: values });
    } else {
      alert("Minimum budget must be less than maximum budget.");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold ">
        Select your budget range
      </h2>

      <div className="text-black text-center">
        <span className="font-medium">
          ${values[0]} – ${values[1]}
        </span>
      </div>

      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        onChange={(newValues) => setValues(newValues as [number, number])}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-2 bg-black/20 rounded-full"
            style={{ ...props.style }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => {
  const { key, ...rest } = props;
  return (
    <div
      key={key}
      {...rest}
      className="w-5 h-5 bg-black rounded-full shadow"
      style={{ ...rest.style }}
    />
  );
}}

      />

      <div className="flex justify-between text-sm text-black/50">
        <span>${MIN}</span>
        <span>${MAX}</span>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="border border-white text-black py-2 px-6 rounded hover:bg-black/10"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          className="bg-white text-black font-medium py-2 px-6 rounded hover:bg-black/90"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepBudget;
