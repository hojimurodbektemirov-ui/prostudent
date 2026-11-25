/* VS Code uslubidagi kod muharriri (kutubxonasiz):
   - Dark+ ranglari, HTML ichidagi <style>/<script> ham rangli, qavslar juftligi ranglari
   - teg/qavs/qo'shtirnoqni avtomatik yopish, Emmet (ul>li*3 + Tab, ! + Tab)
   - kod tavsiyalari (avtoto'ldirish), Ctrl+/ izoh, joriy qatorni ajratish */
(function () {
  const esc = s => s.replace(/[&<>]/g, c => c === '&' ? '&amp;' : c === '<' ? '&lt;' : '&gt;');
  const sp = (c, t) => '<span class="t-' + c + '">' + esc(t) + '</span>';
  const OPEN = '([{', CLOSE = ')]}';
  function br(ch, st) {
    if (OPEN.includes(ch)) return '<span class="t-b' + (st.d++ % 3) + '">' + ch + '</span>';
    if (st.d <= 0) return '<span class="t-berr">' + ch + '</span>';
    return '<span class="t-b' + (--st.d % 3) + '">' + ch + '</span>';
  }
  const JS_KW = new Set('if else for while do return break continue switch case default try catch finally throw new await yield import export from of in typeof instanceof delete'.split(' '));
  const JS_KW2 = new Set('const let var function class this true false null undefined NaN async extends super static get set'.split(' '));
  const PY_KW = new Set('def if elif else for while in return import from as class try except finally with lambda pass break continue and or not is None True False global'.split(' '));

  function js(src, py) {
    const st = { d: 0 }, re = py
      ? /(#[^\n]*)|("""[\s\S]*?(?:"""|$)|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][\w]*)|([()[\]{}])/g
      : /(\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$))|(`(?:\\[\s\S]|[^`\\])*`?|"(?:\\.|[^"\\\n])*"?|'(?:\\.|[^'\\\n])*'?)|(\b\d+(?:\.\d+)?\b)|([A-Za-z_$][\w$]*)|([()[\]{}])/g;
    let out = '', last = 0, m;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) out += sp('c', m[1]);
      else if (m[2]) out += sp('str', m[2]);
      else if (m[3]) out += sp('num', m[3]);
      else if (m[4]) {
        const w = m[4], prev = src.slice(0, m.index).trimEnd().slice(-1), next = src.slice(re.lastIndex).match(/^\s*\(/);
        if (py ? PY_KW.has(w) && !/^(None|True|False)$/.test(w) : JS_KW.has(w)) out += sp('kw', w);
        else if (py ? /^(None|True|False)$/.test(w) : JS_KW2.has(w)) out += sp('kw2', w);
        else if (next) out += sp('fn', w);
        else if (prev === '.') out += sp('prop', w);
        else if (/^[A-Z]/.test(w)) out += sp('cls', w);
        else out += sp('var', w);
      } else if (m[5]) out += br(m[5], st);
    }
    return out + esc(src.slice(last));
  }

  function css(src) {
    const st = { d: 0 }, re = /(\/\*[\s\S]*?(?:\*\/|$))|("[^"\n]*"?|'[^'\n]*'?)|(#[0-9a-fA-F]{3,8}\b)|(@[\w-]+)|(-?\d*\.?\d+(?:px|%|em|rem|vh|vw|svh|dvh|s|ms|deg|fr)?)|([.#]?-?[a-zA-Z_][\w-]*|::?[a-zA-Z-]+)|([{}():;,])/g;
    let out = '', last = 0, m, inB = 0, colon = false;
    while ((m = re.exec(src))) {
      out += esc(src.slice(last, m.index)); last = re.lastIndex;
      if (m[1]) out += sp('c', m[1]);
      else if (m[2]) out += sp('str', m[2]);
      else if (m[3]) out += inB && colon ? sp('num', m[3]) : sp('sel', m[3]);
      else if (m[4]) out += sp('kw', m[4]);
      else if (m[5]) out += sp('num', m[5]);
      else if (m[6]) {
        const w = m[6];
        if (!inB) out += sp('sel', w);
        else if (colon) out += /^\s*\(/.test(src.slice(re.lastIndex)) ? sp('fn', w) : sp('val', w);
        else out += sp('prop', w);
      } else {
        const p = m[7];
        if (p === '{') { inB++; colon = false; out += br(p, st); }
        else if (p === '}') { inB = Math.max(0, inB - 1); colon = false; out += br(p, st); }
        else if (p === '(' || p === ')') out += br(p, st);
        else if (p === ':') { if (inB) colon = true; out += inB ? esc(p) : sp('sel', p); }
        else if (p === ';') { colon = false; out += esc(p); }
        else out += esc(p);
      }
    }
    return out + esc(src.slice(last));
  }

  function html(src) {
    let out = '', i = 0;
    const n = src.length;
    while (i < n) {
      if (src.startsWith('<!--', i)) { const e = src.indexOf('-->', i + 4), j = e < 0 ? n : e + 3; out += sp('c', src.slice(i, j)); i = j; continue; }
      const tm = /^<(\/?)([a-zA-Z][\w-]*)/.exec(src.slice(i, i + 40));
      if (tm || src.startsWith('<!', i)) {
        if (!tm) { const e = src.indexOf('>', i), j = e < 0 ? n : e + 1; out += sp('pun', src.slice(i, j)); i = j; continue; }
        out += sp('pun', '<' + tm[1]) + sp('tag', tm[2]); i += tm[0].length;
        const name = tm[2].toLowerCase(), closing = !!tm[1];
        while (i < n && src[i] !== '>' && src[i] !== '<') {
          const am = /^(\s+)|^([^\s=>/"']+)|^(=)|^("[^"]*"?|'[^']*'?)|^(\/)/.exec(src.slice(i));
          if (!am) { out += esc(src[i]); i++; continue; }
          if (am[1]) out += esc(am[1]); else if (am[2]) out += sp('attr', am[2]); else if (am[3]) out += esc('='); else if (am[4]) out += sp('str', am[4]); else out += sp('pun', '/');
          i += am[0].length;
        }
        if (src[i] === '>') { out += sp('pun', '>'); i++; }
        if (!closing && (name === 'script' || name === 'style')) {
          const e = src.toLowerCase().indexOf('</' + name, i), j = e < 0 ? n : e;
          out += name === 'script' ? js(src.slice(i, j)) : css(src.slice(i, j)); i = j;
        }
        continue;
      }
      const j = src.indexOf('<', i + 1), k = j < 0 ? n : j;
      out += esc(src.slice(i, k)).replace(/&amp;[a-zA-Z#0-9]+;/g, x => '<span class="t-ent">' + x + '</span>'); i = k;
    }
    return out;
  }
  KM.hl = function (src, lang) {
    if (lang === 'html') return html(src);
    if (lang === 'css') return css(src);
    if (lang === 'js' || lang === 'javascript') return js(src);
    if (lang === 'python' || lang === 'py') return js(src, true);
    return esc(src);
  };

  /* ---------- lug'atlar ---------- */
  const TAGS = 'a abbr article aside audio b body br button canvas caption code div dl em footer form h1 h2 h3 h4 h5 h6 head header hr html i iframe img input label li link main meta nav ol option p pre script section select small span strong style sub sup table tbody td textarea th thead title tr u ul video'.split(' ');
  const VOID = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
  const ATTRS = 'class id href src alt title style type value placeholder name for width height target rel onclick disabled checked required action method lang charset content'.split(' ');
  const CSSP = 'align-items background background-color border border-radius bottom box-shadow color cursor display flex flex-direction flex-wrap font-family font-size font-weight gap grid-template-columns height justify-content left letter-spacing line-height margin margin-bottom margin-top max-width min-height opacity overflow padding padding-left padding-top position right text-align text-decoration text-transform top transform transition width z-index'.split(' ');
  const CSSV = 'absolute auto block bold center column flex grid hidden inline-block italic left none pointer relative right row solid space-between transparent uppercase white black red blue green orange yellow gray'.split(' ');
  const JSW = 'addEventListener alert appendChild classList console const createElement document else false filter forEach function getElementById if innerHTML length let log Math map Number parseInt prompt push querySelector querySelectorAll random floor return setInterval setTimeout style textContent toggle true value while for'.split(' ');

  function emmet(ab) {
    if (ab === '!') return '<!DOCTYPE html>\n<html lang="uz">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>|</title>\n</head>\n<body>\n  \n</body>\n</html>';
    const levels = ab.split('>');
    const one = spec => {
      const m = /^([a-z][a-z0-9]*)?((?:[.#][\w-]+)*)(?:\*(\d{1,2}))?$/i.exec(spec);
      if (!m || (!m[1] && !m[2])) return null;
      const tag = (m[1] || 'div').toLowerCase();
      if (m[1] && !TAGS.includes(tag)) return null;
      const cls = (m[2].match(/\.[\w-]+/g) || []).map(x => x.slice(1)), id = (m[2].match(/#[\w-]+/) || [''])[0].slice(1);
      return { tag, attrs: (id ? ' id="' + id + '"' : '') + (cls.length ? ' class="' + cls.join(' ') + '"' : ''), n: +(m[3] || 1) };
    };
    const parsed = levels.map(l => l.split('+').map(one));
    if (parsed.some(l => l.some(x => !x))) return null;
    const build = (li, ind) => {
      if (li >= parsed.length) return null;
      const sibs = parsed[li], inner = build(li + 1, ind + '  ');
      return sibs.map((s, k) => {
        const kid = k === sibs.length - 1 ? inner : null;
        return Array.from({ length: s.n }, () => {
          if (VOID.has(s.tag)) return ind + '<' + s.tag + s.attrs + (s.tag === 'img' ? ' src="|" alt=""' : '') + '>';
          if (kid) return ind + '<' + s.tag + s.attrs + '>\n' + kid + '\n' + ind + '</' + s.tag + '>';
          return ind + '<' + s.tag + s.attrs + '>|</' + s.tag + '>';
        }).join('\n');
      }).join('\n');
    };
    return build(0, '');
  }

  KM.editor = function (host, o) {
    host.innerHTML = '<div class="ed"><pre class="ed-gut" aria-hidden="true"></pre><div class="ed-main"><div class="ed-line" aria-hidden="true"></div><pre class="ed-hl" aria-hidden="true"></pre><textarea class="ed-ta" spellcheck="false" autocapitalize="off" autocomplete="off" autocorrect="off" aria-label="Kod muharriri" aria-autocomplete="list"></textarea><ul class="ac" role="listbox" hidden></ul></div></div>';
    const ta = host.querySelector('.ed-ta'), hl = host.querySelector('.ed-hl'), gut = host.querySelector('.ed-gut'), lineEl = host.querySelector('.ed-line'), ac = host.querySelector('.ac'), main = host.querySelector('.ed-main');
    let lang = o.lang || 'html', acItems = [], acSel = 0, acWord = '', cw = 8.4, lh = 22;
    const measure = () => { const s = getComputedStyle(ta); lh = parseFloat(s.lineHeight) || 22; const m = document.createElement('span'); m.style.cssText = 'position:absolute;visibility:hidden;white-space:pre;font:' + s.font; m.textContent = 'MMMMMMMMMM'; main.appendChild(m); cw = m.getBoundingClientRect().width / 10 || 8.4; m.remove(); };
    const pos = () => { const v = ta.value.slice(0, ta.selectionStart), ln = v.split('\n'); return { line: ln.length - 1, col: ln[ln.length - 1].length }; };
    const paint = () => {
      hl.innerHTML = KM.hl(ta.value, lang) + '\n ';
      const n = ta.value.split('\n').length, cur = pos().line; let s = ''; for (let i = 1; i <= n; i++) s += (i === cur + 1 ? '<b>' + i + '</b>' : i) + '\n';
      gut.innerHTML = s; sync();
    };
    const sync = () => { hl.scrollTop = ta.scrollTop; hl.scrollLeft = ta.scrollLeft; gut.scrollTop = ta.scrollTop; const p = pos(); lineEl.style.transform = 'translateY(' + (12 + p.line * lh - ta.scrollTop) + 'px)'; lineEl.style.height = lh + 'px'; };
    const caretMove = () => { const p = pos(), b = gut.querySelector('b'); if (!b || +b.textContent !== p.line + 1) { const n = ta.value.split('\n').length; let s = ''; for (let i = 1; i <= n; i++) s += (i === p.line + 1 ? '<b>' + i + '</b>' : i) + '\n'; gut.innerHTML = s; } sync(); };
    const insert = (t, back) => {
      ta.focus();
      if (!document.execCommand('insertText', false, t)) { ta.setRangeText(t, ta.selectionStart, ta.selectionEnd, 'end'); ta.dispatchEvent(new Event('input')); }
      if (back) ta.selectionStart = ta.selectionEnd = ta.selectionEnd - back;
    };
    /* qayerdamiz: html matni, teg ichi, <script> yoki <style> ichi */
    function ctx() {
      if (lang !== 'html') return lang;
      const v = ta.value.slice(0, ta.selectionStart).toLowerCase();
      const so = v.lastIndexOf('<script'), sc = v.lastIndexOf('</script'), yo = v.lastIndexOf('<style'), yc = v.lastIndexOf('</style');
      if (so > sc && v.indexOf('>', so) > -1) return 'js';
      if (yo > yc && v.indexOf('>', yo) > -1) return 'css';
      return v.lastIndexOf('<') > v.lastIndexOf('>') ? 'tag' : 'text';
    }
    /* ---------- tavsiyalar ---------- */
    function suggest() {
      const before = ta.value.slice(0, ta.selectionStart), c = ctx();
      const w = (before.match(/[\w-]+$/) || [''])[0]; let list = [], kind = c;
      if (c === 'tag' || c === 'text') {
        if (/<\/?[\w-]*$/.test(before)) list = TAGS, kind = 'tagname';
        else if (c === 'tag' && w) list = ATTRS, kind = 'attr';
        else if (c === 'text' && w && /(^|\n)\s*[\w-]+$/.test(before)) list = TAGS, kind = 'newtag';
      } else if (c === 'css') {
        const open = before.lastIndexOf('{') > before.lastIndexOf('}'), stmt = before.slice(Math.max(before.lastIndexOf('{'), before.lastIndexOf(';'), before.lastIndexOf('}')) + 1);
        if (open && w) { list = stmt.includes(':') ? CSSV : CSSP; kind = stmt.includes(':') ? 'cssval' : 'cssprop'; }
      } else if (c === 'js' && w.length >= 2) {
        const ids = (ta.value.match(/[A-Za-z_$][\w$]{2,}/g) || []);
        list = [...new Set([...JSW, ...ids])]; kind = 'js';
      }
      const lw = w.toLowerCase();
      acItems = (w || kind === 'tagname') ? list.filter(x => x.toLowerCase().startsWith(lw) && x !== w).slice(0, 8).map(x => ({ x, kind })) : [];
      acWord = w; acSel = 0;
      if (!acItems.length) { ac.hidden = true; return; }
      ac.innerHTML = acItems.map((it, i) => '<li role="option" data-i="' + i + '"' + (i === 0 ? ' class="on" aria-selected="true"' : '') + '><i class="k-' + it.kind + '"></i>' + esc(it.x) + '</li>').join('');
      const p = pos(); ac.style.left = Math.max(0, 6 + (p.col - w.length) * cw - ta.scrollLeft) + 'px'; ac.style.top = (12 + (p.line + 1) * lh - ta.scrollTop + 2) + 'px'; ac.hidden = false;
    }
    function accept(i) {
      const it = acItems[i]; if (!it) return; ac.hidden = true;
      ta.selectionStart = ta.selectionStart - acWord.length;
      if (it.kind === 'newtag') { if (VOID.has(it.x)) insert('<' + it.x + '>'); else insert('<' + it.x + '></' + it.x + '>', it.x.length + 3); }
      else if (it.kind === 'attr') insert(it.x + '=""', 1);
      else if (it.kind === 'cssprop') insert(it.x + ': ');
      else insert(it.x);
    }
    ac.addEventListener('mousedown', e => { const li = e.target.closest('li'); if (li) { e.preventDefault(); accept(+li.dataset.i); } });
    const moveSel = d => { acSel = (acSel + d + acItems.length) % acItems.length; [...ac.children].forEach((li, i) => { li.classList.toggle('on', i === acSel); li.setAttribute('aria-selected', i === acSel); }); };

    function toggleComment() {
      const v = ta.value, s = v.lastIndexOf('\n', ta.selectionStart - 1) + 1, eI = v.indexOf('\n', ta.selectionEnd), e = eI < 0 ? v.length : eI;
      const lines = v.slice(s, e).split('\n'), c = ctx();
      let res;
      if (c === 'js') { const all = lines.every(l => /^\s*\/\//.test(l) || !l.trim()); res = lines.map(l => all ? l.replace(/^(\s*)\/\/ ?/, '$1') : l.replace(/^(\s*)/, '$1// ')).join('\n'); }
      else { const [a, b] = c === 'css' ? ['/* ', ' */'] : ['<!-- ', ' -->']; const t = lines.join('\n'); res = t.trim().startsWith(a.trim()) ? t.replace(a.trim(), '').replace(b.trim(), '').replace(/^(\s*) /, '$1').replace(/ (\s*)$/, '$1') : t.replace(/^(\s*)/, '$1' + a) + b; }
      ta.selectionStart = s; ta.selectionEnd = e; insert(res);
    }

    ta.addEventListener('input', () => { paint(); o.onChange && o.onChange(ta.value); suggest(); });
    ta.addEventListener('scroll', () => { sync(); ac.hidden = true; });
    let blurT = 0;
    ta.addEventListener('blur', () => { blurT = setTimeout(() => { ac.hidden = true; }, 150); });
    ta.addEventListener('focus', () => clearTimeout(blurT));
    ['click', 'keyup'].forEach(ev => ta.addEventListener(ev, e => { if (ev === 'click' || /Arrow|Home|End|Page/.test(e.key)) { caretMove(); if (ev === 'click') ac.hidden = true; } }));
    ta.addEventListener('keydown', e => {
      const v = ta.value, p = ta.selectionStart, q = ta.selectionEnd, prev = v[p - 1], next = v[p], c = ctx();
      if (!ac.hidden) {
        if (e.key === 'ArrowDown') { e.preventDefault(); return moveSel(1); }
        if (e.key === 'ArrowUp') { e.preventDefault(); return moveSel(-1); }
        if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); return accept(acSel); }
        if (e.key === 'Escape') { e.preventDefault(); ac.hidden = true; return; }
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'Enter' || e.key === 's')) { e.preventDefault(); o.onRun && o.onRun(); return; }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); toggleComment(); return; }
      if (e.key === 'Tab' && !e.shiftKey) {
        e.preventDefault();
        if (c === 'text' && p === q) {
          const ab = (v.slice(0, p).match(/(?:^|[\s>])([!a-zA-Z0-9.#>*+-]+)$/) || [])[1];
          const ex = ab && emmet(ab);
          if (ex) {
            const ind = (v.slice(v.lastIndexOf('\n', p - 1) + 1, p).match(/^\s*/) || [''])[0];
            const out = ex.split('\n').map((l, i) => i ? ind + l : l).join('\n'), cur = out.indexOf('|'), clean = out.replace(/\|/g, '');
            ta.selectionStart = p - ab.length; insert(clean, cur < 0 ? 0 : clean.length - cur); return;
          }
        }
        insert('  '); return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const code = c === 'js' || c === 'css', inTag = c === 'tag';
      const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
      if (pairs[e.key] && (code || (inTag && e.key === '"'))) {
        const isQ = /["'`]/.test(e.key);
        if (p !== q) { e.preventDefault(); const sel = v.slice(p, q); insert(e.key + sel + pairs[e.key]); return; }
        if (isQ && next === e.key) { e.preventDefault(); ta.selectionStart = ta.selectionEnd = p + 1; caretMove(); return; }
        if (!isQ || ((!next || /[\s)\]};,>]/.test(next)) && !/\w/.test(prev || ''))) { e.preventDefault(); insert(e.key + pairs[e.key], 1); return; }
      }
      if (CLOSE.includes(e.key) && next === e.key && code && p === q) { e.preventDefault(); ta.selectionStart = ta.selectionEnd = p + 1; caretMove(); return; }
      if (e.key === 'Backspace' && p === q && prev && pairs[prev] === next && (code || inTag)) { e.preventDefault(); ta.selectionStart = p - 1; ta.selectionEnd = p + 1; insert(''); return; }
      if (e.key === '>' && (c === 'tag') && p === q) {
        const tm = v.slice(0, p).match(/<([a-zA-Z][\w-]*)(\s[^<>]*)?$/);
        if (tm && !VOID.has(tm[1].toLowerCase()) && !/\/\s*$/.test(v.slice(0, p))) { e.preventDefault(); insert('></' + tm[1] + '>', tm[1].length + 3); return; }
      }
      if (e.key === 'Enter' && !e.shiftKey) {
        const ls = v.lastIndexOf('\n', p - 1) + 1, line = v.slice(ls, p); let ind = line.match(/^\s*/)[0];
        const openTag = /<([a-zA-Z][\w-]*)(\s[^>]*)?>$/.test(line) && !/<\/|\/>$|<(br|img|input|hr|meta|link)\b/i.test(line.slice(line.lastIndexOf('<')));
        if (/[{([]$/.test(line.trimEnd()) || openTag) ind += '  ';
        e.preventDefault();
        if ((prev === '{' && next === '}') || (prev === '(' && next === ')') || (prev === '[' && next === ']') || (prev === '>' && v.slice(p, p + 2) === '</')) insert('\n' + ind + '\n' + ind.slice(2), ind.length - 1);
        else insert('\n' + ind);
      }
    });
    measure();
    return {
      get: () => ta.value,
      set(v, l) { if (l) lang = l; ta.value = v; ta.scrollTop = 0; ac.hidden = true; paint(); },
      focus: () => ta.focus()
    };
  };
})();
