# Jekyll + Decap CMS – Struktur für den Relaunch

Technischer Unterbau für das Design in `Sharkey Divers Website.dc.html`.

## Repo-Layout

```
├── _config.yml
├── index.html            # Startseite (Design s. Mockup)
├── verein.md
├── training.md
├── termine.md            # rendert _data/termine.yml
├── berichte/index.html   # Blog-Übersicht
├── impressum.md
├── datenschutz.md
├── _layouts/
│   ├── default.html      # Header/Footer, Meta
│   ├── page.html
│   └── bericht.html
├── _includes/
│   ├── header.html
│   └── footer.html
├── _posts/               # Berichte (Decap-Collection)
│   └── 2026-05-10-saisonstart-schoenbach.md
├── _data/
│   ├── termine.yml       # per Decap pflegbar
│   └── verein.yml        # Kontakt, Vorstand, Trainingszeiten
├── assets/
│   ├── css/main.css
│   └── img/uploads/      # Decap media_folder
└── admin/
    ├── index.html        # lädt Decap CMS
    └── config.yml
```

## admin/config.yml (Kern)

```yaml
backend:
  name: git-gateway        # oder github, je nach Hosting
  branch: main

media_folder: assets/img/uploads
public_folder: /assets/img/uploads
locale: de

collections:
  - name: berichte
    label: Berichte
    folder: _posts
    create: true
    slug: "{{year}}-{{month}}-{{day}}-{{slug}}"
    fields:
      - { name: title, label: Titel }
      - { name: date, label: Datum, widget: datetime }
      - { name: teaser, label: Teaser, widget: text }
      - { name: bild, label: Bild, widget: image, required: false }
      - { name: body, label: Text, widget: markdown }

  - name: termine
    label: Termine
    files:
      - name: termine
        label: Terminliste
        file: _data/termine.yml
        fields:
          - name: termine
            label: Termine
            widget: list
            fields:
              - { name: datum, label: Datum }
              - { name: titel, label: Titel }
              - { name: info, label: Info, required: false }

  - name: seiten
    label: Seiten
    files:
      - { name: verein, label: "Der Verein", file: verein.md,
          fields: [ { name: title, label: Titel }, { name: body, label: Text, widget: markdown } ] }
      - { name: training, label: Training, file: training.md,
          fields: [ { name: title, label: Titel }, { name: body, label: Text, widget: markdown } ] }

  - name: einstellungen
    label: Vereinsdaten
    files:
      - name: verein
        label: Kontakt & Trainingszeiten
        file: _data/verein.yml
        fields:
          - { name: email, label: E-Mail }
          - { name: adresse, label: Postanschrift, widget: text }
          - { name: vorsitzender, label: 1. Vorsitzender }
          - name: trainingszeiten
            label: Trainingszeiten
            widget: list
            fields:
              - { name: name, label: Angebot }
              - { name: info, label: Beschreibung }
```

## Hosting-Empfehlung

- **Netlify** (kostenlos für Vereine ausreichend): Git-Push → Build → live; Decap läuft über Netlify Identity + Git Gateway, d.h. Redakteure brauchen kein GitHub-Konto.
- Alternativ GitHub Pages + Decap mit `github`-Backend (Redakteure brauchen dann GitHub-Zugang).

> **Anmerkung Import 2026-08-30:** Die Hosting-/Backend-Empfehlung oben ist überholt —
> Netlify Identity/Git Gateway ist abgekündigt. Entschieden ist: GitHub Pages (ADR 0002),
> Sveltia CMS mit github-Backend + OAuth-Worker (ADR 0003). Termine-/Seiten-Collections
> oben sind Design-Session-Ideen; v1-Scope bleibt: Berichte + Impressum + Datenschutz pflegbar.

## Redaktions-Workflow

1. `/admin` aufrufen, einloggen.
2. Bericht anlegen oder Termin in der Liste ergänzen → speichern → Site baut automatisch neu.
3. Bilder landen in `assets/img/uploads`, werden im Bericht ausgewählt.

## Offene Punkte (bitte prüfen)

- Trainingszeiten/-ort: im Mockup bewusst vage („Freitagabend im Hallenbad") – bitte konkrete Zeiten liefern.
- Kontakt-Mailadresse: `info@tauchclub-weilburg.de` ist angenommen.
- Beispiel-Termine und -Berichte sind erfunden (als Platzhalter markierbar).
- Impressum: alter Text enthält Copy-Paste-Reste („Delphin Butzbach e.V.") – beim Relaunch korrigieren, Datenschutzerklärung (DSGVO) ergänzen.
