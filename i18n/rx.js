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
,[/^Animación de (.+): posición inicial y final$/,(m,a)=>'Animation of '+(trS(a,1)||a)+': start and end position']
,[/^Técnica: (.+)$/,(m,a)=>{const r=trS(a,1);return r?'Technique: '+r:null}]
,[/^Ver técnica de (.+)$/,(m,a)=>{const r=trS(a,1);return r?'See technique for '+r:null}]
,[/^Ver cómo se hace: (.+)$/,(m,a)=>{const r=trS(a,1);return r?'See how to do it: '+r:null}]
,[/^(.+), serie (\d+), (peso|repeticiones|RIR)$/,(m,a,n,f)=>{const r=trS(a,1);return r?r+', set '+n+', '+({peso:'weight',repeticiones:'reps',RIR:'RIR'})[f]:null}]
,[/^Cambiar (.+) por otro plato$/,(m,a)=>'Swap '+(trS(a,1)||a)+' for another dish']
,[/^Ver receta: (.+)$/,(m,a)=>'See recipe: '+(trS(a,1)||a)]
,[/^Ver (Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo)(: (enfermo|enferma))?$/,(m,a,b)=>'See '+EN[a]+(b?': sick':'')]
,[/^Próxima sesión de (.+):$/,(m,a)=>'Next '+(trS(a,1)||a)+' session:']
,[/^Juega tu partido aplicando lo que trabajaste en la última sesión: (.+)\.$/,(m,a)=>'Play your match applying what you worked on last session: '+(trS(a[0].toUpperCase()+a.slice(1),1)||a).toLowerCase()+'.']
,[/^(\d+) min de (.+?): (.+)\. Después, partido\.$/,(m,n,a,b)=>{const x=trS(a[0].toUpperCase()+a.slice(1),1),y=trS(b,1);return x&&y?n+' min of '+x.toLowerCase()+': '+y+'. Then a match.':null}]
,[/^Técnica suave de (.+?) \((.+)\) y peloteo, sin partido competitivo\.$/,(m,a,b)=>{const x=trS(a[0].toUpperCase()+a.slice(1),1),y=trS(b,1);return x&&y?'Gentle '+x.toLowerCase()+' technique ('+y+') and rallying, no competitive match.':null}]
,[/^Protocolo de lesión: (.+), fase (\d+) de (\d+), (.+)\. Toca para (cerrar|ver el plan)$/,(m,z,a,b,sm,t)=>'Injury protocol: '+(trS(z,1)||z)+', phase '+a+' of '+b+', '+(trS(sm,1)||sm)+'. Tap to '+(t==='cerrar'?'close':'see the plan')]
,[/^Como (.+) no tiene días fijos, te proponemos hacerlo el (.+)\.$/,(m,a,d)=>'As '+(trS(a,1)||a)+' has no fixed days, we suggest doing it on '+(trS(d[0].toUpperCase()+d.slice(1),1)||d)+'.']
,[/^Semana organizada junto a (.+): mira el calendario\.$/,(m,a)=>'Week organised around '+a.split(', ').map(x=>trS(x,1)||x).join(', ')+': check the calendar.']
,[/^La pierna de fuerza \((.+)\) queda lejos de (.+) para que llegues con las piernas frescas\.$/,(m,d,s)=>'Strength leg days ('+d.split(', ').map(x=>(trS(x[0].toUpperCase()+x.slice(1),1)||x)).join(', ')+') are kept away from '+s.split(', ').map(x=>trS(x,1)||x).join(', ')+' so your legs arrive fresh.']
,[/^Tus sesiones de (.+) cuentan como cardio y cubren lo que necesitas\.$/,(m,a)=>'Your '+a.split(/, | y /).map(x=>trS(x,1)||x).join(' and ')+' sessions count as cardio and cover what you need.']
,[/^([A-ZÁÉÍÓÚÑ ]+) · SEM (\d+)$/,(m,d,n)=>{const r=trS(d[0]+d.slice(1).toLowerCase(),1);return r?r.toUpperCase()+' · WK '+n:null}]
,[/^PLATO DEL DÍA · ([A-ZÁÉÍÓÚÑ]+)$/,(m,d)=>{const r=trS(d[0]+d.slice(1).toLowerCase(),1);return r?'DISH OF THE DAY · '+r.toUpperCase():null}]
,[/^(Technogym|Life Fitness|Hammer Strength|Matrix) · (.+)$/,(m,a,b)=>m]
,[/^Tus sesiones de (.+) cuentan como parte de este trabajo\.$/,(m,a)=>'Your '+a.split(/, | y /).map(x=>trS(x,1)||x).join(' and ')+' sessions count as part of this work.']
,[/^Para (.+?)(?: y (\d+) más)?$/,(m,a,n)=>/[áéíóúñ]| con | de /.test(a)?null:'For '+a+(n?' and '+n+' more':'')]
,[/^Te faltan unos (\d+) g de proteína al día\. Por ejemplo: (.+)\.$/,(m,n,l)=>'You\'re short about '+n+' g of protein a day. For example: '+l.split(/, (?=\d)/).map(x=>{const q=x.match(/^(\d+) g de (.+) en (desayuno|comida|cena|merienda) \(\+(\d+) g\)$/);if(!q)return x;const f=trS(q[2][0].toUpperCase()+q[2].slice(1),1);return q[1]+' g of '+(f?f.toLowerCase():q[2])+' at '+({desayuno:'breakfast',comida:'lunch',cena:'dinner',merienda:'snack'})[q[3]]+' (+'+q[4]+' g)'}).join(', ')+'.']
,[/^(Lunes|Martes|Miércoles|Jueves|Viernes|Sábado|Domingo): (\d+) kcal, (?:carga (alta|media|baja)|(enfermo|enferma))$/,(m,d,k,c,sk)=>EN[d]+': '+k+' kcal, '+(sk?'sick':({alta:'high',media:'medium',baja:'low'})[c]+' load')]
,[/^PLATO DEL DÍA · ADAPTADO$/,()=>'DISH OF THE DAY · ADAPTED']

,[/^(.+) hoy$/,(m,a)=>{const r=trS(a,1);return r?r+' today':null}]
,[/^Casi cuadra: (.+) respecto al objetivo de esta comida$/,(m,a)=>'Almost fits: '+a.replace(/ de grasa/g,' fat').replace(/ de hidratos/g,' carbs').replace(/ de proteína/g,' protein')+' compared with this meal\'s target']

,[/^Receta: (.+)$/,(m,a)=>'Recipe: '+(trS(a,1)||a)]

,[/^No hay resultados para «(.+)»\. Prueba con otra palabra: un ejercicio, un plato, un alimento, «enfermo» o «idioma»\.$/,(m,a)=>'No results for “'+a+'”. Try another word: an exercise, a dish, a food, “sick” or “language”.']
