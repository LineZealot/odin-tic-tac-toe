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
    players: {
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
    },
    turn: 'p1',
  };

  const gameboard = {
    gameboardSquares: [],
    creategameboard: () => {
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
          gameboard.gameboardSquares.push({
            body: gameSquare,
            value: 'empty',
          });
        }
        gameboardTable.appendChild(gameRow);
      }

      pageBody.appendChild(gameboardTable);
      return gameboardTable;
    },

    resetGameButton: () => {
      const gameInfo = document.getElementById('game-info-box');
      const resetButton = document.createElement('button');
      resetButton.className = 'destroy-gameboard-button';
      resetButton.textContent = 'Reset Board';
      gameInfo.appendChild(resetButton);
      return resetButton;
    },

    changeSlotColor: (x, y) => {
      const currentPlayer = x;
      const priorPlayer = y;
      currentPlayer.slot.style.backgroundColor = x.color;
      priorPlayer.slot.style.backgroundColor = 'white';
    },

    winningOverlay: () => {
      const overlay = document.createElement('div');
      overlay.id = 'overlay';
      pageBody.appendChild(overlay);
      return overlay;
    },
  };

  const gameController = {
    winner: 'none',
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
        gameboard.winningOverlay();
        const overlay = document.getElementById('overlay');
        overlay.textContent = `${player.playerName} wins!`;
        overlay.style.display = 'flex';
        overlay.addEventListener('click', () => {
          overlay.style.display = 'none';
          gameController.resetGame();
        });
      }
    },

    gameSquareEvents: () => {
      gameboard.gameboardSquares.forEach((e) => {
        e.body.addEventListener('click', () => {
          if (
            e.body.value === 'unclicked'
            && gameController.winner === 'none'
          ) {
            let currentPlayer;
            if (playerController.turn === 'p1') {
              playerController.turn = 'p2';
              currentPlayer = playerController.players.playerOne;
              gameboard.changeSlotColor(
                playerController.players.playerTwo,
                playerController.players.playerOne,
              );
            } else {
              playerController.turn = 'p1';
              currentPlayer = playerController.players.playerTwo;
              gameboard.changeSlotColor(
                playerController.players.playerOne,
                playerController.players.playerTwo,
              );
            }
            e.body.textContent = currentPlayer.symbol;
            e.body.style.color = currentPlayer.color;
            e.body.value = 'clicked';
            e.value = currentPlayer.symbol;
            gameController.checkThreeRow(
              gameboard.gameboardSquares,
              currentPlayer,
            );
          }
        });
      });
    },

    resetGame: () => {
      gameboard.resetGameButton().addEventListener('click', () => {
        gameController.winner = 'none';
        document.getElementById('gameboard').remove();
        gameboard.gameboardSquares.splice(0, gameboard.gameboardSquares.length);
        gameboard.creategameboard();
        gameController.gameSquareEvents();
        function resetPlayerText() {
          Object.values(playerController.players).forEach((p) => {
            const player = p;
            player.slot.textContent = player.playerName;
          });
        }
        resetPlayerText();
      });
    },
  };

  function startGame() {
    playerController.players.playerOne.slot.textContent = playerController.players.playerOne.playerName;
    playerController.players.playerTwo.slot.textContent = playerController.players.playerTwo.playerName;
    gameController.resetGame();
    gameboard.creategameboard();
    gameController.gameSquareEvents();
    gameboard.changeSlotColor(
      playerController.players.playerOne,
      playerController.players.playerTwo,
    );
  }
  startGame();
}

playGame();
