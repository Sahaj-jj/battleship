import Player from "../Factories/Player"
import Ship from "../Factories/Ship";
import UI from "./UI";
import AI from "./AIPlayer";
import PlaceShips from "./PlaceShips";

const GameController = (() => {

  const player1 = Player('P1');
  const player2 = Player('P2');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  const opponent = () => {
    return player1.isActive ? player2: player1;
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
    let ships = [Ship(3, 'enemya'), Ship(2, 'enemyb')];
    player2.gameboard.setShip(ships[0], {x: 1, y: 1}, 'x');
    player2.gameboard.setShip(ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P2', player2.name, player2.gameboard.getBoard(), true);
    UI.updateShipsDisplay(player2.name, player2.gameboard.getShips());

  }

  const playTurn = (coords) => {
    const opponentBoard = opponent().gameboard;
    if (!opponentBoard.isValidAttack(coords)) return;
    opponentBoard.receiveAttack(coords);
    UI.updateShipsDisplay(opponent().name, opponentBoard.getShips());
    if (!opponentBoard.isShipHit(coords)) toggleActivePlayer();
    playGame();
  }

  const playGame = async () => {
    if (player2.isActive) {
      await sleep(300);
      playTurn(AI.getCoords(opponent().gameboard.getBoard()));
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