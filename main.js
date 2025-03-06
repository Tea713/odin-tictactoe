function Player(name, move) {
    this.name = name;
    this.move = move;
}

const theGame = (function() {
    let board = Array(3).fill(null).map(() => Array(3).fill(0));
    let player1 = new Player("Player 1", (x, y) => {
        board[x][y] = 1;
    });
    let player2 = new Player("Player 2", (x, y) => {
        board[x][y] = 2;
    }) 

    const p1Move = (x, y) => player1.move(x, y);
    const p2Move = (x, y) => player2.move(x, y);
    const clearBoard = () => board = Array(3).fill(null).map(() => Array(3).fill(0));
    const checkBoard = () => null;
    const printBoard = () => console.log(board);

    return { printBoard, p1Move, p2Move, clearBoard }
})();

theGame.p1Move(0, 0);
theGame.p2Move(1, 1);
theGame.p1Move(0, 1);
theGame.printBoard();
