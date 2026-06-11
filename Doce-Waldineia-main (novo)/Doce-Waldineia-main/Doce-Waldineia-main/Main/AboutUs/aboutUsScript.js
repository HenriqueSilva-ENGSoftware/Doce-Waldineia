/* ============================================================
   Doce-Waldineia — aboutUsScript.js
   Constrói a página "Sobre Nós" dinamicamente via JS,
   com animações de scroll e seção de equipe.
   ============================================================ */

/* ---------- DADOS ---------- */
const HISTORIA = [
    {
        ano: "2010",
        titulo: "O início",
        texto: "Waldineia começou a fazer doces na cozinha de casa, levando brigadeiros caseiros para vizinhos e amigos. O que era hobby virou pedidos toda semana.",
        icone: "🏠"
    },
    {
        ano: "2015",
        titulo: "Primeiras encomendas",
        texto: "Com a boca-a-boca crescendo pela cidade, as encomendas para festas e aniversários se tornaram a atividade principal. Salgados artesanais entraram no cardápio.",
        icone: "🎉"
    },
    {
        ano: "2019",
        titulo: "Receitas gourmet",
        texto: "Cursos de confeitaria elevaram o padrão dos produtos. Chocolate belga, ingredientes selecionados e embalagens cuidadosas passaram a fazer parte de cada encomenda.",
        icone: "🎓"
    },
    {
        ano: "2026",
        titulo: "Hoje",
        texto: "Com centenas de clientes fiéis e dezenas de eventos atendidos por ano, os Doces da Waldineia são sinônimo de sabor caseiro com qualidade de confeitaria.",
        icone: "⭐"
    }
];

const VALORES = [
    {
        icone: "🍫",
        titulo: "Ingredientes Selecionados",
        descricao: "Cada receita começa com a escolha certa. Usamos chocolate belga, leite condensado premium e produtos frescos de fornecedores locais."
    },
    {
        icone: "🤲",
        titulo: "Feito à Mão",
        descricao: "Nada de linha de produção. Cada brigadeiro, coxinha e bolo é preparado manualmente, com atenção e carinho em cada detalhe."
    },
    {
        icone: "💌",
        titulo: "Feito com Carinho",
        descricao: "Mais do que um produto, entregamos uma experiência. Embalagens bonitas, entrega cuidadosa e um sorriso em cada encomenda."
    },
    {
        icone: "🌿",
        titulo: "Sem Conservantes",
        descricao: "Produtos naturais, sem aditivos artificiais. Por isso trabalhamos com encomendas: garantindo frescor e sabor autêntico sempre."
    }
];


/* ============================================================
   INJEÇÃO DE ESTILOS
   ============================================================ */
