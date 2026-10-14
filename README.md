# Bubl landing — app.debubl.com

Static Astro site whose sole purpose is to route visitors to the App Store or Play Store, and — if the app is installed — open it directly via Universal Links / App Links.

## Stack

- Astro 4 (static output)
- Tailwind CSS
- Deployed to GitHub Pages with custom domain `app.debubl.com`

## Develop

```bash
npm install
npm run dev       # http://localhost:4321
npm run build
npm run preview
```

## Deep linking

Self-hosted association files live in `public/.well-known/`:

- `apple-app-site-association` (no extension, JSON body)
- `assetlinks.json`

Before these work in production you must fill in the placeholders:

- `apple-app-site-association` → replace `TEAMID.com.debubl.app` with your real `<AppleTeamID>.<iOSBundleID>`
- `assetlinks.json` → replace `com.debubl.app` and the SHA256 fingerprint with your Android package name and release signing cert fingerprint

Also update `src/config.ts`, which has one entry per app under `apps` (`customer` → `/`, `runner` → `/lavaderos`):

- `ios.url` / `ios.appId` — App Store listing URL and id (the id feeds the Smart App Banner)
- `android.url` / `android.packageName` — Play Store listing URL and package
- `deepLink` — the App Link URL the app claims (must match an `applinks.details.paths` entry and the Android intent-filter)

The Bubl app itself must declare:

- iOS: Associated Domain `applinks:app.debubl.com`
- Android: intent-filter with `android:host="app.debubl.com"` and `android:autoVerify="true"`

### TV pairing link (`/runner/panel/vincular`)

The QR on a shop TV encodes `https://app.debubl.com/runner/panel/vincular?c=<6-digit code>`. The runner app claims it through `/runner/panel/*` in `apple-app-site-association` (iOS) and `android:pathPrefix="/runner/panel"` in its own AndroidManifest (Android). Deploy the AASA change before the runner build that handles the link: Apple's CDN caches the file and can take a while to pick up a new path. When it opens in a browser instead, `src/pages/runner/panel/vincular.astro` shows the runner's store badges and the code, read client-side from `?c=` and never sent anywhere. The page is `noindex, nofollow` and `no-referrer`. The site loads no analytics today; any added later must skip this page or drop the query, since the code pairs the TV with whichever lavadero enters it.

## Verify association files after deploy

```bash
curl -I https://app.debubl.com/.well-known/apple-app-site-association
curl https://app.debubl.com/.well-known/assetlinks.json | jq
```

Apple validator: `https://app-site-association.cdn-apple.com/a/v1/app.debubl.com`

Google validator:
`https://digitalassetlinks.googleapis.com/v1/statements:list?source.web.site=https://app.debubl.com&relation=delegate_permission/common.handle_all_urls`

## Deploy

Pushes to `main` that touch `site/**` trigger `.github/workflows/deploy.yml`, which builds Astro and publishes `dist/` to GitHub Pages. The `public/CNAME` file pins the custom domain.

First-time setup in GitHub repo:

1. Settings → Pages → Source: **GitHub Actions**
2. Settings → Pages → Custom domain: `app.debubl.com` (Enforce HTTPS)
3. DNS: `CNAME app.debubl.com → <user>.github.io`
