/* Avtomatik yaratilgan: tools/build_informatika.py. Qo'lda o'zgartirmang, text/08.txt ni tahrirlang. */
KM.inf({
"n": 8,
"title": "INFORMATIKA VA AXBOROT TEXNOLOGIYALARI",
"hours": 68,
"lessons": [
{
"n": 1,
"t": "Maʼlumot, axborot va bilimlar bazasi. Maʼlumot manbasi. Bevosita  va  bilvosita  manbalardan  maʼlumot  toʻplashning  afzallik  hamda  kamchiliklari. Axborotning sifati",
"hw": "Ma’lumot, axborot va bilim tushunchalariga bittadan misol keltiring; bevosita va bilvosita manbaning bittadan afzalligini yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "- **Ma'lumot (data)** — qayta ishlanmagan faktlar: \"36.6\", \"Toshkent\", \"25\".\n- **Axborot (information)** — ma'noga ega bo'lgan ma'lumot: \"Bemorning harorati 36.6 — normal\".\n- **Bilim (knowledge)** — axborotni tushunish va qo'llash: \"Harorat 37 dan oshsa, shifokorga murojaat qilish kerak\".\n**Bilimlar bazasi** — qoidalar va faktlar to'plami (masalan, shifokorlar tajribasi).\n**Manbalar:**\n- **Bevosita (birlamchi)** — ma'lumotni o'zingiz yig'asiz: so'rovnoma, o'lchash, kuzatish. + Aniq va maqsadga mos; − ko'p vaqt va mehnat.\n- **Bilvosita (ikkilamchi)** — boshqalar yig'gan: kitob, sayt, statistika. + Tez va arzon; − eskirgan yoki maqsadga to'liq mos bo'lmasligi mumkin.\n**Axborot sifati**: aniqlik, dolzarblik, to'liqlik, ishonchlilik, tushunarlilik.\n> Ma'lumot → axborot → bilim: har bosqichda qiymat ortadi.",
"quiz": [
[
"\"36.6\" — bu?",
[
"Axborot sifati",
"Bilim",
"Ma'lumot"
],
2
],
[
"So'rovnoma qanday manba?",
[
"Bilimlar bazasi",
"Bevosita",
"Bilvosita"
],
1
],
[
"Bilvosita manbaning kamchiligi?",
[
"Juda qimmat",
"Ko'p mehnat talab qiladi",
"Eskirgan bo'lishi mumkin"
],
2
]
]
},
{
"n": 2,
"t": "Kod  berish,  kodlash  va shifrlash. Ma’lumotlarni  kodlashning  afzallik  va kamchiliklari. Simmetrik va asimmetrik shifrlash usullari.",
"hw": "O‘zingiz tanlagan 5 so‘zli gapni oddiy usulda (harf siljitish) shifrlab, do‘stingizga yeching deb bering.",
"part": "1 CHORAK",
"sec": "",
"md": "- **Kodlash** — ma'lumotni boshqa ko'rinishga o'tkazish (saqlash va uzatish uchun): \"Toshkent\" → \"TSH\", erkak/ayol → E/A. + Joy tejaladi, tez kiritiladi; − kodni bilmagan tushunmaydi, aniqlik yo'qolishi mumkin.\n- **Shifrlash** — ma'lumotni begonalar o'qiy olmasligi uchun kalit bilan o'zgartirish.\n**Simmetrik shifrlash** — bitta kalit bilan shifrlanadi va ochiladi (Sezar shifri, AES). Tez, lekin kalitni xavfsiz yetkazish muammo.\n**Asimmetrik shifrlash** — ikki kalit: **ochiq kalit** (hamma biladi, shifrlaydi) va **yopiq kalit** (faqat egasida, ochadi). RSA; https va messenjerlarda ishlatiladi.\n> Sezar shifri: har harf 3 ta suriladi: OLMA → RODP.",
"quiz": [
[
"Bitta kalit bilan shifrlash va ochish?",
[
"Kodlash",
"Simmetrik",
"Asimmetrik"
],
1
],
[
"Asimmetrik shifrlashda kim ochadi?",
[
"Yopiq kalit egasi",
"Hech kim",
"Hamma"
],
0
],
[
"https qaysi shifrlashdan foydalanadi?",
[
"Faqat Sezar",
"Hech qanday",
"Asimmetrik (va simmetrik)"
],
2
]
]
},
{
"n": 3,
"t": "Ma’lumotlarning  toʻgʻriligini tekshirish.",
"hw": "Ma’lumotni tekshirishning 3 usulini yozing va har biriga misol keltiring.",
"part": "1 CHORAK",
"sec": "",
"md": "**Ma'lumot to'g'riligini tekshirish** ikki xil:\n- **Validatsiya** — kompyuter avtomatik tekshiradi: ma'lumot **mantiqan mumkinmi**?\n  - **Diapazon**: yosh 6–18.\n  - **Tur**: yoshga faqat son.\n  - **Uzunlik**: telefon 9 raqam.\n  - **Format**: sana kk.oo.yyyy.\n  - **Mavjudlik**: maydon bo'sh emas.\n- **Verifikatsiya** — ma'lumot **manbaga mosmi**? (ko'chirishda xato bo'lmadimi)\nValidatsiya \"13\" yoshni qabul qiladi, lekin haqiqiy yosh 31 bo'lsa — buni faqat verifikatsiya topadi.\n> Validatsiya — mantiqiylikni, verifikatsiya — aniqlikni tekshiradi.",
"quiz": [
[
"Yosh 6–18 oralig'ida bo'lishi — qaysi tekshiruv?",
[
"Diapazon",
"Format",
"Uzunlik"
],
0
],
[
"Ko'chirish xatosini topadigan tekshiruv?",
[
"Verifikatsiya",
"Shifrlash",
"Validatsiya"
],
0
]
]
},
{
"n": 4,
"t": "Vizual tekshirish va ma`lumotlanri ikki marta kiritish.",
"hw": "Sinfdoshlar ro‘yxatini (10 ta ism) ikki marta kiritib, vizual tekshirish orqali xatolarni toping.",
"part": "1 CHORAK",
"sec": "",
"md": "**Verifikatsiya usullari:**\n1. **Vizual tekshirish** — kiritilgan ma'lumotni manba bilan ko'z bilan solishtirish. Oddiy, lekin odam ham xato qilishi mumkin.\n2. **Ikki marta kiritish (double entry)** — ma'lumot ikki marta kiritiladi, kompyuter ikkalasini solishtiradi. Mos kelmasa — xato. Masalan, parolni \"takrorlang\" maydoni.\nIkki marta kiritish ishonchliroq, lekin vaqt ko'proq ketadi.\n> Ro'yxatdan o'tishda parol va emailni ikki marta so'rash — verifikatsiya.",
"quiz": [
[
"Parolni \"takrorlang\" maydoni qaysi usul?",
[
"Diapazon",
"Ikki marta kiritish",
"Vizual tekshirish"
],
1
],
[
"Vizual tekshirishning kamchiligi?",
[
"Kompyuter kerak emas",
"Odam ham xato qiladi",
"Juda qimmat"
],
1
]
]
},
{
"n": 5,
"t": "Apparat ta`minot. Ichki va tashqi qurilmalar",
"hw": "Kompyuterning 5 ta ichki va 5 ta tashqi qurilmasini jadvalda yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Apparat ta'minot (hardware)** — kompyuterning fizik qismlari.\n**Ichki qurilmalar** (korpus ichida): ona plata, **protsessor (CPU)**, **tezkor xotira (RAM)**, **SSD/HDD**, videokarta (GPU), quvvat bloki, sovutgich.\n**Tashqi (periferik) qurilmalar**:\n- **Kiritish**: klaviatura, sichqoncha, mikrofon, skaner, kamera.\n- **Chiqarish**: monitor, printer, karnay, proyektor.\n- **Saqlash**: flesh, tashqi disk.\n> Ona plata — barcha qismlarni bog'lovchi \"asos\".",
"quiz": [
[
"Barcha ichki qismlarni bog'lovchi plata?",
[
"Quvvat bloki",
"Videokarta",
"Ona plata"
],
2
],
[
"Skaner qanday qurilma?",
[
"Ichki",
"Kiritish",
"Chiqarish"
],
1
]
]
},
{
"n": 6,
"t": "Xotira qurilmalari. Tizimli dasturiy ta`minot. Drayverlar.",
"hw": "Xotira qurilmalari (RAM, SSD, flesh) va drayver vazifasini 5–6 gapda yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Xotira qurilmalari:**\n- **RAM** — tezkor, vaqtinchalik (tok o'chsa tozalanadi), ishlayotgan dasturlar uchun.\n- **ROM** — o'zgarmas, kompyuter yuklanishi uchun dastur (BIOS/UEFI).\n- **HDD** — magnit disk, arzon, sekinroq. **SSD** — flesh-xotira, tez, harakatlanuvchi qismsiz.\n- **Flesh, xotira kartasi**, **bulut** (Google Drive).\n**Tizimli dasturiy ta'minot** — kompyuter ishini ta'minlaydi: **operatsion tizim** (Windows, Linux, Android), **drayverlar**, utilitlar.\n**Drayver** — OT ga ma'lum qurilma (printer, videokarta) bilan \"gaplashish\"ni o'rgatuvchi dastur.\n> Yangi printer ishlamasa — avval drayverini o'rnating.",
"quiz": [
[
"Tok o'chganda tozalanadigan xotira?",
[
"SSD",
"RAM",
"ROM"
],
1
],
[
"OT ga qurilma bilan ishlashni o'rgatuvchi dastur?",
[
"Brauzer",
"Antivirus",
"Drayver"
],
2
]
]
},
{
"n": 7,
"t": "Amaliy dasturiy ta`minot. Fotosuratni  tahrirlash dasturiy  taʼminoti",
"hw": "Fotosuratni tahrirlash dasturida bitta rasmning yorqinligi va kesilishini o‘zgartirib saqlang.",
"part": "1 CHORAK",
"sec": "",
"md": "**Amaliy dasturiy ta'minot** — foydalanuvchi vazifalari uchun: Word, Excel, brauzer, o'yinlar, grafik muharrirlar.\n**Foto tahrirlash dasturlari**: Photoshop, GIMP (bepul), Photopea (onlayn), Snapseed (telefon).\nAsosiy amallar:\n- **Crop** — kesish, kompozitsiya.\n- **Yorqinlik / kontrast**, rang balansi.\n- **Qatlamlar (layers)** — rasmning alohida qismlari.\n- **Filtr va effektlar**, shovqinni kamaytirish.\n- O'lcham va format (JPG, PNG) bilan saqlash.\n> Asl faylni saqlab qo'ying — tahrirni nusxasida qiling.",
"quiz": [
[
"Bepul foto muharrir?",
[
"GIMP",
"Audacity",
"Word"
],
0
],
[
"Rasmning alohida qismlari?",
[
"Kadrlar",
"Qatlamlar",
"Slaydlar"
],
1
]
]
},
{
"n": 8,
"t": "Video  tahrirlash  dasturiy taʼminoti. Veb  sahifa  ishlab  chiqish dasturiy  taʼminoti",
"hw": "Video tahrirlash va veb-sahifa ishlab chiqish dasturlariga bittadan misol keltirib, vazifasini yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Video tahrirlash dasturlari**: DaVinci Resolve, Shotcut (bepul), CapCut, Adobe Premiere. Vazifasi: kesish, birlashtirish, o'tishlar, matn, musiqa, rang korreksiyasi, eksport (MP4).\n**Veb-sahifa ishlab chiqish dasturlari**:\n- **Kod muharrirlari**: Visual Studio Code, Notepad++ — HTML, CSS, JS yozish.\n- **Vizual konstruktorlar**: WordPress, Wix, Tilda — kodsiz sayt.\n- **Brauzer + DevTools (F12)** — sahifani tekshirish.\n> Shu platformadagi Kod maydoni ham kichik veb-ishlab chiqish muhiti!",
"quiz": [
[
"Bepul video muharrir?",
[
"Excel",
"Shotcut",
"Paint"
],
1
],
[
"HTML yozish uchun kod muharriri?",
[
"Photoshop",
"Visual Studio Code",
"Audacity"
],
1
]
]
},
{
"n": 9,
"t": "Foydalanuvchi interfeysi dizaynidagi boshqaruv elementlari. Utilit  dasturlar. Buyurtma  yoki  tayyor dasturiy ta`minot.",
"hw": "Biror dasturdagi 5 ta boshqaruv elementini (tugma, menyu va h.k.) va 2 ta utilit dasturni yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Foydalanuvchi interfeysi (UI) boshqaruv elementlari:**\n- **Tugma (button)**, **menyu**, **matn maydoni (text box)**.\n- **Bayroqcha (checkbox)** — bir nechta tanlov; **radio tugma** — bitta tanlov.\n- **Ochiluvchi ro'yxat (drop-down)**, **slayder**, **yorliq (tab)**.\n**Utilitlar** — tizimga xizmat ko'rsatuvchi kichik dasturlar: antivirus, arxivator (7-Zip), diskni tozalash, zaxira nusxa.\n**Buyurtma (custom) dastur** — maxsus tashkilot uchun yoziladi: aniq ehtiyojga mos, lekin qimmat va uzoq.\n**Tayyor (off-the-shelf) dastur** — hamma uchun sotiladi: arzon, tez o'rnatiladi, lekin ortiqcha yoki yetishmaydigan funksiyalar bo'lishi mumkin.\n> Bitta variantni tanlash uchun — radio tugma, bir nechtasi — checkbox.",
"quiz": [
[
"Bir nechta variant tanlash elementi?",
[
"Radio tugma",
"Slayder",
"Checkbox"
],
2
],
[
"Arxivator qaysi turga kiradi?",
[
"Drayver",
"Amaliy o'yin",
"Utilit"
],
2
],
[
"Buyurtma dasturning kamchiligi?",
[
"Juda arzon",
"Hamma uchun bir xil",
"Qimmat va uzoq"
],
2
]
]
},
{
"n": 10,
"t": "Loyiha (amaliy) ishi",
"hw": "Loyiha mavzusini tanlab, maqsad va rejani 5–6 gapda yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Loyiha ishi** bosqichlari:\n1. **Mavzu** tanlash (masalan, \"Maktab uchun qaysi dastur kerak?\").\n2. **Maqsad** va **vazifalar**.\n3. **Reja**: kim nima qiladi, muddat.\n4. **Bajarish**: ma'lumot yig'ish, mahsulot yaratish.\n5. **Taqdimot** va **baholash**.\nYaxshi maqsad **SMART**: aniq (Specific), o'lchanadigan (Measurable), erishiladigan (Achievable), dolzarb (Relevant), muddatli (Time-bound).\n> \"Yaxshi taqdimot qilaman\" emas — \"15-dekabrgacha 8 slaydli taqdimot tayyorlayman\".",
"quiz": [
[
"SMART'dagi T nima?",
[
"Texnik",
"Tez",
"Muddatli"
],
2
],
[
"Loyihaning oxirgi bosqichi?",
[
"Reja",
"Taqdimot va baholash",
"Mavzu tanlash"
],
1
]
]
},
{
"n": 11,
"t": "Nazorat ishi",
"hw": "Takrorlang: apparat va dasturiy ta’minot turlarini jadvalda yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Nazorat ishi: apparat va dasturiy ta'minot.**\n| Turi | Misollar |\n| Ichki qurilma | CPU, RAM, SSD, ona plata |\n| Tashqi qurilma | Monitor, printer, skaner |\n| Tizimli DT | Windows, drayverlar, utilitlar |\n| Amaliy DT | Word, GIMP, Shotcut, brauzer |\nYana: ma'lumot/axborot/bilim, kodlash va shifrlash, validatsiya va verifikatsiya.",
"quiz": [
[
"Windows qaysi turga kiradi?",
[
"Tizimli DT",
"Amaliy DT",
"Apparat"
],
0
],
[
"GIMP qaysi turga kiradi?",
[
"Drayver",
"Amaliy DT",
"Tizimli DT"
],
1
],
[
"Mantiqiylikni tekshirish?",
[
"Validatsiya",
"Verifikatsiya",
"Shifrlash"
],
0
],
[
"Ochiq va yopiq kalitli shifrlash?",
[
"Sezar",
"Simmetrik",
"Asimmetrik"
],
2
]
]
},
{
"n": 12,
"t": "Sensorlar. Harakat va bosim sensorlari, Namlik, harorat va  yorug‘lik sensorlari",
"hw": "Uyingizdagi 3 ta sensorli qurilmani topib, qaysi sensordan foydalanishini yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Sensor (datchik)** — fizik kattalikni o'lchab, elektr signaliga aylantiruvchi qurilma. Kompyuter yoki mikrokontroller (Arduino) uni o'qiydi.\n- **Harakat** — xavfsizlik signalizatsiyasi, avtomatik chiroq.\n- **Bosim** — tarozi, avtomobil shinasi, sensorli ekran.\n- **Namlik** — issiqxona, havo namlatgichi.\n- **Harorat** — konditsioner, isitgich, termometr.\n- **Yorug'lik** — ko'cha chiroqlari, telefon ekrani yorqinligi.\nSensor → ADC (analog-raqamli o'zgartirgich) → kompyuter → qaror → aktuator (motor, chiroq).\n> Smartfonda 10 dan ortiq sensor bor: akselerometr, giroskop, yorug'lik, yaqinlik...",
"quiz": [
[
"Telefon ekrani yorqinligini qaysi sensor boshqaradi?",
[
"Bosim",
"Yorug'lik",
"Namlik"
],
1
],
[
"Analog signalni raqamliga aylantiruvchi?",
[
"Router",
"RAM",
"ADC"
],
2
]
]
},
{
"n": 13,
"t": "Elektron xavfsizlik tushunchasi.",
"hw": "Elektron xavfsizlik nima ekanini 3 gapda yozing va 4 ta himoya qoidasini sanang.",
"part": "1 CHORAK",
"sec": "",
"md": "**Elektron xavfsizlik** — ma'lumotlar, qurilmalar va shaxsni raqamli tahdidlardan himoya qilish.\nUchta asosiy tamoyil (**CIA**):\n- **Maxfiylik** (Confidentiality) — faqat ruxsat etilganlar ko'radi.\n- **Yaxlitlik** (Integrity) — ma'lumot ruxsatsiz o'zgarmaydi.\n- **Foydalanish imkoniyati** (Availability) — kerak paytda ishlaydi.\nHimoya qoidalari: kuchli parol + 2FA, yangilanishlar, antivirus, zaxira nusxa, shubhali havolalarni bosmaslik.\n> Xavfsizlik — bir martalik ish emas, doimiy odat.",
"quiz": [
[
"Ma'lumotni faqat ruxsat etilganlar ko'rishi?",
[
"Yaxlitlik",
"Foydalanish imkoniyati",
"Maxfiylik"
],
2
],
[
"Ma'lumot ruxsatsiz o'zgarmasligi?",
[
"Tezlik",
"Yaxlitlik",
"Maxfiylik"
],
1
]
]
},
{
"n": 14,
"t": "Phishing, Pharming, Vishing, Troyan, Worm, Spyware, Rootkit, Adware, Ransomware tushunchalari va xavfsizlikni ta`minlash.",
"hw": "Phishing, Troyan va Ransomware tushunchalariga bittadan misol yozing; himoyalanishning 5 ta usulini sanang.",
"part": "1 CHORAK",
"sec": "",
"md": "**Raqamli tahdidlar:**\n- **Phishing** — soxta xat/sayt orqali parol va karta ma'lumotini o'g'irlash.\n- **Pharming** — foydalanuvchini to'g'ri manzil yozganda ham soxta saytga yo'naltirish (DNS buzish).\n- **Vishing** — telefon qo'ng'irog'i orqali aldash (\"bankdan qo'ng'iroq qilyapmiz, SMS kodni ayting\").\n- **Troyan** — foydali dastur qiyofasidagi zararli dastur.\n- **Worm (qurt)** — o'zini tarmoq orqali o'zi ko'paytiradi.\n- **Spyware** — yashirincha kuzatadi, klavishlarni yozib oladi.\n- **Rootkit** — tizimda chuqur yashirinib, boshqa zararlilarga yo'l ochadi.\n- **Adware** — majburiy reklama ko'rsatadi.\n- **Ransomware** — fayllarni shifrlab, to'lov talab qiladi.\nHimoya: antivirus, yangilanish, 2FA, rasmiy manbalardan o'rnatish, **zaxira nusxa** (ransomware'ga qarshi eng yaxshi chora), SMS kodni hech kimga aytmaslik.\n> Bank hech qachon SMS kodingizni so'ramaydi.",
"quiz": [
[
"Telefon orqali aldash?",
[
"Vishing",
"Adware",
"Worm"
],
0
],
[
"Fayllarni shifrlab to'lov talab qiladi?",
[
"Pharming",
"Ransomware",
"Spyware"
],
1
],
[
"O'zini o'zi tarmoqda ko'paytiradi?",
[
"Worm",
"Troyan",
"Phishing"
],
0
]
]
},
{
"n": 15,
"t": "Salomatlik va xavfsizlik.",
"hw": "Kompyuter va telefondan foydalanishda salomatlikni saqlash bo‘yicha 6 ta qoida yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Salomatlik va xavfsizlik:**\nSalomatlik xavflari va choralari:\n- **Ko'z charchashi** — 20-20-20 qoidasi: har 20 daqiqada 20 soniya 6 metr uzoqqa qarash.\n- **Bel va bo'yin og'rig'i** — to'g'ri o'tirish, ekran ko'z darajasida.\n- **Qo'l og'rig'i (RSI)** — tanaffus, ergonomik klaviatura/sichqoncha.\n- **Uyqu buzilishi** — uxlashdan 1 soat oldin ekransiz.\nXavfsizlik xavflari: elektr toki (ho'l qo'l, buzilgan sim), yong'in (rozetkani ortiqcha yuklamaslik), simlarga qoqilish.\n> Har soatda 5–10 daqiqa harakat qiling.",
"quiz": [
[
"20-20-20 qoidasi nima uchun?",
[
"Uxlash uchun",
"Tez yozish uchun",
"Ko'z charchamasligi uchun"
],
2
],
[
"Rozetkani ortiqcha yuklash xavfi?",
[
"Spam",
"Ko'z charchashi",
"Yong'in"
],
2
]
]
},
{
"n": 16,
"t": "Raqamli  tengsizlik tushunchasi va sabablari, Sanoati rivojlangan va rivojlanmagan hududlar, Ijtimoiy-iqtisodiy  guruhlar.",
"hw": "Raqamli tengsizlikning 3 ta sababini yozing va bitta misol keltiring.",
"part": "1 CHORAK",
"sec": "",
"md": "**Raqamli tengsizlik (digital divide)** — odamlar o'rtasida raqamli texnologiyalarga ega bo'lish va ulardan foydalanish imkoniyatidagi farq.\nSabablari:\n- **Iqtisodiy** — qurilma va internet narxi.\n- **Hududiy** — qishloqda tezkor internet yo'qligi.\n- **Ta'lim** — raqamli savodxonlik darajasi.\n- **Yosh** — keksalar qiynaladi.\n- **Infratuzilma** — elektr va aloqa tarmog'i.\nSanoati rivojlangan va rivojlanmagan hududlar, turli ijtimoiy-iqtisodiy guruhlar orasidagi farq aniq ko'rinadi.\nYechimlar: arzon internet, jamoat Wi-Fi'si, maktablarda IT ta'limi, qurilma ulashish dasturlari.\n> Masofaviy ta'lim davrida internet yo'q o'quvchilar ortda qolgan — bu raqamli tengsizlik.",
"quiz": [
[
"Raqamli tengsizlik nima?",
[
"Kodlash",
"Texnologiyaga ega bo'lishdagi farq",
"Ekran o'lchami"
],
1
],
[
"Qishloqda internet sustligi qaysi sabab?",
[
"Hududiy",
"Ta'lim",
"Yosh"
],
0
]
]
},
{
"n": 17,
"t": "Nazorat ishi",
"hw": "Takrorlang: xavfsizlik va raqamli tengsizlik bo‘yicha 5 ta atamani yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Nazorat ishi: sensorlar, xavfsizlik, raqamli tengsizlik.**\nAtamalar: sensor, CIA, phishing, vishing, ransomware, troyan, worm, 20-20-20, raqamli tengsizlik.",
"quiz": [
[
"Harakatni sezuvchi qurilma?",
[
"Drayver",
"Router",
"Harakat sensori"
],
2
],
[
"Soxta saytga avtomatik yo'naltirish?",
[
"Adware",
"Pharming",
"Vishing"
],
1
],
[
"Ransomware'ga qarshi eng yaxshi chora?",
[
"Zaxira nusxa",
"Kattaroq ekran",
"Ko'proq reklama"
],
0
],
[
"Raqamli tengsizlikka qarshi yechim?",
[
"Arzon internet va IT ta'limi",
"Internetni o'chirish",
"Qurilmalarni qimmatlashtirish"
],
0
]
]
},
{
"n": 18,
"t": "Samarasi  yuqori  va  past  boʻlgan texnologiyalar. Turli davlatlardagi holatlarni o‘rganish",
"hw": "Samarasi yuqori va past bo‘lgan texnologiyaga bittadan misol keltirib, farqini yozing.",
"part": "1 CHORAK",
"sec": "",
"md": "**Samaradorlik** — texnologiya qancha foyda beradi va qancha resurs talab qiladi.\n- **Samarasi yuqori**: elektron hukumat xizmatlari (my.gov.uz — navbatsiz hujjat), onlayn to'lov, masofaviy tibbiyot, aqlli svetofor.\n- **Samarasi past**: eskirgan uskunalar, internet bo'lmagan joyda onlayn tizim, foydalanuvchi o'rganmagan murakkab dastur.\nTurli davlatlar tajribasi: Estoniya — deyarli barcha davlat xizmatlari onlayn; Janubiy Koreya — eng tez internetlardan biri; Afrika — mobil to'lovlar (M-Pesa) bank tizimini o'rnini bosdi.\n> Texnologiya samarasi uni qanday joriy etishga bog'liq.",
"quiz": [
[
"Samarasi yuqori texnologiyaga misol?",
[
"Eskirgan kompyuter",
"Elektron davlat xizmatlari",
"Internet yo'q joyda onlayn tizim"
],
1
],
[
"Mobil to'lovlar qayerda bank o'rnini bosdi?",
[
"Antarktidada",
"Afrikada (M-Pesa)",
"Hech qayerda"
],
1
]
]
},
{
"n": 19,
"t": "Tarmoq kompyuterlari. Lokal hududiy (Local area networks) va global hududiy tarmoq (Wide area networks).",
"hw": "Lokal (LAN) va global (WAN) tarmoqqa bittadan misol keltirib, farqini jadvalda yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Tarmoqlar hajmi bo'yicha:**\n- **LAN (Local Area Network)** — bino yoki kampus: maktab, ofis. Tez, xususiy, arzon.\n- **WAN (Wide Area Network)** — shaharlar va davlatlar: bank filiallari tarmog'i, Internet. Provayder liniyalari, sekinroq, qimmat.\n- **WLAN** — simsiz lokal tarmoq (Wi-Fi).\n| Belgi | LAN | WAN |\n| Hudud | Kichik | Katta |\n| Tezlik | Yuqori | Pastroq |\n| Egasi | Tashkilot | Provayderlar |\n> Internet — WAN'larning eng kattasi.",
"quiz": [
[
"Bank filiallarini birlashtiruvchi tarmoq?",
[
"LAN",
"PAN",
"WAN"
],
2
],
[
"Simsiz lokal tarmoq?",
[
"WLAN",
"WAN",
"VPN"
],
0
]
]
},
{
"n": 20,
"t": "Kliyent-server va peer-to-peer tarmoqlari.",
"hw": "Kliyent-server va peer-to-peer tarmoqlarining farqini jadvalda ko‘rsating.",
"part": "2 CHORAK",
"sec": "",
"md": "**Tarmoq arxitekturasi:**\n- **Kliyent-server** — markaziy **server** xizmat ko'rsatadi (fayl, sayt, pochta), **kliyentlar** so'rov yuboradi. + Markaziy boshqaruv, xavfsizlik, zaxira; − server qimmat, u ishdan chiqsa hamma to'xtaydi.\n- **Peer-to-peer (P2P)** — barcha kompyuterlar teng, bir-biri bilan bevosita almashadi. + Arzon, oddiy; − boshqaruv va xavfsizlik zaif, katta tarmoq uchun noqulay.\n> Maktab tizimi — kliyent-server; ikki do'st kompyuteri o'rtasida fayl almashish — P2P.",
"quiz": [
[
"Markaziy kompyuter xizmat ko'rsatadigan tarmoq?",
[
"Yulduz",
"Kliyent-server",
"P2P"
],
1
],
[
"P2P ning afzalligi?",
[
"Server kuchli",
"Arzon va oddiy",
"Markaziy xavfsizlik"
],
1
]
]
},
{
"n": 21,
"t": "Virtual shaxsiy tarmoq (VPN)",
"hw": "VPN nima uchun kerakligini 3 gapda yozing va 2 ta foydalanish holatini keltiring.",
"part": "2 CHORAK",
"sec": "",
"md": "**VPN (Virtual Private Network)** — ommaviy tarmoq (Internet) ustida **shifrlangan \"tunnel\"** yaratadi.\nFoydalanish holatlari:\n- Xodim uydan kompaniyaning ichki tarmog'iga xavfsiz ulanadi.\n- Jamoat Wi-Fi'da (kafe, aeroport) ma'lumotlarni himoya qilish.\n- Filiallarni xavfsiz bog'lash.\nVPN trafikni shifrlaydi va IP-manzilni yashiradi, lekin noma'lum bepul VPN'lar ma'lumotingizni yig'ishi mumkin.\n> VPN — Internet ichidagi shaxsiy yopiq yo'lak.",
"quiz": [
[
"VPN nima yaratadi?",
[
"Shifrlangan tunnel",
"Printer",
"Yangi sayt"
],
0
],
[
"Qachon VPN foydali?",
[
"Rasm chizishda",
"Offline o'yinda",
"Jamoat Wi-Fi'da"
],
2
]
]
},
{
"n": 22,
"t": "Intranet va ekstranet. Internet va uning xususiyatlari",
"hw": "Intranet, ekstranet va Internetning farqini 3 qatorli jadvalda yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "- **Internet** — global ommaviy tarmoq, hamma ulana oladi.\n- **Intranet** — tashkilotning **ichki** yopiq tarmog'i: xodimlar uchun e'lonlar, hujjatlar, jadvallar. Faqat ichkaridagilar kiradi.\n- **Ekstranet** — intranetning bir qismi tanlangan **tashqi hamkorlar**ga ochilgan (yetkazib beruvchilar, mijozlar).\nInternet xususiyatlari: markazlashmagan, IP manzillar va **TCP/IP** protokollari, DNS (nom → IP), WWW, email, bulut xizmatlari.\n> Maktab elektron jurnali — intranet; ota-onalarga ochilgan qismi — ekstranetga o'xshash.",
"quiz": [
[
"Faqat xodimlar kiradigan ichki tarmoq?",
[
"Intranet",
"Internet",
"Ekstranet"
],
0
],
[
"Domen nomini IP ga aylantiruvchi tizim?",
[
"VPN",
"LAN",
"DNS"
],
2
]
]
},
{
"n": 23,
"t": "Internetda muloqot qilish. Mobil tarmoqlar",
"hw": "Internetda muloqot qilishning 4 usulini va mobil tarmoq avlodlarini (3G, 4G, 5G) yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Internetda muloqot usullari:** email, messenjerlar (Telegram), ijtimoiy tarmoqlar, forum va bloglar, video qo'ng'iroq.\n**Mobil tarmoqlar avlodlari:**\n- **2G** — qo'ng'iroq va SMS.\n- **3G** — mobil internet, video qo'ng'iroq.\n- **4G (LTE)** — tez internet, HD video.\n- **5G** — juda tez va kam kechikish: aqlli shaharlar, avtonom avtomobillar, IoT.\n> Har yangi avlod — tezlik oshishi va kechikish kamayishi.",
"quiz": [
[
"Kam kechikish va IoT qaysi avlodning xususiyati?",
[
"3G",
"2G",
"5G"
],
2
],
[
"2G nima uchun mo'ljallangan?",
[
"Avtonom mashinalar",
"HD video",
"Qo'ng'iroq va SMS"
],
2
]
]
},
{
"n": 24,
"t": "Video va veb konferensiya. Videokonferensiyaning jamiyatga taʼsiri",
"hw": "Videokonferensiyaning jamiyatga 3 ta ijobiy va 2 ta salbiy ta’sirini yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Videokonferensiya** — bir necha joydagi odamlarning video va ovoz orqali uchrashuvi (Zoom, Google Meet, Teams). **Veb-konferensiya** — brauzer orqali, ekran ulashish, chat, so'rovnomalar bilan.\nKerak: kamera, mikrofon, karnay/quloqchin, barqaror internet, dastur.\n**Jamiyatga ta'siri:**\n+ Yo'l va vaqt tejaladi, masofaviy ta'lim va ish, xalqaro hamkorlik, ekologiya (kam safar).\n− Jonli muloqot kamayadi, internetga bog'liqlik, \"Zoom charchoqi\", maxfiylik xavfi.\n> Videokonferensiyada: mikrofonni o'chirib turing, gapirganda yoqing.",
"quiz": [
[
"Videokonferensiyaning ijobiy ta'siri?",
[
"Vaqt va yo'l tejaladi",
"Jonli muloqot ko'payadi",
"Internet kerak emas"
],
0
],
[
"Videokonferensiya dasturiga misol?",
[
"Excel",
"GIMP",
"Google Meet"
],
2
]
]
},
{
"n": 25,
"t": "Nazorat ishi",
"hw": "Takrorlang: tarmoq turlari va Internet bo‘yicha 5 ta atamani yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Nazorat ishi: tarmoqlar va Internet.**\nAtamalar: LAN, WAN, WLAN, kliyent-server, P2P, VPN, intranet, ekstranet, DNS, 4G/5G, videokonferensiya.",
"quiz": [
[
"Hamma kompyuterlar teng bo'lgan tarmoq?",
[
"Kliyent-server",
"WAN",
"P2P"
],
2
],
[
"Tashqi hamkorlarga ochilgan tarmoq?",
[
"LAN",
"Ekstranet",
"Intranet"
],
1
],
[
"Jamoat Wi-Fi'da himoya?",
[
"VPN",
"Hub",
"Adware"
],
0
],
[
"Lokal tarmoq?",
[
"LAN",
"WAN",
"5G"
],
0
]
]
},
{
"n": 26,
"t": "Ekspert tizim haqida",
"hw": "Ekspert tizim nima ekanini 3 gapda yozing va 2 ta misol keltiring.",
"part": "2 CHORAK",
"sec": "",
"md": "**Ekspert tizim** — muayyan sohadagi mutaxassis (ekspert) bilimini saqlab, savollar orqali muammoga yechim yoki tavsiya beruvchi kompyuter dasturi. Sun'iy intellektning bir turi.\nMisollar:\n- **Tibbiy tashxis** — simptomlar bo'yicha kasallikni taxmin qiladi.\n- **Avtomobil nosozligi** — \"Motor ishga tushmayapti\" → sabablar.\n- **Geologiya** — foydali qazilma qidirish.\n- **Moliya** — kredit berish qarori.\n- Shaxmat dasturlari.\n> Ekspert tizim mutaxassisni o'rnini bosmaydi — unga yordam beradi.",
"quiz": [
[
"Ekspert tizim kimning bilimini saqlaydi?",
[
"Soha mutaxassisining",
"Tasodifiy odamning",
"Hech kimning"
],
0
],
[
"Ekspert tizimga misol?",
[
"Kalkulyator",
"Tibbiy tashxis tizimi",
"Paint"
],
1
]
]
},
{
"n": 27,
"t": "Bilimlar bazasi va yakunlovchi mexanizm",
"hw": "Bilimlar bazasi va yakunlovchi mexanizm vazifasini oddiy misol bilan tushuntiring.",
"part": "2 CHORAK",
"sec": "",
"md": "Ekspert tizim tuzilishi:\n- **Bilimlar bazasi** — faktlar va **qoidalar**: \"AGAR harorat > 38 VA yo'tal bor BO'LSA, gripp ehtimoli yuqori\".\n- **Yakunlovchi (xulosa) mexanizmi (inference engine)** — foydalanuvchi javoblarini qoidalarga solishtirib, xulosa chiqaradi.\n- **Foydalanuvchi interfeysi** — savol beradi va javobni ko'rsatadi.\n- **Tushuntirish moduli** — \"Nega shunday xulosa?\" savoliga javob beradi.\n> Bilimlar bazasi — \"nimalarni biladi\", yakunlovchi mexanizm — \"qanday o'ylaydi\".",
"quiz": [
[
"AGAR-U HOLDA qoidalari qayerda saqlanadi?",
[
"Monitorda",
"Interfeysda",
"Bilimlar bazasida"
],
2
],
[
"Javoblarni qoidalarga solishtirib xulosa chiqaradi?",
[
"Printer",
"Bilimlar bazasi",
"Yakunlovchi mexanizm"
],
2
]
]
},
{
"n": 28,
"t": "Foydalanuvchi interfeysi",
"hw": "Ekspert tizim uchun qulay foydalanuvchi interfeysi bo‘lishi kerak bo‘lgan 4 ta talabni yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Ekspert tizim interfeysi** talablari:\n1. **Tushunarli savollar** — oddiy til, bitta savol — bitta narsa.\n2. **Qulay javob turlari** — ha/yo'q, ro'yxatdan tanlash.\n3. **Tushuntirish** — xulosa sababini ko'rsatish.\n4. **Ehtimollik** — \"gripp ehtimoli 80%\".\n5. **Orqaga qaytish** va javobni o'zgartirish.\n6. Xatolarga chidamlilik.\n> Yaxshi interfeys — foydalanuvchi o'ylamasdan ishlata oladigan interfeys.",
"quiz": [
[
"Ekspert tizim xulosa sababini ko'rsatishi qaysi talab?",
[
"Tezlik",
"Rang",
"Tushuntirish"
],
2
],
[
"Qulay javob turi?",
[
"Ha/yo'q yoki ro'yxat",
"Javobsiz",
"Uzun insho"
],
0
]
]
},
{
"n": 29,
"t": "Ekspert tizimlardan foydalanish",
"hw": "Biror ekspert tizim (masalan, tibbiy yoki avtomobil) bo‘yicha 3 ta savol-javob tuzing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Ekspert tizimdan foydalanish** — namuna dialog (avtomobil):\n1. Tizim: \"Motor ishga tushadimi?\" — Foydalanuvchi: \"Yo'q\".\n2. Tizim: \"Chiroqlar yonadimi?\" — \"Yo'q\".\n3. Tizim: \"Xulosa: akkumulyator zaryadsizlangan (ehtimol 85%). Tavsiya: akkumulyatorni zaryadlang yoki almashtiring.\"\nAfzalliklari: doim mavjud, charchamaydi, izchil javob beradi, bir nechta ekspert bilimini birlashtiradi.\nKamchiliklari: sog'lom aql va hissiyot yo'q, bilim eskirishi mumkin, yaratish qimmat.\n> Har bir savol keyingi savolni tanlaydi — xuddi tarmoqlanuvchi algoritm.",
"quiz": [
[
"Ekspert tizimning afzalligi?",
[
"Hissiyoti bor",
"Charchamaydi va izchil",
"Bepul yaratiladi"
],
1
],
[
"Ekspert tizimning kamchiligi?",
[
"Doim mavjud",
"Sog'lom aql yo'q",
"Tez ishlaydi"
],
1
]
]
},
{
"n": 30,
"t": "Maʼlumotlarni qayta ishlash tizimlari",
"hw": "Ma’lumotlarni qayta ishlash tizimining 3 bosqichini (kiritish, qayta ishlash, chiqarish) misol bilan yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Ma'lumotlarni qayta ishlash tizimi**: **Kiritish → Qayta ishlash → Chiqarish** (+ saqlash).\nMisol — do'kon kassasi: shtrix-kod skanerlanadi (kiritish) → narx bazadan topiladi va jami hisoblanadi (qayta ishlash) → chek chiqadi (chiqarish) → sotuv bazaga yoziladi (saqlash).\nQayta ishlash turlari:\n- **Paketli (batch)** — ma'lumotlar yig'ilib, keyin birdaniga qayta ishlanadi: oylik maosh, kommunal hisoblar.\n- **Onlayn** — darhol, foydalanuvchi bilan muloqotda: chipta bron qilish.\n- **Real vaqt** — keyingi darsda.\n> Oylik maoshni har daqiqada hisoblash shart emas — paketli qayta ishlash yetarli.",
"quiz": [
[
"Oylik maosh hisoblash qanday qayta ishlash?",
[
"Hech qanday",
"Real vaqt",
"Paketli"
],
2
],
[
"Kassada chek chiqishi qaysi bosqich?",
[
"Saqlash",
"Chiqarish",
"Kiritish"
],
1
]
]
},
{
"n": 31,
"t": "Nazorat ishi",
"hw": "Takrorlang: ekspert tizim va ma’lumotlarni qayta ishlash tizimi bo‘yicha 5 ta atamani yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Nazorat ishi: ekspert tizimlar va qayta ishlash.**\nAtamalar: ekspert tizim, bilimlar bazasi, qoida (AGAR-U HOLDA), yakunlovchi mexanizm, interfeys, kiritish-qayta ishlash-chiqarish, paketli va onlayn qayta ishlash.",
"quiz": [
[
"Ekspert tizimning \"o'ylovchi\" qismi?",
[
"Yakunlovchi mexanizm",
"Interfeys",
"Monitor"
],
0
],
[
"Kommunal hisoblar qanday qayta ishlanadi?",
[
"Qo'lda",
"Paketli",
"Real vaqt"
],
1
],
[
"Chipta bron qilish?",
[
"Onlayn",
"Paketli",
"Ekspert"
],
0
],
[
"Qoida shakli?",
[
"AGAR ... U HOLDA ...",
"<p></p>",
"FOR ... NEXT"
],
0
]
]
},
{
"n": 32,
"t": "Real vaqt rejimida qayta ishlash tizimi",
"hw": "Real vaqt rejimida ishlaydigan tizimga 2 ta misol keltirib, nima uchun tezkor bo‘lishi kerakligini yozing.",
"part": "2 CHORAK",
"sec": "",
"md": "**Real vaqt rejimida qayta ishlash** — ma'lumot kelishi bilan **darhol** (millisekundlarda) qayta ishlanadi va javob beriladi. Kechikish xavfli yoki qabul qilib bo'lmas holatlarda kerak.\nMisollar:\n- Avtomobilning **ABS** tormoz tizimi va xavfsizlik yostiqchalari.\n- Samolyot avtopiloti.\n- Svetoforni boshqarish, yong'in signalizatsiyasi.\n- Kardiomonitor (shifoxonada).\n- Onlayn o'yinlar.\nTizim: **sensor → protsessor → aktuator**, doimiy **qayta aloqa (feedback)** sikli.\n> Yostiqcha 0.03 soniyada ochilishi kerak — kechiksa, foydasi yo'q.",
"quiz": [
[
"Real vaqt tizimiga misol?",
[
"Yillik hisobot",
"Oylik maosh",
"ABS tormoz"
],
2
],
[
"Real vaqt tizimida nima eng muhim?",
[
"Darhol javob",
"Arzonlik",
"Chiroyli dizayn"
],
0
]
]
},
{
"n": 33,
"t": "Elektron  jadval  yaratish. Qatorlar va ustunlarni boshqarish",
"hw": "Excelda 10 qatorli jadval yarating; qator va ustun qo‘shib, ularni yashiring va qayta ko‘rsating.",
"part": "3 CHORAK",
"sec": "",
"md": "**Excel'da jadval yaratish va boshqarish:**\n- Satr/ustun **qo'shish**: o'ng tugma → **Вставить**; **o'chirish** → **Удалить**.\n- **Yashirish**: o'ng tugma → **Скрыть**; **ko'rsatish** — qo'shni ustunlarni belgilab → **Показать**.\n- **Kenglik/balandlik**: chegarani sudrash yoki ikki marta bosish (avto).\n- **Formatlash sifatida jadval** (Ctrl+T) — filtrlar va avtokengayish bilan \"aqlli jadval\".\n> Yashirilgan ustunlar o'chmaydi — formulalar ularni ishlataveradi.",
"quiz": [
[
"Ustunni ko'rinmas qilish?",
[
"Удалить",
"Очистить",
"Скрыть"
],
2
],
[
"\"Aqlli jadval\" tezkor tugmasi?",
[
"Ctrl+T",
"Ctrl+B",
"Ctrl+P"
],
0
]
]
},
{
"n": 34,
"t": "Elektron jadval xavfsizligi",
"hw": "Excel faylingizga parol qo‘ying va yozishdan himoyalang; qanday qilganingizni yozing.",
"part": "3 CHORAK",
"sec": "",
"md": "**Elektron jadval xavfsizligi** (**Рецензирование**):\n- **Защитить лист** — varaqni himoyalash: tanlangan kataklardan boshqasini o'zgartirib bo'lmaydi. Kirish kataklarini avval **Формат ячеек → Защита → Защищаемая ячейка** belgisini olib tashlab ochiq qoldiring.\n- **Защитить книгу** — varaqlarni qo'shish/o'chirishni taqiqlash.\n- **Fayl paroli**: **Файл → Сведения → Защитить книгу → Зашифровать паролем** — parolsiz ochilmaydi.\n> Parolni unutsangiz, faylni ochib bo'lmaydi — xavfsiz joyda saqlang.",
"quiz": [
[
"Faylni parol bilan shifrlash qayerda?",
[
"Вид",
"Файл → Сведения",
"Вставка"
],
1
],
[
"Faqat formulalarni himoyalash uchun?",
[
"Удалить",
"Скрыть",
"Защитить лист"
],
2
]
]
},
{
"n": 35,
"t": "Panel va oynalarni interfeysga mahkamlash",
"hw": "Jadvalning birinchi qatori va ustunini mahkamlang (Freeze Panes) va natijani tekshiring.",
"part": "3 CHORAK",
"sec": "",
"md": "**Panellarni mahkamlash (Freeze Panes)** — katta jadvalni aylantirganda sarlavhalar ko'rinib turadi.\n**Вид → Закрепить области**:\n- **Закрепить верхнюю строку** — birinchi satr.\n- **Закрепить первый столбец** — birinchi ustun.\n- **Закрепить области** — tanlangan katakdan yuqori va chapdagi hamma narsa (B2 tanlansa — 1-satr va A ustun).\n**Разделить** — oynani 2–4 qismga bo'lib, jadvalning turli joylarini solishtirish.\n> 500 satrli jadvalda sarlavha ko'rinmasa — qaysi ustun nima ekanini unutasiz.",
"quiz": [
[
"Birinchi satrni doim ko'rsatish?",
[
"Удалить",
"Скрыть",
"Закрепить верхнюю строку"
],
2
],
[
"B2 tanlab \"Закрепить области\" — nima mahkamlanadi?",
[
"1-satr va A ustun",
"Hech narsa",
"Faqat B2"
],
0
]
]
},
{
"n": 36,
"t": "Elektron jadvalni formatlash. Shartli formatlash",
"hw": "Jadvalni formatlab, shartli formatlash orqali 50 dan past ballarni qizil rangda ajrating.",
"part": "3 CHORAK",
"sec": "",
"md": "**Formatlash** — son formatlari, hoshiya, ranglar, tekislash.\n**Shartli formatlash** (**Главная → Условное форматирование**):\n- **Правила выделения ячеек**: больше, меньше, между, текст содержит, повторяющиеся значения.\n- **Правила отбора первых и последних**: eng yaxshi 10 ta, o'rtachadan yuqori.\n- **Гистограммы, цветовые шкалы, наборы значков**.\n- **Создать правило → Использовать формулу**: =$C2<50 — butun satrni bo'yash.\n> Shartli formatlash — \"ma'lumot o'zi gapiradigan\" jadval.",
"quiz": [
[
"50 dan past ballarni ajratish?",
[
"Shartli formatlash",
"Freeze",
"Sort"
],
0
],
[
"Takroriy qiymatlarni topish qoidasi?",
[
"Скрыть",
"Повторяющиеся значения",
"Гистограммы"
],
1
]
]
},
{
"n": 37,
"t": "Formula va funksiyalarni yaratish. Katakka absolyut va nisbiy murojaat",
"hw": "Absolyut ($) va nisbiy manzilga bittadan formula misoli yozing va Excelda sinang.",
"part": "3 CHORAK",
"sec": "",
"md": "**Formula** — \"=\" bilan boshlanadi. **Funksiya** — tayyor formula: =SUM(), =AVERAGE().\n**Nisbiy murojaat (A1)** — nusxalanganda o'zgaradi: C2 dagi **=A2*B2** pastga → **=A3*B3**.\n**Absolyut murojaat ($A$1)** — nusxalanganda o'zgarmaydi. Masalan, kurs yoki chegirma bitta katakda:\nD2: **=C2*$F$1** → D3: **=C3*$F$1**.\n**Aralash**: $A1 (ustun qotgan), A$1 (satr qotgan).\n**F4** tugmasi — murojaat turini almashtiradi.\n> Bitta umumiy qiymat (kurs, foiz, narx) ga murojaat — doim $ bilan.",
"quiz": [
[
"Nusxalanganda o'zgarmaydigan murojaat?",
[
"A$",
"A1",
"$A$1"
],
2
],
[
"Murojaat turini almashtirish tugmasi?",
[
"F4",
"F7",
"F2"
],
0
]
]
},
{
"n": 38,
"t": "Nomlangan katak va diapazon",
"hw": "Jadvalda bitta katak va diapazonga nom bering, formulada shu nomdan foydalaning.",
"part": "3 CHORAK",
"sec": "",
"md": "**Nomlangan katak va diapazon** — manzil o'rniga mazmunli nom.\n- Katakni tanlab, **Nom maydoni**ga (formula qatori chapida) nom yozing: **Kurs** → Enter.\n- Diapazon: **B2:B20** → **Ballar**.\n- **Формулы → Диспетчер имён** — nomlarni boshqarish.\nFormulada: **=SUM(Ballar)**, **=C2*Kurs**. Nomlangan katak doim **absolyut**.\n> =AVERAGE(Ballar) — =AVERAGE(B2:B20) dan ko'ra tushunarliroq.",
"quiz": [
[
"Nomlangan katak qanday murojaat?",
[
"Aralash",
"Nisbiy",
"Absolyut"
],
2
],
[
"Nomlarni boshqarish oynasi?",
[
"Сортировка",
"Фильтр",
"Диспетчер имён"
],
2
]
]
},
{
"n": 39,
"t": "Yaxlitlash funksiyalari",
"hw": "ROUND, ROUNDUP va ROUNDDOWN funksiyalarini 5 ta kasr son bilan sinab ko‘ring.",
"part": "3 CHORAK",
"sec": "",
"md": "**Yaxlitlash funksiyalari:**\n- **=ROUND(son; raqamlar)** — matematik yaxlitlash: =ROUND(3.456; 2) → 3.46; =ROUND(3.45; 0) → 3.\n- **=ROUNDUP(...)** — doim yuqoriga: =ROUNDUP(3.41; 0) → 4 (masalan, 41 o'quvchiga nechta avtobus).\n- **=ROUNDDOWN(...)** — doim pastga: =ROUNDDOWN(3.99; 0) → 3.\n- **=INT(...)** — butun qismi. Manfiy raqamlar soni: =ROUND(1234; -2) → 1200.\n> Son formati faqat ko'rinishni yaxlitlaydi, ROUND esa qiymatning o'zini.",
"quiz": [
[
"=ROUNDUP(2.1; 0) natijasi?",
[
"2.1",
"3",
"2"
],
1
],
[
"=ROUND(5.678; 1) natijasi?",
[
"5.7",
"5.6",
"6"
],
0
]
]
},
{
"n": 40,
"t": "Sana  va  vaqtga oid  funksiyalar. Shartli  funksiyalar. Qidirish funksiyalari",
"hw": "TODAY, IF va VLOOKUP funksiyalariga bittadan misol yozib, Excelda sinang.",
"part": "3 CHORAK",
"sec": "",
"md": "**Sana va vaqt**: **=TODAY()** — bugungi sana, **=NOW()** — sana va vaqt, **=YEAR()**, **=MONTH()**, **=DAY()**, **=DATEDIF(boshl; tugash; \"Y\")** — yillar farqi (yosh).\n**Shartli funksiya**: **=IF(shart; rost bo'lsa; yolg'on bo'lsa)** — =IF(B2>=60; \"O'tdi\"; \"O'tmadi\"). Ichma-ich IF bilan baholash: =IF(B2>=86;5;IF(B2>=71;4;IF(B2>=56;3;2))).\n**Qidirish**: **=VLOOKUP(qidiriladigan; jadval; ustun_raqami; FALSE)** — =VLOOKUP(\"Ali\"; A2:D20; 3; FALSE) — Alining 3-ustundagi qiymati.\n> VLOOKUP faqat chapdagi ustundan qidiradi; FALSE — aniq moslik.",
"quiz": [
[
"Bugungi sanani qaytaradi?",
[
"TODAY",
"NOW",
"YEAR"
],
0
],
[
"=IF(70>=60;\"Ha\";\"Yo'q\") natijasi?",
[
"70",
"Ha",
"Yo'q"
],
1
],
[
"VLOOKUP'da aniq moslik uchun?",
[
"FALSE",
"0.5",
"TRUE"
],
0
]
]
},
{
"n": 41,
"t": "INDEX va MATCH funksiyalari",
"hw": "INDEX va MATCH funksiyalari yordamida jadvaldan bitta qiymatni toping.",
"part": "3 CHORAK",
"sec": "",
"md": "**INDEX va MATCH** — VLOOKUP'dan kuchliroq qidiruv:\n- **=MATCH(qiymat; diapazon; 0)** — qiymatning diapazondagi **o'rnini** (raqamini) beradi: =MATCH(\"Ali\"; A2:A20; 0) → 5.\n- **=INDEX(diapazon; satr_raqami)** — o'sha o'rindagi qiymatni beradi: =INDEX(C2:C20; 5).\nBirga: **=INDEX(C2:C20; MATCH(\"Ali\"; A2:A20; 0))**.\nAfzalligi: istalgan yo'nalishda (chapga ham) qidiradi, ustun qo'shilsa buzilmaydi.\n> MATCH — \"qayerda?\", INDEX — \"u yerda nima bor?\".",
"quiz": [
[
"Qiymatning o'rnini qaytaruvchi funksiya?",
[
"MATCH",
"SUM",
"INDEX"
],
0
],
[
"INDEX+MATCH'ning VLOOKUP'dan afzalligi?",
[
"Faqat sonlar bilan ishlaydi",
"Sekinroq",
"Chapga ham qidiradi"
],
2
]
]
},
{
"n": 42,
"t": "Shartli  statistik funksiyalar",
"hw": "COUNTIF, SUMIF va AVERAGEIF funksiyalariga bittadan misol tuzing.",
"part": "3 CHORAK",
"sec": "",
"md": "**Shartli statistik funksiyalar:**\n- **=COUNTIF(diapazon; shart)** — shartga mos kataklar soni: =COUNTIF(B2:B30; \">=86\") — a'lochilar soni.\n- **=SUMIF(diapazon; shart; yig'indi_diapazoni)** — shartga moslarni qo'shish: =SUMIF(A2:A50; \"Daftar\"; C2:C50).\n- **=AVERAGEIF(...)** — shartga moslarning o'rtachasi.\n- Ko'p shartli: **COUNTIFS, SUMIFS, AVERAGEIFS**.\nMatnli shart qo'shtirnoqda: \"7-A\", \"<50\".\n> COUNTIF — \"nechta?\", SUMIF — \"jami qancha?\".",
"quiz": [
[
"86 va undan yuqori ballar sonini topish?",
[
"=MAX(B2:B30)",
"=COUNTIF(B2:B30;\">=86\")",
"=SUM(B2:B30)"
],
1
],
[
"Bir nechta shartli sanash?",
[
"INDEX",
"COUNTIF",
"COUNTIFS"
],
2
]
]
},
{
"n": 43,
"t": "Nazorat ishi",
"hw": "Takrorlang: formulalar va funksiyalarning 6 tasini nomi va vazifasi bilan yozing.",
"part": "3 CHORAK",
"sec": "",
"md": "**Nazorat ishi: Excel formulalari.**\n| Funksiya | Vazifasi |\n| SUM, AVERAGE | Yig'indi, o'rtacha |\n| ROUND | Yaxlitlash |\n| IF | Shart |\n| VLOOKUP, INDEX+MATCH | Qidirish |\n| COUNTIF, SUMIF | Shartli hisob |\n| TODAY | Bugungi sana |\nYana: $ absolyut murojaat, nomlangan kataklar, Freeze Panes, himoya.",
"quiz": [
[
"=C2*$F$1 ni pastga nusxalasak 3-satrda?",
[
"=C3*$F$1",
"=C3*$F$2",
"=C2*$F$1"
],
0
],
[
"Shartga mos yig'indi?",
[
"ROUND",
"COUNTIF",
"SUMIF"
],
2
],
[
"Qidiruv funksiyasi?",
[
"INT",
"TODAY",
"VLOOKUP"
],
2
],
[
"=ROUNDDOWN(7.9;0) natijasi?",
[
"7",
"7.9",
"8"
],
0
]
]
},
{
"n": 44,
"t": "Validatsiya qoidalari",
"hw": "Validatsiya nima uchun kerakligini yozing va 3 ta qoidaga (son, sana, ro‘yxat) misol keltiring.",
"part": "3 CHORAK",
"sec": "",
"md": "**Validatsiya qoidalari** — noto'g'ri ma'lumot kiritilishining oldini oladi.\nTurlari:\n- **Diapazon** — son 1 dan 100 gacha.\n- **Tur** — faqat butun son yoki sana.\n- **Ro'yxat** — tayyor variantlardan biri (\"7-A\", \"7-B\").\n- **Uzunlik** — matn 9 belgidan oshmasin.\n- **Format** — email'da \"@\" bo'lishi.\n- **Mavjudlik** — maydon bo'sh qolmasin.\nValidatsiya ma'lumot **mantiqan to'g'ri** ekanini tekshiradi, lekin uning **haqiqiyligini** emas.\n> Kiritish bosqichida to'xtatilgan xato — eng arzon xato.",
"quiz": [
[
"Sinf nomini tayyor variantlardan tanlash qaysi qoida?",
[
"Diapazon",
"Ro'yxat",
"Uzunlik"
],
1
],
[
"Validatsiya nimani tekshirmaydi?",
[
"Ma'lumotning haqiqiyligini",
"Turni",
"Diapazonni"
],
0
]
]
},
{
"n": 45,
"t": "Elektron  jadvalga  qoʻllanadigan  validatsiya",
"hw": "Jadvalning bitta ustuniga 1 dan 100 gacha sonlar kiritishga ruxsat beruvchi validatsiya qo‘ying.",
"part": "3 CHORAK",
"sec": "",
"md": "**Excel'da validatsiya**: **Данные → Проверка данных**:\n- **Тип данных**: Целое число, Десятичное, Список, Дата, Длина текста, Другой (formula).\n- **Минимум / Максимум**: 1 va 100.\n- **Список**: manba: 7-A;7-B;7-C yoki kataklar diapazoni.\nMisol: B2:B30 ga **Целое число, между 1 и 100** — 150 yoki \"abc\" kiritib bo'lmaydi.\n**Обвести неверные данные** — allaqachon kiritilgan noto'g'ri qiymatlarni aylana bilan belgilaydi.\n> Ochiladigan ro'yxat — validatsiyaning eng qulay turi.",
"quiz": [
[
"Validatsiya qayerda?",
[
"Вид",
"Данные → Проверка данных",
"Вставка → Таблица"
],
1
],
[
"Mavjud noto'g'ri qiymatlarni belgilash?",
[
"Обвести неверные данные",
"Сортировка",
"Скрыть"
],
0
]
]
},
{
"n": 46,
"t": "Maʼlumotlar  kiritilishini  tekshirish",
"hw": "Noto‘g‘ri ma’lumot kiritilganda xabar chiqaradigan qoida tuzing va 3 xil qiymat bilan sinang.",
"part": "3 CHORAK",
"sec": "",
"md": "**Kiritishni tekshirish xabarlari** (Проверка данных oynasi):\n- **Сообщение для ввода** — katak tanlanganda maslahat chiqadi: \"1 dan 100 gacha ball kiriting\".\n- **Сообщение об ошибке** — noto'g'ri qiymatda:\n  - **Останов (Stop)** — kiritishni butunlay taqiqlaydi.\n  - **Предупреждение (Warning)** — ogohlantiradi, lekin ruxsat berishi mumkin.\n  - **Сообщение (Info)** — faqat xabar beradi.\nSinov: chegaraviy qiymatlar (1, 100), chegaradan tashqari (0, 101) va noto'g'ri tur (\"abc\") bilan tekshiring.\n> Yaxshi xato xabari nima noto'g'ri va qanday tuzatishni aytadi.",
"quiz": [
[
"Noto'g'ri qiymatni butunlay taqiqlovchi xabar turi?",
[
"Stop",
"Warning",
"Info"
],
0
],
[
"Chegaraviy qiymatlarga misol (1–100)?",
[
"50",
"1 va 100",
"1000"
],
1
]
]
},
{
"n": 47,
"t": "Maʼlumotlarni  filtrlash va saralash",
"hw": "15 qatorli jadvalni biror ustun bo‘yicha saralang va filtr bilan shartga mos yozuvlarni ajrating.",
"part": "3 CHORAK",
"sec": "",
"md": "**Saralash** (**Данные → Сортировка**): A→Z, kichikdan kattaga; **ko'p darajali** — avval sinf, keyin familiya.\n**Filtr** (**Данные → Фильтр**, Ctrl+Shift+L): ustun sarlavhasidagi strelka:\n- Qiymat bo'yicha tanlash.\n- **Числовые фильтры**: больше, меньше, первые 10.\n- **Текстовые фильтры**: содержит, начинается с.\n- Bir nechta ustundagi filtrlar **VA** sharti bilan ishlaydi.\n**Расширенный фильтр** — murakkab shartlar alohida diapazonda.\n> Filtr yozuvlarni o'chirmaydi — yashiradi. Saralash esa tartibni o'zgartiradi.",
"quiz": [
[
"Ma'lumotni o'chirmasdan yashiradi?",
[
"Saralash",
"Filtr",
"Delete"
],
1
],
[
"Avval sinf, keyin familiya bo'yicha tartiblash?",
[
"Filtr",
"Freeze",
"Ko'p darajali saralash"
],
2
]
]
},
{
"n": 48,
"t": "Jamlovchi jadvallar va diagrammalar",
"hw": "Jadvaldan jamlovchi (Pivot) jadval va unga mos diagramma yarating.",
"part": "3 CHORAK",
"sec": "",
"md": "**Jamlovchi jadval (Pivot Table)** — katta jadvalni bir necha bosishda guruhlab, yig'indi/o'rtacha/son hisoblaydi.\n**Вставка → Сводная таблица**:\n- **Строки** — guruhlash maydoni (sinf).\n- **Столбцы** — ikkinchi o'lchov (fan).\n- **Значения** — hisob (ballar o'rtachasi, sotuv summasi).\n- **Фильтры** — umumiy filtr.\n**Сводная диаграмма** — pivot jadval asosida diagramma; jadval o'zgarsa, diagramma ham.\nMa'lumot o'zgarsa: **Обновить**.\n> 1000 satrli sotuvlarni \"har oy, har mahsulot bo'yicha jami\" ga 30 soniyada aylantirish mumkin.",
"quiz": [
[
"Ma'lumotni guruhlab hisoblovchi jadval?",
[
"Pivot Table",
"Freeze Panes",
"Validatsiya"
],
0
],
[
"Pivot'da hisob qaysi maydonga qo'yiladi?",
[
"Значения",
"Фильтры",
"Строки"
],
0
]
]
},
{
"n": 49,
"t": "Maʼlumotlarni  import va  eksport  qilish",
"hw": "Ma’lumotlarni CSV fayldan Excelga import qiling va jadvalni qaytib eksport qilib saqlang.",
"part": "3 CHORAK",
"sec": "",
"md": "**Import** — tashqi ma'lumotni Excel'ga olish; **eksport** — Excel'dan boshqa formatga chiqarish.\nFormatlar:\n- **CSV** — vergul (yoki nuqtali vergul) bilan ajratilgan matn. Universal, lekin formatlar va formulalar saqlanmaydi.\n- **TXT**, **XLSX**, **PDF** (faqat ko'rish uchun), **XML/JSON**.\nImport: **Данные → Из текстового/CSV-файла** → ajratuvchi va kodlashni (UTF-8) tanlash → **Загрузить**.\nEksport: **Сохранить как → CSV (разделители — запятые)**.\n> O'zbekcha harflar buzilsa — kodlashni UTF-8 qilib tanlang.",
"quiz": [
[
"Universal, vergul bilan ajratilgan format?",
[
"PNG",
"XLSX",
"CSV"
],
2
],
[
"CSV'da nima saqlanmaydi?",
[
"Formulalar va formatlar",
"Matn",
"Sonlar"
],
0
]
]
},
{
"n": 50,
"t": "Grafik va diagrammalar. Modellashtirish. Simulyatorlar",
"hw": "Biror jarayonni (masalan, oylik byudjet) Excelda modellashtirib, 1 ta diagramma yarating.",
"part": "3 CHORAK",
"sec": "",
"md": "**Grafik va diagrammalar**: ustunli, chiziqli, doiraviy, nuqtali (scatter), aralash (kombinatsiyalangan). **Trend chizig'i** — o'zgarish tendensiyasi.\n**Modellashtirish** — jarayonni formulalar bilan ifodalash va \"nima bo'ladi, agar...?\" savollarini tekshirish:\n- **Подбор параметра (Goal Seek)** — kerakli natija uchun kirish qiymati.\n- **Диспетчер сценариев** — bir nechta stsenariy (optimistik, pessimistik).\n**Simulyator** — haqiqiy jarayonni xavfsiz va arzon sinash uchun model: uchuvchi trenajyori, ob-havo prognozi, yo'l harakati.\n> Model aniqligi kiritilgan farazlar aniqligiga bog'liq.",
"quiz": [
[
"Kerakli natija uchun kirish qiymatini topish?",
[
"VLOOKUP",
"Freeze",
"Goal Seek"
],
2
],
[
"Uchuvchi trenajyori — bu?",
[
"Pivot",
"Validatsiya",
"Simulyator"
],
2
]
]
},
{
"n": 51,
"t": "Nazorat ishi",
"hw": "Takrorlang: Excel validatsiya, filtr va diagramma bo‘yicha 5 ta amalni yozing.",
"part": "3 CHORAK",
"sec": "",
"md": "**Nazorat ishi: validatsiya, filtr, diagramma.**\nTakrorlang: validatsiya turlari va xabarlari, saralash va filtr farqi, pivot jadval, import/eksport (CSV), diagramma turlari, Goal Seek, simulyator.",
"quiz": [
[
"Kiritish paytida maslahat chiqaruvchi?",
[
"Сообщение для ввода",
"Filtr",
"Сообщение об ошибке"
],
0
],
[
"Filtr va saralash farqi?",
[
"Ikkalasi o'chiradi",
"Filtr yashiradi, saralash tartiblaydi",
"Farqi yo'q"
],
1
],
[
"Sotuvlarni oylar bo'yicha guruhlash?",
[
"Freeze",
"ROUND",
"Pivot Table"
],
2
],
[
"1 dan 100 gacha ruxsat — qaysi qoida?",
[
"Diapazon",
"Ro'yxat",
"Format"
],
0
]
]
},
{
"n": 52,
"t": "Takrorlash",
"hw": "Excel loyihangizdagi xatolarni topib tuzating va natijani yozing.",
"part": "3 CHORAK",
"sec": "",
"md": "**Takrorlash: Excel loyihasi.**\nLoyihangizni tekshirish ro'yxati:\n1. Formulalarda **$** kerak joylarda bormi?\n2. Kirish kataklarida **validatsiya** bormi?\n3. Muhim qiymatlar **shartli formatlash** bilan ajratilganmi?\n4. Sarlavhalar **mahkamlangan**mi?\n5. Formula kataklari **himoyalangan**mi?\n6. Diagrammaning sarlavhasi va o'q nomlari bormi?\n7. Xato qiymatlar (#DIV/0!, #N/A) bormi? **=IFERROR(formula; \"\")** bilan yashirish mumkin.\n> #N/A — VLOOKUP topmadi; #DIV/0! — nolga bo'lish.",
"quiz": [
[
"#DIV/0! xatosi sababi?",
[
"Qiymat topilmadi",
"Matn juda uzun",
"Nolga bo'lish"
],
2
],
[
"Xato o'rniga bo'sh qiymat chiqarish?",
[
"ROUND",
"IFERROR",
"IF"
],
1
]
]
},
{
"n": 53,
"t": "Ma’lumotlar  bazasini yaratish. Maʼlumot  turlari  va  katak  hajmlari. Uch  tomonlama  bogʻlanish.",
"hw": "Ma’lumotlar bazasi uchun 5 ta maydon tanlab, har biriga ma’lumot turi va hajmini yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Ma'lumotlar bazasini yaratish** (MS Access yoki boshqa MBBT):\n**Ma'lumot turlari va hajmlari**:\n- **Короткий текст** — 255 belgigacha (ism, kod).\n- **Длинный текст** — izohlar.\n- **Числовой** — butun/kasr; **Денежный**; **Дата/время**; **Логический** (ha/yo'q); **Счётчик** (avtoraqam — ID).\nTo'g'ri **hajm** joy tejaydi va xatoni kamaytiradi (ism uchun 50 belgi yetarli).\n**Uch tomonlama bog'lanish** — uchta jadval o'zaro bog'langan tuzilma: **O'quvchilar — Baholar — Fanlar** (Baholar jadvali o'quvchi va fanni bog'laydi).\n> MBBT — ma'lumotlar bazasini boshqarish tizimi (Access, MySQL, PostgreSQL).",
"quiz": [
[
"ID uchun qulay tur?",
[
"Логический",
"Счётчик (avtoraqam)",
"Длинный текст"
],
1
],
[
"Ism uchun qaysi tur?",
[
"Денежный",
"Дата",
"Короткий текст"
],
2
]
]
},
{
"n": 54,
"t": "Birga-bir va birga-ko‘p bogʻlanish. Koʻpga-koʻp  bogʻlanish. Bogʻlanishlar  yaratish  va  foydalanish",
"hw": "Birga-bir, birga-ko‘p va ko‘pga-ko‘p bog‘lanishga hayotiy misollar keltiring.",
"part": "4 CHORAK",
"sec": "",
"md": "**Bog'lanish turlari:**\n- **Birga-bir (1:1)** — bir yozuvga ikkinchi jadvalda faqat bitta yozuv: o'quvchi — uning pasporti.\n- **Birga-ko'p (1:N)** — eng keng tarqalgan: bitta sinf — ko'p o'quvchi; bitta muallif — ko'p kitob.\n- **Ko'pga-ko'p (M:N)** — o'quvchi ko'p to'garakka qatnaydi, to'garakda ko'p o'quvchi. Uni **oraliq (bog'lovchi) jadval** orqali amalga oshiriladi: O'quvchi — **A'zolik** — To'garak.\nAccess'da: **Работа с базами данных → Схема данных** → maydonni sudrab bog'lash.\n> Shu platformada ham o'quvchi va to'garaklar M:N — \"members\" jadvali orqali bog'langan!",
"quiz": [
[
"Sinf va o'quvchilar bog'lanishi?",
[
"Ko'pga-ko'p",
"Birga-bir",
"Birga-ko'p"
],
2
],
[
"Ko'pga-ko'p bog'lanish qanday amalga oshiriladi?",
[
"Oraliq jadval orqali",
"Bitta jadvalda",
"Mumkin emas"
],
0
]
]
},
{
"n": 55,
"t": "Oddiy  yozuvli  va  relyatsion  maʼlumotlar bazasi  oʻrtasidagi  farq",
"hw": "Oddiy yozuvli va relyatsion bazaning farqini jadvalda yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "- **Oddiy yozuvli (flat file) baza** — bitta jadval: barcha ma'lumot bir joyda. Oddiy, lekin **takrorlanish** ko'p: har bir o'quvchi qatorida sinf rahbari ismi qayta-qayta yoziladi; bitta joyda o'zgartirsangiz, boshqalarida eskisi qoladi (**nomuvofiqlik**).\n- **Relyatsion baza** — bir nechta bog'langan jadval. Har ma'lumot **bir marta** saqlanadi, kalitlar orqali bog'lanadi. Takrorlanish kam, yangilash oson, yaxlitlik yuqori, murakkab so'rovlar mumkin.\n| Belgi | Flat file | Relyatsion |\n| Jadvallar | 1 | Bir nechta |\n| Takrorlanish | Ko'p | Kam |\n| Murakkablik | Oddiy | Murakkabroq |\n> Kichik ro'yxat — flat file yetarli; maktab tizimi — relyatsion kerak.",
"quiz": [
[
"Takrorlanish kam bo'lgan baza?",
[
"Flat file",
"Relyatsion",
"CSV fayl"
],
1
],
[
"Flat file kamchiligi?",
[
"Juda murakkab",
"Ma'lumot takrorlanadi",
"Kalitlar ko'p"
],
1
]
]
},
{
"n": 56,
"t": "Maʼlumotlarni  import  qilish. Relyatsion  maʼlumotlar  bazasini  yaratish.",
"hw": "Ma’lumotlarni bazaga import qilib, 2 ta jadvalni bog‘lang (o‘quvchilar va sinflar).",
"part": "4 CHORAK",
"sec": "",
"md": "**Relyatsion bazani yaratish:**\n1. Jadvallarni loyihalash: **Sinflar** (Sinf_ID, Nomi, Rahbar) va **O'quvchilar** (O'quvchi_ID, Ism, Sinf_ID).\n2. Har jadvalga **birlamchi kalit**.\n3. **Import**: Excel/CSV dan — **Внешние данные → Новый источник данных → Из файла**.\n4. **Bog'lash**: Схема данных → Sinflar.Sinf_ID ni O'quvchilar.Sinf_ID ga sudrash → **Обеспечение целостности данных** belgisi.\n5. Sinov: mavjud bo'lmagan sinf raqami bilan o'quvchi kiritib ko'ring — baza ruxsat bermasligi kerak.\n> Bog'lovchi maydonlar bir xil turda bo'lishi shart.",
"quiz": [
[
"Bog'lovchi maydonlar qanday bo'lishi kerak?",
[
"Bir xil turda",
"Bo'sh",
"Har xil turda"
],
0
],
[
"Excel ma'lumotini bazaga olish?",
[
"Import",
"Eksport",
"Freeze"
],
0
]
]
},
{
"n": 57,
"t": "Kalitlar. Murakkab  kalit. Tashqi kalit.",
"hw": "Birlamchi, murakkab va tashqi kalitga bittadan misol yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Kalitlar:**\n- **Birlamchi kalit (Primary Key, PK)** — har yozuvni **noyob** aniqlaydi, bo'sh bo'lmaydi: O'quvchi_ID.\n- **Murakkab (tarkibiy) kalit** — ikki yoki undan ortiq maydon birgalikda noyob: **(O'quvchi_ID, Fan_ID)** — Baholar jadvalida.\n- **Tashqi kalit (Foreign Key, FK)** — boshqa jadvalning birlamchi kalitiga ishora: O'quvchilar.Sinf_ID → Sinflar.Sinf_ID.\n- **Nomzod kalit** — PK bo'la oladigan maydon (masalan, pasport raqami).\n> PK — \"men kimman\", FK — \"men kimga tegishliman\".",
"quiz": [
[
"Boshqa jadval PK siga ishora qiluvchi maydon?",
[
"Birlamchi kalit",
"Murakkab kalit",
"Tashqi kalit"
],
2
],
[
"Ikki maydon birgalikda noyob?",
[
"Tashqi kalit",
"Indeks",
"Murakkab kalit"
],
2
]
]
},
{
"n": 58,
"t": "Bogʻlanishlar  yaxlitligi. Ma’lumotlar  validatsiyasi  va  verifikatsiyasi",
"hw": "Bog‘lanishlar yaxlitligi nima ekanini yozing; validatsiya va verifikatsiya farqini 3 gapda tushuntiring.",
"part": "4 CHORAK",
"sec": "",
"md": "**Bog'lanishlar yaxlitligi (referential integrity)** — tashqi kalit faqat mavjud yozuvga ishora qiladi:\n- Mavjud bo'lmagan sinfga o'quvchi qo'shib bo'lmaydi.\n- O'quvchilari bor sinfni o'chirib bo'lmaydi (yoki **каскадное удаление** bilan birga o'chadi).\n**Validatsiya** — ma'lumot qoidalarga mosmi (Access: **Правило проверки**, masalan Yosh Between 6 And 18; **Обязательное поле**).\n**Verifikatsiya** — kiritilgan ma'lumot asl manbaga mosmi (ikki marta kiritish, vizual tekshirish).\n> Yaxlitlik — \"yetim\" yozuvlar bo'lmasligi.",
"quiz": [
[
"Mavjud bo'lmagan sinfga o'quvchi qo'shishni taqiqlaydi?",
[
"Hisobot",
"Bog'lanishlar yaxlitligi",
"Saralash"
],
1
],
[
"Ma'lumot manbaga mosligini tekshirish?",
[
"Normallashtirish",
"Validatsiya",
"Verifikatsiya"
],
2
]
]
},
{
"n": 59,
"t": "Qidirish  amallari. Murakkab querylar. Ichki va jamlanma  querylar.",
"hw": "Bazada 3 xil query tuzing: oddiy, shartli va jamlanma (hisoblash bilan).",
"part": "4 CHORAK",
"sec": "",
"md": "**Query (so'rov)** — bazadan kerakli ma'lumotni olish.\n- **Oddiy**: tanlangan maydonlar.\n- **Shartli**: Ball > 80; Sinf = \"8-A\" AND Ball > 80; Ism Like \"A*\" (A bilan boshlanadi).\n- **Parametrli**: [Sinfni kiriting] — har safar so'raydi.\n- **Jamlanma (итоговый)**: **Группировка** + Sum, Avg, Count — har sinf bo'yicha o'rtacha ball.\n- **Ichki (ko'p jadvalli) so'rov** — bog'langan jadvallardan birga ma'lumot.\nSQL ko'rinishi:\n```sql\nSELECT Sinf, AVG(Ball) FROM Baholar GROUP BY Sinf;\n```\n> Query ma'lumotni o'zgartirmaydi — faqat ko'rsatadi.",
"quiz": [
[
"Har sinf bo'yicha o'rtacha ball?",
[
"Oddiy so'rov",
"Jamlanma so'rov",
"Forma"
],
1
],
[
"\"A\" bilan boshlanuvchi ismlar sharti?",
[
"= \"A\"",
"> \"A\"",
"Like \"A*\""
],
2
]
]
},
{
"n": 60,
"t": "Statik va dinamik parametrlar. Ma’lumotlar  bazasi  doirasida  hisoblashlarni amalga  oshirish.",
"hw": "Bazada bitta hisoblanadigan maydon (masalan, o‘rtacha ball) yarating va tekshiring.",
"part": "4 CHORAK",
"sec": "",
"md": "- **Statik parametr** — so'rovga qotirib yozilgan: Sinf = \"8-A\" (har doim 8-A).\n- **Dinamik parametr** — ishga tushirilganda so'raladi: Sinf = [Qaysi sinf?].\n**Hisoblanadigan maydonlar** — query'da yangi ustun: **O'rtacha: ([Ball1]+[Ball2]+[Ball3])/3**, **Jami: [Narx]*[Miqdor]**.\nYoki jadvalda **Вычисляемый** turdagi maydon.\nHisoblangan qiymatni alohida saqlash shart emas — u har safar yangidan hisoblanadi.\n> Dinamik parametr — bitta so'rov, ko'p foydalanish.",
"quiz": [
[
"Ishga tushirilganda so'raladigan parametr?",
[
"Statik",
"Kalit",
"Dinamik"
],
2
],
[
"Narx × Miqdor ustuni — bu?",
[
"Tashqi kalit",
"Hisoblanadigan maydon",
"Forma"
],
1
]
]
},
{
"n": 61,
"t": "Nazorat ishi",
"hw": "Takrorlang: kalit, bog‘lanish va query bo‘yicha 5 ta atamani yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Nazorat ishi: kalitlar, bog'lanishlar, query.**\nAtamalar: PK, FK, murakkab kalit, 1:1, 1:N, M:N, yaxlitlik, flat file, relyatsion baza, jamlanma so'rov, parametr.",
"quiz": [
[
"Har yozuvni noyob aniqlovchi kalit?",
[
"Tashqi",
"Birlamchi",
"Murakkab"
],
1
],
[
"O'quvchi va to'garak bog'lanishi?",
[
"Birga-bir",
"Ko'pga-ko'p",
"Birga-ko'p"
],
1
],
[
"Takrorlanishi ko'p baza?",
[
"Normallashgan",
"Relyatsion",
"Flat file"
],
2
],
[
"So'rov ishga tushganda sinfni so'raydi?",
[
"Dinamik parametr",
"PK",
"Statik parametr"
],
0
]
]
},
{
"n": 62,
"t": "Ma’lumotlarni  saralash. Ma’lumot  kiritish  formalari.",
"hw": "Bazadagi ma’lumotlarni saralang va kiritish formasini yaratib, 3 ta yozuv kiriting.",
"part": "4 CHORAK",
"sec": "",
"md": "**Saralash** — query yoki jadvalda: o'sish/kamayish, bir nechta maydon bo'yicha.\n**Forma (Form)** — yozuvlarni bittadan ko'rish va kiritish uchun qulay oyna:\n- **Создание → Форма** (avtomatik) yoki **Мастер форм**.\n- Elementlar: matn maydonlari, ochiladigan ro'yxatlar, tugmalar (keyingi, yangi, saqlash).\n- **Подчинённая форма** — bog'langan jadval: sinf formasida uning o'quvchilari ro'yxati.\nFoydalanuvchi jadvalni ko'rmaydi — faqat qulay formani.\n> Forma — xatolarni kamaytiradi va ma'lumot kiritishni tezlashtiradi.",
"quiz": [
[
"Bog'langan yozuvlarni ko'rsatuvchi forma?",
[
"Query",
"Hisobot",
"Подчинённая форма"
],
2
],
[
"Formaning foydasi?",
[
"Rang beradi",
"Kiritish qulay va xatosiz",
"Ma'lumotni o'chiradi"
],
1
]
]
},
{
"n": 63,
"t": "Hisobotlar. Ma’lumotlarni  eksport  qilish.",
"hw": "Bazadan hisobot yarating va uni eksport qiling (PDF yoki Excel).",
"part": "4 CHORAK",
"sec": "",
"md": "**Hisobot (Report)** — ma'lumotni chop etish yoki taqdim etish uchun chiroyli ko'rinishi.\n- **Создание → Отчёт** yoki **Мастер отчётов**.\n- **Guruhlash** (sinf bo'yicha), **saralash**, **jami/o'rtacha**.\n- Sarlavha, sana, sahifa raqami.\n**Eksport**: **Внешние данные → Экспорт** → PDF, Excel, Word, CSV.\n> Forma — kiritish uchun, hisobot — chiqarish uchun.",
"quiz": [
[
"Chop etish uchun tayyorlangan ko'rinish?",
[
"Forma",
"Jadval",
"Hisobot"
],
2
],
[
"Hisobotni PDF qilish?",
[
"Import",
"Eksport",
"Validatsiya"
],
1
]
]
},
{
"n": 64,
"t": "Formni  normallashtirish. Maʼlumotlar  bazasini  3NFga  normallashtirish.",
"hw": "Berilgan jadvalni 3NF (normal forma)ga keltirib, nima o‘zgarganini yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Normallashtirish** — takrorlanish va anomaliyalarni yo'qotish uchun jadvallarni to'g'ri bo'lish.\n- **1NF** — har katakda **bitta** qiymat (atomar), takrorlanuvchi guruhlar yo'q. \"Telefonlar: 90..., 91...\" — noto'g'ri.\n- **2NF** — 1NF + barcha maydonlar **butun** birlamchi kalitga bog'liq (murakkab kalitning faqat bir qismiga emas).\n- **3NF** — 2NF + kalit bo'lmagan maydonlar bir-biriga bog'liq emas (**tranzitiv bog'liqlik yo'q**). O'quvchilar jadvalida \"Sinf rahbari\" — u sinfga bog'liq, demak Sinflar jadvaliga ko'chiriladi.\n> 3NF qoidasi: har maydon \"kalitga, butun kalitga va faqat kalitga\" bog'liq.",
"quiz": [
[
"Har katakda bitta qiymat — qaysi forma?",
[
"1NF",
"3NF",
"2NF"
],
0
],
[
"Tranzitiv bog'liqlikni yo'qotish?",
[
"3NF",
"Saralash",
"1NF"
],
0
]
]
},
{
"n": 65,
"t": "Ma’lumotlar  lugʻati. Maʼlumot  turlari.  Fayl  va  ma’lumotlarni boshqarish.",
"hw": "Ma’lumotlar lug‘ati (maydon nomi, turi, izoh) jadvalini o‘z bazangiz uchun tuzing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Ma'lumotlar lug'ati (data dictionary)** — baza haqidagi \"ma'lumot haqida ma'lumot\" (metama'lumot):\n| Maydon | Turi | Hajmi | Kalit | Validatsiya | Izoh |\n| Oquvchi_ID | Счётчик | — | PK | — | Noyob raqam |\n| Ism | Текст | 50 | — | Majburiy | To'liq ism |\n| Sinf_ID | Число | — | FK | Mavjud sinf | Sinflar jadvaliga |\n**Fayllarni boshqarish**: nomlash qoidalari, papka tuzilmasi, versiyalar, zaxira, arxivlash, kirish huquqlari.\n> Lug'at — jamoada ishlaganda hammaga bir xil tushunish beradi.",
"quiz": [
[
"Ma'lumot haqidagi ma'lumot?",
[
"Kalit",
"Forma",
"Metama'lumot"
],
2
],
[
"Ma'lumotlar lug'atida nima bo'ladi?",
[
"Maydon nomi, turi, izoh",
"Musiqa",
"Rasmlar"
],
0
]
]
},
{
"n": 66,
"t": "Bevosita  fayldan  foydalanish. Boshqaruv  axborot  tizimlari.",
"hw": "Boshqaruv axborot tizimining (MIS) bitta misolini yozib, nima uchun kerakligini tushuntiring.",
"part": "4 CHORAK",
"sec": "",
"md": "**Faylga kirish usullari:**\n- **Ketma-ket (sequential)** — yozuvlar boshidan birma-bir o'qiladi: magnit lenta, log fayllar. Hammasini qayta ishlashda qulay.\n- **Bevosita (direct / random)** — kerakli yozuvga to'g'ridan-to'g'ri borish (manzil yoki indeks orqali): disk, MB. Tez qidiruv.\n**Boshqaruv axborot tizimi (MIS)** — rahbarlar uchun qaror qabul qilishda hisobot va tahlil beruvchi tizim: maktab direktori uchun davomat va o'zlashtirish hisobotlari, do'kon uchun sotuv va zaxira tahlili.\n> MIS — ma'lumotlarni \"boshqaruv qarorlari\"ga aylantiradi.",
"quiz": [
[
"Kerakli yozuvga to'g'ridan-to'g'ri borish?",
[
"Arxivlash",
"Ketma-ket kirish",
"Bevosita kirish"
],
2
],
[
"Rahbarlarga qaror uchun hisobot beruvchi tizim?",
[
"DNS",
"VPN",
"MIS"
],
2
]
]
},
{
"n": 67,
"t": "Nazorat ishi",
"hw": "Takrorlang: ma’lumotlar bazasi bo‘yicha 6 ta asosiy atamani yozing.",
"part": "4 CHORAK",
"sec": "",
"md": "**Nazorat ishi: ma'lumotlar bazasi.**\nAtamalar: MBBT, ma'lumot turi, PK, FK, 1:N, M:N, relyatsion, yaxlitlik, query, forma, hisobot, normallashtirish (1NF–3NF), ma'lumotlar lug'ati, MIS.",
"quiz": [
[
"Kiritish uchun oyna?",
[
"Hisobot",
"Forma",
"Query"
],
1
],
[
"\"Sinf rahbari\"ni Sinflar jadvaliga ko'chirish — qaysi NF?",
[
"3NF",
"1NF",
"2NF"
],
0
],
[
"Bazadagi bog'lovchi maydon?",
[
"Hisobot",
"Lug'at",
"Tashqi kalit"
],
2
],
[
"Rahbarlar uchun axborot tizimi?",
[
"CSV",
"MIS",
"P2P"
],
1
]
]
},
{
"n": 68,
"t": "Takrorlash",
"hw": "Yil davomida o‘rganganlaringizdan 10 ta asosiy atamani yozib, o‘zingizga qiyin bo‘lgan mavzuni belgilang.",
"part": "4 CHORAK",
"sec": "",
"md": "**Yil yakuni!** 8-sinfda o'rgandik:\n- Ma'lumot, axborot, bilim; kodlash va shifrlash; validatsiya va verifikatsiya.\n- Apparat va dasturiy ta'minot, sensorlar, elektron xavfsizlik, raqamli tengsizlik.\n- Tarmoqlar: LAN/WAN, kliyent-server, VPN, intranet, 5G, videokonferensiya.\n- Ekspert tizimlar va real vaqt tizimlari.\n- Excel: murojaatlar, IF, VLOOKUP, INDEX/MATCH, COUNTIF, validatsiya, pivot.\n- Relyatsion MB: kalitlar, bog'lanishlar, query, normallashtirish.",
"quiz": [
[
"Asimmetrik shifrlashda nechta kalit?",
[
"Bitta",
"Uchta",
"Ikkita"
],
2
],
[
"Real vaqt tizimiga misol?",
[
"Oylik maosh",
"ABS tormoz",
"Arxiv"
],
1
],
[
"Absolyut murojaat belgisi?",
[
"$",
"#",
"@"
],
0
],
[
"Ko'pga-ko'p bog'lanish uchun?",
[
"Bitta jadval",
"Oraliq jadval",
"CSV"
],
1
],
[
"Parol bilan aldov xati?",
[
"Phishing",
"Freeze",
"Pivot"
],
0
]
]
}
]
});
