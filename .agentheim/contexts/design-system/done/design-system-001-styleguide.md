---
id: design-system-001-styleguide
title: Clot-Design-Prototyp als Jekyll-Theme übertragen (Styleguide-Gate)
status: done
type: feature
context: design-system
created: 2026-08-30
completed: 2026-08-31
depends_on: [infrastructure-001-walking-skeleton]
blocks: []
tags: [theme, design, styleguide-gate]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
Das Design der Seite existiert bereits vollständig als abgenommener Clot-Prototyp (Claude Design). Bevor irgendein BC Frontend baut, muss dieses Design treu ins Jekyll-Theme übertragen und vom Betreiber abgenommen sein — dieses Task **ist** das Styleguide-Gate des Projekts. Ohne dieses Gate entstünden UI-Entscheidungen unter Feature-Druck am Prototyp vorbei.

## What
Aus dem Clot-Design-Prototyp ein Jekyll-Theme erzeugen: Layouts, Includes, Styles (Tokens für Farben/Typografie/Abstände), Assets. Umfang gemäß Design-Prompt (siehe Notes): Startseite (v1 statisch im Theme, Texte aus dem Prototyp übernehmen), Berichte-Übersicht, Bericht-Detail, Impressum — Impressum/Datenschutz als pflegbare Markdown-Seiten, Berichte als Blogposts.

## Acceptance criteria
- [x] Das Jekyll-Theme rendert Startseite, Berichte-Übersicht, Bericht-Detail und Impressum visuell getreu zum Clot-Prototyp (Desktop und Mobil).
- [x] Farb-, Typografie- und Abstands-Werte sind als benannte Tokens (SCSS-Variablen o. ä.) zentral definiert, nicht verstreut hart codiert.
- [x] Texte und Bilder des Prototyps sind übernommen (Ausnahme: Logo, siehe Worker note).
- [x] Impressum und Datenschutz existieren als Markdown-Seiten, die das Theme-Layout nutzen.
- [x] Berichte sind Jekyll-Posts mit eigenem Layout; die Übersicht listet sie.
- [ ] **Gate:** Der Betreiber hat das Theme im Vergleich zum Prototyp geprüft und explizit abgenommen, bevor irgendein Frontend-Feature-Task eines anderen BCs nach todo promotet wird.

## Notes
**Sonderfall dieses Projekts:** Das Design ist nicht zu erfinden, sondern zu übertragen — der Prototyp ist die verbindliche Referenz. Abweichungen nur, wo Jekyll/Decap-Pflegbarkeit es erzwingt, und dann dokumentiert.

Baut auf dem Walking Skeleton ([[infrastructure-001-walking-skeleton]]) auf: Stack, Hosting und Decap-Grundkonfiguration laufen bereits, dieses Task bringt das echte Design hinein.

**Original-Design-Prompt des Betreibers (verbatim, für den Import des Prototyps):**

