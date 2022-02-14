const Gameboard = (size) => {

  const ships = [];

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

  const receiveAttack = (coords) => {
    const cell = at(coords);
    if (cell.isShot) return;
    cell.isShot = true;
    if (cell.hasShip) ships.find(ship => ship.name === cell.hasShip).hit();
  }

  const setShip = (ship, coords, axis = 'x') => {
    ships.push(ship);
    let newCoords = coords;
    for (let i = 0; i < ship.getLength(); i++) {
      at(newCoords).hasShip = ship.name;
      axis === 'x' ? newCoords.x++: newCoords.y++;
    }
  }

  const getBoard = () => board;

  return {
    at,
    receiveAttack,
    setShip,
    getBoard,
  };
}

export default Gameboard;