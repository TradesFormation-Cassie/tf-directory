# TradesFormation Tool Directory — Setup

## 1. Create the Supabase project (~5 min)
1. Go to supabase.com → New project (free tier is plenty).
2. Once it's created, open **SQL Editor** → New query.
3. Paste in the entire contents of `supabase-setup.sql` and click **Run**.
   This creates the `resources` table, locks it down, creates the three
   password-checked God Mode functions, and seeds it with the three example
   tools from your mockup so you can see it working immediately.
4. Go to **Project Settings → API**. Copy the **Project URL** and the
   **anon / public** key (NOT the service_role key — never put that in a
   browser-facing file).

## 2. Connect the site to Supabase
Open `app.js` and fill in the top two lines:
```js
const SUPABASE_URL = "https://xxxxxxxx.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOi....";
```
That anon key is meant to be public and safe to ship in your JS — it can
only ever read the table, or call the three God Mode functions (which then
check the password themselves before writing anything).

## 3. Try it locally
Open `index.html` directly in a browser (or run a tiny local server, e.g.
`npx serve` from inside this folder) and confirm you see the three seeded
tools, that search works, and that God Mode → Add a Resource works with
`SAINTCONFETTI` or `SaintConfetti`.

## 4. Deploy to Netlify
Easiest path since you haven't set Netlify up yet:
1. Go to app.netlify.com → **Add new site → Deploy manually**.
2. Drag this whole folder (`index.html`, `styles.css`, `app.js`) into the
   drop zone. That's it — no build step, no config needed.
3. Netlify gives you a live URL immediately. You can add a custom domain
   later from the site's **Domain settings**.

If you'd rather connect a GitHub repo instead of drag-and-drop (so updates
to the *design* redeploy automatically when you push), that works too —
push these three files to a repo and connect it in Netlify's "Import from
Git" flow. Either way, resources themselves are added through God Mode, not
through redeploys — that part never touches your hosting or your repo.

## Changing the password later
Open `supabase-setup.sql`, find the three `if p_password not in (...)`
lines, change the values, and re-run just those three `create or replace
function` blocks in the SQL Editor. Takes effect immediately, no
redeploy needed.

## What "God Mode" actually protects
The password check happens **inside the Supabase database function**, not
in the site's JavaScript. That means someone reading your site's source
code can see *that* a function exists, but calling it without the right
password just gets rejected by the database — they can't insert, edit, or
delete anything. This is meaningfully better than a password only checked
in the browser, while still being simple enough for you and a collaborator
to use casually.
