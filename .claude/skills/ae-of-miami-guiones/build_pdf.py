# -*- coding: utf-8 -*-
"""
Genera AE_of_Miami_Guiones.pdf a partir de guiones_data.py (lista GUIONES).
Uso: python3 build_pdf.py
"""
import os
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, PageBreak
)

from guiones_data import GUIONES

styles = getSampleStyleSheet()

title_style = ParagraphStyle(
    "TitleAE", parent=styles["Title"], fontSize=20, textColor=colors.HexColor("#1A1A1A"),
    spaceAfter=2,
)
subtitle_style = ParagraphStyle(
    "SubtitleAE", parent=styles["Normal"], fontSize=11, textColor=colors.HexColor("#666666"),
    spaceAfter=18,
)
guion_title_style = ParagraphStyle(
    "GuionTitle", parent=styles["Heading1"], fontSize=16, textColor=colors.HexColor("#1A1A1A"),
    spaceBefore=0, spaceAfter=2,
)
guion_meta_style = ParagraphStyle(
    "GuionMeta", parent=styles["Normal"], fontSize=10, textColor=colors.HexColor("#888888"),
    fontName="Helvetica-Oblique", spaceAfter=14,
)
section_style = ParagraphStyle(
    "SectionAE", parent=styles["Heading2"], fontSize=13, textColor=colors.HexColor("#C00000"),
    spaceBefore=16, spaceAfter=8,
)
plano_label_style = ParagraphStyle(
    "PlanoLabel", parent=styles["Normal"], fontSize=10, textColor=colors.HexColor("#C00000"),
    fontName="Helvetica-Bold", spaceAfter=2,
)
dialogo_style = ParagraphStyle(
    "Dialogo", parent=styles["Normal"], fontSize=12, textColor=colors.HexColor("#111111"),
    leading=16, spaceAfter=4, leftIndent=10,
)
transicion_style = ParagraphStyle(
    "Transicion", parent=styles["Normal"], fontSize=9, textColor=colors.HexColor("#999999"),
    fontName="Helvetica-Oblique", spaceAfter=10, leftIndent=10,
)
option_style = ParagraphStyle(
    "Option", parent=styles["Normal"], fontSize=10.5, textColor=colors.HexColor("#222222"),
    leading=14, spaceAfter=6, leftIndent=10,
)
note_style = ParagraphStyle(
    "Note", parent=styles["Normal"], fontSize=9.5, textColor=colors.HexColor("#555555"),
    fontName="Helvetica-Oblique", spaceAfter=4,
)


def add_guion(story, g):
    story.append(Paragraph(f"Guion {g['numero']} — “{g['titulo']}”", guion_title_style))
    meta = f"Pilar: {g['pilar']}"
    if g.get("duracion"):
        meta += f" · Duración objetivo: {g['duracion']}"
    story.append(Paragraph(meta, guion_meta_style))

    story.append(Paragraph("GUION", section_style))
    for item in g["planos"]:
        label, desc = item[0], item[1]
        lines = item[2] if isinstance(item[2], list) else [item[2]]
        trans_before = item[3] if len(item) > 3 else None
        if trans_before:
            story.append(Paragraph(trans_before, transicion_style))
        story.append(Paragraph(f"{label} — {desc}", plano_label_style))
        for line in lines:
            story.append(Paragraph(f"“{line}”", dialogo_style))
        story.append(Spacer(1, 6))

    if g.get("hooks"):
        label = "OPCIONES DE HOOK" + (f" ({g.get('hook_planos')})" if g.get("hook_planos") else "")
        story.append(Paragraph(label, section_style))
        for i, h in enumerate(g["hooks"], 1):
            story.append(Paragraph(f"{i}. {h}", option_style))

    if g.get("ctas"):
        label = "OPCIONES DE CTA" + (f" ({g.get('cta_planos')})" if g.get("cta_planos") else "")
        story.append(Paragraph(label, section_style))
        for i, c in enumerate(g["ctas"], 1):
            story.append(Paragraph(f"{i}. {c}", option_style))

    notas = g.get("notas")
    if notas:
        story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#DDDDDD")))
        story.append(Spacer(1, 4))
        for n in (notas if isinstance(notas, list) else [notas]):
            story.append(Paragraph(f"Nota de producción: {n}", note_style))


def build():
    story = []
    story.append(Paragraph("AE OF MIAMI", title_style))
    story.append(Paragraph("Guiones para reels — hooks, diálogo, planos y CTA", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#DDDDDD")))
    story.append(Spacer(1, 10))

    for i, g in enumerate(GUIONES):
        if i > 0:
            story.append(PageBreak())
        add_guion(story, g)

    out_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "AE_of_Miami_Guiones.pdf")
    doc = SimpleDocTemplate(
        out_path,
        pagesize=letter,
        topMargin=0.75 * inch, bottomMargin=0.75 * inch,
        leftMargin=0.85 * inch, rightMargin=0.85 * inch,
    )
    doc.build(story)
    print(f"done: {out_path}")


if __name__ == "__main__":
    build()
