/**
 * ONIRA.FLY — High-Conversion Digital Channels for Gastronomy
 * Interactive Engine: Case Switcher, Device Toggle & Margin ROI Simulator v3.0
 */

// Casos Reais Anonymizados com diferenciais de interface (Design, Vitrine, Carrinho) e capturas HD
const SHOWCASE_CASES = {
    bebidas: {
        title: "Adega & Conveniência Express",
        niche: "BEBIDAS & ADEGA EXPRESS",
        domain: "adegabebidasexpress.com.br",
        desc: "Vitrine noturna em fundo escuro que destaca rótulos nobres e reposição de cervejas geladas. O cliente seleciona garrafa avulsa ou caixa fechada com desconto em 1 clique, sem modais lentos.",
        orders: "+340",
        savings: "R$ 4.650",
        speed: "22s",
        ticket: "R$ 92,00",
        calcOrders: "+340 pedidos",
        calcTicket: "R$ 92,00",
        calcRevenue: "R$ 31.280",
        calcSavings: "R$ 4.650",
        calcRationale: "<strong>Por que 22s de atendimento?</strong> O cliente escolhe garrafa ou pack na vitrine limpa e envia para o WhatsApp. Sem login ou cadastros lentos.",
        screenshotMobile: "assets/screenshots/montecristo_mobile.jpg",
        pillars: [
            {
                icon: "layout-grid",
                title: "Dark Mode & Rótulos em Alta Resolução",
                desc: "Fundo contrastante que valoriza garrafas de whisky, vinhos e destilados nobres com teor alcoólico, volume (mL/L) e preço unitário visíveis de imediato."
            },
            {
                icon: "layers",
                title: "Alternância Rápida: Garrafa vs. Caixa",
                desc: "Seletor instantâneo no próprio produto entre compra avulsa ou pack de 6/12 unidades com valor por garrafa recalculado na hora."
            },
            {
                icon: "shopping-cart",
                title: "Adição em 1 Toque Direto na Vitrine",
                desc: "Sem modais intermediários travando a rolagem: adiciona múltiplos itens ao pedido e finaliza com endereço no WhatsApp."
            }
        ]
    },
    delicatessen: {
        title: "Delicatessen, Tortas & Pâtisserie Fina",
        niche: "DELICATESSEN & PÂTISSERIE ARTESANAL",
        domain: "delicatessenedocesnobres.com.br",
        desc: "Visual editorial com fotografia de alto apetite para doces finos, tortas e presentes artesanais. Integração de pronta-entrega com encomendas programadas preservando a margem de itens nobres.",
        orders: "+280",
        savings: "R$ 4.980",
        speed: "32s",
        ticket: "R$ 88,00",
        calcOrders: "+280 pedidos",
        calcTicket: "R$ 88,00",
        calcRevenue: "R$ 24.640",
        calcSavings: "R$ 4.980",
        calcRationale: "<strong>Por que 32s de atendimento?</strong> Vitrine com fotos grandes que despertam desejo imediato. A escolha de caixas de presente e doces finos flui sem atrito até o WhatsApp.",
        screenshotMobile: "assets/screenshots/fafa_mobile.jpg",
        pillars: [
            {
                icon: "sparkles",
                title: "Design Editorial & Apelo Gastronômico",
                desc: "Tipografia clássica e fotografia nítida destacando camadas, recheios e acabamentos artesanais para despertar desejo antes do clique."
            },
            {
                icon: "gift",
                title: "Seleção por Fatias ou Caixas de Presente",
                desc: "Botões de escolha rápida entre porção individual, torta inteira ou montagem de caixas para presente sem formulários confusos."
            },
            {
                icon: "calendar-clock",
                title: "Agendamento & Dedicatória no WhatsApp",
                desc: "Ao finalizar, o cliente já envia a data desejada para entrega ou retirada no balcão e a mensagem personalizada do cartão de presente."
            }
        ]
    },
    hamburgueria: {
        title: "Burger Shop & Grelhados Artesanais",
        niche: "HAMBURGUERIA ARTESANAL & SMASH",
        domain: "burgershopartesanal.com.br",
        desc: "Cardápio aberto e dinâmico feito para noites de alto giro. O cliente escolhe smash ou burger artesanal, ponto da carne e adicionais sem modais pesados, despachando a comanda mastigada pro chapeiro.",
        orders: "+460",
        savings: "R$ 6.420",
        speed: "26s",
        ticket: "R$ 65,00",
        calcOrders: "+460 pedidos",
        calcTicket: "R$ 65,00",
        calcRevenue: "R$ 29.900",
        calcSavings: "R$ 6.420",
        calcRationale: "<strong>Por que 26s de atendimento?</strong> Montagem com ponto da carne, queijo e adicionais no fluxo rápido. A comanda cai mastigada no WhatsApp sem erro de preparo na chapa.",
        screenshotMobile: "assets/screenshots/hamburgueria_mobile.jpg",
        pillars: [
            {
                icon: "flame",
                title: "Cards Abertos & Foco no Hambúrguer",
                desc: "Sem banners ocupando meia tela: o cliente já vê a foto do hambúrguer, ingredientes originais e botão de montagem rápida."
            },
            {
                icon: "layers",
                title: "Ponto da Carne & Queijo em 1 Toque",
                desc: "Opções de ponto (Ao ponto, Bem passado) e tipo de pão escolhidos direto, com adicionais de bacon e molho somando no preço na hora."
            },
            {
                icon: "trending-up",
                title: "Upsell Natural de Fritas & Bebida",
                desc: "Sugestão imediata de batata rústica e refrigerante antes de fechar a comanda, elevando o ticket médio em mais de 25%."
            }
        ]
    },
    pizzaria: {
        title: "Forneria D'guste — Pizzas no Forno a Lenha",
        niche: "FORNERIA & PIZZAS ARTESANAIS",
        domain: "forneriadguste.com.br",
        desc: "Case real D'guste: arquitetura veloz pensada para quem pede pizza. O cliente seleciona o tamanho, divide em 2 sabores (meio a meio) e adiciona borda recheada no próprio card, sem banners poluídos.",
        orders: "+390",
        savings: "R$ 5.850",
        speed: "30s",
        ticket: "R$ 78,00",
        calcOrders: "+390 pedidos",
        calcTicket: "R$ 78,00",
        calcRevenue: "R$ 30.420",
        calcSavings: "R$ 5.850",
        calcRationale: "<strong>Por que 30s de atendimento?</strong> Seleção de tamanho (P/M/G/GG) e divisão meio a meio no próprio card. A comanda chega com sabores e borda prontos para a esteira do forno.",
        screenshotMobile: "assets/screenshots/pizzaria_dguste_mobile.jpg",
        pillars: [
            {
                icon: "pie-chart",
                title: "Seletor de Tamanho & Meio a Meio no Card",
                desc: "Pills de tamanho (P, M, G, GG) no card da pizza e divisão intuitiva de 2 sabores sem exigir que o cliente recarregue a página."
            },
            {
                icon: "flame",
                title: "Bordas Recheadas com Adição Direta",
                desc: "Opção de Borda Catupiry, Cheddar ou Vulcão com o acréscimo calculado automaticamente no total do pedido antes do despacho."
            },
            {
                icon: "receipt",
                title: "Comanda Pronta para Impressão no Forno",
                desc: "Mensagem no WhatsApp formatada com tamanho, 1º sabor, 2º sabor, borda, endereço e troco prontos para impressão térmica na cozinha."
            }
        ]
    },
    pastelaria: {
        title: "Pastelaria Artesanal & Crocâncias",
        niche: "PASTELARIA ARTESANAL & TRADIÇÃO",
        domain: "pastelariatradicao.com.br",
        desc: "Operação tradicional de pastéis salgados, doces e porções. O cliente escolhe tamanhos (P, G ou Porção com 10 unidades) e recheios especiais diretamente nas pills de cada produto.",
        orders: "+360",
        savings: "R$ 4.750",
        speed: "22s",
        ticket: "R$ 52,00",
        calcOrders: "+360 pedidos",
        calcTicket: "R$ 52,00",
        calcRevenue: "R$ 18.720",
        calcSavings: "R$ 4.750",
        calcRationale: "<strong>Por que 22s de atendimento?</strong> Pills de tamanho e porção no próprio card. O cliente fecha o pedido em 2 toques com endereço pronto no WhatsApp.",
        screenshotMobile: "assets/screenshots/claem_mobile.jpg",
        pillars: [
            {
                icon: "tag",
                title: "Pills de Tamanho no Próprio Card (P, G, 10un)",
                desc: "Alternância imediata entre pastel individual P, tamanho G ou porção família de 10 mini pastéis sem modais que travam a tela."
            },
            {
                icon: "badge-check",
                title: "Divisão Clara entre Salgados, Doces & Bebidas",
                desc: "Navegação por abas horizontais permitindo adicionar pastéis de queijo, carne e doce de leite em sequência rápida."
            },
            {
                icon: "send",
                title: "Comanda Formatada sem Retrabalho no Balcão",
                desc: "O pedido chega no WhatsApp da pastelaria com sabores identificados, endereço de entrega e opção de pagamento via Pix ou cartão."
            }
        ]
    }
};

