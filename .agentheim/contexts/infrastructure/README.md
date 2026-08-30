# Infrastructure

## Purpose
Standing home für **global gültige** technische Querschnittsthemen von sharkey-divers.de: Hosting, Deployment/Build-Pipeline, Decap-CMS-Backend/Auth, Domain/DNS/HTTPS. BC-lokale Infrastruktur (z. B. ein Layout-Detail des Themes, eine Collection-Konfiguration) bleibt im jeweiligen Ursprungs-BC — hier landet nur, was auch ohne jeden einzelnen anderen BC entschieden werden müsste.

## Classification
generic

Standard-Ops-Themen ohne vereinsspezifische Fachlichkeit; trotzdem tragend, weil der Wartungsarmut-Anspruch der Vision hier eingelöst wird.

## Actors
- **Betreiber** — trifft und wartet die Infrastruktur-Entscheidungen.
- **Redakteur** — indirekt betroffen: das Decap-Backend bestimmt, wie einfach der Redaktions-Login ist.

## Ubiquitous language
Generisches Ops-Vokabular (erwartbar dünn): Hosting, Deploy, Build-Pipeline, DNS-Cutover, HTTPS/Zertifikat, CMS-Backend, OAuth, Media Folder.

## Aggregates
—

## Key events
- Site deployed (Push/CMS-Commit → Build → live).

## Key commands
- Deploy auslösen (implizit durch Git-Push bzw. Decap-Commit).

## Relationships with other contexts
- **Upstream von `website` und `design-system`:** stellt Hosting, Build und CMS-Zugang bereit.

## Open questions
- Hosting entschieden: GitHub Pages, öffentliches Repo, persönlicher Account, Deploy via GitHub Actions, Preview ab Tag 1 unter `*.github.io` mit `noindex`, Custom Domain erst beim Cutover (ADR 0002).
- Siehe verbleibende Decision-Tasks in `todo/` (Decap-Backend, Pipeline, Bild-Handling, DNS-Cutover).
