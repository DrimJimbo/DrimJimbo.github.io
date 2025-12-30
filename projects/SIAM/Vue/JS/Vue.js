import Pion from "../../Modele/PION.js";
import Controlleur from "../../Controlleur/Controlleur.js";
import Plateau from "../../Modele/Plateau.js";

/* Classe gérant la Vue du jeu */
export default class Vue {
    /** Constucteur de la classe Vue
     * @param {HTMLElement} doc - Le document de la page html 
     */
    constructor(doc) {
        this.doc = doc;
        this.controlleur = undefined;
        this.buttonSelected;
        this.entreAfficher = false;
        this.fini = false;        

        this.selectionPossible = false;
        this.selectionEquipe = "rhinoceros";

        this.buttonDepPossible = []; /* Les boutons où un déplacement est possible. */

        this.sortieActivee = false;
        let button = this.doc.getElementById("bSortie");
        button.addEventListener("click", () => {this.sortirPion();}, false);
        button.style.display = "none";

        this.orientationActivee = false;
        let lButton = this.doc.getElementsByClassName("bOrientation");
        for (let button of lButton){
            button.style.display = "none";
            button.addEventListener("click", (event) => {this.changerOrientation(event);}, false);
        } 

        lButton = this.doc.getElementsByClassName("entreeCoin");
        for (let button of lButton){
            button.style.display = "none";
            button.addEventListener("click", (event) => {this.entreePion(event);}, false);
        }
    }

    /* Getteurs */

    /** Retourne le document de la page
     * @returns {HTMLElement}
     */
    get gDoc() {
        return this.doc;
    }

    /** Retourne le boutton selectionné
     * @returns {HTMLButtonElement|undefined} - Le bouton selectionné
     */
    get gButtonSelected() {
        return this.buttonSelected;
    }

    /* Setteurs */
    /** Change le controlleur du jeu
     * 
     * @param {Controlleur} controlleur - Le controlleur du jeu
     */
    set sControlleur(controlleur) {
        this.controlleur = controlleur;
    }

    /** Change le bouton slectionné
     * 
     * @param {Controlleur} button - le nouveau bouton selectionné
     */
    set sButtonSelected(button){
        this.buttonSelected = button;
    }

    switchSelectionEquipe() {
        this.selectionEquipe = this.selectionEquipe === "rhinoceros" ? "elephant" : "rhinoceros";
    }

    /* Méthodes de la classe Vue */
    /** Récupère un bouton du DOM appartenant au plateau du jeu et le renvoie
     * Le bouton correspond à une case du plateau à la ligne y et à la colonne x
     * 
     * @param {Number} y - La ligne du plateau
     * @param {Number} x - La colonne du plateau
     * @returns {HTMLButtonElement} - Le bouton correspondant à la case
     */
    getButton(y,x){
        return this.doc.getElementById(y.toString().concat(x.toString()));
    }
    
    /** Récupère la liste de button de la réserve d'une équipe
     * @param {String} [equipe = "rhinoceros" | "elephant"] - L'équipe dont on souhaite la réserve
     * @returns {HTMLButtonElement[]} - La liste des boutons de la réserve
    */
    getButtonReserve(equipe) {
        var lButton = this.doc.getElementsByClassName("pionSortie");
        switch(equipe) {
            case "elephant":
                return lButton[1].childNodes;
            default:
                return lButton[0].childNodes;
        }
    }


    /** Actualise l'apparence de la case à la ligne y et la colonne x
     * Si le pion n'est pas passé en paramètre, la case est considéré comme vide.
     * @param {HTMLButtonElement} button - Le bouton correspondant à la case
     * @param {Pion | undefined} [pion = undefined] - Le pion correspondant à la case
     */
    actualiserCase(button, pion) {
        var rotation;
        if (pion !== undefined){
            button.style.backgroundImage = "url(" + pion.gImg + ")";
            switch (pion.gOrientation) {
                case 1:
                    rotation = 90;
                    break;
                case 2:
                    rotation = 180;
                    break;
                case 3:
                    rotation = -90;
                    break;
                default:
                    rotation = 0;
                    break;
            }
            button.style.transform = "rotate(" + rotation.toString()+"deg)";
        } else {
            button.style.backgroundImage = "none";
            button.style.transform = "rotate(0deg)";
        }
    }

