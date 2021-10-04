let currentUser = "X";
let gameWon = false;
let availableMoves = 9;

function setPiece(btn) {
  const currentBtn = document.getElementById(btn);
  const coords = btn.split("-");

 

  if (currentBtn.innerText === "-" && gameWon === false) {
    availableMoves--;
    currentBtn.innerText = currentUser;

    const diag1Values = Object.values(
      document.getElementsByClassName("d1")
    ).map((currentPos) => currentPos.innerText);

    const diag2Values = Object.values(
      document.getElementsByClassName("d2")
    ).map((currentPos) => currentPos.innerText);

    const rowValues = Object.values(
      document.getElementsByClassName(`r${coords[0]}`)
    ).map((currentPos) => currentPos.innerText);
    //   console.log(rowValues);

    const columnValues = Object.values(
      document.getElementsByClassName(`c${coords[1]}`)
    ).map((currentPos) => currentPos.innerText);
    //   console.log(columnValues);

    const allValues = [rowValues, columnValues, diag1Values, diag2Values];

    allValues.forEach((array) => {
      if (array.every((currentValue) => currentValue === currentUser)) {
        gameWon = true;
      }
    });

    if (gameWon === true) {
      const winningText = document.getElementById("winningText");
      winningText.innerText = `${currentUser} Wins!`;
      updateScores(currentUser);
    } else if (availableMoves === 0) {
      const winningText = document.getElementById("winningText");
      winningText.innerText = `Stalemate!`;

    }

    currentUser === "X" ? (currentUser = "O") : (currentUser = "X");
    const currentPlayer = document.getElementById("current-player");
    currentPlayer.innerText = currentUser;
  }
}

// reset function

function resetBoard() {
  const allButtons = document.getElementsByClassName("game-button");
  console.log(allButtons);

  for (let button of allButtons) {
    // console.log(button)
    button.innerText = "-";
  }
  gameWon = false;

  const winningText = document.getElementById("winningText");
  winningText.innerText = "";
  availableMoves = 9;
}

let xScore = 0;
let oScore = 0;

function updateScores(winner) {
  const xCount = document.getElementById("x-score");
  const oCount = document.getElementById("o-score");

  if (winner === "X") {
    xScore++;
  } else if (winner === "O") {
    oScore++;
  }

  xCount.innerText = xScore;
  oCount.innerText = oScore;
}
