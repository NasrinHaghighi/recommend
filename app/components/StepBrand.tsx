'use client';


import { LaptopFormData } from "@/utile/types";
import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

interface StepBrandProps {
  nextStep: (data: { brand: string[] }) => void;
  prevStep: () => void;
  defaultData?: Partial<LaptopFormData>;
}

const allBrands = [
  "Apple",
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Acer",
  "MSI",
  "Microsoft Surface",
];

const StepBrand: React.FC<StepBrandProps> = ({
  nextStep,
  prevStep,
  defaultData,
}) => {
  const [selected, setSelected] = useState<string[]>(
    defaultData?.brand ?? []
  );

  const toggleBrand = (brand: string) => {
    if (selected.includes(brand)) return;
    setSelected([...selected, brand]);
  };

  const removeBrand = (brand: string) => {
    setSelected(selected.filter((b) => b !== brand));
  };

  const handleNext = () => {
    nextStep({ brand: selected });
  };

  const availableOptions = allBrands.filter((b) => !selected.includes(b));

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-black">Preferred Brands</h2>

      {/* Selected Items */}
      <div className="flex flex-wrap gap-2">
        {selected.length === 0 && (
          <span className="text-black/50 text-sm">No brand selected</span>
        )}
     <ul className="flex flex-wrap gap-2">
  {selected.map((brand) => (
    <li key={brand}>
      <span
       className="inline-flex items-center gap-2 rounded-full
             bg-[--chip-bg] text-[--chip-fg] px-3 py-1 text-sm
             ring-1 ring-black/10 shadow-sm
             hover:shadow-md hover:-translate-y-0.5
             transition duration-200 ease-out
             focus-within:ring-2 focus-within:ring-black"
      >
        <span className="max-w-[10rem] truncate">{brand}</span>

        <button
          type="button"
          onClick={() => removeBrand(brand)}
          className="grid h-5 w-5 place-items-center rounded-full
                     hover:bg-black/10 focus:outline-none
                     focus-visible:ring-2 focus-visible:ring-black"
          aria-label={`Remove ${brand}`}
        >
          <IoClose className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </span>
    </li>
  ))}
</ul>
      </div>

      {/* Dropdown Select */}
      <div>
        <select
          onChange={(e) => toggleBrand(e.target.value)}
          value=""
          className="w-full border-black/30 bg-white/5 transition-all duration-75 ease-in-out hover:border-white  hover:bg-opacity-30  text-black px-4 py-2 rounded-xl border "
        >
          <option value="" disabled>
            Select a brand
          </option>
          {availableOptions.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation */}
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
          disabled={selected.length === 0}
          className="group btn btn-next"
        >
          Submit
           <BsArrowRight
                        className="size-4 transition-transform duration-150 ease-in-out group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
        </button>
      </div>
    </div>
  );
};

export default StepBrand;
