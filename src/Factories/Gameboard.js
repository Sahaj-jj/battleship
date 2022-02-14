import UI from "../Modules/UI";

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
      if (ship.isSunk()) console.log(ship.name);
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

  const getBoard = () => board;

  return {
    at,
    isValidAttack,
    isShipHit,
    receiveAttack,
    setShip,
    getBoard,
  };
}

export default Gameboard;