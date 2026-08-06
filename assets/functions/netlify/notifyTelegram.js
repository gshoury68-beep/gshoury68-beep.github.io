/*
Netlify function example: receives Calendly webhook POSTs and forwards a simple message to Telegram.

Environment variables required:
- TELEGRAM_BOT_TOKEN
- TELEGRAM_CHAT_ID

Deploy to Netlify: place this file in a folder named `functions/` in your repo root and enable Netlify Functions.
*/
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const payload = JSON.parse(event.body || '{}');

  // Basic message formatting — customize as needed
  const invitee = payload?.payload?.invitee || {};
  const eventName = payload?.payload?.event?.name || 'Webinar';
  const startTime = payload?.payload?.event?.start_time || 'unknown time';
  const inviteeName = invitee?.name || invitee?.email || 'New attendee';
  const msg = `📅 ${eventName}\n🕒 ${startTime}\n👤 ${inviteeName}`;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    return { statusCode: 500, body: 'Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID' };
  }

  const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
  await fetch(telegramUrl, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ chat_id: chatId, text: msg })
  });

  return { statusCode: 200, body: 'OK' };
};
