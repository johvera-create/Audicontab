import { useState } from "react";
import {
  waLink,
  daysUntil,
  formatDay,
  formatMonthShort,
  getUpcomingDeadlines,
} from "../data/site";
import { WhatsAppIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

function dueChip(days: number) {
  if (days <= 0) return { text: "HOY", urgent: true };
  if (days === 1) return { text: "MAÑANA", urgent: true };
  return { text: `EN ${days} DÍAS`, urgent: days <= 7 };
}

export default function TaxCalendar() {
  const [deadlines] = useState(() => getUpcomingDeadlines());

  return (
    <section id="calendario" className="relative overflow-hidden bg-ink-950 py-20 text-paper-100 md:py-28">
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(760px_460px_at_85%_20%,rgba(229,173,67,0.13),transparent_62%),radial-gradient(600px_420px_at_5%_90%,rgba(61,106,153,0.2),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="brass">Agenda tributaria en curso</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-paper-50 sm:text-5xl"
              lines={["Los plazos del SII,", "siempre a la vista."]}
            />
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-mist-400 lg:col-span-4">
            Estos son tus próximos vencimientos, calculados al día de hoy. Con nosotros, ninguno te
            toma por sorpresa.
          </p>
        </div>

        <div className="mt-14 border-t border-paper-50/15">
          {deadlines.map((d, i) => {
            const days = daysUntil(d.date);
            const endDays = d.periodEnd ? daysUntil(d.periodEnd) : null;
            const inPeriod = endDays !== null && days <= 0 && endDays >= 0;
            const chip = inPeriod ? { text: "EN CURSO", urgent: true } : dueChip(days);
            const first = i === 0;
            return (
              <Reveal key={`${d.code}-${d.label}`} delay={i * 110} y={22}>
                <div
                  className={`group grid grid-cols-[86px_1fr] items-center gap-4 border-b border-paper-50/15 py-6 transition-colors duration-300 hover:bg-paper-50/[0.035] sm:grid-cols-[110px_86px_1fr_auto] sm:gap-7 sm:px-4 ${
                    first ? "bg-paper-50/[0.025]" : ""
                  }`}
                >
                  {/* fecha */}
                  <div className="row-start-1 sm:row-auto">
                    <p
                      className={`tabular font-display font-extrabold leading-none text-paper-50 ${
                        d.dayLabel ? "text-[1.9rem] sm:text-4xl" : "text-4xl sm:text-5xl"
                      }`}
                    >
                      {d.dayLabel ?? formatDay(d.date)}
                    </p>
                    <p className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-brass-400">
                      {formatMonthShort(d.date)}
                      {d.periodEnd ? `–${formatMonthShort(d.periodEnd)}` : ""}
                    </p>
                  </div>

                  {/* código */}
                  <div className="hidden sm:block">
                    <span
                      className={`inline-block border px-2.5 py-1 font-mono text-[11px] font-semibold tracking-[0.18em] ${
                        first
                          ? "border-brass-400 bg-brass-400 text-ink-950"
                          : "border-paper-50/30 text-mist-300"
                      }`}
                    >
                      {d.code}
                    </span>
                  </div>

                  {/* detalle */}
                  <div className="min-w-0">
                    <p className="truncate text-[15.5px] font-semibold text-paper-50 sm:whitespace-normal sm:text-lg">
                      {d.label}
                    </p>
                    <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-500">
                      {d.freq} · <span className="sm:hidden">{d.code} · </span>
                      {inPeriod
                        ? "período en curso"
                        : days <= 0
                          ? "vence hoy"
                          : `vence en ${days} día${days === 1 ? "" : "s"}`}
                    </p>
                    {d.note && (
                      <p className="mt-2 inline-block border border-brass-400/50 bg-brass-400/10 px-2.5 py-1 font-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-brass-300">
                        {d.note}
                      </p>
                    )}
                  </div>

                  {/* chip */}
                  <div className="col-start-2 justify-self-start sm:col-start-auto sm:justify-self-end">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1.5 font-mono text-[10.5px] font-semibold tracking-[0.18em] transition-transform duration-300 group-hover:-translate-y-0.5 ${
                        chip.urgent
                          ? "bg-brass-400 text-ink-950"
                          : "border border-paper-50/25 text-mist-300"
                      }`}
                    >
                      {chip.urgent && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="pulse-ring absolute h-full w-full bg-ink-950" />
                          <span className="relative h-1.5 w-1.5 bg-ink-950" />
                        </span>
                      )}
                      {chip.text}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl font-mono text-[10.5px] leading-relaxed tracking-[0.08em] text-mist-500">
            * Fechas referenciales según calendario oficial del SII y Previred. Los vencimientos
            pueden variar según normativas vigentes.
          </p>
          <a
            href={waLink(
              "Hola Audicontab, se me acerca un vencimiento tributario y me gustaría cotizar sus servicios."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-3 border border-brass-400/70 px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-300 transition-all duration-300 hover:bg-brass-400 hover:text-ink-950"
          >
            <WhatsAppIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
            ¿Se acerca un vencimiento? Escríbenos
          </a>
        </div>
      </div>
    </section>
  );
}
