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

export function CalendarIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="1" stroke="currentColor" strokeWidth={strokeWidth} />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M8 13.5h3.5M8 16.5h6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
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

export function MailIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" />
      <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
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

export function CalculatorIcon({ className, strokeWidth = 1.7 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={base(className)} aria-hidden="true">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="8" y1="6" x2="16" y2="6" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="16" y1="14" x2="16" y2="18" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" stroke="currentColor" strokeWidth={strokeWidth * 1.5} strokeLinecap="round" />
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
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Audicontab Limitada"
      className={className ?? "h-10 w-10 rounded-full object-contain"}
    />
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
