# Deployment guide: from your computer to a live site

Follow the parts in order. Parts 1 and 2 put the code on GitHub, part 3 puts it
on Netlify, part 4 lists every setting with where its value comes from.

---------------------------------------------------------------------------

## Part 1. Get the project ready (once)

Install Node.js 20+ (nodejs.org, LTS) and Git (git-scm.com), then in PowerShell:

    node -v
    git --version
    git config --global user.name "Your Name"
    git config --global user.email "your-github-email@example.com"

Unzip the project, open PowerShell in the folder that contains `package.json`:

    npm install
    copy .env.example .env.local
    npm run build

Fill `.env.local` with test values if you want to try the contact form locally
(see Part 4). `.env.local` is never uploaded, because `.gitignore` excludes it.
If `npm run build` succeeds, Netlify's build will too.

## Part 2. Push to GitHub

1. github.com/new: create a repository (for example `gowra-studio`). Leave
   README, .gitignore and license **unticked** so it starts empty.
2. In the project folder:

       git init
       git add .
       git status

   Read the list. It must NOT contain `.env`, `.env.local`, `node_modules` or
   `.next`. (`.env.example` is expected; it holds no secrets.)

       git commit -m "Gowra Studio website"
       git branch -M main
       git remote add origin https://github.com/YOUR-USERNAME/gowra-studio.git
       git push -u origin main

   A browser window asks you to sign in to GitHub the first time.

## Part 3. Deploy on Netlify

1. app.netlify.com, **Add new site**, **Import an existing project**, choose
   **GitHub**, authorise it, select your repository.
2. Netlify detects Next.js. The included `netlify.toml` already sets the build
   command (`npm run build`) and Node 20. Do not change them.
3. **Before the first deploy**, open **Site configuration, Environment
   variables** and add the variables from Part 4 (at minimum the three marked
   REQUIRED). Then deploy.
4. In the deploy log, look for the line `[seo] site URL:`. It must show your
   real address. If it says localhost, `NEXT_PUBLIC_SITE_URL` is missing:
   add it and use **Deploys, Trigger deploy**.
5. Environment variables are read at build time. After ANY change to a
   variable, trigger a new deploy or the change will not appear.
6. Custom domain: **Domain management, Add a domain**, then follow Netlify's
   DNS instructions. Afterwards set `NEXT_PUBLIC_SITE_URL` to the final
   address and redeploy.

Later updates: `git add .`, `git commit -m "what changed"`, `git push`.
Netlify rebuilds automatically.

---------------------------------------------------------------------------

## Part 4. Every environment variable: what it is and where to get it

Enter these in Netlify under Site configuration, Environment variables, one
variable at a time, value only (no quotes, no comments, no spaces).

### REQUIRED

| Variable | What to enter | Where it comes from |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your live address, e.g. `https://yourdomain.com` (no trailing slash). Before you have a domain, use the `https://something.netlify.app` address Netlify gives you after the first deploy, then redeploy | You choose it. Netlify shows the free address on the site overview |
| `RESEND_API_KEY` | A key that starts with `re_` | resend.com: sign up, **API Keys**, **Create API Key** (sending access). It is shown once, so copy it immediately |
| `LEAD_TO_EMAIL` | The inbox that should receive demo requests | Your own email. With Resend's default sender it should be the same address you signed up to Resend with. Several addresses can be separated by commas |

### RECOMMENDED for search (see Part 6)

| Variable | What to enter | Where it comes from |
|---|---|---|
| `NEXT_PUBLIC_SERVICE_AREA` | Your town or city, short, e.g. `Guntur` | You choose it. Appears in the page title and the search-engine data. Leave empty if you serve clients anywhere. Public |

### OPTIONAL: lead delivery extras

| Variable | What to enter | Where it comes from |
|---|---|---|
| `LEAD_WEBHOOK_URL` | A webhook URL | **Discord:** Server settings, Integrations, Webhooks, New Webhook, Copy URL. **Slack:** api.slack.com/apps, create an app, enable Incoming Webhooks, Add New Webhook. Gives you an instant phone alert as a backup to email. Secret: never share it |
| `LEAD_FROM_EMAIL` | `Gowra Studio <hello@yourdomain.com>` | Only after you verify your own domain in Resend (Resend, Domains, add the DNS records it shows). Leave empty to use Resend's shared test sender |

### OPTIONAL: public contact buttons (anyone can read these)

| Variable | What to enter | Notes |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Digits with country code, e.g. `919642027908` | Shows a floating WhatsApp button. Empty means no button |
| `NEXT_PUBLIC_CONTACT_EMAIL` | The public address visitors can use | Shows an "Email us" link. Empty means none |
| `NEXT_PUBLIC_COMPANY_NAME` | Only if you want a name other than "Gowra Studio" | Empty uses the default |

