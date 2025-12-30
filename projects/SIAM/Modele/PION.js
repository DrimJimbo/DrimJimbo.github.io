/*Classe gérant un pion du jeu*/

export default class Pion {
    /** Constructeur de la classe Pion
     * @param {String} name - L'équipe à laquelle appartient le pion soit "rochet" soit "rhinoceros" soit "elephant"
     * @param {String} img - Le chemin d'accès de l'image associé au Pion
     * @param {String} posX - La colonne du plateau sur laquelle le pion est posé (-1) si en réserve
     * @param {String} posY - La ligne du plateau sur laquelle le pion est posé (-1) si en réserve
     * @param {Number} orientation - L'orientation du Pion sur le plateau, 0 = haut, 1 = droite, 2 = bas, 3 = gauche
    */
    constructor(name, img, posX, posY, orientation) {
        this.name = name;
        this.img = img;
        this.posX = posX;
        this.posY = posY;
        this.orientation = orientation;
    }

    /* Getters */

    /** Retourne le nom du Pion
     * @returns {String}
     */
    get gName() {
        return this.name;
    }

    /** Retourne le chemin de image associé au Pion
     * @returns {String}
     */
    get gImg() {
        return this.img;
    }

    /** Retourne la colonne du Pion sur le plateau
     * @returns {Number}
     */
    get gPosX() {
        return this.posX;
    }

    /** Retourne la ligne du Pion sur le plateau
     * @returns {Number}
     */
    get gPosY() {
        return this.posY;
    }

    /** Retourne la position du Pion sur le plateau sous forme de liste [colonne, ligne]
     * @returns {Number[]}
     */
    get gPos() {
        return [this.posX, this.posY];
    }

    /** Retourne l'orientation du Pion
     * @returns {Number}
     */
    get gOrientation() {
        return this.orientation;
    }

    /*Setter*/

    /** Modifie le chemin de l'image associé au Pion
     * @param {String} img - Le chemin de l'image
     */
    set sImg(img) {
        this.img = img;
    }

    /** Modifie la colonne du Pion sur le plateau
     * @param {Number} posX
     */
    set sPosX(posX) {
        this.posX = posX;
    }

    /** Modifie la ligne du Pion sur le plateau
     * @param {Number} posY
     */
    set sPosY(posY) {
        this.posY = posY;
    }

    /** Modifie la ligne et la colonne du plateau
     * @param {Number[]} pos - Une liste contenant la nouvelle position de la colonne puis celle de la nouvelle ligne 
    */
    set sPos(pos) {
        /** Modifie la position X du Pion
         * List(Int) -> None
         */
        this.posX = pos[0];
        this.posY = pos[1];
    }

    /** Modifie l'orientation du Pion
     * @param {Number} orientation - L'orientation du Pion sur le plateau, 0 = haut, 1 = droite, 2 = bas, 3 = gauche
     */
    set sOrientation(orientation) {
        this.orientation = orientation;
    }


    /** Renvoie la représentation textuelle du pion 
     * @returns {String}
    */
    toString() {
        var res = "";
        switch (this.name) {
            case "elephant":
                res += "E";
                break;
            case "rhinoceros":
                res += "R";
                break;
            case "rochet":
                return "C "; //Pour cailloux
            default:
                return"  ";
        }

        switch (this.orientation) {
            case 0:
                return res + "H";
            case 1:
                return res + "D";
            case 2:
                return res + "B";
            default:
                return res + "G";
        }
    }
}

