import { useState } from "react";
import { ArrowIcon, CheckIcon, PlusIcon, WhatsAppIcon } from "./icons";
import { Eyebrow, MaskLines } from "./Reveal";
import { waLink } from "../data/site";

type FaqItem = {
  q: string;
  a: string;
  keywords: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "¿Qué servicios contables y tributarios ofrece Audicontab en Quillota y la Región de Valparaíso?",
    a: "En Audicontab Limitada cubrimos el ciclo contable integral de tu empresa: declaración mensual de IVA (Formulario 29), Operación Renta (Formulario 22), remuneraciones y pago de cotizaciones en Previred, facturación electrónica, balances tributarios e inicio de actividades ante el Servicio de Impuestos Internos (SII).",
    keywords: "servicios contables quillota, contadores viña del mar, declaracion iva f29, renta f22",
  },
  {
    q: "¿Cómo me ayuda Audicontab a crear y formalizar mi empresa (SpA o EIRL)?",
    a: "Te asesoramos en todo el proceso de constitución legal: elección de la estructura societaria adecuada (SpA, EIRL o Ltda.), redacción de estatutos en Tu Empresa en un Día, obtención de RUT empresarial, acreditación de domicilio y verificación de actividades económicas ante el SII, habilitación de facturación electrónica y tramitación de patente comercial en la municipalidad correspondiente.",
    keywords: "crear empresa spa quillota, formalizar negocio chile, inicio de actividades sii",
  },
  {
    q: "¿Qué pasa si tengo declaraciones atrasadas de IVA F29 o multas con el SII?",
    a: "Revisamos tus registros de compra y venta históricos, rectificamos las declaraciones de IVA F29 pendientes y gestionamos solicitudes administrativas ante el SII para la condonación de intereses y multas por presentación fuera de plazo, regularizando tu situación tributaria rápidamente.",
    keywords: "regularizar f29 atrasado, condonacion multas sii, contador tributario valparaiso",
  },
  {
    q: "¿Qué régimen tributario le conviene a mi negocio: Pro Pyme General (14 D3) o Transparente (14 D8)?",
    a: "Depende de la naturaleza de tu negocio y si reinviertes utilidades. El régimen Pro Pyme General (14 D3) aplica Impuesto de Primera Categoría con tasas vigentes de: 12,5% transitoria para los años comerciales 2026 y 2027; 15,0% para 2028; y 25,0% permanente desde 2029 (trasladando el 100% de crédito a los socios). El régimen Pro Pyme Transparente (14 D8) libera a la empresa del impuesto de primera categoría (0% IDPC) y tributa directo en el Global Complementario de los dueños, ideal para empresas de servicios y profesionales.",
    keywords: "regimen pro pyme general 14 d3, pro pyme transparente 14 d8, tasa corporativa pyme chile",
  },
  {
    q: "¿Cómo es el proceso si ya tengo otro contador y quiero cambiarme a Audicontab?",
    a: "El cambio es 100% transparente y sin interrupciones en tus declaraciones. Solo solicitamos tus claves tributarias del SII y Previred, recopilamos los balances anteriores y nos hacemos cargo de tus declaraciones desde el primer mes, garantizando total confidencialidad y continuidad operativa.",
    keywords: "cambiar de contador quillota, traspaso contable empresa, asesoria contable continua",
  },
  {
    q: "¿Atienden de forma presencial en Quillota o también online en otras comunas?",
    a: "Brindamos atención presencial en nuestra oficina ubicada en O'Higgins 480, oficina 15, Quillota, y atención 100% digital a través de videollamadas, WhatsApp y plataformas seguras en la nube para empresas de Viña del Mar, Valparaíso, La Calera, Limache, Quilpué y todo Chile.",
    keywords: "contador online chile, oficina contable quillota, contador viña del mar",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper-100 py-20 md:py-28">
      <div aria-hidden="true" className="ruled-lines absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-5xl px-6">
        {/* Cabecera */}
        <div className="text-center">
          <Eyebrow>Resolvemos tus dudas</Eyebrow>
          <MaskLines
            as="h2"
            className="mt-4 font-display text-3xl font-extrabold leading-tight text-ink-900 sm:text-5xl"
            lines={["Preguntas Frecuentes", "sobre Contabilidad & SII"]}
          />
          <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-relaxed text-ink-600">
            Todo lo que necesitas saber sobre plazos tributarios, declaración de IVA, formalización de
            empresas y cómo trabajamos en Audicontab Limitada.
          </p>
        </div>

        {/* Acordeón de FAQs */}
        <div className="mt-12 divide-y divide-ink-900/15 border-y border-ink-900/15">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="transition-colors duration-200 hover:bg-paper-50/50">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
                    {item.q}
                  </h3>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                      isOpen
                        ? "border-brass-600 bg-brass-500 text-paper-50 rotate-45"
                        : "border-ink-900/20 text-ink-700"
                    }`}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-8 text-[15px] leading-relaxed text-ink-600">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner CTA sutil */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-2 border-brass-400/40 bg-ink-950 p-6 text-paper-50 sm:flex-row sm:p-8">
          <div>
            <p className="font-display text-xl font-bold">¿Tienes una consulta tributaria específica?</p>
            <p className="mt-1 text-sm text-mist-300">
              Conversa directamente con un contador auditor de Audicontab por WhatsApp.
            </p>
          </div>
          <a
            href={waLink("Hola Audicontab, tengo una consulta contable que me gustaría revisar.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2.5 bg-brass-500 px-6 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-paper-50 transition-colors hover:bg-brass-400"
          >
            <WhatsAppIcon className="h-4 w-4 text-[#4ade80]" />
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
