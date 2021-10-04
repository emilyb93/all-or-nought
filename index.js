let currentUser = "X";
let gameWon = false;
let availableMoves = 9;

function setPiece(btn) {
  const currentBtn = document.getElementById(btn);
  const coords = btn.split("-");
  

  if (currentBtn.innerText === "-" && gameWon === false) {
    availableMoves--;
    currentBtn.innerText = currentUser;
    currentBtn.classList.add("clicked");

    const valueObject = {};
    valueObject.diag1Values = Object.values(
      document.getElementsByClassName("d1")
    ).map((currentPos) => currentPos.innerText);

    valueObject.diag2Values = Object.values(
      document.getElementsByClassName("d2")
    ).map((currentPos) => currentPos.innerText);

    valueObject.rowValues = Object.values(
      document.getElementsByClassName(`r${coords[0]}`)
    ).map((currentPos) => currentPos.innerText);

    valueObject.columnValues = Object.values(
      document.getElementsByClassName(`c${coords[1]}`)
    ).map((currentPos) => currentPos.innerText);

    let winningLine = "";

    for (let currentArray in valueObject) {
      if (
        valueObject[currentArray].every(
          (currentValue) => currentValue === currentUser
        )
      ) {
        gameWon = true;
        winningLine = currentArray;
      }
    }

    displayResult()
    updateScores(currentUser)
    highlightWinningSquares(winningLine, coords)

    changeCursor();

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
    button.classList.remove("clicked");
    // button.classList.remove("winning-button");
    button.classList.remove("winning")
  }
  gameWon = false;

  const winningText = document.getElementById("winningText");
  winningText.innerText = "";
  availableMoves = 9;
  const winningDiv = document.getElementById("winning-text-div");
  winningDiv.classList.add("hidden")
  
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

function changeCursor() {
  const allButtons = document.getElementsByClassName("game-button");

  // console.log(allButtons);
  for (let button of allButtons) {
    if (currentUser === "X") {
      button.classList.remove("x-cursor");
      button.classList.add("o-cursor");
    } else {
      button.classList.remove("o-cursor");
      button.classList.add("x-cursor");
    }
  }
}

const  highlightWinningSquares = async(winningLine, coords) => {
  
  try {
  const idObject = {
    diag1Values: ["r1 c1", "r2 c2", "r3 c3"],
    diag2Values: ["r1 c3", "r2 c2", "r3 c1"],
    rowValues: coords[0],
    columnValues: coords[1],
  };

  if (winningLine === "diag1Values" || winningLine === "diag2Values") {
    idObject[winningLine].forEach((currentClass) => {
      const currentButton = document.getElementsByClassName(`${currentClass}`);

      console.log(currentButton);

      currentButton[0].classList.add("winning");
    });
  }
  if (winningLine === "rowValues"){
    const winningRow = document.getElementsByClassName(`r${coords[0]}`)
    for (let currentBtn in winningRow){
      winningRow[currentBtn].classList.add("winning")
      console.log(winningRow, winningRow[currentBtn])
    }
    
    }

    if (winningLine === "columnValues"){
      const winningRow = document.getElementsByClassName(`c${coords[1]}`)
      for (let currentBtn in winningRow){
        winningRow[currentBtn].classList.add("winning")
        console.log(winningRow, winningRow[currentBtn])
      }
      
      }


  } catch(err){
    console.log(err)
  }
}


function displayResult (){
  if (gameWon === true) {
    const winningText = document.getElementById("winningText");
    winningText.innerText = `${currentUser} Wins!`;

    ;
    ;

    const winningDiv = document.getElementById("winning-text-div");
 winningDiv.classList.remove("hidden")
  } else if (availableMoves === 0) {
    const winningText = document.getElementById("winningText");
    winningText.innerText = `Stalemate!`;

    const winningDiv = document.getElementById("winning-text-div");
 winningDiv.classList.remove("hidden")
  }
}