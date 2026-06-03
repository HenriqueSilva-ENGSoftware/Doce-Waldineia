/* ============================================================
   Doce-Waldineia — contatoScript.js
   Página de contato com formulário de encomenda que gera
   mensagem formatada para WhatsApp.
   ============================================================ */

const WHATSAPP_NUMERO = "5544999999999"; // Troque pelo número real

/* ============================================================
   INJEÇÃO DE ESTILOS
   ============================================================ */
function injetarEstilos() {
    if (document.getElementById('contato-styles-inject')) return;

    const css = `
    body { background: #faf5ed; }

    .contato-hero {
        text-align: center;
        padding: 80px 20px 60px;
        background: linear-gradient(135deg, #2c1e16 0%, #4a3528 100%);
        color: #fff;
        position: relative;
        overflow: hidden;
    }
    .contato-hero::before {
        content: '';
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e6b981' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
    .contato-hero h1 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: clamp(2.8rem, 6vw, 4.5rem);
        letter-spacing: 2px;
        margin-bottom: 16px;
        position: relative;
    }
    .contato-hero p {
        font-size: clamp(1rem, 2.5vw, 1.2rem);
        color: #e6b981;
        font-style: italic;
        max-width: 520px;
        margin: 0 auto;
        position: relative;
        line-height: 1.7;
    }

    .contato-wrapper {
        max-width: 1060px;
        margin: 0 auto;
        padding: 60px 24px 100px;
        display: grid;
        grid-template-columns: 1fr 1.4fr;
        gap: 40px;
        align-items: start;
    }

    /* Cards de info lateral */
    .info-lateral { display: flex; flex-direction: column; gap: 20px; }

    .info-card {
        background: #fff;
        border-radius: 20px;
        padding: 28px 26px;
        border: 1px solid rgba(230, 185, 129, 0.2);
        box-shadow: 0 4px 20px rgba(60, 40, 25, 0.06);
        transition: transform 0.3s, box-shadow 0.3s;
    }
    .info-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(60, 40, 25, 0.1);
    }
    .info-card-icone {
        font-size: 2rem;
        display: block;
        margin-bottom: 12px;
    }
    .info-card h3 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: 1.1rem;
        color: #2c1e16;
        margin-bottom: 6px;
    }
    .info-card p, .info-card a {
        color: #6d5a4a;
        font-size: 0.9rem;
        line-height: 1.6;
        text-decoration: none;
    }
    .info-card a:hover { color: #e6b981; }

    .btn-whatsapp-direto {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 14px 20px;
        background: linear-gradient(135deg, #25D366, #1ea952);
        color: #fff;
        text-decoration: none;
        border-radius: 14px;
        font-weight: 700;
        font-size: 0.95rem;
        margin-top: 8px;
        transition: all 0.25s;
        box-shadow: 0 6px 16px rgba(37, 211, 102, 0.3);
        justify-content: center;
    }
    .btn-whatsapp-direto:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(37, 211, 102, 0.45);
    }
    .btn-whatsapp-direto .wa-icon { font-size: 1.3rem; }

    /* Formulário */
    .form-card {
        background: #fff;
        border-radius: 24px;
        padding: 40px 36px;
        border: 1px solid rgba(230, 185, 129, 0.2);
        box-shadow: 0 8px 32px rgba(60, 40, 25, 0.08);
    }
    .form-card h2 {
        font-family: var(--font-heading, Georgia, serif);
        font-size: 1.7rem;
        color: #2c1e16;
        margin-bottom: 6px;
    }
    .form-card .form-subtitulo {
        color: #6d5a4a;
        font-size: 0.9rem;
        margin-bottom: 28px;
        line-height: 1.5;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
    }
    .campo {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }
    .campo label {
        font-size: 0.82rem;
        font-weight: 600;
        color: #4a3528;
        letter-spacing: 0.5px;
        text-transform: uppercase;
        margin-bottom: 8px;
    }
    .campo label span.obrigatorio { color: #c9474b; margin-left: 2px; }
    .campo input,
    .campo select,
    .campo textarea {
        padding: 13px 16px;
        border: 1.5px solid #e8dccc;
        border-radius: 12px;
        font-size: 0.95rem;
        font-family: inherit;
        color: #2c1e16;
        background: #fafafa;
        transition: all 0.2s;
        outline: none;
        resize: vertical;
    }
    .campo input:focus,
    .campo select:focus,
    .campo textarea:focus {
        border-color: #e6b981;
        background: #fff;
        box-shadow: 0 0 0 4px rgba(230, 185, 129, 0.15);
    }
    .campo input.erro,
    .campo select.erro,
    .campo textarea.erro {
        border-color: #c9474b;
        box-shadow: 0 0 0 4px rgba(201, 71, 75, 0.1);
    }
    .erro-msg {
        color: #c9474b;
        font-size: 0.78rem;
        margin-top: 5px;
        display: none;
    }
    .erro-msg.visivel { display: block; }

    .btn-enviar {
        width: 100%;
        padding: 16px;
        border: none;
        border-radius: 14px;
        background: linear-gradient(135deg, #25D366, #1ea952);
        color: #fff;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 700;
        letter-spacing: 0.5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.25s;
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.35);
        margin-top: 8px;
    }
    .btn-enviar:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45);
    }
    .btn-enviar:active { transform: scale(0.98); }
    .btn-enviar .wa-icon { font-size: 1.2rem; }

    .form-nota {
        text-align: center;
        font-size: 0.78rem;
        color: #8b7559;
        margin-top: 14px;
        line-height: 1.5;
    }

    /* Horário de atendimento */
    .horario-list {
        list-style: none;
        margin-top: 8px;
    }
    .horario-list li {
        display: flex;
        justify-content: space-between;
        font-size: 0.88rem;
        color: #6d5a4a;
        padding: 4px 0;
        border-bottom: 1px dashed #f4ede2;
    }
    .horario-list li:last-child { border-bottom: none; }
    .horario-list li span:last-child { font-weight: 600; color: #2c1e16; }

    /* Animações */
    .fade-in {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }

    /* Responsivo */
    @media (max-width: 860px) {
        .contato-wrapper {
            grid-template-columns: 1fr;
            padding: 40px 16px 80px;
        }
        .form-card { padding: 28px 22px; }
    }
    @media (max-width: 480px) {
        .form-row { grid-template-columns: 1fr; }
        .contato-hero { padding: 60px 16px 40px; }
    }
    `;

    const style = document.createElement('style');
    style.id = 'contato-styles-inject';
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
        <section class="contato-hero">
            <h1>Contato</h1>
            <p>Faça sua encomenda com facilidade — respondemos pelo WhatsApp.</p>
        </section>

        <div class="contato-wrapper">
            <!-- Informações laterais -->
            <aside class="info-lateral">
                <div class="info-card fade-in">
                    <span class="info-card-icone">💬</span>
                    <h3>Fale direto no WhatsApp</h3>
                    <p>Prefere mandar mensagem diretamente? É só clicar abaixo!</p>
                    <a href="https://wa.me/${WHATSAPP_NUMERO}" target="_blank" class="btn-whatsapp-direto">
                        <span class="wa-icon">📱</span> Abrir WhatsApp
                    </a>
                </div>

                <div class="info-card fade-in" style="transition-delay:0.1s">
                    <span class="info-card-icone">🕐</span>
                    <h3>Horário de Atendimento</h3>
                    <ul class="horario-list">
                        <li><span>Segunda – Sexta</span> <span>09h – 19h</span></li>
                        <li><span>Sábado</span> <span>09h – 15h</span></li>
                        <li><span>Domingo</span> <span>Fechado</span></li>
                    </ul>
                </div>

                <div class="info-card fade-in" style="transition-delay:0.2s">
                    <span class="info-card-icone">📦</span>
                    <h3>Prazo de Entrega</h3>
                    <p>
                        Encomendas com <strong>mínimo 48h de antecedência</strong>.
                        Para eventos e grandes quantidades, consulte com mais tempo.
                    </p>
                </div>

                <div class="info-card fade-in" style="transition-delay:0.3s">
                    <span class="info-card-icone">📍</span>
                    <h3>Atendemos em</h3>
                    <p>Maringá e região. Entrega e retirada a combinar no pedido.</p>
                </div>
            </aside>

            <!-- Formulário -->
            <div class="form-card fade-in" style="transition-delay:0.1s">
                <h2>Fazer uma Encomenda</h2>
                <p class="form-subtitulo">
                    Preencha o formulário e você será redirecionado para o WhatsApp
                    com a mensagem já formatada.
                </p>

                <div id="formEncomenda">
                    <div class="form-row">
                        <div class="campo">
                            <label for="campo-nome">Nome<span class="obrigatorio">*</span></label>
                            <input type="text" id="campo-nome" placeholder="Seu nome" autocomplete="name">
                            <span class="erro-msg" id="erro-nome">Por favor, informe seu nome.</span>
                        </div>
                        <div class="campo">
                            <label for="campo-telefone">Telefone<span class="obrigatorio">*</span></label>
                            <input type="tel" id="campo-telefone" placeholder="(44) 99999-9999" autocomplete="tel">
                            <span class="erro-msg" id="erro-telefone">Informe um telefone válido.</span>
                        </div>
                    </div>

                    <div class="campo">
                        <label for="campo-produto">Produto de interesse<span class="obrigatorio">*</span></label>
                        <select id="campo-produto">
                            <option value="">Selecione um produto...</option>
                            <option value="Bolo de Chocolate">🎂 Bolo de Chocolate</option>
                            <option value="Brigadeiro Gourmet">🍫 Brigadeiro Gourmet</option>
                            <option value="Rocambole de Goiabada">🍞 Rocambole de Goiabada</option>
                            <option value="Beijinho de Coco">🥥 Beijinho de Coco</option>
                            <option value="Coxinha Gourmet">🍗 Coxinha Gourmet</option>
                            <option value="Empada de Frango">🥟 Empada de Frango</option>
                            <option value="Pastel de Queijo">🧀 Pastel de Queijo</option>
                            <option value="Quiche de Alho-poró">🥧 Quiche de Alho-poró</option>
                            <option value="Misto (vários)">🎁 Misto / Vários produtos</option>
                            <option value="Outro">💬 Outro (descrever abaixo)</option>
                        </select>
                        <span class="erro-msg" id="erro-produto">Selecione um produto.</span>
                    </div>

                    <div class="form-row">
                        <div class="campo">
                            <label for="campo-quantidade">Quantidade</label>
                            <input type="number" id="campo-quantidade" placeholder="Ex: 30" min="1">
                        </div>
                        <div class="campo">
                            <label for="campo-data">Data do evento / entrega</label>
                            <input type="date" id="campo-data">
                        </div>
                    </div>

                    <div class="campo">
                        <label for="campo-mensagem">Observações</label>
                        <textarea id="campo-mensagem" rows="4"
                            placeholder="Alguma personalização, restrição alimentar, local de entrega..."></textarea>
                    </div>

                    <button class="btn-enviar" id="btnEnviar">
                        <span class="wa-icon">📲</span>
                        Enviar pelo WhatsApp
                    </button>

                    <p class="form-nota">
                        Ao clicar, o WhatsApp será aberto com sua mensagem já preenchida.
                        Nenhum dado é armazenado por este site.
                    </p>
                </div>
            </div>
        </div>
    `;
}

/* ============================================================
   VALIDAÇÃO E ENVIO
   ============================================================ */
function mascaraTelefone(input) {
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    if (v.length > 6) {
        v = `(${v.slice(0,2)}) ${v.slice(2,7)}-${v.slice(7)}`;
    } else if (v.length > 2) {
        v = `(${v.slice(0,2)}) ${v.slice(2)}`;
    } else if (v.length > 0) {
        v = `(${v}`;
    }
    input.value = v;
}

function mostrarErro(campo, mensagem) {
    const input = document.getElementById(`campo-${campo}`);
    const erro  = document.getElementById(`erro-${campo}`);
    if (!input || !erro) return;
    input.classList.add('erro');
    if (mensagem) erro.textContent = mensagem;
    erro.classList.add('visivel');
}

function limparErro(campo) {
    const input = document.getElementById(`campo-${campo}`);
    const erro  = document.getElementById(`erro-${campo}`);
    if (!input || !erro) return;
    input.classList.remove('erro');
    erro.classList.remove('visivel');
}

function validarFormulario() {
    let valido = true;

    const nome = document.getElementById('campo-nome')?.value.trim();
    limparErro('nome');
    if (!nome) { mostrarErro('nome'); valido = false; }

    const tel = document.getElementById('campo-telefone')?.value.replace(/\D/g, '');
    limparErro('telefone');
    if (!tel || tel.length < 10) { mostrarErro('telefone'); valido = false; }

    const produto = document.getElementById('campo-produto')?.value;
    limparErro('produto');
    if (!produto) { mostrarErro('produto'); valido = false; }

    return valido;
}

function enviarWhatsApp() {
    if (!validarFormulario()) return;

    const nome      = document.getElementById('campo-nome').value.trim();
    const telefone  = document.getElementById('campo-telefone').value.trim();
    const produto   = document.getElementById('campo-produto').value;
    const quantidade = document.getElementById('campo-quantidade').value.trim();
    const data      = document.getElementById('campo-data').value;
    const obs       = document.getElementById('campo-mensagem').value.trim();

    let msg = `*Olá Waldineia!* 🍰\n\nGostaria de fazer uma encomenda:\n\n`;
    msg += `👤 *Nome:* ${nome}\n`;
    msg += `📞 *Telefone:* ${telefone}\n`;
    msg += `🛍 *Produto:* ${produto}\n`;
    if (quantidade) msg += `🔢 *Quantidade:* ${quantidade}\n`;
    if (data) {
        const [ano, mes, dia] = data.split('-');
        msg += `📅 *Data desejada:* ${dia}/${mes}/${ano}\n`;
    }
    if (obs) msg += `\n💬 *Observações:* ${obs}\n`;
    msg += `\nPode confirmar disponibilidade e prazo de entrega, por favor?`;

    const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}

/* ============================================================
   EVENTOS
   ============================================================ */
function ligarEventos() {
    // Máscara de telefone
    document.getElementById('campo-telefone')?.addEventListener('input', (e) => {
        mascaraTelefone(e.target);
    });

    // Limpar erros ao digitar
    ['nome', 'telefone', 'produto'].forEach(campo => {
        document.getElementById(`campo-${campo}`)?.addEventListener('input', () => {
            limparErro(campo);
        });
        document.getElementById(`campo-${campo}`)?.addEventListener('change', () => {
            limparErro(campo);
        });
    });

    // Envio
    document.getElementById('btnEnviar')?.addEventListener('click', enviarWhatsApp);

    // Data mínima = amanhã
    const inputData = document.getElementById('campo-data');
    if (inputData) {
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 2);
        inputData.min = amanha.toISOString().split('T')[0];
    }
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
    }, { threshold: 0.12 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    injetarEstilos();
    construirPagina();
    ligarEventos();
    setTimeout(iniciarAnimacoes, 100);
});
