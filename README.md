# ZIS ProStudent

1–11-sinf o'quvchilari uchun dasturlash to'garagi platformasi: **nazariya → test → amaliyot**. Har bir o'quvchi o'z login va paroli bilan kiradi. Admin (o'qituvchi) sinflar va o'quvchilarni boshqaradi.

- **Sayt (frontend):** oddiy HTML/CSS/JS fayllar. GitHub Pages yoki o'z saytingizda ishlaydi.
- **Backend:** Supabase (bepul PostgreSQL). Server ijaraga olish shart emas. Hamma mantiq `supabase/schema.sql` faylida.

## Imkoniyatlar

**Informatika (fan darslari)** — o'qituvchining taqvim-mavzu rejasi asosida:
- 2–8-sinflar: 374 ta dars (2, 3, 4-sinf 34 soatdan; 5, 6, 7, 8-sinf 68 soatdan), 849 ta test savoli.
- Har bir dars: nazariya, "Esda tuting", kod misollari, test va rejadagi **uyga vazifa**.
- **"Sinfda ko'rsatish"**: darsni proyektorga katta shriftda, to'liq ekranda chiqarish.
- O'quvchi faqat o'z sinfi dasturini ko'radi. O'qituvchi hamma sinflarni ko'radi.

**Dasturlash** (to'garaklar uchun): 1–11-daraja, 33 dars, kod avtomatik tekshiriladi, robot o'yini, sertifikat.

**Materiallar**: sayt havolasi (EduClub Typing Jungle, Scratch, Wordwall…), YouTube video, matn yoki fayl (PDF, rasm, 4 MB gacha). Material istalgan sinf va to'garaklarga biriktiriladi ("Barcha 3-sinflar" tugmasi bilan). O'quvchi uni platformaning ichida ochadi. Sayt boshqa sayt ichida ochilishni taqiqlasa, "Yangi oynada ochish" tugmasi chiqadi.

**Admin panel**:
- **Sinflar**: nomi, sinf dasturi (1–11), kurslar (Informatika, Dasturlash). Tahrirlash va o'chirish.
- **To'garaklar**: istalgan sinfdan o'quvchi qo'shish (qidiruv va sinf filtri bilan), chiqarish, jadval/izoh.
- **O'quvchilar**: bittadan yoki ro'yxat bilan qo'shish, login-parol avtomatik, login kartochkalari. "Tanlash" orqali bir nechta o'quvchini boshqa sinfga ko'chirish, to'garakka qo'shish yoki parolini yangilash.
- Rasm, **emoji** va stikerlar. Kahoot uslubidagi **emoji-avatar**: rangli fonda katta emoji.

**Kod muharriri (VS Code uslubida)**:
- Dark+ ranglari. HTML ichidagi `<style>` va `<script>` ham rangli. Qavslar chuqurligiga qarab sariq, pushti va ko'k rangda.
- Teg, qavs va qo'shtirnoqlar avtomatik yopiladi.
- **Emmet**: `ul>li*3` + Tab, `div.card` + Tab, `!` + Tab (to'liq HTML shablon).
- Kod tavsiyalari: HTML teglar va atributlar, CSS xususiyatlari va qiymatlari, JS so'zlari (↑ ↓ Enter).
- **Ctrl+/** — izoh, **Ctrl+Enter** — ishga tushirish, joriy qator ajratib ko'rsatiladi.

## Xavfsizlik

- Parollar **bcrypt** bilan shifrlanadi. Admin ham eski parolni ko'ra olmaydi, faqat yangisini beradi. Shuning uchun parol yaratilganda yoki yangilanganda kartochkani darhol chop eting.
- Bitta loginga 10 daqiqada 10 tadan ortiq noto'g'ri urinish bloklanadi.
- Jadvallar tashqaridan ko'rinmaydi. Sayt faqat `km_*` funksiyalarini chaqiradi, har bir funksiya sessiya va rolni tekshiradi.
- `config.js` dagi *publishable* kalit ochiq bo'lishi mumkin. **`service_role` yoki `secret` kalitni hech qachon saytga yozmang.**
- XP va dars sonini o'quvchining brauzeri hisoblaydi. Dasturlashni chuqur biladigan o'quvchi uni konsol orqali o'zgartirishi mumkin. To'garak uchun bu yetarli, rasmiy baho uchun esa yo'q.

## O'rnatish (taxminan 10 daqiqa)

### 1. Supabase loyihasi
1. [supabase.com](https://supabase.com) da ro'yxatdan o'ting → **New project**. Region: **Frankfurt (eu-central-1)**, O'zbekistonga eng yaqini.
2. Chap menyu: **SQL Editor → New query**. `supabase/schema.sql` faylini to'liq nusxa ko'chirib joylashtiring → **Run**. "Success" chiqishi kerak.
3. **Project Settings → API Keys** (yoki **Data API**): **Project URL** va **Publishable key** ni nusxa oling. Eski loyihalarda bu kalit "anon public" deb ataladi.

### 2. Saytni ulash
`assets/js/config.js` faylini oching va ikkala qiymatni yozing:

```js
KM.config = {
  supabaseUrl: 'https://abcdefgh.supabase.co',
  supabaseKey: 'sb_publishable_...',
  schoolName: 'ZIS ProStudent'
};
```

### 3. Joylash
- **GitHub Pages:** repozitoriyga yuklang → **Settings → Pages → Branch: `main` / root** → Save. Manzil: `https://<login>.github.io/kod-maktab/`
- **O'z saytingiz:** `kod-maktab` papkasini hostingga yuklang. Masalan: `xojimurodbektemirov.uz/prostudent/`

### 4. Birinchi kirish
Saytni oching. Birinchi marta **"Admin yaratish"** oynasi chiqadi: ismingiz, login va parol (kamida 8 belgi). Admin bitta marta yaratiladi, keyin bu oyna boshqa chiqmaydi.

Keyin: **Admin panel → Yangi sinf → O'quvchi qo'shish → Login kartochkalari → Chop etish.**

> Supabase'ning bepul loyihasi 7 kun hech kim kirmasa "uxlab qoladi" (masalan yozgi ta'tilda). Bunda Supabase panelida **Restore** tugmasini bosing, ma'lumotlar o'chmaydi.

## Bazani yangilash
Avvalgi versiyadan yangilayotgan bo'lsangiz: Supabase → **SQL Editor** → `supabase/schema.sql` ni yana to'liq joylashtirib **Run** bosing. Fayl qayta ishga tushirishga mo'ljallangan: mavjud o'quvchilar, parollar va progress o'chmaydi, faqat yangi jadvallar (to'garaklar, materiallar, fayllar) qo'shiladi.

## Yangi sinf rejasini qo'shish (7–11-sinflar)
1. Rejani `content/informatika/plans/07-sinf.xlsx` nomi bilan qo'ying. Ustunlar avvalgi rejalardagi kabi: dars raqami, mavzu, uyga vazifa.
2. Nazariya va testlarni `content/informatika/text/07.txt` ga yozing (format fayl boshida tushuntirilgan, 05.txt dan namuna oling).
3. `python3 tools/build_informatika.py` ni ishga tushiring: `content/informatika/sinf-07.js` yaratiladi.
4. `index.html` ga `<script src="content/informatika/sinf-07.js"></script>` qatorini qo'shing.

## Demo rejim
`config.js` bo'sh bo'lsa, sayt **demo rejimda** ishlaydi: hamma narsa shu brauzerda saqlanadi, namuna sinflar va o'quvchilar bor. Namuna hisoblar kirish sahifasida ko'rsatiladi (`ustoz / ustoz2026`, `aziza.rahimova / olma-2026`). Bu rejim faqat sinab ko'rish uchun.

## Kompyuterda ochish
VS Code'da **Live Server** kengaytmasi bilan `index.html` ni oching.

## Yangi dars qo'shish
Har bir sinf alohida faylda: `content/sinf-01.js` … `content/sinf-11.js`. Darsni shu fayldagi `lessons` ro'yxatiga qo'shing:

```js
{
  t: `Dars nomi`, min: 20,
  key: `Asosiy fikr bir gapda`,
  theory: `<p>Nazariya...</p>` + KM.x(`<h1>Misol</h1>`),        // KM.x(kod, 'html' | 'css' | 'js')
  quiz: [
    [`Savol?`, [`A`, `B`, `C`], 1, `Nega B to'g'ri`]              // 1 = to'g'ri javob indeksi (0 dan)
  ],
  prac: {
    task: `Vazifa matni`,
    tabs: ['html', 'css'], open: 'css',
    html: `boshlang'ich kod`, css: ``, js: ``,
    tests: [
      [`Talab matni`, () => !!document.querySelector('h2')]       // o'quvchi sahifasi ichida bajariladi
    ],
    hint: `Maslahat`,
    sol: { html: `yechim` }
  }
}
```

Robot darsi uchun: `prac: { type: 'robot', task: '...', map: ['S..#', '...G'], best: 3 }`. Belgilar: `S` start, `G` bayroq, `*` tanga, `#` devor, `.` yo'l.

## Tuzilma

```
index.html             asosiy sahifa
supabase/schema.sql    backend: jadvallar, login, admin funksiyalari
assets/js/config.js    Supabase manzili va kaliti
assets/js/api.js       server bilan aloqa (+ demo rejim)
assets/js/store.js     progress: brauzer + server sinxronizatsiyasi
assets/js/admin.js     admin panel
assets/js/staff.js     o'qituvchilar, sozlamalar (Telegram, zaxira), davomat, hisobot, ota-ona kabineti, sertifikatni tekshirish
assets/js/work.js      topshiriqlar va jurnal
assets/js/live.js      jonli viktorina (PIN, Supabase Realtime)
assets/js/python.js    Python brauzerda (Pyodide), py-worker.js alohida oqimda ishlatadi
assets/js/vendor/      qrcode.js (MIT, Kazuhiko Arase)
sw.js, manifest.webmanifest  oflayn rejim va telefonga o'rnatish (PWA)
.github/workflows/keepalive.yml  Supabase'ni har kuni "uyg'otadi"
assets/js/stickers.js  rasm, stikerlar, stiker tahrirlovchi
assets/js/app.js       kirish, sahifalar, router
assets/js/editor.js    kod muharriri
assets/js/runner.js    kodni xavfsiz iframe'da ishga tushirish va testlar
assets/js/robot.js     robot o'yini
assets/css/app.css     dizayn (yorug' va qorong'i rejim)
content/sinf-XX.js     dasturlash darslari
content/informatika/   informatika: plans/ (xlsx rejalar), text/ (nazariya), sinf-XX.js (tayyor)
tools/build_informatika.py  rejalar + nazariyadan darslarni yig'adi
```

## Platformani kuchaytirish (v5)

- **Fayllar Supabase Storage'da** (25 MB gacha). Storage sozlanmagan bo'lsa, 4 MB gacha fayllar avvalgidek bazaga yoziladi.
- **O'qituvchilar**: bosh admin "O'qituvchilar" bo'limida qo'shadi va sinflarni biriktiradi. O'qituvchi faqat o'z guruhlarini ko'radi.
- **Davomat** (guruh sahifasi → Davomat), **Hisobot** (admin panel → Hisobot), **Jurnal** Excel'ga.
- **Ota-ona havolasi**: o'quvchi sahifasida yaratiladi, ota-ona kirishsiz baho va davomatni ko'radi.
- **Sertifikat** haqiqiylik kodi va QR bilan; `#tekshirish-KOD` sahifasida tekshiriladi.
- **Telegram**: Sozlamalar → bot token → guruhlarni topish. Yangi topshiriq guruhga avtomatik yuboriladi (Supabase'da pg_net kerak).
- **Zaxira**: Sozlamalar → zaxira nusxani yuklab olish / tiklash.
- **Python** brauzerda: Kod maydoni → Python maydoni, Informatika darslaridagi Python misollarida "Sinab ko'rish".
- **Scratch, Google Slaydlar/Hujjat/Forma, Drive, Tinkercad, Canva** havolalari materiallarda platforma ichida ochiladi.
- **Oflayn rejim**: sayt bir marta ochilgandan keyin internet sust bo'lsa ham darslar ochiladi; telefonga ilova sifatida o'rnatiladi.
- **Jonli viktorina** Supabase Realtime orqali darhol yangilanadi.
