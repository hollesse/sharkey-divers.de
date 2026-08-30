---
id: infrastructure-d3m1s
title: "Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1"
status: todo
type: decision
context: infrastructure
created: 2026-08-30
completed:
depends_on: []
blocks: []
tags: [datenschutz, dsgvo, foundation]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Deutscher Verein: Google-Fonts-Einbindung ist abmahnrelevant, jedes eingebundene Fremd-Asset erzeugt Consent-Pflichten. Ziel ist eine Seite ohne Cookie-Banner und mit schlanker Datenschutzerklärung. Bei einigen Berichten pro Jahr gibt es zudem keine Entscheidung, die Analytics-Zahlen beeinflussen würden — kein Analytics ist die Maßnahme, die die Consent-Freiheit absichert. Beide Punkte gehören dokumentiert, damit sie nicht in sechs Monaten unreflektiert gekippt werden.

## What
ADR committen: Alle Assets First-Party (Fonts selbst hosten, keine CDN-Einbindungen, Karten nur als verlinktes Bild, Video-Embeds nur mit Klickschutz oder gar nicht). Kein Analytics in v1 als dokumentierte Non-Decision, inkl. Kriterien für später (cookielos + EU-gehostet, z. B. GoatCounter EU / self-hosted Plausible, dann Datenschutzerklärung ergänzen).

## Acceptance criteria
- [ ] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [ ] Die Regel "keine Third-Party-Requests" ist als hartes Kriterium im design-system-BC-README bzw. Theme-Briefing verankert (Querverweis genügt).
- [ ] Keine Code-Änderung nötig.

## Notes
Voraussetzung für Consent-Freiheit; Konsequenz aus [[infrastructure-kwtv6]] (US-Hoster wird ohnehin in der Datenschutzerklärung genannt, mehr Empfänger vermeiden). Die Rechtstexte selbst sind BC-lokal: [[website-sgapx]].
