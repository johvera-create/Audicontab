import type { ReactNode } from "react";
import { useCountUp, useInView, usePrefersReducedMotion } from "../hooks/useMotion";

const EASE = "cubic-bezier(0.22, 0.61, 0.36, 1)";

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const shown = inView || reduced;
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.8s ${EASE} ${delay}ms, transform 0.8s ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function MaskLines({
  lines,
  className,
  stagger = 100,
}: {
  lines: ReactNode[];
  className?: string;
  stagger?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const shown = inView || reduced;
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <span
            className="block"
            style={{
              transform: shown ? "none" : "translateY(112%)",
              transition: `transform 0.9s ${EASE} ${i * stagger}ms`,
              willChange: "transform",
            }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

export function Eyebrow({
  children,
  tone = "dark",
  className = "",
}: {
  children: ReactNode;
  tone?: "dark" | "light" | "brass";
  className?: string;
}) {
  const bar =
    tone === "brass" ? "bg-brass-400" : tone === "light" ? "bg-paper-50" : "bg-brass-500";
  const text =
    tone === "dark" ? "text-ink-600" : tone === "light" ? "text-mist-300" : "text-brass-400";
  return (
    <p
      className={`flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] ${text} ${className}`}
    >
      <span className={`h-[2px] w-9 ${bar}`} aria-hidden="true" />
      {children}
    </p>
  );
}

export function Stat({
  value,
  suffix = "",
  prefix = "",
  label,
  light = true,
  delay = 0,
  big = false,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  light?: boolean;
  delay?: number;
  big?: boolean;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const n = useCountUp(value, inView, 1500);
  const nf = new Intl.NumberFormat("es-CL");
  const shown = inView || reduced;
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(18px)",
        transition: `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`,
      }}
    >
      <p
        className={`tabular font-display font-extrabold leading-none ${
          big
            ? "text-[2.6rem] sm:text-5xl lg:text-6xl"
            : "text-[1.85rem] sm:text-4xl lg:text-5xl"
        } ${light ? "text-paper-50" : "text-ink-900"}`}
      >
        {prefix}
        {nf.format(n)}
        <span className="text-brass-400">{suffix}</span>
      </p>
      <p
        className={`mt-2 font-mono text-[11px] uppercase tracking-[0.22em] ${
          light ? "text-mist-400" : "text-ink-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
