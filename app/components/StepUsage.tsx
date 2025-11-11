import {  UsageType, StepUsageProps} from "@/utile/types";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";

 


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
      ? "border-black bg-[#DCCFF3] backdrop-blur-md ring-2 ring-white font-semibold"
      : "border-black/30 bg-white/5 transition-all duration-75 ease-in-out hover:border-white hover:bg-[#DCCFF3] hover:bg-opacity-30 "
  }`}
>
{option.icon} {" "} {option.label}
</button>

        ))}
      </div>

      <div className="mt-6 mx-auto">
     <button
  type="button"
  onClick={handleNext}
  disabled={!selected}
  aria-disabled={!selected}
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

export default StepUsage;


const usageOptions: { label: string; value: UsageType; icon:string}[] = [
  { label: "Gaming", value: "gaming", icon: "🎮" },
  { label: "Office Work", value: "office", icon: "💼" },
  { label: "Design / UI", value: "design", icon : "🎨" },
  { label: "General Use", value: "general", icon: "💻" },
  { label: "Programming", value: "programming" , icon: "👨‍💻"},
  { label: "Video Editing", value: "video editing" , icon: "🎬" },
  { label: "Student / Study", value: "student" , icon: "📚" },
  { label: "3D Modeling / CAD", value: "3d modeling", icon: "🛠️"  },
  { label: "Content Creation", value: "content creation", icon: "📸"  },
  { label: "Business Travel", value: "business travel", icon: "✈️"  },
  { label: "Music Production", value: "music production", icon: "🎵"  },
];
