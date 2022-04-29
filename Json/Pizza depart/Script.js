function ChargeInfosJson() {
  fetch("PizzaJson.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      CreateDivs(data);
    });
}

function CreateDivs(data) {
  const preview = document.getElementsByClassName("preview")[0];
  preview.innerHTML = "";

  const pizzeriaName = document.createElement("div");
  pizzeriaName.innerHTML = data.Name;
  pizzeriaName.setAttribute("class", "Nom");

  const pizzeriaSlogan = document.createElement("div");
  pizzeriaSlogan.innerHTML = data.Slogan;
  pizzeriaSlogan.setAttribute("class", "Slogan");

  preview.appendChild(pizzeriaName);
  preview.appendChild(pizzeriaSlogan);

  const pizzeriaListPizzas = document.createElement("div");

  pizzeriaListPizzas.setAttribute("class", "contenu");
  pizzeriaListPizzas.setAttribute("id", "PizzaList");

  var listPizzas = data.Pizzas;
  for (var x = 0; x < listPizzas.length; x++) {
    var listIngredients = listPizzas[x].Ingredients;
    var pizzaListeElement = document.createElement("div");
    pizzaListeElement.setAttribute("class", "card");
    pizzaListeElement.innerHTML =
      '<h1 class="pizzanom">' +
      listPizzas[x].Nom +
      "</h1>" +
      '<h2 class="pizzaprix">' +
      listPizzas[x].Prix +
      "</h2> " +
      "<img src=" +
      listPizzas[x].Image +
      ">";
    for (var y = 0; y < listIngredients.length; y++) {
      pizzaListeElement.innerHTML +=
        '<li class="pizzaingredients">' + listIngredients[y] + "</li>";

      pizzeriaListPizzas.appendChild(pizzaListeElement);
    }
  }

  preview.appendChild(pizzeriaListPizzas);
}
