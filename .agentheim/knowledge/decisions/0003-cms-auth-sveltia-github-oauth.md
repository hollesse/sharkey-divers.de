---
id: 0003
title: CMS-Auth - Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-any72]
related_research: []
---

# ADR 0003: CMS-Auth - Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy

## Context
Redakteure sind Vereinsmitglieder ohne Entwickler-Werkzeug. ADR 0001 legt Decap CMS als git-basiertes CMS-Frontend fest; dieses ADR präzisiert und ergänzt 0001 um die konkrete Wahl des Auth-Wegs — es ersetzt 0001 nicht, sondern füllt die dort offen gelassene Frage nach dem Redaktions-Login.

Netlify Identity ist seit 2024 Legacy und für neue Sites nicht mehr verfügbar; Git Gateway hängt daran und teilt das Schicksal — der ursprüngliche Standardweg (Decap + Git Gateway + Netlify Identity) ist damit ausgeschlossen. Es gibt für git-basierte CMS keinen wartungsarmen Weg zu "Redakteur ohne Git-Provider-Account", der nicht entweder einen Bezahldienst oder eine selbstbetriebene Identity-Komponente einführt — beides widerspricht der Vision (minimaler Wartungsaufwand, keine laufenden Kosten) stärker als die Einmalhürde eines persönlichen GitHub-Accounts.

Der Betreiber hat der damit verbundenen Abweichung von der ursprünglichen Brainstorm-Annahme ("Redakteure ohne Git-Provider-Account") explizit zugestimmt: Redakteure erhalten persönliche GitHub-Accounts über ein betreutes Onboarding. Ebenso wurde die Vorfrage geklärt, unter welchem GitHub-Konto das Repo zunächst betrieben wird: dem persönlichen Account des Betreibers; ein Umzug in eine Vereins-Organization wird bewusst vertagt.

## Decision
Als CMS-Frontend wird **Sveltia CMS** statt Decap CMS eingesetzt — ein Decap-config-kompatibler Drop-in unter `/admin/` (identische `config.yml`, Austausch beschränkt sich auf das `<script>`-Tag im Admin-HTML).

Als Backend dient `github`: Redakteure werden als Repo-Collaborators (inkl. 2FA) geführt. Login erfolgt per "Mit GitHub anmelden" (ein Klick). Die Authentifizierung läuft über einen selbst deployten OAuth-Proxy (Cloudflare Worker, `sveltia-cms-auth`) gegen eine GitHub OAuth App.

Der Editorial Workflow bleibt in v1 **aus** — es wird direkt auf `main` committet. Bei 1–3 Redakteuren erzeugt Review-Ping-Pong nur Reibung ohne Mehrwert.

## Consequences
### Positive
- Kein abgekündigter Baustein im Auth-Pfad (im Gegensatz zu Netlify Identity/Git Gateway).
- Keine laufenden Kosten, keine eigene Nutzerdatenbank.
- Rückfall auf Decap CMS ist ein Ein-Zeilen-Change (Absicherung gegen das Risiko, dass Sveltia ein Ein-Personen-Projekt ist).
- Sveltia bringt Bild-Transformation beim Upload mit (siehe Task infrastructure-qxeyp).

### Negative
- Einmalhürde GitHub-Account + 2FA pro Redakteur — eine bebilderte Anleitung ist ein eigenes Deliverable (siehe Task infrastructure-h937s).
- Zwei Fremdsysteme im Auth-Pfad (GitHub + Cloudflare Worker); fällt der Worker aus, ist kein CMS-Login möglich — die Site selbst bleibt davon unberührt online.
- Offboarding ausscheidender Redakteure (Entzug der Collaborator-Rechte) ist ein manueller Pflegeschritt.

### Neutral
- Das Repo läuft zunächst unter dem persönlichen GitHub-Account des Betreibers; der Umzug in eine Vereins-Organization ist bewusst vertagt (siehe Task infrastructure-kwtv6).
- Direkt-Commit auf `main` ohne Editorial Workflow ist eine bewusste v1-Entscheidung, keine dauerhafte Festlegung.

## Alternatives considered
- **Netlify Identity + Git Gateway** — abgekündigt, ausgeschlossen.
- **Decap CMS + GitHub-Backend + eigener OAuth-Proxy** — funktioniert identisch (gleiches Backend/Auth-Modell), aber schlechtere UI und keine Upload-Bildtransformation. Bleibt dokumentierter Fallback, falls Sveltia sich als nicht tragfähig erweist.
- **TinaCMS Cloud / CloudCannon / Contentful** — eigene Nutzerverwaltung ohne GitHub-Account-Zwang, aber Vendor-Lock-in, Free-Tier-Risiko und potenzielle laufende Kosten.
- **Selbstbetriebener Identity-Server** — widerspricht der Vision "wartungsarm" frontal.
- **Gemeinsamer Redaktions-Account** — geteiltes Passwort, keine Autorenzuordnung, keine individuelle 2FA — abgelehnt.

## References
- ADR 0001 (Statische Seite mit Jekyll + Decap CMS statt WordPress)
- Task infrastructure-any72
- Task infrastructure-h937s (bebilderte GitHub-Onboarding-Anleitung)
- Task infrastructure-kwtv6 (Hosting/Org-Migration)
- Task infrastructure-qxeyp (Bild-Transformation beim Upload)
