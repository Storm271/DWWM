let btn = document.getElementById("button");
btn.addEventListener("click", spoil);
let texte = document.getElementById("texte");
texte.style.visibility = "hidden";
function spoil() {
  let x = document.getElementById("texte");
  if (x.style.visibility === "hidden") {
    button.textContent = "visible";
    x.style.visibility = "visible";
  } else {
    button.textContent = "Spoiler";
    x.style.visibility = "hidden";
  }
}
