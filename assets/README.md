# TradeLearn — Static site (placeholder)

This repo contains a small static website scaffold for a trading & education site,
ready for GitHub Pages. It includes a Calendly booking embed placeholder and a
Tawk.to chat placeholder. It also contains example webhook code (Netlify/Cloudflare)
to forward Calendly webhook events to Telegram.

IMPORTANT: replace all placeholders (Calendly URL, Tawk.to property ID, and Telegram tokens)
with your real values. Do not post tokens publicly.

## Quick steps to add files using GitHub web UI (tablet-friendly)
1. Open your repository on github.com.
2. Click "Add file" → "Create new file".
3. For the filename, enter the path exactly (for example `index.html` or `assets/style.css`).
4. Paste the corresponding file contents from this message.
5. Commit the new file directly to the default branch.
6. Repeat for all files.

## How to push locally (desktop/later)
Option A — if you can use a desktop later:
```bash
git clone git@github.com:gshoury68-beep/gshoury68-beep.git
cd gshoury68-beep
# copy files into the repo root, then:
git add .
git commit -m "Add initial TradeLearn static site"
git push origin main
```

## GitHub Pages
1. Go to your repository on GitHub → Settings → Pages.
2. Choose the default branch (e.g., main) and root `/` as the source and save.
3. GitHub Pages will publish at `https://<your-username>.github.io/<repo>/` (or `https://<your-username>.github.io/` if the repo name is `<your-username>.github.io`).

## Calendly embed
Replace the Calendly link in `index.html` with your scheduling link:
`https://calendly.com/YOUR_CALENDLY_USERNAME/30min`
Calendly can send webhooks on new event scheduling; use Zapier/Make or the included webhook code.

## Telegram notifications (two options)
Option 1 — No code: Use Zapier or Make
- Create a Telegram Bot via @BotFather and get token.
- Create a Zap: Trigger = Calendly "Invitee Created" (or New Event) → Action = Webhooks/Custom Request to Telegram API OR use a Telegram integration app.

Option 2 — Self-hosted webhook (Netlify or Cloudflare)
- Deploy the `functions/netlify/notifyTelegram.js` as a Netlify Function (or `functions/cloudflare/worker.js` to Cloudflare Workers).
- Configure environment variables/secrets:
  - TELEGRAM_BOT_TOKEN (the Bot token)
  - TELEGRAM_CHAT_ID (the chat or user ID to send the message to)
- Configure Calendly webhook to POST to the deployed webhook endpoint.

## Tawk.to live chat
1. Create a free account at https://tawk.to.
2. Add a site and get the property script id.
3. Replace TAWK_PROPERTY_ID in `index.html` with your property id.

## Serverless examples included
- `functions/netlify/notifyTelegram.js` — Netlify Function (Node) example
- `functions/cloudflare/worker.js` — Cloudflare Worker example

## Security
- Never commit your Telegram bot token or any API tokens to the repository. Use environment variables or platform secrets.
- If you use Netlify/Cloudflare, set secrets via their UI.

MD
