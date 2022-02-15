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
      GameController.playTurn(coords);
    });
  }

  const cellHit = (coords) => {
    const encodedCoords = `${coords.x} ${coords.y}`;
    const $cell = document.querySelector(`.active > [data-coords="${encodedCoords}"]`);
    $cell.classList.add('hit');
  }

  const toggleActiveBoard = () => {
    $p1Gameboard.classList.toggle('active');
    $p2Gameboard.classList.toggle('active');
  }

  const shipSunk = (coordsArray) => {
    coordsArray.forEach(coords => {
      document.querySelector(`.active > [data-coords="${coords.x} ${coords.y}"]`).classList.add('sunk');
    })
  }

  const renderGameboard = (player, playerName, board) => {
    let $board = player === 'P1' ? $p1Gameboard : $p2Gameboard;
    $board.classList.add(playerName);
    board.forEach(cell => $board.appendChild(newCellDOM(cell)));
  }

  const init = () => {
    $p2Gameboard.classList.add('active');
  }

  init();

  return {
    init,
    renderGameboard,
    cellHit,
    shipSunk,
    toggleActiveBoard,
  };

})();

export default UI;