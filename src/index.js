//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");
const dialog = document.getElementById("dialog");
const closeButton = document.getElementById("close");
const checkbox = document.getElementById("afficher");


closeButton.addEventListener("click", () => {

  /**
    if (checkbox.checked) {
      //garder en memoir local le bouton cocher
      localStorage.setItem("dialogClosed", "true");
    }*/
    dialog.close();
    
  });
  
  dialog.addEventListener("load", Opendialog())
  function Opendialog(){
    dialog.showModal();
  }
  let shark = document.getElementById("shark")
  let codesecret = document.getElementById("codesecret");

  function VerifierCode(){
   
    let codesecretTest = codesecret.value;
    if(codesecretTest == "requin"){
      shark.setAttribute("class", "");
    }
  }
  codesecret.addEventListener("input", VerifierCode);


//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyzéèêë"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
 "La catégorie choisie est les équipes de la Premier League",
  "La catégorie choisie est les films",
  "La catégorie choisie est les villes",
  "La catégorie choisie est les jeux vidéos",
  "La catégorie choisie est les exercice de muscalation"
];

const categories = [
  [
    "everton",
    "liverpool",
    "swansea",
    "chelsea",
    "hull",
    "manchester-city",
    "newcastle-united"
  ],
  ["alien", "inspecteur-harry", "gladiateur", "trouver-némo", "les-dents-de-la-mer"],
  ["manchester", "milan", "madrid", "amsterdam", "prague"],
  ["terraria","minecraft","wii-sports-resort","god-of-war", "monster-hunter", "just-dance"],
  ["développé-couché","soulevé-de-terre", "extension-des-triceps","traction","élévation-latérale"]
];

const hints = [
  [
    "situé en Mersyside",
    "situé en Mersyside",
   "Première équipe galloise à atteindre la Premier League",
    "Propriété d'un milliardaire russe",
    "Autrefois dirigée par Phil Brown",
    "Finaliste de la FA Cup en 2013",
    "Premier club de Gazza"
  ],
  [
    "Film d'horreur de science-fiction",
    "Film d'action américain de 1971",
    "Drame historique",
    "Poisson animé",
    "Grand requin blanc"
  ],
  [
    "Ville du nord du Royaume-Uni",
    "Domicile de l'AC et de l'Inter",
    "Capitale de l'Espagne",
    "Capitale des Pays-Bas",
    "Capitale de la République tchèque"
  ],
  [
    "essayez aussi minecraft",
    "essayez aussi terraria",
    "matt",
    "kratos",
    "le fatalis",
    "mariah carey"
  ],
  [
    "L'un des exercice les plus aimé;",
    "Eddi hall est les premier a voir fais 500kg sur cet exercice",
    "cet exrcice entraine le muscle qui constitue 60% de la mass des haut du bra",
    "david Goggins a obtenue deux fois le record son dernier etais de 7801 repetitions",
    "un exercice qui est reconue pour etre extrement dificile"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `indice -`;
  livesDisplay.innerHTML = `tu as ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `TU AS GAGNÉ!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `tu as ${life} vies!`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `tu as ${life} vies!`;
      } else {
        livesDisplay.innerHTML = `PARTIE TERMINER!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `TU AS GAGNÉ`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];
