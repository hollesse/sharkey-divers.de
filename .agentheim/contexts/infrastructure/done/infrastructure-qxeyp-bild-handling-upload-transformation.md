---
id: infrastructure-qxeyp
title: "Bild-Handling: Optimierung beim Upload statt im Build"
status: done
type: decision
context: infrastructure
created: 2026-08-30
completed: 2026-08-30
depends_on: []
blocks: []
tags: [media, bilder, foundation]
related_adrs: [0001, 0005]
related_research: []
prior_art: []
---

## Why
Redakteure laden unbearbeitete Handyfotos hoch; Repo-Größe und Ladezeit müssen ohne Redakteurs-Disziplin im Rahmen bleiben. Jekyll-Bildplugins mit nativen Abhängigkeiten (ImageMagick/libvips) sind die häufigste Ursache für Builds, die Jahre später "plötzlich" brechen — das widerspricht dem Wartungsarmut-Ziel.

## What
ADR committen: Bilder werden am **Upload-Punkt** optimiert (Sveltia-Upload-Transformation: WebP, max. 1600 px Kantenlänge, Qualität ~80), Media-Konvention `media_folder: assets/uploads` mit Unterordner pro Bericht. Keine Build-Zeit-Bildverarbeitung, kein `srcset` in v1.

## Acceptance criteria
- [x] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [x] Der Decap-Fallback (GitHub Action `calibreapp/image-actions` mit Bot-Commit-Ausnahme vom Deploy-Trigger, sonst Build-Schleife) ist im ADR dokumentiert.
- [x] Keine Code-Änderung nötig.

## Notes
Hängt inhaltlich an der Sveltia-Wahl in [[infrastructure-any72]] — kippt Sveltia, greift der Action-Fallback, nicht eine Neuverhandlung der Bildstrategie. Das Galerie-**Rendering** (Markup, Lazy-Loading, Aspect-Ratio) ist BC-lokal im website-BC: [[website-v5xky]].

**ADR-Entwurf des Architekten:**

> **Bildoptimierung beim Upload statt im Build** *(scope: global)*
> **Decision** — `media_folder: assets/uploads`, `public_folder: /assets/uploads`, pro Bericht ein Unterordner. Sveltia-Upload-Transformation: WebP, max. 1600 px. Genau eine ausgelieferte Bildgröße; Galerie zeigt CSS-gecroppte Thumbnails desselben Assets. Keine Build-Zeit-Bildverarbeitung.
> **Consequences** — (+) Build bleibt reines Ruby, langfristig stabil. (+) Repo wächst um wenige MB/Jahr — GitHub-Grenzen auf Jahrzehnte irrelevant. (−) Suboptimale Bytes auf Mobilgeräten (kein `srcset`) — bei ~200 KB/Bild akzeptabel, nachrüstbar. (−) Bindet an eine Sveltia-Funktion (Fallback siehe oben).
> **Alternatives** — *jekyll-picture-tag*: bestes Ergebnis, schlechteste Haltbarkeit. *Cloudinary/imgix*: löst alles, aber Free-Tier-Risiko, Lock-in, weiterer Datenschutz-Empfänger. *Konvention "bitte vorher verkleinern"*: scheitert erfahrungsgemäß beim zweiten Bericht.

## Outcome
ADR 0005 (`.agentheim/knowledge/decisions/0005-bildoptimierung-beim-upload.md`) committet den Architekten-Entwurf unverändert in der Substanz: Bildoptimierung erfolgt beim Upload über Sveltia (WebP, max. 1600 px, Qualität ~80), keine Build-Zeit-Bildverarbeitung, ein Unterordner pro Tauchbericht unter `assets/uploads`. Der Decap-Fallback (`calibreapp/image-actions` per Bot-Commit, mit expliziter Ausnahme vom Deploy-Trigger zur Vermeidung einer Build-Schleife) ist als dokumentierter, nicht implementierter Rückfallpfad enthalten. Keine Code-Änderung erforderlich; BC-README unverändert, da keine neue Terminologie/Aggregate eingeführt wurden.
