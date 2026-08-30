---
id: 0005
title: Bildoptimierung beim Upload statt im Build
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-qxeyp]
related_research: []
---

# ADR 0005: Bildoptimierung beim Upload statt im Build

## Context
Redakteure laden unbearbeitete Handyfotos hoch (typischerweise mehrere MB pro Bild, aus der Kamera-App ohne jede Nachbearbeitung). Ohne Gegenmaßnahme wachsen damit sowohl Repo-Größe als auch Ladezeit der Seite unkontrolliert — eine Konvention wie "bitte vorher verkleinern" scheitert erfahrungsgemäß spätestens beim zweiten Tauchbericht.

Jekyll-Bildplugins mit nativen Abhängigkeiten (ImageMagick/libvips) sind die häufigste Ursache für Builds, die Jahre später "plötzlich" ohne erkennbaren Anlass brechen (Betriebssystem-Update, Gem-Inkompatibilität, abgekündigte native Bibliothek). Das widerspricht dem in ADR 0001 gesetzten Leitkriterium Wartungsarmut frontal: der Build soll auf Jahrzehnte hinweg ohne Eingriff funktionieren.

ADR 0003 legt Sveltia CMS als CMS-Frontend fest und bringt dabei eine Upload-Transformation für Bilder mit — diese Fähigkeit wird hier zur tragenden Entscheidung für die Bildstrategie.

## Decision
Bilder werden **am Upload-Punkt** optimiert, nicht zur Build-Zeit:

- `media_folder: assets/uploads`, `public_folder: /assets/uploads`, mit einem Unterordner pro Tauchbericht.
- Sveltia-Upload-Transformation wandelt jedes hochgeladene Bild automatisch in **WebP** um, mit **max. 1600 px Kantenlänge** und einer Qualität von **~80**.
- Es wird genau **eine** ausgelieferte Bildgröße erzeugt und im Repo abgelegt. Es gibt kein `srcset`, keine mehreren Auflösungsvarianten.
- Die Galerie im website-BC zeigt CSS-gecroppte Thumbnails desselben Assets (Rendering-Details: siehe website-BC, Task website-v5xky).
- Keine Build-Zeit-Bildverarbeitung — der Jekyll-Build bleibt reines Ruby ohne native Bildbibliotheken (ImageMagick/libvips).

### Fallback bei Rückfall auf Decap CMS
ADR 0003 dokumentiert bereits, dass ein Rückfall von Sveltia auf Decap CMS ein Ein-Zeilen-Change ist (Austausch des `<script>`-Tags, identische `config.yml`). Decap CMS bringt jedoch **keine** Upload-Bildtransformation mit. Für diesen Fall gilt als dokumentierter Fallback:

- Eine GitHub Action mit **`calibreapp/image-actions`** übernimmt die Bildoptimierung nachträglich per Bot-Commit auf hochgeladene Bilder.
- Dieser Bot-Commit muss explizit **vom Deploy-Trigger ausgenommen** werden (z. B. über eine Prüfung auf den Commit-Autor/Actor in der Workflow-Bedingung), da der optimierende Commit sonst einen erneuten Build auslöst, der wiederum die bereits optimierten Bilder unverändert lässt, aber denselben Trigger-Mechanismus erneut durchläuft — ohne Ausnahme entsteht eine Build-Schleife (Commit optimiert Bild → löst Deploy aus → Deploy-Workflow committet ggf. erneut → löst erneut aus).
- Dieser Fallback-Pfad wird nicht implementiert, solange Sveltia CMS im Einsatz ist. Er ist hier ausschließlich als Absicherung dokumentiert, falls sich Sveltia als nicht tragfähig erweist (vgl. ADR 0003, Risiko "Ein-Personen-Projekt").

## Consequences
### Positive
- Der Build bleibt reines Ruby, ohne native Bildbibliotheks-Abhängigkeiten — langfristig stabil, keine unerwarteten Build-Brüche durch Umgebungsänderungen.
- Das Repo wächst nur um wenige MB pro Jahr (WebP, max. 1600 px, ~200 KB/Bild) — GitHub-Repo-Größengrenzen bleiben auf Jahrzehnte irrelevant.
- Bildoptimierung passiert automatisch beim Hochladen, ohne dass Redakteure Disziplin oder Zusatzwerkzeug benötigen.

### Negative
- Ohne `srcset` werden auf mobilen Geräten tendenziell mehr Bytes übertragen als nötig — bei ~200 KB pro Bild als akzeptabel bewertet; bei Bedarf später nachrüstbar, ohne die Grundentscheidung zu ändern.
- Die Bildstrategie ist an eine Sveltia-Funktion gebunden. Fällt Sveltia aus (Ein-Personen-Projekt-Risiko, siehe ADR 0003), muss der oben dokumentierte Action-Fallback tatsächlich umgesetzt werden — das ist kein Neuentwurf der Bildstrategie, sondern eine reine Werkzeug-Migration.

### Neutral
- Das Galerie-Rendering (Markup, Lazy-Loading, Aspect-Ratio) ist bewusst nicht Teil dieses ADRs — es ist BC-lokal im website-BC geregelt (Task website-v5xky).

## Alternatives considered
- **jekyll-picture-tag / ähnliche Build-Zeit-Bildplugins** — liefert das beste Auslieferungsergebnis (mehrere Größen, `srcset`), aber schlechteste Haltbarkeit: native Abhängigkeiten (ImageMagick/libvips) sind der typische Grund für Builds, die Jahre später ohne erkennbaren Anlass brechen. Widerspricht dem Wartungsarmut-Kriterium.
- **Cloudinary / imgix (externer Bild-Dienst)** — würde Transformation und Auslieferung vollständig lösen, bringt aber Free-Tier-Risiko, Vendor-Lock-in und einen zusätzlichen Datenschutz-Empfänger mit sich, ohne dass der Mehrwert bei der geringen Bildmenge dieser Seite den Aufwand rechtfertigt.
- **Konvention "Redakteure verkleinern Bilder selbst vor dem Upload"** — kein technischer Zwang, erfahrungsgemäß nicht durchhaltbar über mehrere Berichte hinweg.

## References
- ADR 0001 (Statische Seite mit Jekyll + git-basiertem CMS statt WordPress)
- ADR 0003 (CMS-Auth - Sveltia CMS mit GitHub-Backend und eigenem OAuth-Proxy)
- Task infrastructure-qxeyp
- Task website-v5xky (Galerie-Rendering im website-BC)
