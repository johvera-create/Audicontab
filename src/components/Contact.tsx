import { useState, type FormEvent } from "react";
import {
  ADDRESS,
  MAPS_URL,
  SERVICES,
  WHATSAPP_DISPLAY,
  WHATSAPP_NUMBER,
} from "../data/site";
import {
  ArrowIcon,
  CheckIcon,
  ClockIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

type Form = { nombre: string; email: string; telefono: string; servicio: string; mensaje: string };
type Errors = Partial<Record<keyof Form, string>>;

const EMPTY: Form = { nombre: "", email: "", telefono: "", servicio: "", mensaje: "" };

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.nombre.trim().length < 2) e.nombre = "Cuéntanos tu nombre completo.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Escribe un correo válido.";
  if (f.telefono.replace(/\D/g, "").length < 8) e.telefono = "Necesitamos un teléfono de al menos 8 dígitos.";
  if (!f.servicio) e.servicio = "Elige el servicio que necesitas.";
  if (f.mensaje.trim().length < 10) e.mensaje = "Danos un poco más de detalle (mínimo 10 caracteres).";
  return e;
}

const inputCls = (hasError: boolean) =>
  `w-full border-2 bg-paper-50 px-4 py-3 text-[15px] text-ink-900 outline-none transition-colors duration-300 placeholder:text-mist-500 ${
    hasError
      ? "border-orange-600/70 focus:border-orange-600"
      : "border-ink-900/15 focus:border-brass-500 hover:border-ink-900/30"
  }`;

