import Pion from "../Modele/PION.js";
import Plateau from "../Modele/Plateau.js";
import Vue from "../Vue/JS/Vue.js";

/** Classe gérant le controlleur du jeu SIAM
 * Le controlleur permet de faire le lien entre la partie visuel du jeu et les données du jeu
*/
export default class Controlleur {
    
    /** Contructeur de la classe Controlleur
     * @param {Plateau} plateau - La partie qui gère plateau de jeu (soit les données)
     * @param {Vue} vue - La partie qui gère le visuel du jeu
     */
    constructor(plateau, vue) {
        this.plateau = plateau;
        this.vue = vue;
    }

    /** Getteurs de la classe Controlleur */

    /** Retourne le plateau du jeu
     * @returns {Plateau}
     */
    get gPlateau() {
        return this.plateau;
    }

    /** Retourne la vue du jeu
     * @returns {Vue}
     */
    get gVue() {
        return this.vue;
    }

    /** Methodes de la classe Controlleur */

    /** Selectionne la case sur laquelle on a cliqué
     * 
     * @param {HTMLButtonElement} button - Le bouton associé au pion
     * @param {Pion} pion - Le pion du plateau
     */
    selectionnerCase(event) {
        let button = event.target;
        /* On oublie l'ancien pion selectionné */
        if (this.vue.gButtonSelected !== undefined) {
            this.vue.gButtonSelected.classList.remove("selected");
            this.vue.gButtonSelected.classList.add("selectable");
        }

        /* On ajoute le nouveau pion slectionné */
        let id = button.id;
        let pion;
        if(id.includes("E")){
            pion = this.plateau.gLPionE[Number(id[0])];
        } else if (id.includes("R")) {
            pion = this.plateau.gLPionR[Number(id[0])];
        } else {
            pion = this.plateau.getCase(Number(id[0]),Number(id[1]));
        }
        console.log(pion);
        this.plateau.sPionSelectionner = pion;
        this.vue.sButtonSelected = button;
        button.classList.remove("selectable");
        button.classList.add("selected");
    }

    /** Fait entrer un pion de la reserve sur le plateau
     * @param {Event} event - L'evènement qui a déclenché cette méthode. 
     * @param {HTMLButtonElement} selectedButton - Le bouton de la reserve qui est selectionné
     */
    entreePion(y,x, equipe, num, direction) {
        let action = this.plateau.entreePion(y, x, equipe, num, direction); 
        if (this.plateau.gagnant !== undefined){
            this.vue.fin();
        }
        return action;
    }

    deplacerPion(yD, xD, yA, xA){
        let action = this.plateau.deplacerPion(yD,xD,yA,xA);
        if (this.plateau.gagnant !== undefined){
            this.vue.fin();
        }
        return action;
    }

    gVoisins(y,x) {
        return this.plateau.voisin(y,x);
    }

    sortirPion(y,x){
        this.plateau.sortirPion(y,x);
    }

    changerOrientation(y,x, orientation) {
        this.plateau.changerOrientation(y,x, orientation);
    }

    main(){
        this.vue.actualiserVue();
        this.vue.ajoutSelection();
        this.vue.switchSelection();
    }

}
