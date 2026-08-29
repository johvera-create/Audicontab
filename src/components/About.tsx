import { CONTACT_EMAIL } from "../data/site";
import { CheckIcon, MailIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal, Stat } from "./Reveal";

const VALUES = [
  "Atención personalizada, no call center",
  "Plazos del SII siempre cumplidos",
  "Honorarios claros desde el día uno",
  "Presencial en Quillota y online a todo Chile",
];

export function AuditSeal({ className }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className ?? "h-32 w-32"}`}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full seal-spin text-brass-400" aria-hidden="true">
        <defs>
          <path
            id="seal-circle"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <circle cx="60" cy="60" r="32" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
        <text fontSize="6.8" letterSpacing="1.2" fill="currentColor" fontFamily="IBM Plex Mono, monospace" fontWeight="600">
          <textPath href="#seal-circle">
            AUDICONTAB LIMITADA · QUILLOTA · CHILE ·
          </textPath>
        </text>
      </svg>
      <img
        src="/logo.png"
        alt="Audicontab"
        className="relative h-[48%] w-[48%] rounded-full object-cover shadow-md bg-white p-0.5"
      />
    </div>
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
            <p className="mt-6 text-[16px] leading-relaxed text-ink-700 md:text-[17px]">
              En <strong className="font-semibold text-ink-900">Audicontab Limitada</strong> combinamos
              rigor técnico y cercanía humana. Asesoramos a empresas y profesionales en Quillota y la
              región de Valparaíso para mantener su contabilidad al día y sus impuestos bajo control.
            </p>
          </Reveal>

          <ul className="mt-8 space-y-3">
            {VALUES.map((v, i) => (
              <Reveal key={v} delay={i * 100} y={14}>
                <li className="group flex items-center gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-brass-500/60 bg-brass-400/15 text-brass-600 transition-all duration-300 group-hover:bg-brass-400 group-hover:text-ink-950">
                    <CheckIcon className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[15px] font-medium text-ink-800">{v}</span>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200} y={16}>
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Cotización de servicios contables"
              )}`}
              className="group mt-8 flex items-center gap-4 border border-ink-900/15 bg-paper-50 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brass-500/70 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-ink-900/20 text-ink-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-brass-400">
                <MailIcon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink-500">
                  Cotiza por correo
                </span>
                <span className="link-draw mt-0.5 inline-block break-all text-[15px] font-semibold text-ink-900">
                  {CONTACT_EMAIL}
                </span>
              </span>
            </a>
          </Reveal>
        </div>

        {/* Panel de cifras */}
        <div className="relative">
          <Reveal y={34}>
            <div className="relative overflow-hidden bg-ink-950 px-8 py-10 text-paper-50 shadow-[0_36px_80px_-30px_rgba(7,20,34,0.75)] md:px-12 md:py-14">
              <div aria-hidden="true" className="ruled-lines-dark absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(420px_300px_at_90%_10%,rgba(37,99,235,0.18),transparent_62%)]"
              />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mist-400">
                  Balance de nuestra trayectoria
                </p>
                <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8">
                  <Stat value={130} suffix="+" label="Declaraciones al año" />
                  <Stat value={98} suffix="%" label="Clientes que renuevan" delay={120} />
                  <Stat value={100} suffix="%" label="Plazos cumplidos ante el SII" delay={240} />
                  <Stat value={24} suffix=" h" label="Respuesta a tus consultas" delay={360} />
                </div>
                <div className="mt-9 flex items-center gap-3.5 border-t border-paper-50/12 pt-6">
                  <span className="h-[2px] w-8 bg-brass-400" aria-hidden="true" />
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mist-400">
                    Comprometidos con el orden financiero de tu empresa
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
          <AuditSeal className="absolute -bottom-10 -right-4 h-32 w-32 text-brass-500 drop-shadow-lg md:-right-8 md:h-40 md:w-40" />
        </div>

        {/* Galería / Nuestras Oficinas en Quillota */}
        <div className="mt-14 border-t border-ink-900/10 pt-12 lg:col-span-2">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="inline-block border border-brass-500/40 bg-brass-400/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brass-600">
                Nuestra Casa Matriz
              </span>
              <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-ink-900 sm:text-3xl">
                Un espacio cercano en el corazón de Quillota
              </h3>
            </div>
            <p className="max-w-md text-[14.5px] leading-relaxed text-ink-600">
              Te recibimos en la tradicional <strong>Galería La Fuente Colonial</strong> (O'Higgins 480, Oficina 15). Un espacio cómodo y reservado para atender tu negocio.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Foto 1: Fachada Colonial */}
            <Reveal delay={100} y={20}>
              <div className="group relative overflow-hidden border border-ink-900/15 bg-paper-50 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden bg-ink-950">
                  <img
                    src="/galeria-exterior.jpg"
                    alt="Galería La Fuente Colonial - O'Higgins 480, Quillota"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-brass-500" />
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-brass-600">
                      Entrada Principal · O'Higgins 480
                    </p>
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-ink-900">
                    Galería La Fuente Colonial
                  </p>
                  <p className="mt-1 text-xs text-ink-600">
                    Fachada colonial en pleno centro de Quillota, con cafetería y fácil acceso.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Foto 2: Oficina 15 */}
            <Reveal delay={200} y={20}>
              <div className="group relative overflow-hidden border border-ink-900/15 bg-paper-50 shadow-md transition-all duration-300 hover:shadow-xl">
                <div className="aspect-[4/3] overflow-hidden bg-ink-950">
                  <img
                    src="/oficina-15.jpg"
                    alt="Oficina 15 - Audicontab Limitada"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-[#22c55e]" />
                    <p className="font-mono text-[10.5px] font-bold uppercase tracking-[0.16em] text-brass-600">
                      Oficina 15 · Audicontab Limitada
                    </p>
                  </div>
                  <p className="mt-1 font-display text-base font-bold text-ink-900">
                    Atención Personalizada y Privada
                  </p>
                  <p className="mt-1 text-xs text-ink-600">
                    Espacio tranquilo y cómodo para revisar la contabilidad e impuestos de tu negocio.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
