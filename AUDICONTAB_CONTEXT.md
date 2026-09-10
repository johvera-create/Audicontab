# 📊 Audicontab Ltda. — Contexto Global y Despliegue

Este archivo documenta la arquitectura actual, el despliegue en producción y la conexión con el CRM PYME Flow para que cualquier conversación de Antigravity conozca el estado exacto del proyecto.

---

## 🌐 1. Despliegue y Producción
- **Servidor VPS**: 13.140.39.136 (Ubuntu en AWS / Docker Swarm)
- **Dominio Asociado**: audicontabltda.cl (y subdominios asociados en Traefik).
- **Redes Docker**: easypanel y easypanel-crm.

---

## 🔗 2. Integración con el CRM PYME Flow
- **Organización en CRM**:
  - name: Audicontab
  - slug: audicontab
  - instanceKey: audicontab
  - id: cmts4gd3r0000wdyjwg16q4xk
- **WhatsApp Bot / Evolution API**:
  - Instancia activa en Evolution API: `audicontab`
  - Automatización n8n conectada para capturar leads y agendamientos tributarios.
- **Datos de Empresa para Cotizaciones**:
  - RUT: 76.543.210-K
  - Email: contacto@audicontabltda.cl
  - Teléfono: +56 9 8765 4321

## 📬 3. Conexión del Formulario Web
- **Endpoint**: POST https://pymeflowapp.cl/api/v1/booking
- **Campos**: name, email, phone, serviceTitle, notes, date, time, orgSlug: 'audicontab'
- Cada consulta enviada desde el formulario web de audicontabltda.cl crea automáticamente el contacto y una oportunidad comercial en el embudo de Audicontab en PYME Flow CRM.
