/* Oflayn rejim: sayt fayllari va darslar qurilmada saqlanadi, internet sust yoki yo'q bo'lsa ham ochiladi.
   Server so'rovlari (login, baholar, viktorina) keshlanmaydi — ular doim internetdan olinadi. */
const VERSION = 'zis-v5-202611261800';
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'assets/img/icon-192.png'];
self.addEventListener('install', ev => {
  ev.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', ev => {
  ev.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION && k.startsWith('zis-')).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const put = (req, res, opq) => { if (res && (res.ok || (opq && res.type === 'opaque')) && (res.type === 'basic' || res.type === 'cors' || (opq && res.type === 'opaque'))) { const c = res.clone(); caches.open(VERSION).then(x => x.put(req, c)); } return res; };
self.addEventListener('fetch', ev => {
  const r = ev.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  // Supabase (API, fayllar, realtime) — hech qachon keshlanmaydi
  if (/supabase\.(co|in)$/.test(u.hostname) || u.pathname.includes('/rest/v1/') || u.pathname.includes('/storage/v1/')) return;
  const same = u.origin === self.location.origin;
  // Python (Pyodide) va shriftlar: bir marta yuklanadi, keyin qurilmadan
  const longLived = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname) || (u.hostname === 'cdn.jsdelivr.net' && u.pathname.startsWith('/pyodide/'));
  if (!same && !longLived) return;
  // Sahifaning o'zi va versiyasiz fayllar: avval internet, bo'lmasa kesh
  if (r.mode === 'navigate' || (same && !u.searchParams.has('v') && !longLived)) {
    ev.respondWith(fetch(r).then(res => put(r, res)).catch(() => caches.match(r).then(m => m || caches.match('index.html'))));
    return;
  }
  // Versiyali fayllar (?v=...), shriftlar, Pyodide: avval kesh
  ev.respondWith(caches.match(r).then(m => m || fetch(r).then(res => put(r, res, longLived))));
});
