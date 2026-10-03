# -*- coding: utf-8 -*-
"""
Genera la versión web (HTML) de los guiones para publicarla como Artifact.
Uso: python3 build_html.py [--pendientes]
"""
import sys, html, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from guiones_data import GUIONES

SOLO_PENDIENTES = "--pendientes" in sys.argv
if SOLO_PENDIENTES:
    GUIONES = [g for g in GUIONES if g.get("estado")]

e = html.escape

def estado_info(g):
    est = g.get("estado")
    if not est:
        return "Aprobado", "ok"
    low = est.lower()
    if "pendiente de grabar" in low:
        return "Pendiente de grabar", "film"
    if "placeholder" in low:
        return "Placeholder", "hold"
    return "Draft", "draft"

def lines_of(raw):
    if raw is None:
        return []
    return raw if isinstance(raw, list) else [raw]

def render_guion(g):
    label, cls = estado_info(g)
    out = [f'<section class="guion" id="g{g["numero"]}">']
    out.append('<header class="g-head">')
    out.append(f'<span class="g-num">{g["numero"]:02d}</span>')
    out.append('<div class="g-titles">')
    out.append(f'<h2>{e(g["titulo"])}</h2>')
    meta = [f'<span class="chip">{e(g["pilar"])}</span>']
    if g.get("duracion"):
        meta.append(f'<span class="chip">{e(g["duracion"])}</span>')
    meta.append(f'<span class="status {cls}">{e(label)}</span>')
    out.append(f'<div class="meta">{"".join(meta)}</div>')
    out.append('</div></header>')

    refs = g.get("referencias")
    if refs:
        items = "".join(
            f'<li><a href="{e(r["link"])}" target="_blank" rel="noopener">{e(r["link"].replace("https://www.", ""))}</a>'
            f'<p>{e(r["trend"])}</p></li>' for r in refs)
        out.append(f'<aside class="ref"><h3>Referencia</h3><ul>{items}</ul></aside>')
    else:
        out.append('<aside class="ref none"><h3>Referencia</h3><p>Sin trend de referencia. Idea propia.</p></aside>')

    out.append('<ol class="planos">')
    for item in g["planos"]:
        lab, desc, raw = item[0], item[1], item[2]
        trans = item[3] if len(item) > 3 else None
        if trans:
            out.append(f'<li class="trans" aria-hidden="false">{e(trans.strip("[]"))}</li>')
        out.append('<li class="plano">')
        out.append(f'<div class="p-label"><span class="p-n">{e(lab.title())}</span><span class="p-desc">{e(desc)}</span></div>')
        ls = lines_of(raw)
        if ls:
            out.append('<div class="lines">' + "".join(f'<p class="line">“{e(l)}”</p>' for l in ls) + '</div>')
        else:
            out.append('<p class="noline">Sin diálogo</p>')
        out.append('</li>')
    out.append('</ol>')

    opts = []
    if g.get("hooks"):
        hp = f' <span class="where">{e(g["hook_planos"])}</span>' if g.get("hook_planos") else ""
        opts.append('<div class="opt"><h3>Opciones de hook' + hp + '</h3><ol>' +
                    "".join(f"<li>{e(h)}</li>" for h in g["hooks"]) + '</ol></div>')
    if g.get("ctas"):
        cp = f' <span class="where">{e(g["cta_planos"])}</span>' if g.get("cta_planos") else ""
        opts.append('<div class="opt"><h3>Opciones de CTA' + cp + '</h3><ol>' +
                    "".join(f"<li>{e(c)}</li>" for c in g["ctas"]) + '</ol></div>')
    if opts:
        out.append('<div class="opts">' + "".join(opts) + '</div>')

    notas = g.get("notas")
    if notas:
        ns = notas if isinstance(notas, list) else [notas]
        out.append('<div class="notas"><h3>Notas de producción</h3><ul>' +
                   "".join(f"<li>{e(n[0].upper() + n[1:])}</li>" for n in ns) + '</ul></div>')
    out.append('<a class="top" href="#indice">Volver al índice</a>')
    out.append('</section>')
    return "\n".join(out)

counts = {}
for g in GUIONES:
    lab, cls = estado_info(g)
    counts[lab] = counts.get(lab, 0) + 1
order = ["Aprobado", "Pendiente de grabar", "Draft", "Placeholder"]
plural = {"Aprobado":"aprobados","Pendiente de grabar":"pendiente de grabar","Draft":"drafts","Placeholder":"placeholder"}
summary = " · ".join(f"{counts[k]} {plural[k] if counts[k] > 1 else k.lower()}" for k in order if k in counts)

