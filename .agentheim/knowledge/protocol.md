# Protocol

Chronological log of everything that happens in this project.
Newest entries on top.

---

## 2026-08-30 16:41 -- Task completed (verification skipped): infrastructure-d3m1s - "Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1"

**Type:** Work / Task completion
**Task:** infrastructure-d3m1s - "Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1"
**Summary:** ADR 0007: Alle Assets first-party, kein Analytics in v1 (dokumentierte Non-Decision mit Revisionskriterien)
**Duration:** 1m03s
**Verification:** SKIPPED — decision-only task
**Files changed:** 2

---

## 2026-08-30 16:41 -- Task completed (verification skipped): infrastructure-tck5g - "DNS-Cutover-Plan: Altseite → Neuseite"

**Type:** Work / Task completion
**Task:** infrastructure-tck5g - "DNS-Cutover-Plan: Altseite → Neuseite"
**Summary:** ADR 0006: Siebenstufige DNS-Cutover-Strategie festgeschrieben; URL-Inventar als offener Betreiber-Punkt
**Duration:** 1m05s
**Verification:** SKIPPED — decision-only task
**Files changed:** 3

---

## 2026-08-30 16:41 -- Task completed (verification skipped): infrastructure-qxeyp - "Bild-Handling: Optimierung beim Upload statt im Build"

**Type:** Work / Task completion
**Task:** infrastructure-qxeyp - "Bild-Handling: Optimierung beim Upload statt im Build"
**Summary:** ADR 0005: Bildoptimierung beim Upload (WebP, max. 1600 px) statt im Build, Decap-Fallback dokumentiert
**Duration:** 0m55s
**Verification:** SKIPPED — decision-only task
**Files changed:** 1

---

## 2026-08-30 16:39 -- Batch started: [infrastructure-qxeyp, infrastructure-tck5g, infrastructure-d3m1s]

**Type:** Work / Batch start
**Tasks:** infrastructure-qxeyp - "Bild-Handling: Optimierung beim Upload statt im Build", infrastructure-tck5g - "DNS-Cutover-Plan: Altseite → Neuseite", infrastructure-d3m1s - "Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1"
**Parallel:** yes (3 workers — full remaining ready set; walking skeleton unblocks after this wave)

---

## 2026-08-30 16:38 -- Task completed (verification skipped): infrastructure-f8deg - "Build-/Deploy-Pipeline: Jekyll in GitHub Actions, Deploy als austauschbares Blatt"

**Type:** Work / Task completion
**Task:** infrastructure-f8deg - "Build-/Deploy-Pipeline: Jekyll in GitHub Actions, Deploy als austauschbares Blatt"
**Summary:** ADR 0004: Build in GitHub Actions, Deploy als austauschbares Blatt, inkl. Pinning-/Update-Policy
**Duration:** 0m51s
**Verification:** SKIPPED — decision-only task
**Files changed:** 1

---

## 2026-08-30 16:38 -- Task completed (verification skipped): infrastructure-any72 - "CMS-Auth: Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy"

**Type:** Work / Task completion
**Task:** infrastructure-any72 - "CMS-Auth: Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy"
**Summary:** ADR 0003: Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy als Redaktions-Login
**Duration:** 1m12s
**Verification:** SKIPPED — decision-only task
**Files changed:** 2

---

## 2026-08-30 16:37 -- Task completed (verification skipped): infrastructure-kwtv6 - "Hosting-Entscheidung: GitHub Pages"

**Type:** Work / Task completion
**Task:** infrastructure-kwtv6 - "Hosting-Entscheidung: GitHub Pages"
**Summary:** ADR 0002: Hosting auf GitHub Pages (öffentliches Repo, Preview ab Tag 1 unter *.github.io, Custom Domain erst beim Cutover)
**Duration:** 1m01s
**Verification:** SKIPPED — decision-only task
**Files changed:** 3

---

## 2026-08-30 16:34 -- Batch started: [infrastructure-kwtv6, infrastructure-any72, infrastructure-f8deg]

**Type:** Work / Batch start
**Tasks:** infrastructure-kwtv6 - "Hosting-Entscheidung: GitHub Pages", infrastructure-any72 - "CMS-Auth: Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy", infrastructure-f8deg - "Build-/Deploy-Pipeline: Jekyll in GitHub Actions, Deploy als austauschbares Blatt"
**Parallel:** yes (3 workers — infrastructure-qxeyp, infrastructure-tck5g, infrastructure-d3m1s held to next wave: MAX_PARALLEL=3 cap; walking skeleton blocked on all six decisions)

---

## 2026-08-30 14:30 -- Brainstorm: Relaunch sharkey-divers.de (Jekyll + Decap/Sveltia)

**Type:** Brainstorm
**Outcome:** vision created
**BCs identified:** website (core), infrastructure (generic), design-system (supporting)
**Summary:** Vision für den pflegeleichten statischen Außenauftritt des Tauchclubs Sharky Divers Weilburg festgehalten: Jekyll + git-basiertes CMS ersetzen das unpflegbare Alt-HTML; Redakteure ohne Technikwissen sollen Berichte veröffentlichen; alles Dynamische (Login, Kalender, Newsletter, Formulare) ist Non-Goal. Der Architekten-Foundation-Pass ergab als kritischste Erkenntnis, dass Netlify Identity/Git Gateway abgekündigt ist — empfohlen wird Sveltia CMS (Decap-kompatibel) mit GitHub-Backend + OAuth-Worker, GitHub Pages als Hosting, Build in GitHub Actions, Bildoptimierung beim Upload. Das fertige Clot-Design wird über das Styleguide-Gate ins Jekyll-Theme übertragen; der Original-Design-Prompt liegt verbatim im Styleguide-Task.
**ADRs written:** 0001 (Statische Seite mit Jekyll + Decap CMS statt WordPress)
**Foundation tasks emitted:** infrastructure-kwtv6 (Hosting), infrastructure-any72 (CMS-Auth), infrastructure-f8deg (Build/Deploy-Pipeline), infrastructure-qxeyp (Bild-Handling), infrastructure-tck5g (DNS-Cutover), infrastructure-d3m1s (keine Third-Party-Requests / kein Analytics), infrastructure-001-walking-skeleton, design-system-001-styleguide; zusätzliche Backlog-Captures: infrastructure-h937s (Redakteurs-Onboarding), website-jfq0p (SEO-Basics), website-vekmt (JSON-LD SportsClub), website-v5xky (Galerie-Rendering), website-sgapx (Rechtstexte DDG)

---
