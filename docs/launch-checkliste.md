# Launch-Checkliste: Walking Skeleton live schalten

Diese Checkliste deckt die Schritte ab, die **außerhalb** dieses lokalen
Worktrees ausgeführt werden müssen (keine GitHub-/Cloudflare-Zugänge im
Worker-Kontext verfügbar). Reihenfolge einhalten.

## 1. GitHub-Repo anlegen

1. Neues **öffentliches** Repository unter dem persönlichen Account des
   Betreibers anlegen: `hollesse/sharkey-divers.de` (Name muss zu
   `admin/config.yml` → `backend.repo` passen, sonst anpassen).
2. **Vor dem Public-Schalten:** alle Commit-Autoren-E-Mails prüfen (auch
   rückwirkend in der Git-History). Nur `@users.noreply.github.com`-Adressen
   dürfen sichtbar sein (ADR 0002).
3. Diesen Worktree-Inhalt (Repo-Root, ohne `.agentheim/`, `.worktrees/`,
   `vendor/`) als initialen Commit auf `main` pushen.

## 2. GitHub Pages aktivieren

1. Repo → Settings → Pages → **Source: GitHub Actions** (nicht "Deploy from
   a branch" — der Build läuft über `.github/workflows/deploy.yml`, ADR 0004).
2. Nach dem ersten erfolgreichen Workflow-Lauf ist die Seite erreichbar unter
   `https://hollesse.github.io/sharkey-divers.de/` (muss mit `_config.yml`
   → `url`/`baseurl` übereinstimmen).
3. Prüfen: Seite liefert `noindex`-Meta-Tag und `robots.txt` mit
   `Disallow: /` aus (bereits im Skeleton enthalten, ADR 0002/0006).

## 3. GitHub OAuth App anlegen

1. GitHub → Settings → Developer settings → OAuth Apps → **New OAuth App**.
2. Werte:
   - **Application name:** z. B. "Sharky Divers CMS"
   - **Homepage URL:** `https://hollesse.github.io/sharkey-divers.de/`
   - **Authorization callback URL:** `https://SVELTIA-AUTH-WORKER-URL/callback`
     (die tatsächliche Worker-URL aus Schritt 4 — ggf. nachträglich hier
     eintragen, sobald der Worker deployt ist).
3. **Client ID** und **Client Secret** notieren — beide werden im nächsten
   Schritt in den Cloudflare Worker eingetragen, **nicht** ins Repo.

## 4. Sveltia-CMS-Auth-Worker deployen (Cloudflare Worker)

1. Repo `sveltia-cms-auth` (github.com/sveltia/sveltia-cms-auth) als
   Cloudflare Worker deployen (`wrangler deploy` oder über das Cloudflare
   Dashboard).
2. Environment-Variablen/Secrets am Worker setzen:
   - `GITHUB_CLIENT_ID` = Client ID aus Schritt 3
   - `GITHUB_CLIENT_SECRET` = Client Secret aus Schritt 3
   - (optional `ALLOWED_DOMAINS`, siehe sveltia-cms-auth-Doku, um den Worker
     auf die eigene Admin-URL einzuschränken)
3. Nach dem Deploy liefert Cloudflare eine Worker-URL, z. B.
   `https://sharkey-divers-cms-auth.<account>.workers.dev`.
4. Diese Worker-URL an zwei Stellen eintragen:
   - Hier in dieser Checkliste als Referenz.
   - In `admin/config.yml` → `backend.base_url` (ersetzt den Platzhalter
     `https://SVELTIA-AUTH-WORKER-URL.example`).
   - Als Authorization-Callback-URL zurück in die GitHub OAuth App (Schritt 3).

## 5. Redakteure als Collaborators einladen

1. Repo → Settings → Collaborators → Redakteure per GitHub-Benutzername
   einladen (setzt voraus: Redakteure haben bereits einen persönlichen
   GitHub-Account mit 2FA, siehe ADR 0003 / Task infrastructure-h937s).

## 6. Erster Login-Test unter `/admin/`

1. `https://hollesse.github.io/sharkey-divers.de/admin/` aufrufen.
2. "Mit GitHub anmelden" klicken → Redirect über den Worker → zurück ins CMS.
3. Test-Bericht mit Bild anlegen und speichern (committet direkt auf `main`,
   kein Editorial Workflow in v1, ADR 0003).
4. Prüfen: GitHub-Actions-Workflow "Deploy" läuft automatisch an, Seite zeigt
   nach ca. 1–2 Minuten den neuen Bericht.
5. Prüfen: Hochgeladenes Bild landet in `assets/uploads/<datum-slug>/` und
   ist als WebP mit max. 1600 px Kantenlänge abgelegt (ADR 0005).

## 7. Danach

- DNS-Cutover ist **nicht** Teil dieser Checkliste — eigener Task/ADR 0006.
- Impressum/Datenschutz vor jedem öffentlichen (nicht-Preview-)Auftritt mit
  echten Daten befüllen (siehe TODO-Marker in `impressum.md`/`datenschutz.md`).
