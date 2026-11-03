# ChromaMeld site — Release B draft

Independent static landing page. The editor remains at https://anthonychimming.github.io/filter-fabjs/. No application code is included.

## Build and review

Requires Node.js. `node scripts/build.mjs preview` produces a noindex, non-canonical site in `dist/`; serve that directory locally. Asset paths work under a project subpath. `node scripts/verify-site.mjs preview` checks the preview. For production, use `node scripts/build.mjs production` and `node scripts/verify-site.mjs production`. Production contains the apex canonical, social metadata, robots and a one-URL sitemap. Never publish the production build at a temporary project URL. Pages deployment is deliberately manual on main after approval and custom-domain readiness. CI checks both builds.

## Asset provenance

See [ASSET_PROVENANCE.md](ASSET_PROVENANCE.md). The former portrait social card has been removed. The supplied Night Circuit v1.1 specification and AI rules were reviewed; the standalone token CSS and UI kit were not found. The palette follows the specified canonical values. System fonts are used; no font files are redistributed.

## Domain handoff (after visual approval)

1. Create the separate public repository, push a branch, open a draft PR, check CI and approve the visual review before merging. Enable Pages with GitHub Actions. Confirm the existing editor still works.
2. In GitHub account Settings → Pages → Verified domains, start verification for `chromameld.com`. Add the exact TXT name/value GitHub supplies at the authoritative DNS provider, wait for propagation, and complete verification. Retain the record.
3. Set the new repository's Pages custom domain to `chromameld.com` before changing DNS.
4. Inspect nameservers, DNSSEC, existing apex/www records and forwarding. Record the existing configuration and TTLs. Recheck GitHub's current documentation before changing records. Preserve email and other unrelated records. Configure the documented GitHub Pages apex A records and `www` CNAME to `anthonychimming.github.io`; remove only conflicting web records/forwarding.
5. After DNS propagation and certificate issuance, enable HTTPS; check apex, www redirect, assets, metadata, sitemap and editor link. Submit the sitemap in a separately verified Search Console property. Restore recorded DNS if rollback is essential. Do not migrate the existing editor or its canonical.

References: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site and https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages
