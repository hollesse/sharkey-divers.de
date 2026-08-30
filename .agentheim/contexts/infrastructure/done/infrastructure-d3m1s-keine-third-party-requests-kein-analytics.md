---
id: infrastructure-d3m1s
title: "Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1"
status: done
type: decision
context: infrastructure
created: 2026-08-30
completed: 2026-08-30
depends_on: []
blocks: []
tags: [datenschutz, dsgvo, foundation]
related_adrs: [0001, 0007]
related_research: []
prior_art: []
---

## Why
Deutscher Verein: Google-Fonts-Einbindung ist abmahnrelevant, jedes eingebundene Fremd-Asset erzeugt Consent-Pflichten. Ziel ist eine Seite ohne Cookie-Banner und mit schlanker Datenschutzerklärung. Bei einigen Berichten pro Jahr gibt es zudem keine Entscheidung, die Analytics-Zahlen beeinflussen würden — kein Analytics ist die Maßnahme, die die Consent-Freiheit absichert. Beide Punkte gehören dokumentiert, damit sie nicht in sechs Monaten unreflektiert gekippt werden.

## What
ADR committen: Alle Assets First-Party (Fonts selbst hosten, keine CDN-Einbindungen, Karten nur als verlinktes Bild, Video-Embeds nur mit Klickschutz oder gar nicht). Kein Analytics in v1 als dokumentierte Non-Decision, inkl. Kriterien für später (cookielos + EU-gehostet, z. B. GoatCounter EU / self-hosted Plausible, dann Datenschutzerklärung ergänzen).

## Acceptance criteria
- [x] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [x] Die Regel "keine Third-Party-Requests" ist als hartes Kriterium im design-system-BC-README bzw. Theme-Briefing verankert (Querverweis genügt — vom Conductor bei der Integration ergänzt, Abschnitt "Harte Regeln fürs Theme").
- [x] Keine Code-Änderung nötig.

## Worker note
Dieser Worker gehört zum `infrastructure`-BC und darf laut Rule 5 keine anderen BC-READMEs ändern. Der zweite Acceptance-Punkt (Querverweis im design-system-BC-README) bleibt daher unchecked. **Der Conductor muss** im design-system-BC-README (bzw. Theme-Briefing) einen Querverweis auf ADR 0007 ergänzen, der die Regel "keine Third-Party-Requests im Auslieferungspfad (Fonts self-hosted, keine CDNs, Karten nur als verlinktes Bild, Video-Embeds klickgeschützt oder weggelassen)" als hartes Kriterium verankert.

## Notes
Voraussetzung für Consent-Freiheit; Konsequenz aus [[infrastructure-kwtv6]] (US-Hoster wird ohnehin in der Datenschutzerklärung genannt, mehr Empfänger vermeiden). Die Rechtstexte selbst sind BC-lokal: [[website-sgapx]].
ADR: [[0007]] (`.agentheim/knowledge/decisions/0007-keine-third-party-requests-kein-analytics.md`).

## Outcome
ADR 0007 geschrieben: alle Assets first-party (Fonts self-hosted, keine CDNs, Karten nur als verlinktes Bild, Video-Embeds klickgeschützt oder weggelassen); kein Analytics in v1 als dokumentierte Non-Decision mit Revisit-Kriterien (cookielos + EU-gehostet, z. B. GoatCounter EU / self-hosted Plausible, plus Datenschutzerklärung-Update). Keine Code-Änderung. Offen: Querverweis im design-system-BC-README muss vom Conductor ergänzt werden (siehe Worker note).
