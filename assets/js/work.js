/* Topshiriqlar (Google Classroom kabi): o'quvchi topshiradi, o'qituvchi baholaydi. Baholar jurnali va Excel'ga eksport. */
(function () {
  const e = KM.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const api = KM.api;
  const fmt = d => d ? new Date(d).toLocaleString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
  const overdue = a => a.due_at && new Date(a.due_at) < new Date();
  const msg = (el, t, ok) => { if (el) { el.textContent = t; el.className = 'msg ' + (ok ? 'ok-t' : 'bad-t'); } };
  async function readFile(input, onp) {
    const f = input.files[0]; if (!f) return null;
    if (f.size > 25 * 1024 * 1024) throw new Error('Fayl 25 MB dan katta. Kichikroq fayl tanlang yoki Google Drive havolasini qo\'ying.');
    return KM.api.upload(f, 'submission', onp);
  }
  async function openFile(id, name) {
    const f = await KM.api.fileBlob(id), url = URL.createObjectURL(f.blob);
    const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener';
    if (!/^(image\/|application\/pdf|text\/)/.test(f.mime)) a.download = name || f.name;
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 60000);
  }
  const status = (a, s) => {
    if (s && s.score != null) return ['graded', 'Baholandi: ' + s.score + ' / ' + a.max_score];
    if (s && s.submitted_at) return ['sent', 'Topshirildi'];
    if (overdue(a)) return ['late', 'Muddati o\'tgan'];
    return ['new', 'Bajarilmagan'];
  };
  KM.work = { status, overdue, fmt };

  /* ---------- O'quvchi ---------- */
  async function list(app) {
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><p class="pill-tag"><i></i>Uyga vazifa va topshiriqlar</p><h1>Topshiriqlar</h1><p class="lead">O\'qituvchi bergan vazifalar. Javobni yozing, havola qo\'ying yoki fayl yuklang (Word, Paint rasm, PDF…). Baho va izoh shu yerda chiqadi.</p></div></section><section class="band"><div class="wrap narrow" id="tl"><p class="muted">Yuklanmoqda…</p></div></section>';
    let xs; try { xs = await api.assignments(); } catch (x) { $('#tl').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; return; }
    const el = $('#tl'); if (!el) return;
    el.innerHTML = xs.length ? '<div class="tk-list">' + xs.map(a => { const [k, t] = status(a, a.sub); return '<a class="tk ' + k + '" href="#topshiriq-' + e(a.id) + '"><span class="tk-s">' + t + '</span><b>' + e(a.title) + '</b><span class="muted">' + (a.due_at ? 'Muddat: ' + fmt(a.due_at) : 'Muddatsiz') + ' · ' + a.max_score + ' ball</span></a>'; }).join('') + '</div>'
      : '<div class="empty-s"><p>Hozircha topshiriq yo\'q.</p></div>';
  }
  async function detail(app, id) {
    let a; try { a = (await api.assignments()).find(x => x.id === id); } catch (x) { return KM.notFound(); }
    if (!a) return KM.notFound();
    const s = a.sub, [k, t] = status(a, s), locked = s && s.score != null;
    const L = a.lesson_ref && KM.infLesson(a.lesson_ref);
    app.innerHTML = '<div class="lbar"><div class="lbar-in"><a class="back" href="#topshiriqlar">← Topshiriqlar</a><h1 class="lt">' + e(a.title) + '</h1><span class="tk-s ' + k + '">' + t + '</span></div></div>' +
      '<section class="band"><div class="wrap inf-lay"><div><div class="theory">' + (KM.md(a.body) || '<p class="muted">Izoh yo\'q.</p>') + '</div>' + (L ? '<p><a class="btn" href="#infdars-' + e(a.lesson_ref) + '">Darsni ochish: ' + e(L.l.t) + '</a></p>' : '') +
      (s && (s.score != null || s.comment) ? '<div class="grade-card"><b>' + (s.score != null ? s.score + ' / ' + a.max_score : 'Izoh') + '</b>' + (s.comment ? '<p>' + e(s.comment) + '</p>' : '') + '</div>' : '') +
      '<form class="panel" id="sf"><h2>' + (s ? 'Mening javobim' : 'Javob topshirish') + '</h2>' +
      '<label class="lab" for="sb">Javob matni</label><textarea class="inp" id="sb" rows="6"' + (locked ? ' disabled' : '') + ' placeholder="Javobingizni yozing">' + e(s && s.body || '') + '</textarea>' +
      '<label class="lab" for="sl">Havola (ixtiyoriy)</label><input class="inp mono" id="sl"' + (locked ? ' disabled' : '') + ' placeholder="https://… (Scratch loyiha, Google Drive)" value="' + e(s && s.link || '') + '">' +
      '<span class="lab">Fayl (25 MB gacha)</span>' + (s && s.file ? '<p><button type="button" class="lnk" id="of">' + e(s.file.name) + '</button></p>' : '') + (locked ? '' : '<label class="btn"><input type="file" id="sfile" hidden>' + (s && s.file ? 'Boshqa fayl tanlash' : 'Fayl tanlash') + '</label> <span class="muted" id="fn"></span>') +
      (locked ? '<p class="muted">Topshiriq baholangan, uni o\'zgartirib bo\'lmaydi.</p>' : '<div class="acts"><button class="btn pri big" id="sgo">' + (s ? 'Qayta topshirish' : 'Topshirish') + '</button><span class="msg" id="sm" role="status"></span></div>') + '</form></div>' +
      '<aside class="inf-side"><div class="hw-card"><b>Muddat</b><p>' + (a.due_at ? fmt(a.due_at) + (overdue(a) ? ' (o\'tgan)' : '') : 'Belgilanmagan') + '</p></div><div class="hw-card blue"><b>Maksimal ball</b><p>' + a.max_score + '</p></div>' + (s ? '<div class="hw-card blue"><b>Topshirilgan</b><p>' + fmt(s.submitted_at) + '</p></div>' : '') + '</aside></div></section>';
    const of = $('#of'); if (of) of.onclick = () => openFile(s.file.id, s.file.name).catch(x => alert(x.message));
    const fi = $('#sfile'); if (fi) fi.onchange = () => { $('#fn').textContent = fi.files[0] ? fi.files[0].name : ''; };
    const f = $('#sf'); if (f && !locked) f.onsubmit = async ev => {
      ev.preventDefault(); const b = $('#sgo'); b.disabled = true;
      try { const file = await readFile($('#sfile'), p => msg($('#sm'), 'Yuklanmoqda… ' + Math.round(p * 100) + '%', true)); await api.submit(id, { body: $('#sb').value, link: $('#sl').value.trim(), file }); msg($('#sm'), 'Topshirildi!', true); if (!s && !KM.store.s.done['t:' + id]) { KM.store.s.done['t:' + id] = { at: Date.now() }; KM.store.addXP(10); } setTimeout(() => detail(app, id), 700); }
      catch (x) { msg($('#sm'), x.message); b.disabled = false; }
    };
  }

  /* ---------- O'qituvchi ---------- */
  async function adminList(app, D) {
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#admin">← Admin panel</a><h1>Topshiriqlar</h1><p class="lead">Vazifa bering, o\'quvchilar topshiradi, siz baholaysiz. Baholar jurnalga avtomatik tushadi.</p></div><div class="acts"><a class="btn pri" href="#admin-topshiriq-yangi-hammasi">+ Yangi topshiriq</a></div></div></section><section class="band"><div class="wrap" id="al"><p class="muted">Yuklanmoqda…</p></div></section>';
    const xs = await api.assignments(), gn = id => (D.classes.find(c => c.id === id) || {}).name;
    $('#al').innerHTML = xs.length ? '<div class="scroll"><table class="tbl"><thead><tr><th>Topshiriq</th><th>Kimga</th><th>Muddat</th><th class="r">Topshirdi</th><th class="r">Baholandi</th></tr></thead><tbody>' + xs.map(a => '<tr><td><a href="#admin-topshiriq-' + e(a.id) + '"><b>' + e(a.title) + '</b></a></td><td>' + (a.group_ids.map(gn).filter(Boolean).map(n => '<span class="tagg">' + e(n) + '</span>').join(' ') || '—') + '</td><td>' + (a.due_at ? fmt(a.due_at) : '—') + '</td><td class="r">' + a.submitted + ' / ' + a.total + '</td><td class="r">' + a.graded + '</td></tr>').join('') + '</tbody></table></div>'
      : '<div class="empty-s"><p>Hali topshiriq yo\'q. Informatika darsidagi uyga vazifani bir bosishda topshiriqqa aylantirish mumkin: "Yangi topshiriq" → "Darsdan olish".</p></div>';
  }
  async function adminForm(app, D, id, gid) {
    let a = null; if (id) { a = (await api.assignments()).find(x => x.id === id); if (!a) return KM.notFound(); }
    const pre = a ? a.group_ids : (gid && gid !== 'hammasi' ? [gid] : []);
    const loc = d => { if (!d) return ''; const x = new Date(d); x.setMinutes(x.getMinutes() - x.getTimezoneOffset()); return x.toISOString().slice(0, 16); };
    const gl = list => list.map(c => '<label class="chk"><input type="checkbox" name="ag" value="' + e(c.id) + '"' + (pre.includes(c.id) ? ' checked' : '') + '><span>' + e(c.name) + ' <small class="muted">' + (c.kind === 'togarak' ? 'to\'garak' : c.grade + '-sinf') + '</small></span></label>').join('') || '<p class="muted">Yo\'q</p>';
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="#admin-topshiriqlar">← Topshiriqlar</a><h1>' + (a ? 'Topshiriqni tahrirlash' : 'Yangi topshiriq') + '</h1></div></section><section class="band"><div class="wrap two"><form class="panel" id="af"><h2>Topshiriq</h2>' +
      '<details class="imp"><summary>Informatika darsidagi uyga vazifadan olish</summary><div class="row-f"><div><label class="lab" for="ig">Sinf</label><select class="inp" id="ig">' + KM.infGrades.map(g => '<option value="' + g.n + '">' + g.n + '-sinf</option>').join('') + '</select></div><div style="flex:3 1 260px"><label class="lab" for="il">Dars</label><select class="inp" id="il"></select></div><div class="acts" style="margin:0"><button type="button" class="btn" id="iuse">Olish</button></div></div></details>' +
      '<label class="lab" for="at">Sarlavha</label><input class="inp" id="at" maxlength="120" value="' + e(a ? a.title : '') + '" required><label class="lab" for="ab">Vazifa matni <small class="muted">(**qalin**, - ro\'yxat)</small></label><textarea class="inp" id="ab" rows="7">' + e(a && a.body || '') + '</textarea>' +
      '<div class="row-f"><div><label class="lab" for="ad">Muddat</label><input class="inp" type="datetime-local" id="ad" value="' + loc(a && a.due_at) + '"></div><div><label class="lab" for="am">Maksimal ball</label><select class="inp" id="am">' + [5, 10, 20, 100].map(n => '<option' + ((a ? a.max_score : 5) === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select></div></div><input type="hidden" id="ar" value="' + e(a && a.lesson_ref || '') + '">' +
      '<div class="acts"><button class="btn pri big">Saqlash</button>' + (a ? '<button type="button" class="btn" id="adel">O\'chirish</button>' : '') + '<span class="msg" id="amsg" role="status"></span></div></form>' +
      '<div class="panel"><h2>Kimga beriladi?</h2><h3 class="sub3">Sinflar</h3><div class="chks col">' + gl(D.classes.filter(c => c.kind !== 'togarak')) + '</div><h3 class="sub3">To\'garaklar</h3><div class="chks col">' + gl(D.classes.filter(c => c.kind === 'togarak')) + '</div></div></div></section>';
    const fill = () => { const g = KM.infGrades.find(g => g.n === +$('#ig').value); $('#il').innerHTML = g.lessons.map(l => '<option value="' + l.n + '">' + l.n + '. ' + e(l.t.slice(0, 70)) + '</option>').join(''); };
    fill(); $('#ig').onchange = fill;
    $('#iuse').onclick = () => { const L = KM.infLesson($('#ig').value + '-' + $('#il').value); $('#at').value = (L.g.n + '-sinf, ' + L.l.n + '-dars: ' + L.l.t).slice(0, 120); $('#ab').value = L.l.hw; $('#ar').value = L.id; $$('input[name=ag]').forEach(x => { const c = D.classes.find(c => c.id === x.value); if (c && c.kind === 'sinf' && c.grade === L.g.n) x.checked = true; }); };
    $('#af').onsubmit = async ev => {
      ev.preventDefault();
      const d = $('#ad').value ? new Date($('#ad').value).toISOString() : '';
      try { const r = await api.admin.saveAssignment(a ? a.id : null, { title: $('#at').value, body: $('#ab').value, due_at: d, max_score: +$('#am').value, lesson_ref: $('#ar').value, group_ids: $$('input[name=ag]:checked').map(x => x.value) }); location.hash = 'admin-topshiriq-' + r.id; }
      catch (x) { msg($('#amsg'), x.message); }
    };
    if (a) KM.ui.confirmBtn($('#adel'), 'Javoblar ham o\'chadi. Yana bosing', async () => { await api.admin.deleteAssignment(a.id); location.hash = 'admin-topshiriqlar'; });
  }
  async function adminSubs(app, id) {
    let r; try { r = await api.admin.submissions(id); } catch (x) { return KM.notFound(); }
    const a = r.assignment, rows = r.rows, done = rows.filter(x => x.sub && x.sub.submitted_at).length;
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#admin-topshiriqlar">← Topshiriqlar</a><h1>' + e(a.title) + '</h1><p class="lead">' + (a.due_at ? 'Muddat: ' + fmt(a.due_at) + ' · ' : '') + done + ' / ' + rows.length + ' topshirdi · maksimal ' + a.max_score + ' ball</p></div><div class="acts"><a class="btn ghost" href="#admin-topshiriq-tahrir-' + e(a.id) + '">Tahrirlash</a></div></div></section>' +
      '<section class="band"><div class="wrap"><div class="chipf" id="sfilt"><button class="on" data-f="all">Hammasi (' + rows.length + ')</button><button data-f="sent">Tekshirilmagan (' + rows.filter(x => x.sub && x.sub.submitted_at && x.sub.score == null).length + ')</button><button data-f="none">Topshirmagan (' + rows.filter(x => !(x.sub && x.sub.submitted_at)).length + ')</button><button data-f="graded">Baholangan (' + rows.filter(x => x.sub && x.sub.score != null).length + ')</button></div><div class="subs" id="sl">' +
      rows.map((x, i) => { const s = x.sub, u = x.user, kind = s && s.score != null ? 'graded' : s && s.submitted_at ? 'sent' : 'none'; return '<div class="sub ' + kind + '" data-k="' + kind + '"><div class="sub-h"><span class="fc">' + KM.stk.face(u) + '</span><div><b>' + e(u.full_name) + '</b><small class="muted">' + e(u.class_name || '') + ' · ' + (s && s.submitted_at ? 'topshirdi ' + fmt(s.submitted_at) + (a.due_at && new Date(s.submitted_at) > new Date(a.due_at) ? ' (kech)' : '') : 'topshirmagan') + '</small></div></div>' +
        (s && (s.body || s.link || s.file) ? '<div class="sub-b">' + (s.body ? '<p>' + e(s.body).replace(/\n/g, '<br>') + '</p>' : '') + (s.link ? '<p><a href="' + e(s.link) + '" target="_blank" rel="noopener">' + e(s.link) + '</a></p>' : '') + (s.file ? '<p><button class="lnk" data-file="' + e(s.file.id) + '" data-name="' + e(s.file.name) + '">📎 ' + e(s.file.name) + '</button></p>' : '') + '</div>' : '') +
        '<form class="sub-g" data-u="' + e(u.id) + '"><label class="vh" for="g' + i + '">Ball</label><select class="inp" id="g' + i + '"><option value="">—</option>' + Array.from({ length: a.max_score + 1 }, (_, n) => '<option' + (s && s.score === n ? ' selected' : '') + '>' + n + '</option>').join('') + '</select><label class="vh" for="c' + i + '">Izoh</label><input class="inp" id="c' + i + '" placeholder="Izoh (ixtiyoriy)" value="' + e(s && s.comment || '') + '"><button class="btn sm pri">Saqlash</button><span class="msg"></span></form></div>'; }).join('') + '</div></div></section>';
    $$('#sfilt button').forEach(b => b.onclick = () => { $$('#sfilt button').forEach(x => x.classList.toggle('on', x === b)); $$('#sl .sub').forEach(el => { el.hidden = b.dataset.f !== 'all' && el.dataset.k !== b.dataset.f; }); });
    $$('[data-file]').forEach(b => b.onclick = () => openFile(b.dataset.file, b.dataset.name).catch(x => alert(x.message)));
    $$('.sub-g').forEach(f => f.onsubmit = async ev => {
      ev.preventDefault(); const sc = $('select', f).value;
      try { await api.admin.grade(id, f.dataset.u, sc === '' ? null : +sc, $('input', f).value); msg($('.msg', f), 'Saqlandi', true); const card = f.closest('.sub'); card.className = 'sub ' + (sc === '' ? 'sent' : 'graded'); card.dataset.k = sc === '' ? 'sent' : 'graded'; }
      catch (x) { msg($('.msg', f), x.message); }
    });
  }
  /* Baholar jurnali + CSV (Excel ochadi) */
  async function gradebook(app, D, gid) {
    const g = D.classes.find(c => c.id === gid); if (!g) return KM.notFound();
    const r = await api.admin.gradebook(gid), sc = {};
    r.scores.forEach(x => { sc[x.a + '|' + x.u] = x; });
    const cell = (a, u) => { const x = sc[a.id + '|' + u.id]; return x ? (x.score != null ? x.score : '✓') : ''; };
    const avg = u => { const v = r.assignments.map(a => sc[a.id + '|' + u.id]).filter(x => x && x.score != null).map((x, i) => x.score / (r.assignments.find(a => a.id === x.a).max_score) * 5); return v.length ? (v.reduce((p, q) => p + q, 0) / v.length).toFixed(1) : ''; };
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#admin-sinf-' + e(gid) + '">← ' + e(g.name) + '</a><h1>Jurnal: ' + e(g.name) + '</h1><p class="lead">' + r.students.length + ' o\'quvchi · ' + r.assignments.length + ' topshiriq. ✓ — topshirgan, baholanmagan. O\'rtacha — 5 ballik tizimda.</p></div><div class="acts"><button class="btn pri" id="csv">Excel\'ga yuklab olish</button><a class="btn ghost" href="#admin-topshiriq-yangi-' + e(gid) + '">+ Topshiriq</a></div></div></section>' +
      '<section class="band"><div class="wrap"><div class="scroll"><table class="tbl jr"><thead><tr><th>#</th><th>O\'quvchi</th>' + r.assignments.map(a => '<th class="r" title="' + e(a.title) + '"><a href="#admin-topshiriq-' + e(a.id) + '">' + e(a.title.slice(0, 18)) + (a.title.length > 18 ? '…' : '') + '</a><small>/' + a.max_score + '</small></th>').join('') + '<th class="r">O\'rtacha</th><th class="r">Darslar</th><th class="r">XP</th></tr></thead><tbody>' +
      r.students.map((u, i) => '<tr><td>' + (i + 1) + '</td><td><a href="#admin-oquvchi-' + e(u.id) + '">' + e(u.full_name) + '</a></td>' + r.assignments.map(a => '<td class="r">' + cell(a, u) + '</td>').join('') + '<td class="r"><b>' + avg(u) + '</b></td><td class="r">' + u.lessons_done + '</td><td class="r">' + u.xp + '</td></tr>').join('') + '</tbody></table></div>' +
      (r.students.length ? '' : '<div class="empty-s"><p>Bu guruhda o\'quvchi yo\'q.</p></div>') + '</div></section>';
    $('#csv').onclick = () => {
      const q = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
      const head = ['#', 'O\'quvchi', 'Login', ...r.assignments.map(a => a.title + ' (/' + a.max_score + ')'), 'O\'rtacha (5 ballik)', 'Darslar', 'XP'];
      const rows = r.students.map((u, i) => [i + 1, u.full_name, u.login, ...r.assignments.map(a => cell(a, u)), avg(u).replace('.', ','), u.lessons_done, u.xp]);
      const csv = '﻿' + [head, ...rows].map(row => row.map(q).join(';')).join('\r\n');
      KM.ui.download('jurnal-' + g.name.replace(/[^\w-]+/g, '_') + '-' + new Date().toISOString().slice(0, 10) + '.csv', csv, 'text/csv;charset=utf-8');
    };
  }

  KM.work.student = (h, app) => h === 'topshiriqlar' ? list(app) : detail(app, h.slice(10));
  KM.work.admin = (h, app, D) => {
    if (h === 'admin-topshiriqlar') return adminList(app, D);
    if (h.startsWith('admin-topshiriq-yangi-')) return adminForm(app, D, null, h.slice(22));
    if (h.startsWith('admin-topshiriq-tahrir-')) return adminForm(app, D, h.slice(23));
    if (h.startsWith('admin-topshiriq-')) return adminSubs(app, h.slice(16));
    if (h.startsWith('admin-jurnal-')) return gradebook(app, D, h.slice(13));
    return false;
  };
})();
