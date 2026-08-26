import { useMemo, useState } from "react";
import { formatCLP, waLink } from "../data/site";
import {
  ArrowIcon,
  CalculatorIcon,
  CheckIcon,
  InvoiceIcon,
  PercentIcon,
  WhatsAppIcon,
} from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

type CalcTab = "honorarios" | "f29" | "iva";

// Tasa oficial de retención en boletas de honorarios en Chile
const RETENCION_TASAS = [
  { anio: "2024", tasa: 0.1375, label: "13.75% (2024)" },
  { anio: "2025", tasa: 0.145, label: "14.50% (2025)" },
  { anio: "2026", tasa: 0.1525, label: "15.25% (2026)" },
  { anio: "2027", tasa: 0.16, label: "16.00% (2027)" },
  { anio: "2028+", tasa: 0.17, label: "17.00% (Final)" },
];

export default function TaxCalculator() {
  const [activeTab, setActiveTab] = useState<CalcTab>("honorarios");

  // 1. Estados Boletas de Honorarios
  const [hMode, setHMode] = useState<"liquido_a_bruto" | "bruto_a_liquido">("liquido_a_bruto");
  const [hAmount, setHAmount] = useState<number>(500000);
  const [hTasa, setHTasa] = useState<number>(0.145);

  // 2. Estados Simulador F29
  const [ventasNetas, setVentasNetas] = useState<number>(3500000);
  const [comprasNetas, setComprasNetas] = useState<number>(1800000);
  const [tasaPPM, setTasaPPM] = useState<number>(0.2); // 0.2% por defecto

  // 3. Estados Calculadora IVA Simple
  const [ivaMode, setIvaMode] = useState<"neto_a_total" | "total_a_neto">("neto_a_total");
  const [ivaAmount, setIvaAmount] = useState<number>(1000000);

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
      id="calculadora"
      className="relative overflow-hidden bg-ink-950 py-20 text-paper-100 md:py-28"
    >
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(720px_420px_at_15%_15%,rgba(37,99,235,0.18),transparent_65%),radial-gradient(650px_400px_at_85%_85%,rgba(30,58,138,0.25),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow tone="brass">Herramientas Tributarias Interactivas</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-paper-50 sm:text-5xl"
              lines={["Simula tus impuestos", "del SII en segundos."]}
            />
          </div>
          <p className="max-w-sm text-[15.5px] leading-relaxed text-mist-400 lg:col-span-4">
            Calcula retenciones de boletas, proyecta tu F29 o desglosa el IVA de tus facturas de
            forma rápida y transparente.
          </p>
        </div>

        {/* Pestañas / Tabs */}
        <div className="mt-12 flex flex-wrap gap-2 border-b border-paper-50/15 pb-4">
          <button
            type="button"
            onClick={() => setActiveTab("honorarios")}
            className={`group inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
              activeTab === "honorarios"
                ? "border-b-2 border-brass-400 bg-paper-50/10 text-paper-50 shadow-sm"
                : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
            }`}
          >
            <InvoiceIcon className="h-4 w-4 text-brass-400" />
            1. Boletas de Honorarios
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("f29")}
            className={`group inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
              activeTab === "f29"
                ? "border-b-2 border-brass-400 bg-paper-50/10 text-paper-50 shadow-sm"
                : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
            }`}
          >
            <CalculatorIcon className="h-4 w-4 text-brass-400" />
            2. Simulador IVA F29
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("iva")}
            className={`group inline-flex items-center gap-2.5 px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] transition-all duration-300 ${
              activeTab === "iva"
                ? "border-b-2 border-brass-400 bg-paper-50/10 text-paper-50 shadow-sm"
                : "text-mist-400 hover:bg-paper-50/5 hover:text-paper-100"
            }`}
          >
            <PercentIcon className="h-4 w-4 text-brass-400" />
            3. Desglose Rápido IVA 19%
          </button>
        </div>

        {/* Contenido de Calculadoras */}
        <div className="mt-8">
          {/* TAB 1: BOLETAS DE HONORARIOS */}
          {activeTab === "honorarios" && (
            <Reveal key="tab-honorarios" y={15}>
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Formulario / Entradas */}
                <div className="border border-paper-50/15 bg-ink-900/90 p-7 sm:p-9 lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold text-paper-50">
                    Calculadora de Honorarios
                  </h3>
                  <p className="mt-1 text-[14px] text-mist-400">
                    Averigua cuánto debes emitir o cuánto te llegará líquido a tu cuenta bancaria.
                  </p>

                  <div className="mt-6 space-y-6">
                    {/* Modo */}
                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        ¿Qué monto tienes?
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setHMode("liquido_a_bruto")}
                          className={`border px-3.5 py-2.5 text-left font-mono text-[11.5px] font-semibold transition-all ${
                            hMode === "liquido_a_bruto"
                              ? "border-brass-400 bg-brass-400/15 text-paper-50"
                              : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                          }`}
                        >
                          Monto Líquido (Bolsillo)
                        </button>
                        <button
                          type="button"
                          onClick={() => setHMode("bruto_a_liquido")}
                          className={`border px-3.5 py-2.5 text-left font-mono text-[11.5px] font-semibold transition-all ${
                            hMode === "bruto_a_liquido"
                              ? "border-brass-400 bg-brass-400/15 text-paper-50"
                              : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                          }`}
                        >
                          Monto Bruto (Total)
                        </button>
                      </div>
                    </div>

                    {/* Input Monto */}
                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        {hMode === "liquido_a_bruto"
                          ? "Monto Líquido deseado ($ CLP)"
                          : "Monto Bruto de la boleta ($ CLP)"}
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
                          placeholder="Ej: 500000"
                          className="w-full border-2 border-paper-50/15 bg-ink-950 py-3.5 pl-9 pr-4 font-mono text-lg font-bold text-paper-50 outline-none transition-colors focus:border-brass-400"
                        />
                      </div>
                    </div>

                    {/* Selector de Tasa */}
                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        Tasa de Retención del SII
                      </label>
                      <select
                        value={hTasa}
                        onChange={(e) => setHTasa(Number(e.target.value))}
                        className="w-full border-2 border-paper-50/15 bg-ink-950 px-4 py-3 font-mono text-[13.5px] font-medium text-paper-50 outline-none transition-colors focus:border-brass-400"
                      >
                        {RETENCION_TASAS.map((t) => (
                          <option key={t.anio} value={t.tasa} className="bg-ink-950 text-paper-50">
                            {t.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tarjeta de Resultados */}
                <div className="flex flex-col justify-between border-2 border-brass-400/40 bg-gradient-to-br from-ink-900 to-ink-950 p-7 sm:p-9 shadow-xl lg:col-span-6">
                  <div>
                    <span className="inline-block border border-brass-400/40 bg-brass-400/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-brass-300">
                      Desglose de tu Boleta
                    </span>

                    <div className="mt-8 space-y-5">
                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-3">
                        <span className="font-mono text-[13px] text-mist-300">
                          Valor Bruto a emitir:
                        </span>
                        <span className="tabular font-mono text-xl font-bold text-paper-50">
                          {formatCLP(honorariosResult.bruto)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-3 text-orange-300">
                        <span className="font-mono text-[13px]">
                          Retención SII ({(hTasa * 100).toFixed(2)}%):
                        </span>
                        <span className="tabular font-mono text-xl font-bold">
                          - {formatCLP(honorariosResult.retencion)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-paper-50/20 pt-3">
                        <span className="font-display text-lg font-bold text-brass-300">
                          Monto Líquido a recibir:
                        </span>
                        <span className="tabular font-display text-2xl font-extrabold text-paper-50 sm:text-3xl">
                          {formatCLP(honorariosResult.liquido)}
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 font-mono text-[11px] leading-relaxed text-mist-400">
                      💡 <strong>Consejo Audicontab:</strong> Si acuerdas un monto líquido de{" "}
                      <strong className="text-paper-50">{formatCLP(honorariosResult.liquido)}</strong>,
                      debes emitir tu boleta por{" "}
                      <strong className="text-brass-300">{formatCLP(honorariosResult.bruto)}</strong>.
                    </p>
                  </div>

                  <a
                    href={waLink(
                      `Hola Audicontab, calculé una boleta de honorarios de Líquido ${formatCLP(
                        honorariosResult.liquido
                      )} (Bruto ${formatCLP(honorariosResult.bruto)}) y me gustaría recibir asesoría.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-brass-500 px-6 py-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 shadow-md transition-all duration-300 hover:bg-brass-400 hover:shadow-lg"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Consultar por WhatsApp con este monto
                  </a>
                </div>
              </div>
            </Reveal>
          )}

          {/* TAB 2: SIMULADOR IVA F29 */}
          {activeTab === "f29" && (
            <Reveal key="tab-f29" y={15}>
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Inputs F29 */}
                <div className="border border-paper-50/15 bg-ink-900/90 p-7 sm:p-9 lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold text-paper-50">
                    Simulador Mensual F29 (IVA)
                  </h3>
                  <p className="mt-1 text-[14px] text-mist-400">
                    Ingresa tus ventas y compras del mes para estimar tu pago del formulario 29.
                  </p>

                  <div className="mt-6 space-y-5">
                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        Ventas Netas del Mes (Facturas/Boletas sin IVA)
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-brass-400">
                          $
                        </span>
                        <input
                          type="number"
                          step="50000"
                          value={ventasNetas || ""}
                          onChange={(e) => setVentasNetas(Number(e.target.value))}
                          placeholder="Ej: 3500000"
                          className="w-full border-2 border-paper-50/15 bg-ink-950 py-3.5 pl-9 pr-4 font-mono text-lg font-bold text-paper-50 outline-none transition-colors focus:border-brass-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        Compras Netas del Mes (Gastos con Factura)
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-brass-400">
                          $
                        </span>
                        <input
                          type="number"
                          step="50000"
                          value={comprasNetas || ""}
                          onChange={(e) => setComprasNetas(Number(e.target.value))}
                          placeholder="Ej: 1800000"
                          className="w-full border-2 border-paper-50/15 bg-ink-950 py-3.5 pl-9 pr-4 font-mono text-lg font-bold text-paper-50 outline-none transition-colors focus:border-brass-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        Tasa de PPM estimada (% sobre ventas netas)
                      </label>
                      <div className="flex gap-2">
                        {[0.2, 0.5, 1.0, 1.5].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTasaPPM(t)}
                            className={`flex-1 border py-2 font-mono text-[12px] font-semibold transition-colors ${
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
                </div>

                {/* Tarjeta Resultados F29 */}
                <div className="flex flex-col justify-between border-2 border-brass-400/40 bg-gradient-to-br from-ink-900 to-ink-950 p-7 sm:p-9 shadow-xl lg:col-span-6">
                  <div>
                    <span className="inline-block border border-brass-400/40 bg-brass-400/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-brass-300">
                      Resultado Estimado F29
                    </span>

                    <div className="mt-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-2.5 text-[13.5px]">
                        <span className="font-mono text-mist-300">IVA Débito (19% Ventas):</span>
                        <span className="tabular font-mono font-bold text-paper-50">
                          {formatCLP(f29Result.ivaDebito)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-2.5 text-[13.5px]">
                        <span className="font-mono text-mist-300">IVA Crédito (19% Compras):</span>
                        <span className="tabular font-mono font-bold text-paper-50">
                          - {formatCLP(f29Result.ivaCredito)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-2.5 text-[13.5px]">
                        <span className="font-mono text-mist-300">PPM ({tasaPPM}%):</span>
                        <span className="tabular font-mono font-bold text-paper-50">
                          {formatCLP(f29Result.ppm)}
                        </span>
                      </div>

                      {f29Result.remanenteFavor > 0 ? (
                        <div className="border border-[#4ade80]/40 bg-[#4ade80]/10 p-3.5">
                          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#86efac]">
                            ✓ Tienes Remanente de Crédito Fiscal
                          </p>
                          <p className="mt-1 font-display text-xl font-bold text-paper-50">
                            {formatCLP(f29Result.remanenteFavor)} a favor para el próximo mes
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-mist-300">
                            Solo pagas PPM: {formatCLP(f29Result.ppm)}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between border-t border-paper-50/20 pt-3">
                          <span className="font-display text-lg font-bold text-brass-300">
                            Total Estimado a Pagar F29:
                          </span>
                          <span className="tabular font-display text-2xl font-extrabold text-paper-50 sm:text-3xl">
                            {formatCLP(f29Result.totalPagarF29)}
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="mt-6 font-mono text-[11px] leading-relaxed text-mist-400">
                      * Cálculo estimativo referencial. En Audicontab conciliamos tus libros contables
                      para asegurar que aproveches todos tus créditos fiscales.
                    </p>
                  </div>

                  <a
                    href={waLink(
                      `Hola Audicontab, estimé mi F29 con Ventas de ${formatCLP(
                        f29Result.ventas
                      )} y Compras de ${formatCLP(
                        f29Result.compras
                      )}. Me gustaría que gestionen mi declaración mensual.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-brass-500 px-6 py-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 shadow-md transition-all duration-300 hover:bg-brass-400 hover:shadow-lg"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Cotizar declaración mensual de IVA F29
                  </a>
                </div>
              </div>
            </Reveal>
          )}

          {/* TAB 3: DESGLOSE RÁPIDO IVA 19% */}
          {activeTab === "iva" && (
            <Reveal key="tab-iva" y={15}>
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Formulario IVA */}
                <div className="border border-paper-50/15 bg-ink-900/90 p-7 sm:p-9 lg:col-span-6">
                  <h3 className="font-display text-2xl font-bold text-paper-50">
                    Desglose Rápido de IVA (19%)
                  </h3>
                  <p className="mt-1 text-[14px] text-mist-400">
                    Calcula el IVA y el Neto o Total de cualquier factura en un instante.
                  </p>

                  <div className="mt-6 space-y-6">
                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        Tipo de cálculo
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setIvaMode("neto_a_total")}
                          className={`border px-3.5 py-2.5 text-left font-mono text-[11.5px] font-semibold transition-all ${
                            ivaMode === "neto_a_total"
                              ? "border-brass-400 bg-brass-400/15 text-paper-50"
                              : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                          }`}
                        >
                          Neto ➔ Total (+19%)
                        </button>
                        <button
                          type="button"
                          onClick={() => setIvaMode("total_a_neto")}
                          className={`border px-3.5 py-2.5 text-left font-mono text-[11.5px] font-semibold transition-all ${
                            ivaMode === "total_a_neto"
                              ? "border-brass-400 bg-brass-400/15 text-paper-50"
                              : "border-paper-50/15 text-mist-400 hover:border-paper-50/30"
                          }`}
                        >
                          Total ➔ Neto (Desglosar)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-mist-400">
                        {ivaMode === "neto_a_total"
                          ? "Monto Neto ($ CLP)"
                          : "Monto Total con IVA ($ CLP)"}
                      </label>
                      <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-base font-bold text-brass-400">
                          $
                        </span>
                        <input
                          type="number"
                          step="10000"
                          value={ivaAmount || ""}
                          onChange={(e) => setIvaAmount(Number(e.target.value))}
                          placeholder="Ej: 1000000"
                          className="w-full border-2 border-paper-50/15 bg-ink-950 py-3.5 pl-9 pr-4 font-mono text-lg font-bold text-paper-50 outline-none transition-colors focus:border-brass-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tarjeta Resultados IVA */}
                <div className="flex flex-col justify-between border-2 border-brass-400/40 bg-gradient-to-br from-ink-900 to-ink-950 p-7 sm:p-9 shadow-xl lg:col-span-6">
                  <div>
                    <span className="inline-block border border-brass-400/40 bg-brass-400/10 px-3 py-1 font-mono text-[10.5px] font-bold uppercase tracking-[0.2em] text-brass-300">
                      Desglose de Valores
                    </span>

                    <div className="mt-8 space-y-5">
                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-3">
                        <span className="font-mono text-[13px] text-mist-300">Valor Neto:</span>
                        <span className="tabular font-mono text-xl font-bold text-paper-50">
                          {formatCLP(ivaResult.neto)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-paper-50/10 pb-3 text-brass-300">
                        <span className="font-mono text-[13px]">IVA (19%):</span>
                        <span className="tabular font-mono text-xl font-bold">
                          + {formatCLP(ivaResult.iva)}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-paper-50/20 pt-3">
                        <span className="font-display text-lg font-bold text-paper-50">
                          Valor Total Facturado:
                        </span>
                        <span className="tabular font-display text-2xl font-extrabold text-brass-300 sm:text-3xl">
                          {formatCLP(ivaResult.total)}
                        </span>
                      </div>
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
                    className="group mt-8 inline-flex w-full items-center justify-center gap-3 bg-brass-500 px-6 py-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] text-paper-50 shadow-md transition-all duration-300 hover:bg-brass-400 hover:shadow-lg"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
                    Consultar por Facturación Electrónica
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
