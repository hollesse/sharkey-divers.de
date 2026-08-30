---
id: infrastructure-001-walking-skeleton
title: "Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end"
status: todo
type: spike
context: infrastructure
created: 2026-08-30
completed:
depends_on: [infrastructure-kwtv6, infrastructure-any72, infrastructure-f8deg, infrastructure-qxeyp, infrastructure-tck5g, infrastructure-d3m1s]
blocks: []
tags: [walking-skeleton, foundation]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Bevor das echte Design und die Inhalte kommen, muss der gewählte Stack einmal komplett durchgestochen sein: Jekyll baut, das CMS committet, der Deploy läuft, ein Redakteur kann sich anmelden. Feature-dünn, Architektur-dick — das erste lauffähige Prototyp-Inkrement des Projekts. Ohne diesen Beweis würden Theme- und Content-Tasks auf ungetesteten Fundament-Annahmen aufsetzen.

## What
Ein minimales, hässliches, aber vollständig funktionierendes Ende-zu-Ende-Gerüst gemäß der in den Decision-Tasks beschlossenen ADRs: Jekyll-4-Projekt mit Platzhalter-Layout, eine Beispiel-Seite, ein Beispiel-Bericht (Post), Sveltia CMS unter `/admin/` mit GitHub-Backend + OAuth-Worker, GitHub-Actions-Workflow (Build + Deploy auf GitHub Pages), Auslieferung zunächst unter der `*.github.io`-URL (mit `noindex` — DNS-Cutover kommt später als eigener Task).

## Acceptance criteria
- [ ] `bundle exec jekyll build` läuft lokal und in GitHub Actions fehlerfrei; Push auf `main` deployt automatisch.
- [ ] Die Seite ist unter der `*.github.io`-URL erreichbar (mit `noindex`) und zeigt Startseiten-Platzhalter, eine Markdown-Seite und einen Beispiel-Bericht in der Berichte-Liste.
- [ ] Login unter `/admin/` funktioniert über "Mit GitHub anmelden" (OAuth-Worker deployt); ein im CMS angelegter Test-Bericht mit Bild erscheint nach dem automatischen Build live.
- [ ] Der Bild-Upload landet gemäß Media-Konvention in `assets/uploads/` und ist als WebP ≤ 1600 px transformiert.
- [ ] `Gemfile.lock` und Ruby-Version gepinnt; Dependabot konfiguriert.

## Notes
**Constraint (2026-08-30):** Live-Deploy unter der `*.github.io`-Adresse ist ab Tag 1 **Pflicht** — der Betreiber präsentiert Zwischenstände. Das Repo ist/wird dafür public (siehe [[infrastructure-kwtv6]]); vorher Commit-Autoren-E-Mails prüfen. Die Custom Domain kommt erst beim Cutover. `noindex`/`robots.txt` auf der Preview-URL nicht vergessen.

Kein Anspruch an Optik — das Design kommt danach über [[design-system-001-styleguide]]. Der Original-Design-Prompt des Betreibers (Import des Clot-Prototyps via claude_design MCP) liegt verbatim in den Notes des Styleguide-Tasks; im Prototyp-Projekt existiert außerdem eine Datei `jekyll-decap-setup.md`, die beim Skeleton-Bau gelesen werden sollte — sie enthält vermutlich Setup-Überlegungen aus der Design-Session.

Achtung bei der CMS-Konfiguration: `config.yml` Decap-kompatibel halten (Rückfall-Option aus [[infrastructure-any72]]).
