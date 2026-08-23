import { RENTA_MILESTONES } from "../data/site";
import { ArrowIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

export default function RentaBand() {
  return (
    <section id="renta" className="relative overflow-hidden bg-brass-400">
      <div aria-hidden="true" className="stripe-gold absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(640px_320px_at_15%_0%,rgba(247,212,136,0.55),transparent_60%)]"
      />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="relative">
          {/* brillo en movimiento */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <span className="shimmer-sweep absolute top-0 h-full w-24 bg-paper-50/25" />
          </div>

          <Eyebrow tone="dark">Temporada alta contable</Eyebrow>
          <MaskLines
            className="mt-5 font-display text-5xl font-extrabold leading-[0.98] tracking-tight text-ink-950 sm:text-6xl xl:text-7xl"
            lines={["OPERACIÓN", "RENTA 2025"]}
          />
          <Reveal delay={200}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-800">
              ¡Prepara tu declaración de renta con los expertos! Revisamos tus antecedentes,
              presentamos tu F22 y seguimos tu devolución hasta que esté en tu cuenta.
            </p>
          </Reveal>
          <Reveal delay={320}>
            <a
              href="#contacto"
              className="group mt-8 inline-flex items-center gap-3 bg-ink-950 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-brass-300 transition-all duration-300 hover:bg-ink-900 hover:shadow-[0_16px_38px_-12px_rgba(7,20,34,0.6)]"
            >
              Reserva tu hora para la Renta
              <ArrowIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center">
          {RENTA_MILESTONES.map((m, i) => (
            <Reveal key={m.day} delay={i * 140} y={22}>
              <div
                className={`group flex items-start gap-6 py-6 transition-colors duration-300 ${
                  i > 0 ? "border-t-2 border-ink-950/20" : "border-b-2 border-t-2 border-ink-950/20"
                }`}
              >
                <div className="w-24 shrink-0">
                  <p className="tabular font-display text-5xl font-extrabold leading-none text-ink-950 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {m.day}
                  </p>
                  <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-ink-800">
                    {m.month}
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-ink-950">{m.title}</h3>
                  <p className="mt-1.5 max-w-sm text-[15px] leading-relaxed text-ink-800/90">
                    {m.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
