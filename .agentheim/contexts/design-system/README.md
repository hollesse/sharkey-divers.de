# Design System

## Purpose
Frontend-Fundament der Seite: die aus dem fertigen **Clot-Design-Prototyp** übernommenen Tokens (Farben, Typografie, Abstände), Komponenten und Muster, umgesetzt als Bestandteil des Jekyll-Themes. Besonderheit dieses Projekts: Das Design existiert bereits vollständig und ist vom Betreiber abgenommen — dieses BC *erfindet* kein Design, es **überträgt** den Prototyp treu ins Theme und hält ihn als Referenz fest.

## Classification
supporting

## Actors
- **Betreiber** — Autor und Abnehmer des Designs; Review-Instanz für das Styleguide-Gate.

## Ubiquitous language
- **Clot-Prototyp** — das im Claude-Design-Projekt erarbeitete Referenzdesign (Startseite, Berichte-Übersicht, Bericht-Detail, Impressum inkl. Assets), verbindlich abgelegt unter `docs/design-prototype/`.
- **Token** — Farbe, Schriftgröße, Abstand etc. als benannter Wert im Theme. Umgesetzt als SCSS-Variablen in `_sass/_tokens.scss`: Farben (`$color-*`, u. a. `$color-navy-900`, `$color-blue-700`, `$color-red-600`), Schriftfamilien (`$font-heading`, `$font-body`), eine Schriftgrößen-Skala in 0.5px-Schritten (`$font-size-13` … `$font-size-20`) plus benannte `clamp()`-Tokens für responsive Überschriften (`$font-size-hero-title`, `$font-size-heading-lg` usw.), eine Abstands-Skala für Gaps/Paddings/Margins (`$space-2` … `$space-56`), Container-Breiten (`$container-max` u. a.), Section-Innenabstände (`$section-padding-y/-x`) und Radien (`$radius-*`). `_sass/_base.scss`, `_layout.scss` und `_components.scss` referenzieren für alle wiederkehrenden Farb-, Schriftgrößen- und Abstandswerte diese Tokens. Ausgenommen bleiben bewusst echte Einzelfälle (z. B. einmalige `clamp()`-Innenabstände einzelner Sektionen, Bild-/Media-Höhen, Flex-Basis-/Min-Width-Layoutmaße, Icon-/Logo-Maße, strukturelle `1px`-Rahmenlinien) — diese sind kein Teil der Skala und würden sie beim Erzwingen verzerren.
- **Styleguide-Gate** — Checkpoint: erst wenn das Theme dem Prototyp entspricht und der Betreiber abgenommen hat, dürfen Frontend-Feature-Tasks anderer BCs umgesetzt werden.
- **Seiten-Header ("page-hero")** — dunkler Titel-Header für Unterseiten (Berichte-Übersicht, Impressum, Datenschutz), umgesetzt in `_includes/page-hero.html` / `_layouts/page.html`.
- **Bericht-Karte ("bericht-card")** — wiederkehrende Karten-Komponente für Berichte-Vorschau (Startseite) und -Übersicht, zeigt Titelbild (falls vorhanden), Datum-Kicker ("MONAT JAHR", deutsch, über `_includes/monat-jahr.html` + `_data/monate.yml`), Titel, Teaser, "Weiterlesen"-Link.
- **Schlanke Footer-Variante ("footer_slim")** — Front-Matter-Flag, das auf Unterseiten (Berichte, Bericht, Impressum, Datenschutz) den vollen Footer (Adresse/Spalten, nur Startseite) durch eine schmale Copyright-Zeile ersetzt.

## Aggregates
—

## Key events
- Styleguide abgenommen (Gate offen).

## Key commands
- Design-Review anfordern.

## Harte Regeln fürs Theme
- **Keine Third-Party-Requests im Auslieferungspfad (ADR 0007):** Fonts, Icons und alle Assets werden self-hosted; keine CDN-Einbindungen, Karten nur als verlinktes Bild, Video-Embeds nur mit Klickschutz. Voraussetzung für die Consent-Freiheit der Seite. Umgesetzt: `assets/fonts/*.woff2` (Schibsted Grotesk, Source Sans 3, je eine Variable-Font-Datei mit vollem Gewichtsbereich, Subset "latin"), eingebunden über `_sass/_fonts.scss`. Einzige dokumentierte Ausnahme: `admin/index.html` lädt Sveltia CMS über `unpkg.com` (CMS-Backend, nicht Teil des Ausliefer-Pfads der öffentlichen Seite).

## Relationships with other contexts
- **Upstream von `website`:** Jedes Frontend-Task dort hängt per `depends_on: [design-system-001-styleguide]` am Styleguide-Gate.
- **Downstream von `infrastructure`:** baut auf dem Walking Skeleton (laufende Jekyll-Site) auf.

## Open questions
- Ob nach der Theme-Übertragung ein separater, dauerhaft gepflegter Styleguide (eigene Seite) nötig ist oder das Theme selbst als Referenz genügt.
- **Logo fehlt:** `dist/assets/logo.png` aus dem Clot-Prototyp konnte beim Design-Import nicht mitgezogen werden (Datei zu groß für die Design-API). Übergangsweise liegt ein SVG-Wortmark-Platzhalter unter `assets/img/logo.svg` (Header, helle Fläche) und `assets/img/logo-light.svg` (Footer, dunkle Fläche) mit TODO-Kommentar in beiden Dateien und an den Referenzstellen (`_includes/header.html`, `_includes/footer.html`). Sobald das Original vorliegt: Dateien austauschen, `<img>`-`width`/`height`-Attribute in beiden Includes ggf. anpassen.
- **Styleguide-Gate offen:** Der Betreiber hat das Theme im Vergleich zum Prototyp noch nicht geprüft/abgenommen (Preview nach Merge unter https://hollesse.github.io/sharkey-divers.de/). Bis zur expliziten Abnahme dürfen keine Frontend-Feature-Tasks anderer BCs nach `todo` promotet werden.
