const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
searchResult = document.getElementById("tableau");
jQuery(document).ready(function ($) {
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
    queryLoc.value = "";
    type = "Nom";
  } else {
    type = "";
  }
});
Serie.addEventListener("change", function () {
  if (this.checked) {
    Title.checked = false;
    Author.checked = false;
    queryLoc.value = "";
    type = "Nom";
  } else {
    type = "";
  }
});
Title.addEventListener("change", function () {
  if (this.checked) {
    Serie.checked = false;
    Author.checked = false;
    queryLoc.value = "";
    type = "Nom";
  } else {
    type = "";
  }
});

function buttonClickGET() {
  if (Author.checked) {
    queryLoc.innerHTML = " ";
    searchByAuthor();
    panier();
  }
  if (Serie.checked) {
    searchBySerie();
    panier();
  }
  if (Title.checked) {
    searchByTitle();
    panier();
  }
}

function searchByAuthor() {
  var queryLoc = document.getElementById("queryLoc").value;
  var idAuteurToSave = 0;
  for (var [idAuteur, auteur] of auteurs.entries()) {
    if (auteur.nom == queryLoc) {
      //remplacer le nom de l'auteur ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle

      idAuteurToSave = parseInt(idAuteur);

      break;
    }
  }

  // on a notre idAuteur, on fait notre petit filtre
  if (idAuteurToSave > 0) {
    searchResult.innerHTML = "";
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idAuteur == idAuteurToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
        const tableAuteur = document.createElement("div");
        tableAuteur.setAttribute("class", "table-item");
        tableAuteur.innerHTML +=
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
          ' <a href="#" data-name="' +
          album.titre +
          '" data-price="' +
          album.prix +
          '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

        searchResult.append(tableAuteur);
      }
    }
  }
}

function searchBySerie() {
  var queryLoc = document.getElementById("queryLoc").value;
  var idSerieToSave = 0;
  for (var [idSerie, Serie] of series.entries()) {
    if (Serie.nom == queryLoc) {
      //remplacer le nom de l'auteur ici par le choix de l'utilisateur
      //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle

      idSerieToSave = parseInt(idSerie);

      break;
    }
  }

  // on a notre idAuteur, on fait notre petit filtre
  if (idSerieToSave > 0) {
    searchResult.innerHTML = "";
    for (var [idAlbum, album] of albums.entries()) {
      if (album.idSerie == idSerieToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
        const tableSerie = document.createElement("div");
        tableSerie.setAttribute("class", "table-item");
        tableSerie.innerHTML +=
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
          ' <a href="#" data-name="' +
          album.titre +
          '" data-price="' +
          album.prix +
          '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

        searchResult.append(tableSerie);
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

      idTitleToSave = parseInt(titre);

      break;
    }
  }

  // on a notre idAuteur, on fait notre petit filtre
  if (idTitleToSave > 0) {
    searchResult.innerHTML = "";
    for (var [idAlbum, album] of albums.entries()) {
      if (idAlbum == idTitleToSave) {
        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");
        const tableTitle = document.createElement("div");
        tableTitle.setAttribute("class", "table-item");
        tableTitle.innerHTML +=
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
          ' <a href="#" data-name="' +
          album.titre +
          '" data-price="' +
          album.prix +
          '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

        searchResult.append(tableTitle);
      }
    }
  }
}

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
      ' <a href="#" data-name="' +
      album.titre +
      '" data-price="' +
      album.prix +
      '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

    searchResult.appendChild(listItem);
  });
}

//
//
//
//
//
//
// ************************************************
// Shopping Cart API
// ************************************************
function panier() {
  var shoppingCart = (function () {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];

    // Constructor
    function Item(name, price, count) {
      this.name = name;
      this.price = price;
      this.count = count;
    }

    // Save cart
    function saveCart() {
      sessionStorage.setItem("shoppingCart", JSON.stringify(cart));
    }

    // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem("shoppingCart"));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }

    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};

    // Add to cart
    obj.addItemToCart = function (name, price, count) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    };
    // Set count from item
    obj.setCountForItem = function (name, count) {
      for (var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (name) {
      for (var item in cart) {
        if (cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    };

    // Clear cart
    obj.clearCart = function () {
      cart = [];
      saveCart();
    };

    // Count cart
    obj.totalCount = function () {
      var totalCount = 0;
      for (var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    };

    // Total cart
    obj.totalCart = function () {
      var totalCart = 0;
      for (var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    };

    // List cart
    obj.listCart = function () {
      var cartCopy = [];
      for (i in cart) {
        item = cart[i];
        itemCopy = {};
        for (p in item) {
          itemCopy[p] = item[p];
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy);
      }
      return cartCopy;
    };

    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();

  // *****************************************
  // Triggers / Events
  // *****************************************
  // Add item
  $(".add-to-cart").click(function (event) {
    event.preventDefault();
    var name = $(this).data("name");
    var price = Number($(this).data("price"));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });

  // Clear items
  $(".clear-cart").click(function () {
    shoppingCart.clearCart();
    displayCart();
  });

  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for (var i in cartArray) {
      output +=
        "<tr>" +
        "<td>" +
        cartArray[i].name +
        "</td>" +
        "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" +
        cartArray[i].name +
        ">-</button>" +
        "<input type='number' min='0' class='item-count form-control' data-name='" +
        cartArray[i].name +
        "' value='" +
        cartArray[i].count +
        "'>" +
        "<button class='plus-item btn btn-primary input-group-addon' data-name=" +
        cartArray[i].name +
        ">+</button></div></td>" +
        "<td><button class='delete-item btn btn-danger' data-name=" +
        cartArray[i].name +
        ">X</button></td>" +
        " = " +
        "<td>" +
        cartArray[i].total +
        " € </td>" +
        "</tr>";
    }
    $(".show-cart").html(output);
    $(".total-cart").html(shoppingCart.totalCart());
    $(".total-count").html(shoppingCart.totalCount());
  }

  // Delete item button

  $(".show-cart").on("click", ".delete-item", function (event) {
    var name = $(this).data("name");
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  });

  // -1
  $(".show-cart").on("click", ".minus-item", function (event) {
    var name = $(this).data("name");
    shoppingCart.removeItemFromCart(name);
    displayCart();
  });
  // +1
  $(".show-cart").on("click", ".plus-item", function (event) {
    var name = $(this).data("name");
    shoppingCart.addItemToCart(name);
    displayCart();
  });

  // Item count input
  $(".show-cart").on("change", ".item-count", function (event) {
    var name = $(this).data("name");
    var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });

  displayCart();
}
panier();

function getWeather() {
  var city = document.getElementById("search").value;
  var units = document.getElementById("units").value;
  fetch(
    "http://api.weatherstack.com/current?access_key=9ca1a17f6ca69273ca40d428dfaaa1b9&query=" +
      city +
      "&units="
    // + units+"&language=fr"
  )
    .then((a) => a.json())
    .then((response) => {
      document.getElementById("image").src = response.current.weather_icons[0];
      document.getElementById("output").innerHTML =
        "<h1>" +
        response.current.weather_descriptions[0] +
        "</h1> Temperature : " +
        response.current.temperature +
        " °C" +
        "<br>Ressenti : " +
        response.current.feelslike +
        " °C" +
        "<br> UV : " +
        response.current.uv_index +
        "<br> Humidité : " +
        response.current.humidity +
        " %" +
        "<br>Couverture nuageuse : " +
        response.current.cloudcover +
        " %";
    });
}