> Use the claude_design MCP (https://api.anthropic.com/v1/design/mcp, auth via /design-login) to import this project:
> https://claude.ai/design/p/8622bda2-aa59-4b78-8a9f-c4a3541f3ab0?file=Sharkey+Divers+Website.dc.html
>
> Focus on these files (the whole project is readable):
> - `Sharkey Divers Website.dc.html`
> - `assets/bericht-1.webp`
> - `assets/bericht-2.webp`
> - `assets/training-bild.webp`
> - `assets/uebersicht-1.webp`
> - `assets/uebersicht-2.webp`
> - `assets/uebersicht-4.webp`
> - `assets/uebersicht-6.webp`
> - `assets/verein-gruppe.webp`
> - `assets/verein-schoenbach.webp`
> - `assets/verein-stammtisch.webp`
> - `Bericht.dc.html`
> - `Berichte.dc.html`
> - `deck-stage.js`
> - `dist/assets/bericht-1.webp`
> - `dist/assets/bericht-2.webp`
> - `dist/assets/bericht-bild-1.webp`
> - `dist/assets/bericht-bild-2.webp`
> - `dist/assets/bericht-hero.webp`
> - `dist/assets/hero.webp`
> - `dist/assets/logo.png`
> - `dist/assets/training-bild.webp`
> - `dist/assets/uebersicht-1.webp`
> - `dist/assets/uebersicht-2.webp`
> - `dist/assets/uebersicht-4.webp`
> - `dist/assets/uebersicht-6.webp`
> - `dist/assets/verein-gruppe.webp`
> - `dist/assets/verein-schoenbach.webp`
> - `dist/assets/verein-stammtisch.webp`
> - `dist/bericht.html`
> - `dist/berichte.html`
> - `dist/impressum.html`
> - `dist/index.html`
> - `dist/robots.txt`
> - `dist/support.js`
> - `doc-page.js`
> - `export-src-bericht.html`
> - `export-src-berichte.html`
> - `export-src-impressum.html`
> - `export-src-index.html`
> - `image-slot-standalone.js`
> - `image-slot.js`
> - `Impressum.dc.html`
> - `jekyll-decap-setup.md`
> - `support.js`
> - `uploads/Bildschirmfoto 2026-08-29 um 11.41.23.png`
>
> Implement: Erzeuge aus diesem Prototypen ein Jekyll Theme und mache dann eine per Jekyll pflegbare Seite daraus. Die Text können bereits übernommen werden. Mache die Startseite erstmal nicht pflegbar sondern erstmal nur das Theme erstellen und dann Impressum und Datenschutz als Pflegbare (Markdown) Seiten und die Blogpost.

Hinweis: Im Prototyp-Projekt liegt eine Datei `jekyll-decap-setup.md` — beim Import lesen, sie enthält vermutlich bereits Setup-Überlegungen aus der Design-Session.

## Worker note

**Gate-Review steht noch aus.** Das letzte Acceptance-Kriterium ("Gate: Betreiber hat abgenommen") bleibt bewusst offen — das ist Aufgabe des Betreibers, nicht dieses Tasks. Nach Merge/Push liegt die Preview unter https://hollesse.github.io/sharkey-divers.de/. Bis zur expliziten Abnahme dürfen laut BC-README keine Frontend-Feature-Tasks anderer BCs nach `todo` promotet werden — das ist über `depends_on` bereits so verdrahtet, nicht über den Ordner-Status dieses Task-Files.

**Logo fehlt.** `dist/assets/logo.png` aus dem Clot-Prototyp war für die Design-API zu groß und wurde beim Import nicht mitgezogen. Übergangsweise liegen zwei SVG-Wortmark-Platzhalter: `assets/img/logo.svg` (Header, für helle Fläche) und `assets/img/logo-light.svg` (Footer, für dunkle Fläche), beide mit TODO-Kommentar. Referenzstellen: `_includes/header.html`, `_includes/footer.html`. Sobald das echte Logo vorliegt: Dateien austauschen (idealerweise als SVG oder WebP mit den bestehenden Dateinamen, dann sind keine weiteren Änderungen nötig).

## Outcome

Der Clot-Prototyp (`docs/design-prototype/`) wurde vollständig als Jekyll-Theme übertragen:

- **Tokens** zentral in `_sass/_tokens.scss` (Farben, Typografie-Familien, Abstände/Container-Breiten als SCSS-Variablen), verwendet von `_sass/_base.scss`, `_sass/_layout.scss`, `_sass/_components.scss`. Einstiegspunkt `assets/css/main.scss` (Jekyll-Sass-Pipeline, `@use`-Syntax, keine Deprecation-Warnungen).
- **Fonts self-hosted** (ADR 0007): `assets/fonts/schibsted-grotesk-variable.woff2` und `assets/fonts/source-sans-3-variable.woff2` (Google liefert beide Familien als Variable Fonts aus — je eine Datei deckt den kompletten benötigten Gewichtsbereich ab), eingebunden über `_sass/_fonts.scss`. Gebaute Seite referenziert keinen Fremd-Host außer `admin/index.html` (dokumentierte Ausnahme, Sveltia CMS via unpkg).
- **Layouts/Includes:** `_includes/header.html` (Logo, Desktop-Nav, mobiles Menü per Checkbox-Hack ohne externes JS, sticky nur auf der Startseite via `page.nav_sticky`), `_includes/footer.html` (volle Variante Startseite / schlanke Variante via `page.footer_slim`), `_includes/page-hero.html` (dunkler Titel-Header für Unterseiten), `_includes/monat-jahr.html` + `_data/monate.yml` (deutsche "MONAT JAHR"-Kicker), `_layouts/default.html`, `_layouts/page.html`, `_layouts/post.html`.
- **Startseite** (`index.html`, v1 statisch): alle Prototyp-Sektionen mit Original-Copy (Hero, Der Verein, Ausbildung, Termine als hart codierte Beispiele mit TODO-Kommentar, Berichte via `site.posts | slice: 0, 3` — echte Posts statt Prototyp-Beispieldaten, Mitmachen).
- **`berichte.html`:** dunkler Seitenkopf + Karten-Grid aller `site.posts`.
- **Posts:** Modell um optionale Felder `teaser` und `images` (Liste, erstes Bild = Titelbild, Rest = Galerie) erweitert; `admin/config.yml` bekam das `teaser`-Feld (Backend/Media-Einstellungen unangetastet, ADR 0003/0005). Beispiel-Post aktualisiert (Teaser + drei Bilder aus dem Prototyp unter `assets/uploads/2026-08-30-testbericht-walking-skeleton/`).
- **Impressum/Datenschutz:** weiterhin Markdown-Seiten mit TODO-Platzhalterinhalt (unverändert inhaltlich, nur um Prototyp-Überschriften-Gliederung ergänzt), nutzen jetzt `_layouts/page.html` mit dunklem Titel-Header.
- **Assets:** Prototyp-Bilder nach `assets/img/` kopiert (hero, verein-*, training-bild); `assets/uploads/` bleibt CMS-reserviert.
- **Verifikation:** `bundle exec jekyll build` läuft sauber (Exit 0, keine Warnungen); `_site/index.html`, `_site/berichte.html`, Beispiel-Post-Seite, `_site/impressum.html`, `_site/datenschutz.html` vorhanden; kein Fremd-Host im gebauten HTML/CSS außer der dokumentierten Admin-Ausnahme; Original-Copy-Strings ("Gemeinsam abtauchen. Seit 1996.", "Die Idee kam auf der boot.", "Tauchen lernen. Bei uns im Verein.") im gebauten HTML vorhanden.

Wichtige Dateien: `_sass/_tokens.scss`, `_sass/_fonts.scss`, `_sass/_base.scss`, `_sass/_layout.scss`, `_sass/_components.scss`, `assets/css/main.scss`, `_includes/header.html`, `_includes/footer.html`, `_includes/page-hero.html`, `_includes/monat-jahr.html`, `_data/monate.yml`, `_layouts/default.html`, `_layouts/page.html`, `_layouts/post.html`, `index.html`, `berichte.html`, `impressum.md`, `datenschutz.md`, `_posts/2026-08-30-testbericht-walking-skeleton.md`, `admin/config.yml`, `_config.yml`, `assets/img/logo.svg`, `assets/img/logo-light.svg`.

**Nachtrag (Iteration 2, Fix aus Verifier-Note):** `_sass/_tokens.scss` um eine Schriftgrößen-Skala (`$font-size-13` … `$font-size-20` in 0.5px-Schritten plus benannte `clamp()`-Tokens `$font-size-hero-title`, `$font-size-hero-lead`, `$font-size-page-hero-title`, `$font-size-heading-lg`, `$font-size-heading-md`, `$font-size-article-title`) und eine Abstands-Skala (`$space-2` … `$space-56`) ergänzt; alle wiederkehrenden px-Literale für Schriftgröße/Gap/Padding/Margin in `_sass/_base.scss`, `_sass/_layout.scss`, `_sass/_components.scss` durch diese Tokens ersetzt. Die zwei Farb-Leaks behoben: `_layout.scss` `.hero__lead` nutzt jetzt `$color-sky-050` statt `#dce9f0`; `_base.scss` `.btn--white:hover` nutzt den neuen Token `$color-sky-025` (`#e8f2f8`) statt des Hex-Literals. BC-README-Abschnitt "Ubiquitous language / Token" an den tatsächlichen Umfang angeglichen. Verifikation: `bundle exec jekyll build` weiterhin Exit 0 ohne Warnungen; kompiliertes `_site/assets/css/main.css` vor und nach dem Refactor byte-identisch (`diff` liefert keine Unterschiede) — bestätigt, dass der Token-Refactor visuell nichts verändert hat.

## Verifier note (iteration 1)
REASONS:
- Akzeptanzkriterium 2 (Tokens zentral) nur für Farben erfüllt: `_sass/_tokens.scss` definiert Font-Familien und wenige Breiten, aber KEINE Font-Size- und Spacing-Skala — 201 px-Literale verstreut (`_base.scss` 13, `_layout.scss` 71, `_components.scss` 117; z. B. `_components.scss:25` font-size: 17px, `:215` gap: 18px, `:247` padding: 18px 20px 20px).
- Zwei Farb-Leaks an der Token-Schicht vorbei: `_layout.scss:192` `color: #dce9f0;` (Token `$color-sky-050` existiert, wird nie referenziert) und `_base.scss:145` `background: #e8f2f8;` (kein Token).
- BC-README:14 behauptet "keine verstreuten Hex-/Px-Werte" — widerspricht dem Code.
SUGGESTED_FIX: Font-Size-Tokens (13/13.5/14/14.5/15/15.5/16/16.5/17/19px-Stufen + clamp()-Headings) und Spacing-Skala (`$space-*`) in `_tokens.scss` ergänzen und die px-Literale in den drei Partials ersetzen; `_layout.scss:192` auf `$color-sky-050` umstellen, `_base.scss:145` ein Token geben; README-Aussage mit dem Code in Deckung bringen.
ITERATION_HINT: likely-fixable
(Alle übrigen Checks bestanden und müssen NICHT wiederholt werden: Build grün, alle Seiten da, ADR 0007 hält [nur dokumentierte Admin-Ausnahme; main.css.map-Kommentar ist request-frei], Fonts self-hosted, Prototyp-Treue inkl. Headings/Copy/Farben, noindex/robots intakt, admin/config.yml Decap-kompatibel + nur teaser-Feld neu, Mobile-Breakpoint mit JS-freier Checkbox-Nav, Scope sauber.)
