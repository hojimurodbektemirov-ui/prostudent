#!/usr/bin/env python3
"""Informatika darslarini yig'adi.

Kirish:
  content/informatika/plans/NN-sinf.xlsx  - o'qituvchining taqvim-mavzu rejasi (mavzu, uyga vazifa, chorak)
  content/informatika/text/NN.txt         - har bir dars nazariyasi va test savollari
Chiqish:
  content/informatika/sinf-NN.js          - platforma o'qiydigan fayl

Matn formati (NN.txt):
  # 5                      <- dars raqami
  Oddiy matn, **qalin**, `kod`
  - ro'yxat bandi
  1. raqamli band
  > Esda tuting bloki
  ```html ... ```          <- kod bloki
  ? Savol | to'g'ri javob | xato | xato     <- birinchi variant doim to'g'ri, platformada aralashtiriladi

Ishga tushirish:  python3 tools/build_informatika.py
"""
import glob, json, os, re, hashlib, sys
import openpyxl

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'content', 'informatika')


def read_plan(path):
    ws = openpyxl.load_workbook(path, data_only=True).worksheets[0]
    title, part, sec, lessons, hours = '', '', '', [], 0
    for row in ws.iter_rows(values_only=True):
        cells = ['' if c is None else str(c).strip() for c in row]
        a, b = cells[0], cells[1] if len(cells) > 1 else ''
        c = cells[2] if len(cells) > 2 else ''
        if not title and a:
            title = a
            m = re.search(r'jami\s+(\d+)\s+soat', a, re.I)
            hours = int(m.group(1)) if m else 0
            continue
        m = re.match(r'^(\d+)(-dars)?$', a)
        if m and b:
            lessons.append({'n': int(m.group(1)), 't': b, 'hw': c, 'part': part, 'sec': sec})
        elif a and not b and not re.search(r'sinf', a, re.I):
            if re.search(r'chorak|yarim', a, re.I):
                part, sec = a, ''
            else:
                sec = a
    return title, hours, lessons


def read_text(path):
    out, cur = {}, None
    for line in open(path, encoding='utf-8').read().split('\n'):
        m = re.match(r'^# (\d+)\s*$', line)
        if m:
            cur = int(m.group(1)); out[cur] = {'md': [], 'quiz': []}; continue
        if cur is None:
            continue
        if line.startswith('? '):
            parts = [p.strip() for p in line[2:].split(' | ')]
            out[cur]['quiz'].append(parts)
        else:
            out[cur]['md'].append(line)
    for k in out:
        out[k]['md'] = '\n'.join(out[k]['md']).strip()
    return out


def shuffle(q, seed):
    """Birinchi variant to'g'ri; deterministik aralashtiramiz."""
    opts = q[1:]
    order = sorted(range(len(opts)), key=lambda i: hashlib.md5((seed + str(i)).encode()).hexdigest())
    return [q[0], [opts[i] for i in order], order.index(0)]


def main():
    ok = True
    for plan in sorted(glob.glob(os.path.join(ROOT, 'plans', '*-sinf.xlsx'))):
        n = int(os.path.basename(plan)[:2])
        title, hours, lessons = read_plan(plan)
        tpath = os.path.join(ROOT, 'text', '%02d.txt' % n)
        text = read_text(tpath) if os.path.exists(tpath) else {}
        for l in lessons:
            t = text.get(l['n'])
            if not t:
                print('  ! %d-sinf %d-dars: nazariya yo\'q' % (n, l['n'])); ok = False
                l['md'], l['quiz'] = '', []
                continue
            l['md'] = t['md']
            l['quiz'] = [shuffle(q, '%d-%d-%d' % (n, l['n'], i)) for i, q in enumerate(t['quiz'])]
        extra = sorted(set(text) - {l['n'] for l in lessons})
        if extra:
            print('  ! %d-sinf: rejada yo\'q darslar matni: %s' % (n, extra)); ok = False
        data = {'n': n, 'title': re.sub(r'\s*\(.*', '', title).strip(), 'hours': max(hours, len(lessons)), 'lessons': lessons}
        js = '/* Avtomatik yaratilgan: tools/build_informatika.py. Qo\'lda o\'zgartirmang, text/%02d.txt ni tahrirlang. */\nKM.inf(%s);\n' % (n, json.dumps(data, ensure_ascii=False, indent=0))
        open(os.path.join(ROOT, 'sinf-%02d.js' % n), 'w', encoding='utf-8').write(js)
        print('%d-sinf: %d dars, %d savol' % (n, len(lessons), sum(len(l['quiz']) for l in lessons)))
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
