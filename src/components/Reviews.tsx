import { useEffect, useRef, useState, type FormEvent } from "react";
import { CONTACT_EMAIL, makeSeedReviews, type Review } from "../data/site";
import { CheckIcon, MailIcon, QuoteIcon } from "./icons";
import { Eyebrow, MaskLines, Reveal } from "./Reveal";

const LS_KEY = "audicontab_resenas_v1";
const nf1 = new Intl.NumberFormat("es-CL", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const dateFmt = new Intl.DateTimeFormat("es-CL", { day: "2-digit", month: "short", year: "numeric" });

function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="flex gap-0.5" aria-label={`${value} de 5 estrellas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`${className} ${i <= value ? "fill-brass-500" : "fill-ink-900/15"}`}
          aria-hidden="true"
        >
          <path d="M10 1.8 12.5 7l5.7.6-4.3 3.9 1.2 5.6L10 14.2 4.9 17.1l1.2-5.6L1.8 7.6 7.5 7 10 1.8Z" />
        </svg>
      ))}
    </span>
  );
}

function loadReviews(): Review[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    /* almacenamiento no disponible */
  }
  return makeSeedReviews();
}

function StarPicker({
  value,
  onChange,
  invalid,
}: {
  value: number;
  onChange: (n: number) => void;
  invalid: boolean;
}) {
  const [hover, setHover] = useState(0);
  const shown = hover || value;
  return (
    <div
      className={`flex items-center gap-1 border-2 bg-paper-50 px-4 py-3 transition-colors ${
        invalid ? "border-orange-600/70" : "border-ink-900/15"
      }`}
      onMouseLeave={() => setHover(0)}
      role="radiogroup"
      aria-label="Calificación de 1 a 5 estrellas"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} estrella${n > 1 ? "s" : ""}`}
          onMouseEnter={() => setHover(n)}
          onFocus={() => setHover(n)}
          onBlur={() => setHover(0)}
          onClick={() => onChange(n)}
          className="group/star p-1 transition-transform duration-200 hover:-translate-y-0.5"
        >
          <svg
            viewBox="0 0 20 20"
            className={`h-7 w-7 transition-colors duration-150 ${
              n <= shown ? "fill-brass-500" : "fill-ink-900/15 group-hover/star:fill-brass-300"
            }`}
          >
            <path d="M10 1.8 12.5 7l5.7.6-4.3 3.9 1.2 5.6L10 14.2 4.9 17.1l1.2-5.6L1.8 7.6 7.5 7 10 1.8Z" />
          </svg>
        </button>
      ))}
      <span className="ml-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-500">
        {value ? `${value}/5` : "Elige"}
      </span>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full border-2 bg-paper-50 px-4 py-3 text-[15px] text-ink-900 outline-none transition-colors duration-300 placeholder:text-mist-500 ${
    hasError
      ? "border-orange-600/70 focus:border-orange-600"
      : "border-ink-900/15 focus:border-brass-500 hover:border-ink-900/30"
  }`;

const labelCls =
  "mb-2 block font-mono text-[10.5px] font-semibold uppercase tracking-[0.24em] text-ink-600";

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(loadReviews);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const firstUserRef = useRef(true);

  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(reviews));
    } catch {
      /* almacenamiento no disponible */
    }
  }, [reviews]);

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Cuéntanos tu nombre.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Escribe un correo válido.";
    if (!rating) e.rating = "Selecciona una calificación.";
    if (comment.trim().length < 10) e.comment = "Tu comentario debe tener al menos 10 caracteres.";
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    const review: Review = {
      id: `r-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      rating,
      comment: comment.trim(),
      ts: Date.now(),
    };
    setReviews((prev) => [review, ...prev]);
    setName("");
    setEmail("");
    setRating(0);
    setComment("");
    setSent(true);
    window.setTimeout(() => setSent(false), 5000);
  };

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;
  const dist = [5, 4, 3, 2, 1].map(
    (star) => reviews.filter((r) => r.rating === star).length
  );
  const maxDist = Math.max(1, ...dist);

  return (
    <section id="resenas" className="relative overflow-hidden bg-paper-50 py-20 md:py-28">
      <div aria-hidden="true" className="ruled-lines absolute inset-0 opacity-60" />
      <QuoteIcon className="pointer-events-none absolute -top-8 right-10 h-52 w-52 text-ink-700/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Eyebrow>Reseñas de clientes</Eyebrow>
            <MaskLines
              className="mt-5 font-display text-4xl font-extrabold leading-[1.02] tracking-tight text-ink-900 sm:text-5xl"
              lines={["La palabra", "del contribuyente."]}
            />
          </div>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
              "Cotización de servicios contables"
            )}`}
            className="group inline-flex items-center gap-3 self-start border border-ink-900 px-5 py-3 font-mono text-[11.5px] font-semibold uppercase tracking-[0.14em] text-ink-900 transition-all duration-300 hover:bg-ink-900 hover:text-brass-300 lg:col-span-4 lg:justify-self-end"
          >
            <MailIcon className="h-4 w-4" />
            Cotiza por correo
          </a>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12">
          {/* Resumen */}
          <Reveal className="lg:col-span-4" y={28}>
            <div className="relative overflow-hidden bg-ink-950 px-8 py-10 text-paper-50">
              <div aria-hidden="true" className="ruled-lines-dark absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(360px_260px_at_85%_8%,rgba(229,173,67,0.18),transparent_62%)]"
              />
              <div className="relative">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.3em] text-mist-400">
                  Resumen del libro de reseñas
                </p>
                <div className="mt-6 flex items-end gap-4">
                  <p className="tabular font-display text-7xl font-extrabold leading-none text-brass-400">
                    {nf1.format(avg)}
                  </p>
                  <div className="pb-1.5">
                    <Stars value={Math.round(avg)} />
                    <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.2em] text-mist-400">
                      {reviews.length} reseña{reviews.length === 1 ? "" : "s"}
                    </p>
                  </div>
                </div>

                <div className="mt-8 space-y-2.5">
                  {dist.map((count, i) => {
                    const star = 5 - i;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="tabular w-4 font-mono text-[11px] text-mist-300">{star}</span>
                        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-brass-400" aria-hidden="true">
                          <path d="M10 1.8 12.5 7l5.7.6-4.3 3.9 1.2 5.6L10 14.2 4.9 17.1l1.2-5.6L1.8 7.6 7.5 7 10 1.8Z" />
                        </svg>
                        <div className="h-[6px] flex-1 bg-paper-50/10">
                          <div
                            className="h-full bg-brass-400 transition-[width] duration-1000 ease-[cubic-bezier(0.22,0.61,0.36,1)]"
                            style={{ width: `${(count / maxDist) * 100}%` }}
                          />
                        </div>
                        <span className="tabular w-6 text-right font-mono text-[11px] text-mist-400">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-8 border-t border-paper-50/12 pt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-mist-500">
                  Tu opinión queda registrada en este libro y nos ayuda a seguir mejorando.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Muro de reseñas */}
          <div className="lg:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2" aria-live="polite">
              {reviews.map((r, i) => {
                const isUser = !r.id.startsWith("seed-");
                const justAdded = isUser && firstUserRef.current;
                return (
                  <article
                    key={r.id}
                    className={`group border bg-paper-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-22px_rgba(27,58,92,0.4)] ${
                      justAdded
                        ? "border-brass-500 shadow-[0_20px_44px_-22px_rgba(211,149,42,0.5)]"
                        : "border-ink-900/15 hover:border-brass-500/60"
                    } ${i === 0 && justAdded ? "quote-in" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-brass-500/60 bg-brass-400/15 font-display text-base font-extrabold text-brass-600">
                        {r.name
                          .split(" ")
                          .map((w) => w[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </span>
                      <Stars value={r.rating} />
                    </div>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">“{r.comment}”</p>
                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-ink-900/10 pt-4">
                      <div className="min-w-0">
                        <p className="truncate font-display text-[15px] font-bold text-ink-900">
                          {r.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                          {dateFmt.format(new Date(r.ts))}
                        </p>
                      </div>
                      {justAdded && (
                        <span className="shrink-0 bg-brass-400 px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-950">
                          Nueva
                        </span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Formulario de reseña */}
            <Reveal delay={120} y={24}>
              <div className="relative mt-6 border border-ink-900/15 bg-paper-100 shadow-[0_26px_60px_-30px_rgba(27,58,92,0.45)]">
                <div className="h-1.5 w-full bg-brass-400" aria-hidden="true" />
                <form onSubmit={onSubmit} noValidate className="px-7 py-8 md:px-9">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-display text-xl font-extrabold tracking-tight text-ink-900">
                      Deja tu reseña
                    </h3>
                    <span className="hidden font-mono text-[10px] uppercase tracking-[0.24em] text-mist-500 sm:block">
                      Folio abierto
                    </span>
                  </div>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="rev-nombre" className={labelCls}>Nombre *</label>
                      <input
                        id="rev-nombre"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors((p) => ({ ...p, name: "" }));
                        }}
                        placeholder="María González P."
                        className={inputCls(!!errors.name)}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="rev-email" className={labelCls}>Correo electrónico *</label>
                      <input
                        id="rev-email"
                        type="email"
                        required
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setErrors((p) => ({ ...p, email: "" }));
                        }}
                        placeholder="maria@miempresa.cl"
                        className={inputCls(!!errors.email)}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <span className={labelCls}>Calificación *</span>
                      <StarPicker
                        value={rating}
                        invalid={!!errors.rating}
                        onChange={(n) => {
                          setRating(n);
                          setErrors((p) => ({ ...p, rating: "" }));
                        }}
                      />
                      {errors.rating && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.rating}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="rev-comentario" className={labelCls}>Comentario *</label>
                      <textarea
                        id="rev-comentario"
                        rows={3}
                        required
                        value={comment}
                        onChange={(e) => {
                          setComment(e.target.value);
                          setErrors((p) => ({ ...p, comment: "" }));
                        }}
                        placeholder="¿Cómo fue tu experiencia con Audicontab?"
                        className={`${inputCls(!!errors.comment)} resize-none`}
                      />
                      {errors.comment && (
                        <p className="mt-1.5 text-[12.5px] font-medium text-orange-700">{errors.comment}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {sent ? (
                      <p
                        role="status"
                        className="quote-in flex items-center gap-2.5 font-mono text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-700"
                      >
                        <span className="flex h-7 w-7 items-center justify-center bg-brass-400 text-ink-950">
                          <CheckIcon className="h-4 w-4" />
                        </span>
                        ¡Gracias! Tu reseña quedó registrada en el libro.
                      </p>
                    ) : (
                      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-mist-500">
                        * Campos obligatorios · Se guarda en este dispositivo
                      </p>
                    )}
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-3 bg-ink-900 px-8 py-4 font-mono text-[12.5px] font-semibold uppercase tracking-[0.14em] text-brass-300 transition-all duration-300 hover:bg-ink-800 hover:shadow-[0_16px_36px_-14px_rgba(7,20,34,0.6)]"
                    >
                      Publicar reseña
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
