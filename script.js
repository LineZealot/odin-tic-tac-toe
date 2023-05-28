function playGame() {
  const pageBody = document.getElementById('game-body');

  const Gameboard = {
    gameboardSquares: [],
    createGameboard: () => {
      const gameboardTable = document.createElement('table');
      gameboardTable.className = 'gameboard';
      gameboardTable.id = 'gameboard';

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
      return gameboardTable;
    },
    gameSquareEvents: () => {
      Gameboard.gameboardSquares.forEach((e) => {
        e.addEventListener('click', () => {
          e.textContent = 'X';
        });
      });
    },
    destroyGameboard: () => {
      const destroyGameboardButton = document.createElement('button');
      destroyGameboardButton.className = 'destroy-gameboard-button';
      destroyGameboardButton.textContent = 'Reset Board';

      destroyGameboardButton.addEventListener('click', () => {
        document.getElementById('gameboard').remove();
        Gameboard.createGameboard();
        Gameboard.gameSquareEvents();
      });
      pageBody.appendChild(destroyGameboardButton);
    },

  };

  Gameboard.destroyGameboard();
  Gameboard.createGameboard();
  Gameboard.gameSquareEvents();
}

playGame();
