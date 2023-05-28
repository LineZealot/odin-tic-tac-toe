function playGame() {
  const pageBody = document.querySelector('body');

  const Gameboard = {
    gameboardSquares: [],
    createGameboard: () => {
      const gameboardTable = document.createElement('table');
      gameboardTable.className = 'game-board';

      for (let i = 0; i < 3; i += 1) {
        const gameRow = document.createElement('tr');
        const rowSquareId = `row-${i}-`;
        gameRow.className = 'game-row';
        gameRow.id = `game-row${i}`;

        for (let j = 0; j < 3; j += 1) {
          const gameSquare = document.createElement('td');
          gameSquare.className = 'game-square';
          gameSquare.id = `${rowSquareId}square-${j}`;
          gameRow.appendChild(gameSquare);
          Gameboard.gameboardSquares.push(gameSquare);
        }
        gameboardTable.appendChild(gameRow);
      }

      pageBody.appendChild(gameboardTable);
    },
  };

  Gameboard.createGameboard();
}

playGame();
