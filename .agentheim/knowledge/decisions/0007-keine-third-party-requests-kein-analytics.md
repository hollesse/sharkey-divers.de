---
id: 0007
title: Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-d3m1s]
related_research: []
---

# ADR 0007: Keine Third-Party-Requests im Auslieferungspfad; kein Analytics in v1

## Context
Deutscher Verein, Ziel ist eine Seite ohne Cookie-Banner und mit schlanker Datenschutzerklärung (siehe ADR 0002, das den US-Hoster GitHub Pages ohnehin schon als Empfänger in der Datenschutzerklärung nennt). Jedes zusätzliche Fremd-Asset im Auslieferungspfad (Google Fonts, CDN-Skripte, eingebettete Karten/Videos fremder Anbieter) erzeugt einen weiteren Empfänger personenbezogener Daten (IP-Adresse) und damit potenzielle Consent-Pflichten — Google-Fonts-Einbindung ohne lokale Auslieferung ist in Deutschland ein bekanntes Abmahnrisiko. Analytics wäre ein weiterer solcher Empfänger; bei der Publikationsfrequenz des Vereins (einige Berichte pro Jahr) gibt es zudem keine Entscheidung, die Analytics-Zahlen tatsächlich beeinflussen würden.

## Decision
**Alle Assets werden first-party ausgeliefert:**
- Schriften werden selbst gehostet (kein Google Fonts o.ä. CDN-Einbindung).
- Keine CDN-Einbindungen für Skripte, Styles oder Icons.
- Karten werden nur als verlinktes statisches Bild eingebunden (kein eingebettetes iframe eines Kartendienstes).
- Video-Embeds fremder Anbieter (z. B. YouTube) sind entweder klickgeschützt (Vorschaubild, das erst nach explizitem Klick den Embed nachlädt) oder werden ganz weggelassen.

**Kein Analytics in v1** — bewusste Non-Decision, kein Vergessen. Kriterien, unter denen die Entscheidung revisitiert wird:
- Der Betreiber äußert einen konkreten Informationsbedarf, der durch Besucherzahlen beantwortet würde.
- Nur ein cookieloses, EU-gehostetes Tool kommt infrage (z. B. GoatCounter EU oder selbst gehostetes Plausible) — kein Google Analytics, kein Tool mit US-Datenübermittlung ohne Angemessenheitsbeschluss/DPF.
- Die Einbindung erfolgt first-party (kein Fremd-Skript-Request) oder es wird explizit ein neuer Empfänger in der Datenschutzerklärung ergänzt und geprüft, ob dadurch Consent-Pflicht entsteht.
- Bei Einführung: Datenschutzerklärung wird vor Go-Live aktualisiert, nicht danach.

## Consequences
### Positive
- Keine Cookie-Banner-Pflicht, keine Consent-Management-Plattform nötig — deckt sich mit dem Ziel einer schlanken, wartungsarmen Seite (ADR 0001).
- Schlanke Datenschutzerklärung: nur ein bekannter, bereits dokumentierter Empfänger (GitHub Pages/US-Hosting, ADR 0002).
- Kein Abmahnrisiko durch Fremd-Font- oder Fremd-Skript-Einbindung.
- Schnellere Ladezeiten, ein DNS-Lookup weniger pro Fremddienst.

### Negative
- Schriften müssen bei Theme-Änderungen manuell lokal nachgezogen werden (kein automatisches CDN-Update).
- Karten sind nur statisch, keine interaktive Zoom-/Routenfunktion ohne erneute Abwägung.
- Ohne Analytics gibt es keine objektiven Besucherzahlen; Entscheidungen zu Inhalt/Reichweite bleiben subjektiv, bis die Revisit-Kriterien erfüllt sind.

### Neutral
- Die Regel gilt für den gesamten Auslieferungspfad der Seite; sie ist als hartes Kriterium im Theme/Design-System zu verankern (separater Querverweis im design-system-BC-README, siehe Task-Notiz).

## Alternatives considered
- **Google Fonts / CDN-Einbindung** — bequemer, aber erzeugt einen zusätzlichen Datenempfänger und ist in Deutschland ein bekanntes Abmahnrisiko (IP-Übertragung beim Laden).
- **Eingebettete Karten (z. B. Google Maps iframe)** — interaktiver, aber lädt bei jedem Seitenaufruf Fremdinhalte nach; ein verlinktes Bild erreicht denselben Zweck (Standort zeigen) ohne Consent-Pflicht.
- **Google Analytics / Standard-Tracking** — würde Consent-Pflicht auslösen und steht im Widerspruch zum Ziel "keine Cookie-Banner"; bei der geringen Publikationsfrequenz kein belastbarer Informationsgewinn.
- **Analytics von Anfang an mit cookielosem EU-Tool** — verworfen für v1, da kein aktueller Informationsbedarf besteht; als spätere Option mit klaren Kriterien offengehalten statt ergebnislos verworfen.

## References
- ADR 0001 (Statische Seite mit Jekyll + Decap CMS)
- ADR 0002 (Hosting auf GitHub Pages, nennt bereits den US-Hoster in der Datenschutzerklärung)
- Task `infrastructure-d3m1s`
- Rechtstexte (BC-lokal): `website-sgapx`
