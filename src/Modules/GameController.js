import Player from "../Factories/Player"
import Ship from "../Factories/Ship";
import UI from "./UI";
import AI from "./AIPlayer";

const GameController = (() => {

  const player1 = Player('player');
  const player2 = Player('enemy');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  } 

  // const activePlayer = () => {
  //   return player1.isActive ? player1: player2;
  // }

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
    let ships = [Ship(4, 'ak'), Ship(2, 'b')];
    player1.gameboard.setShip(ships[0], {x: 1, y: 2}, 'x');
    player1.gameboard.setShip(ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P1', player1.name, player1.gameboard.getBoard());
  }

  const initPlayer2 = () => {
    player2.isActive = false;
    let ships = [Ship(3, 'enemya'), Ship(2, 'enemyb')];
    player2.gameboard.setShip(ships[0], {x: 1, y: 1}, 'x');
    player2.gameboard.setShip(ships[1], {x: 2, y: 5}, 'y');
    UI.renderGameboard('P2', player2.name, player2.gameboard.getBoard());
  }

  const playRound = async () => {
    toggleActivePlayer();
    await sleep(300);
    const coords = AI.getCoords(opponent().gameboard.getBoard());
    opponent().gameboard.receiveAttack(coords);
    toggleActivePlayer();
  }

  const playGame = () => {
    // playRound();
  }

  const fireAttack = (coords) => {
    if (!opponent().gameboard.isValidAttack(coords)) return;
    opponent().gameboard.receiveAttack(coords);
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