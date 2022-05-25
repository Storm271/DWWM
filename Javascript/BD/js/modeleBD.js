const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand
searchResult = document.getElementById("tableau");
let Author = document.getElementById("Author");
let Serie = document.getElementById("Serie");
let Title = document.getElementById("Title");

//#region CONFIGURATION CHECKBOXES

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

//#endregion

//#region FONCTIONS RECHERCHE

function buttonClickGET() {
  if (Author.checked) {
    searchByAuthor();
    observer();
    panier();
  }
  if (Serie.checked) {
    searchBySerie();
    observer();
    panier();
  }
  if (Title.checked) {
    searchByTitle();
    observer();
    panier();
  }
}

function buttonClickGETCatalogue() {
  searchResult.innerHTML = "";
  queryLoc.value = "";
  Catalogue();
  observer();
  Serie.checked = false;
  Author.checked = false;
  Title.checked = false;
}

function searchByAuthor() {
  searchResult.innerHTML = "";
  var queryLoc = document.getElementById("queryLoc").value.toLocaleLowerCase();
  var idAuteurToSave = 0;
  var tabIdAuteur = new Array();
  for (var [idAuteur, auteur] of auteurs.entries()) {
    if (auteur.nom.toLocaleLowerCase().indexOf(queryLoc) >= 0) {
      console.log(idAuteur);
      idAuteurToSave = parseInt(idAuteur);
      tabIdAuteur.push(idAuteurToSave);
    }
  }

  console.log(tabIdAuteur);

  for (i = 0; i < tabIdAuteur.length; i++) {
    idAuteurToSave = tabIdAuteur[i];

    if (idAuteurToSave > 0) {
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
            album.titre.split(" ").join("_") +
            '" data-price="' +
            album.prix +
            '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

          searchResult.append(tableAuteur);
        }
      }
    }
  }
}

function searchBySerie() {
  searchResult.innerHTML = "";
  var queryLoc = document.getElementById("queryLoc").value.toLocaleLowerCase();
  console.log(queryLoc);
  var idSerieToSave = 0;
  var tabIdSerie = new Array();
  for (var [idSerie, Serie] of series.entries()) {
    if (Serie.nom.toLocaleLowerCase().indexOf(queryLoc) >= 0) {
      idSerieToSave = parseInt(idSerie);
      tabIdSerie.push(idSerieToSave);
    }
  }

  for (i = 0; i < tabIdSerie.length; i++) {
    idSerieToSave = tabIdSerie[i];
    if (idSerieToSave > 0) {
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
            album.titre.split(" ").join("_") +
            '" data-price="' +
            album.prix +
            '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

          searchResult.append(tableSerie);
        }
      }
    }
  }
}

function searchByTitle() {
  searchResult.innerHTML = "";
  var queryLoc = document.getElementById("queryLoc").value.toLocaleLowerCase();
  var idTitleToSave = 0;
  var tabIdTitle = new Array();

  for (var [titre, title] of albums.entries()) {
    if (title.titre.toLocaleLowerCase().indexOf(queryLoc) >= 0) {
      idTitleToSave = parseInt(titre);
      tabIdTitle.push(idTitleToSave);
    }
  }

  for (i = 0; i < tabIdTitle.length; i++) {
    idTitleToSave = tabIdTitle[i];

    if (idTitleToSave > 0) {
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
            album.titre.split(" ").join("_") +
            '" data-price="' +
            album.prix +
            '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

          searchResult.append(tableTitle);
        }
      }
    }
  }
}

//#endregion

//#region AFFICHAGE DE TOUTES LES BD

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
      album.titre.split(" ").join("_") +
      '" data-price="' +
      album.prix +
      '" class="add-to-cart btn btn-primary">Ajouter au panier</a>';

    searchResult.appendChild(listItem);
  });
}
//#endregion

//#region PANIER

function panier() {
  var shoppingCart = (function () {
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

    return obj;
  })();

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
        cartArray[i].name.split("_").join(" ") +
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
//#endregion

//#region  API METEO

function getWeather() {
  var city = document.getElementById("search").value;

  fetch(
    "http://api.weatherstack.com/current?access_key=9ca1a17f6ca69273ca40d428dfaaa1b9&query=" +
      city
  )
    .then((a) => a.json())
    .then((response) => {
      document.getElementById("image").src = response.current.weather_icons[0];
      document.getElementById("output").innerHTML =
        "<br><h2>" +
        response.current.weather_descriptions[0] +
        "</h2> Temperature : " +
        response.current.temperature +
        " °C" +
        "<br> Humidité : " +
        response.current.humidity +
        " %" +
        "<br>Couverture nuageuse : " +
        response.current.cloudcover +
        " %";
    });
}
//#endregion

//#region ANIMATIONS

// ANIMATION TITRE
const spans = document.querySelectorAll(".word span");

spans.forEach((span, idx) => {
  setTimeout(() => {
    span.classList.add("active");
  }, 200 * (idx + 1));
  span.classList.remove("active");
});

// ANIMATION APPARITION AU SCROLL
function observer() {
  const ratio = 0;
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: ratio,
  };

  const handleIntersect = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.intersectionRatio > ratio) {
        entry.target.classList.add("reveal-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  document.querySelectorAll(".table-item").forEach(function (r) {
    observer.observe(r);
  });
}
observer();

//#endregion
