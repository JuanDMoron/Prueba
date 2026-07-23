const {
  Document, Packer, Paragraph, TextRun, BorderStyle, WidthType,
  Table, TableRow, TableCell, ShadingType, VerticalAlign,
  PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo, PositionalTabLeader,
} = require("docx");

const FONT = "Inter";
const INK = "18181F";
const MUTED = "6E6E7C";
const ACCENT = "2A2AF0";
const RULE = "DCDCE6";
const CARD_FILL = "F2F2F7";
const ACCENT_TINT = "E9E9FF";
const PANEL_BLACK = "0A0A0F";

const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1080;
const CONTENT_W = PAGE_W - MARGIN * 2;

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 21, color: INK, ...opts });
}
function p(children, opts = {}) {
  return new Paragraph({ spacing: { after: 160 }, ...opts, children });
}
function noBorders() {
  const b = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

// Full-bleed black panel (spans past the page margins on both sides)
function blackPanel(children) {
  return new Table({
    width: { size: PAGE_W, type: WidthType.DXA },
    columnWidths: [PAGE_W],
    indent: { size: -MARGIN, type: WidthType.DXA },
    borders: noBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: PAGE_W, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: PANEL_BLACK },
            margins: { top: 520, bottom: 560, left: MARGIN, right: MARGIN },
            children,
          }),
        ],
      }),
    ],
  });
}

function card(children, fill = CARD_FILL, width = CONTENT_W) {
  return new Table({
    width: { size: width, type: WidthType.DXA },
    columnWidths: [width],
    borders: noBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: width, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill },
            margins: { top: 220, bottom: 220, left: 300, right: 300 },
            children,
          }),
        ],
      }),
    ],
  });
}

function twoCol(leftChildren, rightChildren, fill = CARD_FILL) {
  const gap = 240;
  const colW = Math.floor((CONTENT_W - gap) / 2);
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [colW, gap, colW],
    borders: noBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: colW, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill },
            margins: { top: 220, bottom: 220, left: 300, right: 260 },
            children: leftChildren,
          }),
          new TableCell({
            width: { size: gap, type: WidthType.DXA },
            borders: noBorders(),
            children: [new Paragraph({ children: [run("")] })],
          }),
          new TableCell({
            width: { size: colW, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill },
            margins: { top: 220, bottom: 220, left: 300, right: 260 },
            children: rightChildren,
          }),
        ],
      }),
    ],
  });
}

function utilityLine(left, right, color = MUTED) {
  return new Paragraph({
    spacing: { after: 0 },
    children: [
      new TextRun({
        font: FONT, size: 15, color, bold: true,
        children: [
          left,
          new PositionalTab({
            alignment: PositionalTabAlignment.RIGHT,
            relativeTo: PositionalTabRelativeTo.MARGIN,
            leader: PositionalTabLeader.NONE,
          }),
          right,
        ],
      }),
    ],
  });
}

function spacer(h) {
  return new Paragraph({ spacing: { after: h }, children: [run("")] });
}

function lineItemsHeader() {
  return new TableRow({
    tableHeader: true,
    children: [
      cell("DESCRIPTION", 5760, PANEL_BLACK, "FFFFFF", { alignment: undefined }),
      cell("PERIOD", 1980, PANEL_BLACK, "FFFFFF"),
      cell("AMOUNT", 2340, PANEL_BLACK, "FFFFFF", { right: true }),
    ],
  });
}

function cell(text, width, fill, color, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill },
    margins: { top: 180, bottom: 180, left: 220, right: 220 },
    children: [
      new Paragraph({
        alignment: opts.right ? "right" : "left",
        children: [run(text, { bold: true, size: 15, color })],
      }),
    ],
  });
}

