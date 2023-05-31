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

  const playerController = {
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
    turn: 'p1',
  };

  const gameboard = {
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

      currentPlayer.slot.style.backgroundColor = x.color;
      priorPlayer.slot.style.backgroundColor = 'white';
    checkThreeRow: (square, p) => {
      const player = p;

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
        gameController.winner = player.playerName;
      }
    },

    gameSquareEvents: () => {
      Gameboard.gameboardSquares.forEach((e) => {
        e.body.addEventListener('click', () => {
          if (
            e.body.value === 'unclicked'
            && gameController.winner === 'none'
          ) {
            let currentPlayer;
            if (playerController.turn === 'p1') {
              playerController.turn = 'p2';
              currentPlayer = playerController.playerOne;
              Gameboard.changeSlotColor(
                playerController.playerTwo,
                playerController.playerOne,
              );
            } else {
              [playerController.turn] = playerController.playerIds;
              currentPlayer = playerController.playerTwo;
              Gameboard.changeSlotColor(
                playerController.playerOne,
                playerController.playerTwo,
              );
            }
            e.body.textContent = currentPlayer.symbol;
            e.body.style.color = currentPlayer.color;
            e.body.value = 'clicked';
            e.value = currentPlayer.symbol;
            Gameboard.checkThreeRow(Gameboard.gameboardSquares, currentPlayer);
            );
          }
        });
      });
    },

      destroyGameboardButton.textContent = 'Reset Board';
    resetGame: () => {
      gameboard.resetGameButton().addEventListener('click', () => {
        gameController.winner = 'none';
        document.getElementById('gameboard').remove();
        Gameboard.createGameboard();
        gameboard.gameboardSquares.splice(0, gameboard.gameboardSquares.length);
        gameboard.creategameboard();
        gameController.gameSquareEvents();
        console.log(gameboard.gameboardSquares);
        function resetPlayerText () {
          playerController.playerOne.slot.textContent = playerController.
        } ();
      });
      gameInfo.appendChild(destroyGameboardButton);
    },

    changeSlotColor: (x, y) => {
      const currentPlayer = x;
    },
  };

  function startGame() {
    playerController.playerOne.slot.textContent = playerController.playerOne.playerName;
    playerController.playerTwo.slot.textContent = playerController.playerTwo.playerName;
    Gameboard.destroyGameboard();
    Gameboard.createGameboard();
    Gameboard.gameSquareEvents();
    Gameboard.changeSlotColor(
      playerController.playerOne,
      playerController.playerTwo,
    );
  }
  startGame();
}

playGame();
