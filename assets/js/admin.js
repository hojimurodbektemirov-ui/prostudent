/* Admin panel: sinflar, to'garaklar, o'quvchilar, login-parollar, rasm/stiker, materiallar. */
(function () {
  const e = KM.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const api = KM.api.admin, face = KM.stk.face;
  let D = null, lastCreds = [], seq = 0;
  const totalCode = () => KM.grades.reduce((a, g) => a + g.lessons.length, 0);
  const siteUrl = () => location.origin + location.pathname.replace(/index\.html$/, '');
  const CN = { informatika: 'Informatika', dasturlash: 'Dasturlash' };
  const X = u => (u.xp || 0) + (u.bonus_xp || 0);
  function ago(t) {
    if (!t) return 'hali kirmagan';
    const m = (Date.now() - new Date(t).getTime()) / 6e4;
    if (m < 5) return 'hozir onlayn'; if (m < 60) return Math.round(m) + ' daqiqa oldin';
    if (m < 1440) return Math.round(m / 60) + ' soat oldin'; if (m < 2880) return 'kecha';
    return Math.round(m / 1440) + ' kun oldin';
  }
  const active = t => t && Date.now() - new Date(t).getTime() < 864e5;
  const sinflar = () => D.classes.filter(c => c.kind !== 'togarak'), togaraklar = () => D.classes.filter(c => c.kind === 'togarak');
  const classOpts = (sel, empty) => '<option value="">' + (empty || 'Sinfsiz') + '</option>' + sinflar().map(c => '<option value="' + e(c.id) + '"' + (c.id === sel ? ' selected' : '') + '>' + e(c.name) + '</option>').join('');
  const clubOpts = sel => '<option value="">— tanlang —</option>' + togaraklar().map(c => '<option value="' + e(c.id) + '"' + (c.id === sel ? ' selected' : '') + '>' + e(c.name) + '</option>').join('');
  const gradeOpts = (sel, word) => Array.from({ length: 11 }, (_, i) => '<option value="' + (i + 1) + '"' + (i + 1 === sel ? ' selected' : '') + '>' + (i + 1) + '-' + (word || 'sinf') + '</option>').join('');
  const courseChecks = (cur, pre) => Object.keys(CN).map(k => '<label class="chk"><input type="checkbox" name="' + pre + 'c" value="' + k + '"' + (cur.includes(k) ? ' checked' : '') + '><span>' + CN[k] + '</span></label>').join('');
  const checked = name => $$('input[name="' + name + '"]:checked').map(x => x.value);
  const msg = (el, t, ok) => { if (!el) return; el.textContent = t; el.className = 'msg ' + (ok ? 'ok-t' : 'bad-t'); };
  function toast(t, ok) { const d = document.createElement('div'); d.className = 'toast' + (ok ? ' ok' : ''); d.setAttribute('role', 'status'); d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 4000); }
  function fail(app, x) {
    if (x.code === 'SESSION') { KM.logout(); return; }
    app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Ma\'lumot yuklanmadi</h1><p>' + e(x.message) + '</p><button class="btn pri" onclick="KM.route()">Qayta urinish</button></div></section>';
  }
  const studentsOf = c => c === 'yoq' ? D.students.filter(s => !s.class_id) : c.kind === 'togarak' ? D.students.filter(s => (c.member_ids || []).includes(s.id)) : D.students.filter(s => s.class_id === c.id);
  const reload = async () => { D = await api.overview(); KM._allGroups = D.classes; };

  async function route(h, app) {
    const my = ++seq;
    if (h === 'admin-dastur') { app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="#admin">← Admin panel</a><h1>Dasturlash kursi tarkibi</h1><p class="lead">1–11-daraja darslari va yangi dars qo\'shish tartibi.</p></div></section><section class="band"><div class="wrap narrow">' + KM.curriculum() + '</div></section>'; return; }
    if (h === 'admin-kartochkalar') return cards(app);
    if (!D) app.innerHTML = '<div class="splash grid-bg"><span class="caret"></span></div>';
    try { await reload(); } catch (x) { return fail(app, x); }
    if (my !== seq) return;
    if (KM.work.admin(h, app, D) !== false) return;
    if (h === 'admin') dash(app);
    else if (h.startsWith('admin-sinf-')) group(app, h.slice(11));
    else if (h.startsWith('admin-oquvchi-')) student(app, h.slice(14));
    else if (h.startsWith('admin-yangi-')) add(app, h.slice(12));
    else if (h === 'admin-materiallar') matList(app);
    else if (h.startsWith('admin-material-yangi-')) matForm(app, null, h.slice(21));
    else if (h.startsWith('admin-material-')) matForm(app, h.slice(15));
    else KM.notFound();
  }

  /* ---------- Bosh panel ---------- */
  function gcard(c) {
    const ss = studentsOf(c), done = ss.length ? Math.round(ss.reduce((a, s) => a + s.lessons_done, 0) / ss.length) : 0;
    return '<a class="cls ' + c.kind + '" href="#admin-sinf-' + e(c.id) + '"><span class="cls-top"><span class="cls-n">' + e(c.name) + '</span><span class="grp-k">' + (c.kind === 'togarak' ? 'To\'garak' : 'Sinf') + '</span></span><span class="cls-g">' + (c.kind === 'togarak' ? c.grade + '-daraja' : c.grade + '-sinf dasturi') + ' · ' + ss.length + ' o\'quvchi</span>' +
      '<span class="crs">' + (c.courses || []).map(k => '<i>' + CN[k] + '</i>').join('') + '</span>' + (c.about ? '<span class="cls-m">' + e(c.about) + '</span>' : '') +
      '<span class="faces">' + ss.slice(0, 6).map(s => '<span class="fc">' + face(s) + '</span>').join('') + (ss.length > 6 ? '<span class="fc more">+' + (ss.length - 6) + '</span>' : '') + '</span><span class="cls-m">O\'rtacha ' + done + ' ta dars o\'qilgan</span></a>';
  }
  const newGroupForm = kind => '<form class="cls newc" data-kind="' + kind + '"><span class="cls-n">+ ' + (kind === 'togarak' ? 'Yangi to\'garak' : 'Yangi sinf') + '</span><label class="lab">Nomi</label><input class="inp" name="nm" placeholder="' + (kind === 'togarak' ? 'Masalan: Web dasturlash' : 'Masalan: 5-A') + '" maxlength="40" required><label class="lab">' + (kind === 'togarak' ? 'Daraja (Dasturlash kursi)' : 'Sinf dasturi (Informatika rejasi)') + '</label><select class="inp" name="gr">' + gradeOpts(kind === 'togarak' ? 5 : 5, kind === 'togarak' ? 'daraja' : 'sinf') + '</select><span class="lab">Kurslar</span><div class="chks">' + courseChecks(kind === 'togarak' ? ['dasturlash'] : ['informatika'], kind) + '</div>' + (kind === 'togarak' ? '<label class="lab">Jadval yoki izoh</label><input class="inp" name="ab" placeholder="Shanba, 10:00 · kompyuter sinfi" maxlength="200">' : '') + '<button class="btn pri">Qo\'shish</button><span class="msg" role="status"></span></form>';
  function dash(app) {
    const S = D.students, today = S.filter(s => active(s.last_seen)).length;
    const top = S.slice().sort((a, b) => X(b) - X(a)).slice(0, 6), recent = S.filter(s => s.last_seen).sort((a, b) => new Date(b.last_seen) - new Date(a.last_seen)).slice(0, 6);
    const noClass = S.filter(s => !s.class_id).length;
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><p class="pill-tag"><i></i>Admin panel' + (KM.api.mode === 'demo' ? ' · demo rejim' : '') + '</p><h1>Salom, ' + e(KM.session.user.full_name.split(' ')[0]) + '! <span class="hl">Hammasi</span> bir joyda.</h1>' +
      '<div class="kpis"><div><b>' + sinflar().length + '</b><span>sinf</span></div><div><b>' + togaraklar().length + '</b><span>to\'garak</span></div><div><b>' + S.length + '</b><span>o\'quvchi</span></div><div><b>' + today + '</b><span>bugun faol</span></div></div>' +
      '<div class="acts"><a class="btn pri" href="#admin-yangi-' + (sinflar()[0] ? sinflar()[0].id : 'yoq') + '">+ O\'quvchi qo\'shish</a><a class="btn ghost" href="#admin-topshiriq-yangi-hammasi">+ Topshiriq</a><a class="btn ghost" href="#viktorina">Viktorina</a><a class="btn ghost" href="#admin-material-yangi-hammasi">+ Material</a><a class="btn ghost" href="#admin-materiallar">Materiallar</a></div></div></section>' +
      '<section class="band"><div class="wrap"><div class="sec-h"><h2>Sinflar</h2><span class="muted">Fan darslari: Informatika rejasi, materiallar</span></div><div class="cls-grid">' + sinflar().map(gcard).join('') +
      (noClass ? '<a class="cls ghostc" href="#admin-sinf-yoq"><span class="cls-n">Sinfsiz</span><span class="cls-g">' + noClass + ' o\'quvchi sinfga biriktirilmagan</span></a>' : '') + newGroupForm('sinf') + '</div></div></section>' +
      '<section class="band alt"><div class="wrap"><div class="sec-h"><h2>To\'garaklar</h2><span class="muted">Istalgan sinfdan o\'quvchi qo\'shiladi · Dasturlash kursi</span></div><div class="cls-grid">' + togaraklar().map(gcard).join('') + newGroupForm('togarak') + '</div></div></section>' +
      (S.length ? '<section class="band"><div class="wrap two"><div><h2>Eng faol o\'quvchilar</h2><ol class="lb">' + top.map((s, i) => '<li><span class="lb-r">' + (i + 1) + '</span><span class="fc">' + face(s) + '</span><a href="#admin-oquvchi-' + e(s.id) + '">' + e(s.full_name) + '<small>' + e(s.class_name || 'Sinfsiz') + '</small></a><b>' + X(s) + ' XP</b></li>').join('') + '</ol></div>' +
        '<div><h2>So\'nggi faollik</h2>' + (recent.length ? '<ol class="lb">' + recent.map(s => '<li><span class="fc">' + face(s) + '</span><a href="#admin-oquvchi-' + e(s.id) + '">' + e(s.full_name) + '<small>' + e(s.class_name || 'Sinfsiz') + '</small></a><span class="muted">' + ago(s.last_seen) + '</span></li>').join('') + '</ol>' : '<p class="muted">Hali hech kim kirmagan.</p>') + '</div></div></section>' : '');
    $$('form.newc').forEach(f => f.onsubmit = async ev => {
      ev.preventDefault(); const k = f.dataset.kind;
      try { const c = await api.saveGroup(null, { name: f.nm.value, grade: +f.gr.value, kind: k, courses: checked(k + 'c'), about: f.ab ? f.ab.value : '' }); location.hash = 'admin-sinf-' + c.id; }
      catch (x) { msg($('.msg', f), x.message); }
    });
  }

  /* ---------- Sinf yoki to'garak sahifasi ---------- */
  function group(app, id) {
    const none = id === 'yoq', c = none ? null : D.classes.find(c => c.id === id);
    if (!c && !none) return KM.notFound();
    const club = c && c.kind === 'togarak', ss = studentsOf(none ? 'yoq' : c);
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#admin">← Admin panel</a><p class="pill-tag"><i></i>' + (none ? 'Biriktirilmaganlar' : club ? 'To\'garak' : 'Sinf') + '</p><h1>' + (none ? 'Sinfsiz o\'quvchilar' : e(c.name)) + '</h1><p class="lead">' + (none ? '' : (club ? c.grade + '-daraja' : c.grade + '-sinf dasturi') + ' · ' + ((c.courses || []).map(k => CN[k]).join(', ') || 'kurs biriktirilmagan') + ' · ') + ss.length + ' o\'quvchi' + (c && c.about ? '<br>' + e(c.about) : '') + '</p></div>' +
      '<div class="acts">' + (club ? '<button class="btn pri" id="addm">+ A\'zo qo\'shish</button><a class="btn ghost" href="#admin-yangi-' + e(id) + '">+ Yangi o\'quvchi</a>' : '<a class="btn pri" href="#admin-yangi-' + e(id) + '">+ O\'quvchi qo\'shish</a>') + (none ? '' : '<a class="btn ghost" href="#admin-jurnal-' + e(id) + '">Jurnal</a><a class="btn ghost" href="#admin-topshiriq-yangi-' + e(id) + '">+ Topshiriq</a><a class="btn ghost" href="#admin-material-yangi-' + e(id) + '">+ Material</a><button class="btn ghost" id="edit">Tahrirlash</button>') + '</div></div></section>' +
      (c && !club && (c.courses || []).includes('informatika') && KM.infGrades.some(x => x.n === c.grade) ? (() => { const IG = KM.infGrades.find(x => x.n === c.grade), op = c.inf_open, cur = op == null ? null : IG.lessons.find(l => l.n === op); return '<section class="band slim"><div class="wrap"><div class="panel open-ctl"><div><h2>Informatika: ochiq darslar</h2><p class="muted">' + (op == null ? 'Hamma ' + IG.lessons.length + ' ta dars ochiq.' : '1–' + op + '-darslar ochiq' + (cur ? ' (oxirgisi: ' + e(cur.t) + ')' : '') + '. Keyingilari o\'quvchilarga yopiq.') + '</p></div><div class="acts" style="margin:0"><button class="btn pri" data-open="next">+1 darsni ochish</button><label class="vh" for="opn">Nechanchi dargacha</label><input class="inp num" id="opn" type="number" min="0" max="' + IG.lessons.length + '" value="' + (op == null ? IG.lessons.length : op) + '"><button class="btn" data-open="set">Saqlash</button><button class="btn" data-open="all">Hammasini ochish</button></div></div></div></section>'; })() : '') +
      (none ? '' : '<section class="band slim" id="editsec" hidden><div class="wrap"><form class="panel" id="cf"><h2>' + (club ? 'To\'garakni' : 'Sinfni') + ' tahrirlash</h2><div class="row-f"><div><label class="lab" for="cn">Nomi</label><input class="inp" id="cn" value="' + e(c.name) + '" maxlength="40"></div><div><label class="lab" for="cg">' + (club ? 'Daraja' : 'Sinf dasturi') + '</label><select class="inp" id="cg">' + gradeOpts(c.grade, club ? 'daraja' : 'sinf') + '</select></div></div><span class="lab">Kurslar</span><div class="chks">' + courseChecks(c.courses || [], 'ed') + '</div><label class="lab" for="ca">Jadval yoki izoh</label><input class="inp" id="ca" value="' + e(c.about || '') + '" maxlength="200" placeholder="Masalan: Seshanba, 15:00"><div class="acts"><button class="btn pri">Saqlash</button><button type="button" class="btn" id="cdel">' + (club ? 'To\'garakni' : 'Sinfni') + ' o\'chirish</button><span class="msg" id="cm" role="status"></span></div><p class="muted">' + (club ? 'To\'garak o\'chirilsa, o\'quvchilar o\'chmaydi: faqat a\'zolik bekor bo\'ladi.' : 'Sinf o\'chirilsa, o\'quvchilar o\'chmaydi: ular "Sinfsiz" bo\'limiga o\'tadi.') + '</p></form></div></section>') +
      (club ? '<section class="band slim" id="pick" hidden><div class="wrap"><div class="panel"><h2>A\'zo qo\'shish</h2><div class="row-f"><div><label class="lab" for="pq">Qidirish</label><input class="inp" id="pq" placeholder="Ism yoki login"></div><div><label class="lab" for="pc">Sinf</label><select class="inp" id="pc">' + classOpts('', 'Barcha sinflar') + '</select></div></div><div class="pick-list" id="pl"></div><div class="acts"><button class="btn pri" id="padd">Tanlanganlarni qo\'shish</button><button class="btn" id="pclose">Yopish</button><span class="msg" id="pm" role="status"></span></div></div></div></section>' : '') +
      '<section class="band"><div class="wrap">' + (ss.length ? '<div class="sel-bar"><button class="btn sm" id="selm">Tanlash</button><div id="bulk" hidden><b id="bn">0 ta tanlandi</b>' +
        (club ? '<button class="btn sm" data-b="rm">To\'garakdan chiqarish</button>' : '<label class="vh" for="mv">Qaysi sinfga</label><select class="inp sm" id="mv">' + classOpts('', 'Sinfsiz') + '</select><button class="btn sm" data-b="mv">Ko\'chirish</button>' + (togaraklar().length ? '<label class="vh" for="tc">To\'garak</label><select class="inp sm" id="tc">' + clubOpts() + '</select><button class="btn sm" data-b="tc">To\'garakka qo\'shish</button>' : '')) +
        '<label class="vh" for="aw">Rag\'bat</label><select class="inp sm" id="aw"><option value="zor|10">Zo\'r! +10 XP</option><option value="star|10">Yulduz +10 XP</option><option value="alo|25">A\'lo +25 XP</option><option value="crown|50">Toj +50 XP</option><option value="|5">+5 XP (stikersiz)</option></select><button class="btn sm" data-b="aw">Rag\'batlantirish</button>' +
        '<button class="btn sm" data-b="pw">Parollarni yangilash</button></div></div>' +
        '<div class="pol-grid" id="pg">' + ss.map((s, i) => '<a class="polaroid ' + (i % 2 ? 'tilt-r' : 'tilt-l') + '" href="#admin-oquvchi-' + e(s.id) + '" data-id="' + e(s.id) + '"><span class="pick-c" aria-hidden="true"></span>' + face(s) + '<span class="pol-name">' + e(s.full_name) + '</span><span class="pol-cap">' + e(s.login) + (club && s.class_name ? ' · ' + e(s.class_name) : '') + '</span><span class="pol-st"><b>' + X(s) + ' XP</b><span>' + s.lessons_done + ' dars</span><span class="' + (active(s.last_seen) ? 'on' : '') + '">' + ago(s.last_seen) + '</span></span></a>').join('') + '</div>' +
        '<h2 class="sub">Natijalar jadvali</h2><div class="scroll"><table class="tbl"><thead><tr><th>#</th><th>O\'quvchi</th><th>Login</th><th class="r">XP</th><th class="r">Darslar</th><th>Oxirgi kirish</th></tr></thead><tbody>' + ss.slice().sort((a, b) => X(b) - X(a)).map((s, i) => '<tr><td>' + (i + 1) + '</td><td><a href="#admin-oquvchi-' + e(s.id) + '">' + e(s.full_name) + '</a></td><td><code>' + e(s.login) + '</code></td><td class="r">' + X(s) + '</td><td class="r">' + s.lessons_done + '</td><td>' + ago(s.last_seen) + '</td></tr>').join('') + '</tbody></table></div>'
        : '<div class="empty-s"><p>' + (club ? 'To\'garakda hali a\'zo yo\'q. "A\'zo qo\'shish" ni bosing va istalgan sinfdan o\'quvchilarni tanlang.' : 'Bu sinfda hali o\'quvchi yo\'q. "O\'quvchi qo\'shish" ni bosing: bittadan yoki ro\'yxat bilan birdaniga.') + '</p></div>') +
      (none ? '' : '<div class="sec-h" style="margin-top:36px"><h2 class="sub0">Materiallar</h2><a class="btn" href="#admin-material-yangi-' + e(id) + '">+ Material qo\'shish</a></div><div class="mat-grid" id="gm"><p class="muted">Yuklanmoqda…</p></div>') + '</div></section>';
    if (!none) KM.api.materials().then(ms => { const el = $('#gm'), list = ms.filter(m => (m.group_ids || []).includes(id)); if (el) el.innerHTML = list.length ? list.map(m => KM.matCard(m).replace('href="#material-', 'href="#admin-material-')).join('') : '<div class="empty-s"><p>Bu ' + (club ? 'to\'garak' : 'sinf') + 'ga hali material biriktirilmagan.</p></div>'; }, () => {});
    // tanlash rejimi
    let selMode = false; const sel = new Set();
    const upd = () => { const b = $('#bulk'); if (!b) return; b.hidden = !selMode; $('#bn').textContent = sel.size + ' ta tanlandi'; $$('#pg .polaroid').forEach(p => p.classList.toggle('picked', sel.has(p.dataset.id))); $('#pg') && $('#pg').classList.toggle('selmode', selMode); };
    const sm = $('#selm'); if (sm) sm.onclick = () => { selMode = !selMode; sel.clear(); sm.textContent = selMode ? 'Bekor qilish' : 'Tanlash'; upd(); };
    const pg = $('#pg'); if (pg) pg.addEventListener('click', ev => { if (!selMode) return; const p = ev.target.closest('.polaroid'); if (!p) return; ev.preventDefault(); sel.has(p.dataset.id) ? sel.delete(p.dataset.id) : sel.add(p.dataset.id); upd(); });
    $$('#bulk [data-b]').forEach(b => b.onclick = async () => {
      if (!sel.size) return toast('Avval o\'quvchilarni tanlang');
      const ids = [...sel], k = b.dataset.b;
      try {
        if (k === 'mv') { await api.moveStudents(ids, $('#mv').value || null); toast(ids.length + ' ta o\'quvchi ko\'chirildi', true); }
        else if (k === 'tc') { if (!$('#tc').value) return toast('To\'garakni tanlang'); await api.setMembers($('#tc').value, ids, []); toast(ids.length + ' ta o\'quvchi to\'garakka qo\'shildi', true); }
        else if (k === 'rm') { await api.setMembers(id, [], ids); toast(ids.length + ' ta o\'quvchi chiqarildi', true); }
        else if (k === 'pw') { lastCreds = await api.resetPasswords(ids); location.hash = 'admin-kartochkalar'; return; }
        else if (k === 'aw') { const [sk, xp] = $('#aw').value.split('|'); for (const uid of ids) await api.award(uid, sk ? { k: sk, x: .2 + Math.random() * .6, y: .2 + Math.random() * .6, s: .3, r: Math.round(Math.random() * 30 - 15) } : null, +xp, 'Darsdagi faollik'); toast(ids.length + ' ta o\'quvchi rag\'batlantirildi', true); }
        KM.route();
      } catch (x) { toast(x.message); }
    });
    $$('[data-open]').forEach(b => b.onclick = async () => {
      const IG = KM.infGrades.find(x => x.n === c.grade), n = IG.lessons.length, k = b.dataset.open;
      const v = k === 'all' ? null : k === 'next' ? Math.min(n, (c.inf_open == null ? 0 : c.inf_open) + 1) : Math.max(0, Math.min(n, +$('#opn').value || 0));
      try { await api.saveGroup(id, { name: c.name, grade: c.grade, courses: c.courses, about: c.about || '', inf_open: v == null || v >= n ? '' : v }); toast(v == null || v >= n ? 'Hamma darslar ochildi' : '1–' + v + '-darslar ochiq', true); KM.route(); } catch (x) { toast(x.message); }
    });
    if (none) return;
    $('#edit').onclick = () => { $('#editsec').hidden = !$('#editsec').hidden; };
    $('#cf').onsubmit = async ev => { ev.preventDefault(); try { await api.saveGroup(id, { name: $('#cn').value, grade: +$('#cg').value, courses: checked('edc'), about: $('#ca').value }); KM.route(); } catch (x) { msg($('#cm'), x.message); } };
    KM.ui.confirmBtn($('#cdel'), 'Rostdan o\'chirilsinmi? Yana bosing', async () => { try { await api.deleteClass(id); location.hash = 'admin'; } catch (x) { msg($('#cm'), x.message); } });
    if (club) {
      const draw = () => {
        const q = $('#pq').value.trim().toLowerCase(), cl = $('#pc').value;
        const list = D.students.filter(s => !(c.member_ids || []).includes(s.id) && (!cl || s.class_id === cl) && (!q || s.full_name.toLowerCase().includes(q) || s.login.includes(q)));
        $('#pl').innerHTML = list.length ? list.map(s => '<label class="pick"><input type="checkbox" value="' + e(s.id) + '"><span class="fc">' + face(s) + '</span><span><b>' + e(s.full_name) + '</b><small>' + e(s.class_name || 'Sinfsiz') + ' · ' + e(s.login) + '</small></span></label>').join('') : '<p class="muted">Mos o\'quvchi topilmadi.</p>';
      };
      $('#addm').onclick = () => { $('#pick').hidden = false; draw(); $('#pq').focus(); };
      $('#pclose').onclick = () => { $('#pick').hidden = true; };
      $('#pq').oninput = draw; $('#pc').onchange = draw;
      $('#padd').onclick = async () => { const ids = $$('#pl input:checked').map(x => x.value); if (!ids.length) return msg($('#pm'), 'Hech kim tanlanmadi'); try { await api.setMembers(id, ids, []); toast(ids.length + ' ta a\'zo qo\'shildi', true); KM.route(); } catch (x) { msg($('#pm'), x.message); } };
    }
  }

  /* ---------- O'quvchi qo'shish ---------- */
  function add(app, gid) {
    const g = D.classes.find(c => c.id === gid), club = g && g.kind === 'togarak', cid = g && !club ? g.id : '';
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="' + (g ? '#admin-sinf-' + e(g.id) : '#admin') + '">← ' + (g ? e(g.name) : 'Admin panel') + '</a><h1>O\'quvchi qo\'shish</h1><p class="lead">Login va parol avtomatik yaratiladi. Parol faqat hozir ko\'rsatiladi: yozib oling yoki kartochkani chop eting.</p><div class="seg" role="tablist"><button class="on" data-m="one" role="tab" aria-selected="true">Bitta o\'quvchi</button><button data-m="many" role="tab" aria-selected="false">Ro\'yxat bilan (ko\'p)</button></div></div></section>' +
      '<section class="band"><div class="wrap">' +
      '<form class="add-one two" id="f1"><div><div class="panel"><h2>Rasm, emoji va stikerlar</h2><div id="se"></div></div></div><div><div class="panel"><h2>Ma\'lumotlar</h2><label class="lab" for="nm">Ism va familiya</label><input class="inp" id="nm" placeholder="Masalan: Aziza Rahimova" maxlength="80" autocomplete="off" required><label class="lab" for="lg">Login <small class="muted">(ismdan avtomatik, o\'zgartirish mumkin)</small></label><input class="inp mono" id="lg" placeholder="aziza.rahimova" autocapitalize="off" spellcheck="false"><label class="lab" for="cl">Sinf</label><select class="inp" id="cl">' + classOpts(cid) + '</select><label class="lab" for="tg">To\'garak (ixtiyoriy)</label><select class="inp" id="tg">' + clubOpts(club ? g.id : '') + '</select><div class="acts"><button class="btn pri big" id="go1">O\'quvchini qo\'shish</button></div><p class="msg" id="m1" role="status"></p></div><div id="res1"></div></div></form>' +
      '<form class="add-many" id="f2" hidden><div class="panel"><h2>Ro\'yxatdan qo\'shish</h2><p class="muted">Har bir qatorga bitta o\'quvchining ism-familiyasini yozing. Jurnal yoki Excel\'dan nusxa ko\'chirish mumkin. Ko\'pi bilan 60 ta.</p><label class="lab" for="names">O\'quvchilar</label><textarea class="inp" id="names" rows="10" placeholder="Aziza Rahimova&#10;Sardor Aliyev&#10;Madina Yusupova"></textarea><div class="row-f"><div><label class="lab" for="cl2">Sinf</label><select class="inp" id="cl2">' + classOpts(cid) + '</select></div><div><label class="lab" for="tg2">To\'garak (ixtiyoriy)</label><select class="inp" id="tg2">' + clubOpts(club ? g.id : '') + '</select></div></div><div class="acts"><button class="btn pri big" id="go2">Hammasini qo\'shish</button><span class="muted" id="cnt"></span></div><p class="msg" id="m2" role="status"></p></div></form></div></section>';
    let lgTouched = false;
    const mk = () => KM.stk.editor($('#se'), { name: $('#nm') ? $('#nm').value : '', photo: null, stickers: [], onError: t => msg($('#m1'), t) });
    let ed = mk();
    $('#nm').oninput = () => { if (!lgTouched) $('#lg').value = KM.translit($('#nm').value); };
    $('#lg').oninput = () => { lgTouched = true; };
    $$('.seg button').forEach(b => b.onclick = () => { $$('.seg button').forEach(x => { x.classList.toggle('on', x === b); x.setAttribute('aria-selected', x === b); }); $('#f1').hidden = b.dataset.m !== 'one'; $('#f2').hidden = b.dataset.m !== 'many'; });
    $('#f1').onsubmit = async ev => {
      ev.preventDefault(); const nm = $('#nm').value.trim(); if (!nm) { msg($('#m1'), 'Ism-familiyani yozing'); $('#nm').focus(); return; }
      const gg = ed.get(), b = $('#go1'); b.disabled = true;
      try {
        const r = await api.createStudents([{ full_name: nm, login_base: $('#lg').value.trim() || KM.translit(nm), class_id: $('#cl').value || null, photo: gg.photo, photo_kind: gg.photoKind, stickers: gg.stickers }]);
        if ($('#tg').value) await api.setMembers($('#tg').value, [r[0].user.id], []);
        lastCreds = r; $('#res1').innerHTML = cred(r[0]) + '<div class="acts"><a class="btn" href="#admin-kartochkalar">Kartochkani chop etish</a><a class="btn" href="#admin-oquvchi-' + e(r[0].user.id) + '">Profilini ochish</a></div>';
        $('#nm').value = $('#lg').value = ''; lgTouched = false; msg($('#m1'), r[0].user.full_name + ' qo\'shildi. Keyingisini yozishingiz mumkin.', true);
        ed = mk(); $('#nm').focus(); wireCopy(); await reload();
      } catch (x) { msg($('#m1'), x.message); }
      b.disabled = false;
    };
    const list = () => $('#names').value.split('\n').map(s => s.replace(/^\s*\d+[.)]\s*/, '').trim()).filter(Boolean);
    $('#names').oninput = () => { const n = list().length; $('#cnt').textContent = n ? n + ' ta o\'quvchi' : ''; };
    $('#f2').onsubmit = async ev => {
      ev.preventDefault(); const L = list(); if (!L.length) { msg($('#m2'), 'Ro\'yxat bo\'sh'); return; }
      const b = $('#go2'); b.disabled = true; b.textContent = 'Qo\'shilmoqda…';
      try {
        lastCreds = await api.createStudents(L.map(n => ({ full_name: n, login_base: KM.translit(n), class_id: $('#cl2').value || null })));
        if ($('#tg2').value) await api.setMembers($('#tg2').value, lastCreds.map(r => r.user.id), []);
        location.hash = 'admin-kartochkalar';
      } catch (x) { msg($('#m2'), x.message); b.disabled = false; b.textContent = 'Hammasini qo\'shish'; }
    };
    $('#nm').focus();
  }
  const cred = r => '<div class="cred"><div class="term-bar"><i></i><i></i><i></i><span>kirish ma\'lumotlari</span></div><div class="cred-b"><span class="fc big">' + face(r.user) + '</span><div><p class="cred-n">' + e(r.user.full_name) + (r.user.class_name ? ' · ' + e(r.user.class_name) : '') + '</p><p class="cred-l"><span>login</span><code>' + e(r.user.login) + '</code></p><p class="cred-l"><span>parol</span><code>' + e(r.password) + '</code></p><button type="button" class="btn sm" data-copy="' + e('Sayt: ' + siteUrl() + '\nLogin: ' + r.user.login + '\nParol: ' + r.password) + '">Nusxa olish</button></div></div></div>';
  function wireCopy() {
    $$('[data-copy]').forEach(b => b.onclick = () => {
      const t = b.dataset.copy;
      (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(() => { b.textContent = 'Nusxa olindi'; }, () => { b.textContent = 'Nusxa olinmadi: qo\'lda yozib oling'; });
    });
  }

  /* ---------- O'quvchi sahifasi ---------- */
  async function student(app, id) {
    const s0 = D.students.find(s => s.id === id); if (!s0) return KM.notFound();
    let full; try { full = await api.student(id); } catch (x) { return fail(app, x); }
    const s = full.user, P = full.progress || {}, done = P.done || {}, inf = P.inf || {};
    const myClubs = togaraklar().filter(c => (c.member_ids || []).includes(id));
    const IG = KM.infGrades.find(g => g.n === s.grade);
    const infRows = IG ? '<div class="gp-r st-orta"><span class="gp-n">Informatika</span><span class="bar"><b style="width:' + (IG.lessons.filter(l => inf[IG.n + '-' + l.n]).length / IG.lessons.length * 100) + '%"></b></span><span class="gp-v">' + IG.lessons.filter(l => inf[IG.n + '-' + l.n]).length + '/' + IG.lessons.length + '</span><span class="gp-c"></span></div>' : '';
    const codeRows = KM.grades.map(g => { const ids = g.lessons.map((l, i) => g.n + '-' + (i + 1)), d = ids.filter(x => done[x]).length; return d ? '<div class="gp-r st-' + g.stage + '"><span class="gp-n">' + g.n + '-daraja</span><span class="bar"><b style="width:' + (d / ids.length * 100) + '%"></b></span><span class="gp-v">' + d + '/' + ids.length + '</span><span class="gp-c">' + (d === ids.length ? 'tugatdi' : '') + '</span></div>' : ''; }).join('');
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="' + (s.class_id ? '#admin-sinf-' + e(s.class_id) : '#admin-sinf-yoq') + '">← ' + e(s.class_name || 'Sinfsiz') + '</a><h1>' + e(s.full_name) + '</h1><p class="lead"><code class="lgc">' + e(s.login) + '</code> · ' + ago(s.last_seen) + (myClubs.length ? ' · ' + myClubs.map(c => e(c.name)).join(', ') : '') + '</p></div><div class="kpis sm"><div><b>' + X(s) + '</b><span>XP</span></div><div><b>' + s.lessons_done + '</b><span>dars</span></div><div><b>' + ((P.streak && P.streak.n) || 0) + '</b><span>kun seriya</span></div></div></div></section>' +
      '<section class="band"><div class="wrap two"><div><div class="panel"><h2>Rasm, emoji va stikerlar</h2><div id="se"></div><div class="acts"><button class="btn pri" id="sv1">Rasmni saqlash</button><span class="msg" id="m1" role="status"></span></div></div></div>' +
      '<div><form class="panel" id="f"><h2>Ma\'lumotlar</h2><label class="lab" for="nm">Ism va familiya</label><input class="inp" id="nm" value="' + e(s.full_name) + '" maxlength="80"><label class="lab" for="lg">Login</label><input class="inp mono" id="lg" value="' + e(s.login) + '" autocapitalize="off" spellcheck="false"><label class="lab" for="cl">Sinf</label><select class="inp" id="cl">' + classOpts(s.class_id) + '</select><div class="acts"><button class="btn pri">Saqlash</button><span class="msg" id="m2" role="status"></span></div></form>' +
      (togaraklar().length ? '<div class="panel"><h2>To\'garaklar</h2><div class="chks col">' + togaraklar().map(c => '<label class="chk"><input type="checkbox" data-club="' + e(c.id) + '"' + ((c.member_ids || []).includes(id) ? ' checked' : '') + '><span>' + e(c.name) + ' <small class="muted">' + c.grade + '-daraja</small></span></label>').join('') + '</div><p class="msg" id="m3" role="status"></p></div>' : '') +
      '<div class="panel"><h2>Parol</h2><p class="muted">Parol shifrlangan holda saqlanadi, uni hech kim (admin ham) ko\'ra olmaydi. O\'quvchi unutsa, yangisini bering: eski parol darhol ishlamay qoladi.</p><div class="acts"><button class="btn" id="rp">Yangi parol berish</button></div><div id="rpres"></div></div>' +
      '<div class="panel"><h2>Progress</h2><div class="gp">' + (infRows + codeRows || '<p class="muted">Hali dars o\'qilmagan.</p>') + '</div></div>' +
      '<div class="panel"><h2>Rag\'batlantirish</h2><p class="muted">Stiker o\'quvchi rasmiga qo\'shiladi, XP hisobiga yoziladi.</p><div class="aw-row">' + ['zor', 'alo', 'star', 'crown', 'medal', 'top', 'rocket', 'heart'].map(k => '<button type="button" class="se-k" data-aw="' + k + '" title="' + e(KM.stk.D[k][0]) + '">' + KM.stk.D[k][1] + '</button>').join('') + '</div><div class="row-f"><div><label class="lab" for="axp">XP</label><select class="inp" id="axp"><option>5</option><option selected>10</option><option>25</option><option>50</option></select></div><div style="flex:2 1 200px"><label class="lab" for="anote">Izoh</label><input class="inp" id="anote" placeholder="Masalan: Darsda faol bo\'ldi"></div></div><p class="msg" id="am" role="status"></p></div>' +
      codePanel(P) +
      '<div class="panel danger"><h2>O\'quvchini o\'chirish</h2><p class="muted">Hamma progress va loyihalari ham o\'chadi.</p><button class="btn" id="del">O\'chirish</button></div></div></div></section>';
    const ed = KM.stk.editor($('#se'), { name: s.full_name, photo: s.photo, photoKind: s.photo_kind, stickers: s.stickers, onError: t => msg($('#m1'), t) });
    $('#sv1').onclick = async () => { const g = ed.get(); try { await api.updateStudent(id, { photo: g.photo || '', photo_kind: g.photoKind || 'photo', stickers: g.stickers }); msg($('#m1'), 'Saqlandi', true); } catch (x) { msg($('#m1'), x.message); } };
    $('#f').onsubmit = async ev => { ev.preventDefault(); try { const u = await api.updateStudent(id, { full_name: $('#nm').value, login: $('#lg').value, class_id: $('#cl').value || null }); msg($('#m2'), 'Saqlandi', true); $('.ahead h1').textContent = u.full_name; $('.lgc').textContent = u.login; } catch (x) { msg($('#m2'), x.message); } };
    $$('[data-club]').forEach(cb => cb.onchange = async () => { try { await api.setMembers(cb.dataset.club, cb.checked ? [id] : [], cb.checked ? [] : [id]); msg($('#m3'), cb.checked ? 'To\'garakka qo\'shildi' : 'To\'garakdan chiqarildi', true); await reload(); } catch (x) { cb.checked = !cb.checked; msg($('#m3'), x.message); } });
    $$('[data-aw]').forEach(b => b.onclick = async () => { try { const u = await api.award(id, { k: b.dataset.aw, x: .2 + Math.random() * .6, y: .2 + Math.random() * .6, s: .3, r: Math.round(Math.random() * 30 - 15) }, +$('#axp').value, $('#anote').value); msg($('#am'), KM.stk.D[b.dataset.aw][0] + ' stikeri va +' + $('#axp').value + ' XP berildi. Jami: ' + X(u) + ' XP', true); } catch (x) { msg($('#am'), x.message); } });
    wireCode(P);
    KM.ui.confirmBtn($('#rp'), 'Eski parol o\'chadi. Yana bosing', async () => {
      try { lastCreds = await api.resetPasswords([id]); $('#rpres').innerHTML = cred(lastCreds[0]) + '<div class="acts"><a class="btn" href="#admin-kartochkalar">Kartochkani chop etish</a></div>'; wireCopy(); }
      catch (x) { $('#rpres').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; }
    });
    KM.ui.confirmBtn($('#del'), 'Rostdan o\'chirilsinmi? Yana bosing', async () => { try { await api.deleteStudent(id); location.hash = s.class_id ? 'admin-sinf-' + s.class_id : 'admin'; } catch (x) { toast(x.message); } });
  }

  /* ---------- O'quvchi kodini ko'rish ---------- */
  function codeItems(P) {
    const out = [];
    Object.keys(P.code || {}).forEach(id => { const L = KM.lesson(id); if (L) out.push({ title: L.g.n + '-daraja, ' + L.i + '. ' + L.l.t, done: !!(P.done || {})[id], code: P.code[id] }); });
    (P.projects || []).forEach(p => out.push({ title: 'Loyiha: ' + p.name, done: null, code: p }));
    return out;
  }
  function codePanel(P) {
    const it = codeItems(P);
    return '<div class="panel"><h2>Kod ishlari</h2>' + (it.length ? '<p class="muted">Dasturlash darslaridagi va Kod maydonidagi kodlari.</p><div class="ci-list">' + it.map((x, i) => '<button type="button" class="ci" data-ci="' + i + '"><span>' + e(x.title) + '</span>' + (x.done === true ? '<em class="ok-t">✓ o\'tgan</em>' : x.done === false ? '<em class="muted">jarayonda</em>' : '') + '</button>').join('') + '</div><div id="cv"></div>' : '<p class="muted">Hali kod yozmagan.</p>') + '</div>';
  }
  function wireCode(P) {
    const it = codeItems(P);
    $$('[data-ci]').forEach(b => b.onclick = () => {
      $$('[data-ci]').forEach(x => x.classList.toggle('on', x === b));
      const c = it[+b.dataset.ci].code, tabs = ['html', 'css', 'js'].filter(t => (c[t] || '').trim());
      $('#cv').innerHTML = '<div class="cv">' + tabs.map(t => '<p class="cv-t">' + t.toUpperCase() + '</p><pre class="ex" data-l="' + t + '"><code>' + KM.hl(c[t], t) + '</code></pre>').join('') + '<p class="cv-t">Natija</p><iframe class="cv-f" sandbox="allow-scripts" title="Natija"></iframe></div>';
      KM.run($('#cv iframe'), c, null, () => {});
    });
  }

  /* ---------- Materiallar ---------- */
  const KIND = { link: 'Sayt havolasi', video: 'Video', text: 'Matn', file: 'Fayl' };
  async function matList(app) {
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#admin">← Admin panel</a><h1>Materiallar</h1><p class="lead">Saytlar (EduClub Typing Jungle, Scratch, Wordwall…), YouTube videolar, matnlar va fayllar. O\'quvchi ularni platformaning ichida ochadi.</p></div><div class="acts"><a class="btn pri" href="#admin-material-yangi-hammasi">+ Material qo\'shish</a></div></div></section><section class="band"><div class="wrap" id="ml"><p class="muted">Yuklanmoqda…</p></div></section>';
    let ms; try { ms = await KM.api.materials(); } catch (x) { return fail(app, x); }
    const gn = id => { const g = D.classes.find(c => c.id === id); return g ? g.name : null; };
    $('#ml').innerHTML = ms.length ? '<div class="scroll"><table class="tbl"><thead><tr><th>Material</th><th>Turi</th><th>Kimga</th><th>Sana</th><th></th></tr></thead><tbody>' + ms.map(m => '<tr><td><a href="#material-' + e(m.id) + '"><b>' + e(m.title) + '</b></a>' + (m.url ? '<br><small class="muted">' + e(m.url.replace(/^https?:\/\//, '').slice(0, 50)) + '</small>' : '') + '</td><td>' + KIND[m.kind] + '</td><td>' + ((m.group_ids || []).map(gn).filter(Boolean).map(n => '<span class="tagg">' + e(n) + '</span>').join(' ') || '<span class="muted">hech kimga</span>') + '</td><td>' + new Date(m.created_at).toLocaleDateString('uz-UZ') + '</td><td class="r nw"><a class="btn sm" href="#admin-material-' + e(m.id) + '">Tahrirlash</a> <button class="btn sm" data-del="' + e(m.id) + '">O\'chirish</button></td></tr>').join('') + '</tbody></table></div>'
      : '<div class="empty-s"><p>Hali material yo\'q. Masalan, 2–3-sinflar uchun EduClub Typing Jungle havolasini qo\'shing.</p></div>';
    $$('[data-del]').forEach(b => KM.ui.confirmBtn(b, 'Yana bosing', async () => { try { await api.deleteMaterial(b.dataset.del); KM.route(); } catch (x) { toast(x.message); } }));
  }
  async function matForm(app, id, gid) {
    let m = null;
    if (id) { try { m = (await KM.api.materials()).find(x => x.id === id); } catch (x) { return fail(app, x); } if (!m) return KM.notFound(); }
    const pre = m ? m.group_ids || [] : (gid && gid !== 'hammasi' ? [gid] : []);
    let kind = m ? m.kind : 'link', file = null;
    const gl = list => list.map(c => '<label class="chk"><input type="checkbox" name="mg" value="' + e(c.id) + '"' + (pre.includes(c.id) ? ' checked' : '') + '><span>' + e(c.name) + ' <small class="muted">' + (c.kind === 'togarak' ? c.grade + '-daraja' : c.grade + '-sinf') + '</small></span></label>').join('') || '<p class="muted">Hali yo\'q.</p>';
    const grades = [...new Set(sinflar().map(c => c.grade))].sort((a, b) => a - b);
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><a class="back" href="#admin-materiallar">← Materiallar</a><h1>' + (m ? 'Materialni tahrirlash' : 'Yangi material') + '</h1></div></section>' +
      '<section class="band"><div class="wrap two"><form class="panel" id="mf"><h2>Material</h2><label class="lab" for="mt">Sarlavha</label><input class="inp" id="mt" maxlength="120" placeholder="Masalan: Typing Jungle — 10 barmoq bilan yozish" value="' + e(m ? m.title : '') + '" required>' +
      '<span class="lab">Turi</span><div class="seg light" id="mk">' + Object.keys(KIND).map(k => '<button type="button" data-k="' + k + '"' + (k === kind ? ' class="on"' : '') + '>' + KIND[k] + '</button>').join('') + '</div>' +
      '<div id="urlbox"><label class="lab" for="mu">Havola (URL)</label><input class="inp mono" id="mu" placeholder="https://www.edclub.com/library/typing-jungle" value="' + e(m && m.url ? m.url : '') + '"><p class="muted hint-u"></p></div>' +
      '<div id="filebox"><span class="lab">Fayl (PDF, rasm, video, Word… — 4 MB gacha)</span><label class="btn"><input type="file" id="mfile" hidden>Fayl tanlash</label> <span id="fname" class="muted">' + (m && m.file ? e(m.file.name) : 'tanlanmagan') + '</span></div>' +
      '<label class="lab" for="mb">Izoh yoki matn <small class="muted">(**qalin**, - ro\'yxat, &gt; eslatma)</small></label><textarea class="inp" id="mb" rows="6" placeholder="Masalan: Har dars boshida 10 daqiqa mashq qiling.">' + e(m && m.body ? m.body : '') + '</textarea>' +
      '<div class="acts"><button class="btn pri big" id="msave">Saqlash</button>' + (m ? '<button type="button" class="btn" id="mdel">O\'chirish</button>' : '') + '<span class="msg" id="mm" role="status"></span></div></form>' +
      '<div class="panel"><h2>Kimga ko\'rinadi?</h2><div class="acts" style="margin-top:0"><button type="button" class="btn sm" data-q="all">Hammasi</button><button type="button" class="btn sm" data-q="none">Tozalash</button>' + grades.map(n => '<button type="button" class="btn sm" data-q="g' + n + '">Barcha ' + n + '-sinflar</button>').join('') + '</div><h3 class="sub3">Sinflar</h3><div class="chks col">' + gl(sinflar()) + '</div><h3 class="sub3">To\'garaklar</h3><div class="chks col">' + gl(togaraklar()) + '</div></div></div></section>';
    const hints = { link: 'Sayt platforma ichida ochiladi. Ba\'zi saytlar (masalan EduClub) boshqa sayt ichida ochilishni taqiqlaydi — unda o\'quvchiga "Yangi oynada ochish" tugmasi ko\'rsatiladi.', video: 'YouTube havolasi (youtube.com/watch?v=… yoki youtu.be/…) yoki .mp4 fayl manzili.' };
    const setKind = k => { kind = k; $$('#mk button').forEach(b => b.classList.toggle('on', b.dataset.k === k)); $('#urlbox').hidden = !(k === 'link' || k === 'video'); $('#filebox').hidden = k !== 'file'; $('.hint-u').textContent = hints[k] || ''; };
    $$('#mk button').forEach(b => b.onclick = () => setKind(b.dataset.k)); setKind(kind);
    $('#mfile').onchange = () => {
      const f = $('#mfile').files[0]; if (!f) return;
      if (f.size > 4 * 1024 * 1024) { file = null; $('#fname').textContent = 'Fayl 4 MB dan katta. Kichikroq fayl tanlang yoki uni Google Drive\'ga yuklab, havola qo\'shing.'; return; }
      const r = new FileReader(); r.onload = () => { file = { name: f.name, mime: f.type || 'application/octet-stream', data: r.result }; $('#fname').textContent = f.name + ' (' + Math.round(f.size / 1024) + ' KB)'; if (!$('#mt').value) $('#mt').value = f.name.replace(/\.[^.]+$/, ''); }; r.readAsDataURL(f);
    };
    $$('[data-q]').forEach(b => b.onclick = () => { const q = b.dataset.q; $$('input[name=mg]').forEach(x => { const c = D.classes.find(c => c.id === x.value); x.checked = q === 'all' ? true : q === 'none' ? false : (c && c.kind !== 'togarak' && 'g' + c.grade === q) || x.checked; }); });
    $('#mf').onsubmit = async ev => {
      ev.preventDefault(); const b = $('#msave'); b.disabled = true;
      const data = { title: $('#mt').value, kind, url: $('#mu').value, body: $('#mb').value, group_ids: checked('mg') };
      if (file) data.file = file;
      try { await api.saveMaterial(m ? m.id : null, data); location.hash = gid && gid !== 'hammasi' ? 'admin-sinf-' + gid : 'admin-materiallar'; }
      catch (x) { msg($('#mm'), x.message); b.disabled = false; }
    };
    if (m) KM.ui.confirmBtn($('#mdel'), 'Rostdan o\'chirilsinmi? Yana bosing', async () => { try { await api.deleteMaterial(m.id); location.hash = 'admin-materiallar'; } catch (x) { msg($('#mm'), x.message); } });
  }

  /* ---------- Chop etiladigan login kartochkalari ---------- */
  function cards(app) {
    if (!lastCreds.length) { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Kartochkalar yo\'q</h1><p>Parollar faqat yaratilganda yoki yangilanganda ko\'rinadi. Sinf sahifasida "Tanlash" → o\'quvchilarni belgilang → "Parollarni yangilash".</p><a class="btn pri" href="#admin">Admin panel</a></div></section>'; return; }
    app.innerHTML = '<section class="band"><div class="wrap"><div class="sec-h noprint"><div><h1>Login kartochkalari</h1><p class="lead">' + lastCreds.length + ' ta o\'quvchi. Chop eting va qaychi bilan kesib, har biriga bering. Bu sahifadan chiqsangiz, parollar boshqa ko\'rinmaydi.</p></div><div class="acts"><button class="btn pri big" id="pr">Chop etish</button><a class="btn" href="#admin">Admin panel</a></div></div>' +
      '<div class="cut-grid">' + lastCreds.map(r => '<div class="cut"><div class="cut-h"><span class="fc">' + face(r.user) + '</span><div><b>' + e(r.user.full_name) + '</b><small>' + e(r.user.class_name || '') + '</small></div></div><p class="cut-u">' + e(siteUrl()) + '</p><p class="cut-l"><span>login</span><code>' + e(r.user.login) + '</code></p><p class="cut-l"><span>parol</span><code>' + e(r.password) + '</code></p></div>').join('') + '</div></div></section>';
    $('#pr').onclick = () => { try { window.print(); } catch (x) {} };
  }

  KM.admin = { route };
})();
