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
- **Paleta Oficial**: Laranja Ioshi (`#F27437`), Hover (`#E06124`), Dark Surface (`#121217`)

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
