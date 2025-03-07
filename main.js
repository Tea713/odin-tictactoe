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
        board[x][y] = token;
        move++;
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
        theGameBoard.playerMove(activePlayer.token, x, y);
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

    return { playTurn };
})();

gameController.playTurn(0, 0);
gameController.playTurn(1, 0);
gameController.playTurn(0, 1);
gameController.playTurn(1, 1);
gameController.playTurn(2, 2);
gameController.playTurn(0, 2);
gameController.playTurn(2, 0);
gameController.playTurn(2, 1);
gameController.playTurn(1, 2);
