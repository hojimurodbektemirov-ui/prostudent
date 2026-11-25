{
const x = KM.x, c = KM.c;
KM.sinf({ n: 5, stage: 'orta', t: `HTML tuzilma`, d: `Ro'yxatlar, havolalar va jadvallar bilan ma'lumotni tartibli ko'rsatamiz.`, lessons: [
{
  t: `Ro'yxatlar: ul va ol`, min: 20,
  key: `<ul> nuqtali ro'yxat, <ol> raqamli ro'yxat. Har bir band <li>.`,
  theory: `<p>Ro'yxat ikki xil bo'ladi:</p>
${x(`<ul>
  <li>Matematika</li>
  <li>Ona tili</li>
</ul>

<ol>
  <li>Uyg'onish</li>
  <li>Badantarbiya</li>
</ol>`)}
<ul><li>${c('<ul>')} (unordered list): tartib muhim bo'lmaganda. Nuqtalar bilan chiqadi.</li><li>${c('<ol>')} (ordered list): tartib muhim bo'lganda. Raqamlar bilan chiqadi.</li><li>${c('<li>')} (list item): ro'yxatning bitta bandi.</li></ul>
<p>Ichki teglarni 2 ta bo'sh joy bilan surib yozing. Bu <b>chekinish</b> kodni o'qishni osonlashtiradi.</p>`,
  quiz: [
    [`Retsept qadamlari uchun qaysi ro'yxat mos?`, [`<ul>`, `<ol>`, `<li>`], 1, `Qadamlarda tartib muhim, shuning uchun raqamli ro'yxat.`],
    [`Ro'yxat bandi qaysi teg?`, [`<li>`, `<lt>`, `<item>`], 0, `li: list item.`]
  ],
  prac: {
    task: `Sevimli fanlar ro'yxatini kamida 3 bandga yetkazing. Keyin "Ertalabki ishlarim" uchun kamida 3 bandli ${c('<ol>')} yarating.`,
    tabs: ['html', 'css'],
    html: `<h2>Sevimli fanlarim</h2>\n<ul>\n  <li>Matematika</li>\n</ul>\n\n<h2>Ertalabki ishlarim</h2>\n`,
    css: `body {\n  font-family: sans-serif;\n  padding: 16px;\n}\n`,
    tests: [
      [`<ul> da kamida 3 band`, () => document.querySelectorAll('ul > li').length >= 3],
      [`<ol> ro'yxat bor`, () => !!document.querySelector('ol')],
      [`<ol> da kamida 3 band`, () => document.querySelectorAll('ol > li').length >= 3]
    ],
    hint: `<ol>\n  <li>Uyg'onish</li>\n  <li>Yuvinish</li>\n  <li>Nonushta</li>\n</ol>`,
    sol: { html: `<h2>Sevimli fanlarim</h2>\n<ul>\n  <li>Matematika</li>\n  <li>Informatika</li>\n  <li>Tarix</li>\n</ul>\n\n<h2>Ertalabki ishlarim</h2>\n<ol>\n  <li>Uyg'onish</li>\n  <li>Yuvinish</li>\n  <li>Nonushta</li>\n</ol>\n` }
  }
},
{
  t: `Havolalar`, min: 20,
  key: `<a href="manzil">matn</a>. target="_blank" havolani yangi oynada ochadi.`,
  theory: `<p>Internetni "to'r" qiladigan narsa havolalardir: bir sahifadan boshqasiga o'tish.</p>
${x(`<a href="https://uz.wikipedia.org" target="_blank">Vikipediya</a>`)}
<ul><li>${c('href')}: qayerga boriladi. To'liq manzil ${c('https://')} bilan boshlanadi.</li><li>Teglar orasidagi matn: foydalanuvchi bosadigan so'z.</li><li>${c('target="_blank"')}: havola yangi oynada ochiladi.</li></ul>
<p>Havola matni nima ochilishini aytsin. "Bu yerni bosing" emas, "Dars jadvali" deb yozing.</p>`,
  quiz: [
    [`Havola manzili qaysi atributda?`, [`src`, `href`, `link`], 1, `href: hypertext reference.`],
    [`Havolani yangi oynada ochish uchun nima yoziladi?`, [`target="_blank"`, `new="yes"`, `window="2"`], 0, `target="_blank" yangi tab ochadi.`]
  ],
  prac: {
    task: `Kamida 2 ta foydali saytga havola qo'shing. Ikkalasi ham ${c('https://')} bilan boshlansin va yangi oynada ochilsin.`,
    tabs: ['html'],
    html: `<h2>Foydali saytlar</h2>\n<p>Bilim olish uchun:</p>\n\n`,
    tests: [
      [`Kamida 2 ta havola`, () => document.querySelectorAll('a[href]').length >= 2],
      [`Manzillar https:// bilan boshlanadi`, () => { const a = [...document.querySelectorAll('a[href]')]; return a.length > 0 && a.every(e => /^https?:\/\//.test(e.getAttribute('href'))); }],
      [`Hammasida target="_blank"`, () => { const a = [...document.querySelectorAll('a[href]')]; return a.length > 0 && a.every(e => e.getAttribute('target') === '_blank'); }],
      [`Havola matnlari bo'sh emas`, () => { const a = [...document.querySelectorAll('a')]; return a.length > 0 && a.every(e => e.textContent.trim().length > 1); }]
    ],
    hint: `<a href="https://uz.wikipedia.org" target="_blank">Vikipediya</a>`,
    sol: { html: `<h2>Foydali saytlar</h2>\n<p>Bilim olish uchun:</p>\n<ul>\n  <li><a href="https://uz.wikipedia.org" target="_blank">Vikipediya</a></li>\n  <li><a href="https://www.khanacademy.org" target="_blank">Khan Academy</a></li>\n</ul>\n` }
  }
},
{
  t: `Jadvallar`, min: 25,
  key: `<table> jadval, <tr> qator, <th> sarlavha katak, <td> oddiy katak.`,
  theory: `<p>Dars jadvali, baholar, narxlar: bularni jadvalda ko'rsatish qulay.</p>
${x(`<table>
  <tr>
    <th>Kun</th>
    <th>1-dars</th>
  </tr>
  <tr>
    <td>Dushanba</td>
    <td>Matematika</td>
  </tr>
</table>`)}
<ul><li>${c('<table>')}: butun jadval.</li><li>${c('<tr>')} (table row): bitta qator.</li><li>${c('<th>')} (table header): sarlavha katak, qalin chiqadi.</li><li>${c('<td>')} (table data): oddiy katak.</li></ul>`,
  quiz: [
    [`Jadvalning bitta qatori qaysi teg?`, [`<td>`, `<tr>`, `<th>`], 1, `tr: table row.`],
    [`Sarlavha katak qaysi?`, [`<th>`, `<td>`, `<head>`], 0, `th: table header.`]
  ],
  prac: {
    task: `Dars jadvalini to'ldiring: kamida 3 ta qator (sarlavha qatori bilan) va kamida 4 ta ${c('<td>')} katak bo'lsin.`,
    tabs: ['html', 'css'],
    html: `<h2>Dars jadvali</h2>\n<table>\n  <tr>\n    <th>Kun</th>\n    <th>1-dars</th>\n  </tr>\n\n</table>\n`,
    css: `table {\n  border-collapse: collapse;\n}\n\nth, td {\n  border: 1px solid #999;\n  padding: 8px 12px;\n}\n\nth {\n  background: #eef2ff;\n}\n`,
    tests: [
      [`Kamida 3 ta qator`, () => document.querySelectorAll('table tr').length >= 3],
      [`Kamida 2 ta <th>`, () => document.querySelectorAll('th').length >= 2],
      [`Kamida 4 ta <td>`, () => document.querySelectorAll('td').length >= 4]
    ],
    hint: `  <tr>\n    <td>Dushanba</td>\n    <td>Matematika</td>\n  </tr>`,
    sol: { html: `<h2>Dars jadvali</h2>\n<table>\n  <tr>\n    <th>Kun</th>\n    <th>1-dars</th>\n  </tr>\n  <tr>\n    <td>Dushanba</td>\n    <td>Matematika</td>\n  </tr>\n  <tr>\n    <td>Seshanba</td>\n    <td>Ona tili</td>\n  </tr>\n</table>\n` }
  }
}
] });
}
