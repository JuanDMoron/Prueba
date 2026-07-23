# Notas técnicas del entorno (aprendidas armando esto la primera vez)

Estas son limitaciones reales del sandbox que te van a hacer perder tiempo si
no las conocés de antemano. No son parte del "diseño" del documento, son
gotchas de herramientas.

## Generar el .docx

- El paquete npm `docx` puede no estar instalado. Probá
  `node -e "require('docx')"` primero; si falla, `npm install docx` en el
  directorio de trabajo (no hace falta instalar globalmente).
- Seguí el patrón de `scripts/template.js`: page size US Letter en DXA
  (12240×15840), márgenes explícitos, todo el texto vía la función `run()`
  para que la fuente/tamaño/color por defecto sea consistente.
- Para el panel negro a sangre completa del invoice (`blackPanel` en
  `build_invoice_example.js`): una `Table` de ancho `PAGE_W` con
  `indent: { size: -MARGIN, type: WidthType.DXA }` la hace bleedear más allá
  de los márgenes de texto. Confirmá que `ITableOptions` de la versión de
  `docx` instalada soporte `indent` (chequealo con
  `node -e "..."` sobre `node_modules/docx/dist/index.d.ts"` si dudás).

## Verificación visual (PDF)

- En este sandbox, la conversión a PDF vía LibreOffice
  (`scripts/office/soffice.py` del skill `docx`) puede estar rota — falla con
  "source file could not be loaded" incluso en archivos triviales. No es un
  problema del documento generado, es del entorno. No pierdas tiempo
  reintentando muchas veces.
- Fallback confiable: validar que el XML interno es válido y que el texto
  esperado está presente, sin depender de un render visual:
  ```python
  import zipfile, xml.dom.minidom as m, re
  z = zipfile.ZipFile('archivo.docx')
  data = z.read('word/document.xml')
  m.parseString(data)  # lanza excepción si el XML está mal formado
  texts = re.findall(r'<w:t[^>]*>(.*?)</w:t>', data.decode('utf-8'))
  # buscar textos clave, chequear que no queden placeholders tipo "[CLIENT NAME]"
  ```
- Si `python scripts/office/validate.py` (validación contra el schema oficial
  de Word) falla por módulos faltantes, instalalos con
  `pip install --quiet lxml defusedxml` y reintentá — vale la pena correrlo
  una vez que estén instalados, da más garantía que el chequeo manual de
  arriba.
- Avisale siempre al usuario que no pudiste generar una vista previa visual y
  que recomendás abrir el archivo en Word antes de usarlo con un cliente —
  no afirmes que "se ve bien" sin haberlo visto.

## Envío por Gmail / Drive

- `mcp__Gmail__create_draft` (o el nombre equivalente del conector Gmail en
  la sesión) **no soporta adjuntos** — aunque el schema tenga un campo
  `attachments`, la propia descripción de la tool lo aclara ("Limitation:
  Creating drafts with attachments is not supported yet"). Leé la
  descripción de la tool antes de asumir que el parámetro funciona.
- Camino que sí funciona: subir los .docx a Google Drive
  (`mcp__Google_Drive__create_file` con `base64Content` +
  `contentMimeType` + `disableConversionToGoogleType: true` para que no lo
  convierta a Google Docs), y poner los links de Drive en el cuerpo del
  correo.
- **Verificá el upload** comparando `fileSize` de la respuesta contra
  `wc -c` del archivo original — si no coincide, algo se corrompió al pasar
  el base64 como parámetro (puede pasar si el contenido es muy largo y se
  trunca al construir la llamada).
- Los archivos subidos quedan **privados** (solo el dueño del Drive tiene
  acceso) y no hay una tool disponible para cambiar permisos de
  compartición — avisale al usuario que tiene que compartir manualmente cada
  archivo (Compartir → agregar el email del cliente, o "cualquiera con el
  link") antes de que el destinatario pueda abrirlo.
- Si el usuario prefiere no depender de esto, la alternativa más simple es
  entregarle los .docx directamente (vía la tool de envío de archivos al
  usuario) más el texto del correo en texto plano, para que él mismo adjunte
  y mande desde su cliente de correo.
- Antes de dar por hecho que un conector (Gmail, Drive) no está disponible o
  está mal conectado, confirmá con una llamada de lectura simple (ej.
  `search_threads` con `in:sent`) — el remitente del último mensaje enviado
  te dice qué cuenta está realmente conectada, útil si el usuario tiene dudas
  de si se reconectó a la cuenta correcta después de cambiarla en
  Settings → Connectors.

## Guardado y control de versiones

- Este proyecto vive en un repo git (`/home/user/Prueba`), y el contenedor es
  efímero — todo lo que no se commitee y pushee se pierde. Cada vez que
  generes o actualices un documento:
  1. Copialo a `entregables/` (plantilla estándar) o `entregables/clientes/`
     (versión de un cliente específico).
  2. `git add` + `git commit` + `git push origin <rama>`.
- Las plantillas estándar (`entregables/NostraContentAgreement_ES.docx`,
  `_EN.docx`, `entregables/NostraInvoice.docx`) son la base reutilizable —
  **no las edites** al armar algo para un cliente puntual, salvo que el
  usuario pida explícitamente cambiar el estándar para todos los clientes
  futuros. Si el pedido es "esto es solo para este cliente", el cambio va
  únicamente en el archivo de `entregables/clientes/`.
