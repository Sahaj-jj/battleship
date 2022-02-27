import Player from "../Factories/Player";
import Ship from "../Factories/Ship";

const AI = (() => {

  const AIplayer = Player('AI');
  const ships = [Ship(5, 'Carrier'), Ship(4, 'Battleship'), Ship(3, 'Cruiser'), Ship(3, 'Submarine'), Ship(2, 'Destroyer')];
  let PrevShipHit = null;
  // let PrevHit = null;

  const placeShips = () => {
    AIplayer.gameboard.setShip(ships[0], {x: 0, y: 0}, 'x');
    AIplayer.gameboard.setShip(ships[1], {x: 9, y: 6}, 'y');
    AIplayer.gameboard.setShip(ships[2], {x: 1, y: 7}, 'y');
    AIplayer.gameboard.setShip(ships[3], {x: 7, y: 1}, 'x');
    AIplayer.gameboard.setShip(ships[4], {x: 4, y: 3}, 'x');
  }

  const getRandomValidCoords = () => {
    const board = AIplayer.gameboard.getBoard();
    const validCells = board.filter(cell => !cell.isShot);
    const coords = validCells[Math.floor(Math.random() * validCells.length)].coords;
    return coords;
  }

  function shuffleFisherYates(array) {
    let i = array.length;
    while (i--) {
      const ri = Math.floor(Math.random() * i);
      [array[i], array[ri]] = [array[ri], array[i]];
    }
    return array;
  }

  const trace = () => {
    const adjacentCoords = shuffleFisherYates([
      {x: PrevShipHit.x + 1, y: PrevShipHit.y},
      {x: PrevShipHit.x - 1, y: PrevShipHit.y},
      {x: PrevShipHit.x, y: PrevShipHit.y + 1},
      {x: PrevShipHit.x, y: PrevShipHit.y - 1}
    ]);

    let additiveCoords;

    for (const coords of adjacentCoords) {
      if (coords.x < 0 || coords.x > 9 || coords.y < 0 || coords.y > 9) continue;
      let cell = AIplayer.gameboard.at(coords);
      let newCoords = Object.assign({}, coords);
      if (cell.isShot && cell.hasShip) {
        additiveCoords = {x: newCoords.x - PrevShipHit.x, y: newCoords.y - PrevShipHit.y};
        while (cell.isShot && cell.hasShip) {
          newCoords.x += additiveCoords.x;
          newCoords.y += additiveCoords.y;
          cell = AIplayer.gameboard.at(newCoords);
        }
        if (cell.isShot) {
          const currentCoords = Object.assign({}, PrevShipHit);
          currentCoords.x -= additiveCoords.x;
          currentCoords.y -= additiveCoords.y;
          return currentCoords;
        }
        return newCoords;
      }
    }

    for (const coords of adjacentCoords) {
      if (coords.x < 0 || coords.x > 9 || coords.y < 0 || coords.y > 9) continue;
      let cell = AIplayer.gameboard.at(coords);
      if (cell.isShot) continue;
      else return coords;
    }
  }

  const getCoords = (board) => {
    let coords;
    AIplayer.gameboard = board;
    if (PrevShipHit) {
      // if prev hit sunk a ship then reset
      if (AIplayer.gameboard.getShips().find(ship => ship.name === AIplayer.gameboard.at(PrevShipHit).hasShip).isSunk()) {
        PrevShipHit = null;
        coords = getRandomValidCoords();
      } else coords = trace();
    } else coords = getRandomValidCoords();
    if (AIplayer.gameboard.isShipHit(coords)) PrevShipHit = coords;
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