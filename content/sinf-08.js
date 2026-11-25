{
const x = KM.x, c = KM.c;
KM.sinf({ n: 8, stage: 'orta', t: `Grid, moslashuv va JS`, d: `CSS Grid, telefon uchun moslashuvchan dizayn va JavaScript bilan tanishuv.`, lessons: [
{
  t: `CSS Grid`, min: 25,
  key: `grid-template-columns: repeat(3, 1fr) uchta teng ustun yaratadi.`,
  theory: `<p>Flexbox bitta qator uchun qulay. <b>Grid</b> esa qator va ustunli to'r: galereya, kartochkalar, sahifa tuzilmasi.</p>
${x(`.galereya {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}`, 'css')}
<ul><li>${c('1fr')}: bo'sh joyning bir ulushi. ${c('repeat(3, 1fr)')} uchta teng ustun.</li><li>Bolalar o'zi katakchalarga teriladi: 4-element ikkinchi qatorga tushadi.</li><li>${c('gap')} kataklar orasidagi masofa.</li></ul>`,
  quiz: [
    [`repeat(4, 1fr) nechta ustun beradi?`, [`1`, `4`, `5`], 1, `4 ta teng ustun.`],
    [`fr nimani bildiradi?`, [`Piksel`, `Bo'sh joy ulushi`, `Shrift`], 1, `fr: fraction, ulush.`]
  ],
  prac: {
    task: `${c('.galereya')} ni 3 ustunli grid qiling, oralig'i kamida 8px.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="galereya">\n  <div class="rasm">1</div>\n  <div class="rasm">2</div>\n  <div class="rasm">3</div>\n  <div class="rasm">4</div>\n  <div class="rasm">5</div>\n  <div class="rasm">6</div>\n</div>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.rasm {\n  background: #ffd84a;\n  padding: 30px;\n  text-align: center;\n  font-size: 24px;\n  border-radius: 8px;\n}\n\n.galereya {\n  \n}\n`,
    tests: [
      [`display: grid`, () => getComputedStyle(document.querySelector('.galereya')).display === 'grid'],
      [`Aynan 3 ta ustun`, () => getComputedStyle(document.querySelector('.galereya')).gridTemplateColumns.trim().split(/\s+/).length === 3],
      [`gap kamida 8px`, () => parseFloat(getComputedStyle(document.querySelector('.galereya')).rowGap) >= 8]
    ],
    hint: `.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}`,
    sol: { css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.rasm {\n  background: #ffd84a;\n  padding: 30px;\n  text-align: center;\n  font-size: 24px;\n  border-radius: 8px;\n}\n\n.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n` }
  }
},
{
  t: `Telefon uchun dizayn`, min: 25,
  key: `@media (max-width: 600px) { ... } faqat tor ekranda ishlaydigan qoidalar.`,
  theory: `<p>Saytlarning yarmidan ko'pi telefonda ochiladi. Kompyuterda yonma-yon turgan ustunlar telefonda ustma-ust turishi kerak.</p>
${x(`.ustunlar {
  display: flex;
  gap: 16px;
}

@media (max-width: 600px) {
  .ustunlar {
    flex-direction: column;
  }
}`, 'css')}
<p>${c('@media')} ichidagi qoidalar faqat shart bajarilganda ishlaydi. ${c('max-width: 600px')}: ekran kengligi 600px yoki undan kichik bo'lsa.</p>
<p>Natija oynasini tor qilib ko'ring: muharrir va natija orasidagi chiziqni suring.</p>`,
  quiz: [
    [`@media (max-width: 600px) qachon ishlaydi?`, [`Ekran 600px dan keng bo'lsa`, `Ekran 600px yoki tor bo'lsa`, `Har doim`], 1, `max-width: eng ko'pi bilan 600px.`],
    [`Flex elementlarni ustma-ust qilish:`, [`flex-direction: column`, `display: block-flex`, `flex: down`], 0, `column: ustun.`]
  ],
  prac: {
    task: `${c('@media (max-width: 600px)')} qoidasini qo'shing: tor ekranda ${c('.ustunlar')} ustma-ust (${c('column')}) tursin.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="ustunlar">\n  <div class="u">Yangiliklar</div>\n  <div class="u">E'lonlar</div>\n  <div class="u">Tadbirlar</div>\n</div>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.ustunlar {\n  display: flex;\n  gap: 16px;\n}\n\n.u {\n  flex: 1;\n  background: #eef2ff;\n  padding: 24px;\n  border-radius: 8px;\n}\n`,
    tests: [
      [`@media qoidasi bor`, () => [...document.styleSheets].some(s => [...s.cssRules].some(r => r instanceof CSSMediaRule))],
      [`Shart max-width bilan yozilgan`, () => [...document.styleSheets].some(s => [...s.cssRules].some(r => r instanceof CSSMediaRule && /max-width/.test(r.conditionText || r.media.mediaText)))],
      [`Ichida flex-direction: column`, () => [...document.styleSheets].some(s => [...s.cssRules].some(r => r instanceof CSSMediaRule && /flex-direction:\s*column/.test(r.cssText)))]
    ],
    hint: `@media (max-width: 600px) {\n  .ustunlar {\n    flex-direction: column;\n  }\n}`,
    sol: { css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.ustunlar {\n  display: flex;\n  gap: 16px;\n}\n\n.u {\n  flex: 1;\n  background: #eef2ff;\n  padding: 24px;\n  border-radius: 8px;\n}\n\n@media (max-width: 600px) {\n  .ustunlar {\n    flex-direction: column;\n  }\n}\n` }
  }
},
{
  t: `JavaScript bilan tanishuv`, min: 25,
  key: `const o'zgarmas qiymat, let o'zgaruvchi qiymat. console.log natijani konsolga chiqaradi.`,
  theory: `<p>HTML sahifaning <b>tanasi</b>, CSS <b>kiyimi</b>, JavaScript esa uning <b>miyasi</b>: hisoblaydi, tekshiradi, javob beradi.</p>
<p>Ma'lumot <b>o'zgaruvchi</b>larda saqlanadi:</p>
${x(`const ism = "Aziz";   // matn (string)
let yosh = 14;        // son (number)
yosh = yosh + 1;      // let qiymati o'zgarishi mumkin

console.log("Salom, " + ism);
console.log("Yoshim:", yosh);`, 'js')}
<ul><li>${c('const')}: qiymati o'zgarmaydi.</li><li>${c('let')}: qiymati keyin o'zgarishi mumkin.</li><li>Matn qo'shtirnoq ichida yoziladi, son esa qo'shtirnoqsiz.</li><li>${c('console.log()')} natijani pastdagi <b>Konsol</b>ga chiqaradi.</li></ul>`,
  quiz: [
    [`Qiymati o'zgarmaydigan o'zgaruvchi:`, [`let`, `const`, `var`], 1, `const: constant, o'zgarmas.`],
    [`"14" va 14 farqi nima?`, [`Farqi yo'q`, `Birinchisi matn, ikkinchisi son`, `Ikkalasi ham matn`], 1, `Qo'shtirnoq ichidagi hamma narsa matn.`]
  ],
  prac: {
    task: `${c('ism')} nomli matn va ${c('yosh')} nomli son o'zgaruvchi yarating. Keyin ${c('console.log')} bilan ismingiz bor salomni chiqaring.`,
    tabs: ['js'],
    js: `// 1. ism o'zgaruvchisini yarating\nconst ism = "";\n\n// 2. yosh o'zgaruvchisini yarating\n\n\n// 3. Konsolga salom chiqaring\n`,
    tests: [
      [`ism bo'sh bo'lmagan matn`, () => typeof ism === 'string' && ism.trim().length > 0],
      [`yosh son (number)`, () => typeof yosh === 'number'],
      [`Konsolda ismingiz chiqdi`, () => typeof ism === 'string' && ism.trim() !== '' && window.__logs.some(l => l.includes(ism))]
    ],
    hint: `const ism = "Aziz";\nlet yosh = 14;\nconsole.log("Salom, " + ism);`,
    sol: { js: `const ism = "Aziz";\nlet yosh = 14;\n\nconsole.log("Salom, " + ism);\nconsole.log("Yoshim:", yosh);\n` }
  }
}
] });
}
