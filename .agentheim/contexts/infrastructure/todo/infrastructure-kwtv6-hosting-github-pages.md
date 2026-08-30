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
- [ ] Das ADR legt die Interims-Preview-Strategie für die Privat-Phase fest (siehe Notes: Pages aus privatem Repo erfordert bezahlten Plan).
- [ ] Keine Code-Änderung nötig.

## Notes
**Vorfragen — vom Betreiber am 2026-08-30 beantwortet:**
1. **Persönlicher Account vs. Organization:** Start mit persönlichem Account; Umzug in eine Vereins-Organization bleibt später möglich (GitHub unterstützt Repo-Transfer). Bewusst vertagt, keine Blockade.
2. **Repo öffentlich:** Ja, grundsätzlich ok — aber **vorerst privat**, solange das Design nicht final ist und noch nicht sichtbar sein soll. Konsequenz: GitHub Pages aus privaten Repos gibt es nur mit bezahltem Plan (Pro/Team). Das ADR muss die Privat-Phase regeln — Optionen: (a) Preview nur lokal / im PR-Build, Pages erst beim Public-Schalten aktivieren; (b) vorhandenen GitHub-Pro-Plan nutzen; (c) Cloudflare Pages als privater Preview-Kanal. Beim Public-Schalten gilt: Commit-Autoren-E-Mails via `@users.noreply.github.com` absichern (rückwirkend prüfen!).
3. **EU-Hosting:** Keine Vorgabe; Start mit GitHub Pages, Wechsel bleibt dank hoster-agnostischem Build ([[infrastructure-f8deg]]) später billig.

**ADR-Entwurf des Architekten:**

> **Hosting auf GitHub Pages** *(scope: global)*
> **Context** — Vereinswebsite, kein eigener Server, kein Budget-Träger, Wartung soll auch nach Betreiberwechsel möglich sein. Custom Domain `sharkey-divers.de` liegt beim Verein. Redakteure werden GitHub-Nutzer (siehe CMS-Auth-Entscheidung), d. h. GitHub ist ohnehin Systemgrenze.
> **Decision** — Auslieferung über GitHub Pages aus einem **öffentlichen** Repository. Deployment ausschließlich über GitHub Actions (`upload-pages-artifact` + `deploy-pages`), nicht über die Pages-interne Jekyll-Build-Pipeline. Custom Domain via `CNAME`-Datei + "Enforce HTTPS".
> **Consequences** — (+) 0 €, kein praktisches Bandbreitenlimit, HTTPS rotiert automatisch, keine zusätzliche Anbieter-Beziehung. (+) Deploy-Step ist austauschbares Blatt → Hosting-Wechsel kostet Stunden, nicht Wochen. (−) Repo muss öffentlich sein → Commit-Autoren-E-Mails sichtbar, daher `@users.noreply.github.com`-Adressen erzwingen. (−) Keine serverseitigen Redirects/Custom-Header → Alt-URL-Weiterleitungen nur als Meta-Refresh-Stubs (siehe DNS-Cutover-Task). (−) US-Anbieter, Besucher-IPs verlassen die EU → Nennung in der Datenschutzerklärung (GitHub/Microsoft ist DPF-zertifiziert).
> **Alternatives** — *Cloudflare Pages*: erlaubt privates Repo, aber zweiter Anbieter-Account; Plan-B, falls "Repo privat" hartes Kriterium wird. *Netlify*: Free-Tier-Bandbreitenlimit, Identity-Stack abgekündigt — Hauptargument weggefallen. *Deutscher Webspace*: datenschutzrechtlich am saubersten, aber Kosten, Vertrag, Deploy-Key, manuelles Handling — nur bei Vorstands-Vorgabe EU-Hosting.
