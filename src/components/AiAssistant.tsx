import { useEffect, useRef, useState } from "react";
import { formatCLP, waLink, WHATSAPP_DISPLAY } from "../data/site";
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
  text: "¡Hola! 👋 Soy el Asistente Virtual de **Audicontab Limitada**. ¿En qué puedo orientarte hoy sobre impuestos, contabilidad o creación de empresas en Chile?",
  options: [
    "¿Cómo crear una empresa SpA?",
    "¿Cuándo vence el IVA F29?",
    "¿Cuánto retiene el SII en boletas?",
    "¿Qué regímenes tributarios existen?",
    "Quiero cotizar sus servicios",
  ],
  ts: Date.now(),
};

// Base de conocimiento tributario chileno inteligente
function getKnowledgeResponse(query: string): { text: string; options?: string[]; ctaWhatsApp?: string } {
  const q = query.toLowerCase().trim();

  // 1. Creación de empresas / Formalización
  if (
    q.includes("crear empresa") ||
    q.includes("formaliz") ||
    q.includes("spa") ||
    q.includes("eirl") ||
    q.includes("constitu") ||
    q.includes("inicio de actividades") ||
    q.includes("tu empresa en un dia")
  ) {
    return {
      text: "Para formalizar una empresa en Chile te asesoramos en todo el ciclo:\n\n1. **Elección de estructura:** SpA (Sociedad por Acciones) o EIRL según tus socios y proyección.\n2. **Constitución legal:** Redacción de estatutos y obtención de RUT de la empresa.\n3. **Inicio de actividades ante el SII:** Verificación de actividades y acreditación de domicilio.\n4. **Facturación electrónica y Patente municipal**.\n\nNosotros nos encargamos de todo el trámite de forma rápida y sin enredos.",
      options: ["¿Cuánto cuesta formalizar una empresa?", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar la formalización y creación de mi empresa.",
    };
  }

  // 2. IVA y Formulario 29
  if (
    q.includes("iva") ||
    q.includes("f29") ||
    q.includes("formulario 29") ||
    q.includes("debito") ||
    q.includes("credito fiscal") ||
    q.includes("atraso") ||
    q.includes("multa")
  ) {
    return {
      text: "Sobre el **IVA y Formulario 29 (F29)**:\n\n📅 **Plazos de declaración:**\n• **Día 12 de cada mes:** Boleta electrónica o no facturadores (obligatorio incluso sin movimiento).\n• **Día 20 de cada mes:** Facturadores electrónicos (obligatorio incluso sin movimiento).\n\n💡 **¿Tienes meses atrasados?** Te ayudamos a regularizar tus libros de compra y venta para condonar multas e intereses ante el SII.",
      options: ["Probar simulador de IVA F29", "¿Cuánto retiene el SII en boletas?", "Regularizar F29 con un contador"],
      ctaWhatsApp: "Hola Audicontab, tengo consultas sobre la declaración de mi IVA F29 mensual.",
    };
  }

  // 3. Boletas de Honorarios y Retención
  if (
    q.includes("boleta") ||
    q.includes("honorario") ||
    q.includes("retencion") ||
    q.includes("retención") ||
    q.includes("14.5") ||
    q.includes("15.25")
  ) {
    return {
      text: "Sobre las **Boletas de Honorarios electrónicas**:\n\n📈 **Tasa de retención vigente en Chile:**\n• **2025:** 14.50%\n• **2026:** 15.25%\n• **2027:** 16.00%\n• **2028 en adelante:** 17.00%\n\n💡 Si quieres que te llegue por ejemplo **$500.000 líquidos**, debes emitir tu boleta por **$584.795 brutos** (el SII retendrá $84.795). ¡Puedes calcular el monto exacto en nuestra Calculadora interactiva!",
      options: ["Ir a la Calculadora de Honorarios", "¿Cómo crear una empresa SpA?", "Cotizar asesoría contable"],
      ctaWhatsApp: "Hola Audicontab, tengo dudas sobre emisión de boletas de honorarios y retenciones del SII.",
    };
  }

  // 4. Operación Renta y F22
  if (
    q.includes("renta") ||
    q.includes("f22") ||
    q.includes("declaracion jurada") ||
    q.includes("dj 1887") ||
    q.includes("devolucion") ||
    q.includes("devolución")
  ) {
    return {
      text: "La **Operación Renta anual** consta de 2 grandes etapas:\n\n1. **Declaraciones Juradas (Marzo):** DJ 1887 (sueldos), 1888, 1948, etc.\n2. **Formulario 22 (Abril):** Declaración anual de personas y empresas.\n\nTe asesoramos para presentar todo dentro de plazo y obtener tu devolución sin reparos ni observaciones del SII.",
      options: ["Reservar hora para Operación Renta", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría reservar mi cupo para la Operación Renta F22.",
    };
  }

  // 5. Regímenes Tributarios
  if (
    q.includes("regimen") ||
    q.includes("régimen") ||
    q.includes("pro pyme") ||
    q.includes("14 d3") ||
    q.includes("14 d8") ||
    q.includes("transparente")
  ) {
    return {
      text: "Para Pymes en Chile existen 2 regímenes principales bajo el artículo 14 D:\n\n• **Pro Pyme General (14 D3):** Lleva contabilidad completa o simplificada, paga impuesto de primera categoría y permite créditos tributarios a los socios.\n• **Pro Pyme Transparente (14 D8):** La empresa no paga impuesto corporativo; las utilidades tributan directamente en el Global Complementario de los dueños.\n\nTe ayudamos a elegir el régimen que te permita pagar menos impuestos legalmente.",
      options: ["¿Cómo crear una empresa SpA?", "Cotizar asesoría tributaria", "Ir a la Calculadora"],
      ctaWhatsApp: "Hola Audicontab, me gustaría evaluar qué régimen tributario le conviene a mi negocio.",
    };
  }

  // 6. Remuneraciones, Sueldos y Previred
  if (
    q.includes("sueldo") ||
    q.includes("remuneracion") ||
    q.includes("remuneración") ||
    q.includes("previred") ||
    q.includes("contrato") ||
    q.includes("finiquito") ||
    q.includes("trabajador") ||
    q.includes("rrhh")
  ) {
    return {
      text: "En **Gestión de Recursos Humanos y Remuneraciones** realizamos:\n\n• Elaboración de contratos de trabajo y anexos.\n• Emisión mensual de liquidaciones de sueldo.\n• Declaración y pago de cotizaciones en **Previred** (vence el 13 de cada mes).\n• Finiquitos, cartas de aviso y cálculo de indemnizaciones conformes al Código del Trabajo.",
      options: ["Cotizar administración de sueldos", "¿Cuándo vence el IVA F29?", "Hablar con un contador"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar la gestión de remuneraciones y Previred de mi personal.",
    };
  }

  // 7. Servicios, Precios, Ubicación y Contacto
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
    q.includes("horario")
  ) {
    return {
      text: "📍 **Audicontab Limitada**\n• **Oficina:** O'Higgins 480, oficina 15, Quillota, Chile.\n• **Horario:** Lunes a Viernes de 9:00 a 18:00 hrs.\n• **Modalidad:** Presencial en Quillota y online para empresas de todo Chile.\n\n💰 Nuestros honorarios se adaptan a la cantidad de movimientos y tamaño de tu empresa. Puedes cotizar en 1 minuto vía WhatsApp o dejando tus datos en el formulario.",
      options: ["Hablar con un contador por WhatsApp", "Probar la Calculadora SII", "¿Cómo crear una empresa SpA?"],
      ctaWhatsApp: "Hola Audicontab, me gustaría cotizar sus servicios para mi empresa.",
    };
  }

  // Respuesta general inteligente
  return {
    text: `Entiendo tu consulta sobre "${query}". En Audicontab resolvemos todas tus obligaciones tributarias, IVA F29, renta y contabilidad mensual con atención cercana y personalizada.\n\n¿Te gustaría que un contador revise tu caso sin costo o prefieres explorar nuestras herramientas?`,
    options: [
      "Hablar con un contador por WhatsApp",
      "Probar la Calculadora SII",
      "¿Cuándo vence el IVA F29?",
      "¿Cómo crear una empresa SpA?",
    ],
    ctaWhatsApp: `Hola Audicontab, tengo una consulta: ${query}`,
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

    // Simular procesamiento inteligente
    setTimeout(() => {
      const resp = getKnowledgeResponse(text);
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
    }, 600);
  };

  const handleOptionClick = (option: string) => {
    if (option === "Ir a la Calculadora" || option === "Probar la Calculadora SII" || option === "Ir a la Calculadora de Honorarios") {
      setIsOpen(false);
      window.location.hash = "#herramientas";
      return;
    }
    if (option === "Hablar con un contador por WhatsApp" || option === "Hablar con un contador") {
      window.open(waLink("Hola Audicontab, estuve conversando con su Asistente Virtual y me gustaría asesoría contable."), "_blank");
      return;
    }
    handleSend(option);
  };

  return (
    <>
      {/* Botón flotante Asistente IA */}
      <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Abrir Asistente Virtual de Audicontab"
          className="group relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-brass-400 bg-ink-900 shadow-[0_12px_35px_-8px_rgba(37,99,235,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          {/* Pulso animado */}
          <span className="pulse-ring absolute inset-0 rounded-full bg-brass-400/40" />

          {/* Logo o Icono */}
          <img
            src="/logo.png"
            alt="Audicontab AI"
            className="relative h-9 w-9 rounded-full object-cover shadow-sm bg-white"
          />

          {/* Badge Online */}
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
            <span className="relative inline-flex h-4 w-4 rounded-full border-2 border-ink-950 bg-[#22c55e]" />
          </span>
        </button>

        {/* Mensaje globo sutil de bienvenida inicial */}
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="hidden items-center gap-2 border border-brass-400/40 bg-ink-950/95 px-3.5 py-2 font-mono text-[11px] text-paper-50 shadow-xl backdrop-blur-md transition-all hover:border-brass-400 md:flex"
          >
            <span className="text-brass-300 font-bold">Audicontab IA:</span>
            <span>¿Dudas con el SII o IVA? Pregúntame</span>
          </button>
        )}
      </div>

      {/* Ventana de Chat */}
      {isOpen && (
        <div className="fixed bottom-24 left-4 z-[70] flex h-[540px] max-h-[82vh] w-[92vw] max-w-[390px] flex-col overflow-hidden border-2 border-brass-400/60 bg-ink-950 text-paper-50 shadow-[0_24px_70px_-15px_rgba(6,14,26,0.95)] sm:left-6">
          {/* Header del Chat */}
          <div className="flex items-center justify-between border-b border-paper-50/15 bg-gradient-to-r from-ink-900 to-ink-950 px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/logo.png"
                  alt="Audicontab"
                  className="h-9 w-9 rounded-full object-cover border border-white/20 bg-white"
                />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border border-ink-950 bg-[#22c55e]" />
              </div>
              <div>
                <p className="font-display text-sm font-bold text-paper-50">Audicontab Asistente IA</p>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brass-300">
                  Asesoría Tributaria 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setMessages([INITIAL_MESSAGE])}
                title="Limpiar conversación"
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-[13.5px] leading-relaxed">
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
                    className="mt-2 inline-flex items-center gap-2 border border-[#4ade80]/40 bg-[#4ade80]/15 px-3 py-1.5 font-mono text-[10.5px] font-semibold text-[#86efac] transition-all hover:bg-[#4ade80]/25"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5 text-[#4ade80]" />
                    Hablar con un contador por WhatsApp
                  </a>
                )}

                {/* Opciones interactivas rápidas */}
                {m.options && (
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {m.options.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleOptionClick(opt)}
                        className="border border-brass-400/40 bg-ink-900/80 px-2.5 py-1 text-left font-mono text-[10px] text-brass-300 transition-all hover:bg-brass-400/20 hover:text-paper-50"
                      >
                        {opt} ➔
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 border border-paper-50/15 bg-ink-900 px-3 py-2 text-mist-400 rounded-md w-24">
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
                placeholder="Escribe tu consulta tributaria…"
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
            <p className="mt-1.5 text-center font-mono text-[9px] text-mist-500">
              Audicontab Ltda · Quillota · Consultas referenciales
            </p>
          </form>
        </div>
      )}
    </>
  );
}
