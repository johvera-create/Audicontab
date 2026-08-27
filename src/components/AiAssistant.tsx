import { useEffect, useRef, useState } from "react";
import { formatCLP, waLink } from "../data/site";
import {
  ArrowIcon,
  CheckIcon,
  InvoiceIcon,
  PercentIcon,
  WhatsAppIcon,
} from "./icons";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  options?: string[];
  ctaWhatsApp?: string;
  ts: number;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "¡Hola! 👋 Soy el **Asistente Virtual de Audicontab**.\n\nPuedo responder cualquier duda sobre impuestos chilenos, IVA F29, formalización de empresas, Previred o calcular montos al instante.\n\n¿En qué te puedo ayudar?",
  options: [
    "💼 ¿Cómo crear una empresa SpA?",
    "📅 ¿Cuándo vence el IVA F29?",
    "🧾 Calcular boleta de honorarios",
    "📊 ¿Qué régimen tributario me conviene?",
    "💬 Cotizar con un contador",
  ],
  ts: Date.now(),
};

// Extractor de números en el texto (ej: "800.000", "800000", "2 millones", "1.5m", "800 lucas")
function extractNumber(text: string): number | null {
  const clean = text.toLowerCase();
  
  // "X millones" o "X millon"
  const millonMatch = clean.match(/([\d.,]+)\s*(?:millones|millon|m\b)/i);
  if (millonMatch) {
    const num = parseFloat(millonMatch[1].replace(/\./g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000000);
  }

  // "X lucas"
  const lucasMatch = clean.match(/([\d.,]+)\s*lucas?/i);
  if (lucasMatch) {
    const num = parseFloat(lucasMatch[1].replace(/\./g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000);
  }

  // Números directos con o sin puntos (ej: 850000, 850.000, $1.200.000)
  const numMatch = clean.match(/(?:\$|\b)(\d{1,3}(?:\.\d{3})+|\d{4,9})\b/);
  if (numMatch) {
    const num = parseInt(numMatch[1].replace(/\./g, ""), 10);
    if (!isNaN(num) && num > 0) return num;
  }

  return null;
}

// Motor de Inteligencia Tributaria Avanzada
function generateSmartResponse(query: string, history: Message[]): { text: string; options?: string[]; ctaWhatsApp?: string } {
  const q = query.toLowerCase().trim();
  const extractedAmount = extractNumber(q);

  // --- 1. CÁLCULOS EN VIVO DENTRO DEL CHAT ---

  // Cálculo de Boleta de Honorarios en vivo
  if (
    (q.includes("boleta") || q.includes("honorario") || q.includes("retencion") || q.includes("retención")) &&
    extractedAmount
  ) {
    const tasa = 0.145; // Tasa oficial 2025
    const tasaDisplay = "14.50%";
    
    // Si menciona "liquido" o "al bolsillo"
    if (q.includes("liquido") || q.includes("líquido") || q.includes("recibir") || q.includes("bolsillo")) {
      const bruto = Math.round(extractedAmount / (1 - tasa));
      const retencion = bruto - extractedAmount;
      return {
        text: `📊 **Cálculo de Boleta de Honorarios (${tasaDisplay} retención SII):**\n\n• **Monto Líquido deseado:** ${formatCLP(extractedAmount)}\n• **Retención que pagará al SII:** - ${formatCLP(retencion)}\n• 👉 **Monto Bruto a emitir:** **${formatCLP(bruto)}**\n\n💡 *Para recibir ${formatCLP(extractedAmount)} en tu cuenta, debes emitir tu boleta por ${formatCLP(bruto)}.*`,
        options: ["¿Cuándo vence el IVA F29?", "¿Cómo crear una empresa SpA?", "Cotizar con un contador"],
        ctaWhatsApp: `Hola Audicontab, calculé una boleta líquida de ${formatCLP(extractedAmount)} (Bruto ${formatCLP(bruto)}) y me gustaría consultar sus servicios.`,
      };
    } else {
      // Por defecto asume monto bruto
      const retencion = Math.round(extractedAmount * tasa);
      const liquido = extractedAmount - retencion;
      return {
        text: `📊 **Cálculo de Boleta de Honorarios (${tasaDisplay} retención SII):**\n\n• **Monto Bruto emitido:** ${formatCLP(extractedAmount)}\n• **Retención SII descontada:** - ${formatCLP(retencion)}\n• 👉 **Monto Líquido a recibir:** **${formatCLP(liquido)}**\n\n💡 *El SII retendrá ${formatCLP(retencion)} como pago provisional para tu Renta anual.*`,
        options: ["¿Cómo calculo desde líquido?", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
        ctaWhatsApp: `Hola Audicontab, calculé una boleta bruta de ${formatCLP(extractedAmount)} (Líquido ${formatCLP(liquido)}) y me gustaría asesoría.`,
      };
    }
  }

  // Cálculo de IVA (19%) en vivo
  if ((q.includes("iva") || q.includes("neto") || q.includes("factura") || q.includes("desglose")) && extractedAmount) {
    if (q.includes("total") || q.includes("bruto") || q.includes("con iva")) {
      const neto = Math.round(extractedAmount / 1.19);
      const iva = extractedAmount - neto;
      return {
        text: `🧾 **Desglose de Factura desde Total con IVA:**\n\n• **Monto Total:** ${formatCLP(extractedAmount)}\n• **Valor Neto:** ${formatCLP(neto)}\n• **IVA (19%):** ${formatCLP(iva)}`,
        options: ["¿Cuándo vence el IVA F29?", "Probar Simulador F29", "Cotizar contabilidad mensual"],
        ctaWhatsApp: `Hola Audicontab, tengo una consulta sobre facturación de ${formatCLP(extractedAmount)}.`,
      };
    } else {
      const iva = Math.round(extractedAmount * 0.19);
      const total = extractedAmount + iva;
      return {
        text: `🧾 **Cálculo de IVA (19%) desde Valor Neto:**\n\n• **Valor Neto:** ${formatCLP(extractedAmount)}\n• **IVA (19%):** + ${formatCLP(iva)}\n• 👉 **Total Facturado:** **${formatCLP(total)}**`,
        options: ["¿Cuándo vence el IVA F29?", "Calcular boleta de honorarios", "Hablar con un contador"],
        ctaWhatsApp: `Hola Audicontab, coticé un monto neto de ${formatCLP(extractedAmount)} (+ IVA ${formatCLP(total)}) y me gustaría asesoría.`,
      };
    }
  }

  // --- 2. CONSULTAS TRIBUTARIAS & CONTABLES ---

  // Creación de Empresas / Formalización / SpA / EIRL
  if (
    q.includes("crear") ||
    q.includes("formaliz") ||
    q.includes("spa") ||
    q.includes("eirl") ||
    q.includes("constitu") ||
    q.includes("inicio de actividades") ||
    q.includes("tu empresa en un dia") ||
    q.includes("emprender") ||
    q.includes("sociedad")
  ) {
    return {
      text: "🚀 **Formalización y Creación de Empresas en Chile:**\n\nTe asesoramos en todo el proceso paso a paso:\n\n1. **Estructura legal recomendada:** **SpA** (Sociedad por Acciones) para 1 o más socios con máxima flexibilidad, o **EIRL**.\n2. **Constitución en Tu Empresa en un Día:** Redacción de estatutos y obtención del RUT de la empresa.\n3. **Inicio de Actividades ante el SII:** Verificación de actividades y acreditación de domicilio tributario.\n4. **Facturación electrónica y Patente municipal.**\n\n⏱️ *Tiempo estimado:* 2 a 5 días hábiles. ¡Nosotros nos encargamos de todo el papeleo!",
      options: ["¿Qué régimen tributario me conviene?", "¿Cuándo vence el IVA F29?", "Cotizar formalización de empresa"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar la formalización y creación de mi empresa.",
    };
  }

  // IVA, F29, Declaraciones mensuales y multas
  if (
    q.includes("iva") ||
    q.includes("f29") ||
    q.includes("formulario 29") ||
    q.includes("debito") ||
    q.includes("credito") ||
    q.includes("atrasad") ||
    q.includes("multa") ||
    q.includes("remanente") ||
    q.includes("sin movimiento")
  ) {
    return {
      text: "📅 **Declaración y Pago de IVA — Formulario 29 (F29):**\n\n• **Día 12 de cada mes:** Boleta electrónica / No facturadores (*Obligatorio incluso sin movimiento*).\n• **Día 20 de cada mes:** Factura electrónica (*Obligatorio incluso sin movimiento*).\n\n⚠️ **¿Tienes declaraciones atrasadas o multas en el SII?**\nRevisamos tus libros de compra/venta, rectificamos tus formularios y solicitamos la condonación de intereses y multas ante el SII.",
      options: ["Probar el Simulador F29", "¿Cuánto retiene el SII en boletas?", "Regularizar F29 con Audicontab"],
      ctaWhatsApp: "Hola Audicontab, necesito regularizar y declarar mi IVA F29 mensual.",
    };
  }

  // Boletas de Honorarios, tasas y retenciones
  if (
    q.includes("boleta") ||
    q.includes("honorario") ||
    q.includes("retencion") ||
    q.includes("retención") ||
    q.includes("14.5") ||
    q.includes("15.25") ||
    q.includes("boletear")
  ) {
    return {
      text: "📈 **Retención del SII en Boletas de Honorarios en Chile:**\n\n• **Año 2025:** 14.50%\n• **Año 2026:** 15.25%\n• **Año 2027:** 16.00%\n• **Año 2028 en adelante:** 17.00%\n\n💡 *Puedes escribir un monto aquí en el chat (ej: 'calcula boleta de 600.000') o usar nuestra calculadora interactiva en la página.*",
      options: ["Calcular boleta de $500.000", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, tengo dudas sobre emisión de boletas de honorarios y retención del SII.",
    };
  }

  // Operación Renta, F22, Devoluciones
  if (
    q.includes("renta") ||
    q.includes("f22") ||
    q.includes("declaracion jurada") ||
    q.includes("dj 1887") ||
    q.includes("devolucion") ||
    q.includes("devolución") ||
    q.includes("impuesto a la renta")
  ) {
    return {
      text: "📑 **Operación Renta Anual (F22 y Declaraciones Juradas):**\n\n1. **Marzo:** Presentación de Declaraciones Juradas obligatorias (DJ 1887 sueldos, 1888 retenciones, 1948 retiros, etc.).\n2. **Abril:** Presentación del Formulario 22 (F22) para personas naturales y empresas.\n\n🛡️ *Con Audicontab revisamos tus gastos deducibles y balances para maximizar tu devolución y evitar observaciones del SII.*",
      options: ["Reservar hora para Operación Renta", "¿Qué régimen tributario me conviene?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría agendar la revisión de mi Operación Renta F22.",
    };
  }

  // Regímenes Tributarios Pro Pyme
  if (
    q.includes("regimen") ||
    q.includes("régimen") ||
    q.includes("pro pyme") ||
    q.includes("14 d3") ||
    q.includes("14 d8") ||
    q.includes("transparente") ||
    q.includes("general") ||
    q.includes("impuesto primera categoria")
  ) {
    return {
      text: "⚖️ **Regímenes Tributarios para Pymes en Chile (Art. 14 D):**\n\n• **Pro Pyme General (14 D3):**\n  - Paga 25% de impuesto corporativo (tasa pyme).\n  - Permite trasladar el 100% del crédito tributario a los socios.\n  - Ideal si reinviertes utilidades en la empresa.\n\n• **Pro Pyme Transparente (14 D8):**\n  - La empresa **NO paga impuesto de 1ra categoría**.\n  - Las utilidades tributan directamente en el Global Complementario de los dueños.\n  - Ideal para empresas de servicios o socios con tramos bajos de impuesto.\n\nTe ayudamos a simular y elegir el régimen más económico para tu caso.",
      options: ["¿Cómo crear una empresa SpA?", "Cotizar asesoría contable", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría asesoría para elegir el mejor régimen tributario para mi empresa.",
    };
  }

  // Sueldos, Remuneraciones, Contratos y Previred
  if (
    q.includes("sueldo") ||
    q.includes("remuneracion") ||
    q.includes("remuneración") ||
    q.includes("previred") ||
    q.includes("contrato") ||
    q.includes("finiquito") ||
    q.includes("trabajador") ||
    q.includes("empleado") ||
    q.includes("afp") ||
    q.includes("fonasa") ||
    q.includes("40 horas")
  ) {
    return {
      text: "👥 **Administración de Personal, Sueldos y Previred:**\n\n• Confección mensual de liquidaciones de sueldo con leyes sociales al día.\n• Declaración y pago oportuno en **Previred** (plazo día 13 de cada mes).\n• Redacción de contratos de trabajo, anexos por ley 40 horas y cartas de término.\n• Cálculo de finiquitos e indemnizaciones según normativa de la Dirección del Trabajo.",
      options: ["Cotizar gestión de sueldos y Previred", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar la gestión mensual de sueldos y Previred.",
    };
  }

  // Datos de Audicontab, Precios, Ubicación, Horarios
  if (
    q.includes("precio") ||
    q.includes("costo") ||
    q.includes("cuanto") ||
    q.includes("cuánto") ||
    q.includes("valor") ||
    q.includes("cotiz") ||
    q.includes("donde") ||
    q.includes("dónde") ||
    q.includes("ubicacion") ||
    q.includes("quillota") ||
    q.includes("horario") ||
    q.includes("telefono") ||
    q.includes("contacto")
  ) {
    return {
      text: "📍 **Audicontab Limitada — Servicios Contables en Quillota:**\n\n• **Dirección:** O'Higgins 480, oficina 15, Quillota, Chile.\n• **Horario:** Lunes a Viernes de 9:00 a 18:00 hrs.\n• **Cobertura:** Presencial en Quillota y la región, y 100% online para todo Chile.\n• **WhatsApp directo:** +56 9 5424 7306\n\n💰 *Nuestros planes mensuales son accesibles y transparentes según el volumen de facturación de tu negocio.*",
      options: ["Hablar con un contador por WhatsApp", "¿Cómo crear una empresa SpA?", "Ver herramientas interactivas"],
      ctaWhatsApp: "Hola Audicontab, me gustaría solicitar una cotización para mi negocio.",
    };
  }

  // Saludos cordiales
  if (q === "hola" || q === "buenas" || q === "buenos dias" || q === "buenas tardes" || q === "hola!" || q === "hola buenas") {
    return {
      text: "¡Hola! Un gusto saludarte. 😊\n\nSoy el asistente inteligente de Audicontab. Cuéntame qué necesitas saber sobre tu empresa, impuestos ante el SII, boletas o contabilidad mensual.",
      options: [
        "💼 ¿Cómo crear una empresa SpA?",
        "📅 ¿Cuándo vence el IVA F29?",
        "🧾 ¿Cuánto retiene el SII en boletas?",
        "💬 Hablar con un contador",
      ],
      ctaWhatsApp: "Hola Audicontab, me gustaría realizar una consulta contable.",
    };
  }

  // Respuesta adaptativa inteligente
  return {
    text: `Entiendo tu consulta sobre "${query}".\n\nEn **Audicontab Limitada** brindamos asesoría tributaria completa, declaraciones de IVA F29, renta y gestión contable para personas y empresas.\n\n¿Deseas que un contador auditor revise tu caso en detalle por WhatsApp o prefieres consultar otro tema?`,
    options: [
      "💬 Hablar con un contador por WhatsApp",
      "📅 ¿Cuándo vence el IVA F29?",
      "💼 ¿Cómo crear una empresa SpA?",
      "🧾 Calcular boleta de honorarios",
    ],
    ctaWhatsApp: `Hola Audicontab, tengo una consulta sobre: ${query}`,
  };
}

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      ts: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = generateSmartResponse(text, messages);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: resp.text,
        options: resp.options,
        ctaWhatsApp: resp.ctaWhatsApp,
        ts: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleOptionClick = (option: string) => {
    if (option.includes("Calculadora") || option.includes("herramientas")) {
      setIsOpen(false);
      window.location.hash = "#herramientas";
      return;
    }
    if (option.includes("Hablar con un contador") || option.includes("Cotizar")) {
      window.open(
        waLink("Hola Audicontab, estuve conversando con su Asistente Virtual y me gustaría recibir asesoría contable."),
        "_blank"
      );
      return;
    }
    handleSend(option.replace(/^[^\w¿]+/, ""));
  };

  return (
    <>
      {/* Botón flotante discreto y elegante en esquina inferior derecha */}
      <div className="fixed bottom-6 right-24 z-[60] flex items-center">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir Asistente IA de Audicontab"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-brass-400 bg-ink-900 shadow-[0_12px_32px_-8px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Logo */}
          <img
            src="/logo.png"
            alt="Audicontab AI"
            className="h-9 w-9 rounded-full object-cover shadow-sm bg-white"
          />

          {/* Insignia Online */}
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-ink-950 bg-[#22c55e]" />
          </span>

          {/* Tooltip hover limpio */}
          <span className="pointer-events-none absolute bottom-full mb-2.5 whitespace-nowrap border border-brass-400/40 bg-ink-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brass-300 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
            Asistente IA Tributario
          </span>
        </button>
      </div>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[70] flex h-[530px] max-h-[80vh] w-[92vw] max-w-[380px] flex-col overflow-hidden border-2 border-brass-400/60 bg-ink-950 text-paper-50 shadow-[0_24px_70px_-15px_rgba(6,14,26,0.95)] sm:right-6">
          {/* Header del Chat */}
          <div className="flex items-center justify-between border-b border-paper-50/15 bg-gradient-to-r from-ink-900 to-ink-950 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Audicontab"
                  className="h-8 w-8 rounded-full object-cover border border-white/20 bg-white"
                />
                <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full border border-ink-950 bg-[#22c55e]" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-paper-50">Audicontab IA</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass-300">
                  Asesoría Tributaria Activa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([INITIAL_MESSAGE])}
                title="Reiniciar chat"
                className="p-1.5 text-mist-400 transition-colors hover:text-paper-100"
              >
                <span className="font-mono text-[11px]">↺</span>
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-mist-400 transition-colors hover:text-paper-100"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3 text-[13px] leading-relaxed">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] px-3.5 py-2.5 whitespace-pre-line ${
                    m.sender === "user"
                      ? "bg-brass-500 text-paper-50 rounded-tl-xl rounded-tr-sm rounded-bl-xl font-medium"
                      : "border border-paper-50/15 bg-ink-900/90 text-paper-100 rounded-tr-xl rounded-tl-sm rounded-br-xl shadow-sm"
                  }`}
                >
                  {m.text}
                </div>

                {/* Botón CTA directo a WhatsApp */}
                {m.ctaWhatsApp && (
                  <a
                    href={waLink(m.ctaWhatsApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 border border-[#4ade80]/40 bg-[#4ade80]/15 px-3 py-1.5 font-mono text-[10px] font-semibold text-[#86efac] transition-all hover:bg-[#4ade80]/25"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 text-[#4ade80]" />
                    Hablar con un contador por WhatsApp
                  </a>
                )}

                {/* Opciones interactivas rápidas */}
                {m.options && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className="border border-brass-400/35 bg-ink-900/80 px-2.5 py-1 text-left font-mono text-[9.5px] text-brass-300 transition-all hover:bg-brass-400/20 hover:text-paper-50"
                      >
                        {opt} ➔
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 border border-paper-50/15 bg-ink-900 px-3 py-2 text-mist-400 rounded-md w-20">
                <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-brass-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input para escribir */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="border-t border-paper-50/15 bg-ink-900 p-2.5"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu duda (ej: boleta de $800.000)…"
                className="flex-1 border border-paper-50/20 bg-ink-950 px-3 py-2 font-mono text-xs text-paper-50 outline-none focus:border-brass-400 placeholder:text-mist-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center bg-brass-500 text-paper-50 transition-colors hover:bg-brass-400 disabled:opacity-40"
              >
                <ArrowIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
