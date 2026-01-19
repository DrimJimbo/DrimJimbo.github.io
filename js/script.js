// Nav
const btn = document.getElementById("navbutton");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
    nav.classList.toggle("open");
    btn.innerHTML = nav.classList.contains("open") ? "&#10005;" : "&#9776;";
});
//aboutme
const rigthabout = document.getElementById("btnright1");
const leftabout = document.getElementById("btnleft1");
const div = document.getElementById("aboutme");
var presentation = document.createElement("p");
presentation.id = "paboutme";
presentation.innerHTML = `
Bonjour! Je m'appelle Aymerik. J'ai 21 ans. Je suis étudiant en
    3éme année de licence informatique à l'université d'artois à
    Lens. Par la suite je voudrais poursuivre mes études en master
    de cybersécurité. Je recherche un stage de 8 semaines minimun
    dans la cybersécurité afin d'acquérir de l'expérience. Et
    pourquoi pas continuer en contrat d'apprentissage par la suite.
    Si vous voulais en apprendre un peu plus vous pouvez télécharger
    mon cv et/ou ma lettre de motivation. Ou alors 
`;
//
const contactLink = document.createElement("a");
contactLink.href = "#contact";
contactLink.textContent = "me contacter";
//
const cvLink = document.createElement("a");
cvLink.href = "doc/cv_stage.pdf";
cvLink.download = "MonCV.pdf";
cvLink.textContent = "Mon CV";
//
const lmLink = document.createElement("a");
lmLink.href = "doc/lettre_de_motivation_3eme_licence.pdf";
lmLink.download = "LettreDeMotivation.pdf";
lmLink.textContent = "Ma lettre de motivation";
//
presentation.appendChild(contactLink);
presentation.appendChild(document.createTextNode(" pour un entretiens !"));
presentation.appendChild(document.createElement("br"));
presentation.appendChild(cvLink);
presentation.appendChild(document.createElement("br"));
presentation.appendChild(lmLink);
div.insertBefore(presentation, rigthabout);
//
var langage = document.createElement("p");
langage.id = "paboutme";
const imgPython = document.createElement("img");
imgPython.src = "../images/python.png";
imgPython.className = "imgLangage";
const imgC = document.createElement("img");
imgC.src = "../images/c-.png";
imgC.className = "imgLangage";
const imgJava = document.createElement("img");
imgJava.src = "../images/java.png";
imgJava.className = "imgLangage";
const imgJs = document.createElement("img");
imgJs.src = "../images/javascript.png";
imgJs.className = "imgLangage";
const imgSql = document.createElement("img");
imgSql.src = "../images/sql.png";
imgSql.className = "imgLangage";
const imgHtmlCss = document.createElement("img");
imgHtmlCss.src = "../images/htmlcss.png";
imgHtmlCss.className = "imgLangage";
const imgPhp = document.createElement("img");
imgPhp.src = "../images/php.png";
imgPhp.className = "imgLangage";
const imgShell = document.createElement("img");
imgShell.src = "../images/shell.png";
imgShell.className = "imgLangage";

