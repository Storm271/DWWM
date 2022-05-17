const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
jQuery(document).ready(function ($) {
  /*
	// Lecture d'un album
	console.log("Lecture d'un album");
	var album = albums.get("5");
	var serie = series.get(album.idSerie);
	var auteur = auteurs.get(album.idAuteur);
	console.log(album.titre+" "+serie.nom+" "+auteur.nom);
	*/

  /*
	console.log("Liste des albums");
	albums.forEach(album => {
	    serie = series.get(album.idSerie);
	    auteur = auteurs.get(album.idAuteur);
	    console.log(album.titre+" N°"+album.numero+" Série:"+serie.nom+" Auteur:"+auteur.nom);
	});
	*/

  /*
	console.log("Liste des albums par série");
	for(var [idSerie, serie] of series.entries()) {
	    // Recherche des albums de la série
	    for (var [idAlbum, album] of albums.entries()) {
	        if (album.idSerie == idSerie) {
	            console.log(serie.nom+", Album N°"+album.numero+" "+album.titre+", Auteur:"+auteurs.get(album.idAuteur).nom);
	        }
	    }
	    
	}
	*/

  //   console.log("Liste des albums par auteur");
  //   for (var [idAuteur, auteur] of auteurs.entries()) {
  //     // Recherche des albums de l'auteur
  //     for (var [idAlbum, album] of albums.entries()) {
  //       if (album.idAuteur == idAuteur) {
  //         console.log(
  //           auteur.nom +
  //             ", Album N°" +
  //             album.numero +
  //             " " +
  //             album.titre +
  //             ", Série:" +
  //             series.get(album.idSerie).nom
  //         );
  //       }
  //     }
  //   }

  //
  //
  //
  //
  //
  //
  //

  //on fait une recherche sur la map des albums:
  //EX: Je ne veux que les albums avec l'auteur Arleston, Mourier (idAuteur=11)

  // Dans un premier temps on va aller recupérer l'id de l'auteur selon la saisie utilisateur (qui sera un input)

  //
  //
  //
  //
  //
  //

  // Affichage des BD
  var txtSerie = document.getElementById("serie");
  var txtNumero = document.getElementById("numero");
  var txtTitre = document.getElementById("titre");
  var txtAuteur = document.getElementById("auteur");
  var txtPrix = document.getElementById("prix");
  var imgAlbum = document.getElementById("album");
  var imgAlbumMini = document.getElementById("albumMini");

  imgAlbum.addEventListener("error", function () {
    prbImg(this);
  });

  imgAlbumMini.addEventListener("error", function () {
    prbImg(this);
  });

  /*

prendre exemple sur le code en dessous pour la / les fonctions modifiant la partie du haut


*/

  var id = document.getElementById("id");
  id.addEventListener("change", function () {
    getAlbum(this);
  });

  /**
   * Récupération de l'album par son id et appel de
   * la fonction d'affichage
   *
   * @param {number} num
   */
  function getAlbum(num) {
    var album = albums.get(num.value);

    if (album === undefined) {
      txtSerie.value = "";
      txtNumero.value = "";
      txtTitre.value = "";
      txtAuteur.value = "";
      txtPrix.value = 0;

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        albumDefaultMini,
        albumDefault
      );
    } else {
      var serie = series.get(album.idSerie);
      var auteur = auteurs.get(album.idAuteur);

      txtSerie.value = serie.nom;
      txtNumero.value = album.numero;
      txtTitre.value = album.titre;
      txtAuteur.value = auteur.nom;
      txtPrix.value = album.prix;

      var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

      // Utilisation d'une expression régulière pour supprimer
      // les caractères non autorisés dans les noms de fichiers : '!?.":$
      nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

      afficheAlbums(
        $("#albumMini"),
        $("#album"),
        srcAlbumMini + nomFic + ".jpg",
        srcAlbum + nomFic + ".jpg"
      );
    }
  }

  /**
   * Affichage des images, les effets sont chainés et traités
   * en file d'attente par jQuery d'où les "stop()) et "clearQueue()"
   * pour éviter l'accumulation d'effets si défilement rapide des albums.
   *
   * @param {object jQuery} $albumMini
   * @param {object jQuery} $album
   * @param {string} nomFic
   * @param {string} nomFicBig
   */
  function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
    $album
      .stop(true, true)
      .clearQueue()
      .fadeOut(100, function () {
        $album.attr("src", nomFic);
        $albumMini
          .stop(true, true)
          .clearQueue()
          .fadeOut(150, function () {
            $albumMini.attr("src", nomFicMini);
            $albumMini.slideDown(200, function () {
              $album.slideDown(200);
            });
          });
      });
  }

  /**
   * Affichage de l'image par défaut si le chargement de l'image de l'album
   * ne s'est pas bien passé
   *
   * @param {object HTML} element
   */
  function prbImg(element) {
    // console.log(element);
    if (element.id === "albumMini") element.src = albumDefaultMini;
    else element.src = albumDefault;
  }
});
let Author = document.getElementById("Author");
let Serie = document.getElementById("Serie");
let Title = document.getElementById("Title");

