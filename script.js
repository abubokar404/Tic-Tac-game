const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
let currentPlayer = 'X';
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

restartButton.addEventListener('click', restartGame);

function handleClick(event) {
  const cell = event.target;

  if (cell.textContent !== '' || !gameActive) return;

  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer.toLowerCase());

  // Set color for X and O
  if (currentPlayer === 'X') {
    cell.style.color = "#00FF00"; // Green for X
  } else {
    cell.style.color = "#FF0000"; // Red for O
  }

  if (checkWin(currentPlayer)) {
    winnerMessage.textContent = `${currentPlayer} Wins! 🎉`;
    winnerMessage.classList.remove('hide');
    gameActive = false;
    return;
  }

  if (isDraw()) {
    winnerMessage.textContent = 'It\'s a Draw! 😶';
    winnerMessage.classList.remove('hide');
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].textContent === player);
  });
}

function isDraw() {
  return [...cells].every(cell => cell.textContent !== '');
}

function restartGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.style.color = ''; // Reset color
  });
  winnerMessage.classList.add('hide');
  currentPlayer = 'X';
  gameActive = true;
}
