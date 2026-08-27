import { useEffect, useRef, useState } from "react";
import { formatCLP, waLink } from "../data/site";
import {
  ArrowIcon,
  CheckIcon,
  WhatsAppIcon,
} from "./icons";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  options?: string[];
  ctaWhatsApp?: string;
  isAiGenerated?: boolean;
  ts: number;
};

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "¡Hola! 👋 Soy el **Asistente Tributario de Audicontab**.\n\nPuedo responder cualquier duda sobre impuestos chilenos, IVA F29, boletas de honorarios, creación de empresas SpA/EIRL o calcular montos al instante.\n\n¿En qué te puedo orientar hoy?",
  options: [
    "💼 ¿Cómo crear una empresa SpA?",
    "📅 ¿Cuándo vence el IVA F29?",
    "🧾 Calcular boleta de honorarios",
    "📊 ¿Qué régimen tributario me conviene?",
    "💬 Cotizar con un contador",
  ],
  ts: Date.now(),
};

// Componente para renderizar Markdown limpio (negritas **, viñetas, saltos de línea) sin asteriscos crudos
function FormattedMessage({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1.5 leading-relaxed text-[13px]">
      {lines.map((line, lIdx) => {
        const trimmed = line.trim();
        if (!trimmed) {
          return <div key={lIdx} className="h-1" />;
        }

        // Parsear viñetas
        const isBullet = trimmed.startsWith("• ") || trimmed.startsWith("- ") || trimmed.startsWith("* ");
        const content = isBullet ? trimmed.slice(2) : line;

        // Parsear negritas con formato **texto**
        const parts = content.split(/(\*\*.*?\*\*)/g);

        return (
          <p key={lIdx} className={`break-words ${isBullet ? "pl-3 flex items-start gap-1.5" : ""}`}>
            {isBullet && <span className="text-brass-400 font-bold shrink-0">•</span>}
            <span>
              {parts.map((part, pIdx) => {
                if (part.startsWith("**") && part.endsWith("**")) {
                  return (
                    <strong key={pIdx} className="font-bold text-paper-50 underline decoration-brass-400/40 decoration-1 underline-offset-2">
                      {part.slice(2, -2)}
                    </strong>
                  );
                }
                return part;
              })}
            </span>
          </p>
        );
      })}
    </div>
  );
}

// Extractor de números en el texto (ej: "800.000", "800000", "2 millones", "1.5m", "800 lucas")
function extractNumber(text: string): number | null {
  const clean = text.toLowerCase();

  const millonMatch = clean.match(/([\d.,]+)\s*(?:millones|millon|m\b)/i);
  if (millonMatch) {
    const num = parseFloat(millonMatch[1].replace(/\./g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000000);
  }

  const lucasMatch = clean.match(/([\d.,]+)\s*lucas?/i);
  if (lucasMatch) {
    const num = parseFloat(lucasMatch[1].replace(/\./g, "").replace(",", "."));
    if (!isNaN(num)) return Math.round(num * 1000);
  }

  const numMatch = clean.match(/(?:\$|\b)(\d{1,3}(?:\.\d{3})+|\d{4,9})\b/);
  if (numMatch) {
    const num = parseInt(numMatch[1].replace(/\./g, ""), 10);
    if (!isNaN(num) && num > 0) return num;
  }

  return null;
}

// Conexión con Google Gemini API (Modelo Generativo 100% gratuito)
async function callGeminiApi(apiKey: string, history: Message[], userPrompt: string): Promise<string> {
  const systemPrompt = `Eres el Asistente de IA oficial de "Audicontab Limitada", consultora contable y tributaria en Quillota, Chile (Oficina: O'Higgins 480, of 15 / WhatsApp: +56 9 5424 7306).
Tus respuestas deben ser:
1. Extremadamente claras, amables, profesionales y precisas sobre la legislación y normativa del SII (Servicio de Impuestos Internos de Chile) y Previred.
2. Formato enriquecido usando negritas (**concepto importante**) y viñetas ordenadas (•).
3. Si el usuario menciona montos, realiza cálculos numéricos claros en pesos chilenos ($ CLP).
4. Explica siempre en lenguaje sencillo y amigable, sin tecnicismos confusos sin explicar.
5. Al final, invita sutilmente a contactar a un contador de Audicontab para gestionar su caso.`;

  const contents = [
    { role: "user", parts: [{ text: systemPrompt }] },
    { role: "model", parts: [{ text: "Entendido. Soy el Asistente Tributario de Audicontab Limitada en Quillota, listo para orientar en impuestos y contabilidad chilena de forma clara y precisa." }] },
    ...history.slice(-4).map((m) => ({
      role: m.sender === "user" ? "user" : "model",
      parts: [{ text: m.text }],
    })),
    { role: "user", parts: [{ text: userPrompt }] },
  ];

  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message || `Error (${res.status})`);
  }

  const data = await res.json();
  const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!answer) throw new Error("Respuesta vacía");
  return answer;
}

