---
id: 0002
title: Hosting auf GitHub Pages
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-kwtv6]
related_research: []
---

# ADR 0002: Hosting auf GitHub Pages

## Context
Die Vereinswebsite braucht ein Zuhause: kostenlos/billig, wartungsarm, Custom Domain (`sharkey-divers.de`, liegt beim Verein) + HTTPS, gut gekoppelt mit dem CMS-Backend (siehe ADR 0001). Es gibt keinen eigenen Server und keinen Budget-Träger; die Wartung muss auch nach einem Betreiberwechsel möglich sein. Redakteure werden ohnehin GitHub-Nutzer (CMS-Auth), GitHub ist also bereits Systemgrenze.

Der Betreiber hat folgende Vorfragen am 2026-08-30 beantwortet:
- **Account:** Start mit persönlichem GitHub-Account; ein späterer Umzug in eine Vereins-Organization bleibt möglich (Repo-Transfer) und ist bewusst vertagt, keine Blockade.
- **Repo-Sichtbarkeit:** Öffentlich ab sofort — eine Pages-Seite ist ohnehin immer öffentlich erreichbar, ein privates Repo würde nur Quellcode/History verstecken, nicht die Seite selbst.
- **Preview:** Live-Deploy unter der `*.github.io`-Adresse ist ab Tag 1 Pflicht, damit der Betreiber Zwischenstände präsentieren kann. Bis zum Cutover ([[infrastructure-tck5g]]) trägt die Preview-URL `noindex`/`robots.txt`; die Custom Domain `sharkey-divers.de` kommt erst beim Cutover.
- **EU-Hosting:** Keine Vorgabe. Start mit GitHub Pages; ein Wechsel bleibt dank hoster-agnostischem Build ([[infrastructure-f8deg]]) später billig.
- Vor dem Public-Schalten des Repos: Commit-Autoren-E-Mails via `@users.noreply.github.com` prüfen (auch rückwirkend in der History).

## Decision
Auslieferung über **GitHub Pages** aus einem **öffentlichen** Repository, unter einem **persönlichen Account** (Organization-Umzug später möglich). Deployment ausschließlich über **GitHub Actions** (`upload-pages-artifact` + `deploy-pages`), nicht über die Pages-interne Jekyll-Build-Pipeline. Ab Tag 1 ist die Seite unter der `*.github.io`-Adresse live, versehen mit `noindex`/`robots.txt`. Die Custom Domain wird erst beim DNS-Cutover per `CNAME`-Datei + "Enforce HTTPS" aktiviert.

## Consequences
### Positive
- 0 €, kein praktisches Bandbreitenlimit, HTTPS rotiert automatisch, keine zusätzliche Anbieter-Beziehung.
- Der Deploy-Step (GitHub Actions) ist ein austauschbares Blatt — ein Hosting-Wechsel kostet Stunden, nicht Wochen.
- Live-Preview unter `*.github.io` ab Tag 1 erlaubt dem Betreiber, Zwischenstände zu präsentieren, ohne die produktive Domain vorzeitig umzubiegen.

### Negative
- Das Repo muss öffentlich sein → Commit-Autoren-E-Mails sind sichtbar, daher werden `@users.noreply.github.com`-Adressen erzwungen (auch rückwirkend in der History, vor dem Public-Schalten zu prüfen).
- Keine serverseitigen Redirects/Custom-Header möglich → Alt-URL-Weiterleitungen nur als Meta-Refresh-Stubs (siehe DNS-Cutover-Task [[infrastructure-tck5g]]).
- US-Anbieter, Besucher-IPs verlassen die EU → Nennung in der Datenschutzerklärung nötig (GitHub/Microsoft ist DPF-zertifiziert).
- Bis zum Cutover existiert eine öffentlich erreichbare Preview-URL, die per `noindex`/`robots.txt` von Suchmaschinen ferngehalten werden muss.

### Neutral
- Der persönliche Account bleibt vorerst Repo-Eigentümer; ein Umzug in eine Vereins-Organization ist ein späterer, unabhängiger Schritt.

## Alternatives considered
- **Cloudflare Pages** — erlaubt ein privates Repo, aber ein zweiter Anbieter-Account wäre nötig. Plan B, falls "Repo privat" doch zum harten Kriterium wird.
- **Netlify** — Free-Tier-Bandbreitenlimit, der Identity-Stack ist abgekündigt; das Hauptargument für Netlify ist damit weggefallen.
- **Deutscher Webspace** — datenschutzrechtlich am saubersten, aber Kosten, Vertrag, Deploy-Key und manuelles Handling; nur relevant bei einer expliziten Vorstands-Vorgabe zu EU-Hosting.

## References
- ADR 0001 (Statische Seite mit Jekyll + Decap CMS)
- Task `infrastructure-kwtv6`
- Folgetasks: `infrastructure-tck5g` (DNS-Cutover), `infrastructure-f8deg` (hoster-agnostischer Build)