function injetarEstilos() {
    if (document.getElementById('about-styles-inject')) return;

    const css = `
    body { background: #faf5ed; }

    .about-wrapper {
        max-width: 1100px;
        margin: 0 auto;
        padding: 60px 24px 100px;
    }

    /* Hero da seção */
    .about-hero {
        text-align: center;
        padding: 80px 20px 60px;
        background: linear-gradient(135deg, #2c1e16 0%, #4a3528 100%);
        color: #fff;
        position: relative;
        overflow: hidden;
    }
    .about-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6b981' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .about-hero h1 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: clamp(2.8rem, 6vw, 4.5rem);
        letter-spacing: 2px;
        margin-bottom: 16px;
        position: relative;
    }
    .about-hero p {
        font-size: clamp(1rem, 2.5vw, 1.3rem);
        color: #e6b981;
        font-style: italic;
        max-width: 560px;
        margin: 0 auto;
        position: relative;
        line-height: 1.7;
    }

    /* Seção Valores */
    .section-titulo {
        font-family: var(--font-heading, Georgia, serif);
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        color: #2c1e16;
        text-align: center;
        margin-bottom: 12px;
    }
    .section-subtitulo {
        text-align: center;
        color: #6d5a4a;
        font-size: 1rem;
        margin-bottom: 48px;
        line-height: 1.6;
    }

    .valores-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        margin-bottom: 80px;
    }
    .valor-card {
        background: #fff;
        border-radius: 20px;
        padding: 32px 28px;
        border: 1px solid rgba(230, 185, 129, 0.2);
        box-shadow: 0 4px 20px rgba(60, 40, 25, 0.06);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .valor-card:hover {
        transform: translateY(-6px);
        box-shadow: 0 16px 40px rgba(60, 40, 25, 0.12);
    }
    .valor-icone {
        font-size: 2.4rem;
        display: block;
        margin-bottom: 16px;
    }
    .valor-card h3 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: 1.2rem;
        color: #2c1e16;
        margin-bottom: 10px;
    }
    .valor-card p {
        color: #6d5a4a;
        font-size: 0.9rem;
        line-height: 1.6;
    }

    /* --- Grid da História (Foto + Timeline) --- */
    .historia-grid {
        display: grid;
        grid-template-columns: 350px 1fr;
        gap: 60px;
        align-items: start;
        margin-bottom: 80px;
    }

    /* --- Estilização da Foto e do Nome --- */
    .historia-col-img {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        position: sticky;
        top: 40px;
    }

    .foto-moldura {
        width: 100%;
        max-width: 320px;
        position: relative;
    }

    .foto-moldura::before {
        content: '';
        position: absolute;
        top: 15px;
        left: -15px;
        width: 100%;
        height: 100%;
        border: 2px solid #e6b981;
        border-radius: 20px;
        z-index: 0;
    }

    .historia-col-img img {
        width: 100%;
        height: auto;
        border-radius: 20px;
        box-shadow: 0 12px 30px rgba(60, 40, 25, 0.15);
        border: 6px solid #fff;
        position: relative;
        z-index: 1;
        object-fit: cover;
    }

    .nome-fundadora {
        font-family: var(--font-heading, Georgia, serif);
        font-size: 2.2rem;
        color: #2c1e16;
        margin-top: 32px;
        margin-bottom: 4px;
    }

    .cargo-fundadora {
        color: #d4a05f;
        font-weight: 700;
        font-size: 0.95rem;
        text-transform: uppercase;
        letter-spacing: 1.5px;
    }

    /* --- Linha do tempo --- */
    .timeline {
        position: relative;
        padding-left: 30px;
    }
    .timeline::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background: linear-gradient(to bottom, #e6b981, #d4a05f);
    }
    .timeline-item {
        display: block !important;
        margin-bottom: 48px;
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .timeline-item.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .timeline-content {
        background: #fff;
        border-radius: 20px;
        padding: 28px;
        border: 1px solid rgba(230, 185, 129, 0.2);
        box-shadow: 0 4px 20px rgba(60, 40, 25, 0.06);
        position: relative;
        width: 100%;
    }
    
    /* Removemos as bolinhas velhas problemáticas */
    .timeline-content::after {
        display: none !important; 
    }

    /* Adicionamos a bolinha nova correta */
    .timeline-content::before {
        content: '';
        position: absolute;
        top: 30px;
        left: -38px;
        width: 16px;
        height: 16px;
        background: #e6b981;
        border-radius: 50%;
        box-shadow: 0 0 0 4px #faf5ed, 0 0 0 6px #e6b981;
    }

    .timeline-ano {
        display: inline-block;
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        color: #fff;
        padding: 4px 16px;
        border-radius: 999px;
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: 1px;
        margin-bottom: 10px;
    }
    .timeline-icone { font-size: 1.6rem; margin-bottom: 8px; display: block; }
    .timeline-content h3 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: 1.25rem;
        color: #2c1e16;
        margin-bottom: 8px;
    }
    .timeline-content p { color: #6d5a4a; font-size: 0.92rem; line-height: 1.65; }

    /* CTA */
    .about-cta {
        text-align: center;
        padding: 64px 32px;
        background: linear-gradient(135deg, #2c1e16, #4a3528);
        border-radius: 24px;
        color: #fff;
    }
    .about-cta h2 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: clamp(1.8rem, 4vw, 2.6rem);
        margin-bottom: 14px;
    }
    .about-cta p {
        color: #e6b981;
        font-size: 1rem;
        margin-bottom: 32px;
        font-style: italic;
    }
    .cta-btns { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-cta-primary {
        display: inline-block;
        padding: 14px 36px;
        background: linear-gradient(135deg, #e6b981, #d4a05f);
        color: #2c1e16;
        text-decoration: none;
        border-radius: 999px;
        font-weight: 700;
        font-size: 0.95rem;
        letter-spacing: 0.5px;
        transition: all 0.25s;
        box-shadow: 0 6px 16px rgba(230, 185, 129, 0.4);
    }
    .btn-cta-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 28px rgba(230, 185, 129, 0.5);
    }
    .btn-cta-secondary {
        display: inline-block;
        padding: 14px 36px;
        background: transparent;
        color: #fff;
        text-decoration: none;
        border-radius: 999px;
        font-weight: 600;
        font-size: 0.95rem;
        letter-spacing: 0.5px;
        border: 1.5px solid rgba(255,255,255,0.3);
        transition: all 0.25s;
    }
    .btn-cta-secondary:hover {
        background: rgba(255,255,255,0.1);
        border-color: rgba(255,255,255,0.6);
        transform: translateY(-3px);
    }

    /* Animações de entrada */
    .fade-in {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Responsivo (Arrumado para o novo layout) */
    @media (max-width: 850px) {
        .historia-grid {
            grid-template-columns: 1fr; /* Coloca a foto em cima e a timeline embaixo no celular */
            gap: 40px;
        }
        .historia-col-img {
            position: relative;
            top: 0;
        }
        .about-hero { padding: 60px 16px 40px; }
    }
    `;

    const style = document.createElement('style');
    style.id = 'about-styles-inject';
    style.textContent = css;
    document.head.appendChild(style);
}

