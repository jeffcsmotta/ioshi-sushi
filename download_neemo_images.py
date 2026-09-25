import os
import io
import json
import requests
from PIL import Image

TARGET_DIR = r"c:\Users\ADM\onira-labs\clientes\ioshi-sushi\assets\pratos"
os.makedirs(TARGET_DIR, exist_ok=True)

ITEMS = [
  {"id": "oniguiri-camarao", "modalId": "2820113", "name": "Oniguiri Camarão"},
  {"id": "oniguiri-salmao", "modalId": "2820114", "name": "Oniguiri Salmão"},
  {"id": "oniguiri-atum-spicy", "modalId": "2820115", "name": "Oniguiri Atum Spicy"},
  {"id": "combo-hot-12", "modalId": "2820116", "name": "Combo Hot 12pc"},
  {"id": "porcao-tokay-salmao", "modalId": "2820117", "name": "Porção Tokay Salmão 4un"},
  {"id": "combo-iosake", "modalId": "2820118", "name": "Combo Iosake 38 peças"},
  {"id": "ceviche-salmao", "modalId": "2820119", "name": "Ceviche de Salmão"},
  {"id": "combo-promocional", "modalId": "2820120", "name": "Combo Promocional"},
  {"id": "poke-salmao-fresh", "modalId": "2820121", "name": "Poke Salmão In Natura"},
  {"id": "poke-salmao-selado", "modalId": "2820122", "name": "Poke Salmão Selado"},
  {"id": "poke-camarao-crispy", "modalId": "2820123", "name": "Poke Camarão Crispy"},
  {"id": "poke-atum-spicy", "modalId": "2820124", "name": "Poke Atum Spicy"},
  {"id": "poke-vegetariano", "modalId": "2820125", "name": "Poke Vegetariano"},
  {"id": "ceviche-peixe-branco", "modalId": "2820126", "name": "Ceviche Peixe Branco"},
  {"id": "trouxinha-alho-poro", "modalId": "2820127", "name": "Trouxinha Alho Poró"},
  {"id": "trouxinha-camarao", "modalId": "2820128", "name": "Trouxinha Camarão"},
  {"id": "shimeji-manteiga", "modalId": "2820129", "name": "Shimeji na Manteiga"},
  {"id": "porcao-hot-filadelfia", "modalId": "2820130", "name": "Porção Hot Filadélfia 12un"},
  {"id": "sunomono", "modalId": "2820131", "name": "Sunomono"},
  {"id": "big-hot-salmao", "modalId": "2820132", "name": "Big Hot Salmão"},
  {"id": "big-hot-camarao", "modalId": "2820133", "name": "Big Hot Camarão"},
  {"id": "big-hot-harumaki", "modalId": "2820134", "name": "Big Hot Harumaki"},
  {"id": "big-hot-vegano", "modalId": "2820135", "name": "Big Hot Vegano"},
  {"id": "combo-hot-24", "modalId": "2820140", "name": "Combo Hot 24pc"},
  {"id": "hot-doritos", "modalId": "2820141", "name": "Hot Doritos 8un"},
  {"id": "hot-camarao", "modalId": "2820142", "name": "Hot Camarão 8un"},
  {"id": "porcao-hot-filadelfia-12", "modalId": "2820143", "name": "Porção Hot Filadélfia 12 Un"},
  {"id": "porcao-hot-alho-poro", "modalId": "2820144", "name": "Porção Hot Alho Poró 8 Un"},
  {"id": "hot-tartar", "modalId": "2820145", "name": "Hot Tartar 8un"},
  {"id": "hot-kiiro", "modalId": "2820146", "name": "Hot Kiirô 12un"},
  {"id": "hot-kyodai", "modalId": "2820147", "name": "Hot Kyodai 12un"},
  {"id": "kojin-arte", "modalId": "2820148", "name": "Kojin Arte 10un"},
  {"id": "combo-1-makoto", "modalId": "2820149", "name": "Combo 1 Makoto 28 peças"},
  {"id": "combo-1-meyo", "modalId": "2820150", "name": "Combo 1 Meyo 23 peças"},
  {"id": "combo-selado-22", "modalId": "2820151", "name": "Combo Selado 22 peças"},
  {"id": "combo-especialidades", "modalId": "2820152", "name": "Combo Especialidades Ioshi 20 peças"},
  {"id": "combo-2-taisho", "modalId": "2820153", "name": "Combo 2 Taisho 38 peças"},
  {"id": "combo-2-yasuke", "modalId": "2820154", "name": "Combo 2 Yasuke 36 peças"},
  {"id": "combo-3-taisho", "modalId": "2820155", "name": "Combo 3 Taisho 54 peças"},
  {"id": "combo-3-yasuke", "modalId": "2820156", "name": "Combo 3 Yasuke 54 peças"},
  {"id": "combo-makoto-4", "modalId": "2820157", "name": "Combo 3 Makoto 70 peças"},
  {"id": "combo-3-meyo", "modalId": "2820158", "name": "Combo 3 Meyo 64 peças"},
  {"id": "combo-chuugi", "modalId": "2820159", "name": "Combo Chuugi 58 peças"}
]

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

success = 0
failed = 0

print(f"Iniciando download e conversão de {len(ITEMS)} pratos oficiais do Ioshi...")

for item in ITEMS:
    modal_id = item["modalId"]
    slug = item["id"]
    url = f"https://cdn.neemo.com.br/uploads/item/photo/{modal_id}/{modal_id}.jpg"
    out_webp = os.path.join(TARGET_DIR, f"{slug}.webp")
    
    try:
        res = requests.get(url, headers=headers, timeout=15)
        if res.status_code == 200 and len(res.content) > 1000:
            img = Image.open(io.BytesIO(res.content))
            img = img.convert("RGB")
            # Redimensiona mantendo proporção com max 800x800 para altíssima nitidez e leveza
            img.thumbnail((800, 800), Image.Resampling.LANCZOS)
            img.save(out_webp, "WEBP", quality=85, optimize=True)
            size_kb = os.path.getsize(out_webp) / 1024
            print(f"[OK] {item['name']} -> {slug}.webp ({size_kb:.1f} KB)")
            success += 1
        else:
            print(f"[FAIL {res.status_code}] {item['name']} URL: {url}")
            failed += 1
    except Exception as e:
        print(f"[ERROR] {item['name']}: {e}")
        failed += 1

print(f"\nFinalizado: {success} baixadas e otimizadas com sucesso, {failed} falhas.")
