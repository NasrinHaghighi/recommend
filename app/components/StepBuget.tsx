import { LaptopFormData } from "@/utile/types";
import { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { Range ,getTrackBackground } from "react-range";

interface StepBudgetProps {
  nextStep: (data: { budget: [number, number] }) => void;
  prevStep: () => void;
  defaultData?: Partial<LaptopFormData>;
}

const MIN = 300;
const MAX = 5000;
const STEP = 50;
const brand = "#ab8cf1";     // selected (your lilac)
const trackBg = "rgba(0,0,0,0.15)"; // unselected
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
      alert("Minimum budget must be less than maximum budget?");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold ">
        Select your budget range?
      </h2>

      <div className="text-black text-center">
        <span className="font-medium">
          {values[0]}€ – {values[1]}€
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
      onMouseDown={props.onMouseDown}
      onTouchStart={props.onTouchStart}
      ref={props.ref}
      className="w-full h-2 rounded-full"
      style={{
        background: getTrackBackground({
          values,
          min: MIN,
          max: MAX,
          // left (unselected), selected, right (unselected)
          colors: [trackBg, brand, trackBg],
        }),
      }}
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
      className="w-5 h-5 bg-black/80 rounded-full shadow"
      style={{ ...rest.style }}
    />
  );
}}

      />

      <div className="flex justify-between text-sm text-black/50">
        <span>{MIN} €</span>
        <span>${MAX} €</span>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={prevStep}
          className="group btn btn-next"
        >
          <BsArrowLeft
              className="size-4 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          Back
        </button>

        <button
          onClick={handleNext}
          className="group btn btn-next"
        >
          Next
          <BsArrowRight
              className="size-4 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
              aria-hidden="true"
            />
        </button>
      </div>
    </div>
  );
};

export default StepBudget;
