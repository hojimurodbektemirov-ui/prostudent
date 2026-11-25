/* O'quvchi kodini xavfsiz iframe ichida ishga tushiradi va testlarni bajaradi. */
(function () {
  let seq = 0; const H = {};
  window.addEventListener('message', e => { const m = e.data; if (m && typeof m.km === 'number' && H[m.km]) H[m.km](m); });
  const bridge = 'window.__logs=[];window.__lp=0;(function(){function f(x){if(typeof x==="string")return x;try{return JSON.stringify(x)}catch(e){return String(x)}}function s(t,a){try{parent.postMessage({km:__ID__,t:t,a:a},"*")}catch(e){}}["log","info","warn","error"].forEach(function(k){var o=console[k];console[k]=function(){var a=[].map.call(arguments,f);window.__logs.push(a.join(" "));s(k,a);try{o.apply(console,arguments)}catch(e){}}});window.addEventListener("error",function(e){var l=e.lineno?e.lineno-__OFF__:0;s("error",[(e.message||"Xato")+(l>0?" ("+l+"-qator)":"")])});document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[href]");if(a&&a.getAttribute("href").charAt(0)!=="#"){e.preventDefault();s("info",["Havola: "+a.getAttribute("href")+" (bu yerda ochilmaydi, saytda ochiladi)"])}},true);document.addEventListener("submit",function(e){e.preventDefault();s("info",["Forma yuborildi"])},true);' +
    /* alert/confirm/prompt bloklangan joylarda (masalan Claude ilovasi): o'zimizning oynacha */
    'var na=window.alert,np=window.prompt,nc=window.confirm;function bx(m){var d=document.createElement("div");d.style.cssText="position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;background:rgba(10,26,63,.45);font:16px/1.5 system-ui,sans-serif";var c=document.createElement("div");c.style.cssText="background:#fff;color:#0f1b33;padding:20px 22px;border-radius:14px;max-width:min(420px,90vw);box-shadow:0 20px 50px rgba(0,0,0,.3)";var p=document.createElement("p");p.style.cssText="margin:0 0 16px;white-space:pre-wrap";p.textContent=String(m);var b=document.createElement("button");b.textContent="OK";b.style.cssText="font:inherit;padding:8px 22px;border:0;border-radius:999px;background:#2f6bff;color:#fff;cursor:pointer";b.onclick=function(){d.remove()};c.appendChild(p);c.appendChild(b);d.appendChild(c);(document.body||document.documentElement).appendChild(d);b.focus()}' +
    'window.alert=function(m){try{return na.call(window,m)}catch(e){bx(m)}};window.confirm=function(m){try{return nc.call(window,m)}catch(e){bx(m);return true}};' +
    'window.prompt=function(m,v){try{return np.call(window,m,v)}catch(e){var j=v!=null?String(v):"Mehmon";s("info",["prompt() bu oynada ishlamaydi: Claude ilovasi so‘rov oynalarini bloklaydi. Saytni Chrome yoki Edge’da oching, u yerda ishlaydi. Hozircha javob: «"+j+"»"]);return j}};' +
    '})();';
  /* Cheksiz sikllardan himoya: har bir sikl ichiga hisoblagich qo'yiladi */
  const guard = js => js.replace(/\b(for|while)\s*\(((?:[^()]|\([^()]*\))*)\)\s*\{/g, '$1($2){if(++window.__lp>5e6)throw new Error("Cheksiz sikl! Shartni tekshiring");').replace(/\bdo\s*\{/g, 'do{if(++window.__lp>5e6)throw new Error("Cheksiz sikl! Shartni tekshiring");');
  KM.run = function (frame, code, tests, onMsg) {
    Object.keys(H).forEach(k => { if (H[k].frame === frame) delete H[k]; });
    const id = ++seq; const h = m => onMsg(m); h.frame = frame; H[id] = h;
    const js = guard(code.js || '').replace(/<\/script/gi, '<\\/script');
    const head = '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>' + (code.css || '') + '</style><script>' + bridge + '<\/script></head><body>' + (code.html || '') + '\n<script>\n';
    const off = head.split('\n').length - 1;
    let tail = '';
    if (tests && tests.length) tail = '<script>window.addEventListener("load",function(){setTimeout(async function(){var T=[' + tests.map(t => '(' + t[1].toString() + ')').join(',') + '],r=[];for(var i=0;i<T.length;i++){try{r.push(!!(await T[i]()))}catch(e){r.push(false)}}parent.postMessage({km:' + id + ',t:"tests",a:r},"*")},80)})<\/script>';
    frame.srcdoc = head.replace(/__ID__/g, id).replace(/__OFF__/g, off) + js + '\n<\/script>' + tail + '</body></html>';
    return id;
  };
  KM.page = code => '<!doctype html>\n<html lang="uz">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>' + KM.esc(code.name || 'Loyiha') + '</title>\n<style>\n' + (code.css || '') + '\n</style>\n</head>\n<body>\n' + (code.html || '') + '\n<script>\n' + (code.js || '') + '\n<\/script>\n</body>\n</html>\n';
})();
