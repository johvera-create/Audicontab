import { useMemo, useState } from "react";
import {
  formatCLP,
  formatDay,
  formatMonthShort,
  getUpcomingDeadlines,
  daysUntil,
  waLink,
  RENTA_MILESTONES,
} from "../data/site";
import {
  ArrowIcon,
  CalendarCheckIcon,
  CalendarIcon,
  CheckIcon,
  InvoiceIcon,
  PercentIcon,
  WhatsAppIcon,
} from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

type MainTab = "calculadora" | "calendario" | "renta";
type CalcSubTab = "honorarios" | "f29" | "iva";

const RETENCION_TASAS = [
  { anio: "2024", tasa: 0.1375, label: "13.75% (2024)" },
  { anio: "2025", tasa: 0.145, label: "14.50% (2025)" },
  { anio: "2026", tasa: 0.1525, label: "15.25% (2026)" },
  { anio: "2027", tasa: 0.16, label: "16.00% (2027)" },
  { anio: "2028+", tasa: 0.17, label: "17.00% (Final)" },
];

function dueChip(days: number) {
  if (days <= 0) return { text: "HOY", urgent: true };
  if (days === 1) return { text: "MAÑANA", urgent: true };
  return { text: `EN ${days} DÍAS`, urgent: days <= 7 };
}

