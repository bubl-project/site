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

Also update `src/config.ts`:

- `stores.ios.url` — real App Store listing URL
- `stores.android.url` — real Play Store listing URL
- `deepLink` — the Universal Link URL the app claims (must match an `applinks.details.paths` entry)

The Bubl app itself must declare:

- iOS: Associated Domain `applinks:app.debubl.com`
- Android: intent-filter with `android:host="app.debubl.com"` and `android:autoVerify="true"`

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
