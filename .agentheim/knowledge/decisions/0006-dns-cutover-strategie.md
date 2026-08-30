---
id: 0006
title: DNS-Cutover-Strategie Altseite → Neuseite
scope: global
status: accepted
date: 2026-08-30
supersedes: []
superseded_by: []
related_tasks: [infrastructure-tck5g]
related_research: []
---

# ADR 0006: DNS-Cutover-Strategie Altseite → Neuseite

## Context
`sharkey-divers.de` liefert aktuell statisches Alt-HTML. Bestehende Google-Treffer und externe Links zeigen auf alte URLs. Der Cutover ist der einzige Schritt im Projekt mit echtem Ausfallrisiko und Einmal-Charakter — ein harter Schnitt ohne Redirect-Mapping würde vorhandene Sichtbarkeit für "Tauchen lernen Weilburg" verbrennen, genau das Gegenteil des Vision-Ziels.

GitHub Pages (ADR 0002) kann keine serverseitigen 301-Redirects ausliefern. Die Neuseite ist ab Tag 1 unter der `*.github.io`-Adresse mit `noindex`/`robots.txt` live (ADR 0002); die Custom Domain kommt erst beim Cutover.

## Decision
Der Cutover folgt dem siebenstufigen Ablauf des Architekten-Entwurfs, unverändert übernommen:

1. **Archivierung zuerst.** Die Altseite wird vor jedem weiteren Schritt vollständig gesichert (`wget --mirror`), abgelegt unter `archiv/` im Repo oder off-repo.
2. **URL-Mapping und Redirect-Stubs.** Ein URL-Inventar der Altseite wird auf neue Ziel-URLs gemappt. Umsetzung über `jekyll-redirect-from`: Meta-Refresh-Stubs statt 301er, weil GitHub Pages keine serverseitigen Redirects erlaubt (Konsequenz aus ADR 0002) — zweitbeste, aber einzig verfügbare Lösung auf dieser Hosting-Plattform.
3. **Neuseite vorab abnehmen.** Abnahme unter der `*.github.io`-URL, dort per `robots.txt`/`noindex` aus dem Suchmaschinen-Index gehalten (bereits in ADR 0002 festgelegt).
4. **TTL senken.** 24 h vor dem Cutover werden die TTLs der bestehenden DNS-Records auf 300 s reduziert, um die Umstellung schnell propagieren zu lassen.
5. **Cutover.** A/AAAA-Records für die Apex-Domain auf die GitHub-Pages-IPs, `www` als CNAME. Kanonische Variante: Apex ohne `www`.
6. **HTTPS erst nach Propagation.** "Enforce HTTPS" wird erst aktiviert, wenn die DNS-Propagation vollständig abgeschlossen ist — vorher schlägt die Zertifikatsausstellung fehl; das kann bis zu 24 h dauern.
7. **Nachlauf.** TTLs werden wieder angehoben, sobald der Cutover stabil läuft. Der Alt-Hoster wird erst nach einer Karenzwoche gekündigt, um im Fehlerfall zurückschalten zu können.

**Offener Punkt — URL-Inventar:** Ob ein vollständiges URL-Inventar der Altseite bereits existiert, ist zum Zeitpunkt dieser Entscheidung ungeklärt und nur vom Betreiber zu beantworten. Falls kein Inventar vorliegt, wird es vor Schritt 2 durch Crawlen der archivierten Altseite (`wget --mirror`, siehe Schritt 1) erstellt. Dieser Punkt blockiert die ADR-Verabschiedung nicht, muss aber vor Umsetzung von Schritt 2 geklärt sein.

## Consequences
### Positive
- Der Ausfallrisiko-Schritt ist vollständig vorab geplant, kein Ad-hoc-Umschalten am Tag X.
- Vorhandene Google-Sichtbarkeit für alte URLs bleibt über Redirect-Stubs erhalten, statt beim Cutover verloren zu gehen.
- Die Reihenfolge TTL-Senkung → Cutover → HTTPS-Enforcement vermeidet ein Zeitfenster mit ungültigem Zertifikat.
- Die Karenzwoche vor Kündigung des Alt-Hosters erlaubt einen Rollback im Fehlerfall.

### Negative
- Meta-Refresh-Stubs sind kein SEO-Äquivalent zu echten 301-Redirects; ein gewisser Ranking-Verlust ist trotz Mapping wahrscheinlich (direkte Konsequenz aus der Hosting-Entscheidung in ADR 0002).
- Der Cutover-Ablauf hat mehrere zeitkritische, manuelle Schritte (TTL-Fenster, Propagations-Wartezeit); Fehler in der Reihenfolge (z. B. HTTPS zu früh aktivieren) führen zu sichtbaren Zertifikatsfehlern für Besucher.
- Ohne geklärtes URL-Inventar verzögert sich Schritt 2, bis der Betreiber geantwortet hat oder der Crawl-Fallback durchgeführt wurde.

### Neutral
- Die konkrete Umsetzung (Archiv-Task, Redirect-Stub-Generierung, DNS-Umstellung selbst) wird nach dieser ADR als eigene Tasks modelliert — diese ADR legt nur die Strategie und Reihenfolge fest.

## Alternatives considered
- **Harter Cutover ohne Redirect-Mapping** — einfacher, aber verbrennt bestehende Google-Treffer sofort; widerspricht dem Vision-Ziel, Sichtbarkeit für "Tauchen lernen Weilburg" zu erhalten. Verworfen.
- **301-Redirects über einen zusätzlichen Reverse-Proxy/CDN vor GitHub Pages** — würde echte serverseitige Redirects ermöglichen, führt aber einen zusätzlichen Anbieter/Baustein ein, den ADR 0002 bewusst vermeiden wollte. Nicht ausgeschlossen als spätere Option, aber für den Cutover selbst nicht notwendig.
- **HTTPS sofort mit dem Cutover aktivieren** — scheitert praktisch an der Zertifikatsausstellung während laufender DNS-Propagation; verworfen zugunsten von Schritt 6.

## References
- ADR 0002 (Hosting auf GitHub Pages) — Ursache für Meta-Refresh-Stubs statt 301-Redirects.
- Task `infrastructure-tck5g` (DNS-Cutover-Plan: Altseite → Neuseite)
