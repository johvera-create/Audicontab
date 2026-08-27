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
      <span className="pointer-events-none absolute right-full top-1/2 mr-3.5 -translate-y-1/2 whitespace-nowrap border border-brass-400/40 bg-ink-950 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-brass-300 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-1">
        ¿Conversamos? WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_10px_25px_-5px_rgba(37,211,102,0.6)] transition-all duration-300 group-hover:scale-110 active:scale-95">
        <span className="pulse-ring absolute inset-0 rounded-full bg-[#25d366]/50" aria-hidden="true" />
        <WhatsAppIcon className="relative h-8 w-8 text-white fill-white" />
      </span>
    </a>
  );
}
