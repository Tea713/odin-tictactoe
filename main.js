function Player(name, token) {
    this.name = name;
    this.token = token;
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
    let player1 = new Player("Player 1", 1);
    let player2 = new Player("Player 2", 2);
    let activePlayer = player1;

    const switchPlayer = () => {
        activePlayer = activePlayer === player1 ? player2 : player1;
    };

    const playTurn = (x, y) => {
        if (!theGameBoard.playerMove(activePlayer.token, x, y)) {
            console.log("Invalid move!");
            return false;
        }
        console.log(theGameBoard.getBoard());
        if (theGameBoard.checkWinner()) {
            console.log(`${activePlayer.name} has won!`);
            return true;
        }
        if (theGameBoard.checkDraw()) {
            console.log("Draw!");
            return true;
        }
        switchPlayer();
        return false;
    };

    const resetGame = () => {
        theGameBoard.clearBoard();
        activePlayer = player1;
    };

    return { playTurn, resetGame };
})();

const screenController = (function () {
    const resetButton = document.getElementById("reset-btn").addEventListener("click", () => {
        gameController.resetGame();
        updateScreen();
    });
    const cells = document.querySelectorAll("#board button");
    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const x = parseInt(cell.dataset.row);
            const y = parseInt(cell.dataset.col);
            gameController.playTurn(x, y);
            updateScreen();
        });
    });
    const updateScreen = () => {
        flatBoard = theGameBoard.getBoard().flat();
        for (let i = 0; i < 9; i++) {
            if(flatBoard[i] === 0) cells[i].innerHTML = '';
            else if (flatBoard[i] === 1) cells[i].innerHTML = 'X';
            else cells[i].innerHTML = 'O';
        }
    };
})();
