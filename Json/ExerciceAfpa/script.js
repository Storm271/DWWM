function handleRadioClick() {
  const box = document.getElementById("box");
  const box2 = document.getElementById("box2");

  if (document.getElementById("show").checked) {
    box.style.display = "block";
    box2.style.visibility = "hidden";
  } else {
    box.style.display = "none";
    box2.style.visibility = "visible";
  }
}
const radioButtons = document.querySelectorAll('input[name="example"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("click", handleRadioClick);
});
function fetchJson() {
  fetch("motif.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      CreateDivs(data);
    });

  function CreateDivs(data) {
    const preview = document.getElementsByClassName("preview")[0];
    preview.innerHTML = "";

    const Titre = document.createElement("div");
    Titre.innerHTML = data.topTitle;
    Titre.setAttribute("class", "topTitle");

    preview.appendChild(Titre);

    const listCodes = document.createElement("div");

    listCodes.setAttribute("class", "Codes"); //contenu A utiliser uniquement pour le CSS si besoin
    listCodes.setAttribute("id", "idCodes");

    var Codes = data.members;
    for (var x = 0; x < Codes.length; x++) {
      var listOptions = Codes[x].options;
      var membersListeElement = document.createElement("div");
      membersListeElement.setAttribute("class", "card");
      membersListeElement.innerHTML =
        //   '<h3 class="membersId">' +
        //   Codes[x].id +
        "</h3>" +
        '<h3 class="membersName">' +
        Codes[x].name +
        "</h3> " +
        '<h3 class="membersTitle">' +
        Codes[x].title +
        "</h3>";
      for (var y = 0; y < listOptions.length; y++) {
        membersListeElement.innerHTML +=
          '<li> <input type="checkbox"  id="' +
          listOptions[y].op_id +
          '" class="membersOptions">' +
          listOptions[y].op_label +
          "</li>";

        listCodes.appendChild(membersListeElement);
      }
    }

    preview.appendChild(listCodes);
  }
}

//
//
// /!\ Permet de transférer des paramètres d'une page a une autre /!\
function addParametersInForm() {
  try {
    var parameters = location.search.substring(1).split("&");

    var temp = parameters[0].split("=");
    console.log(temp[1]);
    var nom = decodeURI(temp[1]); //decodeURI va calculer une nouvelle chaîne de caractères et remplace les séquences d'échappement hexadécimales par les caractères qu'elles représentent.
    console.log(nom);
    temp = parameters[1].split("=");
    var prenom = decodeURI(temp[1]);

    temp = parameters[2].split("=");
    var formation = decodeURI(temp[1]);

    temp = parameters[3].split("=");
    le = decodeURI(temp[1]);

    temp = parameters[4].split("=");
    var de = decodeURIComponent(temp[1]);

    temp = parameters[5].split("=");
    var a = decodeURIComponent(temp[1]);

    temp = parameters[7].split("=");
    var du = decodeURIComponent(temp[1]);

    // temp = parameters[8].split("=");
    // var au = decodeURIComponent(temp[1]);

    document.getElementById("parametre1").innerHTML = "Nom : " + nom;
    document.getElementById("parametre2").innerHTML = "Prénom : " + prenom;
    document.getElementById("parametre3").innerHTML =
      "Formations Suivie : " + formation;
    document.getElementById("parametre4").innerHTML = "Le : " + le;
    document.getElementById("parametre5").innerHTML = "De : " + de;
    document.getElementById("parametre6").innerHTML = "A : " + a;
    document.getElementById("parametre7").innerHTML = "Du : " + du;
    // document.getElementById("parametre8").innerHTML = "Au : " + au;
  } catch (error) {
    console.error(error);
    console.error("Il n'y a pas de paramètres");
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
  }
}
function ChargePremierePage() {
  fetchJson();
}

function ChargeDeuxiemePage() {
  addParametersInForm();
}
