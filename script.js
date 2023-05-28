function playGame() {
  const pageBody = document.querySelector('body');

  const Gameboard = {
    gameBoardSquares: [],
    createGameBoard: () => {
      const gameBoardTable = document.createElement('table');
      gameBoardTable.className = 'game-board';

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
          Gameboard.gameBoardSquares.push(gameSquare);
        }
        gameBoardTable.appendChild(gameRow);
      }

      pageBody.appendChild(gameBoardTable);
    },
  };

  Gameboard.createGameBoard();
}

playGame();
