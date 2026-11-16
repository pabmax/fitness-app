[/^Hoy · (.+)$/,(m,a)=>'Today · '+a],
[/^El (.+?) repetiremos medidas y objetivos para reajustar el plan\.$/,(m,a)=>'On '+a+' we will repeat your measurements and goals to readjust the plan.'],
[/^Revisión de medidas el (.+)$/,(m,a)=>'Measurements review on '+a],
[/^Bloque específico de running, periodizado hacia el (.+)\.$/,(m,a)=>'Running-specific block, periodised towards '+a+'.'],
[/^Borrar el perfil (.+)$/,(m,a)=>'Delete profile '+a],
[/^Nombre de (.+)$/,(m,a)=>'Name of '+a],
[/^No hay resultados para «(.+)»\. Prueba con otra palabra, como «menú», «series» o «enfermo»\.$/,(m,a)=>'No results for “'+a+'”. Try another word, like “menu”, “sets” or “sick”.'],
[/^Entrenando como (.+)$/,(m,a)=>'Training as '+a],
[/^(Enfermo|Enferma) · (.+)$/,(m,a,b)=>{const r=trS(b.replace(/^./,c=>c.toUpperCase()),1);return r?'Sick · '+r.toLowerCase():null}],
[/^Marcado como (enfermo|enferma): (.+)$/,(m,a,b)=>'Marked as sick: '+b.split(/ y |, /).map(x=>{const r=trS(x[0].toUpperCase()+x.slice(1),1);return r||x}).join(', ')],
[/^(.+) (leve|fuerte)$/i,(m,a,b)=>{const r=trS(a[0].toUpperCase()+a.slice(1),1);if(!r)return null;const lv=b.toLowerCase()==='leve'?'mild':'severe';return a[0]===a[0].toUpperCase()?lv[0].toUpperCase()+lv.slice(1)+' '+r.toLowerCase():lv+' '+r.toLowerCase()}],
[/^(\d+) Dec$/,(m,a)=>a+' Dec']
,[/^en (Alcampo|Mercadona|Carrefour|Lidl|Aldi|Dia|Eroski|Consum|BonÀrea|Bonpreu|Caprabo|Hipercor|El Corte Inglés|Ahorramás|Gadis|Froiz|Masymas|HiperDino|Spar|Covirán|Familia|Alimerka|Lupa|Simply|Hiber|Mercadona Online)$/,(m,a)=>'at '+a]
,[/^Usaremos las máquinas que fabrica (.+?) y te propondremos solo ejercicios que se pueden hacer con ellas, además del peso libre habitual\.$/,(m,a)=>'We\'ll use the machines '+a+' makes and only suggest exercises that can be done on them, plus the usual free weights.']
,[/^Recomendada para ti según tu objetivo( y tu lesión)?: (.+)\. Si no eliges ninguna, usaremos esta\.$/,(m,a,b)=>'Recommended for you based on your goal'+(a?' and your injury':'')+': '+(trS(b,1)||b)+'. If you don\'t choose one, we\'ll use this.']
,[/^(Gramos de|Quitar) (.+)$/,(m,a,b)=>{const r=trS(b,1);return r?(a==='Quitar'?'Remove ':'Grams of ')+r:null}]
,[/^(\d+(?:[.,]\d+)?) € en (.+)$/,(m,a,b)=>'€'+numEN(a)+' at '+b]
,[/^(.+?) (derech|izquierd)(?:a|o|os|as)$/i,(m,a,b)=>{const r=trS(a[0].toLowerCase()+a.slice(1),1)||trS(a.toLowerCase(),1);if(!r)return null;const sd=b.toLowerCase()==='derech'?'right':'left';const out=sd+' '+r;return a[0]===a[0].toUpperCase()?out[0].toUpperCase()+out.slice(1):out}]
,[/^(.+?) de ambos lados$/i,(m,a)=>{const r=trS(a.toLowerCase(),1);return r?(a[0]===a[0].toUpperCase()?r[0].toUpperCase()+r.slice(1):r)+' on both sides':null}]
