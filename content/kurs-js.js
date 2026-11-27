/* JavaScript kursi: sahifani jonlantirish. 22 ta oson dars, har birida nazariya, 10 ta test va avtomatik tekshiriladigan amaliyot. */
{
const x = KM.x, c = KM.c, Q = (q, a, w, why) => [q, [a].concat(w), 0, why || ''];
const J = (task, js, tests, hint, sol, html, css) => ({ task, tabs: html ? ['html', 'css', 'js'] : ['js'], open: 'js', html: html || '<p>Natijani pastdagi <b>Konsol</b> oynasida ko\'ring.</p>\n', css: css || 'body {\n  font-family: system-ui, sans-serif;\n  padding: 16px;\n}\n', js, tests, hint, sol: { js: sol } });
KM.kurs({ n: 'js', o: 3, stage: 'yuqori', ic: 'JS', t: 'JavaScript', d: `Sahifani jonlantirish: o'zgaruvchilar, shartlar, sikllar, funksiyalar va tugmalar bilan ishlash.`, lessons: [
{
  t: `Birinchi dastur: console.log`, min: 15,
  key: `console.log("matn") konsolga yozadi. Matn qo'shtirnoqda, buyruq ; bilan tugaydi.`,
  theory: `<p>HTML skelet, CSS kiyim bo'lsa, <b>JavaScript</b> (JS) sahifaning <b>miyasi</b>: tugma bosilganda nimadir qiladi, hisoblaydi, o'yin yasaydi.</p>
<p>Birinchi buyruq: konsolga yozish.</p>
${x(`console.log("Salom, dunyo!");
console.log(2 + 3);`, 'js')}
<ul><li>${c('console.log(...)')} qavs ichidagini <b>Konsol</b> oynasiga chiqaradi. Dasturchilar uni tekshirish uchun doim ishlatadi.</li><li>Matn qo'shtirnoqda: ${c('"Salom"')} yoki ${c("'Salom'")}.</li><li>Son qo'shtirnoqsiz: ${c('2 + 3')} hisoblanib, ${c('5')} chiqadi.</li><li>Har bir buyruq oxirida ${c(';')}.</li></ul>
<p>Izoh: ${c('// bir qatorli izoh')} yoki ${c('/* ko\'p qatorli */')}.</p>`,
  quiz: [
    Q(`Konsolga yozish buyrug'i?`, `console.log()`, [`print()`, `write.console()`], `console.log.`),
    Q(`Matn qanday yoziladi?`, `Qo'shtirnoqda`, [`Qavsda`, `Belgisiz`], `"Salom".`),
    Q(`console.log(2 + 3) nima chiqaradi?`, `5`, [`2 + 3`, `23`], `Son hisoblanadi.`),
    Q(`console.log("2 + 3") nima chiqaradi?`, `2 + 3`, [`5`, `Xato`], `Qo'shtirnoqdagi matn o'zgarmaydi.`),
    Q(`JS da bir qatorli izoh?`, `// izoh`, [`<!-- izoh -->`, `# izoh`], `//.`),
    Q(`Buyruq nima bilan tugaydi?`, `;`, [`.`, `:`], `Nuqtali vergul.`),
    Q(`JS sahifaning nimasi?`, `Miyasi (harakat, mantiq)`, [`Kiyimi`, `Skeleti`], `Jonlantiradi.`),
    Q(`Konsol nima uchun?`, `Dastur natijasi va xatolarni ko'rish`, [`Rasm chizish`, `Musiqa`], `Tekshirish oynasi.`),
    Q(`To'g'ri yozuv?`, `console.log("Salom");`, [`console.log(Salom);`, `Console.Log "Salom"`], `Qo'shtirnoq va kichik harf.`),
    Q(`JS da katta-kichik harf farqi bormi?`, `Ha`, [`Yo'q`, `Faqat sonlarda`], `console va Console har xil.`)
  ],
  prac: J(`Konsolga ${c('"Salom, dunyo!"')} va keyingi qatorda ismingizni chiqaring. Keyin ${c('7 * 6')} ni hisoblab chiqaring.`, `// Shu yerga yozing\n`,
    [[`"Salom, dunyo!" chiqdi`, () => window.__logs.some(l => /salom,?\s*dunyo/i.test(l))],
     [`Kamida 3 ta console.log`, () => window.__logs.length >= 3],
     [`42 chiqdi (7 * 6)`, () => window.__logs.includes('42')]],
    `console.log("Salom, dunyo!");\nconsole.log("Ali");\nconsole.log(7 * 6);`, `console.log("Salom, dunyo!");\nconsole.log("Ali");\nconsole.log(7 * 6);\n`)
},
{
  t: `O'zgaruvchilar: let va const`, min: 20,
  key: `let o'zgaradigan, const o'zgarmas qiymat saqlaydi. Nom = qiymat.`,
  theory: `<p><b>O'zgaruvchi</b> qiymat saqlaydigan "quti". Uning nomi bor, ichida qiymat turadi.</p>
${x(`let ism = "Malika";
let yosh = 12;
const maktab = "ZIS";

console.log(ism);     // Malika
yosh = 13;            // let ni o'zgartirsa bo'ladi
console.log(yosh);    // 13`, 'js')}
<ul><li>${c('let')}: keyin o'zgarishi mumkin bo'lgan qiymat.</li><li>${c('const')}: o'zgarmas qiymat. ${c('maktab = "boshqa"')} desangiz xato beradi.</li><li>${c('=')} "teng" emas, "qiymat ber" degani.</li><li>Nomlar: harf bilan boshlanadi, probelsiz. Ikki so'z bo'lsa: ${c('meningYoshim')} (camelCase).</li></ul>`,
  quiz: [
    Q(`O'zgaradigan o'zgaruvchi kalit so'zi?`, `let`, [`const`, `var=`], `let.`),
    Q(`O'zgarmas qiymat?`, `const`, [`let`, `fix`], `const.`),
    Q(`let x = 5; da = nima?`, `Qiymat berish`, [`Tenglikni tekshirish`, `Qo'shish`], `Assign.`),
    Q(`const a = 1; a = 2; nima bo'ladi?`, `Xato`, [`a 2 bo'ladi`, `a 3 bo'ladi`], `const o'zgarmaydi.`),
    Q(`To'g'ri nom?`, `meningYoshim`, [`mening yoshim`, `1yosh`], `Probelsiz, harf bilan boshlanadi.`),
    Q(`let ism = "Ali"; console.log(ism) nima?`, `Ali`, [`ism`, `"ism"`], `O'zgaruvchi qiymati.`),
    Q(`console.log("ism") nima?`, `ism`, [`Ali`, `Xato`], `Qo'shtirnoqda matn.`),
    Q(`camelCase misoli?`, `sinfRaqami`, [`sinf_raqami_`, `SINF RAQAMI`], `Ikkinchi so'z katta harf bilan.`),
    Q(`O'zgaruvchi nimaga o'xshaydi?`, `Nomli qutiga`, [`Rasmga`, `Tugmaga`], `Qiymat saqlaydi.`),
    Q(`let yosh = 12; yosh = yosh + 1; endi yosh?`, `13`, [`12`, `1`], `12 + 1.`)
  ],
  prac: J(`${c('let ism')} ga ismingizni, ${c('let yosh')} ga yoshingizni (son) saqlang. ${c('const maktab = "ZIS"')} yozing. Keyin ${c('yosh')} ni 1 ga oshirib, uchala o'zgaruvchini konsolga chiqaring.`, `\n`,
    [[`ism matn`, () => typeof ism === 'string' && ism.trim().length > 0],
     [`yosh son`, () => typeof yosh === 'number'],
     [`maktab = "ZIS"`, () => maktab === 'ZIS'],
     [`Konsolda ism chiqdi`, () => window.__logs.some(l => l.includes(ism))]],
    `let ism = "Ali";\nlet yosh = 12;\nconst maktab = "ZIS";\nyosh = yosh + 1;\nconsole.log(ism);\nconsole.log(yosh);\nconsole.log(maktab);`, `let ism = "Ali";\nlet yosh = 12;\nconst maktab = "ZIS";\n\nyosh = yosh + 1;\n\nconsole.log(ism);\nconsole.log(yosh);\nconsole.log(maktab);\n`)
},
{
  t: `Sonlar va arifmetika`, min: 20,
  key: `+ - * / amallar, % bo'linma qoldig'i, ** daraja. Qavslar avval hisoblanadi.`,
  theory: `${x(`let a = 17;
let b = 5;
console.log(a + b);   // 22
console.log(a - b);   // 12
console.log(a * b);   // 85
console.log(a / b);   // 3.4
console.log(a % b);   // 2  (qoldiq)
console.log(2 ** 3);  // 8  (daraja)
console.log((2 + 3) * 4); // 20`, 'js')}
<ul><li>${c('%')}: bo'lishdagi qoldiq. ${c('n % 2 === 0')} bo'lsa son <b>juft</b>.</li><li>Tartib maktabdagidek: avval qavs, keyin ${c('* /')}, keyin ${c('+ -')}.</li><li>Qisqa yozuvlar: ${c('x += 5')} (x = x + 5), ${c('x++')} (1 ga oshirish), ${c('x--')}.</li><li>${c('Math.round(3.6)')} = 4 (yaxlitlash), ${c('Math.max(3, 9)')} = 9.</li></ul>`,
  quiz: [
    Q(`17 % 5 nechaga teng?`, `2`, [`3`, `3.4`], `17 = 5*3 + 2.`),
    Q(`2 ** 3?`, `8`, [`6`, `5`], `2 ning kubi.`),
    Q(`(2 + 3) * 4?`, `20`, [`14`, `24`], `Avval qavs.`),
    Q(`2 + 3 * 4?`, `14`, [`20`, `24`], `Avval ko'paytirish.`),
    Q(`x += 5 nima?`, `x = x + 5`, [`x = 5`, `x = x * 5`], `Qisqa yozuv.`),
    Q(`x++ nima qiladi?`, `x ni 1 ga oshiradi`, [`x ni 2 ga ko'paytiradi`, `Xato`], `Inkrement.`),
    Q(`Son juftligini tekshirish?`, `n % 2 === 0`, [`n / 2 === 0`, `n * 2 === 0`], `Qoldiq 0.`),
    Q(`Math.round(3.6)?`, `4`, [`3`, `3.6`], `Yaxlitlash.`),
    Q(`10 / 4?`, `2.5`, [`2`, `3`], `Kasr chiqadi.`),
    Q(`Math.max(3, 9, 5)?`, `9`, [`3`, `17`], `Eng kattasi.`)
  ],
  prac: J(`${c('let narx = 12000')} va ${c('let soni = 3')} yozing. ${c('let jami')} ga ularning ko'paytmasini saqlab, konsolga chiqaring. ${c('let qoldiq')} ga ${c('soni % 2')} ni saqlang.`, `\n`,
    [[`narx = 12000, soni = 3`, () => narx === 12000 && soni === 3],
     [`jami = 36000`, () => jami === 36000],
     [`Konsolda 36000`, () => window.__logs.includes('36000')],
     [`qoldiq = 1`, () => qoldiq === 1]],
    `let narx = 12000;\nlet soni = 3;\nlet jami = narx * soni;\nconsole.log(jami);\nlet qoldiq = soni % 2;`, `let narx = 12000;\nlet soni = 3;\nlet jami = narx * soni;\nconsole.log(jami);\n\nlet qoldiq = soni % 2;\nconsole.log(qoldiq);\n`)
},
{
  t: `Matnlar (string)`, min: 20,
  key: `Matnlarni + bilan birlashtirish yoki \`Salom, \${ism}\` shablon bilan yozish. .length uzunlik.`,
  theory: `${x(`let ism = "Ali";
let salom = "Salom, " + ism + "!";
console.log(salom);              // Salom, Ali!

let xabar = \`Men \${ism}, \${12 + 1} yoshdaman\`;
console.log(xabar);              // Men Ali, 13 yoshdaman

console.log(ism.length);         // 3
console.log(ism.toUpperCase());  // ALI`, 'js')}
<ul><li>${c('+')} matnlarni yopishtiradi. Diqqat: ${c('"5" + 2')} = ${c('"52"')} (matn bo'lib qoladi).</li><li><b>Shablon</b>: teskari qo'shtirnoq (${c('`')}, klaviaturada 1 ning chapida) va ichida ${c('${...}')}.</li><li>${c('.length')}: harflar soni. ${c('.toUpperCase()')} KATTA, ${c('.toLowerCase()')} kichik.</li><li>${c('.includes("li")')}: matn ichida bormi (true/false).</li></ul>`,
  quiz: [
    Q(`"Salom, " + "Ali" natijasi?`, `Salom, Ali`, [`SalomAli,`, `Xato`], `Yopishtiradi.`),
    Q(`"5" + 2?`, `"52"`, [`7`, `Xato`], `Matnga yopishadi.`),
    Q(`"Ali".length?`, `3`, [`1`, `4`], `3 ta harf.`),
    Q(`Shablon qanday qo'shtirnoq bilan?`, `Teskari: \``, [`Oddiy: "`, `Burchak: <`], `Backtick.`),
    Q(`Shablon ichida o'zgaruvchi?`, `\${ism}`, [`(ism)`, `#ism`], `\${...}`),
    Q(`"ali".toUpperCase()?`, `ALI`, [`ali`, `Ali`], `Katta harf.`),
    Q(`"Toshkent".includes("kent")?`, `true`, [`false`, `kent`], `Bor.`),
    Q(`Kichik harfga o'tkazish?`, `.toLowerCase()`, [`.small()`, `.lower`], `toLowerCase.`),
    Q(`\`2+2=\${2+2}\` natijasi?`, `2+2=4`, [`2+2=2+2`, `Xato`], `Ifoda hisoblanadi.`),
    Q(`Matn turining nomi?`, `string`, [`number`, `text`], `string.`)
  ],
  prac: J(`${c('let ism')} va ${c('let shahar')} yozing. Shablon (teskari qo'shtirnoq) bilan ${c('let tanishuv')} yasang: "Men Ali, Toshkentdanman" ko'rinishida. Uni va ${c('ism.length')} ni konsolga chiqaring.`, `\n`,
    [[`ism va shahar matn`, () => typeof ism === 'string' && typeof shahar === 'string' && ism && shahar],
     [`tanishuv ichida ism va shahar bor`, () => typeof tanishuv === 'string' && tanishuv.includes(ism) && tanishuv.includes(shahar)],
     [`Konsolda tanishuv`, () => window.__logs.includes(tanishuv)],
     [`Konsolda ism uzunligi`, () => window.__logs.includes(String(ism.length))]],
    'let ism = "Ali";\nlet shahar = "Toshkent";\nlet tanishuv = `Men ${ism}, ${shahar}danman`;\nconsole.log(tanishuv);\nconsole.log(ism.length);', 'let ism = "Ali";\nlet shahar = "Toshkent";\nlet tanishuv = `Men ${ism}, ${shahar}danman`;\nconsole.log(tanishuv);\nconsole.log(ism.length);\n')
},
{
  t: `Shartlar: if va else`, min: 20,
  key: `if (shart) { ... } else { ... }: shart rost bo'lsa birinchi qism, aks holda ikkinchisi bajariladi.`,
  theory: `<p>Dastur qaror qabul qilishi kerak: "Agar ... bo'lsa, unda ...".</p>
${x(`let baho = 85;

if (baho >= 90) {
  console.log("A'lo!");
} else if (baho >= 70) {
  console.log("Yaxshi");
} else {
  console.log("Harakat qiling");
}`, 'js')}
<p>Taqqoslash belgilari:</p>
<table class="mdt"><thead><tr><th>Belgi</th><th>Ma'nosi</th></tr></thead><tbody>
<tr><td>${c('>')} ${c('<')}</td><td>katta, kichik</td></tr><tr><td>${c('>=')} ${c('<=')}</td><td>katta yoki teng, kichik yoki teng</td></tr>
<tr><td>${c('===')}</td><td>teng</td></tr><tr><td>${c('!==')}</td><td>teng emas</td></tr></tbody></table>
<div class="note">${c('=')} qiymat beradi, ${c('===')} tenglikni tekshiradi. Shartda doim ${c('===')} ishlating.</div>`,
  quiz: [
    Q(`Shart operatori?`, `if`, [`when`, `check`], `if: agar.`),
    Q(`Shart yolg'on bo'lsa qaysi qism?`, `else`, [`if`, `then`], `else: aks holda.`),
    Q(`Tenglik tekshirish?`, `===`, [`=`, `=>`], `Uch teng.`),
    Q(`Teng emas?`, `!==`, [`<>`, `=!`], `!==.`),
    Q(`baho = 85 bo'lsa misolda nima chiqadi?`, `Yaxshi`, [`A'lo!`, `Harakat qiling`], `85 >= 70.`),
    Q(`Katta yoki teng?`, `>=`, [`=>`, `>>`], `>=.`),
    Q(`Bir nechta shart ketma-ket?`, `else if`, [`elif`, `or if`], `else if.`),
    Q(`Shart qayerga yoziladi?`, `if dan keyin qavs ichiga`, [`Figurali qavsga`, `Hech qayerga`], `if (shart).`),
    Q(`5 > 3 qiymati?`, `true`, [`false`, `5`], `Rost.`),
    Q(`= va === farqi?`, `= qiymat beradi, === tekshiradi`, [`Farqi yo'q`, `=== qiymat beradi`], `Muhim farq.`)
  ],
  prac: J(`${c('let harorat')} ga istalgan son bering. Agar 25 dan katta bo'lsa "Issiq", 10 dan kichik bo'lsa "Sovuq", aks holda "Yaxshi havo" chiqarsin. Sinash uchun ${c('function havo(t)')} yozing: u shu matnni ${c('return')} qilsin va konsolga chiqarsin.`, `function havo(t) {\n  // shu yerda if / else if / else\n}\n\nlet harorat = 30;\nconsole.log(havo(harorat));\n`,
    [[`havo(30) → "Issiq"`, () => havo(30) === 'Issiq'],
     [`havo(5) → "Sovuq"`, () => havo(5) === 'Sovuq'],
     [`havo(18) → "Yaxshi havo"`, () => havo(18) === 'Yaxshi havo'],
     [`havo(25) → "Yaxshi havo"`, () => havo(25) === 'Yaxshi havo']],
    `function havo(t) {\n  if (t > 25) {\n    return "Issiq";\n  } else if (t < 10) {\n    return "Sovuq";\n  } else {\n    return "Yaxshi havo";\n  }\n}`, `function havo(t) {\n  if (t > 25) {\n    return "Issiq";\n  } else if (t < 10) {\n    return "Sovuq";\n  } else {\n    return "Yaxshi havo";\n  }\n}\n\nlet harorat = 30;\nconsole.log(havo(harorat));\n`)
},
{
  t: `Mantiq: va, yoki, emas`, min: 20,
  key: `&& (va) ikkalasi rost bo'lsa rost, || (yoki) bittasi rost bo'lsa rost, ! (emas) teskarisi.`,
  theory: `${x(`let yosh = 14;
let chiptaBor = true;

if (yosh >= 12 && chiptaBor) {
  console.log("Kinoga kirishingiz mumkin");
}

let kun = "shanba";
if (kun === "shanba" || kun === "yakshanba") {
  console.log("Dam olish kuni!");
}

console.log(!true);   // false`, 'js')}
<ul><li>${c('true')} (rost) va ${c('false')} (yolg'on): <b>boolean</b> qiymatlar.</li><li>${c('&&')}: <b>VA</b>, ikkala shart ham bajarilsin.</li><li>${c('||')}: <b>YOKI</b>, kamida bittasi bajarilsin.</li><li>${c('!')}: <b>EMAS</b>, teskarisini oladi.</li></ul>`,
  quiz: [
    Q(`VA belgisi?`, `&&`, [`||`, `!`], `&&.`),
    Q(`YOKI belgisi?`, `||`, [`&&`, `or`], `||.`),
    Q(`EMAS belgisi?`, `!`, [`?`, `~`], `!.`),
    Q(`true && false?`, `false`, [`true`, `Xato`], `Ikkalasi rost emas.`),
    Q(`true || false?`, `true`, [`false`, `Xato`], `Bittasi rost.`),
    Q(`!false?`, `true`, [`false`, `0`], `Teskarisi.`),
    Q(`Rost/yolg'on turining nomi?`, `boolean`, [`string`, `number`], `boolean.`),
    Q(`yosh = 10, chiptaBor = true. Kinoga kiradimi (yosh >= 12 && chiptaBor)?`, `Yo'q`, [`Ha`, `Xato`], `10 < 12.`),
    Q(`Shanba yoki yakshanbani tekshirish uchun?`, `||`, [`&&`, `!`], `Bittasi yetadi.`),
    Q(`5 > 3 && 2 > 1?`, `true`, [`false`, `5`], `Ikkalasi rost.`)
  ],
  prac: J(`${c('function kirishMumkin(yosh, chipta)')} yozing: yosh 12 yoki katta <b>va</b> chipta ${c('true')} bo'lsa ${c('true')}, aks holda ${c('false')} qaytarsin. ${c('function damOlish(kun)')}: "shanba" <b>yoki</b> "yakshanba" bo'lsa ${c('true')}.`, `function kirishMumkin(yosh, chipta) {\n\n}\n\nfunction damOlish(kun) {\n\n}\n`,
    [[`kirishMumkin(14, true) → true`, () => kirishMumkin(14, true) === true],
     [`kirishMumkin(10, true) → false`, () => kirishMumkin(10, true) === false],
     [`kirishMumkin(15, false) → false`, () => kirishMumkin(15, false) === false],
     [`damOlish("yakshanba") → true`, () => damOlish('yakshanba') === true],
     [`damOlish("dushanba") → false`, () => damOlish('dushanba') === false]],
    `return yosh >= 12 && chipta;\n...\nreturn kun === "shanba" || kun === "yakshanba";`, `function kirishMumkin(yosh, chipta) {\n  return yosh >= 12 && chipta;\n}\n\nfunction damOlish(kun) {\n  return kun === "shanba" || kun === "yakshanba";\n}\n`)
},
{
  t: `Takrorlash: for sikli`, min: 20,
  key: `for (let i = 1; i <= 10; i++) { ... }: boshlanish; shart; qadam. Ichidagi kod har safar bajariladi.`,
  theory: `<p>Bir ishni ko'p marta bajarish kerak bo'lsa, <b>sikl</b> ishlatiladi:</p>
${x(`for (let i = 1; i <= 5; i++) {
  console.log("Qadam " + i);
}
// Qadam 1, Qadam 2, ... Qadam 5`, 'js')}
<p>Qavs ichida uch qism:</p>
<ol><li>${c('let i = 1')}: hisoblagich 1 dan boshlanadi.</li><li>${c('i <= 5')}: shart rost ekan, takrorlanadi.</li><li>${c('i++')}: har qadamdan keyin i bittaga oshadi.</li></ol>
${x(`let yigindi = 0;
for (let i = 1; i <= 100; i++) {
  yigindi += i;
}
console.log(yigindi);  // 5050`, 'js')}
<div class="note">Shart hech qachon yolg'on bo'lmasa, sikl cheksiz aylanadi. Bizning maydon buni sezib, to'xtatadi.</div>`,
  quiz: [
    Q(`Takrorlash nima deyiladi?`, `Sikl`, [`Shart`, `Funksiya`], `Loop.`),
    Q(`for (let i = 1; i <= 5; i++) necha marta?`, `5 marta`, [`4 marta`, `6 marta`], `1,2,3,4,5.`),
    Q(`i++ nima?`, `i ni 1 ga oshirish`, [`i ni 2 ga ko'paytirish`, `i ni o'chirish`], `Qadam.`),
    Q(`for (let i = 0; i < 3; i++) qaysi i lar?`, `0, 1, 2`, [`1, 2, 3`, `0, 1, 2, 3`], `3 dan kichik.`),
    Q(`1 dan 100 gacha yig'indi?`, `5050`, [`100`, `10000`], `Gauss formulasi.`),
    Q(`for ning birinchi qismi?`, `Boshlanish (let i = 1)`, [`Shart`, `Qadam`], `Initsializatsiya.`),
    Q(`Shart doim rost bo'lsa?`, `Cheksiz sikl`, [`Sikl ishlamaydi`, `Bir marta ishlaydi`], `To'xtamaydi.`),
    Q(`10 dan 1 gacha sanash qadami?`, `i--`, [`i++`, `i**`], `Kamaytirish.`),
    Q(`Ikkitadan sanash (2, 4, 6)?`, `i += 2`, [`i++`, `i * 2`], `Qadam 2.`),
    Q(`Siklning ichki kodi qayerda?`, `{ } ichida`, [`( ) ichida`, `Sikldan keyin`], `Tana.`)
  ],
  prac: J(`${c('for')} sikli bilan konsolga 1 dan 10 gacha sonlarni chiqaring. Keyin ${c('let yigindi')} ga 1 dan 10 gacha sonlar yig'indisini hisoblang.`, `\n`,
    [[`Konsolda 1 dan 10 gacha`, () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(n => window.__logs.includes(String(n)))],
     [`yigindi = 55`, () => yigindi === 55]],
    `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}\nlet yigindi = 0;\nfor (let i = 1; i <= 10; i++) {\n  yigindi += i;\n}`, `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}\n\nlet yigindi = 0;\nfor (let i = 1; i <= 10; i++) {\n  yigindi += i;\n}\nconsole.log("Yig'indi:", yigindi);\n`)
},
{
  t: `while sikli`, min: 15,
  key: `while (shart) { ... }: shart rost ekan takrorlanadi. Ichida shartni o'zgartirishni unutmang.`,
  theory: `<p>Necha marta takrorlanishi oldindan noma'lum bo'lsa ${c('while')} qulay:</p>
${x(`let pul = 1000;
let kun = 0;
while (pul < 5000) {
  pul = pul * 2;
  kun++;
}
console.log(kun + " kunda " + pul + " so'm bo'ldi");`, 'js')}
<ul><li>${c('while (shart)')}: shart rost ekan, ichidagi kod qayta-qayta bajariladi.</li><li>Ichida shartga ta'sir qiluvchi narsani o'zgartiring (${c('pul')} oshyapti), aks holda sikl to'xtamaydi.</li><li>${c('break')}: siklni darhol to'xtatadi.</li></ul>`,
  quiz: [
    Q(`while qachon to'xtaydi?`, `Shart yolg'on bo'lganda`, [`10 marta bo'lganda`, `Hech qachon`], `Shart tekshiriladi.`),
    Q(`Siklni darhol to'xtatish?`, `break`, [`stop`, `end`], `break.`),
    Q(`while da nimani unutmaslik kerak?`, `Shartni o'zgartirishni`, [`console.log ni`, `CSS ni`], `Aks holda cheksiz.`),
    Q(`Misolda kun necha bo'ladi?`, `3`, [`5`, `2`], `1000→2000→4000→8000.`),
    Q(`Takrorlar soni noma'lum bo'lsa qaysi sikl qulay?`, `while`, [`for`, `if`], `while.`),
    Q(`let i = 0; while (i < 3) { i++; } oxirida i?`, `3`, [`2`, `4`], `3 da to'xtaydi.`),
    Q(`while (true) { } nima?`, `Cheksiz sikl (break kerak)`, [`Bir marta`, `Xato`], `Doim rost.`),
    Q(`while va if farqi?`, `while takrorlaydi, if bir marta tekshiradi`, [`Farqi yo'q`, `if takrorlaydi`], `Sikl va shart.`),
    Q(`pul = pul * 2 nima?`, `Pulni ikki baravar qiladi`, [`Pulni 2 qiladi`, `Xato`], `Ko'paytirish.`),
    Q(`while qavsida nima yoziladi?`, `Shart`, [`Qadam`, `Matn`], `while (shart).`)
  ],
  prac: J(`${c('function necha(boshlangich, maqsad)')} yozing: boshlang'ich son har qadamda 2 ga ko'paytirilsin, maqsadga yetgunicha (yoki oshguncha) necha qadam kerakligini ${c('while')} bilan sanab qaytarsin.`, `function necha(boshlangich, maqsad) {\n  let qadam = 0;\n  // while ...\n  return qadam;\n}\nconsole.log(necha(1000, 5000));\n`,
    [[`necha(1000, 5000) → 3`, () => necha(1000, 5000) === 3],
     [`necha(1, 16) → 4`, () => necha(1, 16) === 4],
     [`necha(10, 5) → 0`, () => necha(10, 5) === 0]],
    `while (boshlangich < maqsad) {\n  boshlangich = boshlangich * 2;\n  qadam++;\n}`, `function necha(boshlangich, maqsad) {\n  let qadam = 0;\n  while (boshlangich < maqsad) {\n    boshlangich = boshlangich * 2;\n    qadam++;\n  }\n  return qadam;\n}\nconsole.log(necha(1000, 5000));\n`)
},
{
  t: `Massivlar (ro'yxatlar)`, min: 20,
  key: `Massiv [a, b, c] bir nechta qiymatni saqlaydi. Sanoq 0 dan: massiv[0] birinchi element. length uzunlik.`,
  theory: `${x(`let mevalar = ["olma", "nok", "uzum"];

console.log(mevalar[0]);      // olma
console.log(mevalar[2]);      // uzum
console.log(mevalar.length);  // 3

mevalar[1] = "anor";          // nok o'rniga anor
mevalar.push("behi");         // oxiriga qo'shish
console.log(mevalar);         // ["olma","anor","uzum","behi"]`, 'js')}
<ul><li>Massiv ${c('[ ]')} ichida, vergul bilan.</li><li><b>Indeks</b> (tartib raqami) <b>0 dan</b> boshlanadi!</li><li>${c('.length')}: elementlar soni. Oxirgi element: ${c('massiv[massiv.length - 1]')}.</li><li>${c('.push(x)')} oxiriga qo'shadi, ${c('.pop()')} oxirgisini oladi.</li><li>${c('.includes("olma")')} bormi?, ${c('.indexOf("uzum")')} qayerda?</li></ul>`,
  quiz: [
    Q(`Massiv qaysi qavsda?`, `[ ]`, [`{ }`, `( )`], `Kvadrat qavs.`),
    Q(`Birinchi elementning indeksi?`, `0`, [`1`, `-1`], `Sanoq 0 dan.`),
    Q(`["a","b","c"][1]?`, `"b"`, [`"a"`, `"c"`], `Indeks 1 = ikkinchi.`),
    Q(`["a","b","c"].length?`, `3`, [`2`, `4`], `3 ta.`),
    Q(`Oxiriga qo'shish?`, `.push()`, [`.add()`, `.end()`], `push.`),
    Q(`Oxirgisini olib tashlash?`, `.pop()`, [`.push()`, `.cut()`], `pop.`),
    Q(`Element bormi tekshirish?`, `.includes()`, [`.has()`, `.find`], `includes.`),
    Q(`Oxirgi element?`, `m[m.length - 1]`, [`m[m.length]`, `m[last]`], `length - 1.`),
    Q(`m = [5, 8]; m.push(3); m?`, `[5, 8, 3]`, [`[3, 5, 8]`, `[5, 8]`], `Oxiriga.`),
    Q(`["x","y"].indexOf("y")?`, `1`, [`0`, `2`], `Indeks 1.`)
  ],
  prac: J(`${c('let fanlar')} massivini kamida 3 ta fan bilan yarating. ${c('push')} bilan "Informatika" qo'shing. Konsolga birinchi fanni va massiv uzunligini chiqaring.`, `\n`,
    [[`fanlar massiv`, () => Array.isArray(fanlar)],
     [`Kamida 4 ta element`, () => fanlar.length >= 4],
     [`Oxirgisi "Informatika"`, () => fanlar[fanlar.length - 1] === 'Informatika'],
     [`Konsolda birinchi fan`, () => window.__logs.includes(fanlar[0])],
     [`Konsolda uzunlik`, () => window.__logs.includes(String(fanlar.length))]],
    `let fanlar = ["Matematika", "Ona tili", "Ingliz tili"];\nfanlar.push("Informatika");\nconsole.log(fanlar[0]);\nconsole.log(fanlar.length);`, `let fanlar = ["Matematika", "Ona tili", "Ingliz tili"];\nfanlar.push("Informatika");\nconsole.log(fanlar[0]);\nconsole.log(fanlar.length);\n`)
},
{
  t: `Massivni aylanib chiqish`, min: 20,
  key: `for (let i = 0; i < m.length; i++) yoki for (const x of m) bilan har bir elementni olish mumkin.`,
  theory: `${x(`let baholar = [5, 4, 5, 3, 5];

// 1-usul: indeks bilan
for (let i = 0; i < baholar.length; i++) {
  console.log(i + "-baho: " + baholar[i]);
}

// 2-usul: for...of (qulayroq)
let jami = 0;
for (const b of baholar) {
  jami += b;
}
console.log("O'rtacha:", jami / baholar.length);`, 'js')}
<ul><li>${c('i < m.length')}: oxirgi indeks ${c('length - 1')}, shuning uchun ${c('<')}.</li><li>${c('for (const b of baholar)')}: har aylanishda ${c('b')} navbatdagi element.</li><li>Eng kattasini topish: avval ${c('let max = m[0]')}, keyin har birini solishtirish.</li></ul>`,
  quiz: [
    Q(`Har bir elementni olishning qulay usuli?`, `for...of`, [`if...else`, `while(false)`], `for (const x of m).`),
    Q(`Indeksli siklda shart?`, `i < m.length`, [`i <= m.length`, `i > 0`], `Oxirgi indeks length-1.`),
    Q(`[5,4,5,3,5] yig'indisi?`, `22`, [`20`, `25`], `5+4+5+3+5.`),
    Q(`O'rtacha qanday topiladi?`, `Yig'indi / soni`, [`Yig'indi * soni`, `Eng kattasi`], `jami / length.`),
    Q(`for (const b of [1,2]) da b nima?`, `Navbatdagi element`, [`Indeks`, `Massiv`], `Qiymat.`),
    Q(`Eng kattasini topishda boshlang'ich max?`, `m[0]`, [`0`, `m.length`], `Birinchi element.`),
    Q(`i <= m.length xatosi nima beradi?`, `Oxirida undefined`, [`Hech narsa`, `Massiv o'chadi`], `Ortiqcha qadam.`),
    Q(`m[i] nima?`, `i-indeksdagi element`, [`i ta element`, `Massiv uzunligi`], `Indeks bo'yicha.`),
    Q(`Juft sonlarni sanash uchun siklda nima?`, `if (x % 2 === 0) soni++`, [`soni = x`, `break`], `Shart + hisoblagich.`),
    Q(`Bo'sh massiv uzunligi?`, `0`, [`1`, `undefined`], `[] uzunligi 0.`)
  ],
  prac: J(`${c('function eng_katta(m)')} massivdagi eng katta sonni qaytarsin, ${c('function ortacha(m)')} o'rtacha qiymatni qaytarsin. Ikkalasini sikl bilan yozing.`, `function eng_katta(m) {\n\n}\n\nfunction ortacha(m) {\n\n}\n\nconsole.log(eng_katta([5, 4, 5, 3, 5]));\nconsole.log(ortacha([5, 4, 5, 3, 5]));\n`,
    [[`eng_katta([3, 9, 2]) → 9`, () => eng_katta([3, 9, 2]) === 9],
     [`eng_katta([-5, -2, -8]) → -2`, () => eng_katta([-5, -2, -8]) === -2],
     [`ortacha([5, 4, 5, 3, 5]) → 4.4`, () => Math.abs(ortacha([5, 4, 5, 3, 5]) - 4.4) < 1e-9],
     [`ortacha([10, 20]) → 15`, () => ortacha([10, 20]) === 15]],
    `let max = m[0];\nfor (const x of m) {\n  if (x > max) max = x;\n}\nreturn max;`, `function eng_katta(m) {\n  let max = m[0];\n  for (const x of m) {\n    if (x > max) max = x;\n  }\n  return max;\n}\n\nfunction ortacha(m) {\n  let jami = 0;\n  for (const x of m) {\n    jami += x;\n  }\n  return jami / m.length;\n}\n\nconsole.log(eng_katta([5, 4, 5, 3, 5]));\nconsole.log(ortacha([5, 4, 5, 3, 5]));\n`)
},
{
  t: `Funksiyalar`, min: 20,
  key: `function nom(parametr) { ... } qayta ishlatiladigan kod bo'lagi. nom(qiymat) bilan chaqiriladi.`,
  theory: `<p><b>Funksiya</b> nomlangan kod bo'lagi. Bir marta yozib, ko'p marta chaqirasiz:</p>
${x(`function salomlash(ism) {
  console.log("Salom, " + ism + "!");
}

salomlash("Ali");     // Salom, Ali!
salomlash("Malika");  // Salom, Malika!`, 'js')}
<ul><li>${c('function')} kalit so'zi, keyin nom, qavsda <b>parametrlar</b>.</li><li>${c('salomlash("Ali")')}: funksiyani <b>chaqirish</b>. ${c('"Ali"')} parametr ${c('ism')} ga tushadi.</li><li>Parametr bir nechta bo'lishi mumkin: ${c('function qosh(a, b)')}.</li><li>Funksiya yozilgan, lekin chaqirilmasa, hech narsa bo'lmaydi.</li></ul>
${x(`const kvadrat = (n) => n * n;   // qisqa "strelka" funksiya
console.log(kvadrat(7));         // 49`, 'js')}`,
  quiz: [
    Q(`Funksiya e'lon qilish kalit so'zi?`, `function`, [`func`, `def`], `function.`),
    Q(`Funksiyani chaqirish?`, `salomlash("Ali")`, [`call salomlash`, `salomlash`], `Nom + qavs.`),
    Q(`Qavsdagi ism nima?`, `Parametr`, [`Natija`, `Izoh`], `Kirish qiymati.`),
    Q(`Funksiya chaqirilmasa?`, `Ishlamaydi`, [`Baribir ishlaydi`, `Xato beradi`], `Faqat e'lon qilingan.`),
    Q(`Funksiyaning foydasi?`, `Kodni qayta ishlatish`, [`Sahifani bo'yash`, `Foydasi yo'q`], `Takrorlamaslik.`),
    Q(`Ikki parametrli funksiya?`, `function qosh(a, b)`, [`function qosh(a b)`, `function qosh[a, b]`], `Vergul bilan.`),
    Q(`(n) => n * n nima?`, `Strelka funksiya`, [`Massiv`, `Shart`], `Arrow function.`),
    Q(`kvadrat(7)?`, `49`, [`14`, `7`], `7*7.`),
    Q(`salomlash("Malika") nima chiqaradi?`, `Salom, Malika!`, [`Salom, ism!`, `Malika`], `Parametr qiymati.`),
    Q(`Funksiya tanasi qayerda?`, `{ } ichida`, [`( ) ichida`, `[ ] ichida`], `Figurali qavs.`)
  ],
  prac: J(`${c('function salomlash(ism)')} yozing: konsolga ${c('"Salom, ISM!"')} chiqarsin. Uni kamida 2 marta har xil ism bilan chaqiring. ${c('const kvadrat')} strelka funksiyasini ham yozing.`, `\n`,
    [[`salomlash funksiya`, () => typeof salomlash === 'function'],
     [`Kamida 2 ta salom`, () => window.__logs.filter(l => /^Salom, .+!$/.test(l)).length >= 2],
     [`kvadrat(9) → 81`, () => typeof kvadrat === 'function' && kvadrat(9) === 81]],
    `function salomlash(ism) {\n  console.log("Salom, " + ism + "!");\n}\nsalomlash("Ali");\nsalomlash("Malika");\nconst kvadrat = (n) => n * n;`, `function salomlash(ism) {\n  console.log("Salom, " + ism + "!");\n}\n\nsalomlash("Ali");\nsalomlash("Malika");\n\nconst kvadrat = (n) => n * n;\nconsole.log(kvadrat(9));\n`)
},
{
  t: `return: natija qaytarish`, min: 20,
  key: `return qiymatni funksiyadan tashqariga qaytaradi va funksiyani to'xtatadi. Natijani o'zgaruvchiga saqlash mumkin.`,
  theory: `${x(`function qosh(a, b) {
  return a + b;
}

let natija = qosh(3, 4);   // 7
console.log(natija * 10);  // 70
console.log(qosh(1, 1));   // 2`, 'js')}
<ul><li>${c('console.log')} faqat <b>ko'rsatadi</b>. ${c('return')} esa natijani <b>qaytaradi</b>, uni keyin ishlatish mumkin.</li><li>${c('return')} dan keyingi kod bajarilmaydi.</li><li>${c('return')} bo'lmasa funksiya ${c('undefined')} qaytaradi.</li></ul>
${x(`function juftmi(n) {
  return n % 2 === 0;   // true yoki false
}
console.log(juftmi(8));  // true`, 'js')}`,
  quiz: [
    Q(`Natijani qaytarish?`, `return`, [`give`, `console.log`], `return.`),
    Q(`qosh(3, 4) qiymati?`, `7`, [`34`, `undefined`], `3 + 4.`),
    Q(`return dan keyingi kod?`, `Bajarilmaydi`, [`Bajariladi`, `Ikki marta bajariladi`], `Funksiya tugaydi.`),
    Q(`return bo'lmasa funksiya nima qaytaradi?`, `undefined`, [`0`, `Xato`], `Bo'sh.`),
    Q(`console.log va return farqi?`, `log ko'rsatadi, return qaytaradi`, [`Farqi yo'q`, `return ko'rsatadi`], `Muhim farq.`),
    Q(`juftmi(7)?`, `false`, [`true`, `7`], `7 toq.`),
    Q(`let n = qosh(2, 2) * 2; n?`, `8`, [`4`, `6`], `4 * 2.`),
    Q(`Funksiya nechta return qila oladi (bir chaqiriqda)?`, `Bittasi ishlaydi`, [`Hammasi`, `Hech biri`], `Birinchisi bilan tugaydi.`),
    Q(`function f() { return 5; } f() + 1?`, `6`, [`5`, `51`], `5 + 1.`),
    Q(`return qayerda yoziladi?`, `Funksiya ichida`, [`Funksiyadan tashqarida`, `HTML da`], `Funksiya tanasida.`)
  ],
  prac: J(`Uchta funksiya yozing: ${c('qosh(a, b)')} yig'indini, ${c('perimetr(a, b)')} to'rtburchak perimetrini (${c('2 * (a + b)')}), ${c('juftmi(n)')} son juft bo'lsa ${c('true')} qaytarsin.`, `function qosh(a, b) {\n\n}\n\nfunction perimetr(a, b) {\n\n}\n\nfunction juftmi(n) {\n\n}\n`,
    [[`qosh(3, 4) → 7`, () => qosh(3, 4) === 7],
     [`perimetr(3, 5) → 16`, () => perimetr(3, 5) === 16],
     [`juftmi(8) → true`, () => juftmi(8) === true],
     [`juftmi(7) → false`, () => juftmi(7) === false]],
    `return a + b;\nreturn 2 * (a + b);\nreturn n % 2 === 0;`, `function qosh(a, b) {\n  return a + b;\n}\n\nfunction perimetr(a, b) {\n  return 2 * (a + b);\n}\n\nfunction juftmi(n) {\n  return n % 2 === 0;\n}\n\nconsole.log(qosh(3, 4), perimetr(3, 5), juftmi(8));\n`)
},
{
  t: `Obyektlar`, min: 20,
  key: `Obyekt { kalit: qiymat } bir narsa haqidagi ma'lumotlarni birga saqlaydi. obyekt.kalit bilan olinadi.`,
  theory: `<p>Bitta o'quvchi haqida ism, sinf, bahoni saqlash kerak. Buning uchun <b>obyekt</b>:</p>
${x(`let oquvchi = {
  ism: "Malika",
  sinf: 7,
  baholar: [5, 5, 4]
};

console.log(oquvchi.ism);       // Malika
oquvchi.sinf = 8;               // o'zgartirish
oquvchi.shahar = "Toshkent";    // yangi xususiyat
console.log(oquvchi.baholar[0]); // 5`, 'js')}
<ul><li>Obyekt ${c('{ }')} ichida, ${c('kalit: qiymat')} juftliklari vergul bilan.</li><li>${c('obyekt.kalit')} yoki ${c('obyekt["kalit"]')} bilan olinadi.</li><li>Qiymat istalgan narsa: son, matn, massiv, hatto funksiya.</li><li>Obyektlar massivi juda ko'p ishlatiladi: ${c('[{ism:"Ali"}, {ism:"Vali"}]')}.</li></ul>`,
  quiz: [
    Q(`Obyekt qaysi qavsda?`, `{ }`, [`[ ]`, `( )`], `Figurali.`),
    Q(`oquvchi.ism nima?`, `ism xususiyati qiymati`, [`Massiv`, `Funksiya`], `Kalit bo'yicha.`),
    Q(`Kalit va qiymat orasida?`, `:`, [`=`, `->`], `ism: "Ali".`),
    Q(`Yangi xususiyat qo'shish?`, `obyekt.yangi = qiymat`, [`obyekt.push(yangi)`, `Iloji yo'q`], `Nuqta va =.`),
    Q(`Juftliklar nima bilan ajratiladi?`, `Vergul`, [`Nuqtali vergul`, `Probel`], `,`),
    Q(`obyekt["ism"] nima?`, `obyekt.ism bilan bir xil`, [`Xato`, `Massiv`], `Ikki usul.`),
    Q(`Obyekt nima uchun kerak?`, `Bir narsa haqidagi ma'lumotlarni birga saqlash`, [`Rang berish`, `Sikl uchun`], `Guruhlash.`),
    Q(`{a: 1, b: 2}.b?`, `2`, [`1`, `b`], `b qiymati.`),
    Q(`Massiv va obyekt farqi?`, `Massiv indeks bilan, obyekt nom bilan`, [`Farqi yo'q`, `Obyekt indeks bilan`], `Tartib va kalit.`),
    Q(`Obyekt qiymati massiv bo'la oladimi?`, `Ha`, [`Yo'q`, `Faqat son`], `Istalgan tur.`)
  ],
  prac: J(`${c('let kitob')} obyekti yarating: ${c('nom')}, ${c('muallif')}, ${c('sahifa')} (son). Keyin ${c('kitob.oqildi = true')} qo'shing va konsolga ${c('"NOM — MUALLIF"')} ko'rinishida chiqaring.`, `\n`,
    [[`kitob obyekt`, () => typeof kitob === 'object' && kitob !== null && !Array.isArray(kitob)],
     [`nom va muallif matn`, () => typeof kitob.nom === 'string' && typeof kitob.muallif === 'string'],
     [`sahifa son`, () => typeof kitob.sahifa === 'number'],
     [`oqildi = true`, () => kitob.oqildi === true],
     [`Konsolda nom va muallif`, () => window.__logs.some(l => l.includes(kitob.nom) && l.includes(kitob.muallif))]],
    `let kitob = { nom: "...", muallif: "...", sahifa: 200 };\nkitob.oqildi = true;\nconsole.log(kitob.nom + " — " + kitob.muallif);`, `let kitob = {\n  nom: "O'tkan kunlar",\n  muallif: "Abdulla Qodiriy",\n  sahifa: 400\n};\nkitob.oqildi = true;\nconsole.log(kitob.nom + " — " + kitob.muallif);\n`)
},
{
  t: `DOM: sahifadagi elementni topish`, min: 20,
  key: `document.querySelector("css-selektor") elementni topadi. .textContent matnini, .innerHTML ichki HTML ni o'zgartiradi.`,
  theory: `<p><b>DOM</b> (Document Object Model): JavaScript sahifani daraxt shaklida ko'radi. Har bir teg bu daraxtda obyekt.</p>
${x(`<h1 id="sarlavha">Salom</h1>
<p class="matn">Eski matn</p>`)}
${x(`let h = document.querySelector("#sarlavha");
h.textContent = "Xush kelibsiz!";

let p = document.querySelector(".matn");
p.innerHTML = "Yangi <b>qalin</b> matn";

let hammasi = document.querySelectorAll("p");
console.log(hammasi.length);`, 'js')}
<ul><li>${c('querySelector')} CSS selektorlari bilan ishlaydi: ${c('#id')}, ${c('.klass')}, ${c('teg')}. Birinchi topilganini qaytaradi.</li><li>${c('querySelectorAll')}: hammasini (ro'yxat).</li><li>${c('.textContent')}: oddiy matn. ${c('.innerHTML')}: HTML teglari bilan.</li></ul>`,
  quiz: [
    Q(`Elementni topish?`, `document.querySelector()`, [`document.find()`, `get.element()`], `querySelector.`),
    Q(`id="logo" ni topish?`, `querySelector("#logo")`, [`querySelector("logo")`, `querySelector(".logo")`], `# bilan.`),
    Q(`Klass bo'yicha?`, `querySelector(".karta")`, [`querySelector("#karta")`, `querySelector("karta.")`], `. bilan.`),
    Q(`Hammasini topish?`, `querySelectorAll()`, [`querySelector()`, `findAll()`], `All.`),
    Q(`Matnni o'zgartirish?`, `.textContent`, [`.value`, `.style`], `textContent.`),
    Q(`HTML teglari bilan o'zgartirish?`, `.innerHTML`, [`.textContent`, `.outer`], `innerHTML.`),
    Q(`DOM nima?`, `Sahifaning JS dagi daraxt ko'rinishi`, [`Dastur tili`, `Rang`], `Document Object Model.`),
    Q(`querySelector bir nechta mos bo'lsa?`, `Birinchisini qaytaradi`, [`Hammasini`, `Xato`], `Birinchi.`),
    Q(`textContent = "<b>x</b>" nima ko'rsatadi?`, `<b>x</b> matn sifatida`, [`Qalin x`, `Hech narsa`], `Teg ishlamaydi.`),
    Q(`querySelectorAll("li").length?`, `li lar soni`, [`Birinchi li`, `Xato`], `Ro'yxat uzunligi.`)
  ],
  prac: J(`JavaScript bilan ${c('#sarlavha')} matnini "Xush kelibsiz!" ga o'zgartiring. ${c('.matn')} ichiga ${c('innerHTML')} bilan ${c('<b>')} tegli matn yozing.`, `// document.querySelector(...)\n`,
    [[`Sarlavha "Xush kelibsiz!"`, () => document.querySelector('#sarlavha').textContent.trim() === 'Xush kelibsiz!'],
     [`.matn ichida b teg`, () => !!document.querySelector('.matn b')]],
    `document.querySelector("#sarlavha").textContent = "Xush kelibsiz!";\ndocument.querySelector(".matn").innerHTML = "Bu <b>yangi</b> matn";`, `document.querySelector("#sarlavha").textContent = "Xush kelibsiz!";\ndocument.querySelector(".matn").innerHTML = "Bu <b>yangi</b> matn";\n`,
    `<h1 id="sarlavha">Salom</h1>\n<p class="matn">Eski matn</p>\n`)
},
{
  t: `Hodisalar: tugma bosilganda`, min: 20,
  key: `element.addEventListener("click", function () { ... }) tugma bosilganda kodni bajaradi.`,
  theory: `<p>Sahifa foydalanuvchiga <b>javob</b> berishi uchun <b>hodisalar</b> (events) ishlatiladi: bosish, yozish, sichqoncha harakati.</p>
${x(`<button id="tugma">Bos</button>
<p id="natija">...</p>`)}
${x(`let tugma = document.querySelector("#tugma");
let natija = document.querySelector("#natija");
let soni = 0;

tugma.addEventListener("click", function () {
  soni++;
  natija.textContent = "Siz " + soni + " marta bosdingiz";
});`, 'js')}
<ul><li>${c('addEventListener("hodisa", funksiya)')}: hodisa bo'lganda funksiya chaqiriladi.</li><li>Hodisalar: ${c('"click"')} bosish, ${c('"input"')} maydonga yozish, ${c('"mouseover"')} sichqoncha ustiga kelish, ${c('"keydown"')} tugma bosish.</li><li>Qisqa usul: ${c('tugma.onclick = () => { ... }')}.</li></ul>`,
  quiz: [
    Q(`Bosish hodisasi?`, `"click"`, [`"press"`, `"tap"`], `click.`),
    Q(`Hodisa tinglovchi qo'shish?`, `addEventListener`, [`onEvent`, `listen()`], `addEventListener.`),
    Q(`Maydonga yozilganda?`, `"input"`, [`"write"`, `"text"`], `input hodisasi.`),
    Q(`Sichqoncha ustiga kelganda?`, `"mouseover"`, [`"hover"`, `"mouse"`], `mouseover.`),
    Q(`addEventListener ning ikkinchi parametri?`, `Funksiya`, [`Matn`, `Son`], `Nima qilish.`),
    Q(`Klaviatura tugmasi bosilganda?`, `"keydown"`, [`"key"`, `"type"`], `keydown.`),
    Q(`Qisqa usul?`, `tugma.onclick = ...`, [`tugma.click = ...`, `tugma.on = ...`], `onclick.`),
    Q(`Hodisa nima?`, `Foydalanuvchi harakati (bosish, yozish)`, [`Xato`, `Rang`], `Event.`),
    Q(`Misolda 3 marta bosilsa?`, `Siz 3 marta bosdingiz`, [`Siz 1 marta bosdingiz`, `...`], `soni++ har safar.`),
    Q(`Funksiya qachon ishlaydi?`, `Hodisa bo'lganda`, [`Sahifa ochilishi bilan darhol`, `Hech qachon`], `Kutib turadi.`)
  ],
  prac: J(`${c('#tugma')} bosilganda ${c('#natija')} da necha marta bosilgani chiqsin: "Bosildi: 1", "Bosildi: 2" ...`, `let tugma = document.querySelector("#tugma");\nlet natija = document.querySelector("#natija");\nlet soni = 0;\n\n// tugma.addEventListener(...)\n`,
    [[`1 marta bosilsa "Bosildi: 1"`, () => { document.querySelector('#tugma').click(); return /Bosildi:\s*1\b/.test(document.querySelector('#natija').textContent); }],
     [`Yana 2 marta → "Bosildi: 3"`, () => { const t = document.querySelector('#tugma'); t.click(); t.click(); return /Bosildi:\s*3\b/.test(document.querySelector('#natija').textContent); }]],
    `tugma.addEventListener("click", function () {\n  soni++;\n  natija.textContent = "Bosildi: " + soni;\n});`, `let tugma = document.querySelector("#tugma");\nlet natija = document.querySelector("#natija");\nlet soni = 0;\n\ntugma.addEventListener("click", function () {\n  soni++;\n  natija.textContent = "Bosildi: " + soni;\n});\n`,
    `<button id="tugma">Meni bos</button>\n<p id="natija">Hali bosilmadi</p>\n`, `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n}\nbutton {\n  font-size: 18px;\n  padding: 10px 20px;\n}\n`)
},
{
  t: `Foydalanuvchi kiritgan qiymat`, min: 20,
  key: `input.value maydondagi matnni beradi. Number(...) uni songa aylantiradi.`,
  theory: `${x(`<input id="ism" placeholder="Ismingiz">
<button id="ok">Salomlash</button>
<p id="javob"></p>`)}
${x(`document.querySelector("#ok").addEventListener("click", () => {
  let ism = document.querySelector("#ism").value;
  document.querySelector("#javob").textContent = "Salom, " + ism + "!";
});`, 'js')}
<ul><li>${c('.value')}: input ichidagi yozuv. U doim <b>matn</b> bo'ladi.</li><li>Son kerak bo'lsa: ${c('Number(input.value)')}. Aks holda ${c('"2" + "3"')} = ${c('"23"')} bo'ladi.</li><li>Bo'sh ekanini tekshirish: ${c('if (ism.trim() === "")')}. ${c('.trim()')} chetdagi probellarni olib tashlaydi.</li></ul>`,
  quiz: [
    Q(`Input dagi matn?`, `.value`, [`.textContent`, `.text`], `value.`),
    Q(`.value qanday tur?`, `Matn (string)`, [`Son`, `Massiv`], `Doim string.`),
    Q(`Matnni songa aylantirish?`, `Number()`, [`String()`, `Math()`], `Number.`),
    Q(`"2" + "3"?`, `"23"`, [`5`, `Xato`], `Matnlar yopishadi.`),
    Q(`Number("2") + Number("3")?`, `5`, [`"23"`, `23`], `Sonlar qo'shiladi.`),
    Q(`Chetdagi probellarni olib tashlash?`, `.trim()`, [`.cut()`, `.clean()`], `trim.`),
    Q(`Maydon bo'shligini tekshirish?`, `ism.trim() === ""`, [`ism === 0`, `ism.length === -1`], `Bo'sh matn.`),
    Q(`Input maydonga yangi qiymat yozish?`, `input.value = "..."`, [`input.text = "..."`, `Iloji yo'q`], `value ga berish.`),
    Q(`Qiymatni qachon o'qish kerak?`, `Tugma bosilganda (hodisa ichida)`, [`Sahifa ochilishi bilan`, `Hech qachon`], `Foydalanuvchi yozib bo'lgach.`),
    Q(`Number("salom")?`, `NaN`, [`0`, `"salom"`], `Not a Number.`)
  ],
  prac: J(`${c('#hisob')} tugmasi bosilganda ${c('#a')} va ${c('#b')} maydonlaridagi sonlar yig'indisi ${c('#natija')} ga yozilsin (faqat son, masalan ${c('12')}).`, `document.querySelector("#hisob").addEventListener("click", () => {\n  // a va b ni o'qing, Number() ga aylantiring\n});\n`,
    [[`5 + 7 = 12`, () => { document.querySelector('#a').value = '5'; document.querySelector('#b').value = '7'; document.querySelector('#hisob').click(); return document.querySelector('#natija').textContent.trim() === '12'; }],
     [`20 + 3 = 23 (matn emas, son qo'shildi)`, () => { document.querySelector('#a').value = '20'; document.querySelector('#b').value = '3'; document.querySelector('#hisob').click(); return document.querySelector('#natija').textContent.trim() === '23'; }]],
    `let a = Number(document.querySelector("#a").value);\nlet b = Number(document.querySelector("#b").value);\ndocument.querySelector("#natija").textContent = a + b;`, `document.querySelector("#hisob").addEventListener("click", () => {\n  let a = Number(document.querySelector("#a").value);\n  let b = Number(document.querySelector("#b").value);\n  document.querySelector("#natija").textContent = a + b;\n});\n`,
    `<input id="a" type="number" placeholder="1-son">\n<input id="b" type="number" placeholder="2-son">\n<button id="hisob">Qo'shish</button>\n<h2 id="natija">?</h2>\n`, `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n}\ninput {\n  width: 90px;\n  padding: 6px;\n}\n`)
},
{
  t: `Ko'rinishni o'zgartirish: style va classList`, min: 20,
  key: `element.style.color = "red" bitta xususiyatni o'zgartiradi. classList.add / remove / toggle klasslarni boshqaradi.`,
  theory: `${x(`let quti = document.querySelector(".quti");

quti.style.backgroundColor = "gold";  // CSS dagi background-color
quti.style.fontSize = "24px";

quti.classList.add("faol");      // klass qo'shish
quti.classList.remove("faol");   // olib tashlash
quti.classList.toggle("tun");    // bor bo'lsa olib tashlaydi, yo'q bo'lsa qo'shadi`, 'js')}
<ul><li>${c('style')} da CSS nomlari camelCase bo'ladi: ${c('background-color')} → ${c('backgroundColor')}.</li><li>Yaxshiroq usul: ko'rinishni CSS da klass sifatida yozib, JS da faqat klassni almashtirish (${c('classList')}).</li><li>${c('toggle')} tungi rejim, menyu ochish-yopish uchun juda qulay.</li><li>${c('classList.contains("tun")')}: klass bormi?</li></ul>`,
  quiz: [
    Q(`Klass qo'shish?`, `classList.add()`, [`classList.push()`, `class.new()`], `add.`),
    Q(`Klassni almashtirib turish?`, `classList.toggle()`, [`classList.switch()`, `classList.change()`], `toggle.`),
    Q(`JS da background-color qanday yoziladi?`, `backgroundColor`, [`background-color`, `bgColor`], `camelCase.`),
    Q(`Klassni olib tashlash?`, `classList.remove()`, [`classList.delete()`, `classList.pop()`], `remove.`),
    Q(`Klass borligini tekshirish?`, `classList.contains()`, [`classList.has()`, `classList.is()`], `contains.`),
    Q(`Yaxshiroq usul qaysi?`, `CSS da klass, JS da classList`, [`Hammasini style bilan`, `Farqi yo'q`], `Ajratish.`),
    Q(`el.style.fontSize = "24px" nima?`, `Shrift 24px`, [`Rang`, `Xato`], `font-size.`),
    Q(`Tungi rejim tugmasi uchun qulay?`, `toggle`, [`add`, `remove`], `Yoqish-o'chirish.`),
    Q(`toggle klass bor bo'lsa?`, `Olib tashlaydi`, [`Yana qo'shadi`, `Xato`], `Almashtiradi.`),
    Q(`style.display = "none" nima qiladi?`, `Elementni yashiradi`, [`Rang beradi`, `O'chiradi (DOM dan)`], `Ko'rinmaydi.`)
  ],
  prac: J(`${c('#rejim')} tugmasi bosilganda ${c('body')} ga ${c('tun')} klassi ${c('toggle')} qilinsin (CSS tayyor). ${c('#qizil')} tugmasi bosilganda ${c('h1')} ning ${c('style.color')} i ${c('"red"')} bo'lsin.`, `// tugmalarga hodisa qo'shing\n`,
    [[`Bir bosish → body.tun`, () => { document.querySelector('#rejim').click(); return document.body.classList.contains('tun'); }],
     [`Yana bosish → tun yo'q`, () => { document.querySelector('#rejim').click(); return !document.body.classList.contains('tun'); }],
     [`#qizil → h1 qizil`, () => { document.querySelector('#qizil').click(); return getComputedStyle(document.querySelector('h1')).color === 'rgb(255, 0, 0)'; }]],
    `document.querySelector("#rejim").onclick = () => document.body.classList.toggle("tun");\ndocument.querySelector("#qizil").onclick = () => {\n  document.querySelector("h1").style.color = "red";\n};`, `document.querySelector("#rejim").addEventListener("click", () => {\n  document.body.classList.toggle("tun");\n});\n\ndocument.querySelector("#qizil").addEventListener("click", () => {\n  document.querySelector("h1").style.color = "red";\n});\n`,
    `<h1>Tungi rejim</h1>\n<button id="rejim">🌙 Rejim</button>\n<button id="qizil">Sarlavhani qizil qil</button>\n`, `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  transition: background 0.3s, color 0.3s;\n}\nbody.tun {\n  background: #111827;\n  color: #f3f4f6;\n}\n`)
},
{
  t: `Yangi element yaratish`, min: 25,
  key: `document.createElement("li") yangi teg yasaydi, .textContent matn beradi, ota.append(el) sahifaga qo'shadi. el.remove() o'chiradi.`,
  theory: `${x(`let royxat = document.querySelector("#royxat");

let li = document.createElement("li");
li.textContent = "Yangi vazifa";
royxat.append(li);        // ro'yxat oxiriga qo'shildi

li.remove();              // o'chirish`, 'js')}
<ol><li>${c('createElement("teg")')}: xotirada yangi element.</li><li>Unga matn, klass, atribut beriladi.</li><li>${c('ota.append(el)')}: sahifaga qo'shiladi (shundagina ko'rinadi).</li></ol>
<p>Massivdan ro'yxat yasash:</p>
${x(`let mevalar = ["olma", "nok", "uzum"];
for (const m of mevalar) {
  let li = document.createElement("li");
  li.textContent = m;
  royxat.append(li);
}`, 'js')}`,
  quiz: [
    Q(`Yangi element yaratish?`, `document.createElement()`, [`document.new()`, `new Element()`], `createElement.`),
    Q(`Sahifaga qo'shish?`, `ota.append(el)`, [`el.show()`, `document.add(el)`], `append.`),
    Q(`Elementni o'chirish?`, `el.remove()`, [`el.delete()`, `el.hide()`], `remove.`),
    Q(`createElement dan keyin element ko'rinadimi?`, `Yo'q, append qilinmaguncha`, [`Ha, darhol`, `Faqat qizil`], `Xotirada turadi.`),
    Q(`li ga matn berish?`, `li.textContent = "..."`, [`li.text("...")`, `li = "..."`], `textContent.`),
    Q(`Massivdan ro'yxat yasash uchun?`, `Sikl + createElement + append`, [`Faqat innerHTML = massiv`, `Iloji yo'q`], `Har element uchun li.`),
    Q(`Yangi elementga klass berish?`, `el.classList.add("...")`, [`el.class("...")`, `el.klass = "..."`], `classList.`),
    Q(`append qayerga qo'shadi?`, `Oxiriga`, [`Boshiga`, `O'rtasiga`], `Oxiri. Boshiga: prepend.`),
    Q(`To-do ro'yxatiga yangi vazifa qo'shish qaysi usul?`, `createElement("li") + append`, [`console.log`, `alert`], `DOM ga qo'shish.`),
    Q(`3 elementli massivdan nechta li?`, `3`, [`1`, `0`], `Har biriga bitta.`)
  ],
  prac: J(`${c('mevalar')} massividagi har bir meva uchun ${c('<li>')} yaratib ${c('#royxat')} ga qo'shing. ${c('#qosh')} tugmasi bosilganda ${c('#yangi')} maydonidagi matn yangi ${c('li')} bo'lib qo'shilsin.`, `let mevalar = ["olma", "nok", "uzum"];\nlet royxat = document.querySelector("#royxat");\n\n// 1) mevalar dan li lar\n\n// 2) #qosh tugmasi\n`,
    [[`3 ta meva li bo'lib chiqdi`, () => { const l = [...document.querySelectorAll('#royxat li')].map(x => x.textContent.trim()); return ['olma', 'nok', 'uzum'].every(m => l.includes(m)); }],
     [`Tugma yangi li qo'shadi`, () => { const n = document.querySelectorAll('#royxat li').length; document.querySelector('#yangi').value = 'anor'; document.querySelector('#qosh').click(); const l = document.querySelectorAll('#royxat li'); return l.length === n + 1 && l[l.length - 1].textContent.trim() === 'anor'; }]],
    `for (const m of mevalar) {\n  let li = document.createElement("li");\n  li.textContent = m;\n  royxat.append(li);\n}`, `let mevalar = ["olma", "nok", "uzum"];\nlet royxat = document.querySelector("#royxat");\n\nfunction qoshish(matn) {\n  let li = document.createElement("li");\n  li.textContent = matn;\n  royxat.append(li);\n}\n\nfor (const m of mevalar) {\n  qoshish(m);\n}\n\ndocument.querySelector("#qosh").addEventListener("click", () => {\n  let v = document.querySelector("#yangi").value.trim();\n  if (v) qoshish(v);\n});\n`,
    `<h2>Mevalar</h2>\n<ul id="royxat"></ul>\n<input id="yangi" placeholder="Yangi meva">\n<button id="qosh">Qo'shish</button>\n`)
},
{
  t: `Massiv metodlari: forEach, map, filter`, min: 25,
  key: `forEach har biriga ish qiladi, map yangi massiv yasaydi, filter shartga mos keladiganlarini tanlaydi.`,
  theory: `${x(`let sonlar = [1, 2, 3, 4, 5, 6];

sonlar.forEach(n => console.log(n));          // har birini chiqaradi

let kvadratlar = sonlar.map(n => n * n);      // [1, 4, 9, 16, 25, 36]

let juftlar = sonlar.filter(n => n % 2 === 0); // [2, 4, 6]

let jami = sonlar.reduce((s, n) => s + n, 0);  // 21`, 'js')}
<ul><li>${c('forEach')}: har bir element uchun funksiya chaqiradi (natija qaytarmaydi).</li><li>${c('map')}: har birini o'zgartirib <b>yangi massiv</b> qaytaradi. Uzunlik bir xil qoladi.</li><li>${c('filter')}: shart ${c('true')} bo'lganlarini qoldiradi.</li><li>${c('find')}: shartga mos <b>birinchi</b> elementni qaytaradi.</li><li>${c('reduce')}: hammasini bitta qiymatga yig'adi.</li></ul>`,
  quiz: [
    Q(`Har birini o'zgartirib yangi massiv?`, `map`, [`filter`, `forEach`], `map.`),
    Q(`Shartga moslarini tanlash?`, `filter`, [`map`, `push`], `filter.`),
    Q(`[1,2,3].map(n => n * 2)?`, `[2, 4, 6]`, [`[1, 2, 3]`, `12`], `Har biri 2 baravar.`),
    Q(`[1,2,3,4].filter(n => n > 2)?`, `[3, 4]`, [`[1, 2]`, `[true, true]`], `2 dan kattalar.`),
    Q(`Birinchi mos elementni topish?`, `find`, [`filter`, `map`], `find.`),
    Q(`forEach nima qaytaradi?`, `Hech narsa (undefined)`, [`Yangi massiv`, `Son`], `Faqat aylanadi.`),
    Q(`map dan keyin uzunlik?`, `O'zgarmaydi`, [`Kamayadi`, `Ikki baravar`], `Har elementga bittadan.`),
    Q(`Yig'indini bitta qiymatga yig'ish?`, `reduce`, [`map`, `filter`], `reduce.`),
    Q(`n => n * n qanday funksiya?`, `Strelka funksiya`, [`Obyekt`, `Massiv`], `Arrow.`),
    Q(`["a","bb","ccc"].filter(s => s.length > 1)?`, `["bb", "ccc"]`, [`["a"]`, `[2, 3]`], `Uzunligi 1 dan katta.`)
  ],
  prac: J(`${c('let narxlar = [12000, 5000, 30000, 8000, 45000]')}. ${c('map')} bilan ${c('let chegirma')} (har biri 10% arzon, ya'ni ${c('n * 0.9')}), ${c('filter')} bilan ${c('let qimmat')} (20000 dan qimmatlari) massivlarini yasang.`, `let narxlar = [12000, 5000, 30000, 8000, 45000];\n\n`,
    [[`chegirma to'g'ri (map)`, () => Array.isArray(chegirma) && chegirma.length === 5 && Math.abs(chegirma[0] - 10800) < 1e-6 && Math.abs(chegirma[4] - 40500) < 1e-6],
     [`qimmat = [30000, 45000]`, () => Array.isArray(qimmat) && qimmat.length === 2 && qimmat[0] === 30000 && qimmat[1] === 45000],
     [`narxlar o'zgarmadi`, () => narxlar[0] === 12000 && narxlar.length === 5]],
    `let chegirma = narxlar.map(n => n * 0.9);\nlet qimmat = narxlar.filter(n => n > 20000);`, `let narxlar = [12000, 5000, 30000, 8000, 45000];\n\nlet chegirma = narxlar.map(n => n * 0.9);\nlet qimmat = narxlar.filter(n => n > 20000);\n\nconsole.log(chegirma);\nconsole.log(qimmat);\n`)
},
{
  t: `Tasodifiy sonlar: Math.random`, min: 20,
  key: `Math.random() 0 va 1 orasidagi tasodifiy son. Math.floor(Math.random() * n) + 1 → 1 dan n gacha butun son.`,
  theory: `<p>O'yinlar uchun tasodif kerak: zar tashlash, tasodifiy savol, raqamni top.</p>
${x(`console.log(Math.random());          // masalan 0.7341...

let zar = Math.floor(Math.random() * 6) + 1;   // 1..6
console.log("Zar: " + zar);

let ranglar = ["qizil", "yashil", "ko'k"];
let i = Math.floor(Math.random() * ranglar.length);
console.log(ranglar[i]);              // tasodifiy rang`, 'js')}
<ul><li>${c('Math.random()')}: 0 (kiradi) va 1 (kirmaydi) orasida.</li><li>${c('* 6')}: 0 dan 5.99 gacha.</li><li>${c('Math.floor')}: pastga yaxlitlaydi → 0..5.</li><li>${c('+ 1')} → 1..6.</li></ul>`,
  quiz: [
    Q(`Tasodifiy son funksiyasi?`, `Math.random()`, [`Math.rand()`, `random()`], `Math.random.`),
    Q(`Math.random() oralig'i?`, `0 dan 1 gacha (1 kirmaydi)`, [`1 dan 10 gacha`, `0 dan 100 gacha`], `[0, 1).`),
    Q(`Pastga yaxlitlash?`, `Math.floor()`, [`Math.round()`, `Math.up()`], `floor: pol.`),
    Q(`Zar (1..6) formulasi?`, `Math.floor(Math.random() * 6) + 1`, [`Math.random() * 6`, `Math.floor(Math.random()) + 6`], `0..5 + 1.`),
    Q(`Math.floor(4.9)?`, `4`, [`5`, `4.9`], `Pastga.`),
    Q(`Massivdan tasodifiy element indeksi?`, `Math.floor(Math.random() * m.length)`, [`Math.random(m)`, `m.length + 1`], `0..length-1.`),
    Q(`Math.ceil(4.1)?`, `5`, [`4`, `4.1`], `Yuqoriga.`),
    Q(`1..100 tasodifiy son?`, `Math.floor(Math.random() * 100) + 1`, [`Math.random() * 100`, `Math.floor(Math.random() * 99)`], `+1 bilan.`),
    Q(`Math.random() har safar bir xil sonmi?`, `Yo'q, har safar boshqa`, [`Ha`, `Faqat 0`], `Tasodifiy.`),
    Q(`Tasodif qayerda kerak?`, `O'yinlarda`, [`Faqat jadvalda`, `Hech qayerda`], `Zar, savol, raqamni top.`)
  ],
  prac: J(`${c('function zar()')} 1 dan 6 gacha tasodifiy butun son qaytarsin. ${c('function tasodifiy(m)')} massivdan tasodifiy element qaytarsin.`, `function zar() {\n\n}\n\nfunction tasodifiy(m) {\n\n}\n\nconsole.log(zar());\n`,
    [[`zar() doim 1..6 butun son (500 marta)`, () => { for (let k = 0; k < 500; k++) { const z = zar(); if (!Number.isInteger(z) || z < 1 || z > 6) return false; } return true; }],
     [`zar() hamma qiymatlarni chiqaradi (1 va 6 ham)`, () => { const s = new Set(); for (let k = 0; k < 600; k++) s.add(zar()); return s.size === 6; }],
     [`tasodifiy(m) massivdan element`, () => { const m = ['a', 'b', 'c']; const s = new Set(); for (let k = 0; k < 200; k++) { const v = tasodifiy(m); if (!m.includes(v)) return false; s.add(v); } return s.size === 3; }]],
    `return Math.floor(Math.random() * 6) + 1;\n...\nreturn m[Math.floor(Math.random() * m.length)];`, `function zar() {\n  return Math.floor(Math.random() * 6) + 1;\n}\n\nfunction tasodifiy(m) {\n  return m[Math.floor(Math.random() * m.length)];\n}\n\nconsole.log(zar());\nconsole.log(tasodifiy(["qizil", "yashil", "ko'k"]));\n`)
},
{
  t: `Taymerlar: setTimeout va setInterval`, min: 20,
  key: `setTimeout(f, 1000) 1 soniyadan keyin bir marta, setInterval(f, 1000) har soniyada. clearInterval(id) to'xtatadi.`,
  theory: `${x(`setTimeout(() => {
  console.log("3 soniya o'tdi!");
}, 3000);

let soniya = 0;
let id = setInterval(() => {
  soniya++;
  console.log(soniya);
  if (soniya === 5) {
    clearInterval(id);   // to'xtatish
  }
}, 1000);`, 'js')}
<ul><li>Vaqt <b>millisekundda</b>: 1000 ms = 1 soniya.</li><li>${c('setTimeout')}: bir marta, kechikib.</li><li>${c('setInterval')}: qayta-qayta. U ${c('id')} qaytaradi.</li><li>${c('clearInterval(id)')}: takrorlashni to'xtatadi.</li></ul>
<p>Soat, sekundomer, o'yin taymeri, slayd-shou shu bilan yasaladi.</p>`,
  quiz: [
    Q(`Bir marta kechikib bajarish?`, `setTimeout`, [`setInterval`, `wait()`], `setTimeout.`),
    Q(`Har soniyada takrorlash?`, `setInterval`, [`setTimeout`, `repeat()`], `setInterval.`),
    Q(`1 soniya necha ms?`, `1000`, [`100`, `60`], `1000 ms.`),
    Q(`Intervalni to'xtatish?`, `clearInterval(id)`, [`stopInterval()`, `id.stop()`], `clearInterval.`),
    Q(`setTimeout(f, 500) qachon?`, `Yarim soniyadan keyin`, [`500 soniyadan keyin`, `Darhol`], `500 ms.`),
    Q(`setInterval nima qaytaradi?`, `id (raqam)`, [`Hech narsa`, `Matn`], `To'xtatish uchun kerak.`),
    Q(`Misolda konsolga oxirgi chiqadigan son?`, `5`, [`4`, `Cheksiz`], `5 da to'xtaydi.`),
    Q(`Sekundomer uchun qaysi biri?`, `setInterval`, [`setTimeout`, `Math.random`], `Takrorlanadi.`),
    Q(`2 soniya = ? ms`, `2000`, [`200`, `20`], `2 * 1000.`),
    Q(`clearTimeout nima qiladi?`, `Kutilayotgan setTimeout ni bekor qiladi`, [`Sahifani yopadi`, `Vaqtni ko'rsatadi`], `Bekor qilish.`)
  ],
  prac: J(`${c('#start')} bosilganda ${c('setInterval')} bilan har 100 ms da ${c('#son')} ichidagi son 1 ga oshsin. ${c('#stop')} bosilganda ${c('clearInterval')} bilan to'xtasin.`, `let son = 0;\nlet id = null;\n\n// #start va #stop\n`,
    [[`Start → son o'sadi`, async () => { document.querySelector('#start').click(); await new Promise(r => setTimeout(r, 450)); return +document.querySelector('#son').textContent >= 2; }],
     [`Stop → to'xtaydi`, async () => { document.querySelector('#stop').click(); const a = document.querySelector('#son').textContent; await new Promise(r => setTimeout(r, 350)); return document.querySelector('#son').textContent === a; }]],
    `document.querySelector("#start").onclick = () => {\n  id = setInterval(() => {\n    son++;\n    document.querySelector("#son").textContent = son;\n  }, 100);\n};\ndocument.querySelector("#stop").onclick = () => clearInterval(id);`, `let son = 0;\nlet id = null;\n\ndocument.querySelector("#start").addEventListener("click", () => {\n  if (id) return;\n  id = setInterval(() => {\n    son++;\n    document.querySelector("#son").textContent = son;\n  }, 100);\n});\n\ndocument.querySelector("#stop").addEventListener("click", () => {\n  clearInterval(id);\n  id = null;\n});\n`,
    `<h1 id="son">0</h1>\n<button id="start">Start</button>\n<button id="stop">Stop</button>\n`, `body {\n  font-family: system-ui, sans-serif;\n  padding: 20px;\n  text-align: center;\n}\n#son {\n  font-size: 64px;\n}\n`)
},
{
  t: `Yakuniy loyiha: "Raqamni top" o'yini`, min: 35,
  key: `O'zgaruvchi, tasodif, shart, hodisa va DOM birgalikda: haqiqiy o'yin!`,
  theory: `<p>JavaScript kursini tugatdingiz! Endi to'liq o'yin yasaymiz: kompyuter 1 dan 100 gacha son o'ylaydi, siz topasiz.</p>
<ol><li>${c('let sir')}: ${c('Math.random')} bilan 1..100.</li><li>${c('let urinish = 0')}.</li><li>"Tekshirish" bosilganda: inputdan son o'qiladi, ${c('urinish++')}.</li><li>${c('if')}: son kichik bo'lsa "Kattaroq son ayting", katta bo'lsa "Kichikroq", teng bo'lsa "Topdingiz! N urinishda".</li><li>"Qaytadan" tugmasi yangi son o'ylaydi.</li></ol>
${x(`function tekshir(son) {
  urinish++;
  if (son < sir) return "Kattaroq son ayting";
  if (son > sir) return "Kichikroq son ayting";
  return "Topdingiz! " + urinish + " urinishda";
}`, 'js')}
<p>Maslahat: avval ${c('tekshir')} funksiyasini yozing, keyin uni tugmaga ulang.</p>`,
  quiz: [
    Q(`1..100 tasodifiy son?`, `Math.floor(Math.random() * 100) + 1`, [`Math.random() * 100`, `100`], `Formula.`),
    Q(`Urinishlarni sanash?`, `urinish++`, [`urinish--`, `urinish = 0`], `Har tekshiruvda +1.`),
    Q(`Son sirdan kichik bo'lsa?`, `"Kattaroq son ayting"`, [`"Kichikroq"`, `"Topdingiz"`], `Kattaroq kerak.`),
    Q(`Inputdan son o'qish?`, `Number(input.value)`, [`input.textContent`, `input.number`], `Number + value.`),
    Q(`Tugmaga ulash?`, `addEventListener("click", ...)`, [`onload`, `console.log`], `Hodisa.`),
    Q(`Natijani sahifada ko'rsatish?`, `el.textContent = ...`, [`console.log`, `alert faqat`], `DOM.`),
    Q(`Qaytadan boshlashda nima o'zgaradi?`, `sir yangilanadi, urinish = 0`, [`Hech narsa`, `Sahifa yopiladi`], `Yangi o'yin.`),
    Q(`Eng tez topish strategiyasi?`, `Har safar oraliqning o'rtasini aytish`, [`1 dan boshlab sanash`, `Tasodifiy`], `Ikkilik qidiruv: 7 urinishda!`),
    Q(`return funksiyada nima qiladi?`, `Javobni qaytaradi`, [`Sahifani yangilaydi`, `Hech narsa`], `Natija.`),
    Q(`Bu o'yinda qaysi mavzular ishlatildi?`, `Hammasi: o'zgaruvchi, shart, tasodif, hodisa, DOM`, [`Faqat CSS`, `Faqat HTML`], `Butun kurs.`)
  ],
  prac: J(`O'yinni yasang. ${c('tekshir(son)')} funksiyasi javob matnini qaytarsin, tugma bosilganda u ${c('#javob')} ga yozilsin. Testlar ${c('sir')} ni o'zi o'rnatib tekshiradi.`, `let sir = Math.floor(Math.random() * 100) + 1;\nlet urinish = 0;\n\nfunction tekshir(son) {\n  // urinish++ va if lar\n}\n\n// #tekshir tugmasi: input dan son, tekshir(son), natijani #javob ga\n\n// #yangi tugmasi: sir va urinish ni yangilash\n`,
    [[`Kichik son → "Kattaroq"`, () => { sir = 50; urinish = 0; return /kattaroq/i.test(tekshir(30)); }],
     [`Katta son → "Kichikroq"`, () => { sir = 50; urinish = 0; return /kichikroq/i.test(tekshir(70)); }],
     [`Topilsa → "Topdingiz" va urinishlar soni`, () => { sir = 50; urinish = 0; tekshir(20); tekshir(80); const r = tekshir(50); return /topdingiz/i.test(r) && r.includes('3'); }],
     [`Tugma javobni #javob ga yozadi`, () => { sir = 40; urinish = 0; document.querySelector('#son').value = '10'; document.querySelector('#tekshir').click(); return /kattaroq/i.test(document.querySelector('#javob').textContent); }],
     [`"Qaytadan" urinishni 0 qiladi`, () => { urinish = 5; document.querySelector('#yangi').click(); return urinish === 0 && sir >= 1 && sir <= 100; }]],
    `function tekshir(son) {\n  urinish++;\n  if (son < sir) return "Kattaroq son ayting";\n  if (son > sir) return "Kichikroq son ayting";\n  return "Topdingiz! " + urinish + " urinishda";\n}\ndocument.querySelector("#tekshir").onclick = () => {\n  let s = Number(document.querySelector("#son").value);\n  document.querySelector("#javob").textContent = tekshir(s);\n};`, `let sir = Math.floor(Math.random() * 100) + 1;\nlet urinish = 0;\n\nfunction tekshir(son) {\n  urinish++;\n  if (son < sir) return "Kattaroq son ayting";\n  if (son > sir) return "Kichikroq son ayting";\n  return "Topdingiz! " + urinish + " urinishda";\n}\n\ndocument.querySelector("#tekshir").addEventListener("click", () => {\n  let s = Number(document.querySelector("#son").value);\n  document.querySelector("#javob").textContent = tekshir(s);\n});\n\ndocument.querySelector("#yangi").addEventListener("click", () => {\n  sir = Math.floor(Math.random() * 100) + 1;\n  urinish = 0;\n  document.querySelector("#javob").textContent = "Yangi son o'yladim!";\n});\n`,
    `<h1>🎯 Raqamni top</h1>\n<p>Men 1 dan 100 gacha son o'yladim.</p>\n<input id="son" type="number" min="1" max="100">\n<button id="tekshir">Tekshirish</button>\n<button id="yangi">Qaytadan</button>\n<h2 id="javob"></h2>\n`, `body {\n  font-family: system-ui, sans-serif;\n  padding: 24px;\n  text-align: center;\n}\ninput {\n  font-size: 20px;\n  width: 100px;\n  padding: 6px;\n}\nbutton {\n  font-size: 18px;\n  padding: 8px 16px;\n}\n`)
}
]});
}
