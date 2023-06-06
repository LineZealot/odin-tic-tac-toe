function playGame() {
  const playerForm = (function getPlayerNames() {
    const htmlBody = document.querySelector('body');
    const elements = {};

    function createForm() {
      const formBody = document.createElement('form');
      formBody.className = 'form-body';

      function inputElements() {
        const playerData = [];
        (function createInputs() {
          for (let x = 0; x < 2; x += 1) {
            const player = document.createElement('input');
            player.type = 'text';
            player.className = 'player-form';
            player.id = `player-input-${x}`;
            playerData.push(player);
          }
        }());
        const labels = [];
        (function createLabels() {
          for (let x = 0; x < 2; x += 1) {
            const label = document.createElement('label');
            label.setAttribute('for', `player-input-${x}`);
            label.className = 'player-label';
            label.textContent = `Player ${x + 1}`;
            labels.push(label);
          }
        }());
        (function createFieldsets() {
          const fieldsets = [];
          for (let x = 0; x < 2; x += 1) {
            const inputArea = document.createElement('fieldset');
            inputArea.className = 'input-area';
            inputArea.id = `input-area-${x + 1}`;
            fieldsets.push(inputArea);
            inputArea.appendChild(labels[x]);
            inputArea.appendChild(playerData[x]);
            formBody.appendChild(inputArea);
          }
        }());
        elements.playerData = playerData;
      }

      inputElements();

      function submitButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'form-button';
        button.textContent = 'Play Game!';
        formBody.appendChild(button);
        elements.buttonElement = button;
      }

      submitButton();
      htmlBody.appendChild(formBody);
      elements.formBody = formBody;
    }

    createForm();
    return { elements };
  }());

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
        '',
        'red',
        'X',
        'p1',
        document.getElementById('player-slot-p1'),
      ),
      playerTwo: Player(
        '',
        'green',
        'O',
        'p2',
        document.getElementById('player-slot-p2'),
      ),
    },
    turn: 'p1',
  };

  const gameboard = {
    pageBody: document.getElementById('game-body'),

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

      gameboard.pageBody.appendChild(gameboardTable);
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
  };

  const createOverlay = (function winningOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    gameboard.pageBody.appendChild(overlay);
    return { overlay };
  }());

  const gameController = {
    winner: 'none',
    checkThreeRow: (square, p) => {
      const player = p;
      const { overlay } = createOverlay;

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

      function checkForChecked(x) {
        return x.body.value === 'clicked';
      }
      const isTie = gameboard.gameboardSquares.every(checkForChecked);
      console.log(isTie);

      if (isWinningRow) {
        overlay.textContent = `${player.playerName} wins!`;
        overlay.style.display = 'flex';
        overlay.addEventListener('click', () => {
          overlay.style.display = 'none';
          gameController.resetGame();
        });
      } else if (isTie === true) {
        overlay.textContent = 'Tie!';
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
    },

    resetButtonEvents: () => {
      gameboard.resetGameButton().addEventListener('click', () => {
        gameController.resetGame();
      });
    },
  };

  (function startGame() {
    const gameDisplay = document.getElementById('game-info-box');
    playerForm.elements.buttonElement.addEventListener('click', () => {
      (function setNames() {
        playerController.players.playerOne.playerName = playerForm.elements.playerData[0].value;
        playerController.players.playerTwo.playerName = playerForm.elements.playerData[1].value;

        playerController.players.playerOne.slot.textContent = (
          playerController.players.playerOne.playerName
        );
        playerController.players.playerTwo.slot.textContent = (
          playerController.players.playerTwo.playerName
        );
        playerForm.elements.formBody.style.display = 'none';
        gameDisplay.style.display = 'flex';
      }());
      gameboard.creategameboard();
      gameController.resetGame();
      gameController.resetButtonEvents();
      gameController.gameSquareEvents();
      gameboard.changeSlotColor(
        playerController.players.playerOne,
        playerController.players.playerTwo,
      );
    });
  }());
}

playGame();
