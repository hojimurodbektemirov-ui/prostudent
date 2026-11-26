/* Python (Pyodide) alohida oqimda ishlaydi: cheksiz sikl sahifani qotirmaydi, vaqt tugasa to'xtatiladi. */
let py = null, ready = null;
self.onmessage = async ev => {
  const m = ev.data;
  if (m.type === 'init') {
    ready = ready || (async () => {
      importScripts(m.base + 'pyodide.js');
      py = await loadPyodide({ indexURL: m.base });
    })();
    try { await ready; self.postMessage({ type: 'ready' }); } catch (e) { self.postMessage({ type: 'fatal', text: String(e && e.message || e) }); }
    return;
  }
  if (m.type === 'run') {
    await ready;
    const lines = (m.input || '').split('\n'); let li = 0;
    const dec = new TextDecoder();
    py.setStdout({ write: buf => { self.postMessage({ type: 'out', text: dec.decode(buf) }); return buf.length; } });
    py.setStderr({ batched: t => self.postMessage({ type: 'err', text: t }) });
    py.setStdin({ stdin: () => { if (li < lines.length && !(li === lines.length - 1 && lines[li] === '')) { const v = lines[li++]; self.postMessage({ type: 'in', text: v }); return v; } self.postMessage({ type: 'need' }); return null; } });
    try {
      await py.loadPackagesFromImports(m.code);
      await py.runPythonAsync(m.code);
      self.postMessage({ type: 'done' });
    } catch (e) {
      self.postMessage({ type: 'error', text: String(e && e.message || e) });
    }
  }
};
