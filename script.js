// =====================
// VIRAR OS FLASHCARDS
// =====================

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
    card.addEventListener("click", () => {
        card.classList.toggle("virar");
    });
});

// =====================
// PESQUISA
// =====================

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("keyup", () => {

    const texto = pesquisa.value.toLowerCase();

    cards.forEach(card => {

        const frente = card.querySelector(".front").textContent.toLowerCase();
        const verso = card.querySelector(".back").textContent.toLowerCase();

        if (frente.includes(texto) || verso.includes(texto)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// =====================
// FUNDO ANIMADO
// =====================

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function ajustarTela() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

ajustarTela();

window.addEventListener("resize", ajustarTela);

const bolinhas = [];

for (let i = 0; i < 80; i++) {

    bolinhas.push({

        x: Math.random() * canvas.width,

        y: Math.random() * canvas.height,

        raio: Math.random() * 5 + 2,

        dx: (Math.random() - 0.5) * 1,

        dy: (Math.random() - 0.5) * 1

    });

}

function desenhar() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bolinhas.forEach(b => {

        ctx.beginPath();

        ctx.arc(b.x, b.y, b.raio, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(255,255,255,0.4)";

        ctx.fill();

        b.x += b.dx;
        b.y += b.dy;

        if (b.x < 0 || b.x > canvas.width) b.dx *= -1;
        if (b.y < 0 || b.y > canvas.height) b.dy *= -1;

    });

    requestAnimationFrame(desenhar);

}

desenhar();