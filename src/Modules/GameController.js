import Player from "../Factories/Player";
import UI from "./UI";
import AI from "./AIPlayer";
import PlaceShips from "./PlaceShips";

const GameController = (() => {

  const player1 = Player('P1', 'Player');
  const player2 = Player('P2', 'Enemy');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  const opponent = () => {
    return player1.isActive ? player2: player1;
  }

  const activePlayer = () => {
    return player1.isActive ? player1: player2;
  }

  const toggleActivePlayer = () => {
    player1.isActive = !player1.isActive;
    player2.isActive = !player2.isActive;
    UI.toggleActiveBoard();
  }

  const initPlayer1 = () => {
    player1.isActive = true;
    player1.gameboard = PlaceShips.getSamplePlayer().gameboard;
    UI.renderGameboard('P1', player1.name, player1.gameboard.getBoard());
    UI.updateShipsDisplay(player1.name, player1.gameboard.getShips());
  }

  const initPlayer2 = () => {
    player2.isActive = false;
    player2.gameboard = AI.getAIPlayer().gameboard;
    UI.renderGameboard('P2', player2.name, player2.gameboard.getBoard(), true);
    UI.updateShipsDisplay(player2.name, player2.gameboard.getShips());

  }

  const playTurn = async (coords) => {
    const opponentBoard = opponent().gameboard;
    if (!opponentBoard.isValidAttack(coords)) return;

    opponentBoard.receiveAttack(coords);
    
    if (!opponentBoard.isShipHit(coords)) {
      await sleep(300);
      toggleActivePlayer();
    } else {
      UI.updateShipsDisplay(opponent().name, opponentBoard.getShips());
      if (opponentBoard.allShipsSunk()) {
        UI.showWinner(activePlayer().displayName);
        return;
      }
    }
    playGame();
  }

  const playGame = async () => {
    if (player2.isActive) {
      await sleep(Math.random()*300 + 300);
      playTurn(AI.getCoords(opponent().gameboard));
    }
  }

  const init = () => {
    initPlayer1();
    initPlayer2();
  };

  return {
    init,
    playTurn,
  };

})();

export default GameController;