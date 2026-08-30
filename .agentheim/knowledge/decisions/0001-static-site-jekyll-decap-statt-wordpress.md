---
id: 0001
title: Statische Seite mit Jekyll + Decap CMS statt WordPress
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: []
related_research: []
---

# ADR 0001: Statische Seite mit Jekyll + Decap CMS statt WordPress

## Context
Die Vereinswebsite sharkey-divers.de ist handgeschriebenes Alt-HTML ohne Pflegezugang und veraltet deshalb seit Jahren. Der Betreiber hat langjährige Erfahrung mit WordPress-Seiten: Plugins veralten, brechen und werden angreifbar; der laufende Pflegeaufwand für den Techniker ist erheblich. Die Publikationsfrequenz des Vereins ist niedrig (einige Berichte pro Jahr) — Redakteure sind Vereinsmitglieder ohne Technikwissen.

## Decision
Die neue Seite wird als statische Site mit **Jekyll** generiert und über **Decap CMS** (git-basiert, Web-Oberfläche) gepflegt. Kein dynamisches CMS, kein WordPress.

## Consequences
### Positive
- Nahezu kein Wartungsaufwand: keine Plugin-Updates, keine Datenbank, minimale Angriffsfläche.
- Inhalte liegen als Markdown im Git-Repo — versioniert, portabel, kein Vendor-Lock-in.
- Hosting ist billig bis kostenlos und trivial (statische Dateien).

### Negative
- Dynamische Features (Formulare, Login, Kalender) sind ohne externe Dienste nicht möglich — bewusst als Non-Goals akzeptiert.
- Der Redaktions-Login hängt an einem Decap-Backend, das für Nicht-Techniker erst eingerichtet werden muss (eigene Entscheidungs-Task).
- Zwischen Speichern im CMS und Sichtbarkeit liegt ein Build-Lauf (Sekunden bis Minuten).

### Neutral
- Jede Inhaltsänderung ist ein Git-Commit.

## Alternatives considered
- **WordPress** — volles CMS mit Login-Redaktion, aber Plugin-Verfall, Update-Pflicht und Angriffsfläche stehen bei der geringen Publikationsfrequenz in keinem Verhältnis.
- **Alt-Zustand beibehalten (statisches Hand-HTML)** — genau das Problem: niemand kann pflegen, Content veraltet.
- **Anderer SSG (Hugo, Eleventy, Astro)** — möglich, aber Jekyll ist dem Betreiber vertraut und mit Decap etabliert; der Design-Prototyp zielt bereits auf ein Jekyll-Theme.

## References
- `vision.md` (Problem, Non-Goals)
