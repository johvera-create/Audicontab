import { useInView } from "../hooks/useMotion";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico inicial",
    desc: "Revisamos tu situación contable y tributaria actual, sin costo: RUT, inicio de actividades, libros y declaraciones pendientes.",
  },
  {
    n: "02",
    title: "Propuesta clara",
    desc: "Recibes una propuesta con honorarios cerrados, alcance definido y calendario de obligaciones. Sin letra chica.",
  },
  {
    n: "03",
    title: "Puesta en marcha",
    desc: "Ordenamos tu contabilidad, activamos la facturación electrónica y dejamos tus declaraciones al día ante el SII.",
  },
  {
    n: "04",
    title: "Cumplimiento continuo",
    desc: "Cada mes presentamos a tiempo, te avisamos antes de cada vencimiento y estamos a una llamada de distancia.",
  },
];

export default function Process() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section className="relative overflow-hidden bg-paper-50 py-20 md:py-28">
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["Cuatro pasos, cero", "sorpresas con el SII."]}
            />
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-ink-600 lg:col-span-5">
            Así se ve trabajar con Audicontab: un proceso ordenado, con plazos claros y
            comunicación directa con tu contador.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* línea que se dibuja al hacer scroll */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-[22px] hidden h-[2px] bg-ink-900/15 lg:block"
            style={{ right: 0 }}
          >
            <div
              className="h-full bg-brass-500 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{ width: inView ? "100%" : "0%" }}
            />
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 160} y={28}>
                <div className="group relative">
                  <div className="relative z-[1] flex h-11 w-11 items-center justify-center border-2 border-ink-900 bg-paper-50 font-mono text-[13px] font-bold text-ink-900 transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-ink-900 group-hover:text-brass-400">
                    {s.n}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink-900">{s.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-600">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
