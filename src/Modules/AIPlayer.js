import Player from "../Factories/Player";
import Ship from "../Factories/Ship";

const AI = (() => {

  const AIplayer = Player('AI');
  const ships = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Cruiser'), Ship(3, 'Submarine'), Ship(2, 'Destroyer')];

  const placeShips = () => {
    AIplayer.gameboard.setShip(ships[0], {x: 0, y: 0}, 'x');
    AIplayer.gameboard.setShip(ships[1], {x: 9, y: 6}, 'y');
    AIplayer.gameboard.setShip(ships[2], {x: 1, y: 7}, 'y');
    AIplayer.gameboard.setShip(ships[3], {x: 7, y: 1}, 'x');
    AIplayer.gameboard.setShip(ships[4], {x: 4, y: 3}, 'x');
  }

  const getCoords = (board) => {
    const validCells = board.filter(cell => !cell.isShot);
    const coords = validCells[Math.floor(Math.random() * validCells.length)].coords;
    return coords;
  };

  const getAIPlayer = () => {
    placeShips();
    return AIplayer;
  }

  return {
    getCoords,
    getAIPlayer,
  };

})();

export default AI;