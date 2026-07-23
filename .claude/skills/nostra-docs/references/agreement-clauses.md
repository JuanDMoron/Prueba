# Texto estándar del Acuerdo Marco (ES / EN)

Este es el texto legal ya acordado con el usuario para el Acuerdo Marco de
Colaboración Audiovisual (ES) / Master Audiovisual Collaboration Agreement
(EN), sección por sección. Reusalo tal cual para un cliente nuevo — solo
cambia `[NOMBRE DEL CLIENTE]` / `[CLIENT NAME]` y, si corresponde, el
contenido del Anexo A / Exhibit A (ver más abajo).

No agregues cláusulas nuevas (indemnidad, honorarios de abogado, cláusula de
exclusividad, etc.) sin que el usuario las pida — ya se evaluaron esas
adiciones en esta sesión y el usuario decidió no incluirlas por ahora.

## Estructura de 11 secciones (numeradas 01–11 en el diseño, con acento azul)

1. **OBJETO DEL ACUERDO / PURPOSE OF THE AGREEMENT** — define el acuerdo como
   marco y recurrente, para paquetes mensuales de contenido, no un proyecto
   único.
2. **PROCEDIMIENTO DE TRABAJO / WORK PROCEDURE** — Planificación, Rodaje,
   Producción y entregas (5–8 días post-rodaje, 2 drops de 3 reels),
   Continuidad automática mes a mes.
3. **CONDICIONES ECONÓMICAS / ECONOMIC TERMS** — pago único (100%) antes del
   inicio del mes de servicio; modalidad mes a mes sin plazo mínimo; la
   ausencia de pago del mes siguiente = fin del servicio sin penalidad para
   ninguna parte; entregas condicionadas al pago; incumplimiento de pago
   faculta a pausar sin que sea incumplimiento de la productora.
4. **PROCESO CREATIVO Y REVISIONES / CREATIVE PROCESS AND REVISIONS** —
   acompañamiento creativo (guiones, dirección, estructura) como primer punto;
   una única ronda de revisión consolidada; cambios estructurales adicionales
   tienen costo extra.
5. **REAGENDAMIENTO DE FECHAS DE RODAJE / RESCHEDULING OF SHOOT DATES** —
   fechas reservadas en exclusiva; reagendar con 2 días mínimos de aviso o
   puede generar cargo adicional.
6. **PROPIEDAD INTELECTUAL / INTELLECTUAL PROPERTY** — cliente obtiene
   derechos de uso (licencia, no cesión de copyright) una vez pagado el
   total; productora conserva RAW y derecho de portfolio; retención de
   archivos: 1 mes posterior a la entrega final, luego se puede eliminar.
7. **TIEMPOS DE RESPUESTA DEL CLIENTE / CLIENT RESPONSE TIMES** — 48 horas
   máximo para responder; falta de respuesta no genera responsabilidad para
   la productora; tiempo perdido no es acumulable.
8. **INCUMPLIMIENTO Y SUSPENSIÓN DEL SERVICIO / BREACH AND SUSPENSION** —
   cualquier parte puede suspender ante incumplimiento; no exime de liquidar
   lo ya ejecutado.
9. **RESPONSABILIDAD / LIABILITY** — la productora no responde por causas
   técnicas, climáticas o de fuerza mayor fuera de su control razonable.
10. **LEY APLICABLE / GOVERNING LAW** — Estado de Florida, EE.UU.
11. **ACEPTACIÓN / ACCEPTANCE** — válida por firma física, digital o
    confirmación escrita por email/mensajería.

El texto exacto (bullet por bullet, en ambos idiomas) está en los scripts de
ejemplo `scripts/build_agreement_example_es.js` y
`scripts/build_agreement_example_en.js` — son la fuente de verdad, copialos
como punto de partida y ajustá solo lo que cambie para el cliente/paquete
nuevo.

## Anexo A / Exhibit A — Descripción del Paquete

Página aparte (nueva página en el mismo documento) con:
- Título editorial grande ("ANEXO A — PAQUETE DE CONTENIDO" / "EXHIBIT A —
  CONTENT PACKAGE").
- Un párrafo de vínculo: el anexo es parte integral del acuerdo marco.
- Un subtítulo ("PAQUETE MENSUAL ESTÁNDAR" / "STANDARD MONTHLY PACKAGE").
- Una **card** con fondo azul clarito (`ACCENT_TINT`) mostrando: qué incluye
  (bullets bold), una línea divisoria fina, y el precio en tipografía enorme
  azul (`ACCENT`, ~36pt) con la leyenda de pago único.
- Un bloque de condiciones específicas del paquete (ej. contenido no
  utilizado no se acumula).

Si el paquete cambia (otra cantidad de reels/fotos, otro precio), estos son
los únicos valores a reemplazar — la estructura del Anexo se mantiene igual.
