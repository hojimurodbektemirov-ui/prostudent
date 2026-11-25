{
const x = KM.x, c = KM.c;
KM.sinf({ n: 11, stage: 'yuqori', t: `Ilovalar va yakuniy loyiha`, d: `Obyektlar, massiv metodlari, kalkulyator va shaxsiy portfolio sayt.`, lessons: [
{
  t: `Obyektlar, filter va map`, min: 35,
  key: `Obyekt: { ism: "Ali", ball: 90 }. filter tanlaydi, map o'zgartiradi, reduce yig'adi.`,
  theory: `<p><b>Obyekt</b> bitta narsa haqidagi ma'lumotlarni nomlari bilan saqlaydi:</p>
${x(`const talaba = { ism: "Ali", ball: 92 };
console.log(talaba.ism); // Ali`, 'js')}
<p>Obyektlar massivi bilan ishlash uchun uchta kuchli metod bor:</p>
${x(`const sinf = [
  { ism: "Ali", ball: 92 },
  { ism: "Vali", ball: 64 }
];

const yaxshilar = sinf.filter(t => t.ball >= 86); // tanlash
const ismlar = sinf.map(t => t.ism);              // ["Ali", "Vali"]
const jami = sinf.reduce((s, t) => s + t.ball, 0); // 156`, 'js')}
<p>${c('t => t.ball >= 86')} bu qisqa funksiya (arrow function): "t ni olib, t.ball >= 86 ni qaytar".</p>`,
  quiz: [
    [`Massivdan shartga mos elementlarni tanlash:`, [`map`, `filter`, `push`], 1, `filter.`],
    [`[1, 2, 3].map(n => n * 2) natijasi:`, [`[2, 4, 6]`, `[1, 2, 3]`, `6`], 0, `map har bir elementni o'zgartiradi.`]
  ],
  prac: {
    task: `${c('alochilar(list)')} bali 86 va undan yuqori bo'lganlarning <b>ismlari</b> massivini, ${c('ortacha(list)')} o'rtacha ballni qaytarsin.`,
    tabs: ['js'],
    js: `const sinf = [\n  { ism: "Ali", ball: 92 },\n  { ism: "Madina", ball: 88 },\n  { ism: "Sardor", ball: 64 },\n  { ism: "Laylo", ball: 75 }\n];\n\nfunction alochilar(list) {\n  // filter va map\n\n}\n\nfunction ortacha(list) {\n  // reduce yoki for\n\n}\n\nconsole.log(alochilar(sinf));\nconsole.log(ortacha(sinf));\n`,
    tests: [
      [`alochilar(sinf) → ["Ali", "Madina"]`, () => JSON.stringify(alochilar(sinf)) === '["Ali","Madina"]'],
      [`Hech kim bo'lmasa → []`, () => JSON.stringify(alochilar([{ ism: 'X', ball: 50 }])) === '[]'],
      [`ortacha(sinf) → 79.75`, () => Math.abs(ortacha(sinf) - 79.75) < 0.01],
      [`ortacha([{ball: 100}]) → 100`, () => ortacha([{ ism: 'Y', ball: 100 }]) === 100]
    ],
    hint: `return list.filter(t => t.ball >= 86).map(t => t.ism);\n\nreturn list.reduce((s, t) => s + t.ball, 0) / list.length;`,
    sol: { js: `const sinf = [\n  { ism: "Ali", ball: 92 },\n  { ism: "Madina", ball: 88 },\n  { ism: "Sardor", ball: 64 },\n  { ism: "Laylo", ball: 75 }\n];\n\nfunction alochilar(list) {\n  return list.filter(t => t.ball >= 86).map(t => t.ism);\n}\n\nfunction ortacha(list) {\n  return list.reduce((s, t) => s + t.ball, 0) / list.length;\n}\n\nconsole.log(alochilar(sinf));\nconsole.log(ortacha(sinf));\n` }
  }
},
{
  t: `Loyiha: kalkulyator`, min: 40,
  key: `input.value har doim matn. Hisoblashdan oldin Number() bilan songa aylantiring.`,
  theory: `<p>Mashhur xato: ${c('"2" + "3"')} natijasi ${c('"23"')}, chunki input dan kelgan qiymat <b>matn</b>. Songa aylantirish kerak:</p>
${x(`const a = Number(document.querySelector("#a").value);
const b = Number(document.querySelector("#b").value);
console.log(a + b); // 5`, 'js')}
<p>Nolga bo'lish ham xavfli: ${c('5 / 0')} JavaScript'da ${c('Infinity')} beradi. Foydalanuvchiga tushunarli xabar chiqaring.</p>
<p>Bitta funksiya yozib, uni hamma tugmalarda ishlatish kodni qisqa qiladi:</p>
${x(`function hisobla(amal) {
  // a va b ni oling, amal ga qarab hisoblang
}`, 'js')}`,
  quiz: [
    [`"2" + "3" natijasi:`, [`5`, `"23"`, `Xato`], 1, `Matnlar qo'shilganda yopishib qoladi.`],
    [`Matnni songa aylantirish:`, [`Number("5")`, `String(5)`, `"5".num`], 0, `Number().`]
  ],
  prac: {
    task: `To'rtta tugma ishlasin: ${c('#qosh')}, ${c('#ayir')}, ${c('#kop')}, ${c('#bol')}. Natija ${c('#natija')} ga chiqsin. 0 ga bo'lganda "Xato: nolga bo'lib bo'lmaydi" chiqsin.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="calc">\n  <input id="a" type="number" value="6">\n  <input id="b" type="number" value="3">\n  <div class="btns">\n    <button id="qosh">+</button>\n    <button id="ayir">−</button>\n    <button id="kop">×</button>\n    <button id="bol">÷</button>\n  </div>\n  <p>Natija: <b id="natija">?</b></p>\n</div>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.calc {\n  max-width: 280px;\n  display: grid;\n  gap: 8px;\n}\n\ninput, button {\n  font-size: 20px;\n  padding: 8px;\n}\n\n.btns {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 6px;\n}\n`,
    js: `const natija = document.querySelector("#natija");\n\nfunction hisobla(amal) {\n  const a = document.querySelector("#a").value;\n  const b = document.querySelector("#b").value;\n  // amal ga qarab hisoblang\n\n}\n\ndocument.querySelector("#qosh").addEventListener("click", () => hisobla("+"));\n`,
    tests: [
      [`2 + 3 = 5 (matn emas, son)`, () => { document.querySelector('#a').value = 2; document.querySelector('#b').value = 3; document.querySelector('#qosh').click(); return document.querySelector('#natija').textContent.trim() === '5'; }],
      [`6 − 3 = 3`, () => { document.querySelector('#a').value = 6; document.querySelector('#b').value = 3; document.querySelector('#ayir').click(); return document.querySelector('#natija').textContent.trim() === '3'; }],
      [`6 × 3 = 18`, () => { document.querySelector('#a').value = 6; document.querySelector('#b').value = 3; document.querySelector('#kop').click(); return document.querySelector('#natija').textContent.trim() === '18'; }],
      [`6 ÷ 3 = 2`, () => { document.querySelector('#a').value = 6; document.querySelector('#b').value = 3; document.querySelector('#bol').click(); return document.querySelector('#natija').textContent.trim() === '2'; }],
      [`5 ÷ 0 → "Xato" xabari`, () => { document.querySelector('#a').value = 5; document.querySelector('#b').value = 0; document.querySelector('#bol').click(); return /xato/i.test(document.querySelector('#natija').textContent); }]
    ],
    hint: `const a = Number(...);\nif (amal === "+") natija.textContent = a + b;\nelse if (amal === "/" && b === 0) natija.textContent = "Xato: nolga bo'lib bo'lmaydi";`,
    sol: { js: `const natija = document.querySelector("#natija");\n\nfunction hisobla(amal) {\n  const a = Number(document.querySelector("#a").value);\n  const b = Number(document.querySelector("#b").value);\n\n  if (amal === "+") natija.textContent = a + b;\n  else if (amal === "-") natija.textContent = a - b;\n  else if (amal === "*") natija.textContent = a * b;\n  else if (amal === "/") {\n    natija.textContent = b === 0 ? "Xato: nolga bo'lib bo'lmaydi" : a / b;\n  }\n}\n\ndocument.querySelector("#qosh").addEventListener("click", () => hisobla("+"));\ndocument.querySelector("#ayir").addEventListener("click", () => hisobla("-"));\ndocument.querySelector("#kop").addEventListener("click", () => hisobla("*"));\ndocument.querySelector("#bol").addEventListener("click", () => hisobla("/"));\n` }
  }
},
{
  t: `Yakuniy loyiha: portfolio sayt`, min: 60,
  key: `Semantik teglar (header, nav, main, section, footer) sahifa tuzilmasini tushunarli qiladi.`,
  theory: `<p>11 yil davomida o'rganganlaringizni bitta saytga yig'amiz: <b>shaxsiy portfolio</b>. Uni keyin GitHub Pages'ga joylab, havolasini universitetga yoki ish beruvchiga yuborishingiz mumkin.</p>
<p>Professional sayt <b>semantik</b> teglardan quriladi:</p>
${x(`<header>
  <h1>Ismingiz</h1>
  <nav>
    <a href="#haqida">Men haqimda</a>
    <a href="#loyihalar">Loyihalar</a>
    <a href="#aloqa">Aloqa</a>
  </nav>
</header>
<main>
  <section id="haqida">...</section>
  <section id="loyihalar">...</section>
</main>
<footer>© 2026</footer>`)}
<p>Talablar: semantik tuzilma, telefon uchun ${c('@media')} qoidasi va JavaScript bilan tun/kun rejimi tugmasi (${c('classList.toggle')}).</p>`,
  quiz: [
    [`Sayt menyusi qaysi tegda bo'ladi?`, [`<menu>`, `<nav>`, `<links>`], 1, `nav: navigation.`],
    [`classList.toggle("dark") nima qiladi?`, [`Klassni har doim qo'shadi`, `Klass bo'lsa olib tashlaydi, bo'lmasa qo'shadi`, `Klassni o'chiradi`], 1, `toggle: almashtirgich.`]
  ],
  prac: {
    task: `Portfolio saytni tugating: ${c('header')} ichida ${c('nav')} (kamida 3 havola), ${c('main')} ichida kamida 2 ${c('section')}, ${c('footer')}, ${c('@media')} qoidasi va ${c('#mavzu')} tugmasi ${c('body')} ga ${c('dark')} klassini almashtirsin.`,
    tabs: ['html', 'css', 'js'],
    html: `<header>\n  <h1>Ismingiz Familiyangiz</h1>\n  <nav>\n    <a href="#haqida">Men haqimda</a>\n  </nav>\n  <button id="mavzu">Tun rejimi</button>\n</header>\n\n<main>\n  <section id="haqida">\n    <h2>Men haqimda</h2>\n    <p>11-sinf o'quvchisiman, veb dasturlashni o'rganyapman.</p>\n  </section>\n</main>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  line-height: 1.6;\n}\n\nheader {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  background: #1f4fff;\n  color: white;\n}\n\nheader a {\n  color: white;\n  margin-right: 12px;\n}\n\nsection {\n  padding: 24px;\n}\n\nbody.dark {\n  background: #0b1020;\n  color: #e9edf8;\n}\n`,
    js: `// #mavzu tugmasi body ga "dark" klassini almashtirsin\n`,
    tests: [
      [`<header> va ichida <nav>`, () => !!document.querySelector('header nav')],
      [`nav da kamida 3 havola`, () => document.querySelectorAll('nav a').length >= 3],
      [`<main> ichida kamida 2 <section>`, () => document.querySelectorAll('main section').length >= 2],
      [`<footer> bor`, () => !!document.querySelector('footer')],
      [`@media qoidasi bor`, () => [...document.styleSheets].some(s => [...s.cssRules].some(r => r instanceof CSSMediaRule))],
      [`#mavzu tugmasi dark klassini almashtiradi`, () => { const b = document.querySelector('#mavzu'); if (!b) return false; const a = document.body.classList.contains('dark'); b.click(); const m = document.body.classList.contains('dark'); b.click(); return m !== a && document.body.classList.contains('dark') === a; }]
    ],
    hint: `document.querySelector("#mavzu").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});`,
    sol: {
      html: `<header>\n  <h1>Ismingiz Familiyangiz</h1>\n  <nav>\n    <a href="#haqida">Men haqimda</a>\n    <a href="#loyihalar">Loyihalar</a>\n    <a href="#aloqa">Aloqa</a>\n  </nav>\n  <button id="mavzu">Tun rejimi</button>\n</header>\n\n<main>\n  <section id="haqida">\n    <h2>Men haqimda</h2>\n    <p>11-sinf o'quvchisiman, veb dasturlashni o'rganyapman.</p>\n  </section>\n  <section id="loyihalar">\n    <h2>Loyihalar</h2>\n    <ul>\n      <li>Kalkulyator</li>\n      <li>Vazifalar ro'yxati</li>\n    </ul>\n  </section>\n  <section id="aloqa">\n    <h2>Aloqa</h2>\n    <p>Telegram: @username</p>\n  </section>\n</main>\n\n<footer>\n  <p>© 2026 Ismingiz</p>\n</footer>\n`,
      css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  line-height: 1.6;\n}\n\nheader {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n  align-items: center;\n  justify-content: space-between;\n  padding: 16px 24px;\n  background: #1f4fff;\n  color: white;\n}\n\nheader a {\n  color: white;\n  margin-right: 12px;\n}\n\nsection, footer {\n  padding: 24px;\n}\n\nbody.dark {\n  background: #0b1020;\n  color: #e9edf8;\n}\n\n@media (max-width: 600px) {\n  header {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n}\n`,
      js: `document.querySelector("#mavzu").addEventListener("click", () => {\n  document.body.classList.toggle("dark");\n});\n`
    }
  }
}
] });
}
