/* Tayyor namunaviy loyihalar: har birida jonli namuna (demo), qadamlar rejasi, 5 ta test va o'quvchi o'zi yasaydigan avtomatik tekshiriladigan topshiriq. */
{
const x = KM.x, c = KM.c, Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
const steps = a => '<h3>Qadamlar</h3><ol>' + a.map(s => '<li>' + s + '</li>').join('') + '</ol>';
KM.kurs({ n: 'loyiha', o: 4, stage: 'yuqori', free: true, ic: '★', t: 'Loyihalar', d: `12 ta tayyor namuna: avval natijani ko'rasiz, keyin o'zingiz qadamma-qadam yasaysiz.`, lessons: [
{
  t: `Vizitka karta`, min: 30, demo: true, lvl: 'HTML + CSS',
  key: `Kichik loyiha ham to'liq dizayn: markazlash, doira rasm, soya va tugmalar.`,
  theory: `<p><b>Daraja:</b> boshlang'ich · HTML + CSS. Yuqorida tayyor natija: o'zingiz haqingizda kichik elektron vizitka. Uni telefonda ham ko'rsatish mumkin.</p>
${steps([`HTML: ${c('.karta')} ichida avatar, ism (${c('h2')}), kasb va ikkita havola.`, `CSS: ${c('body')} ni flex bilan kartani o'rtaga qo'ying.`, `${c('.karta')}: oq fon, padding, yumaloq burchak, soya.`, `${c('.avatar')}: doira.`, `Havolalar tugma ko'rinishida, hover bilan.`])}`,
  quiz: [
    Q(`Kartani ekran o'rtasiga qo'yish?`, `body: display:flex; justify-content:center; align-items:center`, [`text-align: center`, `margin: 50px`], `Flex markazlash.`),
    Q(`Doira avatar?`, `border-radius: 50%`, [`border: circle`, `radius: full`], `50%.`),
    Q(`Ism uchun qaysi teg?`, `<h2>`, [`<li>`, `<td>`], `Sarlavha.`),
    Q(`Havolani tugmaga o'xshatish?`, `padding, fon, border-radius`, [`Faqat color`, `display: none`], `Quti uslubi.`),
    Q(`Soya?`, `box-shadow`, [`shadow`, `text-shadow`], `box-shadow.`)
  ],
  prac: {
    task: `Namunadagi kabi vizitka yasang. HTML ning bir qismi tayyor, CSS ni siz yozasiz.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<div class="karta">\n  <div class="avatar">👩‍💻</div>\n  <h2>Ismingiz</h2>\n  <p class="kasb">Yosh dasturchi · 7-sinf</p>\n  <!-- 2 ta havola qo'shing: class="tugma" -->\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n}\n`,
    tests: [
      [`Kamida 2 ta a.tugma havola`, () => document.querySelectorAll('.karta a.tugma').length >= 2],
      [`Karta ekran o'rtasida (body flex, center)`, () => { const s = getComputedStyle(document.body); return s.display === 'flex' && s.justifyContent === 'center' && s.alignItems === 'center'; }],
      [`.karta: padding, radius, soya`, () => { const s = getComputedStyle(document.querySelector('.karta')); return parseFloat(s.paddingTop) >= 12 && parseFloat(s.borderTopLeftRadius) >= 8 && s.boxShadow !== 'none'; }],
      [`.avatar doira`, () => { const r = getComputedStyle(document.querySelector('.avatar')).borderTopLeftRadius; return r === '50%' || parseFloat(r) >= 30; }],
      [`.tugma ga fon rangi`, () => getComputedStyle(document.querySelector('.tugma')).backgroundColor !== 'rgba(0, 0, 0, 0)']
    ],
    hint: `body { display: flex; justify-content: center; align-items: center; min-height: 100vh; }\n.karta { padding: 28px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.12); }\n.avatar { border-radius: 50%; }\n.tugma { background: #2f6bff; color: white; padding: 8px 16px; border-radius: 999px; }`,
    sol: {
      html: `<div class="karta">\n  <div class="avatar">👩‍💻</div>\n  <h2>Malika Karimova</h2>\n  <p class="kasb">Yosh dasturchi · 7-sinf</p>\n  <a class="tugma" href="#">Telegram</a>\n  <a class="tugma ikkinchi" href="#">Loyihalarim</a>\n</div>\n`,
      css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background: linear-gradient(135deg, #dbe6ff, #fde2f3);\n}\n.karta {\n  background: white;\n  width: 260px;\n  padding: 28px;\n  border-radius: 22px;\n  text-align: center;\n  box-shadow: 0 12px 32px rgba(15, 27, 51, 0.15);\n}\n.avatar {\n  width: 96px;\n  height: 96px;\n  margin: 0 auto;\n  border-radius: 50%;\n  background: #eef3ff;\n  font-size: 52px;\n  line-height: 96px;\n}\nh2 {\n  margin: 14px 0 4px;\n}\n.kasb {\n  color: #667;\n  margin: 0 0 18px;\n}\n.tugma {\n  display: inline-block;\n  background: #2f6bff;\n  color: white;\n  text-decoration: none;\n  padding: 8px 16px;\n  border-radius: 999px;\n  margin: 4px;\n  transition: transform 0.2s;\n}\n.tugma:hover {\n  transform: translateY(-2px);\n}\n.ikkinchi {\n  background: #0f1b33;\n}\n`
    }
  }
},
{
  t: `Retsept sahifasi`, min: 30, demo: true, lvl: 'HTML + CSS',
  key: `Haqiqiy maqola sahifasi: sarlavha, rasm, ro'yxatlar, jadval va qulay o'qiladigan matn.`,
  theory: `<p><b>Daraja:</b> boshlang'ich · HTML + CSS. Sevimli taomingiz retsepti: masalliqlar ro'yxati, tayyorlash qadamlari va oziq-ovqat qiymati jadvali.</p>
${steps([`${c('header')}: taom nomi va qisqa tavsif.`, `${c('section')} "Masalliqlar": ${c('ul')} ro'yxat (kamida 4 band).`, `${c('section')} "Tayyorlash": ${c('ol')} qadamlar (kamida 3 ta).`, `Jadval: tayyorlash vaqti, porsiya soni.`, `CSS: sahifa eni ${c('max-width')} bilan cheklanib, markazda; o'qishga qulay ${c('line-height')}.`])}`,
  quiz: [
    Q(`Masalliqlar uchun qaysi ro'yxat?`, `<ul>`, [`<ol>`, `<table>`], `Tartib muhim emas.`),
    Q(`Tayyorlash qadamlari uchun?`, `<ol>`, [`<ul>`, `<br>`], `Tartib muhim.`),
    Q(`Matn juda keng bo'lib ketmasligi uchun?`, `max-width`, [`font-size`, `color`], `Qator uzunligi cheklanadi.`),
    Q(`Sahifani markazga?`, `margin: 0 auto`, [`text-align: center`, `align: middle`], `Quti markazi.`),
    Q(`O'qishga qulay qator oralig'i?`, `line-height: 1.6`, [`line-height: 0.5`, `line-height: 5`], `1.5–1.7.`)
  ],
  prac: {
    task: `O'zingizning sevimli taomingiz retseptini yozing va bezang.`,
    tabs: ['html', 'css'], open: 'html',
    html: `<header>\n  <h1>Taom nomi</h1>\n</header>\n<main>\n  <!-- section: Masalliqlar (ul) -->\n  <!-- section: Tayyorlash (ol) -->\n  <!-- table: vaqt va porsiya -->\n</main>\n`,
    css: `body {\n  font-family: Georgia, serif;\n}\n`,
    tests: [
      [`h1 da taom nomi`, () => { const h = document.querySelector('h1'); return !!h && h.textContent.trim() && h.textContent.trim() !== 'Taom nomi'; }],
      [`ul da kamida 4 ta masalliq`, () => [...document.querySelectorAll('main ul')].some(u => u.querySelectorAll('li').length >= 4)],
      [`ol da kamida 3 ta qadam`, () => [...document.querySelectorAll('main ol')].some(u => u.querySelectorAll('li').length >= 3)],
      [`Jadval (kamida 2 qator)`, () => document.querySelectorAll('main table tr').length >= 2],
      [`main: max-width va margin auto (markazda)`, () => getComputedStyle(document.querySelector('main')).maxWidth !== 'none' && [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /main/.test(r.selectorText || '') && r.style.marginLeft === 'auto'); } catch (e) { return false; } })],
      [`line-height ≥ 1.4`, () => { const s = getComputedStyle(document.querySelector('main li') || document.body); return parseFloat(s.lineHeight) / parseFloat(s.fontSize) >= 1.4; }]
    ],
    hint: `main {\n  max-width: 640px;\n  margin: 0 auto;\n  line-height: 1.6;\n}`,
    sol: {
      html: `<header>\n  <h1>🍲 Toshkent oshi</h1>\n  <p>Bayramlar va mehmonlar uchun eng mazali taom.</p>\n</header>\n<main>\n  <section>\n    <h2>Masalliqlar</h2>\n    <ul>\n      <li>Guruch: 1 kg</li>\n      <li>Go'sht: 700 g</li>\n      <li>Sabzi: 1 kg</li>\n      <li>Piyoz: 2 dona</li>\n      <li>Yog': 200 ml</li>\n    </ul>\n  </section>\n  <section>\n    <h2>Tayyorlash</h2>\n    <ol>\n      <li>Qozonda yog'ni qizdiring, go'shtni qovuring.</li>\n      <li>Piyoz va sabzini qo'shib zirvak tayyorlang.</li>\n      <li>Guruchni soling, suv quying va dam bering.</li>\n    </ol>\n  </section>\n  <table>\n    <tr><th>Vaqt</th><td>1,5 soat</td></tr>\n    <tr><th>Porsiya</th><td>6 kishi</td></tr>\n  </table>\n</main>\n`,
      css: `body {\n  font-family: Georgia, serif;\n  background: #fffaf0;\n  color: #2b2118;\n  margin: 0;\n}\nheader {\n  background: #e85d04;\n  color: white;\n  text-align: center;\n  padding: 28px 16px;\n}\nheader h1 {\n  margin: 0;\n}\nmain {\n  max-width: 640px;\n  margin: 0 auto;\n  padding: 16px;\n  line-height: 1.6;\n}\nh2 {\n  color: #e85d04;\n  border-bottom: 2px solid #ffd8a8;\n}\ntable {\n  border-collapse: collapse;\n}\nth, td {\n  border: 1px solid #ffd8a8;\n  padding: 6px 14px;\n  text-align: left;\n}\n`
    }
  }
},
{
  t: `Mahsulot kartochkalari`, min: 35, demo: true, lvl: 'HTML + CSS · Flexbox',
  key: `Internet-do'kon uslubi: flex + wrap kartalar, narx, chegirma yorlig'i va hover effekti.`,
  theory: `<p><b>Daraja:</b> o'rta · Flexbox. Internet-do'kondagi kabi mahsulot kartalari: rasm (emoji), nom, narx va "Savatga" tugmasi.</p>
${steps([`${c('.dokon')} ichida kamida 4 ta ${c('.mahsulot')}.`, `${c('.dokon')}: ${c('display:flex; flex-wrap:wrap; gap')}.`, `${c('.mahsulot')}: ${c('flex: 1 1 160px')}, oq fon, radius, soya.`, `Chegirmali mahsulotga ${c('position:absolute')} "−20%" yorlig'i (karta ${c('relative')}).`, `Hover: karta biroz ko'tariladi (${c('transform: translateY(-4px)')}).`])}`,
  quiz: [
    Q(`Kartalar keyingi qatorga o'tishi?`, `flex-wrap: wrap`, [`flex-wrap: nowrap`, `display: block`], `wrap.`),
    Q(`Yorliqni burchakka qo'yish?`, `Karta relative, yorliq absolute`, [`Ikkalasi fixed`, `float: right`], `Langar.`),
    Q(`Hover da ko'tarish?`, `transform: translateY(-4px)`, [`top: -4px`, `margin: -4`], `transform.`),
    Q(`Kartalar orasi?`, `gap`, [`padding`, `border`], `gap.`),
    Q(`Eski narxni chizish?`, `text-decoration: line-through`, [`text-decoration: none`, `font: strike`], `line-through.`)
  ],
  prac: {
    task: `Do'kon sahifasini yasang. HTML tayyor, CSS ni siz yozasiz.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1>🛒 ZIS do'koni</h1>\n<div class="dokon">\n  <div class="mahsulot"><span class="belgi">−20%</span><div class="rasm">🎒</div><h3>Ryukzak</h3><p><s>250 000</s> <b>200 000 so'm</b></p><button>Savatga</button></div>\n  <div class="mahsulot"><div class="rasm">📚</div><h3>Daftar to'plami</h3><p><b>45 000 so'm</b></p><button>Savatga</button></div>\n  <div class="mahsulot"><div class="rasm">✏️</div><h3>Qalamlar</h3><p><b>18 000 so'm</b></p><button>Savatga</button></div>\n  <div class="mahsulot"><div class="rasm">🎧</div><h3>Quloqchin</h3><p><b>120 000 so'm</b></p><button>Savatga</button></div>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  background: #f2f4f8;\n  padding: 16px;\n}\n.rasm {\n  font-size: 56px;\n  text-align: center;\n}\n`,
    tests: [
      [`.dokon flex + wrap`, () => { const s = getComputedStyle(document.querySelector('.dokon')); return s.display === 'flex' && s.flexWrap === 'wrap'; }],
      [`.dokon da gap`, () => parseFloat(getComputedStyle(document.querySelector('.dokon')).columnGap) > 0],
      [`.mahsulot oq fon va radius`, () => { const s = getComputedStyle(document.querySelector('.mahsulot')); return s.backgroundColor === 'rgb(255, 255, 255)' && parseFloat(s.borderTopLeftRadius) >= 6; }],
      [`.mahsulot relative, .belgi absolute`, () => getComputedStyle(document.querySelector('.mahsulot')).position === 'relative' && getComputedStyle(document.querySelector('.belgi')).position === 'absolute'],
      [`.mahsulot:hover qoidasi`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => /\.mahsulot:hover/.test(r.selectorText || '')); } catch (e) { return false; } })]
    ],
    hint: `.dokon { display: flex; flex-wrap: wrap; gap: 16px; }\n.mahsulot { flex: 1 1 160px; background: white; border-radius: 14px; position: relative; }\n.belgi { position: absolute; top: 10px; left: 10px; }\n.mahsulot:hover { transform: translateY(-4px); }`,
    sol: { css: `body {\n  font-family: system-ui, sans-serif;\n  background: #f2f4f8;\n  padding: 16px;\n}\n.rasm {\n  font-size: 56px;\n  text-align: center;\n}\n.dokon {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 16px;\n}\n.mahsulot {\n  flex: 1 1 160px;\n  background: white;\n  border-radius: 16px;\n  padding: 16px;\n  position: relative;\n  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.mahsulot:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);\n}\n.mahsulot h3 {\n  margin: 8px 0 4px;\n}\n.mahsulot s {\n  color: #999;\n}\n.belgi {\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  background: crimson;\n  color: white;\n  font-size: 13px;\n  padding: 3px 9px;\n  border-radius: 999px;\n}\n.mahsulot button {\n  width: 100%;\n  border: 0;\n  background: #2f6bff;\n  color: white;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 15px;\n  cursor: pointer;\n}\n` }
  }
},
{
  t: `Fotogalereya`, min: 30, demo: true, lvl: 'HTML + CSS · Grid',
  key: `CSS Grid bilan galereya: teng ustunlar, katta rasm 2 ustunda, telefonda moslashadi.`,
  theory: `<p><b>Daraja:</b> o'rta · Grid va @media. Rasmlar to'ri: kompyuterda 3 ustun, telefonda 1 ustun. Rasm o'rniga rangli emoji kartalar ishlatamiz.</p>
${steps([`${c('.galereya')}: ${c('display:grid; grid-template-columns: repeat(3, 1fr); gap')}.`, `${c('.katta')} rasm ${c('grid-column: span 2')}.`, `Har ${c('.rasm')}: yumaloq burchak, markazdagi emoji.`, `Hover: ${c('transform: scale(1.03)')}.`, `${c('@media (max-width: 600px)')}: 1 ustun.`])}`,
  quiz: [
    Q(`3 ta teng ustun?`, `repeat(3, 1fr)`, [`3fr`, `1fr 3`], `repeat.`),
    Q(`2 ustunli rasm?`, `grid-column: span 2`, [`width: 2`, `colspan="2"`], `span.`),
    Q(`Telefonda 1 ustun?`, `@media (max-width: 600px) { grid-template-columns: 1fr }`, [`display: none`, `font-size: 1fr`], `Media so'rov.`),
    Q(`Kattalashtirish effekti?`, `transform: scale(1.03)`, [`zoom: 3`, `size: big`], `scale.`),
    Q(`Grid va Flex farqi?`, `Grid ikki o'lchamli to'r`, [`Farqi yo'q`, `Flex to'r yasaydi`], `2D.`)
  ],
  prac: {
    task: `Galereya uchun CSS yozing.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<h1>📷 Sayohat albomi</h1>\n<div class="galereya">\n  <div class="rasm katta" style="background:#ffe8cc">🏔️</div>\n  <div class="rasm" style="background:#d3f9d8">🌲</div>\n  <div class="rasm" style="background:#d0ebff">🌊</div>\n  <div class="rasm" style="background:#fff3bf">🌻</div>\n  <div class="rasm" style="background:#f3d9fa">🌸</div>\n  <div class="rasm" style="background:#ffe3e3">🍎</div>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n}\n`,
    tests: [
      [`.galereya grid, 3 ustun`, () => { const s = getComputedStyle(document.querySelector('.galereya')); return s.display === 'grid' && (innerWidth <= 600 || s.gridTemplateColumns.split(' ').length === 3); }],
      [`gap bor`, () => parseFloat(getComputedStyle(document.querySelector('.galereya')).columnGap) > 0],
      [`.katta 2 ustun`, () => /span 2/.test(getComputedStyle(document.querySelector('.katta')).gridColumnStart + ' ' + getComputedStyle(document.querySelector('.katta')).gridColumnEnd)],
      [`.rasm yumaloq burchakli`, () => parseFloat(getComputedStyle(document.querySelector('.rasm')).borderTopLeftRadius) >= 6],
      [`@media (max-width: 600px) da 1 ustun`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.type === 4 && /max-width/.test(r.media.mediaText) && [...r.cssRules].some(q => /\.galereya/.test(q.selectorText) && /^\s*(1fr|100%)\s*$/.test(q.style.gridTemplateColumns))); } catch (e) { return false; } })]
    ],
    hint: `.galereya { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }\n.katta { grid-column: span 2; }\n.rasm { border-radius: 14px; }\n@media (max-width: 600px) {\n  .galereya { grid-template-columns: 1fr; }\n}`,
    sol: { css: `body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n}\n.galereya {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 12px;\n}\n.rasm {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  font-size: 54px;\n  min-height: 120px;\n  border-radius: 16px;\n  transition: transform 0.2s;\n}\n.rasm:hover {\n  transform: scale(1.03);\n}\n.katta {\n  grid-column: span 2;\n}\n@media (max-width: 600px) {\n  .galereya {\n    grid-template-columns: 1fr;\n  }\n  .katta {\n    grid-column: auto;\n  }\n}\n` }
  }
},
{
  t: `Lending sahifa (sayt bosh sahifasi)`, min: 45, demo: true, lvl: 'HTML + CSS · to\'liq sahifa',
  key: `Haqiqiy sayt tuzilishi: menyu, katta sarlavha bloki (hero), afzalliklar to'ri va footer.`,
  theory: `<p><b>Daraja:</b> o'rta · to'liq sahifa. To'garak yoki maktab uchun bir sahifali sayt.</p>
${steps([`${c('header')}: chapda logo, o'ngda ${c('nav')} (flex + space-between).`, `${c('.hero')}: katta sarlavha, matn va tugma, gradient fon.`, `${c('.afzallik')} lar: grid, 3 ta karta.`, `${c('footer')}: qorong'i fon, markazdagi matn.`, `Telefonda menyu va kartalar ustunga tushsin (${c('@media')}).`])}`,
  quiz: [
    Q(`Logo chapda, menyu o'ngda?`, `justify-content: space-between`, [`center`, `flex-start`], `Chetlarga.`),
    Q(`Hero nima?`, `Sahifa boshidagi katta e'tiborli blok`, [`Footer`, `Rasm formati`], `Asosiy taklif.`),
    Q(`Afzalliklar uchun 3 ustun?`, `grid-template-columns: repeat(3, 1fr)`, [`columns: 3px`, `flex: 3`], `Grid.`),
    Q(`Sahifa pastki qismi?`, `<footer>`, [`<bottom>`, `<nav>`], `footer.`),
    Q(`Telefonda kartalar 1 ustun bo'lishi uchun?`, `@media`, [`@phone`, `JS`], `Media so'rov.`)
  ],
  prac: {
    task: `Lending sahifa yasang. HTML skeleti tayyor, ichini to'ldiring va bezang.`,
    tabs: ['html', 'css'], open: 'css',
    html: `<header>\n  <b class="logo">ZIS Kod</b>\n  <nav><a href="#">Kurslar</a> <a href="#">Loyihalar</a> <a href="#">Aloqa</a></nav>\n</header>\n<section class="hero">\n  <h1>Dasturlashni o'rgan!</h1>\n  <p>HTML, CSS va JavaScript: noldan birinchi saytingizgacha.</p>\n  <a class="tugma" href="#">Boshlash</a>\n</section>\n<section class="afzalliklar">\n  <div class="afzallik"><h3>🧩 Oson</h3><p>Har dars 15 daqiqa.</p></div>\n  <div class="afzallik"><h3>⚡ Amaliy</h3><p>Kod darhol tekshiriladi.</p></div>\n  <div class="afzallik"><h3>🏆 Sertifikat</h3><p>Kurs oxirida.</p></div>\n</section>\n<footer>© 2026 ZIS ProStudent</footer>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n}\n`,
    tests: [
      [`header flex, space-between`, () => { const s = getComputedStyle(document.querySelector('header')); return s.display === 'flex' && s.justifyContent === 'space-between'; }],
      [`.hero gradient fon va markazdagi matn`, () => { const s = getComputedStyle(document.querySelector('.hero')); return /gradient/.test(s.backgroundImage) && s.textAlign === 'center'; }],
      [`.hero da h1 kamida 36px`, () => parseFloat(getComputedStyle(document.querySelector('.hero h1')).fontSize) >= 36],
      [`.afzalliklar grid`, () => getComputedStyle(document.querySelector('.afzalliklar')).display === 'grid'],
      [`footer qorong'i fon`, () => { const m = getComputedStyle(document.querySelector('footer')).backgroundColor.match(/\d+/g).map(Number); return m[0] + m[1] + m[2] < 200 && (m[3] === undefined || m[3] > 0); }],
      [`@media qoidasi bor`, () => [...document.styleSheets].some(s => { try { return [...s.cssRules].some(r => r.type === 4); } catch (e) { return false; } })]
    ],
    hint: `header { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; }\n.hero { background: linear-gradient(135deg, #2f6bff, #7c3aed); color: white; text-align: center; padding: 60px 20px; }\n.hero h1 { font-size: 44px; }\n.afzalliklar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; padding: 30px 20px; }\nfooter { background: #0f1b33; color: white; text-align: center; padding: 20px; }\n@media (max-width: 600px) { .afzalliklar { grid-template-columns: 1fr; } }`,
    sol: { css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  color: #0f1b33;\n}\nheader {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 14px 20px;\n}\n.logo {\n  font-size: 22px;\n  color: #2f6bff;\n}\nnav a {\n  color: #0f1b33;\n  text-decoration: none;\n  margin-left: 16px;\n}\n.hero {\n  background: linear-gradient(135deg, #2f6bff, #7c3aed);\n  color: white;\n  text-align: center;\n  padding: 64px 20px;\n}\n.hero h1 {\n  font-size: 44px;\n  margin: 0 0 10px;\n}\n.tugma {\n  display: inline-block;\n  margin-top: 14px;\n  background: white;\n  color: #2f6bff;\n  padding: 12px 28px;\n  border-radius: 999px;\n  text-decoration: none;\n  font-weight: bold;\n}\n.afzalliklar {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 16px;\n  padding: 32px 20px;\n}\n.afzallik {\n  background: #f2f4f8;\n  border-radius: 16px;\n  padding: 18px;\n}\nfooter {\n  background: #0f1b33;\n  color: white;\n  text-align: center;\n  padding: 20px;\n}\n@media (max-width: 600px) {\n  header {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .afzalliklar {\n    grid-template-columns: 1fr;\n  }\n}\n` }
  }
},
{
  t: `Hisoblagich`, min: 25, demo: true, lvl: 'JavaScript · boshlang\'ich',
  key: `Eng birinchi interaktiv ilova: o'zgaruvchi + tugma hodisasi + DOM.`,
  theory: `<p><b>Daraja:</b> boshlang'ich · JavaScript. Uchta tugma: ${c('+')}, ${c('−')} va "Nol". Son ekranda katta bo'lib turadi, manfiy bo'lsa qizil rangga kiradi.</p>
${steps([`${c('let son = 0')}.`, `${c('function yangila()')}: ${c('#son')} matnini o'zgartiradi, ${c('son < 0')} bo'lsa ${c('manfiy')} klassini qo'shadi.`, `${c('#plus')}: ${c('son++')} va ${c('yangila()')}.`, `${c('#minus')}: ${c('son--')}.`, `${c('#nol')}: ${c('son = 0')}.`])}`,
  quiz: [
    Q(`Sonni saqlash uchun?`, `let son = 0`, [`const son = 0`, `son: 0`], `O'zgaradi, shuning uchun let.`),
    Q(`Ekrandagi sonni yangilash?`, `el.textContent = son`, [`console.log(son)`, `son.show()`], `DOM.`),
    Q(`Manfiy bo'lsa klass qo'shish/olish?`, `classList.toggle("manfiy", son < 0)`, [`style = manfiy`, `if manfiy`], `toggle ikkinchi parametr bilan.`),
    Q(`Tugmaga hodisa?`, `addEventListener("click", ...)`, [`onload`, `onhover`], `click.`),
    Q(`Nima uchun yangila() funksiyasi?`, `Bir xil kodni 3 marta yozmaslik uchun`, [`Shart emas`, `Rang uchun`], `Qayta ishlatish.`)
  ],
  prac: {
    task: `Hisoblagichni JavaScript bilan jonlantiring.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="quti">\n  <h1 id="son">0</h1>\n  <button id="minus">−</button>\n  <button id="nol">Nol</button>\n  <button id="plus">+</button>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  display: flex;\n  justify-content: center;\n  padding-top: 40px;\n}\n.quti {\n  text-align: center;\n}\n#son {\n  font-size: 96px;\n  margin: 0 0 16px;\n}\n#son.manfiy {\n  color: crimson;\n}\nbutton {\n  font-size: 24px;\n  min-width: 64px;\n  padding: 10px 16px;\n  border-radius: 12px;\n  border: 0;\n  background: #2f6bff;\n  color: white;\n  cursor: pointer;\n}\n#nol {\n  background: #667;\n}\n`,
    js: `let son = 0;\n\n// yangila() funksiyasi va 3 ta tugma\n`,
    tests: [
      [`+ bosilsa 1`, () => { document.querySelector('#plus').click(); return document.querySelector('#son').textContent.trim() === '1'; }],
      [`Yana + va − → 1`, () => { document.querySelector('#plus').click(); document.querySelector('#minus').click(); return document.querySelector('#son').textContent.trim() === '1'; }],
      [`Nol → 0`, () => { document.querySelector('#nol').click(); return document.querySelector('#son').textContent.trim() === '0'; }],
      [`Manfiyda .manfiy klassi`, () => { document.querySelector('#nol').click(); document.querySelector('#minus').click(); const ok = document.querySelector('#son').classList.contains('manfiy'); document.querySelector('#plus').click(); return ok && !document.querySelector('#son').classList.contains('manfiy'); }]
    ],
    hint: `function yangila() {\n  const el = document.querySelector("#son");\n  el.textContent = son;\n  el.classList.toggle("manfiy", son < 0);\n}\ndocument.querySelector("#plus").addEventListener("click", () => { son++; yangila(); });`,
    sol: { js: `let son = 0;\nconst el = document.querySelector("#son");\n\nfunction yangila() {\n  el.textContent = son;\n  el.classList.toggle("manfiy", son < 0);\n}\n\ndocument.querySelector("#plus").addEventListener("click", () => {\n  son++;\n  yangila();\n});\ndocument.querySelector("#minus").addEventListener("click", () => {\n  son--;\n  yangila();\n});\ndocument.querySelector("#nol").addEventListener("click", () => {\n  son = 0;\n  yangila();\n});\n` }
  }
},
{
  t: `Tasodifiy rang generatori`, min: 25, demo: true, lvl: 'JavaScript · boshlang\'ich',
  key: `Math.random bilan RGB rang yasash, fonni o'zgartirish va rang kodini ko'rsatish.`,
  theory: `<p><b>Daraja:</b> boshlang'ich · JavaScript. Tugma bosilganda sahifa foni tasodifiy rangga kiradi, rang kodi ekranda chiqadi. Dizaynerlar shunday ilovalardan rang tanlashda foydalanadi.</p>
${steps([`${c('function son255()')}: 0..255 tasodifiy butun son.`, `${c('function tasodifiyRang()')}: ${c('"rgb(r, g, b)"')} matnini qaytaradi.`, `Tugma bosilganda: ${c('document.body.style.background')} ga rang, ${c('#kod')} ga matn.`])}`,
  quiz: [
    Q(`0..255 butun son?`, `Math.floor(Math.random() * 256)`, [`Math.random() * 255`, `Math.floor(Math.random() * 255) + 1`], `256 ga ko'paytirib pastga.`),
    Q(`RGB rang matni?`, `"rgb(10, 200, 30)"`, [`"10, 200, 30"`, `"#rgb"`], `rgb(...).`),
    Q(`Sahifa fonini o'zgartirish?`, `document.body.style.background = rang`, [`body.color = rang`, `css.background(rang)`], `style.`),
    Q(`Funksiya rangni qanday beradi?`, `return`, [`console.log`, `alert`], `Qaytaradi.`),
    Q(`Har bosishda rang boshqa bo'ladimi?`, `Ha, Math.random sababli`, [`Yo'q`, `Faqat 3 marta`], `Tasodif.`)
  ],
  prac: {
    task: `Ikkita funksiya yozing va tugmaga ulang.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="quti">\n  <h1>🎨 Rang generatori</h1>\n  <p id="kod">rgb(255, 255, 255)</p>\n  <button id="tugma">Yangi rang</button>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  transition: background 0.4s;\n}\n.quti {\n  background: white;\n  padding: 24px 32px;\n  border-radius: 20px;\n  text-align: center;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);\n}\n#kod {\n  font-family: monospace;\n  font-size: 20px;\n}\nbutton {\n  font-size: 18px;\n  padding: 10px 20px;\n  border-radius: 999px;\n  border: 0;\n  background: #0f1b33;\n  color: white;\n}\n`,
    js: `function son255() {\n\n}\n\nfunction tasodifiyRang() {\n\n}\n\n// tugma\n`,
    tests: [
      [`son255() 0..255 butun`, () => { for (let k = 0; k < 400; k++) { const v = son255(); if (!Number.isInteger(v) || v < 0 || v > 255) return false; } return true; }],
      [`tasodifiyRang() "rgb(r, g, b)" ko'rinishida`, () => /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(tasodifiyRang())],
      [`Tugma fonni o'zgartiradi va kodni yozadi`, () => { document.querySelector('#tugma').click(); const k = document.querySelector('#kod').textContent.trim(); return /^rgb\(/.test(k) && document.body.style.background.replace(/\s/g, '').includes(k.replace(/\s/g, '').replace(/\)$/, '')); }]
    ],
    hint: `function son255() { return Math.floor(Math.random() * 256); }\nfunction tasodifiyRang() { return "rgb(" + son255() + ", " + son255() + ", " + son255() + ")"; }`,
    sol: { js: `function son255() {\n  return Math.floor(Math.random() * 256);\n}\n\nfunction tasodifiyRang() {\n  return "rgb(" + son255() + ", " + son255() + ", " + son255() + ")";\n}\n\ndocument.querySelector("#tugma").addEventListener("click", () => {\n  const rang = tasodifiyRang();\n  document.body.style.background = rang;\n  document.querySelector("#kod").textContent = rang;\n});\n` }
  }
},
{
  t: `Vazifalar ro'yxati (To-do)`, min: 40, demo: true, lvl: 'JavaScript · o\'rta',
  key: `Haqiqiy ilova: element yaratish, belgilash (toggle) va o'chirish.`,
  theory: `<p><b>Daraja:</b> o'rta · JavaScript DOM. Vazifa yozasiz, "Qo'shish" bosasiz, ro'yxatga tushadi. Vazifani bossangiz bajarildi deb chiziladi, ✕ bilan o'chiriladi.</p>
${steps([`${c('function qosh(matn)')}: ${c('li')} yaratadi, ichiga matn va ✕ tugma (${c('button.ochir')}) qo'yadi, ${c('#royxat')} ga qo'shadi.`, `${c('li')} bosilganda ${c('classList.toggle("bajarildi")')}.`, `✕ bosilganda ${c('li.remove()')} (va ${c('e.stopPropagation()')}, toggle ishlamasligi uchun).`, `"Qo'shish" tugmasi bosilganda yoki maydonda Enter bosilganda (${c('keydown')}, ${c('e.key === "Enter"')}): bo'sh bo'lmasa ${c('qosh')}, maydonni tozalash.`, `${c('#soni')}: nechta vazifa qolgani.`])}`,
  quiz: [
    Q(`Yangi vazifa elementi?`, `document.createElement("li")`, [`new li()`, `li.create()`], `createElement.`),
    Q(`Bajarildi belgisi?`, `classList.toggle("bajarildi")`, [`li.done = true`, `style = done`], `toggle.`),
    Q(`O'chirish?`, `li.remove()`, [`li.delete()`, `li = null`], `remove.`),
    Q(`✕ bosilganda li ham toggle bo'lmasligi uchun?`, `e.stopPropagation()`, [`return false`, `break`], `Hodisa yuqoriga ko'tarilmaydi.`),
    Q(`Bo'sh vazifa qo'shilmasligi uchun?`, `if (matn.trim() === "") return`, [`while`, `Tekshirish shart emas`], `Tekshirish.`)
  ],
  prac: {
    task: `To-do ilovasini yasang. HTML va CSS tayyor.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="ilova">\n  <h1>✅ Vazifalar</h1>\n  <div class="forma">\n    <input id="matn" placeholder="Masalan: matematika uy vazifasi" autocomplete="off">\n    <button id="qoshBtn">Qo'shish</button>\n  </div>\n  <ul id="royxat"></ul>\n  <p class="muted">Qoldi: <b id="soni">0</b></p>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  background: #eef2fa;\n  display: flex;\n  justify-content: center;\n  padding-top: 30px;\n}\n.ilova {\n  background: white;\n  width: 340px;\n  padding: 20px;\n  border-radius: 18px;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);\n}\n.forma {\n  display: flex;\n  gap: 8px;\n}\ninput {\n  flex: 1;\n  padding: 8px;\n  border: 1px solid #ccd;\n  border-radius: 8px;\n}\nul {\n  list-style: none;\n  padding: 0;\n}\nli {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 10px;\n  border-bottom: 1px solid #eef;\n  cursor: pointer;\n}\nli.bajarildi {\n  text-decoration: line-through;\n  color: #999;\n}\n.ochir {\n  border: 0;\n  background: none;\n  color: crimson;\n  font-size: 16px;\n  cursor: pointer;\n}\n.muted {\n  color: #667;\n}\n`,
    js: `const royxat = document.querySelector("#royxat");\n\nfunction qosh(matn) {\n  // li, matn, button.ochir\n}\n\nfunction sana() {\n  // #soni = bajarilmagan li lar soni\n}\n\n// #qoshBtn bosilganda va #matn da Enter bosilganda\n`,
    tests: [
      [`qosh("...") yangi li qo'shadi`, () => { const n = document.querySelectorAll('#royxat li').length; qosh('Kitob o\'qish'); const l = document.querySelectorAll('#royxat li'); return l.length === n + 1 && l[l.length - 1].textContent.includes('Kitob'); }],
      [`li ichida button.ochir`, () => !!document.querySelector('#royxat li button.ochir')],
      [`Tugma orqali qo'shish va maydon tozalanadi`, () => { const n = document.querySelectorAll('#royxat li').length, i = document.querySelector('#matn'); i.value = 'Sport'; document.querySelector('#qoshBtn').click(); return document.querySelectorAll('#royxat li').length === n + 1 && i.value === ''; }],
      [`Bo'sh matn qo'shilmaydi`, () => { const n = document.querySelectorAll('#royxat li').length; document.querySelector('#matn').value = '   '; document.querySelector('#qoshBtn').click(); return document.querySelectorAll('#royxat li').length === n; }],
      [`Enter ham qo'shadi`, () => { const n = document.querySelectorAll('#royxat li').length, i = document.querySelector('#matn'); i.value = 'Rasm chizish'; i.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })); return document.querySelectorAll('#royxat li').length === n + 1; }],
      [`li bosilsa .bajarildi, #soni kamayadi`, () => { const l = document.querySelectorAll('#royxat li'), li = l[l.length - 1]; li.click(); return li.classList.contains('bajarildi') && +document.querySelector('#soni').textContent === document.querySelectorAll('#royxat li:not(.bajarildi)').length; }],
      [`✕ o'chiradi (toggle qilmasdan)`, () => { const l = document.querySelectorAll('#royxat li'), n = l.length; l[0].querySelector('.ochir').click(); return document.querySelectorAll('#royxat li').length === n - 1; }]
    ],
    hint: `function qosh(matn) {\n  const li = document.createElement("li");\n  const s = document.createElement("span");\n  s.textContent = matn;\n  const b = document.createElement("button");\n  b.className = "ochir"; b.textContent = "✕";\n  b.addEventListener("click", e => { e.stopPropagation(); li.remove(); sana(); });\n  li.addEventListener("click", () => { li.classList.toggle("bajarildi"); sana(); });\n  li.append(s, b); royxat.append(li); sana();\n}`,
    sol: { js: `const royxat = document.querySelector("#royxat");\n\nfunction qosh(matn) {\n  const li = document.createElement("li");\n  const s = document.createElement("span");\n  s.textContent = matn;\n  const b = document.createElement("button");\n  b.className = "ochir";\n  b.textContent = "✕";\n  b.addEventListener("click", e => {\n    e.stopPropagation();\n    li.remove();\n    sana();\n  });\n  li.addEventListener("click", () => {\n    li.classList.toggle("bajarildi");\n    sana();\n  });\n  li.append(s, b);\n  royxat.append(li);\n  sana();\n}\n\nfunction sana() {\n  const n = royxat.querySelectorAll("li:not(.bajarildi)").length;\n  document.querySelector("#soni").textContent = n;\n}\n\nfunction formadan() {\n  const i = document.querySelector("#matn");\n  if (i.value.trim() === "") return;\n  qosh(i.value.trim());\n  i.value = "";\n}\n\ndocument.querySelector("#qoshBtn").addEventListener("click", formadan);\ndocument.querySelector("#matn").addEventListener("keydown", e => {\n  if (e.key === "Enter") formadan();\n});\n\nqosh("Uy vazifasini bajarish");\nqosh("Kitob o'qish");\n` }
  }
},
{
  t: `Kalkulyator`, min: 35, demo: true, lvl: 'JavaScript · o\'rta',
  key: `Ikki son, to'rt amal: input qiymatlari, Number(), shartlar va nolga bo'lishdan himoya.`,
  theory: `<p><b>Daraja:</b> o'rta · JavaScript. Ikki maydon va to'rtta amal tugmasi. Natija katta yozuvda chiqadi, nolga bo'lishda ogohlantiradi.</p>
${steps([`${c('function hisobla(a, amal, b)')}: ${c('"+", "-", "*", "/"')} uchun natija qaytaradi. ${c('b === 0')} va ${c('"/"')} bo'lsa ${c('"Nolga bo\'lib bo\'lmaydi"')}.`, `Har bir ${c('button[data-amal]')} bosilganda: inputlardan ${c('Number')} bilan o'qish, ${c('hisobla')}, ${c('#natija')} ga yozish.`, `${c('querySelectorAll')} + ${c('forEach')} bilan hamma tugmalarga bitta kod.`])}`,
  quiz: [
    Q(`Inputdagi matnni songa?`, `Number(input.value)`, [`input.value * ""`, `String(input)`], `Number.`),
    Q(`Nolga bo'lishda nima qilish kerak?`, `Ogohlantirish chiqarish`, [`Infinity ko'rsatish`, `Sahifani yopish`], `Foydalanuvchiga tushunarli.`),
    Q(`Hamma tugmalarga hodisa?`, `querySelectorAll + forEach`, [`Har biriga alohida id va 4 marta kod`, `Iloji yo'q`], `Qisqa kod.`),
    Q(`data-amal="+" ni JS da o'qish?`, `btn.dataset.amal`, [`btn.amal`, `btn.data`], `dataset.`),
    Q(`7 / 2?`, `3.5`, [`3`, `4`], `Kasr.`)
  ],
  prac: {
    task: `Kalkulyator mantig'ini yozing.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="kalk">\n  <input id="a" type="number" value="12">\n  <input id="b" type="number" value="4">\n  <div class="amallar">\n    <button data-amal="+">+</button>\n    <button data-amal="-">−</button>\n    <button data-amal="*">×</button>\n    <button data-amal="/">÷</button>\n  </div>\n  <h2 id="natija">=</h2>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  display: flex;\n  justify-content: center;\n  padding-top: 30px;\n  background: #0f1b33;\n}\n.kalk {\n  background: #1c2a4a;\n  color: white;\n  padding: 20px;\n  border-radius: 20px;\n  width: 260px;\n}\ninput {\n  width: 100%;\n  box-sizing: border-box;\n  font-size: 22px;\n  padding: 8px;\n  margin-bottom: 8px;\n  border-radius: 10px;\n  border: 0;\n}\n.amallar {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n.amallar button {\n  font-size: 24px;\n  padding: 10px;\n  border: 0;\n  border-radius: 12px;\n  background: #ff9f1c;\n  color: white;\n  cursor: pointer;\n}\n#natija {\n  text-align: right;\n  font-size: 34px;\n  margin: 16px 0 0;\n}\n`,
    js: `function hisobla(a, amal, b) {\n\n}\n\n// hamma button[data-amal] ga hodisa\n`,
    tests: [
      [`hisobla(12, "+", 4) → 16`, () => hisobla(12, '+', 4) === 16],
      [`hisobla(12, "-", 4) → 8`, () => hisobla(12, '-', 4) === 8],
      [`hisobla(12, "*", 4) → 48`, () => hisobla(12, '*', 4) === 48],
      [`hisobla(7, "/", 2) → 3.5`, () => hisobla(7, '/', 2) === 3.5],
      [`Nolga bo'lish → ogohlantirish matni`, () => typeof hisobla(5, '/', 0) === 'string'],
      [`× tugmasi natijani yozadi`, () => { document.querySelector('#a').value = '6'; document.querySelector('#b').value = '7'; document.querySelector('[data-amal="*"]').click(); return document.querySelector('#natija').textContent.includes('42'); }]
    ],
    hint: `function hisobla(a, amal, b) {\n  if (amal === "+") return a + b;\n  if (amal === "-") return a - b;\n  if (amal === "*") return a * b;\n  if (b === 0) return "Nolga bo'lib bo'lmaydi";\n  return a / b;\n}\ndocument.querySelectorAll("[data-amal]").forEach(btn => btn.addEventListener("click", () => { ... btn.dataset.amal ... }));`,
    sol: { js: `function hisobla(a, amal, b) {\n  if (amal === "+") return a + b;\n  if (amal === "-") return a - b;\n  if (amal === "*") return a * b;\n  if (amal === "/") {\n    if (b === 0) return "Nolga bo'lib bo'lmaydi";\n    return a / b;\n  }\n}\n\ndocument.querySelectorAll("[data-amal]").forEach(btn => {\n  btn.addEventListener("click", () => {\n    const a = Number(document.querySelector("#a").value);\n    const b = Number(document.querySelector("#b").value);\n    document.querySelector("#natija").textContent = "= " + hisobla(a, btn.dataset.amal, b);\n  });\n});\n` }
  }
},
{
  t: `Viktorina ilovasi`, min: 45, demo: true, lvl: 'JavaScript · o\'rta',
  key: `Obyektlar massivi + indeks + hodisalar: savollar ketma-ket chiqadi, ball hisoblanadi.`,
  theory: `<p><b>Daraja:</b> o'rta · massiv va obyektlar. O'zingizning test ilovangiz: savol, 3 ta javob tugmasi, oxirida natija.</p>
${x(`const savollar = [
  { s: "2 + 2 = ?", j: ["3", "4", "5"], t: 1 },
  { s: "HTML nima?", j: ["Til", "Rasm", "O'yin"], t: 0 }
];`, 'js')}
${steps([`${c('savollar')} massivi: har birida ${c('s')} (savol), ${c('j')} (javoblar), ${c('t')} (to'g'ri javob indeksi).`, `${c('let i = 0, ball = 0')}.`, `${c('function korsat()')}: ${c('#savol')} ga savol, ${c('#javoblar')} ga tugmalar.`, `Tugma bosilganda: to'g'ri bo'lsa ${c('ball++')}, ${c('i++')}, keyingi savol yoki natija.`, `Natija: ${c('"Natija: 2 / 3"')}.`])}`,
  quiz: [
    Q(`Savollarni saqlash uchun eng qulay?`, `Obyektlar massivi`, [`Bitta katta matn`, `Har biri alohida o'zgaruvchi`], `Tartibli ma'lumot.`),
    Q(`Hozirgi savol?`, `savollar[i]`, [`savollar.i`, `savollar(i)`], `Indeks.`),
    Q(`Savollar tugaganini bilish?`, `i === savollar.length`, [`i === 0`, `ball === 0`], `Oxiriga yetdi.`),
    Q(`Tugmalarni har savolda qayta chizish?`, `innerHTML = "" va createElement`, [`Faqat CSS`, `alert`], `DOM yangilanadi.`),
    Q(`To'g'ri javobni tekshirish?`, `k === savol.t`, [`k == "to'g'ri"`, `savol.t++`], `Indeks solishtirish.`)
  ],
  prac: {
    task: `Viktorinani yasang. Savollar ro'yxati tayyor, mantiqni yozing.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="v">\n  <p class="muted" id="raqam"></p>\n  <h2 id="savol"></h2>\n  <div id="javoblar"></div>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  background: linear-gradient(135deg, #7c3aed, #2f6bff);\n  min-height: 100vh;\n  margin: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n.v {\n  background: white;\n  width: 320px;\n  padding: 24px;\n  border-radius: 20px;\n}\n.muted {\n  color: #667;\n  margin: 0;\n}\n#javoblar button {\n  display: block;\n  width: 100%;\n  margin: 8px 0;\n  padding: 12px;\n  font-size: 17px;\n  border: 2px solid #dbe0ee;\n  background: white;\n  border-radius: 12px;\n  cursor: pointer;\n}\n#javoblar button:hover {\n  border-color: #2f6bff;\n}\n`,
    js: `const savollar = [\n  { s: "2 + 2 = ?", j: ["3", "4", "5"], t: 1 },\n  { s: "HTML qaysi biri?", j: ["Belgilash tili", "Rasm", "O'yin"], t: 0 },\n  { s: "CSS nima qiladi?", j: ["Hisoblaydi", "Bezaydi", "O'chiradi"], t: 1 }\n];\nlet i = 0;\nlet ball = 0;\n\nfunction korsat() {\n  // savollar[i] ni chizing yoki natijani ko'rsating\n}\n\nkorsat();\n`,
    tests: [
      [`Birinchi savol va 3 ta tugma chiqdi`, () => document.querySelector('#savol').textContent.includes('2 + 2') && document.querySelectorAll('#javoblar button').length === 3],
      [`To'g'ri javob → ball 1, 2-savol`, () => { document.querySelectorAll('#javoblar button')[1].click(); return ball === 1 && document.querySelector('#savol').textContent.includes('HTML'); }],
      [`Noto'g'ri javob → ball o'zgarmaydi`, () => { document.querySelectorAll('#javoblar button')[2].click(); return ball === 1 && document.querySelector('#savol').textContent.includes('CSS'); }],
      [`Oxirida "Natija: 2 / 3"`, () => { document.querySelectorAll('#javoblar button')[1].click(); return /2\s*\/\s*3/.test(document.querySelector('.v').textContent); }]
    ],
    hint: `function korsat() {\n  const box = document.querySelector("#javoblar");\n  box.innerHTML = "";\n  if (i === savollar.length) {\n    document.querySelector("#savol").textContent = "Natija: " + ball + " / " + savollar.length;\n    return;\n  }\n  const q = savollar[i];\n  document.querySelector("#savol").textContent = q.s;\n  q.j.forEach((matn, k) => {\n    const b = document.createElement("button");\n    b.textContent = matn;\n    b.onclick = () => { if (k === q.t) ball++; i++; korsat(); };\n    box.append(b);\n  });\n}`,
    sol: { js: `const savollar = [\n  { s: "2 + 2 = ?", j: ["3", "4", "5"], t: 1 },\n  { s: "HTML qaysi biri?", j: ["Belgilash tili", "Rasm", "O'yin"], t: 0 },\n  { s: "CSS nima qiladi?", j: ["Hisoblaydi", "Bezaydi", "O'chiradi"], t: 1 }\n];\nlet i = 0;\nlet ball = 0;\n\nfunction korsat() {\n  const box = document.querySelector("#javoblar");\n  box.innerHTML = "";\n  if (i === savollar.length) {\n    document.querySelector("#raqam").textContent = "Tugadi!";\n    document.querySelector("#savol").textContent = "Natija: " + ball + " / " + savollar.length + (ball === savollar.length ? " 🏆" : "");\n    const b = document.createElement("button");\n    b.textContent = "Qaytadan";\n    b.onclick = () => { i = 0; ball = 0; korsat(); };\n    box.append(b);\n    return;\n  }\n  const q = savollar[i];\n  document.querySelector("#raqam").textContent = (i + 1) + " / " + savollar.length + " savol";\n  document.querySelector("#savol").textContent = q.s;\n  q.j.forEach((matn, k) => {\n    const b = document.createElement("button");\n    b.textContent = matn;\n    b.addEventListener("click", () => {\n      if (k === q.t) ball++;\n      i++;\n      korsat();\n    });\n    box.append(b);\n  });\n}\n\nkorsat();\n` }
  }
},
{
  t: `Sekundomer`, min: 35, demo: true, lvl: 'JavaScript · o\'rta',
  key: `setInterval, clearInterval va vaqtni 00:00.0 formatida chiqarish.`,
  theory: `<p><b>Daraja:</b> o'rta · taymerlar. Sport darsi uchun sekundomer: Start, Pauza, Nol.</p>
${steps([`${c('let desi = 0')} (soniyaning o'ndan biri), ${c('let id = null')}.`, `${c('function format(d)')}: ${c('d')} ni ${c('"MM:SS.d"')} matniga aylantiradi. Masalan ${c('format(754)')} → ${c('"01:15.4"')}.`, `Start: ${c('setInterval')} har 100 ms da ${c('desi++')} va ekranni yangilaydi (ikki marta bosilsa ikkinchi interval ochilmasin).`, `Pauza: ${c('clearInterval')}. Nol: to'xtatib ${c('desi = 0')}.`, `Ikki xonali qilish: ${c('String(n).padStart(2, "0")')}.`])}`,
  quiz: [
    Q(`100 ms necha soniya?`, `0.1`, [`1`, `10`], `Soniyaning o'ndan biri.`),
    Q(`5 ni "05" qilish?`, `String(5).padStart(2, "0")`, [`"0" * 5`, `5.toFixed(2)`], `padStart.`),
    Q(`754 desi necha daqiqa?`, `1`, [`7`, `75`], `754 / 600 = 1,25...`),
    Q(`Ikki marta Start bosilsa muammo?`, `Ikkita interval ochiladi, vaqt 2 baravar tez`, [`Hech narsa`, `To'xtaydi`], `if (id) return.`),
    Q(`Pauza?`, `clearInterval(id)`, [`desi = 0`, `setTimeout`], `To'xtatish.`)
  ],
  prac: {
    task: `Sekundomerni yasang.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="s">\n  <h1 id="vaqt">00:00.0</h1>\n  <button id="start">Start</button>\n  <button id="pauza">Pauza</button>\n  <button id="nol">Nol</button>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  background: #111827;\n  color: white;\n  display: flex;\n  justify-content: center;\n  padding-top: 50px;\n}\n.s {\n  text-align: center;\n}\n#vaqt {\n  font-family: monospace;\n  font-size: 72px;\n  margin: 0 0 20px;\n}\nbutton {\n  font-size: 18px;\n  padding: 10px 18px;\n  border-radius: 999px;\n  border: 0;\n  margin: 0 4px;\n  cursor: pointer;\n}\n#start {\n  background: #22c55e;\n  color: white;\n}\n`,
    js: `let desi = 0;\nlet id = null;\n\nfunction format(d) {\n\n}\n\n// Start, Pauza, Nol\n`,
    tests: [
      [`format(0) → "00:00.0"`, () => format(0) === '00:00.0'],
      [`format(754) → "01:15.4"`, () => format(754) === '01:15.4'],
      [`format(6000) → "10:00.0"`, () => format(6000) === '10:00.0'],
      [`Start → vaqt yuradi`, async () => { document.querySelector('#start').click(); document.querySelector('#start').click(); await new Promise(r => setTimeout(r, 560)); return desi >= 3 && desi <= 7; }],
      [`Pauza → to'xtaydi`, async () => { document.querySelector('#pauza').click(); const a = desi; await new Promise(r => setTimeout(r, 300)); return desi === a; }],
      [`Nol → 00:00.0`, () => { document.querySelector('#nol').click(); return desi === 0 && document.querySelector('#vaqt').textContent === '00:00.0'; }]
    ],
    hint: `function format(d) {\n  const m = Math.floor(d / 600);\n  const s = Math.floor(d / 10) % 60;\n  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0") + "." + (d % 10);\n}`,
    sol: { js: `let desi = 0;\nlet id = null;\nconst el = document.querySelector("#vaqt");\n\nfunction format(d) {\n  const m = Math.floor(d / 600);\n  const s = Math.floor(d / 10) % 60;\n  return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0") + "." + (d % 10);\n}\n\nfunction toxta() {\n  clearInterval(id);\n  id = null;\n}\n\ndocument.querySelector("#start").addEventListener("click", () => {\n  if (id) return;\n  id = setInterval(() => {\n    desi++;\n    el.textContent = format(desi);\n  }, 100);\n});\ndocument.querySelector("#pauza").addEventListener("click", toxta);\ndocument.querySelector("#nol").addEventListener("click", () => {\n  toxta();\n  desi = 0;\n  el.textContent = format(0);\n});\n` }
  }
},
{
  t: `O'yin: Tosh, qaychi, qog'oz`, min: 40, demo: true, lvl: 'JavaScript · o\'rta',
  key: `O'yin mantig'i funksiyada: kim yutganini aniqlash, kompyuter tanlovi tasodifiy, hisob saqlanadi.`,
  theory: `<p><b>Daraja:</b> o'rta · funksiyalar va shartlar. Kompyuterga qarshi klassik o'yin. Tosh qaychini, qaychi qog'ozni, qog'oz toshni yutadi.</p>
${steps([`${c('function golib(men, komp)')}: ${c('"durang"')}, ${c('"men"')} yoki ${c('"komp"')} qaytaradi.`, `${c('function kompTanlov()')}: ${c('["tosh", "qaychi", "qogoz"]')} dan tasodifiy.`, `Tugma bosilganda: kompyuter tanlaydi, ${c('golib')} aniqlanadi, hisob (${c('#men')}, ${c('#komp')}) yangilanadi, ${c('#xabar')} ga natija.`])}
${x(`const yutadi = { tosh: "qaychi", qaychi: "qogoz", qogoz: "tosh" };
// yutadi[men] === komp bo'lsa, men yutdim`, 'js')}`,
  quiz: [
    Q(`Tosh nimani yutadi?`, `Qaychini`, [`Qog'ozni`, `Hech narsani`], `Tosh qaychini sindiradi.`),
    Q(`Bir xil tanlov?`, `Durang`, [`Men yutdim`, `Kompyuter yutdi`], `Teng.`),
    Q(`yutadi obyekti nima uchun?`, `Ko'p if yozmaslik uchun`, [`Rang uchun`, `Kerak emas`], `Qisqa mantiq.`),
    Q(`Kompyuter tanlovi?`, `Massivdan tasodifiy element`, [`Doim tosh`, `Foydalanuvchi bilan bir xil`], `Math.random.`),
    Q(`Hisobni saqlash?`, `let menBall = 0, kompBall = 0`, [`const ball`, `Saqlash shart emas`], `O'zgaruvchilar.`)
  ],
  prac: {
    task: `O'yin mantig'ini yozing.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<div class="o">\n  <h1>✊ ✌️ ✋</h1>\n  <p class="hisob">Siz <b id="men">0</b> : <b id="komp">0</b> Kompyuter</p>\n  <div class="tanlov">\n    <button data-t="tosh">✊</button>\n    <button data-t="qaychi">✌️</button>\n    <button data-t="qogoz">✋</button>\n  </div>\n  <h2 id="xabar">Tanlang!</h2>\n</div>\n`,
    css: `body {\n  font-family: system-ui, sans-serif;\n  background: #fff4e6;\n  display: flex;\n  justify-content: center;\n  padding-top: 30px;\n}\n.o {\n  text-align: center;\n}\n.hisob {\n  font-size: 22px;\n}\n.tanlov button {\n  font-size: 48px;\n  width: 90px;\n  height: 90px;\n  margin: 6px;\n  border-radius: 50%;\n  border: 3px solid #ffc078;\n  background: white;\n  cursor: pointer;\n  transition: transform 0.15s;\n}\n.tanlov button:hover {\n  transform: scale(1.1);\n}\n`,
    js: `const yutadi = { tosh: "qaychi", qaychi: "qogoz", qogoz: "tosh" };\nlet menBall = 0;\nlet kompBall = 0;\n\nfunction golib(men, komp) {\n\n}\n\nfunction kompTanlov() {\n\n}\n\n// tugmalar: data-t\n`,
    tests: [
      [`golib("tosh", "tosh") → "durang"`, () => golib('tosh', 'tosh') === 'durang'],
      [`golib("tosh", "qaychi") → "men"`, () => golib('tosh', 'qaychi') === 'men'],
      [`golib("qogoz", "qaychi") → "komp"`, () => golib('qogoz', 'qaychi') === 'komp'],
      [`golib("qogoz", "tosh") → "men"`, () => golib('qogoz', 'tosh') === 'men'],
      [`kompTanlov() uchala variantni beradi`, () => { const s = new Set(); for (let k = 0; k < 300; k++) { const v = kompTanlov(); if (!['tosh', 'qaychi', 'qogoz'].includes(v)) return false; s.add(v); } return s.size === 3; }],
      [`Tugma bosilsa hisob/xabar yangilanadi`, () => { const b = document.querySelector('[data-t="tosh"]'); for (let k = 0; k < 20; k++) b.click(); return (+document.querySelector('#men').textContent + +document.querySelector('#komp').textContent) > 0 && document.querySelector('#xabar').textContent !== 'Tanlang!'; }]
    ],
    hint: `function golib(men, komp) {\n  if (men === komp) return "durang";\n  if (yutadi[men] === komp) return "men";\n  return "komp";\n}\nfunction kompTanlov() {\n  const v = ["tosh", "qaychi", "qogoz"];\n  return v[Math.floor(Math.random() * 3)];\n}`,
    sol: { js: `const yutadi = { tosh: "qaychi", qaychi: "qogoz", qogoz: "tosh" };\nconst belgi = { tosh: "✊", qaychi: "✌️", qogoz: "✋" };\nlet menBall = 0;\nlet kompBall = 0;\n\nfunction golib(men, komp) {\n  if (men === komp) return "durang";\n  if (yutadi[men] === komp) return "men";\n  return "komp";\n}\n\nfunction kompTanlov() {\n  const v = ["tosh", "qaychi", "qogoz"];\n  return v[Math.floor(Math.random() * v.length)];\n}\n\ndocument.querySelectorAll("[data-t]").forEach(btn => {\n  btn.addEventListener("click", () => {\n    const men = btn.dataset.t;\n    const komp = kompTanlov();\n    const g = golib(men, komp);\n    if (g === "men") menBall++;\n    if (g === "komp") kompBall++;\n    document.querySelector("#men").textContent = menBall;\n    document.querySelector("#komp").textContent = kompBall;\n    document.querySelector("#xabar").textContent = belgi[men] + " vs " + belgi[komp] + " · " + (g === "durang" ? "Durang" : g === "men" ? "Siz yutdingiz! 🎉" : "Kompyuter yutdi");\n  });\n});\n` }
  }
}
]});
}
