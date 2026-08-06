/*
Cloudflare Worker example to forward Calendly webhook events to Telegram.
Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID as environment variables (Wrangler secrets).

This file is a Worker script (JS). Deploy with Wrangler or via Cloudflare dashboard.
*/
addEventListener('fetch', event => {
  event.respondWith(handle(event.request));
});

async function handle(request) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const payload = await request.json().catch(()=>({}));
  const invitee = payload?.payload?.invitee || {};
  const eventName = payload?.payload?.event?.name || 'Webinar';
  const startTime = payload?.payload?.event?.start_time || 'unknown time';
  const inviteeName = invitee?.name || invitee?.email || 'New attendee';
  const msg = `📅 ${eventName}\n🕒 ${startTime}\n👤 ${inviteeName}`;

  const botToken = TELEGRAM_BOT_TOKEN; // set via Wrangler secrets
  const chatId = TELEGRAM_CHAT_ID;     // set via Wrangler secrets
  if (!botToken || !chatId) {
    return new Response('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID', { status: 500 });
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ chat_id: chatId, text: msg })
  });

  return new Response('OK', { status: 200 });
}
