/* ZIS ProStudent: sahifalar, kirish va yo'naltirish (router). */
(function () {
  const st = KM.store, S = () => st.s, e = KM.esc, app = document.getElementById('app');
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const G = () => KM.grades;
  let cleanup = [];
  KM.session = null;

  /* ---------- yordamchilar ---------- */
  const lessonsOf = g => g.lessons.map((l, i) => ({ l, i: i + 1, id: g.n + '-' + (i + 1), g }));
  const isDone = id => !!S().done[id];
  const gradeProg = g => { const n = g.lessons.length, d = lessonsOf(g).filter(x => isDone(x.id)).length; return { n, d, p: n ? d / n : 0 }; };
  const gradeDone = n => { const g = G().find(g => g.n === n); return !!g && gradeProg(g).d === g.lessons.length; };
  const unlocked = (g, i) => !S().lock || i === 1 || isDone(g.n + '-' + (i - 1));
  const total = () => G().reduce((a, g) => a + g.lessons.length, 0);
  const doneCount = () => Object.keys(S().done).filter(id => KM.lesson(id)).length;
  const me = () => KM.session && KM.session.user;
  const isAdmin = () => !!me() && me().role === 'admin';
  const groups = () => (me() && me().groups) || [];
  const hasCourse = c => isAdmin() || groups().some(g => (g.courses || []).includes(c));
  /* O'quvchining Informatika dasturi: sinfining darajasi (agar sinfga Informatika biriktirilgan bo'lsa) */
  const infGradeOf = () => { const c = groups().find(g => g.kind === 'sinf' && (g.courses || []).includes('informatika')); return c ? c.grade : null; };
  /* Dasturlash kursini qaysi darajadan boshlash: to'garak yoki sinf darajasi */
  const codeStart = () => { const gs = groups().filter(g => (g.courses || []).includes('dasturlash')); return gs.length ? Math.min(...gs.map(g => g.grade)) : 1; };
  function nextLesson() {
    const lg = S().last ? +S().last.split('-')[0] : codeStart();
    const order = [...G().filter(g => g.n >= lg), ...G().filter(g => g.n < lg)];
    for (const g of order) for (const x of lessonsOf(g)) if (!isDone(x.id)) return x;
    return null;
  }
  function nextHref(L) {
    const gi = G().indexOf(L.g);
    if (L.i < L.g.lessons.length) return '#dars-' + L.g.n + '-' + (L.i + 1);
    if (G()[gi + 1]) return '#sinf-' + G()[gi + 1].n;
    return '#profil';
  }
  const ICON = {
    lock: '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    book: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 10c6-2 12-2 18 2v28c-6-4-12-4-18-2z" fill="currentColor" opacity=".35"/><path d="M42 10c-6-2-12-2-18 2v28c6-4 12-4 18-2z" fill="currentColor"/></svg>',
    quiz: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="8" width="36" height="32" rx="6" fill="currentColor" opacity=".35"/><path d="M14 24l7 7 14-14" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    code: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="4" y="8" width="40" height="32" rx="6" fill="currentColor" opacity=".35"/><path d="M18 17l-7 7 7 7M30 17l7 7-7 7" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    eye: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="currentColor"/></svg>'
  };
  const ring = (p, sz) => { const r = 26, C = 2 * Math.PI * r; return '<svg class="ring" viewBox="0 0 64 64" width="' + (sz || 64) + '" height="' + (sz || 64) + '" aria-hidden="true"><circle cx="32" cy="32" r="' + r + '" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="7"/><circle cx="32" cy="32" r="' + r + '" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + (C * p) + ' ' + C + '" transform="rotate(-90 32 32)"/></svg>'; };
  const BADGES = [
    ['1', "Birinchi qadam", "Birinchi darsni tugatish", () => doneCount() >= 1],
    ['5', "Beshta dars", "5 ta darsni tugatish", () => doneCount() >= 5],
    ['10', "O'nta dars", "10 ta darsni tugatish", () => doneCount() >= 10],
    ['R', "Robot ustasi", "1-sinf kursini tugatish", () => gradeDone(1)],
    ['H', "HTML bilimdoni", "5-sinf kursini tugatish", () => gradeDone(5)],
    ['C', "CSS rassomi", "7-sinf kursini tugatish", () => gradeDone(7)],
    ['JS', "JS sehrgari", "9-sinf kursini tugatish", () => gradeDone(9)],
    ['3', "Ijodkor", "Kod maydonida 3 ta loyiha", () => S().projects.length >= 3],
    ['∞', "Uch kun ketma-ket", "3 kun ketma-ket dars qilish", () => S().streak.n >= 3],
    ['XP', "500 XP", "500 XP to'plash", () => S().xp >= 500],
    ['11', "Bitiruvchi", "Hamma darslarni tugatish", () => doneCount() >= total()]
  ];
  function download(name, text, type) {
    try { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); return true; } catch (err) { return false; }
  }
  /* "ishonchingiz komilmi?" tugmasi: birinchi bosish so'raydi, ikkinchisi bajaradi */
  function confirmBtn(b, ask, fn) {
    let armed = false; const orig = b.textContent;
    b.addEventListener('click', () => {
      if (!armed) { armed = true; b.textContent = ask; b.classList.add('warn'); setTimeout(() => { armed = false; b.textContent = orig; b.classList.remove('warn'); }, 3500); return; }
      armed = false; b.textContent = orig; b.classList.remove('warn'); fn();
    });
  }
  KM.ui = { confirmBtn, download, ring, lessonsOf, ICON };

  /* ---------- Yuqori panel ---------- */
  function header() {
    const top = $('#top'), u = me();
    top.hidden = !u; if (!u) return;
    const nav = u.role === 'admin'
      ? [['admin', 'Admin panel'], ['informatika', 'Informatika'], ['dasturlash', 'Dasturlash'], ['materiallar', 'Materiallar'], ['maydon', 'Kod maydoni']]
      : [['bosh', 'Bosh sahifa'], hasCourse('informatika') && ['informatika', 'Informatika'], hasCourse('dasturlash') && ['dasturlash', 'Dasturlash'], ['materiallar', 'Materiallar'], ['maydon', 'Kod maydoni'], ['profil', 'Profil']].filter(Boolean);
    $('#nav').innerHTML = nav.map(n => '<a href="#' + n[0] + '" data-r="' + n[0] + '">' + n[1] + '</a>').join('');
    $('#xp').hidden = $('#streak').hidden = u.role === 'admin';
    $('#xp').textContent = S().xp + ' XP';
    $('#streak').textContent = S().streak.n + ' kun';
    $('#who').textContent = u.full_name.split(' ')[0];
    $('#meph').innerHTML = KM.stk.face(u);
    $('#me').href = u.role === 'admin' ? '#admin' : '#profil';
  }
  const chips = header;

  /* ---------- Kirish ---------- */
  function loginView(setup) {
    $('#top').hidden = true;
    const demo = KM.api.mode === 'demo';
    app.innerHTML = '<section class="login grid-bg"><div class="login-in"><div class="login-t"><a class="logo light" href="#kirish"><svg viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="9" fill="#2f6bff"/><path d="M12 10l-6 6 6 6M20 10l6 6-6 6" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + e(KM.config.schoolName || 'ZIS ProStudent') + '<small>dasturlash to\'garagi</small></span></a>' +
      '<p class="pill-tag"><i></i>1–11-sinf · HTML · CSS · JavaScript</p><h1>Kodni o\'rgan. <span class="hl">Kelajakni</span> yarat.</h1><p class="lead">Login va parolni o\'qituvchingiz beradi. Kirgandan keyin darslaringiz, ballaringiz va loyihalaringiz shu yerda saqlanadi.</p></div>' +
      '<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>prostudent: ~/' + (setup ? 'sozlash' : 'kirish') + '</span></div><form class="term-b" id="lf" novalidate>' +
      (setup ? '<p class="cmd"><b>$</b> prostudent --birinchi-sozlash</p><p class="cmt"># Admin (o\'qituvchi) hisobini yarating</p>' +
        '<label for="fn">Ismingiz</label><input id="fn" autocomplete="name" placeholder="Masalan: Xojimurod Temirov" required>' +
        '<label for="lg">Login</label><input id="lg" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="ustoz" required>' +
        '<label for="pw">Parol (kamida 8 belgi)</label><div class="pw"><input id="pw" type="password" autocomplete="new-password" required><button type="button" class="eye" aria-label="Parolni ko\'rsatish">' + ICON.eye + '</button></div>' +
        '<button class="btn pri wide" id="go">Admin yaratish</button>'
        : '<p class="cmd"><b>$</b> prostudent --kirish</p>' +
        '<label for="lg">Login</label><input id="lg" autocomplete="username" autocapitalize="off" spellcheck="false" placeholder="ism.familiya" required>' +
        '<label for="pw">Parol</label><div class="pw"><input id="pw" type="password" autocomplete="current-password" required><button type="button" class="eye" aria-label="Parolni ko\'rsatish">' + ICON.eye + '</button></div>' +
        '<button class="btn pri wide" id="go">Kirish</button><p class="hint-s">Parolni unutdingizmi? O\'qituvchingiz bir zumda yangisini beradi.</p>') +
      '<p class="err" id="err" role="alert" hidden></p></form>' +
      (demo && !setup ? '<div class="demo-box"><p><b>Demo rejim.</b> Server ulanmagan: ma\'lumotlar shu brauzerda saqlanadi. Namuna hisoblar:</p><button type="button" class="demo-acc" data-l="ustoz" data-p="ustoz2026"><span>Admin</span><code>ustoz / ustoz2026</code></button><button type="button" class="demo-acc" data-l="aziza.rahimova" data-p="olma-2026"><span>O\'quvchi</span><code>aziza.rahimova / olma-2026</code></button></div>' : '') +
      '</div></div></section>';
    const err = $('#err'), go = $('#go');
    $('.eye').onclick = () => { const p = $('#pw'); p.type = p.type === 'password' ? 'text' : 'password'; };
    $$('.demo-acc').forEach(b => b.onclick = () => { $('#lg').value = b.dataset.l; $('#pw').value = b.dataset.p; go.click(); });
    $('#lf').onsubmit = async ev => {
      ev.preventDefault(); err.hidden = true;
      const lg = $('#lg').value.trim(), pw = $('#pw').value;
      if (!lg || !pw) { err.textContent = 'Login va parolni kiriting'; err.hidden = false; return; }
      go.disabled = true; go.textContent = setup ? 'Yaratilmoqda…' : 'Tekshirilmoqda…';
      try {
        const r = setup ? await KM.api.setupAdmin(lg, pw, $('#fn').value.trim()) : await KM.api.login(lg, pw);
        start(r.user, r.progress || {});
        location.hash = r.user.role === 'admin' ? 'admin' : 'bosh';
        if (location.hash === '#' + (r.user.role === 'admin' ? 'admin' : 'bosh')) route();
      } catch (x) { err.textContent = x.message; err.hidden = false; go.disabled = false; go.textContent = setup ? 'Admin yaratish' : 'Kirish'; }
    };
    $('#lg').focus();
  }
  function start(user, progress) { KM.session = { user }; KM._needSetup = false; st.bind(user, progress); header(); }
  async function logout() { await st.flush(); await KM.api.logout(); KM.session = null; st.unbind(); location.hash = 'kirish'; route(); }
  KM.logout = logout;
  KM.refreshMe = u => { KM.session.user = Object.assign(KM.session.user, u); header(); };

  /* ---------- Bosh sahifa ---------- */
  function gcard(g) {
    const p = gradeProg(g), mins = g.lessons.reduce((a, l) => a + l.min, 0), mine = !isAdmin() && hasCourse('dasturlash') && codeStart() === g.n;
    return '<a class="gc' + (p.d === p.n ? ' full' : '') + (mine ? ' mine' : '') + '" href="#sinf-' + g.n + '"><span class="gc-n">' + g.n + '<small>-daraja</small>' + (mine ? '<em>Sizdan boshlanadi</em>' : '') + '</span><span class="gc-t">' + e(g.t) + '</span><span class="gc-m">' + g.lessons.length + ' dars · ' + mins + ' daqiqa</span><span class="bar"><b style="width:' + (p.p * 100) + '%"></b></span><span class="gc-p">' + (p.d === p.n ? 'Tugatildi ✓' : p.d + ' / ' + p.n + ' dars') + '</span></a>';
  }
  /* O'quvchi bosh sahifasi: sinf, to'garaklar, keyingi darslar, yangi materiallar */
  function home() {
    const u = me(), first = u.full_name.split(' ')[0], ig = infGradeOf(), IG = ig && KM.infGrades.find(g => g.n === ig);
    const infNext = IG && IG.lessons.find(l => !S().inf[ig + '-' + l.n]), infDone = IG ? IG.lessons.filter(l => S().inf[ig + '-' + l.n]).length : 0;
    const nx = hasCourse('dasturlash') ? nextLesson() : null;
    app.innerHTML = '<section class="hero grid-bg"><div class="wrap hero-in"><div class="hero-t">' +
      '<p class="pill-tag"><i></i>' + (u.class_name ? e(u.class_name) + ' sinf' : 'O\'quvchi') + (groups().filter(g => g.kind === 'togarak').length ? ' · ' + groups().filter(g => g.kind === 'togarak').map(g => e(g.name)).join(', ') : '') + '</p>' +
      '<h1>Salom, ' + e(first) + '! Bugun nimani <span class="hl">o\'rganamiz?</span></h1><p class="lead">Darslar, testlar, materiallar va kod yozish — hammasi shu yerda. Boshqa saytga o\'tish shart emas.</p><div class="acts">' +
      (infNext ? '<a class="btn pri big" href="#infdars-' + ig + '-' + infNext.n + '">Informatika: ' + infNext.n + '-dars <span aria-hidden="true">→</span></a>' : '') +
      (nx ? '<a class="btn ' + (infNext ? 'ghost' : 'pri') + ' big" href="#dars-' + nx.id + '">Dasturlash: ' + e(nx.l.t) + '</a>' : '') +
      (!infNext && !nx ? '<a class="btn pri big" href="#materiallar">Materiallarni ochish</a>' : '') + '</div></div>' +
      '<div class="hero-v"><div class="polaroid tilt-r">' + KM.stk.face(u) + '<span class="pol-cap">' + e(u.login) + (u.class_name ? ' · ' + e(u.class_name) : '') + '</span></div>' +
      '<div class="term"><div class="term-bar"><i></i><i></i><i></i><span>' + e(u.login) + '@prostudent: ~</span></div><div class="term-b mono"><p class="cmd"><b>$</b> prostudent --men</p><p class="cmt"># ' + e(u.full_name) + '</p>' +
      '<p><span class="k">sinf       </span>: <span class="v">"' + e(u.class_name || '—') + '"</span></p><p><span class="k">xp         </span>: <span class="v">' + S().xp + '</span> <span class="cmt">(' + st.level() + '-daraja)</span></p>' +
      (IG ? '<p><span class="k">informatika</span>: <span class="v">' + infDone + ' / ' + IG.lessons.length + '</span></p>' : '') + (hasCourse('dasturlash') ? '<p><span class="k">dasturlash </span>: <span class="v">' + doneCount() + ' / ' + total() + '</span></p>' : '') +
      '<p class="cur-l"><b>$</b> <i class="caret"></i></p></div></div>' +
      '<div class="sticker-tag">' + st.level() + '-daraja<small>' + S().xp + ' XP</small></div></div></div></section>' +
      '<section class="band"><div class="wrap"><h2 class="sub0">Mening guruhlarim</h2><div class="grp-grid">' + (groups().length ? groups().map(g => {
        const links = (g.courses || []).map(c => c === 'informatika' && g.kind === 'sinf' && KM.infGrades.some(x => x.n === g.grade) ? '<a class="btn sm" href="#inf-' + g.grade + '">Informatika</a>' : c === 'dasturlash' ? '<a class="btn sm" href="#dasturlash">Dasturlash</a>' : '').join('');
        return '<div class="grp ' + g.kind + '"><span class="grp-k">' + (g.kind === 'sinf' ? 'Sinf' : 'To\'garak') + '</span><b>' + e(g.name) + '</b><span class="muted">' + (g.kind === 'sinf' ? g.grade + '-sinf dasturi' : g.grade + '-daraja') + '</span><div class="acts">' + links + '<a class="btn sm" href="#materiallar-' + e(g.id) + '">Materiallar</a></div></div>';
      }).join('') : '<div class="empty-s"><p>Siz hali hech qaysi sinf yoki to\'garakka biriktirilmagansiz. O\'qituvchingizga ayting.</p></div>') + '</div>' +
      '<div class="sec-h" style="margin-top:36px"><h2 class="sub0">Yangi materiallar</h2><a class="btn" href="#materiallar">Hammasi</a></div><div class="mat-grid" id="newmats"><p class="muted">Yuklanmoqda…</p></div></div></section>';
    KM.api.materials().then(ms => { const el = $('#newmats'); if (el) el.innerHTML = ms.length ? ms.slice(0, 4).map(matCard).join('') : '<div class="empty-s"><p>Hozircha material yo\'q.</p></div>'; }, () => { const el = $('#newmats'); if (el) el.innerHTML = '<p class="muted">Materiallarni yuklab bo\'lmadi.</p>'; });
  }
  /* Dasturlash kursi: 1–11 darajalar xaritasi */
  function codingHome() {
    const nx = nextLesson(), dc = doneCount(), tl = total();
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><p class="pill-tag"><i></i>HTML · CSS · JavaScript</p><h1>Dasturlash</h1><p class="lead">Kod shu yerda yoziladi va avtomatik tekshiriladi. ' + dc + ' / ' + tl + ' dars tugatildi.</p></div><div class="acts">' +
      (nx ? '<a class="btn pri big" href="#dars-' + nx.id + '">' + (dc ? 'Davom etish' : 'Boshlash') + ': ' + nx.g.n + '-daraja, ' + e(nx.l.t) + ' <span aria-hidden="true">→</span></a>' : '') + '</div></div></section>' +
      ['boshlang', 'orta', 'yuqori'].map(k => { const gs = G().filter(g => g.stage === k); if (!gs.length) return ''; return '<section class="band stage st-' + k + '"><div class="wrap"><div class="stage-h"><p class="eyebrow-s">' + e(KM.stages[k].d.split(':')[0]) + '</p><h2>' + e(KM.stages[k].t) + '</h2><p>' + e(KM.stages[k].d.split(': ')[1] || '') + '</p></div><div class="route r' + gs.length + '">' + gs.map(gcard).join('') + '</div></div></section>'; }).join('') +
      '<section class="band how"><div class="wrap"><h2>Dars qanday o\'tadi</h2><div class="how-in">' +
      '<div class="hw"><span class="hw-i">' + ICON.book + '</span><h3>Nazariya</h3><p>Qisqa tushuntirish va rangli kod misollari. Har bir misolni bir tugma bilan kod maydonida ochish mumkin.</p></div>' +
      '<div class="hw"><span class="hw-i">' + ICON.quiz + '</span><h3>Test</h3><p>2–3 ta savol. Javob berilishi bilan to\'g\'ri yoki noto\'g\'ri ekani va sababi ko\'rsatiladi.</p></div>' +
      '<div class="hw"><span class="hw-i">' + ICON.code + '</span><h3>Amaliyot</h3><p>Chapda kod, o\'ngda jonli natija. "Tekshirish" har bir talabni alohida tekshiradi.</p></div>' +
      '</div></div></section>';
  }

  /* ---------- Sinf sahifasi ---------- */
  function grade(n) {
    const g = G().find(g => g.n === n); if (!g) return notFound();
    const p = gradeProg(g), gi = G().indexOf(g), pg = G()[gi - 1], ng = G()[gi + 1];
    app.innerHTML = '<section class="ghead grid-bg st-' + g.stage + '"><div class="wrap ghead-in"><div><a class="back" href="#dasturlash">← Dasturlash</a><h1>' + g.n + '-sinf: ' + e(g.t) + '</h1><p class="lead">' + e(g.d) + '</p></div><div class="gring">' + ring(p.p, 88) + '<span><b>' + p.d + ' / ' + p.n + '</b>dars tugatildi</span></div></div></section>' +
      '<section class="band"><div class="wrap narrow"><ol class="path">' + lessonsOf(g).map(x => {
        const d = isDone(x.id), u = unlocked(g, x.i), q = S().quiz[x.id];
        const meta = x.l.min + ' daqiqa · ' + (x.l.prac.type === 'robot' ? "Robot o'yini" : 'Kod yozish') + (q != null ? ' · Test: ' + q + '/' + x.l.quiz.length : '') + (d && S().done[x.id].stars ? ' · ' + '★'.repeat(S().done[x.id].stars) : '');
        return '<li class="ls ' + (d ? 'done' : u ? 'open' : 'lock') + '"><span class="ls-dot">' + (d ? '✓' : u ? x.i : ICON.lock) + '</span><div class="ls-b"><h3>' + e(x.l.t) + '</h3><p>' + meta + '</p></div>' + (u ? '<a class="btn' + (d ? '' : ' pri') + '" href="#dars-' + x.id + '">' + (d ? 'Takrorlash' : 'Boshlash') + '</a>' : '<span class="ls-lk">Avvalgi darsni tugating</span>') + '</li>';
      }).join('') + '</ol>' +
      (p.d === p.n && !isAdmin() ? '<div class="cert-cta"><div><h3>Tabriklaymiz! ' + g.n + '-sinf kursi tugadi.</h3><p>Sertifikatni chop etish yoki PDF qilib saqlash mumkin.</p></div><a class="btn pri" href="#sertifikat-' + g.n + '">Sertifikatni ochish</a></div>' : '') +
      '<div class="gnav">' + (pg ? '<a class="btn" href="#sinf-' + pg.n + '">← ' + pg.n + '-sinf</a>' : '<span></span>') + (ng ? '<a class="btn" href="#sinf-' + ng.n + '">' + ng.n + '-sinf →</a>' : '') + '</div></div></section>';
  }

  /* ---------- Dars ---------- */
  function lesson(id, step) {
    const L = KM.lesson(id); if (!L) return notFound();
    const { g, l, i } = L;
    if (!unlocked(g, i)) { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Bu dars hali yopiq</h1><p>Avval ' + g.n + '-sinfning ' + (i - 1) + '-darsini tugating.</p><a class="btn pri" href="#dars-' + g.n + '-' + (i - 1) + '">' + (i - 1) + '-darsga o\'tish</a></div></section>'; return; }
    if (S().last !== id) { S().last = id; st.save(); }
    const steps = [['', 'Nazariya'], ['test', 'Test'], ['amaliyot', 'Amaliyot']];
    app.innerHTML = '<div class="lbar st-' + g.stage + '"><div class="lbar-in"><a class="back" href="#sinf-' + g.n + '">← ' + g.n + '-sinf</a><h1 class="lt">' + i + '. ' + e(l.t) + '</h1><nav class="steps" aria-label="Dars qadamlari">' +
      steps.map((s, j) => '<a href="#dars-' + id + (s[0] ? '-' + s[0] : '') + '" data-s="' + s[0] + '" class="' + (s[0] === step ? 'on' : '') + '"' + (s[0] === step ? ' aria-current="step"' : '') + '><i>' + (j + 1) + '</i>' + s[1] + '</a>').join('') + '</nav></div></div><div id="lv"></div>';
    markSteps(id);
    const v = $('#lv');
    if (step === 'test') quiz(v, L); else if (step === 'amaliyot') practice(v, L); else theory(v, L);
  }
  function markSteps(id) {
    const ok = { '': S().quiz[id] != null || isDone(id), test: S().quiz[id] != null, amaliyot: isDone(id) };
    $$('.steps a').forEach(a => { a.classList.toggle('ok', !!ok[a.dataset.s]); a.querySelector('i').textContent = ok[a.dataset.s] ? '✓' : ['', 'test', 'amaliyot'].indexOf(a.dataset.s) + 1; });
  }
  function theory(v, L) {
    const { l, id } = L;
    v.innerHTML = '<article class="band"><div class="wrap narrow theory">' + l.theory + '<div class="key"><b>Asosiy fikr</b><p>' + e(l.key) + '</p></div><div class="acts end"><a class="btn pri big" href="#dars-' + id + '-test">Testga o\'tish →</a></div></div></article>';
    $$('pre.ex', v).forEach(p => {
      const c = p.querySelector('code'), lang = p.dataset.l, raw = c.textContent;
      c.innerHTML = KM.hl(raw, lang);
      const b = document.createElement('button'); b.className = 'try'; b.textContent = "Maydonda sinab ko'rish";
      b.onclick = () => {
        const c0 = lang === 'css' ? { html: '<h1>Sarlavha</h1>\n<p>Paragraf matni.</p>\n<div class="quti">Quti</div>\n', css: raw } : { [lang]: raw };
        const pr = newProject('Misol: ' + l.t, c0); location.hash = 'maydon-' + pr.id;
      };
      p.appendChild(b);
    });
  }
  function quiz(v, L) {
    const { l, id } = L; let ans = l.quiz.map(() => null);
    const draw = () => {
      const fin = ans.every(a => a !== null), score = ans.filter((a, k) => a === l.quiz[k][2]).length;
      v.innerHTML = '<div class="band"><div class="wrap narrow"><ol class="quiz">' + l.quiz.map((q, k) => '<li class="qq"><h3>' + e(q[0]) + '</h3><div class="opts">' + q[1].map((o, j) => {
        let cls = ''; if (ans[k] !== null) { if (j === q[2]) cls = ' right'; else if (j === ans[k]) cls = ' wrong'; }
        return '<button class="opt' + cls + '" data-k="' + k + '" data-j="' + j + '"' + (ans[k] !== null ? ' disabled' : '') + '>' + e(o) + '</button>';
      }).join('') + '</div>' + (ans[k] !== null ? '<p class="why ' + (ans[k] === q[2] ? 'ok' : 'bad') + '">' + (ans[k] === q[2] ? "To'g'ri! " : "Noto'g'ri. ") + e(q[3]) + '</p>' : '') + '</li>').join('') + '</ol>' +
        (fin ? '<div class="qres"><div><b>' + score + ' / ' + l.quiz.length + '</b><span>' + (score === l.quiz.length ? "A'lo natija!" : "Yaxshi! Xatolar ustida yana bir o'ylab ko'ring.") + '</span></div><div class="acts"><button class="btn" id="qre">Qayta yechish</button><a class="btn pri" href="#dars-' + id + '-amaliyot">Amaliyotga o\'tish →</a></div></div>' : '') + '</div></div>';
      if (fin) {
        const best = S().quiz[id] || 0;
        if (score > best || S().quiz[id] == null) { if (score > best) st.addXP((score - best) * 5); S().quiz[id] = Math.max(score, best); st.save(); chips(); markSteps(id); }
      }
    };
    v.onclick = ev => { const b = ev.target.closest('.opt'); if (b) { ans[+b.dataset.k] = +b.dataset.j; draw(); } else if (ev.target.id === 'qre') { ans = ans.map(() => null); draw(); } };
    draw();
  }
  function robotPrac(v, L) {
    const { l, id } = L;
    v.innerHTML = '<div class="band"><div class="wrap"><div class="rtask"><h2>Vazifa</h2><p>' + l.prac.task + '</p></div><div id="rb"></div><div id="donebox" class="donebox"></div></div></div>';
    const r = KM.robot($('#rb', v), l.prac, stars => {
      const first = !isDone(id); let xp = 0;
      if (first) { S().done[id] = { at: Date.now(), stars }; xp = 10 + stars * 5; st.addXP(xp); }
      else if (stars > (S().done[id].stars || 0)) { S().done[id].stars = stars; st.save(); }
      win($('#donebox', v), L, xp); chips(); markSteps(id);
    });
    cleanup.push(() => r.stop());
  }
  function win(box, L, xp) {
    box.innerHTML = '<div class="win" role="status"><div><b>Dars tugadi!</b>' + (xp ? '<span class="xpb">+' + xp + ' XP</span>' : '') + '</div><a class="btn pri" href="' + nextHref(L) + '">Keyingi dars →</a></div>';
  }
  function practice(v, L) {
    const { l, id } = L, p = l.prac;
    if (p.type === 'robot') return robotPrac(v, L);
    document.body.classList.add('full');
    const code = Object.assign({ html: p.html || '', css: p.css || '', js: p.js || '' }, S().code[id] || {});
    const tabs = p.tabs || ['html', 'css', 'js']; let tab = p.open || tabs[0];
    v.innerHTML = '<div class="ws"><aside class="ws-task"><h2>Vazifa</h2><p class="task">' + p.task + '</p><h3 class="tl-h">Talablar</h3><ul class="tl">' + p.tests.map((t, k) => '<li data-k="' + k + '"><i aria-hidden="true"></i>' + e(t[0]) + '</li>').join('') + '</ul>' +
      '<div class="acts"><button class="btn pri" id="chk">Tekshirish</button><button class="btn" id="hint">Yordam</button></div><div id="donebox" class="donebox"></div>' +
      '<div id="hintbox" class="hintbox" hidden><b>Maslahat</b><pre><code>' + e(p.hint || '') + '</code></pre></div><div id="solbox"></div>' +
      '<button class="lnk" id="rst">Kodni boshidan boshlash</button></aside>' +
      '<section class="ws-ed"><div class="tabs" role="tablist">' + tabs.map(t => '<button class="tab" role="tab" data-t="' + t + '">' + t.toUpperCase() + '</button>').join('') + '<span class="kbd">Ctrl+Enter: ishga tushirish</span></div><div class="edhost"></div></section>' +
      '<section class="ws-out"><div class="obar"><span class="dot"></span>Natija<small>yozgan zahoti yangilanadi</small></div><iframe sandbox="allow-scripts allow-modals" title="Natija"></iframe><div class="cons"><div class="cons-h"><span>Konsol</span><button class="lnk" id="clr">Tozalash</button></div><div class="logs"></div></div></section></div>';
    const fr = $('iframe', v), logs = $('.logs', v), cons = $('.cons', v);
    let timer, wait;
    const ed = KM.editor($('.edhost', v), { lang: tab, onChange: val => { code[tab] = val; S().code[id] = Object.assign({}, code); st.save(); clearTimeout(timer); timer = setTimeout(() => go(false), 450); }, onRun: () => go(false) });
    const setTab = t => { tab = t; $$('.tab', v).forEach(b => b.setAttribute('aria-selected', b.dataset.t === t)); ed.set(code[t], t); };
    function go(check) {
      logs.innerHTML = '';
      KM.run(fr, code, check ? p.tests : null, m => {
        if (m.t === 'tests') { clearTimeout(wait); result(m.a); return; }
        const d = document.createElement('div'); d.className = 'l ' + m.t; d.textContent = m.a.join(' '); logs.appendChild(d); cons.scrollTop = cons.scrollHeight;
      });
      if (check) { $$('.tl li', v).forEach(li => li.className = 'run'); clearTimeout(wait); wait = setTimeout(() => result(p.tests.map(() => false), "Kod javob bermadi. Konsoldagi xatoni tekshiring."), 4000); }
    }
    function result(a, msg) {
      const ok = a.every(Boolean), box = $('#donebox', v);
      $$('.tl li', v).forEach((li, k) => li.className = a[k] ? 'pass' : 'fail');
      if (ok) {
        const first = !isDone(id), xp = first ? ((S().sol || {})[id] ? 10 : 20) : 0;
        if (first) { S().done[id] = { at: Date.now() }; st.addXP(xp); }
        win(box, L, xp); chips(); markSteps(id);
      } else {
        S().fails[id] = (S().fails[id] || 0) + 1; st.save();
        const n = a.filter(Boolean).length;
        box.innerHTML = '<div class="lose" role="status">' + e(msg || (n + ' / ' + a.length + " talab bajarildi. Qizil belgilanganlarni tuzating.")) + '</div>';
        if (S().fails[id] >= 3) showSol();
      }
    }
    function showSol() {
      const sb = $('#solbox', v); if (sb.innerHTML || !p.sol) return;
      sb.innerHTML = '<div class="solbox"><p>Qiyin bo\'lyaptimi? Yechimni ko\'rish mumkin, lekin bu dars uchun 20 emas, 10 XP beriladi.</p><button class="btn" id="sol">Yechimni ko\'rsatish</button></div>';
      confirmBtn($('#sol', v), 'Ishonchingiz komilmi? Yana bosing', () => {
        S().sol = S().sol || {}; S().sol[id] = 1;
        Object.assign(code, p.sol); S().code[id] = Object.assign({}, code); st.save(); setTab(tab); go(false);
        sb.innerHTML = '<p class="muted">Yechim muharrirga yuklandi. Uni o\'qib chiqing, keyin "Tekshirish" ni bosing.</p>';
      });
    }
    $$('.tab', v).forEach(b => b.onclick = () => setTab(b.dataset.t));
    $('#chk', v).onclick = () => go(true);
    $('#hint', v).onclick = () => { const h = $('#hintbox', v); h.hidden = !h.hidden; };
    $('#clr', v).onclick = () => { logs.innerHTML = ''; };
    confirmBtn($('#rst', v), "Kod o'chadi. Yana bosing", () => { delete S().code[id]; st.save(); Object.assign(code, { html: p.html || '', css: p.css || '', js: p.js || '' }); setTab(tab); go(false); });
    if ((S().fails[id] || 0) >= 3) showSol();
    setTab(tab); go(false);
    if (isDone(id)) win($('#donebox', v), L, 0);
    cleanup.push(() => { clearTimeout(timer); clearTimeout(wait); });
  }

  /* ---------- Informatika (fan darslari) ---------- */
  const infDone = id => !!S().inf[id];
  function infIndex() {
    if (!isAdmin()) { const g = infGradeOf(); if (g && KM.infGrades.some(x => x.n === g)) { location.replace('#inf-' + g); return; } }
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap"><p class="pill-tag"><i></i>Fan darslari · taqvim-mavzu rejasi asosida</p><h1>Informatika</h1><p class="lead">Har bir mavzu: nazariya, "Esda tuting", test va uyga vazifa. Darsni sinfda proyektorga "Sinfda ko\'rsatish" tugmasi bilan chiqaring.</p></div></section>' +
      '<section class="band"><div class="wrap"><div class="inf-grid">' + Array.from({ length: 11 }, (_, i) => i + 1).map(n => {
        const g = KM.infGrades.find(x => x.n === n);
        if (!g) return '<div class="infc off"><span class="infc-n">' + n + '<small>-sinf</small></span><span class="muted">Reja hali yuklanmagan</span></div>';
        const parts = [...new Set(g.lessons.map(l => l.part))].length;
        return '<a class="infc" href="#inf-' + n + '"><span class="infc-n">' + n + '<small>-sinf</small></span><b>' + g.lessons.length + ' dars</b><span class="muted">' + g.hours + ' soat · haftasiga ' + (g.hours > 40 ? 2 : 1) + ' soat · ' + parts + ' bo\'lim</span></a>';
      }).join('') + '</div>' + (isAdmin() ? '' : '<p class="muted" style="margin-top:18px">Sizning sinfingizga Informatika kursi hali biriktirilmagan.</p>') + '</div></section>';
  }
  function infGradePage(n) {
    const g = KM.infGrades.find(x => x.n === n); if (!g) return notFound();
    if (!isAdmin() && infGradeOf() !== n) { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Bu boshqa sinf dasturi</h1><p>Siz faqat o\'z sinfingiz darslarini ko\'ra olasiz.</p><a class="btn pri" href="#informatika">Mening darslarim</a></div></section>'; return; }
    const done = g.lessons.filter(l => infDone(n + '-' + l.n)).length;
    let html = '', lastPart = null, lastSec = null;
    g.lessons.forEach(l => {
      if (l.part !== lastPart) { if (lastPart !== null) html += '</ol>'; html += '<h2 class="part-h">' + e(l.part || 'Darslar') + '</h2>'; lastPart = l.part; lastSec = null; html += '<ol class="inf-list">'; }
      if (l.sec && l.sec !== lastSec) { html += '<li class="sec-li">' + e(l.sec) + '</li>'; lastSec = l.sec; }
      const id = n + '-' + l.n, d = infDone(id), q = S().inf[id] && S().inf[id].q, ctrl = /nazorat/i.test(l.t), proj = /loyiha/i.test(l.t);
      html += '<li class="il' + (d ? ' done' : '') + '"><a href="#infdars-' + id + '"><span class="il-n">' + (d ? '✓' : l.n) + '</span><span class="il-b"><b>' + e(l.t) + (ctrl ? ' <em class="tag-c">nazorat</em>' : proj ? ' <em class="tag-p">loyiha</em>' : '') + '</b><small>' + e(l.hw) + '</small></span><span class="il-s">' + (q != null ? 'test ' + q + '/' + l.quiz.length : '') + '</span></a></li>';
    });
    html += '</ol>';
    app.innerHTML = '<section class="ghead grid-bg st-orta"><div class="wrap ghead-in"><div><a class="back" href="#informatika">← Informatika</a><h1>' + n + '-sinf: Informatika</h1><p class="lead">' + g.lessons.length + ' dars · ' + g.hours + ' soat. Rejadagi mavzu va uyga vazifalar asosida.</p></div><div class="gring">' + ring(done / g.lessons.length, 88) + '<span><b>' + done + ' / ' + g.lessons.length + '</b>dars o\'qildi</span></div></div></section>' +
      '<section class="band"><div class="wrap narrow">' + html + '</div></section>';
  }
  function infLessonPage(id) {
    const L = KM.infLesson(id); if (!L) return notFound();
    const { g, l } = L, n = g.n;
    if (!isAdmin() && infGradeOf() !== n) { location.replace('#informatika'); return; }
    const prev = g.lessons[L.idx - 1], next = g.lessons[L.idx + 1];
    app.innerHTML = '<div class="lbar st-orta"><div class="lbar-in"><a class="back" href="#inf-' + n + '">← ' + n + '-sinf</a><h1 class="lt">' + l.n + '. ' + e(l.t) + '</h1><div class="acts" style="margin:0"><button class="btn sm ghost" id="present">Sinfda ko\'rsatish</button></div></div></div>' +
      '<article class="band inf-art"><div class="wrap inf-lay"><div class="theory" id="th"><p class="crumb">' + e([l.part, l.sec].filter(Boolean).join(' · ')) + '</p><h2 class="th-h">' + e(l.t) + '</h2>' + (KM.md(l.md) || '<p class="muted">Bu dars uchun nazariya hali yozilmagan.</p>') + '</div>' +
      '<aside class="inf-side"><div class="hw-card"><b>Uyga vazifa</b><p>' + e(l.hw || '—') + '</p></div>' + (l.quiz.length ? '<a class="btn pri wide" href="#q">Testni yechish (' + l.quiz.length + ' savol)</a>' : '') +
      '<div class="pn">' + (prev ? '<a class="btn" href="#infdars-' + n + '-' + prev.n + '">← ' + prev.n + '-dars</a>' : '<span></span>') + (next ? '<a class="btn" href="#infdars-' + n + '-' + next.n + '">' + next.n + '-dars →</a>' : '') + '</div></aside></div></article>' +
      '<section class="band alt" id="q"><div class="wrap narrow"><h2 class="sub0">Test</h2><div id="qz"></div><div id="rd"></div></div></section>';
    $$('pre.ex', app).forEach(p => { const c = p.querySelector('code'); c.innerHTML = KM.hl(c.textContent, p.dataset.l); });
    const mark = (score) => {
      const cur = S().inf[id], first = !cur;
      const best = Math.max(score == null ? -1 : score, cur && cur.q != null ? cur.q : -1);
      S().inf[id] = { at: (cur && cur.at) || Date.now() }; if (best >= 0) S().inf[id].q = best;
      if (!isAdmin()) st.addXP((first ? 5 : 0) + (score != null && score > ((cur && cur.q) || 0) ? (score - ((cur && cur.q) || 0)) * 5 : 0)); else st.save();
      chips();
    };
    if (l.quiz.length) quizBox($('#qz'), l.quiz.map(q => [q[0], q[1], q[2], '']), sc => { mark(sc); $('#rd').innerHTML = '<div class="win" role="status"><div><b>Dars o\'qildi!</b></div>' + (next ? '<a class="btn pri" href="#infdars-' + n + '-' + next.n + '">Keyingi dars →</a>' : '<a class="btn pri" href="#inf-' + n + '">Sinf darslari</a>') + '</div>'; });
    else { $('#qz').innerHTML = '<p class="muted">Bu darsda test yo\'q.</p>'; $('#rd').innerHTML = '<button class="btn pri" id="readbtn">O\'qidim</button>'; $('#readbtn').onclick = () => { mark(null); $('#rd').innerHTML = '<p class="ok-t">Belgilandi ✓</p>'; }; }
    $('#present').onclick = () => {
      document.body.classList.toggle('present');
      const on = document.body.classList.contains('present');
      $('#present').textContent = on ? 'Ko\'rsatishni tugatish' : 'Sinfda ko\'rsatish';
      try { on ? document.documentElement.requestFullscreen && document.documentElement.requestFullscreen() : document.fullscreenElement && document.exitFullscreen(); } catch (x) {}
    };
    const onFs = () => { if (!document.fullscreenElement && document.body.classList.contains('present')) { document.body.classList.remove('present'); const b = $('#present'); if (b) b.textContent = 'Sinfda ko\'rsatish'; } };
    document.addEventListener('fullscreenchange', onFs);
    cleanup.push(() => { document.removeEventListener('fullscreenchange', onFs); document.body.classList.remove('present'); });
  }
  /* Umumiy test bloki: questions = [[savol, [variantlar], to'g'ri_indeks, izoh], ...] */
  function quizBox(v, Q, onFinish) {
    let ans = Q.map(() => null), reported = false;
    const draw = () => {
      const fin = ans.every(a => a !== null), score = ans.filter((a, k) => a === Q[k][2]).length;
      v.innerHTML = '<ol class="quiz">' + Q.map((q, k) => '<li class="qq"><h3>' + e(q[0]) + '</h3><div class="opts">' + q[1].map((o, j) => {
        let cls = ''; if (ans[k] !== null) { if (j === q[2]) cls = ' right'; else if (j === ans[k]) cls = ' wrong'; }
        return '<button class="opt' + cls + '" data-k="' + k + '" data-j="' + j + '"' + (ans[k] !== null ? ' disabled' : '') + '>' + e(o) + '</button>';
      }).join('') + '</div>' + (ans[k] !== null ? '<p class="why ' + (ans[k] === q[2] ? 'ok' : 'bad') + '">' + (ans[k] === q[2] ? "To'g'ri!" : "Noto'g'ri. To'g'ri javob: " + e(q[1][q[2]])) + (q[3] ? ' ' + e(q[3]) : '') + '</p>' : '') + '</li>').join('') + '</ol>' +
        (fin ? '<div class="qres"><div><b>' + score + ' / ' + Q.length + '</b><span>' + (score === Q.length ? "A'lo natija!" : "Yaxshi! Xatolar ustida yana bir o'ylab ko'ring.") + '</span></div><div class="acts"><button class="btn" data-re="1">Qayta yechish</button></div></div>' : '');
      if (fin && !reported) { reported = true; onFinish(score); }
    };
    v.onclick = ev => { const b = ev.target.closest('.opt'); if (b) { ans[+b.dataset.k] = +b.dataset.j; draw(); } else if (ev.target.dataset.re) { ans = ans.map(() => null); reported = false; draw(); } };
    draw();
  }

  /* ---------- Materiallar ---------- */
  const MK = { link: ['Sayt', '↗'], video: ['Video', '▶'], text: ['Matn', '¶'], file: ['Fayl', '⇩'] };
  const gname = id => { const g = groups().find(g => g.id === id) || (KM._allGroups || []).find(g => g.id === id); return g ? g.name : null; };
  function matCard(m) {
    const gs = (m.group_ids || []).map(gname).filter(Boolean);
    return '<a class="mat k-' + m.kind + '" href="#material-' + e(m.id) + '"><span class="mat-i" aria-hidden="true">' + MK[m.kind][1] + '</span><span class="mat-b"><small>' + MK[m.kind][0] + (m.file ? ' · ' + e(m.file.name) : '') + '</small><b>' + e(m.title) + '</b>' + (m.body && m.kind !== 'text' ? '<span>' + e(m.body.slice(0, 110)) + '</span>' : '') + (gs.length ? '<span class="mat-g">' + gs.map(e).join(' · ') + '</span>' : '') + '</span></a>';
  }
  KM.matCard = matCard;
  async function materials(gid) {
    app.innerHTML = '<section class="ahead grid-bg"><div class="wrap ahead-in"><div><p class="pill-tag"><i></i>Saytlar, videolar, matn va fayllar</p><h1>Materiallar</h1><p class="lead">O\'qituvchi sinfingiz va to\'garaklaringiz uchun qo\'shgan materiallar. Hammasi shu yerning o\'zida ochiladi.</p></div>' + (isAdmin() ? '<div class="acts"><a class="btn pri" href="#admin-materiallar">Materiallarni boshqarish</a></div>' : '') + '</div></section><section class="band"><div class="wrap"><div id="mf"></div><div class="mat-grid" id="ml"><p class="muted">Yuklanmoqda…</p></div></div></section>';
    let ms; try { ms = await KM.api.materials(); } catch (x) { $('#ml').innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; return; }
    const gs = isAdmin() ? [] : groups();
    let cur = gid || '';
    const draw = () => {
      const list = cur ? ms.filter(m => (m.group_ids || []).includes(cur)) : ms;
      $('#ml').innerHTML = list.length ? list.map(matCard).join('') : '<div class="empty-s"><p>Bu yerda hozircha material yo\'q.</p></div>';
      $('#mf').innerHTML = gs.length > 1 ? '<div class="chipf">' + [['', 'Hammasi']].concat(gs.map(g => [g.id, g.name])).map(x => '<button class="' + (x[0] === cur ? 'on' : '') + '" data-g="' + e(x[0]) + '">' + e(x[1]) + '</button>').join('') + '</div>' : '';
      $$('#mf button').forEach(b => b.onclick = () => { cur = b.dataset.g; draw(); });
    };
    draw();
  }
  const ytId = u => { const m = String(u).match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/); return m && m[1]; };
  async function materialView(id) {
    app.innerHTML = '<div class="splash grid-bg"><span class="caret"></span></div>';
    let ms; try { ms = await KM.api.materials(); } catch (x) { return notFound(); }
    const m = ms.find(x => x.id === id); if (!m) return notFound();
    let body = '';
    if (m.kind === 'link') body = '<div class="frame-wrap"><iframe src="' + e(m.url) + '" title="' + e(m.title) + '" allow="fullscreen; clipboard-write" referrerpolicy="no-referrer-when-downgrade"></iframe></div><p class="muted fr-note">Sayt bu oynada ko\'rinmasa (ba\'zi saytlar boshqa sayt ichida ochilishga ruxsat bermaydi), yuqoridagi "Yangi oynada ochish" tugmasini bosing.</p>';
    else if (m.kind === 'video') { const y = ytId(m.url); body = y ? '<div class="frame-wrap vid"><iframe src="https://www.youtube-nocookie.com/embed/' + y + '" title="' + e(m.title) + '" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>' : /\.(mp4|webm|ogg)(\?|$)/i.test(m.url) ? '<video class="vid-el" controls src="' + e(m.url) + '"></video>' : '<div class="frame-wrap vid"><iframe src="' + e(m.url) + '" title="' + e(m.title) + '" allowfullscreen></iframe></div>'; }
    else if (m.kind === 'file') body = '<div id="fv" class="fv"><p class="muted">Fayl yuklanmoqda…</p></div>';
    app.innerHTML = '<div class="lbar"><div class="lbar-in"><a class="back" href="#materiallar">← Materiallar</a><h1 class="lt">' + e(m.title) + '</h1>' + ((m.kind === 'link' || m.kind === 'video') ? '<a class="btn sm ghost" href="' + e(m.url) + '" target="_blank" rel="noopener">Yangi oynada ochish ↗</a>' : '') + '</div></div>' +
      '<section class="band mat-view"><div class="wrap">' + (m.body ? '<div class="theory mat-body">' + KM.md(m.body) + '</div>' : '') + body + '</div></section>';
    if (m.kind === 'file' && m.file) {
      try {
        const f = await KM.api.file(m.file.id), blob = await (await fetch(f.data)).blob(), url = URL.createObjectURL(blob), fv = $('#fv');
        if (!fv) return;
        const dl = '<a class="btn pri" href="' + url + '" download="' + e(f.name) + '">Yuklab olish: ' + e(f.name) + '</a>';
        fv.innerHTML = (/^image\//.test(f.mime) ? '<img class="fv-img" src="' + url + '" alt="' + e(f.name) + '">' : /pdf$/.test(f.mime) ? '<div class="frame-wrap"><iframe src="' + url + '" title="' + e(f.name) + '"></iframe></div>' : /^video\//.test(f.mime) ? '<video class="vid-el" controls src="' + url + '"></video>' : /^audio\//.test(f.mime) ? '<audio controls src="' + url + '"></audio>' : '<p class="muted">Bu faylni brauzerda ko\'rsatib bo\'lmaydi, yuklab olib oching.</p>') + '<div class="acts">' + dl + '</div>';
        cleanup.push(() => URL.revokeObjectURL(url));
      } catch (x) { const fv = $('#fv'); if (fv) fv.innerHTML = '<p class="bad-t">' + e(x.message) + '</p>'; }
    }
  }

  /* ---------- Kod maydoni (playground) ---------- */
  const TPL = {
    bosh: { name: 'Yangi loyiha', d: "Bo'sh sahifa", html: '<h1>Salom!</h1>\n', css: 'body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n', js: '' },
    karta: { name: 'Tabriknoma', d: 'HTML va CSS', html: '<div class="karta">\n  <h1>Tug\'ilgan kuning bilan!</h1>\n  <p>Senga baxt va omad tilayman.</p>\n</div>\n', css: 'body {\n  display: grid;\n  place-items: center;\n  min-height: 100vh;\n  margin: 0;\n  background: #ffd84a;\n  font-family: Georgia, serif;\n}\n\n.karta {\n  background: white;\n  padding: 32px;\n  border-radius: 20px;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n}\n', js: '' },
    oyin: { name: "Raqamni top o'yini", d: 'JavaScript', html: '<h1>1 dan 100 gacha son o\'yladim</h1>\n<input id="t" type="number" placeholder="Taxminingiz">\n<button id="b">Tekshirish</button>\n<p id="j"></p>\n', css: 'body {\n  font-family: sans-serif;\n  padding: 24px;\n}\n\ninput, button {\n  font-size: 18px;\n  padding: 8px;\n}\n', js: 'const son = Math.floor(Math.random() * 100) + 1;\nlet urinish = 0;\n\ndocument.querySelector("#b").addEventListener("click", () => {\n  const t = Number(document.querySelector("#t").value);\n  urinish++;\n  const j = document.querySelector("#j");\n  if (t === son) j.textContent = "Topdingiz! " + urinish + " ta urinishda.";\n  else if (t < son) j.textContent = "Kattaroq son ayting";\n  else j.textContent = "Kichikroq son ayting";\n});\n' },
    canvas: { name: 'Canvas rasm', d: 'Grafika', html: '<canvas id="c" width="400" height="300"></canvas>\n', css: 'body {\n  margin: 0;\n  background: #0b1020;\n}\n\ncanvas {\n  display: block;\n  max-width: 100%;\n}\n', js: 'const c = document.querySelector("#c");\nconst ctx = c.getContext("2d");\n\nfor (let i = 0; i < 60; i++) {\n  ctx.fillStyle = "hsl(" + (i * 6) + ", 90%, 60%)";\n  ctx.beginPath();\n  ctx.arc(Math.random() * 400, Math.random() * 300, Math.random() * 30 + 5, 0, Math.PI * 2);\n  ctx.fill();\n}\n' }
  };
  function newProject(name, c) {
    const pr = { id: 'p' + Date.now().toString(36), name, html: c.html || '', css: c.css || '', js: c.js || '', t: Date.now() };
    S().projects.unshift(pr); st.save(); return pr;
  }
  function maydon() {
    const ps = S().projects;
    app.innerHTML = '<section class="band"><div class="wrap"><div class="pg-h"><h1>Kod maydoni</h1><p class="lead">Darsdan tashqari erkin ijod: o\'z sahifangiz, o\'yiningiz yoki tajribangiz. Loyihalar hisobingizda saqlanadi.</p></div>' +
      '<h2 class="sub">Yangi loyiha</h2><div class="tpls">' + Object.keys(TPL).map(k => '<button class="tpl" data-k="' + k + '"><b>' + e(TPL[k].name) + '</b><span>' + e(TPL[k].d) + '</span></button>').join('') + '</div>' +
      '<h2 class="sub">Mening loyihalarim</h2>' + (ps.length ? '<div class="projs">' + ps.map(p => '<a class="proj" href="#maydon-' + p.id + '"><b>' + e(p.name) + '</b><span>' + new Date(p.t).toLocaleDateString('uz-UZ') + ' · ' + (p.html.split('\n').length + p.css.split('\n').length + p.js.split('\n').length) + ' qator</span></a>').join('') + '</div>' : '<div class="empty-s"><p>Hali loyiha yo\'q. Yuqoridagi namunalardan birini tanlang yoki darsdagi misolni "Maydonda sinab ko\'rish" tugmasi bilan oching.</p></div>') +
      '</div></section>';
    $$('.tpl').forEach(b => b.onclick = () => { const t = TPL[b.dataset.k]; location.hash = 'maydon-' + newProject(t.name, t).id; });
  }
  function maydonEd(pid) {
    const pr = S().projects.find(p => p.id === pid); if (!pr) return notFound();
    document.body.classList.add('full');
    let tab = 'html';
    app.innerHTML = '<div class="ws pg"><div class="pg-bar"><a class="back" href="#maydon">← Loyihalar</a><label class="vh" for="pname">Loyiha nomi</label><input id="pname" value="' + e(pr.name) + '"><div class="acts"><button class="btn" id="dl">Yuklab olish (.html)</button><button class="btn" id="del">O\'chirish</button></div></div>' +
      '<section class="ws-ed"><div class="tabs" role="tablist">' + ['html', 'css', 'js'].map(t => '<button class="tab" role="tab" data-t="' + t + '">' + t.toUpperCase() + '</button>').join('') + '<span class="kbd">Avtomatik saqlanadi</span></div><div class="edhost"></div></section>' +
      '<section class="ws-out"><div class="obar"><span class="dot"></span>Natija<small id="saved">saqlandi</small></div><iframe sandbox="allow-scripts allow-modals" title="Natija"></iframe><div class="cons"><div class="cons-h"><span>Konsol</span><button class="lnk" id="clr">Tozalash</button></div><div class="logs"></div></div></section></div>';
    const v = app, fr = $('iframe', v), logs = $('.logs', v), cons = $('.cons', v); let timer;
    const go = () => { logs.innerHTML = ''; KM.run(fr, pr, null, m => { const d = document.createElement('div'); d.className = 'l ' + m.t; d.textContent = m.a.join(' '); logs.appendChild(d); cons.scrollTop = cons.scrollHeight; }); };
    const ed = KM.editor($('.edhost', v), { lang: tab, onChange: val => { pr[tab] = val; pr.t = Date.now(); st.save(); clearTimeout(timer); timer = setTimeout(go, 450); }, onRun: go });
    const setTab = t => { tab = t; $$('.tab', v).forEach(b => b.setAttribute('aria-selected', b.dataset.t === t)); ed.set(pr[t], t); };
    $$('.tab', v).forEach(b => b.onclick = () => setTab(b.dataset.t));
    $('#pname').oninput = ev => { pr.name = ev.target.value || 'Nomsiz loyiha'; st.save(); };
    $('#clr').onclick = () => { logs.innerHTML = ''; };
    $('#dl').onclick = () => { if (!download((pr.name || 'loyiha').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '-') + '.html', KM.page(pr), 'text/html')) $('#saved').textContent = 'yuklab bo\'lmadi'; };
    confirmBtn($('#del'), "Rostdan o'chirilsinmi? Yana bosing", () => { S().projects = S().projects.filter(p => p.id !== pid); st.save(); location.hash = 'maydon'; });
    setTab('html'); go();
    cleanup.push(() => clearTimeout(timer));
  }

  /* ---------- Profil ---------- */
  function profil() {
    const u = me(), lv = st.level(), into = S().xp % 100, dc = doneCount(), tl = total();
    app.innerHTML = '<section class="phead grid-bg"><div class="wrap phead-in"><div class="polaroid tilt-l big">' + KM.stk.face(u) + '<span class="pol-cap">' + e(u.login) + (u.class_name ? ' · ' + e(u.class_name) : '') + '</span></div><div><p class="pill-tag"><i></i>' + (u.class_name ? e(u.class_name) + ' sinf' : 'O\'quvchi') + '</p><h1>' + e(u.full_name) + '</h1><p class="lead">' + lv + '-daraja · keyingi darajaga ' + (100 - into) + ' XP qoldi</p><div class="acts"><button class="btn pri" id="stkbtn">Stikerlarni o\'zgartirish</button><button class="btn ghost" id="pwbtn">Parolni o\'zgartirish</button><button class="btn ghost" id="outbtn">Chiqish</button></div></div></div></section>' +
      '<section class="band" id="edsec" hidden><div class="wrap"><div class="panel"><h2>Rasmimni bezash</h2><div id="sted"></div><div class="acts"><button class="btn pri" id="stksave">Saqlash</button><button class="btn" id="stkcancel">Bekor qilish</button><span id="stkmsg" class="muted" role="status"></span></div></div></div></section>' +
      '<section class="band" id="pwsec" hidden><div class="wrap narrow"><form class="panel" id="pwf"><h2>Parolni o\'zgartirish</h2><label class="lab" for="op">Hozirgi parol</label><input class="inp" id="op" type="password" autocomplete="current-password"><label class="lab" for="np">Yangi parol (kamida 6 belgi)</label><input class="inp" id="np" type="password" autocomplete="new-password"><div class="acts"><button class="btn pri">Saqlash</button><span id="pwmsg" role="status"></span></div></form></div></section>' +
      '<section class="band"><div class="wrap"><div class="stats4"><div class="stat2"><b>' + S().xp + '</b><span>XP</span></div><div class="stat2"><b>' + dc + ' / ' + tl + '</b><span>dars tugatildi</span></div><div class="stat2"><b>' + S().streak.n + '</b><span>kun ketma-ket</span></div><div class="stat2"><b>' + S().projects.length + '</b><span>loyiha</span></div></div>' +
      '<h2 class="sub">Nishonlar</h2><div class="badges">' + BADGES.map(b => { const got = b[3](); return '<div class="bd' + (got ? ' got' : '') + '"><span class="bd-i">' + e(b[0]) + '</span><b>' + e(b[1]) + '</b><small>' + e(b[2]) + '</small></div>'; }).join('') + '</div>' +
      '<h2 class="sub">Dasturlash darajalari</h2><div class="gp">' + G().map(g => { const p = gradeProg(g); return '<a class="gp-r st-' + g.stage + '" href="#' + (p.d === p.n ? 'sertifikat-' : 'sinf-') + g.n + '"><span class="gp-n">' + g.n + '-daraja</span><span class="bar"><b style="width:' + p.p * 100 + '%"></b></span><span class="gp-v">' + p.d + '/' + p.n + '</span><span class="gp-c">' + (p.d === p.n ? 'Sertifikat' : '') + '</span></a>'; }).join('') + '</div></div></section>';
    $('#outbtn').onclick = logout;
    $('#pwbtn').onclick = () => { $('#pwsec').hidden = !$('#pwsec').hidden; if (!$('#pwsec').hidden) $('#op').focus(); };
    $('#pwf').onsubmit = async ev => {
      ev.preventDefault(); const m = $('#pwmsg');
      try { await KM.api.changePassword($('#op').value, $('#np').value); m.className = 'ok-t'; m.textContent = 'Parol o\'zgartirildi.'; $('#op').value = $('#np').value = ''; }
      catch (x) { m.className = 'bad-t'; m.textContent = x.message; }
    };
    let ed = null;
    $('#stkbtn').onclick = () => { $('#edsec').hidden = false; ed = KM.stk.editor($('#sted'), { name: u.full_name, photo: u.photo, photoKind: u.photo_kind, stickers: u.stickers, photoEdit: false, avatar: u.photo_kind !== 'photo' }); $('#edsec').scrollIntoView({ behavior: 'smooth' }); };
    $('#stkcancel').onclick = () => { $('#edsec').hidden = true; };
    $('#stksave').onclick = async () => {
      const m = $('#stkmsg'); m.textContent = 'Saqlanmoqda…';
      try {
        const g = ed.get(); await KM.api.setMyStickers(g.stickers);
        const upd = { stickers: g.stickers };
        if (u.photo_kind !== 'photo' && g.photo !== u.photo) { const r = await KM.api.setMyAvatar(g.photo); upd.photo = r.photo; upd.photo_kind = r.photo_kind; }
        KM.refreshMe(upd); profil();
      } catch (x) { m.textContent = x.message; }
    };
  }

  /* ---------- O'quv dasturi (admin uchun) ---------- */
  KM.curriculum = function () {
    const sample = "KM.sinf({ n: 12, stage: 'yuqori', t: `Mavzu`, d: `Qisqa tavsif`, lessons: [\n  {\n    t: `Dars nomi`, min: 20,\n    key: `Asosiy fikr bir gapda`,\n    theory: `<p>Nazariya matni...</p>` + KM.x(`<h1>Misol</h1>`),\n    quiz: [\n      [`Savol?`, [`A javob`, `B javob`, `C javob`], 1, `Nega B to'g'ri`]\n    ],\n    prac: {\n      task: `Vazifa matni`,\n      tabs: ['html', 'css'],\n      html: `<h1>Boshlang'ich kod</h1>`,\n      tests: [\n        [`Sahifada h2 bor`, () => !!document.querySelector('h2')]\n      ],\n      hint: `Maslahat`,\n      sol: { html: `<h1>Yechim</h1><h2>...</h2>` }\n    }\n  }\n] });";
    return '<div class="panel"><h2>O\'quv dasturi</h2><p class="muted">' + G().length + ' ta sinf, ' + total() + ' ta dars, jami ' + G().reduce((a, g) => a + g.lessons.reduce((b, l) => b + l.min, 0), 0) + ' daqiqa.</p>' +
      G().map(g => '<details class="cur"><summary><b>' + g.n + '-sinf</b> ' + e(g.t) + '<span>' + g.lessons.length + ' dars</span></summary><div class="scroll"><table><thead><tr><th>Dars</th><th>Daqiqa</th><th>Amaliyot</th><th>Talablar</th></tr></thead><tbody>' + lessonsOf(g).map(x => '<tr><td><a href="#dars-' + x.id + '">' + x.i + '. ' + e(x.l.t) + '</a></td><td>' + x.l.min + '</td><td>' + (x.l.prac.type === 'robot' ? 'Robot' : (x.l.prac.tabs || ['html', 'css', 'js']).join(', ').toUpperCase()) + '</td><td>' + (x.l.prac.tests ? x.l.prac.tests.length : 1) + '</td></tr>').join('') + '</tbody></table></div></details>').join('') + '</div>' +
      '<div class="panel"><h2>Yangi dars qo\'shish</h2><p>Har bir sinf alohida faylda: <code>content/sinf-01.js</code> … <code>content/sinf-11.js</code>. Yangi dars qo\'shish uchun shu faylning <code>lessons</code> ro\'yxatiga obyekt qo\'shing.</p><pre class="ex" data-l="js"><code>' + KM.hl(sample, 'js') + '</code></pre><p class="muted">Testlar o\'quvchi sahifasi ichida bajariladi: <code>document</code>, <code>getComputedStyle</code>, o\'quvchi yozgan funksiyalar va <code>window.__logs</code>.</p></div>';
  };

  /* ---------- Sertifikat ---------- */
  function cert(n) {
    const g = G().find(g => g.n === n); if (!g) return notFound();
    const p = gradeProg(g);
    if (p.d < p.n) { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Sertifikat hali tayyor emas</h1><p>' + g.n + '-sinfning hamma darslarini tugating: hozir ' + p.d + ' / ' + p.n + '.</p><a class="btn pri" href="#sinf-' + n + '">Darslarga qaytish</a></div></section>'; return; }
    const last = Math.max(...lessonsOf(g).map(x => S().done[x.id].at || 0)), d = new Date(last || Date.now());
    app.innerHTML = '<section class="band"><div class="wrap"><div class="cert st-' + g.stage + '"><div class="cert-in"><p class="cert-k">' + e(KM.config.schoolName || 'ZIS ProStudent') + ' · Dasturlash to\'garagi</p><h1>Sertifikat</h1><p>Ushbu sertifikat</p><p class="cert-n">' + e(me().full_name) + '</p><p>ga <b>' + g.n + '-sinf</b> dasturlash kursi <b>«' + e(g.t) + '»</b> ni muvaffaqiyatli tamomlagani uchun beriladi.</p><div class="cert-f"><div><b>' + g.lessons.length + ' dars</b><span>nazariya, test, amaliyot</span></div><div><b>' + d.toLocaleDateString('uz-UZ') + '</b><span>sana</span></div><div><b class="sig"></b><span>To\'garak rahbari</span></div></div></div></div>' +
      '<div class="acts noprint"><button class="btn pri" id="pr">Chop etish yoki PDF</button><a class="btn" href="#sinf-' + n + '">Orqaga</a></div></div></section>';
    $('#pr').onclick = () => { try { window.print(); } catch (err) {} };
  }
  function notFound() { app.innerHTML = '<section class="band"><div class="wrap narrow empty"><h1>Sahifa topilmadi</h1><p>Bunday sahifa yo\'q yoki o\'chirilgan.</p><a class="btn pri" href="#bosh">Bosh sahifaga</a></div></section>'; }
  KM.notFound = notFound;

  /* ---------- Router ---------- */
  function route() {
    cleanup.forEach(f => f()); cleanup = []; document.body.classList.remove('full');
    const h = decodeURIComponent(location.hash.slice(1)) || '', p = h.split('-');
    if (!KM.session) { loginView(KM._needSetup); return; }
    if (p[0] === 'kirish') { location.hash = isAdmin() ? 'admin' : 'bosh'; return; }
    let nav = p[0] || 'bosh';
    if (p[0] === 'admin') { if (!isAdmin()) { location.hash = 'bosh'; return; } nav = 'admin'; KM.admin.route(h, app); }
    else if (p[0] === 'dasturlash') { nav = 'dasturlash'; codingHome(); }
    else if (p[0] === 'sinf') { nav = 'dasturlash'; grade(+p[1]); }
    else if (p[0] === 'dars') { nav = 'dasturlash'; lesson(p[1] + '-' + p[2], p[3] || ''); }
    else if (p[0] === 'informatika') { nav = 'informatika'; infIndex(); }
    else if (p[0] === 'inf') { nav = 'informatika'; infGradePage(+p[1]); }
    else if (p[0] === 'infdars') { nav = 'informatika'; infLessonPage(p[1] + '-' + p[2]); }
    else if (p[0] === 'materiallar') { nav = 'materiallar'; materials(h.slice(12)); }
    else if (p[0] === 'material') { nav = 'materiallar'; materialView(h.slice(9)); }
    else if (p[0] === 'maydon') { nav = 'maydon'; p[1] ? maydonEd(p[1]) : maydon(); }
    else if (p[0] === 'profil') { if (isAdmin()) { location.hash = 'admin'; return; } profil(); }
    else if (p[0] === 'sertifikat') cert(+p[1]);
    else if (isAdmin()) { location.hash = 'admin'; return; }
    else { nav = 'bosh'; home(); }
    header();
    $$('#nav a').forEach(a => a.classList.toggle('on', a.dataset.r === nav));
    window.scrollTo(0, 0);
  }
  KM.route = route;
  window.addEventListener('hashchange', route);
  $('#out').onclick = logout;

  /* ---------- Ishga tushirish ---------- */
  (async function boot() {
    app.innerHTML = '<div class="splash grid-bg"><span class="caret"></span></div>';
    try {
      if (KM.api.hasToken()) { const r = await KM.api.me(); start(r.user, r.progress); }
      else if (KM.api.mode === 'supabase') { const s = await KM.api.setupStatus(); KM._needSetup = !s.has_admin; }
    } catch (x) {
      if (x.code === 'SESSION') KM.api.clearToken();
      else if (x.code === 'NET') { app.innerHTML = '<section class="login grid-bg"><div class="login-in"><div class="login-t"><h1>Server bilan aloqa yo\'q</h1><p class="lead">' + e(x.message) + '</p><div class="acts"><button class="btn pri big" onclick="location.reload()">Qayta urinish</button></div></div></div></section>'; return; }
    }
    route();
  })();
})();
