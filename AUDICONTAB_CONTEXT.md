# 📊 Audicontab Ltda. — Contexto Global y Despliegue

Este archivo documenta la arquitectura actual, el despliegue en producción y la conexión con el CRM PYME Flow para que cualquier conversación de Antigravity conozca el estado exacto del proyecto.

---

## 🌐 1. Despliegue y Producción
- **Servidor VPS Único**: `13.140.39.136` (Ubuntu en AWS / Docker Swarm).
- **Dominio Asociado**: `audicontabltda.cl`
- **Redes Docker**: `easypanel` y `easypanel-crm`.
- **Plataforma n8n Oficial**: `https://crm-n8n.tq9grx.easypanel.host` (en este mismo VPS).
  - *Nota*: La URL vieja `db8enk` ya no se usa y fue actualizada.

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
