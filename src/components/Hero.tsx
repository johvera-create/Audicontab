import {
  LEDGER_BALANCE,
  LEDGER_ENTRIES,
  QUILLOTA_COORDS,
  waLink,
  daysUntil,
  formatCLP,
  formatDayMonth,
  getUpcomingDeadlines,
} from "../data/site";
import { useCountUp, useInView, useScramble } from "../hooks/useMotion";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./icons";
import { Eyebrow, Stat } from "./Reveal";

function daysLabel(n: number) {
  if (n <= 0) return "HOY";
  if (n === 1) return "MAÑANA";
  return `EN ${n} DÍAS`;
}

function LedgerCard() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const balance = useCountUp(LEDGER_BALANCE, inView, 1900);
  const f29 = getUpcomingDeadlines().find((d) => d.code === "F29")!;
  const days = daysUntil(f29.date);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md lg:ml-auto">
      {/* marco desplazado */}
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-4 translate-y-4 border-2 border-brass-400/45"
      />
      <div className="relative -rotate-[1.6deg] bg-paper-50 text-ink-900 shadow-[0_32px_70px_-24px_rgba(4,12,22,0.85)] transition-transform duration-700 hover:rotate-0">
        {/* cabecera del libro */}
        <div className="flex items-center justify-between border-b-2 border-ink-900 px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-500">
              Libro mayor · Folio N° 412
            </p>
            <p className="font-display text-xl font-extrabold tracking-tight">
              Abril — Audicontab Ltda.
            </p>
          </div>
          <span className="border border-brass-500/60 bg-brass-400/15 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-brass-600">
            Al día
          </span>
        </div>

        {/* columna títulos */}
        <div className="grid grid-cols-[54px_1fr_78px_78px] gap-2 border-b border-ink-900/15 px-6 py-2 font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">
          <span>Fecha</span>
          <span>Concepto</span>
          <span className="text-right">Debe</span>
          <span className="text-right">Haber</span>
        </div>

        {/* movimientos */}
        <div className="ruled-lines px-6 py-1">
          {LEDGER_ENTRIES.map((e, i) => {
            const shown = inView;
            return (
              <div
                key={e.folio}
                className="grid grid-cols-[54px_1fr_78px_78px] items-baseline gap-2 py-[9px]"
                style={{
                  opacity: shown ? 1 : 0,
                  transform: shown ? "none" : "translateX(26px)",
                  transition: `opacity 0.6s ease ${200 + i * 150}ms, transform 0.6s cubic-bezier(0.22,0.61,0.36,1) ${200 + i * 150}ms`,
                }}
              >
                <span className="font-mono text-[10.5px] text-ink-500">{e.fecha}</span>
                <span className="flex items-center gap-1.5 truncate text-[13.5px] font-medium text-ink-800">
                  {e.concepto}
                  {e.ok && <CheckIcon className="h-3.5 w-3.5 shrink-0 text-brass-600" />}
                </span>
                <span className="tabular text-right font-mono text-[12.5px] text-ink-800">
                  {e.debe ? formatCLP(e.debe) : "—"}
                </span>
                <span className="tabular text-right font-mono text-[12.5px] text-ink-500">
                  {e.haber ? formatCLP(e.haber) : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* saldo */}
        <div className="flex items-end justify-between border-t-2 border-ink-900 px-6 py-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink-500">
              Saldo del mes
            </p>
            <p className="mt-1 font-mono text-[10px] text-ink-500">
              Debe {formatCLP(LEDGER_ENTRIES.reduce((s, e) => s + e.debe, 0))} · Haber{" "}
              {formatCLP(LEDGER_ENTRIES.reduce((s, e) => s + e.haber, 0))}
            </p>
          </div>
          <p className="tabular font-display text-2xl font-extrabold text-ink-900 md:text-[1.7rem]">
            {formatCLP(balance)}
          </p>
        </div>
      </div>

      {/* chip próximo vencimiento */}
      <div className="relative z-10 -mt-4 ml-6 inline-flex items-center gap-2 border border-brass-400/70 bg-ink-950 px-4 py-2 shadow-lg">
        <span className="relative flex h-2 w-2">
          <span className="pulse-ring absolute inline-flex h-full w-full bg-brass-400" />
          <span className="relative inline-flex h-2 w-2 bg-brass-400" />
        </span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-brass-300">
          Próximo F29 · {formatDayMonth(f29.date)} · {daysLabel(days)}
        </span>
      </div>
    </div>
  );
}

export default function Hero() {
  const title = "¿Necesitas contador?";
  const display = useScramble(title, true, 1300);

  return (
    <section id="inicio" className="relative overflow-hidden bg-ink-950">
      {/* capas ambientales */}
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(820px_480px_at_78%_18%,rgba(37,99,235,0.18),transparent_65%),radial-gradient(700px_520px_at_8%_88%,rgba(30,58,138,0.26),transparent_60%)]"
      />
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-40" />

      {/* coordenadas verticales */}
      <p
        aria-hidden="true"
        className="absolute left-6 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] uppercase tracking-[0.42em] text-mist-500 [writing-mode:vertical-rl] xl:block"
      >
        Quillota · Región de Valparaíso — {QUILLOTA_COORDS}
      </p>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 pb-20 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Columna editorial */}
        <div className="lg:col-span-7">
          <Eyebrow tone="light">Asesoría contable &amp; tributaria · desde Quillota</Eyebrow>

          <h1
            aria-label={title}
            className="mt-7 font-display text-[2.85rem] font-extrabold leading-[1.02] tracking-tight text-paper-50 sm:text-6xl xl:text-[5.2rem]"
          >
            <span aria-hidden="true">{display}</span>
            <span aria-hidden="true" className="blink-caret ml-2 text-brass-400">
              _
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist-300 md:text-xl">
            Los contadores de <strong className="font-semibold text-paper-50">Audicontab Limitada</strong>{" "}
            están para apoyarte: IVA, remuneraciones, facturación electrónica y Operación Renta,
            siempre dentro de plazo.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center gap-3 bg-brass-400 px-7 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition-all duration-300 hover:bg-brass-300 hover:shadow-[0_14px_36px_-10px_rgba(229,173,67,0.65)]"
            >
              Agenda una reunión
              <ArrowIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-paper-50/25 px-7 py-4 font-mono text-[13px] uppercase tracking-[0.14em] text-paper-50 transition-all duration-300 hover:border-brass-400 hover:text-brass-300"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#4ade80] transition-transform duration-300 group-hover:scale-110" />
              Escríbenos por WhatsApp
            </a>
          </div>

          <div className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-paper-50/12 pt-8">
            <Stat value={130} suffix="+" label="Declaraciones al año" />
            <Stat value={98} suffix="%" label="Clientes que renuevan" delay={120} />
            <Stat value={100} suffix="%" label="Plazos SII cumplidos" delay={240} />
          </div>
        </div>

        {/* Libro mayor */}
        <div className="flex items-center lg:col-span-5">
          <LedgerCard />
        </div>
      </div>

      {/* señal de scroll */}
      <div className="relative mx-auto flex max-w-7xl items-center gap-3 px-6 pb-8">
        <span className="scroll-line h-10 w-px bg-brass-400/80" />
        <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-mist-500">
          Revisa el libro
        </span>
      </div>
    </section>
  );
}
