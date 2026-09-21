/**
 * Onira Labs — Proposal Radar & Telemetry Tracker (v2.0)
 * Rastreia aberturas de propostas, seções visualizadas e tempo na tabela de preços.
 * Com Auto-Imunização de Staff (Diferencia acessos internos da equipe vs clientes reais).
 */

(function () {
    const config = window.ONIRA_PROPOSAL_CONFIG || {
        clientSlug: window.location.pathname.split('/').filter(Boolean).pop()?.replace('.html', '') || 'cliente-demo',
        clientName: document.title || 'Cliente Onira',
        webhookUrl: '', // URL do Webhook legado (CallMeBot / Telegram / Endpoint)
        supabaseUrl: window.ONIRA_TELEMETRY_SUPABASE_URL || '', // Base do projeto Supabase (https://xyz.supabase.co)
        supabaseAnonKey: window.ONIRA_TELEMETRY_SUPABASE_KEY || '', // ANON key (pública). NUNCA service_role.
        sendInterval: 15000
    };

    // =========================================================================
    // 1. AUTO-DETECÇÃO DE STAFF (JEFFERSON / DIRETORIA ONIRA)
    // =========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const hasStaffParam = urlParams.has('staff') || urlParams.has('admin') || urlParams.has('preview') || window.location.hash === '#staff';
    const isStoredStaffDevice = localStorage.getItem('onira_staff_device') === 'true';
    const cameFromCockpit = document.referrer && (document.referrer.includes('cockpit') || document.referrer.includes(':8080'));

    const isStaff = hasStaffParam || isStoredStaffDevice || cameFromCockpit;

    // Se veio do Cockpit ou usou parâmetro de equipe, marca o navegador permanentemente
    if (hasStaffParam || cameFromCockpit) {
        localStorage.setItem('onira_staff_device', 'true');
    }

    // =========================================================================
    // 2. CONTADOR DE ABERTURAS (ISOLADO DE ACESSOS DA EQUIPE)
    // =========================================================================
    const storageKey = `onira_prop_views_${config.clientSlug}`;
    let viewCount = parseInt(localStorage.getItem(storageKey) || '0', 10);

    if (!isStaff) {
        // Apenas acessos de clientes reais incrementam o contador comercial
        viewCount += 1;
        localStorage.setItem(storageKey, viewCount.toString());
    }

    const sessionData = {
        clientSlug: config.clientSlug,
        clientName: config.clientName,
        viewCount: viewCount,
        isStaff: isStaff,
        startTime: new Date().toISOString(),
        sectionsViewed: new Set(),
        timeSpentOnPricesSec: 0,
        device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        lastActiveSection: 'hero'
    };

    if (isStaff) {
        console.log(`%c[Onira Radar] 👔 Acesso Interno (Staff Onira). Alertas comerciais desativados para este dispositivo.`, 'background:#181826; color:#F59E0B; padding:4px 8px; border-radius:4px; font-weight:bold;');
    } else {
        console.log(`[Onira Radar] 📡 Sessão de Prospect Real: ${config.clientName} (Abertura nº ${viewCount} • ${sessionData.device})`);
    }

    // =========================================================================
    // 3. ENVIO DE TELEMETRIA (SILENCIADO SE FOR STAFF)
    // =========================================================================
    function sendTelemetryPing(eventType, extraData = {}) {
        // Se for acesso do Jefferson/Staff, NÃO dispara alerta comercial nem notificação no WhatsApp
        if (isStaff) {
            return;
        }

        const payload = {
            event: eventType,
            clientSlug: sessionData.clientSlug,
            clientName: sessionData.clientName,
            viewCount: sessionData.viewCount,
            device: sessionData.device,
            sectionsViewed: Array.from(sessionData.sectionsViewed),
            timeOnPrices: `${sessionData.timeSpentOnPricesSec}s`,
            timestamp: new Date().toLocaleTimeString('pt-BR'),
            ...extraData
        };

        if (config.webhookUrl) {
            try {
                navigator.sendBeacon 
                    ? navigator.sendBeacon(config.webhookUrl, JSON.stringify(payload))
                    : fetch(config.webhookUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload),
                        keepalive: true
                    }).catch(() => {});
            } catch (e) {}
        }

        // Histórico real: insert direto no Supabase (tabela proposal_views).
        // Staff nunca chega aqui (retorno antecipado acima). Falha de rede = silenciosa,
        // o contador local em localStorage segue como fallback offline.
        sendToSupabase(payload);
    }

    function sendToSupabase(payload) {
        const sbUrl = (config.supabaseUrl || window.ONIRA_TELEMETRY_SUPABASE_URL || '').replace(/\/$/, '');
        const sbKey = config.supabaseAnonKey || window.ONIRA_TELEMETRY_SUPABASE_KEY || '';
        if (!sbUrl || !sbKey) return;

        try {
            fetch(`${sbUrl}/rest/v1/proposal_views`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': sbKey,
                    'Authorization': `Bearer ${sbKey}`,
                    'Prefer': 'return=minimal'
                },
                body: JSON.stringify({
                    client_slug: payload.clientSlug,
                    client_name: payload.clientName,
                    event: payload.event,
                    view_count: payload.viewCount,
                    device: payload.device,
                    sections: payload.sectionsViewed || [],
                    time_on_prices: payload.timeOnPrices || null
                }),
                keepalive: true
            }).catch(() => {});
        } catch (e) {}
    }

    // Dispara apenas se for cliente real
    sendTelemetryPing('proposal_opened');

    // =========================================================================
    // 4. OBSERVER DE SEÇÕES & FEEDBACK VISUAL DISCRETO
    // =========================================================================
    document.addEventListener('DOMContentLoaded', () => {
        // Se for Staff, exibe badge discreta fixa no rodapé para tranquilidade do Jefferson
        if (isStaff) {
            const staffBadge = document.createElement('div');
            staffBadge.id = 'onira-staff-indicator';
            staffBadge.innerHTML = '👔 Modo Equipe Onira Ativo (Alertas Silenciados)';
            staffBadge.style.cssText = 'position:fixed; bottom:12px; left:12px; z-index:99999; background:rgba(9,9,13,0.92); color:#F59E0B; border:1px solid rgba(245,158,11,0.4); border-radius:20px; padding:6px 14px; font-size:11px; font-family:sans-serif; font-weight:700; backdrop-filter:blur(8px); box-shadow:0 4px 15px rgba(0,0,0,0.5); pointer-events:none;';
            document.body.appendChild(staffBadge);
        }

        const sectionsToTrack = document.querySelectorAll('section[id], div[id], [data-track-section]');
        if (!sectionsToTrack.length || !window.IntersectionObserver) return;

        let priceTimer = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const secId = entry.target.id || entry.target.getAttribute('data-track-section');
                    sessionData.sectionsViewed.add(secId);
                    sessionData.lastActiveSection = secId;

                    // Seção de Preços / Investimento
                    if (secId.includes('investimento') || secId.includes('preco') || secId.includes('tabela')) {
                        if (!priceTimer) {
                            sendTelemetryPing('viewing_prices_start');
                            priceTimer = setInterval(() => {
                                sessionData.timeSpentOnPricesSec += 5;
                            }, 5000);
                        }
                    } else if (priceTimer) {
                        clearInterval(priceTimer);
                        priceTimer = null;
                        sendTelemetryPing('viewing_prices_leave', { durationPrices: `${sessionData.timeSpentOnPricesSec}s` });
                    }
                }
            });
        }, { threshold: 0.35 });

        sectionsToTrack.forEach((sec) => observer.observe(sec));

        // Rastrear clique no botão de WhatsApp / Fechamento
        const ctaButtons = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], .btn-aceitar, .btn-cta-proposta');
        ctaButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                sendTelemetryPing('cta_accepted_click');
            });
        });
    });

    // Enviar resumo de saída apenas se cliente real
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && !isStaff) {
            sendTelemetryPing('proposal_session_summary');
        }
    });
})();
