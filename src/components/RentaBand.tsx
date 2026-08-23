import { RENTA_MILESTONES } from "../data/site";
import { ArrowIcon, CalendarIcon, CheckIcon, InvoiceIcon } from "./icons";
import { MaskLines, Reveal } from "./Reveal";

const MILESTONE_ICONS = {
  calendar: CalendarIcon,
  invoice: InvoiceIcon,
  check: CheckIcon,
} as const;

export default function RentaBand() {
  return (
    <section id="renta" className="relative overflow-hidden bg-brass-400">
      {/* texturas ambientales */}
      <div aria-hidden="true" className="stripe-gold absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(640px_320px_at_15%_0%,rgba(247,212,136,0.55),transparent_60%),linear-gradient(to_bottom,rgba(11,33,55,0.04),transparent_30%,rgba(11,33,55,0.08))]"
      />
      {/* marca de agua F22 */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-14 select-none font-display text-[11rem] font-extrabold leading-none tracking-tighter text-ink-950/[0.055] sm:text-[16rem]"
      >
        F22
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        {/* Columna editorial */}
        <div className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="shimmer-sweep absolute top-0 h-full w-24 bg-paper-50/25" />
          </div>

          <Reveal y={14}>
            <span className="inline-flex items-center gap-2.5 border-2 border-ink-950 bg-paper-50 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-ink-950 shadow-[4px_4px_0_rgba(11,33,55,0.85)]">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute h-full w-full bg-ink-950" />
                <span className="relative h-2 w-2 bg-ink-950" />
              </span>
              Temporada alta contable
            </span>
          </Reveal>

          <MaskLines
            className="mt-6 font-display text-[3.1rem] font-extrabold leading-[0.98] tracking-tight text-ink-950 sm:text-6xl xl:text-7xl"
            lines={["OPERACIÓN", "RENTA 2027"]}
          />

          <Reveal delay={180}>
            <p className="mt-7 font-display text-xl font-bold leading-snug text-ink-950 sm:text-2xl">
              ¿Necesitas ayuda con tu declaración?{" "}
              <span className="underline decoration-ink-950/35 decoration-4 underline-offset-[6px]">
                Nosotros nos encargamos de todo.
              </span>
            </p>
          </Reveal>

          <Reveal delay={280}>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-900 sm:text-lg">
              Revisamos tus antecedentes, presentamos tu F22 y seguimos tu devolución hasta que
              esté en tu cuenta.
            </p>
          </Reveal>

          <Reveal delay={380}>
            <a
              href="#contacto"
              className="group mt-9 inline-flex items-center gap-3 bg-ink-950 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-brass-300 shadow-[0_14px_30px_-14px_rgba(7,20,34,0.65)] transition-all duration-300 hover:-translate-y-1.5 hover:bg-ink-900 hover:text-brass-200 hover:shadow-[0_26px_50px_-16px_rgba(7,20,34,0.75)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink-950 active:translate-y-0"
            >
              Reserva tu hora para la Renta
              <ArrowIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-2" />
            </a>
          </Reveal>

          <Reveal delay={460}>
            <p className="mt-6 flex items-center gap-3 font-mono text-[10.5px] font-semibold uppercase tracking-[0.18em] text-ink-900">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="pulse-ring absolute h-full w-full bg-ink-950" />
                <span className="relative h-2 w-2 bg-ink-950" />
              </span>
              Contamos con cupos limitados para garantizar atención personalizada
            </p>
          </Reveal>
        </div>

        {/* Hitos del proceso */}
        <div className="flex flex-col justify-center">
          <Reveal y={14}>
            <div className="flex items-center justify-between gap-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-ink-950">
                Hitos del proceso
              </p>
              <span className="border-2 border-ink-950 px-2.5 py-1 font-mono text-[10.5px] font-bold tracking-[0.22em] text-ink-950">
                F22 · SII
              </span>
            </div>
          </Reveal>

          <div className="relative mt-7">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-[19px] top-6 w-px bg-ink-950/25 sm:left-[23px]"
            />
            {RENTA_MILESTONES.map((m, i) => {
              const Icon = MILESTONE_ICONS[m.icon];
              return (
                <Reveal key={m.day} delay={i * 150} y={22}>
                  <div
                    className={`group relative flex items-start gap-4 py-6 sm:gap-6 ${
                      i > 0 ? "border-t-2 border-ink-950/20" : ""
                    }`}
                  >
                    <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center border-2 border-ink-950 bg-brass-300 text-ink-950 transition-all duration-300 group-hover:-rotate-6 group-hover:bg-ink-950 group-hover:text-brass-300 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" strokeWidth={2} />
                    </span>
                    <div className="w-12 shrink-0 sm:w-24">
                      <p className="tabular font-display text-4xl font-extrabold leading-none text-ink-950 transition-transform duration-300 group-hover:-translate-y-1 sm:text-5xl">
                        {m.day}
                      </p>
                      <p className="mt-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-ink-800 sm:text-[11px]">
                        {m.month} 2027
                      </p>
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-bold leading-tight text-ink-950 sm:text-xl">
                        {m.title}
                      </h3>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-ink-900/90 sm:text-[15px]">
                        {m.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={480}>
            <p className="border-t-2 border-ink-950/20 pt-4 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-800">
              * Fechas referenciales según calendario SII
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
