---
id: 0004
title: "Build in GitHub Actions, Deploy als austauschbares Blatt"
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-f8deg]
related_research: []
---

# ADR 0004: Build in GitHub Actions, Deploy als austauschbares Blatt

## Context
Der Pages-interne Jekyll-Build (`Build with Jekyll`-Action von GitHub Pages) erzwingt die veraltete `github-pages`-Gem und eine feste Plugin-Whitelist. Das schränkt die Theme-Entwicklung unnötig ein und koppelt den Build fest an GitHub Pages als Hosting — obwohl die Hosting-Entscheidung ([[infrastructure-kwtv6]]) laut Betreiber revidierbar bleiben soll (z. B. bei einem späteren Votum für EU-Hosting). Zusätzlich muss ein Decap/Sveltia-CMS-Commit denselben, einzigen Deploy-Weg durchlaufen wie ein Entwickler-Push — es darf keinen zweiten, abweichenden Publikationspfad geben.

## Decision
Der Build läuft in einem eigenen GitHub-Actions-Workflow (`.github/workflows/deploy.yml`), getriggert durch `push` auf `main` sowie `workflow_dispatch`:

`bundle exec jekyll build` → `upload-pages-artifact` → `deploy-pages`.

Zusätzlich existiert ein PR-Workflow, der nur baut (Regressionsschutz beim Theme-Umbau, kein Deploy). Eine Concurrency-Group `pages` mit `cancel-in-progress` verhindert, dass sich zwei schnelle CMS-Commits beim Deploy überholen. Der Deploy-Job ist strikt vom Build-Job getrennt und ist der einzige anbieterspezifische Teil des Workflows.

**Dependency-Pinning- und Update-Policy** (Teil dieser Entscheidung, kein separates ADR):
- Ruby-Version und Gems werden über `Gemfile.lock` mit gepinnter Ruby-Version festgeschrieben — kein Build auf einer driftenden Toolchain.
- Dependabot aktualisiert `bundler`-Abhängigkeiten und `github-actions`-Workflow-Versionen monatlich per automatischem PR.

## Consequences
### Positive
- Freie Plugin-Wahl (`jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-redirect-from`) statt Pages-Whitelist.
- Hosting-Wechsel reduziert sich auf den Austausch eines einzelnen Deploy-Jobs — der Build-Teil bleibt unverändert.
- Deploy-Dauer ca. 1–2 Minuten, für Redakteure im CMS praktisch unsichtbar.
- Gepinnte Toolchain (`Gemfile.lock`, feste Ruby-Version) macht Builds reproduzierbar; monatliche Dependabot-PRs halten Sicherheitsstand aktuell, ohne dass jeder Build gegen "latest" läuft.

### Negative
- Ein Build-Fehler nach einem CMS-Commit ist für den Redakteur unsichtbar — Gegenmaßnahme: E-Mail-Benachrichtigung bei fehlgeschlagenen Actions aktivieren; im Theme keine build-brechenden Konstrukte aus Nutzereingaben zulassen (z. B. `date`-Felder mit festem Format).
- Verbraucht Actions-Minuten — bei öffentlichem Repo (bestätigt: Repo ist public ab Tag 1) kostenlos/unbegrenzt, daher hier kein praktisches Risiko.

### Neutral
- Die eigentliche Workflow-Datei (`.github/workflows/deploy.yml`) wird erst im Walking-Skeleton-Task ([[infrastructure-001-walking-skeleton]]) erstellt; dieses ADR legt nur die Entscheidung fest.

## Alternatives considered
- **Pages-nativer Build** — null Konfiguration, aber Plugin-Gefängnis (nur `github-pages`-Gem-Whitelist) und keine Portabilität bei Hosting-Wechsel.
- **Hoster-nativer Build (Netlify/Cloudflare Pages)** — koppelt den Build an einen bestimmten Hoster; genau diese Kopplung soll durch die austauschbare Deploy-Schicht vermieden werden.
- **Gebaute Artefakte committen** — Redakteure könnten ohne lokalen Build-Lauf nicht publizieren; disqualifiziert, da Publikation über das CMS allein möglich sein muss.

## References
- ADR 0001 (Jekyll + Decap CMS)
- `infrastructure-kwtv6` (Hosting-Entscheidung, GitHub Pages)
- `infrastructure-001-walking-skeleton` (erstellt die Workflow-Datei)
