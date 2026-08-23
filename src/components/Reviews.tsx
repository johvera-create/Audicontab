import { useEffect, useMemo, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, makeSeedReviews, type Review } from "../data/site";
import { useInView } from "../hooks/useMotion";
import { ArrowIcon, CheckIcon, MailIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

const LS_KEY = "audicontab_resenas_v1";

const dateFmt = new Intl.DateTimeFormat("es-CL", {
  day: "numeric",
  month: "short",
  year: "numeric",
});
const avgFmt = new Intl.NumberFormat("es-CL", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const STAR_PATH =
  "M10 1.7 12.6 7l5.9.6-4.4 3.9 1.2 5.8L10 14.4l-5.3 2.9 1.2-5.8L1.5 7.6 7.4 7 10 1.7Z";

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${size} ${i <= value ? "text-brass-500" : "text-ink-900/15"}`}
          fill="currentColor"
          aria-hidden="true"
        >
          <path d={STAR_PATH} />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ r, fresh = false }: { r: Review; fresh?: boolean }) {
  const initials = r.name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <article
      className={`group relative flex h-full flex-col border bg-paper-50 p-6 transition-all duration-300 ${
        fresh
          ? "border-2 border-brass-500 shadow-[0_18px_44px_-20px_rgba(168,116,28,0.5)]"
          : "border-ink-900/15 hover:-translate-y-1.5 hover:border-brass-500/60 hover:shadow-[0_20px_44px_-22px_rgba(27,58,92,0.4)]"
      }`}
    >
      {fresh && (
        <span className="absolute -top-3 left-5 bg-brass-500 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.2em] text-ink-950">
          Nueva
        </span>
      )}
      <div className="flex items-center justify-between gap-3">
        <Stars value={r.rating} />
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-500">
          {dateFmt.format(r.ts)}
        </span>
      </div>
      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-800">“{r.comment}”</p>
      <footer className="mt-5 flex items-center gap-3 border-t border-ink-900/10 pt-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-brass-500/60 bg-brass-400/15 font-display text-sm font-extrabold text-brass-600">
          {initials}
        </span>
        <span>
          <span className="block font-display text-[15px] font-bold text-ink-900">{r.name}</span>
          <span className="block font-mono text-[9.5px] uppercase tracking-[0.2em] text-ink-500">
            Cliente Audicontab
          </span>
        </span>
      </footer>
    </article>
  );
}

type ReviewForm = { name: string; email: string; rating: number; comment: string };
type ReviewErrors = Partial<Record<keyof ReviewForm, string>>;

const labelCls =
  "mb-2 block font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-mist-400";
const errCls = "mt-1.5 text-[12.5px] font-medium text-orange-400";
const fieldCls = (hasError: boolean) =>
  `w-full border-2 bg-ink-950/50 px-4 py-3 text-[14.5px] text-paper-50 outline-none transition-colors duration-300 placeholder:text-mist-500 ${
    hasError
      ? "border-orange-500/70 focus:border-orange-400"
      : "border-paper-50/15 focus:border-brass-400 hover:border-paper-50/30"
  }`;

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const raw = window.localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Review[];
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      /* almacenamiento no disponible: usar semillas */
    }
    return makeSeedReviews();
  });
  const [freshId, setFreshId] = useState<string | null>(null);
  const [form, setForm] = useState<ReviewForm>({ name: "", email: "", rating: 0, comment: "" });
  const [errors, setErrors] = useState<ReviewErrors>({});
  const [hoverStar, setHoverStar] = useState(0);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(LS_KEY, JSON.stringify(reviews));
    } catch {
      /* sin persistencia disponible */
    }
  }, [reviews]);

  const avg = useMemo(
    () => reviews.reduce((s, r) => s + r.rating, 0) / Math.max(reviews.length, 1),
    [reviews]
  );
  const dist = useMemo(
    () => [5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length })),
    [reviews]
  );
  const { ref: sumRef, inView: sumInView } = useInView<HTMLDivElement>(0.25);

  const set = (k: keyof ReviewForm) => (ev: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: ev.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    setSuccess("");
  };

  const validate = (f: ReviewForm): ReviewErrors => {
    const e: ReviewErrors = {};
    if (f.name.trim().length < 2) e.name = "Escribe tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Escribe un correo válido.";
    if (f.rating < 1) e.rating = "Selecciona una calificación de 1 a 5 estrellas.";
    if (f.comment.trim().length < 10) e.comment = "Cuéntanos un poco más (mínimo 10 caracteres).";
    return e;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const id = `r-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    const review: Review = {
      id,
      name: form.name.trim(),
      email: form.email.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      ts: Date.now(),
    };
    setReviews((rs) => [review, ...rs]);
    setFreshId(id);
    setSuccess(`¡Gracias, ${review.name.split(" ")[0]}! Tu reseña ya está publicada.`);
    setForm({ name: "", email: "", rating: 0, comment: "" });
    setHoverStar(0);
  };

  return (
    <section id="clientes" className="relative overflow-hidden bg-paper-100 py-20 md:py-28">
      <div aria-hidden="true" className="ruled-lines absolute inset-0 opacity-60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(680px_380px_at_0%_0%,rgba(229,173,67,0.12),transparent_60%)]"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Reseñas de clientes</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["La palabra", "del contribuyente."]}
            />
          </div>
          <div className="flex lg:col-span-4 lg:justify-end">
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                "Cotización de servicios contables"
              )}`}
              className="group inline-flex items-center gap-3 border border-ink-900 px-5 py-3.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-900 transition-all duration-300 hover:bg-ink-900 hover:text-brass-300"
            >
              <MailIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:scale-110" />
              Cotiza por correo
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Resumen + formulario */}
          <div className="space-y-6 lg:col-span-4">
            <div ref={sumRef} className="border-l-4 border-brass-500 bg-ink-950 px-8 py-9 text-paper-50">
              <div className="flex items-end gap-4">
                <p className="tabular font-display text-6xl font-extrabold leading-none text-paper-50">
                  {avgFmt.format(avg)}
                </p>
                <div className="pb-1.5">
                  <Stars value={Math.round(avg)} />
                  <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-mist-400">
                    {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
                  </p>
                </div>
              </div>
              <div className="mt-7 space-y-2.5">
                {dist.map(({ s, n }) => {
                  const pct = reviews.length ? (n / reviews.length) * 100 : 0;
                  return (
                    <div key={s} className="flex items-center gap-2.5">
                      <span className="tabular w-3 font-mono text-[11px] text-mist-300">{s}</span>
                      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-brass-400" fill="currentColor" aria-hidden="true">
                        <path d={STAR_PATH} />
                      </svg>
                      <div className="h-[6px] flex-1 bg-ink-700">
                        <div
                          className="h-full bg-brass-400 transition-[width] duration-700 ease-out"
                          style={{ width: sumInView ? `${pct}%` : "0%" }}
                        />
                      </div>
                      <span className="tabular w-5 text-right font-mono text-[11px] text-mist-400">
                        {n}
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="mt-6 border-t border-paper-50/10 pt-4 font-mono text-[10px] leading-relaxed tracking-[0.06em] text-mist-500">
                Las reseñas se publican al instante y quedan guardadas en este navegador.
              </p>
            </div>

            <form
              onSubmit={onSubmit}
              noValidate
              className="relative border border-ink-900/15 bg-ink-900 px-8 py-8 text-paper-50 shadow-[0_30px_70px_-30px_rgba(7,20,34,0.8)]"
            >
              <div aria-hidden="true" className="ruled-lines-dark absolute inset-0 opacity-70" />
              <div className="relative">
                <h3 className="font-display text-2xl font-bold tracking-tight">Deja tu reseña</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-mist-400">
                  ¿Trabajaste con nosotros? Tu experiencia ayuda a otros contribuyentes a decidir.
                </p>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="rv-name" className={labelCls}>
                      Nombre *
                    </label>
                    <input
                      id="rv-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Ej: María González"
                      className={fieldCls(!!errors.name)}
                    />
                    {errors.name && <p className={errCls}>{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="rv-email" className={labelCls}>
                      Correo electrónico *
                    </label>
                    <input
                      id="rv-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="tucorreo@ejemplo.cl"
                      className={fieldCls(!!errors.email)}
                    />
                    {errors.email && <p className={errCls}>{errors.email}</p>}
                  </div>

                  <div>
                    <span className={labelCls}>Tu calificación *</span>
                    <div className="flex items-center gap-1.5" onMouseLeave={() => setHoverStar(0)}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`${i} estrella${i > 1 ? "s" : ""}`}
                          aria-pressed={form.rating === i}
                          onClick={() => {
                            setForm((f) => ({ ...f, rating: i }));
                            setErrors((e) => ({ ...e, rating: undefined }));
                            setSuccess("");
                          }}
                          onMouseEnter={() => setHoverStar(i)}
                          className="p-1 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brass-400"
                        >
                          <svg
                            viewBox="0 0 20 20"
                            className={`h-8 w-8 transition-colors duration-200 ${
                              i <= (hoverStar || form.rating)
                                ? "text-brass-400 drop-shadow-[0_0_8px_rgba(229,173,67,0.45)]"
                                : "text-paper-50/20"
                            }`}
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path d={STAR_PATH} />
                          </svg>
                        </button>
                      ))}
                      <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-400">
                        {form.rating ? `${form.rating}/5` : "elige"}
                      </span>
                    </div>
                    {errors.rating && <p className={errCls}>{errors.rating}</p>}
                  </div>

                  <div>
                    <label htmlFor="rv-comment" className={labelCls}>
                      Comentario *
                    </label>
                    <textarea
                      id="rv-comment"
                      rows={4}
                      value={form.comment}
                      onChange={set("comment")}
                      placeholder="Cuéntanos cómo fue tu experiencia con Audicontab…"
                      className={`${fieldCls(!!errors.comment)} resize-none`}
                    />
                    {errors.comment && <p className={errCls}>{errors.comment}</p>}
                  </div>

                  <div aria-live="polite">
                    {success && (
                      <p className="flex items-start gap-2.5 border border-[#4ade80]/40 bg-[#4ade80]/10 px-4 py-3 text-[13px] font-medium text-[#86efac]">
                        <CheckIcon className="mt-0.5 h-4 w-4 shrink-0" />
                        {success}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-3 bg-brass-400 px-6 py-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.16em] text-ink-950 transition-all duration-300 hover:bg-brass-300 hover:shadow-[0_14px_32px_-12px_rgba(229,173,67,0.6)] active:scale-[0.99]"
                  >
                    Publicar reseña
                    <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Muro de reseñas */}
          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={(i % 4) * 90} y={20}>
                  <ReviewCard r={r} fresh={r.id === freshId} />
                </Reveal>
              ))}
            </div>
            <p className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-500">
              · Mostrando {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"} de clientes ·
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
