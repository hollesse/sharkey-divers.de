# Protocol

Chronological log of everything that happens in this project.
Newest entries on top.

---

## 2026-08-31 19:05 -- Work session ended

**Type:** Work / Session end
**Duration:** ~1h aktive Orchestrierung (Session lief über eine Nutzer-Pause hinweg; Batch-Start 2026-08-30 17:17)
**Completed:** 1 (first-try PASS: 0, re-dispatched: 1, skipped: 0)
**Bounced:** 0
**Failed:** 0
**Escalated after verification:** 0
**Dispatches:** design-system-001: 2
**Commits:** 3
**Vision-conformance:** none — batch aligns with vision (Theme-Übertragung ist Erfolgskriterium 1 der Vision; Non-Goals unberührt)
**Carry-over:** none — working tree clean
**Hinweis:** Styleguide-Gate offen — Betreiber-Review auf der Preview steht aus; bis zur Abnahme keine Frontend-Task-Promotion (website-Backlog wartet).

---

## 2026-08-31 19:01 -- Task verified and completed: design-system-001 - Clot-Design-Prototyp als Jekyll-Theme übertragen (Styleguide-Gate)

**Type:** Work / Task completion
**Task:** design-system-001 - Clot-Design-Prototyp als Jekyll-Theme übertragen (Styleguide-Gate)
**Summary:** Clot-Design-Prototyp treu als Jekyll-Theme übertragen: Token-Skalen, self-hosted Fonts, alle Seiten — Betreiber-Gate offen
**Duration:** 29m
**Verification:** PASS (iteration 2)
**Files changed:** 38
**Tests added:** 0
**ADRs written:** none

---

## 2026-08-31 18:55 -- Verification failed: design-system-001 - Clot-Design-Prototyp als Jekyll-Theme (Styleguide-Gate)

**Type:** Work / Verification failure
**Task:** design-system-001 - Styleguide/Theme
**Iteration:** 1 of 3
**Reasons:** Typo-/Spacing-Werte nicht tokenisiert (201 px-Literale verstreut), zwei Farb-Leaks an der Token-Schicht vorbei, BC-README-Aussage widerspricht dem Code
**Iteration hint:** likely-fixable
**Next:** re-dispatched worker

---

## 2026-08-30 17:12 -- Batch started: [design-system-001]

**Type:** Work / Batch start
**Tasks:** design-system-001 - Clot-Design-Prototyp als Jekyll-Theme übertragen (Styleguide-Gate)
**Parallel:** no (1 worker — last remaining todo task, styleguide gate)

---

## 2026-08-30 17:10 -- Work session ended

**Type:** Work / Session end
**Duration:** 36m
**Completed:** 7 (first-try PASS: 6, re-dispatched: 1, skipped: 6 [decision-only])
**Bounced:** 0
**Failed:** 0
**Escalated after verification:** 0
**Dispatches:** infrastructure-kwtv6: 1, infrastructure-any72: 1, infrastructure-f8deg: 1, infrastructure-qxeyp: 1, infrastructure-tck5g: 1, infrastructure-d3m1s: 1, infrastructure-001: 2
**Commits:** 10
**Vision-conformance:** none — batch aligns with vision (Hinweis außerhalb der Flag-Kriterien: vision.md "Users" beschreibt Redakteure als "ohne GitHub-Account"; ADR 0003 gibt ihnen betreute GitHub-Accounts — Wortlaut der Vision ist zu aktualisieren, kein Ziel-Drift)
**Carry-over:** none — working tree clean

---

## 2026-08-30 16:57 -- Task verified and completed: infrastructure-001 - "Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end"

**Type:** Work / Task completion
**Task:** infrastructure-001 - "Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end"
**Summary:** Walking Skeleton: Jekyll-Site, Sveltia-Admin, Actions-Deploy, Dependabot und Launch-Checkliste — lokal grün gebaut
**Duration:** 15m10s
**Verification:** PASS (iteration 2)
**Files changed:** 21
**Tests added:** 0
**ADRs written:** none

---

## 2026-08-30 16:57 -- Verification failed: infrastructure-001 - Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end

**Type:** Work / Verification failure
**Task:** infrastructure-001 - Walking Skeleton
**Iteration:** 1 of 3
**Reasons:** admin/config.yml ohne pro-Bericht-Unterordner für Uploads (widerspricht ADR 0005), Launch-Checkliste verspricht den Unterordner-Pfad, den die Config nicht erzeugt
**Iteration hint:** likely-fixable
**Next:** re-dispatched worker

---

## 2026-08-30 16:43 -- Batch started: [infrastructure-001]

**Type:** Work / Batch start
**Tasks:** infrastructure-001 - "Walking Skeleton: Jekyll + Sveltia + Deploy end-to-end"
**Parallel:** no (1 worker — only ready task; design-system-001-styleguide blocked on it)

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
