const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const UPDATE_TOKEN = process.env.YANNIE_LIVE_UPDATE_TOKEN;

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function cleanText(value, maxLength) {
  if (value === undefined || value === null) return undefined;
  const text = String(value).trim().slice(0, maxLength);
  return text || null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'POST only' });

  if (!SUPABASE_URL || !SERVICE_KEY || !UPDATE_TOKEN) {
    return send(res, 500, { error: 'Server environment variables are missing.' });
  }

  const token = req.headers['x-live-token'];
  if (!token || token !== UPDATE_TOKEN) {
    return send(res, 401, { error: 'Unauthorized' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const device = body.device === 'iphone' ? 'iphone' : body.device === 'laptop' ? 'laptop' : null;
    if (!device) return send(res, 400, { error: 'device must be laptop or iphone' });

    const payload = {
      device,
      updated_at: new Date().toISOString()
    };

    const fields = {
      activity: cleanText(body.activity, 80),
      category: cleanText(body.category, 30),
      detail: cleanText(body.detail, 140),
      location_label: cleanText(body.location_label, 50)
    };

    for (const [key, value] of Object.entries(fields)) {
      if (value !== undefined) payload[key] = value;
    }

    if (body.battery !== undefined && body.battery !== null) {
      const battery = Number(body.battery);
      if (Number.isFinite(battery)) payload.battery = Math.max(0, Math.min(100, Math.round(battery)));
    }

    for (const key of ['charging', 'sharing', 'share_activity', 'share_battery', 'share_location']) {
      if (body[key] !== undefined) payload[key] = Boolean(body[key]);
    }

    const response = await fetch(`${SUPABASE_URL}/rest/v1/live_devices?on_conflict=device`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_KEY,
        Authorization: `Bearer ${SERVICE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const detail = await response.text();
      return send(res, 502, { error: 'Supabase update failed', detail });
    }

    return send(res, 200, { ok: true, device, updated_at: payload.updated_at });
  } catch (error) {
    return send(res, 500, { error: 'Update failed', detail: error.message });
  }
};
