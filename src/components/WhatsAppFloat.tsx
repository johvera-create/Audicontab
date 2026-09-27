import { WHATSAPP_NUMBER, waLink } from "../data/site";
import { useScrollTop } from "../hooks/useMotion";
import { PhoneIcon, WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const visible = useScrollTop(300);

  return (
    <>
      {/* Botón Flotante para Escritorio / Notebooks */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contáctanos por WhatsApp"
        className={`group fixed bottom-6 right-6 z-[60] hidden transition-all duration-500 sm:flex ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        {/* Tooltip estilo 21st.dev con Live Status */}
        <div className="pointer-events-none absolute bottom-full right-0 mb-3 hidden w-64 rounded-2xl border border-paper-50/15 bg-ink-950/90 p-3.5 shadow-2xl backdrop-blur-xl transition-all duration-300 group-hover:block group-hover:-translate-y-1">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-ring absolute inline-flex h-full w-full bg-[#22c55e]" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#22c55e]">
              En línea ahora
            </span>
          </div>
          <p className="mt-1.5 font-display text-xs font-semibold text-paper-50">
            ¿Dudas con tu F29 o Renta?
          </p>
          <p className="mt-0.5 text-[11px] text-mist-400">
            Habla directo con Priscilla o Paula por WhatsApp.
          </p>
        </div>

        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,0.7)] transition-all duration-300 group-hover:scale-110 active:scale-95">
          <span className="pulse-ring absolute inset-0 rounded-full bg-[#25d366]/50" aria-hidden="true" />
          <WhatsAppIcon className="relative h-7 w-7 text-white fill-white" />
        </span>
      </a>

      {/* Barra Rápida Inferior Fija para Celulares (Mobile Quick Actions) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-[60] flex items-center justify-between border-t border-paper-50/15 bg-ink-950/95 px-4 py-2.5 shadow-[0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-md transition-transform duration-300 sm:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <a
          href={`tel:+${WHATSAPP_NUMBER}`}
          className="flex flex-1 items-center justify-center gap-2 border border-paper-50/20 bg-ink-900/80 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-paper-50 active:scale-95"
        >
          <PhoneIcon className="h-4 w-4 text-brass-400" />
          Llamar
        </a>
        <div className="w-2.5" />
        <a
          href={waLink("Hola Audicontab, me gustaría consultar por servicios contables.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-[1.4] items-center justify-center gap-2 bg-[#25d366] py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-md active:scale-95"
        >
          <WhatsAppIcon className="h-4 w-4 text-white fill-white" />
          WhatsApp
        </a>
      </div>
    </>
  );
}
