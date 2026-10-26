# Deployment

How sigilint.com and the demo apps are hosted, and how to change them. Set up on 2026-10-25.

## Overview

Each app is its own GitHub repo in the [Sigilint org](https://github.com/sigilint) and its own Netlify site. Every site deploys automatically when its repo's `main` branch changes. All repos are **private**. Every site is a static site, and only the dashboard toolkit has a build step.

| Site | URL | Repo | Netlify site | Build | Publish dir |
|---|---|---|---|---|---|
| Website | https://sigilint.com | `Sigilint/sigilint-web` | `sigilint` | none | `.` |
| Well monitor (HackFW demo) | https://wellmonitor.sigilint.com | `fijiaaron/well-monitor` ⚠ | `sigilint-well-monitor` | none | `.` |
| Well site monitor | https://wellsite.sigilint.com | `Sigilint/well-site-monitor` | `sigilint-well-site-monitor` | none | `.` |
| Offshore platform monitor | https://platform.sigilint.com | `Sigilint/offshore-platform-monitor` | `sigilint-offshore-platform-monitor` | none | `.` |
| Tarrant Well Explorer | https://wells.sigilint.com | `Sigilint/tarrant-map` | `sigilint-tarrant-map` | none | `dist` |
| Dashboard toolkit examples | https://toolkit.sigilint.com | `Sigilint/dashboard-toolkit` | `sigilint-dashboard-toolkit` | `npm ci && npm run build` (Node 24) | `dist/examples` |

Each site also answers at `<netlify site>.netlify.app`. Devpost links to `sigilint-well-monitor.netlify.app`, so keep that site name.

⚠ The well monitor site still builds from the old personal repo. An attempt to relink it to `Sigilint/well-monitor` was blocked, and it is still to do (see [Relinking a site](#relinking-a-site-to-a-different-repo)). The two repos differ only by `netlify.toml`.

`Sigilint/texas-rrc-wells` (RRC data research and scripts) is not deployed.

Each repo's `netlify.toml` holds its build settings, so the Netlify dashboard settings can stay empty.

## Accounts and access

- **GitHub:** the `Sigilint` organization, where `fijiaaron` is an admin.
- **Netlify:** the team *Aaron Evans's team* (slug `fijiaaron`, Pro plan). All six sites live there.
- **Netlify ↔ GitHub:** the Netlify GitHub app is installed on the Sigilint org with access to all repositories. Without it, Netlify can't see the private repos.
- **DNS:** sigilint.com uses Netlify DNS (nameservers `dns1–4.p08.nsone.net`), so it is managed in Netlify under Domains, not at the registrar. Adding a custom domain to a site creates its DNS record and Let's Encrypt certificate automatically.

## The website (sigilint.com)

- **Replaced:** the old one-pager from `fijiaaron/sigilint-www`. That repo is untouched but no longer deployed. Its last deploy is still in the Netlify deploy history, so it can be republished from Deploys if the new site ever needs rolling back.
- **Redirects** in `netlify.toml` keep the old site's URLs working:
  - `/hacks/*` → `/hacks.html`
  - `/well-monitor-demo/*` → `https://wellmonitor.sigilint.com/`
  - The design source files in the repo (`Sigilint website.zip`, `Sigilint - design`) and this file return 404, so they are not served. The rules use URL-encoded paths (`%20`); literal spaces don't match.
- **Pretty URLs** are on, so `/hacks` serves `hacks.html`. `shared.js` highlights the current nav item for both forms of URL.
- **Contact form:** `contact.html` posts to Netlify Forms as the form named `contact`. Form detection is enabled on the site, and each submission is emailed to aarone@one-shore.com through a `submission_created` notification. Submissions are also listed in Netlify under Forms. The page only shows success when Netlify accepts the post; otherwise it shows an error with the contact address.
- **Demo links:** the list at the top of `hacks.html` (`#demos`), the POC-03 buttons on the same page, and `hackathons.html` all link to the subdomains above. If a URL changes, update all three and the `/well-monitor-demo/` redirect.

## Common tasks

### Deploying a change

Push to `main` on the app's repo. Netlify builds it and publishes it within a minute or so. Deploys can be followed in the Netlify dashboard, or with `npx netlify-cli api listSiteDeploys --data '{"site_id":"<id>"}'`.

### Previewing before going live

Run this from the repo: `npx netlify-cli deploy --site <site name or id> --dir <publish dir>`. Without `--prod` it creates a draft deploy at a unique `https://<deploy id>--<site>.netlify.app` URL and leaves production alone. For the toolkit, run `npm run build` first and use `--dir dist/examples`.

Before relying on a form or a redirect rule, check it on a draft deploy.

### Adding a new demo

1. Create the repo in the Sigilint org and add a `netlify.toml` (copy one from the table above).
2. Create the site in the `fijiaaron` team, connected to the repo through the Sigilint GitHub app installation. Use the dashboard's *Add new site → Import from Git*, or the API's `createSiteInTeam` with a `repo` block (`provider: github`, `repo: Sigilint/<name>`, `branch: main`, the org's `installation_id`).
3. Set the site's custom domain to `<name>.sigilint.com`. The DNS record and certificate follow automatically, usually within a few minutes.
4. Link it from `hacks.html#demos` on the website.

### Relinking a site to a different repo

Netlify → the site → Site configuration → Build & deploy → Continuous deployment → *Manage repository* → *Link to a different repository*. For example, this moves `sigilint-well-monitor` to `Sigilint/well-monitor`.

## Notes and caveats

- **Demo data:** the monitors run on simulated data, and the Tarrant map uses a static RRC snapshot (2026-10-21) in `dist/wells.json`. The well site monitor shows a real public RRC well record and deliberately does not name the operator.
- **Toolkit live-service example:** it needs `npm run mock-server`, which a static host can't run. On toolkit.sigilint.com it shows a source error and no data, which is expected.
- **Tarrant map external services:** the map uses OpenStreetMap tiles and the public Nominatim geocoder. Both have usage policies that limit heavy traffic; see `tarrant-map/README.md` before promoting it widely.
- **Working copies:** these repos are copies of the working repos in `yurtstream/sigilint/`. Pull new work in (`git pull <working repo path> main`) before pushing, or work in these copies directly.
