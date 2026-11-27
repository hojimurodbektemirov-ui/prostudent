/* HTML kursi: noldan boshlab, 20 ta oson dars. Har darsda nazariya, 10 ta test va avtomatik tekshiriladigan amaliyot. */
{
const x = KM.x, c = KM.c, Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
const B = `body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n  line-height: 1.5;\n}\n`;
KM.kurs({ n: 'html', o: 1, stage: 'boshlang', ic: '</>', t: 'HTML', d: `Veb sahifaning skeleti: teglar, matn, rasm, havola, jadval va forma.`, lessons: [
{
  t: `Veb sahifa nima? Birinchi teg`, min: 15,
  key: `HTML teglardan iborat: <h1> ochiladi, </h1> yopiladi, matn ularning orasida turadi.`,
  theory: `<p>Siz ochadigan har bir sayt aslida <b>HTML</b> fayl. HTML (HyperText Markup Language) brauzerga sahifada <b>nima</b> borligini aytadi: sarlavha, matn, rasm, tugma.</p>
<p>HTML <b>teglar</b> bilan yoziladi. Teg burchak qavslar ichidagi so'z: ${c('<h1>')}. Ko'pchilik teglar juft bo'ladi:</p>
<ul><li><b>ochuvchi teg</b>: ${c('<h1>')}</li><li><b>yopuvchi teg</b>: ${c('</h1>')} (oldida qiya chiziq bor)</li><li>ular orasida <b>matn</b> turadi.</li></ul>
${x(`<h1>Salom, dunyo!</h1>`)}
<p>${c('h1')} eng katta sarlavha. Brauzer uni katta va qalin qilib ko'rsatadi. "Maydonda sinab ko'rish" tugmasini bosib o'zingiz tekshiring.</p>
<div class="note">Yopuvchi tegni unutmang: ${c('</h1>')} bo'lmasa, keyingi hamma matn ham sarlavha bo'lib qoladi.</div>`,
  quiz: [
    Q(`HTML nima uchun kerak?`, `Sahifada nima borligini aytish uchun`, [`Rasm chizish uchun`, `Internetni tezlatish uchun`], `HTML sahifaning tarkibini belgilaydi.`),
    Q(`Teg qanday qavslarda yoziladi?`, `< >`, [`( )`, `[ ]`], `Teg burchak qavslar ichida: <h1>.`),
    Q(`Yopuvchi teg qaysi?`, `</h1>`, [`<h1>`, `<h1/>`], `Yopuvchi teg oldida qiya chiziq (/) bo'ladi.`),
    Q(`Eng katta sarlavha tegi qaysi?`, `<h1>`, [`<h6>`, `<p>`], `h1 eng katta sarlavha.`),
    Q(`Matn teglarning qayerida yoziladi?`, `Ochuvchi va yopuvchi teg orasida`, [`Teg ichida, qavs ichida`, `Yopuvchi tegdan keyin`], `<h1>Matn</h1>`),
    Q(`HTML qaysi so'zlarning qisqartmasi?`, `HyperText Markup Language`, [`High Tech Modern Language`, `Home Tool Markup List`], `HyperText Markup Language: gipermatn belgilash tili.`),
    Q(`HTML faylni nima ochadi va ko'rsatadi?`, `Brauzer`, [`Kalkulyator`, `Printer`], `Chrome, Edge, Firefox kabi brauzerlar.`),
    Q(`To'g'ri yozilgan qatorni tanlang.`, `<h1>Salom</h1>`, [`<h1>Salom<h1>`, `h1>Salom</h1`], `Ochuvchi <h1>, yopuvchi </h1>.`),
    Q(`Yopuvchi teg unutilsa nima bo'ladi?`, `Keyingi matn ham sarlavha bo'lib qoladi`, [`Kompyuter o'chadi`, `Hech narsa o'zgarmaydi`], `Brauzer teg qayerda tugashini bilmaydi.`),
    Q(`Sayt ochilganda biz ko'radigan narsaning asosi nima?`, `HTML kod`, [`Faqat rasm`, `Ovoz`], `Har bir sahifa HTML dan boshlanadi.`)
  ],
  prac: {
    task: `Sahifaga ${c('<h1>')} sarlavha qo'shing va ichiga ismingizni yozing. Masalan: ${c('<h1>Mening ismim Ali</h1>')}`,
    tabs: ['html'], html: `<!-- Shu qatordan keyin h1 sarlavha yozing -->\n`, css: B,
    tests: [
      [`Sahifada h1 sarlavha bor`, () => !!document.querySelector('h1')],
      [`h1 ichida matn bor`, () => { const h = document.querySelector('h1'); return !!h && h.textContent.trim().length >= 2; }]
    ],
    hint: `<h1>Mening ismim ...</h1>`,
    sol: { html: `<h1>Mening ismim Ali</h1>\n` }
  }
},
{
  t: `Sarlavhalar: h1 dan h6 gacha`, min: 15,
  key: `h1 eng katta va eng muhim, h6 eng kichik. Sahifada odatda bitta h1 bo'ladi.`,
  theory: `<p>HTML da 6 xil sarlavha bor: ${c('<h1>')} dan ${c('<h6>')} gacha. Raqam qancha kichik bo'lsa, sarlavha shuncha katta va muhim.</p>
${x(`<h1>Maktabim</h1>
<h2>Sinflar</h2>
<h3>5-A sinf</h3>
<h4>Dars jadvali</h4>`)}
<p>Sarlavhalar kitobning mundarijasi kabi: ${c('h1')} kitob nomi, ${c('h2')} bob nomi, ${c('h3')} bo'lim nomi.</p>
<ul><li>Sahifada odatda <b>bitta</b> ${c('h1')} bo'ladi.</li><li>Darajani sakratmang: ${c('h2')} dan keyin ${c('h3')} keladi.</li></ul>`,
  quiz: [
    Q(`HTML da nechta sarlavha tegi bor?`, `6 ta`, [`3 ta`, `10 ta`], `h1, h2, h3, h4, h5, h6.`),
    Q(`Eng kichik sarlavha qaysi?`, `<h6>`, [`<h1>`, `<h3>`], `h6 eng kichik.`),
    Q(`Sahifada odatda nechta h1 bo'ladi?`, `Bitta`, [`Beshta`, `Hech qancha`], `h1 sahifaning asosiy nomi.`),
    Q(`h2 dan keyin qaysi daraja keladi?`, `h3`, [`h5`, `h1`], `Darajalar ketma-ket boradi.`),
    Q(`Sarlavhalarni nimaga o'xshatish mumkin?`, `Kitob mundarijasiga`, [`Rasmga`, `Qo'shiqqa`], `Kitob nomi, bob, bo'lim.`),
    Q(`<h3>Matn</h3> nimani bildiradi?`, `3-darajali sarlavha`, [`3 ta matn`, `3-qator`], `h3: uchinchi daraja.`),
    Q(`Qaysi biri h1 dan kichik?`, `h2`, [`h0`, `Hech biri`], `h2 h1 dan kichik.`),
    Q(`Bob nomi uchun qaysi teg mos?`, `<h2>`, [`<h6>`, `<p>`], `Kitob nomi h1, bob h2.`),
    Q(`h4 sarlavha yopuvchi tegi qaysi?`, `</h4>`, [`<h4/>`, `</h>`], `Har bir teg o'z nomi bilan yopiladi.`),
    Q(`<h7> tegi bormi?`, `Yo'q`, [`Ha`, `Faqat telefonda`], `Sarlavhalar h6 bilan tugaydi.`)
  ],
  prac: {
    task: `Sevimli taomingiz haqida sahifa: ${c('h1')} da taom nomi, ${c('h2')} da "Masalliqlar", yana bir ${c('h2')} da "Tayyorlash" yozing.`,
    tabs: ['html'], html: `<h1>Osh</h1>\n`, css: B,
    tests: [
      [`Bitta h1 bor`, () => document.querySelectorAll('h1').length === 1],
      [`Kamida 2 ta h2 bor`, () => document.querySelectorAll('h2').length >= 2],
      [`h2 larda matn bor`, () => [...document.querySelectorAll('h2')].every(h => h.textContent.trim())]
    ],
    hint: `<h1>Osh</h1>\n<h2>Masalliqlar</h2>\n<h2>Tayyorlash</h2>`,
    sol: { html: `<h1>Osh</h1>\n<h2>Masalliqlar</h2>\n<h2>Tayyorlash</h2>\n` }
  }
},
{
  t: `Paragraf, qator tashlash va chiziq`, min: 15,
  key: `<p> paragraf, <br> yangi qator, <hr> gorizontal chiziq. br va hr yopilmaydi.`,
  theory: `<p>Oddiy matn ${c('<p>')} (paragraph) tegiga yoziladi. Har bir paragraf yangi qatordan, oldida va keyinida bo'sh joy bilan boshlanadi.</p>
${x(`<p>Bugun havo juda yaxshi.</p>
<p>Biz bog'ga sayrga chiqdik.</p>`)}
<p>Ba'zi teglar <b>bo'sh</b> bo'ladi, ular yopilmaydi:</p>
<ul><li>${c('<br>')}: shu joydan yangi qator (she'r yozishda qulay).</li><li>${c('<hr>')}: gorizontal chiziq, bo'limlarni ajratadi.</li></ul>
${x(`<p>Olma, olma, qizil olma,<br>Shoxda turib meni qo'lma.</p>
<hr>
<p>Ikkinchi bo'lim</p>`)}
<div class="note">Matnda Enter bosish brauzerda yangi qator qilmaydi. Yangi qator uchun ${c('<br>')} yoki yangi ${c('<p>')} kerak.</div>`,
  quiz: [
    Q(`Paragraf tegi qaysi?`, `<p>`, [`<par>`, `<t>`], `p: paragraph.`),
    Q(`Yangi qatorga o'tkazuvchi teg?`, `<br>`, [`<hr>`, `<nl>`], `br: break, qator tashlash.`),
    Q(`Gorizontal chiziq tegi?`, `<hr>`, [`<line>`, `<br>`], `hr: horizontal rule.`),
    Q(`<br> yopiladimi?`, `Yo'q, u bo'sh teg`, [`Ha, </br> bilan`, `Ha, </p> bilan`], `br va hr ichida matn bo'lmaydi.`),
    Q(`Kodda Enter bosilsa brauzerda yangi qator bo'ladimi?`, `Yo'q`, [`Ha, doim`, `Faqat h1 da`], `Brauzer ortiqcha bo'sh joy va Enter larni bitta probel deb oladi.`),
    Q(`She'r qatorlarini ajratish uchun nima qulay?`, `<br>`, [`<hr>`, `<h1>`], `Har bir qatordan keyin <br>.`),
    Q(`Ikki bo'lim orasiga chiziq qo'yish uchun?`, `<hr>`, [`<p>`, `<br>`], `hr gorizontal chiziq chizadi.`),
    Q(`To'g'ri paragraf qaysi?`, `<p>Matn</p>`, [`<p>Matn<p>`, `<p Matn>`], `Ochiladi va yopiladi.`),
    Q(`Ikkita paragraf orasida nima bo'ladi?`, `Bo'sh joy`, [`Chiziq`, `Rasm`], `Brauzer paragraflar orasiga bo'sh joy qo'yadi.`),
    Q(`p qaysi so'zdan olingan?`, `paragraph`, [`page`, `print`], `paragraph: xatboshi.`)
  ],
  prac: {
    task: `To'rt qatorli she'r yozing: hammasi bitta ${c('<p>')} ichida, qatorlar ${c('<br>')} bilan ajratilsin. She'rdan keyin ${c('<hr>')} va muallif ismi yozilgan yana bir paragraf qo'shing.`,
    tabs: ['html'], html: `<h1>Mening she'rim</h1>\n`, css: B,
    tests: [
      [`Kamida 3 ta <br> bor`, () => document.querySelectorAll('p br').length >= 3],
      [`<hr> chizig'i bor`, () => !!document.querySelector('hr')],
      [`Kamida 2 ta paragraf`, () => document.querySelectorAll('p').length >= 2]
    ],
    hint: `<p>1-qator<br>\n2-qator<br>\n3-qator<br>\n4-qator</p>\n<hr>\n<p>Muallif: ...</p>`,
    sol: { html: `<h1>Mening she'rim</h1>\n<p>Olma, olma, qizil olma,<br>\nShoxda turib meni qo'lma.<br>\nQuyosh chiqdi, kun isidi,<br>\nBog'da qushlar sayradi.</p>\n<hr>\n<p>Muallif: Ali</p>\n` }
  }
},
{
  t: `Matnni bezash: qalin, qiya, belgilangan`, min: 15,
  key: `<strong> muhim (qalin), <em> urg'u (qiya), <mark> belgilash, <small> kichik matn.`,
  theory: `<p>Paragraf ichidagi so'zlarni ajratib ko'rsatish mumkin:</p>
<table class="mdt"><thead><tr><th>Teg</th><th>Natija</th></tr></thead><tbody>
<tr><td>${c('<strong>')} yoki ${c('<b>')}</td><td><b>qalin</b> (muhim so'z)</td></tr>
<tr><td>${c('<em>')} yoki ${c('<i>')}</td><td><i>qiya</i> (urg'u)</td></tr>
<tr><td>${c('<mark>')}</td><td><mark>marker bilan belgilangan</mark></td></tr>
<tr><td>${c('<small>')}</td><td><small>kichik matn</small></td></tr>
<tr><td>${c('<u>')}</td><td><u>tagiga chizilgan</u></td></tr></tbody></table>
${x(`<p>Bu <strong>juda muhim</strong> qoida.</p>
<p>Uyga vazifa: <mark>45-mashq</mark>, <em>ertagacha</em>.</p>
<p><small>© 2026 Maktab</small></p>`)}
<p>Bu teglar paragraf <b>ichida</b> ishlatiladi. Teglar ichma-ich bo'lsa, avval ichkisi yopiladi: ${c('<p><b>so\'z</b></p>')}.</p>`,
  quiz: [
    Q(`Muhim so'zni qalin qiladigan teg?`, `<strong>`, [`<em>`, `<small>`], `strong: kuchli, muhim.`),
    Q(`Qiya (kursiv) yozuv uchun?`, `<em>`, [`<mark>`, `<hr>`], `em: emphasis, urg'u.`),
    Q(`Marker bilan sariq belgilash?`, `<mark>`, [`<u>`, `<b>`], `mark: belgilash.`),
    Q(`Kichik matn uchun teg?`, `<small>`, [`<h6>`, `<mini>`], `small: kichik.`),
    Q(`Tagiga chizish tegi?`, `<u>`, [`<i>`, `<s>`], `u: underline.`),
    Q(`<b> va <strong> farqi?`, `Ikkalasi ham qalin, strong "muhim" ma'nosini ham beradi`, [`b rangli qiladi`, `Farqi yo'q, strong ishlamaydi`], `Ma'no uchun strong afzal.`),
    Q(`To'g'ri ichma-ich yozuv?`, `<p><b>so'z</b></p>`, [`<p><b>so'z</p></b>`, `<b><p>so'z</b></p>`], `Avval ichkisi yopiladi.`),
    Q(`Mualliflik huquqi belgisi odatda qaysi tegda?`, `<small>`, [`<h1>`, `<mark>`], `Kichik matnlar uchun small.`),
    Q(`<em> qanday ko'rinadi?`, `Qiya`, [`Qalin`, `Sariq`], `em kursiv qiladi.`),
    Q(`Bu teglar odatda qayerda ishlatiladi?`, `Paragraf ichida`, [`Faqat head ichida`, `Faqat jadvalda`], `Matn qismlarini bezash uchun.`)
  ],
  prac: {
    task: `Paragrafdagi "diqqat" so'zini ${c('<strong>')} bilan, "ertaga" so'zini ${c('<em>')} bilan, "12-sahifa" ni ${c('<mark>')} bilan o'rang.`,
    tabs: ['html'], html: `<h1>E'lon</h1>\n<p>Hammaning diqqat qilishini so'raymiz: ertaga 12-sahifa o'qiladi.</p>\n`, css: B,
    tests: [
      [`"diqqat" strong ichida`, () => [...document.querySelectorAll('strong, b')].some(e => /diqqat/i.test(e.textContent))],
      [`"ertaga" em ichida`, () => [...document.querySelectorAll('em, i')].some(e => /ertaga/i.test(e.textContent))],
      [`"12-sahifa" mark ichida`, () => [...document.querySelectorAll('mark')].some(e => /12/.test(e.textContent))]
    ],
    hint: `<strong>diqqat</strong> ... <em>ertaga</em> <mark>12-sahifa</mark>`,
    sol: { html: `<h1>E'lon</h1>\n<p>Hammaning <strong>diqqat</strong> qilishini so'raymiz: <em>ertaga</em> <mark>12-sahifa</mark> o'qiladi.</p>\n` }
  }
},
{
  t: `HTML hujjat tuzilishi va izohlar`, min: 20,
  key: `Har bir sahifa: <!doctype html>, <html>, <head> (sozlamalar, title), <body> (ko'rinadigan qism). Izoh: <!-- ... -->.`,
  theory: `<p>To'liq HTML fayl doim bir xil "skelet"dan boshlanadi:</p>
${x(`<!doctype html>
<html lang="uz">
<head>
  <meta charset="utf-8">
  <title>Mening saytim</title>
</head>
<body>
  <h1>Salom!</h1>
</body>
</html>`)}
<ul><li>${c('<!doctype html>')}: "bu HTML5 hujjat" degan belgi.</li><li>${c('<head>')}: sahifa haqida ma'lumot. ${c('<title>')} brauzer yorlig'ida (tab) ko'rinadi.</li><li>${c('<body>')}: sahifada <b>ko'rinadigan</b> hamma narsa.</li></ul>
<p><b>Izoh</b> (komment) brauzerda ko'rinmaydi, u dasturchi uchun eslatma:</p>
${x(`<!-- Bu izoh, sahifada ko'rinmaydi -->
<p>Bu esa ko'rinadi</p>`)}
<div class="note">Bizning amaliyot maydonida skelet avtomatik qo'shiladi, siz faqat ${c('<body>')} ichini yozasiz.</div>`,
  quiz: [
    Q(`Sahifada ko'rinadigan qism qaysi tegda?`, `<body>`, [`<head>`, `<title>`], `body: tana, ko'rinadigan qism.`),
    Q(`Brauzer yorlig'idagi nom qaysi tegda?`, `<title>`, [`<h1>`, `<name>`], `title tab da chiqadi.`),
    Q(`Izoh qanday yoziladi?`, `<!-- izoh -->`, [`// izoh`, `** izoh **`], `HTML izohi <!-- bilan boshlanadi.`),
    Q(`Izoh sahifada ko'rinadimi?`, `Yo'q`, [`Ha`, `Qizil rangda ko'rinadi`], `Izoh faqat kodda.`),
    Q(`Fayl eng birinchi qatori?`, `<!doctype html>`, [`<body>`, `<title>`], `doctype hujjat turini bildiradi.`),
    Q(`<head> ichida nima bo'ladi?`, `Sahifa haqida ma'lumot (title, meta)`, [`Rasmlar va matnlar`, `Tugmalar`], `head sozlamalar uchun.`),
    Q(`lang="uz" nima degani?`, `Sahifa tili o'zbekcha`, [`Sahifa rangi`, `Shrift o'lchami`], `lang tilni bildiradi.`),
    Q(`<meta charset="utf-8"> nima uchun?`, `Harflar to'g'ri ko'rinishi uchun`, [`Rasmni kattalashtirish`, `Tovush uchun`], `utf-8 o', g' kabi harflarni to'g'ri ko'rsatadi.`),
    Q(`Barcha teglarni o'rab turuvchi teg?`, `<html>`, [`<body>`, `<div>`], `html ildiz teg.`),
    Q(`Izohdan nima uchun foydalaniladi?`, `Kod haqida eslatma yozish`, [`Sahifani bezash`, `Rasm qo'yish`], `Izoh dasturchilar uchun.`)
  ],
  prac: {
    task: `Kodning boshiga izoh yozing (masalan ${c('<!-- Muallif: ismingiz -->')}). Keyin ${c('h1')} sarlavha va ichida ${c('<strong>')} so'z bo'lgan paragraf yozing.`,
    tabs: ['html'], html: `\n`, css: B,
    tests: [
      [`Izoh (komment) bor`, () => { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT); return !!w.nextNode(); }],
      [`h1 sarlavha bor`, () => !!document.querySelector('h1')],
      [`Paragraf ichida strong bor`, () => !!document.querySelector('p strong, p b')]
    ],
    hint: `<!-- Muallif: Ali -->\n<h1>Sarlavha</h1>\n<p>Bu <strong>muhim</strong> matn.</p>`,
    sol: { html: `<!-- Muallif: Ali -->\n<h1>Mening sahifam</h1>\n<p>Bu <strong>muhim</strong> matn.</p>\n` }
  }
},
{
  t: `Belgili ro'yxat: ul va li`, min: 15,
  key: `<ul> belgili (nuqtali) ro'yxat, har bir band <li> ichida.`,
  theory: `<p>Xarid ro'yxati, qoidalar, sevimli o'yinlar kabi narsalar uchun <b>ro'yxat</b> kerak.</p>
${x(`<h2>Bozorlik</h2>
<ul>
  <li>Non</li>
  <li>Sut</li>
  <li>Olma</li>
</ul>`)}
<ul><li>${c('<ul>')} (unordered list): tartibsiz, nuqtali ro'yxat.</li><li>${c('<li>')} (list item): ro'yxatning bitta bandi.</li><li>${c('li')} faqat ro'yxat ichida bo'ladi.</li></ul>
<p>Ichkaridagi ${c('<li>')} larni 2 probel bilan surib yozish kodni o'qishni osonlashtiradi.</p>`,
  quiz: [
    Q(`Nuqtali ro'yxat tegi?`, `<ul>`, [`<ol>`, `<list>`], `ul: unordered list.`),
    Q(`Ro'yxat bandi tegi?`, `<li>`, [`<item>`, `<p>`], `li: list item.`),
    Q(`li qayerda bo'ladi?`, `ul yoki ol ichida`, [`Istalgan joyda`, `Faqat h1 ichida`], `li ro'yxat ichida yashaydi.`),
    Q(`ul qanday belgilar qo'yadi?`, `Nuqtalar`, [`Raqamlar`, `Harflar`], `Odatda qora doiracha.`),
    Q(`3 bandli ro'yxatda nechta li bo'ladi?`, `3 ta`, [`1 ta`, `6 ta`], `Har bir band uchun bitta li.`),
    Q(`To'g'ri ro'yxat qaysi?`, `<ul><li>A</li></ul>`, [`<li><ul>A</ul></li>`, `<ul>A</ul>`], `ul ichida li.`),
    Q(`unordered so'zining ma'nosi?`, `Tartiblanmagan`, [`Raqamli`, `Katta`], `Tartib muhim emas.`),
    Q(`li ni surib yozish nima beradi?`, `Kodni o'qish oson bo'ladi`, [`Sahifa tezlashadi`, `Rang o'zgaradi`], `Brauzer uchun farqi yo'q, odam uchun qulay.`),
    Q(`Qoidalar ro'yxati uchun mos teg?`, `<ul>`, [`<hr>`, `<br>`], `Bir nechta band ro'yxatda.`),
    Q(`</ul> nima?`, `Ro'yxatni yopuvchi teg`, [`Yangi band`, `Chiziq`], `Ro'yxat oxirida yopiladi.`)
  ],
  prac: {
    task: `"Sevimli mashg'ulotlarim" sarlavhasi ostida kamida 4 bandli ${c('<ul>')} ro'yxat tuzing.`,
    tabs: ['html'], html: `<h2>Sevimli mashg'ulotlarim</h2>\n`, css: B,
    tests: [
      [`ul ro'yxat bor`, () => !!document.querySelector('ul')],
      [`Kamida 4 ta li`, () => document.querySelectorAll('ul > li').length >= 4],
      [`Bandlar bo'sh emas`, () => [...document.querySelectorAll('ul > li')].every(l => l.textContent.trim())]
    ],
    hint: `<ul>\n  <li>Futbol</li>\n  <li>Kitob</li>\n  <li>Shaxmat</li>\n  <li>Dasturlash</li>\n</ul>`,
    sol: { html: `<h2>Sevimli mashg'ulotlarim</h2>\n<ul>\n  <li>Futbol</li>\n  <li>Kitob o'qish</li>\n  <li>Shaxmat</li>\n  <li>Dasturlash</li>\n</ul>\n` }
  }
},
{
  t: `Raqamli ro'yxat va ichma-ich ro'yxat`, min: 20,
  key: `<ol> raqamli ro'yxat. Ro'yxat ichida yana ro'yxat bo'lishi mumkin: u li ichiga yoziladi.`,
  theory: `<p>Ketma-ketlik muhim bo'lsa (retsept qadamlari, reyting), ${c('<ol>')} (ordered list) ishlatiladi. Brauzer raqamlarni o'zi qo'yadi.</p>
${x(`<h2>Choy damlash</h2>
<ol>
  <li>Suvni qaynating</li>
  <li>Choynakka choy soling</li>
  <li>Qaynoq suv quying</li>
</ol>`)}
<p>Ro'yxat ichida yana ro'yxat bo'lishi mumkin. Ichki ro'yxat ${c('<li>')} <b>ichiga</b> yoziladi:</p>
${x(`<ul>
  <li>Mevalar
    <ul>
      <li>Olma</li>
      <li>Nok</li>
    </ul>
  </li>
  <li>Sabzavotlar</li>
</ul>`)}
<p>${c('<ol start="5">')} raqamni 5 dan boshlaydi, ${c('<ol type="A">')} harflar qo'yadi.</p>`,
  quiz: [
    Q(`Raqamli ro'yxat tegi?`, `<ol>`, [`<ul>`, `<nl>`], `ol: ordered list.`),
    Q(`Retsept qadamlari uchun qaysi ro'yxat mos?`, `<ol>`, [`<ul>`, `<hr>`], `Tartib muhim bo'lsa ol.`),
    Q(`ol da raqamlarni kim qo'yadi?`, `Brauzer o'zi`, [`Biz qo'lda yozamiz`, `Hech kim`], `Avtomatik raqamlanadi.`),
    Q(`Ichki ro'yxat qayerga yoziladi?`, `li ichiga`, [`ul dan tashqariga`, `head ichiga`], `Band ichida yangi ro'yxat.`),
    Q(`<ol start="5"> nima qiladi?`, `Raqamlashni 5 dan boshlaydi`, [`5 ta band qo'shadi`, `5 marta takrorlaydi`], `start boshlanish raqami.`),
    Q(`<ol type="A"> nima qo'yadi?`, `Harflar: A, B, C`, [`Raqamlar`, `Nuqtalar`], `type turini o'zgartiradi.`),
    Q(`ordered so'zining ma'nosi?`, `Tartiblangan`, [`Buyurtma`, `Rangli`], `Ketma-ket.`),
    Q(`ol ichida qaysi teg bo'ladi?`, `<li>`, [`<p>`, `<ol>`], `ol ham li lardan iborat.`),
    Q(`Reyting (1-o'rin, 2-o'rin) uchun?`, `<ol>`, [`<ul>`, `<br>`], `O'rin raqami muhim.`),
    Q(`ul ichida ol bo'lishi mumkinmi?`, `Ha, li ichida`, [`Yo'q, hech qachon`, `Faqat body tashqarisida`], `Ro'yxatlarni aralashtirish mumkin.`)
  ],
  prac: {
    task: `Sendvich tayyorlashning kamida 3 qadamli ${c('<ol>')} ro'yxatini tuzing. Birinchi qadam ichiga kerakli narsalarning ${c('<ul>')} ro'yxatini (kamida 2 band) joylang.`,
    tabs: ['html'], html: `<h2>Sendvich tayyorlash</h2>\n`, css: B,
    tests: [
      [`ol ro'yxat bor`, () => !!document.querySelector('ol')],
      [`ol da kamida 3 ta qadam`, () => { const o = document.querySelector('ol'); return !!o && o.querySelectorAll(':scope > li').length >= 3; }],
      [`Qadam ichida ul ro'yxat (2+ band)`, () => { const u = document.querySelector('ol > li ul'); return !!u && u.querySelectorAll('li').length >= 2; }]
    ],
    hint: `<ol>\n  <li>Narsalarni tayyorlang:\n    <ul>\n      <li>Non</li>\n      <li>Pishloq</li>\n    </ul>\n  </li>\n  <li>...</li>\n  <li>...</li>\n</ol>`,
    sol: { html: `<h2>Sendvich tayyorlash</h2>\n<ol>\n  <li>Narsalarni tayyorlang:\n    <ul>\n      <li>Non</li>\n      <li>Pishloq</li>\n      <li>Pomidor</li>\n    </ul>\n  </li>\n  <li>Nonni kesing</li>\n  <li>Pishloq va pomidorni qo'ying</li>\n</ol>\n` }
  }
},
{
  t: `Havolalar: a teg`, min: 20,
  key: `<a href="manzil">matn</a> havola yasaydi. target="_blank" uni yangi oynada ochadi.`,
  theory: `<p>Internetning eng muhim qismi <b>havola</b> (link): bosilganda boshqa sahifaga o'tadi. U ${c('<a>')} tegi bilan yoziladi.</p>
${x(`<a href="https://uz.wikipedia.org">Vikipediya</a>`)}
<ul><li>${c('href')}: qayerga o'tish (manzil). Bu tegning <b>atributi</b>.</li><li>Teglar orasidagi matn: odam ko'radigan va bosadigan qism.</li><li>${c('target="_blank"')}: havolani yangi oynada ochadi.</li></ul>
${x(`<a href="https://kun.uz" target="_blank">Yangiliklar</a>
<a href="mailto:info@maktab.uz">Xat yozish</a>
<a href="#bolim2">Pastga o'tish</a>`)}
<p><b>Atribut</b> ochuvchi teg ichida yoziladi: ${c('nom="qiymat"')}. Qiymat qo'shtirnoqda bo'ladi.</p>`,
  quiz: [
    Q(`Havola tegi qaysi?`, `<a>`, [`<link>`, `<h>`], `a: anchor.`),
    Q(`Havola manzili qaysi atributda?`, `href`, [`src`, `link`], `href="..."`),
    Q(`Yangi oynada ochish uchun?`, `target="_blank"`, [`new="yes"`, `open="tab"`], `target="_blank".`),
    Q(`Havolada odam nimani ko'radi?`, `Teglar orasidagi matnni`, [`href manzilini`, `Hech narsani`], `<a href="...">shu matn</a>`),
    Q(`Atribut qayerga yoziladi?`, `Ochuvchi teg ichiga`, [`Yopuvchi teg ichiga`, `Teglardan keyin`], `<a href="...">`),
    Q(`Atribut qiymati qanday yoziladi?`, `Qo'shtirnoq ichida`, [`Qavs ichida`, `Belgisiz`], `href="https://..."`),
    Q(`mailto: nima qiladi?`, `Pochta dasturini ochadi`, [`Rasm ochadi`, `Sahifani yopadi`], `Email yozish uchun.`),
    Q(`To'g'ri havola qaysi?`, `<a href="https://kun.uz">Kun</a>`, [`<a>https://kun.uz</a href>`, `<a src="kun.uz">`], `href ochuvchi tegda.`),
    Q(`href="#bolim2" nima qiladi?`, `Shu sahifadagi id="bolim2" ga o'tadi`, [`Yangi sayt ochadi`, `Xato beradi`], `# bilan sahifa ichida o'tish.`),
    Q(`Havolalar odatda qanday ko'rinadi?`, `Ko'k va tagiga chizilgan`, [`Qizil va qalin`, `Ko'rinmaydi`], `Brauzer standarti.`)
  ],
  prac: {
    task: `Kamida 2 ta havola yasang: biri ${c('https://uz.wikipedia.org')} ga, ikkinchisi istalgan saytga. Ikkalasi yangi oynada ochilsin (${c('target="_blank"')}).`,
    tabs: ['html'], html: `<h2>Foydali saytlar</h2>\n`, css: B,
    tests: [
      [`Kamida 2 ta havola`, () => document.querySelectorAll('a[href]').length >= 2],
      [`Vikipediyaga havola bor`, () => [...document.querySelectorAll('a')].some(a => /wikipedia\.org/.test(a.getAttribute('href') || ''))],
      [`Hammasi target="_blank"`, () => { const a = [...document.querySelectorAll('a[href]')]; return a.length >= 2 && a.every(x => x.target === '_blank'); }],
      [`Havolalarda matn bor`, () => [...document.querySelectorAll('a')].every(a => a.textContent.trim())]
    ],
    hint: `<a href="https://uz.wikipedia.org" target="_blank">Vikipediya</a>`,
    sol: { html: `<h2>Foydali saytlar</h2>\n<p><a href="https://uz.wikipedia.org" target="_blank">Vikipediya</a></p>\n<p><a href="https://scratch.mit.edu" target="_blank">Scratch</a></p>\n` }
  }
},
{
  t: `Rasmlar: img teg`, min: 20,
  key: `<img src="manzil" alt="tavsif"> rasm qo'yadi. img yopilmaydi, alt majburiy.`,
  theory: `<p>Rasm ${c('<img>')} tegi bilan qo'yiladi. U ham <b>bo'sh</b> teg, yopilmaydi.</p>
${x(`<img src="https://picsum.photos/300/200" alt="Tasodifiy manzara">`)}
<ul><li>${c('src')} (source): rasm fayli manzili.</li><li>${c('alt')}: rasm tavsifi. Rasm ochilmasa yoki ko'zi ojiz odam ekran o'quvchidan foydalansa, shu matn o'qiladi.</li><li>${c('width')}: kenglik (pikselda).</li></ul>
${x(`<img src="mushuk.jpg" alt="Kulrang mushuk" width="200">`)}
<p>Rasm o'z kompyuteringizda bo'lsa, fayl nomini yozasiz (${c('mushuk.jpg')}). Internetdagi rasm uchun to'liq manzil yoziladi.</p>`,
  quiz: [
    Q(`Rasm tegi qaysi?`, `<img>`, [`<pic>`, `<image src>`], `img: image.`),
    Q(`Rasm manzili qaysi atributda?`, `src`, [`href`, `alt`], `src: source.`),
    Q(`alt nima uchun?`, `Rasm tavsifi (ochilmasa yoki ekran o'quvchi uchun)`, [`Rasm rangi`, `Rasm o'lchami`], `alt: muqobil matn.`),
    Q(`img yopiladimi?`, `Yo'q`, [`Ha, </img>`, `Ha, </src>`], `img bo'sh teg.`),
    Q(`Rasm kengligini 200px qilish?`, `width="200"`, [`size="200"`, `big="200"`], `width atributi.`),
    Q(`To'g'ri yozuv?`, `<img src="a.jpg" alt="Gul">`, [`<img>a.jpg</img>`, `<img href="a.jpg">`], `src va alt atributlar.`),
    Q(`Kim uchun alt ayniqsa muhim?`, `Ko'zi ojiz foydalanuvchilar uchun`, [`Faqat dasturchilar uchun`, `Hech kim uchun`], `Ekran o'quvchi alt ni o'qiydi.`),
    Q(`src="mushuk.jpg" nimani bildiradi?`, `Shu papkadagi mushuk.jpg fayli`, [`Internetdagi mushuk sayti`, `Mushuk so'zi`], `Nisbiy manzil.`),
    Q(`Rasm topilmasa nima ko'rinadi?`, `alt matni`, [`Hech narsa, sayt yopiladi`, `Qizil xato`], `Brauzer alt ni ko'rsatadi.`),
    Q(`source so'zining ma'nosi?`, `Manba`, [`Rang`, `O'lcham`], `Rasm qayerdan olinadi.`)
  ],
  prac: {
    task: `Sahifaga kamida bitta rasm qo'ying: ${c('src')} sifatida ${c('https://picsum.photos/320/200')} dan foydalaning, ${c('alt')} ga tavsif yozing va kengligini 300 qiling.`,
    tabs: ['html'], html: `<h2>Mening galereyam</h2>\n`, css: B,
    tests: [
      [`img rasm bor`, () => !!document.querySelector('img')],
      [`src to'ldirilgan`, () => { const i = document.querySelector('img'); return !!i && (i.getAttribute('src') || '').length > 4; }],
      [`alt tavsif yozilgan`, () => { const i = document.querySelector('img'); return !!i && (i.getAttribute('alt') || '').trim().length >= 3; }],
      [`width="300"`, () => { const i = document.querySelector('img'); return !!i && i.getAttribute('width') === '300'; }]
    ],
    hint: `<img src="https://picsum.photos/320/200" alt="Manzara" width="300">`,
    sol: { html: `<h2>Mening galereyam</h2>\n<img src="https://picsum.photos/320/200" alt="Chiroyli manzara" width="300">\n` }
  }
},
{
  t: `Rasm imzosi: figure va figcaption`, min: 15,
  key: `<figure> rasmni va uning imzosini (<figcaption>) birga o'raydi.`,
  theory: `<p>Gazeta va kitoblarda rasm ostida izoh bo'ladi. HTML da buning uchun maxsus teglar bor:</p>
${x(`<figure>
  <img src="https://picsum.photos/300/180" alt="Tog' manzarasi">
  <figcaption>Chimyon tog'lari, 2026-yil</figcaption>
</figure>`)}
<ul><li>${c('<figure>')}: rasm (yoki diagramma, kod) va uning izohini birga o'raydi.</li><li>${c('<figcaption>')}: izoh matni, ${c('figure')} ichida.</li></ul>
<p>Rasmni havolaga aylantirish ham mumkin: ${c('<img>')} ni ${c('<a>')} ichiga qo'yasiz.</p>
${x(`<a href="https://picsum.photos" target="_blank">
  <img src="https://picsum.photos/120/80" alt="Bosing">
</a>`)}`,
  quiz: [
    Q(`Rasm va izohni birga o'raydigan teg?`, `<figure>`, [`<div>`, `<pic>`], `figure: shakl, rasm.`),
    Q(`Rasm izohi tegi?`, `<figcaption>`, [`<caption>`, `<alt>`], `figcaption figure ichida.`),
    Q(`figcaption qayerda bo'ladi?`, `figure ichida`, [`head ichida`, `img ichida`], `Rasm bilan birga.`),
    Q(`Rasmni havola qilish uchun?`, `img ni a ichiga qo'yish`, [`img ga href yozish`, `Iloji yo'q`], `<a href><img></a>`),
    Q(`alt va figcaption farqi?`, `alt ko'rinmaydi (tavsif), figcaption hammaga ko'rinadi`, [`Farqi yo'q`, `figcaption ko'rinmaydi`], `Ikkalasi ham foydali.`),
    Q(`figure ichida nechta rasm bo'lishi mumkin?`, `Bir yoki bir nechta`, [`Faqat bitta`, `Umuman bo'lmaydi`], `Galereya ham bo'lishi mumkin.`),
    Q(`caption so'zining ma'nosi?`, `Izoh, sarlavha`, [`Rasm`, `Rang`], `Rasm osti yozuvi.`),
    Q(`To'g'ri tartib qaysi?`, `<figure><img ...><figcaption>...</figcaption></figure>`, [`<img><figure></img>`, `<figcaption><figure>`], `figure tashqarida.`),
    Q(`figure yopiladimi?`, `Ha, </figure>`, [`Yo'q`, `Faqat img bilan`], `figure juft teg.`),
    Q(`Rasm ostidagi "2026-yil, Chimyon" qaysi tegga mos?`, `<figcaption>`, [`<h1>`, `<hr>`], `Izoh matni.`)
  ],
  prac: {
    task: `${c('<figure>')} ichiga rasm (alt bilan) va ${c('<figcaption>')} izoh yozing.`,
    tabs: ['html'], html: `<h2>Sayohat</h2>\n`, css: B,
    tests: [
      [`figure bor`, () => !!document.querySelector('figure')],
      [`figure ichida img (alt bilan)`, () => { const i = document.querySelector('figure img'); return !!i && !!(i.getAttribute('alt') || '').trim(); }],
      [`figure ichida figcaption matni`, () => { const f = document.querySelector('figure figcaption'); return !!f && f.textContent.trim().length > 2; }]
    ],
    hint: `<figure>\n  <img src="https://picsum.photos/300/180" alt="...">\n  <figcaption>...</figcaption>\n</figure>`,
    sol: { html: `<h2>Sayohat</h2>\n<figure>\n  <img src="https://picsum.photos/300/180" alt="Tog' manzarasi">\n  <figcaption>Chimyon tog'lari</figcaption>\n</figure>\n` }
  }
},
{
  t: `Jadval: table, tr, td`, min: 20,
  key: `<table> ichida qatorlar <tr>, qator ichida katakchalar <td>.`,
  theory: `<p>Dars jadvali, baholar, narxlar ro'yxati kabi ma'lumotlar <b>jadvalda</b> ko'rsatiladi.</p>
${x(`<table border="1">
  <tr>
    <td>Dushanba</td>
    <td>Matematika</td>
  </tr>
  <tr>
    <td>Seshanba</td>
    <td>Informatika</td>
  </tr>
</table>`)}
<ul><li>${c('<table>')}: butun jadval.</li><li>${c('<tr>')} (table row): bitta qator.</li><li>${c('<td>')} (table data): qator ichidagi bitta katakcha.</li></ul>
<p>Har bir qatorda katakchalar soni bir xil bo'lsin, aks holda jadval qiyshayadi. ${c('border="1"')} chegara chizadi (keyin buni CSS bilan chiroyliroq qilamiz).</p>`,
  quiz: [
    Q(`Jadval tegi?`, `<table>`, [`<tab>`, `<grid>`], `table: jadval.`),
    Q(`Jadval qatori tegi?`, `<tr>`, [`<td>`, `<row>`], `tr: table row.`),
    Q(`Katakcha tegi?`, `<td>`, [`<tr>`, `<cell>`], `td: table data.`),
    Q(`td qayerda bo'ladi?`, `tr ichida`, [`table dan tashqarida`, `li ichida`], `Katakcha qator ichida.`),
    Q(`3 qatorli jadvalda nechta tr?`, `3 ta`, [`1 ta`, `9 ta`], `Har qator uchun bitta tr.`),
    Q(`border="1" nima qiladi?`, `Chegara chizig'ini chizadi`, [`1-qatorni o'chiradi`, `Jadvalni yashiradi`], `Chegara qalinligi 1.`),
    Q(`Qatorlarda katakchalar soni qanday bo'lishi kerak?`, `Bir xil`, [`Har xil`, `Farqi yo'q`], `Aks holda jadval qiyshayadi.`),
    Q(`Dars jadvali uchun qaysi teg mos?`, `<table>`, [`<ol>`, `<hr>`], `Ustun va qatorli ma'lumot.`),
    Q(`2 ustunli qatorda nechta td?`, `2 ta`, [`1 ta`, `4 ta`], `Har ustunga bitta td.`),
    Q(`row so'zining ma'nosi?`, `Qator`, [`Ustun`, `Rang`], `row: qator.`)
  ],
  prac: {
    task: `Kamida 3 qator va har qatorda 2 ta katakchali jadval tuzing: chapda fan nomi, o'ngda bahoyingiz.`,
    tabs: ['html'], html: `<h2>Mening baholarim</h2>\n`, css: B + `td {\n  padding: 6px 12px;\n}\n`,
    tests: [
      [`table bor`, () => !!document.querySelector('table')],
      [`Kamida 3 ta qator`, () => document.querySelectorAll('table tr').length >= 3],
      [`Har qatorda 2 ta katakcha`, () => { const r = [...document.querySelectorAll('table tr')]; return r.length >= 3 && r.every(t => t.querySelectorAll('td, th').length === 2); }]
    ],
    hint: `<table border="1">\n  <tr>\n    <td>Matematika</td>\n    <td>5</td>\n  </tr>\n  ...\n</table>`,
    sol: { html: `<h2>Mening baholarim</h2>\n<table border="1">\n  <tr><td>Matematika</td><td>5</td></tr>\n  <tr><td>Ona tili</td><td>4</td></tr>\n  <tr><td>Informatika</td><td>5</td></tr>\n</table>\n` }
  }
},
{
  t: `Jadval sarlavhasi: th, thead, caption`, min: 20,
  key: `<th> sarlavha katakcha (qalin), <thead> sarlavha qatori, <tbody> asosiy qism, <caption> jadval nomi.`,
  theory: `<p>Jadvalning birinchi qatori odatda ustunlar nomi bo'ladi. Ular uchun ${c('<td>')} o'rniga ${c('<th>')} (table header) ishlatiladi: matn qalin va markazda bo'ladi.</p>
${x(`<table border="1">
  <caption>5-A sinf baholari</caption>
  <thead>
    <tr><th>Ism</th><th>Baho</th></tr>
  </thead>
  <tbody>
    <tr><td>Ali</td><td>5</td></tr>
    <tr><td>Malika</td><td>5</td></tr>
  </tbody>
</table>`)}
<ul><li>${c('<caption>')}: jadval nomi, ${c('table')} dan keyin birinchi bo'lib yoziladi.</li><li>${c('<thead>')} sarlavha qatorini, ${c('<tbody>')} ma'lumotlarni o'raydi.</li><li>${c('colspan="2"')}: katakcha 2 ta ustunni egallaydi.</li></ul>`,
  quiz: [
    Q(`Sarlavha katakcha tegi?`, `<th>`, [`<td>`, `<head>`], `th: table header.`),
    Q(`Jadval nomi tegi?`, `<caption>`, [`<title>`, `<figcaption>`], `caption jadval ustida chiqadi.`),
    Q(`Sarlavha qatorini o'raydigan teg?`, `<thead>`, [`<head>`, `<top>`], `thead: jadval boshi.`),
    Q(`Ma'lumot qatorlarini o'raydigan teg?`, `<tbody>`, [`<body>`, `<tdata>`], `tbody: jadval tanasi.`),
    Q(`th matni qanday ko'rinadi?`, `Qalin va markazda`, [`Qiya`, `Kichik va qizil`], `Brauzer standarti.`),
    Q(`colspan="2" nima qiladi?`, `Katakcha 2 ustunni egallaydi`, [`2 ta jadval yasaydi`, `2-qatorni o'chiradi`], `Ustunlarni birlashtirish.`),
    Q(`caption qayerga yoziladi?`, `table ochilgandan keyin birinchi`, [`Jadvaldan keyin`, `td ichiga`], `<table><caption>...`),
    Q(`"Ism", "Baho" kabi ustun nomlari uchun?`, `<th>`, [`<td>`, `<li>`], `Sarlavha katakchalar.`),
    Q(`thead ichida nima bo'ladi?`, `tr va th`, [`Faqat matn`, `img`], `Sarlavha qatori.`),
    Q(`header so'zining ma'nosi?`, `Sarlavha`, [`Pastki qism`, `Rasm`], `header: bosh qism.`)
  ],
  prac: {
    task: `Mevalar narxlari jadvali: ${c('<caption>')} nomi, ${c('<thead>')} ichida 2 ta ${c('<th>')} ("Meva", "Narx"), ${c('<tbody>')} ichida kamida 3 qator.`,
    tabs: ['html'], html: `<table border="1">\n\n</table>\n`, css: B + `td, th {\n  padding: 6px 12px;\n}\n`,
    tests: [
      [`caption bor`, () => { const c = document.querySelector('table caption'); return !!c && c.textContent.trim(); }],
      [`thead ichida 2 ta th`, () => document.querySelectorAll('thead th').length === 2],
      [`tbody da kamida 3 qator`, () => document.querySelectorAll('tbody tr').length >= 3]
    ],
    hint: `<caption>Bozor narxlari</caption>\n<thead>\n  <tr><th>Meva</th><th>Narx</th></tr>\n</thead>\n<tbody>\n  <tr><td>Olma</td><td>12000</td></tr>\n  ...\n</tbody>`,
    sol: { html: `<table border="1">\n  <caption>Bozor narxlari</caption>\n  <thead>\n    <tr><th>Meva</th><th>Narx</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Olma</td><td>12000</td></tr>\n    <tr><td>Nok</td><td>15000</td></tr>\n    <tr><td>Uzum</td><td>18000</td></tr>\n  </tbody>\n</table>\n` }
  }
},
{
  t: `Forma: input va label`, min: 20,
  key: `<input> ma'lumot kiritish maydoni. <label for="id"> uning nomi, input dagi id ga bog'lanadi.`,
  theory: `<p>Ro'yxatdan o'tish, qidiruv, test: bularning hammasi <b>forma</b>. Forma ${c('<form>')} ichida yoziladi, eng asosiy element ${c('<input>')}.</p>
${x(`<form>
  <label for="ism">Ismingiz:</label>
  <input id="ism" type="text" placeholder="Masalan: Ali">
  <button>Yuborish</button>
</form>`)}
<ul><li>${c('<input>')} bo'sh teg, yopilmaydi.</li><li>${c('type="text"')}: oddiy matn maydoni.</li><li>${c('placeholder')}: maydon bo'sh turganda ko'rinadigan kulrang yordamchi matn.</li><li>${c('<label for="ism">')}: maydon nomi. ${c('for')} qiymati ${c('input')} ning ${c('id')} si bilan bir xil bo'lsa, nomni bosganda maydon faollashadi.</li></ul>`,
  quiz: [
    Q(`Ma'lumot kiritish maydoni tegi?`, `<input>`, [`<enter>`, `<text>`], `input: kiritish.`),
    Q(`Maydon nomi tegi?`, `<label>`, [`<name>`, `<title>`], `label: yorliq.`),
    Q(`label input ga qanday bog'lanadi?`, `for va id bir xil bo'lsa`, [`Yonma-yon yozilsa bo'ldi`, `class orqali`], `<label for="ism"> va <input id="ism">.`),
    Q(`Kulrang yordamchi matn atributi?`, `placeholder`, [`value`, `hint`], `placeholder: o'rinbosar matn.`),
    Q(`input yopiladimi?`, `Yo'q`, [`Ha, </input>`, `Ha, </form>`], `input bo'sh teg.`),
    Q(`Oddiy matn maydoni turi?`, `type="text"`, [`type="word"`, `type="string"`], `text turi.`),
    Q(`Hamma maydonlarni o'raydigan teg?`, `<form>`, [`<input>`, `<table>`], `form: shakl, anketa.`),
    Q(`label ni bosganda nima bo'ladi (to'g'ri bog'langan bo'lsa)?`, `Maydon faollashadi`, [`Sahifa yopiladi`, `Hech narsa`], `Qulaylik uchun.`),
    Q(`Tugma tegi?`, `<button>`, [`<btn>`, `<click>`], `button: tugma.`),
    Q(`Forma nimaga kerak?`, `Foydalanuvchidan ma'lumot olish uchun`, [`Rasm chizish uchun`, `Musiqa uchun`], `Login, qidiruv, anketa.`)
  ],
  prac: {
    task: `${c('<form>')} ichida ism uchun maydon yasang: ${c('<label for="ism">')}, ${c('<input id="ism">')} (placeholder bilan) va ${c('<button>')}.`,
    tabs: ['html'], html: `<h2>Ro'yxatdan o'tish</h2>\n`, css: B + `input {\n  padding: 6px;\n  margin: 6px 0;\n}\n`,
    tests: [
      [`form bor`, () => !!document.querySelector('form')],
      [`input id="ism"`, () => !!document.querySelector('form input#ism')],
      [`label for="ism"`, () => !!document.querySelector('label[for="ism"]')],
      [`placeholder yozilgan`, () => { const i = document.querySelector('#ism'); return !!i && !!i.placeholder.trim(); }],
      [`button bor`, () => !!document.querySelector('form button')]
    ],
    hint: `<form>\n  <label for="ism">Ism:</label>\n  <input id="ism" type="text" placeholder="Ali">\n  <button>Yuborish</button>\n</form>`,
    sol: { html: `<h2>Ro'yxatdan o'tish</h2>\n<form>\n  <label for="ism">Ismingiz:</label>\n  <input id="ism" type="text" placeholder="Masalan: Ali">\n  <button>Yuborish</button>\n</form>\n` }
  }
},
{
  t: `Input turlari: email, parol, son, belgilash`, min: 20,
  key: `type o'zgarsa maydon ham o'zgaradi: email, password, number, date, checkbox, radio, color.`,
  theory: `<p>Bitta ${c('<input>')} tegi ${c('type')} ga qarab har xil maydonga aylanadi:</p>
<table class="mdt"><thead><tr><th>type</th><th>Nima uchun</th></tr></thead><tbody>
<tr><td>${c('email')}</td><td>Elektron pochta (@ borligini tekshiradi)</td></tr>
<tr><td>${c('password')}</td><td>Parol (yulduzcha bo'lib ko'rinadi)</td></tr>
<tr><td>${c('number')}</td><td>Faqat son</td></tr>
<tr><td>${c('date')}</td><td>Sana tanlash</td></tr>
<tr><td>${c('checkbox')}</td><td>Belgilash katakchasi (bir nechtasini tanlash)</td></tr>
<tr><td>${c('radio')}</td><td>Bittasini tanlash</td></tr>
<tr><td>${c('color')}</td><td>Rang tanlash</td></tr></tbody></table>
${x(`<input type="email" placeholder="email">
<input type="password" placeholder="parol">
<input type="number" min="1" max="11">
<label><input type="checkbox"> Qoidalarga roziman</label>
<label><input type="radio" name="jins"> O'g'il</label>
<label><input type="radio" name="jins"> Qiz</label>`)}
<p>Radio tugmalar bir guruh bo'lishi uchun ularning ${c('name')} i bir xil bo'lishi kerak. ${c('required')} atributi maydonni majburiy qiladi.</p>`,
  quiz: [
    Q(`Parol maydoni turi?`, `password`, [`secret`, `text`], `type="password".`),
    Q(`Faqat son kiritish turi?`, `number`, [`digit`, `count`], `type="number".`),
    Q(`Bir nechtasini belgilash mumkin bo'lgan katakcha?`, `checkbox`, [`radio`, `select`], `checkbox: bir nechta tanlov.`),
    Q(`Faqat bittasini tanlash uchun?`, `radio`, [`checkbox`, `text`], `radio: bittasi.`),
    Q(`Radio tugmalar bir guruh bo'lishi uchun?`, `name bir xil bo'lishi kerak`, [`id bir xil bo'lishi kerak`, `Yonma-yon yozilsa bo'ldi`], `name guruhni bildiradi.`),
    Q(`Sana tanlash turi?`, `date`, [`time`, `day`], `type="date".`),
    Q(`Maydonni majburiy qiladigan atribut?`, `required`, [`must`, `need`], `required: talab qilinadi.`),
    Q(`Email maydoni turi?`, `email`, [`mail`, `@`], `type="email".`),
    Q(`Rang tanlash turi?`, `color`, [`paint`, `rgb`], `type="color".`),
    Q(`number maydonida min="1" max="11" nima?`, `Eng kichik va eng katta qiymat`, [`Shrift o'lchami`, `Belgilar soni`], `Chegaralar.`)
  ],
  prac: {
    task: `Kirish formasi yasang: ${c('type="email"')} maydon, ${c('type="password"')} maydon (ikkalasi ${c('required')}), "Meni eslab qol" ${c('checkbox')} va tugma.`,
    tabs: ['html'], html: `<form>\n\n</form>\n`, css: B + `input {\n  display: block;\n  margin: 6px 0;\n  padding: 6px;\n}\n`,
    tests: [
      [`email maydon`, () => !!document.querySelector('input[type="email"]')],
      [`password maydon`, () => !!document.querySelector('input[type="password"]')],
      [`email va parol required`, () => { const a = document.querySelector('input[type="email"]'), b = document.querySelector('input[type="password"]'); return !!a && !!b && a.required && b.required; }],
      [`checkbox bor`, () => !!document.querySelector('input[type="checkbox"]')],
      [`tugma bor`, () => !!document.querySelector('form button, form input[type="submit"]')]
    ],
    hint: `<input type="email" placeholder="Email" required>\n<input type="password" placeholder="Parol" required>\n<label><input type="checkbox"> Meni eslab qol</label>\n<button>Kirish</button>`,
    sol: { html: `<form>\n  <input type="email" placeholder="Email" required>\n  <input type="password" placeholder="Parol" required>\n  <label><input type="checkbox"> Meni eslab qol</label>\n  <button>Kirish</button>\n</form>\n` }
  }
},
{
  t: `Tanlash ro'yxati va katta matn: select, textarea`, min: 20,
  key: `<select> ichida <option> lar: ochiladigan ro'yxat. <textarea> ko'p qatorli matn maydoni.`,
  theory: `<p>Variantlardan birini tanlash uchun <b>ochiladigan ro'yxat</b> qulay:</p>
${x(`<label for="sinf">Sinfingiz:</label>
<select id="sinf">
  <option>5-sinf</option>
  <option>6-sinf</option>
  <option selected>7-sinf</option>
</select>`)}
<p>${c('selected')} atributi qaysi variant oldindan tanlanganini bildiradi.</p>
<p>Uzun fikr yozish uchun ${c('<textarea>')} ishlatiladi. U juft teg: ichidagi matn boshlang'ich qiymat bo'ladi.</p>
${x(`<label for="fikr">Fikringiz:</label>
<textarea id="fikr" rows="4" cols="30"></textarea>
<button type="submit">Yuborish</button>`)}
<p>${c('rows')} qatorlar soni, ${c('cols')} kengligi (belgilarda).</p>`,
  quiz: [
    Q(`Ochiladigan ro'yxat tegi?`, `<select>`, [`<list>`, `<drop>`], `select: tanlash.`),
    Q(`select ichidagi variant tegi?`, `<option>`, [`<li>`, `<item>`], `option: variant.`),
    Q(`Ko'p qatorli matn maydoni?`, `<textarea>`, [`<input type="long">`, `<text>`], `textarea: matn maydoni.`),
    Q(`Oldindan tanlangan variant atributi?`, `selected`, [`checked`, `default`], `<option selected>.`),
    Q(`textarea da qatorlar soni atributi?`, `rows`, [`lines`, `height`], `rows: qatorlar.`),
    Q(`textarea yopiladimi?`, `Ha, </textarea>`, [`Yo'q`, `Faqat select bilan`], `textarea juft teg.`),
    Q(`Sinfni tanlash uchun qulay element?`, `select`, [`textarea`, `hr`], `Variantlardan biri.`),
    Q(`Insho yozish uchun qulay element?`, `textarea`, [`select`, `checkbox`], `Ko'p qatorli matn.`),
    Q(`cols nimani bildiradi?`, `Kenglik (belgilarda)`, [`Rang`, `Qatorlar soni`], `cols: ustunlar.`),
    Q(`checkbox uchun belgilangan holat atributi?`, `checked`, [`selected`, `on`], `select da selected, checkbox da checked.`)
  ],
  prac: {
    task: `Fikr-mulohaza formasi: kamida 3 ta ${c('<option>')} li ${c('<select>')} (masalan baho: 3, 4, 5), ${c('<textarea>')} (rows="4") va yuborish tugmasi.`,
    tabs: ['html'], html: `<h2>Dars sizga yoqdimi?</h2>\n<form>\n\n</form>\n`, css: B + `select, textarea {\n  display: block;\n  margin: 8px 0;\n}\n`,
    tests: [
      [`select bor`, () => !!document.querySelector('select')],
      [`Kamida 3 ta option`, () => document.querySelectorAll('select option').length >= 3],
      [`textarea rows="4"`, () => { const t = document.querySelector('textarea'); return !!t && t.getAttribute('rows') === '4'; }],
      [`tugma bor`, () => !!document.querySelector('form button')]
    ],
    hint: `<select>\n  <option>5</option>\n  <option>4</option>\n  <option>3</option>\n</select>\n<textarea rows="4"></textarea>\n<button>Yuborish</button>`,
    sol: { html: `<h2>Dars sizga yoqdimi?</h2>\n<form>\n  <label for="b">Baho:</label>\n  <select id="b">\n    <option>5</option>\n    <option>4</option>\n    <option>3</option>\n  </select>\n  <label for="f">Fikringiz:</label>\n  <textarea id="f" rows="4"></textarea>\n  <button>Yuborish</button>\n</form>\n` }
  }
},
{
  t: `Semantik teglar: header, nav, main, footer`, min: 20,
  key: `Sahifa qismlari: <header> bosh, <nav> menyu, <main> asosiy qism, <footer> pastki qism.`,
  theory: `<p>Deyarli har bir sayt bir xil qismlardan iborat. HTML5 da ular uchun <b>ma'noli (semantik)</b> teglar bor:</p>
${x(`<header>
  <h1>ZIS Kutubxona</h1>
  <nav>
    <a href="#">Bosh sahifa</a>
    <a href="#">Kitoblar</a>
    <a href="#">Aloqa</a>
  </nav>
</header>
<main>
  <h2>Yangi kitoblar</h2>
  <p>Bu hafta 12 ta kitob keldi.</p>
</main>
<footer>
  <p>© 2026 ZIS</p>
</footer>`)}
<ul><li>${c('<header>')}: sahifa boshi (logo, nom).</li><li>${c('<nav>')}: menyu havolalari.</li><li>${c('<main>')}: asosiy mazmun (sahifada bitta).</li><li>${c('<footer>')}: pastki qism (mualliflik, aloqa).</li></ul>
<p>Bu teglar ko'rinishni o'zgartirmaydi, lekin qidiruv tizimlari (Google) va ekran o'quvchilar sahifani yaxshiroq tushunadi.</p>`,
  quiz: [
    Q(`Sahifa boshi uchun teg?`, `<header>`, [`<head>`, `<top>`], `header ko'rinadigan bosh qism; head esa sozlamalar.`),
    Q(`Menyu havolalari uchun teg?`, `<nav>`, [`<menu>`, `<links>`], `nav: navigation.`),
    Q(`Asosiy mazmun uchun teg?`, `<main>`, [`<body>`, `<center>`], `main: asosiy.`),
    Q(`Pastki qism tegi?`, `<footer>`, [`<bottom>`, `<end>`], `footer: oyoq qism.`),
    Q(`Sahifada nechta main bo'ladi?`, `Bitta`, [`Istalgancha`, `Ikkita`], `Asosiy qism bitta.`),
    Q(`Semantik so'zining ma'nosi?`, `Ma'noli`, [`Rangli`, `Tezkor`], `Teg nima ekanini aytadi.`),
    Q(`header va head farqi?`, `header sahifada ko'rinadi, head ko'rinmaydi`, [`Farqi yo'q`, `head ko'rinadi`], `head ichida title, meta.`),
    Q(`© 2026 yozuvi odatda qayerda?`, `<footer>`, [`<nav>`, `<header>`], `Pastki qismda.`),
    Q(`Semantik teglar kimga yordam beradi?`, `Google va ekran o'quvchilarga`, [`Faqat printerga`, `Hech kimga`], `Sahifa tuzilishini tushunish.`),
    Q(`nav ichida odatda nima bo'ladi?`, `Havolalar (a)`, [`Jadval`, `Video`], `Menyu = havolalar.`)
  ],
  prac: {
    task: `Sahifani to'rt qismga bo'ling: ${c('<header>')} (ichida ${c('h1')} va kamida 2 havolali ${c('<nav>')}), ${c('<main>')} (ichida matn) va ${c('<footer>')}.`,
    tabs: ['html'], html: `\n`, css: B + `header, main, footer {\n  border: 1px dashed #99a;\n  padding: 8px;\n  margin: 6px 0;\n}\nnav a {\n  margin-right: 10px;\n}\n`,
    tests: [
      [`header ichida h1`, () => !!document.querySelector('header h1')],
      [`nav da kamida 2 havola`, () => document.querySelectorAll('nav a').length >= 2],
      [`main da matn bor`, () => { const m = document.querySelector('main'); return !!m && m.textContent.trim().length > 3; }],
      [`footer bor`, () => !!document.querySelector('footer')]
    ],
    hint: `<header>\n  <h1>...</h1>\n  <nav><a href="#">...</a> <a href="#">...</a></nav>\n</header>\n<main>...</main>\n<footer>...</footer>`,
    sol: { html: `<header>\n  <h1>Mening saytim</h1>\n  <nav>\n    <a href="#">Bosh sahifa</a>\n    <a href="#">Men haqimda</a>\n  </nav>\n</header>\n<main>\n  <p>Saytimga xush kelibsiz!</p>\n</main>\n<footer>\n  <p>© 2026</p>\n</footer>\n` }
  }
},
{
  t: `Bo'limlar: section, article, aside, div`, min: 20,
  key: `<section> mavzu bo'limi, <article> mustaqil maqola, <aside> yon qism, <div> ma'nosiz quti (bezash uchun).`,
  theory: `<p>${c('main')} ichini yana qismlarga bo'lish mumkin:</p>
<ul><li>${c('<section>')}: bir mavzuga oid bo'lim, odatda sarlavhasi bor.</li><li>${c('<article>')}: alohida o'qisa bo'ladigan maqola, yangilik, post.</li><li>${c('<aside>')}: yon panel, qo'shimcha ma'lumot, reklama.</li><li>${c('<div>')}: hech qanday ma'nosi yo'q "quti". Faqat CSS bilan bezash uchun guruhlash kerak bo'lganda.</li><li>${c('<span>')}: matn ichidagi kichik "quti" (qator ichida).</li></ul>
${x(`<main>
  <section>
    <h2>Yangiliklar</h2>
    <article>
      <h3>Maktabda olimpiada</h3>
      <p>Ertaga informatika olimpiadasi bo'ladi.</p>
    </article>
  </section>
  <aside>
    <p>Bugun: <span>quyoshli</span></p>
  </aside>
</main>`)}
<div class="note">Avval ma'noli tegni qidiring. Mos teg bo'lmasa, ${c('div')} ishlating.</div>`,
  quiz: [
    Q(`Mustaqil maqola uchun teg?`, `<article>`, [`<section>`, `<div>`], `article: maqola.`),
    Q(`Yon panel tegi?`, `<aside>`, [`<side>`, `<nav>`], `aside: chetda.`),
    Q(`Ma'nosiz quti tegi?`, `<div>`, [`<box>`, `<section>`], `div: division.`),
    Q(`Matn ichidagi kichik quti?`, `<span>`, [`<div>`, `<small>`], `span qator ichida.`),
    Q(`Mavzu bo'limi tegi?`, `<section>`, [`<part>`, `<aside>`], `section: bo'lim.`),
    Q(`Qachon div ishlatiladi?`, `Mos ma'noli teg bo'lmasa`, [`Doim`, `Hech qachon`], `Avval semantik teglar.`),
    Q(`Blog posti uchun eng mos teg?`, `<article>`, [`<aside>`, `<footer>`], `Alohida o'qiladigan post.`),
    Q(`section ichida odatda nima bo'ladi?`, `Sarlavha va mazmun`, [`Faqat rasm`, `Hech narsa`], `Bo'limning nomi bor.`),
    Q(`div va span farqi?`, `div yangi qatordan, span qator ichida`, [`Farqi yo'q`, `span kattaroq`], `Blok va qator elementlar.`),
    Q(`Reklama bloki uchun mos teg?`, `<aside>`, [`<main>`, `<h1>`], `Qo'shimcha, yon ma'lumot.`)
  ],
  prac: {
    task: `${c('<main>')} ichida ${c('<section>')} yasang, unda ${c('h2')} va kamida 2 ta ${c('<article>')} (har birida ${c('h3')} va ${c('p')}). Yonida ${c('<aside>')} bo'lsin.`,
    tabs: ['html'], html: `<main>\n\n</main>\n`, css: B + `article, aside {\n  border: 1px solid #ccd;\n  border-radius: 8px;\n  padding: 8px;\n  margin: 8px 0;\n}\n`,
    tests: [
      [`section ichida h2`, () => !!document.querySelector('section h2')],
      [`section da kamida 2 ta article`, () => document.querySelectorAll('section article').length >= 2],
      [`Har article da h3 va p`, () => { const a = [...document.querySelectorAll('article')]; return a.length >= 2 && a.every(x => x.querySelector('h3') && x.querySelector('p')); }],
      [`aside bor`, () => !!document.querySelector('aside')]
    ],
    hint: `<section>\n  <h2>Yangiliklar</h2>\n  <article><h3>...</h3><p>...</p></article>\n  <article><h3>...</h3><p>...</p></article>\n</section>\n<aside>...</aside>`,
    sol: { html: `<main>\n  <section>\n    <h2>Yangiliklar</h2>\n    <article>\n      <h3>Olimpiada</h3>\n      <p>Ertaga informatika olimpiadasi.</p>\n    </article>\n    <article>\n      <h3>Sport</h3>\n      <p>Futbol jamoamiz g'alaba qozondi.</p>\n    </article>\n  </section>\n  <aside>\n    <p>Ob-havo: quyoshli</p>\n  </aside>\n</main>\n` }
  }
},
{
  t: `Atributlar: id, class, title`, min: 15,
  key: `id elementning noyob nomi, class guruh nomi (bir nechta elementda), title sichqoncha olib borganda chiqadigan yozuv.`,
  theory: `<p>Har bir tegga <b>atributlar</b> qo'shish mumkin. Uchta umumiy atribut bor:</p>
<ul><li>${c('id')}: elementning <b>noyob</b> nomi. Sahifada bir xil id ikki marta bo'lmaydi.</li><li>${c('class')}: guruh nomi. Bir nechta element bir xil klassga ega bo'lishi mumkin. Bitta elementda bir nechta klass probel bilan yoziladi.</li><li>${c('title')}: sichqonchani olib borganda chiqadigan kichik yozuv.</li></ul>
${x(`<h1 id="sarlavha">Mening sahifam</h1>
<p class="muhim">Uy vazifasini bajaring.</p>
<p class="muhim katta">Ertaga test!</p>
<abbr title="Hypertext Markup Language">HTML</abbr>`)}
<p>id va class keyingi kurslarda juda kerak bo'ladi: CSS ular orqali bezaydi, JavaScript ular orqali elementni topadi.</p>`,
  quiz: [
    Q(`Noyob nom atributi?`, `id`, [`class`, `name`], `id bitta element uchun.`),
    Q(`Guruh nomi atributi?`, `class`, [`id`, `group`], `class bir nechta elementda bo'ladi.`),
    Q(`Sichqoncha olib borganda chiqadigan yozuv?`, `title`, [`alt`, `tip`], `title atributi.`),
    Q(`Bir xil id sahifada necha marta bo'lishi mumkin?`, `Bir marta`, [`Istalgancha`, `Ikki marta`], `id noyob.`),
    Q(`Bitta elementga 2 ta klass qanday yoziladi?`, `class="muhim katta"`, [`class="muhim" class="katta"`, `class="muhim,katta"`], `Probel bilan.`),
    Q(`id va class kimga kerak?`, `CSS va JavaScriptga`, [`Faqat printerga`, `Hech kimga`], `Elementni topish va bezash uchun.`),
    Q(`<p class="muhim"> da "muhim" nima?`, `Klass nomi`, [`Matn`, `Rang`], `class qiymati.`),
    Q(`abbr tegi nima uchun?`, `Qisqartma (title da to'liq nomi)`, [`Rasm uchun`, `Jadval uchun`], `abbr: abbreviation.`),
    Q(`Atribut qayerda yoziladi?`, `Ochuvchi tegda`, [`Yopuvchi tegda`, `Matn ichida`], `<p class="...">`),
    Q(`5 ta karta bir xil ko'rinishi uchun nima beriladi?`, `Bir xil class`, [`Bir xil id`, `Bir xil title`], `Klass guruhlaydi.`)
  ],
  prac: {
    task: `${c('h1')} ga ${c('id="sarlavha"')} bering. Kamida 2 ta paragrafga ${c('class="muhim"')} bering. Bitta ${c('<abbr>')} ga ${c('title')} yozing (masalan HTML).`,
    tabs: ['html'], html: `<h1>Qoidalar</h1>\n<p>Darsga kech qolmang.</p>\n<p>Telefonni o'chiring.</p>\n<p>Savol bo'lsa qo'l ko'taring.</p>\n<p>Biz HTML o'rganyapmiz.</p>\n`, css: B + `.muhim {\n  color: crimson;\n  font-weight: bold;\n}\n`,
    tests: [
      [`h1 id="sarlavha"`, () => !!document.querySelector('h1#sarlavha')],
      [`Kamida 2 ta .muhim paragraf`, () => document.querySelectorAll('p.muhim').length >= 2],
      [`abbr title bilan`, () => { const a = document.querySelector('abbr[title]'); return !!a && a.title.trim().length > 2; }]
    ],
    hint: `<h1 id="sarlavha">...</h1>\n<p class="muhim">...</p>\n<abbr title="Hypertext Markup Language">HTML</abbr>`,
    sol: { html: `<h1 id="sarlavha">Qoidalar</h1>\n<p class="muhim">Darsga kech qolmang.</p>\n<p class="muhim">Telefonni o'chiring.</p>\n<p>Savol bo'lsa qo'l ko'taring.</p>\n<p>Biz <abbr title="Hypertext Markup Language">HTML</abbr> o'rganyapmiz.</p>\n` }
  }
},
{
  t: `Video, audio va iframe`, min: 20,
  key: `<video controls> va <audio controls> media qo'yadi. <iframe> boshqa sahifani (masalan YouTube) ichiga joylaydi.`,
  theory: `<p>Sahifaga video va ovoz qo'shish oson:</p>
${x(`<video src="dars.mp4" controls width="320"></video>
<audio src="qoshiq.mp3" controls></audio>`)}
<ul><li>${c('controls')}: o'ynatish, pauza, ovoz tugmalarini ko'rsatadi.</li><li>${c('autoplay')}: o'zi boshlanadi, ${c('loop')}: qayta-qayta, ${c('muted')}: ovozsiz.</li></ul>
<p>YouTube video, xarita yoki boshqa saytni joylash uchun ${c('<iframe>')} ishlatiladi:</p>
${x(`<iframe width="320" height="180"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video dars"></iframe>`)}
<p>YouTube da video ostidagi "Ulashish → Joylash (Embed)" tugmasi tayyor iframe kodini beradi.</p>`,
  quiz: [
    Q(`Video tegi?`, `<video>`, [`<movie>`, `<film>`], `video teg.`),
    Q(`Ovoz tegi?`, `<audio>`, [`<sound>`, `<mp3>`], `audio teg.`),
    Q(`Boshqarish tugmalarini chiqaradigan atribut?`, `controls`, [`buttons`, `play`], `controls.`),
    Q(`Boshqa sahifani joylash tegi?`, `<iframe>`, [`<frame>`, `<page>`], `iframe: ichki oyna.`),
    Q(`Videoni qayta-qayta o'ynatish?`, `loop`, [`repeat`, `again`], `loop: aylana.`),
    Q(`Ovozsiz boshlash?`, `muted`, [`silent`, `quiet`], `muted.`),
    Q(`YouTube iframe kodini qayerdan olamiz?`, `Ulashish → Joylash (Embed)`, [`Sozlamalardan`, `Iloji yo'q`], `Embed kodi.`),
    Q(`O'zi boshlanadigan qilish?`, `autoplay`, [`start`, `go`], `autoplay.`),
    Q(`Video manzili qaysi atributda?`, `src`, [`href`, `link`], `src: manba.`),
    Q(`iframe ga title nima uchun?`, `Ekran o'quvchilar nima ekanini bilishi uchun`, [`Rangi uchun`, `Kerak emas, xato`], `Qulaylik uchun tavsif.`)
  ],
  prac: {
    task: `${c('controls')} li ${c('<video>')} (src="dars.mp4", width="320") va ${c('title')} li ${c('<iframe>')} qo'shing (src sifatida ${c('https://www.youtube.com/embed/...')} manzil).`,
    tabs: ['html'], html: `<h2>Video darslar</h2>\n`, css: B,
    tests: [
      [`video controls bilan`, () => { const v = document.querySelector('video'); return !!v && v.hasAttribute('controls'); }],
      [`video width="320"`, () => { const v = document.querySelector('video'); return !!v && v.getAttribute('width') === '320'; }],
      [`iframe YouTube embed manzili bilan`, () => { const f = document.querySelector('iframe'); return !!f && /youtube\.com\/embed\//.test(f.getAttribute('src') || ''); }],
      [`iframe da title bor`, () => { const f = document.querySelector('iframe'); return !!f && !!(f.getAttribute('title') || '').trim(); }]
    ],
    hint: `<video src="dars.mp4" controls width="320"></video>\n<iframe src="https://www.youtube.com/embed/abc" title="Dars"></iframe>`,
    sol: { html: `<h2>Video darslar</h2>\n<video src="dars.mp4" controls width="320"></video>\n<iframe width="320" height="180" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="Video dars"></iframe>\n` }
  }
},
{
  t: `Maxsus belgilar va meta ma'lumotlar`, min: 15,
  key: `&lt; < belgisi, &amp; &, &copy; ©, &nbsp; uzilmas probel. Emoji to'g'ridan-to'g'ri yoziladi.`,
  theory: `<p>${c('<')} va ${c('>')} belgilari teg uchun band. Ularni sahifada matn sifatida ko'rsatish uchun <b>maxsus kodlar</b> ishlatiladi:</p>
<table class="mdt"><thead><tr><th>Kod</th><th>Belgi</th></tr></thead><tbody>
<tr><td>${c('&lt;')}</td><td>&lt;</td></tr><tr><td>${c('&gt;')}</td><td>&gt;</td></tr><tr><td>${c('&amp;')}</td><td>&amp;</td></tr>
<tr><td>${c('&copy;')}</td><td>&copy;</td></tr><tr><td>${c('&nbsp;')}</td><td>uzilmas probel</td></tr></tbody></table>
${x(`<p>5 &lt; 7 va 9 &gt; 3</p>
<p>&copy; 2026 Tom &amp; Jerry</p>
<p>Emoji ham bo'ladi: 🚀 😀</p>`)}
<p>${c('<head>')} ichidagi ${c('meta')} teglar sahifa haqida ma'lumot beradi. ${c('<meta name="viewport" ...>')} sahifani telefonda to'g'ri ko'rsatadi, ${c('<meta name="description">')} Google qidiruvida chiqadigan tavsifni beradi.</p>`,
  quiz: [
    Q(`< belgisini ko'rsatish kodi?`, `&lt;`, [`&gt;`, `&le;`], `lt: less than.`),
    Q(`© belgisi kodi?`, `&copy;`, [`&c;`, `(c)`], `copy: copyright.`),
    Q(`& belgisi kodi?`, `&amp;`, [`&and;`, `&&`], `amp: ampersand.`),
    Q(`Uzilmas probel kodi?`, `&nbsp;`, [`&space;`, `&sp;`], `non-breaking space.`),
    Q(`Nega < ni to'g'ridan-to'g'ri yozib bo'lmaydi?`, `Brauzer uni teg boshlanishi deb o'ylaydi`, [`Klaviaturada yo'q`, `Taqiqlangan`], `< teg uchun band.`),
    Q(`> belgisi kodi?`, `&gt;`, [`&lt;`, `&ge;`], `gt: greater than.`),
    Q(`Emoji qanday yoziladi?`, `To'g'ridan-to'g'ri`, [`Faqat kod bilan`, `Iloji yo'q`], `utf-8 da emoji ishlaydi.`),
    Q(`Telefonda to'g'ri ko'rinish uchun meta?`, `viewport`, [`phone`, `mobile`], `meta name="viewport".`),
    Q(`Google tavsifi uchun meta?`, `description`, [`google`, `about`], `meta name="description".`),
    Q(`Maxsus kodlar qanday tugaydi?`, `Nuqtali vergul (;) bilan`, [`Nuqta bilan`, `Hech narsasiz`], `&lt; ;`)
  ],
  prac: {
    task: `Paragrafda ${c('3 < 5')} va ${c('8 > 2')} ni maxsus kodlar bilan yozing, footer da ${c('&copy;')} belgisini ishlating.`,
    tabs: ['html'], html: `<h2>Taqqoslash</h2>\n<p></p>\n<footer></footer>\n`, css: B,
    tests: [
      [`Paragrafda "3 < 5" ko'rinadi`, () => /3\s*<\s*5/.test(document.querySelector('p').textContent)],
      [`Paragrafda "8 > 2" ko'rinadi`, () => /8\s*>\s*2/.test(document.querySelector('p').textContent)],
      [`Footer da © belgisi`, () => { const f = document.querySelector('footer'); return !!f && f.textContent.includes('©'); }]
    ],
    hint: `<p>3 &lt; 5 va 8 &gt; 2</p>\n<footer>&copy; 2026</footer>`,
    sol: { html: `<h2>Taqqoslash</h2>\n<p>3 &lt; 5 va 8 &gt; 2</p>\n<footer>&copy; 2026 Ali</footer>\n` }
  }
},
{
  t: `Yakuniy loyiha: shaxsiy sahifa`, min: 35,
  key: `Bitta sahifada o'rgangan hamma narsa: semantik qismlar, sarlavhalar, ro'yxat, rasm, havola, jadval va forma.`,
  theory: `<p>Tabriklaymiz, HTML asoslarini tugatdingiz! Endi o'zingiz haqingizda to'liq sahifa yasaymiz. Reja:</p>
<ol><li>${c('<header>')}: ismingiz (${c('h1')}) va menyu (${c('nav')}).</li><li>${c('<main>')} ichida "Men haqimda" bo'limi: rasm va paragraf.</li><li>"Qiziqishlarim" bo'limi: ro'yxat.</li><li>"Dars jadvalim" bo'limi: kichik jadval.</li><li>"Bog'lanish" bo'limi: forma.</li><li>${c('<footer>')}: © yil va ism.</li></ol>
${x(`<header>
  <h1>Ali Valiyev</h1>
  <nav><a href="#men">Men haqimda</a> <a href="#aloqa">Aloqa</a></nav>
</header>
<main>
  <section id="men">
    <h2>Men haqimda</h2>
    ...
  </section>
</main>`)}
<p>Keyingi CSS kursida shu sahifani chiroyli qilib bezashni o'rganasiz.</p>`,
  quiz: [
    Q(`Sahifa boshida qaysi teg bo'ladi?`, `<header>`, [`<footer>`, `<aside>`], `Bosh qism.`),
    Q(`Qiziqishlar ro'yxati uchun?`, `<ul>`, [`<table>`, `<hr>`], `Belgili ro'yxat.`),
    Q(`Dars jadvali uchun?`, `<table>`, [`<ol>`, `<p>`], `Jadval.`),
    Q(`Rasm uchun majburiy atribut?`, `alt`, [`title`, `class`], `alt tavsif.`),
    Q(`Menyu havolasi bo'limga qanday o'tadi?`, `href="#men" va id="men"`, [`href="men.html"`, `class="men"`], `# + id.`),
    Q(`Bog'lanish uchun nima kerak?`, `form, input, button`, [`video`, `table`], `Forma.`),
    Q(`© belgisi qayerda bo'ladi?`, `footer`, [`nav`, `h1`], `Pastki qism.`),
    Q(`Asosiy mazmun qaysi tegda?`, `<main>`, [`<head>`, `<nav>`], `main.`),
    Q(`Har bir bo'lim qaysi teg bilan?`, `<section>`, [`<br>`, `<span>`], `section.`),
    Q(`Sahifani chiroyli qilish keyingi qaysi kursda?`, `CSS`, [`Python`, `Word`], `CSS bezaydi.`)
  ],
  prac: {
    task: `Shaxsiy sahifangizni yasang. Talablar ro'yxatini birma-bir bajaring, har biri alohida tekshiriladi.`,
    tabs: ['html'], html: `<header>\n  <h1>Ismingiz</h1>\n</header>\n<main>\n\n</main>\n<footer>\n\n</footer>\n`, css: B + `section {\n  margin: 18px 0;\n}\n`,
    tests: [
      [`header: h1 va kamida 2 havolali nav`, () => !!document.querySelector('header h1') && document.querySelectorAll('header nav a').length >= 2],
      [`main ichida kamida 3 ta section (har birida h2)`, () => { const s = [...document.querySelectorAll('main section')]; return s.length >= 3 && s.every(x => x.querySelector('h2')); }],
      [`alt li rasm`, () => [...document.querySelectorAll('main img')].some(i => (i.getAttribute('alt') || '').trim())],
      [`Kamida 3 bandli ro'yxat`, () => [...document.querySelectorAll('main ul, main ol')].some(u => u.querySelectorAll('li').length >= 3)],
      [`Jadval (kamida 2 qator)`, () => document.querySelectorAll('main table tr').length >= 2],
      [`Forma: input va tugma`, () => !!document.querySelector('main form input, main form textarea') && !!document.querySelector('main form button')],
      [`footer da © belgisi`, () => { const f = document.querySelector('footer'); return !!f && f.textContent.includes('©'); }]
    ],
    hint: `<section id="men"><h2>Men haqimda</h2><img src="https://picsum.photos/200" alt="Men"><p>...</p></section>\n<section><h2>Qiziqishlarim</h2><ul><li>..</li><li>..</li><li>..</li></ul></section>\n<section><h2>Jadval</h2><table>...</table></section>\n<section id="aloqa"><h2>Aloqa</h2><form><input><button>Yuborish</button></form></section>`,
    sol: { html: `<header>\n  <h1>Ali Valiyev</h1>\n  <nav><a href="#men">Men haqimda</a> <a href="#aloqa">Aloqa</a></nav>\n</header>\n<main>\n  <section id="men">\n    <h2>Men haqimda</h2>\n    <img src="https://picsum.photos/200/140" alt="Mening rasmim">\n    <p>Men 6-sinfda o'qiyman va dasturlashni yaxshi ko'raman.</p>\n  </section>\n  <section>\n    <h2>Qiziqishlarim</h2>\n    <ul>\n      <li>Dasturlash</li>\n      <li>Futbol</li>\n      <li>Shaxmat</li>\n    </ul>\n  </section>\n  <section>\n    <h2>Dars jadvalim</h2>\n    <table border="1">\n      <tr><th>Kun</th><th>Fan</th></tr>\n      <tr><td>Dushanba</td><td>Informatika</td></tr>\n    </table>\n  </section>\n  <section id="aloqa">\n    <h2>Bog'lanish</h2>\n    <form>\n      <label for="x">Xabar:</label>\n      <input id="x" placeholder="Salom!">\n      <button>Yuborish</button>\n    </form>\n  </section>\n</main>\n<footer>\n  <p>&copy; 2026 Ali Valiyev</p>\n</footer>\n` }
  }
}
]});
}
