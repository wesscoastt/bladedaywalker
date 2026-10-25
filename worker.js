/* BLADE: DAYWALKER — site worker.
   Serves the game files, plus a tiny relay for online co-op at /coop/<CODE>.
   Each room is a Durable Object holding at most two WebSockets (host + guest);
   it forwards every message from one player to the other and nothing else. */

export class CoopRoom {
  constructor(ctx, env) {
    this.ctx = ctx;
    this.ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
  }

  async fetch(request) {
    const role = new URL(request.url).searchParams.get('role') === 'host' ? 'host' : 'guest';
    const hosts = this.ctx.getWebSockets('host');
    const guests = this.ctx.getWebSockets('guest');
    const pair = new WebSocketPair();
    const client = pair[0], server = pair[1];

    let reject = '';
    if (role === 'guest' && !hosts.length) reject = 'nohost';

    if (reject) {
      this.ctx.acceptWebSocket(server, ['x']);
      server.send(JSON.stringify({ t: reject }));
      server.close(4000, reject);
    } else {
      // a player came back (phones drop sockets when you switch apps): replace their stale socket quietly
      for (const old of (role === 'host' ? hosts : guests)) { try { old.serializeAttachment({ replaced: true }); old.close(4001, 'replaced'); } catch (e) {} }
      this.ctx.acceptWebSocket(server, [role]);
      const msg = JSON.stringify({ t: 'peer' });
      if (role === 'guest') {
        server.send(msg);
        for (const h of hosts) { try { h.send(msg); } catch (e) {} }
      } else if (guests.length) {
        server.send(msg);
        for (const g of guests) { try { if (!(g.deserializeAttachment() || {}).replaced) g.send(msg); } catch (e) {} }
      }
    }
    return new Response(null, { status: 101, webSocket: client });
  }

  webSocketMessage(ws, msg) {
    if (this.ctx.getTags(ws).indexOf('x') >= 0 || (ws.deserializeAttachment() || {}).replaced) return;
    for (const other of this.ctx.getWebSockets()) {
      if (other === ws || this.ctx.getTags(other).indexOf('x') >= 0) continue;
      try { other.send(msg); } catch (e) {}
    }
  }

  webSocketClose(ws, code, reason) {
    const tags = this.ctx.getTags(ws);
    const att = ws.deserializeAttachment() || {};
    // if the same player already reconnected on a new socket, this close is old news
    const role = tags.indexOf('host') >= 0 ? 'host' : 'guest';
    const stillHere = this.ctx.getWebSockets(role).some((o) => o !== ws && !(o.deserializeAttachment() || {}).replaced);
    if (tags.indexOf('x') < 0 && !att.replaced && !stillHere) {
      for (const other of this.ctx.getWebSockets()) {
        if (other === ws || this.ctx.getTags(other).indexOf('x') >= 0) continue;
        try { other.send(JSON.stringify({ t: 'peerleft' })); } catch (e) {}
      }
    }
    // 1005/1006 are reserved and cannot be sent back; finish the handshake with a normal close
    const c = (code === 1000 || (code >= 3000 && code < 5000)) ? code : 1000;
    try { ws.close(c, 'bye'); } catch (e) {}
  }

  webSocketError(ws) { this.webSocketClose(ws, 1011, 'error'); }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const m = url.pathname.match(/^\/coop\/([A-Za-z0-9]{4})$/);
    if (m) {
      if (request.headers.get('Upgrade') !== 'websocket') return new Response('Expected a WebSocket', { status: 426 });
      const id = env.ROOMS.idFromName(m[1].toUpperCase());
      return env.ROOMS.get(id).fetch(request);
    }
    return env.ASSETS.fetch(request);
  }
};
