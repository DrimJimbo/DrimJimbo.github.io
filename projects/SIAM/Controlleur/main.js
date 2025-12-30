import Pion from "../Modele/PION.js";
import Plateau from "../Modele/Plateau.js";
import Vue from "../Vue/JS/Vue.js";
import Controlleur from "./Controlleur.js";

/** Programme principal du Jeu */
function main() {
    var p = new Plateau(5,5,5);
    var v = new Vue(document);
    var c = new Controlleur(p,v);
    v.sControlleur = c;
    c.main();
}

addEventListener('DOMContentLoaded', main, false);