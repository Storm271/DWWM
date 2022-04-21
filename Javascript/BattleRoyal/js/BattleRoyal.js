//----------- OBJET -------------
//-------------------------COLOR
function colorLog(message, color) {
  switch (color) {
    case "mort":
      color = "#DB011C";
      break;
    case "gagne":
      color = "#0DD94E";
      break;
    case "vie":
      color = "#D9B00D";
      break;
    case "info":
      color = "#00D3FA";
      break;
    case "bot":
      color = "#B14BFA";
      break;
    default:
      color = "white";
      break;
  }
  console.log("%c" + message, "color: " + color);
}

// --------------FONCTION QUI DEFINI UN NOMBRE ALEATOIRE PAR RAPPORT AU TABLEAU-------------
const nbrJoueur = 3;
var nbrJoueurCreer = 0;

// --------------FONCTION QUI DEFINI UN NOMBRE ALEATOIRE PAR RAPPORT AU TABLEAU-------------

class personnage {
  constructor(_nom) {
    // ---------------FUNCTION POUR LES STATS ALEATOIRES--------------
    this.nombreAleatoire = function () {
      return Math.floor(Math.random() * (100 - 20 + 1) + 20);
    };
    // ---------------FUNCTION POUR LES STATS ALEATOIRES---------------

    // ------------- GET & SET ---------------------------------------
    // -----------------------------------------EXISTE
    var existe;
    this.getExiste = function () {
      return existe;
    };
    this.setExiste = function (_newexiste) {
      existe = _newexiste;
    };
    // ---------------------------------------NOM
    var nom = _nom;
    this.getNom = function () {
      return nom;
    };
    this.setNom = function (_newnom) {
      nom = _newnom;
    };
    if (nom != "") {
      this.setNom(nom);
      existe = true;
    }
    // ------------------------------VIE
    var vie = this.nombreAleatoire();

    this.getVie = function () {
      return vie;
    };
    this.setVie = function (_newvie) {
      vie = _newvie;
    };
    // ----------------------------------ATTAQUE
    var attaque = this.nombreAleatoire();

    this.getAttaque = function () {
      return attaque;
    };
    this.setAttaque = function (_newattaque) {
      attaque = _newattaque;
    };
    // ---------------------------------------DEFENSE
    var defense = this.nombreAleatoire();
    this.getDefense = function () {
      return defense;
    };
    this.setDefense = function (_newdefense) {
      defense = _newdefense;
    };
    // ------------- GET & SET ---------------------------------------

    if (this.getVie() > 0) {
      this.setExiste(true);
    }
    if (this.getVie() <= 0) {
      this.setExiste(false);
    }
    // ---------------SA FUNCTION INFORMATION  ------------------------
    this.infos = function () {
      console.log(
        this.getNom() +
          " possède " +
          this.getVie() +
          " point de vie, " +
          this.getAttaque() +
          " point d'attaque et " +
          this.getDefense() +
          " point de défense"
      );
    };
    // ---------------SA FUNCTION INFORMATION  ------------------------

    // ----------------------------------------------------------------

    // ---------------SA FUNCTION ATTAQUER-----------------------------
    this.attaquer = function (defenseur) {
      colorLog(
        this.getNom() + " bourre la gueule à  " + defenseur.getNom(),
        "bot"
      );
      if (this.getAttaque() > defenseur.getDefense()) {
        defenseur.setVie(defenseur.getVie() - 10);
      } else if (this.getAttaque() == defenseur.getDefense()) {
        defenseur.setVie(defenseur.getVie() - 5);
      } else {
        this.setVie(this.getVie() - 5);
      }
      colorLog(
        this.getNom() + " possède " + this.getVie() + " point de vie ",
        "vie"
      );
      colorLog(
        defenseur.getNom() +
          " possède " +
          defenseur.getVie() +
          " point de vie ",
        "vie"
      );

      if (this.getVie() <= 0) {
        colorLog(this.getNom() + " a succombé a ses blessures ", "mort");
        this.setExiste(false);
        nbrJoueurCreer -= 1;
      }
      if (defenseur.getVie() <= 0) {
        colorLog(defenseur.getNom() + " a succombé a ses blessures ", "mort");
        defenseur.setExiste(false);
        nbrJoueurCreer -= 1;
      }
    };
    // ---------------SA FUNCTION ATTAQUER-----------------------------
  }
}
//----------- OBJET -------------

