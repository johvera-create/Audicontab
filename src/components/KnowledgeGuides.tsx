import { useState } from "react";
import { ArrowIcon, CheckIcon, WhatsAppIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";
import { waLink } from "../data/site";

type Guide = {
  id: string;
  tag: string;
  readTime: string;
  title: string;
  summary: string;
  keywords: string;
  content: {
    intro: string;
    points: { h: string; p: string }[];
    tip: string;
    ctaWhatsApp: string;
  };
};

const GUIDES: Guide[] = [
  {
    id: "f29-sin-movimiento",
    tag: "IVA & F29 Mensual",
    readTime: "2 min lectura",
    title: "¿Cómo declarar el F29 sin movimiento y evitar multas del SII?",
    summary:
      "Aprende paso a paso cómo presentar tu Formulario 29 en meses sin compras ni ventas para mantener tu RUT intachable ante el SII.",
    keywords: "declarar f29 sin movimiento, formulario 29 sii quillota, multas f29 chile",
    content: {
      intro:
        "Tener un mes sin ventas o compras no te exime de declarar. Si tu empresa o actividad comercial está activa en el Servicio de Impuestos Internos (SII), estás obligado a presentar el Formulario 29 dentro de los primeros 12 días de cada mes.",
      points: [
        {
          h: "1. ¿Qué pasa si no declaro un mes sin movimiento?",
          p: "El SII genera una infracción automática por omisión. Aunque no tengas que pagar impuestos de IVA, la multa por no presentar dentro de plazo va desde 1 UTM más intereses y bloqueos de timbraje electrónico.",
        },
        {
          h: "2. Procedimiento en el portal del SII",
          p: "Ingresas con tu Clave Tributaria o Certificado Digital, seleccionas F29, el período correspondiente y eliges la opción 'Declarar Sin Movimiento' confirmando el envío.",
        },
        {
          h: "3. ¿Cuántos meses seguidos puedo estar sin movimiento?",
          p: "Puedes declarar sin movimiento los meses necesarios, pero si tu empresa no tiene actividad por más de 12 o 24 meses continuos, el SII puede solicitar la verificación de domicilio o un término de giro administrativo.",
        },
      ],
      tip: "En Audicontab nos encargamos de automatizar la presentación de tu F29 todos los meses para que nunca acumules multas involuntarias ni bloqueos del SII.",
      ctaWhatsApp: "Hola Audicontab, tengo dudas con mi declaración de IVA F29 y me gustaría asesoría.",
    },
  },
  {
    id: "crear-empresa-spa",
    tag: "Constitución de Empresas",
    readTime: "3 min lectura",
    title: "Crear una Sociedad por Acciones (SpA) en 2026: Costos y Pasos",
    summary:
      "La guía definitiva para formalizar tu negocio en Quillota y la V Región: estatutos, RUT empresarial, inicio de actividades y patente municipal.",
    keywords: "crear empresa spa quillota, tu empresa en un dia, inicio de actividades sii",
    content: {
      intro:
        "La Sociedad por Acciones (SpA) es la estructura jurídica más flexible y utilizada en Chile. Permite operar con 1 o más socios, proteger tu patrimonio personal y postular a fondos como Corfo, Sercotec y créditos bancarios.",
      points: [
        {
          h: "1. Redacción de Estatutos y Firma Electrónica",
          p: "Se redacta el objeto social adecuado a tu rubro en Tu Empresa en un Día y se firma con Firma Electrónica Avanzada (FEA) o mediante firma notarial presencial.",
        },
        {
          h: "2. Obtención de RUT e Inicio de Actividades ante el SII",
          p: "Una vez constituida, se solicita el RUT de la empresa y se tramita el Inicio de Actividades en Primera Categoría, acreditando el domicilio tributario y la actividad económica.",
        },
        {
          h: "3. Elección de Régimen Tributario (14 D3 vs 14 D8)",
          p: "Elegir el régimen tributario correcto desde el día uno define cuánto impuesto pagarás al final del año y te permite optimizar gastos legalmente.",
        },
        {
          h: "4. Habilitación de Facturación y Patente Municipal",
          p: "Se habilita el set de facturación electrónica y se tramita la patente comercial en la municipalidad respectiva (Quillota, La Calera, Viña del Mar, etc.).",
        },
      ],
      tip: "En Audicontab gestionamos todo el proceso de constitución de tu SpA en tiempo récord, entregándote tu empresa 100% lista para facturar.",
      ctaWhatsApp: "Hola Audicontab, quiero crear mi empresa SpA y formalizar mi negocio.",
    },
  },
  {
    id: "pro-pyme-general-transparente",
    tag: "Régimen Tributario",
    readTime: "2 min lectura",
    title: "¿Régimen Pro Pyme General (14 D3) o Transparente (14 D8)?",
    summary:
      "Descubre cuál es el régimen tributario que le permite a tu empresa pagar menos impuestos de forma 100% legal ante el SII.",
    keywords: "regimen pro pyme 14 d3, pro pyme transparente 14 d8, planificacion tributaria chile",
    content: {
      intro:
        "La Ley de Modernización Tributaria creó dos regímenes especiales diseñados para micro, pequeñas y medianas empresas. Conocer sus diferencias es la clave del ahorro tributario.",
      points: [
        {
          h: "1. Régimen Pro Pyme General (Artículo 14 D N°3)",
          p: "Aplica una tasa corporativa de Impuesto de Primera Categoría (25%) sobre la base imponible y otorga a los socios el 100% de crédito tributario en su Global Complementario. Es ideal para empresas comerciales que reinvierten utilidades para crecer.",
        },
        {
          h: "2. Régimen Pro Pyme Transparente (Artículo 14 D N°8)",
          p: "La empresa está 100% liberada del Impuesto de Primera Categoría. La utilidad tributaria pasa directo a los socios tributando en su IGC personal. Es ideal para empresas de servicios, consultorías y profesionales.",
        },
      ],
      tip: "Analizamos tu proyección de ventas y gastos para recomendarte el régimen más beneficioso antes de los plazos límites de cambio de régimen.",
      ctaWhatsApp: "Hola Audicontab, quiero evaluar qué régimen tributario le conviene a mi empresa.",
    },
  },
];

export default function KnowledgeGuides() {
  const [activeGuide, setActiveGuide] = useState<Guide | null>(null);

  return (
    <section id="guias" className="relative bg-paper-50 py-16 md:py-24 border-t border-ink-900/10">
      <div className="relative mx-auto max-w-7xl px-6">
        {/* Cabecera compacta */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow>Biblioteca Tributaria</Eyebrow>
            <MaskLines
              className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl"
              lines={["Guías prácticas para", "tu negocio y el SII."]}
            />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-600">
            Respuestas directas a las dudas tributarias y contables más consultadas por dueños de Pymes en Chile.
          </p>
        </div>

        {/* Cuadrícula de 3 Tarjetas Limpias */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {GUIDES.map((g, idx) => (
            <Reveal key={g.id} delay={idx * 120} y={20}>
              <div className="group relative flex h-full flex-col justify-between border border-ink-900/15 bg-paper-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/80 hover:shadow-[0_16px_36px_-16px_rgba(27,58,92,0.3)]">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="border border-brass-500/40 bg-brass-400/15 px-2.5 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.16em] text-brass-600">
                      {g.tag}
                    </span>
                    <span className="font-mono text-[10px] text-ink-500">{g.readTime}</span>
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-brass-600">
                    {g.title}
                  </h3>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-600 line-clamp-3">
                    {g.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-ink-900/10">
                  <button
                    type="button"
                    onClick={() => setActiveGuide(g)}
                    className="inline-flex items-center gap-2 font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-900 transition-colors hover:text-brass-600"
                  >
                    Leer guía completa
                    <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Modal Emergente Limpio (Pop-up) para leer la guía sin ensuciar la portada */}
      {activeGuide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/80 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveGuide(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto border-2 border-brass-400 bg-paper-50 p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-start justify-between gap-4 border-b border-ink-900/15 pb-4">
              <div>
                <span className="inline-block border border-brass-500/40 bg-brass-400/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-brass-600">
                  {activeGuide.tag} · {activeGuide.readTime}
                </span>
                <h2 className="mt-2 font-display text-2xl font-extrabold leading-tight text-ink-900 sm:text-3xl">
                  {activeGuide.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveGuide(null)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-900/20 text-ink-700 transition-colors hover:bg-ink-900 hover:text-paper-50"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            {/* Cuerpo del Artículo */}
            <div className="mt-6 space-y-5 text-[14.5px] leading-relaxed text-ink-700">
              <p className="font-medium text-ink-900">{activeGuide.content.intro}</p>

              <div className="space-y-4">
                {activeGuide.content.points.map((pt, pIdx) => (
                  <div key={pIdx} className="border-l-2 border-brass-500 pl-4 py-0.5">
                    <h4 className="font-display text-[15px] font-bold text-ink-900">{pt.h}</h4>
                    <p className="mt-1 text-sm text-ink-600">{pt.p}</p>
                  </div>
                ))}
              </div>

              {/* Caja de Consejo Audicontab */}
              <div className="flex items-start gap-3 border border-brass-500/30 bg-brass-400/10 p-4 text-[13.5px]">
                <CheckIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass-600" />
                <p className="text-ink-900">
                  <strong>Recomendación de Audicontab:</strong> {activeGuide.content.tip}
                </p>
              </div>
            </div>

            {/* Footer con CTA a WhatsApp */}
            <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-ink-900/15 pt-5 sm:flex-row">
              <span className="font-mono text-xs text-ink-500">
                ¿Necesitas aplicar esto en tu empresa?
              </span>
              <a
                href={waLink(activeGuide.content.ctaWhatsApp)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25d366] px-5 py-2.5 font-mono text-[11.5px] font-bold uppercase tracking-[0.14em] text-white shadow transition-all hover:bg-[#20bd5a]"
              >
                <WhatsAppIcon className="h-4 w-4 text-white fill-white" />
                Consultar con un Contador
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
