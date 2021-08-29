//#region Selectors and Variable declarations
const modal = new bootstrap.Modal(document.getElementById("form-modal"));
const modalTest = document.getElementById("form-modal");
const form = document.querySelectorAll(".needs-validation");
const startInput = document.getElementById("input");

//Header Computer Display
const compChoice = document.getElementById("computer-choice");
const compScoreSpan = document.getElementById("computer-score");
const compRoundSpan = document.getElementById("round");
const primaryStart = document.getElementById("start-button");
const userScoreSpan = document.getElementById("user-score");

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
const alertWinMsg = document.getElementById("win-msg");

//UL Selector
const ulSelector = document.getElementById("no-button");

let gameActive = false;
let round;
let turn = 0;
let userScore = 0;
let computerScore = 0;
let loggedScore = 0;
const comp = ["rock", "paper", "scissors", "lizard", "spock"];
//#endregion

const clearAll = () => {
  round = 0;
  userScore = 0;
  computerScore = 0;
  turn = 0;
  compRoundSpan.textContent = 0;
  compScoreSpan.textContent = 0;
  userScoreSpan.textContent = 0;
  compChoice.textContent = "???";
  gameActive = false;
};

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
        const newWinner = {
          name: alertWinPut.value,
          rounds: round,
          points: loggedScore,
        };

        fetch("/api/new-score", {
          method: "POST",
          body: JSON.stringify(newWinner),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              clearAll();
              alertWinPut.value = "";
              alertWinDiv.setAttribute("style", "display: none;");
              form.classList.remove("was-validated");

              primaryStart.setAttribute("style", "display: inline-block;");
            }
          });
      }
    }
  });
});

primaryStart.addEventListener("click", (e) => {
  e.preventDefault();
  modal.show();
  primaryStart.setAttribute("style", "display : none;");
});

const whoWon = (target, compPlay, element) => {
  let a = compPlay.toUpperCase();
  if (target == compPlay) {
    compChoice.textContent = a;
    element.setAttribute("style", "background-color : #fff3cd");
    setTimeout(() => {
      element.removeAttribute("style");
    }, 1000);
  } else if (
    /*
    Rock > Lizard, Scissors;

    Paper > Rock, Spock

    Scissors > Paper, Lizard

    Lizard > Spock, Paper

    Spock > Rock, Scissors
    */
    (target == "rock" && compPlay == "lizard") ||
    (target == "rock" && compPlay == "scissors") ||
    (target == "paper" && compPlay == "rock") ||
    (target == "paper" && compPlay == "spock") ||
    (target == "scissors" && compPlay == "paper") ||
    ("scissors" && compPlay == "lizard") ||
    (target == "lizard" && compPlay == "spock") ||
    (target == "lizard" && compPlay == "paper") ||
    (target == "spock" && compPlay == "rock") ||
    (target == "spock" && compPlay == "scissors")
  ) {
    element.setAttribute("style", "background-color : #d1e7dd");
    setTimeout(() => {
      element.removeAttribute("style");
    }, 1000);
    userScore++;
    turn++;
    loggedScore += 5;
    compRoundSpan.textContent = turn;
    userScoreSpan.textContent = userScore;
    compChoice.textContent = a;
  } else {
    element.setAttribute("style", "background-color : #f8d7da");
    setTimeout(() => {
      element.removeAttribute("style");
    }, 1000);
    computerScore++;
    turn++;
    loggedScore -= 2;
    compRoundSpan.textContent = turn;
    compScoreSpan.textContent = computerScore;
    compChoice.textContent = a;
  }

  if (turn >= round) {
    gameActive = false;
    setTimeout(() => {
      determineWinner(userScore, computerScore);
    }, 500);
  }
};

const determineWinner = (userScore, computerScore) => {
  if (userScore == computerScore) {
    alertTieDiv.setAttribute("style", "display : block");
    alertTieSpan.textContent = loggedScore;
  } else if (userScore > computerScore) {
    alertWinDiv.setAttribute("style", "display : block");
    alertWinMsg.textContent = `Congratulations you scored ${loggedScore} points!`;
  } else {
    alertLoseDiv.setAttribute("style", "display : block");
    alertLoseRounds.textContent = round;
    alertLoseTurn.textContent = userScore;
  }
};

ulSelector.addEventListener("click", (e) => {
  if (turn != round && gameActive) {
    const element = e.target;
    const target = e.target.getAttribute("data-value");
    const compPlay = comp[Math.floor(Math.random() * comp.length)];
    // const compPlay = "paper";
    whoWon(target, compPlay, element);
  } else {
    e.preventDefault();
  }
});

modalTest.addEventListener("shown.bs.modal", () => {
  startInput.focus();
});

alertLoseBtn.addEventListener("click", () => {
  modal.show();
  alertLoseDiv.setAttribute("style", "display : none;");
  clearAll();
});

alertTieBtn.addEventListener("click", () => {
  modal.show();
  alertTieDiv.setAttribute("style", "display : none;");
  clearAll();
});
