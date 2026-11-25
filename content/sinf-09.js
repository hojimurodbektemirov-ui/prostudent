{
const x = KM.x, c = KM.c;
KM.sinf({ n: 9, stage: 'orta', t: `JavaScript asoslari`, d: `Shartlar, sikllar, funksiyalar va massivlar.`, lessons: [
{
  t: `Shartlar: if / else`, min: 25,
  key: `if shart to'g'ri bo'lsa bajariladi, else aks holda. return funksiya javobini qaytaradi.`,
  theory: `<p>Dastur qaror qabul qilishi kerak: "Agar ... bo'lsa, ... qil, aks holda ...".</p>
${x(`function tekshir(yosh) {
  if (yosh >= 18) {
    return "katta";
  } else if (yosh >= 13) {
    return "o'smir";
  } else {
    return "bola";
  }
}

console.log(tekshir(15)); // o'smir`, 'js')}
<p>Taqqoslash belgilari: ${c('>')} katta, ${c('>=')} katta yoki teng, ${c('<')} kichik, ${c('===')} teng, ${c('!==')} teng emas.</p>
<p>Shartlar yuqoridan pastga tekshiriladi. Birinchi to'g'ri shart bajariladi, qolganlari o'tkazib yuboriladi.</p>`,
  quiz: [
    [`5 === "5" natijasi?`, [`true`, `false`], 1, `=== turini ham tekshiradi: son va matn teng emas.`],
    [`Shartlar qanday tartibda tekshiriladi?`, [`Pastdan yuqoriga`, `Yuqoridan pastga`, `Tasodifiy`], 1, `Birinchi to'g'ri kelgan shart ishlaydi.`]
  ],
  prac: {
    task: `${c('baho(ball)')} funksiyasini yozing: 86 va undan yuqori bo'lsa 5, 71 va undan yuqori 4, 56 va undan yuqori 3, qolgan holatda 2 qaytarsin.`,
    tabs: ['js'],
    js: `function baho(ball) {\n  if (ball >= 86) {\n    return 5;\n  }\n  // davom ettiring\n\n}\n\nconsole.log(baho(90));\nconsole.log(baho(60));\n`,
    tests: [
      [`baho(90) → 5`, () => baho(90) === 5],
      [`baho(75) → 4`, () => baho(75) === 4],
      [`baho(60) → 3`, () => baho(60) === 3],
      [`baho(30) → 2`, () => baho(30) === 2],
      [`Chegaralar: baho(86) → 5, baho(71) → 4, baho(56) → 3`, () => baho(86) === 5 && baho(71) === 4 && baho(56) === 3]
    ],
    hint: `} else if (ball >= 71) {\n    return 4;\n  } else if ...`,
    sol: { js: `function baho(ball) {\n  if (ball >= 86) {\n    return 5;\n  } else if (ball >= 71) {\n    return 4;\n  } else if (ball >= 56) {\n    return 3;\n  } else {\n    return 2;\n  }\n}\n\nconsole.log(baho(90));\nconsole.log(baho(60));\n` }
  }
},
{
  t: `Sikllar: for`, min: 25,
  key: `for (boshlanish; shart; qadam) { ... } kodni ko'p marta bajaradi.`,
  theory: `<p>2-sinfda robot bilan takrorlashni o'rgangan edingiz. JavaScript'da bu ${c('for')} sikli:</p>
${x(`for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// 1 2 3 4 5`, 'js')}
<ol><li>${c('let i = 1')}: boshlanish.</li><li>${c('i <= 5')}: shart to'g'ri ekan, sikl davom etadi.</li><li>${c('i++')}: har qadamdan keyin i bittaga oshadi.</li></ol>
<p>Yig'indini hisoblash:</p>
${x(`let jami = 0;
for (let i = 1; i <= 3; i++) {
  jami = jami + i;
}
console.log(jami); // 6`, 'js')}`,
  quiz: [
    [`i++ nima qiladi?`, [`i ni 1 ga oshiradi`, `i ni 2 ga ko'paytiradi`, `i ni o'chiradi`], 0, `i++ bu i = i + 1.`],
    [`for (let i = 0; i < 3; i++) necha marta ishlaydi?`, [`2`, `3`, `4`], 1, `i = 0, 1, 2: uch marta.`]
  ],
  prac: {
    task: `1) Konsolga 1 dan 10 gacha sonlarni chiqaring. 2) ${c('yigindi(n)')} funksiyasi 1 dan n gacha sonlar yig'indisini qaytarsin.`,
    tabs: ['js'],
    js: `// 1. 1 dan 10 gacha\nfor (let i = 1; i <= 3; i++) {\n  console.log(i);\n}\n\n// 2. Yig'indi\nfunction yigindi(n) {\n  let jami = 0;\n  // sikl yozing\n\n  return jami;\n}\n\nconsole.log(yigindi(10));\n`,
    tests: [
      [`Konsolda 1 dan 10 gacha sonlar`, () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every(n => window.__logs.includes(String(n)))],
      [`yigindi(10) → 55`, () => yigindi(10) === 55],
      [`yigindi(100) → 5050`, () => yigindi(100) === 5050],
      [`yigindi(1) → 1`, () => yigindi(1) === 1]
    ],
    hint: `for (let i = 1; i <= n; i++) {\n    jami = jami + i;\n  }`,
    sol: { js: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}\n\nfunction yigindi(n) {\n  let jami = 0;\n  for (let i = 1; i <= n; i++) {\n    jami = jami + i;\n  }\n  return jami;\n}\n\nconsole.log(yigindi(10));\n` }
  }
},
{
  t: `Massivlar va funksiyalar`, min: 30,
  key: `Massiv: [1, 2, 3]. arr.length uzunlik, arr[0] birinchi element, push qo'shadi.`,
  theory: `<p><b>Massiv</b> bir nechta qiymatni bitta o'zgaruvchida saqlaydi:</p>
${x(`const baholar = [5, 4, 5, 3];

console.log(baholar[0]);      // 5 (birinchi)
console.log(baholar.length);  // 4

baholar.push(5);              // oxiriga qo'shish

for (const b of baholar) {
  console.log(b);
}`, 'js')}
<ul><li>Sanash 0 dan boshlanadi: ${c('baholar[0]')} birinchi element.</li><li>${c('for...of')} massivning har bir elementidan o'tadi.</li><li>${c('n % 2 === 0')} son juft ekanini tekshiradi (2 ga bo'lgandagi qoldiq 0).</li></ul>`,
  quiz: [
    [`[7, 8, 9] massivida [1] element qaysi?`, [`7`, `8`, `9`], 1, `Sanash 0 dan: [0]=7, [1]=8.`],
    [`Massiv oxiriga element qo'shish:`, [`push()`, `add()`, `append()`], 0, `push.`]
  ],
  prac: {
    task: `${c('engKatta(arr)')} massivdagi eng katta sonni, ${c('juftlar(arr)')} faqat juft sonlardan iborat yangi massivni qaytarsin.`,
    tabs: ['js'],
    js: `function engKatta(arr) {\n  let max = arr[0];\n  // har bir elementni tekshiring\n\n  return max;\n}\n\nfunction juftlar(arr) {\n  const natija = [];\n  // juft sonlarni natija ga qo'shing\n\n  return natija;\n}\n\nconsole.log(engKatta([3, 9, 2]));\nconsole.log(juftlar([1, 2, 3, 4]));\n`,
    tests: [
      [`engKatta([3, 9, 2]) → 9`, () => engKatta([3, 9, 2]) === 9],
      [`Manfiy sonlar: engKatta([-5, -2, -9]) → -2`, () => engKatta([-5, -2, -9]) === -2],
      [`juftlar([1, 2, 3, 4, 6]) → [2, 4, 6]`, () => JSON.stringify(juftlar([1, 2, 3, 4, 6])) === '[2,4,6]'],
      [`juftlar([1, 3]) → []`, () => JSON.stringify(juftlar([1, 3])) === '[]']
    ],
    hint: `for (const n of arr) {\n    if (n > max) max = n;\n  }\n\n...\n\nif (n % 2 === 0) natija.push(n);`,
    sol: { js: `function engKatta(arr) {\n  let max = arr[0];\n  for (const n of arr) {\n    if (n > max) max = n;\n  }\n  return max;\n}\n\nfunction juftlar(arr) {\n  const natija = [];\n  for (const n of arr) {\n    if (n % 2 === 0) natija.push(n);\n  }\n  return natija;\n}\n\nconsole.log(engKatta([3, 9, 2]));\nconsole.log(juftlar([1, 2, 3, 4]));\n` }
  }
}
] });
}
