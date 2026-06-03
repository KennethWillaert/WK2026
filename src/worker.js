const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });
}

function err(msg, status = 400) {
  return json({ error: msg }, status);
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // GET /api/players
    if (path === '/api/players' && request.method === 'GET') {
      const rows = await env.DB.prepare('SELECT name FROM players ORDER BY created_at').all();
      return json(rows.results.map(r => r.name));
    }

    // POST /api/players  { name }
    if (path === '/api/players' && request.method === 'POST') {
      const { name } = await request.json();
      if (!name || name.length > 30) return err('Ongeldige naam');
      const count = await env.DB.prepare('SELECT COUNT(*) as c FROM players').first();
      if (count.c >= 15) return err('Maximum 15 spelers bereikt');
      try {
        await env.DB.prepare('INSERT INTO players (name) VALUES (?)').bind(name.trim()).run();
        return json({ ok: true });
      } catch {
        return err('Speler bestaat al');
      }
    }

    // DELETE /api/players/:name
    if (path.startsWith('/api/players/') && request.method === 'DELETE') {
      const name = decodeURIComponent(path.split('/api/players/')[1]);
      await env.DB.prepare('DELETE FROM players WHERE name = ?').bind(name).run();
      await env.DB.prepare('DELETE FROM predictions WHERE player = ?').bind(name).run();
      return json({ ok: true });
    }

    // GET /api/predictions?player=X
    if (path === '/api/predictions' && request.method === 'GET') {
      const player = url.searchParams.get('player');
      if (!player) return err('player vereist');
      const rows = await env.DB.prepare(
        'SELECT match_id, home_score, away_score FROM predictions WHERE player = ?'
      ).bind(player).all();
      const result = {};
      rows.results.forEach(r => {
        result[r.match_id] = { h: r.home_score, a: r.away_score };
      });
      return json(result);
    }

    // PUT /api/predictions  { player, matchId, h, a }
    if (path === '/api/predictions' && request.method === 'PUT') {
      const { player, matchId, h, a } = await request.json();
      if (!player || !matchId || h == null || a == null) return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO predictions (player, match_id, home_score, away_score)
         VALUES (?, ?, ?, ?)
         ON CONFLICT(player, match_id) DO UPDATE SET home_score=excluded.home_score, away_score=excluded.away_score`
      ).bind(player, matchId, parseInt(h), parseInt(a)).run();
      return json({ ok: true });
    }

    // GET /api/results
    if (path === '/api/results' && request.method === 'GET') {
      const rows = await env.DB.prepare('SELECT match_id, home_score, away_score FROM results').all();
      const result = {};
      rows.results.forEach(r => {
        result[r.match_id] = { h: r.home_score, a: r.away_score };
      });
      return json(result);
    }

    // PUT /api/results  { matchId, h, a }
    if (path === '/api/results' && request.method === 'PUT') {
      const { matchId, h, a } = await request.json();
      if (!matchId || h == null || a == null) return err('Ontbrekende velden');
      await env.DB.prepare(
        `INSERT INTO results (match_id, home_score, away_score)
         VALUES (?, ?, ?)
         ON CONFLICT(match_id) DO UPDATE SET home_score=excluded.home_score, away_score=excluded.away_score`
      ).bind(matchId, parseInt(h), parseInt(a)).run();
      return json({ ok: true });
    }

    // GET /api/ranking
    if (path === '/api/ranking' && request.method === 'GET') {
      const players = await env.DB.prepare('SELECT name FROM players ORDER BY created_at').all();
      const allPreds = await env.DB.prepare('SELECT player, match_id, home_score, away_score FROM predictions').all();
      const allResults = await env.DB.prepare('SELECT match_id, home_score, away_score FROM results').all();

      const predsMap = {};
      allPreds.results.forEach(r => {
        if (!predsMap[r.player]) predsMap[r.player] = {};
        predsMap[r.player][r.match_id] = { h: r.home_score, a: r.away_score };
      });
      const resMap = {};
      allResults.results.forEach(r => {
        resMap[r.match_id] = { h: r.home_score, a: r.away_score };
      });

      const ranking = players.results.map(({ name }) => {
        let pts = 0, exact = 0, win = 0, filled = 0;
        const preds = predsMap[name] || {};
        for (const [mid, pred] of Object.entries(preds)) {
          filled++;
          const res = resMap[mid];
          if (res) {
            if (pred.h === res.h && pred.a === res.a) { pts += 3; exact++; }
            else {
              const pw = pred.h > pred.a ? 1 : pred.h < pred.a ? -1 : 0;
              const rw = res.h > res.a ? 1 : res.h < res.a ? -1 : 0;
              if (pw === rw) { pts += 1; win++; }
            }
          }
        }
        return { name, pts, exact, win, filled };
      }).sort((a, b) => b.pts - a.pts || b.exact - a.exact);

      return json(ranking);
    }

    return err('Niet gevonden', 404);
  },
};
