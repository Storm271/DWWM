let NomSaisie;
let PrenomSaisie;


function Saisie(Nom, Prenom){
  
    let NomPrenom;
    

    NomPrenom=Nom + " " + Prenom;
    return NomPrenom;

}

NomSaisie=prompt("Donnez votre nom:");
PrenomSaisie=prompt("Donnez votre prénom:");
alert("Hello " + Saisie(NomSaisie,PrenomSaisie));


if (NomSaisie=="Clain" && PrenomSaisie=="Amaury")
{
    PrenomSaisie="Le Petit";
}
else
{
    PrenomSaisie="Le boss";
}
alert("Hello " + Saisie(NomSaisie,PrenomSaisie));