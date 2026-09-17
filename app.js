/* ==========================================================================
   IOSHI JAPANESE FOOD — Onira.fly Engine (Dark Glassmorphism Edition)
   Catálogo interativo via cardapio.json + Modal de Detalhes dos Combos
   Checkout WhatsApp Direto Sem Taxas • WhatsApp Oficial: +55 54 3533-5556
   ========================================================================== */

const CLIENT_CONFIG = {
    name: 'Ioshi Japanese Food',
    whatsappNumber: '555435335556',
    address: 'Av. Júlio de Castilhos, 2970 - São Pelegrino, Caxias do Sul - RS',
};

let MENU_DATA = [];
let CATEGORIES = [];
let currentCategory = 'todos';
let searchTerm = '';
let cart = [];
let fulfillmentType = 'delivery';
let selectedPayment = 'Pix';

// Estado do Modal de Detalhes
let activeModalProduct = null;
let modalQuantity = 1;

const BRL = (v) => `R$ ${v.toFixed(2).replace('.', ',')}`;
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const res = await fetch('cardapio.json');
        const data = await res.json();
        MENU_DATA = data.products || [];
        CATEGORIES = data.categories || [];
    } catch (err) {
        console.error('Falha ao carregar cardápio:', err);
        showToast('⚠️ Não foi possível carregar o cardápio. Recarregue a página.');
        return;
    }
    renderCategoryPills();
    renderMenu();
    setupMenuSearch();
    setupCartDrawerListeners();
    setupKeyboardListeners();
    updateCartUI();
    if (window.lucide) lucide.createIcons();
});

/* ---------- Catálogo & Filtros ---------- */

function renderCategoryPills() {
    const box = document.getElementById('category-filters');
    if (!box) return;
    const all = [{ id: 'todos', name: 'Todos' }, ...CATEGORIES];
    box.innerHTML = all.map((c) => `
        <button type="button" class="filter-btn ${c.id === currentCategory ? 'active' : ''}" data-category="${c.id}">
            ${esc(c.name)}
        </button>
    `).join('');
    box.querySelectorAll('.filter-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            box.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category || 'todos';
            renderMenu();
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });
}

function setupMenuSearch() {
    const input = document.getElementById('menu-search');
    if (!input) return;
    input.addEventListener('input', () => {
        searchTerm = input.value || '';
        renderMenu();
    });
}

