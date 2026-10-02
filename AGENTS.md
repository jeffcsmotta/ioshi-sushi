# Contexto do Cliente: Ioshi Japanese Food

> Documento de escopo enxuto para agentes e IAs (Antigravity, OpenCode, Claude Code).

---

## 📌 Identificação & Dados Oficiais
- **Cliente**: Ioshi Japanese Food
- **Produto Onira**: Onira.fly (ver `../../processos/produtos/onira-fly.md`)
- **Status**: Apresentando Proposta Comercial
- **Nicho**: Gastronomia Japonesa
- **Localização**: Av. Júlio de Castilhos, 2970 - São Pelegrino, Caxias do Sul - RS
- **WhatsApp Oficial de Pedidos**: +55 (54) 3533-5556
- **Paleta Oficial**: Sumi Obsidian (`#07070A`), Sunset Flame Orange (`#F37437`), Warm Shari Cream (`#FFF9F2` / `#EBE3D8`), Japanese Lacquer Crimson (`#BA3329`)
- **Tipografia**: Cinzel (Display Imperial) + Outfit (Headings) + Plus Jakarta Sans (Body)

---

## 🛠️ Arquitetura Técnica
- **Stack**: Vanilla HTML5 + CSS + Modern JS ES6+ (Zero-Build)
- **Dados**: `cardapio.json` (categorias e produtos)
- **Ativos**: `assets/logo_official.png`, fotos de pratos em WebP
- **Deploy**: Cloudflare Pages (`https://ioshi-sushi.pages.dev`)
  - Comando: `npx wrangler pages deploy clientes/ioshi-sushi --project-name=ioshi-sushi`

---

## ⚡ Regras de UX Ativas
- **Cards 1-Click vs Modal**: Bebidas e itens simples usam `addDirectToCart()`. Combos e pokes abrem `openProductModal()`.
- **Telemetria**: `proposta.html` possui o radar de visualizações e seções integrado.
