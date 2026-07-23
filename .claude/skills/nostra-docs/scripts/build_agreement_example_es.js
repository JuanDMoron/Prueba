const T = require("./template");
const { BorderStyle } = require("docx");
const { Document, Packer, Paragraph, run, para, bullet, sectionHeading, subHeading,
  rule, card, spacer, buildHeader, titleBlock, numbering, pageProps } = T;

const doc = new Document({
  numbering: numbering(),
  sections: [
    {
      properties: pageProps(),
      headers: { default: buildHeader("ACUERDO MARCO — CONTRATO DE SERVICIOS") },
      children: [
        ...titleBlock("ACUERDO MARCO DE", "COLABORACIÓN AUDIOVISUAL", "LA NOSTRA PRODUCTION"),

        card([
          new Paragraph({ spacing: { after: 60 }, children: [run("ENTRE:", { bold: true, size: 16, color: T.MUTED })] }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              run("LA NOSTRA PRODUCTION", { bold: true, size: 22 }),
              run(", (en adelante, ", { size: 22 }),
              run("la PRODUCTORA", { italics: true, size: 22 }),
              run("),", { size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 0 },
            children: [
              run("y ", { size: 22 }),
              run("[NOMBRE DEL CLIENTE]", { bold: true, size: 22 }),
              run(" (en adelante, ", { size: 22 }),
              run("el CLIENTE", { italics: true, size: 22 }),
              run(").", { size: 22 }),
            ],
          }),
        ]),
        spacer(320),

        sectionHeading("01", "OBJETO DEL ACUERDO"),
        para("El presente documento establece los términos y condiciones generales que regirán la relación profesional entre la PRODUCTORA y el CLIENTE para la creación, dirección, producción y edición de contenido audiovisual, bajo la modalidad de paquetes mensuales de creación de contenido."),
        para("Este acuerdo tiene carácter marco y recurrente, no limitándose a un único proyecto, pieza o fecha específica."),
        rule(),

        sectionHeading("02", "PROCEDIMIENTO DE TRABAJO (PAQUETE DE CREACIÓN DE CONTENIDO)"),
        para("El presente acuerdo aplica exclusivamente a los servicios de creación de contenido audiovisual recurrente, estructurados en paquetes mensuales."),
        para("Para cada mes de servicio, el flujo de trabajo será el siguiente:"),
        bullet("Planificación", "Los guiones, ideas y lineamientos del contenido serán preparados, definidos y aprobados previo a cada fecha de rodaje, independientemente del inicio del mes de servicio."),
        bullet("Rodaje", "Las fechas de grabación se ejecutarán según lo previamente acordado."),
        bullet("Producción y entregas", "Por cada fecha de rodaje, el material será editado y entregado dentro de un plazo de cinco (5) a ocho (8) días posteriores a dicha fecha, distribuido en dos (2) entregas (\"drops\") de tres (3) reels cada una."),
        bullet("Continuidad", "Los términos del presente acuerdo se aplicarán automáticamente a cada mes de servicio sin necesidad de firmar contratos adicionales."),
        rule(),

        sectionHeading("03", "CONDICIONES ECONÓMICAS"),
        bullet("Pago único mensual", "El CLIENTE deberá abonar el 100% (pago único) del valor del paquete contratado antes del inicio del mes de servicio correspondiente, específicamente antes de la primera fecha de rodaje programada para dicho mes."),
        bullet("Modalidad mes a mes", "El presente acuerdo opera bajo modalidad mes a mes, sin plazo mínimo de permanencia obligatorio. La continuidad del servicio para un nuevo mes queda condicionada exclusivamente a la recepción del pago correspondiente a dicho mes."),
        bullet("Finalización sin penalidad", "La ausencia de pago correspondiente al mes siguiente se entenderá como la finalización del servicio al término del mes en curso, sin que esto constituya incumplimiento contractual para ninguna de las partes ni genere penalidad alguna."),
        bullet("Entregas", "Las entregas del contenido se realizarán de forma progresiva durante el mes, una vez recibido el pago correspondiente a dicho mes."),
        bullet("Retrasos", "El incumplimiento o demora en el pago faculta a la PRODUCTORA a no iniciar o a pausar rodajes, ediciones o entregas, sin que esto constituya incumplimiento contractual de su parte."),
        rule(),

        sectionHeading("04", "PROCESO CREATIVO Y REVISIONES"),
        bullet("Acompañamiento creativo", "La PRODUCTORA acompañará al CLIENTE durante todo el proceso creativo del contenido, incluyendo el desarrollo de guiones, dirección y estructura del contenido, aportando su criterio profesional en cada etapa de producción."),
        bullet("Aprobación previa", "Los guiones y conceptos serán previamente preparados y aprobados antes de cada fecha de rodaje, sirviendo como base creativa y estructural para la producción del contenido."),
        bullet("Revisión incluida", "Cada pieza de contenido incluye una (1) única ronda de revisión."),
        bullet("Correcciones", "El CLIENTE deberá enviar todas las correcciones de forma consolidada en dicha revisión."),
        bullet("Alcance de cambios", "Las revisiones se limitan a ajustes sencillos, tales como texto, cortes menores o ritmo."),
        bullet("Cambios adicionales", "Solicitudes que impliquen nuevas rondas de revisión o modificaciones estructurales del contenido aprobado tendrán costos adicionales."),
        bullet("Eficiencia", "Este esquema busca optimizar tiempos de producción y asegurar la continuidad del servicio mensual."),
        rule(),

        sectionHeading("05", "REAGENDAMIENTO DE FECHAS DE RODAJE"),
        bullet(null, "Las fechas y horarios de rodaje se consideran reservados en exclusiva para el CLIENTE una vez confirmados."),
        bullet(null, "Cualquier solicitud de reagendamiento deberá comunicarse con un mínimo de dos (2) días de antelación."),
        bullet(null, "Las solicitudes realizadas fuera de este plazo podrán generar un cargo adicional, ya que la fecha y el horario fueron bloqueados y no ofrecidos a otros clientes."),
        bullet(null, "La disponibilidad de una nueva fecha estará sujeta a agenda y no se garantiza continuidad inmediata."),
        rule(),

        sectionHeading("06", "PROPIEDAD INTELECTUAL"),
        bullet("Uso del cliente", "Una vez abonado el total del servicio, el CLIENTE obtiene derechos de uso del material final para sus plataformas digitales y campañas publicitarias."),
        bullet("Autoría", "La PRODUCTORA conserva el derecho de utilizar total o parcialmente las piezas creadas para su portafolio, reel y promoción profesional."),
        bullet("Material original (RAW)", "El material bruto es propiedad de la PRODUCTORA. Su entrega no está incluida y solo se realizará mediante acuerdo y tarifa adicional."),
        bullet("Retención de archivos", "La PRODUCTORA conservará el material RAW y los proyectos de edición correspondientes durante un (1) mes posterior a la entrega final de cada pieza de contenido. Transcurrido dicho plazo, dicho material podrá ser eliminado sin responsabilidad para la PRODUCTORA."),
        rule(),

        sectionHeading("07", "TIEMPOS DE RESPUESTA DEL CLIENTE"),
        bullet(null, "El CLIENTE se compromete a responder solicitudes de aprobación, revisión o información en un plazo máximo de cuarenta y ocho (48) horas."),
        bullet(null, "La falta de respuesta podrá afectar el calendario de rodaje, edición y entregas, sin responsabilidad para la PRODUCTORA."),
        bullet(null, "En caso de inactividad prolongada, la PRODUCTORA podrá reprogramar entregas, pausar el servicio o considerar aprobadas las piezas según el último criterio validado."),
        bullet(null, "El tiempo perdido por falta de respuesta del CLIENTE no será acumulable ni recuperable dentro del mismo mes de servicio."),
        rule(),

        sectionHeading("08", "INCUMPLIMIENTO Y SUSPENSIÓN DEL SERVICIO"),
        bullet(null, "En caso de que cualquiera de las partes incumpla los términos del presente acuerdo, la parte afectada podrá suspender de forma inmediata la ejecución del servicio."),
        bullet(null, "La suspensión no exime a las partes de liquidar los trabajos, servicios o pagos ya ejecutados o comprometidos hasta la fecha."),
        rule(),

        sectionHeading("09", "RESPONSABILIDAD"),
        para("La PRODUCTORA no será responsable por retrasos o incumplimientos derivados de causas técnicas, climáticas, de fuerza mayor o ajenas a su control razonable."),
        rule(),

        sectionHeading("10", "LEY APLICABLE"),
        para("El presente acuerdo se regirá e interpretará conforme a las leyes del Estado de Florida, Estados Unidos."),
        rule(),

        sectionHeading("11", "ACEPTACIÓN"),
        para("La aceptación del presente acuerdo podrá realizarse mediante firma física, firma digital o confirmación escrita vía correo electrónico o mensajería, teniendo plena validez legal."),

        spacer(200),
        new Paragraph({ spacing: { before: 0, after: 60 }, children: [run("Presidente/Dueño de [NOMBRE DEL CLIENTE]:", { bold: true })] }),
        new Paragraph({ spacing: { after: 300 }, children: [run("Firma: ______________________________")] }),
        new Paragraph({ spacing: { after: 60 }, children: [run("POR LA PRODUCTORA:", { bold: true })] }),
        para("Juan Morón – Director"),
        new Paragraph({ children: [run("La Nostra Production", { italics: true, color: T.MUTED })] }),
        new Paragraph({ spacing: { before: 200 }, children: [run("Fecha: ______________")] }),
      ],
    },
    {
      properties: pageProps(),
      headers: { default: buildHeader("ANEXO A — DESCRIPCIÓN DEL PAQUETE") },
      children: [
        ...titleBlock("ANEXO A —", "PAQUETE DE CONTENIDO", "LA NOSTRA PRODUCTION"),
        para("Este Anexo A forma parte integral del Acuerdo Marco de Colaboración Audiovisual suscrito entre la PRODUCTORA y el CLIENTE, y se rige por los términos y condiciones allí establecidos."),
        spacer(200),

        subHeading("PAQUETE MENSUAL ESTÁNDAR"),
        card([
          new Paragraph({ spacing: { after: 100 }, children: [run("INCLUYE", { bold: true, size: 15, color: T.MUTED })] }),
          new Paragraph({ spacing: { after: 60 }, children: [run("12 reels editados por mes", { bold: true, size: 24 })] }),
          new Paragraph({ spacing: { after: 220 }, children: [run("20 fotografías editadas por mes", { bold: true, size: 24 })] }),
          new Paragraph({
            spacing: { before: 100, after: 220 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "C7C7FA" } },
            children: [run("")],
          }),
          new Paragraph({ spacing: { after: 40 }, children: [run("PRECIO", { bold: true, size: 15, color: T.MUTED })] }),
          new Paragraph({ spacing: { after: 0 }, children: [
            run("USD $1,500.00", { bold: true, size: 36, color: T.ACCENT }),
            run("  / mes  ·  pago único (Sección 3)", { size: 18, color: T.MUTED }),
          ] }),
        ], T.ACCENT_TINT),
        spacer(320),

        subHeading("CONDICIONES ESPECÍFICAS DEL PAQUETE"),
        bullet("Contenido no utilizado", "Las piezas (reels o fotografías) no utilizadas dentro del mes correspondiente no serán acumulables ni transferibles a meses posteriores."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Acuerdo_Marco_La_Nostra_Production.docx", buf);
  console.log("done ES");
});
