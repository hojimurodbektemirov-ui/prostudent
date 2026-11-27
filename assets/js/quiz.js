/* Test (xalqaro platformalar uslubida: Duolingo, Khan Academy):
   - birinchi urinishda to'g'ri: to'liq XP (10), ikkinchi urinishda: yarmi (5), ikki marta xato: 0 va to'g'ri javob + izoh;
   - har bir savol uchun XP faqat bir marta beriladi (qayta yechish bilan XP "yig'ib" bo'lmaydi);
   - savollar va variantlar har safar aralashtiriladi;
   - birinchi urinishda xato qilingan savollar "Xatolar ustida ishlash" sahifasiga tushadi;
   - natija bo'yicha dars "o'zlashtirish darajasi": Usta / Yaxshi / O'qilgan. */
(function () {
  const e = KM.esc;
  const XP1 = 10, XP2 = 5;
  const S = () => KM.store.s;
  const hash = t => { let h = 5381; for (let i = 0; i < t.length; i++) h = ((h << 5) + h + t.charCodeAt(i)) | 0; return (h >>> 0).toString(36); };
  const mix = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const staff = () => KM.isStaff && KM.isStaff();
  const mastery = (first, total) => !total ? null : first / total >= .9 ? ['usta', 'Usta'] : first / total >= .6 ? ['yaxshi', 'Yaxshi'] : ['oqilgan', 'O\'qilgan'];

  /* host: element; Q: [[savol, variantlar, to'g'ri indeks, izoh?], ...]
     o: { key: 'i6-12', title: 'dars nomi', href: '#infdars-6-12', xp: true, onFinish({first, total, xp}), extra: html (natija ostida) } */
  function box(host, Q, o) {
    o = o || {};
    const earnedMap = () => { const m = S().qx = S().qx || {}; return m[o.key] = m[o.key] || {}; };
    let items, cur, done, sent = false;
    function start() {
      items = mix(Q.map(q => { const ord = mix(q[1].map((_, j) => j)); return { q: q[0], o: ord.map(j => q[1][j]), a: ord.indexOf(q[2]), why: q[3] || '', id: hash(q[0]), tries: [], res: null, got: 0 }; }));
      cur = 0; done = false; draw();
    }
    const total = () => items.length;
    const firstOk = () => items.filter(x => x.res === 1).length;
    function award(it) {
      if (o.xp === false || staff()) return 0;
      const em = earnedMap(); if (em[it.id] != null) return 0;
      const xp = it.res === 1 ? XP1 : it.res === 2 ? XP2 : 0; em[it.id] = xp;
      if (xp) KM.store.addXP(xp); else KM.store.save();
      return xp;
    }
    function logWrong(it) {
      if (staff()) return; const w = S().wrong = S().wrong || {};
      if (it.res === 1) { if (o.review) delete w[it.id]; return; }
      w[it.id] = { q: it.q, o: it.o, a: it.a, why: it.why, k: o.key, t: o.title || '', h: o.href || '', at: Date.now() };
    }
    function pick(it, j) {
      if (it.res !== null || it.tries.includes(j)) return;
      it.tries.push(j);
      if (j === it.a) it.res = it.tries.length;
      else if (it.tries.length >= 2) it.res = 0;
      if (it.res !== null) { it.got = award(it); logWrong(it); }
      draw();
    }
    function draw() {
      const it = items[cur], n = total();
      if (done) return result();
      const prog = '<div class="qz-prog" aria-hidden="true">' + items.map((x, i) => '<i class="' + (x.res === 1 ? 'g' : x.res === 2 ? 'h' : x.res === 0 ? 'b' : i === cur ? 'c' : '') + '"></i>').join('') + '</div>';
      let fb = '';
      if (it.res === 1) fb = '<p class="why ok">To\'g\'ri!' + (it.got ? ' <b class="xpb">+' + it.got + ' XP</b>' : '') + (it.why ? ' ' + e(it.why) : '') + '</p>';
      else if (it.res === 2) fb = '<p class="why ok">To\'g\'ri, ikkinchi urinishda.' + (it.got ? ' <b class="xpb">+' + it.got + ' XP</b>' : '') + (it.why ? ' ' + e(it.why) : '') + '</p>';
      else if (it.res === 0) fb = '<p class="why bad">To\'g\'ri javob: <b>' + e(it.o[it.a]) + '</b>.' + (it.why ? ' ' + e(it.why) : '') + '</p>';
      else if (it.tries.length) fb = '<p class="why warn">Noto\'g\'ri. Yana bir urinib ko\'ring' + (o.xp === false || staff() || earnedMap()[it.id] != null ? '' : ': to\'g\'ri javob uchun ' + XP2 + ' XP') + '.</p>';
      const earned = earnedMap()[it.id] != null && it.res === null && o.xp !== false && !staff();
      host.innerHTML = '<div class="qz1">' + prog + '<div class="qz-h"><span>' + (cur + 1) + ' / ' + n + '</span>' + (earned ? '<span class="muted">XP avval olingan</span>' : o.xp === false || staff() ? '' : '<span class="muted">1-urinish ' + XP1 + ' XP · 2-urinish ' + XP2 + ' XP</span>') + '</div>' +
        '<h3 class="qz-q">' + e(it.q) + '</h3><div class="opts">' + it.o.map((t, j) => {
          const cls = it.res !== null && j === it.a ? ' right' : it.tries.includes(j) && j !== it.a ? ' wrong' : '';
          return '<button class="opt' + cls + '" data-j="' + j + '"' + (it.res !== null || it.tries.includes(j) ? ' disabled' : '') + '><span class="opt-k">' + 'ABCD'[j] + '</span>' + e(t) + '</button>';
        }).join('') + '</div>' + fb +
        (it.res !== null ? '<div class="acts qz-nav"><button class="btn pri" data-nx="1">' + (cur + 1 < n ? 'Keyingi savol →' : 'Natijani ko\'rish') + '</button></div>' : '') + '</div>';
      const nx = host.querySelector('[data-nx]'); if (nx) nx.focus();
    }
    function result() {
      const f = firstOk(), s2 = items.filter(x => x.res === 2).length, n = total(), xp = items.reduce((a, x) => a + x.got, 0), m = mastery(f, n);
      host.innerHTML = '<div class="qres2"><div class="qr-score"><b>' + f + ' / ' + n + '</b><span>birinchi urinishda to\'g\'ri</span></div>' +
        '<div class="qr-info"><p>' + (m ? '<span class="mst m-' + m[0] + '">' + m[1] + '</span> ' : '') + (f === n ? 'A\'lo natija!' : s2 ? s2 + ' ta savolni ikkinchi urinishda topdingiz.' : 'Xatolar ustida ishlash sahifasida mashq qiling.') + '</p>' +
        (xp ? '<p class="xpb big">+' + xp + ' XP</p>' : o.xp === false || staff() ? '' : '<p class="muted">Bu savollar uchun XP avval olingan.</p>') +
        '<div class="acts"><button class="btn" data-re="1">Qayta yechish</button>' + (o.xp !== false && !staff() && Object.keys(S().wrong || {}).length ? '<a class="btn" href="#takrorlash">Xatolar ustida ishlash</a>' : '') + '</div></div></div>' + (o.extra || '');
      if (o.onFinish && !sent) { sent = true; o.onFinish({ first: f, total: n, xp }); }
    }
    host.onclick = ev => {
      const b = ev.target.closest('.opt'); if (b) return pick(items[cur], +b.dataset.j);
      if (ev.target.closest('[data-nx]')) { if (cur + 1 < total()) cur++; else done = true; draw(); return; }
      if (ev.target.closest('[data-re]')) { sent = false; start(); }
    };
    host.onkeydown = ev => { const k = '1234abcd'.indexOf(ev.key.toLowerCase()); if (k >= 0 && !done && items[cur].res === null) { const j = k % 4; if (j < items[cur].o.length) pick(items[cur], j); } };
    start();
  }

  /* Xatolar ustida ishlash: birinchi urinishda xato qilingan savollar */
  function review(app) {
    const w = S().wrong || {}, list = Object.values(w).sort((a, b) => b.at - a.at);
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="#bosh">← Bosh sahifa</a><p class="pill-tag"><i></i>Takrorlash</p><h1>Xatolar ustida ishlash</h1><p class="lead">Testlarda birinchi urinishda xato qilgan savollaringiz. To\'g\'ri topgan savolingiz ro\'yxatdan chiqadi.</p></div></section>' +
      '<section class="band"><div class="wrap narrow">' + (list.length ? '<p class="muted">' + list.length + ' ta savol' + (list.length > 10 ? ', har safar 10 tadan' : '') + '</p><div id="rv"></div><h2 class="sec-t">Qaysi darslardan</h2><ul class="plain rv-src">' +
        [...new Map(list.map(x => [x.k, x])).values()].map(x => '<li>' + (x.h ? '<a href="' + e(x.h) + '">' + e(x.t || x.k) + '</a>' : e(x.t || x.k)) + ' <span class="muted">· ' + list.filter(y => y.k === x.k).length + ' ta</span></li>').join('') + '</ul>'
        : '<div class="empty-s"><h3>Xato yo\'q!</h3><p>Testlarda xato qilsangiz, savollar shu yerga tushadi va ularni qayta mashq qilasiz.</p></div>') + '</div></section>';
    if (!list.length) return;
    box(document.getElementById('rv'), list.slice(0, 10).map(x => [x.q, x.o, x.a, x.why]), { key: 'review', xp: false, review: true, onFinish: () => {} });
  }

  /* Daraja: har keyingi daraja ko'proq XP talab qiladi (2: 100, 3: 300, 4: 600, 5: 1000 ...) */
  function level(xp) {
    const lv = Math.max(1, Math.floor((1 + Math.sqrt(1 + Math.max(0, xp) / 12.5)) / 2));
    return { lv, from: 50 * lv * (lv - 1), to: 50 * (lv + 1) * lv };
  }

  KM.quiz = { box, review, mastery, level, XP1, XP2 };
})();
