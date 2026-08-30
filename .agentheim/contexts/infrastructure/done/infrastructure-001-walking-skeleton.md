---
id: infrastructure-001-walking-skeleton
title: "Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end"
status: done
type: spike
context: infrastructure
created: 2026-08-30
completed: 2026-08-30
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
- [x] `bundle exec jekyll build` läuft lokal fehlerfrei (`.github/workflows/deploy.yml`/`build.yml` liegen bereit für GitHub Actions; Ausführung dort erst nach Repo-Erstellung möglich, siehe Worker note).
- [x] Startseiten-Platzhalter, Markdown-Seiten (Impressum/Datenschutz) und ein Beispiel-Bericht in der Berichte-Liste sind lokal gebaut vorhanden (`_site/index.html`, `_site/impressum.html`, `_site/berichte.html` mit Eintrag); Live-Erreichbarkeit unter `*.github.io` erst nach Repo-/Pages-Setup (siehe Worker note).
- [ ] Login unter `/admin/` funktioniert über "Mit GitHub anmelden" (OAuth-Worker deployt); ein im CMS angelegter Test-Bericht mit Bild erscheint nach dem automatischen Build live.
- [x] Der Bild-Upload landet gemäß Media-Konvention in `assets/uploads/` (Sveltia-`config.yml` konfiguriert WebP-Transformation, max. 1600 px, Qualität 80); tatsächlicher Upload-Test erst nach CMS-Login möglich (siehe Worker note).
- [x] `Gemfile.lock` und Ruby-Version (3.4.2) gepinnt; Dependabot (`bundler` + `github-actions`, monatlich) konfiguriert.

## Worker note
Dieser Task lief in einem lokalen Worktree ohne GitHub-Remote-Zugriff — daher wie im Task-Scope vorgesehen zweigeteilt:

**Lokal umgesetzt und verifiziert** (`bundle exec jekyll build` exit 0):
- Jekyll-4-Projekt komplett: `Gemfile`/`Gemfile.lock` (Ruby 3.4.2, Jekyll ~> 4.3), `_config.yml` (Preview-URL/baseurl mit Cutover-Kommentar, ADR 0006), Layouts (`default`/`page`/`post`, System-Font-Stack, kein CDN, `noindex`), `index.html`, `berichte.html`, `impressum.md`/`datenschutz.md` (TODO-Platzhalter), ein Beispiel-Post mit lokal erzeugtem SVG-Platzhalterbild in `assets/uploads/2026-08-30-testbericht-walking-skeleton/`.
- `admin/index.html` (Sveltia-CMS-Script, einzige erlaubte Third-Party-Request, siehe Kommentar dort zu ADR 0007) und `admin/config.yml` (GitHub-Backend, Decap-kompatibel, WebP-Upload-Transformation gemäß ADR 0005, Collections `berichte`/`pages`).
- `.github/workflows/deploy.yml` (Build+Deploy, concurrency `pages`, Permissions) und `build.yml` (PR-Build-only) gemäß ADR 0004.
- `.github/dependabot.yml`, `robots.txt` (`Disallow: /`), `.gitignore`.
- `docs/launch-checkliste.md`: Schritt-für-Schritt-Anleitung für Repo-Erstellung, Pages-Aktivierung, GitHub-OAuth-App, `sveltia-cms-auth`-Worker-Deploy (inkl. wohin Client-ID/-Secret und Worker-URL eingetragen werden), Collaborator-Einladung, erster Login-/Upload-Test.

**Nicht lokal ausführbar, vorbereitet und in der Checkliste dokumentiert** (Conductor/Owner führt aus):
- GitHub-Repo `hollesse/sharkey-divers.de` öffentlich anlegen (inkl. Commit-Autoren-E-Mail-Prüfung vor Public-Schalten), Pages auf "GitHub Actions" umstellen.
- GitHub-OAuth-App anlegen, `sveltia-cms-auth`-Cloudflare-Worker deployen, Worker-URL in `admin/config.yml` → `backend.base_url` eintragen (aktuell Platzhalter `https://SVELTIA-AUTH-WORKER-URL.example` mit TODO-Kommentar).
- Erster Live-Deploy, erster CMS-Login, Test-Upload-Verifikation (WebP ≤ 1600 px tatsächlich am Live-System prüfen).

