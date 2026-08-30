# Website

## Purpose
Der inhaltliche Kern von sharkey-divers.de: das Jekyll-Theme aus dem Clot-Design-Prototyp, die pflegbaren Seiten (Impressum, Datenschutz), die Berichte (Blogposts) und deren Decap-CMS-Collections. Alles, was ein Besucher sieht und ein Redakteur pflegt, lebt hier.

## Classification
core

Der Außenauftritt und die pflegbaren Berichte sind der eigentliche Zweck des Projekts.

## Actors
- **Interessent** — liest Startseite, Berichte, Vereinsinfos; nimmt per E-Mail Kontakt auf.
- **Redakteur** — legt Berichte an und pflegt Impressum/Datenschutz über das Decap-Webinterface, ohne Git-Kenntnisse.
- **Betreiber** — entwickelt und wartet Theme und CMS-Konfiguration.

## Ubiquitous language
- **Bericht** — Tauchbericht; Blogpost mit Titel, Datum, Text, Bildern (perspektivisch Galerie). Der lebende Content der Seite.
- **Berichte-Übersicht** — Listenseite aller Berichte.
- **Pflegbare Seite** — Einzelseite (Impressum, Datenschutz), deren Inhalt als Markdown über Decap editierbar ist.
- **Theme** — das aus dem Clot-Prototyp abgeleitete Jekyll-Theme: Layouts, Includes, Styles und die (in v1 statische) Startseite.
- **Collection** — Decap-CMS-Begriff für eine pflegbare Inhaltsart (Berichte, Seiten).
- **Galerie** — kleine Fotostrecke in einem Bericht; v1 nice-to-have.

## Aggregates
- **Bericht** — ein Bericht ist als einzelne Markdown-Datei mit Frontmatter in sich konsistent (Titel, Datum, Bilder vorhanden und referenzierbar).

## Key events
- Bericht veröffentlicht (Decap-Commit → Build → live).
- Seite (Impressum/Datenschutz) aktualisiert.

## Key commands
- Bericht anlegen / bearbeiten (Redakteur via Decap).
- Pflegbare Seite bearbeiten (Redakteur via Decap).

## Relationships with other contexts
- **Downstream von `design-system`:** Jedes Frontend-/UI-Task in diesem BC muss `depends_on: [design-system-001-styleguide]` tragen — das Styleguide-Gate ist offen, sobald das Theme aus dem Clot-Design abgenommen ist.
- **Downstream von `infrastructure`:** Hosting, Decap-Backend und Build-Pipeline werden dort entschieden; dieses BC konsumiert sie.

## Open questions
- Galerie-Modellierung in Decap (Widget vs. Frontmatter-Bildliste vs. Inline-Markdown).
- Startseite pflegbar machen (v2)?
