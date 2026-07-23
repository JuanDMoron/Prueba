const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  BorderStyle, LevelFormat, WidthType, Table, TableRow, TableCell,
  ShadingType, PositionalTab, PositionalTabAlignment, PositionalTabRelativeTo,
  PositionalTabLeader, Header,
} = require("docx");

const FONT = "Inter";
const INK = "18181F";
const MUTED = "6E6E7C";
const ACCENT = "2A2AF0";
const RULE = "DCDCE6";
const CARD_FILL = "F2F2F7";
const ACCENT_TINT = "E9E9FF";

const PAGE_W = 12240, PAGE_H = 15840, MARGIN = 1080;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BULLET = "bullet-list";

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: 21, color: INK, ...opts });
}

function para(text, opts = {}) {
  return new Paragraph({ spacing: { after: 160 }, children: [run(text, opts)] });
}

function bullet(label, rest) {
  const children = [];
  if (label) children.push(run(label + ": ", { bold: true }));
  children.push(run(rest));
  return new Paragraph({
    numbering: { reference: BULLET, level: 0 },
    spacing: { after: 140 },
    children,
  });
}

function sectionHeading(num, title) {
  return new Paragraph({
    spacing: { before: 400, after: 140 },
    children: [
      run(num, { bold: true, color: ACCENT, size: 27 }),
      run("   " + title, { bold: true, color: INK, size: 27 }),
    ],
  });
}

function subHeading(title) {
  return new Paragraph({
    spacing: { before: 260, after: 120 },
    children: [run(title, { bold: true, color: INK, size: 23 })],
  });
}

function rule() {
  return new Paragraph({
    spacing: { before: 40, after: 280 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE } },
    children: [run("")],
  });
}

function noBorders() {
  const b = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
  return { top: b, bottom: b, left: b, right: b, insideHorizontal: b, insideVertical: b };
}

function card(children, fill = CARD_FILL) {
  return new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    borders: noBorders(),
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill },
            margins: { top: 220, bottom: 220, left: 300, right: 300 },
            children,
          }),
        ],
      }),
    ],
  });
}

function utilityLine(left, right) {
  return new Paragraph({
    spacing: { after: 0 },
    children: [
      new TextRun({
        font: FONT, size: 15, color: MUTED, bold: true,
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

function buildHeader(rightLabel) {
  return new Header({
    children: [
      utilityLine("LA NOSTRA PRODUCTION", rightLabel),
      new Paragraph({
        spacing: { before: 80, after: 0 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: RULE } },
        children: [run("")],
      }),
    ],
  });
}

function titleBlock(line1, line2, kicker) {
  return [
    para(kicker, { size: 15, color: MUTED, bold: true }),
    new Paragraph({
      spacing: { before: 40, after: 60 },
      children: [run(line1, { bold: true, size: 52, color: INK })],
    }),
    new Paragraph({
      spacing: { before: 0, after: 260 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: ACCENT } },
      children: [run(line2, { bold: true, size: 52, color: ACCENT })],
    }),
  ];
}

function numbering() {
  return {
    config: [
      {
        reference: BULLET,
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "▪",
            alignment: AlignmentType.LEFT,
            style: {
              run: { color: ACCENT, font: FONT },
              paragraph: { indent: { left: 720, hanging: 360 } },
            },
          },
        ],
      },
    ],
  };
}

function pageProps() {
  return {
    page: {
      size: { width: PAGE_W, height: PAGE_H },
      margin: { top: 1260, bottom: 1080, left: MARGIN, right: MARGIN, header: 620, footer: 620 },
    },
  };
}

module.exports = {
  FONT, INK, MUTED, ACCENT, RULE, CARD_FILL, ACCENT_TINT, CONTENT_W,
  run, para, bullet, sectionHeading, subHeading, rule, card, utilityLine,
  spacer, buildHeader, titleBlock, numbering, pageProps,
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, WidthType,
};