### LATER: only after the site is live

| Variable | What to enter | Where it comes from |
|---|---|---|
| `GOOGLE_SITE_VERIFICATION` | Only the text inside `content="..."` | Google Search Console, HTML tag method. Not needed if you upload Google's HTML file to `public/` instead |
| `BING_SITE_VERIFICATION` | Only the `content` value | Bing Webmaster Tools, meta tag method |

Secrets (never share, never commit, never screenshot): `RESEND_API_KEY`,
`LEAD_WEBHOOK_URL`. Everything starting with `NEXT_PUBLIC_` is public by design.
If a secret is ever exposed, delete it at its provider and create a new one.

---------------------------------------------------------------------------

## Part 5. Test the live site

- Homepage opens and clicks feel quick.
- Submit the contact form with your own details. The email must arrive
  (check spam once, and mark it "not spam"). If it fails, Netlify, Logs,
  Functions shows a line starting `[lead]` that says why (401 wrong key,
  403 wrong recipient address).
- The WhatsApp button opens a chat to the right number (test on a phone).
- Open `/sitemap.xml`, `/robots.txt`, `/llms.txt` and
  `/website-design-and-development`. Every address must be your real domain,
  not localhost. View source on the homepage and confirm the title and canonical.
- The "Also live on the web" buttons (Goal4u, ZiloPlay, GitHub, LinkedIn) open.

---------------------------------------------------------------------------

## Part 6. Search engines: getting found for "website design" and "developer"

What the site now does for search: the homepage title and description say
"Website Designer & Developer" in the words people search; structured data
describes the studio and its six services (and your area, if you set it); a
dedicated page, `/website-design-and-development`, explains the services with
questions and answers; and `sitemap.xml` and `llms.txt` list everything.

**Honest expectations.** This makes the site easy to find and understand. It
cannot guarantee a ranking. "Website designer" is a crowded search, a new site
starts with no trust, and indexing takes days to weeks. Searches that include a
place ("website developer in Guntur") are much easier to win, which is why
`NEXT_PUBLIC_SERVICE_AREA` matters. Do these next, they matter more than code:

1. **Register with Google** (below) and submit the sitemap.
2. **Create a free Google Business Profile** for the studio. It is the biggest
   lever for local searches.
3. **Get links to the site:** put the address on your GitHub profile, LinkedIn,
   portfolio and any directories you are on, and ask real clients to link to it.
4. **Keep adding useful pages and real work.** Only real testimonials; never
   fabricated ones.

### Google Search Console (after the site is live)
1. search.google.com/search-console, **Add property, URL prefix**, enter your exact address.
2. Verification, **HTML tag**: copy only the `content` value into
   `GOOGLE_SITE_VERIFICATION` in Netlify, trigger a deploy, then click Verify.
   (Alternative: download Google's HTML file, put it in `public/`, push, open its
   address in a browser to confirm, then Verify. Never delete that file.)
3. **Sitemaps**: enter `sitemap.xml`, Submit. It should show Success.
4. **URL Inspection**: paste the homepage and the services page, **Request indexing**.

### Bing Webmaster Tools
bing.com/webmasters: import from Google Search Console (fastest), or add the
site and verify with the meta tag in `BING_SITE_VERIFICATION`. Submit `sitemap.xml`.

---------------------------------------------------------------------------

## Troubleshooting

| Symptom | Fix |
|---|---|
| Canonical, sitemap or robots show localhost | `NEXT_PUBLIC_SITE_URL` missing or wrong; fix and redeploy |
| Form says it could not send | Missing `RESEND_API_KEY` or `LEAD_TO_EMAIL`; check the `[lead]` log line |
| Email never arrives | Check spam; `LEAD_TO_EMAIL` should be your Resend signup email until you verify a domain |
| A variable change has no effect | Variables apply at build time: trigger a new deploy |
| `git push` rejected | The GitHub repo was not empty; recreate it empty |
| Build fails with "has no exported member" or a file you do not recognise | A leftover file from an older version is still in your repo. v27 deletes the known one automatically during build. To be safe, replace the whole `src` folder with the one from the zip (keep `.git`), then commit and push |
| Build fails with "Secrets scanning found secrets" | Public values (`NEXT_PUBLIC_*`) are listed in `netlify.toml` as safe under `SECRETS_SCAN_OMIT_KEYS`. If you add another public variable, add its name there too. Never do this for `RESEND_API_KEY` |
| Build fails on Netlify | Open the deploy log and send me the last 30 lines (without any keys) |
