/* Kichik sinflar uchun "Robot yo'li" o'yini: strelkalar bilan dastur tuzish.
   Xarita belgilari: S start, G bayroq, * tanga, # devor, . yo'l */
(function () {
  const D = { u: [0, -1, '↑', 'Yuqoriga'], r: [1, 0, '→', "O'ngga"], d: [0, 1, '↓', 'Pastga'], l: [-1, 0, '←', 'Chapga'] };
  const BOT = '<svg viewBox="0 0 40 40" aria-hidden="true"><line x1="20" y1="4" x2="20" y2="10" stroke="currentColor" stroke-width="2.5"/><circle cx="20" cy="4" r="3" fill="#ffd84a"/><rect x="7" y="10" width="26" height="22" rx="7" fill="#1f4fff"/><rect x="11" y="15" width="18" height="10" rx="4" fill="#fff"/><circle cx="16" cy="20" r="2.4" fill="#0d1220"/><circle cx="24" cy="20" r="2.4" fill="#0d1220"/><rect x="12" y="32" width="5" height="5" rx="2" fill="#1f4fff"/><rect x="23" y="32" width="5" height="5" rx="2" fill="#1f4fff"/></svg>';
  const FLAG = '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="11" y="6" width="3" height="30" rx="1.5" fill="currentColor"/><path d="M14 7h17l-4 6 4 6H14z" fill="#e8590c"/></svg>';
  KM.robot = function (host, lv, onWin) {
    const map = lv.map.map(r => r.split('')), H = map.length, W = map[0].length;
    let sx = 0, sy = 0; map.forEach((r, y) => r.forEach((c, x) => { if (c === 'S') { sx = x; sy = y; } }));
    let prog = (lv.start || []).map(c => ({ d: c[0], n: c[1] || 1 })), busy = false, timer;
    host.innerHTML = '<div class="rb"><div class="rb-board" style="--w:' + W + ';--h:' + H + '"></div><div class="rb-side"><p class="rb-lab">Buyruqlar</p><div class="rb-pal">' +
      Object.keys(D).map(k => '<button class="rb-cmd" data-d="' + k + '" aria-label="' + D[k][3] + '">' + D[k][2] + '</button>').join('') +
      '</div><p class="rb-lab">Dastur <small>chipni bossangiz soni oshadi, × o\'chiradi</small></p><div class="rb-prog" aria-live="polite"></div><div class="acts"><button class="btn pri" data-a="run">Ishga tushirish</button><button class="btn" data-a="clr">Tozalash</button></div><div class="rb-msg" role="status"></div></div></div>';
    const board = host.querySelector('.rb-board'), pg = host.querySelector('.rb-prog'), msg = host.querySelector('.rb-msg');
    let coins;
    function draw() {
      coins = 0;
      board.innerHTML = map.map((r, y) => r.map((c, x) => { if (c === '*') coins++; return '<div class="rb-c ' + (c === '#' ? 'wall' : '') + '" data-xy="' + x + ',' + y + '">' + (c === 'G' ? FLAG : c === '*' ? '<i class="coin"></i>' : '') + '</div>'; }).join('')).join('') +
        '<div class="rb-bot" style="--x:' + sx + ';--y:' + sy + '">' + BOT + '</div>';
    }
    function list() {
      pg.innerHTML = prog.length ? prog.map((c, i) => '<span class="chip-c"><button class="cc" data-i="' + i + '" aria-label="' + D[c.d][3] + ' ' + c.n + ' marta">' + D[c.d][2] + (c.n > 1 ? '<b>×' + c.n + '</b>' : '') + '</button><button class="cx" data-x="' + i + '" aria-label="O\'chirish">×</button></span>').join('') : '<span class="rb-empty">Yuqoridagi strelkalarni bosing</span>';
    }
    function say(t, k) { msg.textContent = t; msg.className = 'rb-msg ' + (k || ''); }
    host.addEventListener('click', e => {
      if (busy) return;
      const b = e.target.closest('button'); if (!b) return;
      if (b.dataset.d) { if (prog.length < 20) prog.push({ d: b.dataset.d, n: 1 }); list(); say(''); }
      else if (b.dataset.i) { const c = prog[+b.dataset.i]; c.n = c.n >= 9 ? 1 : c.n + 1; list(); }
      else if (b.dataset.x) { prog.splice(+b.dataset.x, 1); list(); }
      else if (b.dataset.a === 'clr') { prog = []; list(); draw(); say(''); }
      else if (b.dataset.a === 'run') go();
    });
    function go() {
      if (!prog.length) return say('Avval dastur tuzing: strelkalarni bosing.', 'bad');
      draw(); busy = true; host.classList.add('busy');
      const steps = []; prog.forEach(c => { for (let i = 0; i < c.n; i++) steps.push(c.d); });
      const bot = board.querySelector('.rb-bot'); let x = sx, y = sy, got = 0, k = 0;
      const end = (t, cls) => { busy = false; host.classList.remove('busy'); say(t, cls); };
      const step = () => {
        if (k >= steps.length) {
          if (map[y][x] === 'G' && got === coins) {
            const stars = prog.length <= (lv.best || 99) ? 3 : prog.length <= (lv.best || 99) * 2 ? 2 : 1;
            end('Barakalla! Robot yetib keldi. ' + '★'.repeat(stars) + '☆'.repeat(3 - stars) + (stars < 3 ? '  Kamroq buyruq bilan urinib ko\'ring (×2, ×3 dan foydalaning).' : ''), 'ok');
            onWin && onWin(stars);
          } else if (map[y][x] === 'G') end('Bayroqqa yetdingiz, lekin hamma tangalar yig\'ilmadi.', 'bad');
          else end('Dastur tugadi, lekin robot bayroqqa yetmadi. Yana urinib ko\'ring!', 'bad');
          return;
        }
        const d = D[steps[k++]], nx = x + d[0], ny = y + d[1];
        if (ny < 0 || ny >= H || nx < 0 || nx >= W || map[ny][nx] === '#') { bot.classList.add('hit'); return end('Voy! Robot devorga urildi (' + k + '-qadam). Dasturni tuzating.', 'bad'); }
        x = nx; y = ny; bot.style.setProperty('--x', x); bot.style.setProperty('--y', y);
        if (map[y][x] === '*') { const cell = board.querySelector('[data-xy="' + x + ',' + y + '"] .coin'); if (cell && !cell.classList.contains('got')) { cell.classList.add('got'); got++; } }
        timer = setTimeout(step, 380);
      };
      timer = setTimeout(step, 250);
    }
    draw(); list();
    return { stop() { clearTimeout(timer); } };
  };
})();
