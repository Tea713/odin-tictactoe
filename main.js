function Player(name, token, score) {
    this.name = name;
    this.token = token;
    this.score = score;
}

const theGameBoard = (function () {
    let board = Array(3)
        .fill(null)
        .map(() => Array(3).fill(0));
    let move = 0;

    const clearBoard = () => {
        board = Array(3)
            .fill(null)
            .map(() => Array(3).fill(0));
        move = 0;
    };

    const playerMove = (token, x, y) => {
        if (board[x][y] !== 0) {
            return false;
        }
        board[x][y] = token;
        move++;
        return true;
    };

    const checkWinner = () => {
        for (let i = 0; i < 3; i++) {
            if (
                board[i][0] !== 0 &&
                board[i][0] === board[i][1] &&
                board[i][1] === board[i][2]
            ) {
                return true;
            }
            if (
                board[0][i] !== 0 &&
                board[0][i] === board[1][i] &&
                board[1][i] === board[2][i]
            ) {
                return true;
            }
        }
        if (
            board[0][0] !== 0 &&
            board[0][0] === board[1][1] &&
            board[1][1] === board[2][2]
        ) {
            return true;
        }
        if (
            board[0][2] !== 0 &&
            board[0][2] === board[1][1] &&
            board[1][1] === board[2][0]
        ) {
            return true;
        }
        return false;
    };

    const checkDraw = () => move === 9;

    const getBoard = () => board;

    return { getBoard, playerMove, clearBoard, checkWinner, checkDraw };
})();

const gameController = (function () {
    let player1 = new Player("Player 1", 1, 0);
    let player2 = new Player("Player 2", 2, 0);
    let activePlayer = player1;
    let gameOver = false;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const playTurn = (x, y) => {
        if (gameOver) {
            console.log("Game has ended.");
            return false;
        }
        if (!theGameBoard.playerMove(activePlayer.token, x, y)) {
            console.log("Invalid move!");
            return false;
        }
        console.log(theGameBoard.getBoard());
        if (theGameBoard.checkWinner()) {
            console.log(`${activePlayer.name} has won!`);
            gameOver = true;
            incrementPoint(activePlayer);
            screenController.updateScore(player1, player2);
            return true;
        }
        if (theGameBoard.checkDraw()) {
            console.log("Draw!");
            gameOver = true;
            return true;
        }
        switchPlayer();
        return false;
    };

    const resetGame = () => {
        theGameBoard.clearBoard();
        activePlayer = player1;
        gameOver = false;
    };

    const getPlayer1 = () => {
        return player1;
    };

    const getPlayer2 = () => {
        return player2;
    };

    const getActivePlayer = () => {
        return activePlayer;
    }

    const changePlayerName = (isPlayer1, newName) => {
        if (isPlayer1) {
            player1.name = newName;
        } else {
            player2.name = newName;
        }
    };

    const incrementPoint = (player) => {
        player.score++;
    };

    return { playTurn, resetGame, changePlayerName, getPlayer1, getPlayer2, getActivePlayer };
})();

const screenController = (function () {
    const resetButton = document.getElementById("reset-btn");
    const player1Input = document.getElementById("player1");
    const player2Input = document.getElementById("player2");
    const player1ScoreDisplay = document.getElementById("player1-score");
    const player2ScoreDisplay = document.getElementById("player2-score");
    const cells = document.querySelectorAll("#board button");

    resetButton.addEventListener("click", () => {
        gameController.resetGame();
        updateBoard();
    });

    player1Input.addEventListener("change", () => {
        if (player1Input.value.trim() !== "") {
            gameController.changePlayerName(true, player1Input.value.trim());
        } else {
            gameController.changePlayerName(true, "Player 1");
        }
    });

    player2Input.addEventListener("change", () => {
        if (player2Input.value.trim() !== "") {
            gameController.changePlayerName(false, player2Input.value.trim());
        } else {
            gameController.changePlayerName(false, "Player 2");
        }
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const x = parseInt(cell.dataset.row);
            const y = parseInt(cell.dataset.col);
            gameController.playTurn(x, y);
            updateBoard();
        });
    });

    const updateBoard = () => {
        const flatBoard = theGameBoard.getBoard().flat();
        for (let i = 0; i < 9; i++) {
            if (flatBoard[i] === 0) cells[i].innerHTML = "";
            else if (flatBoard[i] === 1) cells[i].innerHTML = "X";
            else cells[i].innerHTML = "O";
        }
    };

    const updateScore = () => {
        player1ScoreDisplay.textContent = gameController.getPlayer1().score;
        player2ScoreDisplay.textContent = gameController.getPlayer2().score;
    };

    updateScore();

    return { updateScore };
})();
