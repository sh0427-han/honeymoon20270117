# Cloudflare Pages + Access deployment

This repository is private. The production honeymoon site should be deployed through Cloudflare Pages and protected by Cloudflare Access so that only the two approved email addresses can open it.

## Pages project

- Source: GitHub
- Repository: `sh0427-han/honeymoon20270117`
- Production branch: `main`
- Framework preset: None
- Build command: `exit 0` (or leave blank)
- Build output directory: `.` because the deployable `index.html` and assets live at repository root
- Root directory: repository root

After the first deploy, Cloudflare creates a `<project>.pages.dev` hostname.

## Access protection

Protect both the production `*.pages.dev` hostname and preview deployments before uploading any booking documents.

Recommended authentication:

- Identity provider: One-time PIN
- Application type: Self-hosted/private web application
- Policy action: Allow
- Include selector: Email
- Values: enter only the two approved email addresses in the Cloudflare dashboard
- Do not use `Everyone`
- Do not use a policy that allows every valid OTP email

Suggested session duration: 30 days for convenient travel use. Reduce it if preferred.

Cloudflare Pages has a project-level **Enable access policy** setting. Verify that protection exists for both:

1. `<project>.pages.dev`
2. `*.<project>.pages.dev` preview deployments

If a custom domain is added later, create an Access application/policy for that hostname as well.

## Booking documents

Do not add booking PDFs, QR codes, e-tickets, vouchers, or similar files until Access protection has been tested in a private/incognito browser where an unapproved email cannot enter.

Once Access is verified, booking documents can be linked through `booking-data.js` using `confirmationUrl`.

Even with Access enabled, never store:

- passport scans
- payment-card data or CVV
- passwords
- highly sensitive identity documents

## Repository privacy controls

The repository should remain Private.

The root `_headers` file adds `X-Robots-Tag: noindex, nofollow, noarchive` plus conservative browser headers. `robots.txt` also disallows crawling. These are defense-in-depth only; Cloudflare Access is the actual access-control boundary.

## Verification checklist

- [ ] Pages deploy succeeds from `main`
- [ ] Production `pages.dev` URL loads only after Access authentication
- [ ] Unapproved email does not receive usable access
- [ ] Approved email #1 can sign in with OTP
- [ ] Approved email #2 can sign in with OTP
- [ ] Preview deployment hostname is also protected
- [ ] Google Maps links still open correctly after login
- [ ] Only after the checks above: add booking confirmation documents
