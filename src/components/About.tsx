import { CheckIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal, Stat } from "./Reveal";

const VALUES = [
  "Atención personalizada, no call center",
  "Plazos del SII siempre cumplidos",
  "Honorarios claros desde el día uno",
  "Presencial en Quillota y online a todo Chile",
];

export function AuditSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <g className="seal-spin">
        <defs>
          <path
            id="seal-circle"
            d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"
            fill="none"
          />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeWidth="1" />
        <text fontSize="8.6" letterSpacing="2.6" fill="currentColor" fontFamily="IBM Plex Mono, monospace">
          <textPath href="#seal-circle">
            AUDICONTAB LIMITADA · QUILLOTA · CHILE ·
          </textPath>
        </text>
        <path
          d="M60 44 51.5 76M60 44 68.5 76M54.6 66.5h10.8"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export default function About() {
  return (
    <section id="nosotros" className="relative overflow-hidden bg-paper-100 py-20 md:py-28">
      <div aria-hidden="true" className="ruled-lines absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Quiénes somos</Eyebrow>
          <MaskLines
            className="mt-5 font-display text-4xl font-extrabold leading-[1.03] tracking-tight text-ink-900 sm:text-5xl"
            lines={["Contadores de oficio,", "cercanos por convicción."]}
          />
          <Reveal delay={160}>
            <p className="mt-7 text-[16px] leading-relaxed text-ink-700">
              En <strong className="font-semibold text-ink-900">Audicontab Limitada</strong> somos un
              equipo de profesionales contadores con años de experiencia brindando servicios de
              calidad en Quillota y la región de Valparaíso. Nos especializamos en asesoría contable,
              tributaria y gestión empresarial.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-ink-700">
              Nuestro enfoque personalizado nos permite ofrecer soluciones adaptadas a las
              necesidades específicas de cada empresa: desde el emprendedor que parte con boletas de
              honorarios hasta la pyme que necesita su contabilidad completa al día.
            </p>
          </Reveal>

          <ul className="mt-9 space-y-3.5">
            {VALUES.map((v, i) => (
              <Reveal key={v} delay={i * 110} y={16}>
                <li className="group flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-brass-500/60 bg-brass-400/15 text-brass-600 transition-all duration-300 group-hover:bg-brass-400 group-hover:text-ink-950">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-[15.5px] font-medium text-ink-800">{v}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Panel de cifras */}
        <div className="relative">
          <Reveal y={34}>
            <div className="relative overflow-hidden bg-ink-950 px-9 py-11 text-paper-50 shadow-[0_36px_80px_-30px_rgba(7,20,34,0.75)] md:px-12 md:py-14">
              <div aria-hidden="true" className="ruled-lines-dark absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(420px_300px_at_90%_10%,rgba(229,173,67,0.16),transparent_62%)]"
              />
              <div className="relative">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-mist-400">
                  Balance de nuestra trayectoria
                </p>
                <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-10">
                  <Stat value={15} suffix="+" label="Años de trayectoria" />
                  <Stat value={120} suffix="+" label="Empresas activas" delay={120} />
                  <Stat value={1400} suffix="+" label="Declaraciones al año" delay={240} />
                  <Stat value={98} suffix="%" label="Clientes que renuevan" delay={360} />
                </div>
                <div className="mt-11 flex items-center gap-4 border-t border-paper-50/12 pt-7">
                  <span className="h-[2px] w-10 bg-brass-400" aria-hidden="true" />
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.24em] text-mist-400">
                    Comprometidos con el éxito financiero de nuestros clientes
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <AuditSeal className="absolute -bottom-10 -right-4 h-32 w-32 text-brass-500 drop-shadow-lg md:-right-8 md:h-40 md:w-40" />
        </div>
      </div>
    </section>
  );
}
