export const NAV = [
  { href: "#inicio", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#calendario", label: "Calendario" },
  { href: "#resenas", label: "Reseñas" },
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
export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "O'Higgins 480, Quillota, Chile"
)}`;

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
  /** Texto del botón de reserva (lleva a #contacto). */
  cta: string;
  /** Mensaje pre-llenado para cotizar por WhatsApp. */
  wa: string;
};

export const SERVICES: Service[] = [
  {
    id: "constitucion",
    code: "SRV-01",
    icon: "stamp",
    title: "Constitución de Empresas",
    desc: "Acompañamos la creación de tu empresa de principio a fin, con todos los trámites en regla.",
    bullets: [
      "Constitución de empresas",
      "Inicio de actividades ante el SII",
      "Obtención de patentes municipales",
      "Trámites y resoluciones sanitarias ante SEREMI de Salud",
    ],
    cta: "Reserva tu asesoría para Constitución de Empresa",
    wa: "Hola Audicontab, me gustaría cotizar la constitución de mi empresa.",
  },
  {
    id: "asesoria",
    code: "SRV-02",
    icon: "chart",
    title: "Asesoría Contable",
    desc: "Servicios contables y tributarios para empresas y personas.",
    bullets: [],
    cta: "Agenda tu asesoría contable y tributaria",
    wa: "Hola Audicontab, me gustaría agendar una asesoría contable y tributaria.",
  },
  {
    id: "facturacion",
    code: "SRV-03",
    icon: "invoice",
    title: "Facturación Electrónica",
    desc: "Implementación y capacitación en el sistema de facturación electrónica a través de la plataforma del SII.",
    bullets: [],
    cta: "Reserva tu hora para Facturación Electrónica",
    wa: "Hola Audicontab, me gustaría cotizar la implementación de facturación electrónica del SII.",
  },
  {
    id: "rrhh",
    code: "SRV-04",
    icon: "people",
    title: "Recursos Humanos (RRHH)",
    desc: "Gestionamos el ecosistema laboral de tu empresa junto a la TGR (Tesorería General), con las cotizaciones siempre al día.",
    bullets: [
      "Liquidaciones de sueldo",
      "Contratos y anexos de trabajo",
      "Finiquitos y licencias médicas",
      "Pago de cotizaciones previsionales al día",
    ],
    cta: "Agenda tu gestión de remuneraciones y RRHH",
    wa: "Hola Audicontab, me gustaría cotizar la gestión de Recursos Humanos de mi empresa.",
  },
  {
    id: "renta",
    code: "SRV-05",
    icon: "calendar",
    title: "Operación Renta (F22)",
    desc: "Preparación, revisión de declaraciones juradas y presentación del Formulario 22 (F22) ante el SII dentro del plazo legal.",
    bullets: [
      "Revisamos tus antecedentes y proyectamos el resultado",
      "Ingreso de declaraciones juradas a la plataforma del SII",
      "Presentación del F22 dentro del plazo legal",
    ],
    cta: "Reserva tu hora para Declaración de Renta",
    wa: "Hola Audicontab, me gustaría cotizar mi Declaración de Renta (F22).",
  },
];

/* ---------------- Ticker ---------------- */

export const TICKER_ITEMS = [
  "F29 · IVA mensual",
  "F50 · PPM Voluntario",
  "Operación Renta",
  "F22 · Declaración anual",
  "Facturación electrónica",
  "Boletas de honorarios",
  "Remuneraciones · TGR · RRHH",
  "DJ 1887 · Renta",
  "Inicio de actividades",
];

/* ---------------- Operación Renta 2027 ---------------- */

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
    title: "Apertura del proceso",
    desc: "Revisión de antecedentes contables e ingreso de declaraciones juradas a la plataforma del SII.",
  },
  {
    day: "08",
    month: "MAR",
    icon: "invoice",
    title: "Con devolución anticipada",
    desc: "Apertura de Operación Renta: cálculo y envío del Formulario 22 (F22) con devolución anticipada.",
  },
  {
    day: "25",
    month: "MAR",
    icon: "check",
    title: "Cierre sin devolución",
    desc: "Último plazo para declarar sin devolución anticipada. Lo dejamos presentado antes.",
  },
  {
    day: "30",
    month: "ABR",
    icon: "calendar",
    title: "Cierre oficial del proceso",
    desc: "Cierre oficial de la Operación Renta y del plazo legal para presentar el F22 ante el SII.",
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

const DAY = 86400000;

export function makeSeedReviews(now = Date.now()): Review[] {
  return [
    {
      id: "seed-1",
      name: "Rodrigo Salinas",
      rating: 5,
      comment:
        "Llevábamos años atrasados con el SII y en pocos meses teníamos todo regularizado. Hoy duermo tranquilo cada 12 del mes.",
      ts: now - 12 * DAY,
    },
    {
      id: "seed-2",
      name: "Carolina Méndez",
      rating: 5,
      comment:
        "Nos formalizaron la empresa completa en dos semanas y explican todo sin tecnicismos. La facturación electrónica quedó funcionando al tiro.",
      ts: now - 34 * DAY,
    },
    {
      id: "seed-3",
      name: "Jorge Olivares",
      rating: 4,
      comment:
        "La Operación Renta con ellos es otra cosa: me avisaron antes que el SII y la presentación quedó dentro de plazo. Se agradece la puntualidad.",
      ts: now - 61 * DAY,
    },
  ];
}

/* ---------------- Calendario tributario ---------------- */

export type TaxDue = {
  code: string;
  label: string;
  freq: string;
  /** Próximo vencimiento (o inicio del período, si es anual). */
  date: Date;
  /** Fin del período, solo para vencimientos anuales con rango. */
  periodEnd?: Date;
  /** Etiqueta grande del día (ej. "1–31"); si no, se usa el día de `date`. */
  dayLabel?: string;
  /** Nota adicional del experto contable. */
  note?: string;
};

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function nextMonthly(today: Date, day: number) {
  const d = new Date(today.getFullYear(), today.getMonth(), day);
  if (d < today) d.setMonth(d.getMonth() + 1);
  return d;
}

/** Período anual: usa el año en curso si el período aún no termina; si no, el siguiente. */
function annualPeriod(today: Date, month: number, startDay: number, endDay: number) {
  const y = today.getFullYear();
  const endThis = new Date(y, month - 1, endDay);
  if (today <= endThis) {
    return { start: new Date(y, month - 1, startDay), end: endThis };
  }
  return {
    start: new Date(y + 1, month - 1, startDay),
    end: new Date(y + 1, month - 1, endDay),
  };
}

export function getUpcomingDeadlines(now = new Date()): TaxDue[] {
  const today = startOfDay(now);
  const dj = annualPeriod(today, 3, 1, 31);
  const f22 = annualPeriod(today, 4, 1, 30);
  const list: TaxDue[] = [
    {
      code: "F29",
      label:
        "Declaración y pago de IVA (Contribuyentes no facturadores electrónicos / Boletas)",
      freq: "Mensual · día 12 (de cada mes)",
      date: nextMonthly(today, 12),
      note: "Obligatorio incluso sin movimiento",
    },
    {
      code: "PREV",
      label: "Pago de cotizaciones previsionales (Previred)",
      freq: "Mensual · día 12 (de cada mes)",
      date: nextMonthly(today, 12),
    },
    {
      code: "F29",
      label:
        "Declaración y pago de IVA (Contribuyentes facturadores electrónicos por Internet)",
      freq: "Mensual · día 20 (de cada mes)",
      date: nextMonthly(today, 20),
      note: "Obligatorio incluso sin movimiento",
    },
    {
      code: "F50",
      label:
        "Declaración y pago de impuestos específicos, retenciones y PPM Voluntario (Pago Provisional Mensual)",
      freq: "Mensual · día 12 (de cada mes)",
      date: nextMonthly(today, 12),
    },
    {
      code: "DJ",
      label: "Declaraciones Juradas de Renta (DJ 1887, 1888…)",
      freq: "Anual · 1 al 31 de marzo",
      date: dj.start,
      periodEnd: dj.end,
      dayLabel: "1–31",
    },
    {
      code: "F22",
      label: "Operación Renta — Formulario 22 (F22)",
      freq: "Anual · 1 al 30 de abril",
      date: f22.start,
      periodEnd: f22.end,
      dayLabel: "1–30",
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
