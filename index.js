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
