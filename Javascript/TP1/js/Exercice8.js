var c1;
var c2;
var somme;

c1=prompt("1er nombre");
c2=prompt("2e nombre");




function addition() {
    somme= parseInt (c1)+parseInt (c2);
    document.write (somme);
}

function sous() {
    somme=c1-c2;
    document.write (somme);
}

function multi() {
    somme=c1*c2;
    document.write (somme);
}

function divi() {
    somme=c1/c2;
    document.write (somme);
}