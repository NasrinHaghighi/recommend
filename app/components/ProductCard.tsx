import type { Laptop } from "@/utile/types";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { CiBatteryFull } from "react-icons/ci";
import { FaGauge } from "react-icons/fa6";
import { FaHardDrive } from "react-icons/fa6";
import { TbHeartRateMonitor } from "react-icons/tb";
import { LuWeight } from "react-icons/lu";
import { GrDocumentPerformance } from "react-icons/gr";


type Props = { item: Laptop; index?: number };

const toChips = (s?: string) => s ? s.split("·").map(x => x.trim()).filter(Boolean) : [];
const eur = (n: number | string) =>
  typeof n === "number"
    ? new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
    : n;

function performanceTier(cpu?: string, gpu?: string) {
  const c = (cpu || "").toLowerCase();
  const g = (gpu || "").toLowerCase();
  if (/m[1-3]|ryzen 7|i7|i9|rtx/i.test(c+g)) return { label: "Top performance", tone: "bg-emerald-50 text-emerald-700" };
  if (/ryzen 5|i5|mx|arc/i.test(c+g)) return { label: "Great performance", tone: "bg-sky-50 text-sky-700" };
  return { label: "Everyday performance", tone: "bg-zinc-100 text-zinc-700" };
}

export default function ProductCard({ item }: Props) {
  const highlights = toChips(item.reason);
  const pros = toChips(item.pros).slice(0, 3);
  const cons = toChips(item.cons).slice(0, 3);
  const perf = performanceTier(item.cpu, item.gpu);

  // Choose a “from” price and vendor for the main CTA
  const bestPrice = item.priceAmazon ?? item.priceWorten ?? "";
  const bestLink = item.amazonLink ?? item.wortenLink ?? "#";
  const hasImage = Boolean(item.imageUrl);

  return (
    <article
      className="rounded-2xl border border-zinc-200/60 bg-white shadow-sm overflow-hidden  "
      aria-label={`${item.brand} ${item.model}`}
    >
      {/* Image */}
      <div className="grid grid-cols-2 gap-4 h-32 md:h-48 lg:h-56">
           <div className="relative aspect-[4/3] md:aspect-auto md:h-full bg-zinc-50 col-span-1">
        {hasImage ? (
          <Image
            src={item.imageUrl!}
            alt={`${item.brand} ${item.model}`}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 220px"
            priority={false}
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-zinc-400">No image</div>
        )}
      </div>
   <header className=" gap-4 col-span-1 m-auto">
          <h3 className="md:text-lg text-md  font-semibold text-zinc-900">
            {item.brand} <span className="font-normal">•</span> {item.model}
          </h3>
          {bestPrice && (
            <div className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              from {bestPrice}
            </div>
          )}
        </header>
      </div>
   

      {/* Content */}
      <div className="p-5">
        {/* Title + primary price */}
       

        {/* Best for + quick highlight */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${perf.tone}`}>{perf.label}</span>
          {highlights.slice(0, 2).map((h, i) => (
            <span key={i} className="rounded-full bg-[#dccff3] text-[#111] px-2.5 py-1 text-xs">
              {h}
            </span>
          ))}
        </div>

        {/* Friendly summary */}
        {item.plainSummary && (
          <p className="mt-3 text-sm leading-6 text-zinc-700">{item.plainSummary}</p>
        )}

        {/* Simplified, human specs */}
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <Spec icon={<GrDocumentPerformance  className="h-4 w-4" />} term="Performance" desc={perf.label} />
          {item.ram && <Spec icon={<FaGauge  className="h-4 w-4" />} term="Multitasking" desc={`${item.ram}`} />}
          {item.storage && <Spec icon={<FaHardDrive  className="h-4 w-4" />} term="Space" desc={item.storage} />}
          {item.display && <Spec icon={<TbHeartRateMonitor  className="h-4 w-4" />} term="Screen" desc={item.display} />}
          {item.weightKg && <Spec icon={<LuWeight  className="h-4 w-4" />} term="Portable" desc={`${item.weightKg} kg`} />}
          {item.batteryHours && <Spec icon={<CiBatteryFull  className="h-4 w-4" />} term="Battery" desc={`up to ${item.batteryHours} h`} />}
        </dl>

        {/* Pros / Cons */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pros.length > 0 && (
            <Box tone="emerald">
              <h4 className="text-xs font-semibold text-emerald-700">Pros</h4>
              <ul className="mt-1 space-y-1 text-sm text-emerald-900 list-disc pl-5">
                {pros.map((p, i) => <li key={i}>{p}</li>)}
              </ul>
            </Box>
          )}
          {cons.length > 0 && (
            <Box tone="rose">
              <h4 className="text-xs font-semibold text-rose-700">Cons</h4>
              <ul className="mt-1 space-y-1 text-sm text-rose-900 list-disc pl-5">
                {cons.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </Box>
          )}
        </div>

        {/* CTAs */}
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={bestLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
          >
            View best price <FaExternalLinkAlt  className="h-4 w-4" aria-hidden="true" />
          </a>

          {item.amazonLink && item.priceAmazon && (
            <a
              href={item.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Amazon • {item.priceAmazon}
            </a>
          )}
          {item.wortenLink && item.priceWorten && (
            <a
              href={item.wortenLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50"
            >
              Worten • {item.priceWorten}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, term, desc }: { icon: React.ReactNode; term: string; desc?: string }) {
  if (!desc) return null;
  return (
    <div className="flex items-start gap-2">
      <span className="mt-0.5 text-zinc-500">{icon}</span>
      <div>
        <dt className="text-zinc-500">{term}</dt>
        <dd className="font-medium text-zinc-900">{desc}</dd>
      </div>
    </div>
  );
}

function Box({ children, tone }: { children: React.ReactNode; tone: "emerald" | "rose" }) {
  const map = {
    emerald: "rounded-xl bg-emerald-50 p-3",
    rose: "rounded-xl bg-rose-50 p-3",
  } as const;
  return <div className={map[tone]}>{children}</div>;
}
