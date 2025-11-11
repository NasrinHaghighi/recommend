
'use client';

import React, { useRef, useEffect, useState } from "react";

import { FaCheck, FaLaptopCode } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
//import { GiProcessor } from "react-icons/gi";
import { FaTrademark } from "react-icons/fa";
import { FaFlagCheckered } from "react-icons/fa";
import type { LaptopFormData } from "../../utile/types";

interface Step {
  id: number;
  icon: React.ReactNode;
  label: string;
}

interface StepCarouselProps {
  currentStep: number;
  setStep: (step: number) => void;
  formData: Partial<LaptopFormData>; // ✅ Accepts partial form data
  canGoToStep: (step: number, data: Partial<LaptopFormData>) => boolean;
}

const steps: Step[] = [
  { id: 1, icon: <FaLaptopCode size={24} />, label: "Usage" },
  { id: 2, icon: <IoMdCash size={24} />, label: "Budget" },
 // { id: 3, icon: <GiProcessor size={24} />, label: "Performance" },
   { id: 3, icon: <FaTrademark size={24} />, label: "Brand" },
  { id: 4, icon: <FaFlagCheckered size={24} />, label: "Results" },
];

const StepCarousel: React.FC<StepCarouselProps> = ({ currentStep, setStep, canGoToStep , formData}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }
    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const stepWidth = 80; // width of each step including margin
  const offset = containerWidth / 2 - stepWidth / 2 - (currentStep - 1) * stepWidth;

  return (
    <div className="w-full  mb-10
 overflow-hidden relative" ref={containerRef}>
      {/* Carousel Items */}
      <div
        className="flex py-5 transition-transform duration-500"
        style={{ transform: `translateX(${offset}px)` }}
      >
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <div
              key={step.id}
              className={`flex flex-col items-center mx-2 transition-all duration-300 cursor-pointer ${
                isActive ? "scale-125  rounded-2xl h-auto px-2 py-2 " : 
                "rounded-2xl scale-90 opacity-50 border-0 border-white/0 p-3"
              }`}

              // check validation to allow step click
                onClick={() => {
  
                    if (canGoToStep(step.id, formData)) {
                      setStep(step.id);
                    } else {
                      console.log("Cannot go to this step yet!");
                      // optionally show a shake animation or toast
                    }
                  }}
       



              style={{ width: `${stepWidth}px` }}
            >
             <div
                className={`flex items-center justify-center w-12 h-12 rounded-full border-1  ${
                  isActive ? "bg-white/70 border-white/20" : "bg-gray-300 "
                }`}
              >

                 <div
    className={`transition-all duration-300 ease-in-out transform ${
      isCompleted ? "scale-100 opacity-100" : "scale-0 opacity-0"
    } absolute`}
  >
    <FaCheck size={20} className="text-green-500" />
  </div>

  <div
    className={`transition-all duration-300 ease-in-out transform ${
      !isCompleted ? "scale-100 opacity-100" : "scale-0 opacity-0"
    }`}
  >
    {step.icon}
  </div>
              </div> 
              <span className={`mt-2 text-xs text-center ${isActive ? "text-black" : "text-black/50"}`} style={{ whiteSpace: 'pre-line' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      
     
    </div>
  );
};

export default StepCarousel;
