{
const x = KM.x, c = KM.c;
KM.sinf({ n: 7, stage: 'orta', t: `Formalar va Flexbox`, d: `Ma'lumot yig'adigan formalar va elementlarni qatorga terish.`, lessons: [
{
  t: `Formalar`, min: 25,
  key: `<label for="id"> va <input id="id"> juftlikda ishlaydi.`,
  theory: `<p>Ro'yxatdan o'tish, qidiruv, izoh yozish: hammasi <b>forma</b>.</p>
${x(`<form>
  <label for="ism">Ismingiz</label>
  <input id="ism" type="text">

  <label for="pochta">Email</label>
  <input id="pochta" type="email">

  <button type="submit">Yuborish</button>
</form>`)}
<ul><li>${c('<label>')} maydon nomi. Uning ${c('for')} atributi input ${c('id')} si bilan bir xil bo'lsin: shunda nomni bossangiz, maydon tanlanadi.</li><li>${c('type')} maydon turini beradi: ${c('text')}, ${c('email')}, ${c('number')}, ${c('password')}, ${c('date')}.</li><li>${c('<button>')} formani yuboradi.</li></ul>`,
  quiz: [
    [`label qaysi atribut orqali input ga bog'lanadi?`, [`for`, `name`, `link`], 0, `label for="x" → input id="x".`],
    [`Email uchun qaysi type to'g'ri?`, [`type="text"`, `type="email"`, `type="mail"`], 1, `type="email" telefonda @ tugmasini ham chiqaradi.`]
  ],
  prac: {
    task: `Formaga "Email" maydonini (${c('type="email"')}) uning ${c('<label>')} i bilan va "Yuborish" tugmasini qo'shing.`,
    tabs: ['html', 'css'],
    html: `<h2>To'garakka yozilish</h2>\n<form>\n  <label for="ism">Ismingiz</label>\n  <input id="ism" type="text">\n\n</form>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\nform {\n  display: grid;\n  gap: 8px;\n  max-width: 320px;\n}\n\ninput, button {\n  font-size: 16px;\n  padding: 8px;\n}\n`,
    tests: [
      [`type="email" maydoni bor`, () => !!document.querySelector('input[type=email]')],
      [`Har bir label o'z input iga bog'langan (kamida 2 ta)`, () => { const l = [...document.querySelectorAll('label[for]')]; return l.length >= 2 && l.every(e => document.getElementById(e.htmlFor)); }],
      [`Tugma bor`, () => !!document.querySelector('form button, form input[type=submit]')]
    ],
    hint: `<label for="pochta">Email</label>\n<input id="pochta" type="email">\n<button type="submit">Yuborish</button>`,
    sol: { html: `<h2>To'garakka yozilish</h2>\n<form>\n  <label for="ism">Ismingiz</label>\n  <input id="ism" type="text">\n\n  <label for="pochta">Email</label>\n  <input id="pochta" type="email">\n\n  <button type="submit">Yuborish</button>\n</form>\n` }
  }
},
{
  t: `Flexbox`, min: 25,
  key: `display: flex bolalarni qatorga teradi; gap oraliq, justify-content taqsimot.`,
  theory: `<p>Elementlarni yonma-yon terish uchun ota elementga ${c('display: flex')} beriladi.</p>
${x(`.qator {
  display: flex;
  gap: 16px;
  justify-content: space-between;
  align-items: center;
}`, 'css')}
<ul><li>${c('gap')}: bolalar orasidagi masofa.</li><li>${c('justify-content')}: qator bo'ylab taqsimlash: ${c('flex-start')}, ${c('center')}, ${c('space-between')}.</li><li>${c('align-items')}: balandlik bo'yicha tekislash.</li><li>${c('flex-direction: column')}: qator o'rniga ustun.</li></ul>`,
  quiz: [
    [`Flexbox qaysi elementga yoziladi?`, [`Bola elementlarga`, `Ota (o'rab turgan) elementga`, `body ga`], 1, `display: flex ota elementga beriladi, bolalar qatorga teriladi.`],
    [`Elementlar orasiga 16px masofa:`, [`gap: 16px`, `space: 16px`, `margin-flex: 16px`], 0, `gap.`]
  ],
  prac: {
    task: `${c('.qator')} ni flexbox qiling: elementlar bitta qatorda tursin, oralig'i kamida 8px va ${c('space-between')} bilan taqsimlansin.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="qator">\n  <div class="item">HTML</div>\n  <div class="item">CSS</div>\n  <div class="item">JS</div>\n</div>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.item {\n  background: #1f4fff;\n  color: white;\n  padding: 16px 24px;\n  border-radius: 8px;\n}\n\n.qator {\n  \n}\n`,
    tests: [
      [`.qator display: flex`, () => getComputedStyle(document.querySelector('.qator')).display === 'flex'],
      [`gap kamida 8px`, () => parseFloat(getComputedStyle(document.querySelector('.qator')).columnGap) >= 8],
      [`justify-content: space-between`, () => getComputedStyle(document.querySelector('.qator')).justifyContent === 'space-between'],
      [`Hammasi bitta qatorda`, () => { const t = [...document.querySelectorAll('.item')].map(e => e.offsetTop); return t.every(v => v === t[0]); }]
    ],
    hint: `.qator {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n}`,
    sol: { css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.item {\n  background: #1f4fff;\n  color: white;\n  padding: 16px 24px;\n  border-radius: 8px;\n}\n\n.qator {\n  display: flex;\n  gap: 12px;\n  justify-content: space-between;\n}\n` }
  }
},
{
  t: `Loyiha: profil kartochkasi`, min: 30,
  key: `Loyiha: o'rgangan hamma narsani bitta chiroyli komponentga yig'amiz.`,
  theory: `<p>Bu darsda yangi mavzu yo'q. O'rganganlaringizni birlashtirib, haqiqiy saytlardagi kabi <b>profil kartochkasi</b> yasaymiz.</p>
<p>Yaxshi kartochkaning belgilari:</p>
<ul><li>Fon rangi sahifa fonidan farq qiladi.</li><li>Ichki bo'shliq (padding) yetarli: matn chetga yopishmaydi.</li><li>Burchaklar yumaloq, yengil soya (${c('box-shadow')}) bor.</li><li>Kengligi cheklangan (${c('max-width')}), katta ekranda cho'zilib ketmaydi.</li></ul>
${x(`.card {
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  max-width: 320px;
}`, 'css')}`,
  quiz: [
    [`Soya qaysi xususiyat bilan beriladi?`, [`shadow`, `box-shadow`, `border-shadow`], 1, `box-shadow.`],
    [`Kartochka katta ekranda cho'zilmasligi uchun:`, [`max-width`, `min-width`, `height`], 0, `max-width maksimal kenglikni cheklaydi.`]
  ],
  prac: {
    task: `${c('.card')} ni chiroyli kartochka qiling: oq fon, padding kamida 16px, border-radius kamida 8px, soya va kenglik ko'pi bilan 420px.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="card">\n  <h2>Malika Karimova</h2>\n  <p>9-A sinf · Dasturlash to'garagi</p>\n  <a href="#">Bog'lanish</a>\n</div>\n`,
    css: `body {\n  background: #eef2ff;\n  font-family: sans-serif;\n  padding: 24px;\n}\n\n.card {\n  \n}\n`,
    tests: [
      [`Fon rangi berilgan`, () => getComputedStyle(document.querySelector('.card')).backgroundColor !== 'rgba(0, 0, 0, 0)'],
      [`padding kamida 16px`, () => parseFloat(getComputedStyle(document.querySelector('.card')).paddingTop) >= 16],
      [`border-radius kamida 8px`, () => parseFloat(getComputedStyle(document.querySelector('.card')).borderTopLeftRadius) >= 8],
      [`Soya bor`, () => getComputedStyle(document.querySelector('.card')).boxShadow !== 'none'],
      [`Kengligi 420px dan oshmaydi`, () => document.querySelector('.card').getBoundingClientRect().width <= 420]
    ],
    hint: `Nazariyadagi misolni .card ichiga yozing.`,
    sol: { css: `body {\n  background: #eef2ff;\n  font-family: sans-serif;\n  padding: 24px;\n}\n\n.card {\n  background: white;\n  padding: 24px;\n  border-radius: 16px;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);\n  max-width: 320px;\n}\n` }
  }
}
] });
}
