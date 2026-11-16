import json,re,sys
p='/home/claude/onboarding-fitness.html'
s=open(p,encoding='utf-8').read()
EN={}
import glob
for f in sorted(glob.glob('/home/claude/i18n/en_*.json')):
    EN.update(json.load(open(f,encoding='utf-8')))
rx=open('/home/claude/i18n/rx.js',encoding='utf-8').read() if __import__('os').path.exists('/home/claude/i18n/rx.js') else ''
infra=open('/home/claude/i18n/infra.js',encoding='utf-8').read()
block='<script id="i18n">\nconst EN='+json.dumps(EN,ensure_ascii=False,separators=(',',':'))+';\nconst EN_RX=['+rx+'];\n'+infra+'</script>\n'
if '<script id="i18n">' in s:
    s=re.sub(r'<script id="i18n">.*?</script>\n',lambda m:block,s,flags=re.S)
else:
    s=s.replace('<div class="wrap" id="app"></div>\n','<div class="wrap" id="app"></div>\n'+block,1)
open(p,'w',encoding='utf-8').write(s)
print('EN entries',len(EN))
