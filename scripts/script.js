document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfólio de Adryan Willy carregado com sucesso!");
    // Aqui você pode adicionar scripts para interatividade futura, como botões e animações.
});

let currentSlide = 0;

function moveSlide(n) {
    const slides = document.querySelector('.skills-container');
    const totalSlides = document.querySelectorAll('.skill-card').length;
    const visibleSlides = 3; // Quantos slides serão visíveis ao mesmo tempo
    currentSlide += n;

    // Se chegarmos ao fim, vamos para o começo
    if (currentSlide >= totalSlides - visibleSlides) {
        currentSlide = 0;
    }
    
    // Se voltarmos para o início, vamos para o fim
    if (currentSlide < 0) {
        currentSlide = totalSlides - visibleSlides;
    }

    slides.style.transform = `translateX(${-currentSlide * (100 / visibleSlides)}%)`;
}

document.addEventListener("DOMContentLoaded", function() {
    moveSlide(0); // Inicializa no primeiro slide
});

// Alternar Tema Claro/Escuro
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Inicializar o carrossel no primeiro slide
document.addEventListener("DOMContentLoaded", function() {
    moveSlide(0);
});