    /** Actualise la réserve de Pion du joueur
     * @param {Pion[]} lReserve - La liste de pion non joué du joueur
     * @param {String} equipe - La chaine de caractère correspondant à l'équipe, soit "elephant" soit "rhinoceros"   
     */
    actualiserReserve(lReserve, equipe) {
        var lButton = this.getButtonReserve(equipe);
        if (lReserve.length > 0){
            /**Actualiser les pions encore présents */
            for (let p = 0; p < lReserve.length; p++) {
                this.actualiserCase(lButton[p],lReserve[p]);
            }
    
            /**Actualise les cases vides, utile quand on retire un pion de la réserve par exemple. */
            for (let p = lReserve.length-1; p < lButton.length; p++) {
                this.actualiserCase(lButton[p],lReserve[p]);
            }
        } else {
            for (let p = 0; p < lButton.length; p++) {
                this.actualiserCase(lButton[p],lReserve[p]);
            }
        }

    }

    /** Actualise toutes les cases du plateau.*/
    actualiserPlateau(plateau) {
        for (let l = 0; l < plateau.length; l++) {
            for(let c = 0; c < plateau[0].length; c++){
                /* Si on a une case sans pion mais qui a une image de fond */
                var button = this.getButton(l,c);
                if(plateau[l][c] === undefined && button.style.backgroundImage !== "none"){
                    this.actualiserCase(button);
                } else if (plateau[l][c] !== undefined){ /* Si on a un pion */
                    this.actualiserCase(button, plateau[l][c]);
                }
            }          
        }
    }

    /** Ajoute les evenements de selection sur tous les plateau du jeu */
    ajoutSelection() {
        
        /* La fonction a ajouter dans la gestion d'évènement */
        let fct = (event) => {
            this.selectionner(event);
            this.afficherDeplacement(event);
        }

        let fctEntree = (event) => {
            event.preventDefault();
            this.deplacerPion(event);
        }

        /* Ajout des evenement sur les boutons des reserves. */
        var lButtonReserve = this.doc.getElementsByClassName("pionSortie");
        for (let i = 0; i < lButtonReserve.length; i++){
            var lButtonReserveEquipe = lButtonReserve[i].childNodes;
            for (let button of lButtonReserveEquipe) {
                button.addEventListener("click", fct, false);
            }
        }

        /* Ajout des evenement sur les boutons du plateau. */
        let buttonPlateau = this.doc.getElementsByClassName("ligne");
        for (let ligne = 0; ligne < buttonPlateau.length; ligne++){
            let lButton = buttonPlateau[ligne].childNodes;
            for (let button of lButton){
                button.addEventListener("click", fct, false);
                button.addEventListener("contextmenu", fctEntree, false);
            }
        }
    }

    /** Récupère l'équipe à laquelle appartient le bouton passé en paramètre.
     * 
     * @param {HTMLButtonElement} button - Le bouton pour lequel on veut connaitre l'équipe.
     * @returns {String} - L'équipe à laquelle appartient le pion/bouton.
     */
    getEquipe(button){
        let url = button.style.backgroundImage;
        if (url === "none") {
            return "none";
        } else if (url.includes("rinho")) {
            return "rhinoceros";
        } else if (url.includes("elephant")){
            return "elephant";
        } else {
            return "rochet";
        }
    }

    /** Selectionne une case que si la selection pour tel equipe est activée. 
     * @param {Event} event L'évènement qui à déclenché cette méthode.
    */
    selectionner(event) {
        let button = event.target;
        if (this.selectionPossible && this.selectionEquipe === this.getEquipe(button)) {
            if(this.buttonSelected !== undefined){this.buttonSelected.classList.remove("selected");}
            this.buttonSelected = button;
            button.classList.add("selected");
        }
    }

    reinitSelectionner() {
        this.buttonSelected.classList.remove("selected");
        this.buttonSelected = undefined;
    }

    /** Affiche/masque les pions que l'on peut selectionner */
    switchSelection() {
        /* Si la selection est possible alors on la desactive */
        if (this.selectionPossible) {
            this.selectionPossible = false;
            this.reinitDepPossible();
            if (this.sortieActivee) {this.switchButtonSortie();}
            if (this.entreAfficher){ this.entreAfficher = false;}
            this.reinitSelectionner();
            /* Suppresion de la classe de selection dans la reserve */
            let lButtonReserve = this.doc.getElementsByClassName("pionSortie");
            for (let i = 0; i < lButtonReserve.length; i++) {
                let lButtonReserveEquipe = lButtonReserve[i].childNodes;
                for (let button of lButtonReserveEquipe) {
                    if (this.possedeClass("selectable", button)){
                        button.classList.remove("selectable");
                    }
                }
            }

            let buttonPlateau = this.doc.getElementsByClassName("ligne");
            for (let ligne = 0; ligne < buttonPlateau.length; ligne++){
                let lButton = buttonPlateau[ligne].childNodes;
                for (let button of lButton){
                    if (this.possedeClass("selectable", button)){
                        button.classList.remove("selectable");
                    }
                }
            }   
        } else { 
            this.selectionPossible = true;           
            /* Ajout de la classe de selection dans la reserve */
            let lButtonReserve = this.doc.getElementsByClassName("pionSortie");
            for (let i = 0; i < lButtonReserve.length; i++) {
                let lButtonReserveEquipe = this.getButtonReserve(this.selectionEquipe);
                for (let button of lButtonReserveEquipe) {
                    button.classList.add("selectable");
                }
            }

            /* Ajout de la classe de selection dans le plateau */
            let buttonPlateau = this.doc.getElementsByClassName("ligne");
            for (let ligne = 0; ligne < buttonPlateau.length; ligne++){
                let lButton = buttonPlateau[ligne].childNodes;
                for (let button of lButton){
                    if (this.getEquipe(button) === this.selectionEquipe){
                        button.classList.add("selectable");
                    }
                }
            }
        }
    }

    /** Affiche les possibilités de déplacements pour le pion selectionné.
     * 
     * @param {Event} event L'évènement qui à déclenché la methode
     */
    afficherDeplacement(event){
        let button = event.target;
        if (this.buttonSelected === button){
            if ((this.estReserve(button) && !this.entreAfficher) || (!this.estReserve(button) && this.entreAfficher)){
                this.reinitDepPossible();
                this.switchEntree();
                if (this.sortieActivee){
                    this.switchButtonSortie();
                    this.switchOrientation();
                }
            }
            if (!this.estReserve(button)){
                this.reinitDepPossible()
                this.afficherDeplacementVoisins(button);
                let lVoisin = this.controlleur.gVoisins(Number(button.id[0]), Number(button.id[1]));
                if ((lVoisin.length < 4 && !this.sortieActivee) || (lVoisin.length === 4 && this.sortieActivee)){
                    this.switchButtonSortie();
                }
                if (!this.orientationActivee){
                    this.switchOrientation();
                }
            }


        }
    }

    /** Affiche les possibilités d'entree pour un pion selectionné en réserve */
    switchEntree(){
        let possibilitesEntree = [[0,1],[0,3],[1,0],[1,4],[2,0],[2,4],[3,0],[3,4],[4,1],[4,3]];
        let coinPlateau = [[0,0],[0,4],[4,0],[4,4]]
        let lBCoins = this.doc.getElementsByClassName("entreeCoin");
        if (this.entreAfficher){
            this.entreAfficher = false;
            for (let c of possibilitesEntree){
                let y = c[0];
                let x = c[1];
                let b = this.getButton(y,x);
                b.classList.remove("deplacementPossible");
            }

            for (let i = 0; i < coinPlateau.length; i++){
                let button = this.getButton(coinPlateau[i][0], coinPlateau[i][1]);
                button.classList.remove("deplacementPossibleNonCliquable");
                button.classList.remove("deplacementPossible");
                if (this.getEquipe(button) !== 'none'){
                    lBCoins[2*i].style.display = "none";
                    lBCoins[2*i+1].style.display = "none";
                }
            }

        } else {
            this.entreAfficher = true;
            for (let c of possibilitesEntree){
                let y = c[0];
                let x = c[1];
                let b = this.getButton(y,x);
                this.buttonDepPossible.push(b);
                b.classList.add("deplacementPossible");
            }
            
            for (let i = 0; i < coinPlateau.length; i++){
                let button = this.getButton(coinPlateau[i][0], coinPlateau[i][1]);
                if (this.getEquipe(button) !== 'none'){
                    lBCoins[2*i].style.display = "block";
                    lBCoins[2*i+1].style.display = "block";
                    this.buttonDepPossible.push(button);
                    button.classList.add("deplacementPossibleNonCliquable");
                } else {
                    this.buttonDepPossible.push(button);
                    button.classList.add("deplacementPossible");
                }
            }
        }
    }

    reinitDepPossible(){
        if (this.entreAfficher){
            this.switchEntree();
        } else {
            for (let b of this.buttonDepPossible){
                b.classList.remove("deplacementPossible");
            }
        }
    }

    afficherDeplacementVoisins(button){
        if (this.possedeClass("selected", button)){
            let y = Number(button.id[0]);
            let x = Number(button.id[1]);
            let lVoisin = this.controlleur.gVoisins(y,x);
            this.buttonDepPossible = [];
            for (let v of lVoisin){
                let b = this.getButton(v[0],v[1]);
                b.classList.add("deplacementPossible");
                this.buttonDepPossible.push(b);
            }
        }
    }

