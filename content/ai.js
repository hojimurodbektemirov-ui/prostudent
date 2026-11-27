/* Sun'iy intellekt bo'limi: noldan, 17 ta dars. Har darsda nazariya, 10 ta test va interaktiv mashq (kod yozmasdan, o'zi tekshiriladi). */
{
const c = KM.c, Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
const esc = KM.esc;
const N = s => String(s).toLowerCase().replace(/[ʻʼ‘’`´]/g, "'");
const say = (el, t, ok) => { el.textContent = t; el.className = 'lab-msg ' + (ok ? 'ok' : 'no'); };

/* 1) Saralash mashqi: har bir kartaga to'g'ri yorliqni tanlash */
const sorter = (items, labels) => (host, done, u) => {
  const list = u.mix(items), pick = {};
  host.innerHTML = '<div class="lab-list">' + list.map((it, k) => '<div class="lab-row" data-k="' + k + '"><span class="lab-em">' + it[0] + '</span><span class="lab-t">' + esc(it[1]) + '<small class="lab-why" hidden>' + esc(it[3] || '') + '</small></span><span class="lab-ch">' + labels.map((l, j) => '<button class="lab-b" data-j="' + j + '">' + esc(l) + '</button>').join('') + '</span></div>').join('') + '</div><div class="acts"><button class="btn pri" id="lchk">Tekshirish</button><span class="lab-msg" id="lmsg" role="status"></span></div>';
  host.querySelectorAll('.lab-b').forEach(b => b.onclick = () => {
    const row = b.closest('.lab-row'); pick[row.dataset.k] = +b.dataset.j; row.className = 'lab-row';
    row.querySelectorAll('.lab-b').forEach(x => x.classList.toggle('on', x === b));
  });
  host.querySelector('#lchk').onclick = () => {
    let bad = 0, empty = 0;
    list.forEach((it, k) => { const row = host.querySelector('.lab-row[data-k="' + k + '"]'), p = pick[k];
      if (p == null) { empty++; return; }
      const ok = p === it[2]; if (!ok) bad++; row.className = 'lab-row ' + (ok ? 'good' : 'bad'); row.querySelector('.lab-why').hidden = ok || !it[3]; });
    const m = host.querySelector('#lmsg');
    if (empty) say(m, 'Hali ' + empty + ' ta kartaga javob bermadingiz', false);
    else if (bad) say(m, bad + ' ta xato. Qizil kartalardagi izohni o\'qib, qayta tanlang.', false);
    else { say(m, 'Hammasi to\'g\'ri! 🎉', true); done(); }
  };
};

/* 2) Moslashtirish: chapdagi narsaga o'ngdan mosini tanlash */
const matcher = pairs => (host, done, u) => {
  const opts = u.mix(pairs.map(p => p[2]));
  host.innerHTML = '<div class="lab-list">' + pairs.map((p, k) => '<label class="lab-row"><span class="lab-em">' + p[0] + '</span><span class="lab-t">' + esc(p[1]) + '</span><select class="inp sm" data-k="' + k + '"><option value="">Tanlang…</option>' + opts.map(o => '<option>' + esc(o) + '</option>').join('') + '</select></label>').join('') + '</div><div class="acts"><button class="btn pri" id="lchk">Tekshirish</button><span class="lab-msg" id="lmsg" role="status"></span></div>';
  host.querySelector('#lchk').onclick = () => {
    let bad = 0;
    host.querySelectorAll('select').forEach(s => { const ok = s.value === pairs[+s.dataset.k][2]; if (!ok) bad++; s.closest('.lab-row').className = 'lab-row ' + (ok ? 'good' : 'bad'); });
    const m = host.querySelector('#lmsg');
    if (bad) say(m, bad + ' ta juftlik noto\'g\'ri. Qizillarini o\'zgartiring.', false); else { say(m, 'Hammasi to\'g\'ri! 🎉', true); done(); }
  };
};

KM.kurs({ n: 'ai', sec: 'ai', o: 10, stage: 'orta', ic: 'AI', tag: 'Yangi bo\'lim', t: `Sun'iy intellekt`,
  d: `Noldan boshlaymiz: AI nima, mashina qanday o'rganadi, rasm va matnni qanday tushunadi, ChatGPT qanday ishlaydi va AI dan qanday to'g'ri foydalanish kerak.`,
  intro: () => '<section class="band ai-intro"><div class="wrap"><div class="ai-mods">' + [
    ['🤖', '1. AI bilan tanishuv', '1–3-darslar: AI nima, u qayerda bor, qoidali dastur va o\'rganadigan dastur farqi.'],
    ['🧠', '2. Mashina qanday o\'rganadi', '4–8-darslar: ma\'lumot, misollardan o\'rganish, belgilar, neyron va xatoni kamaytirish.'],
    ['👀', '3. AI ko\'radi, o\'qiydi, gapiradi', '9–13-darslar: rasmni tanish, matn kayfiyati, chatbot, ChatGPT va prompt yozish.'],
    ['🛡️', '4. Aqlli va xavfsiz foydalanish', '14–17-darslar: AI xatolari, odob va xavfsizlik, kasblar va o\'z AI loyihangiz.']
  ].map(m => '<div class="ai-mod"><span>' + m[0] + '</span><b>' + m[1] + '</b><p>' + m[2] + '</p></div>').join('') + '</div><p class="muted ai-how">Har darsda: qisqa nazariya → 10 ta oson test → interaktiv mashq (kod yozish shart emas, hammasi sichqoncha bilan).</p></div></section>',
  lessons: [
{
  t: `Sun'iy intellekt nima?`, min: 20,
  key: `Sun'iy intellekt (AI) misollardan o'rganib, o'zi qaror qabul qiladigan kompyuter dasturi.`,
  theory: `<p>Siz telefonga "Salom" deysiz, u javob beradi. YouTube siz yoqtiradigan videolarni o'zi topib beradi. Telefon yuzingizni tanib, qulfni ochadi. Bularning hammasida <b>sun'iy intellekt</b> ishlaydi.</p>
<p><b>Sun'iy intellekt</b> (inglizcha <b>AI</b>, Artificial Intelligence) bu odamga o'xshab <b>o'rganadigan</b>, <b>tanib oladigan</b> va <b>qaror qabul qiladigan</b> kompyuter dasturi.</p>
<div class="note">"Sun'iy" so'zi "odam yasagan" degani, "intellekt" esa "aql" degani. Demak AI odam yasagan aql.</div>
<h3>Oddiy dastur va AI farqi</h3>
<ul><li>🧮 <b>Kalkulyator</b> oddiy dastur: odam yozib qo'ygan qoidani bajaradi, hech narsa o'rganmaydi. 2 + 2 doim 4.</li><li>🗣️ <b>Ovozli yordamchi</b> AI: minglab odamlarning ovozidan o'rgangan, shuning uchun har xil talaffuzni tushunadi.</li></ul>
<p>AI ning "super kuchlari": ko'radi (rasmni taniydi), eshitadi (nutqni tushunadi), o'qiydi va yozadi (matn bilan ishlaydi), bashorat qiladi (keyin nima bo'lishini taxmin qiladi).</p>
<p>Muhim: AI tirik emas, his-tuyg'usi yo'q. U juda ko'p misollardan naqsh (qonuniyat) topadigan aqlli dastur, xolos.</p>`,
  quiz: [
    Q(`AI qaysi so'zlarning qisqartmasi?`, `Artificial Intelligence`, [`Apple Internet`, `Auto Information`], `Sun'iy intellekt.`),
    Q(`"Sun'iy" so'zi nimani bildiradi?`, `Odam yasagan`, [`Tabiiy`, `Tez`], `Tabiatda o'zi paydo bo'lmagan.`),
    Q(`Qaysi biri AI ga misol?`, `Yuzni tanib qulfni ochadigan telefon`, [`Oddiy chiroq o'chirgichi`, `Qog'oz kalkulyator`], `Yuzni tanish o'rganish orqali ishlaydi.`),
    Q(`Kalkulyator nega AI emas?`, `U o'rganmaydi, faqat tayyor qoidani bajaradi`, [`U juda kichik`, `Unda tugma bor`], `Qoida doim bir xil.`),
    Q(`AI qanday o'rganadi?`, `Ko'p misollardan`, [`Uxlab`, `Ovqat yeb`], `Misollardan naqsh topadi.`),
    Q(`AI ning his-tuyg'usi bormi?`, `Yo'q, u dastur`, [`Ha, xursand bo'ladi`, `Faqat kechasi`], `U tirik emas.`),
    Q(`YouTube tavsiyalari nimaga asoslanadi?`, `Siz ko'rgan videolarga`, [`Tasodifga, hech narsaga qaramaydi`, `Ob-havoga`], `AI sizning qiziqishingizni o'rganadi.`),
    Q(`AI ning "super kuchlari"dan biri?`, `Rasmni tanish`, [`Uchish`, `Ko'rinmas bo'lish`], `Ko'rish, eshitish, o'qish, bashorat.`),
    Q(`Naqsh (qonuniyat) nima?`, `Takrorlanadigan o'xshashlik`, [`Rasm chizish`, `Kompyuter qismi`], `Masalan: mushuklarning hammasida mo'ylov bor.`),
    Q(`"Intellekt" so'zining ma'nosi?`, `Aql`, [`Kompyuter`, `Internet`], `Intellekt: aql, fahm.`)
  ],
  prac: { type: 'lab', task: `Har bir narsa uchun tanlang: u <b>AI</b> bilan ishlaydimi yoki <b>oddiy dastur/qurilma</b>mi? Keyin "Tekshirish" ni bosing.`,
    lab: sorter([
      ['🗣️', 'Ovozli yordamchi (Siri, Alisa)', 0, 'Nutqni tushunish uchun ko\'p ovozlardan o\'rgangan.'],
      ['🧮', 'Kalkulyator', 1, 'Faqat tayyor qoidalarni bajaradi.'],
      ['📱', 'Yuz bilan ochiladigan telefon', 0, 'Yuzingizni tanishni o\'rgangan.'],
      ['💡', 'Chiroq o\'chirgichi', 1, 'Oddiy qurilma: yoq/o\'chir.'],
      ['🌐', 'Google Tarjimon', 0, 'Millionlab matnlardan o\'rgangan.'],
      ['⏰', 'Oddiy budilnik', 1, 'Belgilangan vaqtda chalinadi, xolos.'],
      ['📧', 'Spam xatlarni ajratuvchi filtr', 0, 'Spam xatlar misollaridan o\'rganadi.'],
      ['♟️', 'Shaxmat o\'ynaydigan kompyuter', 0, 'Millionlab o\'yinlardan o\'rgangan.'],
      ['🔦', 'Fonar', 1, 'Hech narsa o\'rganmaydi.'],
      ['🤖', 'ChatGPT', 0, 'Juda katta matnlardan o\'rgangan til modeli.']
    ], ['AI', 'Oddiy']) }
},
{
  t: `AI atrofimizda`, min: 20,
  key: `AI har kuni yonimizda: telefonda, internetda, mashinada, shifoxonada va maktabda.`,
  theory: `<p>AI ni ko'rmasangiz ham, u har kuni sizga yordam beradi:</p>
<ul><li>📸 <b>Kamera</b>: yuzni topib, fokusni to'g'rilaydi.</li><li>🎵 <b>Musiqa ilovalari</b>: sizga yoqadigan qo'shiqlarni taklif qiladi.</li><li>🗺️ <b>Xarita</b>: tirbandlikni bashorat qilib, tez yo'lni topadi.</li><li>🚗 <b>O'zi yuradigan mashina</b>: yo'lni, odamlarni va svetoforni "ko'radi".</li><li>🏥 <b>Shifoxona</b>: rentgen rasmlarida kasallik belgilarini topishga yordam beradi.</li><li>🌾 <b>Qishloq xo'jaligi</b>: dron rasmlaridan qaysi o'simlik kasal ekanini aniqlaydi.</li><li>📚 <b>Ta'lim</b>: savollarga tushuntirish beradi, tarjima qiladi.</li></ul>
<p>AI ning asosiy vazifalari bir nechta: <b>tanish</b> (bu nima?), <b>bashorat qilish</b> (keyin nima bo'ladi?), <b>tavsiya qilish</b> (sizga nima yoqadi?) va <b>yaratish</b> (yangi matn yoki rasm).</p>`,
  quiz: [
    Q(`Xarita ilovasida AI nima qiladi?`, `Tirbandlikni bashorat qilib yo'l topadi`, [`Ko'chalarni bo'yaydi`, `Mashinani yuvadi`], `Bashorat.`),
    Q(`Musiqa ilovasidagi AI?`, `Yoqadigan qo'shiqlarni tavsiya qiladi`, [`Qo'shiqni o'chiradi`, `Telefonni zaryadlaydi`], `Tavsiya.`),
    Q(`Shifoxonada AI nimaga yordam beradi?`, `Rentgen rasmlarini tahlil qilishga`, [`Ovqat pishirishga`, `Pol yuvishga`], `Tasvirni tanish.`),
    Q(`O'zi yuradigan mashina nimani "ko'radi"?`, `Yo'l, odamlar, svetofor`, [`Faqat radioni`, `Hech narsani`], `Kompyuter ko'rishi.`),
    Q(`"Keyin nima bo'ladi?" savoliga javob beruvchi vazifa?`, `Bashorat`, [`Tanish`, `Bo'yash`], `Prognoz.`),
    Q(`"Bu nima?" vazifasi?`, `Tanish`, [`Yaratish`, `Tavsiya`], `Masalan: rasmda mushuk.`),
    Q(`Yangi rasm yoki matn yaratish?`, `Generativ AI`, [`Kalkulyator`, `Fonar`], `Generativ: yaratuvchi.`),
    Q(`Dron va AI qishloq xo'jaligida?`, `Kasal o'simliklarni aniqlaydi`, [`Sigir boqadi`, `Yomg'ir yog'diradi`], `Rasm tahlili.`),
    Q(`Kamera yuzni topishi qaysi vazifa?`, `Tanish`, [`Bashorat`, `Tavsiya`], `Yuzni aniqlash.`),
    Q(`AI faqat telefonda bormi?`, `Yo'q, ko'p sohalarda`, [`Ha`, `Faqat o'yinlarda`], `Tibbiyot, transport, ta'lim...`)
  ],
  prac: { type: 'lab', task: `Har bir joy uchun AI u yerda <b>nima qilishini</b> tanlang.`,
    lab: matcher([
      ['🗺️', 'Xarita ilovasi', 'Tez yo\'lni topadi'],
      ['🎵', 'Musiqa ilovasi', 'Yoqadigan qo\'shiq tavsiya qiladi'],
      ['🏥', 'Shifoxona', 'Rentgen rasmini tahlil qiladi'],
      ['🚗', 'O\'zi yuradigan mashina', 'Svetofor va odamlarni ko\'radi'],
      ['🌐', 'Tarjimon', 'Matnni boshqa tilga o\'giradi'],
      ['📸', 'Telefon kamerasi', 'Yuzni topib fokuslaydi']
    ]) }
},
{
  t: `Qoidalar va qaror daraxti`, min: 25,
  key: `Oddiy dastur odam yozgan "Agar ... bo'lsa" qoidalari bilan ishlaydi. Qaror daraxti shunday savollar zanjiri.`,
  theory: `<p>AI dan oldin dasturlar faqat <b>qoidalar</b> bilan ishlagan. Dasturchi hamma narsani oldindan yozib qo'yadi:</p>
<div class="note">Agar svetofor <b>qizil</b> bo'lsa → to'xta. Agar <b>yashil</b> bo'lsa → yur.</div>
<p>Ko'p qoidalarni <b>qaror daraxti</b> shaklida chizish mumkin. Bu "Ha / Yo'q" savollar zanjiri:</p>
<ul><li>❓ Uchadimi? → <b>Ha</b>: qush 🐦</li><li>❓ <b>Yo'q</b> bo'lsa: Suvda suzadimi? → <b>Ha</b>: baliq 🐟</li><li>❓ <b>Yo'q</b> bo'lsa: Oyog'i bormi? → <b>Ha</b>: it 🐕, <b>Yo'q</b>: ilon 🐍</li></ul>
<p>Muammo: dunyo juda murakkab. Mushukni rasmdan tanish uchun hamma qoidani yozib bo'lmaydi (mushuk yotgan, yugurgan, qorong'ida...). Shuning uchun olimlar kompyuterga qoidani <b>o'zi topishni</b> o'rgatishdi. Bu <b>mashinali o'qitish</b> (machine learning) deyiladi. Keyingi darslarda shuni ko'ramiz.</p>`,
  quiz: [
    Q(`Oddiy dastur nima bilan ishlaydi?`, `Odam yozgan qoidalar bilan`, [`O'zi o'ylab topgan qoidalar bilan`, `Hech narsasiz`], `Dasturchi yozadi.`),
    Q(`Qaror daraxti nima?`, `Ha/Yo'q savollar zanjiri`, [`Haqiqiy daraxt`, `Rasm chizish dasturi`], `Savollar orqali qaror.`),
    Q(`"Agar qizil bo'lsa, to'xta" bu?`, `Qoida`, [`Rasm`, `Ma'lumot bazasi`], `Agar-unda.`),
    Q(`Daraxtda "Uchadimi?" → Ha. Javob?`, `Qush`, [`Baliq`, `Ilon`], `Uchadigan hayvon.`),
    Q(`Uchmaydi, suvda suzadi. Kim?`, `Baliq`, [`Qush`, `It`], `Ikkinchi savol.`),
    Q(`Uchmaydi, suzmaydi, oyog'i yo'q?`, `Ilon`, [`It`, `Qush`], `Oxirgi barg.`),
    Q(`Nega hamma narsaga qoida yozib bo'lmaydi?`, `Dunyo juda murakkab`, [`Kompyuter qoidani yoqtirmaydi`, `Qoidalar taqiqlangan`], `Holatlar cheksiz ko'p.`),
    Q(`Qoidani o'zi topadigan dastur nima deyiladi?`, `Mashinali o'qitish`, [`Kalkulyator`, `Brauzer`], `Machine learning.`),
    Q(`Qaror daraxtida har bir savolning nechta javobi bor?`, `Ikkita: Ha yoki Yo'q`, [`O'nta`, `Bitta`], `Ikkilik savol.`),
    Q(`Daraxtning oxiridagi javoblar nima deyiladi?`, `Barglar (natija)`, [`Ildiz`, `Shox`], `Yakuniy qaror.`)
  ],
  prac: { type: 'lab', task: `Qaror daraxtini to'ldiring: savollar va javoblarni shunday tanlangki, 4 ta hayvonning har biri <b>o'z</b> bargiga tushsin.`,
    lab: (host, done) => {
      const A = { '🐦 Qush': { u: 1, s: 0, o: 1 }, '🐟 Baliq': { u: 0, s: 1, o: 0 }, '🐕 It': { u: 0, s: 0, o: 1 }, '🐍 Ilon': { u: 0, s: 0, o: 0 } };
      const QS = { u: 'Uchadimi?', s: 'Suvda suzadimi?', o: 'Oyog\'i bormi?' }, an = Object.keys(A);
      const qs = id => '<select class="inp sm" id="' + id + '"><option value="">savol…</option>' + Object.keys(QS).map(k => '<option value="' + k + '">' + QS[k] + '</option>').join('') + '</select>';
      const as = id => '<select class="inp sm" id="' + id + '"><option value="">javob…</option>' + an.map(a => '<option>' + a + '</option>').join('') + '</select>';
      host.innerHTML = '<div class="tree"><div class="tn">1. ' + qs('q1') + '<div class="tb"><span>Ha →</span>' + as('a1') + '</div><div class="tb"><span>Yo\'q ↓</span></div>' +
        '<div class="tn in">2. ' + qs('q2') + '<div class="tb"><span>Ha →</span>' + as('a2') + '</div><div class="tb"><span>Yo\'q ↓</span></div>' +
        '<div class="tn in">3. ' + qs('q3') + '<div class="tb"><span>Ha →</span>' + as('a3') + '</div><div class="tb"><span>Yo\'q →</span>' + as('a4') + '</div></div></div></div></div>' +
        '<div class="acts"><button class="btn pri" id="lchk">Daraxtni sinash</button><span class="lab-msg" id="lmsg" role="status"></span></div><div class="lab-out" id="lout"></div>';
      const v = id => host.querySelector('#' + id).value;
      host.querySelector('#lchk').onclick = () => {
        const m = host.querySelector('#lmsg');
        if (['q1', 'q2', 'q3', 'a1', 'a2', 'a3', 'a4'].some(id => !v(id))) return say(m, 'Hamma savol va javoblarni tanlang', false);
        const go = x => x[v('q1')] ? v('a1') : x[v('q2')] ? v('a2') : x[v('q3')] ? v('a3') : v('a4');
        const res = an.map(a => [a, go(A[a])]), ok = res.every(r => r[0] === r[1]);
        host.querySelector('#lout').innerHTML = res.map(r => '<div class="lab-row ' + (r[0] === r[1] ? 'good' : 'bad') + '"><span class="lab-t">' + r[0] + ' → daraxt javobi: <b>' + r[1] + '</b></span></div>').join('');
        if (ok) { say(m, 'Daraxt hamma hayvonni to\'g\'ri ajratdi! 🌳', true); done(); } else say(m, 'Ba\'zi hayvonlar noto\'g\'ri bargga tushdi. Savollar tartibini o\'zgartirib ko\'ring.', false);
      };
    } }
},
{
  t: `Ma'lumot: AI ning ovqati`, min: 20,
  key: `AI ma'lumotdan o'rganadi. Ma'lumot ko'p, to'g'ri va belgilangan (yorliqli) bo'lishi kerak.`,
  theory: `<p>Bola mushukni qanday taniydi? Kattalar ko'p marta ko'rsatib "Bu mushuk" deydi. AI ham xuddi shunday: unga <b>ko'p misollar</b> ko'rsatiladi.</p>
<p>Bu misollar <b>ma'lumot</b> (data) deyiladi. Rasm, matn, ovoz, sonlar: hammasi ma'lumot.</p>
<h3>Yorliq (label)</h3>
<p>Har bir misolga to'g'ri javob yoziladi: 🍎 rasmiga "meva", 🥕 rasmiga "sabzavot". Bu <b>yorliq</b> deyiladi. Odamlar minglab rasmlarga yorliq qo'yadi, AI ulardan o'rganadi.</p>
<h3>Yaxshi ma'lumot qoidalari</h3>
<ol><li><b>Ko'p</b>: 3 ta rasmdan o'rganib bo'lmaydi, minglab kerak.</li><li><b>To'g'ri</b>: mushuk rasmiga "it" deb yozilsa, AI chalkashadi.</li><li><b>Har xil</b>: faqat oq mushuklarni ko'rsatsangiz, AI qora mushukni tanimaydi.</li></ol>
<div class="note">Dasturchilar aytadi: "Yomon ma'lumot kirsa, yomon natija chiqadi".</div>`,
  quiz: [
    Q(`AI nimadan o'rganadi?`, `Ma'lumotdan (misollardan)`, [`Havodan`, `Elektrdan`], `Data.`),
    Q(`Yorliq (label) nima?`, `Misolning to'g'ri javobi`, [`Kompyuter nomi`, `Rasm rangi`], `"Bu mushuk".`),
    Q(`Ma'lumotga misol?`, `Rasmlar, matnlar, ovozlar`, [`Faqat sonlar`, `Faqat videolar`], `Hammasi ma'lumot.`),
    Q(`Mushuk rasmiga "it" yorlig'i qo'yilsa?`, `AI chalkashadi`, [`AI tezlashadi`, `Hech narsa bo'lmaydi`], `Xato ma'lumot.`),
    Q(`Faqat oq mushuklardan o'rgangan AI?`, `Qora mushukni tanimasligi mumkin`, [`Hamma mushukni taniydi`, `It bo'lib qoladi`], `Ma'lumot har xil bo'lishi kerak.`),
    Q(`Yaxshi ma'lumot qanday?`, `Ko'p, to'g'ri, har xil`, [`Kam va bir xil`, `Faqat bitta rasm`], `Uch qoida.`),
    Q(`"Yomon ma'lumot kirsa..."`, `yomon natija chiqadi`, [`yaxshi natija chiqadi`, `kompyuter o'chadi`], `Garbage in, garbage out.`),
    Q(`Yorliqlarni kim qo'yadi?`, `Ko'pincha odamlar`, [`Quyosh`, `Printer`], `Ma'lumotni belgilash ishi.`),
    Q(`AI ni o'rgatish uchun nechta misol kerak?`, `Ko'p (minglab)`, [`1 ta`, `3 ta`], `Qancha ko'p bo'lsa, shuncha yaxshi.`),
    Q(`Bola va AI o'rganishining o'xshashligi?`, `Ikkalasi ham ko'p misol ko'rib o'rganadi`, [`O'xshashligi yo'q`, `Ikkalasi ham uxlaydi`], `Misollar orqali.`)
  ],
  prac: { type: 'lab', task: `Siz "ma'lumot belgilovchi"siz! Har bir rasmga to'g'ri yorliq qo'ying: <b>Meva</b> yoki <b>Sabzavot</b>. AI aynan shunday ma'lumotlardan o'rganadi.`,
    lab: sorter([
      ['🍎', 'Olma', 0], ['🥕', 'Sabzi', 1], ['🍌', 'Banan', 0], ['🥔', 'Kartoshka', 1], ['🍇', 'Uzum', 0],
      ['🧅', 'Piyoz', 1], ['🍐', 'Nok', 0], ['🥒', 'Bodring', 1], ['🍑', 'Shaftoli', 0], ['🥬', 'Karam', 1]
    ], ['Meva', 'Sabzavot']) }
},
{
  t: `Mashina misollardan o'rganadi`, min: 30,
  key: `"Eng yaqin qo'shni" usuli: yangi narsa o'ziga eng o'xshash (eng yaqin) misolning yorlig'ini oladi.`,
  theory: `<p>Mashinali o'qitishning eng oddiy usullaridan biri <b>"eng yaqin qo'shni"</b>. G'oyasi juda oddiy:</p>
<div class="note">"Menga do'stingni ayt, men sening kimligingni aytaman." Yangi narsa kimga eng o'xshasa, o'shaning guruhiga qo'shiladi.</div>
<p>Masalan, hayvonlarni ikki belgi bo'yicha joylashtiramiz: <b>quloq uzunligi</b> va <b>og'irligi</b>. Mushuklar 🐱 bir joyda, itlar 🐶 boshqa joyda to'planadi. Yangi noma'lum hayvon ❓ keldi: unga eng yaqin turgan misol mushuk bo'lsa, AI "bu mushuk" deydi.</p>
<p>Bu yerda AI ga hech kim qoida yozmadi. U faqat <b>misollar</b> (o'quv ma'lumoti) ko'rdi. Misollar qancha yaxshi joylashgan bo'lsa, javob shuncha to'g'ri bo'ladi.</p>
<p>Ikki bosqich bor: <b>o'qitish</b> (misollarni ko'rsatish) va <b>sinash</b> (yangi narsalarda tekshirish).</p>`,
  quiz: [
    Q(`"Eng yaqin qo'shni" usulida yangi narsa qanday yorliq oladi?`, `Eng yaqin misolning yorlig'ini`, [`Tasodifiy yorliqni`, `Eng uzoq misolnikini`], `Eng o'xshashi.`),
    Q(`Bu usulda qoidani kim yozadi?`, `Hech kim, misollar yetarli`, [`Dasturchi har birini`, `O'qituvchi`], `Misollardan o'rganadi.`),
    Q(`Mashinali o'qitishning ikki bosqichi?`, `O'qitish va sinash`, [`Yozish va o'chirish`, `Yoqish va o'chirish`], `Train / test.`),
    Q(`Belgilarga misol (hayvonlar uchun)?`, `Quloq uzunligi, og'irlik`, [`Ismi`, `Tug'ilgan kuni`], `O'lchanadigan xususiyatlar.`),
    Q(`O'xshash narsalar grafikda qanday turadi?`, `Bir-biriga yaqin`, [`Juda uzoq`, `Ko'rinmaydi`], `Guruh bo'lib.`),
    Q(`Noto'g'ri joylashgan misol nima qiladi?`, `AI ni chalg'itadi`, [`Yordam beradi`, `Hech narsa`], `Yomon ma'lumot.`),
    Q(`O'quv ma'lumoti nima?`, `AI o'rganadigan misollar`, [`Sinov savollari`, `Kompyuter xotirasi`], `Training data.`),
    Q(`Sinash nima uchun kerak?`, `AI to'g'ri ishlashini tekshirish uchun`, [`Vaqt o'tkazish uchun`, `Kerak emas`], `Yangi misollarda tekshiriladi.`),
    Q(`"Menga do'stingni ayt..." maqoli qaysi usulga o'xshaydi?`, `Eng yaqin qo'shni`, [`Kalkulyator`, `Qaror daraxti`], `O'xshashlik bo'yicha.`),
    Q(`Ko'proq to'g'ri misollar qo'shilsa?`, `AI aniqroq ishlaydi`, [`AI yomonlashadi`, `O'zgarmaydi`], `Ma'lumot ko'paydi.`)
  ],
  prac: { type: 'lab', task: `AI ni o'zingiz o'qiting! Yuqoridan guruhni tanlang va maydonga bosib misollar qo'ying. Uchta ❓ hayvonni AI to'g'ri tanishi kerak (ularning haqiqiy javobi kulrang yozilgan). Har guruhdan kamida 2 ta misol qo'ying.`,
    lab: (host, done) => {
      const tests = [[30, 22, 'cat'], [72, 70, 'dog'], [40, 78, 'dog']], pts = []; let cls = 'cat', fin = false;
      const em = { cat: '🐱', dog: '🐶' };
      host.innerHTML = '<div class="acts"><button class="btn sm on" data-c="cat">🐱 Mushuk misoli</button><button class="btn sm" data-c="dog">🐶 It misoli</button><button class="btn sm" id="clr">Tozalash</button></div>' +
        '<div class="knn" id="knn"><span class="ax ax-x">quloq uzunligi →</span><span class="ax ax-y">og\'irligi →</span></div><span class="lab-msg" id="lmsg" role="status">Maydonga bosib misol qo\'shing.</span>';
      const box = host.querySelector('#knn'), m = host.querySelector('#lmsg');
      host.querySelectorAll('[data-c]').forEach(b => b.onclick = () => { cls = b.dataset.c; host.querySelectorAll('[data-c]').forEach(x => x.classList.toggle('on', x === b)); });
      const near = (x, y) => { let best = null, d = 1e9; pts.forEach(p => { const q = (p[0] - x) ** 2 + (p[1] - y) ** 2; if (q < d) { d = q; best = p[2]; } }); return best; };
      const draw = () => {
        box.querySelectorAll('.pt').forEach(n => n.remove());
        pts.forEach(p => box.insertAdjacentHTML('beforeend', '<span class="pt" style="left:' + p[0] + '%;top:' + (100 - p[1]) + '%">' + em[p[2]] + '</span>'));
        let ok = 0;
        tests.forEach(t => { const g = near(t[0], t[1]), good = g === t[2]; if (good) ok++;
          box.insertAdjacentHTML('beforeend', '<span class="pt tq ' + (g ? (good ? 'good' : 'bad') : '') + '" style="left:' + t[0] + '%;top:' + (100 - t[1]) + '%">❓<small>AI: ' + (g ? em[g] : '?') + ' · aslida ' + em[t[2]] + '</small></span>'); });
        const nc = pts.filter(p => p[2] === 'cat').length, nd = pts.length - nc;
        if (ok === 3 && nc >= 2 && nd >= 2) { say(m, 'Zo\'r! AI uchala hayvonni to\'g\'ri tanidi. Siz modelni o\'qitdingiz! 🎉', true); if (!fin) { fin = true; done(); } }
        else if (ok === 3) say(m, 'Uchalasi to\'g\'ri, lekin har guruhdan kamida 2 ta misol qo\'ying.', false);
        else say(m, ok + ' / 3 to\'g\'ri. Qizil ❓ yoniga to\'g\'ri guruhdan misol qo\'shing.', false);
      };
      box.onclick = ev => { if (ev.target.closest('.tq')) return; const r = box.getBoundingClientRect(); pts.push([Math.round((ev.clientX - r.left) / r.width * 100), Math.round(100 - (ev.clientY - r.top) / r.height * 100), cls]); draw(); };
      host.querySelector('#clr').onclick = () => { pts.length = 0; draw(); };
      draw();
    } }
},
{
  t: `Belgilar: AI nimaga qaraydi?`, min: 20,
  key: `Belgi (xususiyat) narsalarni bir-biridan farqlashga yordam beradigan o'lchov. Yaxshi belgi guruhlarni aniq ajratadi.`,
  theory: `<p>O'tgan darsda AI hayvonlarni <b>quloq uzunligi</b> va <b>og'irlik</b> bo'yicha ajratdi. Bular <b>belgilar</b> (xususiyatlar) deyiladi.</p>
<p>Hamma belgi ham foydali emas. Mushuk va itni farqlash uchun:</p>
<ul><li>✅ <b>Foydali</b>: ovozi (miyov / vov), tumshug'i uzunligi, quloq shakli. Ular mushukda va itda har xil.</li><li>❌ <b>Foydasiz</b>: ko'zlar soni (ikkalasida 2 ta), dumi bormi (ikkalasida bor), egasining ismi.</li></ul>
<div class="note">Yaxshi belgi: bir guruhda bir xil, boshqa guruhda boshqacha bo'ladi.</div>
<p>Zamonaviy AI (neyron tarmoqlar) belgilarni ko'pincha o'zi topadi: millionlab rasm ko'rib, "quloq", "mo'ylov", "ko'z shakli" kabi naqshlarni o'zi ajratadi.</p>`,
  quiz: [
    Q(`Belgi (xususiyat) nima?`, `Narsani tavsiflovchi o'lchov`, [`Rasm nomi`, `Kompyuter qismi`], `Masalan: og'irlik.`),
    Q(`Mushuk va itni farqlash uchun foydali belgi?`, `Ovozi`, [`Ko'zlar soni`, `Egasining ismi`], `Miyov va vov.`),
    Q(`Ko'zlar soni nega foydasiz?`, `Ikkalasida ham 2 ta`, [`Ko'z ko'rinmaydi`, `Sanab bo'lmaydi`], `Farq qilmaydi.`),
    Q(`Yaxshi belgi qanday?`, `Guruhlarni aniq ajratadi`, [`Hamma uchun bir xil`, `Tasodifiy`], `Farqlovchi.`),
    Q(`Olma va bananni farqlash uchun foydali belgi?`, `Shakli`, [`Meva ekanligi`, `Do'kondagi narxi`], `Dumaloq va uzunchoq.`),
    Q(`Neyron tarmoqlar belgilarni qanday topadi?`, `Ko'p misollardan o'zi`, [`Faqat odam yozsa`, `Topa olmaydi`], `Avtomatik.`),
    Q(`Belgining boshqa nomi?`, `Xususiyat`, [`Yorliq`, `Natija`], `Feature.`),
    Q(`Yorliq va belgi farqi?`, `Belgi tavsif, yorliq to'g'ri javob`, [`Farqi yo'q`, `Yorliq o'lchov`], `Feature va label.`),
    Q(`"Dumi bormi?" mushuk va itni farqlaydimi?`, `Yo'q`, [`Ha`, `Faqat yozda`], `Ikkalasida bor.`),
    Q(`Odam va AI uchun ham belgilar muhimmi?`, `Ha, biz ham belgilarga qarab taniymiz`, [`Yo'q`, `Faqat AI uchun`], `Masalan, ovozdan tanish.`)
  ],
  prac: { type: 'lab', task: `Vazifa: AI <b>mushuk 🐱 va itni 🐶</b> farqlashi kerak. Har bir belgi foydalimi yoki foydasizmi?`,
    lab: sorter([
      ['🔊', 'Ovozi (miyov yoki vov)', 0, 'Mushuk va itda har xil.'],
      ['👀', 'Ko\'zlari soni', 1, 'Ikkalasida ham 2 ta.'],
      ['👃', 'Tumshug\'ining uzunligi', 0, 'Itlarda odatda uzunroq.'],
      ['🦵', 'Oyoqlari soni', 1, 'Ikkalasida ham 4 ta.'],
      ['👂', 'Quloq shakli', 0, 'Mushukda uchli, ko\'p itlarda osilgan.'],
      ['🏷️', 'Egasining ismi', 1, 'Hayvonga aloqasi yo\'q.'],
      ['🌈', 'Rasm olingan kun', 1, 'Hayvonga aloqasi yo\'q.'],
      ['🐾', 'Tirnoqlarini yashira oladimi', 0, 'Mushuklar yashira oladi, itlar yo\'q.']
    ], ['Foydali', 'Foydasiz']) }
},
{
  t: `Sun'iy neyron qanday ishlaydi?`, min: 30,
  key: `Neyron kirishlarni og'irliklarga ko'paytirib qo'shadi. Yig'indi chegaradan oshsa, "Ha" deydi. O'qitish = og'irliklarni to'g'rilash.`,
  theory: `<p>Miyamizda milliardlab <b>neyron</b> (asab hujayrasi) bor. Olimlar ulardan ilhomlanib <b>sun'iy neyron</b> o'ylab topishdi. U juda oddiy hisob qiladi:</p>
<ol><li>Bir nechta <b>kirish</b> oladi (masalan: ☀️ havo yaxshimi? 📚 uy vazifasi bormi?). Ha = 1, Yo'q = 0.</li><li>Har bir kirishning <b>og'irligi</b> (muhimligi) bor. Muhim narsaning og'irligi katta, xalaqit beradigan narsaniki manfiy.</li><li>Hammasini ko'paytirib qo'shadi.</li><li>Yig'indi <b>chegaradan</b> katta yoki teng bo'lsa: "Ha", bo'lmasa "Yo'q".</li></ol>
<div class="note">Misol: ☀️ ning og'irligi 3, 📚 niki −4, chegara 2. Havo yaxshi va vazifa yo'q: 3·1 + (−4)·0 = 3 ≥ 2 → sayrga chiqaman!</div>
<p><b>O'qitish</b> degani: og'irliklarni shunday tanlashki, neyron hamma misolda to'g'ri javob bersin. Kompyuter buni o'zi minglab marta ozgina-ozgina to'g'rilab qiladi. ChatGPT kabi katta modellarda shunday "og'irliklar" <b>milliardlab</b>!</p>
<p>Ko'p neyronlar qatlam-qatlam ulansa, <b>neyron tarmoq</b> hosil bo'ladi.</p>`,
  quiz: [
    Q(`Sun'iy neyron nimadan ilhomlangan?`, `Miyadagi asab hujayrasidan`, [`Kompyuter sichqonchasidan`, `Daraxtdan`], `Biologik neyron.`),
    Q(`Og'irlik nimani bildiradi?`, `Kirishning muhimligini`, [`Neyron vaznini kilogrammda`, `Rangini`], `Weight.`),
    Q(`Xalaqit beradigan narsaning og'irligi qanday?`, `Manfiy`, [`Juda katta musbat`, `Doim 0`], `Javobni kamaytiradi.`),
    Q(`Yig'indi chegaradan katta bo'lsa?`, `"Ha"`, [`"Yo'q"`, `Neyron o'chadi`], `Faollashadi.`),
    Q(`3·1 + (−4)·1 = ?`, `−1`, [`7`, `1`], `3 − 4.`),
    Q(`O'qitish nima degani?`, `Og'irliklarni to'g'rilash`, [`Neyronni o'chirish`, `Kirishlarni yashirish`], `Javoblar to'g'ri bo'lguncha.`),
    Q(`Ko'p neyronlar ulansa nima hosil bo'ladi?`, `Neyron tarmoq`, [`Internet`, `Daraxt`], `Neural network.`),
    Q(`Kirishlar qanday qiymatlar bo'lishi mumkin (bizning misolda)?`, `1 (ha) yoki 0 (yo'q)`, [`Faqat 100`, `Harflar`], `Ikkilik.`),
    Q(`Katta AI modellarida nechta og'irlik bo'ladi?`, `Milliardlab`, [`2 ta`, `10 ta`], `Juda katta.`),
    Q(`Og'irliklarni kim tanlaydi (katta modellarda)?`, `Kompyuter o'qitish jarayonida o'zi`, [`Har birini odam`, `Tasodifan, o'zgarmaydi`], `Avtomatik o'qitish.`)
  ],
  prac: { type: 'lab', task: `Neyronni o'qiting! Og'irliklar va chegarani suring, shunda neyron jadvaldagi <b>hamma</b> holatda kerakli javobni bersin (✓ yashil bo'lsin).`,
    lab: (host, done) => {
      const IN = [['☀️', 'Havo yaxshi'], ['📚', 'Uy vazifasi bor'], ['👫', 'Do\'stim chaqirdi']];
      const CASES = [[[1, 0, 0], 1], [[1, 1, 0], 0], [[0, 0, 1], 1], [[0, 1, 0], 0], [[1, 1, 1], 1]];
      const w = [0, 0, 0]; let b = 1, fin = false;
      host.innerHTML = '<div class="neu"><div class="neu-w">' + IN.map((x, k) => '<label class="sl"><span>' + x[0] + ' ' + x[1] + ' og\'irligi: <b id="wv' + k + '">0</b></span><input type="range" min="-5" max="5" step="1" value="0" data-k="' + k + '"></label>').join('') +
        '<label class="sl"><span>🎯 Chegara: <b id="bv">1</b></span><input type="range" min="0" max="5" step="1" value="1" id="bs"></label></div>' +
        '<div class="scroll"><table class="mdt"><thead><tr><th>☀️</th><th>📚</th><th>👫</th><th>Yig\'indi</th><th>Neyron</th><th>Kerak</th><th></th></tr></thead><tbody id="tb"></tbody></table></div></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const m = host.querySelector('#lmsg');
      const upd = () => {
        let ok = 0;
        host.querySelector('#tb').innerHTML = CASES.map(cs => { const s = cs[0].reduce((a, x, k) => a + x * w[k], 0), out = s >= b ? 1 : 0, g = out === cs[1]; if (g) ok++;
          return '<tr class="' + (g ? 'good' : 'bad') + '">' + cs[0].map(x => '<td>' + (x ? 'Ha' : 'Yo\'q') + '</td>').join('') + '<td>' + s + '</td><td>' + (out ? '🚶 Sayr' : '🏠 Uyda') + '</td><td>' + (cs[1] ? '🚶 Sayr' : '🏠 Uyda') + '</td><td>' + (g ? '✓' : '✗') + '</td></tr>'; }).join('');
        if (ok === CASES.length) { say(m, 'Neyron hamma holatda to\'g\'ri javob berdi! Siz uni o\'qitdingiz 🧠', true); if (!fin) { fin = true; done(); } }
        else say(m, ok + ' / ' + CASES.length + ' to\'g\'ri. Maslahat: uy vazifasi xalaqit beradi (manfiy), do\'st esa juda muhim.', false);
      };
      host.querySelectorAll('[data-k]').forEach(r => r.oninput = () => { w[+r.dataset.k] = +r.value; host.querySelector('#wv' + r.dataset.k).textContent = r.value; upd(); });
      host.querySelector('#bs').oninput = e => { b = +e.target.value; host.querySelector('#bv').textContent = b; upd(); };
      upd();
    } }
},
{
  t: `O'qitish: xatoni kamaytirish`, min: 25,
  key: `AI javobi va to'g'ri javob orasidagi farq xato deyiladi. O'qitish xatoni qadam-baqadam kamaytirish.`,
  theory: `<p>AI qanday "yaxshilanadi"? U har safar o'z javobini to'g'ri javob bilan solishtiradi. Farq <b>xato</b> deyiladi.</p>
<p>Basketbolni eslang: to'p savatdan chapga ketdi, keyingi safar biroz o'ngga otasiz. Yana biroz... va nihoyat tushadi! AI ham shunday: har qadamda og'irliklarni <b>ozgina</b> o'zgartirib, xatoni kamaytiradi.</p>
<p>Oddiy misol: o'quvchilar necha soat o'qisa, qancha ball olishini bashorat qilamiz. Nuqtalar ma'lumot, <b>chiziq</b> esa AI ning "qoidasi". Chiziq nuqtalarga qancha yaqin o'tsa, xato shuncha kichik.</p>
<ul><li><b>Qiyalik</b>: chiziq qanchalik tik ko'tariladi.</li><li><b>Boshlanish</b>: chiziq qayerdan boshlanadi.</li></ul>
<div class="note">Kompyuter qiyalik va boshlanishni avtomatik, minglab marta ozgina o'zgartirib, eng kichik xatoni topadi. Mashqda buni siz qo'lda qilasiz.</div>`,
  quiz: [
    Q(`Xato nima?`, `AI javobi va to'g'ri javob farqi`, [`Kompyuter buzilishi`, `Yomon internet`], `Error.`),
    Q(`O'qitishda AI nima qiladi?`, `Xatoni kamaytiradi`, [`Xatoni oshiradi`, `Hech narsa`], `Asta-sekin.`),
    Q(`Basketbol misolida to'p chapga ketsa?`, `Keyingi safar biroz o'ngga otamiz`, [`Otishni to'xtatamiz`, `Ko'zni yumamiz`], `To'g'rilash.`),
    Q(`Chiziq nuqtalarga yaqin o'tsa xato?`, `Kichik`, [`Katta`, `O'zgarmaydi`], `Yaxshi moslashgan.`),
    Q(`Og'irliklar qanday o'zgartiriladi?`, `Ozgina-ozgina, ko'p marta`, [`Bir martada butunlay`, `Hech qachon`], `Qadam-baqadam.`),
    Q(`Qiyalik nima?`, `Chiziqning tikligi`, [`Chiziq rangi`, `Nuqtalar soni`], `Slope.`),
    Q(`Nuqtalar bu misolda nima?`, `Ma'lumot (misollar)`, [`Xatolar`, `Bezak`], `Haqiqiy o'quvchilar.`),
    Q(`Chiziq nima?`, `AI ning bashorat qoidasi`, [`Xato`, `Chegara`], `Model.`),
    Q(`O'qitish qachon tugaydi?`, `Xato yetarlicha kichik bo'lganda`, [`Kompyuter qizib ketganda`, `Darhol`], `Maqsadga yetganda.`),
    Q(`Ko'proq o'qigan o'quvchi bali (bu misolda)?`, `Yuqoriroq`, [`Pastroq`, `Bir xil`], `Chiziq ko'tariladi.`)
  ],
  prac: { type: 'lab', task: `Chiziqni nuqtalarga moslang: <b>qiyalik</b> va <b>boshlanish</b> ni surib, <b>o'rtacha xato</b> 0.6 dan kichik bo'lsin.`,
    lab: (host, done) => {
      const P = [[1, 3.2], [2, 4.8], [3, 7.3], [4, 8.9], [5, 11.2], [6, 12.8], [7, 15.1], [8, 17.0]];
      let k = 0.5, b0 = 6, fin = false;
      host.innerHTML = '<svg class="fit" viewBox="0 0 100 70" preserveAspectRatio="none" id="sv"></svg><div class="neu-w two"><label class="sl"><span>📈 Qiyalik: <b id="kv">0.5</b></span><input type="range" min="0" max="4" step="0.1" value="0.5" id="ks"></label><label class="sl"><span>⬆️ Boshlanish: <b id="bv">6</b></span><input type="range" min="-3" max="8" step="0.5" value="6" id="bs"></label></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const X = x => 5 + x * 11, Y = y => 65 - y * 3.2, m = host.querySelector('#lmsg');
      const upd = () => {
        const err = P.reduce((a, p) => a + Math.abs(k * p[0] + b0 - p[1]), 0) / P.length;
        host.querySelector('#sv').innerHTML = '<line x1="5" y1="65" x2="98" y2="65" class="axl"/><line x1="5" y1="65" x2="5" y2="2" class="axl"/>' +
          P.map(p => '<line x1="' + X(p[0]) + '" y1="' + Y(p[1]) + '" x2="' + X(p[0]) + '" y2="' + Y(k * p[0] + b0) + '" class="errl"/><circle cx="' + X(p[0]) + '" cy="' + Y(p[1]) + '" r="1.6" class="dot"/>').join('') +
          '<line x1="' + X(0) + '" y1="' + Y(b0) + '" x2="' + X(8.5) + '" y2="' + Y(k * 8.5 + b0) + '" class="fitl"/>';
        const ok = err < 0.6;
        say(m, 'O\'rtacha xato: ' + err.toFixed(2) + (ok ? ' ✓ Ajoyib! Chiziq ma\'lumotga mos keldi 🎯' : ' (0.6 dan kichik bo\'lsin). Qizil chiziqchalar xatoni ko\'rsatadi.'), ok);
        if (ok && !fin) { fin = true; done(); }
      };
      host.querySelector('#ks').oninput = e => { k = +e.target.value; host.querySelector('#kv').textContent = k; upd(); };
      host.querySelector('#bs').oninput = e => { b0 = +e.target.value; host.querySelector('#bv').textContent = b0; upd(); };
      upd();
    } }
},
{
  t: `Kompyuter ko'rishi: rasm = sonlar`, min: 25,
  key: `Kompyuter uchun rasm piksellardan iborat sonlar jadvali. AI shu sonlardagi naqshlarni taniydi.`,
  theory: `<p>Siz rasmga qarab "bu mushuk" deysiz. Kompyuter esa rasmni <b>piksellar</b> (mayda kvadratchalar) jadvali sifatida ko'radi. Har bir piksel <b>son</b>: qora = 1, oq = 0 (rangli rasmda har pikselda 3 ta son: qizil, yashil, ko'k).</p>
<p>Telefon kamerasidagi rasmda millionlab piksel bor! AI ulardagi <b>naqshlarni</b> qidiradi: chiziqlar, burchaklar, doiralar, keyin ko'z, quloq, burun...</p>
<h3>Andoza bilan solishtirish</h3>
<p>Eng oddiy usul: kompyuterda har bir harfning <b>andozasi</b> bor. Siz chizgan rasm qaysi andozaga ko'proq mos kelsa (ko'proq katakchalar bir xil bo'lsa), AI o'shani tanlaydi.</p>
<p>Kompyuter ko'rishi qayerda ishlatiladi: yuzni tanish, mashina raqamini o'qish, qo'lyozmani matnga aylantirish, tibbiy rasmlar.</p>`,
  quiz: [
    Q(`Piksel nima?`, `Rasmning eng mayda kvadratchasi`, [`Kamera nomi`, `Rang nomi`], `Pixel.`),
    Q(`Kompyuter uchun rasm nima?`, `Sonlar jadvali`, [`Hikoya`, `Ovoz`], `Har piksel son.`),
    Q(`Oq-qora rasmda qora piksel (bizning misolda)?`, `1`, [`0`, `100`], `Qora = 1.`),
    Q(`Rangli pikselda nechta son bor?`, `3 ta (qizil, yashil, ko'k)`, [`1 ta`, `10 ta`], `RGB.`),
    Q(`Andoza bilan solishtirishda AI qaysi javobni tanlaydi?`, `Eng ko'p mos keladiganini`, [`Birinchisini`, `Tasodifiysini`], `Eng o'xshash.`),
    Q(`AI rasmda avval nimalarni topadi?`, `Chiziq, burchak kabi oddiy naqshlarni`, [`Darhol ismni`, `Ovozni`], `Oddiydan murakkabga.`),
    Q(`Mashina raqamini o'qish qaysi soha?`, `Kompyuter ko'rishi`, [`Musiqa`, `Kalkulyator`], `Computer vision.`),
    Q(`Telefon rasmida taxminan nechta piksel?`, `Millionlab`, [`10 ta`, `100 ta`], `Megapiksel.`),
    Q(`Qo'lyozmani matnga aylantirish?`, `Kompyuter ko'rishi`, [`Spam filtri`, `Budilnik`], `Matnni tanish.`),
    Q(`Piksel qancha ko'p bo'lsa rasm?`, `Aniqroq`, [`Xiraroq`, `Kichikroq`], `Yuqori sifat.`)
  ],
  prac: { type: 'lab', task: `5×5 maydonga katakchalarni bosib chizing. Avval <b>X</b> harfini chizing, AI uni tanisin. Keyin tozalab <b>O</b> ni chizing.`,
    lab: (host, done) => {
      const T = { X: '1000101010001000101010001', O: '0111010001100011000101110', '+': '0010000100111110010000100', L: '1000010000100001000011111' };
      const g = Array(25).fill(0), got = {}; let fin = false;
      host.innerHTML = '<div class="pix-wrap"><div class="pix" id="px">' + g.map((_, i) => '<button class="px" data-i="' + i + '" aria-label="katak ' + (i + 1) + '"></button>').join('') + '</div><div><p class="muted">Kompyuter ko\'rgan sonlar:</p><pre class="pixn" id="pn"></pre><p class="lab-ai" id="ai"></p><div class="pix-goals"><span id="gX">X: ⬜</span><span id="gO">O: ⬜</span></div><button class="btn sm" id="clr">Tozalash</button></div></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const upd = () => {
        host.querySelectorAll('.px').forEach(b => b.classList.toggle('on', !!g[+b.dataset.i]));
        host.querySelector('#pn').textContent = [0, 1, 2, 3, 4].map(r => g.slice(r * 5, r * 5 + 5).join(' ')).join('\n');
        const filled = g.filter(Boolean).length; let best = null, bs = -1;
        Object.keys(T).forEach(k => { const s = T[k].split('').filter((v, i) => +v === g[i]).length; if (s > bs) { bs = s; best = k; } });
        const sure = filled >= 5 && bs >= 22;
        host.querySelector('#ai').innerHTML = filled < 5 ? '🤖 Hali chizmadingiz…' : sure ? '🤖 Men buni <b>' + best + '</b> deb o\'ylayman (' + Math.round(bs / 25 * 100) + '% mos)' : '🤖 Ishonchim komil emas… ' + best + '? (' + Math.round(bs / 25 * 100) + '%)';
        if (sure && (best === 'X' || best === 'O')) { got[best] = 1; host.querySelector('#g' + best).textContent = best + ': ✅'; }
        const m = host.querySelector('#lmsg');
        if (got.X && got.O) { say(m, 'AI ikkala harfni ham tanidi! 👀', true); if (!fin) { fin = true; done(); } }
        else say(m, got.X ? 'X tanildi! Endi tozalab, O ni chizing.' : 'Avval X ni chizing (katta, burchakdan burchakka).', false);
      };
      host.querySelectorAll('.px').forEach(b => b.onclick = () => { g[+b.dataset.i] ^= 1; upd(); });
      host.querySelector('#clr').onclick = () => { g.fill(0); upd(); };
      upd();
    } }
},
{
  t: `AI matnni tushunadi: kayfiyatni aniqlash`, min: 25,
  key: `Matndagi so'zlarga qarab AI fikr ijobiy yoki salbiy ekanini aniqlaydi. Bu "kayfiyat tahlili" deyiladi.`,
  theory: `<p>Internet-do'konda minglab sharhlar bor: "Zo'r mahsulot!", "Yomon, sinib qoldi". Ularni bitta-bitta o'qish qiyin. AI bir soniyada hammasini <b>ijobiy 😊</b> yoki <b>salbiy 😞</b> ga ajratadi. Bu <b>kayfiyat tahlili</b> deyiladi.</p>
<h3>Eng oddiy usul: so'z ro'yxatlari</h3>
<ul><li>Yaxshi so'zlar: zo'r, ajoyib, yoqdi, chiroyli...</li><li>Yomon so'zlar: yomon, yoqmadi, sekin, buzildi...</li></ul>
<p>Dastur matndagi yaxshi va yomon so'zlarni sanaydi. Yaxshilari ko'p bo'lsa ijobiy, yomonlari ko'p bo'lsa salbiy, teng bo'lsa neytral 😐.</p>
<div class="note">Zamonaviy AI bundan ancha aqlli: "yomon emas" yaxshi ma'noda ekanini ham tushunadi, chunki u so'zlarni gapdagi o'rni bilan birga o'rganadi.</div>
<p>Matn bilan ishlaydigan AI sohasi <b>tabiiy tilni qayta ishlash</b> (NLP) deyiladi: tarjima, chatbotlar, imlo tekshirish shu sohada.</p>`,
  quiz: [
    Q(`Kayfiyat tahlili nima qiladi?`, `Matn ijobiy yoki salbiy ekanini aniqlaydi`, [`Matnni o'chiradi`, `Rasm chizadi`], `Sentiment analysis.`),
    Q(`"Ajoyib, juda yoqdi!" qanday?`, `Ijobiy`, [`Salbiy`, `Neytral`], `Yaxshi so'zlar.`),
    Q(`"Yomon, tez buzildi" qanday?`, `Salbiy`, [`Ijobiy`, `Neytral`], `Yomon so'zlar.`),
    Q(`Yaxshi va yomon so'zlar teng bo'lsa?`, `Neytral`, [`Ijobiy`, `Xato`], `Muvozanat.`),
    Q(`Matn bilan ishlovchi AI sohasi?`, `NLP (tabiiy tilni qayta ishlash)`, [`Kompyuter ko'rishi`, `Robototexnika`], `Natural Language Processing.`),
    Q(`NLP ga misol?`, `Tarjimon`, [`Fonar`, `Kalkulyator`], `Til bilan ishlaydi.`),
    Q(`"Yomon emas" oddiy so'z sanashda xato bo'lishi mumkinmi?`, `Ha, "yomon" so'zi sanaladi`, [`Yo'q, doim to'g'ri`, `Bu so'z emas`], `Kontekst muhim.`),
    Q(`Do'konlar nega kayfiyat tahlilidan foydalanadi?`, `Minglab sharhni tez tahlil qilish uchun`, [`Narxni oshirish uchun`, `Sharhlarni yashirish uchun`], `Tezlik.`),
    Q(`Zamonaviy AI so'zlarni qanday o'rganadi?`, `Gapdagi o'rni bilan birga`, [`Alohida, ma'nosiz`, `Faqat birinchi harfini`], `Kontekst.`),
    Q(`Yangi so'z ro'yxatga qo'shilsa?`, `Dastur uni ham hisobga oladi`, [`Dastur buziladi`, `Hech narsa o'zgarmaydi`], `Lug'at kengayadi.`)
  ],
  prac: { type: 'lab', task: `Analizator so'z ro'yxatlari bilan ishlaydi. Ro'yxatlarga yetishmayotgan so'zlarni qo'shing (vergul bilan), shunda <b>hamma</b> sharhlar to'g'ri aniqlansin.`,
    lab: (host, done) => {
      const S = [['Bu o\'yin zo\'r ekan, juda yoqdi!', 1], ['Yomon, telefon tez buzildi', -1], ['Kitob ajoyib, hammaga tavsiya qilaman', 1], ['Ovqat sovuq va mazasiz edi', -1], ['Yetkazib berish sekin bo\'ldi, yoqmadi', -1], ['Rang chiroyli, sifati a\'lo', 1], ['Bugun seshanba', 0]];
      let fin = false;
      host.innerHTML = '<div class="neu-w two"><label class="sl"><span>😊 Yaxshi so\'zlar</span><textarea class="inp" id="gw" rows="3">zo\'r, yoqdi</textarea></label><label class="sl"><span>😞 Yomon so\'zlar</span><textarea class="inp" id="bw" rows="3">yomon</textarea></label></div><div class="lab-list" id="out"></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const words = id => N(host.querySelector(id).value).split(/[,\n]/).map(s => s.trim()).filter(Boolean);
      const upd = () => {
        const G = words('#gw'), B = words('#bw'); let ok = 0;
        host.querySelector('#out').innerHTML = S.map(s => {
          const ws = N(s[0]).split(/[^a-z'ʻ]+/).filter(Boolean), cnt = L => ws.filter(w => L.some(x => w.startsWith(x))).length;
          const sc = Math.sign(cnt(G) - cnt(B)), good = sc === s[1]; if (good) ok++;
          return '<div class="lab-row ' + (good ? 'good' : 'bad') + '"><span class="lab-t">' + esc(s[0]) + '</span><span class="lab-em">' + (sc > 0 ? '😊' : sc < 0 ? '😞' : '😐') + '</span></div>';
        }).join('');
        const m = host.querySelector('#lmsg');
        if (ok === S.length) { say(m, 'Hammasi to\'g\'ri aniqlandi! Siz AI ga yangi so\'zlarni o\'rgatdingiz 📚', true); if (!fin) { fin = true; done(); } }
        else say(m, ok + ' / ' + S.length + ' to\'g\'ri. Qizil sharhlardagi qaysi so\'z kayfiyatni bildiradi?', false);
      };
      host.querySelector('#gw').oninput = upd; host.querySelector('#bw').oninput = upd; upd();
    } }
},
{
  t: `Chatbot: gaplashadigan dastur`, min: 25,
  key: `Oddiy chatbot kalit so'zlarni qidiradi: savolda "salom" bo'lsa, salomlashadi. Zamonaviy chatbotlar AI bilan javobni o'zi tuzadi.`,
  theory: `<p><b>Chatbot</b> odam bilan yozishib gaplashadigan dastur. Telegramdagi botlar, bank yordamchilari, ChatGPT: hammasi chatbot.</p>
<h3>1. Qoidali chatbot</h3>
<p>Eng oddiy chatbot <b>kalit so'zlar</b> bilan ishlaydi:</p>
<ul><li>Savolda "salom" bo'lsa → "Assalomu alaykum! 😊"</li><li>Savolda "isming" bo'lsa → "Mening ismim ZIS-bot"</li><li>Hech qaysi kalit so'z topilmasa → "Kechirasiz, tushunmadim"</li></ul>
<p>Bunday bot faqat siz o'rgatgan narsalarni biladi.</p>
<h3>2. AI chatbot</h3>
<p>ChatGPT kabi botlar tayyor javoblar ro'yxatiga ega emas. Ular juda ko'p matndan o'rganib, javobni har safar <b>yangidan tuzadi</b>. Shuning uchun deyarli har qanday savolga javob bera oladi (lekin ba'zan xato ham qiladi!).</p>`,
  quiz: [
    Q(`Chatbot nima?`, `Odam bilan yozishadigan dastur`, [`Robot-changyutgich`, `O'yin konsoli`], `Chat + bot.`),
    Q(`Qoidali chatbot nimani qidiradi?`, `Kalit so'zlarni`, [`Rasmlarni`, `Ovozni`], `Keywords.`),
    Q(`Kalit so'z topilmasa?`, `"Tushunmadim" deydi`, [`O'chib qoladi`, `Tasodifiy javob beradi`], `Standart javob.`),
    Q(`Qoidali bot nimani biladi?`, `Faqat o'rgatilgan narsani`, [`Hamma narsani`, `Hech narsani`], `Qoidalar bilan cheklangan.`),
    Q(`ChatGPT javobni qanday tuzadi?`, `Har safar yangidan, o'rgangan bilimidan`, [`Tayyor ro'yxatdan oladi`, `Internetdan nusxa ko'chiradi, xolos`], `Generativ.`),
    Q(`AI chatbot xato qilishi mumkinmi?`, `Ha`, [`Yo'q, hech qachon`, `Faqat kechasi`], `Tekshirish kerak.`),
    Q(`Telegram botlar qaysi turga kiradi?`, `Chatbot`, [`Kalkulyator`, `Brauzer`], `Yozishadi.`),
    Q(`"isming" kalit so'zi bo'lgan savol?`, `"Sening isming nima?"`, [`"Soat necha?"`, `"Salom!"`], `Kalit so'z bor.`),
    Q(`Botga yangi qoida qo'shilsa?`, `U ko'proq savolga javob bera oladi`, [`U kamroq biladi`, `O'zgarmaydi`], `Bilim kengayadi.`),
    Q(`Chatbot qayerda foydali?`, `Bank, do'kon, maktab yordamchisi sifatida`, [`Hech qayerda`, `Faqat o'yinda`], `Ko'p sohada.`)
  ],
  prac: { type: 'lab', task: `O'z chatbotingizni yarating! Qoidalar qo'shing (kalit so'z → javob). Pastdagi 5 ta sinov savolining <b>hammasiga</b> bot javob bera olsin. Keyin bot bilan o'zingiz gaplashib ko'ring.`,
    lab: (host, done) => {
      const TEST = ['Salom!', 'Sening isming nima?', 'Necha yoshdasan?', 'Bugun ob-havo qanday?', 'Xayr, ko\'rishguncha'];
      const rules = [['salom', 'Assalomu alaykum! 😊']]; let fin = false;
      host.innerHTML = '<div class="bot"><div><h3 class="sub3">Qoidalar</h3><div id="rl"></div><div class="chat-row"><input class="inp sm" id="kw" placeholder="kalit so\'z (masalan: isming)"><input class="inp sm" id="an" placeholder="javob"><button class="btn sm pri" id="add">Qo\'shish</button></div>' +
        '<h3 class="sub3">Sinov savollari</h3><div id="tst"></div><span class="lab-msg" id="lmsg" role="status"></span></div>' +
        '<div class="chatbox"><div class="msgs" id="msgs"><div class="mb bot">Salom! Men sizning botingizman 🤖</div></div><div class="chat-row"><input class="inp sm" id="q" placeholder="Botga yozing…"><button class="btn sm" id="send">Yuborish</button></div></div></div>';
      const reply = q => { const t = N(q); const r = rules.find(r => t.includes(N(r[0]))); return r ? r[1] : null; };
      const upd = () => {
        host.querySelector('#rl').innerHTML = rules.map((r, i) => '<div class="rule"><code>' + esc(r[0]) + '</code> → ' + esc(r[1]) + ' <button class="lnk" data-d="' + i + '">o\'chirish</button></div>').join('');
        host.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { rules.splice(+b.dataset.d, 1); upd(); });
        let ok = 0;
        host.querySelector('#tst').innerHTML = TEST.map(t => { const r = reply(t); if (r) ok++; return '<div class="lab-row ' + (r ? 'good' : 'bad') + '"><span class="lab-t">' + esc(t) + '<small>' + esc(r || 'Bot javob bera olmaydi') + '</small></span></div>'; }).join('');
        const m = host.querySelector('#lmsg');
        if (ok === TEST.length) { say(m, 'Botingiz hamma savolga javob beradi! 🤖🎉', true); if (!fin) { fin = true; done(); } } else say(m, ok + ' / ' + TEST.length + '. Maslahat: kalit so\'z sifatida savoldagi muhim so\'zni oling (isming, yosh, havo, xayr).', false);
      };
      host.querySelector('#add').onclick = () => { const k = host.querySelector('#kw').value.trim(), a = host.querySelector('#an').value.trim(); if (k.length < 3 || !a) return say(host.querySelector('#lmsg'), 'Kalit so\'z kamida 3 harf, javob esa bo\'sh bo\'lmasin', false); rules.push([k, a]); host.querySelector('#kw').value = ''; host.querySelector('#an').value = ''; upd(); };
      const send = () => { const i = host.querySelector('#q'), q = i.value.trim(); if (!q) return; const box = host.querySelector('#msgs');
        box.insertAdjacentHTML('beforeend', '<div class="mb me">' + esc(q) + '</div><div class="mb bot">' + esc(reply(q) || 'Kechirasiz, tushunmadim 🤔') + '</div>'); box.scrollTop = box.scrollHeight; i.value = ''; };
      host.querySelector('#send').onclick = send; host.querySelector('#q').onkeydown = e => { if (e.key === 'Enter') send(); };
      upd();
    } }
},
{
  t: `ChatGPT qanday ishlaydi?`, min: 25,
  key: `Til modeli keyingi so'zni bashorat qiladi: o'qigan matnlaridagi eng ehtimolli so'zni tanlaydi va so'zma-so'z gap tuzadi.`,
  theory: `<p>ChatGPT, Gemini, Claude kabi dasturlar <b>katta til modellari</b> deyiladi. Ularning siri oddiy fikrda:</p>
<div class="note">Til modeli doim bitta savolga javob beradi: <b>"Keyingi so'z qaysi bo'lishi ehtimoli eng katta?"</b></div>
<p>Telefoningiz klaviaturasini eslang: "Xayrli" deb yozsangiz, u "tong" yoki "kun" ni taklif qiladi. Chunki odamlar ko'pincha shunday yozadi. Til modeli ham shunday, faqat u kitoblar, maqolalar, saytlardagi <b>milliardlab</b> gapdan o'rgangan.</p>
<p>U so'zma-so'z ishlaydi: "Men" → "maktabga" → "boraman" → "." Har qadamda eng mos so'zni tanlaydi. Shu tarzda butun javob, she'r, hatto kod yoziladi.</p>
<p>Bunday AI <b>generativ</b> (yaratuvchi) deyiladi. Rasm chizadigan AI lar ham bor: siz tasvirlaysiz, u yangi rasm yaratadi.</p>
<p>Muhim: model "tushunib" emas, <b>ehtimollik</b> bo'yicha yozadi. Shuning uchun ishonarli eshitiladigan, lekin noto'g'ri gap ham yozib qo'yishi mumkin.</p>`,
  quiz: [
    Q(`Til modeli doim nimani bashorat qiladi?`, `Keyingi so'zni`, [`Ob-havoni`, `Rasm rangini`], `Next word.`),
    Q(`ChatGPT nimadan o'rgangan?`, `Milliardlab gapdan`, [`Faqat bitta kitobdan`, `Hech narsadan`], `Juda katta matnlar.`),
    Q(`Telefon klaviaturasi so'z taklif qilishi nimaga o'xshaydi?`, `Til modeliga`, [`Kalkulyatorga`, `Fonarga`], `Kichik til modeli.`),
    Q(`Generativ AI nima?`, `Yangi matn yoki rasm yaratuvchi AI`, [`Faqat sanaydigan dastur`, `Antivirus`], `Generate: yaratish.`),
    Q(`Model javobni qanday yozadi?`, `So'zma-so'z`, [`Bir zumda tayyor nusxadan`, `Harflarni tasodifan`], `Ketma-ket.`),
    Q(`Nega model xato yozishi mumkin?`, `U ehtimollik bo'yicha yozadi`, [`U charchaydi`, `Internet sekin`], `Ishonarli, lekin noto'g'ri.`),
    Q(`"Xayrli ..." dan keyin eng ehtimolli so'z?`, `tong`, [`stol`, `yugur`], `Ko'p uchraydigan birikma.`),
    Q(`Katta til modellariga misol?`, `ChatGPT, Gemini, Claude`, [`Paint, Word`, `Excel, Calculator`], `LLM.`),
    Q(`Rasm chizadigan AI ham generativmi?`, `Ha`, [`Yo'q`, `Faqat qora-oq`], `Yangi rasm yaratadi.`),
    Q(`Model "ehtimollik" bo'yicha tanlaydi degani?`, `Ko'p uchragan variantni tanlaydi`, [`Doim birinchi so'zni`, `Hech narsa tanlamaydi`], `Statistika.`)
  ],
  prac: { type: 'lab', task: `Siz til modelisiz! Model kichik matndan o'rgangan. Har qadamda <b>eng ehtimolli</b> (eng katta foizli) so'zni tanlab, kamida 5 so'zli gap tuzing.`,
    lab: (host, done) => {
      const corpus = 'men har kuni maktabga piyoda boraman . men har kuni maktabga piyoda boraman . men har kuni maktabga piyoda boraman . men har kuni kitob o\'qiyman . men har doim maktabga boraman . sen har kuni maktabga avtobusda borasan . men kecha maktabga kech qoldim . ular har kuni sport bilan shug\'ullanadi .'.split(' ');
      const big = {}; for (let i = 0; i < corpus.length - 1; i++) { const a = corpus[i], b = corpus[i + 1]; (big[a] = big[a] || {})[b] = (big[a][b] || 0) + 1; }
      let sent = ['men'], allTop = true, fin = false;
      host.innerHTML = '<div class="lm"><p class="lm-s" id="sn"></p><p class="muted">Keyingi so\'z variantlari (model o\'rgangan matnda qancha uchragani):</p><div class="lm-opts" id="op"></div><div class="acts"><button class="btn sm" id="rs">Boshidan</button><button class="btn sm" id="auto">🤖 Model o\'zi yozsin</button></div></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const m = host.querySelector('#lmsg');
      const upd = () => {
        host.querySelector('#sn').textContent = sent.join(' ').replace(' .', '.');
        const last = sent[sent.length - 1], nx = big[last] || {}, tot = Object.values(nx).reduce((a, b) => a + b, 0);
        const arr = Object.keys(nx).sort((a, b) => nx[b] - nx[a]);
        host.querySelector('#op').innerHTML = last === '.' ? '<p class="muted">Gap tugadi.</p>' : arr.map(w => '<button class="lm-o" data-w="' + esc(w) + '"><b>' + esc(w === '.' ? '. (gap oxiri)' : w) + '</b><span class="bar"><b style="width:' + Math.round(nx[w] / tot * 100) + '%"></b></span><small>' + Math.round(nx[w] / tot * 100) + '%</small></button>').join('');
        host.querySelectorAll('.lm-o').forEach(b => b.onclick = () => { if (b.dataset.w !== arr[0]) allTop = false; sent.push(b.dataset.w); upd(); });
        const words = sent.filter(w => w !== '.').length;
        if (words >= 5 && allTop) { say(m, 'Zo\'r! Siz til modeli kabi har safar eng ehtimolli so\'zni tanladingiz ✍️', true); if (!fin) { fin = true; done(); } }
        else if (!allTop) say(m, 'Siz eng ehtimolli bo\'lmagan so\'zni tanladingiz. Bu ham mumkin (AI ham ba\'zan shunday qiladi), lekin mashq uchun "Boshidan" bosing.', false);
        else say(m, words + ' / 5 so\'z. Eng katta foizlisini tanlang.', false);
      };
      host.querySelector('#rs').onclick = () => { sent = ['men']; allTop = true; upd(); };
      host.querySelector('#auto').onclick = () => { sent = ['men']; for (let k = 0; k < 8; k++) { const nx = big[sent[sent.length - 1]]; if (!nx) break; const w = Object.keys(nx).sort((a, b) => nx[b] - nx[a])[0]; sent.push(w); if (w === '.') break; } allTop = false; upd(); say(m, 'Model o\'zi shunday yozadi. Endi "Boshidan" bosib, o\'zingiz tuzing.', false); };
      upd();
    } }
},
{
  t: `Prompt: AI ga to'g'ri savol berish`, min: 25,
  key: `Yaxshi prompt: rol + aniq vazifa + kim uchun + qanday shaklda + raqam/aniqlik. Qancha aniq so'rasangiz, shuncha yaxshi javob.`,
  theory: `<p>AI ga yoziladigan so'rov <b>prompt</b> deyiladi. Bir xil AI ga yomon prompt yozsangiz yomon, yaxshi prompt yozsangiz ajoyib javob olasiz.</p>
<p>❌ Yomon prompt: <i>"Fotosintez"</i></p>
<p>✅ Yaxshi prompt: <i>"Sen biologiya o'qituvchisisan. 6-sinf o'quvchisi uchun fotosintezni oddiy tilda tushuntir. Javobni 5 ta qisqa banddan iborat ro'yxat qilib yoz va bitta hayotiy misol keltir."</i></p>
<h3>Yaxshi promptning 5 qismi</h3>
<ol><li>🎭 <b>Rol</b>: "Sen ... sifatida" yoki "Sen o'qituvchisan".</li><li>🎯 <b>Vazifa</b>: aniq fe'l: tushuntir, yoz, tuz, sanab ber.</li><li>👦 <b>Kim uchun</b>: "6-sinf o'quvchisi uchun", "boshlovchilar uchun".</li><li>📋 <b>Shakl</b>: ro'yxat, jadval, qisqa, qadamlar.</li><li>🔢 <b>Aniqlik</b>: raqamlar: "5 ta band", "100 so'z".</li></ol>
<div class="note">AI javobi yoqmasa, aniqlashtiring: "Qisqaroq yoz", "Misol qo'sh", "Oddiyroq tushuntir".</div>`,
  quiz: [
    Q(`Prompt nima?`, `AI ga yoziladigan so'rov`, [`Kompyuter qismi`, `Virus`], `Prompt.`),
    Q(`Yaxshi promptga misol?`, `"6-sinf uchun fotosintezni 5 bandda tushuntir"`, [`"Fotosintez"`, `"Bir narsa yoz"`], `Aniq va to'liq.`),
    Q(`"Sen tarix o'qituvchisisan" bu qaysi qism?`, `Rol`, [`Shakl`, `Raqam`], `Role.`),
    Q(`"Jadval ko'rinishida yoz" bu qaysi qism?`, `Shakl`, [`Rol`, `Kim uchun`], `Format.`),
    Q(`"5 ta misol keltir" dagi 5 nima beradi?`, `Aniqlik`, [`Rol`, `Hech narsa`], `Raqam aniqlik beradi.`),
    Q(`"Boshlang'ich sinf uchun" bu?`, `Kim uchun (auditoriya)`, [`Vazifa`, `Shakl`], `Audience.`),
    Q(`Javob yoqmasa nima qilish kerak?`, `Promptni aniqlashtirish`, [`AI ni o'chirish`, `Kompyuterni urish`], `Qayta so'rash.`),
    Q(`Qaysi so'z vazifani bildiradi?`, `Tushuntir`, [`Fotosintez`, `6-sinf`], `Fe'l.`),
    Q(`Qisqa prompt doim yaxshimi?`, `Yo'q, aniqlik muhim`, [`Ha, doim`, `Faqat 1 so'z bo'lsa`], `To'liq prompt yaxshi.`),
    Q(`Prompt yozish nima uchun muhim ko'nikma?`, `AI dan foydali javob olish uchun`, [`Tez yozish uchun`, `Muhim emas`], `Kelajak ko'nikmasi.`)
  ],
  prac: { type: 'lab', task: `O'zingiz prompt yozing (istalgan mavzuda). Tekshiruvchi uni 5 qism bo'yicha baholaydi. Kamida <b>4 ta</b> qism bo'lsin.`,
    lab: (host, done) => {
      const C = [
        ['🎭 Rol', /(sifatida|sen\s+\S+(san|siz)\b|sen\s+(o'qituvchi|ustoz|mutaxassis|yordamchi|olim|shoir|yozuvchi|murabbiy))/, '"Sen ... sifatida" yoki "Sen o\'qituvchisan"'],
        ['🎯 Vazifa', /(tushuntir|yoz|tuz|sanab|ber\b|bering|yarat|tayyorla|taqqosla|aytib|top\b|ko'rsat|o'rgat)/, 'tushuntir, yoz, tuz, sanab ber...'],
        ['👦 Kim uchun', /(sinf|yosh|o'quvchi|bola|boshlovchi|talaba|uchun)/, '"6-sinf o\'quvchisi uchun"'],
        ['📋 Shakl', /(ro'yxat|jadval|qadam|band|qisqa|punkt|she'r|hikoya|xat|savol|misol)/, 'ro\'yxat, jadval, qisqa, qadamlar...'],
        ['🔢 Aniqlik (raqam)', /\d/, '"5 ta", "100 so\'z"']
      ];
      let fin = false;
      host.innerHTML = '<label class="sl"><span>Promptingiz:</span><textarea class="inp" id="pr" rows="4" placeholder="Masalan: Sen ... sifatida ..."></textarea></label><div class="lab-list" id="cl"></div><span class="lab-msg" id="lmsg" role="status"></span>';
      const upd = () => {
        const t = N(host.querySelector('#pr').value); let n = 0;
        host.querySelector('#cl').innerHTML = C.map(c => { const ok = c[1].test(t); if (ok) n++; return '<div class="lab-row ' + (ok ? 'good' : '') + '"><span class="lab-em">' + (ok ? '✅' : '⬜') + '</span><span class="lab-t">' + c[0] + '<small>' + c[2] + '</small></span></div>'; }).join('');
        const m = host.querySelector('#lmsg'), long = t.trim().length >= 40;
        if (n >= 4 && long) { say(m, 'Ajoyib prompt! ' + n + ' / 5 qism bor. Endi uni haqiqiy AI da sinab ko\'rishingiz mumkin ✨', true); if (!fin) { fin = true; done(); } }
        else say(m, n + ' / 5 qism' + (long ? '' : ', prompt juda qisqa') + '. Yetishmayotgan qismlarni qo\'shing.', false);
      };
      host.querySelector('#pr').oninput = upd; upd();
    } }
},
{
  t: `AI ham xato qiladi`, min: 20,
  key: `AI ba'zan ishonch bilan noto'g'ri gapiradi (gallyutsinatsiya). Muhim ma'lumotni doim boshqa manbadan tekshiring.`,
  theory: `<p>AI juda aqlli ko'rinadi, lekin u <b>xato qiladi</b>. Eng qiziq xatosi <b>gallyutsinatsiya</b>: AI mavjud bo'lmagan narsani juda ishonch bilan aytadi. Masalan, yo'q kitob nomini yoki noto'g'ri sanani "o'ylab topadi".</p>
<p>Nega shunday bo'ladi? Eslang: til modeli <b>eng ehtimolli so'zni</b> tanlaydi, "haqiqatni" tekshirmaydi.</p>
<h3>AI ning boshqa xatolari</h3>
<ul><li><b>Eskirgan ma'lumot</b>: u o'qitilgan kundan keyingi yangiliklarni bilmasligi mumkin.</li><li><b>Noxolislik</b>: ma'lumotda bir tomonlama fikr ko'p bo'lsa, AI ham shunday javob beradi.</li><li><b>Hisob xatolari</b>: ba'zan oddiy hisobda ham adashadi.</li></ul>
<h3>Aqlli foydalanuvchi qoidalari</h3>
<ol><li>Muhim faktlarni (sana, raqam, ism) <b>darslik yoki ishonchli saytdan</b> tekshiring.</li><li>AI dan manba so'rang va u manba haqiqatan bormi, qarang.</li><li>Shubhali javobga "Ishonchingiz komilmi?" deb qayta so'rang.</li></ol>`,
  quiz: [
    Q(`Gallyutsinatsiya nima?`, `AI ning ishonch bilan noto'g'ri gapirishi`, [`AI ning uxlashi`, `Kompyuter virusi`], `Hallucination.`),
    Q(`Nega AI gallyutsinatsiya qiladi?`, `Ehtimollik bo'yicha yozadi, haqiqatni tekshirmaydi`, [`Atayin aldaydi`, `Internet yo'q`], `Mexanizm.`),
    Q(`Muhim faktni qanday tekshirish kerak?`, `Darslik yoki ishonchli saytdan`, [`Yana o'sha AI dan so'rab, xolos`, `Tekshirmaslik`], `Boshqa manba.`),
    Q(`AI eng yangi xabarlarni doim biladimi?`, `Yo'q, bilmasligi mumkin`, [`Ha, doim`, `Faqat sport xabarlarini`], `Eskirgan ma'lumot.`),
    Q(`AI javobi juda ishonchli eshitilsa, demak u to'g'rimi?`, `Shart emas`, [`Ha, albatta`, `Doim xato`], `Ohang ≠ haqiqat.`),
    Q(`Noxolislik nima?`, `Bir tomonlama fikr`, [`Tez ishlash`, `Rangli javob`], `Bias.`),
    Q(`AI dan manba so'radingiz. Keyin nima qilasiz?`, `Manba haqiqatan bormi, tekshiraman`, [`Darhol ishonaman`, `O'chirib tashlayman`], `Manba ham to'qilgan bo'lishi mumkin.`),
    Q(`AI ni nima deb bilish to'g'ri?`, `Yordamchi, lekin tekshirib turiladigan`, [`Hech qachon xato qilmaydigan o'qituvchi`, `Foydasiz o'yinchoq`], `Muvozanat.`),
    Q(`"Ishonchingiz komilmi?" deb so'rash nima beradi?`, `AI ba'zan xatosini tuzatadi`, [`AI xafa bo'ladi`, `Hech narsa`], `Qayta tekshirish.`),
    Q(`Uy vazifasidagi sanani AI aytdi. To'g'ri yo'l?`, `Darslikdan tekshirish`, [`Ko'chirib yozish`, `O'qituvchidan yashirish`], `Tekshirish odati.`)
  ],
  prac: { type: 'lab', task: `AI bir nechta gap yozdi. Qaysilari <b>to'g'ri</b>, qaysilari <b>gallyutsinatsiya</b> (xato)?`,
    lab: sorter([
      ['🏙️', 'O\'zbekiston poytaxti Toshkent shahri.', 0],
      ['☀️', 'Quyosh Yer atrofida aylanadi.', 1, 'Aksincha: Yer Quyosh atrofida aylanadi.'],
      ['💧', 'Suv dengiz sathida 100 °C da qaynaydi.', 0],
      ['🐧', 'Pingvinlar Shimoliy qutbda yashaydi.', 1, 'Pingvinlar Janubiy yarim sharda (Antarktida) yashaydi.'],
      ['📏', '1 kilometr 1000 metrga teng.', 0],
      ['🕷️', 'O\'rgimchakning 6 ta oyog\'i bor.', 1, 'O\'rgimchakning 8 ta oyog\'i bor.'],
      ['🪐', 'Yer Quyoshdan uchinchi sayyora.', 0],
      ['📜', 'Alisher Navoiy 2005-yilda tug\'ilgan.', 1, 'Alisher Navoiy 1441-yilda tug\'ilgan.']
    ], ['To\'g\'ri', 'Xato']) }
},
{
  t: `Xavfsiz va odobli AI`, min: 20,
  key: `AI ga shaxsiy ma'lumot bermang, uning javobini o'z ishingiz deb ko'rsatmang, soxta rasm-videolarga ehtiyot bo'ling.`,
  theory: `<p>AI kuchli vosita. Har qanday kuchli vosita kabi uni <b>to'g'ri</b> ishlatish kerak.</p>
<h3>🔒 Shaxsiy ma'lumot</h3>
<p>AI ga to'liq ism-familiya, uy manzili, telefon raqami, parol, karta raqamini yozmang. Yozgan narsangiz serverlarda saqlanishi mumkin.</p>
<h3>✍️ Halollik</h3>
<p>AI yozgan inshoni "o'zim yozdim" deyish aldov. AI dan <b>o'rganish</b> uchun foydalaning: tushunmagan mavzuni so'rang, rejani birga tuzing, lekin ishni o'zingiz bajaring. Agar AI yordam bergan bo'lsa, buni ochiq ayting.</p>
<h3>🎭 Soxta kontent (deepfake)</h3>
<p>AI haqiqiyga o'xshash soxta rasm, video va ovoz yasay oladi. G'alati yoki hayratlanarli xabarni ko'rsangiz, darhol ulashmang, avval tekshiring.</p>
<h3>🤝 Hurmat</h3>
<p>AI yordamida boshqalarni masxara qiladigan rasm yoki yolg'on xabar yasash mumkin emas. Bu odamlarga zarar yetkazadi.</p>`,
  quiz: [
    Q(`AI ga parolingizni yozish mumkinmi?`, `Yo'q`, [`Ha`, `Faqat kechasi`], `Shaxsiy ma'lumot.`),
    Q(`AI yozgan inshoni o'zingizniki deb topshirish?`, `Aldov, mumkin emas`, [`Normal holat`, `Faqat 5-sinfda mumkin`], `Halollik.`),
    Q(`AI dan to'g'ri foydalanish?`, `Tushunmagan mavzuni so'rab o'rganish`, [`Hamma vazifani unga yozdirish`, `Do'stlarni masxara qilish`], `O'rganish vositasi.`),
    Q(`Deepfake nima?`, `AI yasagan soxta rasm yoki video`, [`Chuqur suv`, `Yangi o'yin`], `Soxta kontent.`),
    Q(`Hayratlanarli videoni ko'rdingiz. Nima qilasiz?`, `Ulashishdan oldin tekshiraman`, [`Darhol hammaga yuboraman`, `Unga ishonaman`], `Tekshirish.`),
    Q(`Qaysi ma'lumot shaxsiy?`, `Uy manzili`, [`Sevimli rang`, `Sevimli fan`], `Xavfli ma'lumot.`),
    Q(`AI yordam bergan bo'lsa?`, `Buni ochiq aytish kerak`, [`Yashirish kerak`, `Hech narsa demaslik`], `Ochiqlik.`),
    Q(`AI yordamida boshqalarni masxara qilish?`, `Mumkin emas, zarar yetkazadi`, [`Kulgili, mumkin`, `Faqat do'stlarni mumkin`], `Hurmat.`),
    Q(`Yozgan narsalaringiz qayerda saqlanishi mumkin?`, `Kompaniya serverlarida`, [`Hech qayerda`, `Faqat yuragingizda`], `Maxfiylik.`),
    Q(`AI qanday vosita?`, `Kuchli, lekin to'g'ri ishlatish kerak`, [`Xavfsiz, o'ylamasa ham bo'ladi`, `Foydasiz`], `Mas'uliyat.`)
  ],
  prac: { type: 'lab', task: `Har bir holat uchun tanlang: bu <b>to'g'ri</b> ishmi yoki <b>noto'g'ri</b>?`,
    lab: sorter([
      ['📚', 'Tushunmagan matematik mavzuni AI dan tushuntirib berishni so\'radim.', 0],
      ['🏠', 'AI ga uy manzilim va telefon raqamimni yozdim.', 1, 'Shaxsiy ma\'lumotni AI ga bermang.'],
      ['📝', 'AI yozgan inshoni "o\'zim yozdim" deb topshirdim.', 1, 'Bu aldov. AI dan reja yoki maslahat uchun foydalaning.'],
      ['🔍', 'AI aytgan sanani darslikdan tekshirdim.', 0],
      ['🎭', 'Sinfdoshimning kulgili soxta rasmini AI da yasab, guruhga tashladim.', 1, 'Bu odamni xafa qiladi va zarar yetkazadi.'],
      ['🗣️', 'Taqdimotimda "rejani tuzishda AI yordam berdi" deb yozdim.', 0],
      ['📺', 'G\'alati videoni ko\'rib, ulashishdan oldin rasmiy saytdan tekshirdim.', 0],
      ['🔑', 'AI ga o\'yin akkauntimning parolini yozib, "eslab qol" dedim.', 1, 'Parolni hech qachon hech kimga, AI ga ham bermang.']
    ], ['To\'g\'ri', 'Noto\'g\'ri']) }
},
{
  t: `AI va kelajak kasblari`, min: 20,
  key: `AI ko'p ishni osonlashtiradi, lekin uni yaratadigan, o'rgatadigan va to'g'ri ishlatadigan odamlar kerak. Eng muhim ko'nikmalar: o'rganish, fikrlash va ijod.`,
  theory: `<p>Ko'pchilik so'raydi: "AI hamma ishni qilib qo'ysa, biz nima qilamiz?" Aslida AI ko'p yangi kasblarni ham yaratyapti:</p>
<ul><li>👩‍💻 <b>AI muhandisi</b>: AI modellarini yaratadi va o'qitadi.</li><li>📊 <b>Ma'lumotlar mutaxassisi</b> (data scientist): ma'lumotlardan foydali xulosa chiqaradi.</li><li>🏷️ <b>Ma'lumot belgilovchi</b>: AI uchun misollarga yorliq qo'yadi.</li><li>🛡️ <b>AI xavfsizligi mutaxassisi</b>: AI zarar yetkazmasligini tekshiradi.</li><li>🎨 <b>Ijodkorlar</b>: dizayner, rassom, musiqachilar AI ni yordamchi sifatida ishlatadi.</li></ul>
<p>Shifokor, o'qituvchi, fermer, muhandis: hammasi o'z ishida AI dan foydalanadi. AI <b>ish quroli</b>, uni yaxshi biladigan odam ko'proq ish qila oladi.</p>
<h3>Kelajak uchun eng muhim ko'nikmalar</h3>
<ol><li>🧠 Mustaqil fikrlash va tekshirish.</li><li>💻 Dasturlash va matematika asoslari.</li><li>🎨 Ijodkorlik: yangi g'oya topish.</li><li>🤝 Jamoada ishlash va muloqot.</li><li>📚 Butun umr o'rganish.</li></ol>`,
  quiz: [
    Q(`AI modellarini kim yaratadi?`, `AI muhandisi`, [`Pochtachi`, `Oshpaz`], `AI engineer.`),
    Q(`Ma'lumotlardan xulosa chiqaruvchi?`, `Data scientist`, [`Haydovchi`, `Rassom`], `Ma'lumotlar mutaxassisi.`),
    Q(`AI uchun yorliq qo'yuvchi?`, `Ma'lumot belgilovchi`, [`Futbolchi`, `Sotuvchi`], `Data labeler.`),
    Q(`AI kasblarni faqat yo'q qiladimi?`, `Yo'q, yangi kasblar ham yaratadi`, [`Ha, hammasini`, `Kasblarga ta'siri yo'q`], `Yangi imkoniyatlar.`),
    Q(`Shifokor AI dan qanday foydalanadi?`, `Rasm tahlilida yordamchi sifatida`, [`Bemorni AI ga topshirib ketadi`, `Foydalanmaydi`], `Yordamchi.`),
    Q(`Kelajak uchun muhim ko'nikma?`, `Mustaqil fikrlash`, [`Hech narsa o'rganmaslik`, `Faqat yodlash`], `Tanqidiy fikrlash.`),
    Q(`AI ni nima deb bilish kerak?`, `Ish quroli`, [`Raqib`, `Sehr`], `Vosita.`),
    Q(`AI xavfsizligi mutaxassisi nima qiladi?`, `AI zarar yetkazmasligini tekshiradi`, [`AI ni o'chiradi`, `Kompyuter sotadi`], `AI safety.`),
    Q(`AI sohasiga tayyorlanish uchun nimani o'rganish foydali?`, `Dasturlash va matematika`, [`Faqat o'yin o'ynash`, `Hech narsa`], `Asos.`),
    Q(`"Butun umr o'rganish" nima uchun muhim?`, `Texnologiya tez o'zgaradi`, [`Maktab tugamaydi`, `Muhim emas`], `Moslashish.`)
  ],
  prac: { type: 'lab', task: `Har bir kasb egasi AI dan <b>qanday foydalanishi</b> mumkinligini tanlang.`,
    lab: matcher([
      ['🩺', 'Shifokor', 'Rentgen rasmlarini tez tahlil qiladi'],
      ['🌾', 'Fermer', 'Kasal o\'simliklarni dron rasmidan topadi'],
      ['👩‍🏫', 'O\'qituvchi', 'Har o\'quvchiga mos mashq tayyorlaydi'],
      ['🎨', 'Dizayner', 'Yangi g\'oyalar uchun eskiz yaratadi'],
      ['🚚', 'Logistika xodimi', 'Yuk uchun eng qisqa yo\'lni topadi'],
      ['🌦️', 'Meteorolog', 'Ob-havoni aniqroq bashorat qiladi']
    ]) }
},
{
  t: `Yakuniy loyiha: mening AI yordamchim`, min: 35,
  key: `AI loyiha: muammo → ma'lumot → model nima qiladi → qanday tekshiramiz → xavfsizlik qoidasi.`,
  theory: `<p>Tabriklaymiz! Siz AI asoslarini o'rgandingiz. Endi haqiqiy AI mutaxassislari kabi <b>o'z AI loyihangizni</b> rejalashtirasiz.</p>
<p>Har bir AI loyiha 5 ta savoldan boshlanadi:</p>
<ol><li>🎯 <b>Muammo</b>: qanday muammoni hal qilamiz? (Masalan: maktab oshxonasida ovqat ko'p isrof bo'lyapti.)</li><li>📦 <b>Ma'lumot</b>: AI nimadan o'rganadi? (Har kungi ovqat va qolgan porsiyalar soni.)</li><li>🤖 <b>AI nima qiladi</b>: tanish, bashorat, tavsiya yoki yaratish? (Ertaga nechta porsiya kerakligini bashorat qiladi.)</li><li>✅ <b>Tekshirish</b>: AI to'g'ri ishlayotganini qanday bilamiz? (Bashoratni haqiqiy son bilan solishtiramiz.)</li><li>🛡️ <b>Xavfsizlik</b>: qanday qoida kerak? (O'quvchilarning ismi saqlanmaydi.)</li></ol>
<p>Pastdagi mashqda o'z g'oyangizni yozing. Natijada chiroyli <b>loyiha kartasi</b> paydo bo'ladi. Uni chop etib, sinfda taqdim qilishingiz mumkin!</p>`,
  quiz: [
    Q(`AI loyiha nimadan boshlanadi?`, `Muammoni aniqlashdan`, [`Kompyuter sotib olishdan`, `Logodan`], `Avval muammo.`),
    Q(`"AI nimadan o'rganadi?" savoli qaysi qism?`, `Ma'lumot`, [`Xavfsizlik`, `Muammo`], `Data.`),
    Q(`Oshxona misolida AI nima qiladi?`, `Kerakli porsiyani bashorat qiladi`, [`Ovqat pishiradi`, `Idish yuvadi`], `Bashorat.`),
    Q(`AI to'g'ri ishlashini qanday bilamiz?`, `Natijani haqiqiy qiymat bilan solishtirib`, [`Taxmin qilib`, `Bilib bo'lmaydi`], `Tekshirish.`),
    Q(`Xavfsizlik qoidasiga misol?`, `Shaxsiy ma'lumot saqlanmaydi`, [`Hamma ma'lumot ochiq`, `Parol yo'q`], `Maxfiylik.`),
    Q(`AI ning 4 asosiy vazifasi?`, `Tanish, bashorat, tavsiya, yaratish`, [`Yugurish, sakrash, uchish, suzish`, `Yozish, o'chirish, nusxa, chop`], `Kursda o'rgandik.`),
    Q(`Yaxshi ma'lumot qanday bo'ladi?`, `Ko'p, to'g'ri, har xil`, [`Kam`, `Bir xil`], `4-dars.`),
    Q(`Loyihani kimga taqdim qilish mumkin?`, `Sinf va o'qituvchiga`, [`Hech kimga`, `Faqat AI ga`], `Taqdimot.`),
    Q(`AI loyihada odamning roli?`, `Muammo tanlash, tekshirish va mas'uliyat`, [`Roli yo'q`, `Faqat tugma bosish`], `Odam boshqaradi.`),
    Q(`Kurs davomida qaysi mavzuni o'rgandik?`, `Hammasi: ma'lumot, neyron, prompt, xavfsizlik`, [`Faqat rasm chizish`, `Faqat o'yin`], `To'liq kurs.`)
  ],
  prac: { type: 'lab', task: `O'z AI loyihangizni rejalashtiring. Har bir maydonga kamida 15 belgi yozing, so'ng "Loyiha kartasini yaratish" ni bosing.`,
    lab: (host, done) => {
      const F = [['nm', '🏷️ Loyiha nomi', 'Masalan: Aqlli oshxona'], ['mu', '🎯 Muammo', 'Qanday muammoni hal qiladi?'], ['ma', '📦 Ma\'lumot', 'AI nimadan o\'rganadi?'], ['ish', '🤖 AI nima qiladi', 'Tanish / bashorat / tavsiya / yaratish'], ['tk', '✅ Qanday tekshiramiz', 'AI to\'g\'ri ishlashini qanday bilamiz?'], ['xv', '🛡️ Xavfsizlik qoidasi', 'Qanday qoida kerak?']];
      host.innerHTML = F.map(f => '<label class="sl"><span>' + f[1] + '</span><textarea class="inp" id="f_' + f[0] + '" rows="2" placeholder="' + esc(f[2]) + '"></textarea></label>').join('') + '<div class="acts"><button class="btn pri" id="mk">Loyiha kartasini yaratish</button><span class="lab-msg" id="lmsg" role="status"></span></div><div id="card"></div>';
      host.querySelector('#mk').onclick = () => {
        const v = {}; F.forEach(f => v[f[0]] = host.querySelector('#f_' + f[0]).value.trim());
        const short = F.filter(f => v[f[0]].length < (f[0] === 'nm' ? 3 : 15)), m = host.querySelector('#lmsg');
        if (short.length) return say(m, 'Batafsilroq yozing: ' + short.map(f => f[1].replace(/^\S+\s/, '')).join(', '), false);
        host.querySelector('#card').innerHTML = '<div class="ai-card"><p class="ai-card-k">AI loyiha kartasi</p><h3>' + esc(v.nm) + '</h3>' + F.slice(1).map(f => '<div><b>' + f[1] + '</b><p>' + esc(v[f[0]]) + '</p></div>').join('') + '<button class="btn sm noprint" onclick="window.print()">Chop etish</button></div>';
        say(m, 'Loyiha tayyor! Siz endi AI loyihasini rejalashtira olasiz 🚀', true); done();
      };
    } }
}
]});
}
