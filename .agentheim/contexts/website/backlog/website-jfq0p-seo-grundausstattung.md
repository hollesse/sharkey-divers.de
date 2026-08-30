---
id: website-jfq0p
title: "SEO-Grundausstattung: seo-tag, sitemap, robots.txt, kanonische Domain"
status: backlog
type: feature
context: website
created: 2026-08-30
completed:
depends_on: [infrastructure-001-walking-skeleton]
blocks: []
tags: [seo]
related_adrs: []
related_research: []
prior_art: []
---

## Why
Der Vision-Kern ist Auffindbarkeit: Interessenten sollen den Verein finden, wenn sie tauchen lernen wollen. Ohne Basics (Titles, Descriptions, Sitemap, kanonische Domain) verschenkt die neue Seite genau das.

## What
`jekyll-seo-tag` + `jekyll-sitemap` einbinden, `robots.txt`, kanonische Domain-Variante (Apex ohne `www`, siehe Cutover-ADR) durchziehen, sinnvolle Titles/Descriptions in Layouts und Frontmatter.

## Acceptance criteria
- [ ] Jede Seite liefert Title, Description, canonical und OpenGraph-Basics.
- [ ] `sitemap.xml` und `robots.txt` werden ausgeliefert.

## Notes
Backlog-Capture aus dem Foundation-Pass — vor Umsetzung refinen. Lokale Auffindbarkeit via JSON-LD ist separat: [[website-vekmt]].