/* ============================================================
   CONSTRUÇÃO DO HTML
   ============================================================ */
function construirPagina() {
    const main = document.querySelector('main.product-list') || document.querySelector('main');
    if (!main) return;

    main.style.padding = '0';
    main.style.maxWidth = 'none';

    main.innerHTML = `
        <section class="about-hero">
            <h1>Sobre Nós</h1>
            <p>Uma história feita de afeto, receitas e muito sabor caseiro.</p>
        </section>

        <div class="about-wrapper">
            <h2 class="section-titulo fade-in" style="margin-top:0;padding-top:60px">Nossos Valores</h2>
            <p class="section-subtitulo fade-in">O que norteia cada encomenda que sai da nossa cozinha.</p>
            <div class="valores-grid">
                ${VALORES.map((v, i) => `
                    <div class="valor-card fade-in" style="transition-delay:${i * 0.1}s">
                        <span class="valor-icone">${v.icone}</span>
                        <h3>${v.titulo}</h3>
                        <p>${v.descricao}</p>
                    </div>
                `).join('')}
            </div>

            <h2 class="section-titulo fade-in">Nossa História</h2>
            <p class="section-subtitulo fade-in">De uma cozinha de casa para centenas de clientes felizes.</p>

            <div class="historia-grid fade-in">
                <div class="historia-col-img">
                    <div class="foto-moldura">
                        <img src="file:///C:/Users/guilh/OneDrive/Desktop/WhatsApp%20Image%202026-06-06%20at%2019.37.43.jpeg" alt="Waldineia">
                    </div>
                    <h3 class="nome-fundadora">Waldineia</h3>
                    <p class="cargo-fundadora">Fundadora & Confeiteira</p>
                </div>
                <div class="timeline">
                    ${HISTORIA.map((h, i) => `
                        <div class="timeline-item">
                            <div class="timeline-content">
                                <span class="timeline-ano">${h.ano}</span>
                                <span class="timeline-icone">${h.icone}</span>
                                <h3>${h.titulo}</h3>
                                <p>${h.texto}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="about-cta fade-in">
                <h2>Que tal fazer uma encomenda?</h2>
                <p>Cada produto é feito com ingredientes frescos, no dia combinado.</p>
                <div class="cta-btns">
                    <a href="../Produtos/produtoIndex.html" class="btn-cta-primary">Ver Produtos</a>
                    <a href="../Contato/contatoIndex.html" class="btn-cta-secondary">Entrar em Contato</a>
                </div>
            </div>
        </div>
    `;
}
/* ============================================================
   ANIMAÇÕES COM INTERSECTION OBSERVER
   ============================================================ */
function iniciarAnimacoes() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in, .timeline-item').forEach(el => {
        observer.observe(el);
    });
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    injetarEstilos();
    construirPagina();
    // Pequeno timeout para garantir que o DOM está pronto para o observer
    setTimeout(iniciarAnimacoes, 100);
});
