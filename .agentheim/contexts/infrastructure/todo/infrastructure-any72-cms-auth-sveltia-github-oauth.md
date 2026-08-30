---
id: infrastructure-any72
title: "CMS-Auth: Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy"
status: todo
type: decision
context: infrastructure
created: 2026-08-30
completed:
depends_on: []
blocks: []
tags: [cms, auth, foundation]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Die kritischste und am schwersten reversible Entscheidung des Projekts: Wie loggen sich Redakteure ohne Entwickler-Werkzeug ins CMS ein? Der ursprüngliche Standardweg (Decap + Git Gateway + Netlify Identity) ist **abgekündigt** — darauf darf ein neues Projekt nicht mehr bauen. Die Vision verlangt einen laientauglichen Redaktionszugang bei minimalem Wartungsaufwand.

## What
ADR committen, das festschreibt: CMS-Frontend **Sveltia CMS** (Decap-config-kompatibler Drop-in) unter `/admin/`, Backend `github` mit Repo-Collaborator-Modell, Auth über selbst deployten OAuth-Proxy (Cloudflare Worker, `sveltia-cms-auth`) gegen eine GitHub OAuth App. Redakteure erhalten persönliche GitHub-Accounts (betreutes Onboarding, siehe [[infrastructure-h937s]]).

## Acceptance criteria
- [ ] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [ ] Der Betreiber hat der Abweichung vom ursprünglichen Plan (Decap → Sveltia; Redakteure bekommen doch GitHub-Accounts) explizit zugestimmt — das weicht von der Brainstorm-Annahme "ohne GitHub-Account" ab.
- [ ] Vorfrage geklärt: GitHub Organization für den Verein (siehe [[infrastructure-kwtv6]]).
- [ ] Keine Code-Änderung nötig.

## Notes
**ADR-Entwurf des Architekten:**

> **Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy** *(scope: global)*
> **Context** — Redakteure sind Vereinsmitglieder ohne Entwickler-Werkzeug. Netlify Identity ist seit 2024 Legacy, für neue Sites nicht mehr verfügbar; Git Gateway hängt daran und teilt das Schicksal. Es gibt für git-basierte CMS keinen wartungsarmen Weg zu "Redakteur ohne Git-Provider-Account", der nicht einen Bezahldienst oder eine selbstbetriebene Identity-Komponente einführt — beides widerspricht der Vision stärker als die Einmalhürde GitHub-Account.
> **Decision** — Sveltia CMS unter `/admin/` (gleiche `config.yml` wie Decap, Austausch = anderes `<script>`-Tag). Backend `github`, Redakteure als Collaborators (inkl. 2FA), Login = "Mit GitHub anmelden", ein Klick. Auth-Proxy als Cloudflare Worker. Editorial Workflow in v1 **aus** (Direkt-Commit auf `main`) — Review-Ping-Pong bei 1–3 Redakteuren erzeugt nur Reibung.
> **Consequences** — (+) Kein abgekündigter Baustein, keine laufenden Kosten, keine eigene Nutzerdatenbank. (+) Rückfall auf Decap ist ein Ein-Zeilen-Change (Absicherung gegen "Sveltia ist ein Ein-Personen-Projekt"). (+) Sveltia bringt Bild-Transformation beim Upload mit (siehe [[infrastructure-qxeyp]]). (−) Einmalhürde GitHub-Account + 2FA pro Redakteur → bebilderte Anleitung ist ein eigenes Deliverable ([[infrastructure-h937s]]). (−) Zwei Fremdsysteme im Auth-Pfad (GitHub + Worker); Worker-Ausfall = kein CMS-Login, Site bleibt aber online. (−) Offboarding ausscheidender Redakteure nötig.
> **Alternatives** — *Netlify Identity + Git Gateway*: abgekündigt, ausgeschlossen. *Decap + GitHub-Backend + OAuth-Proxy*: funktioniert identisch, schlechtere UI, keine Upload-Transformation — dokumentierter Fallback. *TinaCMS Cloud / CloudCannon / Contentful*: eigene Nutzerverwaltung, aber Lock-in, Free-Tier-Risiko, Kosten. *Selbstbetriebener Identity-Server*: widerspricht "wartungsarm" frontal. *Gemeinsamer Redaktions-Account*: geteiltes Passwort, keine Autorenzuordnung — abgelehnt.
