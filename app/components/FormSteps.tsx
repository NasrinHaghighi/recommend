
'use client';


import { useEffect, useState } from "react";


import type { LaptopFormData } from "../../utiles/types";
import StepCarousel from "./StepCarousel";
import StepUsage from "./StepUsage";
import StepBudget from "./StepBuget";
import StepBrand from "./StepBrand";
import StepResult from "./StepResult";
import type { Laptop } from "@/utiles/types";
import { GridLoader  } from "react-spinners";

interface CSSProperties {
    display?: string;
    margin?: string;
    borderColor?: string;
}
const override: CSSProperties = {
  display: "block",
  margin: "10px auto",
  borderColor: "blue",
};
type ImageResult = { key: string; imageUrl: string | null };
function FormSteps() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<Partial<LaptopFormData>>({});
const [aiResults, setAiResults] = useState<Laptop[] | null>(null);
const [isLoading, setIsLoading] = useState(false);
  

  const canGoToStep = (step: number, data: Partial<LaptopFormData>) => {
    switch (step - 1) {
      case 1:
        return !!data.usage;
      case 2:
        return !!data.budget;
      case 3:
        return !!data.performance;
      //case 4:
        //return !!data.brand;
      default:
        return true;
    }
  };

  const nextStep =async (data: Partial<LaptopFormData>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);
     

    if (step === 3) {
            setIsLoading(true);

    
    try {
          const [res] = await Promise.all([
        fetch("/api/recommandation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
        }),
       
      ]
    
  
    );

      const result = await res.json();
     
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (rawText) {
        // ✅ Remove triple-backtick markdown wrapper and parse JSON
        const jsonText = rawText.match(/```json\n([\s\S]*?)\n```/)?.[1];

        if (jsonText) {
          try {
            const laptops: Laptop[] = JSON.parse(jsonText);
            const imageQueries = laptops.map((l) => l.imageQuery);

// 2. Call /api/images
            const imageRes = await fetch("/api/images", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ keys: imageQueries }),
            });
            const { images }: { images: ImageResult[] } = await imageRes.json(); // { images: [{ key, imageUrl }] }
            // 3. Map image results
            const imageMap = new Map(images.map((img) => [img.key, img.imageUrl]));
           
            // 4. Enrich laptops
            const enriched = laptops.map((item) => ({
              ...item,
              imageUrl: imageMap.get(item.imageQuery) || "", // fallback to empty string if not found
            }));
           console.log("🚀 Enriched laptops with images:", enriched);
            setAiResults(enriched); // ✅ Set parsed data
            setStep(4); // move to results
          } catch (e) {
            console.error("❌ Failed to parse JSON from AI:", e);
            setAiResults(null);
          }
        } else {
          console.warn("⚠️ No JSON code block found in AI response.");
          setAiResults(null);
        }
      } else {
        console.warn("⚠️ Unexpected AI response format:", result);
        setAiResults(null);
      }

    } catch (err) {
      console.error("❌ API error:", err);
    } finally {
      setIsLoading(false);
    }

  } else {
    setStep((prev) => prev + 1);
  }

  }; 


  const prevStep = () => setStep(step - 1);


  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto p-6 rounded bg-glass    my-10 text-center">
        <p className=" text-lg mb-5">Generating recommendations...</p>
         <GridLoader 
        color="#0faedf"
        loading={isLoading}
        cssOverride={override}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />

      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 rounded    my-10">
      <StepCarousel currentStep={step} setStep={setStep} canGoToStep={canGoToStep} formData={formData} />
      

      {/* Step 1: Usage */}
            {step === 1 && (
            <StepUsage nextStep={nextStep} defaultData={formData} />
            )}


                {/* Step 2: Usage */}
            {step === 2 && (
            <StepBudget nextStep={nextStep} defaultData={formData} prevStep={prevStep}/>
            )}


            {step === 3 && (
            <StepBrand nextStep={nextStep} defaultData={formData} prevStep={prevStep}/>
            )}

            {step === 4 && aiResults && (
            <StepResult aiResults={aiResults}/>
            )}


          </div>
  );
}

export default FormSteps;