let currentCaseKey = 'bebidas';

// Inicialização após carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    initHeroTicker();
    initCaseTabs();
    initRoiSimulator();
    initMomentCards();
    initSmoothScroll();
    initSpellUIEffects();
    renderCase('bebidas');
    if (window.lucide) {
        lucide.createIcons();
    }
});

/**
 * 1. Inicializa as abas de nicho do Showroom
 */
function initCaseTabs() {
    const tabButtons = document.querySelectorAll('.case-tab');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const caseKey = btn.getAttribute('data-case');
            if (caseKey && SHOWCASE_CASES[caseKey]) {
                tabButtons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                renderCase(caseKey);
            }
        });
    });
}

/**
 * Renderiza o case selecionado nos mockups e cards
 */
function renderCase(caseKey) {
    const data = SHOWCASE_CASES[caseKey];
    if (!data) return;

    currentCaseKey = caseKey;

    // Atualiza Textos e Badges
    const badgeEl = document.getElementById('case-niche-badge');
    const domainTagEl = document.getElementById('case-domain-tag');
    const titleEl = document.getElementById('case-intel-title');
    const descEl = document.getElementById('case-intel-desc');
    const speedEl = document.getElementById('metric-speed');

    const phoneUrlEl = document.getElementById('phone-case-url');
    const deskUrlEl = document.getElementById('desktop-case-url');

    if (badgeEl) badgeEl.textContent = data.niche;
    if (domainTagEl) domainTagEl.textContent = data.domain;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (speedEl) speedEl.textContent = data.speed;

    if (phoneUrlEl) phoneUrlEl.textContent = data.domain;
    if (deskUrlEl) deskUrlEl.textContent = `https://${data.domain}`;

    // Atualiza Pilares de Experiência e Diferenciais de Interface (Design, Vitrine, Carrinho)
    const pillarsContainer = document.getElementById('case-pillars-container');
    if (pillarsContainer && Array.isArray(data.pillars)) {
        pillarsContainer.innerHTML = data.pillars.map(p => `
            <div class="pillar-item">
                <div class="pillar-icon"><i data-lucide="${p.icon}"></i></div>
                <div class="pillar-content">
                    <strong>${p.title}</strong>
                    <p>${p.desc}</p>
                </div>
            </div>
        `).join('');
    }

    // Atualiza Imagens dos Screenshots
    const imgMobile = document.getElementById('img-case-mobile');

    if (imgMobile) {
        imgMobile.src = data.screenshotMobile;
        const phoneViewport = document.getElementById('phone-case-scroll-viewport');
        if (phoneViewport) phoneViewport.scrollTop = 0;
    }

    if (window.lucide) lucide.createIcons();
}

