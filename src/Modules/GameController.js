import Player from "../Factories/Player"
import Ship from "../Factories/Ship";
import UI from "./UI";
import AI from "./AIPlayer";

const GameController = (() => {

  const player1 = Player('p1');
  const player2 = Player('p2');

  const activePlayer = () => {
    return player1.isActive ? player1: player2;
  }

  const toggleActivePlayer = () => {
    player1.isActive = !player1.isActive;
    player2.isActive = !player2.isActive;
    UI.toggleActiveBoard();
  }

  const initPlayer1 = () => {
    let ships = [Ship(4, 'a'), Ship(2, 'b')];
    player1.gameboard.setShip(ships[0], {x: 1, y: 2}, 'x');
    player1.gameboard.setShip(ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P1', player1.name, player1.gameboard.getBoard());
    player1.isActive = true;
  }

  const initPlayer2 = () => {
    player2.ships = [Ship(3, 'enemya'), Ship(2, 'enemyb')];
    player2.gameboard.setShip(player2.ships[0], {x: 1, y: 1}, 'x');
    player2.gameboard.setShip(player2.ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P2', player2.name, player2.gameboard.getBoard());
  }

  const fireAttack = (coords) => {
    const player = activePlayer();
    if (!player.gameboard.isValidAttack(coords)) return;
    player.gameboard.receiveAttack(coords);
    playRound();
  }

  const playRound = () => {
    toggleActivePlayer();
    const coords = AI.getCoords(player2.gameboard.getBoard());
    console.log(coords);
    activePlayer().gameboard.receiveAttack(coords);
    toggleActivePlayer();
  }

  const playGame = () => {
    // playRound();
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