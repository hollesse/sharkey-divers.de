---
id: design-system-001-styleguide
title: Clot-Design-Prototyp als Jekyll-Theme übertragen (Styleguide-Gate)
status: doing
type: feature
context: design-system
created: 2026-08-30
completed:
depends_on: [infrastructure-001-walking-skeleton]
blocks: []
tags: [theme, design, styleguide-gate]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Das Design der Seite existiert bereits vollständig als abgenommener Clot-Prototyp (Claude Design). Bevor irgendein BC Frontend baut, muss dieses Design treu ins Jekyll-Theme übertragen und vom Betreiber abgenommen sein — dieses Task **ist** das Styleguide-Gate des Projekts. Ohne dieses Gate entstünden UI-Entscheidungen unter Feature-Druck am Prototyp vorbei.

## What
Aus dem Clot-Design-Prototyp ein Jekyll-Theme erzeugen: Layouts, Includes, Styles (Tokens für Farben/Typografie/Abstände), Assets. Umfang gemäß Design-Prompt (siehe Notes): Startseite (v1 statisch im Theme, Texte aus dem Prototyp übernehmen), Berichte-Übersicht, Bericht-Detail, Impressum — Impressum/Datenschutz als pflegbare Markdown-Seiten, Berichte als Blogposts.

## Acceptance criteria
- [ ] Das Jekyll-Theme rendert Startseite, Berichte-Übersicht, Bericht-Detail und Impressum visuell getreu zum Clot-Prototyp (Desktop und Mobil).
- [ ] Farb-, Typografie- und Abstands-Werte sind als benannte Tokens (SCSS-Variablen o. ä.) zentral definiert, nicht verstreut hart codiert.
- [ ] Texte und Bilder des Prototyps sind übernommen.
- [ ] Impressum und Datenschutz existieren als Markdown-Seiten, die das Theme-Layout nutzen.
- [ ] Berichte sind Jekyll-Posts mit eigenem Layout; die Übersicht listet sie.
- [ ] **Gate:** Der Betreiber hat das Theme im Vergleich zum Prototyp geprüft und explizit abgenommen, bevor irgendein Frontend-Feature-Task eines anderen BCs nach todo promotet wird.

## Notes
**Sonderfall dieses Projekts:** Das Design ist nicht zu erfinden, sondern zu übertragen — der Prototyp ist die verbindliche Referenz. Abweichungen nur, wo Jekyll/Decap-Pflegbarkeit es erzwingt, und dann dokumentiert.

Baut auf dem Walking Skeleton ([[infrastructure-001-walking-skeleton]]) auf: Stack, Hosting und Decap-Grundkonfiguration laufen bereits, dieses Task bringt das echte Design hinein.

**Original-Design-Prompt des Betreibers (verbatim, für den Import des Prototyps):**

> Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
> https://claude.ai/design/p/8622bda2-aa59-4b78-8a9f-c4a3541f3ab0?file=Sharkey+Divers+Website.dc.html
>
> Focus on these files (the whole project is readable):
> - `Sharkey Divers Website.dc.html`
> - `assets/bericht-1.webp`
> - `assets/bericht-2.webp`
> - `assets/training-bild.webp`
> - `assets/uebersicht-1.webp`
> - `assets/uebersicht-2.webp`
> - `assets/uebersicht-4.webp`
> - `assets/uebersicht-6.webp`
> - `assets/verein-gruppe.webp`
> - `assets/verein-schoenbach.webp`
> - `assets/verein-stammtisch.webp`
> - `Bericht.dc.html`
> - `Berichte.dc.html`
> - `deck-stage.js`
> - `dist/assets/bericht-1.webp`
> - `dist/assets/bericht-2.webp`
> - `dist/assets/bericht-bild-1.webp`
> - `dist/assets/bericht-bild-2.webp`
> - `dist/assets/bericht-hero.webp`
> - `dist/assets/hero.webp`
> - `dist/assets/logo.png`
> - `dist/assets/training-bild.webp`
> - `dist/assets/uebersicht-1.webp`
> - `dist/assets/uebersicht-2.webp`
> - `dist/assets/uebersicht-4.webp`
> - `dist/assets/uebersicht-6.webp`
> - `dist/assets/verein-gruppe.webp`
> - `dist/assets/verein-schoenbach.webp`
> - `dist/assets/verein-stammtisch.webp`
> - `dist/bericht.html`
> - `dist/berichte.html`
> - `dist/impressum.html`
> - `dist/index.html`
> - `dist/robots.txt`
> - `dist/support.js`
> - `doc-page.js`
> - `export-src-bericht.html`
> - `export-src-berichte.html`
> - `export-src-impressum.html`
> - `export-src-index.html`
> - `image-slot-standalone.js`
> - `image-slot.js`
> - `Impressum.dc.html`
> - `jekyll-decap-setup.md`
> - `support.js`
> - `uploads/Bildschirmfoto 2026-08-29 um 11.41.23.png`
>
> Implement: Erzeuge aus diesem Prototypen ein Jekyll Theme und mache dann eine per Jekyll pflegbare Seite daraus. Die Text können bereits übernommen werden. Mache die Startseite erstmal nicht pflegbar sondern erstmal nur das Theme erstellen und dann Impressum und Datenschutz als Pflegbare (Markdown) Seiten und die Blogpost.

Hinweis: Im Prototyp-Projekt liegt eine Datei `jekyll-decap-setup.md` — beim Import lesen, sie enthält vermutlich bereits Setup-Überlegungen aus der Design-Session.
