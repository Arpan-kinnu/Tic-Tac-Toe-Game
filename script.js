let boxes = document.querySelectorAll(".box");
let showWinnerDocument = document.querySelector(".show-winner");
let newGame = document.querySelector("#new-game");
let resetButton = document.querySelector("#reset-button");
let h3 = document.querySelector("h3");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked!");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
        checkDraw();
    })
})

const enable = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const disabled = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const resetGame = () => {
    turnO = true;
    enable();
    showWinnerDocument.classList.add("hide");
}

newGame.addEventListener("click", () => {
    resetGame();
})

resetButton.addEventListener("click", () => {
    resetGame();
})


const checkWinner = () => {
    for (let pattern of winPatterns) {
        

        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log("winner");
                showWinnerDocument.classList.remove("hide");
                h3.innerText = `Winner ${pos1val}`;
                disabled();
            }
        }
    }
}

const checkDraw = () => {
    let isBoardFull = [...boxes].every((box) => box.innerText !== "");
    let winnerAlreadyShow = !showWinnerDocument.classList.contains("hide");
    if(isBoardFull && !winnerAlreadyShow) {
        console.log("loss");
        showWinnerDocument.classList.remove("hide");
        h3.innerText = "It's a Draw!";
        disabled();
    }
}