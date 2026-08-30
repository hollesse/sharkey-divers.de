# Design System

## Purpose
Frontend-Fundament der Seite: die aus dem fertigen **Clot-Design-Prototyp** übernommenen Tokens (Farben, Typografie, Abstände), Komponenten und Muster, umgesetzt als Bestandteil des Jekyll-Themes. Besonderheit dieses Projekts: Das Design existiert bereits vollständig und ist vom Betreiber abgenommen — dieses BC *erfindet* kein Design, es **überträgt** den Prototyp treu ins Theme und hält ihn als Referenz fest.

## Classification
supporting

## Actors
- **Betreiber** — Autor und Abnehmer des Designs; Review-Instanz für das Styleguide-Gate.

## Ubiquitous language
- **Clot-Prototyp** — das im Claude-Design-Projekt erarbeitete Referenzdesign (Startseite, Berichte-Übersicht, Bericht-Detail, Impressum inkl. Assets).
- **Token** — Farbe, Schriftgröße, Abstand etc. als benannter Wert im Theme.
- **Styleguide-Gate** — Checkpoint: erst wenn das Theme dem Prototyp entspricht und der Betreiber abgenommen hat, dürfen Frontend-Feature-Tasks anderer BCs umgesetzt werden.

## Aggregates
—

## Key events
- Styleguide abgenommen (Gate offen).

## Key commands
- Design-Review anfordern.

## Relationships with other contexts
- **Upstream von `website`:** Jedes Frontend-Task dort hängt per `depends_on: [design-system-001-styleguide]` am Styleguide-Gate.
- **Downstream von `infrastructure`:** baut auf dem Walking Skeleton (laufende Jekyll-Site) auf.

## Open questions
- Ob nach der Theme-Übertragung ein separater, dauerhaft gepflegter Styleguide (eigene Seite) nötig ist oder das Theme selbst als Referenz genügt.
