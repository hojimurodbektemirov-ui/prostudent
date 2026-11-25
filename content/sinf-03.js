{
const x = KM.x, c = KM.c;
KM.sinf({ n: 3, stage: 'boshlang', t: `Veb sahifa sirlari`, d: `Teglar bilan sahifa quramiz, CSS bilan rang va o'lcham beramiz.`, lessons: [
{
  t: `Teg nima?`, min: 15,
  key: `Teg ochiladi va yopiladi: <p> ... </p>. Ular orasidagi matn sahifada ko'rinadi.`,
  theory: `<p>HTML sahifa <b>teglar</b>dan quriladi. Teg burchakli qavs ichida yoziladi.</p>
${x(`<p>Bu paragraf</p>`)}
<ul><li>${c('<p>')} ochuvchi teg: "paragraf shu yerdan boshlanadi".</li><li>${c('</p>')} yopuvchi teg: oldida <b>/</b> belgisi bor.</li><li>Ular orasidagi matn sahifada ko'rinadi.</li></ul>
<p>Eng ko'p ishlatiladigan teglar:</p>
<ul><li>${c('<h1>')} katta sarlavha</li><li>${c('<p>')} oddiy matn (paragraf)</li></ul>`,
  quiz: [
    [`Yopuvchi teg qaysi?`, [`<p>`, `</p>`, `<p/>`], 1, `Yopuvchi teg oldida / belgisi bo'ladi.`],
    [`Katta sarlavha uchun qaysi teg?`, [`<h1>`, `<p>`, `<big>`], 0, `h1: "heading 1", eng katta sarlavha.`]
  ],
  prac: {
    task: `Sarlavha ostiga o'zingiz haqingizda ${c('<p>')} paragraf yozing. Kamida 10 ta harf bo'lsin.`,
    tabs: ['html'],
    html: `<h1>Mening sahifam</h1>\n\n`,
    tests: [
      [`Sarlavha joyida turibdi`, () => !!document.querySelector('h1')],
      [`Sahifada <p> paragraf bor`, () => !!document.querySelector('p')],
      [`Paragrafda kamida 10 ta belgi bor`, () => { const p = document.querySelector('p'); return !!p && p.textContent.trim().length >= 10; }]
    ],
    hint: `Ikkinchi qatorga shunday yozing: <p>Men rasm chizishni yaxshi ko'raman.</p>`,
    sol: { html: `<h1>Mening sahifam</h1>\n<p>Men rasm chizishni yaxshi ko'raman.</p>\n` }
  }
},
{
  t: `Matnga rang beramiz`, min: 15,
  key: `CSS sahifaning ko'rinishini o'zgartiradi: kimga, nima, qanday.`,
  theory: `<p>HTML sahifaning <b>mazmuni</b>, CSS esa uning <b>kiyimi</b>. CSS bilan rang, o'lcham va joylashuvni o'zgartiramiz.</p>
${x(`h1 {
  color: red;
}`, 'css')}
<ul><li>${c('h1')}: kimga? Hamma h1 sarlavhalarga.</li><li>${c('color')}: nimani? Matn rangini.</li><li>${c('red')}: qanday? Qizil.</li></ul>
<p>Ranglar inglizcha yoziladi: ${c('red')} qizil, ${c('blue')} ko'k, ${c('green')} yashil, ${c('orange')} to'q sariq, ${c('purple')} binafsha.</p>`,
  quiz: [
    [`Matn rangini qaysi xususiyat o'zgartiradi?`, [`color`, `size`, `text`], 0, `color: matn rangi.`],
    [`"blue" qaysi rang?`, [`Qizil`, `Ko'k`, `Yashil`], 1, `blue ko'k degani.`]
  ],
  prac: {
    task: `CSS tabini oching. Sarlavhani ko'k (${c('blue')}), paragrafni yashil (${c('green')}) qiling.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1>Mening sahifam</h1>\n<p>Men rasm chizishni yaxshi ko'raman.</p>\n`,
    css: `h1 {\n  color: red;\n}\n\np {\n  color: black;\n}\n`,
    tests: [
      [`Sarlavha ko'k rangda`, () => getComputedStyle(document.querySelector('h1')).color === 'rgb(0, 0, 255)'],
      [`Paragraf yashil rangda`, () => getComputedStyle(document.querySelector('p')).color === 'rgb(0, 128, 0)']
    ],
    hint: `red so'zini blue ga, black so'zini green ga almashtiring.`,
    sol: { css: `h1 {\n  color: blue;\n}\n\np {\n  color: green;\n}\n` }
  }
},
{
  t: `Katta va kichik`, min: 15,
  key: `font-size matn o'lchamini, background-color fon rangini beradi.`,
  theory: `<p>Matn o'lchami ${c('font-size')} bilan beriladi. O'lchov birligi ${c('px')} (piksel): ekrandagi kichkina nuqta.</p>
${x(`h1 {
  font-size: 48px;
}

body {
  background-color: lightyellow;
}`, 'css')}
<p>${c('body')} butun sahifa degani. Unga ${c('background-color')} bersak, butun sahifa foni o'zgaradi.</p>
<p>Esda tuting: har bir qator oxirida <b>nuqtali vergul</b> ${c(';')} qo'yiladi.</p>`,
  quiz: [
    [`Matn o'lchamini qaysi xususiyat beradi?`, [`font-size`, `color`, `width`], 0, `font-size: shrift o'lchami.`],
    [`Butun sahifa fonini o'zgartirish uchun qaysi tegga yozamiz?`, [`h1`, `p`, `body`], 2, `body butun sahifani bildiradi.`]
  ],
  prac: {
    task: `Sarlavha o'lchamini 48px qiling va ${c('body')} ga istalgan fon rangi bering.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1>Mening sahifam</h1>\n<p>Men rasm chizishni yaxshi ko'raman.</p>\n`,
    css: `h1 {\n  font-size: 20px;\n}\n\nbody {\n  \n}\n`,
    tests: [
      [`Sarlavha kamida 40px`, () => parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) >= 40],
      [`Sahifaga fon rangi berilgan`, () => getComputedStyle(document.body).backgroundColor !== 'rgba(0, 0, 0, 0)']
    ],
    hint: `body { ... } ichiga background-color: lightblue; deb yozing.`,
    sol: { css: `h1 {\n  font-size: 48px;\n}\n\nbody {\n  background-color: lightblue;\n}\n` }
  }
}
] });
}
