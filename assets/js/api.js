/* Server bilan aloqa. Ikki rejim:
   - supabase: config.js to'ldirilgan bo'lsa, supabase/schema.sql dagi km_* funksiyalarini chaqiradi
   - demo: server yo'q, xuddi shu funksiyalar brauzer xotirasida (sinab ko'rish uchun) */
(function () {
  const cfg = KM.config || {};
  const TK = 'km-token';
  const getToken = () => { try { return localStorage.getItem(TK) || ''; } catch (e) { return ''; } };
  const setToken = t => { try { t ? localStorage.setItem(TK, t) : localStorage.removeItem(TK); } catch (e) {} };
  class ApiError extends Error { constructor(m, code) { super(m); this.code = code; } }

  /* ---------- Supabase (PostgREST RPC) ---------- */
  async function rpc(fn, args, opt) {
    const h = { 'Content-Type': 'application/json', apikey: cfg.supabaseKey };
    if (/^eyJ/.test(cfg.supabaseKey)) h.Authorization = 'Bearer ' + cfg.supabaseKey;
    const base = String(cfg.supabaseUrl).trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
    let r;
    try { r = await fetch(base + '/rest/v1/rpc/' + fn, { method: 'POST', headers: h, body: JSON.stringify(args || {}), keepalive: !!(opt && opt.keepalive) }); }
    catch (e) { throw new ApiError("Serverga ulanib bo'lmadi. Internetni tekshiring.", 'NET'); }
    const t = await r.text(); let j = null; try { j = t ? JSON.parse(t) : null; } catch (e) {}
    if (!r.ok) { const m = (j && (j.message || j.msg || j.error)) || ('Server xatosi (' + r.status + ')'); const er = new ApiError(m === 'SESSION' ? 'Sessiya tugagan, qayta kiring' : m, m === 'SESSION' ? 'SESSION' : 'ERR'); er.status = r.status; throw er; }
    return j;
  }

  /* ---------- Demo (brauzer xotirasi) ---------- */
  const DK = 'kodmaktab-demo-db4';
  const uid = () => 'd' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
  const now = () => new Date().toISOString();
  const WORDS = ['olma', 'anor', 'nok', 'gilos', 'uzum', 'kitob', 'qalam', 'daftar', 'robot', 'yulduz', 'quyosh', 'bulut', 'daryo', 'lola', 'burgut', 'lochin', 'sher', 'kema', 'raketa', 'sayyora', 'kompas', 'piksel', 'ekran', 'kod', 'chinor', 'bodom'];
  const genPw = () => WORDS[Math.floor(Math.random() * WORDS.length)] + '-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  function seed() {
    const G = (id, name, grade, kind, courses, about) => ({ id, name, grade, kind, courses, about: about || null, created_at: now() });
    const c = [G('c3a', '3-A', 3, 'sinf', ['informatika']), G('c5a', '5-A', 5, 'sinf', ['informatika']), G('c6b', '6-B', 6, 'sinf', ['informatika', 'dasturlash']),
      G('kweb', 'Web dasturlash', 7, 'togarak', ['dasturlash'], 'Seshanba va payshanba, 15:00 · kompyuter sinfi'), G('kscr', 'Yosh dasturchilar', 1, 'togarak', ['dasturlash'], 'Shanba, 10:00 · 2–4-sinflar uchun')];
    const done = ids => { const o = {}; ids.forEach(i => o[i] = { at: Date.now() - 864e5 }); return o; };
    const g = (n, k) => Array.from({ length: k }, (_, i) => n + '-' + (i + 1));
    const S = (name, login, cls, xp, ids, inf, st, hoursAgo) => ({ id: uid(), role: 'student', login, pw: 'olma-2026', full_name: name, class_id: cls, photo: null, photo_kind: null, stickers: st || [], progress: { xp, done: done(ids), inf: done(inf), quiz: {}, code: {}, projects: [], streak: { last: '', n: 0 }, fails: {}, last: ids.length ? ids[ids.length - 1] : '' }, xp, lessons_done: ids.length + inf.length, created_at: now(), last_seen: hoursAgo == null ? null : new Date(Date.now() - hoursAgo * 36e5).toISOString() });
    const u = [
      { id: 'admin', role: 'admin', login: 'ustoz', pw: 'ustoz2026', full_name: 'Xojimurod Temirov', class_id: null, photo: null, stickers: [], progress: {}, xp: 0, lessons_done: 0, created_at: now(), last_seen: now() },
      S('Aziza Rahimova', 'aziza.rahimova', 'c6b', 410, [...g(5, 3), ...g(6, 3), ...g(7, 3), '8-1'], g('i6', 12), [{ k: 'crown', x: .5, y: .12, s: .34, r: -8 }, { k: 'e', t: '🚀', x: .8, y: .8, s: .26, r: 12 }], 1),
      S('Sardor Aliyev', 'sardor.aliyev', 'c6b', 260, [...g(5, 3), '6-1'], g('i6', 8), [{ k: 'glasses', x: .5, y: .45, s: .62, r: 0 }], 3),
      S('Madina Yusupova', 'madina.yusupova', 'c6b', 330, [...g(5, 3), ...g(6, 2)], g('i6', 10), [{ k: 'e', t: '🌟', x: .2, y: .2, s: .24, r: -12 }], 26),
      S('Jasur Karimov', 'jasur.karimov', 'c5a', 95, [], g('i5', 9), [], 50),
      S('Laylo Nazarova', 'laylo.nazarova', 'c5a', 180, [], g('i5', 14), [{ k: 'heart', x: .82, y: .2, s: .26, r: 12 }, { k: 'alo', x: .3, y: .84, s: .34, r: -6 }], 5),
      S('Bekzod Toshmatov', 'bekzod.toshmatov', 'c5a', 60, [], g('i5', 4), [{ k: 'e', t: '😎', x: .5, y: .5, s: .5, r: 0 }], 70),
      S('Ali Valiyev', 'ali.valiyev', 'c3a', 120, [...g(1, 3), '2-1'], g('i3', 6), [{ k: 'party', x: .5, y: .1, s: .3, r: 14 }], 2),
      S('Zarina Ergasheva', 'zarina.ergasheva', 'c3a', 75, ['1-1', '1-2'], g('i3', 5), [{ k: 'e', t: '🦄', x: .2, y: .78, s: .28, r: -10 }], 8)
    ];
    u.forEach(x => { if (x.progress && x.progress.inf) { const o = {}; Object.keys(x.progress.inf).forEach(k => o[k.replace(/^i/, '')] = x.progress.inf[k]); x.progress.inf = o; } });
    const byLogin = l => u.find(x => x.login === l).id;
    const members = [['kweb', 'aziza.rahimova'], ['kweb', 'sardor.aliyev'], ['kweb', 'madina.yusupova'], ['kscr', 'ali.valiyev'], ['kscr', 'zarina.ergasheva'], ['kscr', 'laylo.nazarova']].map(([gid, l]) => ({ group_id: gid, user_id: byLogin(l) }));
    const M = (title, kind, url, body, group_ids) => ({ id: uid(), title, kind, url: url || null, body: body || null, file_id: null, group_ids, created_at: now() });
    const materials = [
      M('Typing Jungle: 10 barmoq bilan yozish', 'link', 'https://www.edclub.com/library/typing-jungle', 'Har dars boshida 10 daqiqa mashq qiling. Natijangizni daftarga yozing.', ['c3a', 'c5a']),
      M('Jungle Junior: kichiklar uchun klaviatura', 'link', 'https://www.edclub.com/library/jungle-junior', null, ['c3a', 'kscr']),
      M('Scratch: loyihalar sayti', 'link', 'https://scratch.mit.edu/projects/editor/', 'Scratch muharririda bugungi topshiriqni bajaring.', ['c5a', 'c6b', 'kscr']),
      M('To\'garak qoidalari', 'text', null, '**Har darsda:**\n- Kompyuterni ehtiyot qiling.\n- Kodni saqlab boring.\n- Savol bo\'lsa — qo\'l ko\'taring.\n\n> Uyga vazifa platformada, "Dasturlash" bo\'limida.', ['kweb', 'kscr'])
    ];
    materials.forEach((m, i) => { m.created_at = new Date(Date.now() - i * 864e5).toISOString(); });
    const quizzes = [{ id: 'qz1', owner_id: 'admin', title: 'HTML teglari', questions: [
      { q: 'Paragraf qaysi teg bilan yoziladi?', o: ['<p>', '<h1>', '<br>', '<img>'], a: 0, t: 20 },
      { q: 'Havola tegining manzil atributi?', o: ['src', 'href', 'alt'], a: 1, t: 20 },
      { q: 'Rasm tegi qaysi?', o: ['<pic>', '<image>', '<img>'], a: 2, t: 20 },
      { q: 'HTML sahifaning ko\'rinadigan qismi?', o: ['<head>', '<body>', '<title>'], a: 1, t: 10 }], created_at: now(), updated_at: now() }];
    const assignments = [{ id: 'as1', title: 'Word: "Mening maktabim" hujjati', body: 'Maktabingiz haqida 5–7 gapli matn yozing, sarlavhani qalin qiling va 1 ta rasm qo\'shing. Faylni shu yerga yuklang.', group_ids: ['c5a', 'c6b'], due_at: new Date(Date.now() + 3 * 864e5).toISOString(), max_score: 5, lesson_ref: '5-13', created_at: now() }];
    return { classes: c, users: u, members, materials, files: [], sessions: {}, quizzes, games: [], players: [], answers: [], assignments, subs: [], awards: [] };
  }
  let db;
  const dload = () => { if (db) return db; try { db = JSON.parse(localStorage.getItem(DK) || 'null'); } catch (e) {} if (!db) { db = seed(); dsave(); } return db; };
  const dsave = () => { try { localStorage.setItem(DK, JSON.stringify(db)); } catch (e) { throw new ApiError("Brauzer xotirasi to'ldi (demo rejim). Kichikroq fayl tanlang."); } };
  const fail = m => { throw new ApiError(m, m === 'SESSION' ? 'SESSION' : 'ERR'); };
  const groupsOf = u => db.classes.filter(c => c.id === u.class_id || db.members.some(m => m.group_id === c.id && m.user_id === u.id)).sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name)).map(c => ({ id: c.id, name: c.name, grade: c.grade, kind: c.kind, courses: c.courses, inf_open: c.inf_open == null ? null : c.inf_open }));
  const pub = u => { const c = dload().classes.find(c => c.id === u.class_id); return { id: u.id, role: u.role, login: u.login, full_name: u.full_name, class_id: u.class_id, class_name: c ? c.name : null, grade: c ? c.grade : null, photo: u.photo, photo_kind: u.photo_kind || null, stickers: u.stickers, xp: u.xp, bonus_xp: u.bonus_xp || 0, lessons_done: u.lessons_done, last_seen: u.last_seen, created_at: u.created_at, groups: groupsOf(u) }; };
  const dauth = (t, role) => { const id = dload().sessions[t], u = db.users.find(u => u.id === id); if (!u) fail('SESSION');
    if (role === 'owner') { if (u.role !== 'admin') fail('Bu amalni faqat bosh admin bajara oladi'); }
    else if (role === 'admin') { if (u.role !== 'admin' && u.role !== 'teacher') fail("Bu amal uchun ruxsat yo'q"); }
    else if (role && u.role !== role) fail("Bu amal uchun ruxsat yo'q"); return u; };
  const myStaffGroups = u => u.role === 'admin' ? db.classes.map(c => c.id) : db.classes.filter(c => (c.teacher_ids || []).includes(u.id)).map(c => c.id);
  const hex = n => Array.from({ length: n }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
  const uniq = b => { b = (b || '').toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 34); if (b.length < 3) b = 'oquvchi'; let c = b, n = 1; while (dload().users.some(u => u.login === c)) c = b + (++n); return c; };
  const sess = u => { const t = uid() + uid(); db.sessions[t] = u.id; u.last_seen = now(); dsave(); return t; };
  const myGroupIds = u => [u.class_id, ...db.members.filter(m => m.user_id === u.id).map(m => m.group_id)].filter(Boolean);
  const matJson = m => { const f = db.files.find(f => f.id === m.file_id); return { id: m.id, title: m.title, kind: m.kind, url: m.url, body: m.body, group_ids: m.group_ids, created_at: m.created_at, file: f ? { id: f.id, name: f.name, mime: f.mime, size: Math.round(f.data.length * 3 / 4) } : null }; };
  const groupStudents = gids => db.users.filter(u => u.role === 'student' && (gids.includes(u.class_id) || db.members.some(m => m.user_id === u.id && gids.includes(m.group_id)))).sort((x, y) => x.full_name.localeCompare(y.full_name));
  const fileMeta = s => { const f = db.files.find(f => f.id === s.file_id); return { body: s.body, link: s.link, submitted_at: s.submitted_at, score: s.score == null ? null : s.score, comment: s.comment || null, graded_at: s.graded_at || null, file: f ? { id: f.id, name: f.name, mime: f.mime, size: Math.round(f.data.length * 3 / 4) } : null }; };
  function checkQuiz(q) {
    if (!Array.isArray(q) || q.length < 1 || q.length > 40) fail("Viktorinada 1 tadan 40 tagacha savol bo'lsin");
    q.forEach(e => {
      if (!String(e.q || '').trim() || e.q.length > 300) fail("Har bir savol matni 1–300 belgi bo'lsin");
      if (!Array.isArray(e.o) || e.o.length < 2 || e.o.length > 4) fail("Har savolda 2–4 ta javob bo'lsin");
      if (e.o.some(x => !String(x).trim() || String(x).length > 120)) fail("Javob variantlari bo'sh bo'lmasin (120 belgigacha)");
      if (!(e.a >= 0 && e.a < e.o.length)) fail("Har savolda to'g'ri javobni belgilang");
      if (![5, 10, 20, 30, 60, 90].includes(+(e.t || 20))) fail('Vaqt 5, 10, 20, 30, 60 yoki 90 soniya bo\'lsin');
    });
  }
  const gc = () => { db.files = db.files.filter(f => db.materials.some(m => m.file_id === f.id) || db.subs.some(x => x.file_id === f.id)); };
  const demo = {
    km_setup_status: () => ({ has_admin: dload().users.some(u => u.role === 'admin') }),
    km_setup_admin: a => { if (dload().users.some(u => u.role === 'admin')) fail('Admin allaqachon yaratilgan'); const u = { id: uid(), role: 'admin', login: a.p_login.toLowerCase().trim(), pw: a.p_password, full_name: a.p_name || 'Admin', stickers: [], progress: {}, xp: 0, lessons_done: 0, created_at: now() }; db.users.push(u); return { token: sess(u), user: pub(u) }; },
    km_login: a => { const u = dload().users.find(u => u.login === String(a.p_login || '').toLowerCase().trim()); if (!u || u.pw !== a.p_password) return { error: "Login yoki parol noto'g'ri" }; return { token: sess(u), user: pub(u), progress: u.progress }; },
    km_logout: a => { delete dload().sessions[a.p_token]; dsave(); },
    km_me: a => { const u = dauth(a.p_token); u.last_seen = now(); dsave(); return { user: pub(u), progress: u.progress }; },
    km_save_progress: a => { const u = dauth(a.p_token); u.progress = a.p_progress; u.xp = a.p_xp; u.lessons_done = a.p_done; u.last_seen = now(); dsave(); },
    km_set_my_stickers: a => { const u = dauth(a.p_token); u.stickers = a.p_stickers.slice(0, 30); dsave(); },
    km_set_my_avatar: a => { const u = dauth(a.p_token); if (u.photo_kind === 'photo') fail("Rasmingizni faqat o'qituvchi o'zgartira oladi"); u.photo = a.p_photo || null; u.photo_kind = a.p_photo ? 'emoji' : null; dsave(); return pub(u); },
    km_change_password: a => { const u = dauth(a.p_token); if (u.pw !== a.p_old) fail("Eski parol noto'g'ri"); if ((a.p_new || '').length < 6) fail("Yangi parol kamida 6 belgi bo'lsin"); u.pw = a.p_new; dsave(); },
    km_admin_overview: a => { const me = dauth(a.p_token, 'admin'), mg = myStaffGroups(me); return { role: me.role, teachers: me.role === 'admin' ? db.users.filter(u => u.role === 'teacher').map(t => ({ id: t.id, full_name: t.full_name, login: t.login, last_seen: t.last_seen, group_ids: db.classes.filter(c => (c.teacher_ids || []).includes(t.id)).map(c => c.id) })) : [], classes: db.classes.filter(c => mg.includes(c.id)).slice().sort((x, y) => x.kind.localeCompare(y.kind) || x.grade - y.grade || x.name.localeCompare(y.name)).map(c => Object.assign({}, c, { count: c.kind === 'sinf' ? db.users.filter(u => u.class_id === c.id).length : db.members.filter(m => m.group_id === c.id).length, member_ids: c.kind === 'togarak' ? db.members.filter(m => m.group_id === c.id).map(m => m.user_id) : [] })), students: db.users.filter(u => u.role === 'student').sort((x, y) => x.full_name.localeCompare(y.full_name)).map(pub) }; },
    km_admin_save_group: a => {
      dauth(a.p_token, 'admin'); const d = a.p_data, name = String(d.name || '').trim(), grade = +d.grade;
      if (!name || name.length > 40 || !(grade >= 1 && grade <= 11)) fail("Nomi 1–40 belgi, daraja 1–11 bo'lsin");
      if (db.classes.some(c => c.name === name && c.id !== a.p_id)) fail('"' + name + '" nomi band');
      let c = db.classes.find(c => c.id === a.p_id); if (a.p_id && !c) fail('Guruh topilmadi');
      if (!c) { const me = dauth(a.p_token, 'admin'); c = { id: uid(), kind: d.kind === 'togarak' ? 'togarak' : 'sinf', created_at: now(), teacher_ids: me.role === 'teacher' ? [me.id] : [] }; db.classes.push(c); }
      if ('tg_chat' in d) c.tg_chat = String(d.tg_chat || '').trim() || null;
      Object.assign(c, { name, grade, courses: (d.courses || []).filter(x => x === 'informatika' || x === 'dasturlash'), about: (d.about || '').trim() || null }); if ('inf_open' in d) c.inf_open = d.inf_open === '' || d.inf_open == null ? null : +d.inf_open; dsave(); return c;
    },
    km_admin_delete_class: a => { dauth(a.p_token, 'admin'); db.classes = db.classes.filter(c => c.id !== a.p_id); db.members = db.members.filter(m => m.group_id !== a.p_id); db.users.forEach(u => { if (u.class_id === a.p_id) u.class_id = null; }); dsave(); },
    km_admin_set_members: a => { dauth(a.p_token, 'admin'); if (!db.classes.some(c => c.id === a.p_group && c.kind === 'togarak')) fail("To'garak topilmadi"); (a.p_add || []).forEach(id => { if (db.users.some(u => u.id === id && u.role === 'student') && !db.members.some(m => m.group_id === a.p_group && m.user_id === id)) db.members.push({ group_id: a.p_group, user_id: id }); }); db.members = db.members.filter(m => !(m.group_id === a.p_group && (a.p_remove || []).includes(m.user_id))); dsave(); },
    km_admin_move_students: a => { dauth(a.p_token, 'admin'); if (a.p_class && !db.classes.some(c => c.id === a.p_class && c.kind === 'sinf')) fail('Sinf topilmadi'); db.users.forEach(u => { if (a.p_ids.includes(u.id) && u.role === 'student') u.class_id = a.p_class || null; }); dsave(); },
    km_admin_create_students: a => { dauth(a.p_token, 'admin'); if (!a.p_items.length) fail("O'quvchilar ro'yxati bo'sh"); if (a.p_items.length > 60) fail("Bir martada ko'pi bilan 60 ta o'quvchi"); const out = []; a.p_items.forEach(it => { if (!String(it.full_name || '').trim()) return; const pw = genPw(); const u = { id: uid(), role: 'student', login: uniq(it.login_base || it.full_name), pw, full_name: it.full_name.trim().slice(0, 80), class_id: it.class_id || null, photo: it.photo || null, photo_kind: it.photo ? (it.photo_kind || 'photo') : null, stickers: it.stickers || [], progress: {}, xp: 0, lessons_done: 0, created_at: now(), last_seen: null }; db.users.push(u); out.push({ user: pub(u), password: pw }); }); dsave(); return out; },
    km_admin_update_student: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_id && u.role === 'student'); if (!u) fail("O'quvchi topilmadi"); const d = a.p_data; if ('login' in d) { const l = String(d.login).toLowerCase().trim(); if (!/^[a-z0-9._-]{3,40}$/.test(l)) fail('Login: 3–40 ta lotin harf, raqam, nuqta yoki chiziqcha'); if (db.users.some(x => x.login === l && x.id !== u.id)) fail('Bu login band'); u.login = l; } if ('full_name' in d) u.full_name = String(d.full_name).trim().slice(0, 80); if ('class_id' in d) u.class_id = d.class_id || null; if ('photo' in d) { u.photo = d.photo || null; u.photo_kind = u.photo ? (d.photo_kind || 'photo') : null; } if ('stickers' in d) u.stickers = d.stickers.slice(0, 30); dsave(); return pub(u); },
    km_admin_reset_passwords: a => { dauth(a.p_token, 'admin'); const out = []; db.users.filter(u => a.p_ids.includes(u.id) && u.role === 'student').sort((x, y) => x.full_name.localeCompare(y.full_name)).forEach(u => { u.pw = genPw(); Object.keys(db.sessions).forEach(t => { if (db.sessions[t] === u.id) delete db.sessions[t]; }); out.push({ user: pub(u), password: u.pw }); }); dsave(); return out; },
    km_admin_delete_student: a => { dauth(a.p_token, 'admin'); db.users = db.users.filter(u => !(u.id === a.p_id && u.role === 'student')); db.members = db.members.filter(m => m.user_id !== a.p_id); dsave(); },
    km_admin_student: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_id && u.role === 'student'); if (!u) fail("O'quvchi topilmadi");
      const att = {}; (db.attendance || []).filter(x => x.user_id === u.id).forEach(x => att[x.status] = (att[x.status] || 0) + 1);
      return { user: pub(u), progress: u.progress, parent_code: u.parent_code || null, attendance: att, awards: db.awards.filter(x => x.user_id === u.id).slice(-20).reverse() }; },
    /* ---------- v5 (demo: soddalashtirilgan) ---------- */
    km_admin_create_teacher: a => { dauth(a.p_token, 'owner'); const n = String(a.p_name || '').trim(); if (!n) fail("O'qituvchi ismini yozing"); const pw = genPw(); const t = { id: uid(), role: 'teacher', login: uniq(a.p_login || KM.translit(n)), pw, full_name: n.slice(0, 80), class_id: null, photo: null, stickers: [], progress: {}, xp: 0, lessons_done: 0, created_at: now(), last_seen: null }; db.users.push(t); dsave(); return { user: pub(t), password: pw }; },
    km_admin_teacher_password: a => { dauth(a.p_token, 'owner'); const t = db.users.find(u => u.id === a.p_id && u.role === 'teacher'); if (!t) fail("O'qituvchi topilmadi"); t.pw = genPw(); dsave(); return { user: pub(t), password: t.pw }; },
    km_admin_delete_teacher: a => { dauth(a.p_token, 'owner'); db.classes.forEach(c => c.teacher_ids = (c.teacher_ids || []).filter(x => x !== a.p_id)); db.users = db.users.filter(u => !(u.id === a.p_id && u.role === 'teacher')); dsave(); },
    km_admin_set_teacher_groups: a => { dauth(a.p_token, 'owner'); db.classes.forEach(c => { const has = (c.teacher_ids || []).includes(a.p_id), want = (a.p_groups || []).includes(c.id); c.teacher_ids = (c.teacher_ids || []).filter(x => x !== a.p_id); if (want) c.teacher_ids.push(a.p_id); }); dsave(); },
    km_file_ticket: () => fail('demo'),
    km_admin_storage_trash: () => [],
    km_admin_storage_purged: () => null,
    km_admin_attendance: a => { dauth(a.p_token, 'admin'); return { students: groupStudents([a.p_group]).map(u => ({ id: u.id, full_name: u.full_name })), marks: (db.attendance || []).filter(x => x.group_id === a.p_group && x.day >= a.p_from && x.day <= a.p_to).map(x => ({ u: x.user_id, day: x.day, s: x.status })) }; },
    km_admin_attendance_set: a => { dauth(a.p_token, 'admin'); db.attendance = db.attendance || []; Object.keys(a.p_marks || {}).forEach(id => { db.attendance = db.attendance.filter(x => !(x.group_id === a.p_group && x.user_id === id && x.day === a.p_day)); if (a.p_marks[id]) db.attendance.push({ group_id: a.p_group, user_id: id, day: a.p_day, status: a.p_marks[id] }); }); dsave(); },
    km_admin_settings: a => { dauth(a.p_token, 'admin'); return { tg_token_set: false, site_url: '', pg_net: false, tg_errors: [] }; },
    km_admin_settings_save: () => fail("Demo rejimda Telegram ishlamaydi. Haqiqiy saytda sozlang."),
    km_admin_announce: () => fail("Demo rejimda Telegram ishlamaydi"),
    km_admin_tg_scan: () => fail("Demo rejimda Telegram ishlamaydi"),
    km_admin_tg_chats: () => ({ ready: true, chats: [] }),
    km_admin_parent_code: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_user && u.role === 'student'); if (!u) fail("O'quvchi topilmadi"); if (!u.parent_code || a.p_new) u.parent_code = hex(16); dsave(); return u.parent_code; },
    km_parent_view: a => { const u = dload().users.find(u => u.parent_code && u.parent_code === a.p_code && u.role === 'student'); if (!u) fail("Havola eskirgan yoki noto'g'ri. O'qituvchidan yangisini so'rang."); const g = myGroupIds(u), att = {}; (db.attendance || []).filter(x => x.user_id === u.id).forEach(x => att[x.status] = (att[x.status] || 0) + 1); const c = db.classes.find(c => c.id === u.class_id);
      return { user: { full_name: u.full_name, class_name: c ? c.name : null, photo: u.photo, photo_kind: u.photo_kind, stickers: u.stickers, xp: u.xp + (u.bonus_xp || 0), lessons_done: u.lessons_done, last_seen: u.last_seen }, groups: db.classes.filter(c => g.includes(c.id)).map(c => c.name),
        assignments: db.assignments.filter(x => x.group_ids.some(y => g.includes(y))).map(x => { const s = db.subs.find(s => s.assignment_id === x.id && s.user_id === u.id) || {}; return { title: x.title, due_at: x.due_at, max_score: x.max_score, submitted_at: s.submitted_at || null, score: s.score == null ? null : s.score, comment: s.comment || null }; }),
        attendance: att, absences: (db.attendance || []).filter(x => x.user_id === u.id && x.status !== 'bor').slice(-10).reverse().map(x => ({ day: x.day, s: x.status })), awards: db.awards.filter(x => x.user_id === u.id).slice(-10).reverse(), certs: (db.certs || []).filter(x => x.user_id === u.id) }; },
    km_cert_issue: a => { const u = dauth(a.p_token, 'student'); db.certs = db.certs || []; let c = db.certs.find(x => x.user_id === u.id && x.level === a.p_level); if (c) return c; const pre = a.p_level.split('-')[1] + '-', n = Object.keys((u.progress || {}).done || {}).filter(k => k.startsWith(pre)).length; if (n < Math.max(1, a.p_need || 1)) fail('Bosqichdagi barcha darslarni tugating'); c = { code: hex(10).toUpperCase(), user_id: u.id, level: a.p_level, title: a.p_title, issued_at: now() }; db.certs.push(c); dsave(); return c; },
    km_cert_verify: a => { const c = (dload().certs || []).find(x => x.code === String(a.p_code || '').trim().toUpperCase()); if (!c) return { valid: false }; const u = db.users.find(u => u.id === c.user_id) || {}, cl = db.classes.find(x => x.id === u.class_id); return { valid: true, code: c.code, title: c.title, issued_at: c.issued_at, full_name: u.full_name, class_name: cl ? cl.name : null }; },
    km_admin_report: a => { const me = dauth(a.p_token, 'admin'), mg = myStaffGroups(me); return db.classes.filter(c => mg.includes(c.id)).map(c => { const st = groupStudents([c.id]), as = db.assignments.filter(x => x.group_ids.includes(c.id)), sb = db.subs.filter(s => as.some(x => x.id === s.assignment_id) && st.some(u => u.id === s.user_id)), gr = sb.filter(s => s.score != null), at = (db.attendance || []).filter(x => x.group_id === c.id);
      return { id: c.id, name: c.name, kind: c.kind, grade: c.grade, students: st.length, avg_lessons: st.length ? Math.round(st.reduce((s, u) => s + u.lessons_done, 0) / st.length * 10) / 10 : null, avg_xp: st.length ? Math.round(st.reduce((s, u) => s + u.xp + (u.bonus_xp || 0), 0) / st.length) : null, active7: st.filter(u => u.last_seen && Date.now() - new Date(u.last_seen) < 7 * 864e5).length, assignments: as.length, submitted: sb.filter(s => s.submitted_at).length, avg_pct: gr.length ? Math.round(gr.reduce((s, x) => s + x.score * 100 / as.find(y => y.id === x.assignment_id).max_score, 0) / gr.length) : null, att_total: at.length, att_present: at.filter(x => x.status === 'bor' || x.status === 'kech').length }; }); },
    km_admin_backup: a => { dauth(a.p_token, 'owner'); return Object.assign({ format: 'zis-prostudent', version: 5, created_at: now(), demo: true }, JSON.parse(JSON.stringify(db)), { sessions: {} }); },
    km_admin_restore: a => { dauth(a.p_token, 'owner'); const d = a.p_data; if (!d || d.format !== 'zis-prostudent' || !d.demo) fail("Bu demo zaxira fayli emas"); const s = db.sessions; db = Object.assign({}, d); delete db.format; delete db.version; delete db.created_at; delete db.demo; db.sessions = s; dsave(); return { users: db.users.length, classes: db.classes.length }; },
    km_materials: a => { const u = dauth(a.p_token), g = myGroupIds(u); return db.materials.filter(m => u.role === 'admin' || m.group_ids.some(x => g.includes(x))).sort((x, y) => y.created_at.localeCompare(x.created_at)).map(matJson); },
    km_admin_save_material: a => {
      dauth(a.p_token, 'admin'); const d = a.p_data;
      if (!['link', 'video', 'text', 'file'].includes(d.kind)) fail("Material turi noto'g'ri");
      if ((d.kind === 'link' || d.kind === 'video') && !/^https?:\/\//i.test(d.url || '')) fail('Havola http:// yoki https:// bilan boshlansin');
      const title = String(d.title || '').trim(); if (!title || title.length > 120) fail("Sarlavha 1–120 belgi bo'lsin");
      let fid = null; if (d.file) { fid = uid(); db.files.push({ id: fid, name: d.file.name, mime: d.file.mime, data: d.file.data }); }
      let m = db.materials.find(m => m.id === a.p_id); if (a.p_id && !m) fail('Material topilmadi');
      if (!m) { if (d.kind === 'file' && !fid) fail('Fayl tanlanmagan'); m = { id: uid(), created_at: now(), file_id: null }; db.materials.unshift(m); }
      Object.assign(m, { title, kind: d.kind, url: (d.url || '').trim() || null, body: d.body || null, group_ids: d.group_ids || [] }); if (fid) m.file_id = fid;
      gc(); dsave(); return matJson(m);
    },
    km_admin_delete_material: a => { dauth(a.p_token, 'admin'); db.materials = db.materials.filter(m => m.id !== a.p_id); gc(); dsave(); },

    /* ---------- viktorina ---------- */
    km_quiz_save: a => { const u = dauth(a.p_token), q = a.p_questions; const t = String(a.p_title || '').trim(); if (!t || t.length > 80) fail("Viktorina nomi 1–80 belgi bo'lsin"); checkQuiz(q);
      let z = db.quizzes.find(z => z.id === a.p_id); if (a.p_id && (!z || (z.owner_id !== u.id && u.role !== 'admin'))) fail('Viktorina topilmadi');
      if (!z) { z = { id: uid(), owner_id: u.id, created_at: now() }; db.quizzes.unshift(z); } Object.assign(z, { title: t, questions: q, updated_at: now() }); dsave(); return { id: z.id, title: z.title }; },
    km_quiz_list: a => { const u = dauth(a.p_token); return db.quizzes.filter(z => z.owner_id === u.id || u.role === 'admin').sort((x, y) => y.updated_at.localeCompare(x.updated_at)).map(z => ({ id: z.id, title: z.title, questions: z.questions, mine: z.owner_id === u.id, owner: (db.users.find(x => x.id === z.owner_id) || {}).full_name, updated_at: z.updated_at })); },
    km_quiz_delete: a => { const u = dauth(a.p_token); db.quizzes = db.quizzes.filter(z => !(z.id === a.p_id && (z.owner_id === u.id || u.role === 'admin'))); dsave(); },
    km_game_create: a => { const u = dauth(a.p_token), z = db.quizzes.find(z => z.id === a.p_quiz && (z.owner_id === u.id || u.role === 'admin')); if (!z) fail('Viktorina topilmadi');
      db.games.forEach(g => { if (g.host_id === u.id && !g.ended_at) { g.state = 'end'; g.ended_at = now(); } });
      let pin; do { pin = String(100000 + Math.floor(Math.random() * 900000)); } while (db.games.some(g => g.pin === pin && !g.ended_at));
      const g = { id: uid(), pin, host_id: u.id, title: z.title, questions: JSON.parse(JSON.stringify(z.questions)), state: 'lobby', q_index: -1, q_started_at: null, created_at: now(), ended_at: null }; db.games.push(g); dsave(); return { id: g.id, pin }; },
    km_game_join: a => { const u = dauth(a.p_token), g = db.games.find(g => g.pin === String(a.p_pin || '').replace(/\D/g, '') && !g.ended_at); if (!g) fail("Bunday PIN bilan o'yin topilmadi. Raqamlarni tekshiring.");
      if (g.host_id !== u.id && !db.players.some(p => p.game_id === g.id && p.user_id === u.id)) db.players.push({ game_id: g.id, user_id: u.id, score: 0, joined_at: now() }); dsave(); return { id: g.id, title: g.title, host: g.host_id === u.id }; },
    km_game_state: a => { const u = dauth(a.p_token), g = db.games.find(g => g.id === a.p_game); if (!g) fail("O'yin topilmadi"); const host = g.host_id === u.id, ps = db.players.filter(p => p.game_id === g.id), me = ps.find(p => p.user_id === u.id);
      if (!host && !me) fail("Siz bu o'yinga ulanmagansiz");
      const cq = g.q_index >= 0 ? g.questions[g.q_index] : null, t = cq ? cq.t || 20 : 20, nm = id => (db.users.find(x => x.id === id) || {}).full_name;
      const r = { state: g.state, q_index: g.q_index, total: g.questions.length, title: g.title, host, players: ps.length, time: t, remaining_ms: g.state === 'question' ? Math.max(0, t * 1000 - (Date.now() - new Date(g.q_started_at).getTime())) : null };
      const ans = db.answers.filter(x => x.game_id === g.id && x.q_index === g.q_index);
      if (host) Object.assign(r, { pin: g.pin, names: ps.map(p => nm(p.user_id)), answered: ans.length });
      if (g.state === 'question' || g.state === 'reveal') r.question = { q: cq.q, o: cq.o, t };
      if (g.state === 'reveal' || g.state === 'end') { if (g.state === 'reveal') { r.answer = cq.a; r.counts = cq.o.map((_, i) => ans.filter(x => x.choice === i).length); } r.top = ps.slice().sort((x, y) => y.score - x.score || x.joined_at.localeCompare(y.joined_at)).slice(0, 10).map(p => ({ name: nm(p.user_id), score: p.score })); }
      if (!host) { const rank = 1 + ps.filter(p => p.score > me.score || (p.score === me.score && p.joined_at < me.joined_at)).length, la = ans.find(x => x.user_id === u.id); r.me = { score: me.score, rank, answered: !!la, choice: g.state !== 'question' && la ? la.choice : null, correct: g.state !== 'question' && la ? la.correct : null, points: g.state !== 'question' && la ? la.points : null }; }
      return r; },
    km_game_answer: a => { const u = dauth(a.p_token), g = db.games.find(g => g.id === a.p_game); if (!g) fail("O'yin topilmadi"); const me = db.players.find(p => p.game_id === g.id && p.user_id === u.id); if (!me) fail("Siz bu o'yinga ulanmagansiz");
      if (g.state !== 'question' || g.q_index !== a.p_q) fail('Bu savolga javob vaqti tugagan'); const cq = g.questions[g.q_index], t = cq.t || 20, ms = Date.now() - new Date(g.q_started_at).getTime();
      if (ms > t * 1000 + 1500) fail('Vaqt tugadi'); if (db.answers.some(x => x.game_id === g.id && x.user_id === u.id && x.q_index === g.q_index)) return { accepted: true };
      const ok = a.p_choice === cq.a, pts = ok ? Math.max(500, Math.round(1000 * (1 - Math.min(ms, t * 1000) / (t * 1000) / 2))) : 0;
      db.answers.push({ game_id: g.id, user_id: u.id, q_index: g.q_index, choice: a.p_choice, ms, correct: ok, points: pts }); me.score += pts; dsave(); return { accepted: true }; },
    km_game_next: a => { const u = dauth(a.p_token), g = db.games.find(g => g.id === a.p_game && g.host_id === u.id); if (!g) fail("Faqat o'yinni boshlagan odam boshqara oladi");
      if (g.state === 'lobby' || (g.state === 'reveal' && g.q_index + 1 < g.questions.length)) { g.state = 'question'; g.q_index++; g.q_started_at = now(); } else if (g.state === 'question') g.state = 'reveal'; else if (g.state === 'reveal') { g.state = 'end'; g.ended_at = now(); } dsave(); return { ok: true }; },
    km_game_end: a => { const u = dauth(a.p_token), g = db.games.find(g => g.id === a.p_game && (g.host_id === u.id || u.role === 'admin')); if (g) { g.state = 'end'; g.ended_at = g.ended_at || now(); dsave(); } },
    /* ---------- topshiriqlar ---------- */
    km_assignments: a => { const u = dauth(a.p_token), sj = x => x ? fileMeta(x) : null;
      if (u.role === 'admin') return db.assignments.slice().sort((x, y) => y.created_at.localeCompare(x.created_at)).map(x => Object.assign({}, x, { total: groupStudents(x.group_ids).length, submitted: db.subs.filter(s => s.assignment_id === x.id).length, graded: db.subs.filter(s => s.assignment_id === x.id && s.score != null).length }));
      const g = myGroupIds(u); return db.assignments.filter(x => x.group_ids.some(y => g.includes(y))).sort((x, y) => y.created_at.localeCompare(x.created_at)).map(x => Object.assign({}, x, { sub: sj(db.subs.find(s => s.assignment_id === x.id && s.user_id === u.id)) })); },
    km_admin_save_assignment: a => { dauth(a.p_token, 'admin'); const d = a.p_data, t = String(d.title || '').trim(), mx = +(d.max_score || 5); if (!t || t.length > 120 || !(mx >= 1 && mx <= 100)) fail("Sarlavha 1–120 belgi, maksimal ball 1–100 bo'lsin");
      let x = db.assignments.find(x => x.id === a.p_id); if (a.p_id && !x) fail('Topshiriq topilmadi'); if (!x) { x = { id: uid(), created_at: now() }; db.assignments.unshift(x); }
      Object.assign(x, { title: t, body: d.body || null, group_ids: d.group_ids || [], due_at: d.due_at || null, max_score: mx, lesson_ref: d.lesson_ref || null }); dsave(); return x; },
    km_admin_delete_assignment: a => { dauth(a.p_token, 'admin'); db.assignments = db.assignments.filter(x => x.id !== a.p_id); db.subs = db.subs.filter(s => s.assignment_id !== a.p_id); gc(); dsave(); },
    km_submit: a => { const u = dauth(a.p_token), x = db.assignments.find(x => x.id === a.p_assignment && x.group_ids.some(y => myGroupIds(u).includes(y))); if (!x) fail('Topshiriq topilmadi');
      let s = db.subs.find(s => s.assignment_id === x.id && s.user_id === u.id); if (s && s.score != null) fail("Baholangan topshiriqni o'zgartirib bo'lmaydi"); const d = a.p_data;
      if (!String(d.body || '').trim() && !String(d.link || '').trim() && !d.file && !(s && s.file_id)) fail("Javob yozing, havola qo'ying yoki fayl biriktiring");
      if (d.link && !/^https?:\/\//i.test(d.link)) fail('Havola http:// yoki https:// bilan boshlansin');
      if (!s) { s = { assignment_id: x.id, user_id: u.id, file_id: null }; db.subs.push(s); }
      if (d.file) { const fid = uid(); db.files.push({ id: fid, name: d.file.name, mime: d.file.mime, data: d.file.data }); s.file_id = fid; }
      Object.assign(s, { body: d.body || null, link: (d.link || '').trim() || null, submitted_at: now(), score: null, comment: null, graded_at: null }); gc(); dsave(); return fileMeta(s); },
    km_admin_submissions: a => { dauth(a.p_token, 'admin'); const x = db.assignments.find(x => x.id === a.p_assignment); if (!x) fail('Topshiriq topilmadi');
      return { assignment: x, rows: groupStudents(x.group_ids).map(u => ({ user: pub(u), sub: (s => s ? fileMeta(s) : null)(db.subs.find(s => s.assignment_id === x.id && s.user_id === u.id)) })) }; },
    km_admin_grade: a => { dauth(a.p_token, 'admin'); const x = db.assignments.find(x => x.id === a.p_assignment); if (!x) fail('Topshiriq topilmadi'); if (a.p_score != null && !(a.p_score >= 0 && a.p_score <= x.max_score)) fail("Ball 0 dan " + x.max_score + " gacha bo'lsin");
      let s = db.subs.find(s => s.assignment_id === x.id && s.user_id === a.p_user); if (!s) { s = { assignment_id: x.id, user_id: a.p_user, body: null, link: null, file_id: null, submitted_at: now() }; db.subs.push(s); }
      Object.assign(s, { score: a.p_score, comment: a.p_comment || null, graded_at: a.p_score == null ? null : now() }); dsave(); return fileMeta(s); },
    km_admin_gradebook: a => { dauth(a.p_token, 'admin'); const st = groupStudents([a.p_group]), as = db.assignments.filter(x => x.group_ids.includes(a.p_group)).sort((x, y) => x.created_at.localeCompare(y.created_at));
      return { students: st.map(u => ({ id: u.id, full_name: u.full_name, login: u.login, xp: u.xp + (u.bonus_xp || 0), lessons_done: u.lessons_done, last_seen: u.last_seen })), assignments: as.map(x => ({ id: x.id, title: x.title, max_score: x.max_score, due_at: x.due_at })), scores: db.subs.filter(s => as.some(x => x.id === s.assignment_id)).map(s => ({ a: s.assignment_id, u: s.user_id, score: s.score, submitted_at: s.submitted_at })) }; },
    km_admin_award: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_user && u.role === 'student'); if (!u) fail("O'quvchi topilmadi"); if (!(a.p_xp >= 0 && a.p_xp <= 500)) fail("XP 0 dan 500 gacha bo'lsin");
      if (a.p_sticker) { if (u.stickers.length >= 30) u.stickers.shift(); u.stickers.push(a.p_sticker); } u.bonus_xp = (u.bonus_xp || 0) + (a.p_xp || 0); db.awards.push({ user_id: u.id, sticker: a.p_sticker, xp: a.p_xp, note: a.p_note, created_at: now() }); dsave(); return pub(u); },
    km_get_file: a => { const u = dauth(a.p_token), f = db.files.find(f => f.id === a.p_id); if (!f || (u.role !== 'admin' && !db.materials.some(m => m.file_id === f.id && m.group_ids.some(x => myGroupIds(u).includes(x))) && !db.subs.some(x => x.file_id === f.id && x.user_id === u.id))) fail('Fayl topilmadi'); return { name: f.name, mime: f.mime, data: f.data }; }
  };

  const mode = cfg.supabaseUrl && cfg.supabaseKey ? 'supabase' : 'demo';
  const call = async (fn, args, opt) => {
    if (mode === 'supabase') return rpc(fn, args, opt);
    await new Promise(r => setTimeout(r, 60)); db = null;
    return JSON.parse(JSON.stringify(demo[fn](JSON.parse(JSON.stringify(args || {}))) || null));
  };
  const T = () => getToken();
  KM.ApiError = ApiError;
  const sbase = () => String(cfg.supabaseUrl).trim().replace(/\/+$/, '').replace(/\/rest\/v1$/i, '');
  const sh = extra => { const h = Object.assign({ apikey: cfg.supabaseKey }, extra || {}); if (/^eyJ/.test(cfg.supabaseKey)) h.Authorization = 'Bearer ' + cfg.supabaseKey; return h; };
  const readData = f => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = () => rej(new ApiError("Faylni o'qib bo'lmadi")); r.readAsDataURL(f); });
  /* Fayl yuklash: avval Supabase Storage (25 MB gacha), bo'lmasa bazaga (4 MB gacha). Natija: km_admin_save_material / km_submit ga beriladigan {id} yoki {name, mime, data} */
  async function upload(f, purpose, onProgress) {
    const mime = f.type || 'application/octet-stream';
    if (mode === 'supabase') {
      let t = null;
      try { t = await call('km_file_ticket', { p_token: T(), p_name: f.name, p_mime: mime, p_size: f.size, p_purpose: purpose }); }
      catch (e) { if (e.code === 'SESSION' || /25 MB|ko'p fayl|ruxsat/.test(e.message)) throw e; }
      if (t) {
        try {
          const r = await new Promise((res, rej) => {
            const x = new XMLHttpRequest(); x.open('POST', sbase() + '/storage/v1/object/' + t.bucket + '/' + t.path.split('/').map(encodeURIComponent).join('/'));
            Object.entries(sh({ 'Content-Type': mime, 'x-upsert': 'false' })).forEach(([k, v]) => x.setRequestHeader(k, v));
            if (onProgress) x.upload.onprogress = ev => ev.lengthComputable && onProgress(ev.loaded / ev.total);
            x.onload = () => res(x); x.onerror = () => rej(new Error('net')); x.send(f);
          });
          if (r.status >= 200 && r.status < 300) return { id: t.id };
        } catch (e) {}
      }
    }
    if (f.size > 4 * 1024 * 1024) throw new ApiError(mode === 'supabase' ? "Fayl omboriga yuklab bo'lmadi. 4 MB dan kichik fayl tanlang yoki administratorga ayting (Storage sozlanmagan)." : 'Demo rejimda fayl 4 MB dan kichik bo\'lsin');
    return { name: f.name, mime, data: await readData(f) };
  }
  /* Faylni ochish: {name, mime, blob} */
  async function fileBlob(id) {
    const f = await call('km_get_file', { p_token: T(), p_id: id });
    if (f.path) {
      const r = await fetch(sbase() + '/storage/v1/object/authenticated/' + f.bucket + '/' + f.path.split('/').map(encodeURIComponent).join('/'), { headers: sh() });
      if (!r.ok) throw new ApiError("Faylni yuklab bo'lmadi (" + r.status + ')');
      return { name: f.name, mime: f.mime, blob: await r.blob() };
    }
    return { name: f.name, mime: f.mime, blob: await (await fetch(f.data)).blob() };
  }
  /* Keraksiz Storage fayllarini tozalash (admin panel ochilganda, jim) */
  async function storageCleanup() {
    if (mode !== 'supabase') return;
    try {
      const paths = await call('km_admin_storage_trash', { p_token: T() });
      if (!paths || !paths.length) return;
      const r = await fetch(sbase() + '/storage/v1/object/prostudent', { method: 'DELETE', headers: sh({ 'Content-Type': 'application/json' }), body: JSON.stringify({ prefixes: paths }) });
      if (r.ok) { const del = await r.json(); const gone = (Array.isArray(del) ? del : []).map(x => x.name); const missing = paths.filter(p => !gone.includes(p)); await call('km_admin_storage_purged', { p_token: T(), p_paths: gone.concat(missing) }); }
    } catch (e) {}
  }
  KM.api = {
    mode,
    hasToken: () => !!getToken(),
    async setupStatus() { return call('km_setup_status'); },
    async setupAdmin(login, password, name) { const r = await call('km_setup_admin', { p_login: login, p_password: password, p_name: name }); setToken(r.token); return r; },
    async login(login, password) { const r = await call('km_login', { p_login: login, p_password: password }); if (r.error) throw new ApiError(r.error); setToken(r.token); return r; },
    async logout() { const t = T(); setToken(''); if (t) { try { await call('km_logout', { p_token: t }); } catch (e) {} } },
    me: () => call('km_me', { p_token: T() }),
    saveProgress: (p, xp, done, keepalive) => call('km_save_progress', { p_token: T(), p_progress: p, p_xp: xp, p_done: done }, { keepalive }),
    setMyStickers: s => call('km_set_my_stickers', { p_token: T(), p_stickers: s }),
    setMyAvatar: p => call('km_set_my_avatar', { p_token: T(), p_photo: p }),
    changePassword: (o, n) => call('km_change_password', { p_token: T(), p_old: o, p_new: n }),
    materials: () => call('km_materials', { p_token: T() }),
    file: id => call('km_get_file', { p_token: T(), p_id: id }),
    fileBlob, upload, storageCleanup,
    parentView: code => call('km_parent_view', { p_code: code }),
    certIssue: (level, title, need) => call('km_cert_issue', { p_token: T(), p_level: level, p_title: title, p_need: need }),
    certVerify: code => call('km_cert_verify', { p_code: code }),
    quiz: {
      list: () => call('km_quiz_list', { p_token: T() }),
      save: (id, title, qs) => call('km_quiz_save', { p_token: T(), p_id: id || null, p_title: title, p_questions: qs }),
      del: id => call('km_quiz_delete', { p_token: T(), p_id: id }),
      create: qid => call('km_game_create', { p_token: T(), p_quiz: qid }),
      join: pin => call('km_game_join', { p_token: T(), p_pin: pin }),
      state: gid => call('km_game_state', { p_token: T(), p_game: gid }),
      answer: (gid, qi, c) => call('km_game_answer', { p_token: T(), p_game: gid, p_q: qi, p_choice: c }),
      next: gid => call('km_game_next', { p_token: T(), p_game: gid }),
      end: gid => call('km_game_end', { p_token: T(), p_game: gid })
    },
    assignments: () => call('km_assignments', { p_token: T() }),
    submit: (aid, data) => call('km_submit', { p_token: T(), p_assignment: aid, p_data: data }),
    admin: {
      overview: () => call('km_admin_overview', { p_token: T() }),
      saveGroup: (id, data) => call('km_admin_save_group', { p_token: T(), p_id: id || null, p_data: data }),
      deleteClass: id => call('km_admin_delete_class', { p_token: T(), p_id: id }),
      setMembers: (g, add, rem) => call('km_admin_set_members', { p_token: T(), p_group: g, p_add: add || [], p_remove: rem || [] }),
      moveStudents: (ids, cls) => call('km_admin_move_students', { p_token: T(), p_ids: ids, p_class: cls || null }),
      createStudents: items => call('km_admin_create_students', { p_token: T(), p_items: items }),
      updateStudent: (id, data) => call('km_admin_update_student', { p_token: T(), p_id: id, p_data: data }),
      resetPasswords: ids => call('km_admin_reset_passwords', { p_token: T(), p_ids: ids }),
      deleteStudent: id => call('km_admin_delete_student', { p_token: T(), p_id: id }),
      student: id => call('km_admin_student', { p_token: T(), p_id: id }),
      saveMaterial: (id, data) => call('km_admin_save_material', { p_token: T(), p_id: id || null, p_data: data }),
      deleteMaterial: id => call('km_admin_delete_material', { p_token: T(), p_id: id }),
      saveAssignment: (id, data) => call('km_admin_save_assignment', { p_token: T(), p_id: id || null, p_data: data }),
      deleteAssignment: id => call('km_admin_delete_assignment', { p_token: T(), p_id: id }),
      submissions: id => call('km_admin_submissions', { p_token: T(), p_assignment: id }),
      grade: (aid, uid, score, comment) => call('km_admin_grade', { p_token: T(), p_assignment: aid, p_user: uid, p_score: score, p_comment: comment }),
      gradebook: gid => call('km_admin_gradebook', { p_token: T(), p_group: gid }),
      award: (uid, sticker, xp, note) => call('km_admin_award', { p_token: T(), p_user: uid, p_sticker: sticker || null, p_xp: xp || 0, p_note: note || '' }),
      createTeacher: (name, login) => call('km_admin_create_teacher', { p_token: T(), p_name: name, p_login: login || '' }),
      teacherPassword: id => call('km_admin_teacher_password', { p_token: T(), p_id: id }),
      deleteTeacher: id => call('km_admin_delete_teacher', { p_token: T(), p_id: id }),
      setTeacherGroups: (id, groups) => call('km_admin_set_teacher_groups', { p_token: T(), p_id: id, p_groups: groups }),
      attendance: (gid, from, to) => call('km_admin_attendance', { p_token: T(), p_group: gid, p_from: from, p_to: to }),
      setAttendance: (gid, day, marks) => call('km_admin_attendance_set', { p_token: T(), p_group: gid, p_day: day, p_marks: marks }),
      settings: () => call('km_admin_settings', { p_token: T() }),
      saveSettings: d => call('km_admin_settings_save', { p_token: T(), p_data: d }),
      announce: (gid, text) => call('km_admin_announce', { p_token: T(), p_group: gid, p_text: text }),
      tgScan: () => call('km_admin_tg_scan', { p_token: T() }),
      tgChats: rid => call('km_admin_tg_chats', { p_token: T(), p_req: rid }),
      parentCode: (uid, renew) => call('km_admin_parent_code', { p_token: T(), p_user: uid, p_new: !!renew }),
      report: () => call('km_admin_report', { p_token: T() }),
      backup: () => call('km_admin_backup', { p_token: T() }),
      restore: d => call('km_admin_restore', { p_token: T(), p_data: d })
    },
    clearToken: () => setToken('')
  };

  /* Ism-familiyadan login: "Aziza Rahimova" → "aziza.rahimova", "Ғайрат Шукуров" → "gayrat.shukurov" */
  const CYR = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'j', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'x', ц: 's', ч: 'ch', ш: 'sh', щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya', ў: 'o', қ: 'q', ғ: 'g', ҳ: 'h' };
  KM.translit = function (name) {
    const s = String(name || '').toLowerCase().split('').map(ch => CYR[ch] !== undefined ? CYR[ch] : ch).join('')
      .replace(/[ʻʼ'’‘`]/g, '').replace(/[^a-z0-9\s.-]/g, '').trim().split(/\s+/).slice(0, 2).join('.');
    return s.replace(/\.{2,}/g, '.').replace(/^\.|\.$/g, '');
  };
})();
