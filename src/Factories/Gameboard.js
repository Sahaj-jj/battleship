const Gameboard = (size) => {

  const cell = (xPos, yPos) => {
    return {
      x: xPos,
      y: yPos,
      hasShip: false,
      isShot: false
    };
  }

  const _makeGrid = (size) => {
    const arr = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        arr.push(cell(j, i));
      }
    }
    return arr;
  }

  const at = (x, y) => board[x + y * size];

  const board = _makeGrid(size);

  const receiveAttack = (x, y) => {
    at(x, y).isShot = true;
  }

  return {
    at,
    receiveAttack,
  };
}

export default Gameboard;