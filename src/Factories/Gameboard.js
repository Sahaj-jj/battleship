const Gameboard = (size) => {

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
    at(coords).isShot = true;
  }

  const setShip = (ship, coords, axis = 'x') => {
    let newCoords = coords;
    for (let i = 0; i < ship.getLength(); i++) {
      at(newCoords).hasShip = ship.name;
      axis === 'x' ? newCoords.x++: newCoords.y++;
    }
  }

  return {
    at,
    receiveAttack,
    setShip,
    board,
  };
}

export default Gameboard;