function dataCell(text, width, opts = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    margins: { top: 220, bottom: 220, left: 220, right: 220 },
    borders: {
      bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE },
      top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
      right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
    },
    children: [
      new Paragraph({
        alignment: opts.right ? "right" : "left",
        children: [run(text, { bold: opts.bold, size: opts.size || 21, color: opts.color || INK })],
      }),
    ],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_W, height: PAGE_H },
          margin: { top: 900, bottom: 1000, left: MARGIN, right: MARGIN },
        },
      },
      children: [
        blackPanel([
          utilityLine("LA NOSTRA PRODUCTION", "[CLIENT NAME]", MUTED),
          spacer(260),
          new Paragraph({
            spacing: { after: 40 },
            children: [run("Invoice.", { bold: true, size: 76, color: "FFFFFF" })],
          }),
          spacer(200),
          new Paragraph({
            children: [
              run("Nº ", { bold: true, size: 19, color: ACCENT }),
              run("[INV-000]", { bold: true, size: 19, color: "FFFFFF" }),
              run("      ", { size: 19 }),
              run("Date: ", { bold: true, size: 19, color: ACCENT }),
              run("[DATE]", { bold: true, size: 19, color: "FFFFFF" }),
              run("      ", { size: 19 }),
              run("Due: ", { bold: true, size: 19, color: ACCENT }),
              run("[DUE DATE]", { bold: true, size: 19, color: "FFFFFF" }),
            ],
          }),
        ]),

        spacer(360),

        twoCol(
          [
            new Paragraph({ spacing: { after: 100 }, children: [run("BILL TO", { bold: true, size: 15, color: MUTED })] }),
            new Paragraph({ spacing: { after: 20 }, children: [run("[CLIENT NAME]", { bold: true, size: 24 })] }),
          ],
          [
            new Paragraph({ spacing: { after: 100 }, children: [run("FROM", { bold: true, size: 15, color: MUTED })] }),
            new Paragraph({ spacing: { after: 20 }, children: [run("La Nostra Production", { bold: true, size: 24 })] }),
            new Paragraph({ spacing: { after: 0 }, children: [run("lanostra.production@gmail.com", { size: 18, color: MUTED })] }),
            new Paragraph({ spacing: { after: 0 }, children: [run("346-450-4325", { size: 18, color: MUTED })] }),
          ],
        ),

        spacer(420),

        new Table({
          width: { size: CONTENT_W, type: WidthType.DXA },
          columnWidths: [5760, 1980, 2340],
          borders: noBorders(),
          rows: [
            lineItemsHeader(),
            new TableRow({
              children: [
                dataCell("Standard Monthly Content Package — 12 edited reels + 20 edited photos", 5760),
                dataCell("[MONTH]", 1980),
                dataCell("$1,500.00", 2340, { right: true, bold: true }),
              ],
            }),
          ],
        }),

        spacer(360),

        card([
          new Paragraph({ alignment: "right", spacing: { after: 60 }, children: [run("TOTAL DUE", { bold: true, size: 15, color: MUTED })] }),
          new Paragraph({
            alignment: "right",
            spacing: { after: 60 },
            children: [run("$1,500.00", { bold: true, size: 56, color: ACCENT })],
          }),
          new Paragraph({
            alignment: "right",
            children: [run("Single payment — due before the start of the service month", { italics: true, size: 16, color: MUTED })],
          }),
        ], ACCENT_TINT),

        spacer(360),

        card([
          new Paragraph({ spacing: { after: 120 }, children: [run("PAYMENT METHOD — ZELLE", { bold: true, size: 15, color: MUTED })] }),
          new Paragraph({ spacing: { after: 20 }, children: [
            run("Company name  ", { bold: true, size: 20 }),
            run("Msegov LLC", { size: 20 }),
          ] }),
          new Paragraph({ spacing: { after: 0 }, children: [
            run("Email  ", { bold: true, size: 20 }),
            run("Lanostra.production@gmail.com", { size: 20 }),
          ] }),
        ]),

        spacer(420),

        new Paragraph({
          spacing: { before: 40, after: 200 },
          border: { top: { style: BorderStyle.SINGLE, size: 8, color: ACCENT } },
          children: [run("")],
        }),
        new Paragraph({ spacing: { after: 60 }, children: [run("Thank you for your business.", { bold: true, size: 22 })] }),
        new Paragraph({ children: [run("Questions about this invoice? lanostra.production@gmail.com · 346-450-4325", { size: 17, color: MUTED })] }),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  require("fs").writeFileSync("NostraInvoice.docx", buf);
  console.log("done invoice template");
});
