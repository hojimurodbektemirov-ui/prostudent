/* O'quvchi progressi: brauzerda (har bir foydalanuvchi uchun alohida) va serverda saqlanadi. */
(function () {
  const def = () => ({ name: '', xp: 0, done: {}, inf: {}, quiz: {}, code: {}, projects: [], streak: { last: '', n: 0 }, fails: {}, last: '', lock: true });
  let s = def(), key = 'kodmaktab-v2-guest', sync = false, timer = null, status = '';
  const day = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const local = () => { try { localStorage.setItem(key, JSON.stringify(s)); } catch (e) {} };
  const setStatus = t => { status = t; const el = document.getElementById('sync'); if (el) { el.textContent = t; el.className = 'sync ' + (t === 'Saqlanmadi' ? 'bad' : ''); } };
  async function push(keepalive) {
    clearTimeout(timer); timer = null;
    if (!sync) return;
    try { setStatus('Saqlanmoqda…'); await KM.api.saveProgress(s, s.xp, Object.keys(s.done).length + Object.keys(s.inf || {}).length, keepalive); setStatus('Saqlandi'); }
    catch (e) { setStatus('Saqlanmadi'); if (e.code === 'SESSION') location.reload(); else timer = setTimeout(push, 15000); }
  }
  const save = () => { local(); if (sync) { clearTimeout(timer); timer = setTimeout(push, 1500); } };
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && timer) push(true); });
  KM.store = {
    get s() { return s; },
    get status() { return status; },
    save,
    flush: () => timer ? push() : Promise.resolve(),
    /* Kirgandan keyin: shu foydalanuvchi progressini ulaydi. Serverdagisi asosiy; brauzerda ko'proq bo'lsa, o'shani yuboradi */
    bind(user, server) {
      key = 'kodmaktab-v2-' + user.id; sync = user.role === 'student';
      let loc = null; try { loc = JSON.parse(localStorage.getItem(key) || 'null'); } catch (e) {}
      const srv = server && Object.keys(server).length ? server : null;
      s = Object.assign(def(), (loc && (!srv || (loc.xp || 0) > (srv.xp || 0))) ? loc : (srv || loc || {}));
      s.name = user.full_name; s.lock = user.role === 'student';
      if (!s.last && user.grade) s.last = user.grade + '-1';
      local();
      if (sync && loc && srv && (loc.xp || 0) > (srv.xp || 0)) push();
      setStatus(sync ? 'Saqlandi' : '');
    },
    unbind() { s = def(); key = 'kodmaktab-v2-guest'; sync = false; clearTimeout(timer); timer = null; },
    touch() {
      const t = day(new Date()), y = day(new Date(Date.now() - 864e5));
      if (s.streak.last === t) return;
      s.streak.n = s.streak.last === y ? s.streak.n + 1 : 1;
      s.streak.last = t;
    },
    addXP(n) { s.xp += n; const d = new Date().toDateString(); if (!s.day || s.day.d !== d) s.day = { d, xp: 0 }; s.day.xp += n; this.touch(); save(); },
    level() { return KM.quiz ? KM.quiz.level(s.xp).lv : 1; }
  };
})();
