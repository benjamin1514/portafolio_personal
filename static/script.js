// ==========================================
// 1. Arreglo de Datos de Proyectos (Editable)
// ==========================================
const projects = [
    {
        id: "huellapet",
        badge: "PROYECTO DESTACADO",
        title: "HuellaPet 🐾",
        description: "Una plataforma para acceder a la ficha de una mascota mediante un código QR o tecnología NFC, según la interfaz del proyecto.",
        extraText: "El propósito principal es facilitar el acceso rápido a la información relevante de la mascota en caso de emergencia o extravío.",
        technologies: ["Python", "HTML5", "CSS3", "JavaScript", "QR / NFC"],
        image: "static/images/huellapet.png", // Ruta requerida
        githubUrl: "https://github.com/benjamin1514/huellapet",
        demoUrl: "#proyectos", // Enlace de navegación interno para "Ver proyecto"
        featured: true
    },
    {
        id: "gestor-tareas",
        title: "Gestor de Tareas",
        description: "Aplicación sencilla para agregar, listar, completar y eliminar actividades diarias.",
        technologies: ["Python"],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "En progreso",
        featured: false
    },
    {
        id: "calculadora",
        title: "Calculadora Web",
        description: "Herramienta interactiva para operaciones matemáticas básicas.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "En desarrollo",
        featured: false
    },
    {
        id: "gestor-gastos",
        title: "Gestor de Gastos Personales",
        description: "Programa para registrar ingresos, gastos y calcular saldos.",
        technologies: ["Python"],
        githubUrl: "https://github.com/benjamin1514",
        demoUrl: "",
        status: "En desarrollo",
        featured: false
    }
];

// Tecnologías futuras por aprender
const learningNext = ["React", "FastAPI", "Django", "Bases de Datos SQL", "Docker"];

// ==========================================
// 2. Funciones de Renderizado Dinámico
// ==========================================

// Carga de la Sección Especial: Proyecto Destacado (HuellaPet)
function renderFeaturedProject() {
    const container = document.getElementById("featuredProjectContainer");
    const project = projects.find(p => p.featured);

    if (!project) return;

    const tags = project.technologies
        .map(t => `<span class="tag tag-huellapet">${t}</span>`)
        .join("");

    container.innerHTML = `
        <div class="huellapet-card">
            <div class="huellapet-grid">
                <!-- Columna Izquierda: Información -->
                <div class="huellapet-info">
                    <span class="huellapet-badge">${project.badge}</span>
                    <h3 class="huellapet-title">${project.title}</h3>
                    <p class="huellapet-desc">${project.description}</p>
                    <p class="huellapet-extra">${project.extraText}</p>
                    
                    <div class="tags huellapet-tags">
                        ${tags}
                    </div>

                    <div class="huellapet-buttons">
                        <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-huellapet-primary">Explorar en GitHub</a>
                        <a href="${project.demoUrl}" class="btn btn-huellapet-secondary">Ver proyecto</a>
                    </div>
                </div>

                <!-- Columna Derecha: Captura de pantalla oficial -->
                <div class="huellapet-frame">
                    <img 
                        src="${project.image}" 
                        alt="Captura de pantalla de la interfaz de HuellaPet" 
                        class="huellapet-img"
                        onerror="this.onerror=null; this.parentNode.innerHTML='<div class=\\'huellapet-placeholder\\'>🐾<br><strong>Copiar imagen a:</strong><br><code>static/images/huellapet.png</code></div>';"
                    >
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
        const tags = project.technologies.map(t => `<span class="tag">${t}</span>`).join("");

        return `
            <div class="card project-card">
                <div>
                    <span class="status-badge status-en-progreso">${project.status}</span>
                    <h4 class="project-title">${project.title}</h4>
                    <p class="project-desc">${project.description}</p>
                    <div class="tags">${tags}</div>
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">GitHub</a>
                    ${demoBtn}
                </div>
            </div>
        `;
    }).join("");
}

// Carga de lista de tecnologías por aprender
function renderLearningNext() {
    const container = document.getElementById("learningNextContainer");
    container.innerHTML = learningNext.map(t => `<span class="tag">${t}</span>`).join("");
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

// Inicialización de funciones tras la carga del DOM
document.addEventListener("DOMContentLoaded", () => {
    renderFeaturedProject();
    renderSecondaryProjects();
    renderLearningNext();
    setupUI();
});