langage.appendChild(imgPython);
langage.appendChild(document.createTextNode(" Python"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgC);
langage.appendChild(document.createTextNode(" C"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgJava);
langage.appendChild(document.createTextNode(" Java"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgJs);
langage.appendChild(document.createTextNode(" JavaScript"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgSql);
langage.appendChild(document.createTextNode(" SQL"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgHtmlCss);
langage.appendChild(document.createTextNode(" HTML/CSS"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgPhp);
langage.appendChild(document.createTextNode(" PHP"));
langage.appendChild(document.createElement("br"));
langage.appendChild(imgShell);
langage.appendChild(document.createTextNode(" Shell Script"));
langage.appendChild(document.createElement("br"));

var j = 0;
rigthabout.addEventListener("click", () => {
    j++;
    if (j >= 2) {
        j = 0;
    }
    switch (j) {
        case 0:
            div.replaceChild(presentation, document.getElementById("paboutme"));
            break;
        case 1:
            div.replaceChild(langage, document.getElementById("paboutme"));
            break;
        default:
            break;
    }
});
leftabout.addEventListener("click", () => {
    j--;
    if (j < 0) {
        j = 1;
    }
    switch (j) {
        case 0:
            div.replaceChild(presentation, document.getElementById("paboutme"));
            break;
        case 1:
            div.replaceChild(langage, document.getElementById("paboutme"));
            break;
        default:
            break;
    }
});

// Projet
const projectimg = document.getElementById("projectimg");
const explication = document.getElementById("explication projets");

/* projects */
const listprojects = ["siam", "spaceinvaders", "sokoban", "arbredecision"];
var i = 0;

const btnright = document.getElementById("btnright");
btnright.addEventListener("click", () => {
    i++;
    if (i >= listprojects.length) {
        i = 0;
    }
    getProject();
});

const btnleft = document.getElementById("btnleft");
btnleft.addEventListener("click", () => {
    i--;
    if (i < 0) {
        i = listprojects.length - 1;
    }
    getProject();
});

/* SIAM */
const titleSiam = "Siam";
const siamlink = "projects/SIAM/Vue/html/index.html";
const siamImg = "images/siam.png";
const siamExplication =
    "Le but du projet etait de recréer le jeu siam en html. Le jeu se déroule uniquement en local. Si vous voulez y jouer, il faut simplement cliquer sur l'image. PS : clique gauche pour selectionner un pion et clic droit pour le poser.";

/* Space Invaders */
const titleSpaceInvaders = "Space Invaders";
const spaceinvadersImg = "images/space.png";
const spaceinvadersExplication =
    "Le but du projet etait de recréer le jeu space invaders en c. Le jeu devais avoir une interface graphique (avec sdl3) et une interface console (avec ncurses). Ce projet est encore en cours de développement. Le code sera partagé une fois le projet terminé.";

/* Sokoban */
const titleSokoban = "Sokoban";
const sokobanImg = "images/sokoban.png";
const sokobanExplication =
    "Le but du projet etait de recréer le jeu sokoban en java. Le jeu devais avoir une interface graphique et une interface console. Si vous voulez y jouer le jeu est juste en dessous.";

/* Arbre de décision */
const titleArbreDecision = "Classification avec arbre de décision";
const arbredecisionImg = "images/classification.png";
const arbredecisionExplication =
    "Le but du projet etait de créer un programme en python qui permet de classifier des données en utilisant un arbre de décision. Le code ci-dessous.";

function getProject() {
    const projectactu = document.getElementById("projectactu");
    projectactu.style.opacity = 0;
    setTimeout(() => {
        clearProject();
        const titleprojects = document.createElement("h3");
        const imgprojects = document.createElement("img");
        const explication = document.createElement("p");
        if (listprojects[i] === "siam") {
            const lienimg = document.createElement("a");
            lienimg.href = siamlink;
            lienimg.target = "_blank";
            imgprojects.src = siamImg;
            lienimg.appendChild(imgprojects);
            explication.innerText = siamExplication;
            titleprojects.innerText = titleSiam;
            projectactu.appendChild(titleprojects);
            projectactu.appendChild(lienimg);
            projectactu.appendChild(explication);
        } else if (listprojects[i] === "spaceinvaders") {
            imgprojects.src = spaceinvadersImg;
            explication.innerText = spaceinvadersExplication;
            titleprojects.innerText = titleSpaceInvaders;
            projectactu.appendChild(titleprojects);
            projectactu.appendChild(imgprojects);
            projectactu.appendChild(explication);
        } else if (listprojects[i] === "sokoban") {
            imgprojects.src = sokobanImg;
            explication.innerText = sokobanExplication;
            titleprojects.innerText = titleSokoban;
            projectactu.appendChild(titleprojects);
            projectactu.appendChild(imgprojects);
            projectactu.appendChild(explication);
            explication.appendChild(document.createElement("br"));
            const lienjeu1 = document.createElement("a");
            lienjeu1.href = "projects/sokoban/sokoban.jar";
            lienjeu1.innerText = "Télécharger la version graphique";
            lienjeu1.download = "sokoban.jar";
            explication.appendChild(lienjeu1);
            explication.appendChild(document.createElement("br"));
            const lienjeu2 = document.createElement("a");
            lienjeu2.href = "projects/sokoban/sokobanTexte.jar";
            lienjeu2.innerText = "Télécharger la version texte";
            lienjeu2.download = "sokobanTexte.jar";
            explication.appendChild(lienjeu2);
        } else if (listprojects[i] === "arbredecision") {
            imgprojects.src = arbredecisionImg;
            explication.innerText = arbredecisionExplication;
            titleprojects.innerText = titleArbreDecision;
            explication.appendChild(document.createElement("br"));
            const lien = document.createElement("a");
            lien.href = "projects/classification/arbre_decision.zip";
            lien.innerText = "Télécharger le code";
            lien.download = "arbre_decision.zip";
            explication.appendChild(lien);
            projectactu.appendChild(titleprojects);
            projectactu.appendChild(imgprojects);
            projectactu.appendChild(explication);
        }
        projectactu.style.opacity = 1;
    }, 150);
}

function clearProject() {
    const projectactu = document.getElementById("projectactu");
    while (projectactu.firstChild) {
        projectactu.removeChild(projectactu.firstChild);
    }
}

getProject();

const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
emailInput.value = "";
messageInput.value = "";
