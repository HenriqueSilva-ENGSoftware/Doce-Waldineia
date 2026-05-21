/* ---------- CONFIG ---------- */
const WHATSAPP_NUMERO = "5544999999999"; // Trocar pelo número real ou não 

/* ---------- DADOS DOS PRODUTOS ---------- */
const PRODUTOS = [
    {
        nome: "Bolo de Chocolate",
        descricao: "Delicioso bolo de chocolate com cobertura cremosa.",
        preco: "R$ 25,00",
        categoria: "doce",
        imagem: "https://www.placecats.com/300/200"
    },
    {
        nome: "Brigadeiro Gourmet",
        descricao: "Chocolate belga 54% cacau com granulado de puro chocolate.",
        preco: "R$ 4,50 / un",
        categoria: "doce",
        imagem: "https://www.placecats.com/301/200"
    },
    {
        nome: "Rocambole de Goiabada",
        descricao: "Receita pernambucana autêntica com finas camadas de goiabada artesanal.",
        preco: "R$ 45,00",
        categoria: "doce",
        imagem: "https://www.placecats.com/302/200"
    },
    {
        nome: "Beijinho de Coco",
        descricao: "Doce tradicional com leite condensado e coco fresco ralado.",
        preco: "R$ 3,50 / un",
        categoria: "doce",
        imagem: "https://www.placecats.com/303/200"
    },
    {
        nome: "Coxinha Gourmet",
        descricao: "Massa leve de batata com recheio cremoso de frango e catupiry.",
        preco: "R$ 8,50 / un",
        categoria: "salgado",
        imagem: "https://www.placecats.com/304/200"
    },
    {
        nome: "Empada de Palmito",
        descricao: "Massa amanteigada com recheio cremoso de palmito refogado.",
        preco: "R$ 6,00 / un",
        categoria: "salgado",
        imagem: "https://www.placecats.com/305/200"
    },
    {
        nome: "Pastel de Queijo",
        descricao: "Massa crocante recheada com queijo mussarela derretido.",
        preco: "R$ 7,00 / un",
        categoria: "salgado",
        imagem: "https://www.placecats.com/306/200"
    },
    {
        nome: "Quiche de Alho-poró",
        descricao: "Massa amanteigada com recheio cremoso de alho-poró e queijo.",
        preco: "R$ 12,00",
        categoria: "salgado",
        imagem: "https://www.placecats.com/307/200"
    }
];


/* ---------- ELEMENTOS DO DOM ---------- */
const containerProdutos = document.querySelector('.products');
const main = document.querySelector('.product-list');


/* ---------- INJETAR FILTROS NO TOPO ---------- */
function criarFiltros() {
    if (!main) return null;

    const wrapperFiltros = document.createElement('div');
    wrapperFiltros.className = 'filtros';
    wrapperFiltros.innerHTML = `
        <button class="filtro-btn active" data-filtro="todos">Todos</button>
        <button class="filtro-btn" data-filtro="doce">Doces</button>
        <button class="filtro-btn" data-filtro="salgado">Salgados</button>
    `;

    // \\\coloca a logo após o <h1>
    const titulo = main.querySelector('h1');
    if (titulo) {
        titulo.insertAdjacentElement('afterend', wrapperFiltros);
    } else {
        main.prepend(wrapperFiltros);
    }

    return wrapperFiltros;
}


/* ---------- RENDERIZAR PRODUTOS NO GRID ---------- */
function renderizarProdutos(filtro = 'todos') {
    if (!containerProdutos) return;

    // Limpa o grid
    containerProdutos.innerHTML = '';

    // Filtra
    const lista = filtro === 'todos'
        ? PRODUTOS
        : PRODUTOS.filter(p => p.categoria === filtro);

    if (lista.length === 0) {
        containerProdutos.innerHTML = `
            <p class="sem-produtos">Nenhum produto encontrado nessa categoria.</p>
        `;
        return;
    }

    // Cria os cards
    lista.forEach((produto, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.animationDelay = `${i * 0.08}s`;
        card.innerHTML = `
            <div class="card-img-wrap">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <span class="card-tag ${produto.categoria}">
                    ${produto.categoria === 'doce' ? 'Doce' : 'Salgado'}
                </span>
            </div>
            <div class="card-body">
                <h2>${produto.nome}</h2>
                <p>${produto.descricao}</p>
                <div class="card-footer">
                    <span class="price">${produto.preco}</span>
                    <button class="btn-pedir"
                            data-nome="${produto.nome}"
                            data-preco="${produto.preco}">
                        Encomendar
                    </button>
                </div>
            </div>
        `;
        containerProdutos.appendChild(card);
    });

    // animação dos botões de "Encomendar"
    containerProdutos.querySelectorAll('.btn-pedir').forEach(btn => {
        btn.addEventListener('click', () => {
            const nome = btn.dataset.nome;
            const preco = btn.dataset.preco;
            const mensagem = `Olá Waldineia! 🍰 Gostaria de encomendar:\n\n• ${nome} — ${preco}\n\nPode confirmar a disponibilidade?`;
            const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');
        });
    });
}


/* ---------- LIGAR OS FILTROS ---------- */
function ativarFiltros(wrapper) {
    if (!wrapper) return;

    const botoes = wrapper.querySelectorAll('.filtro-btn');
    botoes.forEach(btn => {
        btn.addEventListener('click', () => {
            // Estado ativo
            botoes.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Renderiza filtrado
            renderizarProdutos(btn.dataset.filtro);
        });
    });
}


/* ---------- INICIALIZAÇÃO ---------- */
document.addEventListener('DOMContentLoaded', () => {
    const wrapperFiltros = criarFiltros();
    ativarFiltros(wrapperFiltros);
    renderizarProdutos('todos');
});