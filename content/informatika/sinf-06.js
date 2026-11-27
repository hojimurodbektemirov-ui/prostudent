/* Avtomatik yaratilgan: tools/build_informatika.py. Qo'lda o'zgartirmang, text/06.txt ni tahrirlang. */
KM.inf({
"n": 6,
"title": "INFORMATIKA VA AXBOROT TEXNOLOGIYALARI",
"hours": 68,
"lessons": [
{
"n": 1,
"t": "Kompyuter tizimining asosiy qismlari: protsessor, tezkor va doimiy xotira",
"hw": "CPU, RAM va SSD vazifalarini 3 ustunli jadvalda taqqoslang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Kompyuter tizimining \"yuragi\" — uchta asosiy qism:\n- **Protsessor (CPU)** — buyruqlarni bajaradi va hisoblaydi. Tezligi **gigagers (GHz)** da o'lchanadi. Bir necha **yadro**si bo'ladi.\n- **Tezkor xotira (RAM)** — hozir ishlayotgan dastur va ma'lumotlar. Juda tez, lekin kompyuter o'chsa **tozalanadi**.\n- **Doimiy xotira (HDD/SSD)** — fayllar va dasturlar uzoq saqlanadi, o'chirilganda ham yo'qolmaydi. **SSD** HDD dan ancha tez.\nXotira hajmi: bayt → kilobayt (KB) → megabayt (MB) → gigabayt (GB) → terabayt (TB). Har biri oldingisidan **1024** marta katta.\n> CPU — o'ylaydi, RAM — \"ish stoli\", SSD — \"shkaf\".\n**Xotira turlari:** **RAM (tezkor xotira)** — ishlayotgan dasturlar uchun, tok o'chsa tozalanadi; **doimiy xotira (HDD/SSD)** — fayllar uzoq saqlanadi; **ROM** — kompyuterni ishga tushiruvchi dastur.\n**O'lchov birliklari:** 1 bayt = 8 bit; 1 KB = 1024 bayt; 1 MB = 1024 KB; 1 GB = 1024 MB; 1 TB = 1024 GB.",
"quiz": [
[
"Kompyuter o'chganda qaysi xotira tozalanadi?",
[
"HDD",
"RAM",
"SSD"
],
1
],
[
"Protsessor tezligi nimada o'lchanadi?",
[
"sm",
"GB",
"GHz"
],
2
],
[
"1 GB necha MB?",
[
"100",
"10",
"1024"
],
2
],
[
"1 bayt necha bit?",
[
"1024",
"8",
"10"
],
1
],
[
"1 TB necha GB?",
[
"8",
"1024",
"100"
],
1
],
[
"SSD ning HDD dan afzalligi?",
[
"Tezroq va harakatlanuvchi qismsiz",
"Arzonroq doim",
"Sekinroq"
],
0
],
[
"Protsessor yana qanday ataladi?",
[
"RAM",
"CPU (markaziy protsessor)",
"GPU xolos"
],
1
],
[
"Tasvirlarni qayta ishlovchi protsessor?",
[
"ROM",
"CPU",
"GPU (videokarta)"
],
2
],
[
"3 GHz protsessor soniyasiga taxminan qancha takt bajaradi?",
[
"3 million",
"3 milliard",
"3 ming"
],
1
],
[
"RAM ko'p bo'lsa nima yaxshilanadi?",
[
"Bir vaqtda ko'p dastur tez ishlaydi",
"Ekran kattalashadi",
"Ovoz balandlashadi"
],
0
],
[
"Bit qanday qiymat oladi?",
[
"0 dan 9 gacha",
"Istalgan harf",
"0 yoki 1"
],
2
]
]
},
{
"n": 2,
"t": "Fayl va papkalar bilan tartibli ishlash. Fayl kengaytmalari",
"hw": "Kompyuteringizdagi 5 ta fayl turini aniqlab, kengaytmalarini yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Fayl** — nom bilan saqlangan ma'lumot. **Kengaytma** — nuqtadan keyingi qism, fayl turini va qaysi dastur ochishini bildiradi.\n- **.docx** Word, **.xlsx** Excel, **.pptx** PowerPoint, **.pdf** PDF\n- **.jpg .png .svg** rasm, **.mp3** audio, **.mp4** video\n- **.zip** arxiv, **.exe** dastur (ehtiyot bo'ling!)\n- **.html** web-sahifa, **.py** Python\nTartibli ishlash: mavzu bo'yicha papkalar, aniq nomlar (\"6-sinf/Word/IT_yangiliklar.docx\"), keraksizini o'chirish.\n> Kengaytmani ko'rish: Проводник → Вид → \"Расширения имен файлов\".\n**Tartibli ishlash qoidalari:** fanlar bo'yicha papkalar (Informatika/2026/Loyiha), tushunarli nomlar, keraksiz fayllarni o'chirish, muhimlarini zaxiralash.\n**Xavfli kengaytmalar:** `.exe`, `.bat`, `.scr` — dastur; notanish manbadan ochmang. Kengaytmalarni ko'rsatishni yoqing (Ko'rinish → Fayl kengaytmalari).",
"quiz": [
[
".xlsx qaysi dastur fayli?",
[
"Excel",
"Word",
"Paint"
],
0
],
[
"Qaysi kengaytmali fayl dastur bo'lib, xavfli bo'lishi mumkin?",
[
".png",
".txt",
".exe"
],
2
],
[
"`.exe` fayl nima?",
[
"Rasm",
"Matn",
"Bajariladigan dastur"
],
2
],
[
"Fayl kengaytmalarini ko'rsatish nima uchun foydali?",
[
"Kerak emas",
"Chiroyli",
"Soxta \"rasm.jpg.exe\" kabi fayllarni sezish"
],
2
],
[
"`.txt` qanday fayl?",
[
"Dastur",
"Video",
"Oddiy matn"
],
2
],
[
"Papkani \"Ko'rinish\" bo'yicha jadval shaklida ko'rish nima beradi?",
[
"Hech narsa",
"Hajm, sana, turni ko'rish",
"Fayllarni o'chiradi"
],
1
],
[
"Fayllarni sana bo'yicha saralash qayerda?",
[
"Word'da",
"Papka oynasida ustun sarlavhasini bosib",
"Paint'da"
],
1
],
[
"Fayllarni izlash?",
[
"Papka oynasidagi qidiruv maydoni",
"Pusk tugmasini o'chirish",
"Imkoni yo'q"
],
0
],
[
"`.rar` va `.zip` nima?",
[
"Arxiv fayllar",
"Dasturlar",
"Rasmlar"
],
0
],
[
"Arxivdan chiqarish nima deyiladi?",
[
"Formatlash",
"Kodlash",
"Ochish (Extract)"
],
2
]
]
},
{
"n": 3,
"t": "Word’da matn kiritish, tahrirlash va ko‘chirish",
"hw": "5–6 gapli matn yozing va faylni to‘g‘ri nom bilan saqlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Word'da matn bilan ishlashning asosiy ko'nikmalari:\n- **Kiritish** — klaviaturadan, tinish belgisidan keyin bitta probel.\n- **Tahrirlash** — Backspace/Delete, Ctrl+Z (bekor qilish), Ctrl+Y (qaytarish).\n- **Ko'chirish** — Ctrl+X → Ctrl+V; **nusxalash** — Ctrl+C → Ctrl+V.\n- **Saqlash** — Ctrl+S, mazmunli nom bilan.\nAbzas oxirida **Enter**, qator oxirida emas — Word o'zi keyingi qatorga o'tkazadi.\n> ¶ tugmasi (Ctrl+Shift+8) yashirin belgilarni — probel va Enter'larni ko'rsatadi.\n**Tahrirlash usullari:** kiritish rejimi (Insert) va almashtirish rejimi; Shift+Enter — qator uzilishi (xatboshisiz); Ctrl+Enter — sahifa uzilishi; Ctrl+Backspace — so'zni o'chirish.\n**Yashirin belgilarni ko'rsatish (¶)** — bo'sh joy va Enter'larni ko'rish.",
"quiz": [
[
"Bekor qilingan amalni qaytarish?",
[
"Ctrl + Y",
"Ctrl + P",
"Ctrl + Z"
],
0
],
[
"Enter qachon bosiladi?",
[
"Hech qachon",
"Abzas oxirida",
"Har qator oxirida"
],
1
],
[
"¶ tugmasi nimani ko'rsatadi?",
[
"Diagrammani",
"Rasmni",
"Yashirin formatlash belgilarini"
],
2
],
[
"Shift+Enter nima qiladi?",
[
"Yangi qator, lekin o'sha xatboshi ichida",
"Yangi sahifa",
"Saqlaydi"
],
0
],
[
"Ortiqcha bo'sh joylarni qanday topamiz?",
[
"Chop etib",
"¶ yoqib ko'ramiz",
"Imkoni yo'q"
],
1
],
[
"So'zlar orasida nechta bo'sh joy bo'lishi kerak?",
[
"Uchta",
"Ko'p",
"Bitta"
],
2
],
[
"Matnni boshqa hujjatdan formatsiz joylash?",
[
"Ctrl+B",
"Ctrl+Z",
"Joylash → \"Faqat matn\""
],
2
],
[
"Kursorni hujjat boshiga olib borish?",
[
"Ctrl+Home",
"Home",
"Esc"
],
0
],
[
"Belgilanganni kichik/katta harfga o'tkazish?",
[
"F1",
"Ctrl+K",
"Shift+F3"
],
2
],
[
"Tahrirlash inglizcha?",
[
"Saving",
"Printing",
"Editing"
],
2
]
]
},
{
"n": 4,
"t": "Shrift, paragraf, tekislash va qator oralig‘ini boshqarish",
"hw": "8 qatorli matnning shrift turi, o‘lchami va rangini o‘zgartiring.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Shrift** parametrlari: turi, o'lchami (pt), rangi, qalin/kursiv/tagiga chizilgan.\n**Abzas** parametrlari (**Главная → Абзац**):\n- **Tekislash**: chap, markaz, o'ng, kenglik bo'yicha (ikki chet tekis).\n- **Qator oralig'i (интервал)**: 1.0, 1.15, 1.5, 2.0.\n- **Abzas chekinishi (отступ)** — birinchi qator ichkariga.\n- **Abzaslar orasidagi masofa** — oldin/keyin.\n> Rasmiy hujjat: Times New Roman 14, interval 1.5, kenglik bo'yicha.\n**Xatboshi parametrlari:** chekinish (birinchi qator), tekislash, qator oralig'i (1; 1,15; 1,5; 2), xatboshidan oldin/keyin interval.\n**Rasmiy hujjat:** Times New Roman 14, oraliq 1,5, eni bo'yicha tekislash, birinchi qator 1,25 sm.",
"quiz": [
[
"Qator oralig'i qayerda?",
[
"Рецензирование",
"Вставка",
"Абзац (Paragraph)"
],
2
],
[
"Ikki chetni tekislash?",
[
"Kenglik bo'yicha",
"Chap",
"Markaz"
],
0
],
[
"Birinchi qator chekinishi nima?",
[
"Sahifa raqami",
"Xatboshi boshidagi bo'sh joy",
"Sarlavha"
],
1
],
[
"Rasmiy hujjat uchun qator oralig'i?",
[
"0,5",
"3",
"1,5"
],
2
],
[
"Qator oralig'ini 2 qilsak?",
[
"Qatorlar orasi ikki baravar",
"Shrift kattalashadi",
"Matn o'chadi"
],
0
],
[
"Xatboshidan keyingi interval nima uchun?",
[
"Rang uchun",
"Kerak emas",
"Xatboshilarni ajratib ko'rsatish"
],
2
],
[
"O'ngga tekislash tugmalari?",
[
"Ctrl+E",
"Ctrl+R",
"Ctrl+L"
],
1
],
[
"Markazga tekislash?",
[
"Ctrl+E",
"Ctrl+R",
"Ctrl+J"
],
0
],
[
"Eni bo'yicha tekislash?",
[
"Ctrl+E",
"Ctrl+L",
"Ctrl+J"
],
2
],
[
"Chekinishni chizg'ich orqali o'zgartirsa bo'ladimi?",
[
"Yo'q",
"Ha, markerlarni surib",
"Faqat Paint'da"
],
1
]
]
},
{
"n": 5,
"t": "Sarlavha, uslub va hujjat strukturasi",
"hw": "Sarlavha, kichik sarlavha va asosiy matndan iborat hujjat tuzing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Uzun hujjatda **tuzilma** muhim: sarlavha, kichik sarlavha, asosiy matn.\n**Uslublar (Styles)** — tayyor formatlar to'plami: **Заголовок 1**, **Заголовок 2**, **Обычный**.\nFoydasi:\n- Bir tugma bilan bir xil format.\n- Uslubni o'zgartirsangiz — hujjatdagi barcha sarlavhalar birdan o'zgaradi.\n- **Avtomatik mundarija** (Ссылки → Оглавление) faqat uslublar bilan ishlaydi.\n- **Навигация** panelida hujjat tuzilmasi ko'rinadi.\n> Sarlavhani qo'lda kattalashtirmang — uslub bering.\n**Uslub (style)** — tayyor format to'plami: \"Sarlavha 1\", \"Sarlavha 2\", \"Oddiy\". Uslub o'zgarsa — hujjatdagi hamma shunday matn o'zgaradi.\n**Mundarija:** Havolalar → Mundarija — sarlavha uslublaridan avtomatik tuziladi.",
"quiz": [
[
"Avtomatik mundarija nima bilan ishlaydi?",
[
"Rasm",
"Jadval",
"Uslublar (Заголовок)"
],
2
],
[
"Uslubning foydasi?",
[
"Barcha sarlavhalar birdan o'zgaradi",
"Fayl kichrayadi",
"Rang yo'qoladi"
],
0
],
[
"Mundarija nimadan avtomatik yig'iladi?",
[
"Jadvaldan",
"Sarlavha uslublaridan",
"Rasmlardan"
],
1
],
[
"\"Sarlavha 2\" nima uchun?",
[
"Rasm izohi",
"Kichik bo'lim sarlavhasi",
"Asosiy matn"
],
1
],
[
"Uslubni o'zgartirsak nima bo'ladi?",
[
"Hech narsa",
"Faqat bitta so'z",
"Shu uslubdagi barcha matn o'zgaradi"
],
2
],
[
"Mundarija qaysi bo'limda?",
[
"Dizayn",
"Maket",
"Havolalar (References)"
],
2
],
[
"Sahifa raqamlari o'zgarsa mundarija?",
[
"\"Yangilash\" bosiladi",
"O'zi o'chadi",
"Qayta yoziladi"
],
0
],
[
"Navigatsiya paneli nimani ko'rsatadi?",
[
"Rasmlarni",
"Hujjat sarlavhalari tuzilmasini",
"Fayllarni"
],
1
],
[
"Uslublarning afzalligi?",
[
"Hech qanday",
"Sekinlashtiradi",
"Bir xil va tez formatlash"
],
2
],
[
"Hujjat strukturasi nima?",
[
"Shrift nomi",
"Fayl hajmi",
"Bo'lim va sarlavhalar tartibi"
],
2
]
]
},
{
"n": 6,
"t": "Amaliy ish: “IT yangiliklari” hujjatini bezash",
"hw": "“IT yangiliklari” nomli 1 betlik hujjatni tugallang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: \"IT yangiliklari\" hujjati.**\nTuzilma:\n1. Sarlavha (Заголовок 1): \"IT yangiliklari\".\n2. 2–3 ta yangilik, har biri kichik sarlavha (Заголовок 2) bilan.\n3. Asosiy matn: 1.15 interval, kenglik bo'yicha.\n4. Muhim so'zlar qalin.\n5. Oxirida manba yoki muallif.\nTekshiring: imlo (F7), bir sahifaga sig'ishi.\n> Yangilik: Kim? Nima? Qachon? Qayerda? — savollarga javob beradi.\n**Yangilik maqolasi tuzilishi:** sarlavha, qisqa kirish (lid), asosiy matn, rasm va izoh, manba, sana.\n**Bezash:** 2 ta shrift, bitta asosiy rang, rasm matnga mos.",
"quiz": [
[
"Yangilik sarlavhasi uchun qaysi uslub?",
[
"Заголовок 2",
"Обычный",
"Цитата"
],
0
],
[
"Imlo tekshiruvi tugmasi?",
[
"F7",
"F2",
"F5"
],
0
],
[
"Yangilik maqolasining kirish qismi nima deyiladi?",
[
"Kolontitul",
"Legend",
"Lid"
],
2
],
[
"Yangilikda albatta nima bo'lishi kerak?",
[
"Reklama",
"Parol",
"Manba va sana"
],
2
],
[
"Rasm ostida nima yoziladi?",
[
"Hech narsa",
"Qisqa izoh",
"Uzun maqola"
],
1
],
[
"Yangilikni qanday tekshiramiz?",
[
"Rasmiy manbadan",
"Mish-mishdan",
"Tekshirmaymiz"
],
0
],
[
"Hujjat uchun nechta shrift yetarli?",
[
"2 ta",
"6 ta",
"10 ta"
],
0
],
[
"Yangilik sarlavhasi qanday bo'lsin?",
[
"Qisqa va mazmunli",
"Juda uzun",
"Tushunarsiz"
],
0
],
[
"IT yangiligiga misol?",
[
"Yangi telefon taqdimoti",
"Futbol natijasi",
"Ob-havo bashorati"
],
0
],
[
"Ustunli matn (gazeta uslubi) qayerda?",
[
"Maket → Ustunlar",
"Qo'yish",
"Fayl"
],
0
]
]
},
{
"n": 7,
"t": "Hujjatga rasm va hoshiya qo‘shish. Rasmni matn bilan uyg‘unlashtirish",
"hw": "Hujjatga 2 ta rasm qo‘shib, matn orasiga va chetiga joylashtiring.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Hujjatga **rasm** qo'shish: **Вставка → Рисунки**. Matn bilan joylashuv (**Обтекание текстом / Wrap Text**):\n- **В тексте** — rasm harf kabi qatorda.\n- **Квадрат / Square** — matn rasm atrofidan oqadi.\n- **По контуру / Tight** — rasm shakli bo'ylab.\n- **За текстом / Behind** — rasm matn ortida (fon).\n**Hoshiya**: rasm chegarasi (Формат рисунка → Граница рисунка) yoki sahifa chegarasi (Дизайн → Границы страниц).\n> Rasmni burchagidan kichraytiring — proporsiya saqlanadi.\n**Matnni o'rash turlari:** matnda (inline), kvadrat atrofida, zich, matn ortida, matn oldida, yuqori-pastda.\n**Sahifa hoshiyasi:** Dizayn → Sahifa chegaralari (chiziq yoki rasmli chegara).",
"quiz": [
[
"Matn rasm atrofidan oqishi?",
[
"За текстом",
"Квадрат (Square)",
"В тексте"
],
1
],
[
"Sahifa hoshiyasi qayerda?",
[
"Дизайн → Границы страниц",
"Вставка → Таблица",
"Файл → Печать"
],
0
],
[
"\"Matn ortida\" o'rash qachon kerak?",
[
"Rasm fon bo'lganda",
"Hech qachon",
"Har doim"
],
0
],
[
"\"Yuqori va pastda\" o'rash nima qiladi?",
[
"Rasm yo'qoladi",
"Matn rasm ustida",
"Rasm yon tomonlarida matn bo'lmaydi"
],
2
],
[
"Rasmni aniq joyga qo'yish uchun qaysi o'rash qulay?",
[
"Hech qaysi",
"Kvadrat yoki zich",
"Matnda (inline)"
],
1
],
[
"Rasmga uslub (ramka, soya) qayerdan?",
[
"Ko'rib chiqish",
"Rasm formati → Rasm uslublari",
"Fayl"
],
1
],
[
"Hoshiya faqat birinchi sahifada bo'lishi mumkinmi?",
[
"Yo'q",
"Faqat oxirgida",
"Ha, sozlamada"
],
2
],
[
"Rasm yonidagi matn joylashuvi inglizcha?",
[
"Spell check",
"Text wrapping",
"Header"
],
1
],
[
"Rasm hujjatda \"sakrab\" ketsa?",
[
"Kompyuterni o'chiramiz",
"Rasmni o'chiramiz",
"O'rash turini o'zgartiramiz"
],
2
],
[
"Rasm o'lchamini aniq sm da kiritsa bo'ladimi?",
[
"Yo'q",
"Ha, Format → O'lcham",
"Faqat foizda"
],
1
]
]
},
{
"n": 8,
"t": "Shakllar va oddiy bezaklardan foydalanish",
"hw": "Hoshiya va shakllar yordamida sahifa dizaynini yarating.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Shakllar (Фигуры)** — strelka, banner, yulduz, kallout (gap pufagi).\n- **Заливка** — ichini to'ldirish (rang, gradient, rasm).\n- **Контур** — chegara rangi va qalinligi.\n- **Эффекты** — soya, porlash, hajm.\n- Shaklga matn: o'ng tugma → **Добавить текст**.\n- Bir nechta shaklni **guruhlash**: Ctrl bilan belgilash → o'ng tugma → **Группировать**.\n> Dizayn qoidasi: kam — lekin sifatli bezak.\n**Shakl formati:** to'ldirish, kontur, soya, aks, yorug'lik, 3D. **Tekislash:** bir nechta shaklni chapga/markazga tekislash, teng taqsimlash. **Guruhlash:** Ctrl+G.",
"quiz": [
[
"Shakllarni birlashtirib bitta obyekt qilish?",
[
"Saqlash",
"Guruhlash",
"O'chirish"
],
1
],
[
"Shaklga soya qayerdan?",
[
"Шрифт",
"Эффекты",
"Контур"
],
1
],
[
"Shakllarni guruhlash tugmalari (Word/PowerPoint)?",
[
"Ctrl+B",
"Ctrl+P",
"Ctrl+G"
],
2
],
[
"Shakllarni teng masofada joylash?",
[
"\"Teng taqsimlash\"",
"O'chirish",
"Guruhlash"
],
0
],
[
"Shaklga matn qo'shish?",
[
"Shaklni o'ng tugma → Matn qo'shish",
"Imkoni yo'q",
"Faqat rasm"
],
0
],
[
"Shaklni boshqa shaklga o'zgartirish mumkinmi?",
[
"Faqat rangini",
"Yo'q",
"Ha, \"Shaklni o'zgartirish\""
],
2
],
[
"Bir xil formatni boshqa shaklga o'tkazish?",
[
"Delete",
"Format nusxalash (cho'tka)",
"Ctrl+Z"
],
1
],
[
"Strelkani ikki shakl orasida bog'lash nima deyiladi?",
[
"Ramka",
"Shrift",
"Ulagich (connector)"
],
2
],
[
"Guruhni ajratish?",
[
"Ctrl+Shift+G",
"Ctrl+G",
"Esc"
],
0
],
[
"Shakl orqa fonga o'tishi uchun?",
[
"O'chirish",
"\"Oldinga\"",
"\"Orqaga olib o'tish\""
],
2
]
]
},
{
"n": 9,
"t": "Amaliy ish: “IT klub” e’loni (posteri)",
"hw": "“IT klubiga qabul” posterini Word’da tugallang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: \"IT klub\" posteri.**\nPoster tarkibi:\n1. **Sarlavha** — WordArt yoki katta qalin shrift: \"IT klubiga qabul!\"\n2. **Rasm** — kompyuter, robot.\n3. **3 ta ma'lumot**: nima o'rganiladi, qachon, qayerda.\n4. **Chaqiriq**: \"Ro'yxatdan o'ting!\"\n5. Fon va shakllar bilan bezak.\nSahifa yo'nalishi poster uchun **Portrait** yoki **Landscape** — dizaynga qarab.\n> Poster: 3 soniyada asosiy gap tushunilishi kerak.\n**E'lon/poster formulasi:** **Nima?** (IT klub), **Qachon?** (sana, vaqt), **Qayerda?** (xona), **Kim uchun?** (5–7-sinflar), **Chaqiriq** (\"Ro'yxatdan o'ting!\"), QR-kod.",
"quiz": [
[
"Posterda chaqiriq nima?",
[
"Faqat rasm",
"Harakatga undovchi gap",
"Sana"
],
1
],
[
"Postering birinchi navbatda ko'rinadigan qismi?",
[
"Sarlavha",
"Kichik matn",
"Chegara"
],
0
],
[
"E'londa \"Qachon?\" savoliga javob?",
[
"Sana va vaqt",
"Xona raqami",
"Klub nomi"
],
0
],
[
"Chaqiriq (call to action) misoli?",
[
"\"Bugunoq yoziling!\"",
"\"Xona 12\"",
"\"IT klub\""
],
0
],
[
"E'londa QR-kod nima uchun?",
[
"Kerak emas",
"Tez ro'yxatdan o'tish havolasi",
"Bezak"
],
1
],
[
"Posterni uzoqdan o'qish uchun?",
[
"Kichik shrift",
"Ko'p matn",
"Katta, qalin sarlavha"
],
2
],
[
"Poster ranglari soni?",
[
"Bitta kulrang",
"15 ta",
"2–3 ta asosiy"
],
2
],
[
"Poster markazida nima bo'lishi yaxshi?",
[
"Kichik izoh",
"Bo'sh joy",
"Asosiy rasm yoki sarlavha"
],
2
],
[
"E'lon kimga mo'ljallanganini qayerda yozamiz?",
[
"Hech qayerda",
"\"Kim uchun\" qatorida",
"Faylda"
],
1
],
[
"Posterni tekshirishning oddiy usuli?",
[
"Rangini sanash",
"Hajmini o'lchash",
"3 soniyada tushunarli ekanini tekshirish"
],
2
]
]
},
{
"n": 10,
"t": "Hujjatni auditoriyaga moslash. Rang, shrift va kontrastni tanlash",
"hw": "O‘quvchi va ota-ona uchun hujjat qanday farq qilishini 3 gapda yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Auditoriya** — hujjat kim uchun. Bir xil xabar turli o'quvchiga turlicha bezaladi:\n- **Bolalar uchun:** yorqin ranglar, katta shrift, rasmlar, qisqa gaplar.\n- **Ota-onalar uchun:** sokin ranglar, aniq faktlar (sana, vaqt, joy), rasmiy uslub.\n**Kontrast** — matn va fon farqi: oq fonda qora matn — yaxshi; sariq fonda oq matn — yomon.\nShrift: o'qishga qulay (Arial, Calibri), 2 tadan ko'p emas.\n> Avval \"kim o'qiydi?\" deb so'rang.\n**Auditoriya** — hujjatni kim o'qishi. Kichik bolalar — rasm ko'p, oddiy so'zlar; ota-onalar — aniq ma'lumot, rasmiy uslub; tengdoshlar — qiziqarli, zamonaviy.\n**Kontrast va o'qilishi:** to'q fon — och matn; yorqin ranglarni ko'p ishlatmang.",
"quiz": [
[
"Ota-onalar uchun hujjat qanday?",
[
"Faqat rasm",
"Juda ko'p rang",
"Aniq faktlar va rasmiy uslub"
],
2
],
[
"Qaysi kontrast yaxshi?",
[
"Oq fonda qora matn",
"Qora fonda qora matn",
"Sariq fonda oq matn"
],
0
],
[
"1-sinf o'quvchilari uchun hujjat qanday?",
[
"Mayda shrift",
"Katta harf, rasm ko'p, sodda",
"Ko'p jadval"
],
1
],
[
"Ota-onalar uchun hujjatda nima muhim?",
[
"Jargon so'zlar",
"Aniq sana, vaqt, mas'ul shaxs",
"Mem rasmlar"
],
1
],
[
"Ko'rish qobiliyati past odamlar uchun?",
[
"Och kulrang matn",
"Kichik shrift",
"Kattaroq shrift va yuqori kontrast"
],
2
],
[
"Rasmiy hujjatda qaysi shrift mos?",
[
"Bezakli qo'lyozma",
"Rasmli shrift",
"Oddiy (Times, Arial)"
],
2
],
[
"Qaysi rang juftligi qiyin o'qiladi?",
[
"Oq fonda qora",
"Sariq fonda oq",
"Qora fonda oq"
],
1
],
[
"Auditoriya nima?",
[
"Xona",
"Hujjat mo'ljallangan odamlar",
"Fayl turi"
],
1
],
[
"Tengdoshlar uchun e'lon uslubi?",
[
"Qiziqarli va qisqa",
"Rasmiy buyruq",
"Juda uzun"
],
0
],
[
"Bitta hujjatni ikki auditoriyaga moslash?",
[
"Hech narsa qilmaslik",
"Faqat rangini",
"Uslub va tilni o'zgartirish"
],
2
]
]
},
{
"n": 11,
"t": "Amaliy ish: bitta xabarni 2 xil auditoriya uchun bezash",
"hw": "“Ota-onalar uchun axborot” sahifasini tayyorlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: bir xabar — 2 auditoriya.**\nXabar: \"Shanba kuni maktabda IT festival\".\n1. **O'quvchilar uchun** varaq: qiziqarli sarlavha, rasm, o'yinlar haqida.\n2. **Ota-onalar uchun** varaq: sana, vaqt, manzil, dastur, aloqa telefoni; sokin ranglar.\nIkkalasini solishtiring: nima o'zgardi, nima o'zgarmadi?\n> Mazmun bir — shakl auditoriyaga mos.\n**Ikki variant usuli:** bitta mazmun — ikki xil bezak. O'quvchilar uchun: emoji, yorqin sarlavha. Ota-onalar uchun: rasmiy til, aniq jadval (sana, vaqt, joy), aloqa telefoni.",
"quiz": [
[
"Ota-onalar varag'ida albatta nima bo'ladi?",
[
"Ko'p emoji",
"Sana, vaqt, joy",
"Faqat rasm"
],
1
],
[
"O'quvchilar varag'ida qanday sarlavha?",
[
"Rasmiy",
"Qiziqarli",
"Sarlavhasiz"
],
1
],
[
"Ota-onalar varag'ida aloqa ma'lumoti nima uchun?",
[
"Bezak",
"Savol bo'lsa bog'lanish uchun",
"Kerak emas"
],
1
],
[
"O'quvchilar varag'ida emoji ishlatsa bo'ladimi?",
[
"Ha, me'yorida",
"Yo'q",
"Faqat 50 ta"
],
0
],
[
"Ikkala variantda nima bir xil bo'ladi?",
[
"Shrift",
"Asosiy ma'lumot (sana, joy)",
"Rang"
],
1
],
[
"Jadval ota-onalar uchun nima uchun qulay?",
[
"Kerak emas",
"Ma'lumot aniq va tartibli",
"Chiroyli xolos"
],
1
],
[
"Variantlarni qanday nomlash?",
[
"yangi",
"elon_oquvchi.docx va elon_ota-ona.docx",
"1 va 2"
],
1
],
[
"Rasmiy varaqda murojaat?",
[
"Murojaatsiz",
"\"Salom bolalar!\"",
"\"Hurmatli ota-onalar!\""
],
2
],
[
"Variantlarni solishtirish nima beradi?",
[
"Qaysi biri maqsadga mosligini ko'rish",
"Fayl hajmini",
"Hech narsa"
],
0
],
[
"Bir xabar — turli uslub: bu qanday ko'nikma?",
[
"Plagiat",
"Kodlash",
"Auditoriyaga moslash"
],
2
]
]
},
{
"n": 12,
"t": "Loyiha rejasini tuzish: maqsad, vazifa va natija",
"hw": "“Mening raqamli portfoliom” loyihasi uchun 4 ta vazifa rejasini yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Loyiha** — aniq maqsad va natijaga ega ish. Reja tuzish:\n- **Maqsad** — nima uchun? (\"O'z yutuqlarimni ko'rsatish\")\n- **Vazifalar** — qanday qadamlar? (rasm yig'ish, matn yozish, bezash, tekshirish)\n- **Muddat** — qachongacha?\n- **Natija** — qanday mahsulot? (\"5 sahifali raqamli portfolio\")\n**Raqamli portfolio** — ishlaringiz, sertifikatlaringiz va yutuqlaringiz to'plami.\n> Yaxshi reja — loyihaning yarmi.\n**Loyiha rejasi (SMART):** aniq, o'lchanadigan, erishiladigan, muhim, muddatli maqsad.\n**Reja:** maqsad (nima uchun), vazifalar (nima qilamiz), resurslar (nima kerak), muddat (qachon), natija (nima hosil bo'ladi).",
"quiz": [
[
"Loyihaning \"Nima uchun?\" savoli?",
[
"Natija",
"Muddat",
"Maqsad"
],
2
],
[
"Raqamli portfolio nima?",
[
"Yutuq va ishlar to'plami",
"Dastur",
"O'yin"
],
0
],
[
"Loyihaning \"Qachon?\" savoli nimani bildiradi?",
[
"Resursni",
"Maqsadni",
"Muddatni"
],
2
],
[
"SMART maqsadning \"M\" harfi?",
[
"Musiqiy",
"O'lchanadigan (Measurable)",
"Mayda"
],
1
],
[
"Vazifalar nima?",
[
"Maqsadga yetish uchun qilinadigan ishlar",
"Natija",
"Muddat"
],
0
],
[
"Resurslarga misol?",
[
"Kompyuter, vaqt, ma'lumot",
"Hech narsa",
"Faqat pul"
],
0
],
[
"\"Yaxshi portfolio qilish\" yaxshi maqsadmi?",
[
"Juda noaniq",
"SMART",
"Juda aniq"
],
0
],
[
"Aniqroq maqsad?",
[
"\"Yaxshi bo'lish\"",
"\"Harakat qilish\"",
"\"Dekabrgacha 5 ta ishimni portfolio saytga joylash\""
],
2
],
[
"Natija nima?",
[
"Muammo",
"Loyiha oxirida hosil bo'ladigan mahsulot",
"Birinchi qadam"
],
1
],
[
"Reja nima uchun kerak?",
[
"Ishni tartibli va o'z vaqtida bajarish",
"Kerak emas",
"Vaqt yo'qotish"
],
0
]
]
},
{
"n": 13,
"t": "Loyiha ishi: “Mening raqamli portfoliom”",
"hw": "Portfoliongizning 1-bosqichini tayyorlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Loyiha ishi: \"Mening raqamli portfoliom\" — 1-bosqich.**\nTarkib:\n1. Titul: ism, sinf, maktab, rasm.\n2. \"Men haqimda\" — qiziqishlar, maqsadlar.\n3. \"Mening ishlarim\" — 2–3 ta eng yaxshi ish (rasm, hujjat).\n4. \"Yutuqlarim\" — sertifikat va diplomlar.\nPapka tuzilmasi: **Portfolio / rasmlar / hujjatlar / final**.\n> Portfolio doim yangilanib boradi.\n**Raqamli portfolio** — eng yaxshi ishlaringiz to'plami: hujjatlar, rasmlar, loyihalar, sertifikatlar. Har bir ish uchun: nomi, sana, qisqa izoh (nima o'rgandingiz).\n**Format:** PDF, taqdimot yoki oddiy sayt.",
"quiz": [
[
"Portfolio titulida nima bo'ladi?",
[
"Hech narsa",
"Ism, sinf, rasm",
"Faqat sana"
],
1
],
[
"Portfolio qachon tugaydi?",
[
"Doim yangilanib boradi",
"Hech qachon boshlanmaydi",
"Bir kunda"
],
0
],
[
"Portfolioga qaysi ish qo'yiladi?",
[
"Begona ishlar",
"Eng yaxshi va tugallangan ishlar",
"Hamma qoralamalar"
],
1
],
[
"Har bir ish yonida nima yoziladi?",
[
"Faqat parol",
"Hech narsa",
"Nomi, sana va qisqa izoh"
],
2
],
[
"Portfolio qanday formatda bo'lishi mumkin?",
[
"PDF, taqdimot yoki sayt",
"Faqat qog'oz",
"MP3"
],
0
],
[
"Portfolio nima uchun kerak?",
[
"Yutuqlarni ko'rsatish va o'sishni kuzatish",
"Kerak emas",
"O'yin uchun"
],
0
],
[
"Portfolio titul sahifasida?",
[
"Parol",
"Jadval",
"Ism, sinf, mavzu, rasm"
],
2
],
[
"Portfolioni yangilab borish kerakmi?",
[
"Ha, yangi ishlar qo'shiladi",
"Har kuni o'chiriladi",
"Yo'q"
],
0
],
[
"Portfolioda sertifikat bo'lishi mumkinmi?",
[
"Faqat sport",
"Ha",
"Yo'q"
],
1
],
[
"\"Men nimani o'rgandim\" bo'limi nima beradi?",
[
"Fikrlash va o'z-o'zini baholash",
"Bezak",
"Hech narsa"
],
0
]
]
},
{
"n": 14,
"t": "Rasm formatlari: JPG, PNG, SVG. Rasmni import qilish",
"hw": "Bir rasmni 2–3 formatda saqlab, hajmlarini taqqoslang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Rasm formatlari:\n- **JPG** — foto, kichik hajm, siqishda sifat biroz yo'qoladi, shaffoflik yo'q.\n- **PNG** — sifat yo'qolmaydi, **shaffof fon**, chizma va skrinshotlar uchun.\n- **SVG** — **vektor** rasm: formulalar bilan chiziladi, cheksiz kattalashtirilsa ham buzilmaydi. Logotip va ikonkalar uchun.\n- **GIF** — oddiy animatsiya.\n**Rastr** rasm piksellardan iborat (JPG, PNG) — kattalashtirsa \"kvadratchalar\" ko'rinadi.\n> Logotip — SVG, foto — JPG, skrinshot — PNG.\n**Rastr** (JPG, PNG, GIF, BMP) — piksellardan; kattalashtirsa sifat yo'qoladi. **Vektor** (SVG, AI) — chiziq va shakllar formulasidan; istalgancha kattalashtirsa ham aniq.\n**Import:** Qo'yish → Rasmlar yoki faylni hujjatga sudrab tashlash.",
"quiz": [
[
"Kattalashtirsa ham buzilmaydigan format?",
[
"SVG",
"PNG",
"JPG"
],
0
],
[
"Rastr rasm nimadan iborat?",
[
"Piksellardan",
"Harflardan",
"Formulalardan"
],
0
],
[
"Logotipni bannerga kattalashtirish uchun qaysi format?",
[
"GIF",
"JPG",
"SVG (vektor)"
],
2
],
[
"Fotosurat qaysi turda?",
[
"Matn",
"Vektor",
"Rastr"
],
2
],
[
"SVG nimadan iborat?",
[
"Ovozdan",
"Shakl va chiziq ta'riflaridan",
"Piksellardan"
],
1
],
[
"Vektor muharririga misol?",
[
"Paint",
"Bloknot",
"Inkscape"
],
2
],
[
"Rastr rasmni juda kattalashtirsak?",
[
"Piksellar ko'rinadi (xira)",
"Rang o'zgaradi",
"Aniqroq bo'ladi"
],
0
],
[
"Rasmni hujjatga tez qo'shish?",
[
"Faylni oynaga sudrab tashlash",
"Chop etish",
"Imkoni yo'q"
],
0
],
[
"Ikonkalar uchun qaysi format qulay?",
[
"DOCX",
"SVG yoki PNG",
"MP4"
],
1
],
[
"Rasm sifati (aniqligi) nima bilan bog'liq?",
[
"Piksellar soni (o'lcham)",
"Sana",
"Fayl nomi"
],
0
]
]
},
{
"n": 15,
"t": "Rotate, Flip va Crop amallari",
"hw": "Bir rasmni aylantiring, teskari o‘giring va kesing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "- **Rotate (aylantirish)** — 90° o'ngga/chapga, 180°.\n- **Flip (aks ettirish)** — gorizontal (chap↔o'ng), vertikal (tepa↔past).\n- **Crop (kesish)** — keraksiz chetlarni olib tashlash.\nPaint'da: **Повернуть**, **Обрезать**. Word'da rasm ustida: **Формат рисунка → Обрезка** va **Повернуть**.\nTelefon galereyasida ham shu amallar bor.\n> Flip yozuvni teskari qiladi — matnli rasmda ehtiyot bo'ling.\n**Rotate** — 90°/180°/erkin burchakka aylantirish. **Flip** — gorizontal (chap-o'ng) yoki vertikal (yuqori-past) akslantirish. **Crop** — kesish; nisbatda kesish (1:1, 16:9).",
"quiz": [
[
"Rasmni oyna aksidek teskari qilish?",
[
"Flip",
"Crop",
"Rotate"
],
0
],
[
"Keraksiz chetlarni olib tashlash?",
[
"Rotate",
"Flip",
"Crop"
],
2
],
[
"16:9 nisbat qayerda ishlatiladi?",
[
"Pasport surati",
"Kvadrat post",
"Keng ekran va video"
],
2
],
[
"Kvadrat post uchun nisbat?",
[
"1:1",
"4:3",
"16:9"
],
0
],
[
"Gorizontal akslantirishda nima almashadi?",
[
"Yuqori va past",
"Chap va o'ng",
"Ranglar"
],
1
],
[
"Matnli rasmni akslantirsak yozuv?",
[
"Teskari (o'qib bo'lmaydi)",
"O'zgarmaydi",
"Yo'qoladi"
],
0
],
[
"Ufq qiyshiq tushgan suratni tuzatish?",
[
"O'chirish",
"Kichik burchakka aylantirish",
"Kesish xolos"
],
1
],
[
"Crop'dan keyin kesilgan qismni qaytarsa bo'ladimi (saqlanmaguncha)?",
[
"Yo'q",
"Faqat chop etib",
"Ha, Ctrl+Z"
],
2
],
[
"Rotate inglizcha nima?",
[
"Akslantirish",
"Aylantirish",
"Kesish"
],
1
],
[
"Portret uchun kesish nisbati odatda?",
[
"3:4 yoki 4:5",
"21:9",
"1:10"
],
0
]
]
},
{
"n": 16,
"t": "Rasm o‘lchamini piksel va foiz orqali o‘zgartirish",
"hw": "Bir rasmdan 2 xil o‘lchamdagi nusxa tayyorlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Rasm o'lchami** pikselda ifodalanadi: masalan **1920×1080** — kenglik × balandlik.\nO'zgartirish usullari:\n- **Foizda**: 50% — ikki barobar kichik.\n- **Pikselda**: aniq o'lcham, masalan 800×450.\n- **Proporsiyani saqlash** belgisini qo'ying, aks holda rasm cho'ziladi.\nKichik rasm — kichik fayl hajmi: internetga yuklash va email uchun qulay. Kichraytirilgan rasmni qayta kattalashtirsangiz, sifat yo'qoladi.\n> Asl rasmni saqlab qo'ying, nusxasini kichraytiring.\n**Piksel o'lchami:** eni × bo'yi (masalan 1280×720). **Foiz:** 50% — har tomoni yarmiga. **Proporsiyani saqlash** — eni o'zgarsa bo'yi ham mos o'zgaradi (qulf belgisi).",
"quiz": [
[
"1920×1080 rasmni 50% kichraytirsak?",
[
"3840×2160",
"960×540",
"1920×540"
],
1
],
[
"Rasm cho'zilmasligi uchun nima qilinadi?",
[
"Proporsiya saqlanadi",
"Fayl o'chiriladi",
"Rang o'zgartiriladi"
],
0
],
[
"800×600 rasmni 50% kichraytirsak?",
[
"400×300",
"1600×1200",
"800×300"
],
0
],
[
"1000×500 rasm eni 500 bo'lsa, proporsiya saqlansa bo'yi?",
[
"250",
"1000",
"500"
],
0
],
[
"Proporsiya saqlanmasa nima bo'ladi?",
[
"Rasm cho'ziladi yoki siqiladi",
"Rang o'zgaradi",
"Hech narsa"
],
0
],
[
"Rasm kichraytirilsa fayl hajmi?",
[
"Oshadi",
"Odatda kamayadi",
"O'zgarmaydi"
],
1
],
[
"200% kattalashtirish nimani bildiradi?",
[
"Yarmi",
"200 piksel",
"Har tomoni 2 baravar"
],
2
],
[
"Kichik rasmni katta qilsa sifati?",
[
"Oshadi",
"O'zgarmaydi",
"Pasayadi"
],
2
],
[
"Rasm o'lchamini qayerda ko'ramiz?",
[
"Nomida",
"Ko'rinmaydi",
"Fayl xususiyatlarida (Properties)"
],
2
],
[
"Saytga yuklash uchun 6000×4000 suratni nima qilish kerak?",
[
"O'zgartirmaslik",
"Kattalashtirish",
"Kichraytirish"
],
2
]
]
},
{
"n": 17,
"t": "Amaliy ish: bitta rasm asosida 4 xil variant tayyorlash",
"hw": "“Bir rasm — to‘rt dizayn” topshirig‘ini tugallang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: \"Bir rasm — to'rt dizayn\".**\nBitta rasmdan 4 ta variant:\n1. Asl rasm — kichraytirilgan (800 px).\n2. Kesilgan (crop) — faqat asosiy obyekt.\n3. Aylantirilgan / aks ettirilgan.\n4. Matn qo'shilgan — poster ko'rinishi.\nHar birini alohida nom bilan saqlang: rasm_v1.png, rasm_v2.png...\n> Bitta manba — ko'p mahsulot.\n**4 variant mashqi:** asl rasm → 1) kesilgan; 2) aylantirilgan; 3) o'lchami kichraytirilgan; 4) akslantirilgan yoki rangi o'zgartirilgan. Har biri alohida nom bilan.\n**Qoida:** asl rasmni o'zgartirmang — nusxada ishlang.",
"quiz": [
[
"Variantlarni qanday nomlaymiz?",
[
"1, 2, 3",
"rasm_v1, rasm_v2...",
"Nomsiz"
],
1
],
[
"Asl rasmni nima qilamiz?",
[
"Kesamiz",
"Saqlab qo'yamiz",
"O'chiramiz"
],
1
],
[
"Asl rasmni nima uchun saqlab qolamiz?",
[
"Kerak emas",
"Xato bo'lsa qayta boshlash uchun",
"Hajm uchun"
],
1
],
[
"Variantlar nomi misoli?",
[
"rasm_v1_kesilgan.png",
"1.png",
"yangi.png"
],
0
],
[
"Oq-qora variant qanday hosil qilinadi?",
[
"Aylantirib",
"Kesib",
"Rang to'yinganligini 0 qilib yoki filtr bilan"
],
2
],
[
"Variantlarni solishtirish uchun qulay usul?",
[
"Yonma-yon jadvalda ko'rsatish",
"Hammasini o'chirish",
"Bittasini qoldirish"
],
0
],
[
"\"Saqlash boshqacha\" nima uchun kerak?",
[
"Faylni o'chirish",
"Aslini buzmay yangi fayl yaratish",
"Chop etish"
],
1
],
[
"Rasmning yorqinligini o'zgartirish qayerda?",
[
"Maket",
"Fayl",
"Rasm formati → Tuzatishlar"
],
2
],
[
"Variantlar qaysi papkada?",
[
"Ish stolida tartibsiz",
"Savatda",
"Loyiha papkasi ichida tartibli"
],
2
],
[
"Bitta rasmning bir nechta varianti nima uchun kerak?",
[
"Kerak emas",
"Eng mosini tanlash uchun",
"Joy egallash uchun"
],
1
]
]
},
{
"n": 18,
"t": "Versiya nazorati: v1, v2, final va backup nomlari",
"hw": "3 ta faylga v1, v2 va final nomlarini bering.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Versiya nazorati** — fayl o'zgarishlarini tartibli saqlash.\nNomlash: **hisobot_v1.docx → hisobot_v2.docx → hisobot_final.docx**.\n- **v1, v2** — oraliq versiyalar.\n- **final** — yakuniy.\n- **backup** — zaxira nusxa (boshqa joyda: fleshka, bulut).\nNima uchun? Xato qilsangiz, eski versiyaga qaytasiz. Dasturchilar buning uchun **Git** tizimidan foydalanadi.\n> \"final_final_2_oxirgi.docx\" — yomon nom!\n**Versiya nazorati** — ishning bosqichlarini saqlash: `insho_v1.docx`, `insho_v2.docx`, `insho_final.docx`. **Backup (zaxira)** — boshqa joydagi nusxa.\n**Bilasizmi?** Dasturchilar versiyalarni **Git** dasturi bilan boshqaradi; har bir o'zgarish tarixi saqlanadi.",
"quiz": [
[
"Yakuniy versiya nomi?",
[
"final",
"test",
"v1"
],
0
],
[
"Backup nima?",
[
"O'yin",
"Zaxira nusxa",
"Rasm"
],
1
],
[
"Versiya nazorati nima uchun kerak?",
[
"Kerak emas",
"Oldingi holatga qaytish imkoni",
"Joy tejash"
],
1
],
[
"Dasturchilar versiyalarni qaysi dastur bilan boshqaradi?",
[
"Git",
"Excel",
"Paint"
],
0
],
[
"\"insho_v3\" nimani bildiradi?",
[
"Inshoning 3-versiyasi",
"3-sinf",
"3 ta insho"
],
0
],
[
"Zaxira nusxani qayerda saqlash yaxshi?",
[
"Xuddi shu papkada",
"Hech qayerda",
"Boshqa qurilma yoki bulutda"
],
2
],
[
"Google Docs'da versiyalar tarixi bormi?",
[
"Yo'q",
"Ha",
"Faqat pullik"
],
1
],
[
"\"final\" so'zi nimani bildiradi?",
[
"Birinchi qoralama",
"Xato fayl",
"Yakuniy versiya"
],
2
],
[
"Har bir versiyaga sana qo'shish foydasi?",
[
"Fayl kattalashadi",
"Qachon o'zgarganini bilish",
"Kerak emas"
],
1
],
[
"3-2-1 zaxira qoidasi?",
[
"3 nusxa, 2 xil vosita, 1 tasi boshqa joyda",
"3 ta parol",
"1 ta fayl"
],
0
]
]
},
{
"n": 19,
"t": "Amaliy ish: loyiha uchun papka va zaxira nusxa tizimi",
"hw": "Loyiha uchun backup papkasini tashkil qilib, fayllarni tartiblang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Loyiha papkasi tuzilmasi:**\n```\nPortfolio/\n  rasmlar/\n  hujjatlar/\n  taqdimot/\n  final/\n  backup/\n```\nQoidalar:\n- Har fayl o'z papkasida.\n- Nomlarda sana: 2026-11-25_hisobot.docx — sana bo'yicha tartiblanadi.\n- Haftada bir marta **backup** papkasini fleshka yoki bulutga (Google Drive) nusxalash.\n> 3-2-1 qoidasi: 3 nusxa, 2 xil joyda, 1 tasi uydan tashqarida.\n**Loyiha papka tizimi:** `Loyiha/01_Hujjatlar`, `02_Rasmlar`, `03_Taqdimot`, `99_Zaxira`. Raqamli prefiks — papkalar tartibli turadi.\n**Sana formati:** `2026-11-27` (yil-oy-kun) — fayllar sana bo'yicha to'g'ri saralanadi.",
"quiz": [
[
"Sana bilan nomlashning foydasi?",
[
"Hajm kichrayadi",
"Fayllar tartiblanadi",
"Rang qo'shiladi"
],
1
],
[
"Backup qayerda saqlanishi yaxshi?",
[
"Hech qayerda",
"Boshqa joyda (fleshka, bulut)",
"Faqat shu papkada"
],
1
],
[
"Papka nomidagi \"01_\" nima uchun?",
[
"Kerak emas",
"Tartib bo'yicha saralash uchun",
"Bezak"
],
1
],
[
"Qaysi sana formati to'g'ri saralanadi?",
[
"27.11.26",
"27 noyabr",
"2026-11-27"
],
2
],
[
"Zaxira papkasini qayerga nusxalash?",
[
"Hech qayerga",
"Savatga",
"Fleshka yoki bulutga"
],
2
],
[
"Bulutli saqlash afzalligi?",
[
"Internet kerak emas",
"Istalgan qurilmadan kirish",
"Cheksiz bepul doim"
],
1
],
[
"Avtomatik zaxira nima?",
[
"O'chirish",
"Qo'lda ko'chirish",
"Dastur o'zi muntazam nusxa oladi"
],
2
],
[
"Fayllarni tartibli saqlashning foydasi?",
[
"Tez topish va yo'qotmaslik",
"Joy oshadi",
"Kerak emas"
],
0
],
[
"Jamoaviy loyihada papkani qanday ulashamiz?",
[
"Bulutda umumiy papka",
"Har kim alohida",
"Ulashmaymiz"
],
0
],
[
"Eski versiyalarni qachon o'chirish mumkin?",
[
"Hech qachon",
"Darhol",
"Loyiha tugab, final saqlangandan keyin"
],
2
]
]
},
{
"n": 20,
"t": "Nazorat ishi: hujjat, tasvir va fayl boshqaruvi",
"hw": "O‘rgangan mavzulardan 5 ta test savoli tuzing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Nazorat ishi: hujjat, tasvir va fayl boshqaruvi.** Takrorlang:\n- CPU, RAM, SSD; fayl kengaytmalari.\n- Word: shrift, abzas, uslublar, rasm joylashuvi, shakllar.\n- Auditoriya va kontrast.\n- JPG/PNG/SVG, crop/rotate/flip, o'lcham.\n- Versiyalar va backup.",
"quiz": [
[
"Vektor format?",
[
"SVG",
"JPG",
"PNG"
],
0
],
[
"Uslub \"Заголовок 1\" nima uchun?",
[
"Oddiy matn",
"Sarlavha",
"Rasm"
],
1
],
[
"Kompyuter o'chganda tozalanadigan xotira?",
[
"Fleshka",
"SSD",
"RAM"
],
2
],
[
"Zaxira nusxa?",
[
"Final",
"v1",
"Backup"
],
2
],
[
"Matn rasm atrofidan oqishi?",
[
"В тексте",
"Behind",
"Square"
],
2
],
[
"800×600 rasmni 50% kichraytirsak?",
[
"400×300",
"1600×1200",
"800×300"
],
0
],
[
"Backup qayerda saqlanishi yaxshi?",
[
"Hech qayerda",
"Boshqa joyda (fleshka, bulut)",
"Faqat shu papkada"
],
1
],
[
"Rasmning yorqinligini o'zgartirish qayerda?",
[
"Maket",
"Fayl",
"Rasm formati → Tuzatishlar"
],
2
],
[
"Qaysi sana formati to'g'ri saralanadi?",
[
"27.11.26",
"27 noyabr",
"2026-11-27"
],
2
],
[
"Portfolioda sertifikat bo'lishi mumkinmi?",
[
"Faqat sport",
"Ha",
"Yo'q"
],
1
]
]
},
{
"n": 21,
"t": "Elektron jadval tushunchasi. Katak, satr, ustun va diapazon",
"hw": "Katak, satr, ustun va diapazonga bittadan misol yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Elektron jadval** (Excel, Google Sheets) — kataklardan iborat jadval, hisob-kitob avtomatik.\n- **Katak** — ustun harfi + satr raqami: **C4**.\n- **Satr** — gorizontal (1, 2, 3...).\n- **Ustun** — vertikal (A, B, C...).\n- **Diapazon** — kataklar to'plami: **B2:D6** (3 ustun × 5 satr = 15 katak).\n- **Faol katak** — hozir tanlangan, qalin ramkali.\n> Excel varag'ida 1 milliondan ortiq satr bor!\n**Elektron jadval:** katak (C4), satr (4), ustun (C), diapazon (B2:D6 = 3 ustun × 5 satr = 15 katak), varaq, kitob.\n**Nom maydoni** — faol katak manzili; **formula satri** — katak tarkibi.",
"quiz": [
[
"B2:D6 da nechta katak?",
[
"15",
"4",
"10"
],
0
],
[
"Faol katak qanday ajralib turadi?",
[
"Ko'rinmaydi",
"Qalin ramka",
"Qizil rang"
],
1
],
[
"B2:D6 da nechta katak?",
[
"20",
"12",
"15"
],
2
],
[
"C3:C10 da nechta katak?",
[
"10",
"7",
"8"
],
2
],
[
"A1:D1 qanday diapazon?",
[
"Bitta katak",
"4 ta satr",
"Bitta satrdagi 4 katak"
],
2
],
[
"Bir nechta varaqni bir faylda saqlash mumkinmi?",
[
"Ha",
"Yo'q",
"Faqat ikkita"
],
0
],
[
"Faol katak manzili qayerda?",
[
"Holat satrida",
"Nom maydonida",
"Lentada"
],
1
],
[
"Satrni o'chirish?",
[
"Imkoni yo'q",
"Satr raqamini o'ng tugma → O'chirish",
"Delete xolos"
],
1
],
[
"Satr qo'shish?",
[
"Ctrl+Z",
"F5",
"O'ng tugma → Qo'yish"
],
2
],
[
"Juda katta jadvalda sarlavha ko'rinib turishi uchun?",
[
"O'chirish",
"Satrni qotirish (Freeze Panes)",
"Yashirish"
],
1
]
]
},
{
"n": 22,
"t": "Matn, son va sana ma’lumotlarini kiritish",
"hw": "10 o‘quvchilik ro‘yxat tuzing: ism, yosh va ball ustunlari.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "Excel'da ma'lumot turlari:\n- **Matn** — chapga tekislanadi: \"Aziza\".\n- **Son** — o'ngga tekislanadi: 95, 12.5.\n- **Sana** — 25.11.2026 (aslida son sifatida saqlanadi, sanalar bilan hisoblash mumkin).\n- **Foiz** — 15%.\nFormat: **Главная → Число** (Общий, Числовой, Дата, Процентный).\nAgar son chapga tekislansa — Excel uni matn deb tushungan (masalan, probel bor).\n> Sonni matn qilib kiritsangiz, formulalar ishlamaydi.\n**Ma'lumot turlari:** son (o'ngga), matn (chapga), sana (25.11.2026), foiz (15%), pul (so'm). **Format:** Bosh sahifa → Son formati.\n**Xato:** son chapga tekislansa — u matn sifatida yozilgan (masalan, bo'sh joy bilan).",
"quiz": [
[
"Excel sonni qaysi chetga tekislaydi?",
[
"Markaz",
"O'ng",
"Chap"
],
1
],
[
"Son chapga tekislansa?",
[
"Hammasi to'g'ri",
"Fayl buzilgan",
"Excel uni matn deb tushungan"
],
2
],
[
"15% qanday ma'lumot turi?",
[
"Matn",
"Sana",
"Foiz"
],
2
],
[
"Telefon raqamini boshidagi 0 yo'qolmasligi uchun?",
[
"Foiz",
"Son formati",
"Matn formatida yozish"
],
2
],
[
"Sanani sonlar bilan hisoblasa bo'ladimi?",
[
"Faqat yilni",
"Ha, kunlar farqini topish mumkin",
"Yo'q"
],
1
],
[
"Excel kasr ajratgichi (o'zbek sozlamasi)?",
[
"Nuqta xolos",
"Bo'sh joy",
"Vergul (3,5)"
],
2
],
[
"Pul formati nima qo'shadi?",
[
"Valyuta belgisi va ajratgichlar",
"Rang",
"Rasm"
],
0
],
[
"Katakda ##### ko'rinsa?",
[
"Xato son",
"Ustun tor, kengaytirish kerak",
"Virus"
],
1
],
[
"Bugungi sanani tez yozish?",
[
"Ctrl+S",
"Ctrl+D",
"Ctrl+;"
],
2
],
[
"Matn sifatida yozilgan sonni qo'shsa?",
[
"Hisobga olinmasligi mumkin",
"Ikki baravar",
"To'g'ri qo'shiladi"
],
0
]
]
},
{
"n": 23,
"t": "Amaliy ish: “Sinf ro‘yxati” jadvalini tuzish",
"hw": "“Sinf ro‘yxati” jadvalini formatlab saqlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: \"Sinf ro'yxati\".**\n| № | Ism | Yosh | Ball |\n1. Sarlavhalarni yozing va **qalin**, fon rangli qiling.\n2. 10 ta o'quvchi ma'lumotini kiriting.\n3. **№** ustunini avtoto'ldirish: 1, 2 ni yozib, ikkalasini belgilab, pastga sudrang.\n4. Ustun kengligini moslang.\n5. **Все границы** — chegara.\n6. **Форматировать как таблицу** — tayyor jadval uslubi.\n> Avtoto'ldirish: Dushanba, Seshanba... yoki 1, 2, 3... ketma-ketliklarni o'zi davom ettiradi.\n**Sinf ro'yxati jadvali:** № | Familiya | Ism | Tug'ilgan sana | To'garak. Avtoto'ldirish, chegaralar, sarlavha qalin, ustun kengligi, **filtr** qo'shish.",
"quiz": [
[
"1, 2, 3... ni tez to'ldirish?",
[
"Ctrl + Z",
"Qo'lda yozish",
"Avtoto'ldirish (sudrash)"
],
2
],
[
"Jadvalga chegara qayerdan?",
[
"Шрифт",
"Число",
"Все границы"
],
2
],
[
"№ ustunini tez to'ldirish?",
[
"1 va 2 ni yozib, markerni tortish",
"Har birini qo'lda",
"Formula yo'q"
],
0
],
[
"Familiya bo'yicha alifbo tartibi?",
[
"Filtr",
"Saralash A→Z",
"O'chirish"
],
1
],
[
"Faqat \"Robototexnika\" to'garagidagilarni ko'rish?",
[
"Diagramma",
"Saralash",
"Filtr"
],
2
],
[
"Jadvalni \"Jadval sifatida formatlash\" nima beradi?",
[
"Rasm",
"Hech narsa",
"Tayyor uslub va filtrlar"
],
2
],
[
"Ustun kengligini matnga moslash?",
[
"Ustun chegarasini ikki marta bosish",
"Esc",
"F12"
],
0
],
[
"Jadvalni chop etishda hammasi bir betga sig'ishi uchun?",
[
"\"Bir betga sig'dirish\" sozlamasi",
"Imkoni yo'q",
"Shriftni o'chirish"
],
0
],
[
"Ro'yxatda shaxsiy ma'lumotlarni kim ko'rishi kerak?",
[
"Internetdagi hamma",
"Faqat ruxsat etilganlar",
"Hamma"
],
1
],
[
"Bir xil familiyalarni topish?",
[
"O'chirish",
"Shartli formatlash → takrorlanuvchilar",
"Imkoni yo'q"
],
1
]
]
},
{
"n": 24,
"t": "Formula yozish: +, -, *, / va katak manzili",
"hw": "Excel’da 3 ta qo‘shish va 3 ta ayirish formulasini yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Formula** — \"=\" bilan boshlanadi. Arifmetik amallar: **+ − * /** va daraja **^**.\nKatak manzili bilan: **=B2+C2**, **=B2*C2**, **=(B2+C2)/2**.\nQavslar avval hisoblanadi (matematikadagi kabi).\nAfzalligi: B2 dagi son o'zgarsa, natija **avtomatik yangilanadi**.\nFunksiyalar: **=SUM(B2:B11)** yig'indi, **=AVERAGE(...)** o'rtacha.\n> Formula qatori (fx) katakdagi formulani ko'rsatadi, katakda esa natija.\n**Amallar tartibi:** avval qavs, keyin * va /, so'ng + va −. `=(A1+A2)*2`. **Katak manzili** bilan formula: son o'zgarsa natija yangilanadi.",
"quiz": [
[
"Ko'paytirish belgisi Excel'da?",
[
"·",
"x",
"*"
],
2
],
[
"=(4+6)/2 natijasi?",
[
"7",
"10",
"5"
],
2
],
[
"=2+3*4 natijasi?",
[
"24",
"20",
"14"
],
2
],
[
"=(2+3)*4 natijasi?",
[
"14",
"9",
"20"
],
2
],
[
"=10-4/2 natijasi?",
[
"8",
"3",
"6"
],
0
],
[
"A1=5, B1=3 bo'lsa =A1*B1-A1?",
[
"15",
"10",
"2"
],
1
],
[
"Darajaga ko'tarish belgisi?",
[
"^",
"x",
"**"
],
0
],
[
"=2^3 natijasi?",
[
"6",
"8",
"5"
],
1
],
[
"Formulada xato bo'lsa nima chiqadi?",
[
"#NAME? kabi xato kodi",
"0",
"Bo'sh"
],
0
],
[
"Formulani ko'rish uchun qaysi joy?",
[
"Formula satri",
"Holat satri",
"Varaq nomi"
],
0
]
]
},
{
"n": 25,
"t": "Nisbiy katak manzili. Formulani pastga nusxalash",
"hw": "Bitta formulani pastga nusxalab, 10 ta qatorda ishlating.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Nisbiy manzil** — formulani nusxalaganda manzil o'zgaradi.\nD2 da **=B2*C2** bor. Pastga nusxalasak: D3 da **=B3*C3**, D4 da **=B4*C4**... — Excel satr raqamini o'zi o'zgartiradi.\nNusxalash: katakning pastki o'ng burchagidagi **to'ldirish markeri**ni sudrash yoki ikki marta bosish.\n(Ma'lumot uchun: **$B$2** — mutlaq manzil, nusxalanganda o'zgarmaydi.)\n> Bitta formula — yuzlab qator hisob.\n**Nisbiy manzil** (A1) — nusxalanganda o'zgaradi. **Mutlaq manzil** ($A$1) — o'zgarmaydi. **F4** — $ belgisini qo'yadi.\n**Misol:** C2 = `=B2*$F$1` (F1 — chegirma foizi), pastga tortilsa C3 = `=B3*$F$1`.",
"quiz": [
[
"D2 dagi =B2*C2 ni D5 ga nusxalasak?",
[
"=B3*C3",
"=B5*C5",
"=B2*C2"
],
1
],
[
"Nusxalanganda o'zgarmaydigan manzil?",
[
"B$",
"$B$2",
"B2"
],
1
],
[
"$A$1 qanday manzil?",
[
"Nisbiy",
"Aralash",
"Mutlaq"
],
2
],
[
"$ belgisini tez qo'yish tugmasi?",
[
"F2",
"F5",
"F4"
],
2
],
[
"=A1*$B$1 ni pastga nusxalasak keyingi qatorda?",
[
"=A1*$B$1",
"=A2*$B$1",
"=A2*$B$2"
],
1
],
[
"Kurs (1$ = 12 700 so'm) bitta katakda bo'lsa, formulada qanday manzil?",
[
"Nisbiy",
"Farqi yo'q",
"Mutlaq"
],
2
],
[
"A$1 qanday manzil?",
[
"Aralash (satr qotirilgan)",
"Nisbiy",
"Mutlaq"
],
0
],
[
"=B2+C2 ni o'ngga nusxalasak?",
[
"=B3+C3",
"O'zgarmaydi",
"=C2+D2"
],
2
],
[
"Nisbiy manzilning afzalligi?",
[
"Tezroq",
"Har qatorga moslashadi",
"Hech qachon o'zgarmaydi"
],
1
],
[
"Katak tahrirlash tugmasi?",
[
"F2",
"F4",
"F12"
],
0
]
]
},
{
"n": 26,
"t": "Amaliy ish: narx × miqdor hisob-kitob jadvali",
"hw": "“Mahsulot narxi × miqdor” jadvalini yarating.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: narx × miqdor.**\n| Mahsulot | Narx | Miqdor | Summa |\n1. 6 ta mahsulot: daftar, ruchka, qalam...\n2. D2: **=B2*C2**, pastga nusxalang.\n3. D8: **=SUM(D2:D7)** — umumiy summa.\n4. Narx ustuniga **pul formati**.\n5. Bitta narxni o'zgartiring — summa o'zi yangilanishini kuzating.\n> Do'kondagi kassa dasturi ham xuddi shunday hisoblaydi.\n**Hisob jadvali:** Mahsulot | Narx | Miqdor | Summa (=B2*C2) | Jami (=SUM(D2:D10)). Chegirma: =D2*(1-$F$1).",
"quiz": [
[
"Summa formulasi?",
[
"=B2+C2",
"B2C2",
"=B2*C2"
],
2
],
[
"Umumiy summa?",
[
"=D2",
"=SUM(D2:D7)",
"SUM"
],
1
],
[
"Narx 5000, miqdor 3 bo'lsa summa?",
[
"5003",
"15000",
"8000"
],
1
],
[
"Jami summani topish funksiyasi?",
[
"SUM",
"MAX",
"COUNT"
],
0
],
[
"20% chegirma bilan 10 000 so'mlik mahsulot narxi?",
[
"12000",
"8000",
"2000"
],
1
],
[
"QQS 12% qo'shilgan narx formulasi (narx A2 da)?",
[
"=A2/12",
"=A2*1,12",
"=A2+12"
],
1
],
[
"Mahsulotlar sonini sanash?",
[
"=MAX",
"=COUNT(...) yoki COUNTA",
"=SUM"
],
1
],
[
"Eng qimmat mahsulot narxi?",
[
"=MIN",
"=MAX(B2:B10)",
"=AVERAGE"
],
1
],
[
"Pul ustunlarini qanday formatlaymiz?",
[
"Pul (valyuta) formatida",
"Sana",
"Matn"
],
0
],
[
"Hisobda xato kamayishi uchun?",
[
"Formulalardan foydalanamiz",
"Qo'lda hisoblaymiz",
"Taxmin qilamiz"
],
0
]
]
},
{
"n": 27,
"t": "Grafik turlari: ustunli, chiziqli, doiraviy. Sarlavha va o‘qlar",
"hw": "Bir xil ma’lumot uchun 2 xil grafik yarating, qaysi biri qulayligini yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Grafik (diagramma) turlari:**\n- **Ustunli (гистограмма)** — kategoriyalarni solishtirish.\n- **Chiziqli (график)** — vaqt bo'yicha o'zgarish.\n- **Doiraviy (круговая)** — butunning qismlari (100%).\nQo'shish: ma'lumotni belgilash → **Вставка → Диаграммы**.\nElementlar: **sarlavha**, **o'qlar nomi**, **legenda** (qaysi rang nimani bildiradi), **ma'lumot yorliqlari**.\n> Noto'g'ri grafik turi xulosani chalkashtiradi.\n**Diagramma elementlari:** sarlavha, o'qlar va ularning nomlari, legend (ranglar izohi), ma'lumot yorliqlari, to'r chiziqlari.\n**Tanlash:** solishtirish — ustunli; vaqt — chiziqli; ulush — doiraviy.",
"quiz": [
[
"Haroratning oylar bo'yicha o'zgarishi uchun?",
[
"Chiziqli",
"Hech qaysi",
"Doiraviy"
],
0
],
[
"Legenda nima?",
[
"O'q",
"Ranglar izohi",
"Sarlavha"
],
1
],
[
"Sinflar bo'yicha o'quvchilar sonini solishtirish?",
[
"Ustunli",
"Doiraviy",
"Chiziqli"
],
0
],
[
"Byudjet ulushlari (ovqat, transport...) uchun?",
[
"Nuqtali",
"Chiziqli",
"Doiraviy"
],
2
],
[
"To'r chiziqlari nima uchun?",
[
"Kerak emas",
"Qiymatlarni aniqroq o'qish",
"Bezak"
],
1
],
[
"Vertikal o'q odatda nimani ko'rsatadi?",
[
"Toifalarni",
"Qiymatlarni (son)",
"Sarlavhani"
],
1
],
[
"Gorizontal o'q odatda nimani ko'rsatadi?",
[
"Legendni",
"Toifa yoki vaqtni",
"Qiymatni"
],
1
],
[
"Diagramma sarlavhasi misoli?",
[
"\"5-sinflar o'rtacha bahosi\"",
"\"Diagramma 1\"",
"Bo'sh"
],
0
],
[
"Diagrammadagi ranglar ma'nosini nima tushuntiradi?",
[
"O'q",
"Sarlavha",
"Legend"
],
2
],
[
"Chiziqli diagrammada nuqtalar qanday ulanadi?",
[
"Chiziq bilan ketma-ket",
"Tasodifan",
"Ulanmaydi"
],
0
]
]
},
{
"n": 28,
"t": "Mini-loyiha: “Sinf statistikasi” grafik hisoboti",
"hw": "“Sinf statistikasi” hisobotini tugallang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Mini-loyiha: \"Sinf statistikasi\".**\n1. Sinfda so'rovnoma: sevimli fan, sport yoki mashg'ulot.\n2. Natijalarni Excel'ga kiriting.\n3. **=SUM** bilan jami, **=AVERAGE** bilan o'rtacha.\n4. 2 xil diagramma tuzing.\n5. 3 ta xulosa yozing: eng ko'p, eng kam, qiziq fakt.\n> Statistika — raqamlardan hikoya.\n**Statistik hisobot:** ma'lumot yig'ish → jadval → hisob (o'rtacha, eng katta/kichik) → diagramma → xulosa.\n**Funksiyalar:** AVERAGE, MAX, MIN, COUNT, COUNTIF (`=COUNTIF(B2:B30;\">=80\")` — 80 va undan yuqori ballar soni).",
"quiz": [
[
"O'rtachani hisoblovchi funksiya?",
[
"AVERAGE",
"SUM",
"MAX"
],
0
],
[
"Hisobotda xulosa nima uchun?",
[
"Raqamlarni tushuntirish uchun",
"Bezak uchun",
"Kerak emas"
],
0
],
[
"COUNTIF nima qiladi?",
[
"Shartga mos kataklarni sanaydi",
"O'rtachani topadi",
"Yig'adi"
],
0
],
[
"=COUNTIF(B2:B30;\">=80\") nimani sanaydi?",
[
"80 va undan katta qiymatlar sonini",
"80 dan kichiklarni",
"Hammasini"
],
0
],
[
"Bo'sh bo'lmagan kataklarni sanash?",
[
"COUNTA",
"SUM",
"COUNT"
],
0
],
[
"Eng past ball?",
[
"MIN",
"SUM",
"MAX"
],
0
],
[
"Hisobotning so'nggi qismi?",
[
"Parol",
"Sarlavha",
"Xulosa va tavsiyalar"
],
2
],
[
"Hisobotni Word'ga o'tkazish uchun diagrammani?",
[
"Qayta chizamiz",
"Nusxalab joylaymiz",
"Imkoni yo'q"
],
1
],
[
"Median nima?",
[
"Yig'indi",
"Eng katta son",
"Tartiblangan qatordagi o'rta qiymat"
],
2
],
[
"O'rtacha 4,2 bo'lsa bu nimani anglatadi?",
[
"Hamma 4,2 olgan",
"Hech narsa",
"Umumiy daraja \"yaxshi\"ga yaqin"
],
2
]
]
},
{
"n": 29,
"t": "Ma’lumotlar bazasi: jadval, yozuv, maydon. Ma’lumot turlari",
"hw": "Jadval, yozuv va maydonga ta’rif yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Ma'lumotlar bazasi (MB)** — tartiblangan ma'lumotlar to'plami.\n- **Jadval** — bir turdagi obyektlar: \"O'quvchilar\".\n- **Yozuv (satr)** — bitta obyekt: bitta o'quvchi haqidagi barcha ma'lumot.\n- **Maydon (ustun)** — bitta xususiyat: \"Ism\", \"Yosh\".\nMaydon turlari: **matn**, **son**, **sana**, **mantiqiy** (ha/yo'q).\n**Kalit maydon (ID)** — har yozuvni noyob qiluvchi raqam.\nMisollar: kutubxona, shifoxona, maktab elektron jurnali — hamma joyda MB.\n> Bu platformadagi o'quvchilar ro'yxati ham ma'lumotlar bazasida saqlanadi!\n**Ma'lumotlar bazasi:** **jadval** (O'quvchilar), **yozuv** (bitta o'quvchi qatori), **maydon** (Ism, Yosh), **kalit maydon** (ID — takrorlanmaydi).\n**Turlar:** matn, son, sana, mantiqiy (ha/yo'q), hisoblagich.",
"quiz": [
[
"Bitta o'quvchi haqidagi satr?",
[
"Jadval",
"Yozuv",
"Maydon"
],
1
],
[
"Har yozuvni noyob qiluvchi maydon?",
[
"Yosh",
"Kalit (ID)",
"Ism"
],
1
],
[
"Kalit maydon qanday bo'ladi?",
[
"Bo'sh",
"Har yozuvda noyob",
"Hamma yozuvda bir xil"
],
1
],
[
"Bitta o'quvchi haqidagi satr?",
[
"Yozuv",
"Jadval",
"Maydon"
],
0
],
[
"\"Tug'ilgan sana\" maydoni turi?",
[
"Sana",
"Matn",
"Mantiqiy"
],
0
],
[
"\"Sport bilan shug'ullanadimi?\" maydoni turi?",
[
"Sana",
"Mantiqiy",
"Son"
],
1
],
[
"MBBT (ma'lumotlar bazasini boshqarish tizimi)ga misol?",
[
"Paint",
"Microsoft Access",
"Word"
],
1
],
[
"ID maydoni avtomatik raqamlansa, bu qanday tur?",
[
"Hisoblagich",
"Matn",
"Sana"
],
0
],
[
"Jadvalda bir xil ikkita yozuv bo'lsa muammo?",
[
"Chalkashlik, xato hisob",
"Hech narsa",
"Yaxshi"
],
0
],
[
"Bir nechta bog'langan jadvaldan iborat baza nima deyiladi?",
[
"Rasmli",
"Ovozli",
"Relyatsion"
],
2
]
]
},
{
"n": 30,
"t": "Amaliy ish: kutubxona yoki o‘quvchilar bazasi modeli",
"hw": "Kutubxona bazasi uchun 5 ta maydon va ularning turini tanlang.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: kutubxona bazasi modeli.**\n\"Kitoblar\" jadvali maydonlari:\n| ID (son) | Nomi (matn) | Muallif (matn) | Yili (son) | Bormi (ha/yo'q) |\n1. Excel'da maydon nomlarini yozing.\n2. Har maydon tagiga uning turini yozing.\n3. 8–10 ta kitob yozuvini kiriting.\n4. ID ni avtoto'ldirish bilan.\n> Har bir maydon faqat bitta ma'lumot saqlaydi: \"Muallif\" ga yil yozilmaydi.\n**Kutubxona bazasi modeli:** Kitoblar(ID, Nomi, Muallif, Yili, Janr, Bormi). Har maydon turini to'g'ri tanlash, 10 ta yozuv kiritish.\n**Excel'da** ham oddiy baza sifatida yuritish mumkin: sarlavha + filtr.",
"quiz": [
[
"\"Yili\" maydonining turi?",
[
"Mantiqiy",
"Matn",
"Son"
],
2
],
[
"\"Bormi\" maydonining turi?",
[
"Son",
"Mantiqiy (ha/yo'q)",
"Sana"
],
1
],
[
"\"Muallif\" maydoni turi?",
[
"Son",
"Matn",
"Mantiqiy"
],
1
],
[
"\"Sahifalar soni\" maydoni turi?",
[
"Matn",
"Son",
"Sana"
],
1
],
[
"Kitob ID nima uchun?",
[
"Kerak emas",
"Bezak",
"Har kitobni noyob aniqlash"
],
2
],
[
"Bir muallifning hamma kitoblarini topish?",
[
"Muallif maydoni bo'yicha filtr",
"Saralash xolos",
"Imkoni yo'q"
],
0
],
[
"Bazaga yozuv qo'shish nima?",
[
"Faylni yopish",
"Yangi qator kiritish",
"Ustun o'chirish"
],
1
],
[
"Janr maydoni qiymatlariga misol?",
[
"2026",
"Ha/Yo'q",
"Ertak, sarguzasht, ilmiy"
],
2
],
[
"Kitob berilganda \"Bormi\" maydoni?",
[
"O'chadi",
"\"Yo'q\" ga o'zgaradi",
"O'zgarmaydi"
],
1
],
[
"Bazani yuritishda nima muhim?",
[
"Rangli bo'lishi",
"Ma'lumot aniq va yangilangan bo'lishi",
"Ko'p bo'sh joy"
],
1
]
]
},
{
"n": 31,
"t": "Query: teng (=) sharti bilan aniq ma’lumotni qidirish",
"hw": "Teng sharti bilan 3 ta qidiruv misolini tuzing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**So'rov (Query)** — bazadan shartga mos yozuvlarni tanlash.\n**Teng (=)** sharti: **Sinf = \"6-A\"** — faqat 6-A o'quvchilari.\nExcel'da: **Данные → Фильтр**, ustundagi strelka → kerakli qiymatni belgilash.\nTaqqoslash belgilari: **=** teng, **<>** teng emas, **>** katta, **<** kichik, **>=**, **<=**.\nSQL tilida: SELECT * FROM o'quvchilar WHERE sinf = '6-A'\n> Query — bazaga beriladigan savol.\n**So'rov (query)** — bazadan shartga mos yozuvlarni tanlash. Taqqoslash: `=`, `<>` (teng emas), `>`, `<`, `>=`, `<=`.\n**Misol:** Janr = \"Ertak\"; Yili >= 2020.",
"quiz": [
[
"Query nima?",
[
"Bazaga savol (tanlash)",
"Taqdimot",
"Rasm"
],
0
],
[
"\"Teng emas\" belgisi?",
[
">=",
"=",
"<>"
],
2
],
[
"\"Teng emas\" belgisi?",
[
">=",
"<>",
"=="
],
1
],
[
"\"Yili 2020 va undan keyin\" sharti?",
[
"= 2020",
">= 2020",
"> 2020"
],
1
],
[
"Query nima qaytaradi?",
[
"Rasm",
"Hamma yozuvlarni o'chiradi",
"Shartga mos yozuvlarni"
],
2
],
[
"\"Janr = Ertak\" qaysi yozuvlarni topadi?",
[
"Hammasini",
"Faqat ertaklarni",
"Ertak bo'lmaganlarni"
],
1
],
[
"Query asl ma'lumotni o'zgartiradimi?",
[
"Ha, ko'paytiradi",
"Ha, o'chiradi",
"Yo'q, faqat tanlab ko'rsatadi"
],
2
],
[
"Ma'lumotlar bazasi so'rovlari tili?",
[
"HTML",
"SQL",
"CSS"
],
1
],
[
"\"Yoshi < 12\" shartiga 12 yoshli mos keladimi?",
[
"Ha",
"Ba'zan",
"Yo'q"
],
2
],
[
"Excel'da query o'rniga nima ishlatiladi?",
[
"Filtr",
"Diagramma",
"Formatlash"
],
0
]
]
},
{
"n": 32,
"t": "AND operatori: ikki shartli qidiruv (<, > belgilari)",
"hw": "AND operatoriga 2 ta hayotiy misol yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**AND (VA)** — ikkala shart ham bajarilishi kerak.\n**Yosh = 12 AND Ball > 80** — 12 yoshli **va** 80 dan yuqori ball olganlar.\n**OR (YOKI)** — kamida bitta shart: **Sinf = \"6-A\" OR Sinf = \"6-B\"**.\nHayotiy misol: \"Do'konda narxi 20 000 dan arzon **VA** rangi ko'k ryukzak\".\n> AND natijani toraytiradi, OR kengaytiradi.\n**AND (va)** — ikkala shart ham bajarilishi kerak (natija torayadi). **OR (yoki)** — kamida bittasi (natija kengayadi).\n**Misol:** Yoshi > 11 AND Baho >= 4.",
"quiz": [
[
"AND da nechta shart bajarilishi kerak?",
[
"Ikkalasi",
"Hech biri",
"Bittasi"
],
0
],
[
"Natijani toraytiradigan operator?",
[
"NOT",
"AND",
"OR"
],
1
],
[
"OR da qachon yozuv tanlanadi?",
[
"Ikkala shart bajarilsa xolos",
"Hech qachon",
"Kamida bitta shart bajarilsa"
],
2
],
[
"Natijani kengaytiradigan operator?",
[
"AND",
"OR",
"NOT"
],
1
],
[
"Yoshi=12, Baho=3. \"Yoshi>11 AND Baho>=4\"?",
[
"Mos",
"Mos emas",
"Xato"
],
1
],
[
"Yoshi=12, Baho=3. \"Yoshi>11 OR Baho>=4\"?",
[
"Xato",
"Mos emas",
"Mos"
],
2
],
[
"NOT nima qiladi?",
[
"Qo'shadi",
"Shartni inkor qiladi",
"Ko'paytiradi"
],
1
],
[
"\"Ball 70 dan 90 gacha\" qanday yoziladi?",
[
"Ball>=70 AND Ball<=90",
"Ball>=70 OR Ball<=90",
"Ball=80"
],
0
],
[
"AND inglizcha so'z, o'zbekcha?",
[
"Emas",
"Va",
"Yoki"
],
1
],
[
"Ikki shartli filtr Excel'da qayerda?",
[
"Filtr → Maxsus filtr (Custom)",
"Ko'rinish",
"Fayl"
],
0
]
]
},
{
"n": 33,
"t": "Amaliy ish: 2 shartli qidiruv (“yoshi va bahosi”)",
"hw": "“Yoshi 11 AND bali 80 dan yuqori” kabi qidiruvni bajaring.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: 2 shartli qidiruv.**\nO'quvchilar jadvalida: **Yoshi = 11 AND Bali > 80**.\nExcel'da:\n1. Jadvalni belgilang → **Данные → Фильтр**.\n2. \"Yosh\" ustunida faqat 11 ni belgilang.\n3. \"Ball\" ustunida **Числовые фильтры → больше** → 80.\n4. Natija: ikkala shartga mos o'quvchilar.\n5. Filtrni olib tashlash: **Очистить**.\n> Filtr ma'lumotni o'chirmaydi, faqat yashiradi.\n**Excel'da 2 shartli filtr:** ustun filtri → \"Son filtrlari\" → \"Katta\" / \"Orasida\"; ikkinchi ustunda ham filtr — ikkala ustun filtri birga ishlaydi (AND).",
"quiz": [
[
"Filtr ma'lumotni o'chiradimi?",
[
"Ba'zan",
"Yo'q, yashiradi",
"Ha"
],
1
],
[
"80 dan katta shart qaysi filtr?",
[
"Цвет",
"Сортировка",
"Числовые фильтры → больше"
],
2
],
[
"Ikki ustunda filtr qo'yilsa ular qanday birlashadi?",
[
"OR",
"AND (ikkalasi ham)",
"Faqat birinchisi"
],
1
],
[
"\"Orasida\" (between) filtri nima?",
[
"Bo'sh kataklar",
"Teng emas",
"Ikki qiymat oralig'idagilar"
],
2
],
[
"Filtrni olib tashlash?",
[
"Faylni yopish",
"Ma'lumotni o'chirish",
"Filtr belgisi → \"Filtrni tozalash\""
],
2
],
[
"Filtrlangan qatorlar o'chib ketadimi?",
[
"Yo'q, vaqtincha yashiriladi",
"Ha",
"Ba'zan"
],
0
],
[
"Filtr natijasini boshqa varaqqa nusxalash?",
[
"Chop etib",
"Imkoni yo'q",
"Ko'rinadigan kataklarni nusxalab joylash"
],
2
],
[
"Matn filtri \"... bilan boshlanadi\" misoli?",
[
"\"A\" bilan boshlanuvchi ismlar",
"Ranglar",
"Raqamlar"
],
0
],
[
"Rang bo'yicha filtrlash mumkinmi?",
[
"Yo'q",
"Ha",
"Faqat qizil"
],
1
],
[
"Filtr qo'yilgan ustun qanday belgilanadi?",
[
"Yulduzcha",
"Voronka belgisi",
"Rangsiz"
],
1
]
]
},
{
"n": 34,
"t": "Nazorat ishi: Excel, ma’lumotlar bazasi va query",
"hw": "Mavzularni takrorlang; 5 ta asosiy atamani yozing.",
"part": "1-yarim yillik (34 soat)",
"sec": "",
"md": "**Nazorat ishi: Excel, ma'lumotlar bazasi va query.**\nTakrorlang: katak, diapazon, ma'lumot turlari, formula, nisbiy manzil, SUM/AVERAGE, diagramma turlari, MB (jadval, yozuv, maydon, kalit), query, AND/OR.",
"quiz": [
[
"=A2*B2 ni pastga nusxalasak 3-satrda?",
[
"=A1*B1",
"=A3*B3",
"=A2*B2"
],
1
],
[
"Maydon nima?",
[
"Ustun (xususiyat)",
"Satr",
"Fayl"
],
0
],
[
"Ikki shart ham bajarilishi kerak?",
[
"=",
"AND",
"OR"
],
1
],
[
"Butunning qismlari uchun diagramma?",
[
"Doiraviy",
"Chiziqli",
"Ustunli"
],
0
],
[
"O'rtacha funksiya?",
[
"COUNT",
"SUM",
"AVERAGE"
],
2
],
[
"80 dan katta shart qaysi filtr?",
[
"Цвет",
"Сортировка",
"Числовые фильтры → больше"
],
2
],
[
"Filtr qo'yilgan ustun qanday belgilanadi?",
[
"Yulduzcha",
"Voronka belgisi",
"Rangsiz"
],
1
],
[
"Filtr natijasini boshqa varaqqa nusxalash?",
[
"Chop etib",
"Imkoni yo'q",
"Ko'rinadigan kataklarni nusxalab joylash"
],
2
],
[
"\"Yili\" maydonining turi?",
[
"Mantiqiy",
"Matn",
"Son"
],
2
],
[
"Hisobotni Word'ga o'tkazish uchun diagrammani?",
[
"Qayta chizamiz",
"Nusxalab joylaymiz",
"Imkoni yo'q"
],
1
]
]
},
{
"n": 35,
"t": "Takrorlash algoritmi: sikl tushunchasi",
"hw": "Takrorlanadigan 5 ta kundalik ishni yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Sikl (takrorlash algoritmi)** — bir xil amallarning bir necha marta bajarilishi.\nHayotda: zinapoyadan chiqish, mashq takrorlash (10 marta o'tirib-turish), soat mili aylanishi.\nSikl turlari:\n- **Hisoblagichli** — necha marta ekani oldindan ma'lum: \"5 marta sakra\".\n- **Shartli** — shart bajarilguncha: \"Choynak qaynamaguncha kut\".\nHar siklda: **tana** (takrorlanadigan qism) va **to'xtash sharti** bo'ladi.\n> To'xtash sharti yo'q sikl — cheksiz sikl!\n**Sikl turlari:** **parametrli** (necha marta ekani ma'lum: \"5 marta\"), **shartli** — shart **oldin** tekshiriladi (\"toki ... ekan\") yoki **keyin** (\"... bo'lguncha\").\n**Hayotiy misol:** \"Ro'yxatdagi har bir o'quvchiga daftar ber\" — har bir element uchun sikl.",
"quiz": [
[
"Necha marta ekani ma'lum sikl?",
[
"Hisoblagichli",
"Shartli",
"Cheksiz"
],
0
],
[
"\"Qaynamaguncha kut\" qanday sikl?",
[
"Hisoblagichli",
"Chiziqli",
"Shartli"
],
2
],
[
"\"Toki choynak qaynamagan ekan, kut\" — qanday sikl?",
[
"Parametrli",
"Shartli",
"Sikl emas"
],
1
],
[
"\"Har bir o'quvchiga daftar ber\" — sikl nechta marta?",
[
"Cheksiz",
"O'quvchilar soni marta",
"1 marta"
],
1
],
[
"Siklning har bir takrorlanishi nima deyiladi?",
[
"Iteratsiya (qadam)",
"Algoritm",
"Shart"
],
0
],
[
"Cheksiz sikl qachon xavfli?",
[
"Doim foydali",
"Dastur to'xtamay qotib qoladi",
"Hech qachon"
],
1
],
[
"Sikl tanasi nima?",
[
"Natija",
"Shart",
"Takrorlanadigan buyruqlar"
],
2
],
[
"Shart oldin tekshirilsa va boshidan yolg'on bo'lsa, sikl necha marta?",
[
"0 marta",
"Cheksiz",
"1 marta"
],
0
],
[
"Parametrli siklda nima ma'lum?",
[
"Takrorlash soni",
"Hech narsa",
"Shart"
],
0
],
[
"Qaysi biri sikl emas?",
[
"Bir marta eshikni ochish",
"Har darsda davomat",
"Har kuni tish yuvish"
],
0
]
]
},
{
"n": 36,
"t": "Amaliy ish: kundalik hayotdagi takrorlanuvchi jarayonlar",
"hw": "“Robot 6 qadam yuradi” algoritmini yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: takrorlanuvchi jarayonlar.**\n\"Robot 6 qadam yuradi\" algoritmi:\nSiklsiz: qadam, qadam, qadam, qadam, qadam, qadam (6 qator).\nSikl bilan:\n1. **6 marta takrorla:**\n2.     bir qadam yur.\nKundalik misollar: har kuni tishni yuvish (kun sayin takrorlanadi), uy vazifasi har fan bo'yicha.\n> Platformadagi **Dasturlash** bo'limida robot o'yinida ×2, ×3 bilan siklni sinab ko'ring.\n**Kundalik sikllar:** har kuni maktabga borish, har darsda davomat, yugurishda doira aylanish, sport mashqi \"10 marta\".\n**Sikl yozish:** nima takrorlanadi? necha marta yoki qachongacha? siklgacha va siklsdan keyin nima?",
"quiz": [
[
"Sikl bilan algoritm qanday bo'ladi?",
[
"Bir xil",
"Qisqaroq",
"Uzunroq"
],
1
],
[
"6 marta takrorlansa, \"qadam\" necha marta bajariladi?",
[
"12",
"1",
"6"
],
2
],
[
"\"Har yili yangi o'quv yili boshlanadi\" qanday jarayon?",
[
"Bir martalik",
"Tarmoqlanuvchi",
"Takrorlanuvchi"
],
2
],
[
"4 ta doira yugurish uchun sikl necha marta?",
[
"1",
"8",
"4"
],
2
],
[
"\"Toki uy vazifasi tugamagan ekan, ishla\" — to'xtash sharti?",
[
"Uy vazifasi tugadi",
"Hech qachon",
"Kech bo'ldi"
],
0
],
[
"3 marta \"2 ta o'tirib-tur\" — jami nechta?",
[
"6",
"5",
"3"
],
0
],
[
"Siklda nima o'zgarib borishi kerak (shartli siklda)?",
[
"Sikl nomi",
"Shartga ta'sir qiluvchi qiymat",
"Hech narsa"
],
1
],
[
"Kir yuvish mashinasining aylanishi qanday jarayon?",
[
"Sikl",
"Bir martalik",
"Shart"
],
0
],
[
"Takrorlash soni o'zgaruvchi bo'lishi mumkinmi?",
[
"Ha, masalan foydalanuvchi kiritadi",
"Faqat 10",
"Yo'q"
],
0
],
[
"Siklni algoritmda qanday belgilaymiz?",
[
"\"Takrorla ... marta\" yoki \"toki ...\"",
"Hech qanday",
"Faqat oval"
],
0
]
]
},
{
"n": 37,
"t": "Sikl uchun blok-sxema tuzish",
"hw": "Oddiy takrorlash algoritmi uchun blok-sxema chizing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Sikl blok-sxemasi:**\n1. **Oval:** Boshlash.\n2. **To'rtburchak:** i = 1 (hisoblagich).\n3. **Romb:** i ≤ 5 ?\n4. **Ha** → To'rtburchak: amal (qadam yur) → To'rtburchak: i = i + 1 → strelka **romb**ga qaytadi.\n5. **Yo'q** → Oval: Tamom.\nOrqaga qaytuvchi strelka siklni hosil qiladi.\n> Hisoblagich har safar oshmasa — sikl hech qachon tugamaydi.\n**Sikl blok-sxemasi:** hisoblagich boshlanishi (i = 1) → shart romb (i ≤ N?) → ha: sikl tanasi → i = i + 1 → shartga qaytish; yo'q: sikldan chiqish.\n**Hisoblagich** — siklni sanovchi o'zgaruvchi.",
"quiz": [
[
"Siklda orqaga qaytuvchi strelka qayerga boradi?",
[
"Boshlashga",
"Tamomga",
"Shart (romb)ga"
],
2
],
[
"i = i + 1 nima qiladi?",
[
"Hisoblagichni bittaga oshiradi",
"Nolga tenglaydi",
"O'chiradi"
],
0
],
[
"Hisoblagich odatda qanday boshlanadi?",
[
"Boshlanmaydi",
"i = 1 (yoki 0)",
"i = 100"
],
1
],
[
"i = i + 1 bo'lmasa nima bo'ladi?",
[
"Cheksiz sikl",
"Sikl tezlashadi",
"Hech narsa"
],
0
],
[
"Shart yolg'on bo'lsa qaysi yo'l?",
[
"Sikldan chiqish",
"Takrorlash",
"Boshlash"
],
0
],
[
"i = 1 dan i ≤ 5 gacha sikl necha marta?",
[
"4",
"5",
"6"
],
1
],
[
"i = 0 dan i < 5 gacha sikl necha marta?",
[
"6",
"4",
"5"
],
2
],
[
"Siklda strelka qaysi shaklga qaytadi?",
[
"Ovalga",
"Shart rombiga",
"Parallelogrammga"
],
1
],
[
"i = i + 2 bo'lsa, i = 1 dan i ≤ 9 gacha nechta qadam?",
[
"9",
"5 (1, 3, 5, 7, 9)",
"4"
],
1
],
[
"Sikldan keyingi buyruq qachon bajariladi?",
[
"Hech qachon",
"Sikl ichida",
"Sikl tugagach"
],
2
]
]
},
{
"n": 38,
"t": "Amaliy ish: 3, 5 va 10 marta takrorlanuvchi algoritmlar",
"hw": "“1 dan 5 gacha sanash” blok-sxemasini chizing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: 3, 5, 10 marta takrorlash.**\n\"1 dan 5 gacha sanash\" blok-sxemasi:\nBoshlash → i = 1 → [i ≤ 5 ?] → Ha: \"i ni ayt\" → i = i + 1 → qaytish; Yo'q: Tamom.\nNatija: 1, 2, 3, 4, 5.\n10 gacha sanash uchun faqat shartni **i ≤ 10** ga o'zgartirish kifoya — bu siklning kuchi!\n> Algoritmni \"qog'ozda bajarib\" tekshiring: har qadamda i qiymatini yozing.\n**Mashq:** \"3 marta Salom\", \"5 marta yulduzcha\", \"10 gacha sanash\". Hisoblagich va shartni to'g'ri tanlash muhim.\n**Xatolar:** \"≤\" o'rniga \"<\" yozish — bitta kam takrorlanadi (\"bittaga adashish\" xatosi).",
"quiz": [
[
"1 dan 10 gacha sanash uchun shart?",
[
"i ≤ 10",
"i ≤ 5",
"i = 1"
],
0
],
[
"i = 1 dan boshlab i ≤ 3 bo'lsa sikl necha marta?",
[
"3",
"2",
"4"
],
0
],
[
"1 dan 10 gacha sanashda i < 10 yozilsa nima bo'ladi?",
[
"To'g'ri ishlaydi",
"10 chiqmay qoladi",
"11 gacha sanaydi"
],
1
],
[
"\"Bittaga adashish\" xatosi inglizcha?",
[
"Bug zero",
"Off-by-one",
"Loop error"
],
1
],
[
"5 marta yulduzcha: i = 1, shart i ≤ 5. Nechta yulduzcha?",
[
"6",
"4",
"5"
],
2
],
[
"10 dan 1 gacha teskari sanash: i qanday o'zgaradi?",
[
"i = i + 1",
"O'zgarmaydi",
"i = i − 1"
],
2
],
[
"2, 4, 6, 8, 10 chiqarish uchun qadam?",
[
"1",
"3",
"2"
],
2
],
[
"3 marta takrorlanadigan siklda tana 2 buyruqdan iborat. Jami bajarilgan buyruqlar?",
[
"5",
"3",
"6"
],
2
],
[
"Sikl natijasini qanday tekshiramiz?",
[
"Jadvalda qadam-baqadam yozib",
"Taxmin qilib",
"Tekshirmaymiz"
],
0
],
[
"1 dan 5 gacha sonlar yig'indisi?",
[
"5",
"15",
"10"
],
1
]
]
},
{
"n": 39,
"t": "Scratch’da repeat va forever bloklari",
"hw": "Sprite’ni 10 qadamdan 8 marta yurgizing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "Scratch'da sikl bloklari (**Boshqaruv**, to'q sariq):\n- **\"10 marta takrorla\" (repeat)** — aniq son marta.\n- **\"doimo takrorla\" (forever)** — to'xtatilguncha (qizil doira).\n- **\"... bo'lguncha takrorla\" (repeat until)** — shart bajarilguncha.\nMisol: **8 marta takrorla: 10 qadam yur, 0.1 soniya kut** — sprayt silliq yuradi.\n> forever — o'yinlarda doimiy tekshiruv uchun.\n**Scratch sikllari:** **\"N marta takrorla\"**, **\"doim takrorla\"** (forever), **\"... bo'lguncha takrorla\"** (repeat until). Sikl ichida \"kut\" bloki animatsiyani sekinlashtiradi.",
"quiz": [
[
"To'xtatilguncha takrorlash bloki?",
[
"if",
"forever",
"repeat 10"
],
1
],
[
"Shart bajarilguncha takrorlash?",
[
"forever",
"repeat until",
"say"
],
1
],
[
"\"repeat until\" qachon to'xtaydi?",
[
"10 martadan keyin",
"Hech qachon",
"Shart rost bo'lganda"
],
2
],
[
"Animatsiya juda tez bo'lsa sikl ichiga?",
[
"\"0.2 soniya kut\"",
"\"yashir\"",
"\"to'xta\""
],
0
],
[
"\"doim\" blokidan keyin boshqa blok ulash mumkinmi?",
[
"Faqat ovoz",
"Yo'q, pastki chiqishi yo'q",
"Ha"
],
1
],
[
"\"Sichqoncha bosilguncha takrorla\" — qaysi blok?",
[
"repeat 10",
"forever",
"repeat until"
],
2
],
[
"Doim aylanib turuvchi shamol tegirmoni uchun?",
[
"forever + \"15° buril\"",
"if",
"repeat 1"
],
0
],
[
"\"10 marta takrorla\" ichida \"5 qadam\" — jami qadam?",
[
"10",
"15",
"50"
],
2
],
[
"Ikki siklni ketma-ket qo'ysa?",
[
"Faqat ikkinchisi",
"Avval birinchisi, keyin ikkinchisi",
"Birga"
],
1
],
[
"Forever siklini qanday to'xtatamiz?",
[
"Qizil to'xtash tugmasi yoki \"to'xtat\" bloki",
"O'zi to'xtaydi",
"Imkoni yo'q"
],
0
]
]
},
{
"n": 40,
"t": "Amaliy ish: harakatlanuvchi qahramon (mini animatsiya)",
"hw": "Mini animatsiyangizni tugallang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: mini animatsiya.**\nAnimatsiya — **kostyumlarni** tez almashtirish (multfilm kabi):\n1. Ikki yoki undan ortiq kostyumli sprayt tanlang (masalan, mushuk yuradi).\n2. **forever** ichida: **\"keyingi kostyum\"**, **\"10 qadam yur\"**, **\"0.2 soniya kut\"**.\n3. **\"chetga tegsa qaytar\"** bloki bilan sahna chetidan qaytish.\n4. **\"aylanish usuli: chap-o'ng\"** — teskari bo'lib qolmasligi uchun.\n> Kostyum + harakat + kutish = jonli animatsiya.\n**Animatsiya:** \"doim: keyingi kostyum, 10 qadam yur, chetga tegsa qayt, 0.1 soniya kut\". **Aylanish uslubi** \"chap-o'ng\" — qahramon teskari ag'darilmaydi.",
"quiz": [
[
"Animatsiya uchun nima almashtiriladi?",
[
"Ovoz balandligi",
"Fonlar soni",
"Kostyumlar"
],
2
],
[
"Sprayt sahna chetidan qaytishi uchun?",
[
"\"chetga tegsa qaytar\"",
"\"demoq\"",
"\"kut\""
],
0
],
[
"\"Chetga tegsa qayt\" bloki nima qiladi?",
[
"O'chiradi",
"Sahna chetidan qaytaradi",
"Kattalashtiradi"
],
1
],
[
"Qahramon yurganda boshi pastga qarab qolsa?",
[
"Kostyumni o'chiramiz",
"Sahnani aylantiramiz",
"Aylanish uslubini \"chap-o'ng\" qilamiz"
],
2
],
[
"Yurish animatsiyasi uchun nechta kostyum kerak?",
[
"1 ta",
"0",
"Kamida 2 ta"
],
2
],
[
"Sprayt o'lchamini o'zgartirish bloki qaysi bo'limda?",
[
"Harakat",
"Ko'rinish (Looks)",
"Ovoz"
],
1
],
[
"Fon almashtirish bloki?",
[
"\"kostyum\"",
"\"yur\"",
"\"fonni ... ga almashtir\""
],
2
],
[
"Animatsiyada \"kut\" bloki nima beradi?",
[
"O'chiradi",
"Tezlashtiradi",
"Harakatni ko'zga ko'rinadigan qiladi"
],
2
],
[
"Qahramonni kattalashib-kichrayadigan qilish?",
[
"Bir marta",
"Sikl ichida o'lchamni o'zgartirish",
"Imkoni yo'q"
],
1
],
[
"Animatsiyani bayroq bosilganda boshlash?",
[
"Kerak emas",
"\"Bayroq bosilganda\" hodisasi",
"\"Sprayt bosilganda\" xolos"
],
1
]
]
},
{
"n": 41,
"t": "Scratch’da PEN uskunasi: pen down, pen up, rang",
"hw": "Pen bilan chiziq va kvadrat chizing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Pen (Qalam)** kengaytmasi — sprayt yurgan iz bo'yicha chiziq chizadi. Qo'shish: chap pastdagi **Kengaytmalar** tugmasi → **Pen**.\nBloklar:\n- **\"qalamni tushir\" (pen down)** — chizishni boshlash.\n- **\"qalamni ko'tar\" (pen up)** — chizmasdan yurish.\n- **\"qalam rangini ... qil\"**, **\"qalam o'lchamini ... qil\"**.\n- **\"hammasini o'chir\" (erase all)** — tozalash.\n> Har dastur boshida \"hammasini o'chir\" qo'ying.\n**Pen (qalam) kengaytmasi:** pastdagi \"Kengaytma qo'shish\" → Pen. Bloklar: **qalamni tushir**, **qalamni ko'tar**, **qalam rangi**, **qalam qalinligi**, **hammasini o'chir**.",
"quiz": [
[
"Chizishni boshlash bloki?",
[
"pen down",
"erase all",
"pen up"
],
0
],
[
"Pen qayerdan qo'shiladi?",
[
"Fonlar",
"Tovushlar",
"Kengaytmalar"
],
2
],
[
"Chizmasdan yurish uchun?",
[
"\"O'chir\"",
"\"Qalamni ko'tar\"",
"\"Qalamni tushir\""
],
1
],
[
"Sahnadagi barcha chizmalarni o'chirish?",
[
"\"yashir\"",
"\"to'xtat\"",
"\"Hammasini o'chir\""
],
2
],
[
"Chiziq qalinligini o'zgartirish?",
[
"\"Qalam qalinligini ... qil\"",
"\"o'lcham\"",
"\"rang\""
],
0
],
[
"Pen bloklari qanday rangda?",
[
"Sariq",
"Ko'k",
"Yashil"
],
2
],
[
"Dastur boshida \"hammasini o'chir\" nima uchun?",
[
"Tezlik uchun",
"Kerak emas",
"Eski chizma qolmasligi uchun"
],
2
],
[
"Qalam rangini asta o'zgartirish?",
[
"\"Qalam rangini 10 ga o'zgartir\"",
"\"Kostyum\"",
"Imkoni yo'q"
],
0
],
[
"Sprayt yurganda chiziq qoldirishi uchun avval?",
[
"Yashirish",
"Qalamni tushirish",
"Ko'tarish"
],
1
],
[
"Pen kengaytmasi qayerdan qo'shiladi?",
[
"Fayl",
"Sahna",
"Pastdagi \"Kengaytma\" tugmasi"
],
2
]
]
},
{
"n": 42,
"t": "Burchak va burilishlar: kvadrat va uchburchak chizish",
"hw": "Shakl chizishda nechta burilish kerakligini yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Burilish va shakllar:** muntazam shakl chizish uchun burilish burchagi = **360° ÷ tomonlar soni**.\n- Kvadrat: 4 tomon → 360 ÷ 4 = **90°**.\n- Uchburchak: 3 tomon → 360 ÷ 3 = **120°**.\n- Oltiburchak: 6 → **60°**.\nKvadrat: **4 marta takrorla: 100 qadam yur, 90° buril**.\nUchburchak: **3 marta takrorla: 100 qadam yur, 120° buril**.\n> Ko'p tomon (masalan 36 ta, 10°) — deyarli aylana!\n**Ko'pburchak qoidasi:** N burchakli muntazam shakl uchun **N marta** takrorla: \"a qadam yur, 360/N gradus buril\".\n**Misol:** kvadrat — 4 × 90°; uchburchak — 3 × 120°; oltiburchak — 6 × 60°.",
"quiz": [
[
"Uchburchak uchun burilish burchagi?",
[
"90°",
"60°",
"120°"
],
2
],
[
"Oltiburchakda necha marta takrorlanadi?",
[
"3",
"4",
"6"
],
2
],
[
"Sakkizburchak uchun burilish?",
[
"60°",
"45°",
"90°"
],
1
],
[
"Beshburchak uchun burilish?",
[
"108°",
"72°",
"60°"
],
1
],
[
"Doiraga yaqin shakl uchun?",
[
"4 × 90°",
"3 × 120°",
"36 × 10° (yoki 360 × 1°)"
],
2
],
[
"Burilishlar yig'indisi muntazam ko'pburchakda?",
[
"180°",
"360°",
"90°"
],
1
],
[
"10 burchakli shakl uchun takrorlash soni?",
[
"5",
"36",
"10"
],
2
],
[
"Kvadrat tomoni 100 bo'lsa, perimetri?",
[
"100",
"200",
"400 qadam"
],
2
],
[
"Shakl kattaroq bo'lishi uchun nima o'zgaradi?",
[
"Qadam soni (tomon uzunligi)",
"Burchak",
"Takrorlash soni"
],
0
],
[
"Uchburchakni 90° bilan chizsak nima bo'ladi?",
[
"To'g'ri uchburchak",
"Shakl yopilmaydi",
"Kvadrat"
],
1
]
]
},
{
"n": 43,
"t": "Amaliy ish: geometrik uycha yoki robot chizish",
"hw": "“Geometrik uycha” rasmini tugallang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: geometrik uycha.**\n1. **Kvadrat** — uy tanasi (4 × 90°).\n2. Uchiga **uchburchak** — tom (3 × 120°).\n3. Kichik kvadrat — deraza (qalam ko'tarib, joyga borib, tushirib chizish).\n4. Har qismga boshqa rang.\nYoki robot: kvadrat bosh, to'rtburchak tana, chiziq qo'llar.\n> Murakkab rasm — oddiy shakllar + qalamni to'g'ri ko'tarish.\n**Uycha:** kvadrat (devor) → yuqori chapdan uchburchak (tom) → qalamni ko'tarib derazaga o'tish → kichik kvadrat (deraza). Har qism uchun koordinatalar (\"x: y: ga bor\").",
"quiz": [
[
"Derazaga o'tishda qalam?",
[
"O'chiriladi",
"Ko'tariladi",
"Tushiriladi"
],
1
],
[
"Uy tomi uchun qaysi shakl?",
[
"Uchburchak",
"Doira",
"Yulduz"
],
0
],
[
"Bir qismdan ikkinchisiga chiziq qoldirmay o'tish?",
[
"Qalamni ko'tarib \"bor\" bilan o'tish",
"Imkoni yo'q",
"Qalamni tushirib"
],
0
],
[
"Tomni chizish uchun?",
[
"Doira",
"Chiziq xolos",
"Uchburchak (3 × 120°)"
],
2
],
[
"Robot ko'zlari uchun qaysi shakl?",
[
"Kichik kvadrat yoki doira",
"Uchburchak katta",
"Faqat chiziq"
],
0
],
[
"Har qismni turli rangda chizish?",
[
"Qalam rangini almashtirib",
"Bitta rang",
"Imkoni yo'q"
],
0
],
[
"Rasm boshlanish nuqtasini aniq qo'yish?",
[
"\"x: y: ga bor\"",
"\"yur\"",
"\"buril\""
],
0
],
[
"Chizish oxirida spraytni yashirish?",
[
"\"o'chir\"",
"\"to'xtat\"",
"\"yashir\""
],
2
],
[
"Chizish tez ko'rinishi uchun?",
[
"Ko'p \"kut\"",
"Sekinlashtirish",
"Sikl ichida \"kut\" yo'q"
],
2
],
[
"Murakkab rasmni qanday tuzamiz?",
[
"Qismlarga bo'lib (dekompozitsiya)",
"Tasodifan",
"Bir qatorda"
],
0
]
]
},
{
"n": 44,
"t": "Takrorlash bilan naqsh yaratish. Ichma-ich takrorlashga kirish",
"hw": "Repeat yordamida 6 ta bir xil shakldan naqsh yarating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Naqsh** — bir shaklni burib, ko'p marta takrorlash.\n**Ichma-ich sikl** — sikl ichida sikl:\n- Tashqi: **12 marta takrorla**\n-     Ichki: **4 marta takrorla: 50 qadam, 90° buril** (kvadrat)\n-     **30° buril** (12 × 30° = 360°)\nNatija — 12 ta kvadratdan iborat \"gul\".\n> Tashqi sikl necha marta — shuncha shakl; ichki sikl — bitta shakl.\n**Ichma-ich sikl** — sikl ichida sikl. **Naqsh:** \"12 marta takrorla [kvadrat chiz; 30° buril]\" — kvadratlar gul hosil qiladi.\n**Jami bajarilish** = tashqi × ichki.",
"quiz": [
[
"Ichma-ich sikl nima?",
[
"Ikkita fon",
"Sikl ichida sikl",
"Ikkita sprayt"
],
1
],
[
"12 ta shakl doira bo'ylab joylashishi uchun burilish?",
[
"12°",
"30°",
"90°"
],
1
],
[
"Tashqi 12, ichki 4 marta bo'lsa ichki tana necha marta?",
[
"16",
"12",
"48"
],
2
],
[
"Kvadratni 36 marta 10° burib chizsak?",
[
"Chiziq",
"Doiraviy naqsh",
"Bitta kvadrat"
],
1
],
[
"8 ta shakl doira bo'ylab joylashishi uchun burilish?",
[
"90°",
"45°",
"30°"
],
1
],
[
"Ichma-ich siklda qaysi sikl tez tugaydi?",
[
"Bir vaqtda",
"Tashqi",
"Ichki sikl"
],
2
],
[
"Naqsh rangi har safar o'zgarishi uchun?",
[
"Ichki siklda o'chirish",
"Imkoni yo'q",
"Tashqi sikl ichida rang o'zgartirish"
],
2
],
[
"6 ta uchburchakdan yulduzsimon naqsh uchun burilish?",
[
"60°",
"45°",
"120°"
],
0
],
[
"Ichma-ich sikl inglizcha?",
[
"If loop",
"Single loop",
"Nested loop"
],
2
],
[
"3 × 3 katak chizish uchun qaysi tuzilma qulay?",
[
"Bitta buyruq",
"Ichma-ich sikl",
"Shart"
],
1
]
]
},
{
"n": 45,
"t": "Amaliy ish: “Geometrik gul” naqshi",
"hw": "Naqshingizni rangli qilib saqlang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: \"Geometrik gul\".**\n1. Pen qo'shing, **hammasini o'chir**, markazga boring, qalamni tushiring.\n2. **36 marta takrorla:**\n   - doira yoki kvadrat chizing (ichki sikl),\n   - **10° buril**,\n   - **qalam rangini 10 ga o'zgartir** — kamalak effekti!\n3. Qalam o'lchamini 2–3 qiling.\n4. Ekran rasmini saqlang.\n> Kichik o'zgarish (rang, burchak) — butunlay yangi naqsh.\n**Geometrik gul:** \"36 marta takrorla [aylana chiz; 10° buril; rangni 5 ga o'zgartir]\". Aylana — \"36 marta [5 qadam, 10° buril]\". Kamalak — qalam rangini har safar o'zgartirish.",
"quiz": [
[
"Kamalak effekti uchun?",
[
"Fon almashtirish",
"Kutish",
"Qalam rangini o'zgartirish"
],
2
],
[
"36 × 10° = ?",
[
"360°",
"100°",
"36°"
],
0
],
[
"Gul uchun aylanalar soni 36, burilish?",
[
"36°",
"10°",
"90°"
],
1
],
[
"Kamalak effekti uchun nima o'zgaradi?",
[
"Sahna",
"Qadam soni",
"Qalam rangi har qadamda"
],
2
],
[
"Naqshni kattalashtirish uchun?",
[
"Rangni o'zgartirish",
"Qadam uzunligini oshirish",
"Burilishni oshirish"
],
1
],
[
"Gul yaproqlari soni nimaga bog'liq?",
[
"Tashqi sikl takrorlanishiga",
"Rangga",
"Fonga"
],
0
],
[
"Chizishni tezlashtirish (Scratch'da)?",
[
"Imkoni yo'q",
"\"Turbo rejim\" (Shift + bayroq)",
"Sekin rejim"
],
1
],
[
"Gul markazini sahna markazida qilish?",
[
"Oxirida",
"Boshida \"x:0 y:0 ga bor\"",
"Kerak emas"
],
1
],
[
"18 ta yaproq uchun burilish?",
[
"18°",
"36°",
"20°"
],
2
],
[
"Yakuniy rasmni saqlash usuli?",
[
"Ekran surati (skrinshot)",
"Saqlab bo'lmaydi",
"Ctrl+P"
],
0
]
]
},
{
"n": 46,
"t": "Dastur natijasini taxmin qilish: kodni bosqichma-bosqich o‘qish",
"hw": "Berilgan koddan sprite qayerga borishini oldindan aniqlang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Dastur natijasini taxmin qilish** — kodni ishga tushirmasdan \"kallada bajarish\". Bu muhim dasturchi ko'nikmasi.\nMisol: x: 0, y: 0 dan boshlab:\n- 3 marta takrorla: x ni 20 ga o'zgartir\n- y ni −50 ga o'zgartir\nJavob: **x = 60, y = −50**.\nUsul: har qadamdan keyin o'zgaruvchilar qiymatini jadvalga yozing (**trassirovka**).\n> Avval taxmin — keyin tekshir.\n**Trassirovka jadvali:** har qadamda o'zgaruvchilar qiymatini yozish. Bu xatoni topishning eng ishonchli usuli.\n**Misol:** x = 2; \"3 marta x ni x × 2 qil\" → 4, 8, 16.",
"quiz": [
[
"Kodni kallada bajarish jadvali?",
[
"Filtr",
"Trassirovka",
"Animatsiya"
],
1
],
[
"x=0, \"4 marta x ni 10 ga o'zgartir\" dan keyin x = ?",
[
"14",
"40",
"10"
],
1
],
[
"x=1; \"3 marta x ni 2 ga o'zgartir\" → x?",
[
"3",
"6",
"7"
],
2
],
[
"x=10; \"2 marta x ni −3 ga o'zgartir\" → x?",
[
"16",
"4",
"7"
],
1
],
[
"x=2; \"3 marta x ni x*2 qil\" → x?",
[
"16",
"6",
"8"
],
0
],
[
"s=0; \"4 marta s ni 5 ga o'zgartir\" → s?",
[
"9",
"5",
"20"
],
2
],
[
"Trassirovka nima uchun?",
[
"Bezak",
"Tezlik",
"Natijani oldindan bilish va xatoni topish"
],
2
],
[
"x=0; \"5 marta: x ni 1 ga o'zgartir; agar x=3 bo'lsa 'Uch' de\" — necha marta \"Uch\"?",
[
"0",
"5",
"1"
],
2
],
[
"Kodni o'qishda qaysi tartibda?",
[
"Pastdan yuqoriga",
"Tasodifan",
"Yuqoridan pastga, sikllarni takrorlab"
],
2
],
[
"a=3, b=5; \"a ni b ga tenglashtir\" dan keyin a?",
[
"3",
"8",
"5"
],
2
]
]
},
{
"n": 47,
"t": "Scratch’da protseduralar (Custom Block)",
"hw": "Protsedura nima ekanini 2 gapda yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Protsedura (Custom Block, \"Mening bloklarim\")** — o'zingiz yaratgan, nom berilgan blok.\nMasalan, **\"kvadrat chiz\"** bloki ichiga kvadrat chizish kodi joylanadi. Keyin uni istalgan joyda bir blok bilan chaqirasiz.\nFoydasi:\n- Kod **qisqaradi**.\n- **Takrorlanmaydi**.\n- O'qish oson.\nParametr bilan: **\"kvadrat chiz (o'lcham)\"** — har safar boshqa o'lcham.\n> Protsedura — o'z buyrug'ingizni yaratish.\n**Protsedura (o'z bloking)** — bir necha buyruqni bitta nom ostida birlashtirish: \"Mening bloklarim → Blok yaratish\". Keyin uni bir qator bilan chaqirish mumkin.\n**Foyda:** takrorlanmaydi, dastur qisqa va tushunarli bo'ladi.",
"quiz": [
[
"Scratch'da protsedura qayerda yaratiladi?",
[
"Tovush",
"Ko'rinish",
"Mening bloklarim"
],
2
],
[
"Protseduraning foydasi?",
[
"Kod qisqaradi va takrorlanmaydi",
"Fon o'zgaradi",
"Rang qo'shiladi"
],
0
],
[
"Protsedura nima?",
[
"O'zgaruvchi",
"Sahna",
"Nomlangan buyruqlar to'plami"
],
2
],
[
"Protsedura qaysi bo'limda yaratiladi?",
[
"Mening bloklarim (My Blocks)",
"Harakat",
"Ovoz"
],
0
],
[
"Protseduraning qiymat qabul qiluvchi qismi?",
[
"Parametr (kiritish)",
"Fon",
"Kostyum"
],
0
],
[
"Protseduraning boshqa tillardagi nomi?",
[
"Tsikl",
"Funksiya",
"Fayl"
],
1
],
[
"\"kvadrat chiz\" protsedurasini 5 marta chaqirsak?",
[
"20 ta",
"5 ta kvadrat",
"1 ta"
],
1
],
[
"Protsedura ichini o'zgartirsak?",
[
"Faqat birinchisiga",
"Hamma chaqiruvlarga ta'sir qiladi",
"Hech narsa"
],
1
],
[
"Protsedura nomi qanday bo'lsin?",
[
"x1",
"Nima qilishini bildiradigan",
"Bo'sh"
],
1
],
[
"Protsedura dasturni qanday qiladi?",
[
"Xatoli",
"Uzun",
"Qisqa va tushunarli"
],
2
]
]
},
{
"n": 48,
"t": "Amaliy ish: o‘z protsedurangizni yaratish",
"hw": "“To‘rtburchak chizish” protsedurasini yaratib, ishlating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: o'z protsedurangiz.**\n1. **Mening bloklarim → Blok yaratish** → nom: \"to'rtburchak chiz\", parametr: **o'lcham**.\n2. Ta'rif ichiga: **4 marta takrorla: (o'lcham) qadam yur, 90° buril**.\n3. Asosiy dasturda: **to'rtburchak chiz (50)**, **to'rtburchak chiz (100)**, **to'rtburchak chiz (150)**.\n4. Natija: 3 ta har xil kvadrat.\n> Parametr — protseduraga beriladigan qiymat.\n**Parametrli protsedura:** \"kvadrat chiz (tomon)\": 4 marta [tomon qadam yur; 90° buril]. Chaqirish: \"kvadrat chiz (50)\", \"kvadrat chiz (100)\".",
"quiz": [
[
"Protseduraga beriladigan qiymat?",
[
"Sprayt",
"Fon",
"Parametr"
],
2
],
[
"\"to'rtburchak chiz (100)\" da 100 nima?",
[
"O'lcham parametri",
"Vaqt",
"Rang"
],
0
],
[
"\"kvadrat chiz (30)\" da 30 nima?",
[
"Takrorlash soni",
"Parametr qiymati (tomon)",
"Burchak"
],
1
],
[
"Bir protsedura bilan har xil o'lchamdagi kvadratlar?",
[
"Parametr orqali",
"Imkoni yo'q",
"Har biriga alohida protsedura"
],
0
],
[
"\"ko'pburchak (N, tomon)\" da burilish formulasi?",
[
"90",
"N / 360",
"360 / N"
],
2
],
[
"Protseduraga nechta parametr berish mumkin?",
[
"Faqat bitta",
"Hech qancha",
"Bir nechta"
],
2
],
[
"Parametrga son o'rniga matn bersa?",
[
"Hech qachon",
"Doim xato",
"Mos bo'lsa ishlaydi (masalan ism)"
],
2
],
[
"\"uy chiz (o'lcham)\" protsedurasi ichida nima bo'lishi mumkin?",
[
"Faqat ovoz",
"Kvadrat va uchburchak chizish",
"Hech narsa"
],
1
],
[
"Protsedurani boshqa protsedura ichida chaqirsa bo'ladimi?",
[
"Ha",
"Faqat bir marta",
"Yo'q"
],
0
],
[
"\"kvadrat chiz (0)\" nima chizadi?",
[
"Xato",
"Hech narsa (nuqta)",
"Katta kvadrat"
],
1
]
]
},
{
"n": 49,
"t": "Dekompozitsiya: katta masalani kichik vazifalarga bo‘lish",
"hw": "Katta masalani 3 ta kichik vazifaga ajrating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Dekompozitsiya** — katta masalani kichik, mustaqil vazifalarga bo'lish.\n\"Pong o'yini\":\n1. Raketkani boshqarish.\n2. To'pning harakati.\n3. To'p raketkaga tegsa — qaytish.\n4. Ball hisoblash.\n5. O'yin tugashi.\nHar bir qismni alohida yozib, alohida tekshirish oson. Har biri — protsedura bo'lishi mumkin.\n> Dasturchilar \"fil\"ni bo'laklab yeydi.\n**Dekompozitsiya** — katta vazifani kichik, mustaqil qismlarga bo'lish. Har qism alohida protsedura bo'lishi mumkin.\n**Misol:** \"O'yin\": fon chizish, qahramon boshqaruvi, dushmanlar, ball, o'yin tugashi.",
"quiz": [
[
"Dekompozitsiya nima?",
[
"Xato",
"Masalani kichik qismlarga bo'lish",
"Rasm chizish"
],
1
],
[
"Dekompozitsiyaning foydasi?",
[
"Kod uzayadi",
"Hech qanday",
"Har qismni alohida tekshirish oson"
],
2
],
[
"\"Shahar manzarasi\" chizish qismlari?",
[
"Faqat ranglar",
"Bitta chiziq",
"Uylar, daraxtlar, yo'l, quyosh"
],
2
],
[
"Har bir qismni nima qilish qulay?",
[
"Alohida protsedura",
"Bir qatorga yozish",
"O'chirish"
],
0
],
[
"Dekompozitsiyadan keyin?",
[
"Kutish",
"Tashlab ketish",
"Qismlarni birlashtirish va sinash"
],
2
],
[
"Jamoada dekompozitsiyaning foydasi?",
[
"Hamma bir ishni qiladi",
"Foydasi yo'q",
"Har kim o'z qismini bajaradi"
],
2
],
[
"Taqdimot tayyorlashni qismlarga bo'lish?",
[
"Mavzu, matn, rasmlar, dizayn, nutq",
"Faqat dizayn",
"Bo'linmaydi"
],
0
],
[
"Kichik qismni sinash osonmi?",
[
"Ha",
"Farqi yo'q",
"Yo'q"
],
0
],
[
"Dekompozitsiyaning teskarisi?",
[
"Kodlash",
"Birlashtirish (kompozitsiya)",
"O'chirish"
],
1
],
[
"Hisoblash fikrlashning (computational thinking) asosiy qismlaridan biri?",
[
"Chop etish",
"Ranglash",
"Dekompozitsiya"
],
2
]
]
},
{
"n": 50,
"t": "Nazorat ishi: algoritm va Scratch",
"hw": "Takrorlash, PEN va protseduraga bittadan misol yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Nazorat ishi: algoritm va Scratch.** Takrorlang:\n- Sikl turlari, blok-sxema, hisoblagich.\n- repeat, forever, repeat until.\n- Pen: pen down/up, burchaklar (360 ÷ n).\n- Ichma-ich sikl, trassirovka, protsedura, dekompozitsiya.",
"quiz": [
[
"Beshburchak uchun burilish burchagi?",
[
"90°",
"60°",
"72°"
],
2
],
[
"Chizmasdan yurish uchun?",
[
"pen up",
"pen down",
"erase all"
],
0
],
[
"O'z blokingiz nima deyiladi?",
[
"Protsedura",
"Sprayt",
"Kostyum"
],
0
],
[
"Sikl ichida sikl?",
[
"Shart",
"Hodisa",
"Ichma-ich sikl"
],
2
],
[
"x=5, \"3 marta x ni 5 ga o'zgartir\" → x = ?",
[
"5",
"15",
"20"
],
2
],
[
"Derazaga o'tishda qalam?",
[
"O'chiriladi",
"Ko'tariladi",
"Tushiriladi"
],
1
],
[
"Beshburchak uchun burilish?",
[
"108°",
"72°",
"60°"
],
1
],
[
"x=1; \"3 marta x ni 2 ga o'zgartir\" → x?",
[
"3",
"6",
"7"
],
2
],
[
"Protsedurani boshqa protsedura ichida chaqirsa bo'ladimi?",
[
"Ha",
"Faqat bir marta",
"Yo'q"
],
0
],
[
"Naqshni kattalashtirish uchun?",
[
"Rangni o'zgartirish",
"Qadam uzunligini oshirish",
"Burilishni oshirish"
],
1
]
]
},
{
"n": 51,
"t": "Python bilan tanishuv: print() va o‘zgaruvchi",
"hw": "Python’da 3 ta print() buyrug‘i yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Python** — sodda va kuchli dasturlash tili. Unda YouTube, Instagram qismlari, sun'iy intellekt yozilgan.\n**print()** — ekranga chiqarish:\n```python\nprint(\"Salom, dunyo!\")\nprint(2 + 3)\n```\n**O'zgaruvchi** — qiymat saqlovchi nom:\n```python\nism = \"Aziza\"\nyosh = 12\nprint(ism, yosh)\n```\nMatn qo'shtirnoqda, son — qo'shtirnoqsiz.\n> Python'da qator boshidagi bo'sh joy (chekinish) muhim.\n**Python** — sodda va kuchli dasturlash tili. `print()` — chiqarish; **o'zgaruvchi** — nom = qiymat: `ism = \"Ali\"`, `yosh = 12`.\n**Qoidalar:** o'zgaruvchi nomi harf bilan boshlanadi, bo'sh joysiz (`mening_ismim`), katta-kichik harf farqlanadi.\n```python\nism = \"Aziza\"\nyosh = 12\nprint(ism, \"—\", yosh, \"yoshda\")\nprint(\"Kelasi yil:\", yosh + 1)\n```",
"quiz": [
[
"Python'da ekranga chiqarish?",
[
"show",
"echo",
"print()"
],
2
],
[
"\"12\" va 12 farqi?",
[
"Ikkalasi matn",
"Birinchisi matn, ikkinchisi son",
"Farqi yo'q"
],
1
],
[
"`yosh = 12; print(yosh + 1)` natijasi?",
[
"yosh + 1",
"13",
"121"
],
1
],
[
"Qaysi o'zgaruvchi nomi to'g'ri?",
[
"mening_ismim",
"2ism",
"mening ismim"
],
0
],
[
"`print(\"A\", \"B\")` natijasi?",
[
"A B",
"\"A\" \"B\"",
"AB"
],
0
],
[
"Python'da izoh qaysi belgi bilan?",
[
"//",
"#",
"--"
],
1
],
[
"`x = 5; x = x * 2; print(x)`?",
[
"5",
"25",
"10"
],
2
],
[
"`Ism` va `ism` bir xil o'zgaruvchimi?",
[
"Yo'q",
"Ha",
"Ba'zan"
],
0
],
[
"`print(10 / 4)` natijasi?",
[
"2.5",
"2",
"2,5 (vergul bilan)"
],
0
],
[
"`print(10 // 4)` natijasi?",
[
"2.5",
"2",
"3"
],
1
]
]
},
{
"n": 52,
"t": "Python’da ma’lumot kiritish: input()",
"hw": "input() orqali ism va yosh olib, ekranga chiqaring.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**input()** — foydalanuvchidan ma'lumot olish:\n```python\nism = input(\"Ismingiz: \")\nprint(\"Salom,\", ism)\n```\ninput() har doim **matn** qaytaradi. Son kerak bo'lsa — **int()** bilan aylantiramiz:\n```python\nyosh = int(input(\"Yoshingiz: \"))\nprint(\"Kelasi yil\", yosh + 1, \"yoshda bo'lasiz\")\n```\n> int() siz \"12\" + 1 xato beradi.\n**input()** — foydalanuvchidan matn oladi. Son kerak bo'lsa: `int(input())` (butun) yoki `float(input())` (kasr).\n```python\nism = input(\"Ismingiz: \")\nyosh = int(input(\"Yoshingiz: \"))\nprint(\"Salom,\", ism + \"!\", \"10 yildan keyin\", yosh + 10, \"yoshda bo'lasiz\")\n```",
"quiz": [
[
"Foydalanuvchidan ma'lumot olish?",
[
"print()",
"input()",
"int()"
],
1
],
[
"input() nima qaytaradi?",
[
"Son",
"Matn",
"Hech narsa"
],
1
],
[
"`input()` qanday turdagi qiymat qaytaradi?",
[
"Matn (str)",
"Son",
"Mantiqiy"
],
0
],
[
"Kiritilgan sonni hisoblash uchun?",
[
"int() ga o'rash",
"print()",
"str()"
],
0
],
[
"`a = input()` → 5 kiritildi; `print(a + a)`?",
[
"Xato",
"55",
"10"
],
1
],
[
"`a = int(input())` → 5; `print(a + a)`?",
[
"Xato",
"10",
"55"
],
1
],
[
"Kasr son kiritish uchun?",
[
"float(input())",
"str(input())",
"int(input())"
],
0
],
[
"`int(\"abc\")` nima beradi?",
[
"abc",
"Xato (ValueError)",
"0"
],
1
],
[
"`input(\"Ism: \")` dagi \"Ism: \" nima?",
[
"Taklif (so'rov) matni",
"Javob",
"O'zgaruvchi"
],
0
],
[
"`str(25)` nima qiladi?",
[
"Sonni matnga aylantiradi",
"O'chiradi",
"Matnni songa"
],
0
]
]
},
{
"n": 53,
"t": "Python’da if/else yordamida tanlash",
"hw": "if/else ishlaydigan 2 ta kundalik misol yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**if / else** — tanlash (tarmoqlanish):\n```python\nball = int(input(\"Ball: \"))\nif ball >= 60:\n    print(\"O'tdingiz!\")\nelse:\n    print(\"Yana harakat qiling\")\n```\n- Shartdan keyin **ikki nuqta (:)**.\n- Ichki qatorlar **4 ta probel** chekinish bilan.\n- Taqqoslash: **==** teng, **!=** teng emas, **>, <, >=, <=**.\n**elif** — qo'shimcha shart.\n> \"=\" — qiymat berish, \"==\" — tenglikni tekshirish.\n**Shart:** `if shart:` — bajariladi; `else:` — aks holda; `elif` — boshqa shart. Ichidagi qatorlar **4 bo'sh joy** bilan.\n**Taqqoslash:** `==`, `!=`, `>`, `<`, `>=`, `<=`.\n```python\nball = int(input(\"Ball: \"))\nif ball >= 86:\n    print(\"A'lo\")\nelif ball >= 71:\n    print(\"Yaxshi\")\nelse:\n    print(\"Harakat qiling\")\n```",
"quiz": [
[
"Tenglikni tekshirish belgisi?",
[
"=",
":=",
"=="
],
2
],
[
"if dan keyin qanday belgi?",
[
";",
":",
"."
],
1
],
[
"\"Teng emas\" Python'da?",
[
"=!",
"!=",
"<>"
],
1
],
[
"`=` va `==` farqi?",
[
"= qiymat beradi, == taqqoslaydi",
"Farqi yo'q",
"== qiymat beradi"
],
0
],
[
"ball = 75 bo'lsa yuqoridagi dastur nima chiqaradi?",
[
"A'lo",
"Yaxshi",
"Harakat qiling"
],
1
],
[
"if ichidagi qator qancha bo'sh joy bilan?",
[
"1 ta",
"4 ta",
"0 ta"
],
1
],
[
"`elif` nima?",
[
"Sikl",
"Funksiya",
"\"aks holda agar\" — qo'shimcha shart"
],
2
],
[
"`if 5 > 3: print(\"Ha\")` natijasi?",
[
"Ha",
"Hech narsa",
"Xato"
],
0
],
[
"Ikki shart birga:",
[
"&",
"and",
"va"
],
1
],
[
"`if x > 0 or x < -10:` qachon rost?",
[
"Hech qachon",
"Ikkalasi rost bo'lsa",
"Kamida bittasi rost bo'lsa"
],
2
]
]
},
{
"n": 54,
"t": "Amaliy mini-loyiha: “Sonni tekshirish” dasturi",
"hw": "Dasturni 3 xil qiymatda sinab ko‘ring.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Mini-loyiha: \"Sonni tekshirish\".**\n```python\nson = int(input(\"Son kiriting: \"))\nif son > 0:\n    print(\"Musbat\")\nelif son < 0:\n    print(\"Manfiy\")\nelse:\n    print(\"Nol\")\nif son % 2 == 0:\n    print(\"Juft\")\nelse:\n    print(\"Toq\")\n```\n**%** — bo'lishdagi qoldiq. son % 2 == 0 bo'lsa — juft.\nDasturni 3 xil qiymatda sinab ko'ring: 7, −4, 0.\n> Test qilish: har bir yo'lni (if, elif, else) kamida bir marta tekshiring.\n**Qoldiq operatori `%`:** `7 % 2 = 1`, `10 % 5 = 0`. Juft son: `n % 2 == 0`. Butun bo'lish: `//`.\n```python\nn = int(input(\"Son: \"))\nif n % 2 == 0:\n    print(n, \"— juft\")\nelse:\n    print(n, \"— toq\")\n```",
"quiz": [
[
"7 % 2 = ?",
[
"0",
"1",
"3"
],
1
],
[
"Juftlikni tekshirish?",
[
"son % 2 == 0",
"son > 2",
"son / 2"
],
0
],
[
"10 % 3 natijasi?",
[
"1",
"0",
"3"
],
0
],
[
"15 % 5 natijasi?",
[
"5",
"0",
"3"
],
1
],
[
"Son 3 ga bo'linishini tekshirish?",
[
"n // 3 == 1",
"n % 3 == 0",
"n / 3 == 0"
],
1
],
[
"17 // 5 natijasi?",
[
"3",
"3.4",
"2"
],
0
],
[
"Sonning oxirgi raqami?",
[
"n % 10",
"n // 10",
"n * 10"
],
0
],
[
"n = 8 bo'lsa dastur nima chiqaradi?",
[
"Xato",
"8 — juft",
"8 — toq"
],
1
],
[
"Musbat yoki manfiyligini tekshirish sharti?",
[
"n == 0 xolos",
"n > 0",
"n % 2"
],
1
],
[
"0 juftmi?",
[
"Yo'q",
"Na juft, na toq",
"Ha (0 % 2 == 0)"
],
2
]
]
},
{
"n": 55,
"t": "Web manzillar. URL tarkibi. Web-sahifa va web-sayt farqi",
"hw": "3 ta sayt manzilini topib, domen qismini ajrating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**URL** — web-manzil. https://www.maktab.uz/darslar/informatika\n- **https** — protokol (s = shifrlangan, xavfsiz).\n- **www.maktab.uz** — domen. **.uz** — yuqori darajali domen (davlat).\n- **/darslar/informatika** — sahifa yo'li.\n**Web-sahifa** — bitta sahifa. **Web-sayt** — bitta domendagi bog'langan sahifalar to'plami.\n> Domen nomini sotib olish va uni sozlash — har yili to'lanadi.\n**URL:** `https://maktab.uz/darslar/info.html` → protokol, **domen** (maktab.uz), yo'l (/darslar/), sahifa (info.html).\n**Web-sahifa** — bitta hujjat; **web-sayt** — sahifalar to'plami, bitta domenda; **web-server** — saytni saqlovchi kompyuter.",
"quiz": [
[
"URL'da domen qaysi qism?",
[
"www.maktab.uz",
"https",
"/darslar"
],
0
],
[
"Web-sayt nima?",
[
"Brauzer",
"Bog'langan sahifalar to'plami",
"Bitta rasm"
],
1
],
[
"Saytni saqlovchi kompyuter?",
[
"Web-server",
"Router",
"Brauzer"
],
0
],
[
"URL'dagi \"/darslar/\" nima?",
[
"Domen",
"Protokol",
"Yo'l (papka)"
],
2
],
[
"`.html` nima?",
[
"Rasm",
"Web-sahifa fayli kengaytmasi",
"Arxiv"
],
1
],
[
"Domen nomi nima uchun kerak?",
[
"Bezak",
"Kerak emas",
"IP-manzilni eslash oson bo'lishi uchun"
],
2
],
[
"DNS nima qiladi?",
[
"Sayt chizadi",
"Virusni o'chiradi",
"Domen nomini IP-manzilga aylantiradi"
],
2
],
[
"Subdomen misoli?",
[
"edu.maktab.uz",
"https",
"maktab.uz"
],
0
],
[
"HTTP va HTTPS farqi?",
[
"Farqi yo'q",
"HTTPS shifrlangan",
"HTTP tezroq xavfsiz"
],
1
],
[
"Bitta saytda nechta web-sahifa?",
[
"Hech qancha",
"Faqat bitta",
"Bir nechta yoki ko'p"
],
2
]
]
},
{
"n": 56,
"t": "Qidiruv natijalarini solishtirish. Ishonchli manbani tanlash",
"hw": "Bir mavzu bo‘yicha 3 ta manbaning ishonchliligini solishtiring.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Ishonchli manba** mezonlari:\n1. **Muallif** — kim yozgan? Mutaxassismi, rasmiy tashkilotmi?\n2. **Sana** — ma'lumot eskirmaganmi?\n3. **Dalillar** — manbalar, havolalar bormi?\n4. **Maqsad** — xabar berishmi yoki sotish/reklama?\n5. **Domen** — .gov.uz, .edu odatda ishonchliroq.\n6. **Boshqa manbalar** tasdiqlaydimi?\n> Sarlavhada \"SHOK!\", \"Hech kim bilmaydi!\" bo'lsa — ehtiyot bo'ling.\n**Ishonchlilik mezonlari (CRAAP):** dolzarblik (sana), aloqadorlik, muallif obro'si, aniqlik (dalillar), maqsad (reklama yoki ma'lumot).",
"quiz": [
[
"Ishonchli manba belgisi?",
[
"Muallif va manbalar ko'rsatilgan",
"Muallif yo'q",
"\"SHOK!\" sarlavha"
],
0
],
[
".gov.uz domeni qanday sayt?",
[
"O'yin",
"Do'kon",
"Davlat sayti"
],
2
],
[
"Manba sanasi nima uchun muhim?",
[
"Bezak",
"Ma'lumot eskirgan bo'lishi mumkin",
"Muhim emas"
],
1
],
[
"Reklama saytining maqsadi?",
[
"Ta'lim",
"Mahsulot sotish",
"Xolis ma'lumot"
],
1
],
[
"Dalil (manba havolasi) bor maqola?",
[
"Farqi yo'q",
"Kam ishonchli",
"Ishonchliroq"
],
2
],
[
"Muallif mutaxassis ekanini qanday bilamiz?",
[
"Bilmaymiz",
"Rasmidan",
"\"Muallif haqida\" bo'limidan"
],
2
],
[
".edu domeni qanday?",
[
"O'yin",
"Ta'lim muassasasi",
"Do'kon"
],
1
],
[
"Bir xil ma'lumot ko'p saytda takrorlansa doim to'g'rimi?",
[
"Ha",
"Albatta",
"Yo'q, bir-biridan ko'chirilgan bo'lishi mumkin"
],
2
],
[
"Soxta yangilik belgisi?",
[
"Rasmiy sayt",
"Sana bor",
"Hayajonli sarlavha, manba yo'q"
],
2
],
[
"Ilmiy maqola qayerdan izlanadi?",
[
"Reklama",
"Google Scholar",
"Ijtimoiy tarmoq"
],
1
]
]
},
{
"n": 57,
"t": "Amaliy ish: bitta mavzu bo‘yicha 3 ta manbani tekshirish",
"hw": "Manbalarni “ishonchli” va “tekshirish kerak” guruhlariga ajrating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: 3 ta manbani tekshirish.**\nMavzu tanlang (masalan, \"Quyosh tizimida nechta sayyora bor?\").\n1. 3 ta saytdan javob toping.\n2. Jadval tuzing: Manba | Muallif | Sana | Javob | Ishonchli?\n3. Har birini \"ishonchli\" yoki \"tekshirish kerak\" guruhiga ajrating.\n4. Xulosa: qaysi javob to'g'ri va nega?\n> Javoblar farq qilsa — eng rasmiy manbaga ishoning.\n**Tekshirish jadvali:** Manba nomi | URL | Muallif | Sana | Asosiy fakt | Ishonchlilik (1–5). Faktlar mos kelsa — ishonchli; farq qilsa — uchinchi rasmiy manba.",
"quiz": [
[
"Javoblar farq qilsa qaysi biriga ishonamiz?",
[
"Eng qisqasiga",
"Eng rasmiy manbaga",
"Birinchisiga"
],
1
],
[
"Manbalar jadvalida nima bo'ladi?",
[
"Muallif, sana, javob",
"Faqat rang",
"Hech narsa"
],
0
],
[
"Manbalarni nima uchun jadvalga yozamiz?",
[
"Solishtirish va manba ko'rsatish uchun",
"Kerak emas",
"Bezak"
],
0
],
[
"3 ta manbadan 2 tasi bir xil, 1 tasi boshqa desa?",
[
"Hammasini tashlaymiz",
"Ko'pchilikka ishonamiz doim",
"Rasmiy manba bilan tekshiramiz"
],
2
],
[
"Ishonchlilikni baholash shkalasi misoli?",
[
"1 dan 5 gacha",
"Harflar",
"Ranglar"
],
0
],
[
"Ma'lumotni ko'chirganda nima qilinadi?",
[
"O'zgartirilmaydi va o'zimizniki deyiladi",
"Yashiriladi",
"Manba ko'rsatiladi"
],
2
],
[
"Asosiy faktni qanday yozamiz?",
[
"Qisqa, o'z so'zimiz bilan",
"To'liq ko'chirib",
"Yozmaymiz"
],
0
],
[
"Wikipedia'dagi faktni qanday tekshiramiz?",
[
"Ijtimoiy tarmoqdan",
"Maqola ostidagi manbalar orqali",
"Tekshirmaymiz"
],
1
],
[
"URL'ni nima uchun saqlaymiz?",
[
"Bezak",
"Qaytadan topish uchun",
"Kerak emas"
],
1
],
[
"Xulosa qismida nima yoziladi?",
[
"Hech narsa",
"Faqat ism",
"Qaysi manba eng ishonchli va nima uchun"
],
2
]
]
},
{
"n": 58,
"t": "HTMLga kirish: html, head, body, h1, p. Birinchi sahifa",
"hw": "5 qatorli birinchi HTML sahifangizni yarating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**HTML** — web-sahifalar tili. U **teglar**dan iborat:\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>Mening sahifam</title>\n  </head>\n  <body>\n    <h1>Salom!</h1>\n    <p>Men 6-sinf o'quvchisiman.</p>\n  </body>\n</html>\n```\n- **html** — butun sahifa. **head** — sarlavha va sozlamalar. **body** — ko'rinadigan qism.\n- **h1** — katta sarlavha, **p** — paragraf.\nPlatformaning **Kod maydoni**da bu kodni yozib, natijani darhol ko'ring!\n> Teg ochiladi <p> va yopiladi </p>.\n**HTML tuzilishi:**\n```html\n<!DOCTYPE html>\n<html>\n  <head><title>Mening sahifam</title></head>\n  <body>\n    <h1>Salom!</h1>\n    <p>Men 6-sinf o'quvchisiman.</p>\n  </body>\n</html>\n```\n`<head>` — xizmat ma'lumotlari (sarlavha tab nomi), `<body>` — ko'rinadigan qism.",
"quiz": [
[
"Sahifaning ko'rinadigan qismi qaysi tegda?",
[
"title",
"body",
"head"
],
1
],
[
"Paragraf tegi?",
[
"br",
"h1",
"p"
],
2
],
[
"Brauzer tabidagi nom qaysi tegda?",
[
"<h1>",
"<title>",
"<p>"
],
1
],
[
"HTML faylning kengaytmasi?",
[
".html",
".docx",
".txt"
],
0
],
[
"`<h1>` dan `<h6>` gacha nima?",
[
"Ro'yxatlar",
"Sarlavha darajalari",
"Rasmlar"
],
1
],
[
"Qator uzilishi tegi?",
[
"<hr>",
"<br>",
"<p>"
],
1
],
[
"HTML faylni qanday ko'ramiz?",
[
"Excel'da",
"Paint'da",
"Brauzerda ochib"
],
2
],
[
"`<head>` ichidagi narsa sahifada ko'rinadimi?",
[
"Asosan yo'q (xizmat ma'lumoti)",
"Ha, katta qilib",
"Faqat rasm"
],
0
],
[
"Teglar qanday juft bo'ladi?",
[
"Faqat yopuvchi",
"Ochuvchi va yopuvchi",
"Faqat ochuvchi"
],
1
],
[
"HTML qisqartmasi?",
[
"Home Tool Markup",
"HyperText Markup Language",
"High Tech Modern Language"
],
1
]
]
},
{
"n": 59,
"t": "Elektron xat tuzilishi. Rasmiy va norasmiy uslub",
"hw": "Bitta xatni rasmiy va do‘stona uslubda yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Elektron xat tuzilishi:**\n1. **Mavzu** — qisqa va aniq: \"6-A sinf loyihasi haqida\".\n2. **Murojaat** — \"Hurmatli Aziza opa,\" yoki \"Salom, Sardor!\"\n3. **Asosiy qism** — nima demoqchisiz, qisqa abzaslarda.\n4. **Xayrlashuv** — \"Hurmat bilan,\" yoki \"Ko'rishguncha!\"\n5. **Imzo** — ism, sinf.\n**Rasmiy uslub** — o'qituvchi, direktor, tashkilotga: \"Siz\", aniq va hurmatli.\n**Norasmiy** — do'stga: erkinroq, emoji mumkin.\n> O'qituvchiga yozilgan xatda emoji va qisqartmalar ishlatmang.\n**Rasmiy xat:** \"Hurmatli Dilnoza Karimovna,\" + asosiy matn (qisqa, aniq) + \"Hurmat bilan, Ali Valiyev, 6-A sinf\". **Norasmiy:** do'stona, emoji mumkin.\n**Mavzu satri** aniq bo'lsin: \"6-A, Ali Valiyev — uy vazifasi (Excel)\".",
"quiz": [
[
"O'qituvchiga xat qanday uslubda?",
[
"Ixtiyoriy",
"Norasmiy",
"Rasmiy"
],
2
],
[
"Xat oxirida nima bo'ladi?",
[
"Mavzu",
"Ilova",
"Imzo"
],
2
],
[
"Rasmiy xatda qaysi murojaat?",
[
"\"Hey\"",
"\"Hurmatli ...\"",
"\"Salom, do'stim!\""
],
1
],
[
"Rasmiy xatda emoji ishlatish?",
[
"Ko'p ishlatiladi",
"Ishlatilmaydi",
"Majburiy"
],
1
],
[
"Yaxshi mavzu satri?",
[
"Bo'sh",
"\"Salom\"",
"\"6-A, Valiyev — Excel topshirig'i\""
],
2
],
[
"Xatni kim imzolaydi?",
[
"Hech kim",
"Yuboruvchi",
"Oluvchi"
],
1
],
[
"Rasmiy xat uzunligi?",
[
"Bir so'z",
"Qisqa va aniq",
"Juda uzun"
],
1
],
[
"Norasmiy xat kimga?",
[
"Direktor",
"Rasmiy tashkilot",
"Do'st, sinfdosh"
],
2
],
[
"\"Hurmat bilan\" qayerda yoziladi?",
[
"Xat oxirida",
"Mavzuda",
"Boshida"
],
0
],
[
"Xatda imlo xatosi bo'lsa?",
[
"Yaxshi",
"Beparvo taassurot qoldiradi",
"Farqi yo'q"
],
1
]
]
},
{
"n": 60,
"t": "Amaliy ish: o‘qituvchiga rasmiy elektron xat",
"hw": "Loyiha haqida o‘qituvchiga rasmiy xat tayyorlang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Amaliy ish: o'qituvchiga rasmiy xat.**\nMavzu: \"Portfolio loyihasi — 1-bosqich\"\nHurmatli [Ism] [Otasining ismi],\nMen \"Mening raqamli portfoliom\" loyihasining 1-bosqichini yakunladim. Ilovada titul va \"Men haqimda\" sahifalarini yubormoqdaman. Fikr-mulohazalaringizni kutaman.\nHurmat bilan,\n[Ism Familiya], 6-A sinf\n> Yuborishdan oldin xatni qayta o'qing va ilova biriktirilganini tekshiring.\n**Tekshiruv ro'yxati yuborishdan oldin:** manzil to'g'rimi; mavzu bormi; murojaat va imzo; ilova biriktirildimi; imlo tekshirildimi.",
"quiz": [
[
"Rasmiy xat qanday boshlanadi?",
[
"\"Hey!\"",
"Emoji bilan",
"\"Hurmatli ...\""
],
2
],
[
"Yuborishdan oldin nima tekshiriladi?",
[
"Fon rangi",
"Ilova va imlo",
"Hech narsa"
],
1
],
[
"Xatda \"ilovada\" deb yozilsa-yu, fayl biriktirilmasa?",
[
"Oluvchi faylni olmaydi",
"Fayl o'zi qo'shiladi",
"Farqi yo'q"
],
0
],
[
"O'qituvchiga xatni qachon yuborgan ma'qul?",
[
"Yarim tunda",
"Bayramda",
"Ish vaqtida"
],
2
],
[
"Javob kelmasa necha kundan keyin eslatish odobli?",
[
"5 daqiqada",
"1–2 kundan keyin",
"Hech qachon"
],
1
],
[
"Xat manzilini qayerga yozamiz?",
[
"Matnga",
"Mavzuga",
"\"Kimga\" maydoniga"
],
2
],
[
"Bir nechta o'qituvchiga yuborish?",
[
"Imkoni yo'q",
"Faqat bittaga",
"Manzillarni vergul bilan yoki CC orqali"
],
2
],
[
"Xatni yuborishni bekor qilish (Gmail'da qisqa vaqt)?",
[
"\"Bekor qilish\" (Undo)",
"O'chirish",
"Imkoni yo'q"
],
0
],
[
"Xatga javobni qanday boshlaymiz?",
[
"Rahmat va murojaat bilan",
"Darhol savol",
"Haqorat"
],
0
],
[
"Rasmiy xatdagi asosiy qism nima haqida?",
[
"Hech narsa",
"Bitta aniq masala",
"Hamma narsa"
],
1
]
]
},
{
"n": 61,
"t": "Xatga fayl ilova qilish. ZIP arxiv. Ilovalar xavfsizligi",
"hw": "Noma’lum ilovani ochmaslik uchun 3 ta sabab yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Ilova (attachment)** — xatga biriktirilgan fayl.\n**ZIP arxiv** — bir nechta faylni bitta siqilgan faylga joylash: o'ng tugma → **Отправить → Сжатая ZIP-папка**. Yuborish qulay, hajm kichrayadi.\n**Ilovalar xavfsizligi:**\n- Notanish jo'natuvchidan kelgan ilovani **ochmang**.\n- **.exe, .bat, .scr** fayllar — virus bo'lishi mumkin.\n- \"Hisob.pdf.exe\" kabi ikki kengaytmali nomlar — aldov.\n- Antivirus bilan tekshiring.\n> Shubhali ilova — ochilmaydi, o'chiriladi.\n**ZIP arxiv:** bir nechta faylni bitta faylga siqadi (o'ng tugma → Yuborish → Siqilgan ZIP papka). Hajm kamayadi, yuborish oson.\n**Xavfsizlik:** `.exe`, `.scr`, ikki kengaytmali fayllar (\"hisob.pdf.exe\") — xavfli; notanish ilovani ochmang, antivirus bilan tekshiring.",
"quiz": [
[
"Bir nechta faylni bitta faylga siqish?",
[
"ZIP arxiv",
"PDF",
"PNG"
],
0
],
[
"\"Hisob.pdf.exe\" — bu?",
[
"Oddiy PDF",
"Xavfli aldov fayl",
"Rasm"
],
1
],
[
"ZIP arxivning afzalligi?",
[
"Fayllar o'chadi",
"Rasm sifati oshadi",
"Ko'p fayl bitta va kichikroq"
],
2
],
[
"\"rasm.jpg.exe\" qanday fayl?",
[
"Xavfli dastur (niqoblangan)",
"Rasm",
"Matn"
],
0
],
[
"Arxivni ochish?",
[
"O'ng tugma → Hammasini chiqarish",
"Imkoni yo'q",
"Ctrl+Z"
],
0
],
[
"Parolli ZIP nima uchun?",
[
"Bezak",
"Tezlik",
"Maxfiy fayllarni himoyalash"
],
2
],
[
"Ilovada makros so'ralsa (Word)?",
[
"Hammaga yuborish",
"Darhol yoqish",
"Ehtiyot bo'lish, yoqmaslik"
],
2
],
[
"Antivirus ilovani qachon tekshiradi?",
[
"Yuklab olinganda yoki ochishdan oldin",
"Faqat kechqurun",
"Hech qachon"
],
0
],
[
"Pochta 25 MB dan katta faylni qabul qilmasa?",
[
"Fayl kesiladi",
"Imkoni yo'q",
"Bulut havolasi yuboriladi"
],
2
],
[
"`.7z` va `.rar` nima?",
[
"Video",
"Rasm",
"Arxiv formatlari"
],
2
]
]
},
{
"n": 62,
"t": "Pochta papkalari: Inbox, Sent, Drafts, Spam. Amaliy ish",
"hw": "Elektron pochtani tartibli boshqarish uchun 3 ta qoida yozing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "Pochta **papkalari:**\n- **Входящие / Inbox** — kelgan xatlar.\n- **Отправленные / Sent** — yuborilganlar.\n- **Черновики / Drafts** — yozilib, yuborilmaganlar.\n- **Спам / Spam** — keraksiz va shubhali xatlar.\n- **Корзина / Trash** — o'chirilganlar.\nTartibli pochta qoidalari: o'qilganini arxivlash, keraksizini o'chirish, muhimini **yulduzcha** bilan belgilash, mavzular bo'yicha **yorliqlar**.\n> Spam papkasidagi havolalarni bosmang.\n**Pochta papkalari:** Kiruvchi (Inbox), Yuborilgan (Sent), Qoralamalar (Drafts), Spam, Savat (Trash), Arxiv. **Yulduzcha/bayroq** — muhim xat.\n**Tartib:** yorliqlar (labels), filtrlar — xatlar avtomatik papkalarga tushadi.",
"quiz": [
[
"Yozilib yuborilmagan xatlar?",
[
"Sent",
"Inbox",
"Drafts (Черновики)"
],
2
],
[
"Muhim xatni belgilash?",
[
"Spam",
"Yulduzcha",
"O'chirish"
],
1
],
[
"Yuborilgan xatlar qayerda?",
[
"Sent (Yuborilgan)",
"Drafts",
"Inbox"
],
0
],
[
"Muhim xatni belgilash?",
[
"O'chirish",
"Yulduzcha yoki bayroq",
"Spam"
],
1
],
[
"Spam'ga noto'g'ri tushgan xat?",
[
"O'chirish",
"E'tibor bermaslik",
"\"Spam emas\" deb qaytarish"
],
2
],
[
"Xatlarni avtomatik saralash?",
[
"Filtrlar va yorliqlar",
"Imkoni yo'q",
"Qo'lda xolos"
],
0
],
[
"Savatdagi xatlar qancha saqlanadi?",
[
"1 daqiqa",
"Abadiy",
"Odatda 30 kun"
],
2
],
[
"Arxivlangan xat o'chadimi?",
[
"Ha",
"Spamga tushadi",
"Yo'q, Kiruvchidan yashiriladi"
],
2
],
[
"O'qilmagan xatlar qanday ko'rinadi?",
[
"Ko'rinmaydi",
"Kulrang",
"Qalin yozuvda"
],
2
],
[
"Xatni qidirish?",
[
"Qidiruv satriga yuboruvchi yoki so'z",
"Faqat sana bo'yicha",
"Imkoni yo'q"
],
0
]
]
},
{
"n": 63,
"t": "Taqdimot tuzilishi: kirish, asosiy qism, xulosa. Maket tanlash",
"hw": "5 slaydlik taqdimot rejasini tuzing.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Taqdimot tuzilishi:**\n1. **Kirish** — titul slaydi, mavzu, nega muhim.\n2. **Asosiy qism** — 3–5 slayd, har biri bitta g'oya.\n3. **Xulosa** — asosiy fikrlar, savollar.\n**Maket (Макет)** — slayddagi elementlar joylashuvi: \"Заголовок и объект\", \"Два объекта\", \"Только заголовок\".\n**Dizayn mavzusi** — barcha slaydlar uchun yagona uslub.\n> 6×6 qoidasi: slaydda 6 tadan ko'p qator, qatorda 6 tadan ko'p so'z bo'lmasin.\n**Taqdimot tuzilishi:** titul (mavzu, muallif) → reja → asosiy qism (har slaydda bitta g'oya) → xulosa → savollar/manbalar.\n**Maket (layout):** \"Sarlavha va kontent\", \"Ikki kontent\", \"Faqat sarlavha\".",
"quiz": [
[
"Har slaydda nechta asosiy g'oya?",
[
"O'nta",
"Bitta",
"Hech qancha"
],
1
],
[
"Elementlar joylashuvi nima deyiladi?",
[
"Maket",
"O'tish",
"Animatsiya"
],
0
],
[
"Titul slaydda nima bo'ladi?",
[
"Mavzu va muallif",
"Manbalar",
"Xulosa"
],
0
],
[
"Reja slaydi nima uchun?",
[
"Bezak",
"Tinglovchiga yo'nalish berish",
"Kerak emas"
],
1
],
[
"\"Ikki kontent\" maketi qachon qulay?",
[
"Hech qachon",
"Ikki narsani solishtirishda",
"Titulda"
],
1
],
[
"Xulosa slaydida?",
[
"Bo'sh",
"Asosiy fikrlar qisqacha",
"Yangi mavzu"
],
1
],
[
"6×6 qoidasi?",
[
"6 ta slayd",
"6 ta rasm",
"Slaydda 6 qatordan, qatorda 6 so'zdan ko'p emas"
],
2
],
[
"Manbalar slaydi qayerda?",
[
"O'rtada",
"Oxirida",
"Boshida"
],
1
],
[
"Har slaydda nechta asosiy g'oya?",
[
"Bitta",
"Hech qancha",
"O'nta"
],
0
],
[
"Slayd maketini o'zgartirish qayerda?",
[
"Ko'rib chiqish",
"Fayl",
"Bosh sahifa → Maket"
],
2
]
]
},
{
"n": 64,
"t": "Slaydga matn, tasvir va ovoz qo‘shish. Vizual ierarxiya",
"hw": "“Men sevgan IT kasbi” mavzusida 5 slayd tayyorlang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "Slaydga **multimedia** qo'shish (**Вставка**):\n- **Matn** — sarlavha va qisqa punktlar.\n- **Rasm** — mavzuga mos, sifatli.\n- **Ovoz** — Звук → audio fayl yoki yozib olish.\n- **Video** — Видео → fayldan.\n**Vizual ierarxiya** — ko'z avval eng muhimini ko'rishi kerak: katta sarlavha → rasm → kichik matn. Muhimini kattaroq, yorqinroq, tepada joylashtiring.\n> Rasm — gapirmasdan tushuntiradi.\n**Vizual ierarxiya** — ko'z avval eng muhimini ko'rishi: katta sarlavha → asosiy rasm → qisqa matn. Yordam beradi: o'lcham, rang, kontrast, joylashuv.\n**Ovoz:** Qo'yish → Audio; avtomatik yoki bosganda ijro.",
"quiz": [
[
"Ko'z avval nimani ko'rishi kerak?",
[
"Eng muhim narsani",
"Kichik matnni",
"Raqamni"
],
0
],
[
"Ovoz qayerdan qo'shiladi?",
[
"Переходы",
"Дизайн",
"Вставка → Звук"
],
2
],
[
"Eng muhim element qanday bo'lishi kerak?",
[
"Burchakda yashiringan",
"Eng kichik",
"Eng katta va ko'zga tashlanadigan"
],
2
],
[
"Slaydga musiqa qo'shish?",
[
"O'tishlar",
"Dizayn",
"Qo'yish → Audio"
],
2
],
[
"Matn rasm ustida o'qilishi uchun?",
[
"Kichik shrift",
"Rasmni o'chirish",
"Matn ostiga yarim shaffof fon"
],
2
],
[
"Bir slayddagi ranglar soni?",
[
"Bitta kulrang",
"Iloji boricha ko'p",
"Cheklangan (2–3)"
],
2
],
[
"Ovoz avtomatik ijro bo'lishi uchun?",
[
"Ctrl+P",
"Imkoni yo'q",
"Ijro sozlamasida \"Avtomatik\""
],
2
],
[
"Matnni ro'yxat qilib berishning foydasi?",
[
"Kerak emas",
"Uzun bo'ladi",
"O'qish oson"
],
2
],
[
"Rasm sifati past bo'lsa?",
[
"Hech narsa",
"Cho'ziladi",
"Kattaroq aniqlikdagi rasm topiladi"
],
2
],
[
"Vizual ierarxiya nimaga yordam beradi?",
[
"Ovozga",
"Ma'lumotni tez tushunishga",
"Fayl hajmiga"
],
1
]
]
},
{
"n": 65,
"t": "Slaydlarda o‘tish (transition) va sodda animatsiyalar",
"hw": "3 ta slaydga turli transition qo‘llang.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "- **O'tish (Transition)** — slayddan slaydga: **Переходы** bo'limi. Davomiylik va ovozni sozlash mumkin.\n- **Animatsiya** — slayd ichidagi obyektga: **Анимация**.\n  - **Вход** — paydo bo'lish.\n  - **Выделение** — e'tiborni tortish.\n  - **Выход** — yo'qolish.\n  - **Пути перемещения** — yo'l bo'ylab harakat.\n- **Область анимации** — animatsiyalar tartibi va vaqtini boshqarish.\n> Animatsiya ma'noga xizmat qilsin, ko'z chalg'itmasin.\n**O'tish (transition)** — slaydlar orasida; **animatsiya** — obyektlarda: kirish, ajratish (urg'u), chiqish, harakat yo'li. **Animatsiya paneli** — tartib va vaqtni sozlash.",
"quiz": [
[
"Obyekt paydo bo'lishi qaysi guruh?",
[
"Переходы",
"Выход",
"Вход"
],
2
],
[
"Slaydlar orasidagi effekt?",
[
"Animatsiya",
"Maket",
"Transition"
],
2
],
[
"Obyekt slayddan chiqib ketishi qaysi guruh?",
[
"Chiqish (Exit)",
"Kirish",
"Urg'u"
],
0
],
[
"Obyektga urg'u berish (lipillash)?",
[
"Chiqish",
"O'tish",
"Ajratish (Emphasis)"
],
2
],
[
"Obyekt belgilangan yo'l bo'ylab harakati?",
[
"Harakat yo'li (Motion path)",
"O'tish",
"Kirish"
],
0
],
[
"Animatsiyalar tartibini ko'rish?",
[
"Animatsiya paneli",
"Dizayn",
"Fayl"
],
0
],
[
"\"Oldingisi bilan birga\" nima?",
[
"Animatsiya bir vaqtda boshlanadi",
"Bosganda",
"Hech qachon"
],
0
],
[
"Animatsiya davomiyligi nimani belgilaydi?",
[
"Effekt tezligini",
"O'lchamni",
"Rangni"
],
0
],
[
"Rasmiy taqdimotda qanday animatsiya?",
[
"Hamma effekt",
"Kam va sokin",
"Ko'p va shovqinli"
],
1
],
[
"Slaydga o'tish ovozini qo'shish mumkinmi?",
[
"Faqat birinchi slaydga",
"Ha",
"Yo'q"
],
1
]
]
},
{
"n": 66,
"t": "Giperhavola va harakat tugmalari: interaktiv mini-taqdimot",
"hw": "4–5 slaydli interaktiv mini-taqdimot yarating.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Giperhavola (hyperlink)** — bosilganda boshqa slayd, fayl yoki saytga o'tkazadi.\nQo'shish: obyektni belgilash → **Вставка → Ссылка** → \"Место в документе\" (boshqa slayd) yoki URL.\n**Harakat tugmalari (Управляющие кнопки)** — Фигуры ro'yxati oxirida: \"Oldinga\", \"Orqaga\", \"Bosh sahifa\".\nInteraktiv taqdimot: menyu slaydi → har bo'limga havola → har bo'limdan \"Menyuga qaytish\" tugmasi. Viktorinalar ham shunday quriladi!\n> Interaktiv taqdimot — kichik \"sayt\" kabi.\n**Giperhavola:** matn yoki rasmni tanlab → Qo'yish → Havola → \"Ushbu hujjatdagi joy\" (slayd) yoki web-manzil. **Harakat tugmalari:** Qo'yish → Shakllar → oxirgi guruh (Keyingi, Oldingi, Bosh).\n**Interaktiv viktorina:** savol slaydi → javob tugmalari → \"To'g'ri\"/\"Xato\" slaydlariga havola.",
"quiz": [
[
"Boshqa slaydga o'tkazuvchi element?",
[
"Rasm",
"Animatsiya",
"Giperhavola"
],
2
],
[
"Harakat tugmalari qayerda?",
[
"Файл",
"Дизайн",
"Фигуры ro'yxati oxirida"
],
2
],
[
"Slayddagi matnni boshqa slaydga bog'lash?",
[
"Giperhavola → \"Ushbu hujjatdagi joy\"",
"Animatsiya",
"O'tish"
],
0
],
[
"Harakat tugmasi \"Bosh\" nima qiladi?",
[
"Oxirgisiga",
"Birinchi slaydga o'tkazadi",
"Yopadi"
],
1
],
[
"Interaktiv taqdimotda tinglovchi nima qiladi?",
[
"Hech narsa",
"O'zi tugmalarni bosib tanlaydi",
"Faqat tomosha"
],
1
],
[
"Havolani olib tashlash?",
[
"Delete hamma slayd",
"Imkoni yo'q",
"O'ng tugma → Havolani olib tashlash"
],
2
],
[
"Web-saytga havola?",
[
"Manzilni (URL) kiritish",
"Rasm qo'yish",
"Imkoni yo'q"
],
0
],
[
"Havola ko'rsatish rejimida ishlaydimi?",
[
"Faqat tahrirda",
"Yo'q",
"Ha"
],
2
],
[
"Interaktiv viktorinada \"Xato\" slaydidan qaytish?",
[
"Savol slaydiga havola",
"Taqdimotni yopish",
"Imkoni yo'q"
],
0
],
[
"Harakat tugmalari qayerda?",
[
"Ko'rinish",
"Fayl",
"Qo'yish → Shakllar ro'yxati oxirida"
],
2
]
]
},
{
"n": 67,
"t": "Yakuniy loyiha: 6–8 slaydli IT taqdimotini tayyorlash",
"hw": "Taqdimotda kamida 3 xil multimedia elementidan foydalaning.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Yakuniy loyiha: 6–8 slaydli IT taqdimoti.**\nTalablar:\n1. Titul, kirish, 4–5 asosiy slayd, xulosa.\n2. Kamida **3 xil multimedia**: rasm, ovoz/video, diagramma yoki animatsiya.\n3. Yagona dizayn mavzusi.\n4. Kamida bitta **giperhavola** yoki harakat tugmasi.\n5. 6×6 qoidasi.\nMavzular: \"Sun'iy intellekt\", \"Kiberxavfsizlik\", \"IT kasblari\", \"Robotlar\".\n> Taqdimot — sizni ko'rsatadi, slaydlar faqat yordamchi.",
"quiz": [
[
"Nechta xil multimedia talab qilinadi?",
[
"Kamida 3",
"1",
"0"
],
0
],
[
"6×6 qoidasi nima haqida?",
[
"Slayddagi matn hajmi",
"Rasm o'lchami",
"Slaydlar soni"
],
0
],
[
"Antivirus ilovani qachon tekshiradi?",
[
"Yuklab olinganda yoki ochishdan oldin",
"Faqat kechqurun",
"Hech qachon"
],
0
],
[
"Rasmiy xat uzunligi?",
[
"Bir so'z",
"Qisqa va aniq",
"Juda uzun"
],
1
],
[
"Matnni ro'yxat qilib berishning foydasi?",
[
"Kerak emas",
"Uzun bo'ladi",
"O'qish oson"
],
2
],
[
"Pochta 25 MB dan katta faylni qabul qilmasa?",
[
"Fayl kesiladi",
"Imkoni yo'q",
"Bulut havolasi yuboriladi"
],
2
],
[
"Ko'z avval nimani ko'rishi kerak?",
[
"Eng muhim narsani",
"Kichik matnni",
"Raqamni"
],
0
],
[
"Manbalar slaydi qayerda?",
[
"O'rtada",
"Oxirida",
"Boshida"
],
1
],
[
"Norasmiy xat kimga?",
[
"Direktor",
"Rasmiy tashkilot",
"Do'st, sinfdosh"
],
2
],
[
"`.7z` va `.rar` nima?",
[
"Video",
"Rasm",
"Arxiv formatlari"
],
2
]
]
},
{
"n": 68,
"t": "Yakuniy loyiha himoyasi va o‘z-o‘zini baholash. Nazorat",
"hw": "Loyihangizni 3–5 daqiqada himoya qilishga tayyorlaning.",
"part": "2-yarim yillik (34 soat)",
"sec": "",
"md": "**Yakuniy loyiha himoyasi va o'z-o'zini baholash.**\nHimoya (3–5 daqiqa): salomlashish → mavzu va maqsad → asosiy slaydlar → xulosa → savollarga javob.\nO'z-o'zini baholash savollari:\n- Maqsadga erishdimmi?\n- Qaysi qism eng yaxshi chiqdi?\n- Nimani yaxshilasam bo'ladi?\nYil davomida: kompyuter tuzilishi, Word, rasmlar, Excel va MB, algoritmlar, Scratch, Python, HTML, email, taqdimot.",
"quiz": [
[
"Python'da ma'lumot olish?",
[
"if",
"input()",
"print()"
],
1
],
[
"Muntazam beshburchak burilishi?",
[
"90°",
"72°",
"120°"
],
1
],
[
"Bitta obyekt satri MB'da?",
[
"Jadval",
"Yozuv",
"Maydon"
],
1
],
[
"Ikkala shart bajarilishi kerak?",
[
"NOT",
"AND",
"OR"
],
1
],
[
"Rasmiy xat qanday boshlanadi?",
[
"Hurmatli ...",
"Hey",
"Emoji"
],
0
],
[
"Xatga javobni qanday boshlaymiz?",
[
"Rahmat va murojaat bilan",
"Darhol savol",
"Haqorat"
],
0
],
[
"Eng muhim element qanday bo'lishi kerak?",
[
"Burchakda yashiringan",
"Eng kichik",
"Eng katta va ko'zga tashlanadigan"
],
2
],
[
"Animatsiyalar tartibini ko'rish?",
[
"Animatsiya paneli",
"Dizayn",
"Fayl"
],
0
],
[
"Matnni ro'yxat qilib berishning foydasi?",
[
"Kerak emas",
"Uzun bo'ladi",
"O'qish oson"
],
2
],
[
"Matnni ro'yxat qilib berishning foydasi?",
[
"Kerak emas",
"Uzun bo'ladi",
"O'qish oson"
],
2
]
]
}
]
});
