/* ---------- Idioma ES/EN: capa de traducción sobre el DOM ----------
   La app se escribe en español. En inglés, cada texto que aparece en pantalla se busca en EN
   (texto exacto), luego con los números como {0},{1}…, luego en reglas EN_RX y, si lleva " · ",
   por partes. Lo que no está traducido se queda en español y se apunta en I18N_MISS. */
let LANG=/^es\b/i.test((navigator.languages&&navigator.languages[0])||navigator.language||'es')?'es':'en';try{const v=localStorage.getItem('onb-fitness-lang');if(v==='es'||v==='en')LANG=v}catch(e){}
document.documentElement.lang=LANG;
const LOC=()=>LANG==='en'?'en-GB':'es-ES';
const I18N_MISS=new Set();
const I18N_NORM=t=>t.replace(/\{\d+\}|\d+(?:[.,]\d+)*/g,'#');let I18N_VK=null;
const isEN=t=>{if(!I18N_VK)I18N_VK=new Set(Object.values(EN).map(I18N_NORM));return I18N_VK.has(I18N_NORM(t))};
const numEN=n=>/^\d{1,3}(\.\d{3})+$/.test(n)?n.replace(/\./g,','):/^\d+,\d+$/.test(n)?n.replace(',','.'):n;
function trS(t,deep){if(EN[t]!=null)return EN[t];
  {const a=t.match(/^(· |≈ )(.+)$/)||t.match(/^(.+?)( ↗| →)$/);if(a){const pre=/^(· |≈ )$/.test(a[1]),r=trS(pre?a[2]:a[1],deep);if(r!=null)return pre?a[1]+r:r+a[2]}}
  const nums=[],k=t.replace(/\d+(?:[.,]\d+)*/g,m=>{nums.push(m);return '{'+(nums.length-1)+'}'});
  if(nums.length&&EN[k]!=null)return EN[k].replace(/\{(\d+)\}/g,(_,i)=>numEN(nums[+i]));
  {const ph=trPH(t);if(ph!=null)return ph}
  for(const [rx,f] of EN_RX){const m=t.match(rx);if(m){const r=typeof f==='function'?f(...m):t.replace(rx,f);if(r!=null)return r}}
  if((deep||0)<2){for(const sep of [' · ',' — ',': ',' + ',', ']){if(t.includes(sep)){const ps=t.split(sep),tp=ps.map(p=>{const q=p.trim();if(!q||!/[A-Za-zÁ-ú]/.test(q))return p;const r=trS(q,(deep||0)+1);return r==null?null:p.replace(q,r)});if(tp.every(x=>x!=null))return tp.join(sep)}}}
  if(!deep&&/[.!?] [A-ZÁÉÍÓÚ¿¡]/.test(t)){const ps=t.split(/(?<=[.!?]) (?=[A-ZÁÉÍÓÚ¿¡])/),tp=ps.map(p=>trS(p,1));if(tp.every(x=>x!=null))return tp.join(' ')}
  if(t.length>2&&t===t.toUpperCase()&&/[A-ZÁÉÍÓÚÑ]{2}/.test(t)){const lo=t[0]+t.slice(1).toLowerCase(),r=trS(lo,1);if(r!=null)return r.toUpperCase()}
  const end=t.match(/^(.*?)([.:!?…]+)$/);if(end&&end[1]&&EN[end[1]]!=null)return EN[end[1]]+end[2];
  if(t[0]!==t[0].toUpperCase()){const up=t[0].toUpperCase()+t.slice(1);if(EN[up]!=null){const r=EN[up];return r[0].toLowerCase()+r.slice(1)}}
  return null}
let EN_PH=null;const trName=x=>x.split(/(, | y )/).map(w=>w===', '?', ':w===' y '?' and ':(EN[w]||((r=>r?r.toLowerCase():null)(trS(w[0].toUpperCase()+w.slice(1),1)))||w)).join('');
function trPH(t){if(!EN_PH)EN_PH=[...Object.keys(EN).filter(k=>/\{[pcfx]\}/.test(k)).map(k=>[k,EN[k]]),...Object.entries(EN_DISH)].map(([k,val])=>{const ro=[];const rx=new RegExp('^'+k.replace(/[.*+?^$()|[\]\\]/g,'\\$&').replace(/\{([pcfx])\}/g,(_,r)=>{ro.push(r);return '(.+?)'})+'$');return [rx,val,ro]});
  for(const [rx,val,ro] of EN_PH){const m=t.match(rx);if(m){const v={};ro.forEach((r,i)=>v[r]=trName(m[i+1]));return val.replace(/\{([pcfx])\}/g,(_,r)=>v[r]||'')}}return null}
