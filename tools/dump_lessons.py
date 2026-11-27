#!/usr/bin/env python3
"""Kontent yozish uchun yordamchi: sinf darslari ro'yxati, hozirgi savollar soni va savollar matni.
   python3 tools/dump_lessons.py 5"""
import sys, os, re
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import build_informatika as B

n = int(sys.argv[1])
_, _, lessons = B.read_plan(os.path.join(B.ROOT, 'plans', '%02d-sinf.xlsx' % n))
text = B.read_text(os.path.join(B.ROOT, 'text', '%02d.txt' % n))
import glob
for xp in sorted(glob.glob(os.path.join(B.ROOT, 'text', '%02d.extra*.txt' % n))):
    text = B.merge(text, B.read_text(xp))
for l in lessons:
    t = text.get(l['n'], {'quiz': [], 'md': ''})
    rv = ' [TAKRORLASH]' if B.REVIEW.search(l['t']) else ''
    print('## %d. %s%s  (%d savol, %d belgi)' % (l['n'], l['t'], rv, len(t['quiz']), len(t['md'])))
    if '-q' in sys.argv:
        for q, _ in t['quiz']:
            print('   - ' + q[0])
