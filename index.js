//#region Selectors and Variable declarations
const modal = new bootstrap.Modal(document.getElementById("form-modal"));
const form = document.querySelectorAll(".needs-validation");
const startInput = document.getElementById("input");

//Header Computer Display
const compChoice = document.getElementById("computer-choice");
const compScoreSpan = document.getElementById("computer-score");
const compRoundSpan = document.getElementById("round");
const primaryStart = document.getElementById("start-button");

// Tie Alert
const alertTieDiv = document.getElementById("alert-tie");
const alertTieSpan = document.getElementById("tie-points");
const alertTieBtn = document.getElementById("tie-button");

// Lose Alert
const alertLoseDiv = document.getElementById("alert-lose");
const alertLoseRounds = document.getElementById("lose-rounds");
const alertLoseTurn = document.getElementById("turn-rounds");
const alertLoseBtn = document.getElementById("lose-button");

// Win Alert
const alertWinDiv = document.getElementById("alert-win");
const alertWinPut = document.getElementById("win-put");

//UL Selector
const ulSelector = document.getElementById("no-button");

let gameActive = false;
let round;
let turn = 0;
let userScore = 0;
let computerScore = 0;
let loggedScore = 0;
//#endregion

/*
Rock > Lizard, Scissors;

Paper > Rock, Spock

Scissors > Paper, Lizard

Lizard > Spock, Paper

Spock > Rock, Scissors
*/

form.forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const target = e.target;

    if (target.id == "start-form") {
      if (form.checkValidity() == false) {
        e.preventDefault();
      }
      form.classList.add("was-validated");
      if (startInput.value > 2 || startInputvalue < 501) {
        gameActive = true;
        round = startInput.value;
        modal.hide();

        startInput.value = "";
        form.classList.remove("was-validated");
      }
      startInput.value = "";
      form.classList.remove("was-validated");
    } else if (target.id == "win-form") {
      e.preventDefault();
      if (form.checkValidity() == false) {
        e.preventDefault();
      }
      form.classList.add("was-validated");
      //todo: POST to DB
      //Placeholder conditional for testing
      if (alertWinPut.value) {
        alertWinPut.value = "";
        alertWinDiv.setAttribute("style", "display : none;");
        form.classList.remove("was-validated");
      }
    }
  });
});

primaryStart.addEventListener("click", (e) => {
  e.preventDefault();
  modal.show();
  primaryStart.setAttribute("style", "display : none;");
});
