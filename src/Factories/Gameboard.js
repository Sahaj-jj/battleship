import UI from "../Modules/UI";

const Gameboard = (size) => {

  let ships = [];
  let sunk = 0;

  const cell = (x, y) => {
    return {
      coords: {x, y},
      hasShip: '',
      isShot: false
    };
  }

  const _makeGrid = (size) => {
    const arr = [];
    for (let i = 0; i < size * size; i++) {
      arr.push(cell(i % size, Math.floor(i / size)));
    }
    return arr;
  }

  const board = _makeGrid(size);
  const at = (coords) => board[coords.x + coords.y * size];

  const isValidAttack = (coords) => {
    return !at(coords).isShot;
  }

  const isShipHit = (coords) => {
    return at(coords).hasShip !== '';
  }

  const receiveAttack = (coords) => {
    const cell = at(coords);
    cell.isShot = true;
    UI.cellHit(coords);
    if (cell.hasShip) {
      const ship = ships.find(ship => ship.name === cell.hasShip);
      ship.hit();
      if (ship.isSunk()) shipSunk(ship.name);
    }
  }

  const setShip = (ship, coords, axis = 'x') => {
    ships.push(ship);
    let newCoords = coords;
    for (let i = 0; i < ship.getLength(); i++) {
      at(newCoords).hasShip = ship.name;
      axis === 'x' ? newCoords.x++: newCoords.y++;
    }
  }

  const shipSunk = (shipName) => {
    sunk++;
    const coordsArray = board.filter(cell => cell.hasShip === shipName).map(cell => cell.coords);
    UI.shipSunk(coordsArray);
  }

  const isCollisions = (shipCoordsArray) => {
    for (const shipCoords of shipCoordsArray) {
      if (shipCoords.x > size - 1 || shipCoords.y > size - 1) return true;
      if (at(shipCoords).hasShip !== '') return true;
      const adjacentCoords = getAdjacentCoordsArray(shipCoords);
      for (const coords of adjacentCoords) {
        if (coords.x > size - 1 || coords.x < 0 || coords.y > size - 1 || coords.y < 0) continue;
        if (at(coords).hasShip !== '') return true;
      }
    }
    return false;
  }

  const getAdjacentCoordsArray = (coords) => {
    return [
      {x: coords.x + 1, y: coords.y},
      {x: coords.x - 1, y: coords.y},
      {x: coords.x, y: coords.y + 1},
      {x: coords.x, y: coords.y - 1}
    ];
  }

  const reset = () => {
    ships = [];
    for (const cell of board) {
      cell.isShot = false;
      cell.hasShip = '';
    }
  }

  const allShipsSunk = () => {
    return sunk >= ships.length;
  }

  const getBoard = () => board;
  const getShips = () => ships;

  return {
    at,
    isValidAttack,
    isShipHit,
    receiveAttack,
    setShip,
    isCollisions,
    getBoard,
    getShips,
    reset,
    allShipsSunk
  };
}

export default Gameboard;