const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('.board');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Handle cell click
function handleClick(e) {
    const cell = e.target;
    const cellIndex = Array.from(cellElements).indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        statusMessage.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
    } else if (gameState.every(cell => cell !== '')) {
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    }
}

// Check for win
function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

// Restart the game
function restartGame() {
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusMessage.textContent = `It's ${currentPlayer}'s turn`;
    cellElements.forEach(cell => {
        cell.textContent = '';
    });
}

// Add event listeners
cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick);
});
restartButton.addEventListener('click', restartGame);