function renderMenu() {
    const grid = document.getElementById('menu-grid');
    if (!grid) return;
    const term = searchTerm.trim().toLowerCase();
    const list = MENU_DATA.filter((item) => {
        if (currentCategory !== 'todos' && item.category !== currentCategory) return false;
        if (!term) return true;
        return `${item.name} ${item.description} ${(item.items_breakdown || []).join(' ')}`.toLowerCase().includes(term);
    });

    if (list.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:56px 20px; color:var(--text-muted);">
                <p style="font-weight:800; color:#FFFFFF; margin-bottom:8px; font-size:1.1rem;">Nenhum item encontrado para "${esc(searchTerm.trim())}".</p>
                <span style="font-size:0.9rem;">Tente buscar por combo, poke, hot, sashimi ou brownie.</span>
            </div>`;
        return;
    }

    grid.innerHTML = list.map((item) => {
        const isSimpleItem = item.category === 'bebidas' || (!item.options && (!item.items_breakdown || item.items_breakdown.length <= 1) && !item.has_options);
        return `
        <div class="menu-card" data-id="${item.id}" onclick="openProductModal('${item.id}')" role="button" tabindex="0" aria-label="Ver detalhes de ${esc(item.name)}">
            <div class="card-img-box">
                <img src="${item.image}" alt="${esc(item.name)}" class="card-img" loading="lazy" onerror="this.onerror=null;this.src='assets/tabua.webp'">
                <div class="card-img-gradient"></div>
                ${item.badge ? `<span class="card-badge">${esc(item.badge)}</span>` : ''}
                ${item.pieces ? `<span class="card-pieces-badge">${esc(item.pieces)}</span>` : ''}
                <div class="card-rating"><i data-lucide="star" style="width:13px; height:13px; fill:#FFC107; color:#FFC107;"></i> ${item.rating || '5.0'}</div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${esc(item.name)}</h3>
                <p class="card-desc">${esc(item.description)}</p>
                <div class="card-interactive-hint">
                    ${isSimpleItem 
                        ? `<i data-lucide="zap" style="width:13px; height:13px; color:var(--accent);"></i> Adição rápida em 1 clique` 
                        : `<i data-lucide="info" style="width:13px; height:13px;"></i> Ver composição e detalhes`}
                </div>
                <div class="card-bottom">
                    <div class="card-price">
                        <span class="price-label">Valor:</span>
                        <div class="price-value">${BRL(item.price)}</div>
                    </div>
                    ${isSimpleItem 
                        ? `<button type="button" class="btn-card-action" onclick="event.stopPropagation(); addDirectToCart('${item.id}', event)" aria-label="Adicionar ${esc(item.name)} direto ao pedido">
                            <i data-lucide="plus" style="width:14px; height:14px;"></i> Adicionar
                        </button>`
                        : `<button type="button" class="btn-card-action" onclick="event.stopPropagation(); openProductModal('${item.id}')" aria-label="Ver opções de ${esc(item.name)}">
                            <i data-lucide="sliders-horizontal" style="width:14px; height:14px;"></i> Opções
                        </button>`}
                </div>
            </div>
        </div>
    `;}).join('');
    if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   MODAL DE DETALHES DO PRODUTO (INTERATIVO)
   ========================================================================== */

function openProductModal(itemId) {
    const item = MENU_DATA.find((i) => i.id === itemId);
    if (!item) return;

    activeModalProduct = item;
    modalQuantity = 1;

    const overlay = document.getElementById('product-modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const modalTags = document.getElementById('modal-tag-group');
    const breakdownBox = document.getElementById('modal-breakdown-box');
    const breakdownList = document.getElementById('modal-breakdown-list');
    const notesInput = document.getElementById('modal-item-notes');
    const qtyVal = document.getElementById('modal-qty-val');

    if (modalImg) modalImg.src = item.image || 'assets/tabua.webp';
    if (modalTitle) modalTitle.textContent = item.name;
    if (modalDesc) modalDesc.textContent = item.description;
    if (notesInput) notesInput.value = '';
    if (qtyVal) qtyVal.textContent = '1';

    // Tags de Metadados
    if (modalTags) {
        let tagsHtml = '';
        if (item.category_name) tagsHtml += `<span class="modal-tag">${esc(item.category_name)}</span>`;
        if (item.pieces) tagsHtml += `<span class="modal-tag accent">🍣 ${esc(item.pieces)}</span>`;
        if (item.serves) tagsHtml += `<span class="modal-tag">👥 ${esc(item.serves)}</span>`;
        modalTags.innerHTML = tagsHtml;
    }

    // Lista de Itens do Combo Legíveis
    const breakdown = item.items_breakdown || [];
    if (breakdown.length > 0 && breakdownBox && breakdownList) {
        breakdownBox.style.display = 'block';
        breakdownList.innerHTML = breakdown.map((b) => `
            <li class="breakdown-item">
                <i data-lucide="check-circle-2"></i>
                <span>${esc(b)}</span>
            </li>
        `).join('');
    } else if (breakdownBox) {
        breakdownBox.style.display = 'none';
    }

    updateModalTotal();

    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window.lucide) lucide.createIcons();
}
window.openProductModal = openProductModal;

function closeProductModal() {
    const overlay = document.getElementById('product-modal-overlay');
    if (overlay) overlay.classList.remove('open');
    activeModalProduct = null;
    document.body.style.overflow = '';
}
window.closeProductModal = closeProductModal;

function handleModalBackdropClick(e) {
    if (e.target.id === 'product-modal-overlay') {
        closeProductModal();
    }
}
window.handleModalBackdropClick = handleModalBackdropClick;

function adjustModalQty(delta) {
    modalQuantity = Math.max(1, modalQuantity + delta);
    const qtyVal = document.getElementById('modal-qty-val');
    if (qtyVal) qtyVal.textContent = modalQuantity;
    updateModalTotal();
}
window.adjustModalQty = adjustModalQty;

function updateModalTotal() {
    if (!activeModalProduct) return;
    const total = activeModalProduct.price * modalQuantity;
    const priceEl = document.getElementById('modal-price');
    const labelEl = document.getElementById('modal-btn-label');
    if (priceEl) priceEl.textContent = BRL(total);
    if (labelEl) labelEl.textContent = `Adicionar ao Pedido • ${BRL(total)}`;
}

function confirmModalAddToCart() {
    if (!activeModalProduct) return;
    const notesInput = document.getElementById('modal-item-notes');
    const notes = (notesInput && notesInput.value.trim()) || '';

    // Se houver notas ou quantidade, adiciona ao carrinho
    const existing = cart.find((c) => c.id === activeModalProduct.id && c.notes === notes);
    if (existing) {
        existing.quantity += modalQuantity;
    } else {
        cart.push({
            id: activeModalProduct.id,
            title: activeModalProduct.name,
            price: activeModalProduct.price,
            quantity: modalQuantity,
            notes: notes
        });
    }

    const addedName = activeModalProduct.name;
    const addedQty = modalQuantity;

    closeProductModal();
    updateCartUI();
    openCart();
    showToast(`🍣 <strong>${addedQty}x ${esc(addedName)}</strong> adicionado ao pedido!`);
}
window.confirmModalAddToCart = confirmModalAddToCart;

function addDirectToCart(itemId, e) {
    if (e && e.stopPropagation) e.stopPropagation();
    const item = MENU_DATA.find((i) => i.id === itemId);
    if (!item) return;

    const existing = cart.find((c) => c.id === item.id && !c.notes);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            title: item.name,
            price: item.price,
            quantity: 1,
            notes: ''
        });
    }
    updateCartUI();
    showToast(`⚡ <strong>1x ${esc(item.name)}</strong> adicionado ao carrinho!`);
}
window.addDirectToCart = addDirectToCart;

/* ---------- Carrinho Unificado Dark ---------- */

function addToCart(itemId) {
    openProductModal(itemId);
}
window.addToCart = addToCart;

function updateItemNotes(index, val) {
    if (cart[index]) cart[index].notes = val;
}
window.updateItemNotes = updateItemNotes;

function changeQuantity(index, delta) {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    updateCartUI();
}
window.changeQuantity = changeQuantity;

// Limpeza de pedido com duplo clique / confirmação visual (SEM window.alert)
let clearArmed = false;
let clearTimer = null;
function clearCart() {
    if (cart.length === 0) return;
    const headerBtn = document.getElementById('cart-clear-header');
    const drawerBtn = document.getElementById('cart-clear-drawer');
    if (!clearArmed) {
        clearArmed = true;
        if (headerBtn) headerBtn.style.color = '#EF4444';
        if (drawerBtn) drawerBtn.classList.add('armed');
        showToast('⚠️ Clique novamente na lixeira para confirmar a limpeza do pedido.');
        clearTimer = setTimeout(() => {
            clearArmed = false;
            if (headerBtn) headerBtn.style.color = '';
            if (drawerBtn) drawerBtn.classList.remove('armed');
        }, 3500);
        return;
    }
    clearTimeout(clearTimer);
    clearArmed = false;
    cart = [];
    if (headerBtn) headerBtn.style.color = '';
    if (drawerBtn) drawerBtn.classList.remove('armed');
    updateCartUI();
    showToast('🗑️ Pedido esvaziado.');
}
window.clearCart = clearCart;

function setFulfillment(type) {
    fulfillmentType = type;
    document.querySelectorAll('.f-btn').forEach((b) => b.classList.remove('active'));
    const active = document.getElementById(`f-${type}`);
    if (active) active.classList.add('active');
    const addrGroup = document.getElementById('address-group');
    if (addrGroup) {
        addrGroup.style.display = type === 'delivery' ? 'block' : 'none';
    }
    updateCartUI();
}
window.setFulfillment = setFulfillment;

function setPayment(method) {
    selectedPayment = method;
    document.querySelectorAll('.pay-btn').forEach((b) => b.classList.remove('active'));
    const btn = document.getElementById(`pay-${method.toLowerCase()}`);
    if (btn) btn.classList.add('active');
}
window.setPayment = setPayment;

function updateCartUI() {
    const count = cart.reduce((acc, i) => acc + i.quantity, 0);
    const subtotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const countHeader = document.getElementById('cart-count');
    const totalHeader = document.getElementById('cart-total-header');
    const clearHeader = document.getElementById('cart-clear-header');
    const drawerClear = document.getElementById('cart-clear-drawer');

    if (countHeader) countHeader.textContent = count;
    if (totalHeader) totalHeader.textContent = BRL(subtotal);

    if (clearHeader) {
        clearHeader.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (drawerClear) {
        drawerClear.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    const itemsContainer = document.getElementById('cart-items-container');
    const summaryBox = document.getElementById('cart-summary-box');
    const checkoutBtn = document.getElementById('btn-checkout');

    if (!itemsContainer) return;

    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-bag"></i>
                <p style="font-weight:700; margin-bottom:4px; color:#F4F4F5;">Seu pedido está vazio</p>
                <span style="font-size:0.84rem; color:var(--text-dim);">Escolha seus combinados e faça seu pedido.</span>
            </div>`;
        if (summaryBox) summaryBox.style.display = 'none';
        if (checkoutBtn) checkoutBtn.style.display = 'none';
        if (window.lucide) lucide.createIcons();
        return;
    }

    if (summaryBox) summaryBox.style.display = 'block';
    if (checkoutBtn) checkoutBtn.style.display = 'flex';

    itemsContainer.innerHTML = `
        <div class="cart-items-list">
            ${cart.map((item, idx) => `
                <div class="cart-item">
                    <div class="cart-item-top">
                        <span class="cart-item-title">${esc(item.title)}</span>
                        <span class="cart-item-price">${BRL(item.price * item.quantity)}</span>
                    </div>
                    <div class="cart-item-controls">
                        <div class="qty-control">
                            <button type="button" class="qty-btn" onclick="changeQuantity(${idx}, -1)" aria-label="Diminuir">-</button>
                            <span class="qty-val">${item.quantity}</span>
                            <button type="button" class="qty-btn" onclick="changeQuantity(${idx}, 1)" aria-label="Aumentar">+</button>
                        </div>
                        <span style="font-size:0.75rem; color:var(--text-muted);">${BRL(item.price)} un</span>
                    </div>
                    <input type="text" class="cart-item-notes" placeholder="Observações (ex: sem cebolinha, sem wasabi...)" value="${esc(item.notes)}" onchange="updateItemNotes(${idx}, this.value)">
                </div>
            `).join('')}
        </div>`;

    const subtotalEl = document.getElementById('summary-subtotal');
    const totalEl = document.getElementById('summary-total');
    if (subtotalEl) subtotalEl.textContent = BRL(subtotal);
    if (totalEl) totalEl.textContent = BRL(subtotal);

    if (window.lucide) lucide.createIcons();
}

function openCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.add('open');
    if (overlay) overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}
window.openCart = openCart;

function closeCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer) drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
    document.body.style.overflow = '';
}
window.closeCart = closeCart;

function setupCartDrawerListeners() {
    const overlay = document.getElementById('cart-overlay');
    if (overlay) overlay.addEventListener('click', closeCart);
}

function setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeProductModal();
            closeCart();
        }
    });
}

/* ---------- Checkout WhatsApp Operacional (Padrão Onira.fly) ---------- */

function checkoutWhatsApp() {
    if (cart.length === 0) {
        showToast('⚠️ Seu pedido está vazio!');
        return;
    }

    const nameInput = document.getElementById('customer-name');
    const customerName = (nameInput && nameInput.value.trim()) || 'Cliente';

    const addressInput = document.getElementById('customer-address');
    let address = (addressInput && addressInput.value.trim()) || '';

    if (fulfillmentType === 'delivery' && !address) {
        address = 'A combinar no WhatsApp';
    }

    const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

    let msg = `_pedido via site by Onira.fly_\n\n`;
    msg += `*Solicitação de ${fulfillmentType === 'delivery' ? 'Tele-Entrega' : 'Retirada no Balcão'}*\n\n`;

    cart.forEach((item) => {
        msg += `*${item.quantity}x* ${item.title}\n`;
        if (item.notes && item.notes.trim()) {
            msg += `_Obs: ${item.notes.trim()}_\n`;
        }
        msg += `*${BRL(item.price * item.quantity)}*\n\n`;
    });

    msg += `*Subtotal:* ${BRL(total)}\n`;
    if (fulfillmentType === 'delivery') {
        msg += `*Taxa de entrega:* A calcular pela localização\n`;
    }
    msg += `*Total estimado:* ${BRL(total)}\n\n`;

    msg += `*${customerName}*\n`;
    if (fulfillmentType === 'delivery') {
        msg += `📍 ${address}\n`;
    } else {
        msg += `🏢 Retirada: Av. Júlio de Castilhos, 2970 - São Pelegrino\n`;
    }
    msg += `💳 Pagamento em ${selectedPayment}\n\n`;
    msg += `_Enviado pelo canal oficial Ioshi Japanese Food_`;

    const encoded = encodeURIComponent(msg);
    const url = `https://api.whatsapp.com/send?phone=${CLIENT_CONFIG.whatsappNumber}&text=${encoded}`;
    window.open(url, '_blank');
}
window.checkoutWhatsApp = checkoutWhatsApp;

/* ---------- Toast ---------- */

let toastTimer = null;
function showToast(html) {
    let box = document.getElementById('toast-box');
    if (!box) {
        box = document.createElement('div');
        box.id = 'toast-box';
        box.className = 'toast-box';
        document.body.appendChild(box);
    }
    box.innerHTML = html;
    box.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        box.classList.remove('show');
    }, 3200);
}
