import { useState } from "react";
import { ADDRESS, NAV, WHATSAPP_DISPLAY } from "../data/site";
import { useScrollTop } from "../hooks/useMotion";
import { ArrowIcon, LogoMark } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTop(48);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-50/10 bg-ink-950/95 shadow-lg backdrop-blur-xl transition-all duration-300">
      {/* Franja informativa */}
      <div className="hidden border-b border-paper-50/10 bg-ink-950 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-400">
          <span>{ADDRESS}</span>
          <span className="flex items-center gap-5">
            <span>Lun – Vie · 9:00 – 18:00</span>
            <a href="tel:+56954247306" className="link-draw text-brass-300">
              {WHATSAPP_DISPLAY}
            </a>
          </span>
        </div>
      </div>

      {/* Navegación Principal */}
      <nav className="px-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between py-3">
          <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-brass-400/40 bg-ink-900 shadow-md">
              <LogoMark className="h-full w-full object-contain" />
            </div>
            <span className="leading-tight">
              <span className="block font-display text-lg font-black tracking-tight text-paper-50">
                AUDICONTAB
              </span>
              <span className="block font-mono text-[9.5px] font-bold uppercase tracking-[0.24em] text-brass-400">
                Ltda · Quillota
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="link-draw font-mono text-[12px] uppercase tracking-[0.2em] text-paper-100/90 transition-colors hover:text-brass-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="group hidden items-center gap-2 bg-brass-400 px-5 py-2.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-950 transition-all duration-300 hover:bg-brass-300 hover:shadow-[0_8px_24px_-8px_rgba(229,173,67,0.7)] sm:inline-flex"
            >
              Agenda una reunión
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <button
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-brass-400/30 bg-ink-900/90 transition-all hover:border-brass-400 active:scale-95 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Abrir menú"
            >
              <span
                className={`h-[2px] w-5 bg-brass-300 transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45 bg-brass-400" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-brass-400 transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-brass-300 transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45 bg-brass-400" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`overflow-hidden transition-all duration-500 lg:hidden ${
            open
              ? "max-h-[460px] border-t border-paper-50/10 bg-ink-950 pb-4 pt-2 shadow-2xl"
              : "max-h-0"
          }`}
        >
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <li key={item.href} className={i > 0 ? "border-t border-paper-50/10" : ""}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-paper-100 hover:text-brass-300"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-brass-400">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-brass-400 px-5 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-950"
              >
                Agenda una reunión <ArrowIcon className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
