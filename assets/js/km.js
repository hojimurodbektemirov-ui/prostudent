/* ZIS ProStudent: umumiy obyekt va yordamchi funksiyalar.
   Dasturlash darslari: content/sinf-XX.js  → KM.sinf({...})
   Informatika darslari: content/informatika/sinf-XX.js → KM.inf({...}) (tools/build_informatika.py yaratadi) */
window.KM = {
  grades: [],
  tracks: [],
  infGrades: [],
  stages: {
    boshlang: { t: "Boshlang'ich sinflar", d: "1–4-sinf: kompyuter, algoritm va birinchi veb sahifa" },
    orta: { t: "O'rta sinflar", d: "5–9-sinf: HTML, CSS va JavaScript asoslari" },
    yuqori: { t: "Yuqori sinflar", d: "10–11-sinf: DOM, ilovalar va yakuniy loyiha" }
  },
  courses: {
    informatika: { t: 'Informatika', d: "Fan darslari: o'qituvchi rejasi bo'yicha nazariya, test va uyga vazifa" },
    dasturlash: { t: 'Dasturlash', d: "HTML, CSS va JavaScript: kod yozib, avtomatik tekshiriladigan amaliyot" }
  },
  /* Alohida kurslar (HTML, CSS, JS, Loyihalar): content/kurs-*.js → KM.kurs({ n: 'html', ... }) */
  kurs(t) { t.kurs = true; this.tracks.push(t); this.tracks.sort((a, b) => (a.o || 0) - (b.o || 0)); },
  sinf(g) { this.grades.push(g); this.grades.sort((a, b) => a.n - b.n); },
  inf(g) { this.infGrades.push(g); this.infGrades.sort((a, b) => a.n - b.n); },
  esc(s) { return String(s).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); },
  /* Nazariyadagi kod misoli: KM.x(`<h1>Salom</h1>`, 'html') */
  x(code, lang) { return '<pre class="ex" data-l="' + (lang || 'html') + '"><code>' + KM.esc(code.trim()) + '</code></pre>'; },
  c(code) { return '<code>' + KM.esc(code) + '</code>'; },
  lesson(id) {
    const s = String(id), k = s.lastIndexOf('-'), a = s.slice(0, k), i = +s.slice(k + 1);
    const g = /^\d+$/.test(a) ? this.grades.find(g => g.n === +a) : this.tracks.find(t => t.n === a);
    return g && g.lessons[i - 1] ? { g, l: g.lessons[i - 1], i, id: g.n + '-' + i } : null;
  },
  infLesson(id) {
    const [n, i] = String(id).split('-').map(Number);
    const g = this.infGrades.find(g => g.n === n);
    const l = g && g.lessons.find(l => l.n === i);
    return l ? { g, l, i, id: n + '-' + i, idx: g.lessons.indexOf(l) } : null;
  },
  /* Yengil markdown: **qalin**, `kod`, - ro'yxat, 1. ro'yxat, > eslatma, ```kod```, | jadval | */
  md(src) {
    const inl = s => KM.esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>');
    const L = String(src || '').split('\n'); let out = '', i = 0;
    while (i < L.length) {
      const l = L[i];
      if (/^```/.test(l)) { const lang = l.slice(3).trim() || 'html', buf = []; i++; while (i < L.length && !/^```/.test(L[i])) buf.push(L[i++]); i++; out += '<pre class="ex" data-l="' + KM.esc(lang) + '"><code>' + KM.esc(buf.join('\n')) + '</code></pre>'; continue; }
      if (/^\s*- /.test(l)) { out += '<ul>'; while (i < L.length && /^\s*- /.test(L[i])) { const sub = /^\s+- /.test(L[i]); out += '<li' + (sub ? ' class="sub-li"' : '') + '>' + inl(L[i++].replace(/^\s*- /, '')) + '</li>'; } out += '</ul>'; continue; }
      if (/^\d+\. /.test(l)) { out += '<ol>'; while (i < L.length && /^\d+\. /.test(L[i])) out += '<li>' + inl(L[i++].replace(/^\d+\. /, '')) + '</li>'; out += '</ol>'; continue; }
      if (/^\|/.test(l)) { const rows = []; while (i < L.length && /^\|/.test(L[i])) rows.push(L[i++].replace(/^\||\|\s*$/g, '').split('|').map(c => c.trim())); out += '<div class="scroll"><table class="mdt"><thead><tr>' + rows[0].map(c => '<th>' + inl(c) + '</th>').join('') + '</tr></thead><tbody>' + rows.slice(1).map(r => '<tr>' + r.map(c => '<td>' + inl(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>'; continue; }
      if (/^> /.test(l)) { out += '<div class="note">' + inl(l.slice(2)) + '</div>'; i++; continue; }
      if (l.trim()) out += '<p>' + inl(l) + '</p>';
      i++;
    }
    return out;
  }
};
