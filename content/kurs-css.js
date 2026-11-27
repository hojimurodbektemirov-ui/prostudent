/* CSS kursi: sahifani bezash. 22 ta oson dars, har birida nazariya, 10 ta test va avtomatik tekshiriladigan amaliyot. */
{
const x = KM.x, c = KM.c, Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
const P = (task, html, css, tests, hint, sol) => ({ task, tabs: ['html', 'css'], open: 'css', html, css, tests, hint, sol: { css: sol } });
KM.kurs({ n: 'css', o: 2, stage: 'orta', ic: '{ }', t: 'CSS', d: `Sahifani chiroyli qilish: ranglar, shriftlar, qutilar, Flexbox, Grid va moslashuvchan dizayn.`, lessons: [
{
  t: `CSS nima? Birinchi qoida`, min: 15,
  key: `CSS qoidasi: selektor { xususiyat: qiymat; }. HTML nima borligini, CSS qanday ko'rinishini aytadi.`,
  theory: `<p>HTML sahifaning <b>skeleti</b> bo'lsa, CSS uning <b>kiyimi</b>: rang, shrift, joylashuv. CSS (Cascading Style Sheets) qoidalardan iborat:</p>
${x(`h1 {
  color: blue;
}`, 'css')}
<ul><li>${c('h1')}: <b>selektor</b>, qaysi elementga ta'sir qilishi.</li><li>${c('color')}: <b>xususiyat</b>, nimani o'zgartirish.</li><li>${c('blue')}: <b>qiymat</b>.</li><li>Qoida ${c('{ }')} ichida, har bir qator ${c(';')} bilan tugaydi.</li></ul>
<p>CSS ni HTML ga ulashning uch yo'li bor: ${c('<style>')} tegi ichida, alohida ${c('style.css')} fayl (${c('<link rel="stylesheet" href="style.css">')}) yoki ${c('style="..."')} atributi. Bizning maydonda CSS oynasi bor, u avtomatik ulanadi.</p>`,
  quiz: [
    Q(`CSS nima uchun kerak?`, `Sahifa ko'rinishini bezash uchun`, [`Sahifaga matn qo'shish uchun`, `Internetga ulanish uchun`], `CSS dizayn uchun.`),
    Q(`h1 { color: blue; } da selektor qaysi?`, `h1`, [`color`, `blue`], `Selektor qoidaning boshida.`),
    Q(`Xususiyat qaysi?`, `color`, [`h1`, `blue`], `color: matn rangi.`),
    Q(`Qoida qaysi qavslarda yoziladi?`, `{ }`, [`( )`, `< >`], `Figurali qavslar.`),
    Q(`Har bir qator nima bilan tugaydi?`, `;`, [`.`, `,`], `Nuqtali vergul.`),
    Q(`Xususiyat va qiymat orasida nima?`, `:`, [`=`, `-`], `color: blue;`),
    Q(`Matn rangi xususiyati?`, `color`, [`text-color`, `font`], `color.`),
    Q(`Alohida CSS fayl qanday ulanadi?`, `<link rel="stylesheet" href="style.css">`, [`<css src="style.css">`, `<style href="style.css">`], `link tegi head ichida.`),
    Q(`CSS qaysi so'zlar qisqartmasi?`, `Cascading Style Sheets`, [`Computer Style System`, `Color Super Style`], `Kaskadli uslublar jadvali.`),
    Q(`HTML va CSS farqi?`, `HTML tarkib, CSS ko'rinish`, [`Farqi yo'q`, `CSS tarkib, HTML ko'rinish`], `Skelet va kiyim.`)
  ],
  prac: P(`${c('h1')} sarlavhani ko'k (${c('blue')}), ${c('p')} paragraflarni yashil (${c('green')}) rangga bo'yang.`,
    `<h1>Mening birinchi CSS im</h1>\n<p>Bu paragraf.</p>\n<p>Bu ham paragraf.</p>\n`, `/* Shu yerga yozing */\n`,
    [[`h1 ko'k`, () => getComputedStyle(document.querySelector('h1')).color === 'rgb(0, 0, 255)'],
     [`p yashil`, () => [...document.querySelectorAll('p')].every(p => getComputedStyle(p).color === 'rgb(0, 128, 0)')]],
    `h1 {\n  color: blue;\n}\np {\n  color: green;\n}`, `h1 {\n  color: blue;\n}\n\np {\n  color: green;\n}\n`)
},
{
  t: `Ranglar: nom, HEX va RGB`, min: 20,
  key: `Rangni nomi (red), HEX (#ff0000) yoki rgb(255, 0, 0) bilan yozish mumkin. background-color fon rangi.`,
  theory: `<p>CSS da rang yozishning bir necha usuli bor:</p>
<ul><li><b>Nomi</b>: ${c('red')}, ${c('tomato')}, ${c('gold')}, ${c('navy')} (140 dan ortiq nom bor).</li><li><b>HEX</b>: ${c('#ff6600')}. Uch juft raqam: qizil, yashil, ko'k (00 dan ff gacha).</li><li><b>RGB</b>: ${c('rgb(255, 102, 0)')}. Har biri 0 dan 255 gacha.</li></ul>
${x(`body {
  background-color: #fff8e7;
}
h1 {
  color: rgb(220, 20, 60);
}
.izoh {
  color: gray;
  background-color: #eef3ff;
}`, 'css')}
<p>${c('background-color')} elementning fon rangini beradi. Matn va fon ranglari bir-biridan yaxshi ajralib tursin, aks holda o'qish qiyin.</p>
<div class="note">Rang tanlash uchun kod maydonida ${c('<input type="color">')} yoki Google'da "color picker" yozing.</div>`,
  quiz: [
    Q(`Fon rangi xususiyati?`, `background-color`, [`color`, `fill`], `background-color.`),
    Q(`HEX rang nima bilan boshlanadi?`, `#`, [`$`, `@`], `#ff0000.`),
    Q(`rgb(255, 0, 0) qaysi rang?`, `Qizil`, [`Yashil`, `Ko'k`], `Faqat qizil to'liq.`),
    Q(`#000000 qaysi rang?`, `Qora`, [`Oq`, `Qizil`], `Hamma qism 0.`),
    Q(`#ffffff qaysi rang?`, `Oq`, [`Qora`, `Sariq`], `Hamma qism maksimal.`),
    Q(`RGB da har bir son oralig'i?`, `0 dan 255 gacha`, [`0 dan 100 gacha`, `1 dan 10 gacha`], `256 daraja.`),
    Q(`RGB harflari nimani bildiradi?`, `Red, Green, Blue`, [`Rang, Gul, Bo'yoq`, `Right, Good, Big`], `Qizil, yashil, ko'k.`),
    Q(`rgb(0, 0, 255) qaysi rang?`, `Ko'k`, [`Qizil`, `Qora`], `Faqat ko'k.`),
    Q(`Matn va fon rangi qanday bo'lishi kerak?`, `Bir-biridan yaxshi ajralib tursin`, [`Bir xil`, `Ikkalasi ham och`], `O'qilishi uchun.`),
    Q(`tomato nima?`, `Rang nomi`, [`Shrift`, `Xato`], `CSS rang nomlaridan biri.`)
  ],
  prac: P(`${c('body')} foniga och rang (masalan ${c('#fff8e7')}) bering, ${c('h1')} rangini HEX bilan yozing, ${c('.izoh')} ga fon rangi bering.`,
    `<h1>Ranglar olami</h1>\n<p class="izoh">Bu izoh bloki.</p>\n`, `body {\n  font-family: sans-serif;\n}\n`,
    [[`body fonida rang bor`, () => { const b = getComputedStyle(document.body).backgroundColor; return b !== 'rgba(0, 0, 0, 0)' && b !== 'transparent'; }],
     [`h1 rangi qora emas`, () => getComputedStyle(document.querySelector('h1')).color !== 'rgb(0, 0, 0)'],
     [`.izoh ga fon rangi berilgan`, () => getComputedStyle(document.querySelector('.izoh')).backgroundColor !== 'rgba(0, 0, 0, 0)']],
    `body {\n  background-color: #fff8e7;\n}\nh1 {\n  color: #dc143c;\n}\n.izoh {\n  background-color: #eef3ff;\n}`, `body {\n  font-family: sans-serif;\n  background-color: #fff8e7;\n}\n\nh1 {\n  color: #dc143c;\n}\n\n.izoh {\n  background-color: #eef3ff;\n}\n`)
},
{
  t: `Fon: rasm va gradient`, min: 20,
  key: `background-image: url(...) rasm fon, linear-gradient(...) ikki rang o'rtasidagi silliq o'tish.`,
  theory: `<p>Fonga faqat rang emas, rasm yoki <b>gradient</b> (rangdan rangga silliq o'tish) ham qo'yish mumkin:</p>
${x(`.banner {
  background-image: linear-gradient(90deg, #2f6bff, #00c2a8);
  color: white;
  padding: 30px;
}`, 'css')}
<p>${c('linear-gradient(yo\'nalish, rang1, rang2)')}: ${c('90deg')} chapdan o'ngga, ${c('180deg')} yuqoridan pastga. Ranglar ikkitadan ko'p ham bo'lishi mumkin.</p>
${x(`.rasmli {
  background-image: url("https://picsum.photos/600/300");
  background-size: cover;
  background-position: center;
}`, 'css')}
<ul><li>${c('background-size: cover')}: rasm butun qutini to'ldiradi.</li><li>${c('background-position: center')}: rasm markazda turadi.</li><li>Qisqa yozuv: ${c('background: #eee;')} ham ishlaydi.</li></ul>`,
  quiz: [
    Q(`Fonga rasm qo'yish xususiyati?`, `background-image`, [`image`, `src`], `background-image: url(...).`),
    Q(`Silliq rang o'tishi nima deyiladi?`, `Gradient`, [`Soya`, `Chegara`], `linear-gradient.`),
    Q(`Chapdan o'ngga gradient?`, `90deg`, [`0deg`, `180deg`], `90 daraja o'ngga.`),
    Q(`Rasm butun qutini to'ldirsin?`, `background-size: cover`, [`background-size: small`, `size: full`], `cover.`),
    Q(`Rasm markazda tursin?`, `background-position: center`, [`align: center`, `position: middle`], `background-position.`),
    Q(`Rasm manzili qanday yoziladi?`, `url("...")`, [`src("...")`, `href="..."`], `url() funksiyasi.`),
    Q(`Gradientda nechta rang bo'lishi mumkin?`, `2 yoki undan ko'p`, [`Faqat 1`, `Faqat 2`], `Istalgancha.`),
    Q(`background: #eee; nima?`, `Qisqa yozuv, fon rangi`, [`Xato`, `Matn rangi`], `background umumiy xususiyat.`),
    Q(`Yuqoridan pastga gradient?`, `180deg`, [`90deg`, `45deg`], `180deg pastga.`),
    Q(`Gradientli fonda matn qanday bo'lsin?`, `Yaxshi ko'rinadigan (masalan oq)`, [`Fon bilan bir xil`, `Ko'rinmas`], `Kontrast muhim.`)
  ],
  prac: P(`${c('.banner')} ga ikki rangli ${c('linear-gradient')} fon va oq matn bering.`,
    `<div class="banner">\n  <h1>Yozgi lager 2026</h1>\n  <p>Ro'yxatdan o'ting!</p>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.banner {\n  padding: 30px;\n  border-radius: 12px;\n}\n`,
    [[`.banner da gradient`, () => /linear-gradient/.test(getComputedStyle(document.querySelector('.banner')).backgroundImage)],
     [`Matn oq`, () => getComputedStyle(document.querySelector('.banner')).color === 'rgb(255, 255, 255)']],
    `.banner {\n  background-image: linear-gradient(90deg, #2f6bff, #00c2a8);\n  color: white;\n}`, `body {\n  font-family: sans-serif;\n}\n.banner {\n  padding: 30px;\n  border-radius: 12px;\n  background-image: linear-gradient(90deg, #2f6bff, #00c2a8);\n  color: white;\n}\n`)
},
{
  t: `Shrift: o'lcham, tur va qalinlik`, min: 20,
  key: `font-size o'lcham, font-family shrift turi, font-weight qalinlik, font-style qiyalik.`,
  theory: `<p>Matn ko'rinishini to'rtta asosiy xususiyat boshqaradi:</p>
${x(`p {
  font-size: 18px;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-style: italic;
}`, 'css')}
<ul><li>${c('font-size')}: o'lcham. ${c('px')} (piksel) yoki ${c('rem')} (1rem = 16px odatda).</li><li>${c('font-family')}: shrift. Vergul bilan bir nechta yoziladi: birinchisi bo'lmasa keyingisi olinadi. Oxirida umumiy tur: ${c('sans-serif')}, ${c('serif')}, ${c('monospace')}.</li><li>${c('font-weight')}: ${c('normal')}, ${c('bold')} yoki 100–900 raqam.</li><li>${c('font-style: italic')}: qiya.</li></ul>
<div class="note">Google Fonts saytidan bepul chiroyli shriftlar olish mumkin.</div>`,
  quiz: [
    Q(`Matn o'lchami xususiyati?`, `font-size`, [`text-size`, `size`], `font-size.`),
    Q(`Shrift turi xususiyati?`, `font-family`, [`font-type`, `font-name`], `font-family.`),
    Q(`Qalin qilish?`, `font-weight: bold`, [`font-style: bold`, `text: bold`], `font-weight.`),
    Q(`Qiya qilish?`, `font-style: italic`, [`font-weight: italic`, `slant: yes`], `font-style.`),
    Q(`px nima?`, `Piksel, o'lcham birligi`, [`Rang`, `Shrift nomi`], `px: piksel.`),
    Q(`1rem odatda necha px?`, `16px`, [`1px`, `100px`], `Brauzer standarti 16px.`),
    Q(`font-family: Arial, sans-serif da sans-serif nima uchun?`, `Arial bo'lmasa zaxira`, [`Ikkalasi birga ishlaydi`, `Xato`], `Zaxira shrift.`),
    Q(`Kod uchun qaysi umumiy tur mos?`, `monospace`, [`serif`, `cursive`], `Hamma harf bir xil eni.`),
    Q(`font-weight: 700 nima?`, `Qalin`, [`Yengil`, `Qiya`], `700 = bold.`),
    Q(`Bepul shriftlar sayti?`, `Google Fonts`, [`YouTube`, `Telegram`], `fonts.google.com.`)
  ],
  prac: P(`${c('h1')} o'lchamini kamida 40px qiling, ${c('p')} ga ${c('font-family')} bering va ${c('.qalin')} klassni qalin (bold) qiling.`,
    `<h1>Shriftlar</h1>\n<p>Oddiy matn.</p>\n<p class="qalin">Bu matn qalin bo'lsin.</p>\n`, `\n`,
    [[`h1 kamida 40px`, () => parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) >= 40],
     [`p ga font-family berilgan`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /(^|,|\s)p(\s|,|$)/.test(r.selectorText || '') && !!r.style.fontFamily); } catch (e) { return false; } })],
     [`.qalin qalin`, () => +getComputedStyle(document.querySelector('.qalin')).fontWeight >= 600]],
    `h1 {\n  font-size: 44px;\n}\np {\n  font-family: Arial, sans-serif;\n}\n.qalin {\n  font-weight: bold;\n}`, `h1 {\n  font-size: 44px;\n}\n\np {\n  font-family: Arial, sans-serif;\n}\n\n.qalin {\n  font-weight: bold;\n}\n`)
},
{
  t: `Matn: tekislash, qator oralig'i, bezak`, min: 15,
  key: `text-align tekislash, line-height qatorlar oralig'i, text-decoration chiziq, text-transform katta-kichik harf.`,
  theory: `${x(`h1 {
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
}
p {
  line-height: 1.6;
}
a {
  text-decoration: none;
}`, 'css')}
<ul><li>${c('text-align')}: ${c('left')}, ${c('center')}, ${c('right')}, ${c('justify')} (ikki chetga).</li><li>${c('line-height')}: qatorlar oralig'i. 1.5–1.7 o'qish uchun qulay.</li><li>${c('text-decoration')}: ${c('underline')} (tagiga chiziq), ${c('line-through')} (ustidan chiziq), ${c('none')} (havoladagi chiziqni olib tashlash).</li><li>${c('text-transform')}: ${c('uppercase')} (KATTA), ${c('lowercase')}, ${c('capitalize')}.</li><li>${c('letter-spacing')}: harflar orasidagi masofa.</li></ul>`,
  quiz: [
    Q(`Matnni markazga tekislash?`, `text-align: center`, [`align: middle`, `text-center: yes`], `text-align.`),
    Q(`Qatorlar oralig'i?`, `line-height`, [`line-space`, `row-gap`], `line-height.`),
    Q(`Havoladagi chiziqni olib tashlash?`, `text-decoration: none`, [`underline: no`, `line: 0`], `text-decoration.`),
    Q(`Hamma harflarni KATTA qilish?`, `text-transform: uppercase`, [`font-size: big`, `caps: on`], `uppercase.`),
    Q(`Ustidan chiziq (eski narx)?`, `text-decoration: line-through`, [`text-decoration: over`, `strike: yes`], `line-through.`),
    Q(`O'qish uchun qulay line-height?`, `1.5–1.7`, [`0.5`, `5`], `Matn nafas oladi.`),
    Q(`Harflar orasidagi masofa?`, `letter-spacing`, [`word-gap`, `font-space`], `letter-spacing.`),
    Q(`text-align: right?`, `O'ngga tekislaydi`, [`Chapga`, `Markazga`], `right: o'ng.`),
    Q(`capitalize nima qiladi?`, `Har so'z bosh harfini katta qiladi`, [`Hammasini kichik`, `Hech narsa`], `Capitalize.`),
    Q(`justify nima?`, `Ikki chetga tekislash`, [`Markaz`, `Qalin`], `Gazetadagidek.`)
  ],
  prac: P(`${c('h1')} ni markazga tekislang va KATTA harfli qiling. ${c('p')} ga ${c('line-height')} kamida 1.5 bering. ${c('.eski')} narxning ustidan chiziq torting.`,
    `<h1>Do'kon</h1>\n<p>Bugun hamma kitoblarga chegirma! Faqat bir kun.</p>\n<p>Narx: <span class="eski">50 000</span> 35 000 so'm</p>\n`, `body {\n  font-family: sans-serif;\n}\n`,
    [[`h1 markazda`, () => getComputedStyle(document.querySelector('h1')).textAlign === 'center'],
     [`h1 uppercase`, () => getComputedStyle(document.querySelector('h1')).textTransform === 'uppercase'],
     [`p line-height ≥ 1.5`, () => { const s = getComputedStyle(document.querySelector('p')); return parseFloat(s.lineHeight) / parseFloat(s.fontSize) >= 1.45; }],
     [`.eski ustidan chiziq`, () => getComputedStyle(document.querySelector('.eski')).textDecorationLine.includes('line-through')]],
    `h1 {\n  text-align: center;\n  text-transform: uppercase;\n}\np {\n  line-height: 1.6;\n}\n.eski {\n  text-decoration: line-through;\n}`, `body {\n  font-family: sans-serif;\n}\n\nh1 {\n  text-align: center;\n  text-transform: uppercase;\n}\n\np {\n  line-height: 1.6;\n}\n\n.eski {\n  text-decoration: line-through;\n}\n`)
},
{
  t: `Selektorlar: teg, klass, id`, min: 20,
  key: `p hamma paragraflar, .klass shu klassdagilar, #id bitta element.`,
  theory: `<p>Selektor qoidaning <b>kimga</b> tegishli ekanini aytadi:</p>
${x(`p { color: #333; }            /* hamma <p> */
.muhim { color: crimson; }    /* class="muhim" */
#logo { font-size: 32px; }    /* id="logo" */`, 'css')}
${x(`<h1 id="logo">ZIS</h1>
<p>Oddiy matn</p>
<p class="muhim">Muhim matn</p>`)}
<ul><li><b>Teg</b> selektori: shunchaki nomi (${c('p')}, ${c('h1')}).</li><li><b>Klass</b>: oldida nuqta (${c('.muhim')}).</li><li><b>Id</b>: oldida panjara (${c('#logo')}).</li><li>${c('*')}: hamma elementlar.</li></ul>
<p>Agar bir element uchun bir nechta qoida to'qnashsa, <b>aniqrog'i</b> yutadi: id klassdan, klass tegdan kuchli.</p>`,
  quiz: [
    Q(`Klass selektori nima bilan boshlanadi?`, `.`, [`#`, `*`], `.muhim`),
    Q(`Id selektori nima bilan boshlanadi?`, `#`, [`.`, `@`], `#logo`),
    Q(`Hamma elementlarni tanlaydigan selektor?`, `*`, [`all`, `.`], `* universal.`),
    Q(`p { } nimani tanlaydi?`, `Hamma paragraflarni`, [`Birinchi paragrafni`, `p klassini`], `Teg selektori.`),
    Q(`.karta qaysi elementlarni tanlaydi?`, `class="karta" borlarni`, [`id="karta" ni`, `<karta> teglarni`], `Klass selektor.`),
    Q(`Qaysi kuchliroq?`, `id`, [`klass`, `teg`], `id > klass > teg.`),
    Q(`#menu qaysi HTML ga mos?`, `<nav id="menu">`, [`<nav class="menu">`, `<menu>`], `id="menu".`),
    Q(`CSS izohi qanday yoziladi?`, `/* izoh */`, [`<!-- izoh -->`, `// izoh`], `CSS da /* */.`),
    Q(`Bir xil ko'rinishdagi 10 ta tugma uchun?`, `Klass`, [`id`, `Har biriga alohida id`], `Klass guruhlaydi.`),
    Q(`To'qnashuvda qaysi qoida yutadi?`, `Aniqrog'i (masalan id)`, [`Doim birinchisi`, `Tasodifiy`], `Spesifiklik.`)
  ],
  prac: P(`${c('.muhim')} klassli paragraflarni qizil (${c('crimson')}) qiling. ${c('#logo')} o'lchamini kamida 36px qiling. Oddiy paragraf qizil bo'lmasin.`,
    `<h1 id="logo">ZIS Kitoblar</h1>\n<p>Kitob o'qish foydali.</p>\n<p class="muhim">Har kuni 20 daqiqa o'qing!</p>\n<p class="muhim">Kitobni ehtiyot qiling.</p>\n`, `body {\n  font-family: sans-serif;\n}\n`,
    [[`.muhim qizil`, () => [...document.querySelectorAll('.muhim')].every(e => { const m = getComputedStyle(e).color.match(/\d+/g).map(Number); return m[0] > 150 && m[1] < 90 && m[2] < 110; })],
     [`#logo kamida 36px`, () => parseFloat(getComputedStyle(document.querySelector('#logo')).fontSize) >= 36],
     [`Oddiy paragraf qizil emas`, () => { const m = getComputedStyle(document.querySelector('p:not(.muhim)')).color.match(/\d+/g).map(Number); return !(m[0] > 150 && m[1] < 90); }]],
    `.muhim {\n  color: crimson;\n}\n#logo {\n  font-size: 40px;\n}`, `body {\n  font-family: sans-serif;\n}\n\n.muhim {\n  color: crimson;\n}\n\n#logo {\n  font-size: 40px;\n}\n`)
},
{
  t: `Guruh va ichki selektorlar`, min: 20,
  key: `h1, h2 { } ikkalasiga; nav a { } nav ichidagi a larga; .karta.katta ikkala klassi borga.`,
  theory: `<p>Selektorlarni birlashtirish mumkin:</p>
${x(`/* Guruh: vergul bilan, ikkalasiga bir xil */
h1, h2 {
  color: navy;
}
/* Ichki: probel bilan, nav ichidagi havolalar */
nav a {
  color: white;
  margin-right: 12px;
}
/* To'g'ridan-to'g'ri bola: > */
ul > li {
  list-style: square;
}
/* Ikki klass birga */
.tugma.qizil {
  background: crimson;
}`, 'css')}
<ul><li>${c('A, B')}: A ga ham, B ga ham.</li><li>${c('A B')} (probel): A ning <b>ichidagi</b> B lar.</li><li>${c('A > B')}: A ning bevosita bolasi bo'lgan B.</li><li>${c('.a.b')} (probelsiz): ikkala klassi ham bor element.</li></ul>`,
  quiz: [
    Q(`h1, h2 { } nimani tanlaydi?`, `h1 lar va h2 larni`, [`h1 ichidagi h2 ni`, `Hech narsani`], `Vergul guruhlaydi.`),
    Q(`nav a { } nimani tanlaydi?`, `nav ichidagi a larni`, [`Hamma a larni`, `nav va a ni`], `Probel: ichida.`),
    Q(`ul > li nima?`, `ul ning bevosita bolasi li`, [`ul dan katta li`, `ul dan keyingi li`], `> bola.`),
    Q(`.tugma.qizil nimani tanlaydi?`, `Ikkala klassi bor elementni`, [`tugma ichidagi qizilni`, `Ikkalasini alohida`], `Probelsiz: birga.`),
    Q(`.karta p qaysi p larni tanlaydi?`, `.karta ichidagilarni`, [`Hammasini`, `Faqat birinchisini`], `Ichki selektor.`),
    Q(`Vergul nima qiladi?`, `Selektorlarni guruhlaydi`, [`Ichkini tanlaydi`, `Xato`], `A, B.`),
    Q(`footer p, header p qaysilarni tanlaydi?`, `footer va header ichidagi p larni`, [`Hamma p ni`, `Faqat footer ni`], `Ikki ichki selektor guruhi.`),
    Q(`list-style: square nima?`, `Ro'yxat belgisini kvadrat qiladi`, [`Ro'yxatni o'chiradi`, `Rang beradi`], `Belgi shakli.`),
    Q(`Guruh selektori nima beradi?`, `Kodni qisqartiradi`, [`Sahifani sekinlashtiradi`, `Hech narsa`], `Bir xil qoidalarni takrorlamaslik.`),
    Q(`.menyu > a da > belgisining ma'nosi?`, `Bevosita bola`, [`Katta`, `Keyingi`], `Child selektor.`)
  ],
  prac: P(`${c('h1, h2')} ni bitta qoida bilan ${c('navy')} rangga bo'yang. Faqat ${c('nav')} ichidagi havolalarni oq (${c('white')}) qiling, matndagi havola oq bo'lmasin.`,
    `<nav>\n  <a href="#">Bosh sahifa</a>\n  <a href="#">Kitoblar</a>\n</nav>\n<h1>Kutubxona</h1>\n<h2>Yangi kitoblar</h2>\n<p>Batafsil: <a href="#">bu yerda</a></p>\n`, `body {\n  font-family: sans-serif;\n}\nnav {\n  background: #1f3b8f;\n  padding: 12px;\n}\n`,
    [[`h1 navy`, () => getComputedStyle(document.querySelector('h1')).color === 'rgb(0, 0, 128)'],
     [`h2 navy`, () => getComputedStyle(document.querySelector('h2')).color === 'rgb(0, 0, 128)'],
     [`nav havolalari oq`, () => [...document.querySelectorAll('nav a')].every(a => getComputedStyle(a).color === 'rgb(255, 255, 255)')],
     [`Matndagi havola oq emas`, () => getComputedStyle(document.querySelector('p a')).color !== 'rgb(255, 255, 255)']],
    `h1, h2 {\n  color: navy;\n}\nnav a {\n  color: white;\n}`, `body {\n  font-family: sans-serif;\n}\nnav {\n  background: #1f3b8f;\n  padding: 12px;\n}\n\nh1, h2 {\n  color: navy;\n}\n\nnav a {\n  color: white;\n  margin-right: 12px;\n}\n`)
},
{
  t: `Quti modeli: padding`, min: 20,
  key: `Har element quti: content, padding (ichki bo'shliq), border, margin (tashqi bo'shliq).`,
  theory: `<p>Brauzer har bir elementni <b>quti</b> deb ko'radi. Qutining qatlamlari ichkaridan tashqariga:</p>
<ol><li><b>content</b>: matn yoki rasm.</li><li><b>padding</b>: mazmun bilan chet orasidagi ichki bo'shliq.</li><li><b>border</b>: chegara chizig'i.</li><li><b>margin</b>: qutidan tashqaridagi bo'shliq.</li></ol>
${x(`.quti {
  background: #fff7d6;
  padding: 20px;           /* 4 tomondan */
  padding: 10px 20px;      /* tepa-past 10, chap-o'ng 20 */
  padding-left: 30px;      /* faqat chapdan */
}`, 'css')}
<p>Brauzerdagi F12 (Dasturchi asboblari) → Elements bo'limida qutini bosing: padding yashil, margin to'q sariq rangda ko'rinadi.</p>`,
  quiz: [
    Q(`Ichki bo'shliq?`, `padding`, [`margin`, `border`], `padding ichida.`),
    Q(`Tashqi bo'shliq?`, `margin`, [`padding`, `space`], `margin tashqarida.`),
    Q(`Eng ichkaridagi qatlam?`, `content`, [`margin`, `border`], `Mazmun.`),
    Q(`padding: 20px nechta tomonga?`, `4 tomonga`, [`Faqat tepaga`, `2 tomonga`], `Bitta qiymat: hammasiga.`),
    Q(`padding: 10px 20px da 20px qayerga?`, `Chap va o'ngga`, [`Tepaga`, `Pastga`], `Ikkinchi qiymat yon tomonlar.`),
    Q(`Faqat chapdan ichki bo'shliq?`, `padding-left`, [`left-padding`, `padding: left`], `padding-left.`),
    Q(`Quti qatlamlari tartibi (ichkaridan)?`, `content, padding, border, margin`, [`margin, border, content`, `border, content, padding`], `Ichdan tashqariga.`),
    Q(`Qutini ko'rish uchun brauzer asbobi?`, `F12 (Dasturchi asboblari)`, [`Ctrl+P`, `Alt+F4`], `DevTools.`),
    Q(`padding fon rangini oladimi?`, `Ha, fon padding ga ham tarqaladi`, [`Yo'q`, `Faqat oq`], `Fon border gacha.`),
    Q(`padding-top nima?`, `Tepadagi ichki bo'shliq`, [`Tashqi bo'shliq`, `Chegara`], `top: tepa.`)
  ],
  prac: P(`${c('.quti')} ga hamma tomondan kamida 16px ${c('padding')} bering, chapdan esa kamida 30px.`,
    `<div class="quti">\n  <h2>Eslatma</h2>\n  <p>Ertaga sport kiyimida keling.</p>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.quti {\n  background: #fff7d6;\n}\n`,
    [[`Tepada ≥ 16px`, () => parseFloat(getComputedStyle(document.querySelector('.quti')).paddingTop) >= 16],
     [`Pastda ≥ 16px`, () => parseFloat(getComputedStyle(document.querySelector('.quti')).paddingBottom) >= 16],
     [`Chapda ≥ 30px`, () => parseFloat(getComputedStyle(document.querySelector('.quti')).paddingLeft) >= 30]],
    `.quti {\n  padding: 16px;\n  padding-left: 30px;\n}`, `body {\n  font-family: sans-serif;\n}\n.quti {\n  background: #fff7d6;\n  padding: 16px;\n  padding-left: 30px;\n}\n`)
},
{
  t: `margin va markazlash`, min: 20,
  key: `margin qutilarni bir-biridan uzoqlashtiradi. margin: 0 auto va width bilan quti markazga keladi.`,
  theory: `${x(`.karta {
  margin: 20px;            /* hamma tomondan */
  margin-bottom: 40px;     /* faqat pastdan */
}
.sahifa {
  width: 600px;
  margin: 0 auto;          /* gorizontal markazga */
}`, 'css')}
<ul><li>${c('margin')} qutilar orasini ochadi. U shaffof, fon rangi bo'lmaydi.</li><li>${c('margin: 0 auto')}: tepa-past 0, chap-o'ng "avtomatik" teng bo'ladi, quti markazga keladi. Buning uchun qutining ${c('width')} i bo'lishi kerak.</li><li>Ketma-ket ikki qutining vertikal marginlari qo'shilmaydi, kattarog'i olinadi.</li></ul>
<div class="note">Matnni markazga ${c('text-align: center')}, qutini esa ${c('margin: 0 auto')} keltiradi. Bularni adashtirmang.</div>`,
  quiz: [
    Q(`Qutini markazga keltirish?`, `margin: 0 auto`, [`text-align: center`, `center: yes`], `Chap-o'ng auto.`),
    Q(`margin: 0 auto ishlashi uchun nima kerak?`, `width`, [`color`, `font-size`], `Kenglik bo'lishi kerak.`),
    Q(`margin fon rangini oladimi?`, `Yo'q, shaffof`, [`Ha`, `Faqat qizil`], `margin tashqarida.`),
    Q(`Faqat pastdan tashqi bo'shliq?`, `margin-bottom`, [`padding-bottom`, `bottom`], `margin-bottom.`),
    Q(`Matnni markazga?`, `text-align: center`, [`margin: auto`, `align: center`], `Matn uchun text-align.`),
    Q(`margin: 20px nechta tomonga?`, `4 tomonga`, [`1 tomonga`, `2 tomonga`], `Hamma tomon.`),
    Q(`auto nima degani?`, `Brauzer o'zi hisoblaydi`, [`0`, `Xato`], `Avtomatik.`),
    Q(`Ikki qutining vertikal marginlari 20 va 30. Oradagi masofa?`, `30px`, [`50px`, `20px`], `Kattarog'i olinadi.`),
    Q(`margin-top nima?`, `Tepadagi tashqi bo'shliq`, [`Ichki bo'shliq`, `Chegara`], `top: tepa.`),
    Q(`Kartalar orasini ochish uchun?`, `margin`, [`padding`, `color`], `Tashqi bo'shliq.`)
  ],
  prac: P(`${c('.sahifa')} kengligini 400px qilib ${c('margin: 0 auto')} bilan markazga keltiring. Har bir ${c('.karta')} ga pastdan kamida 16px margin bering.`,
    `<div class="sahifa">\n  <div class="karta">Birinchi karta</div>\n  <div class="karta">Ikkinchi karta</div>\n  <div class="karta">Uchinchi karta</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n  background: #f2f4f8;\n}\n.karta {\n  background: white;\n  padding: 16px;\n  border-radius: 10px;\n}\n`,
    [[`.sahifa kengligi 400px`, () => Math.round(document.querySelector('.sahifa').getBoundingClientRect().width) === 400 || getComputedStyle(document.querySelector('.sahifa')).width === '400px'],
     [`.sahifa margin: 0 auto`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /\.sahifa/.test(r.selectorText || '') && r.style.marginLeft === 'auto' && r.style.marginRight === 'auto'); } catch (e) { return false; } })],
     [`.karta pastdan ≥ 16px`, () => parseFloat(getComputedStyle(document.querySelector('.karta')).marginBottom) >= 16]],
    `.sahifa {\n  width: 400px;\n  margin: 0 auto;\n}\n.karta {\n  margin-bottom: 16px;\n}`, `body {\n  font-family: sans-serif;\n  background: #f2f4f8;\n}\n.sahifa {\n  width: 400px;\n  margin: 0 auto;\n}\n.karta {\n  background: white;\n  padding: 16px;\n  border-radius: 10px;\n  margin-bottom: 16px;\n}\n`)
},
{
  t: `Chegara va yumaloq burchak`, min: 15,
  key: `border: qalinlik turi rang (2px solid blue). border-radius burchaklarni yumaloqlaydi, 50% doira qiladi.`,
  theory: `${x(`.karta {
  border: 2px solid #2f6bff;
  border-radius: 12px;
}
.chiziqli {
  border-bottom: 3px dashed orange;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}`, 'css')}
<ul><li>${c('border')} uchta qiymat oladi: <b>qalinlik</b>, <b>turi</b> (${c('solid')} tutash, ${c('dashed')} uzuq, ${c('dotted')} nuqtali, ${c('double')} ikki chiziq) va <b>rang</b>.</li><li>Bitta tomon: ${c('border-top')}, ${c('border-bottom')}, ${c('border-left')}, ${c('border-right')}.</li><li>${c('border-radius')}: burchak radiusi. Kvadrat qutiga ${c('50%')} bersangiz, doira bo'ladi.</li></ul>`,
  quiz: [
    Q(`Burchaklarni yumaloqlash?`, `border-radius`, [`corner`, `round`], `border-radius.`),
    Q(`Tutash chiziq turi?`, `solid`, [`dashed`, `dotted`], `solid: yaxlit.`),
    Q(`Uzuq-uzuq chiziq?`, `dashed`, [`solid`, `double`], `dashed: shtrix.`),
    Q(`Nuqtali chiziq?`, `dotted`, [`dashed`, `points`], `dotted.`),
    Q(`Kvadratni doira qilish?`, `border-radius: 50%`, [`border-radius: 0`, `shape: circle`], `50% doira.`),
    Q(`border: 2px solid red da 2px nima?`, `Qalinlik`, [`Rang`, `Radius`], `Birinchi qiymat qalinlik.`),
    Q(`Faqat pastki chegara?`, `border-bottom`, [`border-down`, `bottom-line`], `border-bottom.`),
    Q(`border ning uchta qismi?`, `Qalinlik, turi, rang`, [`Rang, shrift, o'lcham`, `Eni, bo'yi, rangi`], `width style color.`),
    Q(`double nima?`, `Ikki qator chiziq`, [`Ikki marta qalin`, `Xato`], `Qo'sh chiziq.`),
    Q(`border-radius: 0 nima?`, `Burchaklar o'tkir`, [`Doira`, `Ko'rinmas`], `Radius yo'q.`)
  ],
  prac: P(`${c('.karta')} ga 2px tutash (${c('solid')}) chegara va kamida 10px yumaloq burchak bering. ${c('.avatar')} ni doira qiling.`,
    `<div class="karta">\n  <div class="avatar"></div>\n  <h3>Malika</h3>\n  <p>7-B sinf</p>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  width: 200px;\n  padding: 16px;\n  text-align: center;\n}\n.avatar {\n  width: 80px;\n  height: 80px;\n  margin: 0 auto;\n  background: #ffb3c1;\n}\n`,
    [[`.karta 2px solid chegara`, () => { const s = getComputedStyle(document.querySelector('.karta')); return s.borderTopWidth === '2px' && s.borderTopStyle === 'solid'; }],
     [`.karta radiusi ≥ 10px`, () => parseFloat(getComputedStyle(document.querySelector('.karta')).borderTopLeftRadius) >= 10],
     [`.avatar doira`, () => { const r = getComputedStyle(document.querySelector('.avatar')).borderTopLeftRadius; return r === '50%' || parseFloat(r) >= 40; }]],
    `.karta {\n  border: 2px solid #2f6bff;\n  border-radius: 12px;\n}\n.avatar {\n  border-radius: 50%;\n}`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  width: 200px;\n  padding: 16px;\n  text-align: center;\n  border: 2px solid #2f6bff;\n  border-radius: 12px;\n}\n.avatar {\n  width: 80px;\n  height: 80px;\n  margin: 0 auto;\n  background: #ffb3c1;\n  border-radius: 50%;\n}\n`)
},
{
  t: `O'lchamlar: width, height, max-width`, min: 20,
  key: `width eni, height bo'yi. % ota qutiga nisbatan. max-width eng katta en. box-sizing: border-box o'lchamni hisoblashni osonlashtiradi.`,
  theory: `${x(`.quti {
  width: 300px;
  height: 150px;
}
.yarim {
  width: 50%;          /* ota qutining yarmi */
}
.matn {
  max-width: 600px;    /* katta ekranda ham 600 dan oshmaydi */
}
img {
  max-width: 100%;     /* rasm qutidan chiqib ketmaydi */
}
* {
  box-sizing: border-box;
}`, 'css')}
<ul><li>${c('px')} aniq o'lcham, ${c('%')} ota qutiga nisbatan.</li><li>${c('max-width')} va ${c('min-width')}: chegaralar. Telefonda kichrayadi, kompyuterda cho'zilib ketmaydi.</li><li>Odatda ${c('width')} ga padding va border <b>qo'shiladi</b>. ${c('box-sizing: border-box')} bersangiz, ular width ichida hisoblanadi: 300px deganda rostdan 300px.</li></ul>`,
  quiz: [
    Q(`Element eni?`, `width`, [`height`, `size`], `width: en.`),
    Q(`Element bo'yi?`, `height`, [`width`, `tall`], `height: balandlik.`),
    Q(`width: 50% nimaga nisbatan?`, `Ota qutiga`, [`Ekranning bo'yiga`, `Shriftga`], `Foiz ota qutiga.`),
    Q(`Eng katta enni cheklash?`, `max-width`, [`big-width`, `width-max`], `max-width.`),
    Q(`Rasm qutidan chiqib ketmasligi uchun?`, `max-width: 100%`, [`width: 1000px`, `height: 0`], `Qutidan katta bo'lmaydi.`),
    Q(`box-sizing: border-box nima qiladi?`, `padding va border ni width ichida hisoblaydi`, [`Qutini o'chiradi`, `Chegara chizadi`], `O'lcham aniq bo'ladi.`),
    Q(`Eng kichik en?`, `min-width`, [`small-width`, `width-min`], `min-width.`),
    Q(`width: 200px, padding: 10px (border-box yo'q). Umumiy en?`, `220px`, [`200px`, `210px`], `200 + 10 + 10.`),
    Q(`Xuddi shu, lekin border-box bilan?`, `200px`, [`220px`, `180px`], `Padding ichida.`),
    Q(`Matn juda uzun qatorga cho'zilmasligi uchun?`, `max-width`, [`font-size`, `color`], `O'qish qulay bo'ladi.`)
  ],
  prac: P(`${c('.quti')} ni eni 300px, bo'yi 150px qiling. ${c('.yarim')} eni ota qutining 50% bo'lsin. Hamma elementlarga ${c('box-sizing: border-box')} bering.`,
    `<div class="ota">\n  <div class="quti">300 × 150</div>\n  <div class="yarim">Yarim en</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.ota {\n  width: 500px;\n}\n.quti, .yarim {\n  background: #dbe6ff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n`,
    [[`.quti 300×150`, () => { const r = document.querySelector('.quti').getBoundingClientRect(); return Math.round(r.width) === 300 && Math.round(r.height) === 150; }],
     [`.yarim 250px (50%)`, () => Math.round(document.querySelector('.yarim').getBoundingClientRect().width) === 250],
     [`box-sizing: border-box`, () => getComputedStyle(document.querySelector('.quti')).boxSizing === 'border-box']],
    `* {\n  box-sizing: border-box;\n}\n.quti {\n  width: 300px;\n  height: 150px;\n}\n.yarim {\n  width: 50%;\n}`, `body {\n  font-family: sans-serif;\n}\n* {\n  box-sizing: border-box;\n}\n.ota {\n  width: 500px;\n}\n.quti, .yarim {\n  background: #dbe6ff;\n  padding: 10px;\n  margin-bottom: 10px;\n}\n.quti {\n  width: 300px;\n  height: 150px;\n}\n.yarim {\n  width: 50%;\n}\n`)
},
{
  t: `display: block, inline, inline-block, none`, min: 20,
  key: `block yangi qatordan va butun en; inline qator ichida; inline-block qator ichida, lekin o'lcham oladi; none yashiradi.`,
  theory: `<p>Elementlar ikki xil bo'ladi:</p>
<ul><li><b>Blok</b> (${c('div')}, ${c('p')}, ${c('h1')}): yangi qatordan boshlanadi va butun enni egallaydi.</li><li><b>Qator ichi</b> (${c('span')}, ${c('a')}, ${c('b')}): matn ichida turadi, ${c('width')}/${c('height')} ishlamaydi.</li></ul>
<p>${c('display')} bu xulqni o'zgartiradi:</p>
${x(`nav a {
  display: inline-block;   /* qatorda, lekin padding/width ishlaydi */
  padding: 8px 14px;
}
.yashirin {
  display: none;           /* butunlay ko'rinmaydi */
}
span.blok {
  display: block;
}`, 'css')}
<p>${c('display: none')} elementni joyi bilan yo'q qiladi. ${c('visibility: hidden')} esa ko'rinmas qiladi, lekin joyi bo'sh qoladi.</p>`,
  quiz: [
    Q(`div qanday element?`, `Blok`, [`Qator ichi`, `Ko'rinmas`], `div blok.`),
    Q(`span qanday element?`, `Qator ichi`, [`Blok`, `Jadval`], `span inline.`),
    Q(`Elementni yashirish?`, `display: none`, [`display: hide`, `color: none`], `none.`),
    Q(`Qatorda turib, o'lcham oladigan?`, `inline-block`, [`inline`, `none`], `inline-block.`),
    Q(`Blok element enining qanchasini egallaydi?`, `Butun enni`, [`Matn qadar`, `Yarmini`], `To'liq qator.`),
    Q(`inline elementga width ishlaydimi?`, `Yo'q`, [`Ha`, `Faqat qizil bo'lsa`], `inline o'lcham olmaydi.`),
    Q(`visibility: hidden va display: none farqi?`, `hidden joyini saqlaydi`, [`Farqi yo'q`, `none joyini saqlaydi`], `Bo'sh joy qoladi.`),
    Q(`a havola qanday element?`, `Qator ichi`, [`Blok`, `Rasm`], `a inline.`),
    Q(`Menyu tugmalari qatorda tursin va padding olsin?`, `display: inline-block`, [`display: block`, `display: none`], `inline-block qulay.`),
    Q(`p qanday element?`, `Blok`, [`Qator ichi`, `Yo'q`], `Har p yangi qatordan.`)
  ],
  prac: P(`${c('nav a')} larni ${c('inline-block')} qilib ${c('padding')} bering. ${c('.yashirin')} paragrafni ${c('display: none')} bilan yashiring.`,
    `<nav>\n  <a href="#">Bosh</a>\n  <a href="#">Darslar</a>\n  <a href="#">Aloqa</a>\n</nav>\n<p>Ko'rinadigan matn</p>\n<p class="yashirin">Bu matn ko'rinmasligi kerak</p>\n`, `body {\n  font-family: sans-serif;\n}\nnav a {\n  background: #2f6bff;\n  color: white;\n  text-decoration: none;\n  border-radius: 8px;\n}\n`,
    [[`nav a inline-block`, () => [...document.querySelectorAll('nav a')].every(a => getComputedStyle(a).display === 'inline-block')],
     [`nav a da padding ≥ 6px`, () => parseFloat(getComputedStyle(document.querySelector('nav a')).paddingTop) >= 6],
     [`.yashirin ko'rinmaydi`, () => getComputedStyle(document.querySelector('.yashirin')).display === 'none']],
    `nav a {\n  display: inline-block;\n  padding: 8px 14px;\n}\n.yashirin {\n  display: none;\n}`, `body {\n  font-family: sans-serif;\n}\nnav a {\n  background: #2f6bff;\n  color: white;\n  text-decoration: none;\n  border-radius: 8px;\n  display: inline-block;\n  padding: 8px 14px;\n}\n.yashirin {\n  display: none;\n}\n`)
},
{
  t: `Flexbox: qatorga terish`, min: 20,
  key: `display: flex bolalarni bir qatorga teradi. gap ular orasidagi masofa. flex-direction: column ustunga teradi.`,
  theory: `<p>Elementlarni yonma-yon terishning eng oson yo'li <b>Flexbox</b>. U <b>ota</b> qutiga yoziladi va bolalariga ta'sir qiladi:</p>
${x(`.qator {
  display: flex;
  gap: 16px;
}`, 'css')}
${x(`<div class="qator">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>`)}
<ul><li>${c('display: flex')}: bolalar bir qatorga turadi.</li><li>${c('gap')}: bolalar orasidagi bo'shliq (margin bilan ovora bo'lmaysiz).</li><li>${c('flex-direction: column')}: qator o'rniga ustun.</li><li>Bolaga ${c('flex: 1')} bersangiz, qolgan joyni teng bo'lib oladi.</li></ul>`,
  quiz: [
    Q(`Bolalarni qatorga terish?`, `display: flex`, [`display: row`, `flex: yes`], `display: flex.`),
    Q(`display: flex qayerga yoziladi?`, `Ota qutiga`, [`Har bir bolaga`, `body ga albatta`], `Ota konteyner.`),
    Q(`Bolalar orasidagi masofa?`, `gap`, [`space`, `between`], `gap.`),
    Q(`Ustunga terish?`, `flex-direction: column`, [`flex-direction: row`, `display: column`], `column: ustun.`),
    Q(`flex: 1 nima qiladi?`, `Qolgan joyni teng bo'lib oladi`, [`1px qiladi`, `Yashiradi`], `O'sish.`),
    Q(`flex-direction odatiy qiymati?`, `row`, [`column`, `none`], `Qator.`),
    Q(`Flexbox nima uchun qulay?`, `Elementlarni joylashtirish uchun`, [`Rang berish uchun`, `Shrift uchun`], `Layout.`),
    Q(`gap: 16px nima?`, `Bolalar orasi 16px`, [`Ota padding 16px`, `Chegara 16px`], `Oraliq.`),
    Q(`3 ta kartani yonma-yon qo'yish uchun?`, `Ota qutiga display: flex`, [`Har biriga display: none`, `text-align: center`], `Flex.`),
    Q(`Flex ichidagi elementlar nima deyiladi?`, `Bolalar (flex items)`, [`Ota`, `Qo'shni`], `Flex items.`)
  ],
  prac: P(`${c('.qator')} ni ${c('display: flex')} qiling, kartalar orasiga kamida 12px ${c('gap')} bering.`,
    `<div class="qator">\n  <div class="karta">🍎 Olma</div>\n  <div class="karta">🍐 Nok</div>\n  <div class="karta">🍇 Uzum</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  background: #eef3ff;\n  padding: 20px;\n  border-radius: 12px;\n}\n`,
    [[`.qator flex`, () => getComputedStyle(document.querySelector('.qator')).display === 'flex'],
     [`gap ≥ 12px`, () => parseFloat(getComputedStyle(document.querySelector('.qator')).columnGap) >= 12],
     [`Kartalar bir qatorda`, () => { const k = [...document.querySelectorAll('.karta')].map(e => e.getBoundingClientRect().top); return Math.max(...k) - Math.min(...k) < 2; }]],
    `.qator {\n  display: flex;\n  gap: 16px;\n}`, `body {\n  font-family: sans-serif;\n}\n.qator {\n  display: flex;\n  gap: 16px;\n}\n.karta {\n  background: #eef3ff;\n  padding: 20px;\n  border-radius: 12px;\n}\n`)
},
{
  t: `Flexbox: tekislash`, min: 20,
  key: `justify-content asosiy o'q bo'yicha (gorizontal), align-items ko'ndalang o'q bo'yicha (vertikal) tekislaydi.`,
  theory: `${x(`.menyu {
  display: flex;
  justify-content: space-between;  /* chetlarga yoyadi */
  align-items: center;             /* vertikal markaz */
}
.markaz {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;                   /* ichidagi narsa aniq o'rtada */
}`, 'css')}
<p>${c('justify-content')} qiymatlari: ${c('flex-start')} (boshida), ${c('center')} (o'rtada), ${c('flex-end')} (oxirida), ${c('space-between')} (chetlarga yoyib), ${c('space-around')} (atrofida teng joy).</p>
<p>${c('align-items')} qiymatlari: ${c('flex-start')}, ${c('center')}, ${c('flex-end')}, ${c('stretch')} (cho'zish).</p>
<div class="note">Elementni qutining aniq o'rtasiga qo'yish: ${c('display:flex; justify-content:center; align-items:center;')}. Bu juda ko'p ishlatiladi.</div>`,
  quiz: [
    Q(`Gorizontal tekislash (flex row)?`, `justify-content`, [`align-items`, `text-align`], `Asosiy o'q.`),
    Q(`Vertikal tekislash (flex row)?`, `align-items`, [`justify-content`, `vertical`], `Ko'ndalang o'q.`),
    Q(`Chetlarga yoyish?`, `space-between`, [`center`, `stretch`], `Birinchisi chapda, oxirgisi o'ngda.`),
    Q(`Aniq o'rtaga qo'yish?`, `justify-content: center; align-items: center`, [`margin: 0`, `text-align: center`], `Ikkalasi center.`),
    Q(`Oxiriga (o'ngga) surish?`, `flex-end`, [`flex-start`, `right`], `flex-end.`),
    Q(`Logo chapda, menyu o'ngda bo'lishi uchun?`, `space-between`, [`center`, `flex-start`], `Chetlarga.`),
    Q(`align-items: stretch nima?`, `Bolalarni bo'yiga cho'zadi`, [`Yashiradi`, `Markazlaydi`], `Cho'zish.`),
    Q(`space-around nima?`, `Har birining atrofida teng joy`, [`Hammasi chapda`, `Joysiz`], `Atrofida.`),
    Q(`justify-content qayerga yoziladi?`, `Flex ota qutiga`, [`Bolaga`, `body ga`], `Konteynerga.`),
    Q(`flex-start nima?`, `Boshida (chapda)`, [`O'rtada`, `Oxirida`], `Boshlanish.`)
  ],
  prac: P(`${c('.menyu')} da logo chapda, havolalar o'ngda bo'lsin (${c('space-between')}) va vertikal markazda (${c('align-items: center')}). ${c('.markaz')} ichidagi tugmani aniq o'rtaga qo'ying.`,
    `<div class="menyu">\n  <b class="logo">ZIS</b>\n  <div><a href="#">Darslar</a> <a href="#">Aloqa</a></div>\n</div>\n<div class="markaz">\n  <button>Boshlash</button>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.menyu {\n  display: flex;\n  background: #0f1b33;\n  color: white;\n  padding: 12px;\n  height: 60px;\n}\n.menyu a {\n  color: white;\n}\n.logo {\n  font-size: 26px;\n}\n.markaz {\n  display: flex;\n  height: 200px;\n  background: #f2f4f8;\n  margin-top: 12px;\n}\n`,
    [[`.menyu space-between`, () => getComputedStyle(document.querySelector('.menyu')).justifyContent === 'space-between'],
     [`.menyu align-items: center`, () => getComputedStyle(document.querySelector('.menyu')).alignItems === 'center'],
     [`Tugma o'rtada`, () => { const o = document.querySelector('.markaz').getBoundingClientRect(), b = document.querySelector('.markaz button').getBoundingClientRect(); return Math.abs((b.left + b.width / 2) - (o.left + o.width / 2)) < 3 && Math.abs((b.top + b.height / 2) - (o.top + o.height / 2)) < 3; }]],
    `.menyu {\n  justify-content: space-between;\n  align-items: center;\n}\n.markaz {\n  justify-content: center;\n  align-items: center;\n}`, `body {\n  font-family: sans-serif;\n}\n.menyu {\n  display: flex;\n  background: #0f1b33;\n  color: white;\n  padding: 12px;\n  height: 60px;\n  justify-content: space-between;\n  align-items: center;\n}\n.menyu a {\n  color: white;\n}\n.logo {\n  font-size: 26px;\n}\n.markaz {\n  display: flex;\n  height: 200px;\n  background: #f2f4f8;\n  margin-top: 12px;\n  justify-content: center;\n  align-items: center;\n}\n`)
},
{
  t: `Flexbox: kartalar qatori (flex-wrap)`, min: 20,
  key: `flex-wrap: wrap bo'lsa, joy yetmaganda bolalar keyingi qatorga o'tadi. flex: 1 1 200px moslashuvchan karta.`,
  theory: `<p>Kartalar ko'p bo'lsa, ular bitta qatorga sig'maydi. ${c('flex-wrap: wrap')} ularni keyingi qatorga o'tkazadi:</p>
${x(`.kartalar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.karta {
  flex: 1 1 180px;   /* o'sadi, kichrayadi, asos 180px */
}`, 'css')}
<ul><li>${c('flex-wrap: nowrap')} (odatiy): hammasi bitta qatorda siqiladi.</li><li>${c('flex-wrap: wrap')}: joy tugasa yangi qator.</li><li>${c('flex: 1 1 180px')}: karta taxminan 180px, lekin qatorni to'ldirish uchun kengayadi. Telefonda 1 ta, kompyuterda 4 ta karta bo'ladi, hech qanday qo'shimcha kodsiz.</li></ul>`,
  quiz: [
    Q(`Keyingi qatorga o'tkazish?`, `flex-wrap: wrap`, [`flex-wrap: nowrap`, `wrap: yes`], `wrap.`),
    Q(`flex-wrap odatiy qiymati?`, `nowrap`, [`wrap`, `none`], `Bir qatorda.`),
    Q(`flex: 1 1 180px da 180px nima?`, `Asosiy o'lcham`, [`Eng katta`, `Chegara`], `flex-basis.`),
    Q(`nowrap da ko'p karta nima bo'ladi?`, `Siqiladi`, [`Yangi qatorga o'tadi`, `Yo'qoladi`], `Bir qatorda qoladi.`),
    Q(`Telefonda kartalar avtomatik 1 ustun bo'lishi uchun?`, `flex-wrap: wrap va flex-basis`, [`display: none`, `font-size`], `Moslashuvchan.`),
    Q(`wrap so'zining ma'nosi?`, `O'rash, ko'chirish`, [`Yashirish`, `Kattalashtirish`], `Qatorga o'rash.`),
    Q(`gap ikki qator orasida ham ishlaydimi?`, `Ha`, [`Yo'q`, `Faqat column da`], `row-gap ham.`),
    Q(`flex: 1 1 180px dagi birinchi 1?`, `O'sish (grow)`, [`Qalinlik`, `Tartib`], `flex-grow.`),
    Q(`Ikkinchi 1?`, `Kichrayish (shrink)`, [`O'sish`, `Rang`], `flex-shrink.`),
    Q(`Mahsulot kartalari uchun qulay usul?`, `flex + wrap`, [`table`, `br`], `Kartalar to'ri.`)
  ],
  prac: P(`${c('.kartalar')} ni flex qilib, ${c('flex-wrap: wrap')} va ${c('gap')} bering. Har bir ${c('.karta')} ga ${c('flex: 1 1 140px')} bering.`,
    `<div class="kartalar">\n  <div class="karta">1</div><div class="karta">2</div><div class="karta">3</div>\n  <div class="karta">4</div><div class="karta">5</div><div class="karta">6</div>\n  <div class="karta">7</div><div class="karta">8</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  background: #ffe3c2;\n  padding: 24px;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 24px;\n}\n`,
    [[`.kartalar flex`, () => getComputedStyle(document.querySelector('.kartalar')).display === 'flex'],
     [`flex-wrap: wrap`, () => getComputedStyle(document.querySelector('.kartalar')).flexWrap === 'wrap'],
     [`gap bor`, () => parseFloat(getComputedStyle(document.querySelector('.kartalar')).columnGap) > 0],
     [`.karta flex-basis 140px`, () => getComputedStyle(document.querySelector('.karta')).flexBasis === '140px']],
    `.kartalar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.karta {\n  flex: 1 1 140px;\n}`, `body {\n  font-family: sans-serif;\n}\n.kartalar {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.karta {\n  background: #ffe3c2;\n  padding: 24px;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 24px;\n  flex: 1 1 140px;\n}\n`)
},
{
  t: `CSS Grid: to'r (setka)`, min: 25,
  key: `display: grid va grid-template-columns ustunlarni beradi. 1fr = bo'sh joyning bir ulushi. repeat(3, 1fr) uchta teng ustun.`,
  theory: `<p>Flexbox bir yo'nalishda (qator yoki ustun) teradi. <b>Grid</b> esa qator va ustunli <b>to'r</b> yasaydi:</p>
${x(`.galereya {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
}`, 'css')}
<ul><li>${c('fr')} (fraction): bo'sh joyning ulushi. ${c('1fr 2fr')}: ikkinchisi birinchisidan ikki baravar keng.</li><li>${c('repeat(3, 1fr)')} = ${c('1fr 1fr 1fr')}.</li><li>${c('grid-template-columns: 200px 1fr')}: chap ustun 200px, qolgani o'ngga.</li><li>Bolaga ${c('grid-column: span 2')}: ikki ustunni egallaydi.</li></ul>
${x(`.galereya {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}`, 'css')}
<p>Bu "sehrli qator" ekran eniga qarab ustunlar sonini o'zi tanlaydi.</p>`,
  quiz: [
    Q(`Grid yoqish?`, `display: grid`, [`display: table`, `grid: on`], `display: grid.`),
    Q(`Ustunlarni beradigan xususiyat?`, `grid-template-columns`, [`grid-columns`, `columns-count`], `grid-template-columns.`),
    Q(`1fr nima?`, `Bo'sh joyning bir ulushi`, [`1 piksel`, `1 foiz`], `fraction.`),
    Q(`repeat(4, 1fr) nechta ustun?`, `4 ta teng`, [`1 ta`, `14 ta`], `To'rtta.`),
    Q(`1fr 2fr da ikkinchi ustun?`, `Ikki baravar keng`, [`Teng`, `Yarmi`], `2 ulush.`),
    Q(`Ikki ustunni egallash?`, `grid-column: span 2`, [`width: 2`, `colspan: 2`], `span 2.`),
    Q(`Grid va Flex farqi?`, `Grid to'r (qator+ustun), Flex bir yo'nalish`, [`Farqi yo'q`, `Flex to'r yasaydi`], `2D va 1D.`),
    Q(`200px 1fr nimani beradi?`, `Chap 200px, o'ng qolgan joy`, [`Ikkalasi 200px`, `Xato`], `Yon panel + asosiy.`),
    Q(`gap gridda ishlaydimi?`, `Ha`, [`Yo'q`, `Faqat flexda`], `Ikkalasida.`),
    Q(`auto-fill + minmax nima beradi?`, `Ekranga qarab ustunlar soni o'zgaradi`, [`Faqat 1 ustun`, `Xato`], `Moslashuvchan to'r.`)
  ],
  prac: P(`${c('.galereya')} ni 3 ta teng ustunli grid qiling (${c('repeat(3, 1fr)')}), ${c('gap')} bering. ${c('.katta')} rasm 2 ustunni egallasin.`,
    `<div class="galereya">\n  <div class="rasm katta">🌄</div>\n  <div class="rasm">🌊</div>\n  <div class="rasm">🌲</div>\n  <div class="rasm">🏔️</div>\n  <div class="rasm">🌻</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.rasm {\n  background: #e3f6ef;\n  font-size: 48px;\n  text-align: center;\n  padding: 24px;\n  border-radius: 12px;\n}\n`,
    [[`.galereya grid`, () => getComputedStyle(document.querySelector('.galereya')).display === 'grid'],
     [`3 ta ustun`, () => getComputedStyle(document.querySelector('.galereya')).gridTemplateColumns.split(' ').length === 3],
     [`gap bor`, () => parseFloat(getComputedStyle(document.querySelector('.galereya')).columnGap) > 0],
     [`.katta 2 ustunda`, () => { const a = document.querySelector('.katta').getBoundingClientRect().width, b = document.querySelectorAll('.rasm')[1].getBoundingClientRect().width; return a > b * 1.8; }]],
    `.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.katta {\n  grid-column: span 2;\n}`, `body {\n  font-family: sans-serif;\n}\n.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.rasm {\n  background: #e3f6ef;\n  font-size: 48px;\n  text-align: center;\n  padding: 24px;\n  border-radius: 12px;\n}\n.katta {\n  grid-column: span 2;\n}\n`)
},
{
  t: `Holatlar: :hover va transition`, min: 20,
  key: `:hover sichqoncha ustida turganda, :focus maydon tanlanganda. transition o'zgarishni silliq qiladi.`,
  theory: `<p><b>Psevdo-klasslar</b> elementning holatiga qarab uslub beradi:</p>
${x(`.tugma {
  background: #2f6bff;
  color: white;
  transition: background 0.3s, transform 0.3s;
}
.tugma:hover {
  background: #1f4fd6;
  transform: scale(1.05);
}
input:focus {
  outline: 3px solid gold;
}`, 'css')}
<ul><li>${c(':hover')}: sichqoncha ustida.</li><li>${c(':focus')}: element tanlangan (maydonga yozilayotganda).</li><li>${c(':active')}: bosib turilganda.</li><li>${c('li:first-child')}, ${c('li:nth-child(2)')}: birinchi, ikkinchi bola.</li></ul>
<p>${c('transition: xususiyat vaqt')} o'zgarishni sekin, chiroyli qiladi. ${c('transform: scale(1.05)')} 5% kattalashtiradi, ${c('rotate(10deg)')} buradi.</p>`,
  quiz: [
    Q(`Sichqoncha ustida turgan holat?`, `:hover`, [`:focus`, `:click`], `hover: ustida.`),
    Q(`Maydon tanlangan holat?`, `:focus`, [`:hover`, `:select`], `focus.`),
    Q(`O'zgarishni silliq qilish?`, `transition`, [`animation-speed`, `smooth`], `transition.`),
    Q(`5% kattalashtirish?`, `transform: scale(1.05)`, [`size: 105%`, `zoom: 5`], `scale.`),
    Q(`Bosib turilgan holat?`, `:active`, [`:press`, `:down`], `active.`),
    Q(`Ro'yxatning birinchi bandi?`, `li:first-child`, [`li:one`, `li.first`], `first-child.`),
    Q(`transition: background 0.3s da 0.3s?`, `O'tish vaqti`, [`Kechikish rangi`, `Qalinlik`], `Soniya.`),
    Q(`Burish?`, `transform: rotate(10deg)`, [`turn: 10`, `rotate: yes`], `rotate.`),
    Q(`Psevdo-klass nima bilan boshlanadi?`, `:`, [`.`, `#`], `Ikki nuqta.`),
    Q(`li:nth-child(2) nima?`, `Ikkinchi bola li`, [`2 ta li`, `Oxirgi li`], `n-chi bola.`)
  ],
  prac: P(`${c('.tugma:hover')} da fon rangi o'zgarsin va ${c('.tugma')} ga ${c('transition')} bering.`,
    `<button class="tugma">Meni bos</button>\n`, `body {\n  font-family: sans-serif;\n  padding: 30px;\n}\n.tugma {\n  background: #2f6bff;\n  color: white;\n  border: 0;\n  padding: 12px 24px;\n  border-radius: 10px;\n  font-size: 18px;\n}\n`,
    [[`.tugma da transition`, () => parseFloat(getComputedStyle(document.querySelector('.tugma')).transitionDuration) > 0],
     [`:hover qoidasi fonni o'zgartiradi`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /\.tugma:hover/.test(r.selectorText || '') && /background/.test(r.style.cssText)); } catch (e) { return false; } })]],
    `.tugma {\n  transition: background 0.3s;\n}\n.tugma:hover {\n  background: #1f4fd6;\n}`, `body {\n  font-family: sans-serif;\n  padding: 30px;\n}\n.tugma {\n  background: #2f6bff;\n  color: white;\n  border: 0;\n  padding: 12px 24px;\n  border-radius: 10px;\n  font-size: 18px;\n  transition: background 0.3s, transform 0.3s;\n}\n.tugma:hover {\n  background: #1f4fd6;\n  transform: scale(1.05);\n}\n`)
},
{
  t: `Joylashuv: position`, min: 25,
  key: `relative o'z joyiga nisbatan, absolute eng yaqin relative otaga nisbatan, fixed ekranga nisbatan (qotib turadi).`,
  theory: `${x(`.karta {
  position: relative;
}
.belgi {
  position: absolute;
  top: 10px;
  right: 10px;       /* kartaning o'ng yuqori burchagi */
}
.yuqori-menyu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;       /* aylantirsa ham tepada turadi */
}`, 'css')}
<ul><li>${c('static')}: odatiy, oddiy oqimda.</li><li>${c('relative')}: o'z joyidan ${c('top')}/${c('left')} bo'yicha suriladi. Ko'pincha absolute bolalar uchun "langar".</li><li>${c('absolute')}: oqimdan chiqadi va eng yaqin ${c('relative')} otaga nisbatan joylashadi.</li><li>${c('fixed')}: ekranga yopishadi, sahifa aylantirilsa ham qimirlamaydi.</li><li>${c('sticky')}: aylantirganda chetga yetsa yopishib qoladi.</li><li>${c('z-index')}: qaysi element ustida turishi (katta son ustida).</li></ul>`,
  quiz: [
    Q(`Ekranga yopishib turadigan?`, `fixed`, [`relative`, `static`], `fixed.`),
    Q(`absolute nimaga nisbatan joylashadi?`, `Eng yaqin relative otaga`, [`Doim body ga`, `O'ziga`], `Langar ota.`),
    Q(`Odatiy position?`, `static`, [`relative`, `absolute`], `static.`),
    Q(`Qaysi element ustida turadi?`, `z-index katta bo'lgani`, [`Kichigi`, `Birinchi yozilgani`], `z-index.`),
    Q(`O'ng yuqori burchakka qo'yish?`, `top: 0; right: 0`, [`bottom: 0; left: 0`, `center: 0`], `top va right.`),
    Q(`Aylantirganda yopishib qoladigan?`, `sticky`, [`static`, `float`], `sticky.`),
    Q(`relative nimaga nisbatan suriladi?`, `O'z joyiga`, [`Ekranga`, `Otaga`], `O'z o'rnidan.`),
    Q(`absolute element oqimda joy egallaydimi?`, `Yo'q`, [`Ha`, `Faqat yarmini`], `Oqimdan chiqadi.`),
    Q(`Har doim tepada turadigan menyu uchun?`, `position: fixed; top: 0`, [`position: static`, `margin-top: 0`], `fixed.`),
    Q(`Kartadagi "Yangi!" yorlig'i uchun?`, `Karta relative, yorliq absolute`, [`Ikkalasi static`, `Yorliq fixed`], `Klassik usul.`)
  ],
  prac: P(`${c('.karta')} ga ${c('position: relative')} bering. ${c('.belgi')} ni ${c('absolute')} qilib, kartaning o'ng yuqori burchagiga qo'ying (${c('top: 10px; right: 10px')}).`,
    `<div class="karta">\n  <span class="belgi">Yangi!</span>\n  <h3>Robototexnika</h3>\n  <p>Yangi to'garak ochildi.</p>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  width: 260px;\n  padding: 20px;\n  background: #f2f4f8;\n  border-radius: 12px;\n}\n.belgi {\n  background: crimson;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 13px;\n}\n`,
    [[`.karta relative`, () => getComputedStyle(document.querySelector('.karta')).position === 'relative'],
     [`.belgi absolute`, () => getComputedStyle(document.querySelector('.belgi')).position === 'absolute'],
     [`.belgi o'ng yuqori burchakda`, () => { const k = document.querySelector('.karta').getBoundingClientRect(), b = document.querySelector('.belgi').getBoundingClientRect(); return Math.abs(k.right - b.right - 10) < 3 && Math.abs(b.top - k.top - 10) < 3; }]],
    `.karta {\n  position: relative;\n}\n.belgi {\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}`, `body {\n  font-family: sans-serif;\n}\n.karta {\n  width: 260px;\n  padding: 20px;\n  background: #f2f4f8;\n  border-radius: 12px;\n  position: relative;\n}\n.belgi {\n  background: crimson;\n  color: white;\n  padding: 4px 10px;\n  border-radius: 999px;\n  font-size: 13px;\n  position: absolute;\n  top: 10px;\n  right: 10px;\n}\n`)
},
{
  t: `Soya va shaffoflik`, min: 15,
  key: `box-shadow qutiga soya, text-shadow matnga soya, opacity shaffoflik (0 ko'rinmas, 1 to'liq).`,
  theory: `${x(`.karta {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
h1 {
  text-shadow: 2px 2px 4px gray;
}
.xira {
  opacity: 0.5;
}`, 'css')}
<ul><li>${c('box-shadow: x y xiralik rang')}: ${c('0 4px 12px')} pastga 4px, 12px xira soya.</li><li>${c('rgba(0,0,0,0.15)')}: qora, lekin 15% quyuqlikda. Oxirgi son <b>alfa</b> (shaffoflik).</li><li>${c('text-shadow')} matnga xuddi shunday soya beradi.</li><li>${c('opacity')}: 0 dan 1 gacha, butun elementni shaffof qiladi.</li></ul>
<div class="note">Yengil, yumshoq soya chiroyli ko'rinadi. Qop-qora qalin soya eski uslub.</div>`,
  quiz: [
    Q(`Qutiga soya?`, `box-shadow`, [`shadow`, `text-shadow`], `box-shadow.`),
    Q(`Matnga soya?`, `text-shadow`, [`font-shadow`, `box-shadow`], `text-shadow.`),
    Q(`Shaffoflik?`, `opacity`, [`alpha`, `visible`], `opacity.`),
    Q(`opacity: 0 nima?`, `Butunlay shaffof (ko'rinmas)`, [`To'liq ko'rinadi`, `Qora`], `0 ko'rinmas.`),
    Q(`rgba dagi a nima?`, `Alfa, shaffoflik`, [`Ko'k`, `Burchak`], `alpha.`),
    Q(`box-shadow: 0 4px 12px da 12px?`, `Xiralik`, [`Kenglik`, `Rang`], `Blur.`),
    Q(`Qaysi soya chiroyliroq?`, `Yengil va yumshoq`, [`Qop-qora qalin`, `Qizil`], `Zamonaviy uslub.`),
    Q(`opacity: 0.5?`, `Yarim shaffof`, [`Yarim o'lcham`, `Yashirin`], `50%.`),
    Q(`rgba(0,0,0,0.15) qanday rang?`, `Och shaffof qora`, [`Qizil`, `Oq`], `15% qora.`),
    Q(`Soyani pastga surish uchun qaysi qiymat o'zgaradi?`, `Ikkinchi (y)`, [`Birinchi (x)`, `Rang`], `y o'qi.`)
  ],
  prac: P(`${c('.karta')} ga ${c('box-shadow')} bering, ${c('h1')} ga ${c('text-shadow')} bering, ${c('.xira')} ni ${c('opacity: 0.5')} qiling.`,
    `<h1>Soyalar</h1>\n<div class="karta">Men soyali kartaman</div>\n<p class="xira">Men xira matnman</p>\n`, `body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n.karta {\n  padding: 24px;\n  border-radius: 14px;\n  background: white;\n}\n`,
    [[`.karta soyasi bor`, () => getComputedStyle(document.querySelector('.karta')).boxShadow !== 'none'],
     [`h1 matn soyasi`, () => getComputedStyle(document.querySelector('h1')).textShadow !== 'none'],
     [`.xira opacity 0.5`, () => Math.abs(parseFloat(getComputedStyle(document.querySelector('.xira')).opacity) - 0.5) < 0.01]],
    `.karta {\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\nh1 {\n  text-shadow: 2px 2px 4px gray;\n}\n.xira {\n  opacity: 0.5;\n}`, `body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n.karta {\n  padding: 24px;\n  border-radius: 14px;\n  background: white;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n}\nh1 {\n  text-shadow: 2px 2px 4px gray;\n}\n.xira {\n  opacity: 0.5;\n}\n`)
},
{
  t: `CSS o'zgaruvchilar`, min: 20,
  key: `:root { --asosiy: #2f6bff; } o'zgaruvchi e'lon qiladi, var(--asosiy) uni ishlatadi. Bir joyda o'zgartirsangiz, hamma joy o'zgaradi.`,
  theory: `<p>Saytda bitta rang 20 joyda ishlatilsa-yu, uni o'zgartirish kerak bo'lsa nima qilamiz? <b>O'zgaruvchi</b> e'lon qilamiz:</p>
${x(`:root {
  --asosiy: #2f6bff;
  --fon: #f5f7fb;
  --radius: 12px;
}
body {
  background: var(--fon);
}
.tugma {
  background: var(--asosiy);
  border-radius: var(--radius);
}
h1 {
  color: var(--asosiy);
}`, 'css')}
<ul><li>O'zgaruvchi nomi ${c('--')} bilan boshlanadi.</li><li>${c(':root')}: butun sahifa uchun (hamma joyda ishlaydi).</li><li>${c('var(--nom)')}: qiymatni olish.</li></ul>
<p>Endi ${c('--asosiy')} ni yashilga o'zgartirsangiz, tugma ham, sarlavha ham yashil bo'ladi. Tungi rejim (dark mode) ham shunday yasaladi.</p>`,
  quiz: [
    Q(`CSS o'zgaruvchi nomi nima bilan boshlanadi?`, `--`, [`$`, `@`], `--asosiy.`),
    Q(`O'zgaruvchini ishlatish?`, `var(--nom)`, [`get(--nom)`, `$nom`], `var().`),
    Q(`Butun sahifa uchun qayerda e'lon qilinadi?`, `:root`, [`body:first`, `html.root`], `:root.`),
    Q(`O'zgaruvchining foydasi?`, `Bir joyda o'zgartirsa hamma joy o'zgaradi`, [`Sahifa tezlashadi`, `Foydasi yo'q`], `Markazlashgan.`),
    Q(`--radius: 12px; ni ishlatish?`, `border-radius: var(--radius)`, [`border-radius: --radius`, `border-radius: radius`], `var orqali.`),
    Q(`Tungi rejimni qanday qilish oson?`, `Rang o'zgaruvchilarini almashtirib`, [`Har bir qoidani qayta yozib`, `Iloji yo'q`], `O'zgaruvchilar bilan.`),
    Q(`:root { --a: red; } da --a nima?`, `O'zgaruvchi`, [`Klass`, `Teg`], `Custom property.`),
    Q(`var(--asosiy) yozilgan joy nimani oladi?`, `--asosiy qiymatini`, [`"asosiy" so'zini`, `Hech narsa`], `Qiymat.`),
    Q(`O'zgaruvchi nomida katta-kichik harf farqi bormi?`, `Ha`, [`Yo'q`, `Faqat rangda`], `--Asosiy va --asosiy har xil.`),
    Q(`Bir nechta o'zgaruvchi e'lon qilish mumkinmi?`, `Ha`, [`Yo'q, bittasi`, `Faqat 2 ta`], `Istalgancha.`)
  ],
  prac: P(`${c(':root')} da ${c('--asosiy')} o'zgaruvchi e'lon qiling (istalgan rang) va uni ${c('h1')} rangi hamda ${c('.tugma')} foni uchun ${c('var(--asosiy)')} bilan ishlating.`,
    `<h1>Mavzu rangi</h1>\n<button class="tugma">Tugma</button>\n`, `body {\n  font-family: sans-serif;\n  padding: 20px;\n}\n.tugma {\n  color: white;\n  border: 0;\n  padding: 10px 20px;\n  border-radius: 10px;\n}\n`,
    [[`--asosiy e'lon qilingan`, () => !!getComputedStyle(document.documentElement).getPropertyValue('--asosiy').trim()],
     [`h1 rangi --asosiy`, () => { const d = document.createElement('i'); d.style.color = getComputedStyle(document.documentElement).getPropertyValue('--asosiy').trim(); document.body.appendChild(d); const r = getComputedStyle(d).color === getComputedStyle(document.querySelector('h1')).color; d.remove(); return r; }],
     [`.tugma foni --asosiy`, () => { const d = document.createElement('i'); d.style.color = getComputedStyle(document.documentElement).getPropertyValue('--asosiy').trim(); document.body.appendChild(d); const r = getComputedStyle(d).color === getComputedStyle(document.querySelector('.tugma')).backgroundColor; d.remove(); return r; }]],
    `:root {\n  --asosiy: #7c3aed;\n}\nh1 {\n  color: var(--asosiy);\n}\n.tugma {\n  background: var(--asosiy);\n}`, `:root {\n  --asosiy: #7c3aed;\n}\nbody {\n  font-family: sans-serif;\n  padding: 20px;\n}\nh1 {\n  color: var(--asosiy);\n}\n.tugma {\n  background: var(--asosiy);\n  color: white;\n  border: 0;\n  padding: 10px 20px;\n  border-radius: 10px;\n}\n`)
},
{
  t: `Animatsiya: @keyframes`, min: 20,
  key: `@keyframes nom { from {} to {} } animatsiya bosqichlari. animation: nom 2s infinite uni elementga ulaydi.`,
  theory: `<p>${c('transition')} faqat holat o'zgarganda ishlaydi. O'zi harakatlanadigan animatsiya uchun ${c('@keyframes')} kerak:</p>
${x(`@keyframes sakrash {
  0%   { transform: translateY(0); }
  50%  { transform: translateY(-30px); }
  100% { transform: translateY(0); }
}
.top {
  animation: sakrash 1s infinite;
}`, 'css')}
<ul><li>${c('@keyframes nom')}: bosqichlar. ${c('from')} = 0%, ${c('to')} = 100%.</li><li>${c('animation: nom vaqt marta')}: ${c('infinite')} cheksiz takrorlaydi.</li><li>${c('translateY(-30px)')} 30px tepaga suradi, ${c('rotate(360deg)')} to'liq aylantiradi.</li></ul>
<div class="note">Animatsiya kam va o'rinli bo'lsin: hamma narsa qimirlasa, ko'z charchaydi.</div>`,
  quiz: [
    Q(`Animatsiya bosqichlari qaysi qoida bilan?`, `@keyframes`, [`@animation`, `@move`], `@keyframes.`),
    Q(`Animatsiyani elementga ulash?`, `animation`, [`keyframes`, `transition`], `animation xususiyati.`),
    Q(`Cheksiz takrorlash?`, `infinite`, [`forever`, `loop`], `infinite.`),
    Q(`from nimaga teng?`, `0%`, [`100%`, `50%`], `Boshlanish.`),
    Q(`to nimaga teng?`, `100%`, [`0%`, `10%`], `Tugash.`),
    Q(`Tepaga surish?`, `translateY(-30px)`, [`translateX(30px)`, `top: 30`], `Y manfiy = tepaga.`),
    Q(`To'liq aylantirish?`, `rotate(360deg)`, [`rotate(90deg)`, `spin: 1`], `360 daraja.`),
    Q(`animation: sakrash 1s infinite da 1s?`, `Bir aylanish davomiyligi`, [`Kechikish`, `Qalinlik`], `Davomiylik.`),
    Q(`transition va animation farqi?`, `animation o'zi ishlaydi, transition holat o'zgarganda`, [`Farqi yo'q`, `transition cheksiz`], `Mustaqil harakat.`),
    Q(`Animatsiyadan qanday foydalanish kerak?`, `Kam va o'rinli`, [`Hamma joyda`, `Hech qachon`], `Foydalanuvchiga qulay.`)
  ],
  prac: P(`${c('@keyframes aylanish')} yarating (${c('rotate(360deg)')} gacha) va ${c('.yulduz')} ga ${c('animation: aylanish 2s infinite')} bering.`,
    `<div class="yulduz">⭐</div>\n`, `body {\n  font-family: sans-serif;\n  padding: 40px;\n}\n.yulduz {\n  font-size: 64px;\n  width: 80px;\n  text-align: center;\n}\n`,
    [[`.yulduz da animatsiya bor`, () => getComputedStyle(document.querySelector('.yulduz')).animationName !== 'none'],
     [`Cheksiz takrorlanadi`, () => getComputedStyle(document.querySelector('.yulduz')).animationIterationCount === 'infinite'],
     [`@keyframes yozilgan`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.type === 7); } catch (e) { return false; } })]],
    `@keyframes aylanish {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.yulduz {\n  animation: aylanish 2s infinite;\n}`, `body {\n  font-family: sans-serif;\n  padding: 40px;\n}\n@keyframes aylanish {\n  from { transform: rotate(0deg); }\n  to { transform: rotate(360deg); }\n}\n.yulduz {\n  font-size: 64px;\n  width: 80px;\n  text-align: center;\n  animation: aylanish 2s infinite linear;\n}\n`)
},
{
  t: `Moslashuvchan dizayn: @media`, min: 25,
  key: `@media (max-width: 600px) { ... } ichidagi qoidalar faqat tor ekranda (telefonda) ishlaydi.`,
  theory: `<p>Sayt kompyuterda ham, telefonda ham chiroyli ko'rinishi kerak. Buning uchun <b>media so'rov</b> ishlatiladi:</p>
${x(`.kartalar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 600px) {
  .kartalar {
    grid-template-columns: 1fr;   /* telefonda bitta ustun */
  }
  h1 {
    font-size: 24px;
  }
}`, 'css')}
<ul><li>${c('max-width: 600px')}: ekran eni 600px <b>yoki kichik</b> bo'lsa.</li><li>${c('min-width: 900px')}: 900px yoki katta bo'lsa.</li><li>${c('<meta name="viewport" content="width=device-width, initial-scale=1">')} head da bo'lishi shart, aks holda telefon sahifani kichraytirib ko'rsatadi.</li></ul>
<p>Sinab ko'rish: brauzerda F12 → telefon belgisi (Toggle device toolbar).</p>`,
  quiz: [
    Q(`Telefon uchun alohida qoidalar?`, `@media (max-width: 600px)`, [`@phone`, `@mobile { }`], `Media so'rov.`),
    Q(`max-width: 600px qachon ishlaydi?`, `Ekran 600px yoki kichik bo'lsa`, [`600px dan katta bo'lsa`, `Doim`], `Eng ko'pi 600.`),
    Q(`min-width: 900px qachon?`, `900px yoki katta`, [`900 dan kichik`, `Hech qachon`], `Eng kami 900.`),
    Q(`Telefonda to'g'ri ko'rinish uchun head da nima kerak?`, `meta viewport`, [`meta phone`, `title`], `viewport.`),
    Q(`Moslashuvchan dizayn nima?`, `Har xil ekranga moslashadigan dizayn`, [`Faqat kompyuter uchun`, `Rangli dizayn`], `Responsive.`),
    Q(`Telefonda 3 ustun o'rniga nechta yaxshi?`, `1 ta`, [`6 ta`, `3 ta`], `Tor ekran.`),
    Q(`Telefon ko'rinishini kompyuterda tekshirish?`, `F12 → qurilma rejimi`, [`Ctrl+S`, `Iloji yo'q`], `Device toolbar.`),
    Q(`@media ichida nima yoziladi?`, `Oddiy CSS qoidalar`, [`HTML`, `JavaScript`], `Qoidalar.`),
    Q(`Media so'rov qoidalari qayerda yozilgani yaxshi?`, `Asosiy qoidalardan keyin`, [`Eng boshida`, `Farqi yo'q, doim`], `Keyingisi ustun bo'ladi.`),
    Q(`responsive so'zining ma'nosi?`, `Moslashuvchan`, [`Rangli`, `Tez`], `Javob beruvchi.`)
  ],
  prac: P(`${c('.kartalar')} odatda 3 ustun. ${c('@media (max-width: 600px)')} ichida uni 1 ustun (${c('1fr')}) qiling. (Natija oynasi tor bo'lsa, darhol 1 ustun ko'rasiz.)`,
    `<div class="kartalar">\n  <div class="k">1</div>\n  <div class="k">2</div>\n  <div class="k">3</div>\n</div>\n`, `body {\n  font-family: sans-serif;\n}\n.kartalar {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n.k {\n  background: #dbe6ff;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n}\n`,
    [[`@media (max-width: 600px) qoidasi bor`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.type === 4 && /max-width:\s*600px/.test(r.conditionText || r.media.mediaText)); } catch (e) { return false; } })],
     [`Uning ichida .kartalar 1 ustun`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.type === 4 && [...r.cssRules].some(q => /\.kartalar/.test(q.selectorText) && /^\s*(1fr|100%)\s*$/.test(q.style.gridTemplateColumns))); } catch (e) { return false; } })]],
    `@media (max-width: 600px) {\n  .kartalar {\n    grid-template-columns: 1fr;\n  }\n}`, `body {\n  font-family: sans-serif;\n}\n.kartalar {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}\n.k {\n  background: #dbe6ff;\n  padding: 20px;\n  border-radius: 10px;\n  text-align: center;\n}\n@media (max-width: 600px) {\n  .kartalar {\n    grid-template-columns: 1fr;\n  }\n}\n`)
},
{
  t: `Yakuniy loyiha: chiroyli profil kartasi`, min: 35,
  key: `O'rganganlarni birlashtiring: o'zgaruvchilar, flex, padding, border-radius, soya, hover va transition.`,
  theory: `<p>CSS kursini tugatdingiz! Endi hammasini bitta ishda qo'llaymiz: tayyor HTML ni zamonaviy profil kartasiga aylantirasiz.</p>
<ol><li>${c(':root')} da asosiy rang o'zgaruvchisi.</li><li>${c('body')}: fon rangi, kartani o'rtaga qo'yish uchun flex.</li><li>${c('.karta')}: oq fon, padding, yumaloq burchak, soya.</li><li>${c('.avatar')}: doira.</li><li>${c('.tugma')}: asosiy rangdagi fon, hover da o'zgaradi, transition.</li></ol>
${x(`body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
}`, 'css')}
<p>${c('100vh')}: ekran balandligining 100%. Shu bilan karta ekranning aniq o'rtasida turadi.</p>`,
  quiz: [
    Q(`100vh nima?`, `Ekran balandligining 100%`, [`100 piksel`, `100 ta element`], `viewport height.`),
    Q(`Kartani ekran o'rtasiga qo'yish?`, `body ga flex + center + min-height: 100vh`, [`text-align: center`, `margin: 100px`], `Flex markazlash.`),
    Q(`Avatarni doira qilish?`, `border-radius: 50%`, [`shape: circle`, `round: yes`], `50%.`),
    Q(`Hover da silliq o'zgarish?`, `transition`, [`animation-name`, `display`], `transition.`),
    Q(`Rang o'zgaruvchisi qayerda?`, `:root`, [`.karta`, `h1`], `Global.`),
    Q(`Karta soyasi?`, `box-shadow`, [`shadow-box`, `text-shadow`], `box-shadow.`),
    Q(`Ichki bo'shliq?`, `padding`, [`margin`, `gap`], `padding.`),
    Q(`Karta burchaklari?`, `border-radius`, [`corner`, `radius-all`], `border-radius.`),
    Q(`Tugma rangi o'zgaruvchidan?`, `background: var(--asosiy)`, [`background: --asosiy`, `color: asosiy`], `var().`),
    Q(`Keyingi kurs qaysi?`, `JavaScript`, [`Word`, `Paint`], `Endi sahifani jonlantiramiz.`)
  ],
  prac: {
    task: `Tayyor HTML ni chiroyli profil kartasiga aylantiring. Har bir talab alohida tekshiriladi.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="karta">\n  <div class="avatar">😎</div>\n  <h2>Ali Valiyev</h2>\n  <p class="kasb">Yosh dasturchi</p>\n  <div class="stat">\n    <div><b>12</b><span>loyiha</span></div>\n    <div><b>340</b><span>XP</span></div>\n    <div><b>5</b><span>sertifikat</span></div>\n  </div>\n  <button class="tugma">Kuzatish</button>\n</div>\n`,
    css: `/* Shu yerdan boshlang */\n`,
    tests: [
      [`:root da --asosiy o'zgaruvchi`, () => !!getComputedStyle(document.documentElement).getPropertyValue('--asosiy').trim()],
      [`Karta ekran o'rtasida (body flex)`, () => { const s = getComputedStyle(document.body); return s.display === 'flex' && s.justifyContent === 'center' && s.alignItems === 'center'; }],
      [`.karta: padding, radius va soya`, () => { const s = getComputedStyle(document.querySelector('.karta')); return parseFloat(s.paddingTop) >= 12 && parseFloat(s.borderTopLeftRadius) >= 8 && s.boxShadow !== 'none'; }],
      [`.avatar doira`, () => { const r = getComputedStyle(document.querySelector('.avatar')).borderTopLeftRadius; return r === '50%' || parseFloat(r) >= 30; }],
      [`.stat flex (yonma-yon)`, () => getComputedStyle(document.querySelector('.stat')).display === 'flex'],
      [`.tugma transition bilan`, () => parseFloat(getComputedStyle(document.querySelector('.tugma')).transitionDuration) > 0],
      [`.tugma:hover qoidasi bor`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /\.tugma:hover/.test(r.selectorText || '')); } catch (e) { return false; } })]
    ],
    hint: `:root { --asosiy: #2f6bff; }\nbody { display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }\n.karta { padding: 24px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }\n.avatar { border-radius: 50%; }\n.stat { display: flex; }\n.tugma { transition: background .3s; }\n.tugma:hover { ... }`,
    sol: { css: `:root {\n  --asosiy: #2f6bff;\n}\nbody {\n  font-family: system-ui, sans-serif;\n  background: #eef2fa;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 100vh;\n  margin: 0;\n}\n.karta {\n  background: white;\n  width: 280px;\n  padding: 28px;\n  border-radius: 20px;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);\n}\n.avatar {\n  width: 90px;\n  height: 90px;\n  margin: 0 auto;\n  border-radius: 50%;\n  background: #dbe6ff;\n  font-size: 48px;\n  line-height: 90px;\n}\nh2 {\n  margin: 12px 0 4px;\n}\n.kasb {\n  color: gray;\n  margin: 0 0 16px;\n}\n.stat {\n  display: flex;\n  justify-content: space-around;\n  margin-bottom: 18px;\n}\n.stat b {\n  display: block;\n  font-size: 20px;\n  color: var(--asosiy);\n}\n.stat span {\n  font-size: 13px;\n  color: gray;\n}\n.tugma {\n  background: var(--asosiy);\n  color: white;\n  border: 0;\n  padding: 10px 28px;\n  border-radius: 999px;\n  font-size: 16px;\n  cursor: pointer;\n  transition: background 0.3s, transform 0.3s;\n}\n.tugma:hover {\n  background: #1f4fd6;\n  transform: scale(1.05);\n}\n` }
  }
}
]});
}
