import type { ReactElement } from "react";

type IconProps = { className?: string; strokeWidth?: number };

const base = (className?: string) => className ?? "w-6 h-6";

export function ChartIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M3.5 20.5h17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M6 20v-7M11 20V6.5M16 20v-10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M17.5 4.5 21 8M21 8v-3.5M21 8h-3.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StampIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M12 3.5c-1.6 0-2.7 1.3-2.7 2.9 0 2 .9 3 .9 4.6H7.3c-1 0-1.8.8-1.8 1.8v1.7h13v-1.7c0-1-.8-1.8-1.8-1.8h-1.9c0-1.6.9-2.6.9-4.6 0-1.6-1.1-2.9-2.7-2.9Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M5.5 18.5h13v2h-13z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function PercentIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M6 18 18 6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <circle cx="7.2" cy="7.2" r="2.7" stroke="currentColor" strokeWidth={strokeWidth} />
      <circle cx="16.8" cy="16.8" r="2.7" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function InvoiceIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M6.5 3.5h11V20l-2.2-1.5-2.15 1.5-2.15-1.5L8.7 20 6.5 18.5V3.5Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M9.5 8h5M9.5 11.5h5M9.5 15h2.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function PeopleIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M3.5 20c.5-3.3 2.7-5.2 5.5-5.2s5 1.9 5.5 5.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M15.5 5.2a3.2 3.2 0 0 1 0 5.9M17.6 15.2c1.7.8 2.7 2.5 2.9 4.8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function CalendarCheckIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="m9 14.5 2.2 2.2 3.8-4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M8 13.5h2M14 13.5h2M8 16.5h2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function LedgerIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M5 3.5h14v17H5z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="M8.5 3.5v17" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M11.5 8h4.5M11.5 11.5h4.5M11.5 15h3" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M5.5 4h4l1.5 4.5-2.2 1.7a12.5 12.5 0 0 0 5 5l1.7-2.2L20 14.5v4a1.5 1.5 0 0 1-1.7 1.5C10.5 19 5 13.5 4 5.7A1.5 1.5 0 0 1 5.5 4Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
    </svg>
  );
}

export function MailIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M12 21s-6.5-5.7-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.3 12 21 12 21Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <circle cx="12" cy="10.3" r="2.4" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function ClockIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M12 7.5V12l3 2.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckIcon({ className, strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="m4.5 12.5 5 5 10-11" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className, strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function QuoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden="true">
      <path d="M5 13.2c0-4 2.4-6.9 6-8l.9 1.8c-2.2 1-3.6 2.6-3.8 4.4.4-.2.9-.3 1.4-.3 2 0 3.4 1.4 3.4 3.4S11.4 18 9.3 18C6.7 18 5 16.1 5 13.2Zm10 0c0-4 2.4-6.9 6-8l.9 1.8c-2.2 1-3.6 2.6-3.8 4.4.4-.2.9-.3 1.4-.3 2 0 3.4 1.4 3.4 3.4S21.4 18 19.3 18c-2.6 0-4.3-1.9-4.3-4.8Z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={base(className)} aria-hidden="true">
      <path d="M12 2.5A9.5 9.5 0 0 0 3.8 16.7L2.5 21.5l4.9-1.3A9.5 9.5 0 1 0 12 2.5Zm0 1.8a7.7 7.7 0 1 1-4 14.3l-.3-.2-2.9.8.8-2.8-.2-.3A7.7 7.7 0 0 1 12 4.3Zm-2.9 3.8c-.2 0-.5 0-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 1.9 3 4.7 4.1 2.3.9 2.8.8 3.3.7.5 0 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3l-2-1c-.3-.1-.5-.2-.7.1l-.9 1.2c-.2.2-.3.2-.6.1a6.5 6.5 0 0 1-3.2-2.9c-.2-.3 0-.4.1-.6l.6-.8c.1-.2.1-.4 0-.6L10 8.5c-.2-.4-.4-.4-.9-.4Z" />
    </svg>
  );
}

/** Isotipo usado en el header. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className ?? "w-10 h-10"} aria-hidden="true">
      <rect x="1" y="1" width="38" height="38" rx="5" fill="var(--color-ink-800)" stroke="var(--color-brass-400)" strokeWidth="1.5" />
      <path d="M20 8.5 11.5 31M20 8.5 28.5 31M14.6 23.5h10.8" stroke="var(--color-brass-300)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 34.5h24" stroke="var(--color-brass-400)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/**
 * Logo oficial de Audicontab: flecha azul hacia arriba envuelta por dos espirales,
 * con wordmark "AUDICONTAB" y "LTDA" a la derecha.
 * Para usar el archivo gráfico real, reemplazar este SVG por:
 * <img src="/logo-audicontab.png" alt="Audicontab Limitada" />
 */
export function OfficialLogo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  const spiral = light ? "#c3cdd8" : "#2C2C2C";
  const word = light ? "#f7f9fa" : "#2C2C2C";
  return (
    <svg viewBox="0 0 264 120" fill="none" className={className ?? "h-20 w-auto"} aria-hidden="true">
      {/* espiral posterior */}
      <path
        d="M18 84c-8-14 0-34 20-40s44 2 50 18"
        stroke={spiral}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M94 22c8 6 12 16 8 26"
        stroke={spiral}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* flecha azul hacia arriba */}
      <path d="M58 12 82 48H68v52H48V48H34L58 12Z" fill="#1B3A5C" />
      {/* espiral frontal */}
      <path
        d="M100 52c10 12 6 32-14 38s-44-2-52-16"
        stroke={spiral}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="M24 66c-2-10 2-20 10-26"
        stroke={spiral}
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      {/* wordmark */}
      <text
        x="128"
        y="72"
        fontFamily="'Bricolage Grotesque', sans-serif"
        fontWeight="800"
        fontSize="33"
        letterSpacing="1.5"
        fill={word}
      >
        AUDICONTAB
      </text>
      <text
        x="129"
        y="94"
        fontFamily="'IBM Plex Mono', monospace"
        fontWeight="600"
        fontSize="13"
        letterSpacing="7"
        fill={light ? "#e5ad43" : "#a8741c"}
      >
        LTDA
      </text>
    </svg>
  );
}

export const SERVICE_ICONS: Record<string, (p: IconProps) => ReactElement> = {
  chart: ChartIcon,
  stamp: StampIcon,
  percent: PercentIcon,
  invoice: InvoiceIcon,
  people: PeopleIcon,
  calendar: CalendarCheckIcon,
};
