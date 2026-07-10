// --- 1. LISTA DE 20 TAGS (Frente e Verso) ---
const listaTags = [
    { tag: '<html>', desc: 'Garante o início e o fim de todo o documento HTML.' },
    { tag: '<head>', desc: 'Contém os metadados do site, como o título e links de estilos.' },
    { tag: '<body>', desc: 'Abriga todo o conteúdo visível da página (textos, imagens, etc).' },
    { tag: '<title>', desc: 'Define o título da página que aparece na aba do navegador.' },
    { tag: '<h1>', desc: 'Cria o título principal da página, o mais importante (Heading 1).' },
    { tag: '<p>', desc: 'Utilizada para definir e estruturar parágrafos de texto.' },
    { tag: '<a>', desc: 'Cria hiperlinks para outras páginas, arquivos ou seções.' },
    { tag: '<img>', desc: 'Utilizada para inserir e exibir imagens na página.' },
    { tag: '<div>', desc: 'Funciona como um contêiner genérico para agrupar elementos.' },
    { tag: '<span>', desc: 'Contêiner em linha usado para marcar partes específicas de um texto.' },
    { tag: '<ul>', desc: 'Cria listas não ordenadas (geralmente com marcadores de bolinha).' },
    { tag: '<ol>', desc: 'Cria listas ordenadas (com numeração sequencial).' },
    { tag: '<li>', desc: 'Representa um item dentro de uma lista (ul ou ol).' },
    { tag: '<header>', desc: 'Define o cabeçalho de uma página ou de uma seção específica.' },
    { tag: '<footer>', desc: 'Define o rodapé com informações finais e créditos.' },
    { tag: '<main>', desc: 'Indica o conteúdo principal e exclusivo daquela página.' },
    { tag: '<section>', desc: 'Divide a página em seções temáticas de conteúdo.' },
    { tag: '<button>', desc: 'Cria um botão clicável para executar ações.' },
    { tag: '<style>', desc: 'Permite inserir códigos CSS diretamente dentro do HTML.' },
    { tag: '<script>', desc: 'Utilizada para embutir ou referenciar códigos JavaScript.' }
];

// --- 2. GERAR OS CARDS NA TELA ---
const container = document.querySelector('.container');
listaTags.forEach(item => {
    const card = document.createElement('div');
    card.className = 'flashcard';
    // Evento de toque para telemóveis
    card.setAttribute('onclick', 'this.classList.toggle("active")'); 
    
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">
                <code>${item.tag.replace('<', '&lt;').replace('>', '&gt;')}</code>
            </div>
            <div class="card-back">
                <p>${item.desc}</p>
            </div>
        </div>
    `;
    container.appendChild(card);
});

// --- 3. JAVASCRIPT PARA O FUNDO SE MOVENDO (Partículas Rosas) ---
const canvas = document.getElementById('fundo-animado');
const ctx = canvas.getContext('2d');

let particulas = [];

function ajustarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarCanvas);
ajustarCanvas();

// Classe para gerir cada bolinha flutuante do fundo
class Particula {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamanho = Math.random() * 15 + 5;
        this.velocidadeX = Math.random() * 0.5 - 0.25;
        this.velocidadeY = Math.random() * 0.5 - 0.25;
        this.opacidade = Math.random() * 0.4 + 0.1;
    }

    desenhar() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamanho, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 107, 139, ${this.opacidade})`; // Tom rosa adaptado
        ctx.fill();
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;

        // Rebater nas paredes da janela
        if (this.x < 0 || this.x > canvas.width) this.velocidadeX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.velocidadeY *= -1;
    }
}

function iniciar() {
    particulas = [];
    for (let i = 0; i < 40; i++) {
        particulas.push(new Particula());
    }
}

function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particulas.forEach(p => {
        p.atualizar();
        p.desenhar();
    });
    requestAnimationFrame(animar);
}

iniciar();
animar();