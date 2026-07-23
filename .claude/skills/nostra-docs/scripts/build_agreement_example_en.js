const T = require("./template");
const { BorderStyle } = require("docx");
const { Document, Packer, Paragraph, run, para, bullet, sectionHeading, subHeading,
  rule, card, spacer, buildHeader, titleBlock, numbering, pageProps } = T;

const doc = new Document({
  numbering: numbering(),
  sections: [
    {
      properties: pageProps(),
      headers: { default: buildHeader("MASTER AGREEMENT — SERVICE CONTRACT") },
      children: [
        ...titleBlock("MASTER AUDIOVISUAL", "COLLABORATION AGREEMENT", "LA NOSTRA PRODUCTION"),

        card([
          new Paragraph({ spacing: { after: 60 }, children: [run("BETWEEN:", { bold: true, size: 16, color: T.MUTED })] }),
          new Paragraph({
            spacing: { after: 40 },
            children: [
              run("LA NOSTRA PRODUCTION", { bold: true, size: 22 }),
              run(", (hereinafter, the ", { size: 22 }),
              run("PRODUCTION COMPANY", { italics: true, size: 22 }),
              run("),", { size: 22 }),
            ],
          }),
          new Paragraph({
            spacing: { after: 0 },
            children: [
              run("and ", { size: 22 }),
              run("[CLIENT NAME]", { bold: true, size: 22 }),
              run(" (hereinafter, the ", { size: 22 }),
              run("CLIENT", { italics: true, size: 22 }),
              run(").", { size: 22 }),
            ],
          }),
        ]),
        spacer(320),

        sectionHeading("01", "PURPOSE OF THE AGREEMENT"),
        para("This document establishes the general terms and conditions that will govern the professional relationship between the PRODUCTION COMPANY and the CLIENT for the creation, direction, production, and editing of audiovisual content, under the modality of monthly content creation packages."),
        para("This agreement is of a framework and recurring nature, and is not limited to a single project, piece, or specific date."),
        rule(),

        sectionHeading("02", "WORK PROCEDURE (CONTENT CREATION PACKAGE)"),
        para("This agreement applies exclusively to recurring audiovisual content creation services, structured in monthly packages."),
        para("For each month of service, the workflow will be as follows:"),
        bullet("Planning", "Scripts, ideas, and content guidelines will be prepared, defined, and approved prior to each shoot date, regardless of the start of the service month."),
        bullet("Shoot", "Filming dates will be carried out as previously agreed."),
        bullet("Production and Delivery", "For each shoot date, the material will be edited and delivered within a period of five (5) to eight (8) days following that date, distributed in two (2) deliveries (\"drops\") of three (3) reels each."),
        bullet("Continuity", "The terms of this agreement will automatically apply to each month of service without the need to sign additional contracts."),
        rule(),

        sectionHeading("03", "ECONOMIC TERMS"),
        bullet("Single Monthly Payment", "The CLIENT must pay 100% (single payment) of the value of the contracted package before the start of the corresponding service month, specifically before the first shoot date scheduled for that month."),
        bullet("Month-to-Month Basis", "This agreement operates on a month-to-month basis, with no mandatory minimum term. Continuation of the service for a new month is conditioned exclusively on receipt of the payment corresponding to that month."),
        bullet("Termination Without Penalty", "The absence of payment for the following month will be understood as the termination of the service at the end of the current month, without this constituting a breach of contract by either party or generating any penalty."),
        bullet("Deliveries", "Content deliveries will be made progressively during the month, once the corresponding payment for that month has been received."),
        bullet("Delays", "Failure to pay or delay in payment entitles the PRODUCTION COMPANY to not begin, or to pause, shoots, edits, or deliveries, without this constituting a breach of contract on its part."),
        rule(),

        sectionHeading("04", "CREATIVE PROCESS AND REVISIONS"),
        bullet("Creative Support", "The PRODUCTION COMPANY will support the CLIENT throughout the entire creative process of the content, including script development, direction, and content structure, contributing its professional judgment at every stage of production."),
        bullet("Prior Approval", "Scripts and concepts will be prepared and approved in advance of each shoot date, serving as the creative and structural basis for content production."),
        bullet("Included Revision", "Each piece of content includes one (1) single round of revisions."),
        bullet("Corrections", "The CLIENT must submit all corrections consolidated into that single revision round."),
        bullet("Scope of Changes", "Revisions are limited to simple adjustments, such as text, minor cuts, or pacing."),
        bullet("Additional Changes", "Requests involving new rounds of revision or structural modifications to approved content will incur additional costs."),
        bullet("Efficiency", "This approach seeks to optimize production times and ensure continuity of the monthly service."),
        rule(),

        sectionHeading("05", "RESCHEDULING OF SHOOT DATES"),
        bullet(null, "Shoot dates and times are considered exclusively reserved for the CLIENT once confirmed."),
        bullet(null, "Any rescheduling request must be communicated at least two (2) days in advance."),
        bullet(null, "Requests made outside this timeframe may incur an additional charge, since the date and time were blocked and not offered to other clients."),
        bullet(null, "Availability of a new date is subject to scheduling, and immediate continuity is not guaranteed."),
        rule(),

        sectionHeading("06", "INTELLECTUAL PROPERTY"),
        bullet("Client's Use", "Once the service has been paid in full, the CLIENT obtains usage rights to the final material for its digital platforms and advertising campaigns."),
        bullet("Authorship", "The PRODUCTION COMPANY retains the right to use, in whole or in part, the pieces created for its portfolio, reel, and professional promotion."),
        bullet("Original Material (RAW)", "Raw footage is the property of the PRODUCTION COMPANY. Its delivery is not included and will only be provided by agreement and for an additional fee."),
        bullet("File Retention", "The PRODUCTION COMPANY will retain the RAW material and corresponding editing project files for one (1) month following the final delivery of each piece of content. After this period, such material may be deleted without liability to the PRODUCTION COMPANY."),
        rule(),

        sectionHeading("07", "CLIENT RESPONSE TIMES"),
        bullet(null, "The CLIENT agrees to respond to requests for approval, revision, or information within a maximum period of forty-eight (48) hours."),
        bullet(null, "Failure to respond may affect the shoot, editing, and delivery schedule, without liability to the PRODUCTION COMPANY."),
        bullet(null, "In the event of prolonged inactivity, the PRODUCTION COMPANY may reschedule deliveries, pause the service, or deem pieces approved based on the last validated feedback."),
        bullet(null, "Time lost due to the CLIENT's failure to respond will not be cumulative or recoverable within the same month of service."),
        rule(),

        sectionHeading("08", "BREACH AND SUSPENSION OF SERVICE"),
        bullet(null, "Should either party breach the terms of this agreement, the affected party may immediately suspend performance of the service."),
        bullet(null, "Suspension does not exempt the parties from settling work, services, or payments already performed or committed to as of that date."),
        rule(),

        sectionHeading("09", "LIABILITY"),
        para("The PRODUCTION COMPANY will not be liable for delays or failures resulting from technical, weather-related, force majeure causes, or causes beyond its reasonable control."),
        rule(),

        sectionHeading("10", "GOVERNING LAW"),
        para("This agreement shall be governed by and construed in accordance with the laws of the State of Florida, United States."),
        rule(),

        sectionHeading("11", "ACCEPTANCE"),
        para("Acceptance of this agreement may be given by physical signature, digital signature, or written confirmation via email or messaging, and shall be fully legally valid."),

        spacer(200),
        new Paragraph({ spacing: { before: 0, after: 60 }, children: [run("President/Owner of [CLIENT NAME]:", { bold: true })] }),
        new Paragraph({ spacing: { after: 300 }, children: [run("Signature: ______________________________")] }),
        new Paragraph({ spacing: { after: 60 }, children: [run("FOR THE PRODUCTION COMPANY:", { bold: true })] }),
        para("Juan Morón – Director"),
        new Paragraph({ children: [run("La Nostra Production", { italics: true, color: T.MUTED })] }),
        new Paragraph({ spacing: { before: 200 }, children: [run("Date: ______________")] }),
      ],
    },
    {
      properties: pageProps(),
      headers: { default: buildHeader("EXHIBIT A — CONTENT PACKAGE DESCRIPTION") },
      children: [
        ...titleBlock("EXHIBIT A —", "CONTENT PACKAGE", "LA NOSTRA PRODUCTION"),
        para("This Exhibit A forms an integral part of the Master Audiovisual Collaboration Agreement entered into between the PRODUCTION COMPANY and the CLIENT, and is governed by the terms and conditions set forth therein."),
        spacer(200),

        subHeading("STANDARD MONTHLY PACKAGE"),
        card([
          new Paragraph({ spacing: { after: 100 }, children: [run("INCLUDES", { bold: true, size: 15, color: T.MUTED })] }),
          new Paragraph({ spacing: { after: 60 }, children: [run("12 edited reels per month", { bold: true, size: 24 })] }),
          new Paragraph({ spacing: { after: 220 }, children: [run("20 edited photographs per month", { bold: true, size: 24 })] }),
          new Paragraph({
            spacing: { before: 100, after: 220 },
            border: { top: { style: BorderStyle.SINGLE, size: 4, color: "C7C7FA" } },
            children: [run("")],
          }),
          new Paragraph({ spacing: { after: 40 }, children: [run("PRICE", { bold: true, size: 15, color: T.MUTED })] }),
          new Paragraph({ spacing: { after: 0 }, children: [
            run("USD $1,500.00", { bold: true, size: 36, color: T.ACCENT }),
            run("  / month  ·  single payment (Section 3)", { size: 18, color: T.MUTED }),
          ] }),
        ], T.ACCENT_TINT),
        spacer(320),

        subHeading("PACKAGE-SPECIFIC TERMS"),
        bullet("Unused Content", "Pieces (reels or photographs) not used within the corresponding month will not be cumulative or transferable to subsequent months."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("Master_Agreement_La_Nostra_Production_EN.docx", buf);
  console.log("done EN");
});
