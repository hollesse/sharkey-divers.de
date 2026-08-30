# Protocol

Chronological log of everything that happens in this project.
Newest entries on top.

---

## 2026-08-30 14:30 -- Brainstorm: Relaunch sharkey-divers.de (Jekyll + Decap/Sveltia)

**Type:** Brainstorm
**Outcome:** vision created
**BCs identified:** website (core), infrastructure (generic), design-system (supporting)
**Summary:** Vision für den pflegeleichten statischen Außenauftritt des Tauchclubs Sharky Divers Weilburg festgehalten: Jekyll + git-basiertes CMS ersetzen das unpflegbare Alt-HTML; Redakteure ohne Technikwissen sollen Berichte veröffentlichen; alles Dynamische (Login, Kalender, Newsletter, Formulare) ist Non-Goal. Der Architekten-Foundation-Pass ergab als kritischste Erkenntnis, dass Netlify Identity/Git Gateway abgekündigt ist — empfohlen wird Sveltia CMS (Decap-kompatibel) mit GitHub-Backend + OAuth-Worker, GitHub Pages als Hosting, Build in GitHub Actions, Bildoptimierung beim Upload. Das fertige Clot-Design wird über das Styleguide-Gate ins Jekyll-Theme übertragen; der Original-Design-Prompt liegt verbatim im Styleguide-Task.
**ADRs written:** 0001 (Statische Seite mit Jekyll + Decap CMS statt WordPress)
**Foundation tasks emitted:** infrastructure-kwtv6 (Hosting), infrastructure-any72 (CMS-Auth), infrastructure-f8deg (Build/Deploy-Pipeline), infrastructure-qxeyp (Bild-Handling), infrastructure-tck5g (DNS-Cutover), infrastructure-d3m1s (keine Third-Party-Requests / kein Analytics), infrastructure-001-walking-skeleton, design-system-001-styleguide; zusätzliche Backlog-Captures: infrastructure-h937s (Redakteurs-Onboarding), website-jfq0p (SEO-Basics), website-vekmt (JSON-LD SportsClub), website-v5xky (Galerie-Rendering), website-sgapx (Rechtstexte DDG)

---
