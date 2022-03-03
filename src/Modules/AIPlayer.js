import Player from "../Factories/Player";
import Ship from "../Factories/Ship";

const AI = (() => {

  const AIplayer = Player('AI');
  const ships = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Cruiser'), Ship(3, 'Submarine'), Ship(2, 'Destroyer')];
  let prevShipHit = null;

  const placeShips = () => {
    AIplayer.gameboard.setShip(ships[0], { x: 0, y: 0 }, 'x');
    AIplayer.gameboard.setShip(ships[1], { x: 9, y: 6 }, 'y');
    AIplayer.gameboard.setShip(ships[2], { x: 1, y: 7 }, 'y');
    AIplayer.gameboard.setShip(ships[3], { x: 7, y: 1 }, 'x');
    AIplayer.gameboard.setShip(ships[4], { x: 4, y: 3 }, 'x');
  }

  const getRandomValidCoords = () => {
    const board = AIplayer.gameboard.getBoard();
    const validCells = board.filter(cell => !cell.isShot);
    const coords = validCells[Math.floor(Math.random() * validCells.length)].coords;
    return coords;
  }

  const getValidAdjacentCoords = (coords) => {
    const adjacency = [-1, 1]; // 4-way adjacency
    let adjacentCoords = [];
    for(const adjacent of adjacency) {
      for (const key in coords) {
        const newPoint = coords[key] + adjacent;
        if (newPoint <= 9 && newPoint >= 0){
          adjacentCoords.push({...coords, [key]: newPoint});
        }
      }
    }
    return adjacentCoords;
  }

  function shuffleFisherYates(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  const sum = (obj1, obj2, subtract = false) => {
    return Object.keys(obj1).reduce((accumulator, key) => 
          ({...accumulator, [key]: obj1[key] + (subtract ? -1: 1) * obj2[key]}), 
          {});
  }

  const traceLastShipHit = () => {
    const adjacentCoords = shuffleFisherYates(getValidAdjacentCoords(prevShipHit));
    for (const coords of adjacentCoords) {
      let cell = AIplayer.gameboard.at(coords);
      if (cell.isShot && cell.hasShip) {
        let newCoords = {...coords};
        let direction = sum(newCoords, prevShipHit, true);
        while (cell.isShot && cell.hasShip) {
          newCoords = sum(newCoords, direction);
          if (newCoords.x < 0 || newCoords.x > 9 || newCoords.y < 0 || newCoords.y > 9) break;
          cell = AIplayer.gameboard.at(newCoords);
        }
        if (cell.isShot) {
          return sum(prevShipHit, direction, true);
        }
        return newCoords;
      }
    }
    for (const coords of adjacentCoords) {
      let cell = AIplayer.gameboard.at(coords);
      if (cell.isShot) continue;
      else return coords;
    }
  }

  const getCoords = (gameboard) => {
    let coords;
    AIplayer.gameboard = gameboard;
    if (prevShipHit) {
      // if prev hit sunk a ship then reset
      if (AIplayer.gameboard
      .getShips()
      .find(ship => ship.name === AIplayer.gameboard.at(prevShipHit).hasShip)
      .isSunk()) {
        prevShipHit = null;
        coords = getRandomValidCoords();
      } else coords = traceLastShipHit();
    } else coords = getRandomValidCoords();
    if (AIplayer.gameboard.isShipHit(coords)) prevShipHit = coords;
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