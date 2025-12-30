import Pion from "./PION.js";

/** Classe gérant le plateau de jeu */
export default class Plateau {
    /** Constructeur de la classe Plateau
     * @param {Number} nbColonnes - Un entier donnant le nombre de colonnes du plateau
     * @param {Number} nbLignes - Un entier donnant le nombre de lignes du plateau
     * @param {Number} pionParJoueur - Un entier donnant le nombre de pions que possède chaque joueurs.
     */
    // Je te propose de voir le plateau comme une liste de liste, où chaque case représente un pion (soit undefined, soit un pion qui est un rochet ou un éléphant ou rhinocéros)
    constructor(nbLignes, nbColonnes, pionParJoueur) {
        this.plateau = [];
        this.nbLignes = nbLignes;
        this.nbColonnes = nbColonnes;
        this.pionParJoueur = pionParJoueur;
        this.pionSelectionner = undefined;
        this.gagnant;
        /* Initialisation du plateau avec des pions vides*/
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            let l = [];
            for (let c = 0; c < this.nbColonnes; c++) {
                l.push(undefined);
            }
            this.plateau.push(l);
        }

        /* Ajout des rochers au centre du plateau */
        var lMilieu = Math.floor(this.nbLignes / 2);
        var cMilieu = Math.floor(this.nbColonnes / 2);
        for (let c = -1; c < 2; c++) {
            this.poserPion(
                lMilieu,
                cMilieu + c,
                new Pion(
                    "rochet",
                    "../images/rocher/rocher" + (c + 2).toString() + ".png",
                    lMilieu,
                    cMilieu + c,
                    c + 1
                )
            );
        }
        /* Ajout des pions qui ne sont pas posé. */
        this.lPionsR = [];
        this.lPionsE = [];

        for (let p = 0; p < this.pionParJoueur; p++) {
            this.lPionsR.push(
                new Pion(
                    "rhinoceros",
                    "../images/rinho/rinho" + (p + 1).toString() + ".png",
                    -1,
                    -1,
                    2
                )
            );
        }

