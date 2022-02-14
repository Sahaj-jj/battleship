const AI = (() => {

  const getCoords = (board) => {
    const validCells = board.filter(cell => !cell.isShot);
    const coords = validCells[Math.floor(Math.random() * validCells.length)].coords;
    return coords;
  };

  return {
    getCoords,
  };

})();

export default AI;