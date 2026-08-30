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
- DNS-Cutover-Strategie entschieden (ADR 0006): Archivierung → URL-Mapping mit Meta-Refresh-Stubs (`jekyll-redirect-from`, da GitHub Pages keine 301er kann) → Abnahme via `*.github.io` → TTL senken → Cutover (Apex ohne `www` als kanonisch) → HTTPS erst nach Propagation → TTL anheben, Alt-Hoster erst nach Karenzwoche kündigen. Offener Punkt: ob ein URL-Inventar der Altseite existiert oder erst gecrawlt werden muss, klärt der Betreiber vor Umsetzung.
- Siehe verbleibende Decision-Tasks in `todo/` (Decap-Backend, Pipeline, Bild-Handling).
- Walking Skeleton steht (`infrastructure-001`): Jekyll-4-Projekt (Gemfile/Gemfile.lock, `_config.yml`, Layouts, Startseite, Berichte-Liste, ein Beispiel-Post mit Bild, Impressum/Datenschutz-Platzhalter), `admin/` mit Sveltia CMS (Decap-kompatible `config.yml`), `.github/workflows/deploy.yml` + `build.yml`, `.github/dependabot.yml` liegen lokal fertig und bauen fehlerfrei (`bundle exec jekyll build`). Offen und nur vom Betreiber/Owner ausführbar: GitHub-Repo öffentlich anlegen, Pages aktivieren, GitHub-OAuth-App + `sveltia-cms-auth`-Cloudflare-Worker deployen, erster Login-/Upload-Test — Schritt-für-Schritt in `docs/launch-checkliste.md`.
