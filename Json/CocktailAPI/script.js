//
//----- Région afficher random cocktails -------------------------------------------------
//

var callBackSuccess = function (data) {
  console.log("donnees api", data);

  var cocktailAléatoire = data.drinks[length].strDrink;
  var image = data.drinks[length].strDrinkThumb;
  var element = document.getElementById("randomCocktail");

  // Permet de créer plusieurs div
  var element2 = document.createElement("card");
  element2.innerHTML =
    "<h1>" + cocktailAléatoire + "</h1>" + "<img src=" + image + ">";
  element.appendChild(element2);

  for (let i = 1; i < 16; i++) {
    let ingredient = document.createElement("ons-list-item");
    ingredient.innerHTML = data.drinks[0][`strIngredient${i}`];

    element2.appendChild(ingredient);
  }

  // --------------------------------
};

function getRandomCocktail() {
  var url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  $.get(url, callBackSuccess)
    .done(function () {})
    .fail(function () {
      alert("error");
    })
    .always(function () {});
}

for (let i = 0; i < 6; i++) {
  getRandomCocktail();
}

//
//
// ------------Région recherche de cocktails par ingrédients ou par nom --------------------
//
//

var typeSearch;

var queryLoc = document.getElementById("queryLoc").value;
let searchByName = document.getElementById("searchByName");
let searchByIngredients = document.getElementById("searchByIngredients");

//  SEARCH BY NAME
searchByName.addEventListener("change", function () {
  if (this.checked) {
    searchByIngredients.checked = false;
    type = "Nom";
  } else {
    type = "";
  }
});
// ---------------------------------------------------------------------------------------------

// SEARCH BY INGREDIENTS------------------------------------------------------------------------
searchByIngredients.addEventListener("change", function () {
  if (this.checked) {
    searchByName.checked = false;
    type = "ingredients";
  } else {
    type = "";
  }
});
// ------------------------------------------------------------------------------------------------

// CALLBACK NAME
var callBackGetSuccess = function (data) {
  console.log(data);
  var element = document.getElementById("zone_cocktail");
  // Enleve la dernière recherche quand on clique sur le bouton
  element.innerHTML = "";
  // ----------------------------------------------------------
  for (let i = 0; i <= data.drinks.length; i++) {
    // Permet de créer plusieurs div
    var element2 = document.createElement("card");
    element2.innerHTML =
      "<img src='" +
      data.drinks[i].strDrinkThumb +
      "/preview'><p>" +
      data.drinks[i].strDrink +
      "</p>";
    element.appendChild(element2);
    // --------------------------------
  }
  element2.innerHTML = "";
};
// -------------------------------------------------------------------------------------

// CALLBACK INGREDIENTS-----------------------------------------------------------------
var callBackGetTest = function (data) {
  console.log(data);
  var element = document.getElementById("zone_cocktail");
  element.innerHTML = "";
  for (let i = 0; i <= data.drinks.length; i++) {
    var element2 = document.createElement("card");
    element2.innerHTML =
      "<img src='" +
      data.drinks[i].strDrinkThumb +
      "/preview'><p>" +
      data.drinks[i].strDrink +
      "</p>";
    element.appendChild(element2);
    console.log(data.drinks[i].strDrinkThumb);
  }
};
// -----------------------------------------------------------------------------------------

// FONCTION QUI SE DECLENCHE EN CLIQUANT SUR LE BOUTON--------------------------------------
function buttonClickGET() {
  var queryLoc = document.getElementById("queryLoc").value;
  if (searchByName.checked) {
    var url =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + queryLoc;
    queryLoc = "";

    $.get(url, callBackGetSuccess).fail(function () {
      alert("error");
    });
  }

  if (searchByIngredients.checked) {
    var url =
      "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + queryLoc;
    queryLoc = "";

    $.get(url, callBackGetTest).fail(function () {
      alert("error");
    });
  }
}
