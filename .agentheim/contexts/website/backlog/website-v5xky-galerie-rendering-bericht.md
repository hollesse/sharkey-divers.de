---
id: website-v5xky
title: "Galerie-Rendering im Bericht-Template"
status: backlog
type: feature
context: website
created: 2026-08-30
completed:
depends_on: [design-system-001-styleguide]
blocks: []
tags: [galerie, berichte, frontend]
related_adrs: []
related_research: []
prior_art: []
---

## Why
Kleine Fotogalerien an Berichten sind das erklärte Nice-to-have der Vision — Tauchberichte leben von Bildern.

## What
Galerie-Darstellung im Bericht-Layout: Markup für eine Bildliste, `loading="lazy"`, feste `width`/`height` bzw. Aspect-Ratio-Boxen gegen Layout-Shift, CSS-gecroppte Thumbnails desselben Assets (kein `srcset` in v1, gemäß Bild-Handling-ADR). Dazu die Decap/Sveltia-Modellierung: Wie erfasst der Redakteur die Galerie (Image-List-Widget im Frontmatter vs. Inline-Markdown)? Das klärt die Refine-Phase.

## Acceptance criteria
- [ ] Ein Redakteur kann im CMS mehrere Bilder an einen Bericht hängen; sie erscheinen als Galerie im gerenderten Bericht.
- [ ] Kein Layout-Shift beim Laden; Bilder laden lazy.

## Notes
Backlog-Capture aus dem Foundation-Pass — vor Umsetzung refinen. Hängt fachlich an [[infrastructure-qxeyp]] (Upload-Transformation) und am Styleguide-Gate [[design-system-001-styleguide]].
