{
const x = KM.x, c = KM.c;
KM.sinf({ n: 4, stage: 'boshlang', t: `HTML asoslari`, d: `Sarlavhalar darajasi, matnni ajratib ko'rsatish va rasm qo'shish.`, lessons: [
{
  t: `Sarlavhalar: h1 dan h6 gacha`, min: 15,
  key: `h1 eng muhim sarlavha, h6 eng kichigi. Sahifada h1 bitta bo'ladi.`,
  theory: `<p>Kitobda bob nomi katta, bo'lim nomi kichikroq yoziladi. HTML da ham shunday: 6 xil sarlavha bor.</p>
${x(`<h1>Hayvonlar</h1>
<h2>Uy hayvonlari</h2>
<h3>Mushuk</h3>`)}
<ul><li>${c('<h1>')} sahifaning asosiy nomi. Odatda bitta bo'ladi.</li><li>${c('<h2>')} bo'limlar nomi.</li><li>${c('<h3>')} kichik bo'limlar.</li></ul>
<p>Sarlavhalarni o'lcham uchun emas, <b>tartib</b> uchun ishlatamiz. O'lchamni CSS bilan o'zgartirish mumkin.</p>`,
  quiz: [
    [`Eng katta sarlavha qaysi?`, [`<h6>`, `<h1>`, `<h3>`], 1, `Raqam qancha kichik bo'lsa, sarlavha shuncha muhim.`],
    [`Sahifada nechta <h1> bo'lishi yaxshi?`, [`Bitta`, `Beshta`, `Bo'lmasligi kerak`], 0, `h1 sahifaning nomi, nom esa bitta bo'ladi.`]
  ],
  prac: {
    task: `"Hayvonlar" sahifasiga ${c('<h2>')} bilan "Uy hayvonlari" bo'limini, uning ostiga ${c('<h3>')} bilan bitta hayvon nomini qo'shing.`,
    tabs: ['html'],
    html: `<h1>Hayvonlar</h1>\n\n<!-- Shu yerga h2 va h3 yozing -->\n`,
    tests: [
      [`<h2> sarlavha bor`, () => !!document.querySelector('h2')],
      [`<h3> sarlavha bor`, () => !!document.querySelector('h3')],
      [`<h1> faqat bitta`, () => document.querySelectorAll('h1').length === 1]
    ],
    hint: `<h2>Uy hayvonlari</h2> va keyingi qatorda <h3>Mushuk</h3>`,
    sol: { html: `<h1>Hayvonlar</h1>\n<h2>Uy hayvonlari</h2>\n<h3>Mushuk</h3>\n` }
  }
},
{
  t: `Qalin va qiya matn`, min: 15,
  key: `<strong> muhim so'zni qalin, <em> urg'uli so'zni qiya qiladi.`,
  theory: `<p>Gapdagi muhim so'zni ajratib ko'rsatish uchun maxsus teglar bor. Ular paragraf <b>ichida</b> ishlatiladi.</p>
${x(`<p>Bugun havo <strong>juda issiq</strong>.</p>
<p>Men <em>muzqaymoq</em> yedim.</p>`)}
<ul><li>${c('<strong>')} qalin, "bu muhim" degani.</li><li>${c('<em>')} qiya, "bu so'zga urg'u ber" degani.</li><li>${c('<br>')} yangi qatorga o'tkazadi. U yopilmaydi.</li></ul>`,
  quiz: [
    [`Muhim so'zni qaysi teg qalin qiladi?`, [`<em>`, `<strong>`, `<br>`], 1, `strong: kuchli, muhim.`],
    [`Qaysi teg yopilmaydi?`, [`<br>`, `<p>`, `<em>`], 0, `br faqat yangi qatorga o'tkazadi, ichida matn bo'lmaydi.`]
  ],
  prac: {
    task: `"juda issiq" so'zlarini ${c('<strong>')} ichiga, "suv" so'zini ${c('<em>')} ichiga oling.`,
    tabs: ['html'],
    html: `<p>Bugun havo juda issiq.</p>\n<p>Men ko'p suv ichdim.</p>\n`,
    tests: [
      [`<strong> teg bor`, () => !!document.querySelector('p strong')],
      [`<strong> ichida "juda issiq"`, () => { const s = document.querySelector('strong'); return !!s && /juda issiq/i.test(s.textContent); }],
      [`<em> ichida "suv"`, () => { const e = document.querySelector('em'); return !!e && /suv/i.test(e.textContent); }]
    ],
    hint: `<p>Bugun havo <strong>juda issiq</strong>.</p>`,
    sol: { html: `<p>Bugun havo <strong>juda issiq</strong>.</p>\n<p>Men ko'p <em>suv</em> ichdim.</p>\n` }
  }
},
{
  t: `Rasm qo'shamiz`, min: 15,
  key: `<img> rasm qo'yadi: src rasm manzili, alt rasm tavsifi.`,
  theory: `<p>Rasm ${c('<img>')} tegi bilan qo'shiladi. Uning ichida matn bo'lmaydi, shuning uchun u yopilmaydi.</p>
${x(`<img src="assets/img/olma.svg" alt="Qizil olma" width="200">`)}
<ul><li>${c('src')} rasm qayerda turgani (manzil).</li><li>${c('alt')} rasmda nima borligi. Rasm ochilmasa yoki ko'zi ojiz odam sayt o'qisa, shu matn chiqadi.</li><li>${c('width')} rasm kengligi.</li></ul>
<p>${c('src')}, ${c('alt')} va ${c('width')} <b>atributlar</b> deyiladi. Ular tegga qo'shimcha ma'lumot beradi.</p>`,
  quiz: [
    [`Rasm manzili qaysi atributda yoziladi?`, [`alt`, `src`, `width`], 1, `src: source, ya'ni manba.`],
    [`alt nima uchun kerak?`, [`Rasmni kattalashtirish uchun`, `Rasm tavsifi uchun`, `Rasmni o'chirish uchun`], 1, `alt rasm ko'rinmaganda uni so'z bilan tushuntiradi.`]
  ],
  prac: {
    task: `Sarlavha ostiga olma rasmini qo'shing. Manzil: ${c('assets/img/olma.svg')}. ${c('alt')} atributiga tavsif yozing.`,
    tabs: ['html'],
    html: `<h1>Mevalar</h1>\n\n`,
    tests: [
      [`<img> teg bor`, () => !!document.querySelector('img')],
      [`src ichida olma rasmi`, () => { const i = document.querySelector('img'); return !!i && /olma/.test(i.getAttribute('src') || ''); }],
      [`alt tavsifi yozilgan (kamida 3 harf)`, () => { const i = document.querySelector('img'); return !!i && (i.getAttribute('alt') || '').trim().length >= 3; }]
    ],
    hint: `<img src="assets/img/olma.svg" alt="Qizil olma" width="200">`,
    sol: { html: `<h1>Mevalar</h1>\n<img src="assets/img/olma.svg" alt="Qizil olma" width="200">\n` }
  }
}
] });
}
