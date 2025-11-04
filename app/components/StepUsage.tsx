import { LaptopFormData, UsageType} from "@/utiles/types";
import React, { useState } from "react";




interface StepUsageProps {
  nextStep: (data: { usage: UsageType[] }) => void;
  defaultData?: Partial<LaptopFormData>;
}

const usageOptions: { label: string; value: UsageType }[] = [
  { label: "Gaming", value: "gaming" },
  { label: "Office Work", value: "office" },
  { label: "Design / UI", value: "design" },
  { label: "General Use", value: "general" },
  { label: "Programming", value: "programming" },
  { label: "Video Editing", value: "video editing" },
  { label: "Student / Study", value: "student" },
  { label: "3D Modeling / CAD", value: "3d modeling" },
  { label: "Content Creation", value: "content creation" },
  { label: "Business Travel", value: "business travel" },
  { label: "Music Production", value: "music production" },
];


const StepUsage: React.FC<StepUsageProps> = ({ nextStep, defaultData }) => {
  const [selected, setSelected] = useState<UsageType[]>(
  defaultData?.usage ?? []
);

const toggleSelection = (value: UsageType) => {
  setSelected((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value) // remove if already selected
      : [...prev, value] // add if not selected
  );
};

  const handleNext = () => {
    if (selected.length > 0) {
      nextStep({ usage: selected });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold ">What will you use the laptop for?</h2>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-[12px] ">
        {usageOptions.map((option) => (
         <button
  key={option.value}
  onClick={() => toggleSelection(option.value)}
  className={`p-3 rounded-xl border text-center transition-all ${
    selected.includes(option.value)
      ? "border-black bg-white/10 backdrop-blur-md ring-2 ring-white"
      : "border-black/30 bg-white/5 hover:border-white/60"
  }`}
>
  {option.label}
</button>

        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleNext}
          disabled={!selected}
          className="bg-white text-black font-medium py-2 px-6 rounded hover:bg-white/90 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepUsage;
