/* Dasturlash darslari uchun qo'shimcha test savollari (har darsda jami kamida 10 ta).
   Q(savol, to'g'ri javob, [xato javoblar], izoh) — variantlar test paytida aralashtiriladi. */
(function () {
  const Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
  KM.moreQuiz = {
    '1-1': [
      Q(`Kompyuterning "miyasi" qaysi qism?`, `Protsessor`, [`Monitor`, `Sichqoncha`], `Protsessor hamma hisob-kitobni bajaradi.`),
      Q(`Sichqoncha qanday qurilma?`, `Kiritish`, [`Chiqarish`, `Saqlash`], `U orqali kompyuterga buyruq kiritamiz.`),
      Q(`Ovoz qaysi qurilmadan chiqadi?`, `Karnay`, [`Klaviatura`, `Sichqoncha`]),
      Q(`Kompyuterni to'g'ri o'chirish qanday?`, `Pusk → O'chirish`, [`Simni sug'urish`, `Monitorni o'chirish`], `Simni sug'urish fayllarni buzishi mumkin.`),
      Q(`Ekrandan qancha uzoqda o'tiramiz?`, `50–70 sm`, [`5 sm`, `3 metr`]),
      Q(`Dastur nima?`, `Kompyuter bajaradigan buyruqlar`, [`Kompyuterning rangi`, `Klaviatura tugmasi`]),
      Q(`Qaysi biri kompyuter emas?`, `Choynak`, [`Noutbuk`, `Planshet`], `Choynakda dastur bajaradigan protsessor yo'q.`)
    ],
    '1-2': [
      Q(`Algoritm qadamlari qanday bo'ladi?`, `Aniq va tartibli`, [`Aralash`, `Noaniq`]),
      Q(`"Algoritm" so'zi kimning nomidan?`, `Al-Xorazmiy`, [`Ibn Sino`, `Ulug'bek`], `Buyuk vatandoshimiz Muhammad al-Xorazmiy.`),
      Q(`Qaysi biri algoritm?`, `Choy damlash qadamlari`, [`Ko'k rang`, `Bitta olma`]),
      Q(`"Bir oz yur" — yaxshi buyruqmi?`, `Yo'q, noaniq`, [`Ha, aniq`, `Ha, juda yaxshi`], `Robot "bir oz" ni tushunmaydi, "3 qadam" desa aniq.`),
      Q(`Qadamlar tartibi almashsa?`, `Natija buzilishi mumkin`, [`Hech narsa bo'lmaydi`, `Tezroq bo'ladi`]),
      Q(`Algoritmni kim bajaradi?`, `Ijrochi`, [`Qog'oz`, `Rang`]),
      Q(`Algoritm oxirida nima bo'ladi?`, `Natija`, [`Hech narsa`, `Yangi xato`]),
      Q(`Retsept nima?`, `Ovqat pishirish algoritmi`, [`Qo'shiq`, `Rasm`])
    ],
    '1-3': [
      Q(`Reja nima uchun kerak?`, `Ishni to'g'ri va tez bajarish uchun`, [`Kerak emas`, `Vaqt yo'qotish uchun`]),
      Q(`Robotga 3 qadam o'ngga, 2 qadam pastga — jami necha qadam?`, `5`, [`6`, `3`]),
      Q(`Qisqa yo'l nima uchun yaxshi?`, `Kam buyruq, tez bajariladi`, [`Uzoqroq bo'ladi`, `Farqi yo'q`]),
      Q(`Robot oldida devor bo'lsa reja nima qilinadi?`, `Aylanib o'tadigan qilib o'zgartiriladi`, [`Devordan o'tadi`, `To'xtab qoladi`]),
      Q(`Rejani qayerda chizish qulay?`, `Daftarda katakchalarda`, [`Havoda`, `Hech qayerda`]),
      Q(`Reja tuzgandan keyin nima qilamiz?`, `Bajarib tekshiramiz`, [`Unutamiz`, `Yirtamiz`]),
      Q(`Tanga yig'ish uchun reja qanday?`, `Barcha tangalar orqali o'tadigan yo'l`, [`Tangasiz yo'l`, `Tasodifiy yo'l`]),
      Q(`Ijrochi qaysi buyruqlarni tushunadi?`, `Faqat o'zi biladigan buyruqlarni`, [`Hamma so'zlarni`, `Hech qaysini`])
    ],
    '2-1': [
      Q(`"↑ ×3" nimani bildiradi?`, `3 qadam yuqoriga`, [`1 qadam`, `6 qadam`]),
      Q(`"→ ×2, ↓ ×2" jami necha qadam?`, `4`, [`2`, `8`]),
      Q(`Kvadrat aylanib chiqish uchun nima takrorlanadi?`, `"Yur va buril" 4 marta`, [`1 marta`, `10 marta`]),
      Q(`Hayotdan sikl misoli?`, `Har kuni tish yuvish`, [`Bir marta tug'ilish`, `Bitta sakrash`]),
      Q(`"→ → → →" ni qisqaroq yozish?`, `→ ×4`, [`→ ×2`, `← ×4`], `Sikl takrorlanayotgan buyruqni bir marta yozib, sonini ko'rsatadi.`),
      Q(`Sikl dasturni qanday qiladi?`, `Qisqa`, [`Uzun`, `Xatoli`]),
      Q(`"(→ ↓) ×3" nima chizadi?`, `Zinapoya`, [`Doira`, `To'g'ri chiziq`]),
      Q(`Siklsiz yozish nimani anglatadi?`, `Har buyruqni alohida yozish`, [`Shart qo'yish`, `O'zgaruvchi`])
    ],
    '2-2': [
      Q(`Xatoni topish va tuzatish nima deyiladi?`, `Debugging`, [`Kodlash`, `Saqlash`]),
      Q(`Robot noto'g'ri joyga borsa, birinchi nima qilamiz?`, `Qadamlarni birma-bir tekshiramiz`, [`Hammasini o'chiramiz`, `Kutamiz`]),
      Q(`Dasturchilar xato qiladimi?`, `Ha, hamma qiladi`, [`Hech qachon`, `Faqat yangi boshlovchilar`], `Muhimi — xatoni topa olish.`),
      Q(`Xato tuzatilgandan keyin?`, `Qayta sinab ko'ramiz`, [`Tashlab ketamiz`, `Yashiramiz`]),
      Q(`"Bug" so'zi asli nima?`, `Hasharot`, [`Tugma`, `Rang`], `1947-yilda kompyuterga kirib qolgan kuyadan.`),
      Q(`Bitta qadam ortiqcha bo'lsa nima bo'ladi?`, `Robot boshqa joyga boradi`, [`Hech narsa`, `Tezlashadi`]),
      Q(`Xatoni topishga kim yordam beradi?`, `Do'st yoki o'qituvchi`, [`Hech kim`, `Faqat kompyuter`]),
      Q(`Xatodan nima o'rganamiz?`, `Keyingi safar ehtiyot bo'lishni`, [`Hech narsa`, `Xafa bo'lishni`])
    ],
    '2-3': [
      Q(`Internet nima?`, `Dunyo kompyuterlari tarmog'i`, [`Bitta kompyuter`, `O'yin`]),
      Q(`Sayt manzili qayerga yoziladi?`, `Brauzer manzil satriga`, [`Word'ga`, `Paint'ga`]),
      Q(`Notanish havolani bosamizmi?`, `Yo'q, kattalardan so'raymiz`, [`Ha, darhol`, `Do'stlarga yuboramiz`]),
      Q(`Brauzerga misol?`, `Chrome`, [`Paint`, `Kalkulyator`]),
      Q(`Internetda yomon narsa ko'rsangiz?`, `Kattalarga aytaman`, [`Hammaga yuboraman`, `Yashiraman`]),
      Q(`Shaxsiy ma'lumot nima?`, `Manzil, telefon, parol`, [`Sevimli rang`, `Ob-havo`]),
      Q(`Sahifani yangilash tugmasi?`, `F5`, [`Enter`, `Esc`])
    ],
    '3-1': [
      Q(`Teg qanday yoziladi?`, `Burchakli qavslarda: <p>`, [`Qavssiz: p`, `Kvadrat qavsda: [p]`]),
      Q(`Paragraf tegi?`, `<p>`, [`<h1>`, `<img>`]),
      Q(`Yopuvchi tegda qaysi belgi bor?`, `/`, [`*`, `#`]),
      Q(`HTML nima?`, `Veb-sahifa tuzilish tili`, [`Rasm dasturi`, `O'yin`]),
      Q(`<h1> va </h1> orasidagi matn qanday chiqadi?`, `Katta sarlavha`, [`Kichik izoh`, `Ko'rinmaydi`]),
      Q(`Brauzer teglarni ko'rsatadimi?`, `Yo'q, natijani ko'rsatadi`, [`Ha, hammasini`, `Faqat yopuvchini`]),
      Q(`Qator uzilishi tegi?`, `<br>`, [`<p>`, `<hr>`]),
      Q(`<h2> qanday sarlavha?`, `<h1> dan kichikroq`, [`<h1> dan kattaroq`, `Eng katta`])
    ],
    '3-2': [
      Q(`color: red; nima qiladi?`, `Matnni qizil qiladi`, [`Fonni qizil qiladi`, `Matnni o'chiradi`]),
      Q(`CSS'da xususiyat va qiymat orasida qaysi belgi?`, `:`, [`=`, `-`]),
      Q(`CSS qatori oxirida qaysi belgi?`, `;`, [`.`, `,`]),
      Q(`"green" qaysi rang?`, `Yashil`, [`Qizil`, `Sariq`]),
      Q(`Rangni HEX kod bilan yozish misoli?`, `#ff0000`, [`red#`, `0xff`], `#ff0000 — qizil.`),
      Q(`style atributi qayerga yoziladi?`, `Ochuvchi teg ichiga`, [`Yopuvchi tegga`, `Teg tashqarisiga`]),
      Q(`Fon rangi xususiyati?`, `background-color`, [`color`, `font-color`]),
      Q(`#000000 qaysi rang?`, `Qora`, [`Oq`, `Ko'k`])
    ],
    '3-3': [
      Q(`font-size: 32px; nima qiladi?`, `Harflarni kattalashtiradi`, [`Rangni o'zgartiradi`, `Matnni yashiradi`]),
      Q(`px nimani bildiradi?`, `Piksel`, [`Protsent`, `Paragraf`]),
      Q(`Qaysi biri kattaroq?`, `40px`, [`12px`, `20px`]),
      Q(`Butun sahifa fonini o'zgartirish uchun qaysi tegga style yoziladi?`, `body`, [`h1`, `p`]),
      Q(`Matnni qalin qilish CSS'da?`, `font-weight: bold`, [`font-size: bold`, `color: bold`]),
      Q(`Matnni o'rtaga qo'yish?`, `text-align: center`, [`align: middle`, `center: true`]),
      Q(`Bir tegga ikki xususiyat yozish mumkinmi?`, `Ha, nuqta-vergul bilan ajratib`, [`Yo'q`, `Faqat bitta`]),
      Q(`Shrift turini o'zgartirish?`, `font-family`, [`font-type`, `text-font`])
    ],
    '4-1': [
      Q(`Eng kichik sarlavha?`, `<h6>`, [`<h1>`, `<h3>`]),
      Q(`Sarlavhalar nima uchun kerak?`, `Matnni bo'limlarga ajratish uchun`, [`Rang uchun`, `Rasm uchun`]),
      Q(`<h2> bo'limi ichidagi kichik bo'lim sarlavhasi?`, `<h3>`, [`<h1>`, `<p>`]),
      Q(`Sarlavhani faqat matnni kattalashtirish uchun ishlatish to'g'rimi?`, `Yo'q, buning uchun CSS bor`, [`Ha`, `Doim shunday`], `Sarlavha — tuzilma uchun, o'lcham — CSS uchun.`),
      Q(`Qidiruv tizimlari sahifani nima orqali yaxshiroq tushunadi?`, `Sarlavhalar tuzilmasi orqali`, [`Rang orqali`, `Rasm hajmi orqali`]),
      Q(`<h4> qayerda turadi?`, `<h3> dan kichik, <h5> dan katta`, [`Eng katta`, `Eng kichik`]),
      Q(`Sarlavhadan keyin odatda nima bo'ladi?`, `Paragraf <p>`, [`Hech narsa`, `<html>`]),
      Q(`Darajalarni sakrab o'tish (h1 → h4) yaxshimi?`, `Yo'q, tartib bilan borish kerak`, [`Ha`, `Farqi yo'q`])
    ],
    '4-2': [
      Q(`Qiya (urg'uli) matn tegi?`, `<em>`, [`<strong>`, `<br>`]),
      Q(`<b> va <strong> farqi?`, `<strong> muhimlikni bildiradi`, [`Farqi yo'q`, `<b> muhimroq`]),
      Q(`Qaysi to'g'ri yopilgan?`, `<p><strong>Salom</strong></p>`, [`<p><strong>Salom</p></strong>`, `<strong><p>Salom</strong>`], `Oxirgi ochilgan teg birinchi yopiladi.`),
      Q(`<hr> nima chizadi?`, `Gorizontal chiziq`, [`Rasm`, `Jadval`]),
      Q(`<br> qanday teg?`, `Yakka, yopilmaydi`, [`Juft`, `Uchlik`]),
      Q(`Belgilangan (marker) matn tegi?`, `<mark>`, [`<color>`, `<yellow>`]),
      Q(`Kichik matn tegi?`, `<small>`, [`<mini>`, `<tiny>`]),
      Q(`H₂O dagi kichik 2 uchun teg?`, `<sub>`, [`<sup>`, `<small>`])
    ],
    '4-3': [
      Q(`Rasm tegi?`, `<img>`, [`<pic>`, `<image>`]),
      Q(`<img> yopiladimi?`, `Yo'q, yakka teg`, [`Ha, </img> bilan`, `Ba'zan`]),
      Q(`Rasm kengligi atributi?`, `width`, [`size`, `big`]),
      Q(`Rasm chiqmasa nima ko'rinadi?`, `alt matni`, [`Hech narsa`, `Har doim xato kodi`]),
      Q(`Rasm img/ papkasida bo'lsa src qanday?`, `img/rasm.png`, [`rasm.png/img`, `#img`]),
      Q(`Internetdagi rasm uchun src?`, `To'liq manzil (https://...)`, [`Faqat fayl nomi`, `Bo'sh qoldiriladi`]),
      Q(`Faqat width berilsa balandlik?`, `Proporsional moslashadi`, [`0 bo'ladi`, `O'zgarmaydi`]),
      Q(`Veb uchun qaysi rasm formatlari qulay?`, `PNG, JPG, SVG, WebP`, [`DOCX`, `MP3`])
    ],
    '5-1': [
      Q(`Nuqtali ro'yxat tegi?`, `<ul>`, [`<ol>`, `<li>`]),
      Q(`Raqamli ro'yxat tegi?`, `<ol>`, [`<ul>`, `<dl>`]),
      Q(`<li> qayerda bo'ladi?`, `<ul> yoki <ol> ichida`, [`<img> ichida`, `<head> ichida`]),
      Q(`Xarid ro'yxati uchun mos ro'yxat?`, `<ul>`, [`<ol>`, `<table>`], `Tartib muhim emas.`),
      Q(`Ro'yxat ichida ro'yxat mumkinmi?`, `Ha, ichma-ich`, [`Yo'q`, `Faqat bitta`]),
      Q(`Raqamlashni 5 dan boshlash?`, `<ol start="5">`, [`<ol from="5">`, `<ol 5>`]),
      Q(`Ro'yxat belgilarini olib tashlash (CSS)?`, `list-style: none`, [`list: hide`, `bullet: off`]),
      Q(`<ol type="A"> qanday raqamlaydi?`, `A, B, C`, [`1, 2, 3`, `i, ii, iii`])
    ],
    '5-2': [
      Q(`Havola tegi?`, `<a>`, [`<link>`, `<href>`]),
      Q(`Havola matni qayerda?`, `<a> va </a> orasida`, [`href ichida`, `Hech qayerda`]),
      Q(`Email havolasi?`, `href="mailto:ali@mail.uz"`, [`href="email:ali"`, `href="@ali"`]),
      Q(`Sahifa ichidagi bo'limga havola?`, `href="#bolim"`, [`href="bolim"`, `href="@bolim"`]),
      Q(`Rasmni havola qilish mumkinmi?`, `Ha, <a> ichiga <img>`, [`Yo'q`, `Faqat matn`]),
      Q(`Yaxshi havola matni?`, `"Dars jadvalini ko'rish"`, [`"bu yerga bosing"`, `"havola"`], `Havola matni qayerga olib borishini aytishi kerak.`),
      Q(`Shu papkadagi boshqa sahifaga havola?`, `href="sahifa2.html"`, [`href="#sahifa2"`, `src="sahifa2.html"`]),
      Q(`target="_blank" bilan xavfsizlik uchun qo'shiladi?`, `rel="noopener"`, [`rel="fast"`, `alt="safe"`])
    ],
    '5-3': [
      Q(`Jadval tegi?`, `<table>`, [`<tab>`, `<grid>`]),
      Q(`Oddiy katak tegi?`, `<td>`, [`<th>`, `<tr>`]),
      Q(`<th> matni odatda qanday?`, `Qalin va markazda`, [`Qiya`, `Ko'rinmas`]),
      Q(`Ikki ustunni birlashtirish?`, `colspan="2"`, [`rowspan="2"`, `merge="2"`]),
      Q(`Ikki qatorni birlashtirish?`, `rowspan="2"`, [`colspan="2"`, `span="row"`]),
      Q(`Jadvalga chegara (CSS)?`, `border: 1px solid`, [`line: 1`, `frame: on`]),
      Q(`Jadval nomi (izohi) tegi?`, `<caption>`, [`<title>`, `<head>`]),
      Q(`Jadval nima uchun ishlatiladi?`, `Ma'lumotlarni qator-ustunda ko'rsatish`, [`Sahifa dizayni uchun`, `Rasm uchun`], `Sahifa maketi uchun Flexbox va Grid ishlatiladi.`)
    ],
    '6-1': [
      Q(`Teg selektori misoli?`, `p { }`, [`.p { }`, `#p { }`]),
      Q(`Klass selektori qaysi belgi bilan?`, `.`, [`#`, `@`]),
      Q(`id selektori qaysi belgi bilan?`, `#`, [`.`, `*`]),
      Q(`Bir elementga ikki klass?`, `class="a b"`, [`class="a" class="b"`, `class="a,b"`]),
      Q(`Barcha elementlarni tanlovchi selektor?`, `*`, [`all`, `#`]),
      Q(`"nav a" selektori nimani tanlaydi?`, `nav ichidagi havolalarni`, [`Barcha havolalarni`, `Faqat nav ni`]),
      Q(`Sichqoncha ustiga kelgandagi uslub?`, `:hover`, [`:click`, `:mouse`]),
      Q(`Qoidalar to'qnashsa qaysi kuchliroq?`, `id > klass > teg`, [`teg > klass > id`, `Hammasi teng`])
    ],
    '6-2': [
      Q(`Quti modeli qismlari (ichkaridan tashqariga)?`, `content, padding, border, margin`, [`margin, content, border, padding`, `border, margin, padding, content`]),
      Q(`Elementlar orasidagi tashqi masofa?`, `margin`, [`padding`, `border`]),
      Q(`border: 2px solid blue; nima beradi?`, `2px qalinlikdagi ko'k chegara`, [`Ko'k matn`, `2px margin`]),
      Q(`box-sizing: border-box nima qiladi?`, `width ichiga padding va border kiradi`, [`Elementni yashiradi`, `Rang beradi`]),
      Q(`margin: 0 auto; (kenglik berilgan blokda)?`, `Gorizontal markazlaydi`, [`Yashiradi`, `Pastga suradi`]),
      Q(`padding: 10px 20px; da 20px qayerga?`, `Chap va o'ngga`, [`Yuqori va pastga`, `Hammasiga`]),
      Q(`Kvadrat elementni doira qilish?`, `border-radius: 50%`, [`border-radius: 0`, `circle: yes`]),
      Q(`Elementni butunlay yashirish (joy ham qolmaydi)?`, `display: none`, [`color: none`, `margin: none`])
    ],
    '6-3': [
      Q(`Shrift o'lchamining nisbiy birligi?`, `rem yoki em`, [`kg`, `sm`]),
      Q(`Matnni katta harfli qilish?`, `text-transform: uppercase`, [`font-size: big`, `text: upper`]),
      Q(`Havolaning tagiga chizilishini olib tashlash?`, `text-decoration: none`, [`underline: no`, `line: 0`]),
      Q(`Harflar orasidagi masofa?`, `letter-spacing`, [`word-gap`, `font-space`]),
      Q(`Google Fonts shriftini ulash?`, `<link> bilan ulab, font-family da nomini yozish`, [`Imkoni yo'q`, `Rasm qilib qo'yish`]),
      Q(`font-family: Arial, sans-serif; dagi sans-serif nima?`, `Zaxira shrift (Arial bo'lmasa)`, [`Xato`, `Rang`]),
      Q(`font-weight: 700 nimani bildiradi?`, `Qalin (bold)`, [`Juda ingichka`, `Qiya`]),
      Q(`O'qish uchun qulay qator uzunligi?`, `45–75 belgi`, [`5 belgi`, `300 belgi`])
    ],
    '7-1': [
      Q(`Forma tegi?`, `<form>`, [`<input>`, `<field>`]),
      Q(`Parol maydoni?`, `<input type="password">`, [`<input type="secret">`, `<password>`]),
      Q(`Bir nechta variantdan faqat bittasini tanlash?`, `type="radio"`, [`type="checkbox"`, `type="text"`]),
      Q(`Ochiladigan ro'yxat tegi?`, `<select>`, [`<list>`, `<dropdown>`]),
      Q(`Ko'p qatorli matn maydoni?`, `<textarea>`, [`<input type="long">`, `<text>`]),
      Q(`Maydon bo'sh qolmasligi uchun atribut?`, `required`, [`must`, `need`]),
      Q(`Maydondagi kulrang maslahat matni?`, `placeholder`, [`hint`, `label`], `Placeholder label o'rnini bosmaydi.`),
      Q(`Yuborish tugmasi?`, `<button type="submit">`, [`<button type="send">`, `<submit>`])
    ],
    '7-2': [
      Q(`Flex elementlarni gorizontal markazlash?`, `justify-content: center`, [`align-items: center`, `text-align: center`]),
      Q(`Flex elementlarni vertikal markazlash?`, `align-items: center`, [`justify-content: center`, `vertical: middle`]),
      Q(`Elementlarni ustun shaklida joylash?`, `flex-direction: column`, [`flex-direction: row`, `display: column`]),
      Q(`Sig'masa keyingi qatorga o'tish?`, `flex-wrap: wrap`, [`flex: wrap`, `overflow: wrap`]),
      Q(`Elementlar orasida teng bo'shliq (chetlarda yo'q)?`, `justify-content: space-between`, [`justify-content: space-around`, `justify-content: center`]),
      Q(`flex: 1 nima qiladi?`, `Bo'sh joyni teng egallaydi`, [`Elementni yashiradi`, `Bitta qatorga siqadi`]),
      Q(`Flexbox qanday tartiblaydi?`, `Bir o'q bo'yicha (qator yoki ustun)`, [`Uch o'lchamda`, `Faqat diagonal`]),
      Q(`display: flex qaysi elementga yoziladi?`, `Ota (konteyner) elementga`, [`Har bir bola elementga`, `Faqat body ga`])
    ],
    '7-3': [
      Q(`Kartochka burchaklarini yumaloqlash?`, `border-radius`, [`corner`, `round`]),
      Q(`Profil rasmini doira qilish?`, `border-radius: 50%`, [`circle: 1`, `radius: full`]),
      Q(`Kartochkani sahifa o'rtasiga (flex body)?`, `justify-content va align-items: center`, [`margin: 999px`, `float: center`]),
      Q(`Tugma ustiga kelganda rang o'zgarishi?`, `:hover`, [`:checked`, `:empty`]),
      Q(`Silliq o'zgarish uchun xususiyat?`, `transition`, [`animate: yes`, `smooth`]),
      Q(`Kartochka kengligini cheklash?`, `max-width`, [`min-height`, `size`]),
      Q(`box-shadow: 0 4px 12px rgba(0,0,0,.2) da 12px nima?`, `Xiralik (blur)`, [`Rang`, `Qalinlik`]),
      Q(`Ikonka uchun qulay format?`, `SVG`, [`BMP`, `DOCX`])
    ],
    '8-1': [
      Q(`Grid'ni yoqish?`, `display: grid`, [`display: table`, `grid: on`]),
      Q(`grid-template-columns: 200px 1fr nechta ustun?`, `2`, [`1`, `3`]),
      Q(`Kataklar orasidagi masofa?`, `gap`, [`margin-grid`, `space`]),
      Q(`Element 2 ustun egallashi?`, `grid-column: span 2`, [`colspan: 2`, `width: 2`]),
      Q(`Grid va Flexbox farqi?`, `Grid ikki o'lchamli, Flex bir o'lchamli`, [`Farqi yo'q`, `Flex ikki o'lchamli`]),
      Q(`repeat(3, 1fr) nimani beradi?`, `3 ta teng ustun`, [`1 ta ustun`, `3 ta qator`]),
      Q(`Avtomatik moslashuvchi ustunlar?`, `repeat(auto-fit, minmax(200px, 1fr))`, [`repeat(3, 200px)`, `auto auto`]),
      Q(`Qatorlar balandligi xususiyati?`, `grid-template-rows`, [`grid-rows`, `row-height`])
    ],
    '8-2': [
      Q(`Telefonga moslashuv uchun majburiy meta teg?`, `<meta name="viewport" ...>`, [`<meta phone>`, `<mobile>`]),
      Q(`@media (min-width: 900px) qachon ishlaydi?`, `Ekran 900px va undan keng bo'lsa`, [`900px dan tor bo'lsa`, `Doim`]),
      Q(`Rasm konteynerdan chiqib ketmasligi?`, `max-width: 100%`, [`width: 9999px`, `overflow: big`]),
      Q(`Mobile-first nima?`, `Avval telefon uchun, keyin katta ekran`, [`Faqat telefon uchun`, `Avval kompyuter uchun`]),
      Q(`Brauzerda telefon ko'rinishini sinash?`, `F12 → qurilma rejimi`, [`Imkoni yo'q`, `Chop etish`]),
      Q(`Barmoq bilan bosish uchun tugmaning minimal o'lchami?`, `Taxminan 44px`, [`5px`, `200px`]),
      Q(`vw birligi nima?`, `Ekran kengligining 1%`, [`Piksel`, `Santimetr`]),
      Q(`Gorizontal aylantirish paydo bo'lsa sabab?`, `Ekrandan keng element`, [`Rang`, `Shrift`])
    ],
    '8-3': [
      Q(`JavaScript nima qiladi?`, `Sahifani interaktiv qiladi`, [`Faqat rang beradi`, `Faqat rasm chizadi`]),
      Q(`Konsolga chiqarish?`, `console.log()`, [`print()`, `echo`]),
      Q(`Qiymati o'zgaradigan o'zgaruvchi e'loni?`, `let`, [`const`, `variable`]),
      Q(`let x = 5; x = x + 2; x = ?`, `7`, [`5`, `52`]),
      Q(`"5" + 2 natijasi?`, `"52"`, [`7`, `Xato`], `Matnga son qo'shilsa, birlashtiriladi.`),
      Q(`Izoh qatori?`, `// izoh`, [`# izoh`, `** izoh`]),
      Q(`typeof 42 natijasi?`, `"number"`, [`"string"`, `"int"`]),
      Q(`JS kodi HTML'da qayerga yoziladi?`, `<script> tegiga`, [`<style> tegiga`, `<js> tegiga`])
    ],
    '9-1': [
      Q(`=== nimani tekshiradi?`, `Qiymat va turini`, [`Faqat qiymatni`, `Faqat turini`]),
      Q(`Ikki shart ham rost bo'lishi (JS)?`, `&&`, [`||`, `!`]),
      Q(`Kamida bittasi rost?`, `||`, [`&&`, `==`]),
      Q(`!true natijasi?`, `false`, [`true`, `undefined`]),
      Q(`if (ball >= 86) ... else if (ball >= 71) ... — ball 90 bo'lsa nechta blok ishlaydi?`, `Faqat birinchisi`, [`Ikkalasi`, `Hech biri`]),
      Q(`"Teng emas" JS'da?`, `!==`, [`<>`, `=!`]),
      Q(`a > b ? a : b nima qaytaradi?`, `Kattasini`, [`Kichigini`, `Yig'indini`]),
      Q(`if ichidagi kod qanday qavsda?`, `Jingalak { }`, [`Kvadrat [ ]`, `Burchakli < >`])
    ],
    '9-2': [
      Q(`for (let i = 1; i <= 5; i++) necha marta?`, `5`, [`4`, `6`]),
      Q(`for (let i = 0; i < 10; i += 2) da i qiymatlari?`, `0, 2, 4, 6, 8`, [`1, 3, 5, 7, 9`, `0 dan 10 gacha hammasi`]),
      Q(`Shart rost ekan takrorlovchi sikl?`, `while`, [`if`, `switch`]),
      Q(`Siklni to'xtatish buyrug'i?`, `break`, [`stop`, `end`]),
      Q(`Joriy qadamni o'tkazib yuborish?`, `continue`, [`skip`, `next`]),
      Q(`Cheksiz sikl xavfi?`, `Sahifa qotib qoladi`, [`Tezlashadi`, `Hech narsa`]),
      Q(`1 dan 5 gacha sonlar yig'indisi?`, `15`, [`10`, `5`]),
      Q(`i-- nima qiladi?`, `i ni 1 ga kamaytiradi`, [`1 ga oshiradi`, `i ni o'chiradi`])
    ],
    '9-3': [
      Q(`Massiv uzunligi?`, `arr.length`, [`arr.size`, `arr.count`]),
      Q(`Massivdagi birinchi element indeksi?`, `0`, [`1`, `-1`]),
      Q(`Oxirgi elementni olib tashlash?`, `pop()`, [`push()`, `shift()`]),
      Q(`Funksiya e'lon qilish?`, `function salom() { }`, [`func salom()`, `def salom():`]),
      Q(`Funksiya natija qaytaradigan so'z?`, `return`, [`give`, `output`]),
      Q(`function kv(n) { return n * n } — kv(4)?`, `16`, [`8`, `4`]),
      Q(`Strelkali funksiya?`, `const f = (a) => a * 2`, [`f -> a * 2`, `fn a: a * 2`]),
      Q(`[3, 5, 7].includes(5) natijasi?`, `true`, [`false`, `1`])
    ],
    '10-1': [
      Q(`DOM nima?`, `Sahifaning JS uchun daraxt modeli`, [`Dasturlash tili`, `Rasm formati`]),
      Q(`Klass bo'yicha birinchi elementni topish?`, `document.querySelector(".klass")`, [`getClass("klass")`, `find(".klass")`]),
      Q(`Element matnini o'zgartirish?`, `el.textContent = "Yangi"`, [`el.text("Yangi")`, `el = "Yangi"`]),
      Q(`Element ichiga HTML qo'yish?`, `innerHTML`, [`outerText`, `setHtml`]),
      Q(`Elementga klass qo'shish?`, `el.classList.add("faol")`, [`el.class("faol")`, `el.addClass("faol")`]),
      Q(`Barcha mos elementlarni topish?`, `querySelectorAll`, [`querySelector`, `getAll`]),
      Q(`Yangi element yaratish?`, `document.createElement("li")`, [`new li()`, `document.make("li")`]),
      Q(`Elementni sahifaga qo'shish?`, `parent.appendChild(el)`, [`el.show()`, `document.add(el)`])
    ],
    '10-2': [
      Q(`Tugma bosilganda funksiya ishlashi?`, `btn.addEventListener("click", fn)`, [`btn.onpress = fn`, `btn.listen("press")`]),
      Q(`Hisoblagichda har bosishda nima qilinadi?`, `n++ va ekranga chiqarish`, [`n = 0`, `Hech narsa`]),
      Q(`Klaviatura tugmasi bosilishi hodisasi?`, `keydown`, [`press`, `typing`]),
      Q(`Input'ga yozilganda hodisa?`, `input`, [`write`, `type`]),
      Q(`Formani yuborishda sahifa yangilanmasligi?`, `event.preventDefault()`, [`stop()`, `return 0`]),
      Q(`Sichqoncha ustiga kelish hodisasi?`, `mouseenter`, [`hoverin`, `mouse`]),
      Q(`Hodisa yuz bergan element?`, `event.target`, [`event.element`, `this.page`]),
      Q(`"Nolga tushirish" tugmasi nima qiladi?`, `n = 0 va ekranni yangilaydi`, [`n++`, `Sahifani yopadi`])
    ],
    '10-3': [
      Q(`Yangi vazifani ro'yxatga qo'shish?`, `li yaratib, ul ga appendChild`, [`alert()`, `console.log()`]),
      Q(`Bo'sh vazifani qo'shmaslik?`, `if (matn.trim() === "") return`, [`Hech narsa qilmaslik`, `Har doim qo'shish`]),
      Q(`Elementni o'chirish?`, `el.remove()`, [`el.delete()`, `el.hide()`]),
      Q(`Vazifani bajarildi deb belgilash?`, `classList.toggle("done")`, [`el.style = "done"`, `el.remove()`]),
      Q(`Ma'lumotni brauzerda saqlash?`, `localStorage.setItem()`, [`window.save()`, `saveFile()`]),
      Q(`localStorage'da massivni saqlash?`, `JSON.stringify bilan`, [`To'g'ridan-to'g'ri`, `Imkoni yo'q`]),
      Q(`Saqlangan massivni qaytarish?`, `JSON.parse(localStorage.getItem(...))`, [`Faqat getItem`, `load()`]),
      Q(`Qo'shgandan keyin input'ni tozalash?`, `input.value = ""`, [`input.clearAll()`, `input = 0`])
    ],
    '11-1': [
      Q(`Obyekt yozilishi?`, `{ ism: "Ali", yosh: 12 }`, [`[ism: "Ali"]`, `(ism = "Ali")`]),
      Q(`Obyektdan qiymat olish?`, `user.ism`, [`user->ism`, `user(ism)`]),
      Q(`[1, 2, 3, 4].filter(n => n % 2 === 0)?`, `[2, 4]`, [`[1, 3]`, `[1, 2, 3, 4]`]),
      Q(`[2, 4].map(n => n + 1)?`, `[3, 5]`, [`[2, 4, 1]`, `6`]),
      Q(`Massiv yig'indisi?`, `arr.reduce((s, n) => s + n, 0)`, [`arr.sum()`, `arr.total`]),
      Q(`Obyektlarni yosh bo'yicha saralash?`, `arr.sort((a, b) => a.yosh - b.yosh)`, [`arr.order("yosh")`, `sortBy()`]),
      Q(`Shartga mos birinchi elementni topish?`, `find()`, [`map()`, `first()`]),
      Q(`Obyekt kalitlari ro'yxati?`, `Object.keys(obj)`, [`obj.keys`, `keys(obj)`])
    ],
    '11-2': [
      Q(`Number("12.5") natijasi?`, `12.5`, [`"12.5"`, `NaN`]),
      Q(`Number("abc") natijasi?`, `NaN`, [`0`, `"abc"`], `NaN — "son emas".`),
      Q(`0.1 + 0.2 JS'da aniq 0.3 mi?`, `Yo'q (0.30000000000000004)`, [`Ha`, `Xato beradi`]),
      Q(`Natijani 2 xonagacha ko'rsatish?`, `n.toFixed(2)`, [`round(n, 2)`, `n.2`]),
      Q(`JS'da 5 / 0 natijasi?`, `Infinity`, [`0`, `Xato`], `Kalkulyatorda buni tekshirib, xabar chiqarish kerak.`),
      Q(`Kalkulyator tugmalari uchun qulay usul?`, `Hamma tugmaga bitta hodisa va data-atribut`, [`Har biriga 100 qator kod`, `Imkoni yo'q`]),
      Q(`eval() ishlatish xavfsizmi?`, `Yo'q, xavfli kod bajarishi mumkin`, [`Ha, doim`, `Eng yaxshi usul`]),
      Q(`parseInt("42px") natijasi?`, `42`, [`NaN`, `"42px"`])
    ],
    '11-3': [
      Q(`Portfolio saytida nima bo'lishi kerak?`, `O'zingiz haqingizda, loyihalar, aloqa`, [`Faqat parol`, `Hech narsa`]),
      Q(`Sahifa asosiy qismi tegi?`, `<main>`, [`<center>`, `<big>`]),
      Q(`Sayt pastki qismi tegi?`, `<footer>`, [`<bottom>`, `<end>`]),
      Q(`Tungi rejimni eslab qolish?`, `localStorage`, [`alert`, `console`]),
      Q(`Saytni bepul joylash?`, `GitHub Pages yoki Netlify`, [`Faqat pullik`, `Imkoni yo'q`]),
      Q(`Bosh sahifa fayl nomi?`, `index.html`, [`home.doc`, `main.css`]),
      Q(`Semantik teglarning foydasi?`, `Tuzilma tushunarli, qidiruv va ekran o'quvchilar uchun yaxshi`, [`Rang beradi`, `Foydasi yo'q`]),
      Q(`Saytni topshirishdan oldin nima tekshiriladi?`, `Havolalar, telefon ko'rinishi, imlo`, [`Hech narsa`, `Faqat rang`])
    ]
  };
})();