Die drei nicht abgehakten Punkte oben sind deshalb bewusst offen gelassen, nicht vergessen — sie sind exakt die in der Task-Beschreibung als "prepare but cannot execute" markierten Schritte.

## Notes
**Constraint (2026-08-30):** Live-Deploy unter der `*.github.io`-Adresse ist ab Tag 1 **Pflicht** — der Betreiber präsentiert Zwischenstände. Das Repo ist/wird dafür public (siehe [[infrastructure-kwtv6]]); vorher Commit-Autoren-E-Mails prüfen. Die Custom Domain kommt erst beim Cutover. `noindex`/`robots.txt` auf der Preview-URL nicht vergessen.

Kein Anspruch an Optik — das Design kommt danach über [[design-system-001-styleguide]]. Der Original-Design-Prompt des Betreibers (Import des Clot-Prototyps via claude_design MCP) liegt verbatim in den Notes des Styleguide-Tasks; im Prototyp-Projekt existiert außerdem eine Datei `jekyll-decap-setup.md`, die beim Skeleton-Bau gelesen werden sollte — sie enthält vermutlich Setup-Überlegungen aus der Design-Session.

Achtung bei der CMS-Konfiguration: `config.yml` Decap-kompatibel halten (Rückfall-Option aus [[infrastructure-any72]]).

## Verifier note (iteration 1)
REASONS:
- `admin/config.yml` konfiguriert nur ein flaches, globales `media_folder: "assets/uploads"` / `public_folder: "/assets/uploads"`. ADR 0005 (Decision, erster Punkt) legt `media_folder: assets/uploads` **"mit einem Unterordner pro Tauchbericht"** fest. Die `berichte`-Collection trägt kein collection-level `media_folder`/`public_folder`-Override, daher landet jeder CMS-Upload flach in `assets/uploads/` — der pro-Bericht-Unterordner aus ADR 0005 ist nicht umgesetzt.
- Die Launch-Checkliste widerspricht der Config: `docs/launch-checkliste.md` (Schritt 6) verlangt die Prüfung "Hochgeladenes Bild landet in `assets/uploads/<datum-slug>/`", was die Config so nicht erzeugen kann. Das manuell platzierte Beispiel-Asset lässt das Layout korrekt aussehen, während der echte CMS-Upload-Pfad abweicht.
SUGGESTED_FIX: Collection-level `media_folder`/`public_folder` an der `berichte`-Collection in `admin/config.yml` ergänzen, sodass Uploads in einem pro-Bericht-Unterordner unter `assets/uploads/` landen (Decap/Sveltia-kompatibel, z. B. `{{slug}}`-basierter Pfad) — passend zu ADR 0005 und zur Checklisten-Prüfung; alternativ (falls flache Ablage gewollt) ADR 0005 per neuem ADR amendieren und die Checkliste korrigieren.
ITERATION_HINT: likely-fixable
(Alle übrigen Checks bestanden: Build grün, _site-Artefakte + noindex vorhanden, Post-Layout korrekt, Bild löst unter baseurl auf, Scope sauber.)

## Outcome
Fix für Iteration 1 umgesetzt: `admin/config.yml` bekam an der `berichte`-Collection ein collection-level `media_folder: "/assets/uploads/{{slug}}"` / `public_folder: "/assets/uploads/{{slug}}"` (Decap/Sveltia-Syntax), sodass CMS-Uploads pro Tauchbericht in einem eigenen Unterordner unter `assets/uploads/` landen (ADR 0005). `{{slug}}` löst zum Entry-Slug der Collection auf (`{{year}}-{{month}}-{{day}}-{{slug}}`), also z. B. `assets/uploads/2026-08-30-mein-bericht/` — das entspricht exakt dem in `docs/launch-checkliste.md` Schritt 6 beschriebenen `<datum-slug>`-Muster, daher war dort keine Änderung nötig. `bundle exec jekyll build` läuft weiterhin fehlerfrei (exit 0).
