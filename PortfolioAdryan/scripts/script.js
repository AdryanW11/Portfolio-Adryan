document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});


function expandirTexto() {
    const textoCurto = document.getElementById("texto-curto");
    const textoCompleto = document.getElementById("texto-completo");
    const container = document.querySelector(".sobre-texto");

    if (textoCompleto.classList.contains("hidden")) {
        textoCompleto.classList.remove("hidden");
        container.style.maxWidth = "75%";
    } else {
        textoCompleto.classList.add("hidden");
        container.style.maxWidth = "50%";
    }
}

function scrollContato() {
    const contatoSection = document.getElementById("contato");
    contatoSection.scrollIntoView({ behavior: "smooth" });
}

function filterProjects(category) {
    const projects = document.querySelectorAll('.portfolio-projects .project');
    projects.forEach(project => {
        if (category === 'all' || project.classList.contains(category)) {
            project.classList.remove('hidden');
        } else {
            project.classList.add('hidden');
        }
    });
}