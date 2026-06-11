/* =========================================================
   Doces da Waldineia — produtoScript.js
   Catálogo profissional: busca, filtros, ordenação, modal,
   carrinho lateral e checkout via WhatsApp.
   Tudo injetado via JS — não precisa mexer no CSS.
   ========================================================= */

/* ---------- CONFIG ---------- */
const WHATSAPP_NUMERO = "5544999999999"; // Troque pelo número real
const MOEDA = "BRL";

/* ---------- CATÁLOGO ---------- */
const PRODUTOS = [
    {
        id: "bolo-chocolate",
        nome: "Bolo de Chocolate",
        descricao: "Massa fofinha de chocolate belga com cobertura cremosa de ganache.",
        detalhes: "Serve em média 15 fatias. Massa de chocolate belga 54% cacau, recheio cremoso e cobertura de ganache. Ideal para aniversários e comemorações.",
        preco: 65.00,
        categoria: "doce",
        unidade: "un",
        imagem: "file:///C:/Users/guilh/OneDrive/Desktop/fotos%20do%20produtos/fotos%20do%20produtos/WhatsApp%20Image%202026-06-06%20at%2019.16.16.jpeg",
        destaque: true,
        rating: 4.9
    },
    {
        id: "brigadeiro-gourmet",
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate belga 54% cacau com granulado de chocolate puro.",
        detalhes: "Encomenda mínima de 20 unidades. Chocolate belga, leite condensado premium e granulado de chocolate puro. Sabor intenso e textura sedosa.",
        preco: 70.50,
        categoria: "doce",
        unidade: "un",
        imagem: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80",
        destaque: true,
        rating: 5.0
    },
    {
        id: "Pudim",
        nome: "Pudim de Leite Condensado",
        descricao: "Pudim cremoso e saboroso, feito com leite condensado e ovos.",
        detalhes: "Pudim tradicional, feito com leite condensado e ovos. Ideal para sobremesas.",
        preco: 45.00,
        categoria: "doce",
        unidade: "un",
        imagem: "file:///C:/Users/guilh/OneDrive/Desktop/fotos%20do%20produtos/fotos%20do%20produtos/WhatsApp%20Image%202026-06-06%20at%2019.16.17%20(3).jpeg",
        destaque: false,
        rating: 4.8
    },
    {
        id: "bolo de paçoca",
        nome: "Bolo de Paçoca",
        descricao: "Massa de chocolate com recheio de paçoca e cobertura de granulado.",
        detalhes: "Encomenda mínima de 10 unidades. Massa de chocolate, recheio de paçoca e cobertura de granulado. Ideal para aniversários e comemorações.",
        preco: 25.00,
        categoria: "doce",
        unidade: "un",
        imagem: "file:///C:/Users/guilh/OneDrive/Desktop/fotos%20do%20produtos/fotos%20do%20produtos/WhatsApp%20Image%202026-06-06%20at%2019.17.29.jpeg",
        destaque: false,
        rating: 4.7
    },
    {
        id: "coxinha-gourmet",
        nome: "Coxinha Gourmet",
        descricao: "Massa de batata leve com frango desfiado e catupiry.",
        detalhes: "Encomenda mínima de 15 unidades. Massa leve de batata, recheio cremoso de frango desfiado com catupiry original. Empanada na hora.",
        preco: 8.50,
        categoria: "salgado",
        unidade: "un",
        imagem: "https://ouromineiro.com.br/wp-content/uploads/2024/09/IMG-20250123-WA0008.jpg",
        destaque: true,
        rating: 4.9
    },
    {
        id: "empada-frango",
        nome: "Empada de Frango",
        descricao: "Massa amanteigada com recheio cremoso de frango.",
        detalhes: "Encomenda mínima de 10 unidades. Massa amanteigada, frango desfiado e ervas finas.",
        preco: 6.00,
        categoria: "salgado",
        unidade: "un",
        imagem: "https://www.seara.com.br/wp-content/uploads/2025/09/empada-de-frango-portal-minha-receita.webp",
        destaque: false,
        rating: 4.6
    },
    {
        id: "pastel-queijo",
        nome: "Pastel de Queijo",
        descricao: "Massa crocante recheada com queijo mussarela derretido.",
        detalhes: "Encomenda mínima de 15 unidades. Massa crocante e fininha, recheio generoso de mussarela. Frito na hora ou entregue cru para fritar em casa.",
        preco: 7.00,
        categoria: "salgado",
        unidade: "un",
        imagem: "https://minhasreceitinhas.com.br/wp-content/uploads/2023/05/pastel-de-feira-de-queijo.jpg",
        destaque: false,
        rating: 4.7
    },
    {
        id: "quiche-alho-poro",
        nome: "Quiche de Alho-poró",
        descricao: "Massa amanteigada com creme de alho-poró e queijo gruyère.",
        detalhes: "Quiche individual ou família. Massa amanteigada, alho-poró refogado, creme de leite fresco e queijo gruyère gratinado.",
        preco: 12.00,
        categoria: "salgado",
        unidade: "un",
        imagem: "https://www.receitasnestle.com.br/sites/default/files/srh_recipes/d6a6f84f954f7f2751faba4d2a7005cb.jpg",
        destaque: false,
        rating: 4.8
    }
];


