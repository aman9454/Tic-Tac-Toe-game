let currentPlayer = 'X';
let gameStatus = '';
let gameOver = false;
let board = [];

// Initialize the board
for (let i = 0; i < 9; i++) {
    board.push('');
}

// Add event listeners to the squares
document.querySelectorAll('.square').forEach((square, index) => {
    square.addEventListener('click', () => {
        if (!gameOver && board[index] === '') {
            board[index] = currentPlayer;
            square.textContent = currentPlayer;
            checkWin();
            if (!gameOver) {
                // Computer's turn
                computerTurn();
            }
        }
    });
});

// Computer's turn
function computerTurn() {
    let availableSquares = [];
    for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
            availableSquares.push(i);
        }
    }
    let randomIndex = Math.floor(Math.random() * availableSquares.length);
    let computerMove = availableSquares[randomIndex];
    board[computerMove] = 'O';
    document.getElementById(`square${computerMove}`).textContent = 'O';
    checkWin();
}

// Check for a win
function checkWin() {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        if (board[condition[0]] === board[condition[1]] && board[condition[1]] === board[condition[2]] && board[condition[0]] !== '') {
            gameStatus = board[condition[0]] === 'X' ? 'You win!' : 'Computer wins!';
            gameOver = true;
            updateGameStatus();
            return;
        }
    }

    // Check for a draw
    if (!board.includes('')) {
        gameStatus = 'It\'s a draw!';
        gameOver = true;
        updateGameStatus();
    }
}

// Update the game status
function updateGameStatus() {
    document.getElementById('game-status').textContent = gameStatus;
    document.querySelectorAll('.square').forEach((square) => {
        if (gameStatus === 'You win!') {
            square.classList.add('win');
        } else if (gameStatus === 'Computer wins!') {
            square.classList.add('lose');
        } else {
            square.classList.add('draw');
        }
    });
}

// Restart the game
document.getElementById('restart-button').addEventListener('click', () => {
    currentPlayer = 'X';
    gameStatus = '';
    gameOver = true;
    board = [];
    for (let i = 0; i < 9; i++) {
        board.push('');
    }
    document.querySelectorAll('.square').forEach((square) => {
        square.textContent = '';
        square.classList.remove('win', 'lose', 'draw');
    });
});