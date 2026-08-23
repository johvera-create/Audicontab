import { ADDRESS, NAV, QUILLOTA_COORDS, SERVICES, WHATSAPP_DISPLAY } from "../data/site";
import { ArrowIcon, LogoMark, WhatsAppIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative bg-ink-950 text-mist-300">
      <div aria-hidden="true" className="ruled-lines-dark absolute inset-0 opacity-60" />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-16">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Marca */}
          <div className="md:col-span-5">
            <a href="#inicio" className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="leading-none">
                <span className="block font-display text-xl font-extrabold tracking-tight text-paper-50">
                  AUDICONTAB
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.3em] text-brass-300">
                  Limitada · Quillota
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-mist-400">
              Servicios contables y tributarios para empresas y personas de Quillota y la región de
              Valparaíso. Tu contabilidad al día, tus plazos cumplidos.
            </p>
            <a
              href="https://wa.me/56954247306"
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 border border-paper-50/20 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.16em] text-paper-100 transition-all duration-300 hover:border-brass-400 hover:text-brass-300"
            >
              <WhatsAppIcon className="h-[18px] w-[18px] text-[#4ade80] transition-transform duration-300 group-hover:scale-110" />
              {WHATSAPP_DISPLAY}
            </a>
          </div>

          {/* Navegación */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-400">
              Sitio
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-draw text-[14.5px] text-mist-300 hover:text-paper-50">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div className="md:col-span-3">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-400">
              Servicios
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <a href="#servicios" className="link-draw text-[14.5px] text-mist-300 hover:text-paper-50">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="md:col-span-2">
            <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-400">
              Oficina
            </h3>
            <ul className="mt-5 space-y-3 text-[14.5px] text-mist-300">
              <li>{ADDRESS}</li>
              <li>Lun – Vie · 9:00 – 18:00</li>
              <li className="font-mono text-[11px] tracking-[0.14em] text-mist-500">{QUILLOTA_COORDS}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-paper-50/10 pt-7 sm:flex-row">
          <p className="font-mono text-[11px] tracking-[0.12em] text-mist-500">
            © 2025 Audicontab Limitada · Todos los derechos reservados
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mist-500">
            Quillota · Región de Valparaíso · Chile
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-brass-300 transition-colors hover:text-brass-200"
          >
            Volver arriba
            <ArrowIcon className="h-4 w-4 -rotate-90 transition-transform duration-300 group-hover:-translate-y-1" />
          </a>
        </div>
      </div>
    </footer>
  );
}
