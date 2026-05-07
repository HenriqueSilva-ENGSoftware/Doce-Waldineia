/* =========================================================
   Doce Waldineia — script.js
   Animações + funcionalidade dos botões
   ========================================================= */

/* ---------- CONFIGURAÇÕES ---------- */
// Troque pelo número real (formato internacional, só dígitos)
const WHATSAPP_NUMERO = "5544999999999";

// Categorias dos produtos (ordem igual à do HTML)
// Produto 1: Bolo de Rolo  -> doce
// Produto 2: Coxinha       -> salgado
// Produto 3: Brigadeiro    -> doce
const CATEGORIAS_PRODUTOS = ["doce", "salgado", "doce"];


/* ---------- 1. ANIMAÇÃO DE REVELAÇÃO AO ROLAR ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));


/* ---------- 2. PARALLAX SUAVE NO HERO ---------- */
const heroSection = document.querySelector('.artisanal-gradient');
if (heroSection) {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < 800) {
      heroSection.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
  }, { passive: true });
}


/* ---------- 3. CARRINHO DE PEDIDOS ---------- */
const carrinho = [];

function abrirWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem);
  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${texto}`;
  window.open(url, '_blank');
}

function atualizarBadgeCarrinho() {
  const botaoSacola = document.querySelector('header button.text-primary');
  if (!botaoSacola) return;

  let badge = botaoSacola.querySelector('.cart-badge');

  if (carrinho.length === 0) {
    if (badge) badge.remove();
    return;
  }

  if (!badge) {
    botaoSacola.classList.add('relative');
    badge = document.createElement('span');
    badge.className = 'cart-badge absolute -top-1 -right-1 bg-primary text-on-primary ' +
                      'text-[10px] font-bold rounded-full w-5 h-5 flex items-center ' +
                      'justify-center shadow-lg';
    botaoSacola.appendChild(badge);
  }
  badge.textContent = carrinho.length;
}

function mostrarToast(texto) {
  // Remove toast antigo se existir
  const antigo = document.querySelector('.toast-msg');
  if (antigo) antigo.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-msg fixed bottom-44 md:bottom-32 right-6 md:right-12 ' +
                    'bg-surface-container-high text-on-surface px-5 py-3 rounded-2xl ' +
                    'shadow-2xl border border-primary/30 z-50 font-label-md text-sm ' +
                    'transition-all duration-300 opacity-0 translate-y-2';
  toast.textContent = texto;
  document.body.appendChild(toast);

  // Anima entrada
  requestAnimationFrame(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  });

  // Remove após 2.5s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}


/* ---------- 4. BOTÕES DO HERO (Ver Cardápio / WhatsApp) ---------- */
const botoesHero = document.querySelectorAll('.artisanal-gradient button');
botoesHero.forEach(btn => {
  const texto = btn.textContent.trim().toLowerCase();

  if (texto.includes('cardápio') || texto.includes('cardapio')) {
    btn.addEventListener('click', () => {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (texto.includes('whatsapp')) {
    btn.addEventListener('click', () => {
      abrirWhatsApp(
        "Olá Waldineia! 🍰 Vim pelo site e gostaria de fazer uma encomenda."
      );
    });
  }
});


/* ---------- 5. FILTROS DO CARDÁPIO (Todos / Doces / Salgados) ---------- */
const secaoMenu = document.getElementById('menu');
if (secaoMenu) {
  const botoesFiltro = secaoMenu.querySelectorAll('.flex.justify-center button');
  const cardsProdutos = secaoMenu.querySelectorAll('.product-card');

  // Marca cada card com sua categoria
  cardsProdutos.forEach((card, i) => {
    card.dataset.categoria = CATEGORIAS_PRODUTOS[i] || 'todos';
  });

  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      const filtro = btn.textContent.trim().toLowerCase();

      // Estilo ativo/inativo nos botões de filtro
      botoesFiltro.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary', 'shadow-lg', 'shadow-primary/30');
        b.classList.add('border', 'border-outline-variant', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary', 'shadow-lg', 'shadow-primary/30');
      btn.classList.remove('border', 'border-outline-variant', 'text-on-surface-variant');

      // Filtra os cards
      cardsProdutos.forEach(card => {
        const cat = card.dataset.categoria;
        let mostrar = true;

        if (filtro.includes('doce') && !filtro.includes('todos')) {
          mostrar = cat === 'doce';
        } else if (filtro.includes('salgado')) {
          mostrar = cat === 'salgado';
        }

        if (mostrar) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.transition = 'opacity .25s, transform .25s';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => { card.style.display = 'none'; }, 250);
        }
      });
    });
  });
}
