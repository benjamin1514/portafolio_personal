// ==========================================
// 1. Arreglo de Datos de Proyectos (Editable)
// ==========================================
const projects = [
    {
        id: "huellapet",
        icon: "bi-heart-pulse",
        badge: "PROYECTO DESTACADO",
        title: "HuellaPet 🐾",
        description: "Una plataforma para acceder a la ficha de una mascota mediante un código QR o tecnología NFC, según la interfaz del proyecto.",
        extraText: "El propósito principal es facilitar el acceso rápido a la información relevante de la mascota en caso de emergencia o extravío.",
        technologies: [
            { name: "Python", icon: "bi-filetype-py" },
            { name: "HTML5", icon: "bi-filetype-html" },
            { name: "CSS3", icon: "bi-filetype-css" },
            { name: "JavaScript", icon: "bi-filetype-js" },
            { name: "QR / NFC", icon: "bi-qr-code-scan" }
        ],
        githubUrl: "https://github.com/benjamin1514/huellapet",
        demoUrl: "#proyectos", // Enlace de navegación interno para "Ver proyecto"
        featured: true
    },
    {
        id: "gestor-tareas",
        icon: "bi-activity",
        title: "Posture Lab",
        description: "Proyecto enfocado en explorar herramientas digitales para promover una mejor postura y hábitos saludables.",
        technologies: [
            { name: "HTML5", icon: "bi-filetype-html" },
            { name: "CSS3", icon: "bi-filetype-css" },
            { name: "JavaScript", icon: "bi-filetype-js" }
        ],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "Proyecto",
        featured: false
    },
    {
        id: "cine",
        icon: "bi-film",
        title: "Cine",
        description: "Proyecto personal para practicar programación y crear una experiencia relacionada con el mundo del cine.",
        technologies: [],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "Proyecto personal",
        featured: false
    },
    {
        id: "querido-diario",
        icon: "bi-journal-heart",
        title: "Querido Diario",
        description: "Proyecto personal para seguir practicando desarrollo y presentar contenido de forma clara y organizada.",
        technologies: [],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "Proyecto personal",
        featured: false
    }
];

// ==========================================
// 2. Funciones de Renderizado Dinámico
// ==========================================

// Carga de la Sección Especial: Proyecto Destacado (HuellaPet)
function renderFeaturedProject() {
    const container = document.getElementById("featuredProjectContainer");
    const project = projects.find(p => p.featured);

    if (!project) return;

    const tags = project.technologies
        .map(technology => `<span class="tag project-tech tag-huellapet"><i class="bi ${technology.icon}" aria-hidden="true"></i>${technology.name}</span>`)
        .join("");

    container.innerHTML = `
        <div class="huellapet-card">
            <div class="huellapet-grid">
                <div class="huellapet-info">
                    <span class="huellapet-badge">${project.badge}</span>
                    <h3 class="huellapet-title"><i class="bi ${project.icon} me-2" aria-hidden="true"></i>${project.title}</h3>
                    <p class="huellapet-desc">${project.description}</p>
                    <p class="huellapet-extra">${project.extraText}</p>
                    
                    <div class="tags huellapet-tags">
                        ${tags}
                    </div>

                    <div class="huellapet-buttons">
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-huellapet-primary"><i class="bi bi-github me-2" aria-hidden="true"></i>Explorar en GitHub</a>
                        <a href="${project.demoUrl}" class="btn btn-huellapet-secondary"><i class="bi bi-box-arrow-up-right me-2" aria-hidden="true"></i>Ver proyecto</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Carga de Proyectos Secundarios
function renderSecondaryProjects() {
    const container = document.getElementById("secondaryProjectsContainer");
    const secondaries = projects.filter(p => !p.featured);

    container.innerHTML = secondaries.map(project => {
        const demoBtn = project.demoUrl 
            ? `<a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Demo</a>` 
            : "";
        const tags = project.technologies
            .map(technology => `<span class="tag project-tech"><i class="bi ${technology.icon}" aria-hidden="true"></i>${technology.name}</span>`)
            .join("");

        return `
            <div class="col-12 col-md-6">
              <article class="card project-card h-100">
                <div class="card-body d-flex flex-column">
                    <span class="status-badge status-en-progreso"><i class="bi bi-circle-fill me-1" aria-hidden="true"></i>${project.status}</span>
                    <h4 class="project-title"><i class="bi ${project.icon} me-2" aria-hidden="true"></i>${project.title}</h4>
                    <p class="project-desc">${project.description}</p>
                    ${tags ? `<div class="tags">${tags}</div>` : ""}
                    <div class="project-links mt-auto">
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary"><i class="bi bi-github me-2" aria-hidden="true"></i>GitHub</a>
                        ${demoBtn}
                    </div>
                </div>
              </article>
            </div>
        `;
    }).join("");
}

// ==========================================
// 3. Control de Interacciones y UI
// ==========================================
function setupUI() {
    // Menú Hamburguesa para Móviles
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");

    if (toggle && menu) {
        toggle.addEventListener("click", () => {
            menu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                menu.classList.remove("active");
            });
        });
    }

    // Año dinámico en el Pie de Página
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

function setupMatrixBackground() {
    const canvas = document.getElementById("matrixBackground");
    const context = canvas?.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!canvas || !context || reducedMotion.matches) return;

    const characters = "アイウエオカキクケコサシスセソタチツテトナニヌネノ012345789{}[]<>/\\";
    const fontSize = 16;
    let columns = [];
    let width = 0;
    let height = 0;
    let lastFrame = 0;
    let animationId = 0;

    function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width * pixelRatio;
        canvas.height = height * pixelRatio;
        context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        context.font = `${fontSize}px "JetBrains Mono", monospace`;
        columns = Array.from({ length: Math.ceil(width / fontSize) }, () =>
            Math.random() * (height / fontSize)
        );
    }

    function drawFrame(timestamp) {
        animationId = 0;
        if (document.hidden || reducedMotion.matches) return;

        if (timestamp - lastFrame >= 50) {
            lastFrame = timestamp;
            context.clearRect(0, 0, width, height);

            columns.forEach((position, column) => {
                const x = column * fontSize;
                const y = position * fontSize;
                for (let trail = 0; trail < 6; trail += 1) {
                    const trailY = y - trail * fontSize;
                    if (trailY < 0) continue;
                    context.fillStyle = `rgba(86, 242, 195, ${0.72 - trail * 0.1})`;
                    context.fillText(
                        characters[Math.floor(Math.random() * characters.length)],
                        x,
                        trailY
                    );
                }

                columns[column] += Math.random() * 0.35 + 0.35;
                if (y > height && Math.random() > 0.975) columns[column] = 0;
            });
        }

        animationId = window.requestAnimationFrame(drawFrame);
    }

    function startAnimation() {
        if (!animationId && !document.hidden && !reducedMotion.matches) {
            animationId = window.requestAnimationFrame(drawFrame);
        }
    }

    function stopAnimation() {
        if (animationId) window.cancelAnimationFrame(animationId);
        animationId = 0;
        context.clearRect(0, 0, width, height);
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    startAnimation();
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) stopAnimation();
        else startAnimation();
    });
    reducedMotion.addEventListener("change", event => {
        if (event.matches) stopAnimation();
        else startAnimation();
    });
}

// Inicialización de funciones tras la carga del DOM
document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProject();
    renderSecondaryProjects();
    setupUI();
    setupMatrixBackground();
});