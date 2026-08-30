---
id: infrastructure-f8deg
title: "Build-/Deploy-Pipeline: Jekyll in GitHub Actions, Deploy als austauschbares Blatt"
status: done
type: decision
context: infrastructure
created: 2026-08-30
completed: 2026-08-30
depends_on: []
blocks: []
tags: [ci, deploy, foundation]
related_adrs: [0001, 0004]
related_research: []
prior_art: []
---

## Why
Der Pages-interne Jekyll-Build erzwingt die veraltete `github-pages`-Gem und eine Plugin-Whitelist; außerdem soll die Hosting-Entscheidung ([[infrastructure-kwtv6]]) revidierbar bleiben (Versicherungspolice gegen ein späteres EU-Hosting-Votum). Ein Decap/Sveltia-Commit muss denselben, einzigen Deploy-Weg nehmen wie ein Entwickler-Push.

## What
ADR committen: Build in GitHub Actions (`push` auf `main` + `workflow_dispatch`), volles Jekyll 4 mit freier Plugin-Wahl, Deploy-Job strikt getrennt und als einziger anbieterspezifisch. Inklusive Dependency-Pinning-Policy (`Gemfile.lock`, gepinnte Ruby-Version, Dependabot `bundler` + `github-actions` monatlich).

## Acceptance criteria
- [x] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [x] Pinning-/Update-Policy ist Teil des ADRs (kein separates ADR nötig).
- [x] Keine Code-Änderung nötig — die Workflow-Datei selbst entsteht im Walking Skeleton ([[infrastructure-001-walking-skeleton]]).

## Notes
**ADR-Entwurf des Architekten:**

> **Build in GitHub Actions, Deploy als austauschbares Blatt** *(scope: global)*
> **Decision** — `.github/workflows/deploy.yml` auf `push: main` + `workflow_dispatch`: `bundle exec jekyll build` → `upload-pages-artifact` → `deploy-pages`. Zusätzlich PR-Workflow, der nur baut (Regressionsschutz beim Theme-Umbau). Concurrency-Group `pages` mit `cancel-in-progress`, damit zwei schnelle CMS-Commits sich nicht überholen. Ruby + Gems über `Gemfile.lock` gepinnt, Dependabot monatlich.
> **Consequences** — (+) Freie Plugin-Wahl (`jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-redirect-from`). (+) Hosting-Wechsel = Austausch eines Jobs. (+) Deploy-Dauer ~1–2 Minuten, für Redakteure unsichtbar. (−) Build-Fehler nach CMS-Commit ist für den Redakteur unsichtbar → E-Mail-Benachrichtigung bei fehlgeschlagenen Actions aktivieren; im Theme keine build-brechenden Konstrukte aus Nutzereingaben zulassen (z. B. `date`-Felder mit festem Format). (−) Verbraucht Actions-Minuten (bei öffentlichem Repo kostenlos/unbegrenzt).
> **Alternatives** — *Pages-nativer Build*: null Konfiguration, aber Plugin-Gefängnis, keine Portabilität. *Hoster-nativer Build (Netlify/Cloudflare)*: koppelt Build an Hoster — genau das soll vermieden werden. *Gebaute Artefakte committen*: Redakteure könnten ohne lokalen Build nicht publizieren — disqualifiziert.

## Outcome
ADR 0004 committet unter `.agentheim/knowledge/decisions/0004-build-deploy-github-actions.md`, deckungsgleich mit dem Architekten-Entwurf inklusive Dependency-Pinning-/Update-Policy (Gemfile.lock, gepinnte Ruby-Version, Dependabot bundler + github-actions monatlich). Keine Code-Änderung; die Workflow-Datei entsteht im Walking-Skeleton-Task.