const labelCls = "mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ink-600";

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (ev: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length === 0) setSent(true);
  };

  const waText = encodeURIComponent(
    `Hola Audicontab, soy ${form.nombre || "un interesado"}. Me interesa: ${
      form.servicio || "asesoría contable"
    }. ${form.mensaje}`
  );

  return (
    <section id="contacto" className="relative overflow-hidden bg-paper-50 py-20 md:py-28">
      <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-50" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(720px_420px_at_100%_100%,rgba(229,173,67,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <Eyebrow>Contacto</Eyebrow>
        <MaskLines
          className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
          lines={["Conversemos", "de tus números."]}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Información */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {[
                {
                  icon: PhoneIcon,
                  label: "Teléfono / WhatsApp",
                  value: WHATSAPP_DISPLAY,
                  href: `tel:+${WHATSAPP_NUMBER}`,
                },
                {
                  icon: PinIcon,
                  label: "Oficina",
                  value: ADDRESS,
                  href: MAPS_URL,
                },
                {
                  icon: ClockIcon,
                  label: "Horario de atención",
                  value: "Lunes a viernes · 9:00 – 18:00 hrs",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 120} y={20}>
                  <div className="group flex items-center gap-5 border border-ink-900/15 bg-paper-50 px-6 py-5 transition-all duration-300 hover:-translate-y-1 hover:border-brass-500/70 hover:shadow-[0_18px_40px_-20px_rgba(27,58,92,0.35)]">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center border border-ink-900/20 text-ink-700 transition-colors duration-300 group-hover:bg-ink-900 group-hover:text-brass-400">
                      <item.icon className="h-[22px] w-[22px]" />
                    </span>
                    <span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.24em] text-ink-500">
                        {item.label}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noreferrer"
                          className="link-draw mt-1 inline-block text-[15.5px] font-semibold text-ink-900"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="mt-1 block text-[15.5px] font-semibold text-ink-900">
                          {item.value}
                        </span>
                      )}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Tarjeta mapa */}
            <Reveal delay={360} y={24}>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noreferrer"
                className="group relative mt-6 block overflow-hidden border border-ink-900/15 bg-ink-900 text-paper-50"
              >
                <div aria-hidden="true" className="ledger-grid absolute inset-0 opacity-30" />
                <div className="relative flex items-center justify-between px-6 py-7">
                  <span className="flex items-center gap-4">
                    <PinIcon className="bob-soft h-7 w-7 text-brass-400" />
                    <span>
                      <span className="block font-display text-lg font-bold">
                        Centro de Quillota, a pasos de todo
                      </span>
                      <span className="mt-0.5 block font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-400">
                        Abrir en Google Maps ↗
                      </span>
                    </span>
                  </span>
                  <ArrowIcon className="h-5 w-5 text-mist-400 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-brass-400" />
                </div>
              </a>
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-7">
            <Reveal delay={150} y={30}>
              <div className="relative border border-ink-900/15 bg-paper-50 shadow-[0_30px_70px_-34px_rgba(27,58,92,0.5)]">
                <div className="h-1.5 w-full bg-brass-400" aria-hidden="true" />
                {sent ? (
                  <div className="quote-in flex flex-col items-start px-8 py-12 md:px-12">
                    <span className="flex h-16 w-16 items-center justify-center border-2 border-brass-500 bg-brass-400/15 text-brass-600">
                      <CheckIcon className="h-8 w-8" />
                    </span>
                    <h3 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink-900">
                      ¡Mensaje recibido, {form.nombre.split(" ")[0]}!
                    </h3>
                    <p className="mt-3 max-w-md text-[15.5px] leading-relaxed text-ink-600">
                      Te contactaremos dentro de un día hábil al{" "}
                      <strong className="text-ink-900">{form.telefono}</strong> o al correo{" "}
                      <strong className="text-ink-900">{form.email}</strong>. Si prefieres,
                      adelanta la conversación por WhatsApp:
                    </p>
                    <div className="mt-7 flex flex-wrap gap-4">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-center gap-2.5 bg-ink-900 px-6 py-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-brass-300 transition-colors duration-300 hover:bg-ink-800"
                      >
                        <WhatsAppIcon className="h-[18px] w-[18px] text-[#4ade80]" />
                        Continuar por WhatsApp
                      </a>
                      <button
                        onClick={() => {
                          setForm(EMPTY);
                          setSent(false);
                        }}
                        className="border border-ink-900/25 px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-ink-700 transition-colors duration-300 hover:border-ink-900 hover:bg-ink-900 hover:text-paper-50"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} noValidate className="px-8 py-10 md:px-12 md:py-12">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-2xl font-extrabold tracking-tight text-ink-900">
                        Agenda una reunión
                      </h3>
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500 sm:block">
                        Form. N° 001-C
                      </span>
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="nombre" className={labelCls}>Nombre completo *</label>
                        <input
                          id="nombre"
                          type="text"
                          value={form.nombre}
                          onChange={set("nombre")}
                          placeholder="María González P."
                          className={inputCls(!!errors.nombre)}
                        />
                        {errors.nombre && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.nombre}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className={labelCls}>Correo electrónico *</label>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={set("email")}
                          placeholder="maria@miempresa.cl"
                          className={inputCls(!!errors.email)}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="telefono" className={labelCls}>Teléfono *</label>
                        <input
                          id="telefono"
                          type="tel"
                          value={form.telefono}
                          onChange={set("telefono")}
                          placeholder="+56 9 1234 5678"
                          className={inputCls(!!errors.telefono)}
                        />
                        {errors.telefono && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.telefono}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="servicio" className={labelCls}>Servicio que necesitas *</label>
                        <select
                          id="servicio"
                          value={form.servicio}
                          onChange={set("servicio")}
                          className={`${inputCls(!!errors.servicio)} appearance-none ${
                            form.servicio ? "" : "text-mist-500"
                          }`}
                        >
                          <option value="" disabled>Selecciona una opción…</option>
                          {SERVICES.map((s) => (
                            <option key={s.id} value={s.title}>{s.title}</option>
                          ))}
                          <option value="Otro">Otro / aún no lo sé</option>
                        </select>
                        {errors.servicio && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.servicio}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="mensaje" className={labelCls}>Mensaje *</label>
                        <textarea
                          id="mensaje"
                          rows={4}
                          value={form.mensaje}
                          onChange={set("mensaje")}
                          placeholder="Cuéntanos brevemente tu situación: giro de tu empresa, qué necesitas, plazos…"
                          className={`${inputCls(!!errors.mensaje)} resize-none`}
                        />
                        {errors.mensaje && (
                          <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.mensaje}</p>
                        )}
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">
                        * Campos obligatorios · Respuesta en 1 día hábil
                      </p>
                      <button
                        type="submit"
                        className="group inline-flex items-center justify-center gap-3 bg-ink-900 px-8 py-4 font-mono text-[13px] font-semibold uppercase tracking-[0.14em] text-brass-300 transition-all duration-300 hover:bg-ink-800 hover:shadow-[0_16px_36px_-14px_rgba(7,20,34,0.6)]"
                      >
                        Enviar mensaje
                        <ArrowIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
