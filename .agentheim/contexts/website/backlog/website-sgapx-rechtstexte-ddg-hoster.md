---
id: website-sgapx
title: "Rechtstexte: Impressum auf DDG-Stand, Datenschutzerklärung mit Hoster-Nennung"
status: backlog
type: feature
context: website
created: 2026-08-30
completed:
depends_on: [infrastructure-001-walking-skeleton]
blocks: []
tags: [recht, impressum, datenschutz]
related_adrs: []
related_research: []
prior_art: []
---

## Why
Hinweis des Architekten: Die Impressumspflicht richtet sich seit Mai 2024 nach **§ 5 DDG** (nicht mehr TMG) — aus der Altseite übernommene Formulierungen sind vermutlich veraltet. Die Datenschutzerklärung muss den Hoster (GitHub/Microsoft, Server-Logs, DPF-Zertifizierung) benennen. Kein Architekturentscheid, aber blockierend für den Launch.

## What
Impressum und Datenschutzerklärung als pflegbare Markdown-Seiten inhaltlich auf aktuellen Stand bringen: DDG-Referenz, Hoster-Nennung, ggf. OAuth-Worker-Hinweis (betrifft nur Redakteure). Inhalte liefert der Betreiber/Verein; das Task stellt Struktur und Vollständigkeits-Checkliste.

## Acceptance criteria
- [ ] Impressum nennt die Pflichtangaben nach § 5 DDG.
- [ ] Datenschutzerklärung benennt GitHub Pages als Hoster inkl. Server-Logs.
- [ ] Beide Seiten sind über Decap/Sveltia pflegbar.

## Notes
Backlog-Capture aus dem Foundation-Pass — vor Umsetzung refinen; finale Textprüfung liegt beim Verein (keine Rechtsberatung durch Tasks).