rows = []
for g in GUIONES:
    lab, cls = estado_info(g)
    rows.append(f'<tr><td class="n">{g["numero"]:02d}</td><td><a href="#g{g["numero"]}">{e(g["titulo"])}</a></td>'
                f'<td class="pil">{e(g["pilar"])}</td><td class="d">{e(g.get("duracion",""))}</td>'
                f'<td><span class="status {cls}">{e(lab)}</span></td></tr>')

CSS = """
/* Layout: one reading column; dealer-sign band header, index table, then each script as a section */
:root{
  --bg:#f4f4f1; --surface:#ffffff; --ink:#17171b; --muted:#5d5d63; --line:#dcdcd5;
  --sign:#111114; --signText:#f7f7f2; --yellow:#e9cb1c; --yellowInk:#17171b;
  --ok:#2f7d4f; --okBg:#e3f1e8; --film:#b2421f; --filmBg:#f8e4dc; --draft:#7a5f00; --draftBg:#fbf1c4;
  --hold:#55555c; --holdBg:#e9e9ec;
  --display:"Barlow Condensed","Arial Narrow",Arial,sans-serif;
  --body:"Barlow","Helvetica Neue",Arial,sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){
  --bg:#121215; --surface:#1b1b20; --ink:#ececea; --muted:#a3a3a8; --line:#303037;
  --sign:#0a0a0c; --signText:#f2f2ee; --yellow:#e9cb1c; --yellowInk:#141416;
  --ok:#7cc79a; --okBg:#1d3326; --film:#f08f6c; --filmBg:#3a2119; --draft:#e9cb1c; --draftBg:#352f12;
  --hold:#b9b9c0; --holdBg:#2a2a30; color-scheme:dark}}
:root[data-theme="dark"]{
  --bg:#121215; --surface:#1b1b20; --ink:#ececea; --muted:#a3a3a8; --line:#303037;
  --sign:#0a0a0c; --signText:#f2f2ee; --yellow:#e9cb1c; --yellowInk:#141416;
  --ok:#7cc79a; --okBg:#1d3326; --film:#f08f6c; --filmBg:#3a2119; --draft:#e9cb1c; --draftBg:#352f12;
  --hold:#b9b9c0; --holdBg:#2a2a30; color-scheme:dark}
body{background:var(--bg);color:var(--ink);font-family:var(--body);font-size:16px;line-height:1.55}
.wrap{max-width:860px;margin:0 auto;padding-inline:16px;padding-block:0 64px}
.band{background:var(--sign);color:var(--signText)}
.band .inner{max-width:860px;margin:0 auto;padding-inline:16px;padding-block:28px 0}
.brand{font-family:var(--display);font-weight:700;font-size:15px;letter-spacing:.18em;text-transform:uppercase;opacity:.75;margin:0}
.band h1{font-family:var(--display);font-weight:700;font-size:clamp(34px,7vw,52px);line-height:1;margin:6px 0 10px;text-wrap:balance}
.band p.sub{margin:0 0 22px;color:var(--signText);opacity:.8;max-width:60ch}
.strip{background:var(--yellow);color:var(--yellowInk);font-family:var(--display);font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:14px}
.strip .inner{max-width:860px;margin:0 auto;padding-inline:16px;padding-block:8px}
h2,h3{font-family:var(--display);text-wrap:balance}
.idx{margin-top:32px}
.idx h2{font-size:24px;margin:0 0 12px;text-transform:uppercase;letter-spacing:.06em}
.tablewrap{overflow-x:auto;background:var(--surface);border:1px solid var(--line);border-radius:6px}
table{border-collapse:collapse;width:100%;min-width:560px;font-size:15px}
th,td{text-align:left;padding:10px 12px;border-bottom:1px solid var(--line);vertical-align:top}
th{font-family:var(--display);font-weight:600;text-transform:uppercase;letter-spacing:.08em;font-size:13px;color:var(--muted)}
tr:last-child td{border-bottom:0}
td.n,td.d{font-variant-numeric:tabular-nums;white-space:nowrap;color:var(--muted)}
td a{color:var(--ink);font-weight:600;text-decoration-color:var(--yellow);text-decoration-thickness:2px;text-underline-offset:3px}
a:focus-visible{outline:2px solid var(--yellow);outline-offset:2px}
.status{display:inline-block;font-family:var(--display);font-weight:600;font-size:13px;letter-spacing:.06em;text-transform:uppercase;padding:2px 8px;border-radius:3px;white-space:nowrap}
.status.ok{color:var(--ok);background:var(--okBg)}
.status.film{color:var(--film);background:var(--filmBg)}
.status.draft{color:var(--draft);background:var(--draftBg)}
.status.hold{color:var(--hold);background:var(--holdBg)}
.guion{margin-top:56px;padding-top:24px;border-top:3px solid var(--ink)}
.g-head{display:flex;gap:16px;align-items:flex-start}
.g-num{font-family:var(--display);font-weight:700;font-size:48px;line-height:.9;background:var(--yellow);color:var(--yellowInk);padding:6px 10px 4px;border-radius:3px;font-variant-numeric:tabular-nums}
.g-titles{min-width:0}
.g-titles h2{font-size:clamp(26px,5vw,34px);line-height:1.05;margin:0 0 8px}
.meta{display:flex;flex-wrap:wrap;gap:6px}
.chip{font-size:14px;color:var(--muted);border:1px solid var(--line);border-radius:3px;padding:1px 8px;background:var(--surface)}
.planos{list-style:none;margin:24px 0 0;padding:0;display:grid;gap:10px}
.plano{background:var(--surface);border:1px solid var(--line);border-radius:6px;padding:12px 14px;display:grid;gap:6px}
.p-label{display:flex;flex-wrap:wrap;gap:4px 10px;align-items:baseline}
.p-n{font-family:var(--display);font-weight:700;text-transform:uppercase;letter-spacing:.08em;font-size:14px;white-space:nowrap}
.p-desc{color:var(--muted);font-size:15px;min-width:0}
.lines{display:grid;gap:2px}
.line{margin:0;font-size:18px;line-height:1.45}
.noline{margin:0;font-size:14px;color:var(--muted);font-style:italic}
.trans{font-size:13px;color:var(--muted);font-style:italic;padding-left:14px;letter-spacing:.02em}
.trans::before{content:"↓ ";font-style:normal}
.opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:28px}
.opt{min-width:0}
.opt h3,.notas h3{font-size:18px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 8px}
.where{font-family:var(--body);font-size:13px;font-weight:400;text-transform:none;letter-spacing:0;color:var(--muted)}
.opt ol{margin:0;padding-left:22px;display:grid;gap:6px}
.ref{margin-top:18px;padding:12px 16px;background:var(--surface);border:1px solid var(--line);border-radius:6px}
.ref h3{font-size:15px;text-transform:uppercase;letter-spacing:.08em;margin:0 0 6px;color:var(--muted)}
.ref ul{list-style:none;margin:0;padding:0;display:grid;gap:10px}
.ref a{font-weight:600;color:var(--ink);text-decoration-color:var(--yellow);text-decoration-thickness:2px;text-underline-offset:3px;word-break:break-all}
.ref p{margin:4px 0 0;color:var(--muted);font-size:15px}
.ref.none p{margin:0}
.notas{margin-top:24px;padding:14px 16px;border-left:4px solid var(--yellow);background:var(--surface);border-radius:0 6px 6px 0}
.notas ul{margin:0;padding-left:18px;display:grid;gap:6px;color:var(--muted);font-size:15px}
.top{display:inline-block;margin-top:16px;font-size:14px;color:var(--muted)}
@media (max-width:600px){table{min-width:0}.pil,.d{display:none}}
@media (max-width:480px){.g-num{font-size:36px}.line{font-size:17px}}
@media (prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
html{scroll-behavior:smooth}
"""

SUBTITULO = ("Videos pendientes por grabar. " if SOLO_PENDIENTES else "") + "Diálogo por plano, referencia, opciones de hook y de CTA, y notas de producción. Presenta: Daniela."

page = f"""<title>AE of Miami Guiones</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Barlow:ital,wght@0,400;0,600;1,400&display=swap">
<style>{CSS}</style>
<div class="band"><div class="inner">
<p class="brand">AE of Miami</p>
<h1>Guiones para reels</h1>
<p class="sub">{e(SUBTITULO)}</p>
</div>
<div class="strip"><div class="inner">{len(GUIONES)} videos · {e(summary)}</div></div>
</div>
<main class="wrap">
<section class="idx" id="indice">
<h2>Índice</h2>
<div class="tablewrap"><table>
<thead><tr><th>#</th><th>Guion</th><th class="pil">Pilar</th><th class="d">Duración</th><th>Estado</th></tr></thead>
<tbody>{''.join(rows)}</tbody></table></div>
</section>
{''.join(render_guion(g) for g in GUIONES)}
</main>
"""
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ae-of-miami-guiones.html")
open(out, "w", encoding="utf-8").write(page)
print(out, len(page))
