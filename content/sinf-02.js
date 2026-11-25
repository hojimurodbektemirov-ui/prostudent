{
const x = KM.x, c = KM.c;
KM.sinf({ n: 2, stage: 'boshlang', t: `Takrorlash va internet`, d: `Takrorlanadigan buyruqlar, xatolarni topish va internet bilan tanishuv.`, lessons: [
{
  t: `Takrorlash (sikl)`, min: 12,
  key: `Bir xil buyruqni ko'p yozish o'rniga "necha marta" deb aytamiz. Bu sikl deyiladi.`,
  theory: `<p>Zinapoyadan chiqayotganda "qadam bos, qadam bos, qadam bos..." deymizmi? Yo'q, "5 marta qadam bos" deymiz.</p>
<p>Dasturchilar buni <b>sikl</b> (takrorlash) deydi. Sikl dasturni qisqa va tushunarli qiladi.</p>
<p>Robot dasturida buyruq chipini bossangiz, uning yonida <b>×2</b>, <b>×3</b> paydo bo'ladi. Demak, robot shu buyruqni 2 yoki 3 marta bajaradi.</p>
<p>Vazifa: robotni <b>bitta</b> buyruq bilan bayroqqa olib boring.</p>`,
  quiz: [
    [`"→ ×4" nimani bildiradi?`, [`O'ngga 4 marta yurish`, `4 ta robot`, `4 soniya kutish`], 0, `×4 shu buyruqni 4 marta takrorlaydi.`],
    [`Sikl nima uchun kerak?`, [`Dasturni uzun qilish uchun`, `Takrorlanadigan ishni qisqa yozish uchun`, `Kompyuterni sekinlatish uchun`], 1, `Sikl bir xil buyruqlarni bitta qilib yozishga yordam beradi.`]
  ],
  prac: { type: 'robot', task: `Bitta buyruq bilan bayroqqa yeting: → ni bosing, keyin chipni bosib sonini oshiring.`, map: ['S.....G'], best: 1 }
},
{
  t: `Xatoni topamiz`, min: 12,
  key: `Dasturdagi xato "bag" (bug) deyiladi. Uni topib tuzatish "debugging" deyiladi.`,
  theory: `<p>Eng yaxshi dasturchilar ham xato qiladi. Muhimi, xatoni topib, tuzata olish.</p>
<p>Dasturdagi xatoni inglizcha <b>bug</b> (qo'ng'iz) deyishadi. Uni tuzatish <b>debugging</b> deyiladi.</p>
<p>Xatoni qanday topamiz?</p>
<ol><li>Dasturni ishga tushiramiz va robot qayerda to'xtaganini ko'ramiz.</li><li>Qaysi buyruq noto'g'ri ekanini aniqlaymiz.</li><li>Faqat shu buyruqni tuzatib, qayta ishga tushiramiz.</li></ol>
<p>Quyidagi dasturni boshqa bola yozgan, lekin unda xato bor. Uni toping va tuzating.</p>`,
  quiz: [
    [`Dasturdagi xato nima deyiladi?`, [`Bag (bug)`, `Fayl`, `Sayt`], 0, `Bug, ya'ni xato.`],
    [`Xato topilganda nima qilamiz?`, [`Hamma dasturni o'chiramiz`, `Faqat xato qismini tuzatamiz`, `Kompyuterni almashtiramiz`], 1, `Ishlayotgan qismlarni saqlab, faqat xatoni tuzatamiz.`]
  ],
  prac: { type: 'robot', task: `Dasturni ishga tushirib ko'ring: robot devorga uriladi. Qaysi buyruqning sonini o'zgartirish kerak?`, map: ['S..#', '.#.#', '.#..', '...G'], start: [['d', 2], ['r', 3]], best: 2 }
},
{
  t: `Internet va brauzer`, min: 15,
  key: `Sayt HTML tilida yoziladi, brauzer esa uni chiroyli sahifa qilib ko'rsatadi.`,
  theory: `<p><b>Internet</b> butun dunyodagi kompyuterlarni bog'lab turadigan katta tarmoq.</p>
<p><b>Brauzer</b> sayt ochadigan dastur: Chrome, Edge, Firefox, Safari. Uning manzil qatoriga sayt nomini yozamiz, masalan ${c('kun.uz')}.</p>
<p>Har bir sayt maxsus tilda yozilgan. Bu til <b>HTML</b> deyiladi. Mana eng oddiy sahifa:</p>
${x(`<h1>Salom!</h1>
<p>Men 2-sinfda o'qiyman.</p>`)}
<p>Internetda xavfsizlik qoidalari:</p>
<ul><li>Parolingizni hech kimga aytmang.</li><li>Notanish havolalarni bosmang.</li><li>Biror narsa qo'rqitsa, kattalarga ayting.</li></ul>`,
  quiz: [
    [`Sayt ochadigan dastur nima deyiladi?`, [`Brauzer`, `Printer`, `Kalkulyator`], 0, `Chrome, Edge, Firefox: bularning hammasi brauzer.`],
    [`Parolni kimga aytish mumkin?`, [`Do'stimga`, `Hech kimga (faqat ota-onamga)`, `Internetdagi notanish odamga`], 1, `Parol faqat o'zingizniki.`],
    [`Saytlar qaysi tilda yoziladi?`, [`HTML`, `Ingliz`, `Rus`], 0, `Saytning asosi HTML tilida yoziladi.`]
  ],
  prac: {
    task: `Bu sizning birinchi kodingiz! ${c('<h1>')} ichidagi "Salom!" so'zini o'z ismingiz bilan almashtiring. Masalan: ${c('<h1>Salom, Ali!</h1>')}`,
    tabs: ['html'],
    html: `<h1>Salom!</h1>\n<p>Men 2-sinfda o'qiyman.</p>\n`,
    tests: [
      [`Sahifada <h1> sarlavha bor`, () => !!document.querySelector('h1')],
      [`<h1> ichida ismingiz yozilgan`, () => { const h = document.querySelector('h1'); return !!h && h.textContent.trim() !== 'Salom!' && h.textContent.trim().length >= 6; }]
    ],
    hint: `Faqat <h1> va </h1> orasidagi so'zni o'zgartiring. Burchakli qavslarga tegmang.`,
    sol: { html: `<h1>Salom, Ali!</h1>\n<p>Men 2-sinfda o'qiyman.</p>\n` }
  }
}
] });
}
