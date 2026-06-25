# Cloudflare Pages — contact form (Worker / Pages Function)

The contact form is handled by a **Pages Function** at:

`POST /api/contact`

Source file: `functions/api/contact.js`

PHP is not used on Cloudflare Pages.

---

## Environment variables and secrets

Configure in **Cloudflare Dashboard** → your Pages project → **Settings** → **Environment variables**.

### Secrets (encrypt in dashboard)

| Name | Description |
|------|-------------|
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile Secret Key |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) |

### Plain variables

| Name | Example value |
|------|----------------|
| `CONTACT_TO` | `subtextaudio@gmail.com` |
| `CONTACT_FROM` | `Subtext Audio <contact@subtextaudio.com>` (domain must be verified in Resend) |
| `RATE_LIMIT_MAX` | `5` |
| `RATE_LIMIT_WINDOW` | `600` |

Set the same values for **Production** and **Preview** environments.

---

## KV namespace (rate limiting)

1. Cloudflare Dashboard → **Workers & Pages** → **KV** → **Create**.
2. Name: `CONTACT_RATE_LIMIT`.
3. In Pages project → **Settings** → **Functions** → **KV namespace bindings**:
   - Variable name: `RATE_LIMIT`
   - KV namespace: `CONTACT_RATE_LIMIT`

---

## Deploy

### Option A — GitHub + Cloudflare Pages (recommended)

1. Push the repository to GitHub (without secrets).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select the repository.
4. Build settings:
   - **Framework preset:** None
   - **Build command:** (leave empty)
   - **Build output directory:** `/` (project root)
5. Add environment variables and KV binding (see above).
6. Deploy.

The `functions/` folder is picked up automatically. No separate Worker deploy is required.

### Option B — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
wrangler pages deploy . --project-name=subtext-audio-website
wrangler secret put TURNSTILE_SECRET_KEY
wrangler secret put RESEND_API_KEY
```

---

## Resend sender address

`CONTACT_FROM` must use a domain verified in Resend (for example `contact@subtextaudio.com`).

Do **not** use `onboarding@resend.dev` for production: Resend returns HTTP 403 when sending to addresses other than the Resend account owner.

### Verify subtextaudio.com in Resend

1. Resend Dashboard → **Domains** → **Add Domain** → `subtextaudio.com`
2. Add the DNS records Resend provides (SPF, DKIM) in Cloudflare DNS
3. Wait until the domain status is **Verified**
4. Set `CONTACT_FROM` to `Subtext Audio <contact@subtextaudio.com>` in Cloudflare Pages variables (or keep the value in `wrangler.toml`)

---

## Test after deploy

1. Open `https://your-domain/contact/` or `/ru/contact/`.
2. Complete the form and Turnstile.
3. Click submit.
4. Confirm success message and email at `subtextaudio@gmail.com`.

---

## Frontend configuration

`assets/js/form-config.js`:

- `endpoint: '/api/contact'` — same-origin Pages Function URL
- `turnstileSiteKey` — public Turnstile Site Key (already set)

No design or page copy changes are required.