    switchButtonSortie(){
        if (this.possedeClass("selectable", this.buttonSelected)){
            if (this.sortieActivee){
                this.sortieActivee = false;
                let button = this.doc.getElementById("bSortie");
                button.style.display = "none";
            } else {
                this.sortieActivee = true;
                let button = this.doc.getElementById("bSortie");
                button.style.display = "block"; 
            }
        }
    }

    /** Affiche si le bouton fait partie des pion sorti ou non
     * 
     * @param {HTMLButtonElement} button - Le bouton en question.
     */
    estReserve(button) {
        let parentDiv = button.parentElement;
        return (!parentDiv.id.includes("y"));    
    }

    /** Verifie si une classe est parmi la liste des classes CSS d'un élément html.
     * 
     * @param {String} className - La classe CSS que l'on recherche
     * @param {HTMLElement} htmlElement - L'élément HTML pour lequel on veut connaitre la classe.
     * @returns 
     */
    possedeClass(className, htmlElement){
        let classList = htmlElement.classList;
        for (let c of classList){
            if (c === className){
                return true;
            }
        }
        return false;
    }

    deplacerPion(event) {
        let button = event.target;
        if (this.possedeClass("deplacementPossible", button)){
            if (this.estReserve(this.buttonSelected)) {
                var action = this.entreePion(event,this.buttonSelected);
                if (!this.fini){
                    if (action === 1){
                        event.target.classList.add("moved");
                        this.switchSelection();
                        this.buttonSelected = event.target;
                        this.switchOrientation();
                        this.actualiserVue();
                    } else if (action === 2){
                        this.switchSelection();
                        this.actualiserVue();
    
                        this.switchSelectionEquipe();
                        this.switchSelection();
                    }
                }

            } else {
                var action = this.controlleur.deplacerPion(Number(this.buttonSelected.id[0]), Number(this.buttonSelected.id[1]), Number(button.id[0]), Number(button.id[1]));
                if (action === 1){
                    event.target.classList.add("moved");
                    this.switchSelection();
                    this.buttonSelected = event.target;
                    this.actualiserVue();
                } else if (action === 2){
                    this.switchOrientation();
                    this.switchSelection();
                    this.actualiserVue();

                    this.switchSelectionEquipe();
                    this.switchSelection();
                }
            }
        }
    }

    entreePion(event) {
        if (this.possedeClass("entreeCoin", event.target)){
        let action = this.controlleur.entreePion(Number(event.target.id[1]), Number(event.target.id[2]), this.getEquipe(this.buttonSelected), Number(this.buttonSelected.id[0]), Number(event.target.value));
        this.switchSelection();
        this.actualiserVue();

        this.switchSelectionEquipe();
        this.switchSelection();
        return action;
        }
        return this.controlleur.entreePion(Number(event.target.id[0]), Number(event.target.id[1]), this.getEquipe(this.buttonSelected), Number(this.buttonSelected.id[0]));
    }

    sortirPion() {
        this.controlleur.sortirPion(Number(this.buttonSelected.id[0]), Number(this.buttonSelected.id[1]));
        this.switchOrientation();
        this.switchSelection();
        this.actualiserVue();
        
        this.switchSelectionEquipe();
        this.switchSelection();
    }

    /** Actualise la vue du plateau et des réserve des deux équipes
    */
    actualiserVue() {
        this.actualiserPlateau(this.controlleur.gPlateau.gPlateau);
        this.actualiserReserve(this.controlleur.gPlateau.gLPionE, "elephant");
        this.actualiserReserve(this.controlleur.gPlateau.gLPionR, "rhinoceros");
    }

    switchOrientation() {
        if (this.possedeClass("moved", this.buttonSelected) || this.possedeClass("selected", this.buttonSelected)){
            if (this.orientationActivee){
                this.orientationActivee = false;
                let lButton = this.doc.getElementsByClassName("bOrientation");
                for (let button of lButton){
                    button.style.display = "none";
                }
            } else {
                this.orientationActivee = true;
                let lButton = this.doc.getElementsByClassName("bOrientation");
                for (let button of lButton){
                    button.style.display = "block";
                }
            }
        }
    }

    changerOrientation(event) {
        this.controlleur.changerOrientation(Number(this.buttonSelected.id[0]), Number(this.buttonSelected.id[1]),Number(event.target.value));
        if (this.selectionPossible){
            this.switchOrientation();
            this.switchSelection();
        } else {
            this.switchOrientation();
            this.buttonSelected.classList.remove('moved');
        }
        this.switchSelectionEquipe();
        this.switchSelection();
        this.actualiserVue();
    }

    fin() {
        this.fini = true;
        if (this.selectionPossible){
            if (this.orientationActivee){this.switchOrientation();}
            this.switchSelection();
            this.actualiserVue();
        }
    }
}