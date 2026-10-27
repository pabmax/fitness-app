# Hoja de ruta · puntos pendientes

Ideas y mejoras aparcadas para ir escalando la app. Cada punto recoge lo ya decidido para no tener que volver a investigarlo.

**Estado:** ⏸️ aparcado · 🔜 siguiente · 🛠️ en curso · ✅ hecho

---

## 1. Pasos y datos de salud

### 1.1 Pasos sin coste ⏸️
Objetivo: un anillo de pasos en Inicio, calorías del día ajustadas a lo que te mueves de verdad y un widget con la media semanal.

- **iPhone · Atajo de Apple (recomendado).** Un atajo lee los pasos de Salud y abre la app con el número en el enlace, por ejemplo `pabmax.github.io/fitness-app/?pasos=8432`.
  - La app lee el parámetro, guarda los pasos en el día y los usa en el anillo y en las calorías.
  - Se automatiza en Atajos (Automatización → Hora del día, cada noche) o al abrir la app.
  - Pega: abre Safari un momento al ejecutarse.
- **Android · entrada manual.** Campo rápido en Inicio para escribir los pasos que marca Google Fit o Samsung Health.
- **Importar el archivo de Salud.** Exportación de la app Salud del iPhone (todos los datos) subida a la app para el historial de pasos, peso y sueño. Gratis, pero manual.
- **Descartado:** contar pasos con el sensor del navegador. Solo funciona con la app abierta y en pantalla.

### 1.2 Conexión real con Apple Salud y Health Connect ⏸️
Requiere pasar a app nativa (ver punto 2). Una web no puede leer HealthKit ni Health Connect.

- **Plugin:** `@capacitor/health-fitness` o `@capgo/capacitor-health`, que leen HealthKit (iPhone) y Health Connect (Android).
- **Datos útiles:** pasos, sueño, frecuencia cardiaca en reposo, peso de básculas conectadas y entrenos de cardio, que se registrarían solos.
- **Usos:**
  - calorías según los pasos reales;
  - bajar la carga si el sueño o el pulso indican mala recuperación;
  - el cardio cuenta para la racha.
- **Google Fit no es opción:** no admite desarrolladores nuevos desde mayo de 2024 y se cierra a finales de 2026. Usar Health Connect.

---

## 2. App nativa (iPhone y Android) ⏸️
Envolver la app actual con **Capacitor**, que reutiliza casi todo el código.

- **iPhone:** Mac con Xcode, cuenta Apple Developer (99 $ al año) y revisión de la App Store. Apple revisa con detalle el uso de datos de salud.
- **Android:** cuenta de Google Play (25 $, pago único), política de privacidad en una URL pública (obligatoria para Health Connect) y declaración de los datos que se leen.
- **Uso solo personal en Android:** instalar el APK directamente en el móvil es gratis, sin pasar por Google Play.
- **Ventajas además de Salud:** notificaciones de recordatorio, widgets de pantalla de inicio y copia de seguridad en la nube.

---

## 3. Inteligencia artificial ⏸️
Pausada con `AI_PAUSED = true` en `index.html`.

- Generar o ajustar el plan con IA, el análisis de fotos del gimnasio y la predicción de cargas necesitan un servidor propio con una clave de API, porque una web pública no puede guardar la clave de forma segura.
- Tiene coste de uso por cada llamada.

---

## 4. Datos y copia de seguridad 🔜
- **Exportar e importar** todos los datos (perfil, plan y registro) en un archivo, para no perderlos al borrar los datos de Safari o al cambiar de móvil.
- Hoy en GitHub Pages todo vive solo en el navegador de cada dispositivo.

---

## 5. Lista de la compra ⏸️
- **Comparar solo lo que falta por comprar:** interruptor para dejar fuera los productos ya marcados.
- **Mostrar solo los 5 supermercados más baratos**, con un botón "Ver todas". Algunas provincias tienen hasta 16 cadenas.
- **Lista conjunta entre perfiles:** sumar lo que necesitan todas las personas del dispositivo.
- **Revisar los formatos de venta** con el catálogo real de los supermercados más usados. Ahora son los formatos habituales de marca blanca, fijados a mano.

---

## 6. Imagen y contenido ⏸️
- **Fotos reales de los ejercicios** con el banco de prompts de `herramientas-imagenes/`, en lugar de las ilustraciones actuales.
- **Color de marca propio** para sustituir el violeta de acento.
- **Inicio:** permitir elegir y ordenar los widgets (el botón "+" ya existe).

---

## Hecho recientemente ✅
- Cuestionario con una pregunta por pantalla, ruedas, silueta para lesiones, previsión a 10 semanas y creación del plan animada.
- Inicio con racha, siguiente serie con un toque, 9 logros y celebraciones.
- Versión web para pantallas 16:9.
- Lista de la compra con formatos de venta reales y comparativa plegable.
- Pregunta de salud unificada.
