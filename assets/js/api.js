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
  const DK = 'kodmaktab-demo-db3';
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
    return { classes: c, users: u, members, materials, files: [], sessions: {} };
  }
  let db;
  const dload = () => { if (db) return db; try { db = JSON.parse(localStorage.getItem(DK) || 'null'); } catch (e) {} if (!db) { db = seed(); dsave(); } return db; };
  const dsave = () => { try { localStorage.setItem(DK, JSON.stringify(db)); } catch (e) { throw new ApiError("Brauzer xotirasi to'ldi (demo rejim). Kichikroq fayl tanlang."); } };
  const fail = m => { throw new ApiError(m, m === 'SESSION' ? 'SESSION' : 'ERR'); };
  const groupsOf = u => db.classes.filter(c => c.id === u.class_id || db.members.some(m => m.group_id === c.id && m.user_id === u.id)).sort((a, b) => a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name)).map(c => ({ id: c.id, name: c.name, grade: c.grade, kind: c.kind, courses: c.courses }));
  const pub = u => { const c = dload().classes.find(c => c.id === u.class_id); return { id: u.id, role: u.role, login: u.login, full_name: u.full_name, class_id: u.class_id, class_name: c ? c.name : null, grade: c ? c.grade : null, photo: u.photo, photo_kind: u.photo_kind || null, stickers: u.stickers, xp: u.xp, lessons_done: u.lessons_done, last_seen: u.last_seen, created_at: u.created_at, groups: groupsOf(u) }; };
  const dauth = (t, role) => { const id = dload().sessions[t], u = db.users.find(u => u.id === id); if (!u) fail('SESSION'); if (role && u.role !== role) fail("Bu amal uchun ruxsat yo'q"); return u; };
  const uniq = b => { b = (b || '').toLowerCase().replace(/[^a-z0-9._-]/g, '').slice(0, 34); if (b.length < 3) b = 'oquvchi'; let c = b, n = 1; while (dload().users.some(u => u.login === c)) c = b + (++n); return c; };
  const sess = u => { const t = uid() + uid(); db.sessions[t] = u.id; u.last_seen = now(); dsave(); return t; };
  const myGroupIds = u => [u.class_id, ...db.members.filter(m => m.user_id === u.id).map(m => m.group_id)].filter(Boolean);
  const matJson = m => { const f = db.files.find(f => f.id === m.file_id); return { id: m.id, title: m.title, kind: m.kind, url: m.url, body: m.body, group_ids: m.group_ids, created_at: m.created_at, file: f ? { id: f.id, name: f.name, mime: f.mime, size: Math.round(f.data.length * 3 / 4) } : null }; };
  const gc = () => { db.files = db.files.filter(f => db.materials.some(m => m.file_id === f.id)); };
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
    km_admin_overview: a => { dauth(a.p_token, 'admin'); return { classes: db.classes.slice().sort((x, y) => x.kind.localeCompare(y.kind) || x.grade - y.grade || x.name.localeCompare(y.name)).map(c => Object.assign({}, c, { count: c.kind === 'sinf' ? db.users.filter(u => u.class_id === c.id).length : db.members.filter(m => m.group_id === c.id).length, member_ids: c.kind === 'togarak' ? db.members.filter(m => m.group_id === c.id).map(m => m.user_id) : [] })), students: db.users.filter(u => u.role === 'student').sort((x, y) => x.full_name.localeCompare(y.full_name)).map(pub) }; },
    km_admin_save_group: a => {
      dauth(a.p_token, 'admin'); const d = a.p_data, name = String(d.name || '').trim(), grade = +d.grade;
      if (!name || name.length > 40 || !(grade >= 1 && grade <= 11)) fail("Nomi 1–40 belgi, daraja 1–11 bo'lsin");
      if (db.classes.some(c => c.name === name && c.id !== a.p_id)) fail('"' + name + '" nomi band');
      let c = db.classes.find(c => c.id === a.p_id); if (a.p_id && !c) fail('Guruh topilmadi');
      if (!c) { c = { id: uid(), kind: d.kind === 'togarak' ? 'togarak' : 'sinf', created_at: now() }; db.classes.push(c); }
      Object.assign(c, { name, grade, courses: (d.courses || []).filter(x => x === 'informatika' || x === 'dasturlash'), about: (d.about || '').trim() || null }); dsave(); return c;
    },
    km_admin_delete_class: a => { dauth(a.p_token, 'admin'); db.classes = db.classes.filter(c => c.id !== a.p_id); db.members = db.members.filter(m => m.group_id !== a.p_id); db.users.forEach(u => { if (u.class_id === a.p_id) u.class_id = null; }); dsave(); },
    km_admin_set_members: a => { dauth(a.p_token, 'admin'); if (!db.classes.some(c => c.id === a.p_group && c.kind === 'togarak')) fail("To'garak topilmadi"); (a.p_add || []).forEach(id => { if (db.users.some(u => u.id === id && u.role === 'student') && !db.members.some(m => m.group_id === a.p_group && m.user_id === id)) db.members.push({ group_id: a.p_group, user_id: id }); }); db.members = db.members.filter(m => !(m.group_id === a.p_group && (a.p_remove || []).includes(m.user_id))); dsave(); },
    km_admin_move_students: a => { dauth(a.p_token, 'admin'); if (a.p_class && !db.classes.some(c => c.id === a.p_class && c.kind === 'sinf')) fail('Sinf topilmadi'); db.users.forEach(u => { if (a.p_ids.includes(u.id) && u.role === 'student') u.class_id = a.p_class || null; }); dsave(); },
    km_admin_create_students: a => { dauth(a.p_token, 'admin'); if (!a.p_items.length) fail("O'quvchilar ro'yxati bo'sh"); if (a.p_items.length > 60) fail("Bir martada ko'pi bilan 60 ta o'quvchi"); const out = []; a.p_items.forEach(it => { if (!String(it.full_name || '').trim()) return; const pw = genPw(); const u = { id: uid(), role: 'student', login: uniq(it.login_base || it.full_name), pw, full_name: it.full_name.trim().slice(0, 80), class_id: it.class_id || null, photo: it.photo || null, photo_kind: it.photo ? (it.photo_kind || 'photo') : null, stickers: it.stickers || [], progress: {}, xp: 0, lessons_done: 0, created_at: now(), last_seen: null }; db.users.push(u); out.push({ user: pub(u), password: pw }); }); dsave(); return out; },
    km_admin_update_student: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_id && u.role === 'student'); if (!u) fail("O'quvchi topilmadi"); const d = a.p_data; if ('login' in d) { const l = String(d.login).toLowerCase().trim(); if (!/^[a-z0-9._-]{3,40}$/.test(l)) fail('Login: 3–40 ta lotin harf, raqam, nuqta yoki chiziqcha'); if (db.users.some(x => x.login === l && x.id !== u.id)) fail('Bu login band'); u.login = l; } if ('full_name' in d) u.full_name = String(d.full_name).trim().slice(0, 80); if ('class_id' in d) u.class_id = d.class_id || null; if ('photo' in d) { u.photo = d.photo || null; u.photo_kind = u.photo ? (d.photo_kind || 'photo') : null; } if ('stickers' in d) u.stickers = d.stickers.slice(0, 30); dsave(); return pub(u); },
    km_admin_reset_passwords: a => { dauth(a.p_token, 'admin'); const out = []; db.users.filter(u => a.p_ids.includes(u.id) && u.role === 'student').sort((x, y) => x.full_name.localeCompare(y.full_name)).forEach(u => { u.pw = genPw(); Object.keys(db.sessions).forEach(t => { if (db.sessions[t] === u.id) delete db.sessions[t]; }); out.push({ user: pub(u), password: u.pw }); }); dsave(); return out; },
    km_admin_delete_student: a => { dauth(a.p_token, 'admin'); db.users = db.users.filter(u => !(u.id === a.p_id && u.role === 'student')); db.members = db.members.filter(m => m.user_id !== a.p_id); dsave(); },
    km_admin_student: a => { dauth(a.p_token, 'admin'); const u = db.users.find(u => u.id === a.p_id && u.role === 'student'); if (!u) fail("O'quvchi topilmadi"); return { user: pub(u), progress: u.progress }; },
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
    km_get_file: a => { const u = dauth(a.p_token), f = db.files.find(f => f.id === a.p_id); if (!f || (u.role !== 'admin' && !db.materials.some(m => m.file_id === f.id && m.group_ids.some(x => myGroupIds(u).includes(x))))) fail('Fayl topilmadi'); return { name: f.name, mime: f.mime, data: f.data }; }
  };

  const mode = cfg.supabaseUrl && cfg.supabaseKey ? 'supabase' : 'demo';
  const call = async (fn, args, opt) => {
    if (mode === 'supabase') return rpc(fn, args, opt);
    await new Promise(r => setTimeout(r, 100));
    return JSON.parse(JSON.stringify(demo[fn](JSON.parse(JSON.stringify(args || {}))) || null));
  };
  const T = () => getToken();
  KM.ApiError = ApiError;
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
      deleteMaterial: id => call('km_admin_delete_material', { p_token: T(), p_id: id })
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
