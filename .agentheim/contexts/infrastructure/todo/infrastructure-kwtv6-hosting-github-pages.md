---
id: infrastructure-kwtv6
title: "Hosting-Entscheidung: GitHub Pages"
status: todo
type: decision
context: infrastructure
created: 2026-08-30
completed:
depends_on: []
blocks: []
tags: [hosting, foundation]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Die Seite braucht ein Zuhause: kostenlos/billig, wartungsarm, Custom Domain + HTTPS, gut gekoppelt mit dem CMS-Backend. Die Wahl soll bewusst getroffen und als ADR festgehalten werden, bevor der Walking Skeleton gebaut wird.

## What
ADR committen, das GitHub Pages als Hosting festschreibt (Empfehlung des Architekten), inkl. Plan-B-Dokumentation (Cloudflare Pages, deutscher Webspace).

## Acceptance criteria
- [ ] ADR in `.agentheim/knowledge/decisions/` committet; Begründung entspricht dem Architekten-Entwurf (oder einer vom Betreiber geänderten Fassung).
- [ ] Offene Vorfragen im ADR beantwortet: darf das Repo öffentlich sein? Gibt es eine EU-Hosting-Vorgabe? Persönlicher Account oder GitHub Organization für den Verein?
- [ ] Keine Code-Änderung nötig.

## Notes
**Vorfrage (blockiert auch [[infrastructure-any72]]):** Vereins-**GitHub-Organization** statt persönlichem Account — Architekten-Empfehlung klar pro Organization (Nachfolgeregelung).

**ADR-Entwurf des Architekten:**

> **Hosting auf GitHub Pages** *(scope: global)*
> **Context** — Vereinswebsite, kein eigener Server, kein Budget-Träger, Wartung soll auch nach Betreiberwechsel möglich sein. Custom Domain `sharkey-divers.de` liegt beim Verein. Redakteure werden GitHub-Nutzer (siehe CMS-Auth-Entscheidung), d. h. GitHub ist ohnehin Systemgrenze.
> **Decision** — Auslieferung über GitHub Pages aus einem **öffentlichen** Repository. Deployment ausschließlich über GitHub Actions (`upload-pages-artifact` + `deploy-pages`), nicht über die Pages-interne Jekyll-Build-Pipeline. Custom Domain via `CNAME`-Datei + "Enforce HTTPS".
> **Consequences** — (+) 0 €, kein praktisches Bandbreitenlimit, HTTPS rotiert automatisch, keine zusätzliche Anbieter-Beziehung. (+) Deploy-Step ist austauschbares Blatt → Hosting-Wechsel kostet Stunden, nicht Wochen. (−) Repo muss öffentlich sein → Commit-Autoren-E-Mails sichtbar, daher `@users.noreply.github.com`-Adressen erzwingen. (−) Keine serverseitigen Redirects/Custom-Header → Alt-URL-Weiterleitungen nur als Meta-Refresh-Stubs (siehe DNS-Cutover-Task). (−) US-Anbieter, Besucher-IPs verlassen die EU → Nennung in der Datenschutzerklärung (GitHub/Microsoft ist DPF-zertifiziert).
> **Alternatives** — *Cloudflare Pages*: erlaubt privates Repo, aber zweiter Anbieter-Account; Plan-B, falls "Repo privat" hartes Kriterium wird. *Netlify*: Free-Tier-Bandbreitenlimit, Identity-Stack abgekündigt — Hauptargument weggefallen. *Deutscher Webspace*: datenschutzrechtlich am saubersten, aber Kosten, Vertrag, Deploy-Key, manuelles Handling — nur bei Vorstands-Vorgabe EU-Hosting.