const I18N_SKIP=new Set(['SCRIPT','STYLE','TEXTAREA','CODE','PRE']);
function trText(n){const raw=n.nodeValue,t=raw.trim();if(!t)return;if(!/[A-Za-zÁ-úñ¿¡]/.test(t)){if(/\d[.,]\d/.test(t)){const r=t.replace(/\d+(?:[.,]\d+)*/g,numEN);if(r!==t)n.nodeValue=raw.replace(t,r)}return}const p=n.parentNode;if(!p||I18N_SKIP.has(p.nodeName)||(p.closest&&p.closest('[data-notr]')))return;
  const r=trS(t);if(r!=null){if(r!==t)n.nodeValue=raw.replace(t,r)}else if(/[a-záéíóúñ]/i.test(t)&&!isEN(t))I18N_MISS.add(t)}
function trAttr(el){for(const a of ['placeholder','aria-label','title','alt']){const v=el.getAttribute&&el.getAttribute(a);if(v&&/[A-Za-z]/.test(v)){const r=trS(v.trim());if(r!=null)el.setAttribute(a,r);else if(!isEN(v.trim()))I18N_MISS.add(v.trim())}}}
function trNode(root){if(LANG!=='en'||!root)return;if(root.nodeType===3){trText(root);return}if(root.nodeType!==1||I18N_SKIP.has(root.nodeName))return;
  trAttr(root);const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())L.push(n);L.forEach(trText);
  root.querySelectorAll('[placeholder],[aria-label],[title],[alt]').forEach(trAttr)}
new MutationObserver(ms=>{if(LANG!=='en')return;for(const m of ms)m.addedNodes.forEach(trNode)}).observe(document.getElementById('app').parentNode,{childList:true,subtree:true});
const FLAGS={es:'<svg class="flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#AA151B"/><rect y="5" width="30" height="10" fill="#F1BF00"/></svg>',
  en:'<svg class="flag" viewBox="0 0 60 30" aria-hidden="true"><rect width="60" height="30" fill="#012169"/><path d="M0 0l60 30M60 0L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" stroke-width="2.4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>'};
const langBtn=cls=>`<button type="button" class="${cls||'rvlang'}" data-act="lang" aria-label="${LANG==='en'?'Language: English':'Idioma: español'}" data-notr>${FLAGS[LANG]}<span>${LANG.toUpperCase()}</span></button>`;
function langSheet(){document.querySelectorAll('.lgsh').forEach(x=>x.remove());const o=document.createElement('div');o.className='lgsh';o.setAttribute('data-notr','');
  o.innerHTML=`<div class="lgbg" data-lg="x"></div><div class="lgb" role="dialog" aria-modal="true" aria-label="Idioma · Language"><div class="lggrab"></div><b>Idioma · Language</b>
   <div role="radiogroup" class="lgopts">${[['es','Español','Español de España'],['en','English','English (UK)']].map(([k,n,s])=>`<button type="button" class="lgopt" role="radio" aria-checked="${k===LANG}" data-lg="${k}">${FLAGS[k]}<span>${n}<small>${s}</small></span><i></i></button>`).join('')}</div>
   <p class="lgnote">${LANG==='en'?'Supermarkets, prices and pack sizes are for Spain.':'Los supermercados, precios y formatos de venta son de España.'}</p>
   <button type="button" class="lgcn" data-lg="x">${LANG==='en'?'Cancel':'Cancelar'}</button></div>`;
  document.body.appendChild(o);const f=o.querySelector('[aria-checked="true"]');f&&f.focus();
  const close=()=>{o.remove();const b=document.querySelector('[data-act="lang"]');b&&b.focus()};
  o.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  o.addEventListener('click',e=>{const b=e.target.closest('[data-lg]');if(!b)return;const v=b.dataset.lg;if(v==='x'||v===LANG){close();return}setLang(v);close();toast(v==='en'?'Language: English':'Idioma: español')})}
function setLang(v){LANG=v;try{localStorage.setItem('onb-fitness-lang',v)}catch(e){}document.documentElement.lang=v;render(true);if(v==='en')trNode(document.body)}
