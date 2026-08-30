# Index

Top-level catalog of this project's bounded contexts, global decisions, and research.
For BC-scoped artifacts, see each BC's `INDEX.md`.

> Updated by: `modeling` (BC creation), `work` (global ADRs), `research` (reports tagged global / cross-BC), backfill script.
> Hand-edits are fine but the skills will append at the section markers below.

---

## Bounded contexts

<!-- bc-list:start -->
- **design-system** — Frontend-Fundament: Übertragung des Clot-Design-Prototyps ins Jekyll-Theme, Styleguide-Gate — `contexts/design-system/INDEX.md`
- **infrastructure** — Global gültige Querschnittsthemen: Hosting, Deploy, Decap-Backend, DNS/HTTPS — `contexts/infrastructure/INDEX.md`
- **website** — Kern: Jekyll-Theme, pflegbare Seiten, Berichte und Decap-Collections — `contexts/website/INDEX.md`
<!-- bc-list:end -->

## Global ADRs (scope: global)

<!-- adr-global:start -->
- **0006** — DNS-Cutover-Strategie Altseite → Neuseite — 2026-08-30 — `knowledge/decisions/0006-dns-cutover-strategie.md`
- **0005** — Bildoptimierung beim Upload statt im Build — 2026-08-30 — `knowledge/decisions/0005-bildoptimierung-beim-upload.md`
- **0004** — Build in GitHub Actions, Deploy als austauschbares Blatt — 2026-08-30 — `knowledge/decisions/0004-build-deploy-github-actions.md`
- **0003** — Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy — 2026-08-30 — `knowledge/decisions/0003-cms-auth-sveltia-github-oauth.md`
- **0002** — Hosting auf GitHub Pages — 2026-08-30 — `knowledge/decisions/0002-hosting-github-pages.md`
- **0001** — Statische Seite mit Jekyll + Decap CMS statt WordPress — 2026-08-30 — `knowledge/decisions/0001-static-site-jekyll-decap-statt-wordpress.md`
<!-- adr-global:end -->

## Cross-BC research

Research reports relevant to more than one BC (or to the project as a whole). BC-specific
reports are listed in each BC's `INDEX.md`.

<!-- research-global:start -->
<!-- research-global:end -->

## Pointers

- Vision: `vision.md`
- Context map: — (nicht angelegt; ein Zweck, drei klar getrennte BCs — die Beziehungen stehen in den BC-READMEs)
- Protocol (chronological log): `knowledge/protocol.md`
- All ADRs: `knowledge/decisions/`
- All research: `knowledge/research/`
