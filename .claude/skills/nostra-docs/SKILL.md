---
name: nostra-docs
description: Generate La Nostra Production's branded business documents — Master Collaboration Agreements (with an Anexo A / Exhibit A package description), invoices, and client welcome/onboarding emails — using the studio's editorial design system (Inter typeface, electric blue #2A2AF0 accent, black full-bleed header panels, card-style highlight blocks). Use this whenever the user asks to draft, update, or send a contract, agreement, invoice, or onboarding/welcome email for "La Nostra Production" or "Nostra Productions", for a new or existing client, in Spanish or English — even if they just say "make an invoice for [client]" or "send the welcome package to [client]" without naming this skill.
---

# La Nostra Production — branded document generator

This skill packages a working system for producing La Nostra's client-facing
paperwork so every future client gets the same polished, on-brand result
without re-deriving the design or re-typing the legal boilerplate each time.

## What this produces

1. **Master Collaboration Agreement** (ES: "Acuerdo Marco de Colaboración
   Audiovisual" / EN: "Master Audiovisual Collaboration Agreement") — a
   recurring, month-to-month services contract, plus an **Anexo A / Exhibit A**
   page describing the specific content package and price.
2. **Invoice** — a single-page, visually bolder document (full-bleed black
   header panel, huge price callout) for a specific client and billing period.
3. **Welcome/onboarding email** — the message that goes out with the above,
   with the correct order of next steps (sign → pay → creative-direction
   meeting → THEN shoot dates get scheduled).

Read `references/company-info.md` first — it has La Nostra's standing
details (contact info, Zelle payment info, the standard content package and
its price) so you don't have to ask the user to repeat them every time. Only
ask if something in there seems out of date or the user's request implies a
different package/price.

## Design system (the "brand")

- **Typeface:** Inter throughout. Headlines bold/heavy, body regular, small
  utility labels (page header, card eyebrows) at ~7.5pt bold in muted gray.
- **Color palette:**
  - Ink (body text): `#18181F`
  - Muted gray (labels, captions): `#6E6E7C`
  - Electric blue accent: `#2A2AF0` — reserved for section numbers, rules,
    the running page header, and the price in the pricing card. Body text
    stays black for legal readability; don't overuse the accent color.
  - Light card fill: `#F2F2F7` (neutral cards, e.g. the parties block)
  - Blue-tinted card fill: `#E9E9FF` (the pricing/highlight card)
  - Full-bleed panel black: `#0A0A0F` (invoice header only)
- **Layout patterns:**
  - A running page header with the studio name on the left and the document
    name on the right, using `PositionalTab` for the right alignment (not
    manual spacing) — see `utilityLine()` / `buildHeader()` in
    `scripts/template.js`.
  - Section headings are a bold blue two-digit number ("01", "02"...)
    followed by the bold black title, with a thin gray rule underneath.
  - Bullets use a small blue marker (▪) with the label bolded in black,
    e.g. **Pago único mensual:** rest of the sentence.
  - Key commercial info (price, package contents) gets a shaded "card" —
    a borderless single-cell table with padding — not just a plain
    paragraph. This is what makes the price/package feel like the visual
    focal point instead of just another bullet.
  - The invoice pushes the brand further than the agreement: a full-bleed
    black panel at the top with an oversized white title, mirroring the
    boldest treatment from the studio's reference material, since an
    invoice is a single page and can afford more visual weight than a
    multi-page contract.

`scripts/template.js` implements all of this as small composable helpers
(`run`, `para`, `bullet`, `sectionHeading`, `card`, `utilityLine`,
`buildHeader`, `titleBlock`, `numbering`, `pageProps`). Reuse it rather than
reinventing the styling — copy it into your working directory alongside a
new `build_<thing>.js` script.

## Workflow

### 1. Figure out what's different this time

Before writing anything, nail down:
- **Language:** Spanish, English, or both.
- **Client name** (and, for the agreement, whether the client's signature
  line should say something other than the default generic "Representative"
  — check `references/company-info.md` for the default and the rule about
  where client-specific tweaks are allowed to live).
- **Package and price** — default to the standard package in
  `references/company-info.md` unless the user says otherwise.
- **What's actually being requested** — a fresh standard template, a
  client-specific filled copy, just the invoice, just the email, or all
  three. Don't regenerate documents that weren't asked for.

If any of this is genuinely ambiguous (not inferable from context or the
defaults file), ask — don't guess on legal or financial terms.

### 2. Build the documents

- Copy `scripts/template.js` into the working directory.
- For an agreement, start from `scripts/build_agreement_example_es.js` or
  `_en.js` — these already contain the full, user-approved clause text (see
  `references/agreement-clauses.md` for the section-by-section summary).
  Swap `[NOMBRE DEL CLIENTE]` / `[CLIENT NAME]` for the real name (or leave
  the placeholder if this is meant to stay a reusable template), and update
  the Anexo A / Exhibit A package details if they differ from the standard.
- For an invoice, start from `scripts/build_invoice_example.js`. Fill in the
  invoice number, date, due date, and billing period — a sensible default
  for the due date is the day before the invoiced service month starts,
  since the agreement requires payment before the month begins.
- Run each script with `node build_whatever.js` and check the output file
  exists.

### 3. Verify before delivering

LibreOffice-based PDF preview is frequently broken in this sandbox — see
`references/environment-notes.md` for the exact failure mode and the
XML-based fallback verification to use instead. Always tell the user
honestly whether you could visually confirm the layout or only structurally
validate it.

### 4. Save and version the files

Follow the existing repo convention (see `references/environment-notes.md`
for the git mechanics):
- Reusable templates (with `[CLIENT NAME]` placeholders) → `entregables/`
- Client-specific filled copies → `entregables/clientes/`
- Commit and push after every change — the sandbox is ephemeral.

Never edit the standard templates while fulfilling a client-specific
request unless the user explicitly says the change should apply to the
standard going forward.

### 5. Draft the welcome email

Use `references/email-templates.md`. Match the email's language to the
documents' language, fill in the contact name and package specifics, and
keep the next-steps order intact — sign and pay come before any
creative-direction meeting, which comes before shoot dates get scheduled.

### 6. Delivering it

Default to sending the generated files straight to the user (so they can
review or forward them). If asked to also stage an email:
- Try creating a Gmail draft — but read `references/environment-notes.md`
  first, since the draft tool in this environment typically can't carry
  attachments, and the fallback (uploading to Drive and linking) leaves the
  files **private** until the user manually shares them. Say so plainly
  rather than implying the draft is fully ready to send.
