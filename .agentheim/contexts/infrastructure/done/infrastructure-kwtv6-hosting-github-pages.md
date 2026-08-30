---
id: infrastructure-kwtv6
title: "Hosting-Entscheidung: GitHub Pages"
status: done
type: decision
context: infrastructure
created: 2026-08-30
completed: 2026-08-30
depends_on: []
blocks: []
tags: [hosting, foundation]
related_adrs: [0001, 0002]
related_research: []
prior_art: []
---

## Why
Die Seite braucht ein Zuhause: kostenlos/billig, wartungsarm, Custom Domain + HTTPS, gut gekoppelt mit dem CMS-Backend. Die Wahl soll bewusst getroffen und als ADR festgehalten werden, bevor der Walking Skeleton gebaut wird.

## What
ADR committen, das GitHub Pages als Hosting festschreibt (Empfehlung des Architekten), inkl. Plan-B-Dokumentation (Cloudflare Pages, deutscher Webspace).

## Acceptance criteria
- [x] ADR in `.agentheim/knowledge/decisions/` committet; Begründung entspricht dem Architekten-Entwurf (oder einer vom Betreiber geänderten Fassung).
- [x] Das ADR hält fest: Repo public, Preview ab Tag 1 unter `*.github.io` (mit `noindex`), Custom Domain erst beim Cutover.
- [x] Keine Code-Änderung nötig.

## Outcome
ADR 0002 (`.agentheim/knowledge/decisions/0002-hosting-github-pages.md`) geschrieben: GitHub Pages, öffentliches Repo, persönlicher Account, Deploy via GitHub Actions, Preview ab Tag 1 unter `*.github.io` mit `noindex`, Custom Domain erst beim DNS-Cutover. BC-README-Open-Questions aktualisiert. Keine Code-Änderung.

## Notes
**Vorfragen — vom Betreiber am 2026-08-30 beantwortet:**
1. **Persönlicher Account vs. Organization:** Start mit persönlichem Account; Umzug in eine Vereins-Organization bleibt später möglich (GitHub unterstützt Repo-Transfer). Bewusst vertagt, keine Blockade.
2. **Repo öffentlich: Ja, ab sofort** (bestätigt 2026-08-30, nachdem klar war, dass eine Pages-Seite ohnehin immer öffentlich erreichbar ist — ein privates Repo hätte nur Quellcode/History versteckt, nicht die Seite). **Live-Deploy unter der `*.github.io`-Adresse ist ab Tag 1 Pflicht** — der Betreiber präsentiert Zwischenstände; die Custom Domain `sharkey-divers.de` kommt erst beim Cutover ([[infrastructure-tck5g]]). Bis dahin `noindex`/`robots.txt` auf der Preview-URL. Vor dem Public-Schalten: Commit-Autoren-E-Mails via `@users.noreply.github.com` prüfen (auch rückwirkend in der History).
3. **EU-Hosting:** Keine Vorgabe; Start mit GitHub Pages, Wechsel bleibt dank hoster-agnostischem Build ([[infrastructure-f8deg]]) später billig.

**ADR-Entwurf des Architekten:**

> **Hosting auf GitHub Pages** *(scope: global)*
> **Context** — Vereinswebsite, kein eigener Server, kein Budget-Träger, Wartung soll auch nach Betreiberwechsel möglich sein. Custom Domain `sharkey-divers.de` liegt beim Verein. Redakteure werden GitHub-Nutzer (siehe CMS-Auth-Entscheidung), d. h. GitHub ist ohnehin Systemgrenze.
> **Decision** — Auslieferung über GitHub Pages aus einem **öffentlichen** Repository. Deployment ausschließlich über GitHub Actions (`upload-pages-artifact` + `deploy-pages`), nicht über die Pages-interne Jekyll-Build-Pipeline. Custom Domain via `CNAME`-Datei + "Enforce HTTPS".
> **Consequences** — (+) 0 €, kein praktisches Bandbreitenlimit, HTTPS rotiert automatisch, keine zusätzliche Anbieter-Beziehung. (+) Deploy-Step ist austauschbares Blatt → Hosting-Wechsel kostet Stunden, nicht Wochen. (−) Repo muss öffentlich sein → Commit-Autoren-E-Mails sichtbar, daher `@users.noreply.github.com`-Adressen erzwingen. (−) Keine serverseitigen Redirects/Custom-Header → Alt-URL-Weiterleitungen nur als Meta-Refresh-Stubs (siehe DNS-Cutover-Task). (−) US-Anbieter, Besucher-IPs verlassen die EU → Nennung in der Datenschutzerklärung (GitHub/Microsoft ist DPF-zertifiziert).
> **Alternatives** — *Cloudflare Pages*: erlaubt privates Repo, aber zweiter Anbieter-Account; Plan-B, falls "Repo privat" hartes Kriterium wird. *Netlify*: Free-Tier-Bandbreitenlimit, Identity-Stack abgekündigt — Hauptargument weggefallen. *Deutscher Webspace*: datenschutzrechtlich am saubersten, aber Kosten, Vertrag, Deploy-Key, manuelles Handling — nur bei Vorstands-Vorgabe EU-Hosting.
