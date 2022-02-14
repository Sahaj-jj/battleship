import GameController from "./GameController";


const UI = (() => {
  const $p1Gameboard = document.querySelector('.P1');
  const $p2Gameboard = document.querySelector('.P2');
  
  const newCellDOM = (cell) => {
      const $cell = document.createElement('div');
      $cell.classList.add('cell');
      $cell.setAttribute('data-coords', `${cell.coords.x} ${cell.coords.y}`);
      if (cell.hasShip) $cell.classList.add('ship');
      addCellListener($cell);
      return $cell;
  }

  const addCellListener = ($cell) => {
    $cell.addEventListener('click', () => {
      const coordsArray = $cell.getAttribute('data-coords').split(' ');
      const coords = {x: +coordsArray[0], y: +coordsArray[1]};
      GameController.fireAttack(coords);
    });
  }

  const renderGameboard = (player, board) => {
    const $board = player === 'P1' ? $p1Gameboard : $p2Gameboard;
    board.forEach(cell => $board.appendChild(newCellDOM(cell)));
  }

  const init = () => {
    renderGameboard();
  }

  return {
    init,
    renderGameboard,
  };

})();

export default UI;