        for (let p = 0; p < this.pionParJoueur; p++) {
            this.lPionsE.push(
                new Pion(
                    "elephant",
                    "../images/elephant/elephant" + (p + 1).toString() + ".png",
                    -1,
                    -1,
                    0
                )
            );
        }
    }

    /* Getter */

    /** Retourne la liste du plateau
     * @returns {Pion[][]}
     */
    get gPlateau() {
        return this.plateau;
    }

    /** Retourne le pion selectionner
     * @returns {Pion}
     */
    get gPionSelectionner() {
        return this.pionSelectionner;
    }

    /** Retourne la liste des pions non posé des rhinocéros
     * @returns {Pion[]}
     */
    get gLPionR() {
        return this.lPionsR;
    }

    /** Retourne la liste des pions non posé des elephant
     * @returns {Pion[]}
     */
    get gLPionE() {
        return this.lPionsE;
    }

    /** Retourne le nombre de ligne du plateau
     * @returns {Number}
     */
    get gNbLignes() {
        return this.nbLignes;
    }

    /** Retourne le nombre de colonnes du plateau
     * @returns {Number}
     */
    get gNbColonnes() {
        return this.nbColonnes;
    }

    /* Setter */
    /** Permet d'initialiser un plateau
     * @param {Pion[][]} p
     */
    set sPlateau(p) {
        this.plateau = p;
    }

    /** Retourne le pion selectionner
     * @param {Pion} p
     */
    set sPionSelectionner(p) {
        this.pionSelectionner = p;
    }

    /* Methods */
    /** Récupère la case aux coordonnées (y,x)
     * @param {Number} y - Un entier correspondant à la ligne du plateau
     * @param {Number} x - Un entier correspondant à la colonne du plateau
     * @returns {Pion | undefined}
     */
    getCase(y, x) {
        return this.plateau[y][x];
    }

    /** Renvoie vrai si la case aux coordonnées (y,x) est vide
     * @param {Number} y - Un entier correspondant à la ligne du plateau
     * @param {Number} x - Un entier correspondant à la colonne du plateau
     * @returns {Boolean} - True si il y a un Pion, False si undefined
     */
    estVide(y, x) {
        return this.getCase(y, x) !== undefined;
    }

    /** Enleve un pion à la ligne y et à la colonne x et le renvoie.
     * @param {Number} y - Un entier correspondant à la ligne du plateau
     * @param {Number} x - Un entier correspondant à la colonne du plateau
     * @returns {Pion}
     */
    enleverPion(y, x) {
        var pion = this.plateau[y][x];
        this.plateau[y][x] = undefined;
        return pion;
    }

    /** Pose un pion à la case aux coordonnées (y,x).
     * @param {Number} y - Un entier correspondant à la ligne du plateau
     * @param {Number} x - Un entier correspondant à la colonne du plateau
     * @param {Pion} pion - Le pion a poser
     */
    poserPion(y, x, pion) {
        this.plateau[y][x] = pion;
    }

    /** décale les case
     * @param {Number} y - ligne du plateau
     * @param {Number} x - colonne du plateau
     * @param {Number} orientation - orientation du Pion
     * @return {undefined | Boolean}
     */
    decaler(y, x, orientation) {
        var save;
        var depart;
        if (orientation === 0) {
            /* Si on doit décaler de 1 vers le haut */
            /* On regarde jusqu'où on doit décaler */
            depart = y;
            while (this.plateau[depart][x] !== undefined && depart > 0) {
                depart--;
            }
            /* On decale */
            save = this.plateau[depart][x];
            for (var i = depart; i < y; i++) {
                this.plateau[i][x] = this.plateau[i + 1][x];
            }
            this.plateau[y][x] = undefined;
        } else if (orientation === 1) {
            /* Si on doit décaler de 1 vers la droite */
            /* On regarde jusqu'où on doit décaler */
            depart = x;
            while (
                this.plateau[y][depart] !== undefined &&
                depart < this.nbColonnes - 1
            ) {
                depart++;
            }
            /* On decale */
            save = this.plateau[y][depart];
            for (var i = depart; i >= x; i--) {
                this.plateau[y][i] = this.plateau[y][i - 1];
            }
        } else if (orientation === 2) {
            /* Si on doit décaler de 1 vers le bas */
            /* On regarde jusqu'où on doit décaler */
            depart = y;
            while (
                this.plateau[depart][x] !== undefined &&
                depart < this.nbLignes - 1
            ) {
                depart++;
            }
            /* On decale */
            save = this.plateau[depart][x];
            for (var i = depart; i > y; i--) {
                this.plateau[i][x] = this.plateau[i - 1][x];
            }
            this.plateau[y][x] = undefined;
        } else if (orientation === 3) {
            /* Si on doit décaler de 1 vers la gauche */
            /* On regarde jusqu'où on doit décaler */
            depart = x;
            while (this.plateau[y][depart] !== undefined && depart > 0) {
                depart--;
            }
            /* On decale */
            save = this.plateau[y][depart];
            for (var i = depart; i <= x; i++) {
                this.plateau[y][i] = this.plateau[y][i + 1];
            }
        }
        if (!(save === undefined)) {
            if (save.gName === "elephant") {
                this.lPionsE.push(save);
                return false;
            }
            if (save.gName === "rhinoceros") {
                this.lPionsR.push(save);
                return false;
            }
            if (save.gName === "rochet") {
                this.gagnant = this.quiGagnant(y, x, orientation);
                alert("Les " + this.gagnant + " sont les plus fort !");
                return true;
            }
        }
    }

    /** retourne le nom du gagnant
     * @param {Number} y - ligne du plateau
     * @param {Number} x - colonne du plateau
     * @param {Number} orientation - orinetation du pion qui a pousser un rochet en dehors du plateau
     * @return {String}
     */
    quiGagnant(y, x, orientation) {
        var depart;
        if (orientation === 0) {
            depart = 0;
            while (
                this.plateau[depart][x] === undefined ||
                this.plateau[depart][x].gOrientation != orientation
            ) {
                depart++;
            }
            return this.plateau[depart][x].gName;
        } else if (orientation === 1) {
            depart = this.nbColonnes - 1;
            while (
                this.plateau[y][depart] === undefined ||
                this.plateau[y][depart].gOrientation != orientation
            ) {
                depart--;
            }
            return this.plateau[y][depart].gName;
        } else if (orientation === 2) {
            depart = this.nbLignes - 1;
            while (
                this.plateau[depart][x] === undefined ||
                this.plateau[depart][x].gOrientation != orientation
            ) {
                depart--;
            }
            return this.plateau[depart][x].gName;
        } else if (orientation === 3) {
            depart = 0;
            while (
                this.plateau[y][depart] === undefined ||
                this.plateau[y][depart].gOrientation != orientation
            ) {
                depart++;
            }
            return this.plateau[y][depart].gName;
        }
    }

    /** Déplace un pion de la case(yD, xD) vers la case(yA,xA)
     * @param {Number} yD - La ligne de départ
     * @param {Number} xD - La colonne de départ
     * @param {Number} yA - La ligne d'arrivée
     * @param {Number} xA - La colonne d'arrivée
     */
    deplacerPion(yD, xD, yA, xA) {
        if (!this.deplacementEstPossible([yD, xD], [yA, xA])) {
            return 0;
        } else {
            if (this.plateau[yA][xA] === undefined) {
                var pion = this.enleverPion(yD, xD);
                this.poserPion(yA, xA, pion);
                return 1;
            } else {
                this.decaler(yD, xD, this.plateau[yD][xD].gOrientation);
                return 2;
            }
        }
    }

    /** Renvoie true si la partie est terminé (si le nombre de rocher est inferieur au nbr de rocher de base cad 3)
     * @returns {Boolean}
     */
    estFini() {
        var cpt = 0;
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                if (
                    this.plateau[ligne][colonne] != undefined &&
                    this.plateau[ligne][colonne].gName === "rochet"
                ) {
                    cpt++;
                }
            }
        }
        if (cpt < 3) {
            return true;
        }
        return false;
    }

    /** Renvoie les coordonnées du voisin direct (voisin vers l'orientation) de la case a l'endroit y,x
     * @param {Number} y - lignes de la case
     * @param {Number} x - colonne de la case
     * @return {Number[]} list sous forme [y,x]
     */
    voisinDirect(y, x) {
        var lvoisinDirect = [];
        if (this.plateau[y][x].gOrientation === 0 && y - 1 >= 0) {
            lvoisinDirect.push(y - 1, x);
        }
        if (this.plateau[y][x].gOrientation === 1 && x + 1 < this.nbColonnes) {
            lvoisinDirect.push(y, x + 1);
        }
        if (this.plateau[y][x].gOrientation === 2 && y + 1 < this.nbLignes) {
            lvoisinDirect.push(y + 1, x);
        }
        if (this.plateau[y][x].gOrientation === 3 && x - 1 >= 0) {
            lvoisinDirect.push(y, x - 1);
        }
        return lvoisinDirect;
    }

    /** Renvoie la liste des case voisine de Case
     * @param {Number} y - lignes de la case
     * @param {Number} x - colonnes de la case
     * @returns {Number[][]} Liste des voisin de caseA sous forme [y,x]
     */
    voisin(y, x) {
        var lvoisin = [];
        if (y - 1 >= 0) {
            lvoisin.push([y - 1, x]);
        }
        if (x - 1 >= 0) {
            lvoisin.push([y, x - 1]);
        }
        if (x + 1 < this.plateau[0].length) {
            lvoisin.push([y, x + 1]);
        }
        if (y + 1 < this.plateau.length) {
            lvoisin.push([y + 1, x]);
        }
        return lvoisin;
    }

    /** Permet de calculer la force ainsi que la force opposé
     * @param {Number} y- ligne de la case
     * @param {Number} x- colonne de la case
     * @return {Boolean}
     */
    calculeForce(y, x, orientation, entree) {
        var forceOpp = 0;
        var force = entree ? 1 : 0;
        var forceRochet = 0;
        if (orientation === 0) {
            for (var i = y; i >= 0 && this.plateau[i][x] != undefined; i--) {
                if (!(this.plateau[i][x].gName === "rochet")) {
                    if (this.plateau[i][x].gOrientation === 0) {
                        force++;
                    }
                    if (this.plateau[i][x].gOrientation === 2) {
                        forceOpp++;
                    }
                } else {
                    forceRochet++;
                }
                if (forceOpp === force || forceRochet + forceOpp > force) {
                    return [force, forceOpp, forceRochet];
                }
            }
        }
        if (orientation === 1) {
            for (
                var i = x;
                i < this.nbColonnes && this.plateau[y][i] != undefined;
                i++
            ) {
                if (!(this.plateau[y][i].gName === "rochet")) {
                    if (this.plateau[y][i].gOrientation === 1) {
                        force++;
                    }
                    if (this.plateau[y][i].gOrientation === 3) {
                        forceOpp++;
                    }
                } else {
                    forceRochet++;
                }
                if (forceOpp === force || forceRochet + forceOpp > force) {
                    return [force, forceOpp, forceRochet];
                }
            }
        }
        if (orientation === 2) {
            for (
                var i = y;
                i < this.nbLignes && this.plateau[i][x] != undefined;
                i++
            ) {
                if (!(this.plateau[i][x].gName === "rochet")) {
                    if (this.plateau[i][x].gOrientation === 2) {
                        force++;
                    }
                    if (this.plateau[i][x].gOrientation === 0) {
                        forceOpp++;
                    }
                } else {
                    forceRochet++;
                }
                if (forceOpp === force || forceRochet + forceOpp > force) {
                    return [force, forceOpp, forceRochet];
                }
            }
        }
        if (orientation === 3) {
            for (var i = x; i >= 0 && this.plateau[y][i] != undefined; i--) {
                if (!(this.plateau[y][i].gName === "rochet")) {
                    if (this.plateau[y][i].gOrientation === 3) {
                        force++;
                    }
                    if (this.plateau[y][i].gOrientation === 1) {
                        forceOpp++;
                    }
                } else {
                    forceRochet++;
                }
                if (forceOpp === force || forceRochet + forceOpp > force) {
                    return [force, forceOpp, forceRochet];
                }
            }
        }
        console.log(force, forceOpp, forceRochet);
        return [force, forceOpp, forceRochet];
    }

    /** Renvoie True si le déplacement entre caseA et caseB est possible
     * @param {Number[]} caseA - coordonée de la case A sous forme [y,x]
     * @param {Number[]} caseB - coordonée de la case B sous forme [y,x]
     * @return {Boolean}
     */
    deplacementEstPossible(caseA, caseB) {
        var lvoisin = this.voisin(caseA[0], caseA[1]);
        var lvoisinDirect = this.voisinDirect(caseA[0], caseA[1]);
        var test = false;

        if (this.plateau[caseB[0]][caseB[1]] === undefined) {
            for (var i of lvoisin) {
                if (i[0] === caseB[0] && i[1] === caseB[1]) {
                    return true;
                }
            }
        } else {
            if (
                lvoisinDirect[0] === caseB[0] &&
                lvoisinDirect[1] === caseB[1]
            ) {
                test = true;
            }
        }
        if (test === false) {
            return false;
        }
        var force = this.calculeForce(
            caseA[0],
            caseA[1],
            this.plateau[caseA[0]][caseA[1]].gOrientation
        );
        return force[1] < force[0] && force[0] - force[1] >= force[2];
    }

    /** Pose un pion de la réserve sur le plateau
     * @param {String} equipe - L'équipe qui va poser le pion
     * @param {Number} numReserve - Le numéro du pion dans la réserve
     * @param {Number} y - La ligne du plateau sur laquelle on pose le pion
     * @param {Number} x - La colonne du plateau sur laquelle on pose le pion
     */
    entreePion(y, x, equipe, numReserve, orientation) {
        /* Récupération du pion */
        if (equipe === "rhinoceros") {
            var pion = this.lPionsR[numReserve];
        } else {
            var pion = this.lPionsE[numReserve];
        }
        if (this.plateau[y][x] === undefined) {
            /* Si la case est vide on pose le pion */
            this.poserPion(y, x, pion);
            this.retirerReserve(equipe, numReserve);
            return 1;
        } else {
            /* Sinon on regarde si une entrée en poussant est possible */
            if (orientation === undefined) {
                orientation = pion.gOrientation;
                if (x == 1 || x == 3) {
                    if (y == 0) {
                        orientation = 2;
                    } else {
                        orientation = 0;
                    }
                } else if ([1, 2, 3].includes(y)) {
                    if (x == 0) {
                        orientation = 1;
                    } else {
                        orientation = 3;
                    }
                }
            }

            var force = this.calculeForce(y, x, orientation, true);
            if (force[1] < force[0] && force[0] - force[1] >= force[2]) {
                pion.sOrientation = orientation;
                this.decaler(y, x, pion.gOrientation);
                this.poserPion(y, x, pion);
                this.retirerReserve(equipe, numReserve);
                return 2;
            } else {
                alert("Entrée en poussant impossible");
            }
        }
    }

    /** Sort un pion du plateau et le mets dans la reserve */
    sortirPion(y, x) {
        let pion = this.plateau[y][x];
        if (pion.gName === "rhinoceros") {
            this.lPionsR.push(pion);
            this.plateau[y][x] = undefined;
        } else if (pion.gName === "elephant") {
            this.lPionsE.push(pion);
            this.plateau[y][x] = undefined;
        }
    }

    /** Retire le pion voulu de la reserve
     * @param {String} equipe - L'équipe à laquelle on veut retirer le pion
     * @param {Number} numReserve - Le numéro du pion dans la reserve
     */
    retirerReserve(equipe, numReserve) {
        /* Suppression du pion dans la reserve */
        if (equipe === "rhinoceros") {
            this.lPionsR.splice(numReserve, 1);
        } else {
            this.lPionsE.splice(numReserve, 1);
        }
    }

    changerOrientation(y, x, orientation) {
        this.plateau[y][x].sOrientation = orientation;
    }

    /** Retourne le nom du gagnant
     *
     */

    /** Renvoie la représentation textuelle du plateau
     * @returns {String}
     */
    toString() {
        var res = "";
        for (let ligne = 0; ligne < this.nbLignes; ligne++) {
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                res += "---";
            }
            res += "-\n";
            for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
                var stringPion = "";
                if (this.plateau[ligne][colonne] === undefined) {
                    stringPion = "  ";
                } else {
                    stringPion = this.plateau[ligne][colonne].toString();
                }
                res += "|" + stringPion;
            }
            res += "|\n";
        }
        for (let colonne = 0; colonne < this.nbColonnes; colonne++) {
            res += "---";
        }
        res += "-\n";
        return res;
    }
}
