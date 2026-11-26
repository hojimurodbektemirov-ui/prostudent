/* Jonli viktorina: tuzish, PIN bilan boshlash, kod bilan kirish, real vaqtda o'ynash. */
(function () {
  const e = KM.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const Q = () => KM.api.quiz;
  const LET = ['A', 'B', 'C', 'D'], TIMES = [5, 10, 20, 30, 60, 90];
  const me = () => KM.session.user, isAdmin = () => me().role !== 'student';
  const site = () => location.origin + location.pathname.replace(/index\.html$/, '');
  const err = (el, x) => { if (el) { el.textContent = x.message || String(x); el.className = 'msg bad-t'; } };

  /* ---------- Bosh sahifa: kod bilan kirish + viktorinalarim ---------- */
  async function hub(app) {
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap lv-hub"><div><p class="pill-tag"><i></i>Jonli viktorina</p><h1>Kim tez va <span class="hl">to\'g\'ri?</span></h1><p class="lead">O\'qituvchi yoki sinfdoshingiz viktorinani boshlaydi, ekranda PIN chiqadi. Siz shu PIN bilan kirasiz va hamma bir vaqtda javob beradi. Tez va to\'g\'ri javob ko\'proq ball beradi.</p></div>' +
      '<form class="pin-card" id="pf"><label for="pin">O\'yin PIN-kodi</label><input id="pin" inputmode="numeric" autocomplete="off" maxlength="7" placeholder="123 456"><button class="btn pri big wide">Kirish</button><p class="msg" id="pm" role="alert"></p></form></div></section>' +
      '<section class="band"><div class="wrap"><div class="sec-h"><h2>Mening viktorinalarim</h2><div class="acts" style="margin:0"><a class="btn pri" href="#viktorina-yangi">+ Yangi viktorina</a></div></div><div class="qz-grid" id="ql"><p class="muted">Yuklanmoqda…</p></div></div></section>';
    $('#pin').oninput = ev => { const d = ev.target.value.replace(/\D/g, '').slice(0, 6); ev.target.value = d.length > 3 ? d.slice(0, 3) + ' ' + d.slice(3) : d; };
    $('#pf').onsubmit = async ev => {
      ev.preventDefault(); const pin = $('#pin').value.replace(/\D/g, '');
      if (pin.length !== 6) return err($('#pm'), { message: 'PIN 6 ta raqamdan iborat' });
      try { const r = await Q().join(pin); location.hash = 'oyin-' + r.id; } catch (x) { err($('#pm'), x); }
    };
    $('#pin').focus();
    let list; try { list = await Q().list(); } catch (x) { $('#ql').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; return; }
    const el = $('#ql'); if (!el) return;
    el.innerHTML = list.length ? list.map(z => '<div class="qz"><b>' + e(z.title) + '</b><span class="muted">' + z.questions.length + ' ta savol' + (z.mine ? '' : ' · ' + e(z.owner || '')) + '</span><div class="acts"><button class="btn pri sm" data-play="' + e(z.id) + '">▶ Boshlash</button><a class="btn sm" href="#viktorina-tahrir-' + e(z.id) + '">Tahrirlash</a><button class="btn sm" data-del="' + e(z.id) + '">O\'chirish</button></div></div>').join('')
      : '<div class="empty-s"><p>Hali viktorina yo\'q. "Yangi viktorina" ni bosing: savollarni o\'zingiz yozasiz yoki Informatika darsidan tayyor savollarni olasiz.</p></div>';
    $$('[data-play]', el).forEach(b => b.onclick = async () => { b.disabled = true; try { const g = await Q().create(b.dataset.play); location.hash = 'oyin-' + g.id; } catch (x) { b.disabled = false; alertMsg(x.message); } });
    $$('[data-del]', el).forEach(b => KM.ui.confirmBtn(b, 'Yana bosing', async () => { await Q().del(b.dataset.del); hub(app); }));
  }
  const alertMsg = t => { const d = document.createElement('div'); d.className = 'toast'; d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 4000); };

  /* ---------- Tahrirlovchi ---------- */
  async function editor(app, id) {
    let title = '', qs = [{ q: '', o: ['', '', '', ''], a: 0, t: 20 }];
    if (id) { try { const z = (await Q().list()).find(z => z.id === id); if (!z) return KM.notFound(); title = z.title; qs = JSON.parse(JSON.stringify(z.questions)); } catch (x) { return KM.notFound(); } }
    const myInf = (me().groups || []).find(g => g.kind === 'sinf' && (g.courses || []).includes('informatika'));
    const grades = KM.infGrades.filter(g => isAdmin() || (myInf && g.n === myInf.grade));
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="#viktorina">← Viktorina</a><h1>' + (id ? 'Viktorinani tahrirlash' : 'Yangi viktorina') + '</h1></div></section>' +
      '<section class="band"><div class="wrap narrow"><div class="panel"><label class="lab" for="qt">Viktorina nomi</label><input class="inp" id="qt" maxlength="80" placeholder="Masalan: HTML teglari" value="' + e(title) + '">' +
      (grades.length ? '<details class="imp"><summary>Informatika darsidan savollarni olish</summary><div class="row-f"><div><label class="lab" for="ig">Sinf</label><select class="inp" id="ig">' + grades.map(g => '<option value="' + g.n + '">' + g.n + '-sinf</option>').join('') + '</select></div><div style="flex:3 1 260px"><label class="lab" for="il">Dars</label><select class="inp" id="il"></select></div><div class="acts" style="margin:0"><button type="button" class="btn" id="iadd">Savollarni qo\'shish</button></div></div></details>' : '') +
      '</div><div id="qs"></div><div class="acts sticky-save"><button type="button" class="btn" id="qadd">+ Savol</button><button class="btn pri" id="qsave">Saqlash</button><button class="btn" id="qplay">Saqlash va boshlash ▶</button><span class="msg" id="qm" role="status"></span></div></div></section>';
    const fillLessons = () => { const g = KM.infGrades.find(g => g.n === +$('#ig').value); $('#il').innerHTML = g.lessons.filter(l => l.quiz.length).map(l => '<option value="' + l.n + '">' + l.n + '. ' + e(l.t.slice(0, 70)) + ' (' + l.quiz.length + ')</option>').join(''); };
    if (grades.length) { fillLessons(); $('#ig').onchange = fillLessons; $('#iadd').onclick = () => { sync(); const L = KM.infLesson($('#ig').value + '-' + $('#il').value); qs = qs.filter(q => q.q.trim()); L.l.quiz.forEach(q => qs.push({ q: q[0], o: q[1].slice(0, 4), a: q[2], t: 20 })); if (!$('#qt').value) $('#qt').value = L.l.t.slice(0, 80); draw(); }; }
    const draw = () => {
      $('#qs').innerHTML = qs.map((q, i) => '<div class="qe" data-i="' + i + '"><div class="qe-h"><b>' + (i + 1) + '-savol</b><label class="vh" for="t' + i + '">Vaqt</label><select class="inp sm2" id="t' + i + '" data-f="t">' + TIMES.map(t => '<option value="' + t + '"' + (t === (q.t || 20) ? ' selected' : '') + '>' + t + ' soniya</option>').join('') + '</select><button type="button" class="ib" data-a="up" aria-label="Yuqoriga">↑</button><button type="button" class="ib" data-a="dup" aria-label="Nusxa">⧉</button><button type="button" class="ib del" data-a="rm" aria-label="O\'chirish">×</button></div>' +
        '<label class="vh" for="q' + i + '">Savol matni</label><textarea class="inp" id="q' + i + '" data-f="q" rows="2" maxlength="300" placeholder="Savolni yozing">' + e(q.q) + '</textarea><div class="qe-o">' +
        [0, 1, 2, 3].map(j => '<label class="qo c' + j + (q.a === j ? ' ok' : '') + '"><input type="radio" name="a' + i + '" value="' + j + '"' + (q.a === j ? ' checked' : '') + ' aria-label="' + LET[j] + ' to\'g\'ri javob"><span class="qo-l">' + LET[j] + '</span><input class="qo-i" data-o="' + j + '" maxlength="120" placeholder="' + (j < 2 ? 'Javob (majburiy)' : 'Javob (ixtiyoriy)') + '" value="' + e(q.o[j] || '') + '"></label>').join('') + '</div><p class="muted qe-hint">To\'g\'ri javob yonidagi doirachani belgilang.</p></div>').join('');
    };
    const sync = () => {
      $$('.qe').forEach(el => { const i = +el.dataset.i, q = qs[i]; q.q = $('[data-f=q]', el).value; q.t = +$('[data-f=t]', el).value; q.o = $$('[data-o]', el).map(x => x.value); const c = $('input[type=radio]:checked', el); q.a = c ? +c.value : 0; });
    };
    $('#qs').addEventListener('click', ev => {
      const b = ev.target.closest('[data-a]'); if (!b) return; sync(); const i = +b.closest('.qe').dataset.i;
      if (b.dataset.a === 'rm') { qs.splice(i, 1); if (!qs.length) qs.push({ q: '', o: ['', '', '', ''], a: 0, t: 20 }); }
      else if (b.dataset.a === 'dup') qs.splice(i + 1, 0, JSON.parse(JSON.stringify(qs[i])));
      else if (b.dataset.a === 'up' && i > 0) [qs[i - 1], qs[i]] = [qs[i], qs[i - 1]];
      draw();
    });
    $('#qs').addEventListener('change', ev => { if (ev.target.type === 'radio') { sync(); draw(); } });
    $('#qadd').onclick = () => { sync(); qs.push({ q: '', o: ['', '', '', ''], a: 0, t: qs.length ? qs[qs.length - 1].t : 20 }); draw(); $$('.qe').pop().querySelector('textarea').focus(); };
    const save = async play => {
      sync();
      const clean = qs.map(q => { const opts = [], map = {}; q.o.forEach((o, j) => { if (String(o).trim()) { map[j] = opts.length; opts.push(String(o).trim()); } }); return { q: q.q.trim(), o: opts, a: map[q.a] == null ? -1 : map[q.a], t: q.t || 20 }; }).filter(q => q.q || q.o.length);
      const bad = clean.findIndex(q => !q.q || q.o.length < 2 || q.a < 0);
      if (bad >= 0) return err($('#qm'), { message: (bad + 1) + '-savolda: matn, kamida 2 ta javob va belgilangan to\'g\'ri javob bo\'lishi kerak' + (clean[bad].a < 0 && clean[bad].o.length >= 2 ? ' (to\'g\'ri deb belgilangan javob bo\'sh)' : '') });
      try { const r = await Q().save(id, $('#qt').value, clean); if (play) { const g = await Q().create(r.id); location.hash = 'oyin-' + g.id; } else location.hash = 'viktorina'; }
      catch (x) { err($('#qm'), x); }
    };
    $('#qsave').onclick = () => save(false); $('#qplay').onclick = () => save(true);
    draw();
  }

  /* ---------- Realtime: Supabase broadcast kanali. Har bir o'zgarishda "tick" yuboriladi, qolganlar darhol yangilanadi.
     Ulanmasa, oddiy so'rov (har soniyada) ishlayveradi. ---------- */
  function realtime(gid, onTick) {
    const c = KM.config || {};
    if (KM.api.mode !== 'supabase' || !window.WebSocket) return { ok: false, ping() {}, close() {} };
    const url = String(c.supabaseUrl).trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '').replace(/^http/, 'ws') + '/realtime/v1/websocket?apikey=' + encodeURIComponent(c.supabaseKey) + '&vsn=1.0.0';
    const topic = 'realtime:zis-game-' + gid, R = { ok: false, ping() {}, close() {} };
    let ws, ref = 0, hb = null, closed = false, retry = 0;
    const send = (event, payload, t) => { try { if (ws && ws.readyState === 1) ws.send(JSON.stringify({ topic: t || topic, event, payload, ref: String(++ref), join_ref: '1' })); } catch (x) {} };
    function open() {
      try { ws = new WebSocket(url); } catch (x) { return; }
      ws.onopen = () => { send('phx_join', { config: { broadcast: { self: false, ack: false }, presence: { key: '' }, postgres_changes: [], private: false } }); hb = setInterval(() => send('heartbeat', {}, 'phoenix'), 25000); };
      ws.onmessage = ev => { let m; try { m = JSON.parse(ev.data); } catch (x) { return; } if (m.topic !== topic) return;
        if (m.event === 'phx_reply' && m.payload && m.payload.status === 'ok' && !R.ok) { R.ok = true; retry = 0; onTick(); }
        else if (m.event === 'broadcast') onTick(); };
      ws.onclose = () => { R.ok = false; clearInterval(hb); if (!closed && retry < 5) setTimeout(open, 1000 * ++retry); };
      ws.onerror = () => {};
    }
    R.ping = () => send('broadcast', { type: 'broadcast', event: 'tick', payload: {} });
    R.close = () => { closed = true; clearInterval(hb); try { ws && ws.close(); } catch (x) {} };
    open();
    return R;
  }

  /* ---------- O'yin: boshlovchi va o'yinchi ---------- */
  function game(app, gid) {
    let st = null, timer = null, tick = null, deadline = 0, lastKey = '', busy = false, rewarded = false, sentFor = -1, adv = false, ver = 0;
    let n = 0, pinged = false;
    const rt = realtime(gid, () => { lastKey = ''; poll(); });
    const stop = () => { clearInterval(timer); clearInterval(tick); rt.close(); document.body.classList.remove('lv-on'); };
    KM.onLeave(stop);
    document.body.classList.add('lv-on');
    app.innerHTML = '<div class="lv grid-bg" id="lv"><div class="splash"><span class="caret"></span></div></div>';
    const root = () => $('#lv');
    async function poll() {
      if (busy || adv) return; busy = true; const v0 = ver; let ns;
      try { ns = await Q().state(gid); if (v0 !== ver || adv) { busy = false; return; } st = ns; } catch (x) { busy = false; if (x.code === 'SESSION') return KM.logout(); root() && (root().innerHTML = '<div class="lv-c"><h1>' + e(x.message) + '</h1><a class="btn pri big" href="#viktorina">Viktorinaga qaytish</a></div>'); stop(); return; }
      busy = false;
      if (!st.host && !pinged && rt.ok) { pinged = true; rt.ping(); }
      if (st.state === 'question') deadline = Date.now() + st.remaining_ms;
      const key = st.state + ':' + st.q_index + ':' + (st.host ? st.players + ':' + st.answered : (st.me && st.me.answered));
      if (key !== lastKey) { lastKey = key; render(); }
      if (st.host && st.state === 'question' && (st.remaining_ms <= 0 || (st.players > 0 && st.answered >= st.players))) next();
      if (st.state === 'end') { clearInterval(timer); if (!st.host && !rewarded && st.me && !isAdmin()) { rewarded = true; const xp = Math.round(st.me.score / 100); if (xp > 0) KM.store.addXP(xp); } }
    }
    async function next() { if (adv) return; adv = true; ver++; try { await Q().next(gid); rt.ping(); } catch (x) { alertMsg(x.message); } adv = false; ver++; lastKey = ''; poll(); }
    function countdown() { if (st && st.host && st.state === 'question' && deadline && Date.now() > deadline + 300 && !adv) next(); const el = $('#cd'), ring = $('#cdr'); if (!el || !st || st.state !== 'question') return; const left = Math.max(0, deadline - Date.now()); el.textContent = Math.ceil(left / 1000); if (ring) ring.style.setProperty('--p', left / (st.time * 1000)); }
    function render() {
      const r = root(); if (!r) return;
      const s = st, q = s.question;
      if (s.host) {
        if (s.state === 'lobby') r.innerHTML = '<div class="lv-top"><b>' + e(s.title) + '</b><button class="btn sm ghost" id="end">Tugatish</button></div><div class="lv-c"><p class="lv-k">Kirish uchun: ' + e(site()) + ' → Viktorina → Kod bilan kirish</p><div class="pin-big" aria-label="PIN">' + e(s.pin.slice(0, 3) + ' ' + s.pin.slice(3)) + '</div><p class="lv-k">' + s.players + ' ta o\'yinchi ulandi</p><div class="names">' + (s.names || []).map(n => '<span>' + e(n) + '</span>').join('') + '</div><button class="btn pri big" id="go"' + (s.players ? '' : ' disabled') + '>Boshlash ▶</button></div>';
        else if (s.state === 'question') r.innerHTML = '<div class="lv-top"><b>' + (s.q_index + 1) + ' / ' + s.total + '</b><span>' + s.answered + ' / ' + s.players + ' javob berdi</span><button class="btn sm ghost" id="go">O\'tkazish →</button></div><div class="lv-c"><h1 class="lv-q">' + e(q.q) + '</h1><div class="cd" id="cdr"><span id="cd"></span></div><div class="opts4 n' + q.o.length + '">' + q.o.map((o, j) => '<div class="op c' + j + '"><i>' + LET[j] + '</i><span>' + e(o) + '</span></div>').join('') + '</div></div>';
        else if (s.state === 'reveal') { const mx = Math.max(1, ...s.counts); r.innerHTML = '<div class="lv-top"><b>' + (s.q_index + 1) + ' / ' + s.total + '</b><span>' + s.counts.reduce((a, b) => a + b, 0) + ' / ' + s.players + ' javob</span><button class="btn pri" id="go">' + (s.q_index + 1 < s.total ? 'Keyingi savol →' : 'Natijalar →') + '</button></div><div class="lv-c"><h1 class="lv-q sm">' + e(q.q) + '</h1><div class="opts4 rev n' + q.o.length + '">' + q.o.map((o, j) => '<div class="op c' + j + (j === s.answer ? ' right' : ' dim') + '"><i>' + (j === s.answer ? '✓' : LET[j]) + '</i><span>' + e(o) + '</span><b class="cnt" style="--w:' + (s.counts[j] / mx * 100) + '%">' + s.counts[j] + '</b></div>').join('') + '</div>' + board(s.top.slice(0, 5)) + '</div>'; }
        else r.innerHTML = '<div class="lv-top"><b>' + e(s.title) + '</b></div><div class="lv-c"><h1>G\'oliblar</h1>' + podium(s.top) + board(s.top.slice(3, 10), 4) + '<div class="acts"><a class="btn pri big" href="#viktorina">Viktorinaga qaytish</a></div></div>';
        const go = $('#go'); if (go) go.onclick = () => { go.disabled = true; next(); };
        const end = $('#end'); if (end) KM.ui.confirmBtn(end, 'Yana bosing', async () => { await Q().end(gid); rt.ping(); location.hash = 'viktorina'; });
      } else {
        const m = s.me;
        if (s.state === 'lobby') r.innerHTML = '<div class="lv-top"><b>' + e(s.title) + '</b><span>' + s.players + ' o\'yinchi</span></div><div class="lv-c"><div class="wait"><span></span><span></span><span></span></div><h1>Siz o\'yindasiz!</h1><p class="lead">Ismingiz ekranda. Boshlovchi o\'yinni boshlashini kuting.</p></div>';
        else if (s.state === 'question') {
          if (m.answered || sentFor === s.q_index) r.innerHTML = '<div class="lv-top"><b>' + (s.q_index + 1) + ' / ' + s.total + '</b><span>' + m.score + ' ball</span></div><div class="lv-c"><div class="wait"><span></span><span></span><span></span></div><h1>Javob qabul qilindi</h1><p class="lead">Boshqalarni kutamiz…</p></div>';
          else { r.innerHTML = '<div class="lv-top"><b>' + (s.q_index + 1) + ' / ' + s.total + '</b><div class="cd sm" id="cdr"><span id="cd"></span></div><span>' + m.score + ' ball</span></div><div class="lv-c"><h2 class="lv-q pl">' + e(q.q) + '</h2><div class="opts4 play n' + q.o.length + '">' + q.o.map((o, j) => '<button class="op c' + j + '" data-c="' + j + '"><i>' + LET[j] + '</i><span>' + e(o) + '</span></button>').join('') + '</div></div>';
            $$('[data-c]', r).forEach(b => b.onclick = async () => { const qi = s.q_index; sentFor = qi; $$('[data-c]', r).forEach(x => x.disabled = true); b.classList.add('picked'); try { await Q().answer(gid, qi, +b.dataset.c); rt.ping(); } catch (x) { alertMsg(x.message); } lastKey = ''; poll(); }); }
        } else if (s.state === 'reveal') r.innerHTML = '<div class="lv-top"><b>' + (s.q_index + 1) + ' / ' + s.total + '</b><span>' + m.score + ' ball</span></div><div class="lv-c res ' + (m.correct ? 'good' : 'bad') + '"><div class="res-i">' + (m.correct ? '✓' : m.answered ? '✗' : '⏱') + '</div><h1>' + (m.correct ? 'To\'g\'ri!' : m.answered ? 'Noto\'g\'ri' : 'Vaqt tugadi') + '</h1>' + (m.correct ? '<p class="plus">+' + m.points + '</p>' : '') + '<p class="lead">To\'g\'ri javob: <b>' + LET[s.answer] + ') ' + e(q.o[s.answer]) + '</b></p><p class="rank">Siz ' + m.rank + '-o\'rindasiz</p></div>';
        else r.innerHTML = '<div class="lv-top"><b>' + e(s.title) + '</b></div><div class="lv-c"><h1>Siz ' + m.rank + '-o\'rin!</h1><p class="plus">' + m.score + ' ball</p>' + (isAdmin() ? '' : '<p class="lead">+' + Math.round(m.score / 100) + ' XP hisobingizga qo\'shildi</p>') + podium(s.top) + '<div class="acts"><a class="btn pri big" href="#viktorina">Viktorinaga qaytish</a></div></div>';
      }
      countdown();
    }
    const board = (rows, start) => rows.length ? '<ol class="lb2" start="' + (start || 1) + '">' + rows.map(x => '<li><span>' + e(x.name) + '</span><b>' + x.score + '</b></li>').join('') + '</ol>' : '';
    const podium = top => '<div class="podium">' + [1, 0, 2].map(i => top[i] ? '<div class="pd p' + (i + 1) + '"><span class="pd-n">' + e(top[i].name) + '</span><b>' + top[i].score + '</b><div class="pd-b">' + (i + 1) + '</div></div>' : '<div class="pd empty"></div>').join('') + '</div>';
    timer = setInterval(() => { if (!rt.ok || ++n % 4 === 0) poll(); }, 1000); tick = setInterval(countdown, 200); poll();
  }

  KM.live = {
    route(h, app) {
      if (h === 'viktorina') return hub(app);
      if (h === 'viktorina-yangi') return editor(app, null);
      if (h.startsWith('viktorina-tahrir-')) return editor(app, h.slice(17));
      if (h.startsWith('oyin-')) return game(app, h.slice(5));
      KM.notFound();
    }
  };
})();
