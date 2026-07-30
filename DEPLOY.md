# Deploying to cPanel

The live site is **static files on the client's cPanel host**, not Vercel.
The Vercel project (`architeture-firm.vercel.app`) still builds on push and is
useful as a staging preview, but the custom domain does not point at it.

| | |
| --- | --- |
| Live URL | https://www.srripositivebuilders.com |
| Host | A2 Hosting (cPanel), LiteSpeed, IP `103.227.176.20` |
| Document root | `/home/srripositivebuil/public_html` |
| Registrar | PDR / PublicDomainRegistry, DNS at `*.orderbox-dns.com` |

DNS already resolves to the cPanel box, so **deploying never involves the
registrar**. It is purely a file upload. Do not switch nameservers to Vercel —
the domain's email runs on Google Workspace (`aspmx.l.google.com`), and moving
DNS away without recreating the MX records would take the client's mail down.

## Routine redeploy

```bash
npm run build   # → out/
npm run zip     # → site.zip
```

Then in **cPanel → File Manager → `public_html`**:

1. **Upload** `site.zip` — tick **Overwrite existing files**.
2. Select it → **Extract** into `public_html`.
3. **Delete `site.zip`** from the server when done. It is a ~110 MB archive
   sitting in a public web root otherwise.
4. Hard-refresh the live site (Ctrl+F5) or use an incognito window — HTML is
   sent `no-cache` but the browser may still hold the old page.

Turn on **Settings → Show Hidden Files** in File Manager so `.htaccess` is
visible. It must be present in `public_html` after every deploy or the site
loses HTTPS, the apex→www redirect, and all legacy URL redirects.

## Faster redeploys for small changes

A full redeploy re-uploads ~110 MB, and 57 MB of that is the four `.mp4`
files that essentially never change. For a copy tweak or a styling fix, use
FTP instead (FileZilla; credentials from **cPanel → FTP Accounts**) and upload
only:

```
out/index.html
out/projects/
out/_next/
out/.htaccess
```

**Always upload `index.html` and `_next/` together.** The HTML references
content-hashed chunk filenames, so new HTML against a stale `_next/` gives a
blank page with 404s in the console.

## Occasional housekeeping

Extracting over the top updates and adds files but never removes ones the new
build no longer produces. `_next/static/chunks/` accumulates orphaned hashed
bundles over many deploys — harmless, but it grows.

Every several deploys, delete everything in `public_html` first, then upload
and extract into the empty folder.

## Before overwriting, back up

Select All → **Compress** → **Zip Archive** → **Download** it locally, and
confirm the archive actually contains `.htaccess` before deleting anything.
Restoring is just: empty `public_html`, upload the backup, extract.

## Gotchas that have already bitten this project

- **Reserved Windows filenames.** Never name an asset `com1.png`, `con.*`,
  `aux.*`, `prn.*`, `nul.*`, or `lpt1.*`. Windows treats those as devices, so
  Git cannot open them (`No such file or directory` on a file that visibly
  exists) even though the browser serves them fine in dev.
- **`trailingSlash: true` is load-bearing.** It makes the export write
  `<route>/index.html`, which LiteSpeed resolves natively. Without it the
  export emits both `projects.html` and a `projects/` directory, and a request
  for `/projects` hits the directory, finds no index, and 403s.
- **`images.unoptimized: true` is required.** `next/image` otherwise needs the
  Next server to resize on demand, which static hosting cannot do.
- **Leave cPanel's Force HTTPS Redirect toggle Off.** `.htaccess` already
  handles HTTPS and apex→www; enabling both creates competing rules.

## Legacy redirects

`public/.htaccess` 301s the old site's URLs (`commercial-projects.html`,
`about-us.html`, …) to their new equivalents. Those pages were indexed for
years, so the redirects protect the domain's search ranking. If routes are
ever renamed, update that map to match.
