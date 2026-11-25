{
const x = KM.x, c = KM.c;
KM.sinf({ n: 6, stage: 'orta', t: `CSS asoslari`, d: `Selektorlar, quti modeli va matn bilan ishlash.`, lessons: [
{
  t: `Selektorlar: teg, klass, id`, min: 20,
  key: `p hamma paragraflar, .muhim klassi borlar, #sarlavha bitta element.`,
  theory: `<p>Selektor CSS qoidasi <b>kimga</b> tegishli ekanini aytadi.</p>
${x(`p { color: #333; }          /* hamma <p> */
.muhim { color: red; }      /* class="muhim" borlar */
#sarlavha { font-size: 40px; } /* id="sarlavha" */`, 'css')}
${x(`<h1 id="sarlavha">Kitoblar</h1>
<p class="muhim">Har kuni o'qing!</p>`)}
<ul><li><b>Teg selektori</b> (${c('p')}) hamma shunday teglarga ta'sir qiladi.</li><li><b>Klass</b> (${c('.muhim')}) bir nechta elementga beriladi.</li><li><b>Id</b> (${c('#sarlavha')}) sahifada faqat bitta elementda bo'ladi.</li></ul>`,
  quiz: [
    [`class="muhim" ni qaysi selektor tanlaydi?`, [`#muhim`, `.muhim`, `muhim`], 1, `Klass oldiga nuqta qo'yiladi.`],
    [`id sahifada nechta elementda bo'ladi?`, [`Bitta`, `Istalgancha`, `Ikkita`], 0, `id noyob bo'ladi.`]
  ],
  prac: {
    task: `${c('.muhim')} klassli paragraflarni qizil (${c('red')}) qiling. ${c('#sarlavha')} o'lchamini kamida 36px qiling. Oddiy paragraf qizil bo'lmasin.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1 id="sarlavha">Kitoblar dunyosi</h1>\n<p>Kitob o'qish foydali.</p>\n<p class="muhim">Har kuni 20 daqiqa o'qing!</p>\n<p class="muhim">Kitobni ehtiyot qiling.</p>\n`,
    css: `body {\n  font-family: sans-serif;\n}\n\np {\n  color: #333;\n}\n`,
    tests: [
      [`.muhim paragraflar qizil`, () => { const r = [...document.querySelectorAll('.muhim')].map(e => getComputedStyle(e).color.match(/\d+/g).map(Number)); return r.length === 2 && r.every(m => m[0] > 180 && m[1] < 100 && m[2] < 100); }],
      [`#sarlavha kamida 36px`, () => parseFloat(getComputedStyle(document.querySelector('#sarlavha')).fontSize) >= 36],
      [`Oddiy paragraf qizil emas`, () => { const m = getComputedStyle(document.querySelector('p:not(.muhim)')).color.match(/\d+/g).map(Number); return !(m[0] > 180 && m[1] < 100); }]
    ],
    hint: `.muhim {\n  color: red;\n}\n\n#sarlavha {\n  font-size: 40px;\n}`,
    sol: { css: `body {\n  font-family: sans-serif;\n}\n\np {\n  color: #333;\n}\n\n.muhim {\n  color: red;\n}\n\n#sarlavha {\n  font-size: 40px;\n}\n` }
  }
},
{
  t: `Quti modeli`, min: 25,
  key: `Har bir element quti: ichida padding, chetida border, tashqarisida margin.`,
  theory: `<p>Brauzer har bir elementni <b>quti</b> sifatida ko'radi. Qutining qatlamlari:</p>
<ol><li><b>content</b>: matn yoki rasm.</li><li><b>padding</b>: matn bilan chet orasidagi ichki bo'shliq.</li><li><b>border</b>: chegara chizig'i.</li><li><b>margin</b>: qutidan tashqaridagi bo'shliq.</li></ol>
${x(`.quti {
  padding: 16px;
  border: 2px solid #1f4fff;
  border-radius: 12px;
  margin: 20px;
}`, 'css')}
<p>${c('border')} uchta qiymat oladi: qalinlik, turi (${c('solid')}, ${c('dashed')}, ${c('dotted')}) va rang. ${c('border-radius')} burchaklarni yumaloqlaydi.</p>`,
  quiz: [
    [`Matn bilan chegara orasidagi bo'shliq qaysi?`, [`margin`, `padding`, `border`], 1, `padding: ichki bo'shliq.`],
    [`Burchaklarni nima yumaloqlaydi?`, [`border-radius`, `round`, `corner`], 0, `border-radius burchak radiusini beradi.`]
  ],
  prac: {
    task: `Eslatma qutisiga ichki bo'shliq (kamida 12px), chegara chizig'i va yumaloq burchak bering.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="quti">\n  <h2>Eslatma</h2>\n  <p>Ertaga sport kiyimida keling.</p>\n</div>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.quti {\n  background: #fff7d6;\n}\n`,
    tests: [
      [`padding kamida 12px`, () => parseFloat(getComputedStyle(document.querySelector('.quti')).paddingTop) >= 12],
      [`border chizig'i bor`, () => { const s = getComputedStyle(document.querySelector('.quti')); return parseFloat(s.borderTopWidth) >= 1 && s.borderTopStyle !== 'none'; }],
      [`border-radius kamida 4px`, () => parseFloat(getComputedStyle(document.querySelector('.quti')).borderTopLeftRadius) >= 4]
    ],
    hint: `.quti ichiga: padding: 16px; border: 2px solid orange; border-radius: 12px;`,
    sol: { css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\n.quti {\n  background: #fff7d6;\n  padding: 16px;\n  border: 2px solid orange;\n  border-radius: 12px;\n}\n` }
  }
},
{
  t: `Matn va shriftlar`, min: 20,
  key: `text-align joylashuv, line-height qatorlar oralig'i, font-family shrift.`,
  theory: `<p>Matnni o'qishga qulay qilish uchun:</p>
${x(`h1 {
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 1.6;
  font-family: Arial, sans-serif;
}`, 'css')}
<ul><li>${c('text-align')}: ${c('left')}, ${c('center')}, ${c('right')}.</li><li>${c('line-height')}: qatorlar oralig'i. 1.5–1.7 o'qish uchun eng qulay.</li><li>${c('font-family')}: shrift. Vergul bilan zaxira shrift yoziladi.</li></ul>`,
  quiz: [
    [`Matnni o'rtaga qanday qo'yamiz?`, [`text-align: center`, `align: middle`, `center: true`], 0, `text-align: center.`],
    [`O'qish uchun qulay line-height?`, [`0.8`, `1.6`, `5`], 1, `1.5–1.7 atrofida.`]
  ],
  prac: {
    task: `Sarlavhani o'rtaga qo'ying. Paragraf o'lchamini kamida 17px va ${c('line-height')} ni kamida 1.4 qiling.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1>She'riyat kechasi</h1>\n<p>Juma kuni soat 15:00 da maktab zalida she'rlar o'qiymiz. Har bir sinfdan ikki o'quvchi qatnashadi. Hamma taklif etiladi!</p>\n`,
    css: `body {\n  font-family: Georgia, serif;\n  padding: 16px;\n}\n`,
    tests: [
      [`Sarlavha o'rtada`, () => getComputedStyle(document.querySelector('h1')).textAlign === 'center'],
      [`Paragraf kamida 17px`, () => parseFloat(getComputedStyle(document.querySelector('p')).fontSize) >= 17],
      [`line-height kamida 1.4`, () => { const s = getComputedStyle(document.querySelector('p')); return parseFloat(s.lineHeight) >= 1.4 * parseFloat(s.fontSize) - 0.5; }]
    ],
    hint: `h1 { text-align: center; }\np { font-size: 18px; line-height: 1.6; }`,
    sol: { css: `body {\n  font-family: Georgia, serif;\n  padding: 16px;\n}\n\nh1 {\n  text-align: center;\n}\n\np {\n  font-size: 18px;\n  line-height: 1.6;\n}\n` }
  }
}
] });
}
