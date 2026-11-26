/* Xodimlar uchun qo'shimcha sahifalar: o'qituvchilar, sozlamalar (Telegram, zaxira), davomat, hisobot.
   Guruh sahifasidagi Telegram paneli, o'quvchi sahifasidagi ota-ona havolasi.
   Kirishsiz sahifalar: ota-ona kabineti (#ota-ona-KOD) va sertifikatni tekshirish (#tekshirish-KOD). */
(function () {
  const e = KM.esc, $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const api = () => KM.api.admin;
  const msg = (el, t, ok) => { if (!el) return; el.textContent = t; el.className = 'msg ' + (ok ? 'ok-t' : 'bad-t'); };
  function toast(t, ok) { const d = document.createElement('div'); d.className = 'toast' + (ok ? ' ok' : ''); d.setAttribute('role', 'status'); d.textContent = t; document.body.appendChild(d); setTimeout(() => d.remove(), 4000); }
  const siteUrl = () => location.origin + location.pathname.replace(/index\.html$/, '');
  const iso = d => new Date(d.getTime() - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  const today = () => iso(new Date());
  const daysAgo = n => iso(new Date(Date.now() - n * 864e5));
  const fmtDay = s => { const [y, m, d] = s.split('-'); return d + '.' + m; };
  const fmt = d => d ? new Date(d).toLocaleDateString('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
  const head = (back, backT, title, lead, acts) => '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><a class="back" href="#' + back + '">← ' + backT + '</a><h1>' + title + '</h1>' + (lead ? '<p class="lead">' + lead + '</p>' : '') + '</div>' + (acts ? '<div class="acts">' + acts + '</div>' : '') + '</div></section>';
  const onlyOwner = app => { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Faqat bosh admin uchun</h1><p>Bu bo\'limni maktabning bosh administratori boshqaradi.</p><a class="btn pri" href="#admin">Admin panel</a></div></section>'; };
  const groupSave = (c, extra) => api().saveGroup(c.id, Object.assign({ name: c.name, grade: c.grade, courses: c.courses, about: c.about || '' }, extra));
  const ST = { bor: ['Bor', 'b'], yoq: ['Yo\'q', 'y'], kech: ['Kech qoldi', 'k'], sababli: ['Sababli', 's'] };

  function route(h, app, D) {
    if (h === 'admin-oqituvchilar') { teachers(app, D); return true; }
    if (h === 'admin-sozlamalar') { settings(app, D); return true; }
    if (h === 'admin-hisobot') { report(app, D); return true; }
    if (h.startsWith('admin-davomat-')) { attendance(app, D, h.slice(14)); return true; }
    return false;
  }

  /* ---------- O'qituvchilar ---------- */
  function teachers(app, D) {
    if (!KM.isOwner()) return onlyOwner(app);
    const T = D.teachers || [], gname = id => (D.classes.find(c => c.id === id) || {}).name;
    app.innerHTML = head('admin', 'Admin panel', 'O\'qituvchilar', 'Boshqa o\'qituvchilar ham platformadan foydalanadi. Har biri faqat o\'ziga biriktirilgan sinf va to\'garaklarni ko\'radi va boshqaradi.') +
      '<section class="band"><div class="wrap two-col">' +
      '<div><div class="t-list">' + (T.length ? T.map(t => '<div class="panel t-card" data-t="' + e(t.id) + '"><div class="t-h"><div><h3>' + e(t.full_name) + '</h3><p class="muted">login: <code>' + e(t.login) + '</code> · ' + (t.last_seen ? 'oxirgi kirish ' + fmt(t.last_seen) : 'hali kirmagan') + '</p></div></div>' +
        '<p class="lab">Biriktirilgan guruhlar</p><div class="chks">' + D.classes.map(c => '<label class="chk"><input type="checkbox" name="tg-' + e(t.id) + '" value="' + e(c.id) + '"' + (t.group_ids.includes(c.id) ? ' checked' : '') + '><span>' + e(c.name) + '</span></label>').join('') + '</div>' +
        '<div class="acts"><button class="btn pri sm" data-a="save">Guruhlarni saqlash</button><button class="btn sm" data-a="pw">Yangi parol</button><button class="btn sm" data-a="del">O\'chirish</button></div><p class="msg" role="status"></p><div class="cred-box"></div></div>').join('')
        : '<div class="panel empty-s"><h3>Hali o\'qituvchi qo\'shilmagan</h3><p class="muted">O\'ng tomondagi forma orqali qo\'shing.</p></div>') + '</div></div>' +
      '<form class="panel" id="tf"><h2>Yangi o\'qituvchi</h2><label class="lab" for="tn">Ism familiya</label><input class="inp" id="tn" required maxlength="80" placeholder="Masalan: Dilnoza Karimova">' +
      '<label class="lab" for="tl">Login <small class="muted">(ixtiyoriy)</small></label><input class="inp" id="tl" maxlength="40" placeholder="dilnoza.karimova" autocomplete="off">' +
      '<div class="acts"><button class="btn pri">Qo\'shish</button></div><p class="msg" id="tm" role="status"></p><div id="tcred"></div></form></div></section>';
    const cred = r => '<div class="cred"><p class="cred-l"><span>Sayt</span><code>' + e(siteUrl()) + '</code></p><p class="cred-l"><span>login</span><code>' + e(r.user.login) + '</code></p><p class="cred-l"><span>parol</span><code>' + e(r.password) + '</code></p><p class="muted">Parolni hozir yozib oling: u boshqa ko\'rinmaydi.</p></div>';
    $('#tn').oninput = () => { $('#tl').placeholder = KM.translit($('#tn').value) || 'dilnoza.karimova'; };
    $('#tf').onsubmit = async ev => {
      ev.preventDefault();
      try { const r = await api().createTeacher($('#tn').value.trim(), ($('#tl').value.trim() || KM.translit($('#tn').value)).toLowerCase()); $('#tcred').innerHTML = cred(r); msg($('#tm'), r.user.full_name + ' qo\'shildi. Endi unga guruh biriktiring.', true); $('#tn').value = $('#tl').value = ''; setTimeout(() => KM.route(), 15000); }
      catch (x) { msg($('#tm'), x.message); }
    };
    $$('.t-card').forEach(card => {
      const id = card.dataset.t, m = $('.msg', card);
      $('[data-a=save]', card).onclick = async () => { try { await api().setTeacherGroups(id, $$('input[name="tg-' + id + '"]:checked', card).map(x => x.value)); msg(m, 'Saqlandi', true); } catch (x) { msg(m, x.message); } };
      $('[data-a=pw]', card).onclick = async () => { try { const r = await api().teacherPassword(id); $('.cred-box', card).innerHTML = cred(r); } catch (x) { msg(m, x.message); } };
      KM.ui.confirmBtn($('[data-a=del]', card), 'Rostdan o\'chirilsinmi? Yana bosing', async () => { try { await api().deleteTeacher(id); toast('O\'qituvchi o\'chirildi', true); KM.route(); } catch (x) { msg(m, x.message); } });
    });
  }

  /* ---------- Sozlamalar: Telegram, zaxira ---------- */
  async function settings(app, D) {
    if (!KM.isOwner()) return onlyOwner(app);
    let S = { tg_token_set: false, site_url: '', pg_net: false, tg_errors: [] };
    try { S = await api().settings(); } catch (x) {}
    const groups = D.classes;
    app.innerHTML = head('admin', 'Admin panel', 'Sozlamalar', 'Telegram xabarlari va ma\'lumotlarning zaxira nusxasi.') +
      '<section class="band"><div class="wrap two-col">' +
      '<div class="panel"><h2>Telegram bot</h2><p class="muted">Yangi topshiriq berilganda sinfning Telegram guruhiga avtomatik xabar boradi. Guruh sahifasidan qo\'lda e\'lon ham yuborish mumkin.</p>' +
      '<ol class="steps-s"><li><a href="https://t.me/BotFather" target="_blank" rel="noopener">@BotFather</a> ga <code>/newbot</code> yozing va bot yarating. U <b>token</b> beradi.</li><li>Tokenni pastga joylab, saqlang.</li><li>Botni sinf Telegram guruhiga qo\'shing va guruhda bitta xabar yozing.</li><li>"Guruhlarni topish" tugmasini bosing va har bir guruhni sinfga biriktiring.</li></ol>' +
      '<label class="lab" for="su">Sayt manzili <small class="muted">(xabardagi havola uchun)</small></label><input class="inp" id="su" value="' + e(S.site_url || siteUrl()) + '">' +
      '<label class="lab" for="tk">Bot token ' + (S.tg_token_set ? '<span class="ok-t">· saqlangan</span>' : '') + '</label><input class="inp" id="tk" autocomplete="off" placeholder="' + (S.tg_token_set ? 'O\'zgartirish uchun yangi token yozing' : '123456789:AAF...') + '">' +
      '<div class="acts"><button class="btn pri" id="tsv">Saqlash</button><button class="btn" id="tscan"' + (S.tg_token_set ? '' : ' disabled') + '>Guruhlarni topish</button>' + (S.tg_token_set ? '<button class="btn" id="toff">Botni uzish</button>' : '') + '</div><p class="msg" id="tmsg" role="status"></p>' +
      (S.tg_token_set && !S.pg_net ? '<p class="bad-t">Supabase\'da pg_net kengaytmasi yoqilmagan: Database → Extensions → pg_net → Enable.</p>' : '') +
      ((S.tg_errors || []).length ? '<details class="imp"><summary>Oxirgi xatolar</summary>' + S.tg_errors.map(x => '<p class="muted">' + fmt(x.at) + ': ' + e(x.error) + '</p>').join('') + '</details>' : '') +
      '<div id="chats"></div></div>' +
      '<div><div class="panel"><h2>Zaxira nusxa</h2><p class="muted">Barcha sinflar, o\'quvchilar, baholar, davomat va viktorinalar bitta faylga saqlanadi. Har hafta yuklab oling va xavfsiz joyda (kompyuter yoki Google Drive) saqlang. Faylda parol xeshlari bor: uni boshqalarga bermang.</p>' +
      '<div class="acts"><button class="btn pri" id="bk">Zaxira nusxani yuklab olish</button></div><p class="msg" id="bm" role="status"></p></div>' +
      '<div class="panel danger"><h2>Zaxiradan tiklash</h2><p class="muted">Hozirgi barcha ma\'lumotlar zaxiradagisi bilan almashtiriladi. Faqat biror narsa o\'chib ketganda ishlating.</p>' +
      '<label class="btn"><input type="file" id="rf" accept=".json,application/json" hidden>Faylni tanlash</label> <span id="rfn" class="muted"></span><div class="acts"><button class="btn" id="rs" disabled>Tiklash</button></div><p class="msg" id="rm" role="status"></p></div></div>' +
      '</div></section>';
    $('#tsv').onclick = async () => {
      const d = { site_url: $('#su').value.trim() }; if ($('#tk').value.trim()) d.tg_token = $('#tk').value.trim();
      try { await api().saveSettings(d); msg($('#tmsg'), 'Saqlandi', true); setTimeout(() => settings(app, D), 600); } catch (x) { msg($('#tmsg'), x.message); }
    };
    if ($('#toff')) KM.ui.confirmBtn($('#toff'), 'Bot uzilsinmi? Yana bosing', async () => { try { await api().saveSettings({ tg_token: '' }); settings(app, D); } catch (x) { msg($('#tmsg'), x.message); } });
    $('#tscan').onclick = async () => {
      const b = $('#tscan'); b.disabled = true; msg($('#tmsg'), 'Telegram\'dan so\'ralmoqda…', true);
      try {
        const rid = await api().tgScan(); let r = { ready: false };
        for (let i = 0; i < 10 && !r.ready; i++) { await new Promise(z => setTimeout(z, 1200)); r = await api().tgChats(rid); }
        if (!r.ready) throw new Error('Telegram javob bermadi. Birozdan keyin qayta urinib ko\'ring.');
        const ch = (r.chats || []).filter(c => c.type !== 'private');
        msg($('#tmsg'), ch.length ? ch.length + ' ta guruh topildi' : 'Guruh topilmadi. Botni guruhga qo\'shib, guruhda bitta xabar yozing va qayta bosing.', !!ch.length);
        $('#chats').innerHTML = ch.map(c => '<div class="chat-row"><div><b>' + e(c.title) + '</b><small class="muted"> · ID ' + e(c.id) + '</small></div><label class="vh" for="cg' + e(c.id) + '">Guruh</label><select class="inp sm" id="cg' + e(c.id) + '"><option value="">— sinfni tanlang —</option>' +
          groups.map(g => '<option value="' + e(g.id) + '"' + (g.tg_chat === c.id ? ' selected' : '') + '>' + e(g.name) + '</option>').join('') + '</select><button class="btn sm" data-chat="' + e(c.id) + '">Biriktirish</button></div>').join('');
        $$('[data-chat]').forEach(x => x.onclick = async () => { const g = groups.find(g => g.id === $('#cg' + CSS.escape(x.dataset.chat)).value); if (!g) return; try { await groupSave(g, { tg_chat: x.dataset.chat }); g.tg_chat = x.dataset.chat; x.textContent = '✓ Biriktirildi'; } catch (er) { msg($('#tmsg'), er.message); } });
      } catch (x) { msg($('#tmsg'), x.message); }
      b.disabled = false;
    };
    $('#bk').onclick = async () => {
      try { const d = await api().backup(); KM.ui.download('zis-prostudent-zaxira-' + today() + '.json', JSON.stringify(d), 'application/json'); msg($('#bm'), 'Yuklab olindi: ' + (d.users || []).length + ' ta foydalanuvchi, ' + (d.classes || []).length + ' ta guruh.', true); }
      catch (x) { msg($('#bm'), x.message); }
    };
    let rdata = null;
    $('#rf').onchange = () => {
      const f = $('#rf').files[0]; if (!f) return; const r = new FileReader();
      r.onload = () => { try { rdata = JSON.parse(r.result); if (rdata.format !== 'zis-prostudent') throw 0; $('#rfn').textContent = f.name + ' · ' + fmt(rdata.created_at) + ' · ' + (rdata.users || []).length + ' ta foydalanuvchi'; $('#rs').disabled = false; } catch (x) { rdata = null; $('#rfn').textContent = 'Bu ZIS ProStudent zaxira fayli emas'; $('#rs').disabled = true; } };
      r.readAsText(f);
    };
    KM.ui.confirmBtn($('#rs'), 'Hamma ma\'lumot almashtiriladi! Yana bosing', async () => {
      if (!rdata) return;
      try { const r = await api().restore(rdata); msg($('#rm'), 'Tiklandi: ' + r.users + ' ta foydalanuvchi, ' + r.classes + ' ta guruh.', true); }
      catch (x) { msg($('#rm'), x.message); }
    });
  }

  /* ---------- Davomat ---------- */
  async function attendance(app, D, gid) {
    const c = D.classes.find(c => c.id === gid); if (!c) return KM.notFound();
    app.innerHTML = head('admin-sinf-' + gid, c.name, 'Davomat: ' + e(c.name), 'Har dars boshida belgilang. Ota-onalar havolasida ham ko\'rinadi.', '<button class="btn ghost" id="acsv">Excel\'ga yuklab olish</button>') +
      '<section class="band"><div class="wrap" id="av"><p class="muted">Yuklanmoqda…</p></div></section>';
    let day = today(), A;
    const load = async () => { A = await api().attendance(gid, daysAgo(60), today()); draw(); };
    const mark = (u, d) => (A.marks.find(m => m.u === u && m.day === d) || {}).s || '';
    function draw() {
      const days = [...new Set(A.marks.map(m => m.day))].sort().reverse().slice(0, 20).reverse();
      $('#av').innerHTML = !A.students.length ? '<div class="panel empty-s"><h3>Bu guruhda o\'quvchi yo\'q</h3></div>' :
        '<div class="panel"><div class="att-top"><div><label class="lab" for="ad">Sana</label><input class="inp" type="date" id="ad" value="' + day + '" max="' + today() + '"></div><div class="acts" style="margin:0"><button class="btn" id="aall">Hammasi bor</button><button class="btn pri" id="asv">Saqlash</button></div></div>' +
        '<div class="att-list">' + A.students.map(u => '<div class="att-row" data-u="' + e(u.id) + '"><span class="att-n">' + e(u.full_name) + '</span><div class="attseg" role="radiogroup" aria-label="' + e(u.full_name) + '">' +
          Object.keys(ST).map(k => '<button type="button" class="seg-b s-' + ST[k][1] + (mark(u.id, day) === k ? ' on' : '') + '" data-s="' + k + '" role="radio" aria-checked="' + (mark(u.id, day) === k) + '">' + ST[k][0] + '</button>').join('') + '</div></div>').join('') + '</div><p class="msg" id="am" role="status"></p></div>' +
        (days.length ? '<h2 class="sec-t">Oxirgi darslar</h2><div class="jr"><table><thead><tr><th>O\'quvchi</th>' + days.map(d => '<th>' + fmtDay(d) + '</th>').join('') + '<th>Qatnashdi</th></tr></thead><tbody>' +
          A.students.map(u => { const ms = days.map(d => mark(u.id, d)), n = ms.filter(Boolean).length, p = ms.filter(s => s === 'bor' || s === 'kech').length; return '<tr><td>' + e(u.full_name) + '</td>' + ms.map(s => '<td><span class="am a-' + (s ? ST[s][1] : 'n') + '" title="' + (s ? ST[s][0] : '') + '">' + (s === 'bor' ? '✓' : s === 'yoq' ? '✗' : s === 'kech' ? 'K' : s === 'sababli' ? 'S' : '·') + '</span></td>').join('') + '<td>' + (n ? Math.round(p * 100 / n) + '%' : '—') + '</td></tr>'; }).join('') + '</tbody></table></div><p class="muted legend">✓ bor · ✗ yo\'q · K kech qoldi · S sababli</p>' : '');
      if (!A.students.length) return;
      $('#ad').onchange = () => { day = $('#ad').value || today(); draw(); };
      $$('.seg-b').forEach(b => b.onclick = () => { const row = b.closest('.attseg'); const was = b.classList.contains('on'); $$('.seg-b', row).forEach(x => { x.classList.remove('on'); x.setAttribute('aria-checked', 'false'); }); if (!was) { b.classList.add('on'); b.setAttribute('aria-checked', 'true'); } });
      $('#aall').onclick = () => $$('.att-row').forEach(r => { if (!$('.seg-b.on', r)) { const b = $('[data-s=bor]', r); b.classList.add('on'); b.setAttribute('aria-checked', 'true'); } });
      $('#asv').onclick = async () => {
        const marks = {}; $$('.att-row').forEach(r => { const on = $('.seg-b.on', r); marks[r.dataset.u] = on ? on.dataset.s : null; });
        try { await api().setAttendance(gid, day, marks); toast('Davomat saqlandi: ' + fmtDay(day), true); await load(); } catch (x) { msg($('#am'), x.message); }
      };
    }
    $('#acsv').onclick = () => {
      if (!A) return; const days = [...new Set(A.marks.map(m => m.day))].sort();
      const rows = [['O\'quvchi', ...days]].concat(A.students.map(u => [u.full_name, ...days.map(d => { const s = mark(u.id, d); return s ? ST[s][0] : ''; })]));
      KM.ui.download('davomat-' + c.name.replace(/[^\w-]+/g, '_') + '-' + today() + '.csv', '﻿' + rows.map(r => r.map(x => '"' + String(x).replace(/"/g, '""') + '"').join(';')).join('\r\n'), 'text/csv;charset=utf-8');
    };
    try { await load(); } catch (x) { $('#av').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; }
  }

  /* ---------- Hisobot ---------- */
  async function report(app) {
    app.innerHTML = head('admin', 'Admin panel', 'Hisobot', 'Sinf va to\'garaklar bo\'yicha o\'zlashtirish, faollik va davomat. Ma\'muriyatga ko\'rsatish uchun.', '<button class="btn ghost" id="rcsv">Excel\'ga yuklab olish</button><button class="btn ghost" id="rpr">Chop etish</button>') +
      '<section class="band"><div class="wrap" id="rv"><p class="muted">Yuklanmoqda…</p></div></section>';
    let R;
    try { R = await api().report(); } catch (x) { $('#rv').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; return; }
    const pct = (a, b) => b ? Math.round(a * 100 / b) : null;
    const rows = R.map(g => ({ g, sub: pct(g.submitted, g.assignments * g.students), att: pct(g.att_present, g.att_total), act: pct(g.active7, g.students) }));
    const tot = k => R.reduce((s, g) => s + (g[k] || 0), 0);
    const bar = (v, label) => '<div class="rbar"><div class="rbar-h"><span>' + label + '</span><b>' + (v == null ? '—' : v + '%') + '</b></div><div class="rbar-t"><i style="width:' + (v || 0) + '%"></i></div></div>';
    $('#rv').innerHTML = !R.length ? '<div class="panel empty-s"><h3>Hali guruh yo\'q</h3></div>' :
      '<div class="stats rep-tot"><div class="stat"><b>' + R.length + '</b><span>guruh</span></div><div class="stat"><b>' + tot('students') + '</b><span>o\'quvchi o\'rinlari</span></div><div class="stat"><b>' + tot('active7') + '</b><span>shu hafta faol</span></div><div class="stat"><b>' + tot('assignments') + '</b><span>topshiriq berilgan</span></div></div>' +
      '<div class="rep-grid">' + rows.map(({ g, sub, att, act }) => '<a class="panel rep" href="#admin-sinf-' + e(g.id) + '"><div class="rep-h"><h3>' + e(g.name) + '</h3><span class="grp-k">' + (g.kind === 'togarak' ? 'To\'garak' : 'Sinf') + '</span></div>' +
        '<p class="muted">' + g.students + ' o\'quvchi · o\'rtacha ' + (g.avg_lessons == null ? 0 : g.avg_lessons) + ' dars · ' + (g.avg_xp || 0) + ' XP</p>' +
        bar(act, 'Shu hafta faol') + bar(sub, 'Topshiriqlar topshirilgan') + bar(g.avg_pct, 'O\'rtacha baho') + bar(att, 'Davomat (30 kun)') + '</a>').join('') + '</div>';
    $('#rpr').onclick = () => { try { window.print(); } catch (x) {} };
    $('#rcsv').onclick = () => {
      const t = [['Guruh', 'Turi', 'O\'quvchilar', 'Shu hafta faol', 'O\'rtacha dars', 'O\'rtacha XP', 'Topshiriqlar', 'Topshirilgan %', 'O\'rtacha baho %', 'Davomat %']]
        .concat(rows.map(({ g, sub, att, act }) => [g.name, g.kind === 'togarak' ? 'To\'garak' : 'Sinf', g.students, g.active7, g.avg_lessons == null ? '' : g.avg_lessons, g.avg_xp == null ? '' : g.avg_xp, g.assignments, sub == null ? '' : sub, g.avg_pct == null ? '' : g.avg_pct, att == null ? '' : att]));
      KM.ui.download('hisobot-' + today() + '.csv', '﻿' + t.map(r => r.map(x => '"' + String(x).replace(/"/g, '""') + '"').join(';')).join('\r\n'), 'text/csv;charset=utf-8');
    };
  }

  /* ---------- Guruh sahifasi: Telegram paneli ---------- */
  function groupPanel(c) {
    return '<div class="panel tg-p"><h2>Telegram</h2>' + (c.tg_chat ? '<p class="muted">Guruh ulangan (ID ' + e(c.tg_chat) + '). Yangi topshiriqlar avtomatik yuboriladi.</p>' +
      '<label class="lab" for="anx">E\'lon matni</label><textarea class="inp" id="anx" rows="3" maxlength="2000" placeholder="Masalan: Ertaga 3-darsda test bo\'ladi."></textarea><div class="acts"><button class="btn pri" id="ansend">Guruhga yuborish</button></div>'
      : '<p class="muted">Sinfning Telegram guruhi ulanmagan.' + (KM.isOwner() ? ' Sozlamalar bo\'limida botni ulang va guruhni biriktiring.' : ' Bosh admin Sozlamalar bo\'limida ulaydi.') + '</p>' + (KM.isOwner() ? '<a class="btn sm" href="#admin-sozlamalar">Sozlamalar</a>' : '')) +
      '<p class="msg" id="anm" role="status"></p></div>';
  }
  function wireGroup(c) {
    const b = $('#ansend'); if (!b) return;
    b.onclick = async () => { b.disabled = true; try { const r = await api().announce(c.id, $('#anx').value); msg($('#anm'), r.sent ? 'Yuborildi' : 'Yuborilmadi: Sozlamalar → Oxirgi xatolar', r.sent); if (r.sent) $('#anx').value = ''; } catch (x) { msg($('#anm'), x.message); } b.disabled = false; };
  }

  /* ---------- O'quvchi sahifasi: ota-ona havolasi va davomat ---------- */
  function studentPanel(P) {
    const a = P.attendance || {}, n = Object.values(a).reduce((s, x) => s + x, 0);
    return '<div class="panel"><h2>Ota-ona havolasi</h2><p class="muted">Ota-ona shu havola orqali kirishsiz farzandining baholari, davomati va faolligini ko\'radi. Havolani Telegram orqali yuboring.</p>' +
      '<div id="pl">' + (P.parent_code ? '<div class="copy-row"><input class="inp" readonly id="plu" value="' + e(siteUrl() + '#ota-ona-' + P.parent_code) + '"><button class="btn sm" id="plc">Nusxa olish</button></div>' : '') + '</div>' +
      '<div class="acts"><button class="btn' + (P.parent_code ? '' : ' pri') + '" id="plg">' + (P.parent_code ? 'Yangi havola (eskisi o\'chadi)' : 'Havola yaratish') + '</button></div><p class="msg" id="plm" role="status"></p>' +
      '<h3 class="sub3">Davomat (30 kun)</h3><p>' + (n ? Object.keys(ST).filter(k => a[k]).map(k => ST[k][0] + ': <b>' + a[k] + '</b>').join(' · ') : '<span class="muted">Belgilanmagan</span>') + '</p></div>';
  }
  function wireStudent(P, id, rerender) {
    const copy = () => { const i = $('#plu'); if (!i) return; i.select(); try { navigator.clipboard.writeText(i.value); } catch (x) { document.execCommand('copy'); } msg($('#plm'), 'Nusxa olindi', true); };
    if ($('#plc')) $('#plc').onclick = copy;
    const go = async () => { try { P.parent_code = await api().parentCode(id, !!P.parent_code); rerender(); msg($('#plm'), 'Havola tayyor', true); } catch (x) { msg($('#plm'), x.message); } };
    if (P.parent_code) KM.ui.confirmBtn($('#plg'), 'Eski havola ishlamay qoladi. Yana bosing', go); else $('#plg').onclick = go;
  }

  /* ---------- Kirishsiz: ota-ona kabineti ---------- */
  async function parentPage(app, code) {
    app.innerHTML = '<div class="splash grid-bg"><span class="caret"></span></div>';
    let P; try { P = await KM.api.parentView(code); } catch (x) { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Havola ishlamayapti</h1><p>' + e(x.message) + '</p></div></section>'; return; }
    const u = P.user, a = P.attendance || {}, n = Object.values(a).reduce((s, x) => s + x, 0), pres = (a.bor || 0) + (a.kech || 0);
    const graded = P.assignments.filter(x => x.score != null), avg = graded.length ? Math.round(graded.reduce((s, x) => s + x.score * 100 / x.max_score, 0) / graded.length) : null;
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap par-h"><span class="fc big">' + KM.stk.face(u) + '</span><div><p class="pill-tag"><i></i>Ota-ona kabineti</p><h1>' + e(u.full_name) + '</h1><p class="lead">' + e([u.class_name, ...P.groups.filter(g => g !== u.class_name)].filter(Boolean).join(' · ')) + '</p></div></div></section>' +
      '<section class="band"><div class="wrap"><div class="stats"><div class="stat"><b>' + (avg == null ? '—' : avg + '%') + '</b><span>o\'rtacha baho</span></div><div class="stat"><b>' + (n ? Math.round(pres * 100 / n) + '%' : '—') + '</b><span>davomat (30 kun)</span></div><div class="stat"><b>' + u.lessons_done + '</b><span>dars o\'tilgan</span></div><div class="stat"><b>' + u.xp + '</b><span>XP</span></div></div>' +
      '<div class="two-col"><div class="panel"><h2>Topshiriqlar</h2>' + (P.assignments.length ? '<div class="tk-list">' + P.assignments.map(x => { const k = x.score != null ? ['graded', x.score + ' / ' + x.max_score] : x.submitted_at ? ['sent', 'Topshirdi, tekshirilmoqda'] : x.due_at && new Date(x.due_at) < new Date() ? ['late', 'Topshirmagan'] : ['new', 'Bajarilmoqda']; return '<div class="tk ' + k[0] + '"><span class="tk-s">' + e(k[1]) + '</span><b>' + e(x.title) + '</b><span class="muted">' + (x.due_at ? 'Muddat: ' + fmt(x.due_at) : '') + (x.comment ? ' · Izoh: ' + e(x.comment) : '') + '</span></div>'; }).join('') + '</div>' : '<p class="muted">Hali topshiriq berilmagan.</p>') + '</div>' +
      '<div><div class="panel"><h2>Davomat</h2><p>' + (n ? Object.keys(ST).filter(k => a[k]).map(k => ST[k][0] + ': <b>' + a[k] + '</b>').join(' · ') : '<span class="muted">Hali belgilanmagan</span>') + '</p>' + (P.absences.length ? '<ul class="plain">' + P.absences.map(x => '<li>' + fmt(x.day) + ': ' + ST[x.s][0] + '</li>').join('') + '</ul>' : '') + '</div>' +
      (P.awards.length ? '<div class="panel"><h2>Rag\'batlar</h2><ul class="plain">' + P.awards.map(x => '<li>+' + x.xp + ' XP' + (x.note ? ': ' + e(x.note) : '') + ' <span class="muted">' + fmt(x.created_at) + '</span></li>').join('') + '</ul></div>' : '') +
      (P.certs.length ? '<div class="panel"><h2>Sertifikatlar</h2><ul class="plain">' + P.certs.map(x => '<li><a href="#tekshirish-' + e(x.code) + '">' + e(x.title) + '</a> <span class="muted">' + fmt(x.issued_at) + '</span></li>').join('') + '</ul></div>' : '') + '</div></div>' +
      '<p class="muted">Oxirgi kirish: ' + (u.last_seen ? fmt(u.last_seen) : 'hali kirmagan') + '. Savollar bo\'lsa, sinf rahbari yoki fan o\'qituvchisiga murojaat qiling.</p></div></section>';
  }

  /* ---------- Kirishsiz: sertifikatni tekshirish ---------- */
  async function verifyPage(app, code) {
    app.innerHTML = '<div class="splash grid-bg"><span class="caret"></span></div>';
    let r; try { r = await KM.api.certVerify(code); } catch (x) { r = { valid: false, err: x.message }; }
    app.innerHTML = '<section class="band"><div class="wrap narrow"><div class="panel verify ' + (r.valid ? 'ok' : 'no') + '"><div class="v-i">' + (r.valid ? '✓' : '✗') + '</div>' +
      (r.valid ? '<h1>Sertifikat haqiqiy</h1><p class="lead"><b>' + e(r.full_name) + '</b>' + (r.class_name ? ' (' + e(r.class_name) + ')' : '') + '</p><p>' + e(r.title) + '</p><p class="muted">Berilgan sana: ' + fmt(r.issued_at) + ' · Kod: <code>' + e(r.code) + '</code></p>'
        : '<h1>Sertifikat topilmadi</h1><p class="lead">Kod: <code>' + e(code) + '</code></p><p class="muted">' + e(r.err || 'Bunday kodli sertifikat ZIS ProStudent platformasida berilmagan.') + '</p>') +
      '<p class="muted">ZIS ProStudent · Zafar International School</p></div></div></section>';
  }

  KM.staff = { route, groupPanel, wireGroup, studentPanel, wireStudent, parentPage, verifyPage };
})();
