{
const x = KM.x, c = KM.c;
KM.sinf({ n: 1, stage: 'boshlang', t: `Kompyuter va algoritm`, d: `Kompyuter qanday ishlashini bilib olamiz va robotga birinchi buyruqlarni beramiz.`, lessons: [
{
  t: `Kompyuter bilan tanishuv`, min: 10,
  key: `Kompyuter o'zi o'ylamaydi: u inson bergan buyruqlarni bajaradi.`,
  theory: `<p>Kompyuter buyruqlarni juda tez bajaradigan mashina. Uning asosiy qismlari:</p>
<ul><li><b>Monitor</b> rasm va matnni ko'rsatadi.</li><li><b>Klaviatura</b> bilan harf va raqam yozamiz.</li><li><b>Sichqoncha</b> bilan ekrandagi narsalarni tanlaymiz va bosamiz.</li><li><b>Tizim bloki</b> kompyuterning "miyasi": hamma hisob-kitob shu yerda bo'ladi.</li></ul>
<p>Kompyuter o'zi hech narsa qilmaydi. Unga nima qilish kerakligini aytsak, shuni bajaradi. Kompyuterga buyruq yozadigan odamni <b>dasturchi</b> deymiz.</p>
<p>Bugun siz ham dasturchi bo'lasiz: robotga buyruq berib, uni bayroqqacha olib borasiz.</p>`,
  quiz: [
    [`Qaysi qism ekranda rasm ko'rsatadi?`, [`Monitor`, `Klaviatura`, `Sichqoncha`], 0, `Monitor bizga kompyuter ishining natijasini ko'rsatadi.`],
    [`Kompyuter kimning buyrug'ini bajaradi?`, [`O'zining`, `Insonning`, `Hech kimning`], 1, `Kompyuterga buyruqni inson, ya'ni dasturchi beradi.`],
    [`Harf yozish uchun nima kerak?`, [`Monitor`, `Klaviatura`, `Karnay`], 1, `Klaviaturada harflar va raqamlar bor.`]
  ],
  prac: { type: 'robot', task: `Robotni bayroqqacha olib boring. Strelkani bosing, keyin "Ishga tushirish" tugmasini bosing.`, map: ['S...G'], best: 4 }
},
{
  t: `Algoritm nima?`, min: 12,
  key: `Algoritm: ishni bajarish uchun tartib bilan yozilgan qadamlar.`,
  theory: `<p>Ertalab nonushta qilishdan oldin nima qilasiz? Yuvinasiz, kiyinasiz, keyin dasturxonga o'tirasiz. Bu qadamlar ketma-ketligi <b>algoritm</b> deyiladi.</p>
<p>Choy damlash algoritmi:</p>
<ol><li>Choynakni olish.</li><li>Ichiga choy solish.</li><li>Qaynoq suv quyish.</li><li>5 daqiqa kutish.</li></ol>
<p>Agar tartibni buzsak, masalan avval suv quyib, keyin choynakni olsak, ish chiqmaydi. Kompyuter ham xuddi shunday: qadamlar tartibi juda muhim.</p>
<p>Robot devordan o'ta olmaydi. Unga aylanib o'tish yo'lini ko'rsating.</p>`,
  quiz: [
    [`Algoritm bu...`, [`Tasodifiy harakatlar`, `Tartibli qadamlar`, `Kompyuter o'yini`], 1, `Algoritm har doim tartib bilan bajariladigan qadamlardir.`],
    [`Tish yuvishda birinchi qadam qaysi?`, [`Og'izni chayish`, `Tish cho'tkasini olish`, `Cho'tkani joyiga qo'yish`], 1, `Avval cho'tkani olamiz, qolgan qadamlar keyin keladi.`]
  ],
  prac: { type: 'robot', task: `Devor (to'q katak) ichidan o'tib bo'lmaydi. Robotni pastdan aylantirib bayroqqa olib boring.`, map: ['S.#..', '..#.G', '.....'], best: 7 }
},
{
  t: `Reja tuzamiz`, min: 12,
  key: `Avval o'ylab reja tuzing, keyin harakat qiling. Eng qisqa yo'l eng yaxshi algoritm.`,
  theory: `<p>Yaxshi dasturchi kod yozishdan oldin o'ylaydi: qayerdan boshlayman, qayerga boraman, yo'lda nima bor?</p>
<p>Bu safar robot avval ikkala <b>tangani</b> yig'ishi, keyin bayroqqa borishi kerak. Barmog'ingiz bilan ekrandagi yo'lni chizib ko'ring, keyin buyruqlarni yozing.</p>
<p>Bitta masalani bir necha xil yo'l bilan yechish mumkin. Qaysi yo'l qisqaroq bo'lsa, o'sha yaxshiroq.</p>`,
  quiz: [
    [`Dastur yozishdan oldin nima qilish kerak?`, [`Darhol tugmalarni bosish`, `Reja tuzish`, `Kompyuterni o'chirish`], 1, `Reja xatolarni kamaytiradi.`],
    [`Ikki yo'l bor: biri 6 qadam, biri 10 qadam. Qaysi yaxshiroq?`, [`6 qadamli`, `10 qadamli`, `Farqi yo'q`], 0, `Qisqa yo'l tezroq va oson tekshiriladi.`]
  ],
  prac: { type: 'robot', task: `Ikkala tangani yig'ing va bayroqqa boring.`, map: ['S.*..', '.#.#.', '*...G'], best: 10 }
}
] });
}
