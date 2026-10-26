"""
Genera en lote las fotos de los ejercicios de la app con Stable Diffusion
(Automatic1111 o Forge) a partir de prompts-ejercicios.csv.

Requisitos
  1. Automatic1111 o Forge arrancado con la API activada:
       Windows:  añade  --api  a COMMANDLINE_ARGS en webui-user.bat
       Mac/Linux: ./webui.sh --api
  2. Python 3.9 o superior y la librería requests:  pip install requests
  3. Este script y prompts-ejercicios.csv en la misma carpeta.

Uso
  python generar_lote.py --prueba 4     -> solo los 4 primeros prompts (para elegir estilo)
  python generar_lote.py                -> los 172; los que ya existan se saltan
  python generar_lote.py --lugar Casa   -> solo un grupo (Gimnasio, Parque de barras, Casa)
  python generar_lote.py --filtro curl  -> solo ejercicios cuyo nombre contenga "curl"
  python generar_lote.py --rehacer      -> vuelve a generar aunque el archivo exista
"""
import argparse, base64, csv, json, os, sys, time

try:
    import requests
except ImportError:
    sys.exit("Falta la librería requests. Instálala con:  pip install requests")

# ---------------- Ajustes ----------------
URL = "http://127.0.0.1:7860"      # dirección de tu Stable Diffusion
CARPETA = "fotos_ejercicios"       # dónde se guardan las imágenes
SEMILLA = 4127                     # fija = mismo estilo y modelo en todo el lote
ANCHO, ALTO = 1216, 912            # 4:3, adecuado para SDXL
PASOS = 30
CFG = 5.5
SAMPLER = "DPM++ 2M"
SCHEDULER = "Karras"               # en versiones antiguas usa SAMPLER = "DPM++ 2M Karras"
IMAGENES_POR_PROMPT = 2            # genera 2 variantes y te quedas con la mejor
NEGATIVO = ("extra limbs, extra fingers, fused fingers, distorted hands, warped or bent barbell, "
            "floating weights, mismatched plates, rounded lower back, knees caving in, wrong grip, "
            "incorrect exercise form, text, watermark, logo, brand names, cartoon, illustration, "
            "3D render, CGI, plastic skin, oversaturated colors, blurry")

# Misma persona en todas las fotos (opcional, recomendado):
# instala la extensión ControlNet con un modelo IP-Adapter FaceID o Plus Face,
# pon aquí la ruta de una foto del modelo que hayas elegido y revisa los nombres
# de módulo y modelo tal como aparecen en tu desplegable de ControlNet.
CARA_REFERENCIA = ""               # p. ej. "modelo_elegido.png"; vacío = desactivado
IPADAPTER_MODULO = "ip-adapter_clip_sdxl_plus_vith"
IPADAPTER_MODELO = "ip-adapter-plus-face_sdxl_vit-h"
IPADAPTER_PESO = 0.6
# -----------------------------------------


def leer_prompts(ruta):
    with open(ruta, encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f, delimiter=";"))


def bloque_cara():
    if not CARA_REFERENCIA:
        return {}
    with open(CARA_REFERENCIA, "rb") as f:
        img = base64.b64encode(f.read()).decode()
    return {"controlnet": {"args": [{
        "enabled": True, "image": img, "module": IPADAPTER_MODULO,
        "model": IPADAPTER_MODELO, "weight": IPADAPTER_PESO,
        "resize_mode": "Crop and Resize", "control_mode": "Balanced", "pixel_perfect": True}]}}


def generar(fila, extra, intentos=3):
    datos = {
        "prompt": fila["prompt"], "negative_prompt": NEGATIVO, "seed": SEMILLA,
        "width": ANCHO, "height": ALTO, "steps": PASOS, "cfg_scale": CFG,
        "sampler_name": SAMPLER, "scheduler": SCHEDULER,
        "batch_size": IMAGENES_POR_PROMPT, "n_iter": 1,
    }
    if extra:
        datos["alwayson_scripts"] = extra
    for i in range(intentos):
        try:
            r = requests.post(f"{URL}/sdapi/v1/txt2img", json=datos, timeout=900)
            r.raise_for_status()
            return r.json()["images"]
        except Exception as e:
            print(f"   aviso: intento {i + 1} fallido ({e})")
            time.sleep(5)
    return None


def main():
    p = argparse.ArgumentParser(description="Genera en lote las fotos de los ejercicios.")
    p.add_argument("--csv", default="prompts-ejercicios.csv")
    p.add_argument("--prueba", type=int, default=0, help="genera solo los N primeros prompts")
    p.add_argument("--lugar", default="", help="Gimnasio, Parque de barras o Casa")
    p.add_argument("--filtro", default="", help="texto que debe contener el nombre del ejercicio")
    p.add_argument("--rehacer", action="store_true", help="sobrescribe las imágenes que ya existan")
    p.add_argument("--simular", action="store_true", help="muestra qué haría sin llamar a Stable Diffusion")
    a = p.parse_args()

    filas = leer_prompts(a.csv)
    if a.lugar:
        filas = [f for f in filas if f["lugar"].lower() == a.lugar.lower()]
    if a.filtro:
        filas = [f for f in filas if a.filtro.lower() in f["ejercicio"].lower()]
    if a.prueba:
        filas = filas[:a.prueba]
    if not filas:
        sys.exit("No hay prompts que coincidan con el filtro.")

    os.makedirs(CARPETA, exist_ok=True)
    if not a.simular:
        try:
            requests.get(f"{URL}/sdapi/v1/sd-models", timeout=10).raise_for_status()
        except Exception:
            sys.exit(f"No encuentro Stable Diffusion en {URL}. ¿Está abierto y arrancado con --api?")
    extra = bloque_cara()

    hechas = saltadas = fallidas = 0
    inicio = time.time()
    for n, fila in enumerate(filas, 1):
        base, ext = os.path.splitext(fila["archivo"])
        destino = os.path.join(CARPETA, f"{base}-1{ext}")
        if os.path.exists(destino) and not a.rehacer:
            saltadas += 1
            continue
        print(f"[{n}/{len(filas)}] {fila['ejercicio']} · {fila['posicion']}")
        if a.simular:
            continue
        imgs = generar(fila, extra)
        if not imgs:
            fallidas += 1
            print("   no se ha podido generar; sigue con el siguiente")
            continue
        for i, b64 in enumerate(imgs, 1):
            with open(os.path.join(CARPETA, f"{base}-{i}{ext}"), "wb") as f:
                f.write(base64.b64decode(b64.split(",", 1)[-1]))
        hechas += 1

    with open(os.path.join(CARPETA, "ajustes_usados.json"), "w", encoding="utf-8") as f:
        json.dump({"semilla": SEMILLA, "tamaño": [ANCHO, ALTO], "pasos": PASOS, "cfg": CFG,
                   "sampler": SAMPLER, "scheduler": SCHEDULER, "cara_referencia": CARA_REFERENCIA},
                  f, ensure_ascii=False, indent=2)
    mins = (time.time() - inicio) / 60
    print(f"\nListo en {mins:.1f} min: {hechas} generadas, {saltadas} ya existían, {fallidas} fallidas.")
    print(f"Imágenes en la carpeta: {os.path.abspath(CARPETA)}")


if __name__ == "__main__":
    main()