Author.addEventListener("change", function () {
  if (this.checked) {
    Serie.checked = false;
    Title.checked = false;
    type = "Nom";
  } else {
    type = "";
  }
});
Serie.addEventListener("change", function () {
  if (this.checked) {
    Title.checked = false;
    Author.checked = false;
    type = "Nom";
  } else {
    type = "";
  }
});
Title.addEventListener("change", function () {
  if (this.checked) {
    Serie.checked = false;
    Author.checked = false;
    type = "Nom";
  } else {
    type = "";
  }
});

function buttonClickGET() {
  var element = document.getElementById("randomCocktail");

  if (Author.checked) {
    searchByAuthor();
  }
  if (Serie.checked) {
    searchBySerie();
  }
  if (Title.checked) {
    searchByTitle();
  }
}

function searchByAuthor() {
  var queryLoc = document.getElementById("queryLoc").value;
  var idAuteurToSave = 0;
  for (var [idAuteur, auteur] of auteurs.entries()) {
    if (auteur.nom == queryLoc) {
      //remplacer le nom de l'auteur ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
      console.log("on est làààààààààà  " + idAuteur);
      idAuteurToSave = parseInt(idAuteur);
      break;
    }
  }

  // on a notre idAuteur, on fait notre petit filtre
  if (idAuteurToSave > 0) {
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idAuteur == idAuteurToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        console.log(
          album.titre +
            " N°" +
            album.numero +
            " Série:" +
            serie.nom +
            " Auteur:" +
            auteur.nom
        );
      }
    }
  }
}

function searchBySerie() {
  var queryLoc = document.getElementById("queryLoc").value;
  var idSerieToSave = 0;
  for (var [idSerie, serie] of series.entries()) {
    if (serie.nom == queryLoc) {
      //remplacer le nom de la série ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
      console.log("on est làààààààààà  " + idSerie);
      idSerieToSave = parseInt(idSerie);
      break;
    }
  }

  // on a notre idAuteur, on fait notre petit filtre
  if (idSerieToSave > 0) {
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerieToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        console.log(
          album.titre +
            " N°" +
            album.numero +
            " Série:" +
            serie.nom +
            " Auteur:" +
            auteur.nom
        );
      }
    }
  }
}

function searchByTitle() {
  var queryLoc = document.getElementById("queryLoc").value;
  var idTitleToSave = 0;

  for (var [titre, title] of albums.entries()) {
    if (title.titre == queryLoc) {
      //remplacer le nom de l'auteur ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
      console.log("on est làààààààààà  " + titre);
      idTitleToSave = parseInt(titre);

      break;
    }
  }

  // on a notre idTitre, on fait notre petit filtre
  if (idTitleToSave > 0) {
    for (var [idAlbum, album] of albums.entries()) {
      if (idAlbum == idTitleToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        console.log(
          album.titre +
            " N°" +
            album.numero +
            " Série:" +
            serie.nom +
            " Auteur:" +
            auteur.nom
        );
      }
    }
  }
}
searchResult = document.getElementById("tableau");

Catalogue();

function Catalogue() {
  albums.forEach((album) => {
    serie = series.get(album.idSerie);
    auteur = auteurs.get(album.idAuteur);
    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
    nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "table-item");
    listItem.innerHTML =
      '<div class = "container-image">' +
      '<img src="' +
      srcAlbum +
      nomFic +
      ".jpg" +
      '"/>' +
      "</div>" +
      '<p class="album">' +
      album.titre +
      "</p>" +
      '<p classe="titre">' +
      serie.nom +
      "</p>" +
      '<p classe="auteur">' +
      auteur.nom +
      "</p>" +
      '<p class="prix">' +
      album.prix +
      "€" +
      "</p>" +
      ' <input type="button" value="Ajouter au painer" onclick="   " />';

    searchResult.appendChild(listItem);
  });
}
