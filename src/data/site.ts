export const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#calendario", label: "Calendario" },
  { href: "#calculadora", label: "Calculadora SII" },
  { href: "#contacto", label: "Contacto" },
];

export const WHATSAPP_NUMBER = "56954247306";
export const WHATSAPP_DISPLAY = "+56 9 5424 7306";
export const WHATSAPP_DEFAULT_MESSAGE =
  "Hola Audicontab, me gustaría cotizar sus servicios.";

/** Enlace oficial de WhatsApp (wa.me) — funciona en la app móvil y en WhatsApp Web. */
export function waLink(message: string = WHATSAPP_DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
export const ADDRESS = "O'Higgins 480, oficina 15, Quillota";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=O%27Higgins+480+Quillota+Chile";

export const QUILLOTA_COORDS = "32.88° S / 71.26° O";
export const CONTACT_EMAIL = "johanvera589@gmail.com";

/** Endpoint AJAX de FormSubmit: entrega los mensajes a CONTACT_EMAIL sin claves de API. */
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const clp = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export const formatCLP = (n: number) => clp.format(n);

/* ---------------- Servicios ---------------- */

export type Service = {
  id: string;
  code: string;
  icon: string;
  title: string;
  desc: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "asesoria",
    code: "SRV-01",
    icon: "chart",
    title: "Asesoría Contable y Tributaria",
    desc: "Te brindamos asesoría experta en materia contable y tributaria para optimizar la gestión financiera de tu empresa, con información clara para decidir a tiempo.",
    bullets: [
      "Análisis mensual de estados financieros",
      "Planificación tributaria y regímenes del SII",
      "Reportes gerenciales fáciles de leer",
    ],
  },
  {
    id: "formalizacion",
    code: "SRV-02",
    icon: "stamp",
    title: "Formalización de Empresas",
    desc: "Te ayudamos en la creación de empresas e inicio de actividades de manera rápida y eficiente, eligiendo la estructura y el régimen que más te conviene.",
    bullets: [
      "Constitución de SpA, EIRL y Sociedades",
      "Inicio de actividades ante el SII",
      "Patentes municipales y verificaciones",
    ],
  },
  {
    id: "iva",
    code: "SRV-03",
    icon: "percent",
    title: "Declaración de IVA Mensual",
    desc: "Gestionamos tus declaraciones de IVA mensuales (F29 y F50) para que cumplas con el SII sin preocupaciones ni multas por atraso.",
    bullets: [
      "Conciliación de libros de compra y venta",
      "Presentación oportuna del F29 / F50",
      "Control de crédito y débito fiscal",
    ],
  },
  {
    id: "facturacion",
    code: "SRV-04",
    icon: "invoice",
    title: "Facturación Electrónica",
    desc: "Implementamos y gestionamos tu sistema de facturación electrónica conforme a la normativa vigente del SII, integrado a tu operación diaria.",
    bullets: [
      "Facturas, boletas, notas de crédito y guías",
      "Boletas de honorarios electrónicas",
      "Capacitación a tu equipo en el portal",
    ],
  },
  {
    id: "rrhh",
    code: "SRV-05",
    icon: "people",
    title: "Gestión de Recursos Humanos",
    desc: "Administración completa de remuneraciones, contratos y obligaciones laborales de tu personal, con pagos previsionales siempre al día.",
    bullets: [
      "Liquidaciones de sueldo y contratos",
      "Declaración y pago Previred",
      "Finiquitos, licencias y AFC",
    ],
  },
  {
    id: "renta",
    code: "SRV-06",
    icon: "calendar",
    title: "Operación Renta y F22",
    desc: "Preparamos tu declaración anual de renta de principio a fin: revisamos tus antecedentes, presentamos el F22 y gestionamos tu devolución.",
    bullets: [
      "Revisión de declaraciones juradas",
      "Presentación de F22 dentro de plazo",
      "Seguimiento de la devolución del SII",
    ],
  },
];

/* ---------------- Ticker ---------------- */

export const TICKER_ITEMS = [
  "F29 · IVA mensual",
  "F50 · Contribuyentes no electrónicos",
  "Operación Renta",
  "F22 · Declaración anual",
  "Facturación electrónica",
  "Boletas de honorarios",
  "Remuneraciones y Previred",
  "DJ 1887 · Renta",
  "Inicio de actividades",
];

/* ---------------- Renta 2025 ---------------- */

export type RentaMilestone = {
  day: string;
  month: string;
  icon: "calendar" | "invoice" | "check";
  title: string;
  desc: string;
};

