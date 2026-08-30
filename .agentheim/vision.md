# Vision: sharkey-divers.de

## Purpose
Ein pflegeleichter statischer Außenauftritt für den Tauchclub **Sharky Divers Weilburg**. Die Seite ersetzt die massiv veraltete Alt-Website (handgeschriebenes HTML ohne Pflegezugang) durch eine mit Jekyll generierte, über Decap CMS pflegbare Seite. Interessenten sollen den Verein finden, wenn sie tauchen lernen möchten; Vereinsmitglieder sollen ohne Technikwissen Tauchberichte veröffentlichen können.

## Users
- **Interessenten** — Menschen aus der Region, die tauchen lernen oder einen Tauchverein suchen. Lesen die Seite, nehmen per E-Mail Kontakt auf.
- **Redakteure** — der Betreiber (Techniker) und perspektivisch Vereinskollegen ohne GitHub-Account oder Entwickler-Werkzeug. Pflegen Berichte und einzelne Seiten über das Decap-CMS-Webinterface.
- **Betreiber** — Joshua, verantwortlich für Technik, Theme und Deployment. Will nach dem Launch möglichst wenig Wartungsaufwand.

## The problem
Die bestehende Seite unter sharkey-divers.de ist statisches Alt-HTML von vor vielen Jahren. Es gibt keinen Pflegezugang, deshalb kümmert sich niemand, deshalb gibt es keinen neuen Content — die Seite veraltet weiter. WordPress als Alternative wurde bewusst verworfen: Plugin-Verfall, Update-Pflicht und Angriffsfläche stehen bei der niedrigen Publikationsfrequenz des Vereins in keinem Verhältnis (siehe ADR 0001).

## What success looks like
- Das fertige Clot-Design ist als Jekyll-Theme umgesetzt; die Seite sieht aus wie der Prototyp.
- Impressum und Datenschutz sind als Markdown-Seiten über Decap pflegbar.
- Tauchberichte sind Blogposts, die ein Redakteur ohne Technikwissen über das Decap-Webinterface anlegen und veröffentlichen kann — inklusive Bildern.
- Die Seite läuft unter sharkey-divers.de mit HTTPS und löst die Altseite ab.
- Der laufende Wartungsaufwand für den Betreiber ist nahe null.

## Non-goals
- Kein Mitgliederbereich, kein Login für Besucher.
- Kein Terminkalender, keine Veranstaltungsanmeldung.
- Kein Newsletter.
- Kein Kontaktformular — eine E-Mail-Adresse genügt.
- Keine dynamischen Features jenseits dessen, was eine statische Seite hergibt.
- v1: Die Startseite ist **nicht** über das CMS pflegbar — sie ist Teil des Themes. Pflegbarkeit der Startseite ist eine mögliche spätere Erweiterung.

## Ubiquitous language (seed)
- **Bericht** — ein Tauchbericht; Blogpost mit Text und Bildern, geschrieben von einem Redakteur. Kernstück des lebenden Contents.
- **Berichte-Übersicht** — Listenseite aller Berichte.
- **Redakteur** — Vereinsmitglied mit Decap-Zugang; pflegt Inhalte ohne Git-/GitHub-Kenntnisse.
- **Theme** — das aus dem Clot-Design-Prototyp abgeleitete Jekyll-Theme (Layouts, Includes, Styles, Startseite).
- **Pflegbare Seite** — eine Einzelseite (Impressum, Datenschutz), deren Inhalt als Markdown über Decap editierbar ist.
- **Galerie** — kleine Fotostrecke innerhalb eines Berichts (nice-to-have für v1).

## Open questions
- Wie komfortabel lassen sich Fotogalerien an Berichten mit Decap abbilden (Widget, Bildliste im Frontmatter, einfache Markdown-Bilder)? Klärt die Modellierung.
- Wann und wie wird die Startseite pflegbar gemacht (v2)?
- DNS-Cutover: Zeitpunkt und Vorgehen für die Ablösung der Altseite.
