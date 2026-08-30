---
id: infrastructure-tck5g
title: "DNS-Cutover-Plan: Altseite → Neuseite"
status: doing
type: decision
context: infrastructure
created: 2026-08-30
completed:
depends_on: []
blocks: []
tags: [dns, launch, foundation]
related_adrs: [0001]
related_research: []
prior_art: []
---

## Why
`sharkey-divers.de` liefert aktuell statisches Alt-HTML; bestehende Google-Treffer und externe Links zeigen auf alte URLs. Der Cutover ist der einzige Schritt mit echtem Ausfallrisiko und Einmal-Charakter — er braucht einen festgeschriebenen Plan, kein Ad-hoc-Umschalten. Ein harter Schnitt ohne Redirect-Mapping würde vorhandene Sichtbarkeit für "Tauchen lernen Weilburg" verbrennen — genau das Vision-Ziel.

## What
ADR committen, das die Cutover-Strategie festschreibt (Archivierung, URL-Mapping, Redirects, TTL- und HTTPS-Reihenfolge).

## Acceptance criteria
- [ ] ADR committet; Begründung entspricht dem Architekten-Entwurf (oder vom Betreiber angepasst).
- [ ] Geklärt: Existiert ein URL-Inventar der Altseite oder muss gecrawlt werden?
- [ ] Keine Code-Änderung nötig — die Umsetzung (Archiv, Redirect-Stubs, DNS-Umstellung) wird nach dem ADR als eigene Tasks modelliert.

## Notes
**ADR-Entwurf des Architekten (Cutover-Strategie):**

> 1. Altseite vor allem anderen vollständig archivieren (`wget --mirror`, unter `archiv/` ins Repo oder off-repo).
> 2. URL-Inventar der Altseite erstellen und auf neue Ziele mappen; Umsetzung via `jekyll-redirect-from` (Meta-Refresh-Stubs, da GitHub Pages keine 301er kann — zweitbeste, aber einzig verfügbare Lösung).
> 3. Neue Seite vorab unter der `*.github.io`-URL abnehmen, dort per `robots.txt`/`noindex` aus dem Index halten.
> 4. TTL der bestehenden Records 24 h vorher auf 300 s senken.
> 5. Cutover: A/AAAA für Apex auf GitHub-Pages-IPs, `www` als CNAME; kanonische Variante festlegen (Empfehlung: Apex ohne `www`).
> 6. "Enforce HTTPS" erst nach vollständiger Propagation aktivieren — vorher schlägt die Zertifikatsausstellung fehl (kann bis 24 h dauern).
> 7. TTL wieder anheben; Alt-Hoster erst nach einer Karenzwoche kündigen.