//---------------------------------------------------------- LES FONCTIONS--------------------------------------------------------------

// --------------FONCTION QUI DEFINI UN NOMBRE ALEATOIRE POUR LES STATS -----------------------------------

// --------------FONCTION QUI DEFINI UN NOMBRE ALEATOIRE POUR LES STATS -----------------------------------

class match {
  constructor() {
    // --------------FONCTION LANCER LE COMBAT-------------

    this.run = function () {
      var tableau = new Array();

      // ON CREER UN TABLEAU

      var nom = "";

      function tableauAleatoire() {
        return Math.floor(Math.random() * tableau.length);
      }

      // BOUCLE POUR CREER DES PERSONNAGE JUSQU'A CE QUE LE NOMBRE DE JOUEUR CREER = NOMBRE DE JOUEUR, RENITIALISE LE NOM APRES L'AVOIR ENVOYER
      // DANS LE TABLEAU POUR POUVOIR RETOURNER AU DEBUT DU WHILE TANT QUE NOMBRE DE JOUEUR CREER N'EST PAS EGAL A NOMBRE DE JOUEUR

      while (nom == "" && nbrJoueurCreer < nbrJoueur) {
        // Prompt( On saisie le nom des personnages);//

        nom = prompt("Saisis moi un nom");

        // Prompt( On saisie le nom des personnages);//

        if (nom != "") {
          console.log("Vous avez créer " + nom);

          // CREATION D'UN PERSONNAGE A PARTIR DE LA CLASS PERSONNAGE

          var perso = new personnage(nom);

          // DEMANDE LES INFORMATIONS DU PERSONNAGE (L'OBJET)

          perso.infos();

          // ON ENVOIE LE PERSONNAGE DANS LE TABLEAU

          tableau.push(perso);
          nbrJoueurCreer += 1;
          nom = "";
          colorLog("Nombre de joueur creer " + nbrJoueurCreer, "info");
        }
      }
      // ON DEFINIT UN ATTAQUANT, UN DEFENSEUR ET UN ANCIEN ATTAQUANT

      let randomAttq;
      let randomDef;
      let randomOldAttq = -1;

      // TANT QUE LA LONGUEUR DU TABLEAU EST SUPERIEUR A  1 ON DONNE UNE NOMBRE ALEATOIRE A L'ATTAQUANT ET AU DEFENSEUR
      // A L'AIDE DE LA FONCTION "tableauAleatoire"
      //------------------------------ DEBUT DE LA BOUCLE------------------------------
      while (tableau.length > 1) {
        randomAttq = tableauAleatoire();
        randomDef = tableauAleatoire();

        // SI L'ATTAQUANT EST DIFFERENT DE L'ANCIEN ATTAQUANT ET SI L'ATTAQUANT EST DIFFERENT DU DEFENSEUR, L'ATTAQUANT ATTAQUE LE DEFENSEUR

        if (randomAttq != randomOldAttq) {
          try {
            if (randomAttq != randomDef) {
              tableau[randomAttq].attaquer(tableau[randomDef]);

              // SI l'ATTAQUANT N'EXISTE PLUS LE RETIRER DU TABLEAU GRACE A SPLICE

              if (tableau[randomAttq].getExiste() == false) {
                tableau.splice(randomAttq, 1);
              }

              // SI LE DEFENSEUR N'EXISTE PLUS LE RETIRER DU TABLEAU GRACE A SPLICE

              if (tableau[randomDef].getExiste() == false) {
                tableau.splice(randomDef, 1);
              }

              // L'ATTAQUANT DONNE SA VALEUR A L'ANCIEN ATTAQUANT

              randomOldAttq = randomAttq;
            }
          } catch (error) {
            alert(
              "on essaye d'accéder à un élément du tableau qui n'existe plus"
            );
          }
        }
      }
      //------------------------------ FIN DE LA BOUCLE------------------------------
      colorLog(perso.getNom() + " Gagne le combat !", "gagne");

      // --------------FONCTION COMBAT-------------

      //---------------------------------------------------------- LES FONCTIONS--------------------------------------------------------------

      // ON CREER UN TABLEAU
    };
  }
}

let m = new match();
m.run();

// ON LANCE LE COMBAT

// ON LANCE LE COMBAT
