function playGame() {
  const pageBody = document.getElementById('game-body');

  function Player(playerName, color, symbol, id, slot) {
    return {
      playerName,
      color,
      symbol,
      id,
      slot,
    };
  }
  const gameController = {
    playerOne: Player(
      'Holden',
      'red',
      'X',
      'p1',
      document.getElementById('player-slot-p1'),
    ),
    playerTwo: Player(
      'Alex',
      'green',
      'O',
      'p2',
      document.getElementById('player-slot-p2'),
    ),
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
          Gameboard.gameboardSquares.push({
            body: gameSquare,
            value: 'empty',
          });
        }
        gameboardTable.appendChild(gameRow);
      }

      pageBody.appendChild(gameboardTable);
      return gameboardTable;
    },

    checkThreeRow: (square, player) => {
      const winningRows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      const isWinningRow = winningRows.some(
        (row) => row.every((index) => square[index].value === player.symbol),
      );

      if (isWinningRow) {
        player.slot.textContent = `${player.playerName} wins!`;
      }
    },

    gameSquareEvents: () => {
      Gameboard.gameboardSquares.forEach((e) => {
        e.body.addEventListener('click', () => {
          if (e.body.value === 'unclicked') {
            let currentPlayer;
            if (gameController.turn === 'p1') {
              gameController.turn = 'p2';
              currentPlayer = gameController.playerOne;
              Gameboard.changeSlotColor(
                gameController.playerTwo,
                gameController.playerOne,
              );
            } else {
              [gameController.turn] = gameController.playerIds;
              currentPlayer = gameController.playerTwo;
              Gameboard.changeSlotColor(
                gameController.playerOne,
                gameController.playerTwo,
              );
            }
            e.body.textContent = currentPlayer.symbol;
            e.body.style.color = currentPlayer.color;
            e.body.value = 'clicked';
            e.value = currentPlayer.symbol;
            Gameboard.checkThreeRow(Gameboard.gameboardSquares, currentPlayer);
          }
        });
      });
    },

    destroyGameboard: () => {
      const gameInfo = document.getElementById('game-info-box');
      const destroyGameboardButton = document.createElement('button');
      destroyGameboardButton.className = 'destroy-gameboard-button';
      destroyGameboardButton.textContent = 'Reset Board';

      destroyGameboardButton.addEventListener('click', () => {
        document.getElementById('gameboard').remove();
        Gameboard.createGameboard();
        Gameboard.gameSquareEvents();
      });
      gameInfo.appendChild(destroyGameboardButton);
    },

    changeSlotColor: (x, y) => {
      x.slot.style.backgroundColor = x.color;
      y.slot.style.backgroundColor = 'white';
    },
  };

  function startGame() {
    gameController.playerOne.slot.textContent = gameController.playerOne.playerName;
    gameController.playerTwo.slot.textContent = gameController.playerTwo.playerName;
    Gameboard.destroyGameboard();
    Gameboard.createGameboard();
    Gameboard.gameSquareEvents();
    Gameboard.changeSlotColor(
      gameController.playerOne,
      gameController.playerTwo,
    );
  }
  startGame();
}

playGame();
