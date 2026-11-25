{
const x = KM.x, c = KM.c;
KM.sinf({ n: 10, stage: 'yuqori', t: `DOM va hodisalar`, d: `JavaScript bilan sahifani boshqarish: elementlar, tugmalar, ro'yxatlar.`, lessons: [
{
  t: `DOM: sahifani boshqaramiz`, min: 30,
  key: `document.querySelector() elementni topadi, textContent matnini, style ko'rinishini o'zgartiradi.`,
  theory: `<p>Brauzer HTML sahifani JavaScript tushunadigan daraxtga aylantiradi. Bu daraxt <b>DOM</b> deyiladi.</p>
${x(`const s = document.querySelector("#salom");
s.textContent = "Yangi matn";
s.style.color = "blue";

const p = document.createElement("p");
p.textContent = "Men JS bilan yaratildim";
document.body.appendChild(p);`, 'js')}
<ul><li>${c('querySelector')} CSS selektori bilan elementni topadi.</li><li>${c('textContent')} element matni.</li><li>${c('style.xxx')} CSS xususiyati. Chiziqcha o'rniga katta harf: ${c('background-color')} → ${c('backgroundColor')}.</li><li>${c('createElement')} yangi element yaratadi, ${c('appendChild')} uni sahifaga qo'shadi.</li></ul>`,
  quiz: [
    [`id="quti" elementni topish:`, [`querySelector("quti")`, `querySelector("#quti")`, `querySelector(".quti")`], 1, `id uchun # belgisi.`],
    [`JS'da background-color qanday yoziladi?`, [`style.background-color`, `style.backgroundColor`, `style.bgcolor`], 1, `camelCase: backgroundColor.`]
  ],
  prac: {
    task: `1) ${c('#salom')} matnini "Salom, JavaScript!" qiling. 2) ${c('#quti')} ga fon rangi bering. 3) JS bilan yangi ${c('<p>')} yaratib sahifaga qo'shing.`,
    tabs: ['html', 'js'], open: 'js',
    html: `<h1 id="salom">Salom!</h1>\n<div id="quti">Men qutiman</div>\n`,
    js: `const sarlavha = document.querySelector("#salom");\n\n`,
    tests: [
      [`#salom matni "Salom, JavaScript!"`, () => document.querySelector('#salom').textContent.trim() === 'Salom, JavaScript!'],
      [`#quti fon rangi bor`, () => getComputedStyle(document.querySelector('#quti')).backgroundColor !== 'rgba(0, 0, 0, 0)'],
      [`Sahifada yangi <p> bor`, () => document.querySelectorAll('body p').length >= 1]
    ],
    hint: `sarlavha.textContent = "Salom, JavaScript!";\ndocument.querySelector("#quti").style.backgroundColor = "gold";`,
    sol: { js: `const sarlavha = document.querySelector("#salom");\nsarlavha.textContent = "Salom, JavaScript!";\n\nconst quti = document.querySelector("#quti");\nquti.style.backgroundColor = "gold";\n\nconst p = document.createElement("p");\np.textContent = "Men JS bilan yaratildim";\ndocument.body.appendChild(p);\n` }
  }
},
{
  t: `Tugmalar va hisoblagich`, min: 30,
  key: `addEventListener("click", ...) tugma bosilganda funksiyani ishga tushiradi.`,
  theory: `<p>Foydalanuvchi biror narsa qilganda (bosish, yozish, sichqonchani surish) <b>hodisa</b> (event) yuz beradi. Unga javob beramiz:</p>
${x(`const tugma = document.querySelector("#plus");
let n = 0;

tugma.addEventListener("click", function () {
  n = n + 1;
  document.querySelector("#son").textContent = n;
});`, 'js')}
<p>Kodni takrorlamaslik uchun ekranni yangilashni alohida funksiyaga chiqaramiz: ${c('function yangila() { ... }')}. Keyin uni har bir tugmada chaqiramiz.</p>`,
  quiz: [
    [`Bosish hodisasi nomi:`, [`"press"`, `"click"`, `"tap"`], 1, `click.`],
    [`addEventListener ikkinchi qiymati nima?`, [`Hodisa yuz berganda ishlaydigan funksiya`, `Tugma rangi`, `Vaqt`], 0, `Bu funksiya "handler" deyiladi.`]
  ],
  prac: {
    task: `Hisoblagichni tugating: ${c('+')} oshirsin, ${c('−')} kamaytirsin (lekin 0 dan pastga tushmasin), "Nol" 0 ga qaytarsin.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<h1 id="son">0</h1>\n<button id="plus">+</button>\n<button id="minus">−</button>\n<button id="nol">Nol</button>\n`,
    css: `body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 24px;\n}\n\n#son {\n  font-size: 72px;\n  margin: 0 0 16px;\n}\n\nbutton {\n  font-size: 20px;\n  padding: 10px 20px;\n  margin: 4px;\n}\n`,
    js: `const son = document.querySelector("#son");\nlet n = 0;\n\nfunction yangila() {\n  son.textContent = n;\n}\n\ndocument.querySelector("#plus").addEventListener("click", function () {\n  n = n + 1;\n  yangila();\n});\n\n// minus va nol tugmalarini yozing\n`,
    tests: [
      [`+ ikki marta → 2`, () => { const b = document.querySelector('#plus'); b.click(); b.click(); return document.querySelector('#son').textContent.trim() === '2'; }],
      [`− bir marta → 1`, () => { document.querySelector('#minus').click(); return document.querySelector('#son').textContent.trim() === '1'; }],
      [`Nol → 0`, () => { document.querySelector('#nol').click(); return document.querySelector('#son').textContent.trim() === '0'; }],
      [`0 da − bosilsa, 0 qoladi`, () => { document.querySelector('#minus').click(); return document.querySelector('#son').textContent.trim() === '0'; }]
    ],
    hint: `document.querySelector("#minus").addEventListener("click", function () {\n  if (n > 0) n = n - 1;\n  yangila();\n});`,
    sol: { js: `const son = document.querySelector("#son");\nlet n = 0;\n\nfunction yangila() {\n  son.textContent = n;\n}\n\ndocument.querySelector("#plus").addEventListener("click", function () {\n  n = n + 1;\n  yangila();\n});\n\ndocument.querySelector("#minus").addEventListener("click", function () {\n  if (n > 0) n = n - 1;\n  yangila();\n});\n\ndocument.querySelector("#nol").addEventListener("click", function () {\n  n = 0;\n  yangila();\n});\n` }
  }
},
{
  t: `Vazifalar ro'yxati (to-do)`, min: 35,
  key: `input.value yozilgan matn. trim() bo'sh joylarni olib tashlaydi.`,
  theory: `<p>Haqiqiy ilova: foydalanuvchi vazifa yozadi, "Qo'shish" bosadi, vazifa ro'yxatga tushadi.</p>
${x(`const input = document.querySelector("#matn");

const matn = input.value.trim();  // yozilgan matn
if (matn === "") return;           // bo'sh bo'lsa, to'xtaymiz

const li = document.createElement("li");
li.textContent = matn;
royxat.appendChild(li);
input.value = "";                  // maydonni tozalash`, 'js')}
<p>Yaxshi ilova xatolardan himoyalanadi: bo'sh vazifa qo'shilmaydi, qo'shilgandan keyin maydon tozalanadi.</p>`,
  quiz: [
    [`Input ga yozilgan matnni qanday olamiz?`, [`input.text`, `input.value`, `input.content`], 1, `value.`],
    [`"  salom  ".trim() natijasi:`, [`"salom"`, `"  salom"`, `""`], 0, `trim ikki chetdagi bo'sh joylarni olib tashlaydi.`]
  ],
  prac: {
    task: `"Qo'shish" bosilganda yozilgan vazifa ${c('#royxat')} ga ${c('<li>')} bo'lib qo'shilsin, maydon tozalansin. Bo'sh yoki faqat probeldan iborat matn qo'shilmasin.`,
    tabs: ['html', 'css', 'js'], open: 'js',
    html: `<h2>Bugungi vazifalar</h2>\n<input id="matn" placeholder="Yangi vazifa">\n<button id="qosh">Qo'shish</button>\n<ul id="royxat"></ul>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n\ninput, button {\n  font-size: 16px;\n  padding: 8px;\n}\n\nli {\n  padding: 6px 0;\n}\n`,
    js: `const input = document.querySelector("#matn");\nconst royxat = document.querySelector("#royxat");\n\ndocument.querySelector("#qosh").addEventListener("click", function () {\n  // shu yerga yozing\n\n});\n`,
    tests: [
      [`Vazifa ro'yxatga qo'shiladi`, () => { const i = document.querySelector('#matn'); i.value = 'Uy vazifasi'; document.querySelector('#qosh').click(); const l = document.querySelectorAll('#royxat li'); return l.length === 1 && l[0].textContent.includes('Uy vazifasi'); }],
      [`Qo'shilgandan keyin maydon tozalanadi`, () => document.querySelector('#matn').value === ''],
      [`Bo'sh matn qo'shilmaydi`, () => { const i = document.querySelector('#matn'); i.value = ''; document.querySelector('#qosh').click(); return document.querySelectorAll('#royxat li').length === 1; }],
      [`Faqat probel ham qo'shilmaydi`, () => { const i = document.querySelector('#matn'); i.value = '   '; document.querySelector('#qosh').click(); return document.querySelectorAll('#royxat li').length === 1; }]
    ],
    hint: `const matn = input.value.trim();\nif (matn === "") return;\nconst li = document.createElement("li");\n...`,
    sol: { js: `const input = document.querySelector("#matn");\nconst royxat = document.querySelector("#royxat");\n\ndocument.querySelector("#qosh").addEventListener("click", function () {\n  const matn = input.value.trim();\n  if (matn === "") return;\n\n  const li = document.createElement("li");\n  li.textContent = matn;\n  royxat.appendChild(li);\n  input.value = "";\n});\n` }
  }
}
] });
}
