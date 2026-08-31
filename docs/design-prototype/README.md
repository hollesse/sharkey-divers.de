# Design-Prototyp (Import aus Claude Design)

Quelle: claude.ai/design Projekt "Sharkey Divers Website" (8622bda2-aa59-4b78-8a9f-c4a3541f3ab0),
importiert 2026-08-30 für design-system-001-styleguide.

- `index.html`, `berichte.html`, `bericht.html`, `impressum.html` — gerenderte dist-Seiten des Prototyps (verbindliche Design-Referenz; enthalten `sc-if`/`sc-for`-Templating und einen `x-dc`-Runtime-Wrapper, der im Jekyll-Theme durch Liquid ersetzt wird)
- `jekyll-decap-setup.md` — Setup-Notizen aus der Design-Session (Achtung: git-gateway/Netlify-Identity-Empfehlung darin ist überholt, siehe ADR 0003)
- `assets/` — Bild-Assets des Prototyps, byte-verifiziert importiert: hero, verein-gruppe, verein-schoenbach, verein-stammtisch, training-bild, bericht-hero, bericht-bild-1, bericht-bild-2.
  **Fehlend (>256-KiB-API-Limit, manuell aus dem Design-Projekt exportieren):** `logo.png` (Header/Footer!) sowie die optionalen Beispiel-Kartenbilder `bericht-1/2.webp`, `uebersicht-1/2/4/6.webp` (nur Beispiel-Content, verzichtbar).

ADR-0007-Hinweis: Der Prototyp lädt Google Fonts (Schibsted Grotesk, Source Sans 3) per CDN —
im Theme MÜSSEN diese self-hosted eingebunden werden.
