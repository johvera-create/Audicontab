import { useState } from "react";
import { ADDRESS, NAV, WHATSAPP_DISPLAY } from "../data/site";
import { useScrollTop } from "../hooks/useMotion";
import { ArrowIcon, LogoMark } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTop(48);

  return (
    <header className="sticky top-0 z-50">
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

      {/* Navegación */}
      <nav
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-paper-50/10 bg-ink-900/95 shadow-[0_12px_40px_-18px_rgba(7,20,34,0.8)] backdrop-blur-md"
            : "border-transparent bg-ink-900/40"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="#inicio" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <LogoMark className="h-10 w-10 transition-transform duration-500 group-hover:-rotate-6" />
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold tracking-tight text-paper-50">
                AUDICONTAB
              </span>
              <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.3em] text-brass-300">
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
              className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-paper-50/20 transition-colors hover:border-brass-400 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Abrir menú"
            >
              <span
                className={`h-[2px] w-5 bg-paper-50 transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-brass-400 transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-5 bg-paper-50 transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        <div
          className={`overflow-hidden border-paper-50/10 bg-ink-900/97 transition-[max-height] duration-500 lg:hidden ${
            open ? "max-h-[420px] border-t" : "max-h-0"
          }`}
        >
          <ul className="px-6 py-4">
            {NAV.map((item, i) => (
              <li key={item.href} className={i > 0 ? "border-t border-paper-50/10" : ""}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-3.5 font-mono text-sm uppercase tracking-[0.2em] text-paper-100 hover:text-brass-300"
                >
                  {item.label}
                  <span className="font-mono text-[10px] text-mist-500">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 bg-brass-400 px-5 py-3 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-ink-950"
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
