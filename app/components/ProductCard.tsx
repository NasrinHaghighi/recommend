import type { Laptop } from "@/utiles/types";
import Image from "next/image";

type Props = { item: Laptop; index?: number };

const toChips = (s?: string) =>
  s ? s.split("·").map((x) => x.trim()).filter(Boolean) : [];

export default function ProductCard({ item, index }: Props) {

  const highlights = toChips(item.reason);
  const pros = toChips(item.pros);
  const cons = toChips(item.cons);

  console.log("🚀 Rendering ProductCard for:", item);

  return (
    <article
      className="rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm overflow-hidden"
      aria-label={`${item.brand} ${item.model}`}
    >
      {/* تصویر */}
     

      

      {/* محتوا */}
      <div className="p-5">
        <header className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-zinc-900">
            {item.brand} <span className="font-normal">•</span> {item.model}
          </h3>
          <div className="text-right">
            {/* قیمت‌ها به‌صورت badge (اگر موجود) */}
            {item.priceAmazon && (
              <div className="text-xs rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5">
                {item.priceAmazon}
              </div>
            )}
            {item.priceWorten && (
              <div className="mt-1 text-xs rounded-full bg-sky-50 text-sky-700 px-2 py-0.5">
                {item.priceWorten}
              </div>
            )}
          </div>
        </header>

        {/* خلاصه دوستانه */}
        {item.plainSummary && (
          <p className="mt-2 text-sm text-zinc-700">{item.plainSummary}</p>
        )}

        {/* هایلایت‌های فنی */}
        {highlights.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2">
            {highlights.map((h, i) => (
              <li
                key={i}
                className="text-xs rounded-full bg-zinc-100 px-2 py-1 text-zinc-700"
              >
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* مشخصات کلیدی */}
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          {item.cpu && (<><dt className="text-zinc-500">CPU</dt><dd className="font-medium">{item.cpu}</dd></>)}
          {item.gpu && (<><dt className="text-zinc-500">GPU</dt><dd className="font-medium">{item.gpu}</dd></>)}
          {item.ram && (<><dt className="text-zinc-500">RAM</dt><dd className="font-medium">{item.ram}</dd></>)}
          {item.storage && (<><dt className="text-zinc-500">Storage</dt><dd className="font-medium">{item.storage}</dd></>)}
          {item.display && (<><dt className="text-zinc-500">Display</dt><dd className="font-medium">{item.display}</dd></>)}
          {item.weightKg && (<><dt className="text-zinc-500">Weight</dt><dd className="font-medium">{item.weightKg}</dd></>)}
          {item.batteryHours && (<><dt className="text-zinc-500">Battery</dt><dd className="font-medium">{item.batteryHours}</dd></>)}
          {item.year && (<><dt className="text-zinc-500">Year</dt><dd className="font-medium">{item.year}</dd></>)}
          {item.formFactor && (<><dt className="text-zinc-500">Type</dt><dd className="font-medium">{item.formFactor}</dd></>)}
          {item.os && (<><dt className="text-zinc-500">OS</dt><dd className="font-medium">{item.os}</dd></>)}
        </dl>

        {/* Pros / Cons ساده */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {pros.length > 0 && (
            <div className="rounded-xl bg-emerald-50 p-3">
              <h4 className="text-xs font-semibold text-emerald-700">Pros</h4>
              <ul className="mt-1 list-disc pl-5 text-sm text-emerald-900">
                {pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </div>
          )}
          {cons.length > 0 && (
            <div className="rounded-xl bg-rose-50 p-3">
              <h4 className="text-xs font-semibold text-rose-700">Cons</h4>
              <ul className="mt-1 list-disc pl-5 text-sm text-rose-900">
                {cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          )}
        </div>

        {/* CTA ها */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={item.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800"
          >
            View on Amazon
          </a>
          <a
            href={item.wortenLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
          >
            View on Worten
          </a>
        </div>
      </div>
    </article>
  );
}



{/* <div className="relative aspect-[16/9] bg-zinc-50">
      {item.imageUrl ? 
    <Image
      src={item.imageUrl}
      alt={`${item.brand} ${item.model}`}
      fill
      className="object-cover"
      sizes="(max-width: 768px) 100vw, 33vw"
    />: ''}
        {/* امتیاز تطابق */}
      //   <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-900 shadow">
      //     Match {Math.round(item.match)}%
      //   </div>
      //   {typeof index === "number" && (
      //     <div className="absolute top-3 right-3 rounded-full bg-zinc-900/90 px-2.5 py-1 text-xs font-semibold text-white">
      //       #{index + 1}
      //     </div>
      //   )}
      // </div> */}
