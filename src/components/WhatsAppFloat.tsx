import { waLink } from "../data/site";
import { useScrollTop } from "../hooks/useMotion";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  const visible = useScrollTop(380);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contáctanos por WhatsApp"
      className={`group fixed bottom-6 right-6 z-[60] transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-4 -translate-y-1/2 whitespace-nowrap border border-brass-400/40 bg-ink-950 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-brass-300 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
        ¿Conversamos? Respuesta rápida
      </span>
      <span className="relative flex h-[60px] w-[60px] items-center justify-center">
        <span className="pulse-ring absolute inset-0 bg-[#25d366]/60" aria-hidden="true" />
        <span className="relative flex h-14 w-14 items-center justify-center bg-[#25d366] shadow-[0_14px_34px_-8px_rgba(37,211,102,0.55)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
          <WhatsAppIcon className="h-7 w-7 text-ink-950" />
        </span>
      </span>
    </a>
  );
}