export default function TaxHub() {
  const [mainTab, setMainTab] = useState<MainTab>("calculadora");
  const [calcSubTab, setCalcSubTab] = useState<CalcSubTab>("honorarios");

  // 1. Estados Boletas de Honorarios
  const [hMode, setHMode] = useState<"liquido_a_bruto" | "bruto_a_liquido">("liquido_a_bruto");
  const [hAmount, setHAmount] = useState<number>(500000);
  const [hTasa, setHTasa] = useState<number>(0.145);

  // 2. Estados Simulador F29
  const [ventasNetas, setVentasNetas] = useState<number>(3500000);
  const [comprasNetas, setComprasNetas] = useState<number>(1800000);
  const [tasaPPM, setTasaPPM] = useState<number>(0.2);

  // 3. Estados Calculadora IVA Simple
  const [ivaMode, setIvaMode] = useState<"neto_a_total" | "total_a_neto">("neto_a_total");
  const [ivaAmount, setIvaAmount] = useState<number>(1000000);

  // Calendario
  const [deadlines] = useState(() => getUpcomingDeadlines());

  // Cálculos Honorarios
  const honorariosResult = useMemo(() => {
    const amount = Math.max(0, hAmount || 0);
    if (hMode === "liquido_a_bruto") {
      const bruto = Math.round(amount / (1 - hTasa));
      const retencion = bruto - amount;
      return { bruto, retencion, liquido: amount };
    } else {
      const retencion = Math.round(amount * hTasa);
      const liquido = amount - retencion;
      return { bruto: amount, retencion, liquido };
    }
  }, [hAmount, hMode, hTasa]);

  // Cálculos F29
  const f29Result = useMemo(() => {
    const ventas = Math.max(0, ventasNetas || 0);
    const compras = Math.max(0, comprasNetas || 0);
    const ivaDebito = Math.round(ventas * 0.19);
    const ivaCredito = Math.round(compras * 0.19);
    const balanceIva = ivaDebito - ivaCredito;
    const ivaPagar = balanceIva > 0 ? balanceIva : 0;
    const remanenteFavor = balanceIva < 0 ? Math.abs(balanceIva) : 0;
    const ppm = Math.round(ventas * (tasaPPM / 100));
    const totalPagarF29 = ivaPagar + ppm;

    return {
      ventas,
      compras,
      ivaDebito,
      ivaCredito,
      ivaPagar,
      remanenteFavor,
      ppm,
      totalPagarF29,
    };
  }, [ventasNetas, comprasNetas, tasaPPM]);

  // Cálculos IVA Rápido
  const ivaResult = useMemo(() => {
    const amount = Math.max(0, ivaAmount || 0);
    if (ivaMode === "neto_a_total") {
      const iva = Math.round(amount * 0.19);
      const total = amount + iva;
      return { neto: amount, iva, total };
    } else {
      const neto = Math.round(amount / 1.19);
      const iva = amount - neto;
      return { neto, iva, total: amount };
    }
  }, [ivaAmount, ivaMode]);

  return (
    <section
      id="herramientas"
      className="relative overflow-hidden bg-ink-950 py-20 text-paper-100 md:py-28"
    >
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(720px_420px_at_15%_15%,rgba(37,99,235,0.15),transparent_65%),radial-gradient(650px_400px_at_85%_85%,rgba(30,58,138,0.2),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Cabecera limpia */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="brass">Zona Tributaria & Herramientas</Eyebrow>
            <MaskLines
              as="h2"
              className="mt-4 font-display text-3xl font-extrabold leading-[1.05] tracking-tight text-paper-50 sm:text-5xl"
              lines={["Todo lo que necesitas", "en un solo lugar."]}
            />
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-mist-400 lg:col-span-4">
            Consulta plazos del SII, calcula tus impuestos o simula tus boletas de honorarios en
            segundos con nuestras herramientas interactivas.
          </p>
        </div>

        {/* 3 Pestañas Principales Grandes */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <button
            type="button"
            onClick={() => setMainTab("calculadora")}
            className={`flex items-center gap-3.5 border p-4 text-left transition-all duration-300 ${
              mainTab === "calculadora"
                ? "border-brass-400 bg-brass-400/15 text-paper-50 shadow-lg"
                : "border-paper-50/15 bg-ink-900/60 text-mist-400 hover:border-paper-50/30 hover:text-paper-100"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${
                mainTab === "calculadora" ? "bg-brass-500 text-paper-50" : "bg-ink-800 text-mist-400"
              }`}
            >
              <PercentIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold">1. Calculadora SII</p>
              <p className="font-mono text-[11px] text-mist-400">Honorarios, F29 e IVA</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMainTab("calendario")}
            className={`flex items-center gap-3.5 border p-4 text-left transition-all duration-300 ${
              mainTab === "calendario"
                ? "border-brass-400 bg-brass-400/15 text-paper-50 shadow-lg"
                : "border-paper-50/15 bg-ink-900/60 text-mist-400 hover:border-paper-50/30 hover:text-paper-100"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${
                mainTab === "calendario" ? "bg-brass-500 text-paper-50" : "bg-ink-800 text-mist-400"
              }`}
            >
              <CalendarCheckIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold">2. Plazos & Vencimientos</p>
              <p className="font-mono text-[11px] text-mist-400">Agenda tributaria al día</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setMainTab("renta")}
            className={`flex items-center gap-3.5 border p-4 text-left transition-all duration-300 ${
              mainTab === "renta"
                ? "border-brass-400 bg-brass-400/15 text-paper-50 shadow-lg"
                : "border-paper-50/15 bg-ink-900/60 text-mist-400 hover:border-paper-50/30 hover:text-paper-100"
            }`}
          >
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-sm ${
                mainTab === "renta" ? "bg-brass-500 text-paper-50" : "bg-ink-800 text-mist-400"
              }`}
            >
              <CalendarIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-bold">3. Operación Renta</p>
              <p className="font-mono text-[11px] text-mist-400">Hitos y declaración F22</p>
            </div>
          </button>
        </div>

        {/* CONTENIDO 1: CALCULADORA SII */}
        {mainTab === "calculadora" && (
          <div className="mt-8 border border-paper-50/15 bg-ink-900/90 p-6 sm:p-8">
            {/* Sub-pestañas */}
            <div className="flex flex-wrap gap-2 border-b border-paper-50/15 pb-4">
              <button
                type="button"
                onClick={() => setCalcSubTab("honorarios")}
                className={`px-4 py-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  calcSubTab === "honorarios"
                    ? "bg-brass-500 text-paper-50"
                    : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
                }`}
              >
                Boletas de Honorarios
              </button>
              <button
                type="button"
                onClick={() => setCalcSubTab("f29")}
                className={`px-4 py-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  calcSubTab === "f29"
                    ? "bg-brass-500 text-paper-50"
                    : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
                }`}
              >
                Simulador IVA F29
              </button>
              <button
                type="button"
                onClick={() => setCalcSubTab("iva")}
                className={`px-4 py-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                  calcSubTab === "iva"
                    ? "bg-brass-500 text-paper-50"
                    : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
                }`}
              >
                Desglose IVA (19%)
              </button>
            </div>

            {/* Sub-tab Honorarios */}
            {calcSubTab === "honorarios" && (
              <div className="mt-6 grid gap-8 lg:grid-cols-12">
                <div className="space-y-5 lg:col-span-6">
                  <div>
                    <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Tipo de cálculo
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setHMode("liquido_a_bruto")}
                        className={`border px-3 py-2 text-center font-mono text-[11px] font-semibold transition-all ${
                          hMode === "liquido_a_bruto"
                            ? "border-brass-400 bg-brass-400/20 text-paper-50"
                            : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                        }`}
                      >
                        Líquido ➔ Bruto
                      </button>
                      <button
                        type="button"
                        onClick={() => setHMode("bruto_a_liquido")}
                        className={`border px-3 py-2 text-center font-mono text-[11px] font-semibold transition-all ${
                          hMode === "bruto_a_liquido"
                            ? "border-brass-400 bg-brass-400/20 text-paper-50"
                            : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                        }`}
                      >
                        Bruto ➔ Líquido
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      {hMode === "liquido_a_bruto"
                        ? "Monto Líquido al bolsillo ($ CLP)"
                        : "Monto Bruto a emitir ($ CLP)"}
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-brass-400">
                        $
                      </span>
                      <input
                        type="number"
                        step="10000"
                        value={hAmount || ""}
                        onChange={(e) => setHAmount(Number(e.target.value))}
                        className="w-full border border-paper-50/20 bg-ink-950 py-3 pl-8 pr-4 font-mono text-base font-bold text-paper-50 outline-none focus:border-brass-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Tasa de Retención SII
                    </label>
                    <select
                      value={hTasa}
                      onChange={(e) => setHTasa(Number(e.target.value))}
                      className="w-full border border-paper-50/20 bg-ink-950 px-3 py-2.5 font-mono text-[13px] text-paper-50 outline-none focus:border-brass-400"
                    >
                      {RETENCION_TASAS.map((t) => (
                        <option key={t.anio} value={t.tasa} className="bg-ink-950 text-paper-50">
                          {t.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col justify-between border border-brass-400/40 bg-ink-950 p-6 shadow-md lg:col-span-6">
                  <div className="space-y-4">
                    <span className="inline-block border border-brass-400/30 bg-brass-400/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brass-300">
                      Resultado de tu boleta
                    </span>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-sm">
                      <span className="font-mono text-mist-300">Monto Bruto a emitir:</span>
                      <span className="tabular font-mono font-bold text-paper-50">
                        {formatCLP(honorariosResult.bruto)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-sm text-orange-300">
                      <span className="font-mono">Retención SII ({(hTasa * 100).toFixed(2)}%):</span>
                      <span className="tabular font-mono font-bold">
                        - {formatCLP(honorariosResult.retencion)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-display text-base font-bold text-brass-300">
                        Monto Líquido a recibir:
                      </span>
                      <span className="tabular font-display text-2xl font-extrabold text-paper-50">
                        {formatCLP(honorariosResult.liquido)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={waLink(
                      `Hola Audicontab, calculé una boleta de honorarios de Líquido ${formatCLP(
                        honorariosResult.liquido
                      )} (Bruto ${formatCLP(honorariosResult.bruto)}) y me gustaría consultar.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass-500 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 transition-colors hover:bg-brass-400"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Consultar por WhatsApp con este monto
                  </a>
                </div>
              </div>
            )}

            {/* Sub-tab F29 */}
            {calcSubTab === "f29" && (
              <div className="mt-6 grid gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-6">
                  <div>
                    <label className="mb-1 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Ventas Netas del Mes ($ CLP)
                    </label>
                    <input
                      type="number"
                      step="50000"
                      value={ventasNetas || ""}
                      onChange={(e) => setVentasNetas(Number(e.target.value))}
                      className="w-full border border-paper-50/20 bg-ink-950 py-2.5 px-3 font-mono text-base font-bold text-paper-50 outline-none focus:border-brass-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Compras Netas con Factura ($ CLP)
                    </label>
                    <input
                      type="number"
                      step="50000"
                      value={comprasNetas || ""}
                      onChange={(e) => setComprasNetas(Number(e.target.value))}
                      className="w-full border border-paper-50/20 bg-ink-950 py-2.5 px-3 font-mono text-base font-bold text-paper-50 outline-none focus:border-brass-400"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Tasa PPM estimada (%):
                    </label>
                    <div className="flex gap-2">
                      {[0.2, 0.5, 1.0, 1.5].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTasaPPM(t)}
                          className={`flex-1 border py-1.5 font-mono text-[11px] font-semibold ${
                            tasaPPM === t
                              ? "border-brass-400 bg-brass-400/20 text-paper-50"
                              : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                          }`}
                        >
                          {t}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between border border-brass-400/40 bg-ink-950 p-6 shadow-md lg:col-span-6">
                  <div className="space-y-3">
                    <span className="inline-block border border-brass-400/30 bg-brass-400/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brass-300">
                      Resultado Estimado F29
                    </span>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-xs">
                      <span className="font-mono text-mist-300">IVA Débito (19% Ventas):</span>
                      <span className="tabular font-mono font-bold text-paper-50">
                        {formatCLP(f29Result.ivaDebito)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-xs">
                      <span className="font-mono text-mist-300">IVA Crédito (19% Compras):</span>
                      <span className="tabular font-mono font-bold text-paper-50">
                        - {formatCLP(f29Result.ivaCredito)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-xs">
                      <span className="font-mono text-mist-300">PPM ({tasaPPM}%):</span>
                      <span className="tabular font-mono font-bold text-paper-50">
                        {formatCLP(f29Result.ppm)}
                      </span>
                    </div>

                    {f29Result.remanenteFavor > 0 ? (
                      <div className="border border-[#4ade80]/40 bg-[#4ade80]/10 p-3 text-xs">
                        <p className="font-mono font-bold uppercase text-[#86efac]">
                          ✓ Remanente a favor: {formatCLP(f29Result.remanenteFavor)}
                        </p>
                        <p className="mt-0.5 text-mist-300">
                          Solo pagas PPM: {formatCLP(f29Result.ppm)}
                        </p>
                      </div>
                    ) : (
                      <div className="flex justify-between pt-1">
                        <span className="font-display text-base font-bold text-brass-300">
                          Total Estimado F29:
                        </span>
                        <span className="tabular font-display text-2xl font-extrabold text-paper-50">
                          {formatCLP(f29Result.totalPagarF29)}
                        </span>
                      </div>
                    )}
                  </div>

                  <a
                    href={waLink(
                      `Hola Audicontab, estimé mi F29 con Ventas de ${formatCLP(
                        f29Result.ventas
                      )} y Compras de ${formatCLP(
                        f29Result.compras
                      )}. Me gustaría cotizar su gestión mensual.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass-500 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 transition-colors hover:bg-brass-400"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Cotizar declaración mensual F29
                  </a>
                </div>
              </div>
            )}

            {/* Sub-tab IVA Simple */}
            {calcSubTab === "iva" && (
              <div className="mt-6 grid gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-6">
                  <div>
                    <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      Tipo de conversión
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setIvaMode("neto_a_total")}
                        className={`border px-3 py-2 text-center font-mono text-[11px] font-semibold transition-all ${
                          ivaMode === "neto_a_total"
                            ? "border-brass-400 bg-brass-400/20 text-paper-50"
                            : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                        }`}
                      >
                        Neto ➔ Total (+19%)
                      </button>
                      <button
                        type="button"
                        onClick={() => setIvaMode("total_a_neto")}
                        className={`border px-3 py-2 text-center font-mono text-[11px] font-semibold transition-all ${
                          ivaMode === "total_a_neto"
                            ? "border-brass-400 bg-brass-400/20 text-paper-50"
                            : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                        }`}
                      >
                        Total ➔ Neto (Desglosar)
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist-400">
                      {ivaMode === "neto_a_total"
                        ? "Monto Neto ($ CLP)"
                        : "Monto Total con IVA ($ CLP)"}
                    </label>
                    <input
                      type="number"
                      step="10000"
                      value={ivaAmount || ""}
                      onChange={(e) => setIvaAmount(Number(e.target.value))}
                      className="w-full border border-paper-50/20 bg-ink-950 py-3 px-4 font-mono text-base font-bold text-paper-50 outline-none focus:border-brass-400"
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between border border-brass-400/40 bg-ink-950 p-6 shadow-md lg:col-span-6">
                  <div className="space-y-4">
                    <span className="inline-block border border-brass-400/30 bg-brass-400/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brass-300">
                      Desglose de valores
                    </span>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-sm">
                      <span className="font-mono text-mist-300">Valor Neto:</span>
                      <span className="tabular font-mono font-bold text-paper-50">
                        {formatCLP(ivaResult.neto)}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-paper-50/10 pb-2 text-sm text-brass-300">
                      <span className="font-mono">IVA (19%):</span>
                      <span className="tabular font-mono font-bold">
                        + {formatCLP(ivaResult.iva)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-display text-base font-bold text-paper-50">
                        Total Facturado:
                      </span>
                      <span className="tabular font-display text-2xl font-extrabold text-brass-300">
                        {formatCLP(ivaResult.total)}
                      </span>
                    </div>
                  </div>

                  <a
                    href={waLink(
                      `Hola Audicontab, tengo una consulta sobre facturación e IVA por un monto de ${formatCLP(
                        ivaResult.total
                      )}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass-500 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 transition-colors hover:bg-brass-400"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTENIDO 2: CALENDARIO DE VENCIMIENTOS */}
        {mainTab === "calendario" && (
          <div className="mt-8 border border-paper-50/15 bg-ink-900/90 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 border-b border-paper-50/15 pb-5 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-bold text-paper-50">
                  Próximos Vencimientos SII & Previred
                </h3>
                <p className="mt-0.5 text-[13px] text-mist-400">
                  Calculados al día de hoy para que ningún plazo te tome por sorpresa.
                </p>
              </div>
              <a
                href={waLink(
                  "Hola Audicontab, se me acerca un vencimiento tributario y me gustaría cotizar sus servicios."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brass-400/70 px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brass-300 hover:bg-brass-400 hover:text-ink-950"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 text-[#4ade80]" />
                ¿Se acerca tu vencimiento? Escríbenos
              </a>
            </div>

            <div className="mt-4 divide-y divide-paper-50/10">
              {deadlines.map((d) => {
                const days = daysUntil(d.date);
                const chip = dueChip(days);
                return (
                  <div
                    key={d.id ?? `${d.code}-${d.freq}`}
                    className="grid grid-cols-[60px_1fr] items-center gap-4 py-4 sm:grid-cols-[70px_60px_1fr_auto] sm:gap-6"
                  >
                    <div>
                      <p className="tabular font-display text-3xl font-extrabold leading-none text-paper-50">
                        {formatDay(d.date)}
                      </p>
                      <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brass-400">
                        {formatMonthShort(d.date)}
                      </p>
                    </div>

                    <div className="hidden sm:block">
                      <span className="border border-paper-50/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-mist-300">
                        {d.code}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <p className="text-[14.5px] font-semibold text-paper-50">{d.label}</p>
                        {d.badge && (
                          <span className="border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 font-mono text-[8.5px] font-bold uppercase tracking-[0.12em] text-amber-300">
                            {d.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">
                        {d.freq} ·{" "}
                        {days <= 0 ? "vence hoy" : `vence en ${days} día${days === 1 ? "" : "s"}`}
                      </p>
                    </div>

                    <div className="justify-self-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] ${
                          chip.urgent
                            ? "bg-brass-500 text-paper-50"
                            : "border border-paper-50/20 text-mist-300"
                        }`}
                      >
                        {chip.text}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTENIDO 3: OPERACIÓN RENTA */}
        {mainTab === "renta" && (
          <div className="mt-8 border border-brass-400/40 bg-gradient-to-br from-ink-900 to-ink-950 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6">
                <span className="inline-block border border-brass-400/40 bg-brass-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brass-300">
                  Temporada Contable
                </span>
                <h3 className="mt-4 font-display text-3xl font-extrabold text-paper-50 sm:text-4xl">
                  Operación Renta 2027
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-mist-300">
                  Revisamos tus antecedentes tributarios, presentamos tu F22 dentro de plazo y
                  hacemos el seguimiento continuo de tu devolución ante el SII.
                </p>

                <a
                  href="#contacto"
                  className="group mt-6 inline-flex items-center gap-3 bg-brass-500 px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-50 transition-all hover:bg-brass-400"
                >
                  Reserva tu hora para la Renta
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="space-y-4 border-t border-paper-50/15 pt-6 lg:col-span-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-brass-300">
                  Hitos clave del proceso:
                </p>
                {RENTA_MILESTONES.map((m) => (
                  <div key={m.day} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brass-400/50 bg-ink-900 font-display text-sm font-bold text-brass-300">
                      {m.day} {m.month}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-paper-50">{m.title}</p>
                      <p className="text-[12.5px] text-mist-400">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