// Motor de Inteligencia Tributaria Avanzada Local
function generateSmartResponse(query: string): { text: string; options?: string[]; ctaWhatsApp?: string } {
  const q = query.toLowerCase().trim();
  const extractedAmount = extractNumber(q);

  // --- CÁLCULOS DINÁMICOS EN EL CHAT ---

  // Boleta de Honorarios
  if (
    (q.includes("boleta") || q.includes("honorario") || q.includes("retencion") || q.includes("retención")) &&
    extractedAmount
  ) {
    const tasa = 0.145; // 2025
    if (q.includes("liquido") || q.includes("líquido") || q.includes("recibir") || q.includes("bolsillo")) {
      const bruto = Math.round(extractedAmount / (1 - tasa));
      const retencion = bruto - extractedAmount;
      return {
        text: `📊 **Cálculo de Boleta de Honorarios (Retención SII 14.50%):**\n\n• **Monto Líquido al bolsillo:** ${formatCLP(extractedAmount)}\n• **Retención que pagará al SII:** - ${formatCLP(retencion)}\n• 👉 **Monto Bruto a emitir:** **${formatCLP(bruto)}**\n\n💡 *Para recibir ${formatCLP(extractedAmount)} en tu cuenta bancaria, debes emitir tu boleta por ${formatCLP(bruto)}.*`,
        options: ["¿Cuándo vence el IVA F29?", "¿Cómo crear una empresa SpA?", "Cotizar con un contador"],
        ctaWhatsApp: `Hola Audicontab, calculé una boleta líquida de ${formatCLP(extractedAmount)} (Bruto ${formatCLP(bruto)}) y me gustaría consultar.`,
      };
    } else {
      const retencion = Math.round(extractedAmount * tasa);
      const liquido = extractedAmount - retencion;
      return {
        text: `📊 **Cálculo de Boleta de Honorarios (Retención SII 14.50%):**\n\n• **Monto Bruto emitido:** ${formatCLP(extractedAmount)}\n• **Retención SII descontada:** - ${formatCLP(retencion)}\n• 👉 **Monto Líquido que recibirás:** **${formatCLP(liquido)}**\n\n💡 *El SII retiene ${formatCLP(retencion)} como abono para tu Operación Renta anual.*`,
        options: ["¿Cómo calculo desde el Líquido?", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
        ctaWhatsApp: `Hola Audicontab, calculé una boleta bruta de ${formatCLP(extractedAmount)} (Líquido ${formatCLP(liquido)}) y me gustaría asesoría.`,
      };
    }
  }

  // IVA 19%
  if ((q.includes("iva") || q.includes("neto") || q.includes("factura") || q.includes("desglose")) && extractedAmount) {
    if (q.includes("total") || q.includes("bruto") || q.includes("con iva")) {
      const neto = Math.round(extractedAmount / 1.19);
      const iva = extractedAmount - neto;
      return {
        text: `🧾 **Desglose de Factura desde Total con IVA:**\n\n• **Monto Total Facturado:** ${formatCLP(extractedAmount)}\n• **Valor Neto (sin IVA):** ${formatCLP(neto)}\n• **IVA Débito (19%):** ${formatCLP(iva)}`,
        options: ["¿Cuándo vence el IVA F29?", "Probar Simulador F29", "Cotizar contabilidad mensual"],
        ctaWhatsApp: `Hola Audicontab, tengo una consulta sobre facturación de ${formatCLP(extractedAmount)}.`,
      };
    } else {
      const iva = Math.round(extractedAmount * 0.19);
      const total = extractedAmount + iva;
      return {
        text: `🧾 **Cálculo de IVA (19%) desde Valor Neto:**\n\n• **Valor Neto:** ${formatCLP(extractedAmount)}\n• **IVA (19%):** + ${formatCLP(iva)}\n• 👉 **Total Facturado con IVA:** **${formatCLP(total)}**`,
        options: ["¿Cuándo vence el IVA F29?", "Calcular boleta de honorarios", "Hablar con un contador"],
        ctaWhatsApp: `Hola Audicontab, coticé un monto neto de ${formatCLP(extractedAmount)} (+ IVA ${formatCLP(total)}) y me gustaría asesoría.`,
      };
    }
  }

  // Creación de Empresas / SpA / EIRL
  if (
    q.includes("crear") ||
    q.includes("formaliz") ||
    q.includes("spa") ||
    q.includes("eirl") ||
    q.includes("constitu") ||
    q.includes("inicio de actividades") ||
    q.includes("empresa")
  ) {
    return {
      text: "🚀 **Formalización y Creación de Empresas en Chile:**\n\nTe asesoramos en todo el ciclo de principio a fin:\n\n• **1. Elección de estructura:** **SpA** (Sociedad por Acciones) para máxima flexibilidad o **EIRL**.\n• **2. Constitución legal:** Redacción de estatutos y obtención del RUT de la empresa.\n• **3. Inicio de Actividades ante el SII:** Verificación de actividades y acreditación de domicilio tributario.\n• **4. Facturación electrónica y Patente municipal.**\n\n⏱️ *Plazo habitual:* 2 a 4 días hábiles. ¡Nosotros gestionamos todo el trámite!",
      options: ["¿Qué régimen tributario me conviene?", "¿Cuándo vence el IVA F29?", "Cotizar formalización de empresa"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar la formalización y creación de mi empresa.",
    };
  }

  // IVA y F29
  if (
    q.includes("iva") ||
    q.includes("f29") ||
    q.includes("formulario 29") ||
    q.includes("debito") ||
    q.includes("credito") ||
    q.includes("atrasad") ||
    q.includes("multa")
  ) {
    return {
      text: "📅 **Declaración y Pago de IVA — Formulario 29 (F29):**\n\n• **Día 12 de cada mes:** Boleta electrónica / No facturadores (**Obligatorio incluso sin movimiento**).\n• **Día 20 de cada mes:** Factura electrónica (**Obligatorio incluso sin movimiento**).\n\n⚠️ **¿Tienes meses sin declarar o multas?**\nRevisamos tus libros contables, rectificamos ante el SII y gestionamos la condonación de intereses.",
      options: ["Probar el Simulador F29", "¿Cuánto retiene el SII en boletas?", "Regularizar F29 con Audicontab"],
      ctaWhatsApp: "Hola Audicontab, necesito regularizar y declarar mi IVA F29 mensual.",
    };
  }

  // Boletas de Honorarios
  if (
    q.includes("boleta") ||
    q.includes("honorario") ||
    q.includes("retencion") ||
    q.includes("retención") ||
    q.includes("14.5") ||
    q.includes("15.25")
  ) {
    return {
      text: "📈 **Tasa de Retención del SII en Boletas de Honorarios:**\n\n• **Año 2025:** **14.50%**\n• **Año 2026:** **15.25%**\n• **Año 2027:** **16.00%**\n• **Año 2028 en adelante:** **17.00%**\n\n💡 *Puedes escribir un monto aquí (ej: 'calcula boleta de 800.000 líquidos') para ver el desglose al instante.*",
      options: ["Calcular boleta de $500.000", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, tengo dudas sobre emisión de boletas de honorarios y retención del SII.",
    };
  }

  // Regímenes Tributarios
  if (q.includes("regimen") || q.includes("régimen") || q.includes("pro pyme") || q.includes("14 d")) {
    return {
      text: "⚖️ **Regímenes Tributarios para Pymes en Chile (Art. 14 D):**\n\n• **Pro Pyme General (14 D3):**\n  - Paga 25% de impuesto corporativo.\n  - Traslada el 100% del crédito tributario a los socios.\n  - Recomendado si reinviertes utilidades.\n\n• **Pro Pyme Transparente (14 D8):**\n  - **La empresa no paga impuesto de 1ra categoría**.\n  - Las utilidades tributan directamente en el Global Complementario de los dueños.\n  - Recomendado para servicios y profesionales.",
      options: ["¿Cómo crear una empresa SpA?", "Cotizar asesoría contable", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría asesoría para elegir el mejor régimen tributario para mi empresa.",
    };
  }

  // Operación Renta
  if (q.includes("renta") || q.includes("f22") || q.includes("declaracion jurada") || q.includes("devolucion")) {
    return {
      text: "📑 **Operación Renta Anual (F22 y Declaraciones Juradas):**\n\n• **Marzo:** Presentación de Declaraciones Juradas obligatorias (DJ 1887 sueldos, 1888, 1948).\n• **Abril:** Presentación del Formulario 22 (F22) para empresas y personas.\n\n🛡️ *Revisamos tus balances para maximizar tu devolución y asegurar que no tengas observaciones en el SII.*",
      options: ["Reservar hora para Operación Renta", "¿Qué régimen tributario me conviene?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría agendar la revisión de mi Operación Renta F22.",
    };
  }

  // Saludos
  if (q === "hola" || q === "buenas" || q === "buenos dias" || q === "buenas tardes") {
    return {
      text: "¡Hola! Un gusto saludarte. 😊\n\nSoy el asistente tributario de Audicontab. Cuéntame qué necesitas saber sobre tu empresa, impuestos ante el SII, boletas o contabilidad mensual.",
      options: [
        "💼 ¿Cómo crear una empresa SpA?",
        "📅 ¿Cuándo vence el IVA F29?",
        "🧾 ¿Cuánto retiene el SII en boletas?",
        "💬 Hablar con un contador",
      ],
      ctaWhatsApp: "Hola Audicontab, me gustaría realizar una consulta contable.",
    };
  }

  // Respuesta general
  return {
    text: `Entiendo tu consulta sobre "${query}".\n\nEn **Audicontab Limitada** resolvemos todas tus obligaciones ante el SII, IVA F29, remuneraciones y balances con atención cercana y profesional.\n\n¿Te gustaría que un contador auditor revise tu caso en detalle por WhatsApp o prefieres consultar otro tema?`,
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
  const [geminiApiKey, setGeminiApiKey] = useState<string>(() => {
    try {
      return window.localStorage.getItem("audicontab_gemini_key") || "";
    } catch {
      return "";
    }
  });
  const [showConfig, setShowConfig] = useState(false);
  const [tempKey, setTempKey] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSaveKey = () => {
    const k = tempKey.trim();
    setGeminiApiKey(k);
    try {
      window.localStorage.setItem("audicontab_gemini_key", k);
    } catch {
      /* sin persistencia */
    }
    setShowConfig(false);
  };

  const handleSend = async (textToSend?: string) => {
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

    // Si tiene clave de Google Gemini API, consulta la IA generativa real
    if (geminiApiKey) {
      try {
        const aiText = await callGeminiApi(geminiApiKey, messages, text);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: aiText,
          isAiGenerated: true,
          ctaWhatsApp: `Hola Audicontab, estuve conversando con su IA sobre: ${text}`,
          ts: Date.now(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn("Error en Gemini API, usando motor tributario local:", err);
      }
    }

    // Motor de respuesta experto tributario local
    setTimeout(() => {
      const resp = generateSmartResponse(text);
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
    }, 450);
  };

  const handleOptionClick = (option: string) => {
    if (option.includes("herramientas") || option.includes("Simulador")) {
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
      {/* Botón flotante discreto en esquina inferior derecha */}
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

          {/* Tooltip hover */}
          <span className="pointer-events-none absolute bottom-full mb-2.5 whitespace-nowrap border border-brass-400/40 bg-ink-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brass-300 opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-1">
            Asistente IA Tributario {geminiApiKey ? "(Gemini Pro)" : ""}
          </span>
        </button>
      </div>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[70] flex h-[540px] max-h-[82vh] w-[92vw] max-w-[390px] flex-col overflow-hidden border-2 border-brass-400/60 bg-ink-950 text-paper-50 shadow-[0_24px_70px_-15px_rgba(6,14,26,0.95)] sm:right-6">
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
                <div className="flex items-center gap-1.5">
                  <p className="font-display text-sm font-bold text-paper-50">Audicontab IA</p>
                  {geminiApiKey && (
                    <span className="bg-brass-400/20 text-brass-300 border border-brass-400/40 text-[9px] font-mono px-1 rounded">
                      Gemini
                    </span>
                  )}
                </div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-brass-300">
                  Asesoría Tributaria Activa
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  setTempKey(geminiApiKey);
                  setShowConfig(!showConfig);
                }}
                title="Configurar clave Gemini IA (Gratis)"
                className="p-1.5 text-mist-400 transition-colors hover:text-paper-100"
              >
                ⚙️
              </button>
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

          {/* Modal de Configuración Clave Gemini Gratuita */}
          {showConfig && (
            <div className="border-b border-paper-50/15 bg-ink-900 p-3.5 text-xs">
              <p className="font-bold text-paper-50 mb-1">Activar Google Gemini AI (100% Gratis):</p>
              <p className="text-mist-400 mb-2 leading-tight">
                Obtén tu clave gratis en{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brass-300 underline"
                >
                  aistudio.google.com
                </a>
              </p>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="Pega tu API Key de Gemini..."
                  className="flex-1 bg-ink-950 border border-paper-50/20 px-2.5 py-1.5 text-paper-50 font-mono text-[11px] outline-none focus:border-brass-400"
                />
                <button
                  type="button"
                  onClick={handleSaveKey}
                  className="bg-brass-500 hover:bg-brass-400 px-3 py-1.5 font-mono text-[11px] font-bold text-paper-50"
                >
                  Guardar
                </button>
              </div>
            </div>
          )}

          {/* Área de Mensajes con Formateador de Markdown */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[90%] px-3.5 py-2.5 ${
                    m.sender === "user"
                      ? "bg-brass-500 text-paper-50 rounded-tl-xl rounded-tr-sm rounded-bl-xl font-medium"
                      : "border border-paper-50/15 bg-ink-900/95 text-paper-100 rounded-tr-xl rounded-tl-sm rounded-br-xl shadow-sm"
                  }`}
                >
                  <FormattedMessage text={m.text} />
                </div>

                {/* Botón CTA directo a WhatsApp */}
                {m.ctaWhatsApp && (
                  <a
                    href={waLink(m.ctaWhatsApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-2 border border-[#4ade80]/40 bg-[#4ade80]/15 px-3 py-1.5 font-mono text-[10.5px] font-semibold text-[#86efac] transition-all hover:bg-[#4ade80]/25"
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
                placeholder="Escribe tu duda o monto (ej: boleta $850.000)…"
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
