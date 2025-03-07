function Player(name, move) {
    this.name = name;
    this.move = move;
}

const theGame = (function () {
    let board = Array(3)
        .fill(null)
        .map(() => Array(3).fill(0));
    let turns = 0;
    let player1 = new Player("Player 1", (x, y) => {
        board[x][y] = 1;
    });
    let player2 = new Player("Player 2", (x, y) => {
        board[x][y] = 2;
    });

    const p1Move = (x, y) => player1.move(x, y);
    const p2Move = (x, y) => player2.move(x, y);
    const clearBoard = () => {
        board = Array(3)
            .fill(null)
            .map(() => Array(3).fill(0));
        turns = 0;
    };
    const checkBoard = () => {
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                declareWinner(board[i][0]);
                return true;
            }
        }

        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[i][1] === board[i][2]) {
                declareWinner(board[i][0]);
                return true;
            }
        }
        if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            declareWinner(board[0][0]);
            return true;
        }
        if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
            declareWinner(board[0][2]);
            return true;
        }
        return false;
    };

    const declareWinner = (player) => {
        if (player === 1) {
            console.log(`${player1.name} has won!`);
        } else {
            console.log(`${player2.name} has won!`);
        }
    };
    const printBoard = () => console.log(board);

    return { printBoard, p1Move, p2Move, clearBoard, checkBoard };
})();

theGame.p1Move(0, 0);
theGame.checkBoard();
theGame.p2Move(1, 1);
theGame.checkBoard();
theGame.p1Move(0, 1);
theGame.checkBoard();
theGame.p2Move(1, 2);
theGame.checkBoard();
theGame.p1Move(0, 2);
theGame.checkBoard();
theGame.printBoard();
