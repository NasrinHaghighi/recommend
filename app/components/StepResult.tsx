import type { Laptop } from "@/utiles/types";
import ProductCard from "./ProductCard";


export default function ResultStep({ aiResults }: { aiResults: Laptop[] }) {




  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-black">Recommended Laptops</h2>

       <div className="grid gap-4">
        {aiResults.map((item, i) => (
          <div
            key={i}
            className="bg-black/10 text-black p-4 rounded-lg border border-black/20 shadow-sm"
          >
        <ProductCard key={`${item.brand}-${item.model}-${i}`} item={item} index={i} />
          </div>
        ))}
      </div> 
    </div>
  );
}
