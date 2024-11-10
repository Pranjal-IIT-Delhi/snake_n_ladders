// Initialize player positions
let playerPositions = [1, 1, 1];  // Player 1, Player 2, Player 3 start at position 1
let playerTurn = 0;  // Player 1 starts first

// Map for snakes and ladders (start: end)
const snakesAndLadders = {
    3: 22,
    5: 8,
    11: 26,
    20: 29,
    17: 4, 
    19: 7, 
    27: 1,
    21: 9,
};

// Update player positions on the board
function updateBoard() {
    document.querySelectorAll('.cell').forEach(cell => {
        cell.style.backgroundColor = '#e0e0e0';  // Reset all cells
    });

    // Highlight player positions
    playerPositions.forEach((position, index) => {
        document.getElementById(`cell-${position}`).style.backgroundColor = `#${['ff0000', '00ff00', '0000ff'][index]}`;
    });
}

// Roll dice and move the current player
function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = `Player ${playerTurn + 1} rolled a ${diceRoll}`;
    
    // Move the current player
    playerPositions[playerTurn] += diceRoll;

    // Handle snake and ladder
    if (snakesAndLadders[playerPositions[playerTurn]]) {
        playerPositions[playerTurn] = snakesAndLadders[playerPositions[playerTurn]];
    }

    // Check for winner
    if (playerPositions[playerTurn] >= 100) {
        alert(`Player ${playerTurn + 1} wins!`);
        resetGame();
        return;
    }

    // Move to next player
    playerTurn = (playerTurn + 1) % 3;

    updateBoard();
}

// Reset game
function resetGame() {
    playerPositions = [1, 1, 1];
    playerTurn = 0;
    updateBoard();
}

// Initialize the game
document.getElementById('roll-button').addEventListener('click', rollDice);

// Generate board cells dynamically
window.onload = function() {
    const board = document.getElementById('board');
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.id = `cell-${i}`;
        board.appendChild(cell);
    }
    updateBoard();  // Update the initial board
};
