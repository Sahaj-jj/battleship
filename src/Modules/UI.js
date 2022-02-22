import GameController from "./GameController";
import PlaceShips from "./PlaceShips";

const UI = (() => {
  const $p1Gameboard = document.querySelector('.P1');
  const $p2Gameboard = document.querySelector('.P2');
  const $sampleGameBoard = document.querySelector('.sample');
  let mode = 'PLAY';

  const decodeCoords = (coordsString) => {
    const coordsArray = coordsString.split(' ');
    return {x: +coordsArray[0], y: +coordsArray[1]};
  }
  
  const newCellDOM = (cell) => {
      const $cell = document.createElement('div');
      $cell.classList.add('cell');
      $cell.setAttribute('data-coords', `${cell.coords.x} ${cell.coords.y}`);
      if (cell.hasShip) $cell.classList.add('ship');
      addCellListener($cell);
      return $cell;
  }

  const addCellListener = ($cell) => {
    if (mode === 'PLACE') {
      $cell.addEventListener('click', () => {
        PlaceShips.placeShip(decodeCoords($cell.getAttribute('data-coords')));
      });
  
      $cell.addEventListener('mouseover', () => {
        PlaceShips.showShip(decodeCoords($cell.getAttribute('data-coords')));
      });
    }
    $cell.addEventListener('click', () => {
      GameController.playTurn(decodeCoords($cell.getAttribute('data-coords')));
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
    if (player === 'sample') {
      $board = $sampleGameBoard;
      mode = 'PLACE';
    } else mode = 'PLAY';
    $board.textContent = '';
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