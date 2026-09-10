# 📊 Audicontab Ltda. — Contexto Global y Despliegue

Este archivo documenta la arquitectura actual, el despliegue en producción y la conexión con el CRM PYME Flow para que cualquier conversación de Antigravity conozca el estado exacto del proyecto.

---

## 🌐 1. Despliegue y Producción
- **Servidor VPS Único**: `13.140.39.136` (Ubuntu en AWS / Docker Swarm).
  - Contenedores activos en VPS: `crm_app` (PYME Flow), `crm_n8n`, `crm_whatsapp` (Evolution API), `barberia_app`, `easypanel`.
- **Landing Page Web (`audicontabltda.cl`)**: 
  - Aloja de forma externa (Vercel / Cloudflare) conectada directamente al repositorio GitHub `johvera-create/Audicontab`.
  - Cada `git push origin main` desencadena el despliegue automático de la web.
- **Plataforma n8n Oficial**: `https://crm-n8n.tq9grx.easypanel.host` (en el VPS).

---

## 🔗 2. Integración con el CRM PYME Flow
- **Organización en CRM**:
  - `name`: `Audicontab`
  - `slug`: `audicontab`
  - `instanceKey`: `audicontab`
  - `id`: `cmts4gd3r0000wdyjwg16q4xk`
- **WhatsApp Bot / Evolution API**:
  - Instancia en Evolution API: `audicontab`
  - Automatización n8n en el VPS: `AudicontabMasterFlow` (Workflow especializado con Whisper y Scoring tributario).
- **Datos de Empresa para Cotizaciones**:
  - RUT: 76.543.210-K
  - Email: contacto@audicontabltda.cl
  - Teléfono: +56 9 8765 4321

---

## 📬 3. Conexión del Formulario Web
- **Endpoint CRM**: `POST https://pymeflowapp.cl/api/v1/booking`
- **Campos enviados**: `name`, `email`, `phone`, `serviceTitle`, `notes`, `date`, `time`, `price: 0`, `orgSlug: "audicontab"`
- **Webhook n8n**: `https://crm-n8n.tq9grx.easypanel.host/webhook/audicontab-contacto`
- **Respaldo correo**: `https://formsubmit.co/ajax/johanvera589@gmail.com`
- Cada consulta enviada desde el formulario web crea automáticamente el contacto y una oportunidad comercial en el embudo de Audicontab en PYME Flow CRM.

---

## 🤖 4. Arquitectura del Bot de WhatsApp (Método Anti-Ban + IA)
Para replicar exactamente el bot de WhatsApp de PYME Flow en Audicontab, se guardó la plantilla lista en:
👉 `WHATSAPP_BOT_TEMPLATE.json` (dentro de esta misma carpeta).

### Componentes clave del método:
1. **Entrada Webhook**: Recibe mensajes desde Evolution API (`instance: audicontab`).
2. **Filtro y Control Humano**:
   - Ignora grupos (`@g.us`), newsletters y broadcasts.
   - Detecta si Johan escribe (`fromMe = true`) y silencia el bot para ese cliente por 24h para no interrumpir.
   - Detección de intención humana ("hablar con Johan / persona").
3. **Transcripción de Notas de Voz**:
   - Descarga audio de Evolution API en base64.
   - Envía a **Groq Whisper Large v3 Turbo** para transcribir el audio a texto en segundos.
4. **Cerebro IA**:
   - Modelo: **Groq Qwen 3.8 27b** (temperatura 0.3, `response_format: json_object`).
   - Prompt especializado en asesoría tributaria chilena (F29, SII, creación SpA).
5. **Anti-Ban Humano**:
   - **Simular Escribiendo**: Dispara `POST /chat/sendPresence/audicontab` con `presence: "composing"` y delay de 1.2s.
   - **Retardo Natural**: Nodo de espera de 2 a 4 segundos antes de enviar el texto final por Evolution API para evitar bloqueos de WhatsApp por respuestas robóticas instantáneas.
6. **Registro en CRM**:
   - Guarda el prospecto en `http://crm_app:3000/api/v1/webhook/leads` con `instance: "audicontab"` y `dealValue: 0`.
