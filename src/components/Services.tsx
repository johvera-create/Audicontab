import { useState } from "react";
import { SERVICES } from "../data/site";
import { SERVICE_ICONS, ArrowIcon, CheckIcon, PlusIcon } from "./icons";
import { Eyebrow, MaskLines } from "./Reveal";

export default function Services() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const resolvedIdx =
    hoverIdx !== null && hoverIdx >= 0 && hoverIdx < SERVICES.length
      ? hoverIdx
      : openIdx >= 0 && openIdx < SERVICES.length
      ? openIdx
      : 0;

  const active = SERVICES[resolvedIdx] ?? SERVICES[0];
  const ActiveIcon = SERVICE_ICONS[active.icon];

  return (
    <section id="servicios" className="relative bg-paper-50 py-20 md:py-28">
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Nuestros servicios</Eyebrow>
            <MaskLines
              as="h2"
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["Todo el ciclo contable,", "bajo un mismo techo."]}
            />
          </div>
          <p className="max-w-sm text-[15px] leading-relaxed text-ink-600 lg:col-span-4">
            Todo el ciclo contable y tributario de tu empresa ante el SII, Previred y la
            municipalidad, en un solo lugar.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Panel fijo */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-500">
                Partida seleccionada
              </p>
              <div
                key={active.id}
                className="quote-in mt-4 border-l-4 border-brass-500 bg-ink-900 px-8 py-9 text-paper-50"
              >
                <div className="flex items-start justify-between">
                  <span className="tabular font-display text-7xl font-extrabold leading-none text-brass-400">
                    {String(resolvedIdx + 1).padStart(2, "0")}
                  </span>
                  <ActiveIcon className="h-9 w-9 text-mist-400" />
                </div>
                <h3 className="mt-5 font-display text-2xl font-bold leading-snug">{active.title}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mist-300">{active.desc}</p>
                <div className="mt-6 h-[3px] w-full bg-ink-700">
                  <div
                    className="h-full bg-brass-400 transition-[width] duration-500"
                    style={{ width: `${((resolvedIdx + 1) / SERVICES.length) * 100}%` }}
                  />
                </div>
                <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500">
                  {active.code} · Audicontab Ltda.
                </p>
              </div>
            </div>
          </div>

          {/* Acordeón */}
          <div className="lg:col-span-8">
            <ul>
              {SERVICES.map((s, i) => {
                const Icon = SERVICE_ICONS[s.icon];
                const open = openIdx === i;
                return (
                  <li key={s.id} className="border-t border-ink-900/15 last:border-b">
                    <button
                      className="group grid w-full grid-cols-[44px_44px_1fr_32px] items-center gap-3 py-5 text-left sm:grid-cols-[52px_52px_1fr_36px] sm:gap-5 sm:py-6"
                      onClick={() => setOpenIdx(open ? -1 : i)}
                      onMouseEnter={() => setHoverIdx(i)}
                      onMouseLeave={() => setHoverIdx(null)}
                      aria-expanded={open}
                    >
                      <span
                        className={`tabular font-mono text-[12px] transition-colors ${
                          open ? "text-brass-600" : "text-mist-500 group-hover:text-ink-700"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex h-11 w-11 items-center justify-center border transition-all duration-300 ${
                          open
                            ? "border-ink-900 bg-ink-900 text-brass-400"
                            : "border-ink-900/25 text-ink-700 group-hover:border-ink-900 group-hover:bg-ink-900 group-hover:text-brass-400"
                        }`}
                      >
                        <Icon className="h-[22px] w-[22px]" />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block font-display text-xl font-bold tracking-tight transition-colors duration-300 sm:text-2xl ${
                            open ? "text-ink-900" : "text-ink-700 group-hover:text-ink-900"
                          }`}
                        >
                          {s.title}
                        </span>
                        <span className="mt-0.5 hidden font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500 sm:block">
                          {s.code} · {s.bullets[0]}
                        </span>
                      </span>
                      <PlusIcon
                        className={`h-5 w-5 transition-all duration-500 ${
                          open ? "rotate-45 text-brass-600" : "text-ink-500 group-hover:text-ink-900"
                        }`}
                      />
                    </button>

                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <div className="grid gap-6 pb-8 pl-[55px] pr-2 sm:grid-cols-[1fr_220px] sm:pl-[77px]">
                          <div>
                            <p className="max-w-xl text-[15px] leading-relaxed text-ink-600">
                              {s.desc}
                            </p>
                            <ul className="mt-5 space-y-2.5">
                              {s.bullets.map((b) => (
                                <li key={b} className="flex items-start gap-3 text-[14.5px] text-ink-800">
                                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-600" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="flex flex-col justify-end">
                            <a
                              href="#contacto"
                              className="group/link inline-flex items-center gap-2 self-start border border-ink-900 px-5 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-900 transition-all duration-300 hover:bg-ink-900 hover:text-brass-300"
                            >
                              Solicitar este servicio
                              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500 lg:hidden">
              · Desliza y abre cada partida para ver el detalle ·
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
