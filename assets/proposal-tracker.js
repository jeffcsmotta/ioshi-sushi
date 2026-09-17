/**
 * Onira Labs — Proposal Radar & Telemetry Tracker (v1.0)
 * Rastreia aberturas de propostas, seções visualizadas e tempo na tabela de preços.
 * Dispara webhooks de alerta em tempo real (Telegram / Discord / n8n / API).
 */

(function () {
    const config = window.ONIRA_PROPOSAL_CONFIG || {
        clientSlug: window.location.pathname.split('/').filter(Boolean)[0] || 'cliente-demo',
        clientName: document.title || 'Cliente Onira',
        webhookUrl: '', // URL do Webhook (Telegram/Discord/Endpoint)
        sendInterval: 15000 // Intervalo de sincronização de batimento
    };

    const storageKey = `onira_prop_views_${config.clientSlug}`;
    let viewCount = parseInt(localStorage.getItem(storageKey) || '0', 10) + 1;
    localStorage.setItem(storageKey, viewCount.toString());

    const sessionData = {
        clientSlug: config.clientSlug,
        clientName: config.clientName,
        viewCount: viewCount,
        startTime: new Date().toISOString(),
        sectionsViewed: new Set(),
        timeSpentOnPricesSec: 0,
        device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
        lastActiveSection: 'hero'
    };

    console.log(`[Onira Radar] Sessão iniciada para: ${config.clientName} (Abertura nº ${viewCount} • ${sessionData.device})`);

    // Envio de alerta
    function sendTelemetryPing(eventType, extraData = {}) {
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
    }

    // Alerta de abertura inicial
    sendTelemetryPing('proposal_opened');

    // Rastreamento de seções via IntersectionObserver
    document.addEventListener('DOMContentLoaded', () => {
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

    // Enviar status ao fechar/sair da página
    window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
            sendTelemetryPing('proposal_session_summary');
        }
    });
})();
