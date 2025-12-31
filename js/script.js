const btn = document.getElementById("navbutton");
const nav = document.getElementById("nav");
btn.addEventListener("click", () => {
    nav.classList.toggle("open");
});

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
    clearProject();
    const projectactu = document.getElementById("projectactu");
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
}

function clearProject() {
    const projectactu = document.getElementById("projectactu");
    while (projectactu.firstChild) {
        projectactu.removeChild(projectactu.firstChild);
    }
}

getProject();
