import Player from "../Factories/Player"
import Ship from "../Factories/Ship";
import UI from "./UI";

const GameController = (() => {

  const player1 = Player('p1');
  const player2 = Player('p2');

  const activePlayer = () => {
    return player1.isActive ? player1: player2;
  }

  const initPlayer1 = () => {
    player1.isActive = true;
    let ships = [Ship(4, 'a'), Ship(2, 'b')];
    player1.gameboard.setShip(ships[0], {x: 1, y: 2}, 'x');
    player1.gameboard.setShip(ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P1', player1.gameboard.getBoard());
  }

  const initPlayer2 = () => {
    player2.ships = [Ship(3, 'a'), Ship(2, 'b')];
    player2.gameboard.setShip(player2.ships[0], {x: 1, y: 1}, 'x');
    player2.gameboard.setShip(player2.ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P2', player2.gameboard.getBoard());
  }

  const fireAttack = (coords) => {
    activePlayer().gameboard.receiveAttack(coords);
  }

  const playRound = () => {

  }

  const playGame = () => {
    playRound();
  }

  const init = () => {
    initPlayer1();
    initPlayer2();
    playGame();
  };

  return {
    init,
    fireAttack,
  };

})();

export default GameController;