import { useInView } from "../hooks/useMotion";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

const STEPS = [
  {
    n: "01",
    title: "Diagnóstico gratuito",
    desc: "Revisamos tu situación actual ante el SII, detectamos riesgos y oportunidades.",
  },
  {
    n: "02",
    title: "Plan tributario",
    desc: "Definimos régimen, obligaciones mensuales y un calendario a la medida de tu negocio.",
  },
  {
    n: "03",
    title: "Ejecución mensual",
    desc: "Declaramos, registramos y pagamos todo dentro de plazo. Tú sigues vendiendo.",
  },
  {
    n: "04",
    title: "Informe y mejora",
    desc: "Cada mes te contamos, en simple, cómo va tu empresa y qué conviene ajustar.",
  },
];

export default function Process() {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="proceso" className="relative bg-paper-50 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <MaskLines
              as="h2"
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["Cuatro pasos y tu", "contabilidad al día."]}
            />
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-ink-600 lg:col-span-5">
            Un método probado con más de 120 empresas de la zona: orden al inicio, cumplimiento
            todos los meses y mejoras continuas sobre tus números.
          </p>
        </div>

        <div ref={ref} className="relative mt-16">
          {/* línea que se dibuja */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[9px] hidden h-[2px] bg-ink-900/12 md:block"
          >
            <div
              className="h-full bg-brass-500 transition-[width] duration-[1400ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]"
              style={{ width: inView ? "100%" : "0%" }}
            />
          </div>

          <div className="grid gap-12 md:grid-cols-4 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 160} y={30}>
                <div className="group relative">
                  <span
                    aria-hidden="true"
                    className="relative z-10 block h-5 w-5 border-[3px] border-brass-500 bg-paper-50 transition-transform duration-300 group-hover:rotate-45 md:h-[18px] md:w-[18px]"
                  />
                  <p className="tabular mt-6 font-display text-7xl font-extrabold leading-none text-ink-900/[0.07] transition-colors duration-300 group-hover:text-brass-500/30">
                    {s.n}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-ink-900">
                    {s.title}
                  </h3>
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
