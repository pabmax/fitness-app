# App fitness · prototipo

Prototipo de una app de entrenamiento programado con plan de nutrición opcional. Funciona entero en el navegador, en un único archivo (`index.html`), sin servidor ni instalación.

**▶ Abrir la app: https://pabmax.github.io/fitness-app/**

En el móvil, ábrela en Safari (iPhone) o Chrome (Android) y elige *Añadir a pantalla de inicio*: se instala como una app con su icono, a pantalla completa y funciona sin conexión.

En el ordenador se muestra con barra lateral; en el móvil, con barra inferior.

## Qué incluye

- **Cuestionario inicial:** perfil, gimnasio (por marca de máquinas), revisión de salud y condiciones médicas, lesión, medidas, nutrición y objetivos.
- **Entrenamiento:** plan semanal combinado con deportes y cardio, volumen por músculo, progresión por bloques de 5 semanas con descarga, sustitutos de ejercicios, readaptación de lesiones y hora de entreno por día.
- **Registro y progreso:** registro de series (peso, repeticiones, RIR), predicción de cargas, gráficas por sesión, ejercicio y bloque, y simulación de 10 semanas.
- **Nutrición:** fases (mantenimiento, volumen, definición…), macros por día según la carga, macros editables por kg, menú semanal con recetas paso a paso, comidas adaptadas al momento del entreno y a condiciones médicas.
- **Modo enfermo:** marca días de enfermedad; entreno, nutrición e histórico se adaptan sin contarlo como fallo.
- **Lista de la compra:** generada desde el menú, con checklist, presupuesto y comparativa de precio por supermercado (índices OCU 2026).
- **Perfiles:** varias personas en el mismo dispositivo, cada una con su plan.
- **Base científica:** fuentes de cada parámetro, separando evidencia y criterio práctico.

## Archivos

- `index.html`: la app completa.
- `manifest.webmanifest`, `sw.js` e iconos: permiten instalarla en el móvil y usarla sin conexión.
- `herramientas-imagenes/`: material para generar las fotos de los ejercicios.

## Notas

- Los datos se guardan solo en el navegador de cada usuario (`localStorage`). No se envía nada a ningún servidor.
- Las funciones de IA están en pausa (`AI_PAUSED = true` en el código).
- Es un prototipo: antes de un lanzamiento real, los parámetros deben revisarlos un preparador físico, un fisioterapeuta y un dietista-nutricionista.

## Carpeta `herramientas-imagenes`

Material para generar las fotos de los ejercicios con Stable Diffusion (Automatic1111 o Forge):

- `banco-prompts.html`: banco de prompts por ejercicio y lugar.
- `prompts-ejercicios.csv`: los 172 prompts en CSV.
- `generar_lote.py`: script que genera las imágenes en lote mediante la API local (`python generar_lote.py --prueba 4`).
