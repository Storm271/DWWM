// 
// 
// 
// 
// 
// 
// 

    function getRandomCocktail(){

for (let i = 0; i < 6; i++) {
    
var element = document.getElementById("randomCocktail");
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

//     var cocktailAléatoire = data.drinks[length].strDrink;
//   var image = data.drinks[length].strDrinkThumb;
  

  // Permet de créer plusieurs div
  var element2 = document.createElement("card");
  element2.innerHTML =
    "<h1>" + serie.nom + "</h1>" + "<img src=" + image + ">";
  element.appendChild(element2);

  for (let i = 1; i < 16; i++) {
    let ingredient = document.createElement("ons-list-item");
    ingredient.innerHTML = data.drinks[0][`strIngredient${i}`];

    element2.appendChild(ingredient);
  }
    }}
  // --------------------------------














  
  CreateBookList();

    function CreateBookList(){
    albums.forEach(album => {

        serie = series.get(album.idSerie);
        auteur = auteurs.get(album.idAuteur);
        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;
        const listItem = document.createElement("div");
        listItem.setAttribute("class", "table-item");
               listItem.innerHTML =
                 '<div class = "container-image">' +
             '<img src="'+srcAlbum + nomFic + ".jpg"+'"/>' 
                  +'</div>'+'<p class="album">'+
                 album.titre +
                 "</p>" +

                 '<p classe="titre">' +
                 serie.nom +
                 "</p>" +

                 '<p classe="auteur">' +
                 auteur.nom +
                 "</p>"+
                 '<p class="prix">' + album.prix+ "€"+ '</p>'+
                 '<button type="submit" class="achat" id="button'+album.idSerie+'" onclick="addBasket()"><img src="images/cart.png"/></button>';


        searchResult.append(listItem);
})
}Hergé




















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
          ' <input type="button" value="Ajouter au painer" onclick="   " />';

        searchResult.append(tableTitle);
      }
    }
  }
}
Nadia se marie
Les bijoux de la Castafiore

// function searchByTitle() {
//   var queryLoc = document.getElementById("queryLoc").value;
//   var idTitleToSave = 0;

//   for (var [titre, title] of albums.entries()) {
//     if (title.titre == queryLoc) {
//       //remplacer le nom de l'auteur ici par le choix de l'utilisateur
//       //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
//       console.log("on est làààààààààà  " + titre);
//       idTitleToSave = parseInt(titre);

//       break;
//     }
//   }

//   // on a notre idTitre, on fait notre petit filtre
//   if (idTitleToSave > 0) {
//     for (var [idAlbum, album] of albums.entries()) {
//       if (idAlbum == idTitleToSave) {
//         serie = series.get(album.idSerie);
//         auteur = auteurs.get(album.idAuteur);
//         console.log(
//           album.titre +
//             " N°" +
//             album.numero +
//             " Série:" +
//             serie.nom +
//             " Auteur:" +
//             auteur.nom
//         );
//       }
//     }
//   }
// }


// function searchBySerie() {
//   var queryLoc = document.getElementById("queryLoc").value;
//   var idSerieToSave = 0;
//   for (var [idSerie, serie] of series.entries()) {
//     if (serie.nom == queryLoc) {
//       //remplacer le nom de la série ici par le choix de l'utilisateur
//       //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
//       console.log("on est làààààààààà  " + idSerie);
//       idSerieToSave = parseInt(idSerie);
//       break;
//     }
//   }

//   // on a notre idAuteur, on fait notre petit filtre
//   if (idSerieToSave > 0) {
//     for (var [idAlbum, album] of albums.entries()) {
//       if (album.idSerie == idSerieToSave) {
//         serie = series.get(album.idSerie);
//         auteur = auteurs.get(album.idAuteur);
//         console.log(
//           album.titre +
//             " N°" +
//             album.numero +
//             " Série:" +
//             serie.nom +
//             " Auteur:" +
//             auteur.nom
//         );
//       }
//     }
//   }
// }

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


  // ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
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
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
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
  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1);
    displayCart();
  });
  
  // Clear items
  $('.clear-cart').click(function() {
    shoppingCart.clearCart();
    displayCart();
  });
  
  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {
      output += "<tr>"
        + "<td>" + cartArray[i].name + "</td>" 
        + "<td>(" + cartArray[i].price + ")</td>"
        + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
        + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
        + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
        + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
        + " = " 
        + "<td>" + cartArray[i].total + "</td>" 
        +  "</tr>";
    }
    $('.show-cart').html(output);
    $('.total-cart').html(shoppingCart.totalCart());
    $('.total-count').html(shoppingCart.totalCount());
  }
  
  // Delete item button
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    displayCart();
  })
  
  
  // -1
  $('.show-cart').on("click", ".minus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCart(name);
    displayCart();
  })
  // +1
  $('.show-cart').on("click", ".plus-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.addItemToCart(name);
    displayCart();
  })
  
  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
  });
  
  displayCart();
  