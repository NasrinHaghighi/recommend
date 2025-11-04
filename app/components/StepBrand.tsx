'use client';


import { LaptopFormData } from "@/utiles/types";
import React, { useState } from "react";
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
        {selected.map((brand) => (
          <span
            key={brand}
            className="flex items-center gap-1 bg-white text-black px-3 py-1 rounded-full text-xs"
          >
            {brand}
            <button onClick={() => removeBrand(brand)}>
              <IoClose size={14} />
            </button>
          </span>
        ))}
      </div>

      {/* Dropdown Select */}
      <div>
        <select
          onChange={(e) => toggleBrand(e.target.value)}
          value=""
          className="w-full bg-black/10 text-black px-4 py-2 rounded border border-white/30"
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
          className="border border-white text-white py-2 px-6 rounded hover:bg-white/10"
        >
          Back
        </button>

        <button
          onClick={handleNext}
          disabled={selected.length === 0}
          className="bg-white text-black font-medium py-2 px-6 rounded hover:bg-white/90 disabled:opacity-40"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepBrand;
