import Player from "../Factories/Player"
import Ship from "../Factories/Ship";

const GameController = (() => {

  const player1 = Player('p1');
  const player2 = Player('p2');

  const initPLayer1 = () => {
    player1.ships = [Ship(3, 'a'), Ship(2, 'b')];
    player1.gameboard.setShip(player1.ships[0], {x: 1, y: 1}, 'x');
    player1.gameboard.setShip(player1.ships[1], {x: 2, y: 5}, 'y');
    console.log(player1.gameboard.board);
  }

  const initPLayer2 = () => {
    player2.ships = [Ship(3, 'a'), Ship(2, 'b')];
    player2.gameboard.setShip(player2.ships[0], {x: 1, y: 1}, 'x');
    player2.gameboard.setShip(player2.ships[1], {x: 2, y: 5}, 'y');
    //console.log(player2.gameboard.board);
  }

  const init = () => {
    initPLayer1();
    initPLayer2();
  };

  return {
    init,
  };

})();

export default GameController;