import { useState } from "react";
import { ADDRESS, NAV, WHATSAPP_DISPLAY } from "../data/site";
import { useScrollTop } from "../hooks/useMotion";
import { ClockIcon, LogoMark, PhoneIcon } from "./icons";

export default function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollTop(40);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Franja informativa */}
      <div className="hidden border-b border-paper-50/10 bg-ink-950 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-mist-400">
          <span>{ADDRESS}</span>
          <span className="flex items-center gap-5">
            <span>Lun – Vie · 9:00 – 18:00</span>
            <span className="flex items-center gap-2 text-brass-300">
              <PhoneIcon className="h-3.5 w-3.5" />
              {WHATSAPP_DISPLAY}
            </span>
          </span>
        </div>
      </div>

      {/* Barra principal */}
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? "border-paper-50/10 bg-ink-950/95 shadow-[0_18px_40px_-20px_rgba(4,12,22,0.9)] backdrop-blur"
            : "border-transparent bg-ink-900/40"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
          <a href="#inicio" className="flex items-center gap-3">
            <LogoMark className="h-10 w-10" />
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold tracking-tight text-paper-50">
                AUDICONTAB
              </span>
              <span className="mt-1 block font-mono text-[9.5px] uppercase tracking-[0.3em] text-brass-300">
                Limitada · Quillota
              </span>
            </span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="link-draw font-mono text-[12px] uppercase tracking-[0.18em] text-paper-100 hover:text-brass-300"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="hidden border border-brass-400/70 px-5 py-2.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brass-300 transition-all duration-300 hover:bg-brass-400 hover:text-ink-950 lg:inline-flex"
          >
            Cotiza aquí
          </a>

          {/* Menú móvil */}
          <button
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-paper-50/20 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`h-[2px] w-5 bg-paper-50 transition-all duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-paper-50 transition-all duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-[2px] w-5 bg-paper-50 transition-all duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Panel móvil */}
        <div
          className={`grid overflow-hidden bg-ink-950 transition-[grid-template-rows] duration-500 lg:hidden ${
            open ? "grid-rows-[1fr] border-t border-paper-50/10" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="space-y-1 px-6 py-5">
              {NAV.map((n, i) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-paper-50/10 py-3.5 font-display text-lg font-bold text-paper-100 transition-colors hover:text-brass-300"
                  >
                    {n.label}
                    <span className="font-mono text-[10px] text-mist-500">0{i + 1}</span>
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-brass-400 px-5 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-ink-950"
                >
                  <ClockIcon className="h-4 w-4" />
                  Agenda una reunión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
