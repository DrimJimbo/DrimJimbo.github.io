/**
 * PORTFOLIO JS - AYMERIK CAVENAILE
 */

// --- 1. GESTION DU MENU MOBILE ---
const navButton = document.getElementById("navbutton");
const navMenu = document.getElementById("navigation"); // Cible uniquement la liste, pas le parent

navButton.addEventListener("click", () => {
    // Liste des classes pour transformer le menu en liste verticale mobile
    const mobileClasses = [
        "flex",
        "flex-col",
        "absolute",
        "top-20",
        "left-0",
        "w-full",
        "bg-white",
        "p-8",
        "border-b",
        "shadow-xl",
    ];

    // On bascule l'affichage (enlève 'hidden' et ajoute les styles mobiles)
    navMenu.classList.toggle("hidden");
    mobileClasses.forEach((cls) => navMenu.classList.toggle(cls));
});

// Fermer le menu si on clique sur un lien (évite que le menu reste ouvert devant le contenu)
navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        if (!navMenu.classList.contains("hidden") && window.innerWidth < 768) {
            navButton.click(); // Simule un clic pour refermer proprement
        }
    });
});

// --- 2. DONNÉES ET CAROUSEL "À PROPOS" ---
const aboutTexts = [
    "Bonjour! Je m'appelle Aymerik. J'ai 21 ans. Je suis étudiant en 3éme année de licence informatique à l'université d'artois à Lens. Par la suite je voudrais devenir pentester.",
    "Admis à l'école Nexa en cybersécurité, je recherche une alternance pour l'année 2026-2027.",
    "Passionné par les tests de pénétrations, je développe mes compétences en sécurité pour répondre aux enjeux de demain.",
];

let currentAboutIndex = 0;
const textElement = document.querySelector("#text p");
const slide1 = document.getElementById("slide1");
const slide2 = document.getElementById("slide2");
const slide3 = document.getElementById("slide3");
const classON = ["w-6", "h-1", "bg-blue-600", "rounded-full"];
const classOff = ["w-1.5", "h-1", "bg-slate-200", "rounded-full"];
const listeSlide = [slide1, slide2, slide3];
const btnLeft1 = document.getElementById("btnleft1");
const btnRight1 = document.getElementById("btnright1");

function updateAboutText() {
    textElement.style.opacity = 0;
    setTimeout(() => {
        textElement.textContent = aboutTexts[currentAboutIndex];
        textElement.style.opacity = 1;

        classON.forEach((cls) => {
            listeSlide[currentAboutIndex].classList.add(cls);
            listeSlide[
                (currentAboutIndex + 2) % aboutTexts.length
            ].classList.remove(cls);
        });
        classOff.forEach((cls) => {
            listeSlide[
                (currentAboutIndex + 2) % aboutTexts.length
            ].classList.add(cls);
            listeSlide[currentAboutIndex].classList.remove(cls);
        });
    }, 200);
}

btnRight1.addEventListener("click", () => {
    currentAboutIndex = (currentAboutIndex + 1) % aboutTexts.length;
    updateAboutText();
});

btnLeft1.addEventListener("click", () => {
    currentAboutIndex =
        (currentAboutIndex - 1 + aboutTexts.length) % aboutTexts.length;
    updateAboutText();
});

// --- 3. DONNÉES ET CAROUSEL "PROJETS" ---
const projects = [
    {
        name: "Scanner Port",
        desc: "Le but étant de scanner le réseaux afin de trouver les IP connectées et pour chaque IP afficher leurs ports ouverts.",
        image: "images/scanner_port.png",
        tech: ["Python", "Cybersécurité"],
        zip: "https://github.com/DrimJimbo/scanner_port",
    },
    {
        name: "Bibliothèque Bash",
        desc: "Conception d'une bibliothèque en ligne de commande.",
        image: "projects/biblio_shell/bibli.png",
        tech: ["Bash", "Linux"],
        zip: "projects/biblio_shell/biblio.zip",
    },
    {
        name: "Serveur Web Java",
        desc: "Conception d'un serveur web en Java en utilisant certain patron de conception.",
        image: "images/java.png",
        tech: ["Java", "Patron de conception"],
        zip: "projects/serveur_web/serveur_web_java.zip",
    },
    {
        name: "Bourse en ligne",
        desc: "Création d'un site simulant une bourse en ligne.",
        image: "projects/bourse/bourse.png",
        tech: ["PHP", "SQLite", "FullStack"],
        zip: "projects/bourse/bourse_en_ligne.zip",
    },
    {
        name: "Space Invaders",
        desc: "Codage du jeu Space Invaders en langage C.",
        image: "projects/space_invaders/space.png",
        tech: ["Langage C"],
        zip: "projects/space_invaders/space_invaders.zip",
    },
];

let currentProjIndex = 0;
const projectContainer = document.getElementById("projectactu");
const btnLeftProj = document.getElementById("btnleft");
const btnRightProj = document.getElementById("btnright");

function renderProject() {
    const proj = projects[currentProjIndex];

    projectContainer.innerHTML = `
        <div class="flex flex-col lg:flex-row w-full h-full p-8 md:p-12 gap-10 animate-in fade-in duration-500">
            <div class="w-full lg:w-1/2 aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-white/10 shadow-inner group">
                <img src="${proj.image}" alt="${proj.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-700">
            </div>
            <div class="w-full lg:w-1/2 flex flex-col justify-center text-white">
                <h3 class="text-2xl md:text-4xl font-black mb-4 tracking-tighter uppercase italic">${proj.name}</h3>
                <p class="text-slate-400 text-sm md:text-base leading-relaxed mb-8 font-medium">${proj.desc}</p>
                <div>
                    <a href="${proj.zip}" download class="inline-flex items-center gap-4 px-8 py-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 transition-all active:scale-95 group">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover:translate-y-0.5 transition-transform"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        Télécharger les sources
                    </a>
                </div>
                <div class="mt-8 flex gap-2">
                    ${proj.tech.map((t) => `<span class="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">${t}</span>`).join("")}
                </div>
            </div>
        </div>
        <div class="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none"></div>
    `;
}

btnRightProj.addEventListener("click", () => {
    currentProjIndex = (currentProjIndex + 1) % projects.length;
    renderProject();
});

btnLeftProj.addEventListener("click", () => {
    currentProjIndex =
        (currentProjIndex - 1 + projects.length) % projects.length;
    renderProject();
});

// Initialisation au chargement
renderProject();
