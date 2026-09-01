import { useMemo, useState } from "react";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";
import { waLink } from "../data/site";

// Opciones de Configuración Rápida
const CONTRIBUTOR_TYPES = [
  { id: "pyme", label: "Pyme / Empresa", icon: "🏢", desc: "Facturas y ventas mensuales" },
  { id: "honorarios", label: "Profesional a Honorarios", icon: "🧾", desc: "Boletas de honorarios" },
  { id: "nueva", label: "Nueva Empresa / SpA", icon: "🚀", desc: "Quiero crear o formalizar" },
];

const INVOICE_RANGES = [
  { id: "baja", label: "1 a 10 docs/mes", sub: "Movimiento bajo" },
  { id: "media", label: "11 a 50 docs/mes", sub: "Movimiento medio" },
  { id: "alta", label: "Más de 50 docs/mes", sub: "Alto volumen" },
];

const EMPLOYEE_RANGES = [
  { id: "cero", label: "Sin trabajadores", sub: "Solo socios" },
  { id: "pocos", label: "1 a 5 trabajadores", sub: "Nómina pequeña" },
  { id: "varios", label: "Más de 5 trabajadores", sub: "Nómina media/grande" },
];

export default function PlanEstimator() {
  const [type, setType] = useState<"pyme" | "honorarios" | "nueva">("pyme");
  const [invoices, setInvoices] = useState<"baja" | "media" | "alta">("baja");
  const [employees, setEmployees] = useState<"cero" | "pocos" | "varios">("cero");

  // Cálculo del Plan Recomendado
  const plan = useMemo(() => {
    if (type === "nueva") {
      return {
        title: "Plan Constitución & Formalización SpA",
        badge: "Puesta en Marcha",
        highlight: "Tu empresa lista para facturar en pocos días",
        features: [
          "Redacción de estatutos y constitución de SpA / EIRL",
          "Obtención de RUT de empresa e Inicio de Actividades ante el SII",
          "Elección óptima de régimen tributario (14 D3 o 14 D8)",
          "Habilitación de facturación electrónica y guía para patente municipal",
        ],
        whatsappText:
          "Hola Audicontab, coticé en su web: Quiero crear mi empresa SpA/EIRL y formalizar mi negocio. ¿Me podrían asesorar?",
      };
    }

    if (type === "honorarios") {
      return {
        title: "Plan Emprendedor & Honorarios",
        badge: "Control Personal",
        highlight: "Cumplimiento tributario sin complicaciones",
        features: [
          "Cálculo y revisión mensual de retenciones de boletas",
          "Declaración y seguimiento oportuno de F29",
          "Preparación y optimización de Operación Renta F22",
          "Asesoría para evaluar conveniencia de formalizar empresa",
        ],
        whatsappText:
          "Hola Audicontab, coticé en su web: Soy profesional a honorarios y me interesa el Plan Emprendedor & Renta. ¿Podemos coordinar?",
      };
    }

    // Caso Pyme
    const hasEmployees = employees !== "cero";
    const isHighVolume = invoices === "alta";

    if (isHighVolume || employees === "varios") {
      return {
        title: "Plan Empresa Integral & Nóminas",
        badge: "Gestión Completa",
        highlight: "Auditoría, impuestos y remuneraciones bajo control",
        features: [
          "Declaración mensual de IVA F29 con conciliación bancaria",
          "Liquidaciones de sueldo, contratos y pago en Previred",
          "Balance anual, declaraciones juradas (DDJJ) y Operación Renta F22",
          "Atención directa y asesoría tributaria continua en oficina o remota",
        ],
        whatsappText: `Hola Audicontab, coticé en su web: Soy Pyme con volumen ${
          invoices === "alta" ? "alto de facturación" : "medio"
        } y ${
          employees === "varios" ? "más de 5 trabajadores" : "1 a 5 trabajadores"
        }. Me gustaría cotizar el Plan Empresa Integral.`,
      };
    }

    return {
      title: hasEmployees ? "Plan Pyme F29 & Remuneraciones" : "Plan Pyme F29 Esencial",
      badge: "Más Solicitado",
      highlight: "Tus impuestos y plazos del SII siempre al día",
      features: [
        "Declaración mensual de Formulario 29 (IVA, PPM y retenciones)",
        hasEmployees
          ? "Gestión de contratos, liquidaciones y pago Previred"
          : "Control contable de compras y ventas sin multas",
        "Preparación de Declaraciones Juradas y Renta Anual F22",
        "Respaldo profesional presencial en O'Higgins 480, Quillota",
      ],
      whatsappText: `Hola Audicontab, coticé en su web: Soy Pyme con ${
        invoices === "baja" ? "1-10 facturas/mes" : "11-50 facturas/mes"
      } y ${hasEmployees ? "trabajadores contratados" : "sin trabajadores"}. Me interesa el ${
        hasEmployees ? "Plan Pyme F29 & Remuneraciones" : "Plan Pyme F29 Esencial"
      }.`,
    };
  }, [type, invoices, employees]);

  return (
    <section id="cotizador" className="relative bg-ink-950 py-16 md:py-24 text-paper-50 overflow-hidden">
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0 opacity-40" />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-96 w-96 rounded-full bg-brass-400/10 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Cabecera Liviana */}
        <div className="text-center max-w-2xl mx-auto">
          <Eyebrow tone="light">Cotizador Rápido</Eyebrow>
          <MaskLines
            as="h2"
            className="mt-3 font-display text-3xl font-extrabold tracking-tight text-paper-50 sm:text-4xl"
            lines={["Descubre el plan ideal", "para tu negocio."]}
          />
          <p className="mt-3 text-sm text-mist-400">
            Responde 3 preguntas en 10 segundos y obtén una recomendación clara sin compromiso.
          </p>
        </div>

        {/* Contenedor Interactivo: Preguntas a la izquierda, Resultado a la derecha */}
        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Columna de Selección (Preguntas Ágiles) */}
          <div className="space-y-6 lg:col-span-7">
            {/* Paso 1: Tipo de Contribuyente */}
            <div className="rounded-xl border border-paper-50/10 bg-ink-900/70 p-5 backdrop-blur-md">
              <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brass-300">
                1. ¿Qué tipo de contribuyente eres?
              </label>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
                {CONTRIBUTOR_TYPES.map((t) => {
                  const selected = type === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setType(t.id as any)}
                      className={`flex flex-col items-start p-3 text-left transition-all duration-200 border rounded-lg active:scale-[0.98] ${
                        selected
                          ? "border-brass-400 bg-brass-400/15 text-paper-50 shadow-[0_0_15px_rgba(217,119,6,0.2)]"
                          : "border-paper-50/10 bg-ink-950/60 text-mist-300 hover:border-paper-50/30"
                      }`}
                    >
                      <span className="text-xl mb-1">{t.icon}</span>
                      <span className="font-display text-xs font-bold text-paper-50">{t.label}</span>
                      <span className="text-[10.5px] text-mist-400 mt-0.5">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Paso 2: Volumen de Documentos (Solo si es Pyme) */}
            {type === "pyme" && (
              <div className="rounded-xl border border-paper-50/10 bg-ink-900/70 p-5 backdrop-blur-md animate-fade-in">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brass-300">
                  2. ¿Cuántas facturas emites al mes aprox.?
                </label>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {INVOICE_RANGES.map((r) => {
                    const selected = invoices === r.id;
                    return (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setInvoices(r.id as any)}
                        className={`p-2.5 text-center transition-all duration-200 border rounded-lg active:scale-[0.98] ${
                          selected
                            ? "border-brass-400 bg-brass-400/15 text-paper-50"
                            : "border-paper-50/10 bg-ink-950/60 text-mist-300 hover:border-paper-50/30"
                        }`}
                      >
                        <p className="font-mono text-xs font-bold text-paper-50">{r.label}</p>
                        <p className="text-[10px] text-mist-400 mt-0.5">{r.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Paso 3: Trabajadores (Solo si es Pyme) */}
            {type === "pyme" && (
              <div className="rounded-xl border border-paper-50/10 bg-ink-900/70 p-5 backdrop-blur-md animate-fade-in">
                <label className="block font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-brass-300">
                  3. ¿Tienes trabajadores contratados?
                </label>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {EMPLOYEE_RANGES.map((e) => {
                    const selected = employees === e.id;
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setEmployees(e.id as any)}
                        className={`p-2.5 text-center transition-all duration-200 border rounded-lg active:scale-[0.98] ${
                          selected
                            ? "border-brass-400 bg-brass-400/15 text-paper-50"
                            : "border-paper-50/10 bg-ink-950/60 text-mist-300 hover:border-paper-50/30"
                        }`}
                      >
                        <p className="font-mono text-xs font-bold text-paper-50">{e.label}</p>
                        <p className="text-[10px] text-mist-400 mt-0.5">{e.sub}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Columna de Resultado (Tarjeta de Plan Recomendado) */}
          <div className="lg:col-span-5">
            <Reveal delay={100} y={15}>
              <div className="relative rounded-2xl border-2 border-brass-400 bg-paper-50 p-6 sm:p-8 text-ink-900 shadow-[0_20px_50px_-15px_rgba(217,119,6,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="inline-block border border-brass-500/60 bg-brass-400/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-brass-700">
                    {plan.badge}
                  </span>
                  <span className="font-mono text-[11px] font-bold text-ink-500">Plan Sugerido</span>
                </div>

                <h3 className="mt-3 font-display text-2xl font-extrabold text-ink-900 leading-snug">
                  {plan.title}
                </h3>
                <p className="mt-1 text-xs font-medium text-ink-600">{plan.highlight}</p>

                <div className="mt-6 space-y-2.5 border-t border-ink-900/10 pt-5">
                  {plan.features.map((f, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-ink-700">
                      <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-brass-600 font-bold" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                {/* Botón con WhatsApp Pre-llenado Automático */}
                <div className="mt-7">
                  <a
                    href={waLink(plan.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex w-full items-center justify-center gap-2.5 bg-[#25d366] px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.14em] text-white shadow-lg transition-all duration-300 hover:bg-[#20bd5a] hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] active:scale-[0.99]"
                  >
                    <WhatsAppIcon className="h-4 w-4 text-white fill-white transition-transform group-hover:scale-110" />
                    Solicitar este Plan por WhatsApp
                  </a>
                  <p className="mt-2 text-center text-[10.5px] text-ink-500 font-mono">
                    ⚡ Respuesta directa con un contador auditor
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
