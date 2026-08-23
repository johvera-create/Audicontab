import { useEffect, useRef, useState } from "react";
import { TESTIMONIALS } from "../data/site";
import { usePrefersReducedMotion } from "../hooks/useMotion";
import { ArrowIcon, QuoteIcon } from "./icons";
import { Eyebrow, MaskLines } from "./Reveal";

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const t = TESTIMONIALS[idx];
  const total = TESTIMONIALS.length;
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (reduced || paused) return;
    timer.current = window.setInterval(() => {
      setIdx((v) => (v + 1) % total);
    }, 6500);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reduced, paused, total]);

  return (
    <section
      id="clientes"
      className="relative overflow-hidden bg-paper-100 py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div aria-hidden="true" className="ruled-lines absolute inset-0 opacity-60" />
      <QuoteIcon
        className="pointer-events-none absolute -top-10 right-8 h-56 w-56 text-ink-700/[0.06]"
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Lo que dicen nuestros clientes</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["Palabra de contribuyente."]}
            />
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <button
              onClick={() => setIdx((idx - 1 + total) % total)}
              aria-label="Testimonio anterior"
              className="flex h-12 w-12 items-center justify-center border border-ink-900/25 text-ink-700 transition-all duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-brass-300"
            >
              <ArrowIcon className="h-5 w-5 rotate-180" />
            </button>
            <button
              onClick={() => setIdx((idx + 1) % total)}
              aria-label="Testimonio siguiente"
              className="flex h-12 w-12 items-center justify-center border border-ink-900/25 text-ink-700 transition-all duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-brass-300"
            >
              <ArrowIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 min-h-[220px] sm:min-h-[190px]">
          <figure key={idx} className="quote-in">
            <blockquote className="max-w-3xl text-[1.35rem] font-medium leading-snug text-ink-800 sm:text-[1.7rem]">
              <span className="mr-2 text-brass-500">“</span>
              {t.quote}
              <span className="ml-2 text-brass-500">”</span>
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-4">
              <span className="flex h-11 w-11 items-center justify-center border border-brass-500/60 bg-brass-400/15 font-display text-lg font-extrabold text-brass-600">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <span>
                <span className="block font-display text-lg font-bold text-ink-900">{t.name}</span>
                <span className="block font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
                  {t.role}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="mt-10 flex items-center gap-4">
          <p className="tabular font-mono text-[12px] tracking-[0.2em] text-ink-500">
            {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex flex-1 gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Ir al testimonio ${i + 1}`}
                className={`h-[3px] flex-1 transition-all duration-500 ${
                  i === idx ? "bg-brass-500" : "bg-ink-900/15 hover:bg-ink-900/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