/**
 * 2. Visualização exclusiva Mobile-First
 */
window.setShowcaseDevice = function (mode) {
    // Modo Mobile exclusivo conforme diretriz de produto
};

/**
 * 3. Simulador de Impacto Financeiro (Faturamento Total Delivery × % Migrado)
 */
function initRoiSimulator() {
    const revenueRange = document.getElementById('sim-revenue-range');
    const migrationRange = document.getElementById('sim-migration-range');

    const revenueDisplay = document.getElementById('sim-revenue-display');
    const migrationDisplay = document.getElementById('sim-migration-display');

    const monthlyCalcEl = document.getElementById('result-monthly-calc');
    const annualCalcEl = document.getElementById('result-annual-calc');
    const scenarioNameEl = document.getElementById('sim-scenario-name');
    const ctaBtn = document.getElementById('sim-cta-whatsapp-btn');
    const momentCards = document.querySelectorAll('.compact-moment-card');

    function calculate() {
        if (!revenueRange || !migrationRange) return;

        const revenue = parseFloat(revenueRange.value) || 50000;
        const migrationPercent = parseFloat(migrationRange.value) || 30;

        // Fórmula no Front-End:
        // Economia Mensal = Faturamento * (% Migrado) * 0.23
        // Economia Anual = Economia Mensal * 12
        const monthlySavings = revenue * (migrationPercent / 100) * 0.23;
        const annualSavings = monthlySavings * 12;

        if (revenueDisplay) {
            revenueDisplay.textContent = formatCurrency(revenue);
        }

        if (migrationDisplay) {
            migrationDisplay.textContent = `${migrationPercent}%`;
        }

        if (monthlyCalcEl) {
            monthlyCalcEl.textContent = formatCurrency(Math.round(monthlySavings));
        }

        if (annualCalcEl) {
            annualCalcEl.textContent = formatCurrency(Math.round(annualSavings));
        }

        // Atualiza o indicador de cenário sincronizado
        if (scenarioNameEl) {
            if (revenue <= 25000) {
                scenarioNameEl.innerHTML = 'Cenário: <strong>Pequena Operação (~R$ 20k)</strong>';
            } else if (revenue >= 75000) {
                scenarioNameEl.innerHTML = 'Cenário: <strong>Operação Consolidada (~R$ 100k)</strong>';
            } else {
                scenarioNameEl.innerHTML = 'Cenário: <strong>Operação Média (~R$ 50k)</strong>';
            }
        }

        // Sincroniza o destaque visual dos cards da esquerda quando a régua é movida
        if (momentCards.length === 3) {
            let targetIdx = 1;
            if (revenue <= 25000) targetIdx = 0;
            else if (revenue >= 75000) targetIdx = 2;
            else targetIdx = 1;

            momentCards.forEach((c, idx) => {
                const isActive = (idx === targetIdx);
                c.classList.toggle('compact-moment-active', isActive);
                c.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
        }

        // Atualiza a mensagem personalizada do WhatsApp no botão do simulador
        if (ctaBtn) {
            const formattedRev = formatCurrency(revenue);
            const formattedSav = formatCurrency(Math.round(monthlySavings));
            const msg = encodeURIComponent(`Olá Jefferson! Simulei meu delivery no Onira.fly com faturamento de ${formattedRev} e ${migrationPercent}% no canal próprio. Quero garantir os ${formattedSav}/mês de margem limpa no meu caixa!`);
            ctaBtn.href = `https://wa.me/5554996862169?text=${msg}`;
        }
    }

    if (revenueRange) revenueRange.addEventListener('input', calculate);
    if (migrationRange) migrationRange.addEventListener('input', calculate);

    calculate();
}

function formatCurrency(val) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 0
    }).format(val);
}