/* ============================================================
   ESTADO GLOBAL DA APLICAÇÃO
   ============================================================ */
const state = {
    filtro: 'todos',
    busca: '',
    ordem: 'destaque',
    carrinho: carregarCarrinho()
};


/* ============================================================
   UTILS
   ============================================================ */
const fmtMoeda = (v) => v.toLocaleString('pt-BR', { style: 'currency', currency: MOEDA });

function carregarCarrinho() {
    try {
        const raw = sessionStorage.getItem('waldineia_cart');
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function salvarCarrinho() {
    try {
        sessionStorage.setItem('waldineia_cart', JSON.stringify(state.carrinho));
    } catch {}
}

function getProduto(id) {
    return PRODUTOS.find(p => p.id === id);
}

function totalCarrinho() {
    return state.carrinho.reduce((acc, item) => {
        const p = getProduto(item.id);
        return p ? acc + p.preco * item.qtd : acc;
    }, 0);
}

function qtdNoCarrinho(id) {
    const item = state.carrinho.find(i => i.id === id);
    return item ? item.qtd : 0;
}

function qtdTotalItens() {
    return state.carrinho.reduce((acc, i) => acc + i.qtd, 0);
}

function adicionarAoCarrinho(id, qtd = 1) {
    const item = state.carrinho.find(i => i.id === id);
    if (item) {
        item.qtd += qtd;
    } else {
        state.carrinho.push({ id, qtd });
    }
    salvarCarrinho();
    atualizarBadgeCarrinho();
    renderizarCarrinho();
    atualizarBotoesCards();
}

function atualizarQuantidade(id, qtd) {
    const item = state.carrinho.find(i => i.id === id);
    if (!item) return;
    item.qtd = qtd;
    if (item.qtd <= 0) {
        state.carrinho = state.carrinho.filter(i => i.id !== id);
    }
    salvarCarrinho();
    atualizarBadgeCarrinho();
    renderizarCarrinho();
    atualizarBotoesCards();
}

function limparCarrinho() {
    state.carrinho = [];
    salvarCarrinho();
    atualizarBadgeCarrinho();
    renderizarCarrinho();
    atualizarBotoesCards();
}


/* ============================================================
   INJEÇÃO DE ESTILOS (via JS — não precisa tocar no CSS)
   ============================================================ */
function injetarEstilos() {
    if (document.getElementById('produtos-styles-inject')) return;

    const css = `
    .product-list { max-width: 1240px; margin: 0 auto; padding: 60px 24px 120px; }
    .product-list h1 {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: clamp(2.2rem, 5vw, 3.4rem);
        color: #2c1e16; text-align: center; margin-bottom: 12px;
        letter-spacing: 1px;
    }
    .catalogo-subtitulo {
        text-align: center; color: #6d5a4a; max-width: 620px;
        margin: 0 auto 48px; font-size: 1.05rem; line-height: 1.6;
    }

    .controles {
        display: flex; gap: 16px; flex-wrap: wrap;
        align-items: center; justify-content: space-between;
        margin-bottom: 24px; padding: 16px 20px;
        background: #fff; border-radius: 16px;
        box-shadow: 0 4px 20px rgba(60, 40, 25, 0.06);
        border: 1px solid rgba(230, 185, 129, 0.2);
    }
    .busca-wrap { position: relative; flex: 1; min-width: 240px; }
    .busca-wrap::before {
        content: "🔍"; position: absolute; left: 16px; top: 50%;
        transform: translateY(-50%); font-size: 0.95rem; opacity: 0.5;
    }
    .busca-input {
        width: 100%; padding: 12px 16px 12px 44px;
        border: 1.5px solid #e8dccc; border-radius: 12px;
        font-size: 0.95rem; font-family: inherit; color: #2c1e16;
        background: #fafafa; transition: all 0.2s; outline: none;
    }
    .busca-input:focus {
        border-color: var(--color-accent, #e6b981);
        background: #fff;
        box-shadow: 0 0 0 4px rgba(230, 185, 129, 0.15);
    }
    .ordem-wrap { display: flex; align-items: center; gap: 10px; }
    .ordem-wrap label {
        font-size: 0.85rem; color: #6d5a4a; font-weight: 500;
        white-space: nowrap;
    }
    .ordem-select {
        padding: 10px 14px; border: 1.5px solid #e8dccc;
        border-radius: 10px; background: #fafafa; color: #2c1e16;
        font-family: inherit; font-size: 0.9rem; cursor: pointer;
        transition: all 0.2s; outline: none;
    }
    .ordem-select:hover, .ordem-select:focus {
        border-color: var(--color-accent, #e6b981); background: #fff;
    }

    .filtros {
        display: flex; gap: 10px; justify-content: center;
        flex-wrap: wrap; margin-bottom: 36px;
    }
    .filtro-btn {
        padding: 10px 22px; border: 1.5px solid #e8dccc;
        border-radius: 999px; background: #fff; color: #6d5a4a;
        font-family: inherit; font-size: 0.9rem; font-weight: 600;
        letter-spacing: 0.5px; cursor: pointer; transition: all 0.25s;
        display: inline-flex; align-items: center; gap: 8px;
    }
    .filtro-btn:hover {
        border-color: var(--color-accent, #e6b981);
        color: #2c1e16; transform: translateY(-1px);
    }
    .filtro-btn.active {
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        color: #fff; border-color: transparent;
        box-shadow: 0 6px 16px rgba(230, 185, 129, 0.4);
    }
    .filtro-btn .count {
        background: rgba(255,255,255,0.25); padding: 2px 8px;
        border-radius: 999px; font-size: 0.75rem;
    }
    .filtro-btn:not(.active) .count { background: #f4ede2; color: #8b7559; }

    .products {
        display: grid; gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    }
    .product-card {
        background: #fff; border-radius: 20px; overflow: hidden;
        border: 1px solid rgba(230, 185, 129, 0.15);
        box-shadow: 0 4px 20px rgba(60, 40, 25, 0.06);
        transition: transform 0.3s cubic-bezier(.2,.7,.2,1), box-shadow 0.3s;
        display: flex; flex-direction: column; position: relative;
        animation: cardIn 0.5s cubic-bezier(.2,.7,.2,1) both;
    }
    .product-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(60, 40, 25, 0.12);
    }
    @keyframes cardIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .card-img-wrap {
        position: relative; aspect-ratio: 4/3;
        overflow: hidden; background: #f4ede2;
    }
    .card-img-wrap img {
        width: 100%; height: 100%; object-fit: cover;
        transition: transform 0.6s cubic-bezier(.2,.7,.2,1);
    }
    .product-card:hover .card-img-wrap img { transform: scale(1.08); }
    .card-tag {
        position: absolute; top: 12px; left: 12px;
        padding: 5px 12px; border-radius: 999px;
        font-size: 0.7rem; font-weight: 700;
        letter-spacing: 0.8px; text-transform: uppercase;
        backdrop-filter: blur(8px);
    }
    .card-tag.doce { background: rgba(214, 95, 138, 0.92); color: #fff; }
    .card-tag.salgado { background: rgba(176, 124, 64, 0.92); color: #fff; }
    .card-destaque {
        position: absolute; top: 12px; right: 12px;
        background: rgba(255, 255, 255, 0.95); color: #b8860b;
        padding: 5px 10px; border-radius: 999px;
        font-size: 0.7rem; font-weight: 700;
        display: flex; align-items: center; gap: 4px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .card-body {
        padding: 20px 22px 22px; display: flex;
        flex-direction: column; flex: 1;
    }
    .card-rating {
        display: flex; align-items: center; gap: 6px;
        font-size: 0.8rem; color: #8b7559; margin-bottom: 6px;
    }
    .card-rating .stars { color: #e6b981; letter-spacing: 1px; }
    .card-body h2 {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.3rem; color: #2c1e16; margin-bottom: 8px;
        line-height: 1.2;
    }
    .card-body .descricao {
        color: #6d5a4a; font-size: 0.9rem; line-height: 1.5;
        margin-bottom: 16px; flex: 1;
    }
    .card-footer {
        display: flex; justify-content: space-between;
        align-items: center; gap: 12px;
        padding-top: 16px; border-top: 1px solid #f4ede2;
    }
    .preco-wrap { display: flex; flex-direction: column; }
    .preco-wrap .preco {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.4rem; font-weight: 700; color: #2c1e16;
    }
    .preco-wrap .preco-unidade { font-size: 0.75rem; color: #8b7559; }
    .btn-add {
        padding: 10px 18px; border: none; border-radius: 12px;
        background: linear-gradient(135deg, #2c1e16, #4a3528);
        color: #fff; font-family: inherit; font-size: 0.85rem;
        font-weight: 600; letter-spacing: 0.5px; cursor: pointer;
        transition: all 0.25s; display: inline-flex;
        align-items: center; gap: 6px;
    }
    .btn-add:hover {
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(230, 185, 129, 0.4);
    }
    .btn-add.no-carrinho {
        background: linear-gradient(135deg, #5a8a4a, #4a7a3a);
    }
    .btn-add .qtd-badge {
        background: rgba(255,255,255,0.25); padding: 1px 7px;
        border-radius: 999px; font-size: 0.7rem; font-weight: 700;
    }
    .btn-detalhes {
        position: absolute; bottom: 12px; right: 12px;
        width: 38px; height: 38px; border-radius: 50%;
        border: none; background: rgba(255,255,255,0.95);
        color: #2c1e16; font-size: 1.1rem; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; transform: translateY(8px);
        transition: all 0.3s cubic-bezier(.2,.7,.2,1);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15); z-index: 2;
    }
    .card-img-wrap:hover .btn-detalhes,
    .product-card:focus-within .btn-detalhes {
        opacity: 1; transform: translateY(0);
    }
    .btn-detalhes:hover { background: #e6b981; transform: scale(1.1); }

    .sem-produtos {
        grid-column: 1 / -1; text-align: center; padding: 80px 20px;
        color: #8b7559;
    }
    .sem-produtos .icone { font-size: 3rem; margin-bottom: 12px; display: block; }
    .sem-produtos h3 {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.5rem; color: #2c1e16; margin-bottom: 8px;
    }

    .carrinho-fab {
        position: fixed; bottom: 28px; right: 28px;
        width: 60px; height: 60px; border-radius: 50%;
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        color: #2c1e16; border: none; cursor: pointer;
        box-shadow: 0 8px 24px rgba(230, 185, 129, 0.5);
        font-size: 1.5rem; z-index: 100;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.25s;
    }
    .carrinho-fab:hover { transform: scale(1.08); }
    .carrinho-fab .badge {
        position: absolute; top: -4px; right: -4px;
        background: #c9474b; color: #fff;
        min-width: 24px; height: 24px; border-radius: 999px;
        font-size: 0.75rem; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        padding: 0 6px; border: 2px solid #fff;
        animation: bump 0.4s cubic-bezier(.2,.7,.2,1);
    }
    @keyframes bump {
        0% { transform: scale(0); }
        60% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    .drawer-overlay {
        position: fixed; inset: 0; background: rgba(20, 14, 10, 0.55);
        backdrop-filter: blur(4px); z-index: 200;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
    }
    .drawer-overlay.open { opacity: 1; pointer-events: auto; }
    .drawer {
        position: fixed; top: 0; right: 0; bottom: 0;
        width: min(420px, 100%); background: #fff;
        z-index: 201; display: flex; flex-direction: column;
        transform: translateX(100%);
        transition: transform 0.35s cubic-bezier(.2,.7,.2,1);
        box-shadow: -10px 0 40px rgba(0,0,0,0.15);
    }
    .drawer.open { transform: translateX(0); }
    .drawer-header {
        padding: 22px 24px; border-bottom: 1px solid #f4ede2;
        display: flex; justify-content: space-between; align-items: center;
    }
    .drawer-header h2 {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.4rem; color: #2c1e16;
    }
    .drawer-close {
        width: 36px; height: 36px; border: none; border-radius: 50%;
        background: #f4ede2; color: #2c1e16; cursor: pointer;
        font-size: 1.1rem; transition: all 0.2s;
    }
    .drawer-close:hover { background: #e8dccc; transform: rotate(90deg); }
    .drawer-body { flex: 1; overflow-y: auto; padding: 16px 24px; }
    .drawer-empty { text-align: center; padding: 60px 20px; color: #8b7559; }
    .drawer-empty .icone {
        font-size: 3rem; display: block; margin-bottom: 12px; opacity: 0.6;
    }
    .item-carrinho {
        display: flex; gap: 14px; padding: 14px 0;
        border-bottom: 1px solid #f4ede2;
    }
    .item-carrinho:last-child { border-bottom: none; }
    .item-img {
        width: 72px; height: 72px; border-radius: 12px;
        object-fit: cover; flex-shrink: 0;
    }
    .item-info { flex: 1; min-width: 0; }
    .item-info h4 {
        font-size: 0.95rem; color: #2c1e16; margin-bottom: 4px;
        font-weight: 600;
    }
    .item-info .item-preco {
        font-size: 0.85rem; color: #8b7559; margin-bottom: 8px;
    }
    .item-info .item-preco strong { color: #2c1e16; }
    .qtd-controle {
        display: inline-flex; align-items: center;
        border: 1.5px solid #e8dccc; border-radius: 999px;
        overflow: hidden;
    }
    .qtd-controle button {
        width: 28px; height: 28px; border: none; background: transparent;
        color: #2c1e16; cursor: pointer; font-weight: 700;
        transition: background 0.2s;
    }
    .qtd-controle button:hover { background: #f4ede2; }
    .qtd-controle .qtd-valor {
        min-width: 32px; text-align: center; font-size: 0.9rem;
        font-weight: 600; color: #2c1e16;
    }
    .item-remover {
        background: none; border: none; color: #c9474b;
        cursor: pointer; font-size: 0.8rem; padding: 4px 0;
        margin-left: 8px; opacity: 0.7; transition: opacity 0.2s;
    }
    .item-remover:hover { opacity: 1; }
    .drawer-footer {
        padding: 20px 24px; border-top: 1px solid #f4ede2;
        background: #fafafa;
    }
    .drawer-total {
        display: flex; justify-content: space-between;
        align-items: baseline; margin-bottom: 16px;
    }
    .drawer-total .label { font-size: 0.9rem; color: #6d5a4a; }
    .drawer-total .valor {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.6rem; font-weight: 700; color: #2c1e16;
    }
    .btn-checkout {
        width: 100%; padding: 14px; border: none; border-radius: 12px;
        background: linear-gradient(135deg, #25D366, #1ea952);
        color: #fff; font-family: inherit; font-size: 0.95rem;
        font-weight: 700; letter-spacing: 0.5px; cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 8px;
        transition: all 0.25s;
        box-shadow: 0 6px 16px rgba(37, 211, 102, 0.35);
    }
    .btn-checkout:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45);
    }
    .btn-limpar {
        width: 100%; margin-top: 8px; padding: 10px;
        background: none; border: none; color: #8b7559;
        font-family: inherit; font-size: 0.8rem; cursor: pointer;
        transition: color 0.2s;
    }
    .btn-limpar:hover { color: #c9474b; }

    .modal-overlay {
        position: fixed; inset: 0; background: rgba(20, 14, 10, 0.65);
        backdrop-filter: blur(6px); z-index: 300;
        display: flex; align-items: center; justify-content: center;
        padding: 20px; opacity: 0; pointer-events: none;
        transition: opacity 0.3s;
    }
    .modal-overlay.open { opacity: 1; pointer-events: auto; }
    .modal {
        background: #fff; border-radius: 24px; max-width: 720px;
        width: 100%; max-height: 90vh; overflow: hidden;
        display: grid; grid-template-columns: 1fr 1fr;
        transform: scale(0.95);
        transition: transform 0.3s cubic-bezier(.2,.7,.2,1);
        box-shadow: 0 30px 80px rgba(0,0,0,0.3);
        position: relative;
    }
    .modal-overlay.open .modal { transform: scale(1); }
    .modal-img {
        width: 100%; height: 100%; object-fit: cover; min-height: 340px;
    }
    .modal-body {
        padding: 36px 32px; display: flex; flex-direction: column;
        overflow-y: auto;
    }
    .modal-close {
        position: absolute; top: 16px; right: 16px;
        width: 38px; height: 38px; border-radius: 50%;
        border: none; background: rgba(255,255,255,0.95);
        color: #2c1e16; cursor: pointer; font-size: 1.2rem;
        z-index: 2; transition: all 0.2s;
    }
    .modal-close:hover { background: #fff; transform: rotate(90deg); }
    .modal-categoria {
        display: inline-block; padding: 4px 12px; border-radius: 999px;
        font-size: 0.7rem; font-weight: 700; letter-spacing: 0.8px;
        text-transform: uppercase; margin-bottom: 14px; width: fit-content;
    }
    .modal-categoria.doce { background: #fde8ef; color: #c43d6f; }
    .modal-categoria.salgado { background: #fbeede; color: #8b5a2c; }
    .modal-body h2 {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 1.9rem; color: #2c1e16; margin-bottom: 10px;
        line-height: 1.2;
    }
    .modal-rating {
        display: flex; align-items: center; gap: 6px;
        font-size: 0.9rem; color: #8b7559; margin-bottom: 18px;
    }
    .modal-rating .stars { color: #e6b981; letter-spacing: 1px; }
    .modal-body .modal-descricao {
        color: #6d5a4a; line-height: 1.7; font-size: 0.95rem;
        margin-bottom: 24px;
    }
    .modal-preco-row {
        display: flex; align-items: baseline; gap: 8px;
        margin-bottom: 24px; padding: 16px;
        background: #faf5ed; border-radius: 14px;
    }
    .modal-preco-row .preco {
        font-family: var(--font-heading, 'Georgia', serif);
        font-size: 2rem; font-weight: 700; color: #2c1e16;
    }
    .modal-preco-row .unidade { font-size: 0.9rem; color: #8b7559; }
    .modal-actions {
        display: flex; gap: 12px; margin-top: auto; flex-wrap: wrap;
    }
    .modal-actions .qtd-controle { flex-shrink: 0; }
    .modal-actions .qtd-controle button {
        width: 40px; height: 44px; font-size: 1.1rem;
    }
    .modal-actions .qtd-controle .qtd-valor {
        min-width: 44px; font-size: 1rem;
    }
    .btn-modal-add {
        flex: 1; min-width: 180px; padding: 14px 20px;
        border: none; border-radius: 12px;
        background: linear-gradient(135deg, #2c1e16, #4a3528);
        color: #fff; font-family: inherit; font-size: 0.95rem;
        font-weight: 700; letter-spacing: 0.5px; cursor: pointer;
        transition: all 0.25s;
    }
    .btn-modal-add:hover {
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        transform: translateY(-2px);
    }

    .toast {
        position: fixed; bottom: 100px; left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: #2c1e16; color: #fff;
        padding: 14px 22px; border-radius: 999px;
        font-size: 0.9rem; font-weight: 500;
        box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        z-index: 400; opacity: 0;
        transition: all 0.3s cubic-bezier(.2,.7,.2,1);
        display: flex; align-items: center; gap: 8px;
        pointer-events: none; max-width: 90vw;
    }
    .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
    .toast .check { color: #5fcc7e; font-size: 1.1rem; }

    @media (max-width: 720px) {
        .product-list { padding: 40px 16px 100px; }
        .controles { padding: 12px; }
        .modal {
            grid-template-columns: 1fr; max-height: 95vh; border-radius: 20px;
        }
        .modal-img { min-height: 220px; max-height: 240px; }
        .modal-body { padding: 24px 22px; }
        .carrinho-fab { bottom: 20px; right: 20px; }
    }
    @media (max-width: 480px) {
        .filtro-btn { padding: 8px 16px; font-size: 0.82rem; }
        .ordem-wrap { width: 100%; }
        .ordem-wrap label { display: none; }
        .ordem-select { flex: 1; }
    }
    `;

    const style = document.createElement('style');
    style.id = 'produtos-styles-inject';
    style.textContent = css;
    document.head.appendChild(style);
}


/* ============================================================
   ESTRUTURA HTML — controles, filtros, drawer, modal, fab
   ============================================================ */
function montarEstrutura() {
    const main = document.querySelector('.product-list');
    if (!main) return;

    main.innerHTML = '';

    main.insertAdjacentHTML('beforeend', `
        <h1>Nossos Produtos</h1>
        <p class="catalogo-subtitulo">
            Cada doce e salgado é feito à mão, com ingredientes selecionados
            e a receita certa para celebrar o seu momento.
        </p>
    `);

    main.insertAdjacentHTML('beforeend', `
        <div class="controles">
            <div class="busca-wrap">
                <input type="text" class="busca-input"
                       id="buscaInput"
                       placeholder="Buscar por produto..."
                       autocomplete="off">
            </div>
            <div class="ordem-wrap">
                <label for="ordemSelect">Ordenar por</label>
                <select class="ordem-select" id="ordemSelect">
                    <option value="destaque">Em destaque</option>
                    <option value="preco-asc">Menor preço</option>
                    <option value="preco-desc">Maior preço</option>
                    <option value="nome">Nome (A-Z)</option>
                    <option value="rating">Mais bem avaliados</option>
                </select>
            </div>
        </div>
    `);

    const totalTodos    = PRODUTOS.length;
    const totalDoces    = PRODUTOS.filter(p => p.categoria === 'doce').length;
    const totalSalgados = PRODUTOS.filter(p => p.categoria === 'salgado').length;

    main.insertAdjacentHTML('beforeend', `
        <div class="filtros" role="tablist">
            <button class="filtro-btn active" data-filtro="todos" role="tab">
                Todos <span class="count">${totalTodos}</span>
            </button>
            <button class="filtro-btn" data-filtro="doce" role="tab">
                🍰 Doces <span class="count">${totalDoces}</span>
            </button>
            <button class="filtro-btn" data-filtro="salgado" role="tab">
                🥟 Salgados <span class="count">${totalSalgados}</span>
            </button>
        </div>
    `);

    main.insertAdjacentHTML('beforeend', `<div class="products" id="productsGrid"></div>`);

    document.body.insertAdjacentHTML('beforeend', `
        <button class="carrinho-fab" id="carrinhoFab" aria-label="Abrir carrinho">
            🛒
            <span class="badge" id="cartBadge" style="display:none">0</span>
        </button>
    `);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="drawer-overlay" id="drawerOverlay"></div>
        <aside class="drawer" id="drawer" aria-hidden="true">
            <div class="drawer-header">
                <h2>Sua sacola</h2>
                <button class="drawer-close" id="drawerClose" aria-label="Fechar">✕</button>
            </div>
            <div class="drawer-body" id="drawerBody"></div>
            <div class="drawer-footer" id="drawerFooter" style="display:none">
                <div class="drawer-total">
                    <span class="label">Total estimado</span>
                    <span class="valor" id="drawerTotal">R$ 0,00</span>
                </div>
                <button class="btn-checkout" id="btnCheckout">
                    Finalizar pelo WhatsApp →
                </button>
                <button class="btn-limpar" id="btnLimpar">Limpar sacola</button>
            </div>
        </aside>
    `);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="modalOverlay">
            <div class="modal" id="modal" role="dialog" aria-modal="true">
                <button class="modal-close" id="modalClose" aria-label="Fechar">✕</button>
                <img class="modal-img" id="modalImg" alt="">
                <div class="modal-body" id="modalBody"></div>
            </div>
        </div>
    `);

    document.body.insertAdjacentHTML('beforeend', `
        <div class="toast" id="toast">
            <span class="check">✓</span>
            <span id="toastText">Adicionado</span>
        </div>
    `);
}


/* ============================================================
   RENDERIZAÇÃO DO GRID
   ============================================================ */
function aplicarFiltrosEOrdem(lista) {
    let resultado = [...lista];

    if (state.filtro !== 'todos') {
        resultado = resultado.filter(p => p.categoria === state.filtro);
    }

    if (state.busca.trim()) {
        const termo = state.busca.toLowerCase().trim();
        resultado = resultado.filter(p =>
            p.nome.toLowerCase().includes(termo) ||
            p.descricao.toLowerCase().includes(termo)
        );
    }

    switch (state.ordem) {
        case 'preco-asc':
            resultado.sort((a, b) => a.preco - b.preco); break;
        case 'preco-desc':
            resultado.sort((a, b) => b.preco - a.preco); break;
        case 'nome':
            resultado.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')); break;
        case 'rating':
            resultado.sort((a, b) => b.rating - a.rating); break;
        case 'destaque':
        default:
            resultado.sort((a, b) => {
                if (a.destaque !== b.destaque) return a.destaque ? -1 : 1;
                return b.rating - a.rating;
            });
    }
    return resultado;
}

function estrelas(rating) {
    const cheias = Math.round(rating);
    return '★'.repeat(cheias) + '☆'.repeat(5 - cheias);
}

function renderizarGrid() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const lista = aplicarFiltrosEOrdem(PRODUTOS);

    if (lista.length === 0) {
        grid.innerHTML = `
            <div class="sem-produtos">
                <span class="icone">🔎</span>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente outra busca ou categoria.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = lista.map((p, i) => {
        const qtd = qtdNoCarrinho(p.id);
        const labelCat = p.categoria === 'doce' ? 'Doce' : 'Salgado';
        const destaqueBadge = p.destaque
            ? `<span class="card-destaque">⭐ Destaque</span>` : '';
        const btnTexto = qtd > 0
            ? `<span class="qtd-badge">${qtd}</span> Adicionar +`
            : `+ Adicionar`;

        return `
            <article class="product-card" data-id="${p.id}"
                     style="animation-delay:${i * 0.05}s">
                <div class="card-img-wrap">
                    <img src="${p.imagem}" alt="${p.nome}" loading="lazy">
                    <span class="card-tag ${p.categoria}">${labelCat}</span>
                    ${destaqueBadge}
                    <button class="btn-detalhes" data-detalhes="${p.id}"
                            aria-label="Ver detalhes de ${p.nome}">👁</button>
                </div>
                <div class="card-body">
                    <div class="card-rating">
                        <span class="stars">${estrelas(p.rating)}</span>
                        <span>${p.rating.toFixed(1)}</span>
                    </div>
                    <h2>${p.nome}</h2>
                    <p class="descricao">${p.descricao}</p>
                    <div class="card-footer">
                        <div class="preco-wrap">
                            <span class="preco">${fmtMoeda(p.preco)}</span>
                            <span class="preco-unidade">por ${p.unidade}</span>
                        </div>
                        <button class="btn-add ${qtd > 0 ? 'no-carrinho' : ''}"
                                data-add="${p.id}">
                            ${btnTexto}
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function atualizarBotoesCards() {
    document.querySelectorAll('[data-add]').forEach(btn => {
        const id = btn.dataset.add;
        const qtd = qtdNoCarrinho(id);
        if (qtd > 0) {
            btn.classList.add('no-carrinho');
            btn.innerHTML = `<span class="qtd-badge">${qtd}</span> Adicionar +`;
        } else {
            btn.classList.remove('no-carrinho');
            btn.innerHTML = '+ Adicionar';
        }
    });
}


/* ============================================================
   CARRINHO
   ============================================================ */
function atualizarBadgeCarrinho() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const total = qtdTotalItens();
    if (total > 0) {
        badge.style.display = 'flex';
        badge.textContent = total > 99 ? '99+' : total;
    } else {
        badge.style.display = 'none';
    }
}

function renderizarCarrinho() {
    const body = document.getElementById('drawerBody');
    const footer = document.getElementById('drawerFooter');
    const totalEl = document.getElementById('drawerTotal');
    if (!body) return;

    if (state.carrinho.length === 0) {
        body.innerHTML = `
            <div class="drawer-empty">
                <span class="icone">🛍️</span>
                <h3 style="font-family:var(--font-heading,Georgia);color:#2c1e16;margin-bottom:6px">
                    Sua sacola está vazia
                </h3>
                <p>Adicione produtos do nosso catálogo.</p>
            </div>
        `;
        footer.style.display = 'none';
        return;
    }

    body.innerHTML = state.carrinho.map(item => {
        const p = getProduto(item.id);
        if (!p) return '';
        return `
            <div class="item-carrinho" data-item="${p.id}">
                <img class="item-img" src="${p.imagem}" alt="${p.nome}">
                <div class="item-info">
                    <h4>${p.nome}</h4>
                    <div class="item-preco">
                        ${fmtMoeda(p.preco)} × ${item.qtd} =
                        <strong>${fmtMoeda(p.preco * item.qtd)}</strong>
                    </div>
                    <div style="display:flex;align-items:center">
                        <div class="qtd-controle">
                            <button data-qtd-down="${p.id}" aria-label="Diminuir">−</button>
                            <span class="qtd-valor">${item.qtd}</span>
                            <button data-qtd-up="${p.id}" aria-label="Aumentar">+</button>
                        </div>
                        <button class="item-remover" data-remover="${p.id}">
                            Remover
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    footer.style.display = 'block';
    totalEl.textContent = fmtMoeda(totalCarrinho());
}

function abrirCarrinho() {
    document.getElementById('drawer').classList.add('open');
    document.getElementById('drawerOverlay').classList.add('open');
    document.getElementById('drawer').setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}
function fecharCarrinho() {
    document.getElementById('drawer').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('open');
    document.getElementById('drawer').setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}


/* ============================================================
   MODAL DE DETALHES
   ============================================================ */
function abrirModal(id) {
    const p = getProduto(id);
    if (!p) return;
    const overlay = document.getElementById('modalOverlay');
    const img = document.getElementById('modalImg');
    const body = document.getElementById('modalBody');

    img.src = p.imagem;
    img.alt = p.nome;

    const qtd = qtdNoCarrinho(id) || 1;

    body.innerHTML = `
        <span class="modal-categoria ${p.categoria}">
            ${p.categoria === 'doce' ? 'Doce' : 'Salgado'}
        </span>
        <h2>${p.nome}</h2>
        <div class="modal-rating">
            <span class="stars">${estrelas(p.rating)}</span>
            <span>${p.rating.toFixed(1)} de 5</span>
        </div>
        <p class="modal-descricao">${p.detalhes}</p>
        <div class="modal-preco-row">
            <span class="preco">${fmtMoeda(p.preco)}</span>
            <span class="unidade">por ${p.unidade}</span>
        </div>
        <div class="modal-actions">
            <div class="qtd-controle">
                <button id="modalQtdDown" aria-label="Diminuir">−</button>
                <span class="qtd-valor" id="modalQtdValor">${qtd}</span>
                <button id="modalQtdUp" aria-label="Aumentar">+</button>
            </div>
            <button class="btn-modal-add" id="modalAdd" data-id="${id}">
                Adicionar à sacola
            </button>
        </div>
    `;

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    let qtdAtual = qtd;
    const valorEl = document.getElementById('modalQtdValor');
    document.getElementById('modalQtdDown').onclick = () => {
        if (qtdAtual > 1) { qtdAtual--; valorEl.textContent = qtdAtual; }
    };
    document.getElementById('modalQtdUp').onclick = () => {
        qtdAtual++; valorEl.textContent = qtdAtual;
    };
    document.getElementById('modalAdd').onclick = () => {
        adicionarAoCarrinho(id, qtdAtual);
        mostrarToast(`${p.nome} adicionado (${qtdAtual}x)`);
        fecharModal();
    };
}

function fecharModal() {
    document.getElementById('modalOverlay').classList.remove('open');
    document.body.style.overflow = '';
}


/* ============================================================
   TOAST
   ============================================================ */
let toastTimeout;
function mostrarToast(texto) {
    const toast = document.getElementById('toast');
    const txt = document.getElementById('toastText');
    if (!toast || !txt) return;
    txt.textContent = texto;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}


/* ============================================================
   CHECKOUT VIA WHATSAPP
   ============================================================ */
function finalizarPedido() {
    if (state.carrinho.length === 0) {
        mostrarToast('Sua sacola está vazia');
        return;
    }

    let msg = '*Olá Waldineia!* 🍰\n\nGostaria de encomendar:\n\n';
    state.carrinho.forEach((item, i) => {
        const p = getProduto(item.id);
        if (!p) return;
        msg += `${i + 1}. *${p.nome}* — ${item.qtd}× ${fmtMoeda(p.preco)} = ${fmtMoeda(p.preco * item.qtd)}\n`;
    });
    msg += `\n*Total estimado:* ${fmtMoeda(totalCarrinho())}\n\n`;
    msg += `Pode confirmar disponibilidade e prazo de entrega, por favor?`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}


/* ============================================================
   EVENT LISTENERS
   ============================================================ */
function ligarEventos() {
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filtro = btn.dataset.filtro;
            renderizarGrid();
        });
    });

    let buscaTimeout;
    document.getElementById('buscaInput')?.addEventListener('input', (e) => {
        clearTimeout(buscaTimeout);
        buscaTimeout = setTimeout(() => {
            state.busca = e.target.value;
            renderizarGrid();
        }, 200);
    });

    document.getElementById('ordemSelect')?.addEventListener('change', (e) => {
        state.ordem = e.target.value;
        renderizarGrid();
    });

    document.getElementById('productsGrid')?.addEventListener('click', (e) => {
        const btnAdd = e.target.closest('[data-add]');
        if (btnAdd) {
            const id = btnAdd.dataset.add;
            const p = getProduto(id);
            adicionarAoCarrinho(id, 1);
            mostrarToast(`${p.nome} adicionado ✓`);
            btnAdd.style.transform = 'scale(0.92)';
            setTimeout(() => btnAdd.style.transform = '', 150);
            return;
        }
        const btnDet = e.target.closest('[data-detalhes]');
        if (btnDet) {
            abrirModal(btnDet.dataset.detalhes);
        }
    });

    document.getElementById('carrinhoFab')?.addEventListener('click', abrirCarrinho);
    document.getElementById('drawerClose')?.addEventListener('click', fecharCarrinho);
    document.getElementById('drawerOverlay')?.addEventListener('click', fecharCarrinho);

    document.getElementById('drawerBody')?.addEventListener('click', (e) => {
        const up = e.target.closest('[data-qtd-up]');
        const down = e.target.closest('[data-qtd-down]');
        const rem = e.target.closest('[data-remover]');

        if (up) {
            const id = up.dataset.qtdUp;
            atualizarQuantidade(id, qtdNoCarrinho(id) + 1);
        } else if (down) {
            const id = down.dataset.qtdDown;
            atualizarQuantidade(id, qtdNoCarrinho(id) - 1);
        } else if (rem) {
            atualizarQuantidade(rem.dataset.remover, 0);
        }
    });

    document.getElementById('btnCheckout')?.addEventListener('click', finalizarPedido);
    document.getElementById('btnLimpar')?.addEventListener('click', () => {
        if (confirm('Deseja limpar a sacola?')) limparCarrinho();
    });

    document.getElementById('modalClose')?.addEventListener('click', fecharModal);
    document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'modalOverlay') fecharModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (document.getElementById('modalOverlay')?.classList.contains('open')) {
            fecharModal();
        } else if (document.getElementById('drawer')?.classList.contains('open')) {
            fecharCarrinho();
        }
    });
}


/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    injetarEstilos();
    montarEstrutura();
    renderizarGrid();
    renderizarCarrinho();
    atualizarBadgeCarrinho();
    ligarEventos();
});
