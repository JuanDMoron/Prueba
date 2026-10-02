---
name: aeofmiami-script
description: Genera y mantiene guiones de video (reels/TikTok) para AE of Miami, dealer de autos salvage/reparables en Miami. Úsalo cuando el usuario pida crear, desarrollar, ajustar o agregar un guion de video para AE of Miami, o pida actualizar el PDF de guiones de esta marca. Contiene el ADN de marca derivado del análisis real de sus reels (tono, ritmo, diálogo, posicionamiento).
---

# Guiones de video — AE of Miami

## Quién es el cliente

AE of Miami (también "Elite Motor Cars of Miami") — dealer de vehículos salvage y reparables en Miami, FL (5700 NW 27th Ave). Sitio: aeofmiami.com. Presentadora en cámara: **Daniela**. Política real de pago: **no financian** — solo cash, cheque de caja o transferencia verificada. Gorra de marca negra es parte del vestuario habitual.

## Posicionamiento (nunca te salgas de esto)

- Eje de marca: **confianza, variedad y rotación constante de inventario.**
- **Nunca** se posiciona como "el más barato" ni se compara con la competencia.
- Los hooks generan **duda o conflicto propio de la marca** (un dato, una contradicción, una pregunta sobre su propio proceso) — nunca mencionan a otros dealers ni insinúan que "esconden algo".

## De dónde sale el formato (contexto para no repetir el análisis)

Se analizaron 4 reels reales del cliente (frame por frame, porque Instagram bloquea el acceso directo a los links). Hallazgos clave que rigen todo guion nuevo:

**Tipo de diálogo:**
- Frases cortas, espontáneas, nunca "leídas" ni acartonadas.
- Registro casual y directo — como le hablarías a un amigo, no un vendedor. Cero frases de venta clásicas ("no te lo puedes perder", "oferta única") y cero lenguaje corporativo.
- Ninguna frase hablada supera ~8–10 palabras seguidas; si hay más que decir, se corta en 2–3 frases con un corte de cámara entre medio.

**Ritmo:**
- Subtítulos quemados **palabra por palabra** (estilo karaoke), nunca la oración completa de golpe.
- Corte de cámara cada **2–4 segundos** como máximo (salvo tomas de detalle que se sostienen un poco más).
- El **cierre es siempre lo más corto y rápido** de todo el video (3–5 palabras) — el ritmo se acelera antes del CTA, no baja.
- Las pausas de silencio se usan como recurso (no se rellenan con muletillas).

**Transiciones:**
- Corte duro o **paneo rápido con blur** (whip-pan) — nunca fades lentos. El blur del paneo puede usarse incluso para esconder cambios de vestuario en gags de doble personaje (ver Guion 2 en `guiones_data.py`).

**Duración objetivo:** ~30 segundos. Puede extenderse a 35–40s si el guion lo amerita (más paradas, más contexto), pero hay que avisarlo explícitamente al cliente — no asumirlo.

## Qué tipo de ideas pide el cliente

El cliente (Juan) pidió explícitamente que las ideas sean **dudas reales de clientes convertidas en video** — no contenido genérico de dealer. Ejemplos ya hechos: "¿de verdad son reales o es estafa?", "Clean/Salvage/Junk, ¿cuál es la diferencia?", "¿financian?", "¿esto siquiera enciende?". Antes de proponer una idea nueva, pregúntate: ¿esto resuelve una duda/objeción real que tendría un comprador de carros salvage?

Pilares usados hasta ahora (se pueden repetir o combinar, no hace falta inventar uno nuevo cada vez): **Urgencia, Educativo, Confianza, Objeción.**

## Formato de entrega (fijo, no cambiar sin que el cliente lo pida)

Nunca tablas. Formato "Plano — diálogo" emparejado, así:

```
**Plano N** — [descripción corta del plano/cámara]
"[línea de diálogo]"
```

Cuando hay una transición explícita (paneo con blur, etc.), va en una línea aparte entre corchetes, en cursiva, antes del plano al que aplica.

Después del guion completo, siempre van:
- **Opciones de hook** (5 en total, incluyendo la que trajo el cliente si la dio) — ligadas a los planos donde va el hook.
- **Opciones de CTA** (5 en total, incluyendo la que trajo el cliente si la dio) — ligadas a los planos donde va el CTA.
- **Nota(s) de producción** — cualquier cosa que haya que resolver antes de grabar (carros específicos que hacen falta, datos a verificar con el cliente, logística de locaciones, etc.). Si el guion toca datos legales/técnicos sensibles (títulos de carro, seguros, garantías), siempre pedir que se verifiquen con el cliente antes de grabar.

## Flujo de trabajo

1. El cliente manda una idea (concepto, pilar, hook, CTA — a veces en bullet points).
2. Desarrollar el guion completo en el formato de arriba, en el chat (no PDF todavía).
3. Iterar según el feedback del cliente — presta atención a pedidos de formato (ha pedido: no tablas, menos fragmentado, planos emparejados con el diálogo, más cortes/dinamismo, menos choppy — lee cada pedido literal, no asumas que ya quedó resuelto de una vez).
4. Cuando el cliente aprueba ("perfecto", "agrégalo"), añadir el guion a `guiones_data.py` (en esta misma carpeta del skill) y regenerar el PDF con `build_pdf.py`.
5. Enviar el PDF actualizado con `SendUserFile`.
6. Si se modifica algo dentro de este skill (nuevo guion, ajuste de formato), hacer commit y push al repo "Prueba" para que quede guardado — esta carpeta vive dentro del repo precisamente para no depender de un entorno remoto temporal.

## Cómo regenerar el PDF

```bash
cd /home/user/Prueba/.claude/skills/Content-Creation-Skills/AeofMiami-script
python3 build_pdf.py
```

Esto lee `guiones_data.py` y genera `AE_of_Miami_Guiones.pdf` en la misma carpeta. Para agregar un guion nuevo, edita `guiones_data.py` siguiendo la estructura de los guiones existentes (lista `GUIONES`, cada uno es un dict con `numero`, `titulo`, `pilar`, `duracion`, `planos`, `hooks`, `ctas`, `notas`).

Antes de generar, verificar que `reportlab` esté instalado (`pip install reportlab` si no). Para revisar visualmente el resultado: `pdftoppm -jpeg -r 100 AE_of_Miami_Guiones.pdf page` y leer las imágenes generadas (requiere `poppler-utils`, instalar con `apt-get install -y poppler-utils` si hace falta).

## Nota sobre dónde vive este skill

Este skill es parte de la colección **Content Creation Skills**. Vive dentro del repo "Prueba" (`.claude/skills/Content-Creation-Skills/AeofMiami-script/`) porque es el único lugar con persistencia garantizada que tenemos disponible ahora mismo (git commit + push). Si en algún momento se crea un repositorio dedicado "Content-Creation-Skills" en GitHub, lo ideal es moverlo ahí para separarlo de este repo de práctica — pero mientras tanto, este es el lugar seguro. Si se agregan más marcas/clientes de contenido, deberían vivir como hermanos de esta carpeta dentro de `Content-Creation-Skills/`.