function formatNumber(val) {
    return new Intl.NumberFormat('pt-BR', {
        maximumFractionDigits: 0
    }).format(val);
}

/**
 * 4. Navegação Suave
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==========================================================================
   HERO TICKER AUTOMÁTICO — ALTERNA MODELOS SUAVEMENTE
   ========================================================================== */

function initHeroTicker() {
    const urlEl = document.getElementById('hero-browser-url');
    const badgeEl = document.getElementById('hero-ticker-badge');
    const imgEl = document.getElementById('hero-phone-case-img');
    const viewportEl = document.getElementById('hero-phone-scroll-viewport');

    const casesList = [
        { key: 'bebidas', domain: 'adegabebidasexpress.com.br', badge: '🍷 Adega Express • Canal Próprio', img: 'assets/screenshots/montecristo_mobile.jpg' },
        { key: 'delicatessen', domain: 'delicatessenedocesnobres.com.br', badge: '🥐 Pâtisserie Fina • Canal Próprio', img: 'assets/screenshots/fafa_mobile.jpg' },
        { key: 'hamburgueria', domain: 'burgershopartesanal.com.br', badge: '🍔 Burger Shop • Canal Próprio', img: 'assets/screenshots/hamburgueria_mobile.jpg' },
        { key: 'pizzaria', domain: 'forneriadguste.com.br', badge: '🍕 Forneria D\'guste • Canal Próprio', img: 'assets/screenshots/pizzaria_dguste_mobile.jpg' },
        { key: 'pastelaria', domain: 'pastelariatradicao.com.br', badge: '🥟 Pastelaria Artesanal • Canal Próprio', img: 'assets/screenshots/claem_mobile.jpg' }
    ];

    let currentIdx = 0;
    if (!imgEl) return;

    setInterval(() => {
        currentIdx = (currentIdx + 1) % casesList.length;
        const item = casesList[currentIdx];

        imgEl.style.opacity = '0.35';
        imgEl.style.transition = 'opacity 0.35s ease';

        setTimeout(() => {
            imgEl.src = item.img;
            imgEl.alt = `Canal Próprio - ${item.badge}`;
            if (urlEl) urlEl.textContent = item.domain;
            if (badgeEl) badgeEl.textContent = item.badge;
            if (viewportEl) viewportEl.scrollTop = 0;
            imgEl.style.opacity = '1';
        }, 350);
    }, 3200);
}

