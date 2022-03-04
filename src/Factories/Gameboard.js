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

  const setShip = (ship, coords, axis = 'x') => {
    ships.push(ship);
    let newCoords = coords;
    for (let i = 0; i < ship.getLength(); i++) {
      at(newCoords).hasShip = ship.name;
      axis === 'x' ? newCoords.x++: newCoords.y++;
    }
  }

  const isShipHit = (coords) => {
    return at(coords).hasShip !== '';
  }

  const receiveAttack = (coords) => {
    const cell = at(coords);
    cell.isShot = true;
    if (cell.hasShip) shipHit(cell.hasShip);
  }

  const shipHit = (shipName) => {
    const ship = ships.find(ship => ship.name === shipName);
    ship.hit();
    if (ship.isSunk()) sunk++;
  }

  const getShipCoordsArray = (ship) => {
    return board.filter(cell => cell.hasShip === ship.name).map(cell => cell.coords);
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

  const getShipByCoords = (coords) => {
    return ships.find(ship => ship.name === at(coords).hasShip);
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
    getShipCoordsArray,
    isCollisions,
    getShipByCoords,
    getBoard,
    getShips,
    reset,
    allShipsSunk
  };
}

export default Gameboard;