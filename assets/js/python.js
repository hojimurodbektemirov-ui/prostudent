/* Python brauzerning o'zida (Pyodide). Hech narsa o'rnatish shart emas.
   KM.py.run(code, input, onEvent) — natija oqim bo'lib keladi; 10 soniyadan oshsa to'xtatiladi.
   KM.py.runner(host, code) — darsdagi Python misoli ostiga "Ishga tushirish" oynasi. */
(function () {
  const e = KM.esc, $ = (s, r) => (r || document).querySelector(s);
  const BASE = () => (KM.config && KM.config.pyodide) || 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
  let w = null, wReady = null;
  function worker() {
    if (wReady) return wReady;
    w = new Worker('assets/js/py-worker.js');
    wReady = new Promise((res, rej) => {
      const on = ev => { if (ev.data.type === 'ready') { w.removeEventListener('message', on); res(w); } else if (ev.data.type === 'fatal') { w.removeEventListener('message', on); kill(); rej(new Error('Python yuklanmadi: ' + ev.data.text)); } };
      w.addEventListener('message', on); w.onerror = () => { kill(); rej(new Error('Python yuklanmadi. Internetni tekshiring.')); };
      w.postMessage({ type: 'init', base: BASE() });
    });
    return wReady;
  }
  function kill() { try { w && w.terminate(); } catch (x) {} w = null; wReady = null; }
  let busy = false;
  async function run(code, input, on, limit) {
    if (busy) return; busy = true;
    try {
      const wk = await worker();
      await new Promise(res => {
        const t = setTimeout(() => { wk.removeEventListener('message', h); kill(); on({ type: 'error', text: 'Dastur ' + (limit || 10) + ' soniyada tugamadi (cheksiz sikl bo\'lishi mumkin). To\'xtatildi.' }); res(); }, (limit || 10) * 1000);
        const h = ev => { on(ev.data); if (ev.data.type === 'done' || ev.data.type === 'error') { clearTimeout(t); wk.removeEventListener('message', h); res(); } };
        wk.addEventListener('message', h);
        wk.postMessage({ type: 'run', code, input: input || '' });
      });
    } catch (x) { on({ type: 'error', text: x.message }); }
    busy = false;
  }
  /* Python xato xabarini o'quvchiga tushunarli qilish */
  function explain(t) {
    const last = String(t).trim().split('\n').pop();
    const ln = (String(t).match(/File "<exec>", line (\d+)/g) || []).pop();
    const at = ln ? ' (' + ln.match(/\d+/)[0] + '-qatorda)' : '';
    const M = [[/^SyntaxError/, 'Yozishda xato' + at + ': qavs, qo\'shtirnoq yoki ":" ni tekshiring.'], [/^IndentationError/, 'Bo\'sh joy (chekinish) xatosi' + at + ': if, for, def ichidagi qatorlar 4 ta bo\'sh joy bilan boshlansin.'],
      [/^NameError: name '(\w+)'/, (m) => '"' + m[1] + '" nomli o\'zgaruvchi yoki funksiya topilmadi' + at + '. Nomini to\'g\'ri yozdingizmi?'], [/^TypeError/, 'Tur xatosi' + at + ': masalan, son va matnni qo\'shib bo\'lmaydi. int() yoki str() dan foydalaning.'],
      [/^ZeroDivisionError/, 'Nolga bo\'lish mumkin emas' + at + '.'], [/^ValueError/, 'Qiymat xatosi' + at + ': masalan, int("salom") ishlamaydi.'], [/^EOFError/, 'input() uchun qiymat yetmadi. "Kiritiladigan qiymatlar" maydoniga yozing.'], [/^IndexError/, 'Ro\'yxatda bunday tartib raqamli element yo\'q' + at + '.']];
    for (const [re, txt] of M) { const m = last.match(re); if (m) return typeof txt === 'function' ? txt(m) : txt; }
    return '';
  }
  /* Kod + kiritish + natija oynasi */
  function runner(host, code, opts) {
    opts = opts || {};
    host.innerHTML = '<div class="pyr"><div class="pyr-ed"></div><div class="pyr-side"><label class="lab" for="pyi' + (opts.id || '') + '">Kiritiladigan qiymatlar <small class="muted">(input() uchun, har biri yangi qatorda)</small></label><textarea class="inp mono pyr-in" id="pyi' + (opts.id || '') + '" rows="3" placeholder="Ali&#10;12"></textarea>' +
      '<div class="acts"><button class="btn pri pyr-go">▶ Ishga tushirish</button><button class="btn pyr-clr">Tozalash</button><span class="muted pyr-st"></span></div></div><pre class="pyr-out" aria-live="polite"></pre></div>';
    const ed = KM.editor($('.pyr-ed', host), { lang: 'python', onChange: opts.onChange, onRun: () => go() });
    ed.set(code || '');
    const out = $('.pyr-out', host), st = $('.pyr-st', host), btn = $('.pyr-go', host);
    const add = (t, cls, raw) => { const s = document.createElement('span'); if (cls) s.className = cls; s.textContent = raw ? t : t + '\n'; out.appendChild(s); out.scrollTop = out.scrollHeight; };
    async function go() {
      out.textContent = ''; btn.disabled = true; st.textContent = w ? 'Ishlamoqda…' : 'Python yuklanmoqda (birinchi marta 5–15 soniya)…';
      const t0 = Date.now(); let err = '';
      await run(ed.get(), $('.pyr-in', host).value, m => {
        if (m.type === 'out') add(m.text, '', true); else if (m.type === 'in') add(m.text, 'pyr-i'); else if (m.type === 'err') add(m.text, 'pyr-e');
        else if (m.type === 'error') { err = m.text; add(m.text.split('\n').filter(l => !/^\s*File "\/lib\//.test(l) && !/^\s{4}/.test(l) || /<exec>/.test(l)).slice(-4).join('\n'), 'pyr-e'); const h = explain(m.text); if (h) add('💡 ' + h, 'pyr-h'); }
        else if (m.type === 'need') add('› (input uchun qiymat yo\'q)', 'pyr-e');
      });
      st.textContent = err ? 'Xato bilan tugadi' : 'Bajarildi · ' + ((Date.now() - t0) / 1000).toFixed(1) + ' s'; btn.disabled = false;
      if (!out.textContent.trim()) add('(dastur hech narsa chiqarmadi: print() qo\'shing)', 'muted');
      if (opts.onRun) opts.onRun(!err);
    }
    $('.pyr-clr', host).onclick = () => { out.textContent = ''; st.textContent = ''; };
    btn.onclick = go;
    return { get: ed.get, set: ed.set, run: go };
  }
  /* Darsdagi ```python misollariga "Sinab ko'rish" tugmasi */
  function enhance(root) {
    [...root.querySelectorAll('pre.ex[data-l="python"], pre.ex[data-l="py"]')].forEach((pre, i) => {
      if (pre.dataset.pyr) return; pre.dataset.pyr = 1;
      const b = document.createElement('button'); b.className = 'btn sm py-try'; b.type = 'button'; b.textContent = '▶ Sinab ko\'rish';
      pre.after(b);
      b.onclick = () => { const box = document.createElement('div'); box.className = 'py-box'; b.replaceWith(box); runner(box, pre.textContent, { id: 'd' + i }).run(); };
    });
  }
  KM.py = { run, runner, enhance, explain };
})();
