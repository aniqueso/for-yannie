const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const VIEW_TOKEN = process.env.YANNIE_LIVE_VIEW_TOKEN;

function send(res, status, body) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function sanitize(row) {
  if (!row) return null;

  const item = {
    device: row.device,
    sharing: row.sharing !== false,
    updated_at: row.updated_at
  };

  if (row.sharing === false) return item;

  if (row.share_activity !== false) {
    item.activity = row.activity;
    item.category = row.category;
    item.detail = row.detail;
  }

  if (row.share_battery !== false) {
    item.battery = row.battery;
    item.charging = row.charging;
  }

  if (row.share_location !== false) {
    item.location_label = row.location_label;
  }

  return item;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') return send(res, 405, { error: 'GET only' });

  if (!SUPABASE_URL || !SERVICE_KEY || !VIEW_TOKEN) {
    return send(res, 500, { error: 'Server environment variables are missing.' });
  }

  const token = req.headers['x-view-token'];
  if (!token || token !== VIEW_TOKEN) {
    return send(res, 401, { error: 'Unauthorized' });
  }

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/live_devices?select=device,activity,category,detail,battery,charging,location_label,sharing,share_activity,share_battery,share_location,updated_at&order=updated_at.desc`,
      {
        headers: {
          apikey: SERVICE_KEY,
          Authorization: `Bearer ${SERVICE_KEY}`
        },
        cache: 'no-store'
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      return send(res, 502, { error: 'Supabase read failed', detail });
    }

    const raw = await response.json();
    const devices = raw.map(sanitize).filter(Boolean);
    const active = devices.find((device) => device.sharing !== false) || null;

    return send(res, 200, {
      devices,
      active,
      server_time: new Date().toISOString()
    });
  } catch (error) {
    return send(res, 500, { error: 'Read failed', detail: error.message });
  }
};
