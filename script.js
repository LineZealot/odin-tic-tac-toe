function playGame() {
  const pageBody = document.getElementById('game-body');

  function Player(playerName, color, symbol) {
    return {
      playerName,
      color,
      symbol,
    };
  }
  const gameController = {
    playerOne: Player('Holden', 'red', 'X', 'p1'),
    playerTwo: Player('Alex', 'green', 'O', 'p2'),
    playerIds: ['p1', 'p2'],
    turn: 'p1',
  };

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
          gameSquare.value = 'unclicked';
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
          if (e.value === 'unclicked') {
            let currentPlayer;
            if (gameController.turn === 'p1') {
              gameController.turn = 'p2';
              currentPlayer = gameController.playerOne;
            } else {
              [gameController.turn] = gameController.playerIds;
              currentPlayer = gameController.playerTwo;
            }
            e.textContent = currentPlayer.symbol;
            e.style.color = currentPlayer.color;
            e.value = 'clicked';
          }
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