export const RENTA_MILESTONES: RentaMilestone[] = [
  {
    day: "01",
    month: "MAR",
    icon: "calendar",
    title: "Inicio del proceso",
    desc: "Se abre la Operación Renta: revisamos tus antecedentes y proyectamos el resultado.",
  },
  {
    day: "08",
    month: "MAR",
    icon: "invoice",
    title: "Con devolución",
    desc: "Cierre para presentar con devolución anticipada por vía electrónica.",
  },
  {
    day: "25",
    month: "MAR",
    icon: "check",
    title: "Cierre del proceso",
    desc: "Último plazo para declarar sin devolución. Nosotros lo dejamos presentado antes.",
  },
];

/* ---------------- Reseñas de clientes ---------------- */

export type Review = {
  id: string;
  name: string;
  email?: string;
  rating: number;
  comment: string;
  ts: number;
};

export function makeSeedReviews(): Review[] {
  return [];
}

/* ---------------- Calendario tributario ---------------- */

export type TaxDue = {
  id?: string;
  code: string;
  label: string;
  freq: string;
  date: Date;
  badge?: string;
};

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function nextMonthly(today: Date, day: number) {
  const d = new Date(today.getFullYear(), today.getMonth(), day);
  if (d < today) d.setMonth(d.getMonth() + 1);
  return d;
}

function nextAnnual(today: Date, month: number, day: number) {
  let d = new Date(today.getFullYear(), month - 1, day);
  if (d < today) d = new Date(today.getFullYear() + 1, month - 1, day);
  return d;
}

export function getUpcomingDeadlines(now = new Date()): TaxDue[] {
  const today = startOfDay(now);
  const list: TaxDue[] = [
    {
      id: "f29-12",
      code: "F29",
      label: "Declaración y pago de IVA — Boleta electrónica / No facturadores",
      freq: "Mensual · Día 12",
      date: nextMonthly(today, 12),
      badge: "OBLIGATORIO INCLUSO SIN MOVIMIENTO",
    },
    {
      id: "f50-12",
      code: "F50",
      label: "Impuestos específicos, retenciones y PPM Voluntario (Pago Provisional Mensual)",
      freq: "Mensual · Día 12",
      date: nextMonthly(today, 12),
    },
    {
      id: "prev",
      code: "PREV",
      label: "Pago de cotizaciones previsionales (Previred)",
      freq: "Mensual · Día 13",
      date: nextMonthly(today, 13),
    },
    {
      id: "f29-20",
      code: "F29",
      label: "Declaración y pago de IVA — Factura electrónica",
      freq: "Mensual · Día 20",
      date: nextMonthly(today, 20),
      badge: "OBLIGATORIO INCLUSO SIN MOVIMIENTO",
    },
    {
      id: "dj",
      code: "DJ",
      label: "Declaraciones juradas de Renta (DJ 1887, 1888…)",
      freq: "Anual · 1-31 Mar",
      date: nextAnnual(today, 3, 1),
    },
    {
      id: "f22",
      code: "F22",
      label: "Operación Renta — declaración anual F22",
      freq: "Anual · 1-30 Abr",
      date: nextAnnual(today, 4, 1),
    },
  ];
  return list.sort((a, b) => a.date.getTime() - b.date.getTime());
}

export function daysUntil(date: Date, now = new Date()) {
  const today = startOfDay(now);
  return Math.round((date.getTime() - today.getTime()) / 86400000);
}

export function formatDayMonth(date: Date) {
  return new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "long",
  }).format(date);
}

export function formatDay(date: Date) {
  return new Intl.DateTimeFormat("es-CL", { day: "2-digit" }).format(date);
}

export function formatMonthShort(date: Date) {
  return new Intl.DateTimeFormat("es-CL", { month: "short" })
    .format(date)
    .replace(".", "")
    .toUpperCase();
}

/* ---------------- Hero ledger ---------------- */

export type LedgerEntry = {
  folio: string;
  fecha: string;
  concepto: string;
  debe: number;
  haber: number;
  ok?: boolean;
};

export const LEDGER_ENTRIES: LedgerEntry[] = [
  {
    folio: "001",
    fecha: "02 ABR",
    concepto: "Factura electrónica N° 1.024",
    debe: 1190000,
    haber: 0,
  },
  {
    folio: "002",
    fecha: "05 ABR",
    concepto: "Pago proveedor — insumos",
    debe: 0,
    haber: 436000,
  },
  {
    folio: "003",
    fecha: "08 ABR",
    concepto: "Remuneraciones del mes",
    debe: 2850000,
    haber: 0,
  },
  {
    folio: "004",
    fecha: "12 ABR",
    concepto: "F29 presentado al SII",
    debe: 0,
    haber: 654500,
    ok: true,
  },
];

export const LEDGER_BALANCE =
  LEDGER_ENTRIES.reduce((s, e) => s + e.debe, 0) -
  LEDGER_ENTRIES.reduce((s, e) => s + e.haber, 0);
