/* O'quvchi rasmi, stikerlar va emojilar: ko'rsatish, tahrirlash, rasmni kesish, Kahoot uslubidagi emoji-avatar. */
(function () {
  const e = KM.esc;
  const lab = (t, bg, fg) => '<svg viewBox="0 0 120 52"><rect x="3" y="5" width="114" height="44" rx="22" fill="#0a1a3f" opacity=".25"/><rect x="1" y="1" width="114" height="44" rx="22" fill="' + bg + '" stroke="#fff" stroke-width="3"/><text x="58" y="31" text-anchor="middle" font-family="Unbounded,Manrope,sans-serif" font-weight="800" font-size="' + (t.length > 6 ? 17 : 20) + '" fill="' + fg + '">' + t + '</text></svg>';
  const D = {
    crown: ['Toj', '<svg viewBox="0 0 100 70"><path d="M8 62 4 16l26 20L50 4l20 32 26-20-4 46z" fill="#ffc83d" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M10 62h80" stroke="#e09b00" stroke-width="8"/><circle cx="50" cy="40" r="6" fill="#e5484d"/><circle cx="26" cy="46" r="4" fill="#2f6bff"/><circle cx="74" cy="46" r="4" fill="#2f6bff"/></svg>'],
    glasses: ["Ko'zoynak", '<svg viewBox="0 0 160 56"><path d="M4 10h152" stroke="#0a1a3f" stroke-width="7" stroke-linecap="round"/><path d="M10 10h56c0 22-6 36-28 36S10 32 10 10zM94 10h56c0 22-6 36-28 36s-28-14-28-36z" fill="#0a1a3f"/><path d="M20 16l14 0M104 16l14 0" stroke="#7fb2ff" stroke-width="5" stroke-linecap="round"/></svg>'],
    party: ['Bayram qalpoq', '<svg viewBox="0 0 80 100"><path d="M40 6 72 92H8z" fill="#2f6bff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/><path d="M26 46l28 0M18 70l44 0" stroke="#ffc83d" stroke-width="8"/><circle cx="40" cy="8" r="9" fill="#e5484d" stroke="#fff" stroke-width="3"/></svg>'],
    star: ['Yulduz', '<svg viewBox="0 0 100 100"><path d="M50 4l13 30 32 3-24 22 7 32-28-17-28 17 7-32L5 37l32-3z" fill="#ffc83d" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>'],
    heart: ['Yurak', '<svg viewBox="0 0 100 90"><path d="M50 84C20 62 4 46 4 28 4 14 15 4 28 4c10 0 17 6 22 13C55 10 62 4 72 4c13 0 24 10 24 24 0 18-16 34-46 56z" fill="#e5484d" stroke="#fff" stroke-width="5"/></svg>'],
    bolt: ['Chaqmoq', '<svg viewBox="0 0 70 100"><path d="M42 3 6 58h24l-6 39 40-58H40z" fill="#ffc83d" stroke="#fff" stroke-width="5" stroke-linejoin="round"/></svg>'],
    rocket: ['Raketa', '<svg viewBox="0 0 100 100"><path d="M62 10c16-4 26-2 28-0s4 12 0 28L58 70 30 42z" fill="#fff" stroke="#0a1a3f" stroke-width="4" stroke-linejoin="round"/><circle cx="66" cy="34" r="8" fill="#2f6bff" stroke="#0a1a3f" stroke-width="4"/><path d="M30 42 12 44 4 58l22 4zM58 70l-2 18-14 8-4-22z" fill="#e5484d" stroke="#0a1a3f" stroke-width="4" stroke-linejoin="round"/><path d="M28 64c-8 2-14 10-16 24 14-2 22-8 24-16z" fill="#ffc83d" stroke="#0a1a3f" stroke-width="4" stroke-linejoin="round"/></svg>'],
    medal: ['Medal', '<svg viewBox="0 0 80 100"><path d="M20 4h16l10 34H30zM44 4h16L50 38H34z" fill="#2f6bff"/><circle cx="40" cy="64" r="28" fill="#ffc83d" stroke="#fff" stroke-width="5"/><text x="40" y="76" text-anchor="middle" font-family="Unbounded,sans-serif" font-weight="800" font-size="32" fill="#8a5a00">1</text></svg>'],
    code: ['Kod', lab('&lt;/&gt;', '#0a1a3f', '#7fb2ff')],
    zor: ["Zo'r!", lab('ZO\'R!', '#ffc83d', '#0a1a3f')],
    alo: ["A'lo", lab('A\'LO', '#2fb46a', '#fff')],
    top: ['TOP-1', lab('TOP-1', '#2f6bff', '#fff')],
    js: ['JS', lab('JS', '#f7df1e', '#111')],
    html: ['HTML', lab('HTML', '#e8590c', '#fff')],
    css: ['CSS', lab('CSS', '#2f6bff', '#fff')],
    lider: ['Lider', lab('LIDER', '#e5484d', '#fff')]
  };
  const EMOJI = ['😀', '😎', '🤩', '🥳', '😇', '🤓', '😜', '🤠', '🤖', '👾', '👻', '🦄', '🐱', '🐶', '🦁', '🐼', '🦊', '🐯', '🐸', '🐵', '🐧', '🦖', '🐙', '🦋', '🌟', '⭐', '🔥', '⚡', '🌈', '☀️', '🌙', '❄️', '🍀', '🌸', '🍕', '🍦', '🍩', '🍉', '⚽', '🏀', '🎮', '🎨', '🎧', '🎸', '🚀', '🛸', '💡', '💻', '🏆', '🥇', '👑', '💎', '❤️', '💙', '👍', '✌️', '🙌', '💯'];
  const BG = ['#2f6bff', '#e5484d', '#ffb020', '#2fb46a', '#7c5cff', '#0ea5a4', '#ec4899', '#0a1a3f'];
  const COLORS = ['#2f6bff', '#0f9d7a', '#e8590c', '#7c5cff', '#e5484d', '#0a7ea4'];
  const initials = n => String(n || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  const tint = s => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return COLORS[h % COLORS.length]; };

  function face(u) {
    const ph = u.photo ? '<img src="' + e(u.photo) + '" alt="">' : '<span class="ph-in" style="background:' + tint(u.full_name) + '">' + e(initials(u.full_name)) + '</span>';
    return '<div class="ph">' + ph + (u.stickers || []).map(stk).join('') + '</div>';
  }
  function stk(s, i) {
    const base = 'left:' + (s.x * 100) + '%;top:' + (s.y * 100) + '%;transform:translate(-50%,-50%) rotate(' + (s.r || 0) + 'deg)';
    if (s.k === 'e') return '<span class="stk emo" data-i="' + i + '" style="' + base + ';font-size:' + (s.s * 80).toFixed(1) + 'cqw">' + e(String(s.t || '').slice(0, 8)) + '</span>';
    const d = D[s.k]; if (!d) return '';
    return '<span class="stk" data-i="' + i + '" style="' + base + ';width:' + (s.s * 100) + '%">' + d[1] + '</span>';
  }
  /* Kahoot kabi: rangli fonda katta emoji → 320px rasm */
  function emojiAvatar(em, bg) {
    const c = document.createElement('canvas'); c.width = c.height = 320; const x = c.getContext('2d');
    x.fillStyle = bg; x.fillRect(0, 0, 320, 320);
    x.fillStyle = 'rgba(255,255,255,.14)'; x.beginPath(); x.arc(160, 160, 130, 0, Math.PI * 2); x.fill();
    x.font = '190px "Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText(em, 160, 172);
    return c.toDataURL('image/png');
  }

  function editor(host, o) {
    let st = (o.stickers || []).map(s => Object.assign({}, s)), photo = o.photo || null, kind = o.photoKind || (photo ? 'photo' : null), sel = -1, tab = 'stk', avBg = BG[0];
    const canAvatar = o.avatar !== false;
    host.innerHTML = '<div class="se"><div class="se-stage"><div class="se-ph ph"></div></div><div class="se-tools"><div class="se-sel" hidden><span>Tanlangan:</span><button type="button" class="ib" data-a="rl" aria-label="Chapga aylantirish">↺</button><button type="button" class="ib" data-a="rr" aria-label="O\'ngga aylantirish">↻</button><button type="button" class="ib" data-a="sm" aria-label="Kichraytirish">−</button><button type="button" class="ib" data-a="bg" aria-label="Kattalashtirish">+</button><button type="button" class="ib del" data-a="rm" aria-label="O\'chirish">×</button></div>' +
      (o.photoEdit !== false ? '<div class="se-photo"><label class="btn sm"><input type="file" accept="image/*" hidden>Rasm yuklash</label><button type="button" class="btn sm" data-a="nophoto">Rasmni olib tashlash</button></div>' : '') +
      '<div class="se-tabs" role="tablist"><button type="button" class="on" data-t="stk" role="tab">Stikerlar</button><button type="button" data-t="emo" role="tab">Emojilar</button>' + (canAvatar ? '<button type="button" data-t="av" role="tab">Emoji-avatar</button>' : '') + '</div>' +
      '<p class="se-lab"></p><div class="se-pal"></div></div></div>';
    const box = host.querySelector('.se-ph'), selBar = host.querySelector('.se-sel'), pal = host.querySelector('.se-pal'), labEl = host.querySelector('.se-lab');
    const drawPal = () => {
      host.querySelectorAll('.se-tabs button').forEach(b => { b.classList.toggle('on', b.dataset.t === tab); b.setAttribute('aria-selected', b.dataset.t === tab); });
      if (tab === 'stk') { labEl.textContent = 'Stikerni bosing — u rasmga qo\'shiladi. Keyin barmoq yoki sichqoncha bilan suring.'; pal.className = 'se-pal'; pal.innerHTML = Object.keys(D).map(k => '<button type="button" class="se-k" data-k="' + k + '" title="' + e(D[k][0]) + '" aria-label="' + e(D[k][0]) + ' stikeri">' + D[k][1] + '</button>').join(''); }
      else if (tab === 'emo') { labEl.textContent = 'Emojini bosing — u rasm ustiga qo\'shiladi.'; pal.className = 'se-pal emo-pal'; pal.innerHTML = EMOJI.map(m => '<button type="button" class="se-k" data-e="' + m + '" aria-label="' + m + '">' + m + '</button>').join(''); }
      else { labEl.textContent = 'Rangni tanlang, keyin emojini bosing: Kahoot\'dagi kabi avatar tayyor bo\'ladi.' + (kind === 'photo' ? ' Diqqat: haqiqiy rasm o\'rniga qo\'yiladi.' : ''); pal.className = 'se-pal emo-pal'; pal.innerHTML = '<div class="av-bg">' + BG.map(c => '<button type="button" class="av-c' + (c === avBg ? ' on' : '') + '" data-bg="' + c + '" style="background:' + c + '" aria-label="Fon rangi"></button>').join('') + '</div>' + EMOJI.slice(0, 32).map(m => '<button type="button" class="se-k av" data-av="' + m + '" style="background:' + avBg + '" aria-label="' + m + ' avatar">' + m + '</button>').join(''); }
    };
    const draw = () => {
      box.innerHTML = face({ full_name: o.name, photo, stickers: st }).replace(/^<div class="ph">|<\/div>$/g, '');
      box.querySelectorAll('.stk').forEach(n => n.classList.toggle('on', +n.dataset.i === sel));
      selBar.hidden = sel < 0;
      const rm = host.querySelector('[data-a=nophoto]'); if (rm) rm.hidden = !photo;
    };
    const changed = () => { draw(); o.onChange && o.onChange({ photo, stickers: st, photoKind: kind }); };
    host.addEventListener('click', ev => {
      const t = ev.target.closest('[data-t]'); if (t && t.closest('.se-tabs')) { tab = t.dataset.t; drawPal(); return; }
      const k = ev.target.closest('[data-k]'), em = ev.target.closest('[data-e]'), av = ev.target.closest('[data-av]'), bg = ev.target.closest('[data-bg]'), a = ev.target.closest('[data-a]');
      if ((k || em) && st.length < 30) {
        st.push(k ? { k: k.dataset.k, x: .3 + Math.random() * .4, y: .3 + Math.random() * .4, s: k.dataset.k === 'glasses' ? .6 : .3, r: Math.round(Math.random() * 30 - 15) } : { k: 'e', t: em.dataset.e, x: .3 + Math.random() * .4, y: .3 + Math.random() * .4, s: .26, r: Math.round(Math.random() * 30 - 15) });
        sel = st.length - 1; changed(); return;
      }
      if (bg) { avBg = bg.dataset.bg; drawPal(); return; }
      if (av) { photo = emojiAvatar(av.dataset.av, avBg); kind = 'emoji'; changed(); return; }
      if (a && a.dataset.a === 'nophoto') { photo = null; kind = null; changed(); return; }
      if (a && sel >= 0) {
        const s = st[sel], A = a.dataset.a;
        if (A === 'rl') s.r -= 15; else if (A === 'rr') s.r += 15; else if (A === 'sm') s.s = Math.max(.1, s.s - .04); else if (A === 'bg') s.s = Math.min(.9, s.s + .04); else if (A === 'rm') { st.splice(sel, 1); sel = -1; }
        changed();
      }
    });
    const file = host.querySelector('input[type=file]');
    if (file) file.addEventListener('change', async () => { const f = file.files[0]; if (!f) return; try { photo = await crop(f); kind = 'photo'; changed(); } catch (err) { o.onError && o.onError("Rasmni o'qib bo'lmadi. Boshqa rasm tanlang."); } file.value = ''; });
    let drag = null;
    box.addEventListener('pointerdown', ev => {
      const n = ev.target.closest('.stk');
      if (!n) { if (sel >= 0) { sel = -1; draw(); } return; }
      sel = +n.dataset.i; draw();
      drag = { r: box.getBoundingClientRect(), id: ev.pointerId, moved: false };
      box.setPointerCapture(ev.pointerId); ev.preventDefault();
    });
    box.addEventListener('pointermove', ev => {
      if (!drag || ev.pointerId !== drag.id) return;
      const s = st[sel]; s.x = Math.min(1, Math.max(0, (ev.clientX - drag.r.left) / drag.r.width)); s.y = Math.min(1, Math.max(0, (ev.clientY - drag.r.top) / drag.r.height));
      const n = box.querySelector('.stk[data-i="' + sel + '"]'); if (n) { n.style.left = s.x * 100 + '%'; n.style.top = s.y * 100 + '%'; }
      drag.moved = true;
    });
    const up = () => { if (drag) { const m = drag.moved; drag = null; if (m) changed(); } };
    box.addEventListener('pointerup', up); box.addEventListener('pointercancel', up);
    draw(); drawPal();
    return { get: () => ({ photo, stickers: st, photoKind: kind }) };
  }

  function crop(file) {
    return new Promise((res, rej) => {
      const img = new Image(), url = URL.createObjectURL(file);
      img.onload = () => {
        const m = Math.min(img.width, img.height), c = document.createElement('canvas'); c.width = c.height = 320;
        c.getContext('2d').drawImage(img, (img.width - m) / 2, (img.height - m) / 2, m, m, 0, 0, 320, 320);
        URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', .8));
      };
      img.onerror = () => { URL.revokeObjectURL(url); rej(new Error('img')); };
      img.src = url;
    });
  }
  KM.stk = { D, EMOJI, face, editor, crop, initials, tint, emojiAvatar };
})();