/* ==========================================================================
   CARDS DE ESTÁGIO DA OPERAÇÃO (SELEÇÃO INTERATIVA + SINCRONIA COM O SIMULADOR)
   ========================================================================== */
function initMomentCards() {
    const momentCards = document.querySelectorAll('.compact-moment-card');
    const revenueRange = document.getElementById('sim-revenue-range');
    const migrationRange = document.getElementById('sim-migration-range');

    if (!momentCards.length) return;

    momentCards.forEach((card, index) => {
        card.style.cursor = 'pointer';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        card.addEventListener('click', () => {
            momentCards.forEach(c => c.classList.remove('compact-moment-active'));
            card.classList.add('compact-moment-active');

            if (revenueRange && migrationRange) {
                if (index === 0) {
                    // Pequena Operação: ~20k, 25%
                    revenueRange.value = 20000;
                    migrationRange.value = 25;
                } else if (index === 1) {
                    // Operação Média: ~50k, 35%
                    revenueRange.value = 50000;
                    migrationRange.value = 35;
                } else if (index === 2) {
                    // Operação Consolidada: ~100k, 50%
                    revenueRange.value = 100000;
                    migrationRange.value = 50;
                }

                // Dispara o evento de input para atualizar o simulador visualmente
                revenueRange.dispatchEvent(new Event('input'));
                migrationRange.dispatchEvent(new Event('input'));
            }
        });

        // Suporte a teclado
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
}

/* ==========================================================================
   SPELL UI EFFECTS INITIALIZER (BLUR-REVEAL & HIGHLIGHTED-TEXT OBSERVER)
   ========================================================================== */
function initSpellUIEffects() {
    const blurRevealEl = document.getElementById('thesis-blur-reveal');
    if (blurRevealEl) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('spell-revealed');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -40px 0px'
            });
            observer.observe(blurRevealEl);
        } else {
            blurRevealEl.classList.add('spell-revealed');
        }
    }
}


